"use client";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/app/data/projects";
import ProjectCard from "./ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
  onOpen: (project: Project) => void;
}

export default function ProjectsGrid({ projects, onOpen }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="py-24 text-center"
      >
        <p className="text-white/25 text-sm font-mono">No projects in this category yet.</p>
      </motion.div>
    );
  }

  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => p !== featured);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key="grid"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {featured && (
          <ProjectCard
            key={featured.id}
            project={featured}
            onOpen={onOpen}
            featured
          />
        )}
        {rest.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={onOpen}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
