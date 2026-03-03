"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LOADER_STAGES = [
  { label: "Initializing environment", dur: 520 },
  { label: "Loading modules", dur: 480 },
  { label: "Compiling assets", dur: 600 },
  { label: "Starting runtime", dur: 420 },
  { label: "Ready", dur: 300 },
];

export default function BootLoader({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showName, setShowName] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [exiting, setExiting] = useState(false);
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; });

  useEffect(() => {
    let cancelled = false;

    // Total duration of all stages
    const totalDur = LOADER_STAGES.reduce((a, s) => a + s.dur, 0);

    // Tick progress bar from 0 → 100 smoothly over totalDur ms
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
        setExiting(true);
        setTimeout(() => onDoneRef.current(), 800);
      }
    }, TICK);

    // Stage labels timed to their cumulative durations
    let acc = 0;
    LOADER_STAGES.forEach((s, i) => {
      acc += s.dur;
      setTimeout(() => {
        if (cancelled) return;
        setStage(i);
        if (i >= 1) setShowName(true);
        if (i >= 2) setShowRole(true);
      }, acc);
    });

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const pct = Math.round(progress);
  const BAR_LEN = 28;
  const filled = Math.round((pct / 100) * BAR_LEN);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#060606]"
      style={{ fontFamily: '"Courier New", Courier, monospace', pointerEvents: exiting ? "none" : "all" }}
    >
      {/* Subtle scanline texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.018) 3px, rgba(255,255,255,0.018) 4px)",
        }}
      />
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 40%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center select-none w-full px-8">

        {/* WELCOME label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="text-[11px] font-mono uppercase text-white/25 mb-10 tracking-[0.35em]"
        >
          WELCOME
        </motion.p>

        {/* Name — single line */}
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={showName ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="font-light text-white leading-none whitespace-nowrap"
            style={{ fontSize: "clamp(3rem, 9.5vw, 8.5rem)", letterSpacing: "-0.025em" }}
          >
            Waqar UL Hassan
          </motion.h1>
        </div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={showRole ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[12px] font-mono tracking-[0.38em] uppercase text-white/35 mb-16"
        >
          Software&nbsp;Engineer&nbsp;&middot;&nbsp;Full-Stack&nbsp;Developer
        </motion.p>

        {/* Progress bar + stage label */}
        <div className="w-full max-w-105">
          {/* Label row */}
          <div className="flex justify-between items-center mb-3">
            <motion.span
              key={stage}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/28"
            >
              {LOADER_STAGES[stage]?.label}
            </motion.span>
            <span className="text-[10px] font-mono text-white/22">{pct}%</span>
          </div>

          {/* Track */}
          <div
            className="w-full h-px relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{ width: `${pct}%`, background: "rgba(255,255,255,0.55)" }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* ASCII bar */}
          <div className="mt-3 text-[11px] font-mono tracking-[0.08em] text-white/18">
            {Array.from({ length: BAR_LEN }).map((_, i) => (
              <span
                key={i}
                style={{ color: i < filled ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.10)" }}
              >
                {i < filled ? "█" : "░"}
              </span>
            ))}
          </div>
        </div>

        {/* Blinking cursor — hidden once bar hits 100% */}
        {progress < 100 && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            className="mt-10 w-2.5 h-4.5 bg-white/40"
          />
        )}
      </div>
    </motion.div>
  );
}
