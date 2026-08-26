"use client";

import { useState } from "react";
import type { TechEntry } from "@/types/techstack";
import { TECHS } from "@/lib/data/techstack";
import VolumetricGlassInfinity from "./VolumetricGlassInfinity";
import TechVectorIcon from "./TechVectorIcon";
import type { DevOpsTheme } from "@/types/techstack";
import { THEME_COLORS } from "@/lib/data/devops-theme";

function MarqueeItem({ tech }: { tech: TechEntry }) {
  const [isItemHovered, setIsItemHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsItemHovered(true)}
      onMouseLeave={() => setIsItemHovered(false)}
      className="group flex items-center gap-2.5 transition-all duration-300 cursor-pointer shrink-0"
    >
      <div
        className="transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:scale-125"
        style={{
          filter: isItemHovered
            ? `drop-shadow(0 0 10px ${tech.color}dd)`
            : "none",
        }}
      >
        <TechVectorIcon tech={tech} className="h-6 w-6 sm:h-7 sm:w-7" />
      </div>
      <span className="font-mono text-[11px] sm:text-[12px] font-medium text-white/50 group-hover:text-white group-hover:font-bold transition-all duration-300">
        {tech.label}
      </span>
    </div>
  );
}

// ── Single Unified Downward Tech Marquee ──
function UnifiedBottomTechMarquee() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="max-w-[94%] md:max-w-[85%] lg:max-w-5xl xl:max-w-6xl mx-auto w-full overflow-hidden py-4 bg-transparent select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="flex w-max items-center gap-10 sm:gap-14 px-4 animate-marquee-left"
        style={{
          animationPlayState: hovered ? "paused" : "running",
        }}
      >
        {[...TECHS, ...TECHS].map((tech, idx) => (
          <MarqueeItem key={`unified-marq-${tech.label}-${idx}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

// ── Main exported section ─────────────────────────────────────────────────────
export default function TechStack() {
  const [, setHoveredTech] = useState<TechEntry | null>(null);
  const [activeTheme, setActiveTheme] = useState<DevOpsTheme>("galaxy");

  return (
    <>
      {/* CSS Keyframe Animations for Smooth Infinite Marquee */}
      <style jsx global>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 50s linear infinite;
        }
      `}</style>

      <section
        id="skills"
        className="relative min-h-screen flex flex-col justify-center py-16 md:py-24 overflow-hidden"
      >
        {/* Ambient background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 75% 50% at 50% 58%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 40%, transparent 68%)",
              "radial-gradient(ellipse 55% 40% at 30% 40%, rgba(200,214,224,0.055) 0%, transparent 55%)",
              "radial-gradient(ellipse 50% 45% at 72% 65%, rgba(180,200,220,0.045) 0%, transparent 55%)",
            ].join(", "),
          }}
        />

        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
          {/* Centered Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <p className="text-[12px] font-mono tracking-[0.3em] uppercase text-white/30 mb-2">
              Skills I work with
            </p>
            <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em]">
              <span className="text-white font-bold about-heading-size">Tech</span>
              <span className="text-white/65 font-normal ml-4 about-heading-size">Stack</span>
            </h2>
          </div>

          {/* 3D Volumetric Glass Infinity Loop */}
          <div className="relative w-full py-2">
            {/* Color Theme Selector Dropdown (Floating top-right inside the loop parent) */}
            <div className="absolute top-2 right-4 sm:right-6 lg:right-8 z-30">
              <div className="relative inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-950/80 px-3 py-1.5 backdrop-blur-md">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
                  Cosmos:
                </span>
                <select
                  value={activeTheme}
                  onChange={(e) => setActiveTheme(e.target.value as DevOpsTheme)}
                  className="bg-transparent font-mono text-[10.5px] font-bold outline-none cursor-pointer border-none p-0 pr-5 transition-colors duration-300"
                  style={{
                    color: THEME_COLORS[activeTheme].textColor,
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='${encodeURIComponent(THEME_COLORS[activeTheme].textColor)}' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: "right center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "0.9rem",
                  }}
                >
                  <option value="galaxy" className="bg-zinc-950 text-[#38bdf8]">Galaxy</option>
                  <option value="nebula" className="bg-zinc-950 text-[#f472b6]">Nebula</option>
                  <option value="solar" className="bg-zinc-950 text-[#fbbf24]">Solar</option>
                  <option value="aurora" className="bg-zinc-950 text-[#34d399]">Aurora</option>
                  <option value="orchid" className="bg-zinc-950 text-[#e879f9]">Orchid</option>
                  <option value="frost" className="bg-zinc-950 text-[#7dd3fc]">Frost</option>
                </select>
              </div>
            </div>

            <div className="relative flex items-center justify-center min-h-[200px] sm:min-h-[300px] md:min-h-[380px]">
              <div className="w-full">
                <VolumetricGlassInfinity onHoverTech={setHoveredTech} theme={activeTheme} />
              </div>
            </div>
          </div>

          {/* Reduced Gap Before Downward Marquee Stream */}
          <div className="mt-8 sm:mt-10 md:mt-12 mb-6 sm:mb-8">
            <UnifiedBottomTechMarquee />
          </div>
        </div>
      </section>
    </>
  );
}
