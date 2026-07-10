"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { TechEntry } from "@/app/types/techstack";

type TechCardProps = {
  tech: TechEntry;
  index: number;
  onHover: (tech: TechEntry | null) => void;
  colorized: boolean;
};

export function TechCard({
  tech,
  index,
  onHover,
  colorized,
}: TechCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleHover = (h: boolean) => {
    setHovered(h);
    onHover(h ? tech : null);
  };

  const showColorIcon = colorized || hovered;
  const showColorBorder = hovered;
  const staggerDelay = colorized ? `${index * 15}ms` : "0ms";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 8) * 0.04 + Math.floor(index / 8) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative aspect-square w-full rounded-xl border bg-black/40 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 group select-none"
      style={{
        borderColor: showColorBorder ? tech.color : "rgba(255,255,255,0.08)",
        filter: showColorBorder
          ? `drop-shadow(0 0 1.5px ${tech.color})
             drop-shadow(0 0 6px  ${tech.color}55)`
          : "none",
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {/* Ambient gradient overlay inside card */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
      />

      {/* Floating glow inside card */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(40px circle at 50% 50%, ${tech.color}1c, transparent)`,
        }}
      />

      {/* Icon Image */}
      <div className="relative z-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tech.img}
          alt={tech.label}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = "0";
          }}
          className="w-9 h-9 object-contain"
          style={{
            filter: showColorIcon
              ? tech.invert
                ? `invert(1) brightness(1.25) drop-shadow(0 0 8px ${tech.color}cc)`
                : `grayscale(0%) brightness(1.3) drop-shadow(0 0 8px ${tech.color}cc)`
              : tech.invert
                ? "invert(1) grayscale(100%) brightness(0.6)"
                : "grayscale(100%) brightness(0.68) saturate(0)",
            transition: `filter 0.4s ease ${staggerDelay}`,
          }}
        />
      </div>

      {/* Skill Title Slide-in Label */}
      <div className="absolute bottom-2.5 text-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20 pointer-events-none">
        <span className="text-[7.5px] font-mono text-white/40 tracking-[0.2em] uppercase block">Skill</span>
        <span className="block text-[11px] font-mono font-bold text-white tracking-wide">{tech.label}</span>
      </div>
    </motion.div>
  );
}
