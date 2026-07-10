"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Globe, Cpu, Settings } from "lucide-react";
import Image from "next/image";
import { ABOUT_CODE_GLYPHS, ABOUT_STATS } from "@/app/data/about";

type TiltState = { rx: number; ry: number; active: boolean };
type SpotPosition = { x: number; y: number };

export default function Hero() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // States for the 3D Profile Card Tilt
  const profileCardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ rx: 0, ry: 0, active: false });
  const [spotPos, setSpotPos] = useState<SpotPosition>({ x: 50, y: 50 });

  // States for VengenceUI Bento Grid mouse-tracking glow
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsCoords, setStatsCoords] = useState({ x: 0, y: 0 });
  const [statsHovered, setStatsHovered] = useState(false);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = profileCardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const px = (e.clientX - left) / width;
    const py = (e.clientY - top) / height;
    setTilt({ rx: (py - 0.5) * -22, ry: (px - 0.5) * 22, active: true });
    setSpotPos({ x: px * 100, y: py * 100 });
  };

  const handleCardMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, active: false });
  };

  const handleStatsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = statsRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setStatsCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden"
      >
        {/* Ambient background glow drifts */}
        <div className="absolute inset-0 pointer-events-none">
          {(
            [
              {
                w: 650,
                h: 650,
                op: 0.018,
                bl: 90,
                top: "-18%",
                left: "-12%",
                dur: 14,
                del: 0,
              },
              {
                w: 520,
                h: 520,
                op: 0.015,
                bl: 110,
                bottom: "-8%",
                right: "-5%",
                dur: 18,
                del: 5,
              },
              {
                w: 400,
                h: 400,
                op: 0.012,
                bl: 70,
                top: "38%",
                left: "38%",
                dur: 11,
                del: 2,
              },
            ] as Array<{
              w: number;
              h: number;
              op: number;
              bl: number;
              dur: number;
              del: number;
              top?: string;
              left?: string;
              right?: string;
              bottom?: string;
            }>
          ).map((s, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -28, 0], scale: [1, 1.08, 1] }}
              transition={{
                duration: s.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: s.del,
              }}
              className="absolute rounded-full"
              style={{
                width: s.w,
                height: s.h,
                background: `radial-gradient(circle, rgba(255,255,255,${s.op}) 0%, transparent 68%)`,
                filter: `blur(${s.bl}px)`,
                top: s.top,
                left: s.left,
                bottom: s.bottom,
                right: s.right,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          {/* ── TOP HERO INTRODUCTION ── */}
          <div className="w-full text-center mb-16">
            {/* Availability Badge (Blue Theme) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                       glass border border-blue-500/20 text-blue-400 text-xs font-mono mb-8 tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_6px_rgba(59,130,246,0.7)]" />
              Available for new projects
            </motion.div>

            {/* Main Tagline (One line, Monospace, uppercase, tracking space) */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-mono tracking-[0.06em] text-[clamp(1.3rem,2.8vw,2.4rem)] uppercase font-bold text-white/90 mb-3"
            >
              Cloud Orchestration Platform Engineering
            </motion.h1>

            {/* Bio Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-white/40 text-sm leading-relaxed max-w-2xl mx-auto
                       font-(family-name:--font-roboto) tracking-[0.2em]"
            >
              orchestrating cloud-native infrastructure and automated deployments,
              backed by production-grade MERN stack applications.
            </motion.p>
          </div>

          {/* ── BOTTOM CONSOLIDATED GRID (ABOUT MERGED) ── */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 sm:gap-16 items-start mt-4">

            {/* LEFT COLUMN: Profile Card & Stats Bento */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col items-center w-full"
            >
              {/* Squared profile card (Blue outline, rounded-xl) */}
              <div
                ref={profileCardRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.active ? 1.04 : 1})`,
                  transition: tilt.active
                    ? "transform 0.1s ease-out"
                    : "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
                  willChange: "transform",
                }}
                className="relative aspect-square w-full max-w-[280px] rounded-xl overflow-hidden glass border border-blue-400/40 cursor-pointer select-none"
              >
                {/* Floating code glyphs */}
                {ABOUT_CODE_GLYPHS.map((g) => (
                  <span
                    key={`${g.symbol}-${g.x}-${g.y}`}
                    className="absolute font-mono select-none pointer-events-none z-30"
                    style={{
                      left: `${g.x}%`,
                      top: `${g.y}%`,
                      fontSize: `${g.size}px`,
                      color: `rgba(220,235,255,${tilt.active ? Math.min(g.op * 3.2, 0.82) : 0})`,
                      transform: tilt.active
                        ? `translate(${(spotPos.x / 100 - 0.5) * g.px}px, ${(spotPos.y / 100 - 0.5) * g.py}px) rotate(${g.rot}deg)`
                        : `translate(0px, 0px) rotate(${g.rot}deg)`,
                      transition: tilt.active
                        ? "color 0.35s ease, transform 0.12s ease-out"
                        : "color 0.55s ease, transform 0.8s cubic-bezier(0.23,1,0.32,1)",
                      textShadow: tilt.active ? "0 0 14px rgba(140,200,255,0.5)" : "none",
                      letterSpacing: "0.04em",
                      fontWeight: 900,
                    }}
                  >
                    {g.symbol}
                  </span>
                ))}

                {/* Spotlight Glare */}
                <div
                  className="absolute inset-0 z-20 pointer-events-none rounded-xl"
                  style={{
                    opacity: tilt.active ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    background: `radial-gradient(circle at ${spotPos.x}% ${spotPos.y}%, rgba(255,255,255,0.13) 0%, rgba(120,210,255,0.06) 45%, transparent 68%)`,
                  }}
                />

                {/* Inset Border Glow */}
                <div
                  className="absolute inset-0 z-20 pointer-events-none rounded-xl"
                  style={{
                    opacity: tilt.active ? 1 : 0,
                    transition: "opacity 0.4s ease",
                    boxShadow: "inset 0 0 0 1px rgba(120,210,255,0.35), 0 0 40px rgba(120,210,255,0.08)",
                  }}
                />

                <div className="absolute inset-0 about-profile-radial" />

                {/* Image */}
                <div
                  className="absolute inset-0"
                  style={{
                    transform: tilt.active ? "scale(1.1)" : "scale(1)",
                    transition: tilt.active
                      ? "transform 0.5s ease"
                      : "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                >
                  <Image
                    src="/avatar.jpg"
                    alt="Waqar UL Hassan"
                    fill
                    className="object-cover object-top rounded-xl"
                    priority
                    sizes="280px"
                  />
                </div>

                {/* Bottom Overlay Name */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5 z-10 about-name-overlay"
                  style={{
                    opacity: tilt.active ? 0 : 1,
                    transform: tilt.active ? "translateY(6px)" : "translateY(0px)",
                    transition: tilt.active
                      ? "opacity 0.25s ease, transform 0.25s ease"
                      : "opacity 0.45s ease, transform 0.45s ease",
                  }}
                >
                  <p className="text-white/80 font-semibold text-sm leading-tight">Waqar UL Hassan</p>
                  <p className="text-white/80 font-medium text-[9px] font-mono tracking-[0.2em] uppercase mt-1">
                    Full-Stack · DevOps · AI
                  </p>
                </div>
              </div>

              {/* VengenceUI Bento Grid Stats (1x4 Horizontal Row format) */}
              <div
                ref={statsRef}
                onMouseMove={handleStatsMouseMove}
                onMouseEnter={() => setStatsHovered(true)}
                onMouseLeave={() => setStatsHovered(false)}
                className="relative grid grid-cols-4 w-full max-w-lg mt-6 border border-white/8 rounded-xl overflow-hidden bg-black/40 select-none"
              >
                {/* Mouse-following background glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-10"
                  style={{
                    opacity: statsHovered ? 1 : 0,
                    background: `radial-gradient(150px circle at ${statsCoords.x}px ${statsCoords.y}px, rgba(255,255,255,0.06), transparent 70%)`,
                  }}
                />

                {/* Mouse-following border glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 z-20"
                  style={{
                    opacity: statsHovered ? 1 : 0,
                    background: `radial-gradient(180px circle at ${statsCoords.x}px ${statsCoords.y}px, rgba(255,255,255,0.22), transparent 50%)`,
                    maskImage: `
                      linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px), black 100%),
                      linear-gradient(to right, transparent, transparent calc(25% - 1px), black calc(25% - 1px), black 25%, transparent 25%, transparent calc(50% - 1px), black calc(50% - 1px), black 50%, transparent 50%, transparent calc(75% - 1px), black calc(75% - 1px), black 75%, transparent 75%, transparent calc(100% - 1px), black calc(100% - 1px), black 100%)
                    `,
                    WebkitMaskImage: `
                      linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent calc(100% - 1px), black calc(100% - 1px), black 100%),
                      linear-gradient(to right, transparent, transparent calc(25% - 1px), black calc(25% - 1px), black 25%, transparent 25%, transparent calc(50% - 1px), black calc(50% - 1px), black 50%, transparent 50%, transparent calc(75% - 1px), black calc(75% - 1px), black 75%, transparent 75%, transparent calc(100% - 1px), black calc(100% - 1px), black 100%)
                    `,
                    maskComposite: "add",
                    WebkitMaskComposite: "source-over",
                  }}
                />

                {ABOUT_STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className="relative flex flex-col gap-1 px-3 py-4 z-10 text-center"
                  >
                    {/* Vertical dividers (3 total) */}
                    {i < 3 && (
                      <div className="absolute right-0 top-0 bottom-0 w-px bg-zinc-800/40" />
                    )}

                    <span className="text-white font-semibold text-base sm:text-lg leading-none tracking-tight">
                      {s.value}
                    </span>
                    <span className="text-white/35 text-[8px] font-mono tracking-[0.2em] uppercase leading-snug">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Keypoints (SVG Icons) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col justify-center gap-6 text-left"
            >
              <h3 className="font-mono text-lg text-white leading-tight tracking-normal">
                Hola, I&apos;m Waqar UL Hassan 👋
              </h3>

              {/* Technical Bullet Points with Lucide Icons */}
              <ul className="flex flex-col gap-4 font-mono text-sm leading-relaxed text-white/50">
                <li className="flex items-start gap-3">
                  <Zap size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white/80 font-semibold">Core Expertise:</strong> DevOps orchestration, CI/CD automated deployments, and cloud platform engineering.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Globe size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white/80 font-semibold">Full-Stack Dev:</strong> Crafting production-grade React interfaces & robust Node.js APIs (MERN stack).
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Cpu size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white/80 font-semibold">AI Integrations:</strong> Building LLM-powered services, agentic workflows, and microservice architectures.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Settings size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white/80 font-semibold">Quality & Scale:</strong> Focused on clean architecture, developer experience, and high performance.
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="w-full my-5 sm:my-14 h-px bg-white/8" />
    </>
  );
}
