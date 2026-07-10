"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TechEntry } from "@/app/types/techstack";
import { TECHS } from "@/app/data/techstack";
import { TechCard } from "./TechCard";
import { IconCloud3D } from "./IconCloud3D";
import { GlobeLeftPanel, GlobeRightPanel } from "./GlobeInfoPanels";

function MobileTechMarquee() {
  const rows = [
    TECHS.filter((_, index) => index % 4 === 0),
    TECHS.filter((_, index) => index % 4 === 1),
    TECHS.filter((_, index) => index % 4 === 2),
    TECHS.filter((_, index) => index % 4 === 3),
  ];

  return (
    <div className="md:hidden px-4 pt-2 pb-10 sm:px-5">
      <div className="mb-8 text-center">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          Skills I work with
        </p>
        <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em]">
          <span className="text-white font-bold about-heading-size">Tech</span>
          <span className="ml-5 text-white/65 font-normal about-heading-size">
            Stack
          </span>
        </h2>
      </div>

      <div className="space-y-2.5">
        {rows.map((row, rowIndex) => {
          const direction = rowIndex % 2 === 0 ? 1 : -1;
          return (
            <div key={rowIndex} className="overflow-hidden py-2">
              <motion.div
                className="flex w-max items-center gap-6 px-3"
                animate={{ x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{
                  duration: 14 + rowIndex * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...row, ...row].map((tech, index) => (
                  <div
                    key={`${rowIndex}-${tech.label}-${index}`}
                    className="flex min-w-max items-center justify-center opacity-80 transition-opacity duration-300 hover:opacity-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tech.img}
                      alt={tech.label}
                      className="h-6 w-6 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.28)]"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Staggered Square Bento Grid (with GSAP Column Scroll Animation) ── */
function TechGrid({
  colorized,
  onHover,
}: {
  colorized: boolean;
  onHover: (tech: TechEntry | null, idx: number) => void;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    const cards = grid.querySelectorAll(".tech-card-item");

    // Group cards into columns dynamically based on their offsetLeft coordinate
    const colsMap: Record<number, Element[]> = {};
    cards.forEach((card) => {
      const left = (card as HTMLElement).offsetLeft;
      if (!colsMap[left]) {
        colsMap[left] = [];
      }
      colsMap[left].push(card);
    });

    const columns = Object.values(colsMap);
    const middleColumnIndex = Math.floor(columns.length / 2);

    // Apply staggered entry GSAP ScrollTrigger animations per-column
    columns.forEach((columnItems, columnIndex) => {
      const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.15;

      gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top bottom-=10%",
          end: "bottom center",
          scrub: 1.5,
        },
      }).from(columnItems, {
        y: 120,
        opacity: 0,
        delay: delayFactor,
        ease: "sine.out",
        stagger: 0.05,
      });
    });

    return () => {
      // Cleanup ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 md:px-8">
      <div
        ref={gridRef}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-center"
      >
        {TECHS.map((tech, globalIdx) => (
          <div key={tech.label} className="tech-card-item">
            <TechCard
              tech={tech}
              index={globalIdx}
              colorized={colorized}
              onHover={(t) => onHover(t, globalIdx)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Toggle button ── */
function ToggleBtn({
  active,
  onClick,
  onHoverChange,
  children,
}: {
  active: boolean;
  onClick: () => void;
  onHoverChange?: (h: boolean) => void;
  children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  const handleEnter = () => {
    setHover(true);
    onHoverChange?.(true);
  };
  const handleLeave = () => {
    setHover(false);
    onHoverChange?.(false);
  };
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[9px]
                 tracking-[0.22em] uppercase border transition-all duration-300
                 cursor-pointer select-none"
      style={{
        borderColor: active
          ? "rgba(255,255,255,0.40)"
          : hover
            ? "rgba(255,255,255,0.22)"
            : "rgba(255,255,255,0.18)",
        background: active
          ? "rgba(255,255,255,0.10)"
          : hover
            ? "rgba(255,255,255,0.04)"
            : "transparent",
        color: active
          ? "rgba(255,255,255,0.85)"
          : hover
            ? "rgba(255,255,255,0.55)"
            : "rgba(255,255,255,0.45)",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      <span
        className="relative flex items-center justify-center"
        style={{ width: 7, height: 7 }}
      >
        {hover && !active && (
          <motion.span
            className="absolute rounded-full"
            style={{ inset: -3, border: "1px solid rgba(255,255,255,0.45)" }}
            animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            display: "inline-block",
            background: active
              ? "#ffffff"
              : hover
                ? "rgba(255,255,255,0.55)"
                : "rgba(255,255,255,0.2)",
            transition: "background 0.3s",
            boxShadow: active ? "0 0 6px 1px rgba(255,255,255,0.4)" : "none",
          }}
        />
      </span>
      {children}
    </div>
  );
}

/* ── Main TechStack section ── */
export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredTech, setHoveredTech] = useState<TechEntry | null>(null);
  const [locked, setLocked] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [viewMode, setViewMode] = useState<"mesh" | "cloud">("mesh");
  const colorized = locked || btnHover;

  return (
    <>
      <MobileTechMarquee />

      <div className="hidden md:block">
        <section
          id="skills"
          ref={ref}
          className="relative pt-16 pb-6 sm:pb-14 md:pb-24 overflow-hidden"
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                "radial-gradient(ellipse 75% 50% at 50% 58%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 40%, transparent 68%)",
                "radial-gradient(ellipse 55% 40% at 30% 40%, rgba(200,214,224,0.055) 0%, transparent 55%)",
                "radial-gradient(ellipse 50% 45% at 72% 65%, rgba(180,200,220,0.045) 0%, transparent 55%)",
              ].join(", "),
            }}
          />

          <div className="w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 px-4 sm:px-5 md:px-6 lg:px-8"
            >
              <p className="text-[12px] font-mono tracking-[0.3em] uppercase text-white/30 mb-4">
                Skills I work with
              </p>
              <div
                className="flex flex-col items-center gap-4 lg:relative lg:flex-row lg:justify-center max-w-5xl mx-auto"
              >
                <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em] mb-2">
                  <span className="text-white font-bold about-heading-size">
                    Tech
                  </span>
                  <span className="text-white/65 font-normal ml-5 about-heading-size">
                    Stack
                  </span>
                </h2>

                <div className="order-2 flex items-center gap-3 lg:hidden">
                  <ToggleBtn
                    active={viewMode === "cloud"}
                    onClick={() =>
                      setViewMode((v) => (v === "mesh" ? "cloud" : "mesh"))
                    }
                  >
                    {viewMode === "cloud" ? "Grid View" : "Globe View"}
                  </ToggleBtn>
                  <ToggleBtn
                    active={locked}
                    onClick={() => setLocked((v) => !v)}
                    onHoverChange={setBtnHover}
                  >
                    {locked ? "Unlock Colors" : "Lock Colors"}
                  </ToggleBtn>
                </div>

                <div className="hidden lg:absolute lg:left-0 lg:block">
                  <ToggleBtn
                    active={viewMode === "cloud"}
                    onClick={() =>
                      setViewMode((v) => (v === "mesh" ? "cloud" : "mesh"))
                    }
                  >
                    {viewMode === "cloud" ? "Grid View" : "Globe View"}
                  </ToggleBtn>
                </div>

                <div className="hidden lg:absolute lg:right-0 lg:block">
                  <ToggleBtn
                    active={locked}
                    onClick={() => setLocked((v) => !v)}
                    onHoverChange={setBtnHover}
                  >
                    {locked ? "Unlock Colors" : "Lock Colors"}
                  </ToggleBtn>
                </div>
              </div>
            </motion.div>

            {/* View switcher */}
            <AnimatePresence mode="wait">
              {viewMode === "mesh" ? (
                <motion.div
                  key="mesh"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <TechGrid
                    colorized={colorized}
                    onHover={(t) => setHoveredTech(t)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="cloud"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* ── 3-column: left info | globe | right info ── */}
                  <div className="flex items-center justify-center gap-52 py-8 px-6">
                    {/* Left panel — desktop only */}
                    <div className="hidden xl:block shrink-0">
                      <GlobeLeftPanel tech={hoveredTech} />
                    </div>

                    {/* Globe — wrapped to prevent mx-auto from consuming flex space */}
                    <div className="shrink-0">
                      <IconCloud3D
                        colorized={colorized}
                        onHoverTech={setHoveredTech}
                      />
                    </div>

                    {/* Right panel — desktop only */}
                    <div className="hidden xl:block shrink-0">
                      <GlobeRightPanel tech={hoveredTech} />
                    </div>
                  </div>

                  {/* Hint — visible below xl (non-desktop) */}
                  <p className="text-center font-mono text-[10px] tracking-[0.22em] uppercase text-gray-200 pb-4">
                    · hover any skill to reveal insights ·
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </>
  );
}
