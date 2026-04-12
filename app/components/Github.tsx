"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  FolderGit2,
  Github as GithubIcon,
  Star,
  UserPlus,
  Users,
} from "lucide-react";
import SectionHeading from "@/app/components/shared/SectionHeading";
import ContributionGraph from "@/app/components/github/ContributionGraph";
import { GITHUB_PROFILE } from "@/app/data/github";
import type { GithubHeatmapResponse } from "@/app/types/github";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Github() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [heatmapData, setHeatmapData] = useState<GithubHeatmapResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGithubData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/github-heatmap?username=${encodeURIComponent(GITHUB_PROFILE.username)}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("GitHub stats failed");
        }

        const payload = (await response.json()) as GithubHeatmapResponse;

        if (!Array.isArray(payload.weeks) || typeof payload.totalContributions !== "number") {
          throw new Error("Invalid heatmap payload");
        }

        setHeatmapData(payload);
      } catch {
        setHeatmapData(null);
      } finally {
        setIsLoading(false);
      }
    }

    void loadGithubData();
    return () => {
      controller.abort();
    };
  }, []);

  const stats = useMemo(() => {
    const activeDays =
      heatmapData?.weeks
        .flatMap((week) => week.days)
        .filter((day) => day.count > 0)
        .map((day) => new Date(day.date).getTime()) ?? [];

    const lastUpdated = activeDays.sort((a, b) => b - a)[0];

    return {
      publicRepos: heatmapData?.stats.publicRepos ?? null,
      followers: heatmapData?.stats.followers ?? null,
      following: heatmapData?.stats.following ?? null,
      totalStars: heatmapData?.stats.totalStars ?? null,
      totalContributions: heatmapData?.totalContributions ?? null,
      maxContribution: heatmapData?.maxContribution ?? null,
      lastUpdatedText: lastUpdated
        ? new Date(lastUpdated).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "N/A",
    };
  }, [heatmapData]);

  const contributionWaveUrl =
    `https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_PROFILE.username}` +
    "&bg_color=09090B" +
    "&color=8b949e" +
    "&line=2ea043" +
    "&point=39d353" +
    "&area=true" +
    "&area_color=0f2d1c" +
    "&hide_border=true";

  return (
    <section
      id="github"
      ref={ref}
      className="relative scroll-mt-24 min-h-screen px-4 sm:px-5 md:px-6 lg:px-8 pt-14 sm:pt-18 pb-8 sm:pb-10"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-10 text-center">
          <SectionHeading
            eyebrow="Open Source"
            primary="GitHub"
            secondary="Activity"
            className="text-center"
            primaryClassName="text-white font-bold about-heading-size"
            secondaryClassName="text-white/65 font-normal ml-2 sm:ml-4 about-heading-size"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-4 rounded-3xl border border-white/10 bg-white/2 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-white/45">
                Profile
              </p>
              <GithubIcon size={20} className="text-white/50" />
            </div>

            <h3 className="font-jetbrains text-2xl sm:text-3xl text-white/90 tracking-tight text-center sm:text-left">
              {GITHUB_PROFILE.displayName}
            </h3>
            <p className="font-mono text-sm text-white/45 mt-2 text-center sm:text-left">
              @{GITHUB_PROFILE.username}
            </p>
            <p className="text-sm leading-7 text-white/55 mt-5 text-center sm:text-left">
              {GITHUB_PROFILE.intro}
            </p>

            <div className="flex flex-wrap gap-2 mt-6 justify-center sm:justify-start">
              {GITHUB_PROFILE.focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-white/12 bg-white/2 px-3 py-2 font-jetbrains text-[10px] uppercase tracking-[0.16em] text-white/55"
                >
                  {area}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-6">
              <MiniStat
                icon={<FolderGit2 size={17} />}
                label="Repos"
                value={stats.publicRepos}
              />
              <MiniStat
                icon={<Users size={17} />}
                label="Followers"
                value={stats.followers}
              />
              <MiniStat
                icon={<Star size={17} />}
                label="Stars"
                value={stats.totalStars}
              />
              <MiniStat
                icon={<UserPlus size={17} />}
                label="Following"
                value={stats.following}
              />
            </div>

            <a
              href={GITHUB_PROFILE.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-jetbrains text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:bg-white hover:text-black mx-auto sm:mx-0"
            >
              Visit GitHub
              <ArrowUpRight size={12} />
            </a>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.06, ease: EASE }}
            className="lg:col-span-8 rounded-3xl border border-white/10 bg-white/2 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-white/45">
                Contribution Graphs
              </p>
              <a
                href={`${GITHUB_PROFILE.profileUrl}?tab=contributions`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-jetbrains text-[10px] uppercase tracking-[0.18em] text-white/65 transition-colors duration-300 hover:bg-white hover:text-black"
              >
                Open GitHub
                <ArrowUpRight size={11} />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-2xl border border-white/8 bg-zinc-950 p-2.5 sm:p-5 overflow-hidden">
                {isLoading ? (
                  <div className="space-y-3 animate-pulse">
                    <div className="h-6 w-48 rounded bg-white/10" />
                    <div className="h-24 rounded bg-white/5" />
                    <div className="h-4 w-40 rounded bg-white/10" />
                  </div>
                ) : heatmapData ? (
                  <>
                    <ContributionGraph weeks={heatmapData.weeks} />
                    <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/50">
                      <span>
                        Total: <span className="text-white/75">{stats.totalContributions ?? "--"}</span>
                      </span>
                      <span>
                        Peak day: <span className="text-white/75">{stats.maxContribution ?? "--"}</span>
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="font-mono text-xs text-white/45">
                    Contribution heatmap is unavailable right now.
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/35 p-2.5 sm:p-4 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={contributionWaveUrl}
                  alt={`${GITHUB_PROFILE.username} contribution activity wave graph`}
                  className="block w-full max-w-full h-auto opacity-95"
                  loading="lazy"
                />
              </div>
            </div>

          </motion.article>
        </div>
      </div>
      <div className="w-full h-0 md:h-px sm:mt-40 bg-white/8" />
    </section>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number | null;
}) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/2 px-2.5 py-2">
      <div className="inline-flex items-center gap-1 text-white/45">{icon}</div>
      <p className="mt-1 font-jetbrains text-sm text-white/88 tabular-nums">
        {value ?? "--"}
      </p>
      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40 mt-0.5">
        {label}
      </p>
    </div>
  );
}
