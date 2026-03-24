"use client";
import { easeInOut, motion } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";
// import { PROJECT_SHOWCASE } from "@/app/data/projects";
import SectionHeading from "@/app/components/shared/SectionHeading";

export default function Projects() {
  return (
    <>
      <section id="projects" className="relative min-h-screen px-4 sm:px-8 md:pt-8 pt-20 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 sm:mb-12 text-center">
            <SectionHeading
              eyebrow="Portfolio"
              primary="Featured"
              secondary="Projects"
              className="text-center"
              primaryClassName="text-white font-bold about-heading-size"
              secondaryClassName="text-white/65 font-normal ml-2 sm:ml-4 about-heading-size"
            />
          </div>

          {/* <div className="space-y-6 sm:space-y-8 pb-12">
            {PROJECT_SHOWCASE.map((project, index) => (
              <article
                key={project.id}
                className="sticky"
                style={{ top: `${96 + index * 16}px` }}
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open project ${project.name} live link`}
                  className="group block rounded-2xl border border-white/10 bg-[#0a0a0a]/80 p-4 sm:p-5 transition-all duration-300 hover:border-white/20 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-4 sm:gap-5 items-stretch">
                    <div className="flex flex-col justify-between min-h-55 sm:min-h-62.5">
                      <div>
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <p className="font-jetbrains font-bold text-xl sm:text-2xl text-white/25 tabular-nums">
                            {project.number}
                          </p>
                          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 font-jetbrains text-[10px] uppercase tracking-[0.18em] text-white/65 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                            Live
                            <ArrowUpRight size={11} />
                          </span>
                        </div>

                        <h3 className="font-jetbrains font-semibold text-xl sm:text-2xl text-white/88 tracking-tight">
                          {project.name}
                        </h3>
                        <p className="mt-3 text-sm font-mono leading-6 text-white/50">
                          {project.details}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/12 bg-white/2 px-3 py-1 font-jetbrains text-[10px] uppercase tracking-[0.16em] text-white/55"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 min-h-45 sm:min-h-55">
                      <div
                        aria-label={`${project.name} thumbnail`}
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10" />
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div> */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeInOut }}
            className="mb-10 min-h-[62vh] sm:min-h-[68vh] w-full rounded-3xl border border-white/10 bg-white/2 backdrop-blur-md px-6 py-10 sm:px-10 sm:py-14 flex flex-col items-center justify-center text-center"
          >
            <p className="font-mono text-sm sm:text-base uppercase tracking-[0.25em] text-white/45 mb-4">
              Projects coming soon
            </p>
            <p className="max-w-3xl text-base sm:text-xl text-white/65 leading-relaxed">
              I&apos;m currently curating a collection of my featured projects. This section will soon be filled with complete case studies, live demos, and engineering breakdowns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* <div className="my-10 md:my-24 w-full h-px bg-white/8" /> */}
    </>
  );
}
