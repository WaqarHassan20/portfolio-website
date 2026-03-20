import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/app/components/shared/SectionHeading";
import { PROJECT_SHOWCASE } from "@/app/data/projects";

export default function Projects() {
  return (
    <>
      <section id="projects" className="relative py-24 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <SectionHeading
              eyebrow="Portfolio"
              primary="Featured"
              secondary="Projects"
            />
          </div>

          <div className="space-y-6">
            {PROJECT_SHOWCASE.map((project) => (
              <a
                key={project.id}
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-3xl border border-white/10 bg-white/2 p-5 sm:p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/4"
              >
                <div className="flex items-start justify-between gap-6 mb-5">
                  <p className="font-jetbrains font-bold text-2xl sm:text-3xl text-white/20 tabular-nums">
                    {project.number}
                  </p>
                  <h3 className="text-right font-jetbrains font-semibold text-xl sm:text-2xl text-white/85 tracking-tight">
                    {project.name}
                  </h3>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] mb-6">
                  <div
                    aria-label={`${project.name} thumbnail`}
                    className="w-full h-65 sm:h-90 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{ backgroundImage: `url(${project.thumbnailUrl})` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 font-jetbrains text-[10px] uppercase tracking-[0.2em] text-white/80">
                    Open Live
                    <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-sm font-mono leading-7 text-white/50 mb-3">
                      {project.details}
                    </p>
                    <div className="flex flex-wrap gap-2">
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

                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-jetbrains text-[10px] uppercase tracking-[0.2em] text-white/65 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                    Live Link
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="my-10 md:my-24 w-full h-px bg-white/8" />
    </>
  );
}
