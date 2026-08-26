"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { TechEntry } from "@/types/techstack";
import TechVectorIcon from "./TechVectorIcon";

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

      {/* Solid Vector Icon */}
      <div
        className="relative z-10 shrink-0"
        style={{
          filter: showColor
            ? `drop-shadow(0 0 6px ${tech.color}aa)`
            : "grayscale(100%) brightness(0.7)",
          transition: `filter 0.35s ease ${staggerDelay}`,
        }}
      >
        <TechVectorIcon tech={tech} className="w-4 h-4" />
      </div>

      {/* Label */}
      <span
        className={`text-[11px] font-mono relative z-10 whitespace-nowrap tracking-wide transition-colors duration-300 ${
          showColor ? "text-white/90" : "text-white/50"
        }`}
      >
        {tech.label}
      </span>
    </motion.div>
  );
}
