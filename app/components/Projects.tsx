"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { PROJECT_SHOWCASE } from "@/lib/data/projects";
import ProjectsMobile from "@/app/components/ProjectsMobile";

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

// ── ExpandOnHover strip (desktop) ──────────────────────────────────────────
function ProjectStrip({
  project,
  isExpanded,
  onHover,
}: {
  project: ProjectCardView;
  isExpanded: boolean;
  onHover: () => void;
  index: number;
}) {
  return (
    <motion.div
      layout
      onMouseEnter={onHover}
      animate={{
        flex: isExpanded ? 4 : 0.45,
        borderColor: isExpanded ? "rgba(255, 255, 255, 0.28)" : "rgba(255, 255, 255, 0.08)",
      }}
      transition={{ type: "spring", stiffness: 130, damping: 22 }}
      className="relative h-full overflow-hidden cursor-pointer select-none group rounded-2xl border bg-zinc-950 min-w-0"
    >
      {/* Background thumbnail visible even when collapsed */}
      {project.thumbnail && (
        <Image
          src={project.thumbnail}
          alt={project.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02] z-0"
        />
      )}

      {/* Dark overlay: fully dark when collapsed for maximum legibility of text */}
      <div
        className="absolute inset-0 bg-black/75 group-hover:bg-black/65 transition-colors duration-300 z-0"
        style={{
          opacity: isExpanded ? 0 : 1,
        }}
      />

      {/* ── COLLAPSED view: vertical title ── */}
      <AnimatePresence mode="wait">
        {!isExpanded && (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 z-10"
          >
            {/* Vertical title */}
            <span
              className="font-mono text-[10.5px] uppercase tracking-[0.25em] leading-snug text-center font-bold text-white/90"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                textShadow: "0 2px 5px rgba(0,0,0,0.85)",
              }}
            >
              {project.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── EXPANDED view: full card content ── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="absolute inset-0 grid grid-cols-[1.1fr_0.9fr] h-full z-10"
          >
            {/* Left: text content (hides the card background under it) */}
            <div className="flex flex-col justify-between px-7 py-6 border-r border-white/8 overflow-hidden bg-black/95 backdrop-blur-[4px]">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="text-left">
                    <h3 className="font-jetbrains text-[clamp(1.2rem,2.2vw,1.9rem)] leading-tight font-bold tracking-tight text-white">
                      {project.name}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/70">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Description - brighter text */}
                <p className="max-w-md font-mono text-[12.5px] leading-6 text-white/85">
                  {project.description}
                </p>
              </div>

              {/* Tools + link */}
              <div className="mt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] font-extrabold text-white mb-1.5">
                  Tools &amp; Features
                </p>
                <p className="text-[12px] leading-5 text-white/80 mb-5">
                  {project.tools}
                </p>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open project ${project.name} live link`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/85 transition-colors duration-300 hover:bg-white hover:text-black focus:outline-none"
                >
                  Visit Site
                  <ArrowUpRight size={11} />
                </a>
              </div>
            </div>

            {/* Right: clear thumbnail */}
            <div className="relative overflow-hidden bg-black/20">
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

      {/* Hover top border accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={{
          background: isExpanded
            ? "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)"
            : "transparent",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Index indicator dot at bottom */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-20">
        <motion.div
          className="rounded-full"
          animate={{
            width: isExpanded ? 24 : 4,
            height: 4,
            background: isExpanded ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.22)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
      </div>
    </motion.div>
  );
}

// ── Main exported component ───────────────────────────────────────────────
export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const cards = useMemo<ProjectCardView[]>(() => {
    return (PROJECT_SHOWCASE as ProjectCard[]).map((project, index) => {
      const number = project.number ?? String(index + 1).padStart(2, "0");
      return {
        key: String(project.id ?? number),
        number,
        name: project.name ?? "Untitled Project",
        category: project.category ?? "Featured Project",
        description:
          project.details ??
          project.description ??
          "Project details are coming soon.",
        tools:
          project.techStack?.join(", ") ??
          project.tools ??
          "Tech stack unavailable",
        href: project.liveUrl ?? project.live ?? "#",
        thumbnail: project.thumbnailUrl ?? project.image ?? "",
      };
    });
  }, []);

  return (
    <section id="projects" className="relative bg-[#050505] py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      {/* Mobile fallback */}
      <div className="md:hidden">
        <ProjectsMobile />
      </div>

      {/* Desktop: ExpandOnHover horizontal strip layout centered with margins */}
      <div className="hidden md:block w-full">
        {/* Desktop section heading without faded top sub-heading */}
        <div className="text-center mb-12">
          <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em]">
            <span className="text-white font-bold about-heading-size">My</span>
            <span className="text-white font-normal ml-5 about-heading-size">Projects</span>
          </h2>
        </div>

        {/* Centered cards grid strip: Reduced height layout, defaults to index 0 on mouse leave */}
        <div
          onMouseLeave={() => setActiveIndex(0)}
          className="max-w-6xl mx-auto h-[52vh] min-h-[420px] max-h-[520px] flex items-stretch gap-4 overflow-hidden"
        >
          {cards.map((project, index) => (
            <ProjectStrip
              key={project.key}
              project={project}
              index={index}
              isExpanded={activeIndex === index}
              onHover={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
