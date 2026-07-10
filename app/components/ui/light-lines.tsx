"use client";

import { useEffect, useRef } from "react";

interface LightLinesProps {
  /** Number of vertical lines */
  lines?: number;
  /** Number of horizontal lines */
  hlines?: number;
  /** CSS colour for the static lines */
  lineColor?: string;
  /** CSS colour for the travelling light dot */
  lightColor?: string;
  /** Overall opacity of the lines layer */
  linesOpacity?: number;
  /** Peak opacity of the travelling lights */
  lightsOpacity?: number;
  /** Overall speed scale multiplier for travelling lights */
  speedScale?: number;
  /** Extra class names applied to the wrapper */
  className?: string;
}

/**
 * Decorative background lines (vertical + horizontal) with soft
 * travelling-light animations on both axes.
 */
export default function LightLines({
  lines = 8,
  hlines = 0,
  lineColor = "rgba(255, 255, 255, 0.04)",
  lightColor = "rgba(255, 255, 255, 0.12)",
  linesOpacity = 0.5,
  lightsOpacity = 0.5,
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
    const baseSpeed = 0.15 * speedScale;

    // Vertical line states (y moves up/down)
    const vStates = Array.from({ length: lines }, () => ({
      y: Math.random() * 100,
      speed: (0.8 + Math.random() * 1.5) * baseSpeed,
      direction: Math.random() > 0.5 ? 1 : -1,
      size: 45 + Math.random() * 35,
    }));

    // Horizontal line states (x moves left/right)
    const hStates = Array.from({ length: hlines }, () => ({
      x: Math.random() * 100,
      speed: (0.7 + Math.random() * 1.2) * baseSpeed,
      direction: Math.random() > 0.5 ? 1 : -1,
      size: 55 + Math.random() * 40,
    }));

    // Sync canvas dimensions to parent via ResizeObserver
    const sync = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      if (width > 0 && height > 0) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
      }
    };

    const initTimer = setTimeout(sync, 50);
    const ro = new ResizeObserver(sync);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const getLogicalSize = () => {
      const dpr = window.devicePixelRatio || 1;
      return { w: canvas.width / dpr, h: canvas.height / dpr };
    };

    const draw = () => {
      const { w, h } = getLogicalSize();
      if (w === 0 || h === 0) {
        animId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      // ── Static vertical lines ──────────────────────────────────────
      const vSpacing = w / (lines + 1);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = linesOpacity;

      for (let i = 1; i <= lines; i++) {
        const lx = i * vSpacing;
        ctx.beginPath();
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx, h);
        ctx.stroke();
      }

      // ── Static horizontal lines ────────────────────────────────────
      if (hlines > 0) {
        const hSpacing = h / (hlines + 1);
        for (let i = 1; i <= hlines; i++) {
          const ly = i * hSpacing;
          ctx.beginPath();
          ctx.moveTo(0, ly);
          ctx.lineTo(w, ly);
          ctx.stroke();
        }
      }

      // ── Travelling lights on vertical lines ───────────────────────
      ctx.globalAlpha = lightsOpacity;

      for (let i = 1; i <= lines; i++) {
        const state = vStates[i - 1];
        const lx = i * vSpacing;

        state.y += state.speed * state.direction;
        if (state.y > 100) { state.y = 100; state.direction = -1; }
        else if (state.y < 0) { state.y = 0; state.direction = 1; }

        const ly = (state.y / 100) * h;
        const sz = state.size;

        const grad = ctx.createLinearGradient(lx, ly - sz, lx, ly + sz);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, lightColor);
        grad.addColorStop(1, "transparent");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(lx, ly - sz);
        ctx.lineTo(lx, ly + sz);
        ctx.stroke();
      }

      // ── Travelling lights on horizontal lines ──────────────────────
      if (hlines > 0) {
        const hSpacing = h / (hlines + 1);

        for (let i = 1; i <= hlines; i++) {
          const state = hStates[i - 1];
          const ly = i * hSpacing;

          state.x += state.speed * state.direction;
          if (state.x > 100) { state.x = 100; state.direction = -1; }
          else if (state.x < 0) { state.x = 0; state.direction = 1; }

          const lx = (state.x / 100) * w;
          const sz = state.size;

          const grad = ctx.createLinearGradient(lx - sz, ly, lx + sz, ly);
          grad.addColorStop(0, "transparent");
          grad.addColorStop(0.5, lightColor);
          grad.addColorStop(1, "transparent");

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(lx - sz, ly);
          ctx.lineTo(lx + sz, ly);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [lines, hlines, lineColor, lightColor, linesOpacity, lightsOpacity, speedScale]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ display: "block" }}
    />
  );
}