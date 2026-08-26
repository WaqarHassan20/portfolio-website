"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { ProjectCardView } from "@/types/project";

interface VerticalProjectStripProps {
  project: ProjectCardView;
  isExpanded: boolean;
  onHover: () => void;
  onOpenCaseStudy: () => void;
  isMobile: boolean;
}

export default function VerticalProjectStrip({
  project,
  isExpanded,
  onHover,
  onOpenCaseStudy,
  isMobile,
}: VerticalProjectStripProps) {
  return (
    <motion.div
      onMouseEnter={onHover}
      animate={{
        height: isExpanded ? (isMobile ? 500 : 440) : 70,
        borderColor: isExpanded
          ? "rgba(255, 255, 255, 0.28)"
          : "rgba(255, 255, 255, 0.08)",
      }}
      transition={{ type: "spring", stiffness: 140, damping: 22 }}
      className="relative w-full overflow-hidden cursor-pointer select-none group rounded-2xl border bg-zinc-950"
    >
      {/* Background thumbnail preview when collapsed */}
      {project.thumbnail && (
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02] z-0"
        />
      )}

      {/* Dark overlay: heavier when collapsed for text contrast */}
      <div
        className="absolute inset-0 bg-black/85 group-hover:bg-black/75 transition-colors duration-300 z-0"
        style={{
          opacity: isExpanded ? 0 : 1,
        }}
      />

      {/* ── COLLAPSED VIEW: Sleek Minimalist Centered Title ── */}
      <AnimatePresence mode="wait">
        {!isExpanded && (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center justify-center px-6 z-10"
          >
            <h3 className="font-jetbrains text-base sm:text-lg font-bold text-white tracking-wide text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {project.name}
            </h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── EXPANDED VIEW: Full Card Content with Larger Thumbnail & White Numbering ── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, delay: 0.08 }}
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-[0.88fr_1.12fr] grid-rows-[1fr_128px] md:grid-rows-none h-full z-10"
          >
            {/* Left: Text Details */}
            <div className="flex flex-col justify-between p-4 sm:p-6 md:p-8 border-r-0 md:border-r border-white/8 overflow-hidden bg-black/95 backdrop-blur-xs">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-jetbrains text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center flex-wrap gap-2">
                      <span className="font-mono font-bold text-white mr-1 text-[0.85em]">
                        {project.number}.
                      </span>
                      {project.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white/70">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="max-w-md font-mono text-xs sm:text-sm leading-relaxed text-white/80 font-light mt-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] font-extrabold text-white/40 mb-1.5">
                  Tools &amp; Features
                </p>
                <p className="font-mono text-xs leading-relaxed text-white/70 mb-5">
                  {project.tools}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenCaseStudy();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 sm:py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/90 transition-all duration-300 hover:bg-white hover:text-black focus:outline-none cursor-pointer"
                >
                  Case Study
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>

            {/* Right/Bottom: Screenshot Image */}
            <div className="relative block h-32 md:h-full overflow-hidden bg-black/20 shrink-0">
              {project.thumbnail && (
                <Image
                  src={project.thumbnail}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top accent glow line when expanded */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={{
          background: isExpanded
            ? "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)"
            : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
