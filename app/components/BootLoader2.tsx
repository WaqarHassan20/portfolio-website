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

export default function BootLoader2({ onDone }: { onDone: () => void }) {
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
        if (i >= 2) setShowName(true);
      }, acc);
    });

    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  const pct = Math.round(progress);

  return (
    /* Full-screen backdrop */
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.85, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060606] select-none"
      style={{ fontFamily: 'var(--font-jetbrains-mono, "JetBrains Mono", monospace)' }}
    >
      {/* Subtle full-screen dot-grid */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* ── Centered rectangular card ── */}
      <div
        className="relative w-[min(1080px,96vw)] overflow-hidden"
        style={{ background: "#0a0a0a" }}
      >
        {/* Card-level vignette */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }} />

        {/* ── Top edge bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 flex items-center justify-between px-8 sm:px-12 pt-5 pb-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-[8px] tracking-[0.5em] uppercase" style={{ color: "rgba(255,255,255,0.48)" }}>
            Portfolio
          </span>
          <span className="text-[8px] tracking-[0.4em] uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>
            Loading System
          </span>
          <span className="text-[8px] tracking-[0.25em] tabular-nums" style={{ color: "rgba(255,255,255,0.48)" }}>
            {String(pct).padStart(3, "0")} / 100
          </span>
        </motion.div>

        {/* ── Main split layout ── */}
        <div className="relative z-10 flex items-stretch px-8 sm:px-12 py-8 gap-0">

          {/* LEFT: Name + stage list */}
          <div className="flex-1 flex flex-col justify-center pr-8 sm:pr-12">

            {/* Name / role */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={showName ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7"
            >
              <h1
                className="font-black leading-none"
                style={{
                  fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)",
                  letterSpacing: "-0.02em",
                  color: done ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.92)",
                  textShadow: done ? "0 0 40px rgba(255,255,255,0.3)" : "none",
                  transition: "text-shadow 0.7s ease, color 0.5s ease",
                }}
              >
                Waqar UL Hassan
              </h1>
              <p className="mt-2 tracking-[0.34em] uppercase" style={{ fontSize: "9.5px", color: "rgba(255,255,255,0.5)" }}>
                Software&nbsp;Engineer&nbsp;·&nbsp;Full&#8209;Stack&nbsp;Developer
              </p>
            </motion.div>

            {/* Stage list */}
            <div className="flex flex-col gap-3.5">
              {STAGES.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <motion.span
                    animate={i === stage && !done ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
                    transition={{ duration: 1.1, repeat: i === stage && !done ? Infinity : 0, ease: "easeInOut" }}
                    style={{
                      fontSize: "12px",
                      lineHeight: 1,
                      color: done || i < stage
                        ? "rgba(255,255,255,0.62)"
                        : i === stage
                        ? "rgba(255,255,255,0.98)"
                        : "rgba(255,255,255,0.22)",
                    }}
                  >
                    {done || i < stage ? "✓" : i === stage ? "›" : "·"}
                  </motion.span>
                  <span style={{
                    fontSize: "10.5px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: done || i < stage
                      ? "rgba(255,255,255,0.48)"
                      : i === stage
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.22)",
                    transition: "color 0.3s ease",
                  }}>
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* VERTICAL DIVIDER */}
          <div
            className="w-px flex-shrink-0 self-stretch mx-2"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.12) 15%, rgba(255,255,255,0.12) 85%, transparent 100%)",
            }}
          />

          {/* RIGHT: Giant counter + progress bar */}
          <div className="w-[44%] flex flex-col items-center justify-center pl-8 sm:pl-12 gap-5">

            {/* Giant number */}
            <div className="flex items-start leading-none">
              <span
                className="font-black tabular-nums"
                style={{
                  fontSize: "clamp(5.5rem, 12vw, 10rem)",
                  letterSpacing: "-0.05em",
                  color: "#ffffff",
                  textShadow: done
                    ? "0 0 70px rgba(255,255,255,0.55), 0 0 150px rgba(255,255,255,0.18)"
                    : "0 0 40px rgba(255,255,255,0.18)",
                  transition: "text-shadow 0.7s ease",
                }}
              >
                {String(pct).padStart(3, "0")}
              </span>
              <span
                className="font-bold mt-3 ml-1.5"
                style={{
                  fontSize: "clamp(1.2rem, 2.8vw, 2.2rem)",
                  color: done ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.38)",
                  transition: "color 0.7s ease",
                }}
              >
                %
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full">
              <div
                className="relative overflow-hidden rounded-full"
                style={{ height: "2px", background: "rgba(255,255,255,0.1)" }}
              >
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{ background: done ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.82)" }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.04, ease: "linear" }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                {[0, 25, 50, 75, 100].map((n) => (
                  <span
                    key={n}
                    className="text-[8px] tabular-nums"
                    style={{
                      letterSpacing: "0.08em",
                      color: pct >= n ? "rgba(255,255,255,0.52)" : "rgba(255,255,255,0.14)",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom edge bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="relative z-10 flex items-center justify-between px-8 sm:px-12 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <motion.span
            key={stage}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[8.5px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            {done ? "System ready" : STAGES[stage]?.label}
          </motion.span>

          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.65)" }} />
              <span className="text-[8.5px] tracking-[0.46em] uppercase" style={{ color: "rgba(255,255,255,0.58)" }}>
                Complete
              </span>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.65)" }} />
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="rounded-[1px]"
              style={{ width: 7, height: 14, background: "rgba(255,255,255,0.55)" }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
