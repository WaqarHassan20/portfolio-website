"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { TechEntry } from "@/app/types/techstack";
import { TECHS } from "@/app/data/techstack";
import { TechCard } from "./TechCard";
import { IconCloud3D } from "./IconCloud3D";
import { GlobeLeftPanel, GlobeRightPanel } from "./GlobeInfoPanels";

/* ── Responsive grid config ──────────────────────────────────────────────── */
function useGridConfig() {
  const [winW, setWinW] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setWinW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  if (!winW) return { cols: 8, cell: 106, gap: 10 };
  if (winW >= 1700) return { cols: 10, cell: 116, gap: 12 };
  if (winW >= 1440) return { cols: 9, cell: 108, gap: 10 };
  if (winW >= 1280) return { cols: 8, cell: 106, gap: 10 };
  if (winW >= 1100) return { cols: 7, cell: 100, gap: 10 };
  if (winW >= 800) return { cols: 6, cell: 94, gap: 10 };
  if (winW >= 560) return { cols: 5, cell: 82, gap: 8 };
  return { cols: 4, cell: 68, gap: 8 };
}

/* ── Diamond mesh grid ───────────────────────────────────────────────────── */
function TechGrid({
  colorized,
  onHover,
}: {
  colorized: boolean;
  onHover: (tech: TechEntry | null, idx: number) => void;
}) {
  const { cols: COLS, cell: CELL, gap: GAP } = useGridConfig();
  const STEP = CELL + GAP;
  const OFFSET = STEP / 2;

  const rows: ((typeof TECHS)[0] | null)[][] = [];
  for (let i = 0; i < TECHS.length; i += COLS)
    rows.push(TECHS.slice(i, i + COLS));
  const lastRow = rows[rows.length - 1];
  while (lastRow.length < COLS) lastRow.push(null);

  const gridW = COLS * STEP - GAP;
  const gridH = Math.ceil(
    (rows.length - 1) * STEP * 0.72 + CELL + OFFSET * 0.72,
  );

  const [hoveredIdx, setHoveredIdx] = useState(-1);

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 md:px-8">
      <div className="flex justify-center min-w-full">
        <div className="relative" style={{ width: gridW, height: gridH }}>
          {rows.map((row, rowIdx) =>
            row.map((tech, colIdx) => {
              if (!tech) return null;
              const x = colIdx * STEP + (rowIdx % 2 === 1 ? OFFSET : 0);
              const y = rowIdx * STEP * 0.72;
              const globalIdx = rowIdx * COLS + colIdx;
              return (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className="absolute"
                  style={{
                    left: x,
                    top: y,
                    zIndex: hoveredIdx === globalIdx ? 50 : 1,
                  }}
                >
                  <TechCard
                    tech={tech}
                    index={globalIdx}
                    cell={CELL}
                    cols={COLS}
                    colorized={colorized}
                    onHover={(t) => {
                      setHoveredIdx(t ? globalIdx : -1);
                      onHover(t, globalIdx);
                    }}
                  />
                </div>
              );
            }),
          )}

          {/* Connecting lines net */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width={gridW}
            height={gridH}
            style={{ overflow: "visible" }}
          >
            {rows.map((row, rowIdx) =>
              row.map((tech, colIdx) => {
                if (!tech) return null;
                const cx =
                  colIdx * STEP + (rowIdx % 2 === 1 ? OFFSET : 0) + CELL / 2;
                const cy = rowIdx * STEP * 0.72 + CELL / 2;
                const lines = [];

                if (colIdx + 1 < COLS && row[colIdx + 1]) {
                  lines.push(
                    <line
                      key={`r-${rowIdx}-${colIdx}`}
                      x1={cx}
                      y1={cy}
                      x2={
                        (colIdx + 1) * STEP +
                        (rowIdx % 2 === 1 ? OFFSET : 0) +
                        CELL / 2
                      }
                      y2={cy}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />,
                  );
                }
                if (rowIdx + 1 < rows.length) {
                  const blCol = rowIdx % 2 === 0 ? colIdx - 1 : colIdx;
                  if (blCol >= 0 && blCol < COLS && rows[rowIdx + 1][blCol]) {
                    lines.push(
                      <line
                        key={`bl-${rowIdx}-${colIdx}`}
                        x1={cx}
                        y1={cy}
                        x2={
                          blCol * STEP +
                          ((rowIdx + 1) % 2 === 1 ? OFFSET : 0) +
                          CELL / 2
                        }
                        y2={(rowIdx + 1) * STEP * 0.72 + CELL / 2}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                      />,
                    );
                  }
                  const brCol = rowIdx % 2 === 0 ? colIdx : colIdx + 1;
                  if (brCol >= 0 && brCol < COLS && rows[rowIdx + 1][brCol]) {
                    lines.push(
                      <line
                        key={`br-${rowIdx}-${colIdx}`}
                        x1={cx}
                        y1={cy}
                        x2={
                          brCol * STEP +
                          ((rowIdx + 1) % 2 === 1 ? OFFSET : 0) +
                          CELL / 2
                        }
                        y2={(rowIdx + 1) * STEP * 0.72 + CELL / 2}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                      />,
                    );
                  }
                }
                return lines;
              }),
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ── Toggle button ───────────────────────────────────────────────────────── */
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

/* ── Main TechStack section ──────────────────────────────────────────────── */
export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredTech, setHoveredTech] = useState<TechEntry | null>(null);
  const [locked, setLocked] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [viewMode, setViewMode] = useState<"mesh" | "cloud">("mesh");
  const colorized = locked || btnHover;

  const { cols: COLS, cell: CELL, gap: GAP } = useGridConfig();
  const gridW = COLS * (CELL + GAP) - GAP;

  return (
    <>
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
              className="flex flex-col items-center gap-4 lg:relative lg:flex-row lg:justify-center"
              style={{ maxWidth: gridW, margin: "0 auto" }}
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

      {/* <div className="w-full h-px bg-white/8" /> */}
    </>
  );
}
