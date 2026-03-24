import { NextResponse } from "next/server";
import type {
  ContributionLevel,
  ContributionWeek,
  GithubHeatmapResponse,
} from "@/app/types/github";

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const CACHE_SECONDS = 1800;

type GraphqlEnvelope<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

type RestUser = {
  public_repos: number;
  followers: number;
  following: number;
};

type RestRepo = {
  stargazers_count: number;
};

type CalendarData = {
  user: {
    followers: { totalCount: number };
    following: { totalCount: number };
    repositories: { totalCount: number };
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: Array<{
          firstDay: string;
          contributionDays: Array<{
            date: string;
            contributionCount: number;
          }>;
        }>;
      };
    };
  } | null;
};

type StarPageData = {
  user: {
    repositories: {
      nodes: Array<{ stargazerCount: number | null }>;
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
    };
  } | null;
};

const CALENDAR_QUERY = `
  query GetCalendar($login: String!) {
    user(login: $login) {
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {
        totalCount
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

const STARS_QUERY = `
  query GetStars($login: String!, $cursor: String) {
    user(login: $login) {
      repositories(
        ownerAffiliations: OWNER
        privacy: PUBLIC
        isFork: false
        first: 100
        after: $cursor
        orderBy: {field: UPDATED_AT, direction: DESC}
      ) {
        nodes {
          stargazerCount
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

async function graphqlRequest<T>(
  token: string,
  query: string,
  variables: Record<string, string | null>,
): Promise<T> {
  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-website",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: CACHE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed with ${response.status}`);
  }

  const payload = (await response.json()) as GraphqlEnvelope<T>;

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((entry) => entry.message).join("; "));
  }

  if (!payload.data) {
    throw new Error("GitHub GraphQL payload missing data");
  }

  return payload.data;
}

function toContributionLevel(count: number, maxContribution: number): ContributionLevel {
  if (count <= 0) return 0;

  const lowThreshold = Math.max(1, Math.ceil(maxContribution * 0.33));
  const mediumThreshold = Math.max(lowThreshold + 1, Math.ceil(maxContribution * 0.66));

  if (count <= lowThreshold) return 1;
  if (count <= mediumThreshold) return 2;
  return 3;
}

type CalendarUser = NonNullable<CalendarData["user"]>;
type CalendarWeek =
  CalendarUser["contributionsCollection"]["contributionCalendar"]["weeks"][number];

function normalizeWeeks(
  rawWeeks: CalendarWeek[],
) {
  const maxContribution = rawWeeks.reduce((max: number, week: CalendarWeek) => {
    return Math.max(
      max,
      ...week.contributionDays.map((day: CalendarWeek["contributionDays"][number]) => {
        return day.contributionCount;
      }),
    );
  }, 0);

  const weeks: ContributionWeek[] = rawWeeks.map((week) => ({
    firstDay: week.firstDay,
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: toContributionLevel(day.contributionCount, maxContribution),
    })),
  }));

  return { weeks, maxContribution };
}

async function getTotalStars(login: string, token: string) {
  let totalStars = 0;
  let cursor: string | null = null;

  // Cap pages to avoid pathological loops for very large accounts.
  for (let page = 0; page < 10; page += 1) {
    const pageData: StarPageData = await graphqlRequest<StarPageData>(
      token,
      STARS_QUERY,
      {
      login,
      cursor,
      },
    );

    if (!pageData.user) return totalStars;

    totalStars += pageData.user.repositories.nodes.reduce((sum: number, repo) => {
      return sum + (repo.stargazerCount ?? 0);
    }, 0);

    const pageInfo = pageData.user.repositories.pageInfo;
    const hasNextPage = pageInfo.hasNextPage;
    const nextCursor = pageInfo.endCursor;

    if (!hasNextPage || !nextCursor) {
      break;
    }

    cursor = nextCursor;
  }

  return totalStars;
}

function buildLevelFromScore(score: number): ContributionLevel {
  if (score <= 0) return 0;
  if (score === 1) return 1;
  if (score === 2) return 2;
  return 3;
}

function sortDayAsc(a: { date: string }, b: { date: string }) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

function chunkByWeek<T>(items: T[], size: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function parseGhchartSvgToWeeks(svg: string): { weeks: ContributionWeek[]; maxContribution: number } {
  const rectRegex =
    /<rect[^>]*data-score="(\d+)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*\/>/g;

  const days: Array<{ date: string; count: number; level: ContributionLevel }> = [];

  let match: RegExpExecArray | null;
  while ((match = rectRegex.exec(svg)) !== null) {
    const scoreRaw = match[1];
    const date = match[2];

    if (!scoreRaw || !date) continue;

    const score = Number.parseInt(scoreRaw, 10);
    if (Number.isNaN(score)) continue;

    days.push({
      date,
      count: score,
      level: buildLevelFromScore(score),
    });
  }

  if (!days.length) {
    return { weeks: [], maxContribution: 0 };
  }

  const sorted = days.sort(sortDayAsc);
  const weekChunks = chunkByWeek(sorted, 7);
  const weeks: ContributionWeek[] = weekChunks.map((weekDays) => ({
    firstDay: weekDays[0]?.date ?? "",
    days: weekDays,
  }));

  const maxContribution = sorted.reduce((max, day) => Math.max(max, day.count), 0);

  return { weeks, maxContribution };
}

async function getPublicStats(username: string) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-website",
  };

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: CACHE_SECONDS },
    }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
      next: { revalidate: CACHE_SECONDS },
    }),
  ]);

  const stats = {
    publicRepos: null as number | null,
    followers: null as number | null,
    following: null as number | null,
    totalStars: null as number | null,
  };

  if (userRes.ok) {
    const user = (await userRes.json()) as RestUser;
    stats.publicRepos = user.public_repos;
    stats.followers = user.followers;
    stats.following = user.following;
  }

  if (reposRes.ok) {
    const repos = (await reposRes.json()) as RestRepo[];
    stats.totalStars = Array.isArray(repos)
      ? repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0)
      : 0;
  }

  return stats;
}

async function getHeatmapFallbackPayload(username: string): Promise<GithubHeatmapResponse> {
  const upstream = await fetch(`https://ghchart.rshah.org/${username}`, {
    headers: {
      "User-Agent": "portfolio-website",
    },
    next: { revalidate: CACHE_SECONDS },
  });

  if (!upstream.ok) {
    throw new Error("Fallback heatmap upstream failed");
  }

  const rawSvg = await upstream.text();
  const { weeks, maxContribution } = parseGhchartSvgToWeeks(rawSvg);

  if (!weeks.length) {
    throw new Error("Fallback heatmap parse failed");
  }

  const stats = await getPublicStats(username);
  const totalContributions = weeks
    .flatMap((week) => week.days)
    .reduce((sum, day) => sum + day.count, 0);

  return {
    username,
    generatedAt: new Date().toISOString(),
    totalContributions,
    maxContribution,
    weeks,
    stats,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = (searchParams.get("username") || "").trim();

  if (!username || !/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;

  try {
    if (!token) {
      const fallbackPayload = await getHeatmapFallbackPayload(username);

      return NextResponse.json(fallbackPayload, {
        headers: {
          "Cache-Control": `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}`,
        },
      });
    }

    const calendarData = await graphqlRequest<CalendarData>(token, CALENDAR_QUERY, {
      login: username,
    });

    if (!calendarData.user) {
      return NextResponse.json({ error: "GitHub user not found" }, { status: 404 });
    }

    const calendar = calendarData.user.contributionsCollection.contributionCalendar;
    const { weeks, maxContribution } = normalizeWeeks(calendar.weeks);
    const totalStars = await getTotalStars(username, token);

    const payload: GithubHeatmapResponse = {
      username,
      generatedAt: new Date().toISOString(),
      totalContributions: calendar.totalContributions,
      maxContribution,
      weeks,
      stats: {
        publicRepos: calendarData.user.repositories.totalCount,
        followers: calendarData.user.followers.totalCount,
        following: calendarData.user.following.totalCount,
        totalStars,
      },
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch GitHub data";

    return NextResponse.json(
      { error: "GitHub contributions fetch failed", detail: message },
      { status: 502 },
    );
  }
}
