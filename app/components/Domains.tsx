"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type HitZone = "frontend" | "backend" | "devops" | "fs-be" | "fs-do" | "be-do" | "all";

// ── geometry: viewBox="0 0 900 770" ───────────────────────────────────
// equilateral triangle, d=280, R=240 → ~30 % overlap, ~70 px margin each side
const R = 240;
const C = {
  frontend: { cx: 310, cy: 260 },
  backend:  { cx: 590, cy: 260 },
  devops:   { cx: 450, cy: 502 },
} as const;

// ── which circles glow per hovered zone ───────────────────────────────
const LIT: Record<HitZone, Array<"frontend" | "backend" | "devops">> = {
  frontend: ["frontend"],
  backend:  ["backend"],
  devops:   ["devops"],
  "fs-be":  ["frontend", "backend"],
  "fs-do":  ["frontend", "devops"],
  "be-do":  ["backend", "devops"],
  all:      ["frontend", "backend", "devops"],
};

// ── per-circle: title, sub, skills (comma-separated, 2 text lines) ────
const CIRCLES = [
  {
    key: "frontend" as const,
    title: "Frontend",
    sub: "UI / UX",
    skillLines: ["React, Next.js, TypeScript", "Tailwind CSS, Framer Motion"],
    lx: 148, ly: 210,
  },
  {
    key: "backend" as const,
    title: "Backend",
    sub: "API / DB",
    skillLines: ["Node.js, Express, PostgreSQL", "MongoDB, Redis, GraphQL"],
    lx: 752, ly: 210,
  },
  {
    key: "devops" as const,
    title: "DevOps",
    sub: "CI / CD",
    skillLines: ["Docker, Kubernetes, GitHub Actions", "AWS, Terraform, Linux"],
    lx: 450, ly: 598,
  },
];

// ── labels inside overlap zones ───────────────────────────────────────
const IXLABELS: Array<{ x: number; y: number; lines: string[]; center?: boolean }> = [
  { x: 450, y: 148,               lines: ["Isomorphic Apps"] },
  { x: 340, y: 415,               lines: ["Frontend Ops"]    },
  { x: 560, y: 415,               lines: ["Backend Infra"]   },
  { x: 450, y: 332, center: true, lines: ["FULL STACK", "DEVELOPER"] },
];

// ── invisible hit circles for hover detection ─────────────────────────
const HITS: Array<{ id: HitZone; cx: number; cy: number; r: number }> = [
  { id: "frontend", cx: 148, cy: 220, r: 68 },
  { id: "backend",  cx: 752, cy: 220, r: 68 },
  { id: "devops",   cx: 450, cy: 605, r: 68 },
  { id: "fs-be",    cx: 450, cy: 148, r: 28 },
  { id: "fs-do",    cx: 340, cy: 418, r: 28 },
  { id: "be-do",    cx: 560, cy: 418, r: 28 },
  { id: "all",      cx: 450, cy: 335, r: 36 },
];

export default function Domains() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<HitZone | null>(null);

  const isLit = (key: "frontend" | "backend" | "devops") =>
    active !== null && LIT[active].includes(key);

  return (
    <>
      <section id="domains" ref={ref} className="relative h-screen py-12 px-8 flex flex-col overflow-hidden">
        <div className="max-w-6xl mx-auto w-full flex flex-col flex-1 min-h-0">

          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center py-6 shrink-0"
          >
            <p className="text-[10px] font-mono tracking-[0.65em] uppercase text-white/30 mb-3">
              Skills Intersection
            </p>
            <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em]">
              <span className="text-white font-bold about-heading-size">Main</span>
              <span className="text-white/70 ml-4 about-heading-size">Domain</span>
            </h2>
          </motion.div>

          {/* card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass border border-white/8 rounded-3xl p-6 flex flex-col flex-1 min-h-0"
          >
            <motion.svg
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
              viewBox="0 0 900 770"
              className="w-full h-full flex-1"
              style={{ minHeight: 0 }}
            >
              {/* ── 3 main circles with hover glow ── */}
              {(["frontend", "backend", "devops"] as const).map((key) => (
                <circle
                  key={key}
                  cx={C[key].cx}
                  cy={C[key].cy}
                  r={R}
                  fill={isLit(key) ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)"}
                  stroke={isLit(key) ? "rgba(255,255,255,0.36)" : "rgba(255,255,255,0.10)"}
                  strokeWidth="1"
                  style={{ transition: "fill 0.25s ease, stroke 0.25s ease" }}
                />
              ))}

              {/* ── per-circle: title + sub + plain comma-separated skills ── */}
              {CIRCLES.map(({ key, title, sub, skillLines, lx, ly }) => (
                <g key={key}>
                  <text x={lx} y={ly} textAnchor="middle" fontSize="16" fontFamily="monospace" fontWeight="700" letterSpacing="3" fill="rgba(255,255,255,0.82)" style={{ textTransform: "uppercase" }}>
                    {title}
                  </text>
                  <text x={lx} y={ly + 18} textAnchor="middle" fontSize="10" fontFamily="monospace" letterSpacing="2" fill="rgba(255,255,255,0.28)" style={{ textTransform: "uppercase" }}>
                    {sub}
                  </text>
                  {skillLines.map((line, i) => (
                    <text key={line} x={lx} y={ly + 38 + i * 17} textAnchor="middle" fontSize="10" fontFamily="monospace" letterSpacing="0.8" fill="rgba(255,255,255,0.38)">
                      {line}
                    </text>
                  ))}
                </g>
              ))}

              {/* ── intersection zone labels ── */}
              {IXLABELS.map(({ x, y, lines, center }, idx) => (
                <g key={idx}>
                  {lines.map((line, i) => (
                    <text
                      key={line}
                      x={x} y={y + i * (center ? 15 : 0)}
                      textAnchor="middle"
                      fontSize={center ? "13" : "10"}
                      fontFamily="monospace"
                      fontWeight={center ? "700" : "400"}
                      letterSpacing={center ? "3" : "1.5"}
                      fill={center ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.22)"}
                      style={{ textTransform: "uppercase" }}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              ))}

              {/* ── invisible hit areas — drawn last so they sit on top ── */}
              {HITS.map(({ id, cx, cy, r }) => (
                <circle
                  key={id}
                  cx={cx} cy={cy} r={r}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setActive(id)}
                  onMouseLeave={() => setActive(null)}
                />
              ))}
            </motion.svg>
          </motion.div>

        </div>
      </section>
      <div className="w-full h-px bg-white/8" />
    </>
  );
}
