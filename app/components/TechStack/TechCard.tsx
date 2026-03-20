"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { TechEntry } from "@/app/types/techstack";
import { CLIP } from "@/app/data/techstack";

type TechCardProps = {
  tech: TechEntry;
  index: number;
  cell: number;
  cols: number;
  onHover: (tech: TechEntry | null) => void;
  colorized: boolean;
};

export function TechCard({
  tech,
  index,
  cell,
  cols,
  onHover,
  colorized,
}: TechCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleHover = (h: boolean) => {
    setHovered(h);
    onHover(h ? tech : null);
  };

  const staggerDelay = colorized ? `${index * 28}ms` : "0ms";
  const showColorIcon = colorized || hovered;
  const showColorBorder = hovered;
  const logoSize = Math.round(cell * 0.265);

  return (
    <div
      style={{
        width: cell,
        height: cell,
        filter: showColorBorder
          ? `drop-shadow(0 0 1.5px ${tech.color})
             drop-shadow(0 0 6px  ${tech.color}aa)
             drop-shadow(0 0 16px ${tech.color}44)`
          : "none",
        transition: "filter 0.4s ease",
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.4,
          delay: (index % cols) * 0.04 + Math.floor(index / cols) * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full h-full"
      >
        {/* Outer diamond → border color */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: CLIP,
            background: showColorBorder ? tech.color : "rgba(255,255,255,0.14)",
            transition: "background 0.4s ease",
          }}
        />
        {/* Inner diamond → dark fill creating the thin ring */}
        <div
          className="absolute"
          style={{ inset: "2.5px", clipPath: CLIP, background: "#060606" }}
        />
        {/* Ambient color glow on hover */}
        <div
          className="absolute"
          style={{
            inset: "2.5px",
            clipPath: CLIP,
            background: showColorBorder
              ? `radial-gradient(circle at 50% 50%, ${tech.color}2e 0%, ${tech.color}12 55%, transparent 78%)`
              : "transparent",
            transition: "background 0.4s ease",
            zIndex: 2,
          }}
        />
        {/* Logo */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tech.img}
            alt={tech.label}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0";
            }}
            style={{
              width: logoSize,
              height: logoSize,
              objectFit: "contain",
              filter: showColorIcon
                ? tech.invert
                  ? `invert(1) brightness(1.25) drop-shadow(0 0 8px ${tech.color}cc)`
                  : `grayscale(0%) brightness(1.3) drop-shadow(0 0 8px ${tech.color}cc)`
                : tech.invert
                  ? "invert(1) grayscale(100%) brightness(0.78)"
                  : "grayscale(100%) brightness(0.82) saturate(0)",
              transition: `filter 0.4s ease ${staggerDelay}`,
            }}
          />
        </div>
        {/* Label below card on hover */}
        <div
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap
                     text-[10px] font-mono tracking-wide pointer-events-none"
          style={{
            color: tech.color,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          {tech.label}
        </div>
      </motion.div>
    </div>
  );
}
