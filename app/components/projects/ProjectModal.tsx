"use client";
import { useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { X, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Project } from "@/app/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 100, damping: 18 });
  const glowY = useSpring(mouseY, { stiffness: 100, damping: 18 });
  const panelRef = useRef<HTMLDivElement>(null);

  /* scroll lock */
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  /* escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-100 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            ref={panelRef}
            onMouseMove={handleMouseMove}
            className="fixed inset-x-3 top-[3vh] bottom-[3vh]
                       sm:inset-x-6 md:inset-x-12 lg:inset-x-[8%] xl:inset-x-[12%]
                       z-101 overflow-y-auto rounded-3xl glass-strong border border-white/10"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            {/* Cursor-tracking glow */}
            <motion.div
              className="absolute pointer-events-none rounded-full"
              style={{
                width: 500,
                height: 500,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.045) 0%, transparent 68%)",
                x: glowX,
                y: glowY,
                translateX: "-50%",
                translateY: "-50%",
                zIndex: 0,
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="sticky top-5 z-20 float-right mr-5 mt-5
                         w-9 h-9 rounded-xl glass border border-white/10
                         flex items-center justify-center text-white/45
                         hover:text-white/90 hover:border-white/25 transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 p-6 sm:p-10 lg:p-12 pt-6">
              {/* Header */}
              <div className="mb-8 pr-12">
                <span className="inline-block px-2.5 py-1 rounded-lg glass border border-white/9
                                 text-white/40 text-[11px] font-mono tracking-wide uppercase mb-3">
                  {project.category}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white/85 leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* Body — two-col on large screens */}
              <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">
                {/* Left — visual + description */}
                <div className="space-y-7">
                  {/* Placeholder visual */}
                  <div className="aspect-video rounded-2xl overflow-hidden glass border border-white/6 relative">
                    <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                      <span
                        className="text-white/[0.032] font-black font-mono"
                        style={{ fontSize: "clamp(5rem,14vw,10rem)" }}
                      >
                        {project.id.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <motion.div
                      animate={{ opacity: [0.25, 0.6, 0.25] }}
                      transition={{ duration: 6, repeat: Infinity }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(ellipse at 55% 45%, rgba(255,255,255,0.05) 0%, transparent 62%)",
                      }}
                    />
                  </div>

                  <p className="text-white/42 text-base leading-relaxed">
                    {project.longDescription}
                  </p>

                  {/* Problem / Solution */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="glass border border-white/6 rounded-2xl p-5">
                      <div className="text-white/28 text-[10px] font-mono tracking-widest uppercase mb-2.5">
                        Problem
                      </div>
                      <p className="text-white/48 text-sm leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="glass border border-white/6 rounded-2xl p-5">
                      <div className="text-white/28 text-[10px] font-mono tracking-widest uppercase mb-2.5">
                        Solution
                      </div>
                      <p className="text-white/48 text-sm leading-relaxed">{project.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Right — tech + links */}
                <div className="space-y-5">
                  <div className="glass border border-white/[0.06] rounded-2xl p-5">
                    <div className="text-white/28 text-[10px] font-mono tracking-widest uppercase mb-4">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-xl glass border border-white/[0.08] text-white/48 text-xs font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-5 py-4 rounded-2xl glass
                                   border border-white/[0.09] text-white/58 text-sm font-semibold
                                   hover:text-white/90 hover:border-white/20 transition-all duration-200 group"
                      >
                        <span className="flex items-center gap-2.5">
                          <Github className="w-4 h-4" />
                          Source Code
                        </span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                    {project.live && project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-5 py-4 rounded-2xl
                                   bg-white/[0.06] border border-white/[0.13]
                                   text-white/70 text-sm font-semibold
                                   hover:text-white hover:bg-white/[0.10] transition-all duration-200 group"
                      >
                        <span className="flex items-center gap-2.5">
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
