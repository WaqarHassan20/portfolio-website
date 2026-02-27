"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, ExternalLink } from "lucide-react";

type TimelineItem = {
  year: string;
  title: string;
  org: string;
  desc: string;
  link?: string;
  type: "education" | "work";
};

const EDUCATION: TimelineItem[] = [
  {
    year: "2021 — Present",
    title: "BS Computer Science",
    org: "University — Final Year",
    desc: "Focused on software engineering, data structures, algorithms, and system design. Actively building real-world projects alongside academics.",
    type: "education",
  },
];

const WORK: TimelineItem[] = [
  {
    year: "2024 — Present",
    title: "Full-Stack Developer",
    org: "Freelance & Remote",
    desc: "Building scalable web applications for clients worldwide. Specializing in Next.js, TypeScript, Node.js, and cloud deployments on AWS and DigitalOcean.",
    type: "work",
  },
  {
    year: "2023 — 2024",
    title: "Web Development — 0 to 100x Dev",
    org: "Cohort by Harkirat Singh",
    desc: "Completed an intensive full-stack bootcamp covering React, Node.js, PostgreSQL, Docker, and deployment pipelines. Built 10+ production-quality projects.",
    link: "https://github.com/WaqarHassan20/Web-Development-Cohort3.0",
    type: "work",
  },
  {
    year: "2023",
    title: "Generative AI Engineering",
    org: "Self-Directed Study",
    desc: "Explored LangChain, LangGraph, and the LLM ecosystem. Built AI-powered applications integrating OpenAI APIs and agentic workflows.",
    link: "https://github.com/WaqarHassan20/generative-ai",
    type: "work",
  },
];

function TimelineCard({
  item,
  index,
  inView,
  isLast,
}: {
  item: TimelineItem;
  index: number;
  inView: boolean;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative pl-12"
    >
      {/* Icon */}
      <div className="absolute left-0 top-0 w-9 h-9 rounded-xl glass border border-white/[0.08] flex items-center justify-center z-10 bg-[#030712]">
        {item.type === "education" ? (
          <GraduationCap className="w-4 h-4 text-slate-400" />
        ) : (
          <Briefcase className="w-4 h-4 text-slate-400" />
        )}
      </div>

      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-[17px] top-9 bottom-0 w-px bg-gradient-to-b from-white/10 to-transparent" />
      )}

      {/* Card */}
      <div className="glass rounded-2xl p-5 border border-white/[0.06] mb-6 group hover:border-white/[0.10] transition-all duration-300">
        <span className="text-xs font-mono text-slate-600">{item.year}</span>
        <h3 className="text-white font-semibold mt-1 text-base group-hover:text-slate-100 transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-500 text-sm font-medium mb-2">{item.org}</p>
        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-xs text-slate-500 hover:text-slate-300 transition-colors font-mono"
          >
            View on GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-slate-400 text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
            Experience
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4">
            My Journey
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            The education and hands-on experience that shaped me as a developer.
          </p>
        </motion.div>

        {/* Two-column timeline */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-3"
            >
              <GraduationCap className="w-4 h-4" />
              Education
            </motion.h3>
            {EDUCATION.map((item, i) => (
              <TimelineCard
                key={i}
                item={item}
                index={i}
                inView={inView}
                isLast={i === EDUCATION.length - 1}
              />
            ))}
          </div>

          {/* Work */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-3"
            >
              <Briefcase className="w-4 h-4" />
              Work & Projects
            </motion.h3>
            {WORK.map((item, i) => (
              <TimelineCard
                key={i}
                item={item}
                index={i}
                inView={inView}
                isLast={i === WORK.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
