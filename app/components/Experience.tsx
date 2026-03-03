"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Milestone = {
  year: string;
  role: string;
  org: string;
  desc: string;
  dot: string;
  accent: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "2021",
    role: "Begin Learning",
    org: "Microsoft Office",
    desc: "Started my tech journey with Microsoft Office fundamentals — Word, Excel, PowerPoint. The seed that sparked a curiosity for building digital things.",
    dot: "#F0F5F9",
    accent: "#C9D6DF",
  },
  {
    year: "2022",
    role: "Graphic Designer",
    org: "Freelance Work",
    desc: "Picked up Figma and Photoshop, taking on freelance design projects. Developed a strong visual eye and learned to craft user-first interfaces.",
    dot: "#C9D6DF",
    accent: "#C9D6DF",
  },
  {
    year: "2023",
    role: "Python Developer",
    org: "Self-Taught & Projects",
    desc: "Dived deep into Python — scripting, automation, data manipulation, and first AI experiments with LangChain and the LLM ecosystem.",
    dot: "#C9D6DF",
    accent: "#52616B",
  },
  {
    year: "2024",
    role: "Full-Stack Developer",
    org: "Freelance & Projects",
    desc: "Built production-grade applications with Next.js, TypeScript, Node.js, PostgreSQL and cloud deployments on AWS and DigitalOcean. Completed Harkirat Singh's 0→100x cohort.",
    dot: "#F0F5F9",
    accent: "#C9D6DF",
  },
  {
    year: "2025",
    role: "AI Engineer",
    org: "Research & Projects",
    desc: "Focused on LLM integration, RAG pipelines, agentic workflows, and AI-powered SaaS products — bridging solid engineering with cutting-edge AI tooling.",
    dot: "#C9D6DF",
    accent: "#52616B",
  },
  {
    year: "NOW",
    role: "Learning Something New",
    org: "Self-Development",
    desc: "Continuously expanding — mobile engineering with React Native/Expo, DevOps at scale with Kubernetes & Terraform, and pushing the limits of what I can build.",
    dot: "#4ADE80",
    accent: "#4ADE80",
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
    <section id="experience" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/40 text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Career Timeline
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
            My Journey
          </h2>
          <p className="text-white/35 max-w-xl mx-auto">
            From curiosity to craft — every milestone that shaped me as an engineer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical silver beam */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute left-[19px] top-0 bottom-0 w-px origin-top"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, #C9D6DF 8%, #C9D6DF 92%, transparent 100%)",
              opacity: 0.22,
            }}
          />

          <div className="space-y-0">
            {MILESTONES.map((m, i) => {
              const isActive = active === i;
              const isLast = i === MILESTONES.length - 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.13 }}
                  className={`relative flex gap-8 ${isLast ? "pb-0" : "pb-12"}`}
                >
                  {/* Node */}
                  <div className="relative flex-shrink-0 mt-0.5">
                    <motion.button
                      onClick={() => setActive(isActive ? null : i)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.92 }}
                      className="relative w-10 h-10 rounded-full flex items-center justify-center focus:outline-none"
                      aria-label={`${m.year} — ${m.role}`}
                      aria-pressed={isActive}
                    >
                      {/* Outer ring */}
                      <div
                        className="absolute inset-0 rounded-full transition-all duration-300"
                        style={{
                          border: `1px solid ${isActive ? m.dot : "rgba(201,214,223,0.18)"}`,
                          boxShadow: isActive
                            ? `0 0 18px ${m.dot}50, inset 0 0 8px ${m.dot}18`
                            : "none",
                        }}
                      />
                      {/* Inner dot */}
                      <div
                        className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                        style={{
                          background: isActive ? m.dot : "rgba(201,214,223,0.40)",
                          boxShadow: isActive ? `0 0 10px ${m.dot}99` : "none",
                        }}
                      />
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1.5">
                    {/* Year pill */}
                    <span
                      className="inline-block text-[10px] font-mono tracking-[0.22em] px-2.5 py-0.5 rounded-full mb-2 border"
                      style={{
                        color: m.dot,
                        borderColor: `${m.dot}28`,
                        background: `${m.dot}07`,
                      }}
                    >
                      {m.year}
                    </span>

                    {/* Role */}
                    <h3
                      className="text-[17px] font-semibold leading-tight mb-0.5 transition-colors duration-300"
                      style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.68)" }}
                    >
                      {m.role}
                    </h3>
                    <p
                      className="text-[11px] font-mono mb-2 tracking-wider"
                      style={{ color: m.accent, opacity: 0.70 }}
                    >
                      {m.org}
                    </p>

                    {/* Expandable description */}
                    <motion.div
                      initial={false}
                      animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-white/36 text-sm leading-relaxed pb-1">
                        {m.desc}
                      </p>
                    </motion.div>

                    {!isActive && (
                      <p className="text-white/18 text-[11px] font-mono">tap to expand</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    <div className="w-full h-px bg-white/8" />
    </>
  );
}
