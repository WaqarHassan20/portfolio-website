"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const STAGES = [
  { label: "Initializing environment", dur: 520 },
  { label: "Loading modules", dur: 480 },
  { label: "Compiling assets", dur: 600 },
  { label: "Starting runtime", dur: 420 },
  { label: "System ready", dur: 300 },
];

const GLITCH_POOL = "!@#$%&<>/\\|_+=~^?[]{}ABCXYZ0123456789";

/* ── Arc ring progress indicator ────────────────────────── */
function RingProgress({ pct, done }: { pct: number; done: boolean }) {
  const R = 88;
  const SIZE = 220;
  const cx = SIZE / 2;
  const STROKE = 1.5;
  const circumference = 2 * Math.PI * R;
  const dashOffset = circumference * (1 - pct / 100);

  // tip dot position (arc starts at top = -90°)
  const tipRad = ((-90 + (pct / 100) * 360) * Math.PI) / 180;
  const tipX = cx + R * Math.cos(tipRad);
  const tipY = cx + R * Math.sin(tipRad);

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: SIZE, height: SIZE }}
    >
      <svg width={SIZE} height={SIZE} className="absolute inset-0">
        {/* Outer dashed decoration ring */}
        <circle
          cx={cx}
          cy={cx}
          r={R + 12}
          fill="none"
          stroke="rgba(255,255,255,0.025)"
          strokeWidth={1}
          strokeDasharray="2 9"
        />
        {/* Track */}
        <circle
          cx={cx}
          cy={cx}
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={STROKE}
        />
        {/* Progress arc */}
        <circle
          cx={cx}
          cy={cx}
          r={R}
          fill="none"
          stroke={done ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.78)"}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${cx} ${cx})`}
          style={{
            transition: "stroke-dashoffset 0.04s linear, stroke 0.6s ease",
          }}
        />
        {/* Glowing tip dot */}
        {pct > 1 && pct < 100 && (
          <circle
            cx={tipX}
            cy={tipY}
            r={2.5}
            fill="rgba(255,255,255,0.95)"
            style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.9))" }}
          />
        )}
      </svg>

      {/* Center content */}
      <div className="flex flex-col items-center justify-center z-10">
        <div className="flex items-start leading-none">
          <span
            className="font-black tabular-nums"
            style={{
              fontSize: "clamp(3.8rem, 13vw, 6.5rem)",
              letterSpacing: "-0.06em",
              color: done ? "#fff" : "rgba(255,255,255,0.88)",
              textShadow: done
                ? "0 0 50px rgba(255,255,255,0.55), 0 0 100px rgba(255,255,255,0.22)"
                : "0 0 28px rgba(255,255,255,0.1)",
              transition: "color 0.5s ease, text-shadow 0.6s ease",
            }}
          >
            {pct}
          </span>
          <span
            className="font-bold mt-2 ml-0.5"
            style={{
              fontSize: "clamp(1rem, 3vw, 1.8rem)",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            %
          </span>
        </div>
      </div>
    </div>
  );
}

const NAME = "Waqar UL Hassan";

/* ── Per-letter glitch scramble reveal for the name ─────────── */
function GlitchName({ show }: { show: boolean }) {
  const [letters, setLetters] = useState<string[]>(() =>
    NAME.split("").map((c) => (c === " " ? " " : "\u00a0")),
  );
  const started = useRef(false);

  useEffect(() => {
    if (!show || started.current) return;
    started.current = true;
    NAME.split("").forEach((realChar, i) => {
      const delay = i * 58;
      if (realChar === " ") {
        setTimeout(
          () =>
            setLetters((p) => {
              const a = [...p];
              a[i] = " ";
              return a;
            }),
          delay,
        );
        return;
      }
      let count = 0;
      const scrambles = 9;
      setTimeout(() => {
        const iv = setInterval(() => {
          count++;
          setLetters((p) => {
            const a = [...p];
            a[i] =
              count >= scrambles
                ? realChar
                : GLITCH_POOL[Math.floor(Math.random() * GLITCH_POOL.length)];
            return a;
          });
          if (count >= scrambles) clearInterval(iv);
        }, 46);
      }, delay);
    });
  }, [show]);

  return (
    <p
      className="font-black leading-tight"
      style={{
        fontSize: "clamp(1.15rem, 2.8vw, 1.75rem)",
        letterSpacing: "-0.01em",
      }}
    >
      {NAME.split("").map((realChar, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.08, delay: i * 0.058 }}
          className="inline-block"
          style={{
            color:
              letters[i] === realChar || letters[i] === " "
                ? "rgba(255,255,255,0.9)"
                : "rgba(100,200,255,0.92)",
          }}
        >
          {letters[i]}
        </motion.span>
      ))}
    </p>
  );
}

export default function BootLoader({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showName, setShowName] = useState(false);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });

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

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const pct = Math.round(progress);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.85, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060606] overflow-hidden"
      style={{
        fontFamily: 'var(--font-jetbrains, "JetBrains Mono", monospace)',
      }}
    >
      {/* Dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.042) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 28%, rgba(0,0,0,0.78) 100%)",
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
          <div
            className="h-px w-10"
            style={{ background: "rgba(255,255,255,0.38)" }}
          />
          <span
            className="text-[9.5px] tracking-[0.55em] uppercase"
            style={{ color: "rgba(255,255,255,0.52)" }}
          >
            Portfolio
          </span>
          <div
            className="h-px w-10"
            style={{ background: "rgba(255,255,255,0.38)" }}
          />
        </motion.div>

        {/* ── Arc ring progress ── */}
        <RingProgress pct={pct} done={done} />

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
            transition={{
              duration: 1.1,
              repeat: done ? 0 : Infinity,
              ease: "easeInOut",
            }}
            style={{ color: "rgba(255,255,255,0.78)", fontSize: "11px" }}
          >
            ›
          </motion.span>
          <span
            className="text-[10.5px] tracking-[0.26em] uppercase"
            style={{
              color: done ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.58)",
            }}
          >
            {STAGES[stage]?.label}
          </span>
        </motion.div>

        {/* ── Progress bar ── removed (borderless) ── */}

        {/* ── Name + role (glitch scramble reveal per letter) ── */}
        <div className="text-center mt-7 mb-3" aria-label="Waqar UL Hassan">
          <GlitchName show={showName} />
          <motion.p
            initial={{ opacity: 0 }}
            animate={showName ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.75, delay: 0.9, ease: "easeOut" }}
            className="mt-1.5 tracking-[0.38em] uppercase"
            style={{ fontSize: "10px", color: "rgba(255,255,255,0.44)" }}
          >
            Software&nbsp;Engineer&nbsp;&middot;&nbsp;Full-Stack&nbsp;Developer
          </motion.p>
        </div>

        {/* ── Cursor while loading / "Complete" badge when done ── */}
        <div className="mt-6 h-6 flex items-center justify-center">
          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-2.5"
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.62)" }}
              />
              <span
                className="text-[9px] tracking-[0.5em] uppercase"
                style={{ color: "rgba(255,255,255,0.52)" }}
              >
                Complete
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.62)" }}
              />
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="rounded-[1px]"
              style={{
                width: 9,
                height: 18,
                background: "rgba(255,255,255,0.58)",
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
