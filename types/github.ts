export type ContributionLevel = 0 | 1 | 2 | 3;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type ContributionWeek = {
  firstDay: string;
  days: ContributionDay[];
};

export type GithubStats = {
  publicRepos: number | null;
  followers: number | null;
  following: number | null;
  totalStars: number | null;
};

export type GithubHeatmapResponse = {
  username: string;
  generatedAt: string;
  totalContributions: number;
  maxContribution: number;
  weeks: ContributionWeek[];
  stats: GithubStats;
};
