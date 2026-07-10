"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { TechEntry } from "@/types/techstack";

type TechCardProps = {
  tech: TechEntry;
  index: number;
  onHover: (tech: TechEntry | null) => void;
  colorized: boolean;
};

export function TechCard({ tech, index, onHover, colorized }: TechCardProps) {
  const [hovered, setHovered] = useState(false);

  const showColor = colorized || hovered;
  const staggerDelay = colorized ? `${index * 12}ms` : "0ms";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.025,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="inline-flex items-center gap-2 px-3 py-2.5 rounded-full border cursor-pointer select-none
                 transition-all duration-300 group relative overflow-hidden"
      style={{
        borderColor: showColor
          ? `${tech.color}55`
          : "rgba(255,255,255,0.08)",
        background: showColor
          ? `${tech.color}0d`
          : "rgba(255,255,255,0.02)",
        boxShadow: hovered
          ? `0 0 10px ${tech.color}22, 0 0 24px ${tech.color}11`
          : "none",
      }}
      onMouseEnter={() => { setHovered(true); onHover(tech); }}
      onMouseLeave={() => { setHovered(false); onHover(null); }}
    >
      {/* subtle inner glow on hover */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at center, ${tech.color}18, transparent 70%)` }}
      />

      {/* Icon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tech.img}
        alt={tech.label}
        onError={(e) => { (e.currentTarget as HTMLImageElement).classList.add("opacity-0"); }}
        className="w-4 h-4 object-contain shrink-0 relative z-10"
        style={{
          filter: showColor
            ? tech.invert
              ? `invert(1) brightness(1.3) drop-shadow(0 0 5px ${tech.color}cc)`
              : `grayscale(0%) brightness(1.2) drop-shadow(0 0 5px ${tech.color}cc)`
            : tech.invert
              ? "invert(1) grayscale(100%) brightness(0.55)"
              : "grayscale(100%) brightness(0.6) saturate(0)",
          transition: `filter 0.35s ease ${staggerDelay}`,
        }}
      />

      {/* Label */}
      <span
        className={`text-[11px] font-mono relative z-10 whitespace-nowrap tracking-wide transition-colors duration-300 ${
          showColor ? "text-white/85" : "text-white/40"
        }`}
      >
        {tech.label}
      </span>
    </motion.div>
  );
}
