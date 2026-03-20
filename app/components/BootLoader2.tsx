"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STAGES = [
  { label: "Initializing environment", dur: 520 },
  { label: "Loading modules", dur: 480 },
  { label: "Compiling assets", dur: 600 },
  { label: "Starting runtime", dur: 420 },
  { label: "System ready", dur: 300 },
];
const TOTAL_DUR = STAGES.reduce((a, s) => a + s.dur, 0);
const NAME_CHARS = "WAQAR UL HASSAN".split("");

const CORNERS = [
  { id: "tl", top: true, left: true },
  { id: "tr", top: true, left: false },
  { id: "bl", top: false, left: true },
  { id: "br", top: false, left: false },
];

export default function BootLoader2({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [year, setYear] = useState<number | null>(null);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    let cancelled = false;
    const TICK = 30;
    const steps = Math.ceil(TOTAL_DUR / TICK);
    let tick = 0;

    const interval = setInterval(() => {
      if (cancelled) return;
      tick++;
      const p = Math.min(Math.round((tick / steps) * 100), 100);
      setPct(p);
      if (p >= 100) {
        clearInterval(interval);
        setDone(true);
        setTimeout(() => {
          if (cancelled) return;
          setExiting(true);
          setTimeout(() => onDoneRef.current(), 900);
        }, 1000);
      }
    }, TICK);

    let acc = 0;
    STAGES.forEach((s, i) => {
      acc += s.dur;
      setTimeout(() => {
        if (!cancelled) setStage(i);
      }, acc);
    });

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Letters reveal between pct 8 – 65, with blur-in animation
  const visibleChars = Math.floor(
    Math.max(0, Math.min(1, (pct - 8) / 57)) * NAME_CHARS.length,
  );

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1, scale: exiting ? 0.98 : 1 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="fixed inset-0 z-100 select-none overflow-hidden flex flex-col"
      style={{
        background: "#020202",
        fontFamily: 'var(--font-jetbrains-mono, "JetBrains Mono", monospace)',
      }}
    >
      {/* Soft radial centre glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 72% 62% at 50% 48%, rgba(255,255,255,0.026) 0%, transparent 68%)",
        }}
      />

      {/* CRT scanline texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)",
          backgroundSize: "100% 2px",
          opacity: 0.5,
        }}
      />

      {/* Top edge progress bar */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: "1.5px", background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="absolute left-0 top-0 h-full"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.04, ease: "linear" }}
          style={{
            background: "rgba(255,255,255,0.82)",
            boxShadow:
              "0 0 8px rgba(255,255,255,0.55), 0 0 24px rgba(255,255,255,0.2)",
          }}
        />
      </div>

      {/* Corner brackets */}
      {CORNERS.map(({ id, top, left }, idx) => (
        <motion.div
          key={id}
          className="absolute"
          style={{
            ...(top ? { top: 28 } : { bottom: 28 }),
            ...(left ? { left: 36 } : { right: 36 }),
            width: 22,
            height: 22,
            borderTop: top ? "1px solid rgba(255,255,255,0.2)" : undefined,
            borderBottom: !top ? "1px solid rgba(255,255,255,0.2)" : undefined,
            borderLeft: left ? "1px solid rgba(255,255,255,0.2)" : undefined,
            borderRight: !left ? "1px solid rgba(255,255,255,0.2)" : undefined,
          }}
          initial={{ opacity: 0, x: left ? -5 : 5, y: top ? -5 : 5 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.5, delay: 0.07 * idx, ease: "easeOut" }}
        />
      ))}

      {/* Top meta bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-10 flex items-center justify-between px-14 sm:px-20 pt-6"
      >
        <span
          style={{
            fontSize: 8,
            letterSpacing: "0.52em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          Portfolio
        </span>
        <span
          style={{
            fontSize: 8,
            letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.16)",
          }}
        >
          {year ?? ""}
        </span>
        <span
          className="tabular-nums"
          style={{
            fontSize: 8,
            letterSpacing: "0.28em",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          {String(pct).padStart(3, "0")} / 100
        </span>
      </motion.div>

      {/* ── Main centre content ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 -mt-6">
        {/* Name — letter-by-letter blur reveal */}
        <div
          className="flex items-baseline flex-wrap justify-center"
          style={{ gap: "0.06em" }}
        >
          {NAME_CHARS.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={
                i < visibleChars
                  ? { opacity: char === " " ? 0 : 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 14, filter: "blur(8px)" }
              }
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: "clamp(2rem, 5.2vw, 5.2rem)",
                fontWeight: 900,
                letterSpacing: "0.13em",
                color: done ? "#ffffff" : "rgba(255,255,255,0.93)",
                display: "inline-block",
                width: char === " " ? "0.45em" : undefined,
                textShadow: done ? "0 0 60px rgba(255,255,255,0.45)" : "none",
                transition: "text-shadow 0.8s ease, color 0.5s ease",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={pct > 42 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-4"
          style={{
            fontSize: 9,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.36)",
          }}
        >
          Software&nbsp;Engineer&nbsp;·&nbsp;Full&#8209;Stack&nbsp;Developer
        </motion.p>

        {/* Giant percentage counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-12 flex items-start"
        >
          <span
            className="font-black tabular-nums leading-none"
            style={{
              fontSize: "clamp(4.5rem, 11vw, 9rem)",
              letterSpacing: "-0.04em",
              color: done ? "#fff" : "rgba(255,255,255,0.86)",
              textShadow: done
                ? "0 0 80px rgba(255,255,255,0.5)"
                : "0 0 40px rgba(255,255,255,0.1)",
              transition: "text-shadow 0.7s ease, color 0.4s ease",
            }}
          >
            {String(pct).padStart(3, "0")}
          </span>
          <span
            className="font-bold mt-2.5 ml-1.5"
            style={{
              fontSize: "clamp(1.2rem, 3vw, 2.4rem)",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            %
          </span>
        </motion.div>

        {/* Stage label */}
        <AnimatePresence mode="wait">
          <motion.span
            key={done ? "done" : stage}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.22 }}
            className="mt-7"
            style={{
              fontSize: 8.5,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.26)",
            }}
          >
            {done ? "System Ready" : STAGES[stage]?.label}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Bottom: stage pills + progress track ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center gap-3 pb-10 px-14 sm:px-20"
      >
        {/* Stage pills */}
        <div className="flex items-center gap-2.5">
          {STAGES.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === stage && !done ? 20 : 4,
                background:
                  done || i < stage
                    ? "rgba(255,255,255,0.65)"
                    : i === stage
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.15)",
              }}
              transition={{ duration: 0.3 }}
              style={{ height: 3, borderRadius: 2, flexShrink: 0 }}
            />
          ))}
        </div>

        {/* Progress track */}
        <div
          className="w-full max-w-xs relative"
          style={{ height: 1, background: "rgba(255,255,255,0.07)" }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.04, ease: "linear" }}
            style={{ background: "rgba(255,255,255,0.45)" }}
          />
        </div>
      </motion.div>

      {/* Flash on complete */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.11, 0] }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none bg-white"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
