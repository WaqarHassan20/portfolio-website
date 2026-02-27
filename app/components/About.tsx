"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Code2, Cloud, Brain } from "lucide-react";

/* ── data ───────────────────────────────────────────────────────── */
type Zone = {
  id: string;
  label: string;
  icon?: React.ElementType;
  skills?: string[];
  desc: string;
  type: "circle" | "intersection";
};

const ZONES: Zone[] = [
  {
    id: "fullstack",
    label: "Full Stack",
    icon: Code2,
    type: "circle",
    skills: ["React / Next.js", "Node.js / Bun", "TypeScript", "PostgreSQL", "REST & GraphQL", "Tailwind CSS"],
    desc: "End-to-end product engineering — from pixel-perfect UIs to robust backend APIs and databases.",
  },
  {
    id: "devops",
    label: "DevOps",
    icon: Cloud,
    type: "circle",
    skills: ["Docker & K8s", "AWS / GCP", "CI/CD Pipelines", "Terraform", "Nginx", "Prometheus"],
    desc: "Infrastructure as code, containerization, and automated delivery pipelines that ship reliably.",
  },
  {
    id: "genai",
    label: "Gen AI",
    icon: Brain,
    type: "circle",
    skills: ["LangChain / LLMs", "RAG Pipelines", "Prompt Engineering", "OpenAI API", "Vector DBs", "AI Agents"],
    desc: "Building intelligent apps with LLMs, retrieval-augmented generation, and AI agent frameworks.",
  },
  {
    id: "fs-devops",
    label: "Cloud-Native Dev",
    type: "intersection",
    desc: "Full-stack apps built and deployed on scalable cloud infrastructure.",
  },
  {
    id: "devops-ai",
    label: "AI Ops",
    type: "intersection",
    desc: "MLOps pipelines, model serving, monitoring, and automated deployment.",
  },
  {
    id: "fs-ai",
    label: "AI-Powered Apps",
    type: "intersection",
    desc: "LLM-integrated products with great UX and solid architecture.",
  },
  {
    id: "center",
    label: "The Sweet Spot",
    type: "intersection",
    desc: "Where all three meet — intelligent, scalable, full-product systems built end-to-end.",
  },
];

/* ── SVG Venn ───────────────────────────────────────────────────── */
function VennSVG({ active, onEnter, onLeave }: {
  active: string | null;
  onEnter: (id: string) => void;
  onLeave: () => void;
}) {
  const R = 130;
  // Triangle arrangement — each circle centre
  const C = [
    { id: "fullstack", cx: 190, cy: 160 },
    { id: "devops",    cx: 370, cy: 160 },
    { id: "genai",     cx: 280, cy: 310 },
  ];
  // Intersection hit-zone centres (approximate)
  const INT = [
    { id: "fs-devops",  cx: 280, cy: 138 },
    { id: "fs-ai",      cx: 218, cy: 262 },
    { id: "devops-ai",  cx: 342, cy: 262 },
    { id: "center",     cx: 280, cy: 222 },
  ];

  const dimmed = (id: string) => active !== null && active !== id;
  const lit    = (id: string) => active === id;

  return (
    <svg
      viewBox="0 0 560 470"
      className="w-full max-w-120"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* soft radial fill for active circle */}
        {C.map(c => (
          <radialGradient key={c.id} id={`rg-${c.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="white" stopOpacity={lit(c.id) ? 0.10 : 0.03} />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>

      {/* ── circles ── */}
      {C.map(c => (
        <g key={c.id}
          style={{ cursor: "pointer" }}
          onMouseEnter={() => onEnter(c.id)}
          onMouseLeave={onLeave}
        >
          <circle
            cx={c.cx} cy={c.cy} r={R}
            fill={`url(#rg-${c.id})`}
            stroke="white"
            strokeWidth={lit(c.id) ? 1.2 : 0.6}
            strokeOpacity={dimmed(c.id) ? 0.08 : lit(c.id) ? 0.55 : 0.22}
            style={{ transition: "all 0.35s" }}
          />
        </g>
      ))}

      {/* ── intersection hit zones (invisible) ── */}
      {INT.map(z => (
        <circle
          key={z.id}
          cx={z.cx} cy={z.cy}
          r={z.id === "center" ? 34 : 26}
          fill="transparent"
          style={{ cursor: "pointer" }}
          onMouseEnter={() => onEnter(z.id)}
          onMouseLeave={onLeave}
        />
      ))}

      {/* ── circle labels ── */}
      {C.map((c, i) => {
        const zone = ZONES.find(z => z.id === c.id)!;
        const Icon = zone.icon!;
        // label positions: above-left, above-right, below-center
        const lx = [110, 370, 280][i];
        const ly = [  8,   8, 426][i];
        return (
          <g key={c.id}
            style={{
              opacity: dimmed(c.id) ? 0.2 : 1,
              transition: "opacity 0.35s",
              cursor: "pointer",
            }}
            onMouseEnter={() => onEnter(c.id)}
            onMouseLeave={onLeave}
          >
            <foreignObject x={lx - 42} y={ly} width={84} height={36}>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              }}>
                <Icon style={{ width: 13, height: 13, color: lit(c.id) ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }} />
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  color: lit(c.id) ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.35)",
                  fontFamily: "monospace", letterSpacing: "0.05em", whiteSpace: "nowrap",
                  transition: "color 0.35s",
                }}>
                  {zone.label}
                </span>
              </div>
            </foreignObject>
          </g>
        );
      })}

      {/* ── intersection labels ── */}
      {INT.map(z => {
        const zone = ZONES.find(g => g.id === z.id)!;
        const words = zone.label.split(" ");
        return (
          <text
            key={z.id}
            textAnchor="middle"
            fontFamily="monospace"
            fontSize={z.id === "center" ? 8.5 : 7.5}
            fontWeight={z.id === "center" ? "700" : "500"}
            fill="white"
            fillOpacity={lit(z.id) ? 0.75 : dimmed(z.id) ? 0.08 : 0.28}
            style={{ pointerEvents: "none", transition: "fill-opacity 0.35s" }}
          >
            {words.map((w, wi) => (
              <tspan key={wi} x={z.cx} dy={wi === 0 ? z.cy - (words.length - 1) * 7 : 13}>{w}</tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}

/* ── detail panel ───────────────────────────────────────────────── */
function DetailPanel({ zone }: { zone: Zone | null }) {
  return (
    <div className="flex-1 min-h-65 flex items-start">
      <AnimatePresence mode="wait">
        {!zone ? (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="text-white/20 text-sm font-mono mt-4"
          >
            ← hover any circle or intersection
          </motion.p>
        ) : (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25 }}
            className="w-full rounded-2xl p-6 border"
            style={{
              background: "rgba(255,255,255,0.035)",
              borderColor: "rgba(255,255,255,0.09)",
            }}
          >
            {/* header */}
            <div className="flex items-center gap-3 mb-4">
              {zone.icon && (
                <div className="w-9 h-9 rounded-xl flex items-center justify-center border"
                  style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)" }}>
                  <zone.icon style={{ width: 16, height: 16, color: "rgba(255,255,255,0.65)" }} />
                </div>
              )}
              <div>
                <div className="font-semibold text-white/75 text-base tracking-tight">{zone.label}</div>
                <div className="text-white/25 text-xs font-mono">
                  {zone.type === "circle" ? "Core Discipline" : "Intersection"}
                </div>
              </div>
            </div>

            <p className="text-white/40 text-sm leading-relaxed mb-5">{zone.desc}</p>

            {zone.skills && (
              <>
                <div className="w-full h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />
                <div className="flex flex-wrap gap-2">
                  {zone.skills.map(s => (
                    <span key={s}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        color: "rgba(255,255,255,0.42)",
                      }}
                    >{s}</span>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── main component ─────────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [active, setActive] = useState<string | null>(null);

  const activeZone = active ? ZONES.find(z => z.id === active) ?? null : null;

  return (
    <section id="about" ref={sectionRef} className="relative pt-8 pb-16 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 right-0 w-px h-full bg-linear-to-b from-transparent via-white/4 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/40 text-sm font-mono mb-6 cursor-pointer hover:border-white/25 hover:text-white/65 transition-all duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
            About
          </button>
          <h2 className="text-4xl sm:text-6xl font-semibold text-white/70 mb-4">About</h2>
          <p className="text-white/30 max-w-xl mx-auto text-base">
            Three disciplines. One developer. Infinite possibilities at their intersection.
          </p>
        </motion.div>

        {/* venn + panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-center lg:items-start gap-12"
        >
          <div className="w-full lg:w-auto flex justify-center shrink-0">
            <VennSVG active={active} onEnter={setActive} onLeave={() => setActive(null)} />
          </div>
          <DetailPanel zone={activeZone} />
        </motion.div>
      </div>
    </section>
  );
}
