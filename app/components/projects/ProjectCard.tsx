"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";
import type { Project } from "@/app/data/projects";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  featured?: boolean;
}

export default function ProjectCard({ project, onOpen, featured }: ProjectCardProps) {
  return (
    <motion.article
      layout
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(project)}
      className={`glass border border-white/6 rounded-2xl overflow-hidden cursor-pointer
                  hover:border-white/[0.14] hover:bg-white/2.5 transition-colors duration-300 group
                  flex flex-col ${featured ? "sm:col-span-2" : ""}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
      aria-label={`View ${project.title} details`}
    >
      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden bg-white/2 border-b border-white/5 ${
          featured ? "aspect-16/7" : "aspect-video"
        }`}
      >
        {/* Abstract placeholder */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
          <span className="text-white/[0.035] font-black font-mono"
            style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}>
            {project.id.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <motion.div
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.04) 0%, transparent 68%)",
          }}
        />

        {/* Category + Featured badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg glass border border-white/9 text-white/45 text-[10px] font-mono tracking-wide uppercase">
            {project.category}
          </span>
          {project.featured && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/8 border border-white/18 text-white/65 text-[10px] font-mono">
              <Star className="w-2.5 h-2.5 fill-current" />
              Featured
            </span>
          )}
        </div>

        {/* Action icon overlay on hover */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-lg glass border border-white/12 flex items-center justify-center
                         text-white/50 hover:text-white/90 transition-colors"
              aria-label="GitHub repository"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {project.live && project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-lg glass border border-white/12 flex items-center justify-center
                         text-white/50 hover:text-white/90 transition-colors"
              aria-label="Live demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-linear-to-t from-[#060606]/70 to-transparent pointer-events-none" />
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3
            className={`font-semibold text-white/80 mb-2 leading-snug ${
              featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`text-white/38 leading-relaxed ${
              featured ? "text-sm sm:text-base" : "text-sm"
            }`}
          >
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.slice(0, featured ? 6 : 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md glass border border-white/6 text-white/28 text-[11px] font-mono"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > (featured ? 6 : 4) && (
            <span className="px-2.5 py-1 rounded-md glass border border-white/6 text-white/18 text-[11px] font-mono">
              +{project.tags.length - (featured ? 6 : 4)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
