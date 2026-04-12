"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { PROJECT_SHOWCASE } from "@/app/data/projects";

type ProjectCard = {
  id?: string | number;
  number?: string;
  name?: string;
  category?: string;
  description?: string;
  details?: string;
  tools?: string;
  techStack?: string[];
  live?: string;
  liveUrl?: string;
  image?: string;
  thumbnailUrl?: string;
};

type ProjectCardView = {
  key: string;
  number: string;
  name: string;
  category: string;
  description: string;
  tools: string;
  href: string;
  thumbnail: string;
};

export default function ProjectsMobile() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [pulseKey, setPulseKey] = useState<string | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const previousPosition = style.position;
    const previousTop = style.top;
    const previousLeft = style.left;
    const previousRight = style.right;
    const previousWidth = style.width;
    const previousOverflow = style.overflow;

    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";

    return () => {
      style.position = previousPosition;
      style.top = previousTop;
      style.left = previousLeft;
      style.right = previousRight;
      style.width = previousWidth;
      style.overflow = previousOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [selectedIndex]);

  const cards = useMemo<ProjectCardView[]>(() => {
    return (PROJECT_SHOWCASE as ProjectCard[]).map((project, index) => {
      const number = project.number ?? String(index + 1).padStart(2, "0");
      return {
        key: String(project.id ?? number),
        number,
        name: project.name ?? "Untitled Project",
        category: project.category ?? "Featured Project",
        description: project.details ?? project.description ?? "Project details are coming soon.",
        tools: project.techStack?.join(", ") ?? project.tools ?? "Tech stack unavailable",
        href: project.liveUrl ?? project.live ?? "#",
        thumbnail: project.thumbnailUrl ?? project.image ?? "",
      };
    });
  }, []);

  const selectedProject = selectedIndex !== null ? cards[selectedIndex] : null;

  const handlePrevious = () => {
    setSelectedIndex((prev) =>
      prev === null ? cards.length - 1 : prev === 0 ? cards.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : prev === cards.length - 1 ? 0 : prev + 1,
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedIndex(null);
  };

  return (
    <>
      {/* Mobile Grid View */}
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 text-center">
          <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em]">
            <span className="text-white font-bold about-heading-size">My</span>
            <span className="ml-4 text-white/65 font-normal about-heading-size">Projects</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {cards.map((project, index) => (
            <motion.button
              key={project.key}
              onClick={() => {
                setPulseKey(project.key);
                setSelectedIndex(index);
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#0b0b0b] transition-all duration-300 hover:border-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-300/14 via-transparent to-fuchsia-300/14 opacity-85" />
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl"
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12), 0 0 26px rgba(125, 211, 252, 0.11)",
                }}
              />

              {pulseKey === project.key && (
                <motion.span
                  className="pointer-events-none absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35"
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 8, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onAnimationComplete={() => setPulseKey(null)}
                />
              )}

              <div className="relative aspect-square overflow-hidden bg-black/40">
                <div
                  aria-label={`${project.name} thumbnail`}
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: project.thumbnail ? `url(${project.thumbnail})` : undefined }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent" />
              </div>
              <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                <div className="min-h-0">
                  <p className="font-jetbrains text-[10px] font-bold text-white/60 sm:text-xs">{project.number}</p>
                  <h3 className="mt-1 line-clamp-2 font-jetbrains text-sm font-semibold text-white/90 sm:text-base">
                    {project.name}
                  </h3>
                  <span className="mt-2 inline-flex items-center rounded-full border border-white/14 bg-white/3 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-white/50 sm:text-[9px]">
                    {project.category}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedIndex(null)}
          onKeyDown={handleKeyDown}
          role="dialog"
          tabIndex={-1}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 transition-all hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label="Close modal"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-black/40">
              <div
                aria-label={`${selectedProject.name} thumbnail`}
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: selectedProject.thumbnail ? `url(${selectedProject.thumbnail})` : undefined }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-jetbrains text-3xl font-bold text-white/80 sm:text-4xl">
                    {selectedProject.number}
                  </p>
                  <h2 className="mt-2 font-jetbrains text-2xl font-semibold text-white sm:text-3xl">
                    {selectedProject.name}
                  </h2>
                  <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/3 px-4 py-1.5 font-mono text-sm uppercase tracking-wider text-white/55">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              <p className="mt-6 leading-relaxed text-white/60">
                {selectedProject.description}
              </p>

              <div className="mt-8">
                <p className="font-mono text-xs uppercase tracking-widest text-white/42">Tools & Features</p>
                <p className="mt-3 leading-relaxed text-white/50">{selectedProject.tools}</p>
              </div>

              {/* Action Button */}
              <a
                href={selectedProject.href}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/2 px-6 py-3 font-mono text-sm uppercase tracking-wider text-white/68 transition-all hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                Visit Site
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Navigation Controls */}
            <div className="border-t border-white/8 px-6 py-4 sm:px-8 flex items-center justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-white/60 transition-all hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-label="Previous project"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="flex items-center gap-2">
                {cards.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      index === selectedIndex ? "w-6 bg-white/70" : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm text-white/60 transition-all hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-label="Next project"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
