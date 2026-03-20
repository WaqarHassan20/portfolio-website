import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  primary: string;
  secondary: string;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
  rightSlot?: ReactNode;
};

// Shared heading block used by major landing sections.
export default function SectionHeading({
  eyebrow,
  primary,
  secondary,
  className,
  primaryClassName,
  secondaryClassName,
  rightSlot,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="text-[12px] font-mono tracking-[0.3em] uppercase text-white/30 mb-4">
        {eyebrow}
      </p>
      <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em]">
        <span
          className={
            primaryClassName ?? "text-white font-bold about-heading-size"
          }
        >
          {primary}
        </span>
        <span
          className={
            secondaryClassName ??
            "text-white/65 font-normal ml-5 about-heading-size"
          }
        >
          {secondary}
        </span>
        {rightSlot}
      </h2>
    </div>
  );
}
