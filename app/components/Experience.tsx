"use client";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  useMotionValueEvent,
  type MotionValue,
  type Variants,
} from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────
interface TimelineEntry {
  year: string;
  role: string;
  category: string;
  description: string;
  isPresent?: boolean;
}

// ── Data ──────────────────────────────────────────────────────────
const ENTRIES: TimelineEntry[] = [
  {
    year: "NOW",
    role: "Fundamentals of AI, ML",
    category: "Always Exploring",
    description:
      "Exploring the foundations of Artificial Intelligence, Machine Learning, and Mobile Development. Building advanced applications and exploring the core features of emerging technologies and its future.",
    isPresent: true,
  },
  {
    year: "2025",
    role: "AI Engineer & Mobile Dev",
    category: "Dived into AI & Mobile",
    description:
      "Diving deep into AI engineering and mobile development. Building intelligent applications, experimenting with LLMs, and creating seamless mobile experiences.",
  },
  {
    year: "2024",
    role: "Full-Stack Developer",
    category: "Web Development & Cloud",
    description:
      "Built production-grade applications with Next.js, TypeScript, Node.js, PostgreSQL and cloud deployments on AWS and DigitalOcean (Docker and Kubernetes ). Completed 0→100x development. Gained experience in Web development, cloud infrastructure, and DevOps practices.",
  },
  {
    year: "2023",
    role: "C & C++ Developer",
    category: "Programming fundamentals",
    description:
      "Dived deep into C & C++ — systems programming, performance optimization, memory management, object-oriented programming and explored the low-level language.",
  },
  {
    year: "2022",
    role: "MS Office and Web Basics",
    category: "Early digital literacy",
    description:
      "Started with MS Office tools and basic web development. Created static pages and blogs, sparking an interest in technology. ",
  },
];

// ── Animation variants ────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ── Node dot sub-component ────────────────────────────────────────
function NodeDot({
  isPresent,
  isActive,
  size,
}: {
  isPresent?: boolean;
  isActive: boolean;
  size: "sm" | "md";
}) {
  const dotSz = size === "md" ? "h-3 w-3" : "h-2.5 w-2.5";
  const dotCls = isActive
    ? "border-[#F0F5F9] bg-[#F0F5F9]"
    : "border-[#52616B] bg-[#060606] group-hover:border-[#C9D6DF] group-hover:bg-[#1E2022]";
  const ringSz = size === "md" ? 32 : 26;

  return (
    <div className="relative flex items-center justify-center">
      {isPresent && isActive && (
        <motion.span
          className="absolute rounded-full"
          style={{
            width: ringSz,
            height: ringSz,
            background: "rgba(240,245,249,0.10)",
          }}
          animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      )}
      <span
        className={[
          "relative z-10 block rounded-full border transition-all duration-300 group-hover:scale-125",
          dotSz,
          dotCls,
        ].join(" ")}
        style={isActive ? { boxShadow: "0 0 0 2px rgba(240,245,249,0.3)" } : undefined}
        aria-hidden="true"
      />
    </div>
  );
}

// ── Timeline row — per-entry beam activation + hover glow ────
function TimelineRow({
  entry,
  beamProgress,
  index,
  total,
}: {
  entry: TimelineEntry;
  beamProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Threshold = fractional position of this node along the beam track
  // NodeDot sits below the year text, roughly 75% down each row
  const threshold = (index + 0.75) / total;
  useMotionValueEvent(beamProgress, "change", (v) => {
    setIsActive(v >= threshold);
  });

  const yearGlows = isActive || isHovered;  // year: beam-activate OR hover
  const textGlows = isHovered;              // role / category / description: hover only

  return (
    <motion.div
      variants={rowVariants}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Desktop (md+): 3-col grid ──────────────────────────────────
          [role+category right] | [year+node center] | [description left]
      ─────────────────────────────────────────────────────────────────── */}
      <div className="hidden md:grid md:grid-cols-[1fr_11rem_1fr] md:items-center md:gap-16 md:py-14">

        {/* Col 1 — role + category, right-aligned */}
        <div className="flex flex-col items-end gap-2 pt-1 text-right">
          <span
            className="font-semibold leading-snug tracking-tight transition-colors duration-500"
            style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)",
              color: isHovered ? "#F0F5F9" : "#B8C0CC",
            }}
          >
            {entry.role}
          </span>
          <span
            className="font-mono tracking-[0.22em] uppercase transition-colors duration-500"
            style={{
              fontSize: "clamp(0.6rem, 1vw, 0.7rem)",
              color: textGlows ? "#C9D6DF" : "#6B7A85",
            }}
          >
            {entry.category}
          </span>
        </div>

        {/* Col 2 — large year + node, centered on beam */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <span
            className="font-mono font-extrabold leading-none tracking-tight transition-all duration-500"
            style={{
              fontSize: "clamp(2.5rem, 5.2vw, 4.6rem)",
              color: yearGlows ? "#F0F5F9" : "#6B7A85",
            }}
          >
            {entry.year}
          </span>
          <NodeDot isPresent={entry.isPresent} isActive={isActive} size="md" />
        </div>

        {/* Col 3 — description, left-aligned */}
        <div className="pt-1">
          <p
            className="font-light leading-relaxed transition-colors duration-500"
            style={{
              fontSize: "clamp(0.82rem, 1.55vw, 0.98rem)",
              color: textGlows ? "#C9D6DF" : "#6B7A85",
            }}
          >
            {entry.description}
          </p>
        </div>

      </div>

      {/* ── Mobile: 2-col (node | content stack) ─────────────────── */}
      <div className="grid grid-cols-[2rem_1fr] items-start gap-4 py-9 md:hidden">

        {/* Col 1 — node pinned over beam */}
        <div className="flex justify-center pt-1.5">
          <NodeDot isPresent={entry.isPresent} isActive={isActive} size="sm" />
        </div>

        {/* Col 2 — year → role → category → description */}
        <div className="flex flex-col gap-1">
          <span
            className="font-mono font-extrabold leading-none tracking-tight transition-colors duration-500"
            style={{
              fontSize: "clamp(1.9rem, 8.5vw, 2.6rem)",
              color: yearGlows ? "#F0F5F9" : "#6B7A85",
            }}
          >
            {entry.year}
          </span>
          <span
            className="mt-1 font-semibold leading-snug tracking-tight transition-colors duration-500"
            style={{
              fontSize: "clamp(1rem, 4.5vw, 1.25rem)",
              color: isHovered ? "#F0F5F9" : "#B8C0CC",
            }}
          >
            {entry.role}
          </span>
          <span
            className="mb-2 font-mono tracking-[0.22em] uppercase transition-colors duration-500"
            style={{
              fontSize: "clamp(0.58rem, 2.5vw, 0.68rem)",
              color: textGlows ? "#C9D6DF" : "#6B7A85",
            }}
          >
            {entry.category}
          </span>
          <p
            className="font-light leading-relaxed transition-colors duration-500"
            style={{
              fontSize: "clamp(0.78rem, 3.5vw, 0.92rem)",
              color: textGlows ? "#C9D6DF" : "#6B7A85",
            }}
          >
            {entry.description}
          </p>
        </div>

      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  // Beam tracks the timeline container: 0% when top hits center, 100% when bottom hits center
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 50%", "end 50%"],
  });
  const beamScaleY = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    restDelta: 0.001,
  });
  const beamHeight = useTransform(
    beamScaleY,
    (v) => `${Math.max(0, Math.min(1, v)) * 100}%`,
  );

  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <>
      <section
        id="experience"
        ref={sectionRef}
        className="relative py-20 sm:py-20 overflow-hidden font-mono"
        aria-label="Career and experience"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">

          {/* Section heading */}
          <motion.div
            className="mb-16 sm:mb-24 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-[12px] font-mono tracking-[0.3em] uppercase text-white/30 mb-4">
              MY JOURNEY AS A DEVELOPER
            </p>
            <h2 className="font-mono font-light leading-[1.02] tracking-[0.02em]">
              <span className="text-white font-bold about-heading-size">My Journey &</span>
              <span className="text-white/65 font-normal ml-5 about-heading-size">Learning</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div ref={timelineRef} className="relative">

            {/*
              Beam: two-layer structure.
              Outer div  → left positioning (left-4 mobile / left-1/2 desktop)
              Base track → always-visible dim line
              Active div → grows from top as you scroll (beamHeight)
              Glow dot   → follows beam tip
            */}
            <div
              className="pointer-events-none absolute inset-y-8 left-4 w-px md:left-1/2"
              aria-hidden="true"
            >
              {/* Base track */}
              <div className="absolute inset-0 w-px bg-white/[0.07]" />

              {/* Active progress beam */}
              <motion.div
                className="absolute top-0 w-px"
                style={{
                  height: beamHeight,
                  background:
                    "linear-gradient(to bottom, #F0F5F9 0%, rgba(240,245,249,0.75) 80%, rgba(240,245,249,0.35) 100%)",
                }}
              />

              {/* Beam head glow dot */}
              <motion.span
                className="absolute left-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F0F5F9]"
                style={{
                  top: beamHeight,
                  boxShadow: "0 0 14px 4px rgba(240,245,249,0.55)",
                }}
              />
            </div>

            {/* Entry rows */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {ENTRIES.map((entry, index) => (
                <TimelineRow
                  key={entry.year}
                  entry={entry}
                  beamProgress={beamScaleY}
                  index={index}
                  total={ENTRIES.length}
                />
              ))}
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
