"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import { ABOUT_CODE_GLYPHS, ABOUT_STATS } from "@/app/data/about";
import SectionHeading from "@/app/components/shared/SectionHeading";

type TiltState = { rx: number; ry: number; active: boolean };
type SpotPosition = { x: number; y: number };

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const router = useRouter();

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

  return (
    <>
      <section id="about" ref={ref} className="relative min-h-screen px-4 sm:px-5 md:px-6 lg:px-8 overflow-hidden flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full flex flex-col flex-1 justify-center">
          <SectionHeading
            eyebrow="More about me"
            primary="About"
            secondary="Me"
            className="my-10 text-center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 sm:gap-5 items-start flex-1 my-10">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col gap-4 px-3 lg:px-1">

              {/* Profile card */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
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
                  className="relative h-96 lg:h-100 xl:h-100 rounded-2xl overflow-hidden glass border border-white/8 about-profile-card cursor-pointer"
                >
                  {/* Floating code glyphs — parallax on cursor move */}
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

                  {/* Spotlight glare that tracks cursor */}
                  <div
                    className="absolute inset-0 z-20 pointer-events-none rounded-2xl"
                    style={{
                      opacity: tilt.active ? 1 : 0,
                      transition: "opacity 0.4s ease",
                      background: `radial-gradient(circle at ${spotPos.x}% ${spotPos.y}%, rgba(255,255,255,0.13) 0%, rgba(120,210,255,0.06) 45%, transparent 68%)`,
                    }}
                  />

                  {/* Inset border glow on hover */}
                  <div
                    className="absolute inset-0 z-20 pointer-events-none rounded-2xl"
                    style={{
                      opacity: tilt.active ? 1 : 0,
                      transition: "opacity 0.4s ease",
                      boxShadow: "inset 0 0 0 1px rgba(120,210,255,0.35), 0 0 40px rgba(120,210,255,0.08)",
                    }}
                  />

                  {/* Subtle gradient fill */}
                  <div className="absolute inset-0 about-profile-radial" />

                  {/* Image with parallax zoom on hover */}
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
                      className="object-cover object-top"
                      priority
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>

                  {/* Bottom name overlay */}
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
                    <p className="text-white/80 font-semibold text-base leading-tight">Waqar UL Hassan</p>
                    <p className="text-white/80 font-medium text-[10px] font-mono tracking-[0.2em] uppercase mt-1">
                      Full-Stack · DevOps · AI
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Stats grid — 4 boxes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="grid grid-cols-2 gap-3 w-full"
              >
                {ABOUT_STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.45, delay: 0.25 + i * 0.07 }}
                    className="rounded-xl glass border border-white/8 px-4 py-4 flex flex-col gap-1.5"
                  >
                    <span className="text-white font-semibold text-2xl leading-none tracking-tight">
                      {s.value}
                    </span>
                    <span className="text-white/35 text-[10px] font-mono tracking-[0.22em] uppercase leading-snug">
                      {s.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="flex flex-col justify-center gap-6 lg:pl-8 px-3 lg:px-1"
            >
              {/* Name intro */}
              <h3
                className="font-mono text-xl text-white leading-[1.1] tracking-normal"
              >
                Hola, I&apos;m{" "} Waqar UL Hassan 👋
              </h3>

              {/* Bio paragraph */}
              <p className="text-white/50 text-sm leading-[1.9] font-mono">
                I&apos;m a <strong className="text-white/75 font-semibold">full-stack developer</strong> with{" "}
                <strong className="text-white/70 font-semibold">3+ years of experience</strong> crafting scalable web
                applications, cloud infrastructure, and AI-integrated products. I work across the
                entire stack — from pixel-perfect <strong className="text-white/70 font-medium">React interfaces</strong> to robust{" "}
                <strong className="text-white/70 font-medium">Node.js APIs</strong>,
                containerized deployments on <strong className="text-white/70 font-medium">AWS</strong>, and intelligent{" "}
                <strong className="text-white/70 font-medium">LLM-powered features</strong>.
              </p>
              <p className="text-white/50 text-sm leading-[1.9] font-mono">
                I care deeply about <strong className="text-white/70 font-semibold">clean architecture</strong>, developer
                experience, and shipping software that actually solves problems — not just software
                that looks good.
              </p>
              <p className="text-white/50 text-sm leading-[1.9] font-mono">
                Outside of code, I am beginner level player at <strong className="text-white/75 font-medium">chess.com</strong>,
                and a weekend average player of <strong className="text-white/75 font-medium">snooker</strong>.
              </p>
              <p className="text-white/40 text-sm leading-[1.85] font-mono">
                Currently open to <strong className="text-white/70 font-medium">freelance</strong>,{" "}
                <strong className="text-white/65 font-medium">full-time</strong>, and{" "}
                <strong className="text-white/65 font-medium">contract</strong> opportunities — let&apos;s build something great together.
              </p>

              {/* Thin separator */}
              <div className="w-full h-px bg-white/8" />

              {/* CTA buttons */}
              <div className="md:flex md:flex-wrap items-center gap-4">
                <motion.button
                  onClick={() => router.push("/projects")}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full
                             border border-white/18 backdrop-blur-md bg-white/[0.07]
                             text-white text-[10px] font-mono tracking-[0.35em] uppercase
                             transition-all duration-300 cursor-pointer"
                >
                  My Work
                  <ArrowUpRight
                    className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1}
                  />
                </motion.button>

                <a
                  href="/cv.pdf"
                  download
                  className="group inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full
                             text-white/40 text-[10px] font-mono tracking-[0.35em] uppercase
                             hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Download CV
                  <Download className="w-3 h-3" strokeWidth={1} />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      {/* <div className="w-full my-10 md:my-24 h-px bg-white/8" /> */}
    </>
  );
}

