"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECT_SHOWCASE } from "@/app/data/projects";
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

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const scrollRangeRef = useRef<{ start: number; end: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

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

  const handleDotClick = (index: number) => {
    const range = scrollRangeRef.current;
    if (!range || cards.length <= 1) return;

    const progress = index / (cards.length - 1);
    const target = range.start + (range.end - range.start) * progress;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let refreshTimer: number | undefined;
    let cleanup = false;

    const setup = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (cleanup || !sectionRef.current) return;

      ctx = gsap.context(() => {
        const cardNodes = cardsRef.current.filter(
          (node): node is HTMLDivElement => Boolean(node),
        );

        if (!cardNodes.length) return;

        cardNodes.forEach((card, index) => {
          gsap.set(card, {
            xPercent: index === 0 ? 0 : 112,
            yPercent: 0,
            scale: 1,
            rotate: 0,
            opacity: index === 0 ? 1 : 0,
            transformOrigin: "50% 50%",
          });
        });

        const transitions = Math.max(1, cardNodes.length - 1);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${window.innerHeight * (transitions * 1.35)}`,
            pin: true,
            scrub: 1.25,
            snap:
              cardNodes.length > 1
                ? {
                    snapTo: 1 / (cardNodes.length - 1),
                    duration: 0.5,
                    delay: 0.05,
                  }
                : undefined,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (cardNodes.length <= 1) {
                setActiveIndex(0);
              } else {
                setActiveIndex(
                  Math.round(self.progress * (cardNodes.length - 1)),
                );
              }
              scrollRangeRef.current = { start: self.start, end: self.end };
            },
          },
        });

        for (let index = 1; index < cardNodes.length; index += 1) {
          const previous = cardNodes[index - 1];
          const current = cardNodes[index];

          timeline
            .to(
              previous,
              {
                xPercent: -108,
                duration: 0.75,
                ease: "power2.inOut",
              },
              index - 1,
            )
            .to(
              previous,
              {
                opacity: 0,
                duration: 0.15,
                ease: "none",
              },
              index - 0.4,
            )
            .to(
              current,
              {
                xPercent: 0,
                opacity: 1,
                duration: 0.75,
                ease: "power2.out",
              },
              index - 1,
            );
        }
      }, sectionRef);

      setIsReady(true);
      ScrollTrigger.refresh();

      resizeObserver = new ResizeObserver(() => {
        if (refreshTimer) {
          window.clearTimeout(refreshTimer);
        }
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 80);
      });

      if (sectionRef.current) {
        resizeObserver.observe(sectionRef.current);
      }
    };

    void setup();

    return () => {
      cleanup = true;
      if (refreshTimer) {
        window.clearTimeout(refreshTimer);
      }
      scrollRangeRef.current = null;
      resizeObserver?.disconnect();
      ctx?.revert();
    };
  }, [cards.length]);

  return (
    <section id="projects" className="relative bg-[#050505] px-4 py-0 sm:px-5 md:px-6 lg:px-8">
      <div className="md:hidden">
        <ProjectsMobile />
      </div>

      <div ref={sectionRef} className="relative hidden h-screen md:block">
        <div className="relative h-full w-full">
          {cards.map((project, index) => (
            <div
              key={project.key}
              ref={(node) => {
                cardsRef.current[index] = node;
              }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                zIndex: cards.length - index,
                willChange: isReady ? "transform, opacity" : "auto",
              }}
            >
              <div
                className="group block h-[88vh] w-full max-w-[88vw] overflow-hidden rounded-[28px] border border-white/10 bg-[#090909] transition-all duration-300 hover:border-white/20 focus-within:border-white/20 lg:max-w-[80vw] 2xl:max-w-[74vw]"
              >
                <div className="grid h-full grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="border-b border-white/8 px-5 py-5 sm:px-7 sm:py-6 md:px-8 lg:col-span-2">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-jetbrains text-[clamp(2.2rem,7vw,4.8rem)] leading-none font-bold tabular-nums text-white/80">
                        {project.number}
                      </p>
                      <div className="text-right">
                        <h3 className="font-jetbrains text-[clamp(1.2rem,3.1vw,3rem)] leading-tight font-semibold tracking-tight text-white/88">
                          {project.name}
                        </h3>
                        <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/3 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border-b border-white/8 px-5 py-5 sm:px-7 sm:py-7 md:px-8 lg:border-b-0 lg:border-r">
                    <div>
                      <p className="max-w-xl font-mono text-[13px] leading-7 text-white/55 sm:text-sm">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-8">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] font-extrabold text-white/90">
                        Tools & Features
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/55 sm:text-[15px]">
                        {project.tools}
                      </p>
                    </div>

                    <div className="mt-8">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open project ${project.name} live link`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/2 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/68 transition-colors duration-300 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                      >
                        Visit Site
                        <ArrowUpRight size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="relative px-5 py-5 sm:px-7 sm:py-7 md:px-8">
                    <div className="h-full min-h-65 overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:min-h-80">
                      <div
                        aria-label={`${project.name} thumbnail`}
                        className="h-full w-full bg-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        style={{
                          backgroundImage: project.thumbnail
                            ? `url(${project.thumbnail})`
                            : undefined,
                        }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-2 backdrop-blur-sm">
              {cards.map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleDotClick(index)}
                  aria-label={`Show project ${item.number}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-8 bg-white/80"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
