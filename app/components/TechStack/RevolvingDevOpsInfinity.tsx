"use client";

import { useEffect, useRef, useState } from "react";
import { TECHS } from "@/lib/data/techstack";
import type { TechEntry } from "@/types/techstack";

// Key DevOps lifecycle skills to revolve in the loop
const DEVOPS_CYCLE_LABELS = [
  "Docker",
  "Kubernetes",
  "AWS",
  "Terraform",
  "ArgoCD",
  "GH Actions",
  "Prometheus",
  "Grafana",
  "Nginx",
  "Bash",
];

const DEVOPS_SKILLS = DEVOPS_CYCLE_LABELS.map(
  (lbl) => TECHS.find((t) => t.label === lbl)!
).filter(Boolean);

interface SkillPos {
  x: number;
  y: number;
  tech: TechEntry;
}

export default function RevolvingDevOpsInfinity({
  onHoverTech,
}: {
  onHoverTech?: (tech: TechEntry | null) => void;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [positions, setPositions] = useState<SkillPos[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const distanceRef = useRef<number>(0);

  // Figure-8 infinity path d inside 800x400 viewBox
  const pathD =
    "M 400,200 C 490,60 640,50 720,130 C 800,210 800,310 720,360 C 630,410 490,320 400,200 C 310,80 170,50 90,130 C 10,210 10,310 90,360 C 170,410 310,320 400,200 Z";

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    const count = DEVOPS_SKILLS.length;

    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Advance loop position if not hovering any skill
      if (!hoveredSkill) {
        distanceRef.current = (distanceRef.current + delta * 52) % totalLength;
      }

      const currentDist = distanceRef.current;
      const nextPositions: SkillPos[] = DEVOPS_SKILLS.map((tech, i) => {
        const offset = (currentDist + (i / count) * totalLength) % totalLength;
        const pt = path.getPointAtLength(offset);
        return { x: pt.x, y: pt.y, tech };
      });

      setPositions(nextPositions);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hoveredSkill]);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[2/1] min-h-[320px] sm:min-h-[380px] md:min-h-[440px] flex items-center justify-center select-none overflow-visible py-4">
      {/* Background ambient radial glow */}
      <div
        className="absolute inset-x-8 inset-y-4 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.22) 0%, rgba(59, 130, 246, 0.12) 45%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 z-10 overflow-visible pointer-events-none"
      >
        <defs>
          <linearGradient id="revolving-infinity-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d2ff" />
            <stop offset="30%" stopColor="#3b82f6" />
            <stop offset="65%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <linearGradient id="revolving-core-grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
          </linearGradient>

          <filter id="revolving-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="18" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer ambient glow path */}
        <path
          d={pathD}
          stroke="url(#revolving-infinity-grad)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
          filter="url(#revolving-glow)"
          fill="none"
        />

        {/* 3D Dark base ribbon track */}
        <path
          d={pathD}
          stroke="rgba(10, 15, 26, 0.95)"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Main Vibrant Ribbon track */}
        <path
          ref={pathRef}
          d={pathD}
          stroke="url(#revolving-infinity-grad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Bright core laser line */}
        <path
          d={pathD}
          stroke="url(#revolving-core-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
          fill="none"
        />
      </svg>

      {/* ── Revolving Skill Badges HTML Layer ── */}
      <div className="absolute inset-0 z-20 pointer-events-auto overflow-visible">
        {positions.map(({ x, y, tech }) => {
          const isHovered = hoveredSkill === tech.label;
          // Scale percentages relative to viewBox (800x400)
          const leftPct = (x / 800) * 100;
          const topPct = (y / 400) * 100;

          return (
            <div
              key={tech.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 group"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: `translate(-50%, -50%) scale(${isHovered ? 1.25 : 1})`,
                zIndex: isHovered ? 40 : 25,
              }}
              onMouseEnter={() => {
                setHoveredSkill(tech.label);
                onHoverTech?.(tech);
              }}
              onMouseLeave={() => {
                setHoveredSkill(null);
                onHoverTech?.(null);
              }}
            >
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-xl transition-all duration-300"
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${tech.color}30 0%, rgba(10,10,10,0.95) 100%)`
                    : "rgba(10, 12, 18, 0.88)",
                  borderColor: isHovered ? tech.color : "rgba(255, 255, 255, 0.18)",
                  boxShadow: isHovered
                    ? `0 0 20px ${tech.color}88, 0 0 40px ${tech.color}33`
                    : `0 4px 14px rgba(0,0,0,0.60), 0 0 10px ${tech.color}25`,
                }}
              >
                {/* Skill Icon */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.img}
                  alt={tech.label}
                  className="w-5 h-5 object-contain shrink-0"
                  style={{
                    filter: tech.invert
                      ? `invert(1) brightness(1.2) drop-shadow(0 0 6px ${tech.color}aa)`
                      : `drop-shadow(0 0 6px ${tech.color}aa)`,
                  }}
                />
                {/* Skill Label */}
                <span
                  className="font-mono text-[11px] font-bold tracking-wider whitespace-nowrap"
                  style={{
                    color: isHovered ? tech.color : "#ffffff",
                    textShadow: isHovered ? `0 0 8px ${tech.color}` : "0 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  {tech.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
