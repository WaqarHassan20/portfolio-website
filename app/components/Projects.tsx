"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { PROJECT_SHOWCASE } from "@/lib/data/projects";

import type { ProjectCard, ProjectCardView } from "@/types/project";

// ── Vertical ExpandOnHover Strip ──────────────────────────────────────────
function VerticalProjectStrip({
  project,
  isExpanded,
  onHover,
  onOpenCaseStudy,
  isMobile,
}: {
  project: ProjectCardView;
  isExpanded: boolean;
  onHover: () => void;
  onOpenCaseStudy: () => void;
  isMobile: boolean;
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      animate={{
        height: isExpanded ? (isMobile ? 440 : 380) : 70,
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
                    <h3 className="font-jetbrains text-xl sm:text-2xl font-bold tracking-tight text-white">
                      <span className="font-mono font-bold text-white mr-3 text-[0.85em]">
                        {project.number}.
                      </span>
                      {project.name}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white/70">
                      {project.category}
                    </span>
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
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 transition-all duration-300 hover:bg-white hover:text-black focus:outline-none cursor-pointer"
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

// ── Case Study Modal Overlay Component ───────────────────────────────────
function CaseStudyModal({
  project,
  onClose,
}: {
  project: ProjectCardView;
  onClose: () => void;
}) {
  // Prevent background scrolling when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 text-white flex flex-col z-10 shadow-2xl"
      >
        {/* Header (Project Details) */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-white/10 bg-zinc-900/40">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-white/50 tracking-wider">
                PROJECT {project.number}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white/70">
                {project.category}
              </span>
            </div>
            <h3 className="font-jetbrains text-2xl sm:text-3xl font-bold tracking-tight">
              {project.name}
            </h3>
          </div>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            aria-label="Close Case Study"
          >
            <span className="block w-5 h-5 font-mono text-sm leading-none flex items-center justify-center">&times;</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {project.caseStudy ? (
            <>
              {/* Overview Section */}
              <div className="space-y-2">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] font-extrabold text-white/40">
                  Overview
                </h4>
                <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80 font-light">
                  {project.caseStudy.overview}
                </p>
              </div>

              {/* Practice & Approach Section */}
              <div className="space-y-2">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] font-extrabold text-white/40">
                  Practice &amp; Approach
                </h4>
                <p className="font-sans text-sm sm:text-base leading-relaxed text-white/80 font-light">
                  {project.caseStudy.practice}
                </p>
              </div>

              {/* Skills Used Section */}
              <div className="space-y-3">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] font-extrabold text-white/40">
                  Skills Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.caseStudy.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-white/70 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] font-extrabold text-white/40">
                Project Details
              </h4>
              <p className="font-sans text-sm sm:text-base leading-relaxed text-white/85 font-light">
                {project.description}
              </p>
              <div className="space-y-3 mt-4">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] font-extrabold text-white/40">
                  Tools Used
                </h4>
                <p className="font-mono text-xs text-white/60">{project.tools}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer (Actions) */}
        <div className="p-6 border-t border-white/10 bg-zinc-900/20 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <span className="font-mono text-[10px] text-white/40 flex items-center gap-1.5">
            Accent Palette:
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: 'currentColor' }}
            />
          </span>

          {project.href && project.href !== "#" && project.href !== "" ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 transition-all duration-300 hover:bg-white hover:text-black focus:outline-none"
            >
              Visit Live Site
              <ArrowUpRight size={12} />
            </a>
          ) : (
            <span className="font-mono text-[10px] text-white/40 italic">
              Live link coming soon
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── Main exported Projects component ─────────────────────────────────────
export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectCardView | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        caseStudy: project.caseStudy,
      };
    });
  }, []);

  return (
    <section id="projects" className="relative bg-[#050505] py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-[90%] md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto w-full">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em]">
            <span className="text-white font-bold about-heading-size">My</span>
            <span className="text-white font-normal ml-4 about-heading-size">Projects</span>
          </h2>
        </div>

        {/* Vertical ExpandOnHover Stack */}
        <div className="flex flex-col gap-4">
          {cards.map((project, index) => (
            <VerticalProjectStrip
              key={project.key}
              project={project}
              isExpanded={activeIndex === index}
              onHover={() => setActiveIndex(index)}
              onOpenCaseStudy={() => setSelectedProject(project)}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* Case Study Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
