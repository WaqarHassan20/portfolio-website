"use client";
import { AnimatePresence, motion } from "framer-motion";
import type { TechEntry } from "@/app/types/techstack";
import { CATEGORY_MAP } from "@/app/data/techstack";

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
      style={{
        background: gradient,
        border: `1px solid ${color}28`,
        borderRadius: 14,
        padding: "18px 16px 16px",
        boxShadow: `0 4px 28px ${color}0e`,
        width: 210,
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
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.img}
                alt={tech.label}
                style={{
                  width: 30,
                  height: 30,
                  objectFit: "contain",
                  flexShrink: 0,
                  filter: tech.invert
                    ? `invert(1) brightness(1.2) drop-shadow(0 0 7px ${tech.color}88)`
                    : `drop-shadow(0 0 7px ${tech.color}88)`,
                }}
              />
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: tech.color, letterSpacing: "0.06em", textShadow: `0 0 12px ${tech.color}55`, lineHeight: 1.2 }}>
                  {tech.label}
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: `${tech.color}80`, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 3 }}>
                  {CATEGORY_MAP[tech.label] ?? "Tool"}
                </div>
              </div>
            </div>

            {/* Separator */}
            <div style={{ height: 1, background: `linear-gradient(90deg, ${tech.color}44, ${tech.color}18, transparent)`, marginBottom: 12 }} />

            {/* Section label */}
            <div style={{ fontFamily: "monospace", fontSize: 9, color: `${tech.color}65`, letterSpacing: "0.20em", textTransform: "uppercase", marginBottom: 8 }}>
              What it is
            </div>

            {/* Description */}
            <p style={{ fontFamily: "monospace", fontSize: 11, color: "#cccccc", lineHeight: 1.72, margin: 0 }}>
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
            <div style={{ fontFamily: "monospace", fontSize: 9, color: `${tech.color}65`, letterSpacing: "0.20em", textTransform: "uppercase", marginBottom: 8 }}>
              In my stack
            </div>

            {/* Separator */}
            <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${tech.color}20, ${tech.color}44)`, marginBottom: 12 }} />

            {/* Use description */}
            <p style={{ fontFamily: "monospace", fontSize: 11, color: "#A9A9A9", lineHeight: 1.72, margin: "0 0 14px" }}>
              {tech.use}
            </p>

            {/* Category pill */}
            <div
              style={{
                display: "inline-flex",
                padding: "3px 10px",
                borderRadius: 999,
                background: `${tech.color}18`,
                border: `1px solid ${tech.color}30`,
                fontFamily: "monospace",
                fontSize: 8.5,
                color: `${tech.color}cc`,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
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
