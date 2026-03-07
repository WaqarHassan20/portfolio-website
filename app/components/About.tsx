"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";

const STATS = [
  { value: "3+",  label: "Years Experience" },
  { value: "15+", label: "Projects Delivered" },
  { value: "50+", label: "Technologies" },
  { value: "3",   label: "Core Domains" },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const router = useRouter();

  return (
    <>
      <section id="about" ref={ref} className="relative h-screen py-24 px-6 overflow-hidden flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full flex flex-col flex-1 justify-center">
          {/* Section heading */}
          <div className="my-10 text-center">
            <p className="text-[12px] font-mono tracking-[0.3em] uppercase text-white/30 mb-4">More about me</p>
            <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em]">
              <span className="text-white font-bold about-heading-size">About</span>
              <span className="text-white/65 font-normal ml-5 about-heading-size">Me</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 sm:gap-5 items-start flex-1 my-10">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col gap-4">

              {/* Profile card */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
                className="relative rounded-2xl overflow-hidden glass border border-white/8 about-profile-card"
              >
                {/* Subtle gradient fill */}
                <div
                  className="absolute inset-0 about-profile-radial"
                />

                {/* GitHub profile picture */}
                <Image
                  src="/picture.jpeg"
                  alt="Waqar UL Hassan"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                />

                {/* Bottom name overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5 about-name-overlay"
                >
                  <p className="text-white/80 font-semibold text-base leading-tight">Waqar UL Hassan</p>
                  <p className="text-white/80 font-medium text-[10px] font-mono tracking-[0.2em] uppercase mt-1">
                    Full-Stack · DevOps · AI
                  </p>
                </div>
              </motion.div>

              {/* Stats grid — 4 boxes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="grid grid-cols-2 gap-3 w-full"
              >
                {STATS.map((s, i) => (
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
              className="flex flex-col justify-center gap-6 lg:pl-8"
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
              <div className="flex flex-wrap items-center gap-4">
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
      <div className="w-full my-10 md:my-24 h-px bg-white/8" />
    </>
  );
}

