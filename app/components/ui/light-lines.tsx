"use client";

import { useEffect, useRef } from "react";

interface LightLinesProps {
  /** Number of vertical lines */
  lines?: number;
  /** CSS colour for the static lines */
  lineColor?: string;
  /** CSS colour for the travelling light dot */
  lightColor?: string;
  /** Overall opacity of the lines layer */
  linesOpacity?: number;
  /** Peak opacity of the travelling lights */
  lightsOpacity?: number;
  /** Top-edge gradient colour for the fade mask */
  gradientFrom?: string;
  /** Bottom-edge gradient colour for the fade mask */
  gradientTo?: string;
  /** Overall speed scale multiplier for travelling lights */
  speedScale?: number;
  /** Extra class names applied to the wrapper */
  className?: string;
}

/**
 * Decorative background vertical lines with soft travelling-light animations.
 */
export default function LightLines({
  lines = 8,
  lineColor = "rgba(255, 255, 255, 0.04)",
  lightColor = "rgba(255, 255, 255, 0.12)",
  linesOpacity = 0.5,
  lightsOpacity = 0.5,
  gradientFrom = "transparent",
  gradientTo = "transparent",
  speedScale = 1.0,
  className = "",
}: LightLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const baseSpeed = 0.12 * speedScale;

    // Create random state for each line's light dot
    const lineStates = Array.from({ length: lines }, () => ({
      y: Math.random() * 100, // percentage position (0-100)
      speed: (0.8 + Math.random() * 1.5) * baseSpeed,
      direction: Math.random() > 0.5 ? 1 : -1,
      size: 40 + Math.random() * 30, // px height of light tail
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Draw background static lines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = linesOpacity;

      const spacing = w / (lines + 1);

      for (let i = 1; i <= lines; i++) {
        const lx = i * spacing;
        ctx.beginPath();
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx, h);
        ctx.stroke();
      }

      // Draw travelling light dots
      ctx.globalAlpha = lightsOpacity;

      for (let i = 1; i <= lines; i++) {
        const state = lineStates[i - 1];
        const lx = i * spacing;

        // Update position Y percentage
        state.y += state.speed * state.direction;

        // Bounce/wrap at boundaries
        if (state.y > 100) {
          state.y = 100;
          state.direction = -1;
        } else if (state.y < 0) {
          state.y = 0;
          state.direction = 1;
        }

        // Convert percentage to actual Y
        const ly = (state.y / 100) * h;

        // Draw glowing gradient line segment
        const gradient = ctx.createLinearGradient(lx, ly - state.size, lx, ly + state.size);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, lightColor);
        gradient.addColorStop(1, "transparent");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(lx, ly - state.size);
        ctx.lineTo(lx, ly + state.size);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [lines, lineColor, lightColor, linesOpacity, lightsOpacity, speedScale]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}