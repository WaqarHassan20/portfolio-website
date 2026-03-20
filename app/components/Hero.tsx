"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import { HERO_SOCIALS } from "@/app/data/social";
import type { HeroSocial } from "@/app/types/content";

const HERO_ICON_BY_KEY: Record<HeroSocial["icon"], typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

/* ── Crystal shard composition ───────────────────────────── */
function CrystalShard({
  w,
  h,
  rotate,
  tx,
  ty,
  delay,
  dur,
  lightAngle = 0,
}: {
  w: number;
  h: number;
  rotate: number;
  tx: number;
  ty: number;
  delay: number;
  dur: number;
  lightAngle?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -16, 0], rotate: [rotate, rotate + 2, rotate] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
      className="absolute glass-crystal"
      style={{
        width: w,
        height: h,
        clipPath:
          "polygon(28% 0%, 72% 0%, 100% 38%, 72% 100%, 28% 100%, 0% 38%)",
        transform: `rotate(${rotate}deg) translate(${tx}px, ${ty}px)`,
        transformOrigin: "center",
      }}
    >
      {/* Inner light reflection */}
      <div
        className="absolute inset-0 pointer-events-none animate-crystal-light"
        style={{
          background: `linear-gradient(${lightAngle}deg, transparent 30%, rgba(255,255,255,0.10) 55%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

function CrystalVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Smoke orbs behind shards */}
      {(
        [
          {
            s: 420,
            op: 0.022,
            b: 90,
            top: "10%",
            left: "15%",
            dur: 12,
            delay: 0,
          },
          {
            s: 320,
            op: 0.03,
            b: 70,
            top: "45%",
            right: "10%",
            dur: 16,
            delay: 3,
          },
          {
            s: 260,
            op: 0.018,
            b: 60,
            bottom: "8%",
            left: "30%",
            dur: 10,
            delay: 1.5,
          },
        ] as Array<{
          s: number;
          op: number;
          b: number;
          dur: number;
          delay: number;
          top?: string;
          left?: string;
          right?: string;
          bottom?: string;
        }>
      ).map((o, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], scale: [1, 1.06, 1] }}
          transition={{
            duration: o.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: o.delay,
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: o.s,
            height: o.s,
            background: `radial-gradient(circle, rgba(255,255,255,${o.op}) 0%, transparent 70%)`,
            filter: `blur(${o.b}px)`,
            top: o.top,
            left: o.left,
            right: o.right,
            bottom: o.bottom,
          }}
        />
      ))}

      {/* Crystal shards */}
      <CrystalShard
        w={170}
        h={260}
        rotate={14}
        tx={0}
        ty={0}
        delay={0}
        dur={9}
        lightAngle={135}
      />
      <CrystalShard
        w={115}
        h={195}
        rotate={-22}
        tx={85}
        ty={-28}
        delay={1.2}
        dur={11}
        lightAngle={45}
      />
      <CrystalShard
        w={82}
        h={148}
        rotate={38}
        tx={-90}
        ty={36}
        delay={0.6}
        dur={8}
        lightAngle={200}
      />
      <CrystalShard
        w={60}
        h={110}
        rotate={-8}
        tx={-52}
        ty={112}
        delay={2.0}
        dur={13}
        lightAngle={90}
      />
      <CrystalShard
        w={46}
        h={84}
        rotate={55}
        tx={118}
        ty={70}
        delay={0.3}
        dur={7}
        lightAngle={300}
      />

      {/* Thin light-streak lines */}
      {[
        { rot: 22, tx: 42, ty: -28, delay: 0 },
        { rot: -14, tx: -65, ty: 55, delay: 1.8 },
        { rot: 40, tx: 100, ty: 30, delay: 0.9 },
      ].map((l, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.18, 0.65, 0.18] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: l.delay,
          }}
          className="absolute pointer-events-none"
          style={{
            width: 1,
            height: 100 + i * 30,
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.22), transparent)",
            transform: `rotate(${l.rot}deg) translate(${l.tx}px, ${l.ty}px)`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loaderType, setLoaderType] = useState<"loader1" | "loader2" | null>(
    null,
  );

  const toggleLoader = () => {
    setLoaderType((prev) => {
      const next: "loader1" | "loader2" =
        prev === "loader2" ? "loader1" : "loader2";
      localStorage.setItem("portfolio_loader", next);
      return next;
    });
  };

  useEffect(() => {
    const id = setTimeout(() => {
      const stored = localStorage.getItem("portfolio_loader") as
        | "loader1"
        | "loader2"
        | null;
      setLoaderType(stored ?? "loader1");
      setMounted(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Full-page smoke drifts */}
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

        {/* Crystal visual — decorative absolute right-side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 0.32, scale: 1 }}
          transition={{ duration: 2.5, delay: 1.0, ease: "easeOut" }}
          className="absolute right-[-6%] top-0 h-full w-[52%] hidden lg:flex items-center justify-center pointer-events-none"
        >
          <CrystalVisual />
        </motion.div>

        <motion.div
          className="relative z-10 w-full max-w-3xl mx-auto px-6 lg:px-8
                   flex flex-col items-center text-center pt-16 pb-24"
        >
          {/* Content */}
          <div className="w-full">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                       glass border border-green-500/20 text-green-400 text-xs font-mono mb-5 tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.7)]" />
              Available for new projects
            </motion.div>

            {/* Software Engineer title */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="text-white//44 text-[9px] tracking-[0.45em] uppercase mb-8
                       font-outfit"
            >
              Software Engineer
            </motion.p>

            {/* Tagline */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-outfit font-light tracking-tight leading-[0.88] mb-6"
              style={{ fontSize: "clamp(3.5rem, 7.5vw, 6.5rem)" }}
            >
              <i>
                <span className="text-white font-medium block mb-4">
                  From logic to
                </span>
                <span className="text-white/66 font-normal block">launch</span>
              </i>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex items-center justify-center gap-2 text-sm text-white/50 mb-8
                       font-(family-name:--font-roboto) tracking-[0.2em]"
            >
              {mounted && (
                <TypeAnimation
                  sequence={[
                    "Full-Stack Developer",
                    2500,
                    "DevOps Engineer",
                    2500,
                    "Cloud Architect",
                    2500,
                    "AI Integration Specialist",
                    2500,
                  ]}
                  wrapper="span"
                  speed={55}
                  repeat={Infinity}
                  className="text-white"
                />
              )}
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.7 }}
              className="text-white/40 text-sm leading-relaxed mb-12 max-w-lg mx-auto
                       font-(family-name:--font-roboto) tracking-[0.2em]"
            >
              building scalable web apps, and cloud infrastructure — turning
              complex problems into clean, maintainable software.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="flex items-center justify-center gap-5 mb-14"
            >
              <motion.button
                onClick={() => router.push("/projects")}
                whileTap={{ scale: 0.97 }}
                className="group px-8 py-2.5 rounded-full border border-white/18
                         text-white text-[10px] font-mono tracking-[0.35em] uppercase
                         backdrop-blur-md bg-white/[0.07]
                         transition-all duration-300 cursor-pointer
                         inline-flex items-center gap-2.5"
              >
                My work
                <svg
                  className="w-3 h-3 text-white transition-transform duration-300
                           group-hover:translate-x-0.75 group-hover:-translate-y-0.75"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 8 L8 2" />
                  <path d="M4.5 2 H8 V5.5" />
                </svg>
              </motion.button>
              <motion.button
                onClick={() =>
                  document
                    .getElementById("collaborate")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                whileTap={{ scale: 0.97 }}
                className="w-30 py-2.5 text-white/40 text-[10px] font-mono tracking-[0.35em] uppercase
                         hover:text-white
                         transition-colors duration-300 cursor-pointer"
              >
                Contact
              </motion.button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex items-center justify-center gap-2"
            >
              {HERO_SOCIALS.map((s, i) => {
                const Icon = HERO_ICON_BY_KEY[s.icon];
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + i * 0.08 }}
                    whileHover={{}}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 flex items-center justify-center text-white/55
                           hover:text-white transition-colors duration-200 cursor-pointer"
                    aria-label={s.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
              <div className="h-px w-10 bg-white/10 ml-1" />
              <span className="text-white text-[11px] font-mono tracking-widest">
                Waqar-UL-Hassan
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Intro-style toggle — fixed bottom-right, far from all content */}
        {mounted && loaderType && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="fixed top-35 right-15 z-50 hidden lg:flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-gray-300">
              Loading
            </span>
            <button onClick={toggleLoader} className="cursor-pointer">
              <div className="relative flex rounded-full p-1 border border-white/20 bg-white/3">
                {/* Sliding active indicator */}
                <motion.div
                  className="absolute top-1 left-1 w-9 h-9 rounded-full bg-white/[0.14]"
                  animate={{ x: loaderType === "loader2" ? 36 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                {/* Name pill */}
                <div
                  className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-mono tracking-[0.08em] uppercase transition-colors duration-200 ${
                    loaderType === "loader1" ? "text-white/80" : "text-white/20"
                  }`}
                >
                  N
                </div>
                {/* 100% pill */}
                <div
                  className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-mono tracking-[0.04em] uppercase transition-colors duration-200 ${
                    loaderType === "loader2" ? "text-white/80" : "text-white/20"
                  }`}
                >
                  %
                </div>
              </div>
            </button>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.button
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10
                   flex flex-col items-center gap-1.5 cursor-pointer
                   text-white/70 hover:text-white transition-colors duration-200"
          aria-label="Scroll down"
        >
          <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-white/55 hover:text-white/80">
            Scroll
          </span>
          <div className="w-7 h-7 rounded-full border border-white/25 hover:border-white/50 flex items-center justify-center transition-all duration-200">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </motion.button>
      </section>
      <div className="w-full my-24 h-px bg-white/8" />
    </>
  );
}
