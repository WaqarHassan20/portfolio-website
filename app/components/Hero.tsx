"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Twitter, ArrowDown } from "lucide-react";

const SOCIALS = [
  { icon: Github,   href: "https://github.com/WaqarHassan20",                  label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/waqar-khalid-9a1342338",    label: "LinkedIn" },
  { icon: Twitter,  href: "https://x.com/Waqarkhalid",                         label: "X" },
];

/* ── Crystal shard composition ───────────────────────────── */
function CrystalShard({
  w, h, rotate, tx, ty,
  delay, dur,
  lightAngle = 0,
}: {
  w: number; h: number;
  rotate: number; tx: number; ty: number;
  delay: number; dur: number;
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
        clipPath: "polygon(28% 0%, 72% 0%, 100% 38%, 72% 100%, 28% 100%, 0% 38%)",
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
      {[
        { s: 420, op: 0.022, b: 90, top: "10%",  left: "15%",  dur: 12, delay: 0 },
        { s: 320, op: 0.030, b: 70, top: "45%",  right: "10%", dur: 16, delay: 3 },
        { s: 260, op: 0.018, b: 60, bottom:"8%", left: "30%",  dur: 10, delay: 1.5 },
      ].map((o, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", delay: o.delay }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: o.s, height: o.s,
            background: `radial-gradient(circle, rgba(255,255,255,${o.op}) 0%, transparent 70%)`,
            filter: `blur(${o.b}px)`,
            top: o.top, left: (o as any).left, right: (o as any).right, bottom: (o as any).bottom,
          }}
        />
      ))}

      {/* Crystal shards */}
      <CrystalShard w={170} h={260} rotate={14}  tx={0}   ty={0}   delay={0}   dur={9}  lightAngle={135} />
      <CrystalShard w={115} h={195} rotate={-22} tx={85}  ty={-28} delay={1.2} dur={11} lightAngle={45}  />
      <CrystalShard w={82}  h={148} rotate={38}  tx={-90} ty={36}  delay={0.6} dur={8}  lightAngle={200} />
      <CrystalShard w={60}  h={110} rotate={-8}  tx={-52} ty={112} delay={2.0} dur={13} lightAngle={90}  />
      <CrystalShard w={46}  h={84}  rotate={55}  tx={118} ty={70}  delay={0.3} dur={7}  lightAngle={300} />

      {/* Thin light-streak lines */}
      {[
        { rot: 22,  tx: 42,  ty: -28, delay: 0 },
        { rot: -14, tx: -65, ty: 55,  delay: 1.8 },
        { rot: 40,  tx: 100, ty: 30,  delay: 0.9 },
      ].map((l, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.18, 0.65, 0.18] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: l.delay }}
          className="absolute pointer-events-none"
          style={{
            width: 1,
            height: 100 + i * 30,
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.22), transparent)",
            transform: `rotate(${l.rot}deg) translate(${l.tx}px, ${l.ty}px)`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 380], [1, 0]);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -999, y: -999 });

  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: -999, y: -999 })}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Mouse-following prism glow */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: [
            "radial-gradient(circle at 40% 38%, rgba(120,60,255,0.18) 0%, transparent 55%)",
            "radial-gradient(circle at 60% 42%, rgba(0,180,255,0.16) 0%, transparent 55%)",
            "radial-gradient(circle at 50% 62%, rgba(0,230,160,0.12) 0%, transparent 50%)",
            "radial-gradient(circle at 34% 60%, rgba(255,160,30,0.12) 0%, transparent 48%)",
            "radial-gradient(circle at 66% 58%, rgba(255,50,130,0.13) 0%, transparent 48%)",
          ].join(", "),
          filter: "blur(38px)",
          transform: `translate(${mousePos.x - 350}px, ${mousePos.y - 350}px)`,
          transition: "transform 0.06s linear, opacity 0.4s ease",
          opacity: mousePos.x === -999 ? 0 : 1,
          mixBlendMode: "screen",
        }}
      />
      {/* Full-page smoke drifts */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { w: 650, h: 650, op: 0.018, bl: 90, top: "-18%",  left:"-12%",  dur: 14, del: 0 },
          { w: 520, h: 520, op: 0.015, bl:110, bottom:"-8%", right:"-5%",  dur: 18, del: 5 },
          { w: 400, h: 400, op: 0.012, bl: 70, top: "38%",   left:"38%",   dur: 11, del: 2 },
        ].map((s, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -28, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.del }}
            className="absolute rounded-full"
            style={{
              width: s.w, height: s.h,
              background: `radial-gradient(circle, rgba(255,255,255,${s.op}) 0%, transparent 68%)`,
              filter: `blur(${s.bl}px)`,
              top: (s as any).top, left: (s as any).left,
              bottom: (s as any).bottom, right: (s as any).right,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16
                   grid lg:grid-cols-2 gap-16 items-start pt-28 pb-24"
      >
        {/* ── LEFT: text ─────────────────────── */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                       glass border border-white/[0.07] text-white/40 text-xs font-mono mb-8 tracking-wide"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            Available for new projects
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-semibold tracking-tight leading-[0.82] mb-6"
            style={{ fontSize: "clamp(4.5rem, 10vw, 8.5rem)" }}
          >
            <span className="text-white/70 block">Waqar</span>
            <span className="text-white/20 block">Hassan</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex items-center gap-2 font-mono text-base text-white/28 mb-8"
          >
            <span className="text-white/18">—</span>
            {mounted && (
              <TypeAnimation
                sequence={[
                  "Full-Stack Developer",   2500,
                  "DevOps Engineer",        2500,
                  "Cloud Architect",        2500,
                  "AI Integration Specialist", 2500,
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
            className="text-white/35 text-base leading-relaxed mb-12 max-w-xl"
          >
            Final-year Computer Science student building scalable web applications,
            distributed systems, and cloud infrastructure — turning complex problems
            into clean, maintainable software.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex items-center gap-4 mb-14"
          >
            <motion.button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl
                         bg-white text-black font-bold text-sm tracking-widest uppercase
                         shimmer-btn hover:bg-white/90 transition-all duration-200 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black/30 group-hover:bg-black/50 animate-pulse" />
              Hire Me
            </motion.button>
            <motion.button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-4 rounded-2xl glass border border-white/[0.10]
                         text-white/50 font-semibold text-sm tracking-wide
                         hover:text-white hover:border-white/25 transition-all duration-200"
            >
              View Work
            </motion.button>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex items-center gap-3"
          >
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.08 }}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 rounded-xl glass border border-white/[0.07]
                           flex items-center justify-center text-white/28
                           hover:text-white/75 hover:border-white/[0.15] transition-all"
                aria-label={s.label}
              >
                <s.icon className="w-4 h-4" />
              </motion.a>
            ))}
            <div className="h-px w-10 bg-white/10 ml-1" />
            <span className="text-white/20 text-[11px] font-mono">WaqarHassan20</span>
          </motion.div>
        </div>

        {/* ── RIGHT: Crystal visual ──────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:flex items-center justify-center relative h-[600px]"
        >
          <CrystalVisual />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10
                   flex flex-col items-center gap-1.5 cursor-pointer
                   text-white/70 hover:text-white transition-colors duration-200"
        aria-label="Scroll down"
      >
        <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-white/55 hover:text-white/80">Scroll</span>
        <div className="w-7 h-7 rounded-full border border-white/25 hover:border-white/50 flex items-center justify-center transition-all duration-200">
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </motion.button>
    </section>
  );
}
