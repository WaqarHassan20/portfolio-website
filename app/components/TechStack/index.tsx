"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { TechEntry } from "@/types/techstack";
import { TECHS } from "@/lib/data/techstack";
import { TechCard } from "./TechCard";
import { IconCloud3D } from "./IconCloud3D";
import { GlobeLeftPanel, GlobeRightPanel } from "./GlobeInfoPanels";

// ── Domain grouping configuration ──────────────────────────────────────────
const DOMAINS = [
  {
    key: "devops",
    label: "DevOps & Infrastructure",
    color: "#3b82f6",      // blue
    dot: "bg-blue-500",
    labels: [
      "Docker", "Kubernetes", "AWS", "DigitalOcean", "Cloudflare", "Vercel",
      "Terraform", "Ansible", "Helm", "Vault", "ArgoCD", "GH Actions",
      "Jenkins", "Prometheus", "Grafana", "Nginx", "Bash", "Turborepo",
    ],
  },
  {
    key: "mern",
    label: "MERN Stack",
    color: "#a855f7",      // purple
    dot: "bg-purple-500",
    labels: [
      "React", "Next.js", "Node.js", "Express", "MongoDB",
      "GraphQL", "tRPC", "Socket.IO", "Bun", "Hono", "FastAPI",
    ],
  },
  {
    key: "tools",
    label: "Languages & Tools",
    color: "#64748b",      // slate
    dot: "bg-slate-400",
    labels: [
      "JavaScript", "TypeScript", "Python", "C", "C++", "Java", "C#",
      "PostgreSQL", "Redis", "Prisma", "Drizzle", "ClickHouse", "TimescaleDB",
      "Kafka", "RabbitMQ", "JWT", "LangChain", "Postman",
      "Jest", "Vitest", "Cypress", "HTML5", "CSS3", "Tailwind CSS",
      "shadcn/ui", "Chart.js", "Jupyter", "Figma", "Git",
    ],
  },
];

function getDomainTechs(labelList: string[]): TechEntry[] {
  return labelList
    .map((lbl) => TECHS.find((t) => t.label === lbl))
    .filter(Boolean) as TechEntry[];
}

// ── Mobile: scrolling marquee + collapsible skill lists ──────────────────────
function MobileTechMarquee() {
  const [isOpen, setIsOpen] = useState(false);
  const rows = [
    TECHS.filter((_, i) => i % 4 === 0),
    TECHS.filter((_, i) => i % 4 === 1),
    TECHS.filter((_, i) => i % 4 === 2),
    TECHS.filter((_, i) => i % 4 === 3),
  ];

  return (
    <div className="md:hidden pl-8 pr-4 pt-2 pb-10 sm:pl-10 sm:pr-5">
      <div className="mb-8 text-center">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          Skills I work with
        </p>
        <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em]">
          <span className="text-white font-bold about-heading-size">Tech</span>
          <span className="ml-5 text-white/65 font-normal about-heading-size">Stack</span>
        </h2>
      </div>

      <div className="space-y-2.5">
        {rows.map((row, rowIndex) => {
          const dir = rowIndex % 2 === 0 ? 1 : -1;
          return (
            <div key={rowIndex} className="overflow-hidden py-2">
              <motion.div
                className="flex w-max items-center gap-6 px-3"
                animate={{ x: dir === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: 14 + rowIndex * 2, repeat: Infinity, ease: "linear" }}
              >
                {[...row, ...row].map((tech, idx) => (
                  <div
                    key={`${rowIndex}-${tech.label}-${idx}`}
                    className="flex min-w-max items-center justify-center opacity-80 transition-opacity"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tech.img} alt={tech.label} className="h-6 w-6 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.28)]" />
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Accordion trigger button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-5 py-2.5 rounded-full border border-white/12 bg-white/3 font-mono text-[10.5px] uppercase tracking-wider text-white/70 hover:bg-white hover:text-black transition-colors"
        >
          {isOpen ? "Hide Skills List" : "Show All Skills List"}
        </button>
      </div>

      {/* Accordion list */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 flex flex-col gap-6 overflow-hidden"
          >
            {DOMAINS.map((domain) => {
              const techs = getDomainTechs(domain.labels);
              return (
                <div key={domain.key} className="border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-2 h-2 rounded-full ${domain.dot}`} />
                    <span className="font-mono text-[10.5px] uppercase tracking-widest text-white/80 font-bold">
                      {domain.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {techs.map((tech) => (
                      <span
                        key={tech.label}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/6 bg-white/2 font-mono text-[10px] text-white/60"
                      >
                        {tech.label}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Domain-grouped pill grid ─────────────────────────────────────────────────
function TechDomainGrid({
  colorized,
  onHover,
}: {
  colorized: boolean;
  onHover: (tech: TechEntry | null) => void;
}) {
  return (
    <div className="max-w-5xl mx-auto w-full pl-8 pr-4 sm:pl-10 sm:pr-6 md:pl-12 md:pr-8 lg:px-8 flex flex-col gap-10">
      {DOMAINS.map((domain, domainIdx) => {
        const techs = getDomainTechs(domain.labels);
        return (
          <motion.div
            key={domain.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: domainIdx * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Domain header */}
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: domain.color, boxShadow: `0 0 8px ${domain.color}88` }}
              />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.3em] font-semibold"
                style={{ color: domain.color }}
              >
                {domain.label}
              </span>
              <span className="font-mono text-[10px] text-white/20 tracking-wider">
                · {techs.length} skills
              </span>
              {/* Divider line */}
              <div className="flex-1 h-px bg-white/5 ml-1" />
            </div>

            {/* Pills flex-wrap */}
            <div className="flex flex-wrap gap-2">
              {techs.map((tech, i) => (
                <TechCard
                  key={tech.label}
                  tech={tech}
                  index={domainIdx * 30 + i}
                  colorized={colorized}
                  onHover={onHover}
                />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Toggle button ────────────────────────────────────────────────────────────
function ToggleBtn({
  active, onClick, onHoverChange, children,
}: {
  active: boolean;
  onClick: () => void;
  onHoverChange?: (h: boolean) => void;
  children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[9px]
                 tracking-[0.22em] uppercase border transition-all duration-300 cursor-pointer select-none"
      style={{
        borderColor: active ? "rgba(255,255,255,0.40)" : hover ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.18)",
        background: active ? "rgba(255,255,255,0.10)" : hover ? "rgba(255,255,255,0.04)" : "transparent",
        color: active ? "rgba(255,255,255,0.85)" : hover ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.45)",
      }}
      onMouseEnter={() => { setHover(true); onHoverChange?.(true); }}
      onMouseLeave={() => { setHover(false); onHoverChange?.(false); }}
      onClick={onClick}
    >
      <span className="relative flex items-center justify-center" style={{ width: 7, height: 7 }}>
        {hover && !active && (
          <motion.span
            className="absolute rounded-full"
            style={{ inset: -3, border: "1px solid rgba(255,255,255,0.45)" }}
            animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <span style={{
          width: 5, height: 5, borderRadius: "50%", display: "inline-block",
          background: active ? "#ffffff" : hover ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.2)",
          transition: "background 0.3s",
          boxShadow: active ? "0 0 6px 1px rgba(255,255,255,0.4)" : "none",
        }} />
      </span>
      {children}
    </div>
  );
}

// ── Main exported section ─────────────────────────────────────────────────────
export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredTech, setHoveredTech] = useState<TechEntry | null>(null);
  const [locked, setLocked] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [viewMode, setViewMode] = useState<"mesh" | "cloud">("mesh");
  const colorized = locked || btnHover;

  return (
    <>
      <MobileTechMarquee />

      <div className="hidden md:block">
        <section
          id="skills"
          ref={ref}
          className="relative pt-16 pb-6 sm:pb-14 md:pb-24 overflow-hidden"
        >
          {/* Ambient glow */}
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

          <div className="w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 px-4 sm:px-5 md:px-6 lg:px-8"
            >
              <p className="text-[12px] font-mono tracking-[0.3em] uppercase text-white/30 mb-4">
                Skills I work with
              </p>
              <div className="flex flex-col items-center gap-4 lg:relative lg:flex-row lg:justify-center max-w-5xl mx-auto">
                <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em] mb-2">
                  <span className="text-white font-bold about-heading-size">Tech</span>
                  <span className="text-white/65 font-normal ml-5 about-heading-size">Stack</span>
                </h2>

                {/* Mobile toggles */}
                <div className="order-2 flex items-center gap-3 lg:hidden">
                  <ToggleBtn active={viewMode === "cloud"} onClick={() => setViewMode(v => v === "mesh" ? "cloud" : "mesh")}>
                    {viewMode === "cloud" ? "Grid View" : "Globe View"}
                  </ToggleBtn>
                  <ToggleBtn active={locked} onClick={() => setLocked(v => !v)} onHoverChange={setBtnHover}>
                    {locked ? "Unlock Colors" : "Lock Colors"}
                  </ToggleBtn>
                </div>

                {/* Desktop toggles */}
                <div className="hidden lg:absolute lg:left-0 lg:block">
                  <ToggleBtn active={viewMode === "cloud"} onClick={() => setViewMode(v => v === "mesh" ? "cloud" : "mesh")}>
                    {viewMode === "cloud" ? "Grid View" : "Globe View"}
                  </ToggleBtn>
                </div>
                <div className="hidden lg:absolute lg:right-0 lg:block">
                  <ToggleBtn active={locked} onClick={() => setLocked(v => !v)} onHoverChange={setBtnHover}>
                    {locked ? "Unlock Colors" : "Lock Colors"}
                  </ToggleBtn>
                </div>
              </div>
            </motion.div>

            {/* View switcher */}
            <AnimatePresence mode="wait">
              {viewMode === "mesh" ? (
                <motion.div
                  key="mesh"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                >
                  <TechDomainGrid colorized={colorized} onHover={setHoveredTech} />
                </motion.div>
              ) : (
                <motion.div
                  key="cloud"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center justify-center gap-52 py-8 px-6">
                    <div className="hidden xl:block shrink-0">
                      <GlobeLeftPanel tech={hoveredTech} />
                    </div>
                    <div className="shrink-0">
                      <IconCloud3D colorized={colorized} onHoverTech={setHoveredTech} />
                    </div>
                    <div className="hidden xl:block shrink-0">
                      <GlobeRightPanel tech={hoveredTech} />
                    </div>
                  </div>
                  <p className="text-center font-mono text-[10px] tracking-[0.22em] uppercase text-gray-200 pb-4">
                    · hover any skill to reveal insights ·
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </>
  );
}
