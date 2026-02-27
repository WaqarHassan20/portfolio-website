"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Linkedin } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "CTO",
    company: "TechFlow Inc.",
    avatar: "SM",
    linkedin: "#",
    text: "Waqar delivered our platform 2 weeks ahead of schedule. His attention to detail and code quality is exceptional. The architecture he designed will scale with us for years. I wouldn't hesitate to work with him again.",
  },
  {
    name: "David Chen",
    role: "Founder",
    company: "DevSpark",
    avatar: "DC",
    linkedin: "#",
    text: "One of the most talented full-stack developers I've had the pleasure of working with. He understands both the technical and product side — that combination is rare and incredibly valuable.",
  },
  {
    name: "Aisha Rahman",
    role: "Product Manager",
    company: "Nexus Labs",
    avatar: "AR",
    linkedin: "#",
    text: "Waqar transformed our legacy backend into a modern microservices architecture. The new system handles 10x the load with better reliability and our deployment time dropped from hours to minutes.",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" ref={ref} className="relative py-32 px-6 overflow-hidden">
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
            Testimonials
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4">
            What People Say
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Feedback from clients and collaborators I&apos;ve had the pleasure of working with.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-2xl p-7 border border-white/[0.06] flex flex-col gap-5 hover:border-white/[0.10] transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-6 h-6 text-slate-700" />

              {/* Text */}
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-white/[0.05]" />

              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-xs font-bold text-slate-300">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-slate-500 text-xs">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
                <a
                  href={t.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-slate-600 hover:text-slate-300 hover:border-white/[0.12] transition-all"
                  aria-label={`${t.name} on LinkedIn`}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-slate-600 text-xs font-mono mt-12"
        >
          More recommendations available on{" "}
          <a
            href="https://linkedin.com/in/waqar-khalid-9a1342338"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors underline underline-offset-2"
          >
            LinkedIn
          </a>
        </motion.p>
      </div>
    </section>
  );
}
