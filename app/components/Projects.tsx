"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, Layers, Zap, Globe, Shield, BarChart3, Cpu } from "lucide-react";

const EASE: [number, number, number, number] = [0.25, 1, 0.35, 1];

const PROJECTS = [
  {
    id: 1, title: "NexaFlow", sub: "SaaS Platform",
    description: "Enterprise-grade SaaS platform with real-time collaboration, AI-powered automation workflows, and multi-tenant architecture. Handles 50K+ daily active users.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "tRPC", "AWS"],
    live: "https://nexaflow.app", Icon: Zap,
  },
  {
    id: 2, title: "PixelForge", sub: "Design System",
    description: "A comprehensive React component library with 120+ accessible, customizable components. Zero-runtime CSS, full TypeScript support, and automatic dark/light theming.",
    tech: ["React", "TypeScript", "Storybook", "Vitest", "Rollup"],
    live: "https://pixelforge.dev", Icon: Layers,
  },
  {
    id: 3, title: "PulseAPI", sub: "Backend Service",
    description: "High-performance REST + GraphQL API gateway built with Bun. Sub-10ms response times, built-in rate limiting, JWT auth, and OpenAPI spec generation.",
    tech: ["Bun", "Hono", "GraphQL", "PostgreSQL", "Drizzle", "Docker"],
    live: "https://pulseapi.io", Icon: Cpu,
  },
  {
    id: 4, title: "ChronoBoard", sub: "Analytics Dashboard",
    description: "Real-time analytics dashboard with custom chart engine, zero external chart dependencies. WebSocket-driven live updates with sub-second latency.",
    tech: ["Next.js", "Canvas API", "WebSocket", "ClickHouse", "Node.js"],
    live: "https://chronoboard.app", Icon: BarChart3,
  },
  {
    id: 5, title: "VaultGuard", sub: "Auth SDK",
    description: "Plug-and-play authentication SDK supporting OAuth2, SAML, magic links, and passkeys. Drop-in solution for any Node.js/Bun framework.",
    tech: ["TypeScript", "Bun", "JWT", "WebAuthn", "Redis", "Prisma"],
    live: "https://vaultguard.dev", Icon: Shield,
  },
  {
    id: 6, title: "Orbiton", sub: "Landing Page Engine",
    description: "Visual landing page builder with drag-and-drop editor, A/B testing, conversion tracking, and one-click Vercel deployment. No code required.",
    tech: ["Next.js", "Framer Motion", "Prisma", "Stripe", "Vercel Edge"],
    live: "https://orbiton.build", Icon: Globe,
  },
];

const N = PROJECTS.length;

// ── Dark monochrome thumbnail ──────────────────────────────
function Thumbnail({ Icon }: { Icon: React.ElementType }) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#070707" }}>
      {/* Browser chrome */}
      <div
        className="flex shrink-0 items-center gap-1.75 px-3 py-2.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        {[0, 1, 2].map((j) => (
          <div key={j} className="w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.09)" }} />
        ))}
        <div
          className="flex-1 mx-2 h-4.5 rounded-full flex items-center px-3"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <div className="h-1 w-24 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }} />
        </div>
        <ArrowUpRight size={11} className="text-white/[0.14] mr-0.5 shrink-0" />
      </div>

      {/* Skeleton UI */}
      <div className="flex-1 flex flex-col gap-2.5 p-3.5 overflow-hidden">
        {/* Nav bar skeleton */}
        <div className="flex items-center gap-2">
          {[60, 46, 54].map((w, j) => (
            <div key={j} className="h-4.5 rounded-md" style={{ width: w, background: "rgba(255,255,255,0.05)" }} />
          ))}
          <div className="flex-1" />
          <div className="h-4.5 w-14 rounded-md" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Main hero block */}
        <div
          className="flex-1 rounded-xl relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.055)" }}
        >
          {/* Dot grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          {/* Project icon watermark */}
          <Icon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: 52, height: 52, color: "rgba(255,255,255,0.04)" }}
          />
          {/* Skeleton lines */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-col gap-1.5">
            <div className="h-1.25 w-3/4 rounded-full" style={{ background: "rgba(255,255,255,0.055)" }} />
            <div className="h-1.25 w-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.035)" }} />
          </div>
        </div>

        {/* Bottom stats row */}
        <div className="flex gap-2 shrink-0">
          {[1.3, 1, 0.9].map((f, j) => (
            <div
              key={j}
              className="h-9 rounded-xl"
              style={{ flex: f, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const xPx = useMotionValue(0);
  const progressVal = useMotionValue(0);
  const progressWidth = useTransform(progressVal, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      xPx.set(-p * (N - 1) * window.innerWidth);
      progressVal.set(p);
      setActive(Math.round(p * (N - 1)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [xPx, progressVal]);

  return (
    <>
      {/* Scroll-distance wrapper — height determines how long the section is "pinned" */}
      <div ref={containerRef} id="projects" style={{ height: `${N * 100}vh` }} className="relative">

        {/* Sticky viewport panel */}
        <div className="sticky top-0 h-screen overflow-hidden bg-[#060606]">

          {/* Top label + counter */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between pl-21 pr-8 sm:pr-12 pt-7 sm:pt-9">
            <span className="font-jetbrains text-[9px] tracking-[0.42em] uppercase text-white/20">
              Selected Work
            </span>
            <span className="font-jetbrains font-black text-white/22 text-sm tabular-nums">
              {String(active + 1).padStart(2, "0")}&ensp;/&ensp;{String(N).padStart(2, "0")}
            </span>
          </div>

          {/* Horizontal card track */}
          <motion.div style={{ x: xPx }} className="flex h-full will-change-transform">
            {PROJECTS.map((p, i) => {
              const isActive = active === i;
              return (
                <div
                  key={p.id}
                  // pl-[84px] clears the SocialSidebar (fixed left-7=28px + w-9=36px + gap)
                  className="w-screen h-full shrink-0 pl-21 pr-8 sm:pr-12 pt-15 pb-13"
                >
                  {/* ── Card shell ── */}
                  <div
                    className="w-full h-full rounded-2xl flex flex-col overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.022)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >

                    {/* ══ CARD HEADER: faint number (left)  ←→  title + sub (right) ══ */}
                    <motion.div
                      className="flex items-end justify-between px-8 sm:px-10 lg:px-12 pt-6 pb-4 shrink-0"
                      initial={{ opacity: 0, y: -18 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -18 }}
                      transition={{ duration: 0.4, ease: EASE, delay: isActive ? 0.04 : 0 }}
                    >
                      {/* Large faint project number */}
                      <span
                        className="font-jetbrains font-black tabular-nums leading-none select-none"
                        style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)", color: "rgba(255,255,255,0.065)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Project name + type — right-aligned */}
                      <div className="text-right">
                        <h2
                          className="font-jetbrains font-black text-white leading-tight"
                          style={{ fontSize: "clamp(1.4rem, 2.6vw, 2.4rem)" }}
                        >
                          {p.title}
                        </h2>
                        <p className="font-jetbrains text-white/35 text-[10px] tracking-[0.3em] uppercase mt-1">
                          {p.sub}
                        </p>
                      </div>
                    </motion.div>

                    {/* Divider */}
                    <div
                      className="mx-8 sm:mx-10 lg:mx-12 shrink-0"
                      style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
                    />

                    {/* ══ CARD BODY: left text column + right thumbnail column ══ */}
                    <div className="flex gap-6 lg:gap-8 flex-1 min-h-0 px-8 sm:px-10 lg:px-12 py-5">

                      {/* ── Left: description → tools → visit button ── */}
                      <motion.div
                        className="w-[38%] lg:w-[36%] flex flex-col gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.45, ease: EASE, delay: isActive ? 0.12 : 0 }}
                      >
                        {/* Description */}
                        <p className="font-jetbrains text-white/50 leading-[1.9] text-[12.5px] sm:text-[13px] flex-1">
                          {p.description}
                        </p>

                        {/* Tools / tech stack */}
                        <div className="flex flex-wrap gap-1.5">
                          {p.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-0.75 rounded-full font-jetbrains text-[8px] tracking-widest uppercase text-white/32"
                              style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.07)",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Visit Site */}
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group self-start inline-flex items-center gap-1.5 px-4 py-1.75 rounded-full font-jetbrains text-[9.5px] tracking-[0.2em] uppercase text-white/60 hover:text-black hover:bg-white transition-all duration-300"
                          style={{ border: "1px solid rgba(255,255,255,0.16)" }}
                        >
                          Visit Site
                          <ArrowUpRight
                            size={10}
                            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                          />
                        </a>
                      </motion.div>

                      {/* ── Right: project thumbnail ── */}
                      <motion.div
                        className="flex-1 rounded-xl overflow-hidden relative group"
                        initial={{ opacity: 0, x: 22, scale: 0.96 }}
                        animate={isActive ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 22, scale: 0.96 }}
                        transition={{ duration: 0.5, ease: EASE, delay: isActive ? 0.18 : 0 }}
                        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 45px rgba(0,0,0,0.5)" }}
                      >
                        <Thumbnail Icon={p.Icon} />

                        {/* Hover overlay with "Open Project" CTA */}
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: "rgba(0,0,0,0.52)" }}
                        >
                          <span
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-jetbrains text-[10px] tracking-[0.2em] uppercase text-white"
                            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
                          >
                            Open Project <ArrowUpRight size={11} />
                          </span>
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Bottom: step dots + progress bar + scroll hint */}
          <div className="absolute bottom-5 left-21 right-8 sm:right-12 z-20 flex items-center gap-4">
            <div className="flex gap-1.5 items-center shrink-0">
              {PROJECTS.map((_, di) => (
                <div
                  key={di}
                  className="rounded-full transition-all duration-500"
                  style={{
                    height: di === active ? "2px" : "1px",
                    width: di === active ? 24 : 6,
                    background: di === active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.18)",
                  }}
                />
              ))}
            </div>
            <div
              className="flex-1 rounded-full relative overflow-hidden"
              style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
            >
              <motion.div
                style={{ width: progressWidth }}
                className="absolute inset-y-0 left-0 rounded-full bg-white/30"
              />
            </div>
            <span className="font-jetbrains text-[8px] tracking-[0.35em] uppercase text-white/18 shrink-0">
              Scroll
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Projects Shipped", value: "20+" },
            { label: "GitHub Stars", value: "5.9K+" },
            { label: "Happy Clients", value: "30+" },
            { label: "Years Coding", value: "5+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-4 text-center"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="font-jetbrains font-bold text-white/85 text-xl mb-1">{stat.value}</p>
              <p className="font-jetbrains text-[10px] tracking-[0.2em] uppercase text-white/28">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
    </>
  );
}
