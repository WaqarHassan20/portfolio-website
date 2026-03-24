import { memo, useMemo } from "react";
import type { ContributionLevel, ContributionWeek } from "@/app/types/github";

type ContributionGraphProps = {
  weeks: ContributionWeek[];
};

type MonthLabel = {
  label: string;
  weekIndex: number;
};

const DAY_CLASSES: Record<ContributionLevel, string> = {
  0: "bg-zinc-800/90",
  1: "bg-[#1f7a4a]",
  2: "bg-[#2ea043]",
  3: "bg-[#39d353]",
};

function formatTooltip(date: string, count: number) {
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (count === 1) {
    return `1 contribution on ${formattedDate}`;
  }

  return `${count} contributions on ${formattedDate}`;
}

function buildMonthLabels(weeks: ContributionWeek[]): MonthLabel[] {
  const labels: MonthLabel[] = [];
  let previousMonth = "";

  weeks.forEach((week, weekIndex) => {
    const weekDate = new Date(week.firstDay);
    if (Number.isNaN(weekDate.getTime())) return;

    const monthName = weekDate.toLocaleDateString(undefined, { month: "short" });

    if (monthName !== previousMonth) {
      labels.push({ label: monthName, weekIndex });
      previousMonth = monthName;
    }
  });

  return labels;
}

function ContributionGraphBase({ weeks }: ContributionGraphProps) {
  const monthLabels = useMemo(() => buildMonthLabels(weeks), [weeks]);

  return (
    <div className="overflow-x-auto scroll-smooth [scrollbar-width:thin] [scrollbar-color:#3f3f46_transparent]">
      <div className="inline-block min-w-[820px]">
        <div className="relative h-6 mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
          {monthLabels.map((month) => (
            <span
              key={`${month.label}-${month.weekIndex}`}
              className="absolute"
              style={{ left: `${month.weekIndex * 15}px` }}
            >
              {month.label}
            </span>
          ))}
        </div>

        <div className="flex gap-[3px] pb-1">
          {weeks.map((week) => (
            <div key={week.firstDay} className="flex flex-col gap-[3px]">
              {week.days.map((day) => (
                <div
                  key={day.date}
                  className={`size-3 rounded-[3px] ${DAY_CLASSES[day.level]}`}
                  title={formatTooltip(day.date, day.count)}
                  aria-label={formatTooltip(day.date, day.count)}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">
          <span>Less</span>
          {[0, 1, 2, 3].map((level) => (
            <span
              key={level}
              className={`size-3 rounded-[3px] ${DAY_CLASSES[level as ContributionLevel]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

const ContributionGraph = memo(ContributionGraphBase);

export default ContributionGraph;
