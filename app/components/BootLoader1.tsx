"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STAGES = [
  { label: "Initializing environment", dur: 520 },
  { label: "Loading modules",          dur: 480 },
  { label: "Compiling assets",         dur: 600 },
  { label: "Starting runtime",         dur: 420 },
  { label: "System ready",             dur: 300 },
];

export default function BootLoader1({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showName, setShowName] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; });

  useEffect(() => {
    let cancelled = false;
    const totalDur = STAGES.reduce((a, s) => a + s.dur, 0);
    const TICK = 30;
    const steps = Math.ceil(totalDur / TICK);
    let tick = 0;

    const interval = setInterval(() => {
      if (cancelled) return;
      tick++;
      const pct = Math.min(Math.round((tick / steps) * 100), 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        if (cancelled) return;
        setDone(true);
        // ── 2-second pause at 100%, then fade to loader 2 ──
        setTimeout(() => {
          if (cancelled) return;
          setExiting(true);
          setTimeout(() => onDoneRef.current(), 850);
        }, 2000);
      }
    }, TICK);

    let acc = 0;
    STAGES.forEach((s, i) => {
      acc += s.dur;
      setTimeout(() => {
        if (cancelled) return;
        setStage(i);
        if (i >= 1) setShowName(true);
        if (i >= 2) setShowRole(true);
      }, acc);
    });

    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  const pct = Math.round(progress);
  const BAR_LEN = 28;
  const filled = Math.round((pct / 100) * BAR_LEN);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.85, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060606] overflow-hidden"
      style={{ fontFamily: 'var(--font-jetbrains-mono, "JetBrains Mono", monospace)' }}
    >
      {/* Dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.042) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 38%, rgba(0,0,0,0.76) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center select-none w-full px-8">

        {/* ── WELCOME ── */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.38em" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="text-[11px] uppercase mb-10"
          style={{ color: "rgba(255,255,255,0.58)", letterSpacing: "0.38em" }}
        >
          WELCOME
        </motion.p>

        {/* ── Name fades + rises ── */}
        <motion.h1
          initial={{ y: 22, opacity: 0 }}
          animate={showName ? { y: 0, opacity: 1 } : { y: 22, opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="font-light text-white leading-none whitespace-nowrap mb-10"
          style={{
            fontSize: "clamp(3rem, 9.5vw, 8.5rem)",
            letterSpacing: "-0.025em",
            textShadow: done
              ? "0 0 80px rgba(255,255,255,0.38), 0 0 160px rgba(255,255,255,0.12)"
              : "0 0 30px rgba(255,255,255,0.10)",
            transition: "text-shadow 0.6s ease",
          }}
        >
          Waqar UL Hassan
        </motion.h1>

        {/* ── Role ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={showRole ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[12px] tracking-[0.38em] uppercase mb-16"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Software&nbsp;Engineer&nbsp;&middot;&nbsp;Full-Stack&nbsp;Developer
        </motion.p>

        {/* ── Progress section ── */}
        <div className="w-full max-w-xs sm:max-w-sm">

          {/* Label row */}
          <div className="flex justify-between items-center mb-3">
            <motion.span
              key={stage}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ color: done ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.60)" }}
            >
              {STAGES[stage]?.label}
            </motion.span>
            <span
              className="text-[10px] tabular-nums"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {pct}%
            </span>
          </div>

          {/* Thin bar */}
          <div
            className="w-full rounded-full relative overflow-hidden"
            style={{ height: "1.5px", background: "rgba(255,255,255,0.10)" }}
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${pct}%`,
                background: done ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.78)",
                transition: "width 0.04s linear, background 0.5s ease",
              }}
            />
          </div>

          {/* ASCII bar */}
          <div className="mt-3 text-[11px] tracking-[0.08em]">
            {Array.from({ length: BAR_LEN }).map((_, i) => (
              <span
                key={i}
                style={{
                  color: i < filled
                    ? (done ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.72)")
                    : "rgba(255,255,255,0.13)",
                }}
              >
                {i < filled ? "█" : "░"}
              </span>
            ))}
          </div>
        </div>

        {/* ── Cursor / Complete badge ── */}
        <div className="mt-10 h-6 flex items-center justify-center">
          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-2.5"
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.62)" }} />
              <span
                className="text-[9px] tracking-[0.5em] uppercase"
                style={{ color: "rgba(255,255,255,0.52)" }}
              >
                Complete
              </span>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.62)" }} />
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="rounded-[1px]"
              style={{ width: 9, height: 18, background: "rgba(255,255,255,0.58)" }}
            />
          )}
        </div>

      </div>
    </motion.div>
  );
}
