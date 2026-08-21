"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Zap, Globe, Cpu, ChevronRight, Download } from "lucide-react";
import Image from "next/image";
import { ABOUT_CODE_GLYPHS } from "@/lib/data/about";

type TiltState = { rx: number; ry: number; active: boolean };
type SpotPosition = { x: number; y: number };

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  // States for the 3D Profile Card Tilt
  const profileCardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({ rx: 0, ry: 0, active: false });
  const [spotPos, setSpotPos] = useState<SpotPosition>({ x: 50, y: 50 });

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  void mounted;

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen pt-20 sm:pt-24 md:pt-28 lg:pt-16 pb-12 sm:pb-16 pl-8 pr-4 sm:pl-10 sm:pr-6 md:pl-12 md:pr-8 lg:px-8 flex items-center justify-center overflow-hidden"
      >
        {/* Ambient background glow drifts */}
        <div className="absolute inset-0 pointer-events-none">
          {(
            [
              { w: 650, h: 650, op: 0.018, bl: 90, top: "-18%", left: "-12%", dur: 14, del: 0 },
              { w: 520, h: 520, op: 0.015, bl: 110, bottom: "-8%", right: "-5%", dur: 18, del: 5 },
              { w: 400, h: 400, op: 0.012, bl: 70, top: "38%", left: "38%", dur: 11, del: 2 },
            ] as Array<{
              w: number; h: number; op: number; bl: number; dur: number; del: number;
              top?: string; left?: string; right?: string; bottom?: string;
            }>
          ).map((s, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -28, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.del }}
              className="absolute rounded-full"
              style={{
                width: s.w, height: s.h,
                background: `radial-gradient(circle, rgba(255,255,255,${s.op}) 0%, transparent 68%)`,
                filter: `blur(${s.bl}px)`,
                top: s.top, left: s.left, bottom: s.bottom, right: s.right,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          <div className="w-full text-center mb-10">
            {/* Consistent Section Heading placed above tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-4"
            >
              <h1 className="font-outfit font-extrabold tracking-tight text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[1.05] text-white">
                Waqar UL Hassan
              </h1>
            </motion.div>

            {/* Main Tagline — Spaced Mono Tech Accent */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono tracking-[0.16em] text-[clamp(0.9rem,1.8vw,1.25rem)] uppercase font-semibold text-blue-400 mb-6"
            >
              Cloud Orchestration Platform Engineer
            </motion.p>
          </div>

          {/* ── MAIN CONTENT GRID ── */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] xl:grid-cols-[2fr_3fr] gap-8 lg:gap-12 xl:gap-16 items-start">

            {/* LEFT COLUMN: Profile Card only */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col items-center w-full"
            >
              {/* Profile card — THICK BLUE BORDER + GLOW */}
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
                className="relative aspect-square w-full max-w-[280px] rounded-xl overflow-hidden glass border-[3px] border-blue-400/70 cursor-pointer select-none"
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
                  className="absolute inset-0 border border-white/8"
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
                    className="object-cover object-top rounded-md"
                    priority
                    sizes="280px"
                  />
                </div>

                {/* Bottom Overlay Name */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-12 z-10 about-name-overlay text-left"
                  style={{
                    opacity: tilt.active ? 0 : 1,
                    transform: tilt.active ? "translateY(6px)" : "translateY(0px)",
                    transition: tilt.active
                      ? "opacity 0.25s ease, transform 0.25s ease"
                      : "opacity 0.45s ease, transform 0.45s ease",
                  }}
                >
                  <p className="text-white font-bold text-base sm:text-lg leading-tight">Waqar UL Hassan</p>
                  <p className="text-white/80 font-medium text-[9.5px] font-mono tracking-[0.2em] uppercase mt-1">
                    Full-Stack · DevOps · AI
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: Technical Keypoints + Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col justify-center gap-6 text-left"
            >
              {/* Technical Bullet Points with Lucide Icons (3 Keypoints - Enlarged Size) */}
              <ul className="flex flex-col gap-5 xl:gap-6 font-mono text-sm md:text-base xl:text-lg leading-relaxed text-white/70">
                <li className="flex items-start gap-3.5">
                  <Zap size={18} className="text-blue-400 shrink-0 mt-1 xl:w-5 xl:h-5" />
                  <div>
                    <strong className="text-white font-semibold">Core DevOps:</strong> DevOps orchestration, CI/CD automated deployments, and cloud platform engineering.
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <Globe size={18} className="text-blue-400 shrink-0 mt-1 xl:w-5 xl:h-5" />
                  <div>
                    <strong className="text-white font-semibold">Full-Stack Dev:</strong> Crafting production-grade React interfaces &amp; robust Node.js APIs (MERN stack).
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <Cpu size={18} className="text-blue-400 shrink-0 mt-1 xl:w-5 xl:h-5" />
                  <div>
                    <strong className="text-white font-semibold">AI Integrations:</strong> Building LLM-powered services, agentic workflows, and microservice architectures.
                  </div>
                </li>
              </ul>

              {/* Action Buttons directly under the 3 keypoints with generous gap */}
              <div className="flex flex-row items-center justify-start gap-3.5 mt-8 sm:mt-10 w-full select-none">
                {/* Primary Button: Explore projects */}
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-sans text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-zinc-100 transition-all duration-200 shadow-lg cursor-pointer"
                >
                  <span>Explore projects</span>
                  <ChevronRight size={15} className="text-zinc-900 stroke-[2.5]" />
                </a>

                {/* Secondary Button: Resume */}
                <a
                  href="/resume.pdf"
                  download
                  className="px-5 py-2.5 rounded-xl bg-[#0c0c0e]/90 text-zinc-300 border border-zinc-800/90 font-sans text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-zinc-800/60 hover:text-white hover:border-zinc-700 transition-all duration-200 cursor-pointer"
                >
                  <span>Resume</span>
                  <Download size={14} className="text-zinc-400" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="w-full my-4 sm:my-8 h-px bg-white/8" />
    </>
  );
}
