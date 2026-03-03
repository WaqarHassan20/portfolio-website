"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProjectFilter from "@/app/components/projects/ProjectFilter";
import ProjectsGrid from "@/app/components/projects/ProjectsGrid";
import ProjectModal from "@/app/components/projects/ProjectModal";
import { PROJECTS, type Project, type ProjectCategory } from "@/app/data/projects";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const counts = useMemo<Record<ProjectCategory, number>>(() => {
    const base: Record<ProjectCategory, number> = {
      all: PROJECTS.length,
      web3: 0,
      fullstack: 0,
      frontend: 0,
      devops: 0,
      ai: 0,
    };
    for (const p of PROJECTS) base[p.category]++;
    return base;
  }, []);

  return (
    <main className="relative min-h-screen bg-[#060606]">
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-16 pb-24">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 sm:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/[0.07]
                       text-white/40 text-xs font-mono tracking-wide mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            {PROJECTS.length} Projects
          </motion.span>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.9] mb-6"
            >
              <span className="text-white/75 block">My</span>
              <span className="text-white/20 block">Projects</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7 }}
            className="text-white/35 text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
          >
            A selection of things I&apos;ve built &mdash; AI tools, DeFi interfaces,
            full-stack SaaS platforms, and DevOps dashboards.
          </motion.p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <ProjectFilter
            active={activeCategory}
            onChange={setActiveCategory}
            counts={counts}
          />
        </motion.div>

        {/* Grid */}
        <ProjectsGrid projects={filteredProjects} onOpen={setSelectedProject} />
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
