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

// ── per-circle: title, sub, skills (dot-separated, 2 skill rows) ────
const CIRCLES = [
  {
    key: "frontend" as const,
    title: "Frontend",
    sub: "UI / UX",
    skillRows: [["React", "Next.js", "TypeScript"], ["Tailwind CSS", "Framer Motion"]],
    lx: 200, ly: 210,
  },
  {
    key: "backend" as const,
    title: "Backend",
    sub: "API / DB",
    skillRows: [["Node.js", "Express", "PostgreSQL"], ["MongoDB", "Redis", "GraphQL"]],
    lx: 700, ly: 210,
  },
  {
    key: "devops" as const,
    title: "DevOps",
    sub: "CI / CD",
    skillRows: [["Docker", "Kubernetes", "GitHub Actions"], ["AWS", "Terraform", "Linux"]],
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
  // full circles — match actual circle geometry so the whole circle is hoverable
  { id: "frontend", cx: 310, cy: 260, r: 240 },
  { id: "backend",  cx: 590, cy: 260, r: 240 },
  { id: "devops",   cx: 450, cy: 502, r: 240 },
  // intersection zones drawn AFTER so they sit on top and override main circle hits
  { id: "fs-be",    cx: 450, cy: 148, r: 28 },
  { id: "fs-do",    cx: 340, cy: 418, r: 28 },
  { id: "be-do",    cx: 560, cy: 418, r: 28 },
  { id: "all",      cx: 450, cy: 335, r: 36 },
];

export default function Domains() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<HitZone | null>(null);

  const isSingleHover = active === "frontend" || active === "backend" || active === "devops";

  const getVariant = (key: "frontend" | "backend" | "devops"): "glow" | "dim" | "lit" | "default" => {
    if (!active) return "default";
    if (isSingleHover) return active === key ? "glow" : "dim";
    return LIT[active].includes(key) ? "lit" : "default";
  };

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
            <p className="text-[12px] font-mono tracking-[0.3em] uppercase text-white/30 mb-3">
              Skills Intersection
            </p>


            <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em]">
              <span className="text-white font-bold text-5xl">Main</span>
              <span className="text-white/70 ml-6 text-5xl">Domains</span>
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
              {/* ── 3 main circles with animated glow / dim ── */}
              {(["frontend", "backend", "devops"] as const).map((key) => {
                const v = getVariant(key);
                return (
                  <motion.circle
                    key={key}
                    cx={C[key].cx}
                    cy={C[key].cy}
                    r={R}
                    strokeWidth="1"
                    animate={{
                      fill:
                        v === "dim"  ? "rgba(255,255,255,0.005)" :
                        v === "glow" ? "rgba(255,255,255,0.11)"  :
                        v === "lit"  ? "rgba(255,255,255,0.07)"  :
                                       "rgba(255,255,255,0.03)",
                      stroke:
                        v === "dim"  ? "rgba(255,255,255,0.04)" :
                        v === "glow" ? "rgba(255,255,255,0.55)" :
                        v === "lit"  ? "rgba(255,255,255,0.36)" :
                                       "rgba(255,255,255,0.10)",
                      opacity: v === "dim" ? 0.15 : 1,
                      filter:
                        v === "glow"
                          ? "drop-shadow(0 0 18px rgba(255,255,255,0.45)) drop-shadow(0 0 40px rgba(255,255,255,0.2))"
                          : "drop-shadow(0 0 0px rgba(255,255,255,0))",
                    }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  />
                );
              })}

              {/* ── per-circle: title + sub + skill rows with dot separators ── */}
              {CIRCLES.map(({ key, title, sub, skillRows, lx, ly }) => (
                <g key={key}>
                  <text x={lx} y={ly} textAnchor="middle" fontSize="22" fontFamily="monospace" fontWeight="700" letterSpacing="3" fill="rgba(255,255,255,0.82)" style={{ textTransform: "uppercase" }}>
                    {title}
                  </text>
                  <text x={lx} y={ly + 18} textAnchor="middle" fontSize="10" fontFamily="monospace" letterSpacing="2" fill="rgba(255,255,255,0.28)" style={{ textTransform: "uppercase" }}>
                    {sub}
                  </text>
                  {skillRows.map((row, i) => (
                    <text key={i} x={lx} y={ly + 38 + i * 17} textAnchor="middle" fontSize="10" fontFamily="monospace" letterSpacing="0.8">
                      {row.flatMap((skill, j) =>
                        j === 0
                          ? [<tspan key={skill} fill="rgba(255,255,255,0.38)">{skill}</tspan>]
                          : [
                              <tspan key={`d${j}`} fill="rgba(255,255,255,0.85)"> · </tspan>,
                              <tspan key={skill} fill="rgba(255,255,255,0.38)">{skill}</tspan>,
                            ]
                      )}
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
      <div className="my-32 w-full h-px bg-white/8" />
    </>
  );
}
