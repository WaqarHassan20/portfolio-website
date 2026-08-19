"use client";

import { motion } from "framer-motion";

interface DevOpsInfinityLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | number;
  className?: string;
  showGlow?: boolean;
}

export default function DevOpsInfinityLogo({
  size = "md",
  className = "",
  showGlow = true,
}: DevOpsInfinityLogoProps) {
  // Determine width / height in pixels based on size preset
  const dim =
    typeof size === "number"
      ? size
      : size === "sm"
      ? 48
      : size === "md"
      ? 96
      : size === "lg"
      ? 180
      : 260; // "xl"

  // Standard smooth figure-8 infinity bezier path inside 200x100 viewBox
  // Curve moves smoothly: left loop (center 50,50 radius 40) <-> center (100,50) <-> right loop (center 150,50 radius 40)
  const pathD =
    "M 100,50 C 120,20 155,18 175,38 C 195,58 195,82 175,92 C 155,102 120,80 100,50 C 80,20 45,18 25,38 C 5,58 5,82 25,92 C 45,102 80,80 100,50 Z";

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: dim, height: dim / 2 }}
    >
      {/* Background ambient radial glow */}
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.35) 0%, rgba(59, 130, 246, 0.20) 45%, transparent 75%)",
            filter: "blur(20px)",
            transform: "scale(1.3)",
          }}
        />
      )}

      <svg
        viewBox="0 0 200 100"
        className="w-full h-full relative z-10 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Electric Blue -> Cyan Ribbon Gradient */}
          <linearGradient id="devops-infinity-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d2ff" />
            <stop offset="35%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          {/* Highlight metallic core gradient */}
          <linearGradient id="devops-core-grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>

          {/* Deep shadow / depth gradient */}
          <linearGradient id="devops-shadow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0369a1" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1e1b4b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.8" />
          </linearGradient>

          {/* Neon Glow Filter */}
          <filter id="infinity-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur1" />
            <feGaussianBlur stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Core Crisp Glow */}
          <filter id="core-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Layer 1: Ambient Outer Glow Stroke ── */}
        <path
          d={pathD}
          stroke="url(#devops-infinity-grad)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
          filter="url(#infinity-glow)"
        />

        {/* ── Layer 2: 3D Depth Base Ribbon ── */}
        <path
          d={pathD}
          stroke="url(#devops-shadow-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* ── Layer 3: Main Vibrant Gradient Ribbon ── */}
        <path
          d={pathD}
          stroke="url(#devops-infinity-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── Layer 4: Inner Metallic Highlight Core Line ── */}
        <path
          d={pathD}
          stroke="url(#devops-core-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#core-glow)"
          opacity="0.85"
        />

        {/* ── Layer 5: Animated Flowing CI/CD Pulse Trail ── */}
        <motion.path
          d={pathD}
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="24 160"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -184 }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "linear",
          }}
          filter="url(#core-glow)"
          style={{ mixBlendMode: "overlay" }}
        />

        {/* ── Layer 6: Second Offset Flowing Cyan Particle ── */}
        <motion.path
          d={pathD}
          stroke="#38bdf8"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="16 160"
          initial={{ strokeDashoffset: -92 }}
          animate={{ strokeDashoffset: -276 }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "linear",
          }}
          filter="url(#core-glow)"
        />

        {/* ── Optional Stage Node Dots (Plan, Build, Deploy, Monitor) ── */}
        <g opacity="0.95">
          {/* Left loop top: Plan */}
          <circle cx="25" cy="38" r="3" fill="#ffffff" filter="url(#core-glow)" />
          {/* Center intersection: Integration */}
          <circle cx="100" cy="50" r="4" fill="#00d2ff" filter="url(#infinity-glow)" />
          {/* Right loop top: Deploy */}
          <circle cx="175" cy="38" r="3" fill="#ffffff" filter="url(#core-glow)" />
        </g>
      </svg>
    </div>
  );
}
