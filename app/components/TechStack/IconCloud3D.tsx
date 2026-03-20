"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { TechEntry } from "@/app/types/techstack";
import { TECHS } from "@/app/data/techstack";

type Props = {
  colorized: boolean;
  onHoverTech: (tech: TechEntry | null) => void;
};

export function IconCloud3D({ colorized, onHoverTech }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCloud, setHoveredCloud] = useState(-1);
  const rotRef = useRef({ x: 0.38, y: 0 });
  const isDragging = useRef(false);
  const isHoveringIcon = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const dragVelRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const [cloudSize, setCloudSize] = useState(560);

  useEffect(() => {
    const update = () =>
      setCloudSize(
        window.innerWidth >= 640 ? 560 : Math.max(300, window.innerWidth - 40),
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const N = TECHS.length;

  const basePoints = useMemo(() => {
    const phi = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      return { x: r * Math.cos(theta), y, z: r * Math.sin(theta) };
    });
  }, [N]);

  useEffect(() => {
    let running = true;
    const CX = cloudSize / 2;
    const CY = cloudSize / 2;
    const radius = cloudSize * 0.4;

    const tick = () => {
      if (!running) return;
      if (!isDragging.current && !isHoveringIcon.current) {
        dragVelRef.current.y *= 0.95;
        dragVelRef.current.x *= 0.95;
        rotRef.current.y += 0.003 + dragVelRef.current.y;
        rotRef.current.x +=
          (0.38 - rotRef.current.x) * 0.008 + dragVelRef.current.x;
      }
      const cosX = Math.cos(rotRef.current.x);
      const sinX = Math.sin(rotRef.current.x);
      const cosY = Math.cos(rotRef.current.y);
      const sinY = Math.sin(rotRef.current.y);

      basePoints.forEach((pt, idx) => {
        const el = itemRefs.current[idx];
        if (!el) return;
        const x1 = pt.x * cosY + pt.z * sinY;
        const z1 = -pt.x * sinY + pt.z * cosY;
        const y2 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;
        const depth = (z2 + 1) / 2;
        const scale = 0.45 + depth * 0.85;
        const opacity = 0.15 + depth * 0.85;
        el.style.left = `${CX + x1 * radius}px`;
        el.style.top = `${CY - y2 * radius}px`;
        el.style.opacity = `${opacity}`;
        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
        el.style.zIndex = `${Math.round(z2 * 100 + 100)}`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [basePoints, cloudSize]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto select-none cursor-grab active:cursor-grabbing shrink-0"
      style={{ width: cloudSize, height: cloudSize }}
      onMouseDown={(e) => {
        e.preventDefault();
        isDragging.current = true;
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }}
      onMouseMove={(e) => {
        if (!isDragging.current) return;
        const dx = e.clientX - lastMouse.current.x;
        const dy = e.clientY - lastMouse.current.y;
        dragVelRef.current.y = dx * 0.008;
        dragVelRef.current.x = dy * 0.008;
        rotRef.current.y += dx * 0.005;
        rotRef.current.x += dy * 0.005;
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }}
      onMouseUp={() => {
        isDragging.current = false;
      }}
      onMouseLeave={() => {
        isDragging.current = false;
        isHoveringIcon.current = false;
        setHoveredCloud(-1);
        onHoverTech(null);
      }}
    >
      {TECHS.map((tech, i) => {
        const isHov = hoveredCloud === i;
        const showColor = colorized || isHov;
        return (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="absolute"
            style={{ willChange: "transform, opacity, left, top" }}
            onMouseEnter={() => {
              isHoveringIcon.current = true;
              setHoveredCloud(i);
              onHoverTech(tech);
            }}
            onMouseLeave={() => {
              isHoveringIcon.current = false;
              setHoveredCloud(-1);
              onHoverTech(null);
            }}
          >
            <div
              style={{
                filter: isHov
                  ? `drop-shadow(0 0 10px ${tech.color}) drop-shadow(0 0 24px ${tech.color}66)`
                  : "none",
                transition: "filter 0.3s ease",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.img}
                alt={tech.label}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0";
                }}
                style={{
                  width: 44,
                  height: 44,
                  objectFit: "contain",
                  filter: showColor
                    ? tech.invert
                      ? "invert(1) brightness(1.25)"
                      : "grayscale(0%) brightness(1.2)"
                    : tech.invert
                      ? "invert(1) grayscale(100%) brightness(0.78)"
                      : "grayscale(100%) brightness(0.72) saturate(0)",
                  transition: "filter 0.4s ease",
                  pointerEvents: "none",
                  display: "block",
                }}
              />
            </div>
            {isHov && (
              <div
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap
                           text-[10px] font-mono tracking-wide pointer-events-none"
                style={{ color: tech.color }}
              >
                {tech.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
