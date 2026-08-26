"use client";

import { useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import type { ProjectCardView } from "@/types/project";
import { isValidUrl } from "@/lib/utils";
import AutoImageCarousel from "./AutoImageCarousel";

interface CaseStudyModalProps {
  project: ProjectCardView;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  // Prevent background scrolling completely on open (body & html)
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalDocOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocOverflow;
    };
  }, []);

  const imageList = useMemo(() => {
    if (project.images && project.images.length > 0) return project.images;
    if (project.thumbnail) return [project.thumbnail];
    return [];
  }, [project.images, project.thumbnail]);

  const hasGithub = isValidUrl(project.githubUrl);
  const hasLive = isValidUrl(project.href);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Responsive Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
        className="relative w-[96%] sm:w-[90%] max-w-3xl sm:max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 text-white flex flex-col z-10 shadow-[0_0_50px_rgba(0,0,0,0.95)]"
      >
        {/* Header: Slimmer height */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 border-b border-white/10 bg-zinc-900/70 backdrop-blur-sm">
          <h3 className="font-jetbrains text-lg sm:text-xl font-bold tracking-tight text-white truncate max-w-[75%]">
            {project.name}
          </h3>

          {/* GitHub Logo & Cross Icons on Right */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 sm:p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-white/80"
                title="View GitHub Repository"
              >
                <Github size={16} />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-white/80"
              aria-label="Close Case Study"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body: No side gaps around image carousel */}
        <div className="p-0 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent flex-1">
          {/* ── Auto-Moving Image Carousel ── */}
          {imageList.length > 0 && (
            <AutoImageCarousel images={imageList} name={project.name} />
          )}
        </div>

        {/* Footer: Slimmer height & slimmer buttons */}
        <div className="px-4 sm:px-5 py-2.5 sm:py-3 border-t border-white/10 bg-zinc-900/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
          {hasGithub && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 sm:py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/90 transition-all duration-300 hover:bg-white hover:text-black focus:outline-none cursor-pointer"
            >
              <Github size={13} />
              Source Code
            </a>
          )}

          {hasLive ? (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/30 bg-white px-5 py-1.5 sm:py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-black font-semibold transition-all duration-300 hover:bg-white/90 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] focus:outline-none cursor-pointer"
            >
              Visit Live Site
              <ArrowUpRight size={13} />
            </a>
          ) : (
            <span className="font-mono text-[10px] sm:text-[11px] text-white/40 italic px-2 py-0.5">
              Live link coming soon
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
