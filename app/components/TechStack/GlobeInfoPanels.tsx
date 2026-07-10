"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { TechEntry } from "@/types/techstack";
import { CATEGORY_MAP } from "@/lib/data/techstack";

/* ── Shared card shell ────────────────────────────────────────────────────── */
function CardShell({
  color,
  gradient,
  children,
}: {
  color: string;
  gradient: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-[210px] p-[18px_16px_16px] rounded-xl z-10 relative"
      style={{
        background: gradient,
        border: `1px solid ${color}28`,
        boxShadow: `0 4px 28px ${color}0e`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Left panel — "What it is" ────────────────────────────────────────────── */
export function GlobeLeftPanel({ tech }: { tech: TechEntry | null }) {
  return (
    <AnimatePresence mode="wait">
      {tech && (
        <motion.div
          key={tech.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <CardShell
            color={tech.color}
            gradient={`linear-gradient(135deg, ${tech.color}12 0%, rgba(10,10,10,0.92) 100%)`}
          >
            {/* Header: icon + name + category */}
            <div className="flex items-center gap-2.5 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.img}
                alt={tech.label}
                className="w-7 h-7 object-contain shrink-0 relative z-10"
                style={{
                  filter: tech.invert
                    ? `invert(1) brightness(1.2) drop-shadow(0 0 7px ${tech.color}88)`
                    : `drop-shadow(0 0 7px ${tech.color}88)`,
                }}
              />
              <div>
                <div
                  className="font-mono text-[13px] font-bold tracking-wider leading-tight"
                  style={{
                    color: tech.color,
                    textShadow: `0 0 12px ${tech.color}55`,
                  }}
                >
                  {tech.label}
                </div>
                <div
                  className="font-mono text-[9px] uppercase tracking-[0.18em] mt-1"
                  style={{
                    color: `${tech.color}80`,
                  }}
                >
                  {CATEGORY_MAP[tech.label] ?? "Tool"}
                </div>
              </div>
            </div>

            {/* Separator */}
            <div
              className="h-px mb-3"
              style={{
                background: `linear-gradient(90deg, ${tech.color}44, ${tech.color}18, transparent)`,
              }}
            />

            {/* Section label */}
            <div
              className="font-mono text-[9px] uppercase tracking-[0.20em] mb-2"
              style={{
                color: `${tech.color}65`,
              }}
            >
              What it is
            </div>

            {/* Description */}
            <p className="font-mono text-[11px] text-[#cccccc] leading-relaxed m-0">
              {tech.desc}
            </p>
          </CardShell>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Right panel — "In my stack" ──────────────────────────────────────────── */
export function GlobeRightPanel({ tech }: { tech: TechEntry | null }) {
  return (
    <AnimatePresence mode="wait">
      {tech && (
        <motion.div
          key={tech.label}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <CardShell
            color={tech.color}
            gradient={`linear-gradient(135deg, rgba(10,10,10,0.92) 0%, ${tech.color}10 100%)`}
          >
            {/* Section label */}
            <div
              className="font-mono text-[9px] uppercase tracking-[0.20em] mb-2"
              style={{
                color: `${tech.color}65`,
              }}
            >
              In my stack
            </div>

            {/* Separator */}
            <div
              className="h-px mb-3"
              style={{
                background: `linear-gradient(90deg, transparent, ${tech.color}20, ${tech.color}44)`,
              }}
            />

            {/* Use description */}
            <p className="font-mono text-[11px] text-[#A9A9A9] leading-relaxed m-0 mb-3.5">
              {tech.use}
            </p>

            {/* Category pill */}
            <div
              className="inline-flex px-2.5 py-1 rounded-full font-mono text-[8.5px] uppercase tracking-wider border"
              style={{
                background: `${tech.color}18`,
                borderColor: `${tech.color}30`,
                color: `${tech.color}cc`,
              }}
            >
              {CATEGORY_MAP[tech.label] ?? "Tool"}
            </div>
          </CardShell>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
