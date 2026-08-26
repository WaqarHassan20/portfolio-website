"use client";

import { useMemo, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { PROJECT_SHOWCASE } from "@/lib/data/projects";
import type { ProjectCard, ProjectCardView } from "@/types/project";

import VerticalProjectStrip from "./VerticalProjectStrip";
import CaseStudyModal from "./CaseStudyModal";

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
        githubUrl: project.githubUrl,
        thumbnail: project.thumbnailUrl ?? project.image ?? "",
        images: (
          project.images || (project.thumbnailUrl || project.image ? [project.thumbnailUrl || project.image] : [])
        ).filter((img): img is string => Boolean(img)),
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
