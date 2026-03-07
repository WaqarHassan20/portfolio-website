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

export default function BootLoader({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showName, setShowName] = useState(false);
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
        // ── 2-second pause at 100%, then fade out ──
        setTimeout(() => {
          if (cancelled) return;
          setExiting(true);
          setTimeout(() => onDoneRef.current(), 850);
        }, 2000);
      }
    }, TICK);

    // Stage label changes at cumulative durations
    let acc = 0;
    STAGES.forEach((s, i) => {
      acc += s.dur;
      setTimeout(() => {
        if (cancelled) return;
        setStage(i);
        if (i >= 2) setShowName(true);
      }, acc);
    });

    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  const pct = Math.round(progress);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.85, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060606] overflow-hidden"
      style={{ fontFamily: 'var(--font-jetbrains, "JetBrains Mono", monospace)' }}
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
          background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 28%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-xl px-8 sm:px-12 flex flex-col items-center select-none">

        {/* ── PORTFOLIO label ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="h-px w-10" style={{ background: "rgba(255,255,255,0.38)" }} />
          <span
            className="text-[9.5px] tracking-[0.55em] uppercase"
            style={{ color: "rgba(255,255,255,0.52)" }}
          >
            Portfolio
          </span>
          <div className="h-px w-10" style={{ background: "rgba(255,255,255,0.38)" }} />
        </motion.div>

        {/* ── Giant percentage counter ── */}
        <div className="relative flex items-start mb-3">
          <span
            className="font-black leading-none tabular-nums"
            style={{
              fontSize: "clamp(5.5rem, 17vw, 13rem)",
              letterSpacing: "-0.05em",
              color: "#ffffff",
              textShadow: done
                ? "0 0 80px rgba(255,255,255,0.4), 0 0 160px rgba(255,255,255,0.15)"
                : "0 0 40px rgba(255,255,255,0.14)",
              transition: "text-shadow 0.6s ease",
            }}
          >
            {String(pct).padStart(3, "0")}
          </span>
          <span
            className="font-bold leading-none mt-3 ml-2"
            style={{
              fontSize: "clamp(1rem, 3vw, 2.2rem)",
              color: "rgba(255,255,255,0.32)",
            }}
          >
            %
          </span>
        </div>

        {/* ── Current stage label ── */}
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-center gap-2 mb-8"
        >
          <motion.span
            animate={done ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.1, repeat: done ? 0 : Infinity, ease: "easeInOut" }}
            style={{ color: "rgba(255,255,255,0.78)", fontSize: "11px" }}
          >
            ›
          </motion.span>
          <span
            className="text-[10.5px] tracking-[0.26em] uppercase"
            style={{ color: done ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.58)" }}
          >
            {STAGES[stage]?.label}
          </span>
        </motion.div>

        {/* ── Progress bar ── */}
        <div className="w-full mb-1.5">
          <div
            className="w-full rounded-full relative overflow-hidden"
            style={{ height: "1.5px", background: "rgba(255,255,255,0.1)" }}
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${pct}%`,
                background: done ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.72)",
                transition: "width 0.04s linear, background 0.5s ease",
              }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[8px] tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.22)" }}>000</span>
            <span className="text-[8px] tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.22)" }}>100</span>
          </div>
        </div>

        {/* ── Name + role (fade in mid-load) ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={showName ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="text-center mt-7 mb-3"
        >
          <p
            className="font-black leading-tight"
            style={{
              fontSize: "clamp(1.15rem, 2.8vw, 1.75rem)",
              letterSpacing: "-0.01em",
              color: "rgba(255,255,255,0.88)",
            }}
          >
            Waqar UL Hassan
          </p>
          <p
            className="mt-1.5 tracking-[0.38em] uppercase"
            style={{ fontSize: "10px", color: "rgba(255,255,255,0.44)" }}
          >
            Software&nbsp;Engineer&nbsp;&middot;&nbsp;Full-Stack&nbsp;Developer
          </p>
        </motion.div>

        {/* ── Cursor while loading / "Complete" badge when done ── */}
        <div className="mt-6 h-6 flex items-center justify-center">
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
