"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiBun,
  SiExpress,
  SiGraphql,
  SiPostman,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiApachekafka,
  SiSocketdotio,
  SiJsonwebtokens,
  SiLangchain,
  SiAmazonwebservices,
  SiDigitalocean,
  SiCloudflare,
  SiDocker,
  SiKubernetes,
  SiNginx,
  SiGnubash,
  SiTerraform,
  SiAnsible,
  SiHelm,
  SiPrometheus,
  SiGrafana,
  SiGithubactions,
  SiJenkins,
  SiGit,
  SiDrizzle,
  SiFigma,
  SiVercel,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const TECHS = [
  // Row 0
  { icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: SiPython, label: "Python", color: "#3776AB" },
  { icon: SiCplusplus, label: "C++", color: "#00599C" },
  { icon: FaJava, label: "Java", color: "#ED8B00" },
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, label: "Next.js", color: "#FFFFFF" },
  { icon: SiHtml5, label: "HTML5", color: "#E34F26" },
  { icon: SiCss3, label: "CSS3", color: "#1572B6" },
  { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
  { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { icon: SiBun, label: "Bun", color: "#FBF0DF" },
  { icon: SiExpress, label: "Express", color: "#FFFFFF" },
  { icon: SiGraphql, label: "GraphQL", color: "#E10098" },
  { icon: SiPostman, label: "Postman", color: "#FF6C37" },
  { icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
  { icon: SiMongodb, label: "MongoDB", color: "#47A248" },
  { icon: SiRedis, label: "Redis", color: "#FF4438" },
  { icon: SiPrisma, label: "Prisma", color: "#5A67D8" },
  { icon: SiDrizzle, label: "Drizzle", color: "#C5F74F" },
  { icon: SiApachekafka, label: "Kafka", color: "#CDCDCD" },
  { icon: SiSocketdotio, label: "Socket.IO", color: "#FFFFFF" },
  { icon: SiJsonwebtokens, label: "JWT", color: "#D63AFF" },
  { icon: SiLangchain, label: "LangChain", color: "#00C896" },
  { icon: SiAmazonwebservices, label: "AWS", color: "#FF9900" },
  { icon: SiDigitalocean, label: "DigitalOcean", color: "#0080FF" },
  { icon: SiCloudflare, label: "Cloudflare", color: "#F38020" },
  { icon: SiDocker, label: "Docker", color: "#2496ED" },
  { icon: SiKubernetes, label: "Kubernetes", color: "#326CE5" },
  { icon: SiNginx, label: "Nginx", color: "#009639" },
  { icon: SiGnubash, label: "Bash", color: "#4EAA25" },
  { icon: SiTerraform, label: "Terraform", color: "#844FBA" },
  { icon: SiAnsible, label: "Ansible", color: "#EE0000" },
  { icon: SiHelm, label: "Helm", color: "#0F1689" },
  { icon: SiPrometheus, label: "Prometheus", color: "#E6522C" },
  { icon: SiGrafana, label: "Grafana", color: "#F46800" },
  { icon: SiGithubactions, label: "GH Actions", color: "#2088FF" },
  { icon: SiJenkins, label: "Jenkins", color: "#D33833" },
  { icon: SiGit, label: "Git", color: "#F05032" },
  { icon: SiFigma, label: "Figma", color: "#F24E1E" },
  { icon: SiVercel, label: "Vercel", color: "#FFFFFF" },
];

// Build diamond-net rows: odd rows are offset by half a cell (staggered)
// The visual is like a net/grid tilted 45° — we achieve this by giving
// even rows a normal left start and odd rows a +half-cell offset.
const COLS = 10; // wider grid to span full screen

function TechCard({ tech, index }: { tech: (typeof TECHS)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = tech.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.4,
        delay: (index % COLS) * 0.04 + Math.floor(index / COLS) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col items-center justify-center gap-2 cursor-default group"
      style={{
        width: 128,
        height: 128,
      }}
    >
      {/* Diamond shape */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          background: hovered
            ? `rgba(${hexToRgb(tech.color)}, 0.14)`
            : "rgba(255,255,255,0.03)",
          boxShadow: hovered
            ? `0 0 36px 8px ${tech.color}55, inset 0 0 24px ${tech.color}22`
            : "none",
        }}
      />
      {/* Diamond border */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          background: "transparent",
          boxShadow: hovered
            ? `0 0 0 1.5px ${tech.color}99`
            : "0 0 0 1px rgba(255,255,255,0.08)",
        }}
      />
      {/* Icon */}
      <Icon
        className="relative z-10 transition-all duration-300"
        style={{
          fontSize: 38,
          color: hovered ? tech.color : "rgba(255,255,255,0.30)",
          filter: hovered ? `drop-shadow(0 0 12px ${tech.color}cc)` : "none",
        }}
      />
      {/* Label tooltip on hover */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                   text-[11px] font-mono tracking-wide transition-all duration-200 pointer-events-none"
        style={{
          color: hovered ? tech.color : "transparent",
          opacity: hovered ? 1 : 0,
        }}
      >
        {tech.label}
      </div>
    </motion.div>
  );
}

function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return "255,255,255";
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Split into rows of COLS, odd rows offset
  const rows: ((typeof TECHS)[0] | null)[][] = [];
  for (let i = 0; i < TECHS.length; i += COLS) {
    rows.push(TECHS.slice(i, i + COLS));
  }
  // Pad last row
  const lastRow = rows[rows.length - 1];
  while (lastRow.length < COLS) lastRow.push(null);

  const CELL = 128; // px — diamond cell width/height
  const GAP = 12;   // px — gap between diamonds
  const STEP = CELL + GAP;
  const OFFSET = STEP / 2; // half-step offset for odd rows

  const gridW = COLS * STEP - GAP;
  const gridH = rows.length * STEP - GAP + OFFSET; // extra for stagger

  return (
    <>
    <section
      id="skills"
      ref={ref}
      className="relative pt-20 pb-0 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 right-0 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />

      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 px-6"
        >
          <button
            onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/40 text-sm font-mono mb-6 cursor-pointer hover:border-white/25 hover:text-white/65 transition-all duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Skills &amp; Tech Stack
          </button>
          <h2 className="text-4xl sm:text-6xl font-semibold text-white/70 mb-4">
            Tools I Work With
          </h2>
          <p className="text-white/35 max-w-2xl mx-auto text-lg">
            Hover any icon to reveal its true color — a full stack from UI to
            infrastructure.
          </p>
        </motion.div>

        {/* Diamond net grid — full screen width */}
        <div className="w-full overflow-x-auto px-8">
          <div className="flex justify-center min-w-full">
          <div className="relative" style={{ width: gridW, height: gridH }}>
            {rows.map((row, rowIdx) =>
              row.map((tech, colIdx) => {
                if (!tech) return null;
                const x = colIdx * STEP + (rowIdx % 2 === 1 ? OFFSET : 0);
                const y = rowIdx * STEP * 0.72; // 0.72 compresses vertically for diamond-net overlap
                const globalIdx = rowIdx * COLS + colIdx;
                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    className="absolute"
                    style={{ left: x, top: y }}
                  >
                    <TechCard tech={tech} index={globalIdx} />
                  </div>
                );
              }),
            )}

            {/* Connecting lines overlay — draws the net */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={gridW}
              height={gridH}
              style={{ overflow: "visible" }}
            >
              {rows.map((row, rowIdx) =>
                row.map((tech, colIdx) => {
                  if (!tech) return null;
                  const cx =
                    colIdx * STEP + (rowIdx % 2 === 1 ? OFFSET : 0) + CELL / 2;
                  const cy = rowIdx * STEP * 0.72 + CELL / 2;
                  const lines = [];

                  // right neighbour
                  if (colIdx + 1 < COLS && row[colIdx + 1]) {
                    const nx =
                      (colIdx + 1) * STEP +
                      (rowIdx % 2 === 1 ? OFFSET : 0) +
                      CELL / 2;
                    const ny = cy;
                    lines.push(
                      <line
                        key={`r-${rowIdx}-${colIdx}`}
                        x1={cx}
                        y1={cy}
                        x2={nx}
                        y2={ny}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                      />,
                    );
                  }
                  // bottom-left neighbour
                  if (rowIdx + 1 < rows.length) {
                    const bColIdx = rowIdx % 2 === 0 ? colIdx - 1 : colIdx;
                    if (
                      bColIdx >= 0 &&
                      bColIdx < COLS &&
                      rows[rowIdx + 1][bColIdx]
                    ) {
                      const nx =
                        bColIdx * STEP +
                        ((rowIdx + 1) % 2 === 1 ? OFFSET : 0) +
                        CELL / 2;
                      const ny = (rowIdx + 1) * STEP * 0.72 + CELL / 2;
                      lines.push(
                        <line
                          key={`bl-${rowIdx}-${colIdx}`}
                          x1={cx}
                          y1={cy}
                          x2={nx}
                          y2={ny}
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="1"
                        />,
                      );
                    }
                  }
                  // bottom-right neighbour
                  if (rowIdx + 1 < rows.length) {
                    const bColIdx = rowIdx % 2 === 0 ? colIdx : colIdx + 1;
                    if (
                      bColIdx >= 0 &&
                      bColIdx < COLS &&
                      rows[rowIdx + 1][bColIdx]
                    ) {
                      const nx =
                        bColIdx * STEP +
                        ((rowIdx + 1) % 2 === 1 ? OFFSET : 0) +
                        CELL / 2;
                      const ny = (rowIdx + 1) * STEP * 0.72 + CELL / 2;
                      lines.push(
                        <line
                          key={`br-${rowIdx}-${colIdx}`}
                          x1={cx}
                          y1={cy}
                          x2={nx}
                          y2={ny}
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="1"
                        />,
                      );
                    }
                  }
                  return lines;
                }),
              )}
            </svg>
          </div>
          </div>
        </div>

      </div>
    </section>
    <div className="w-full h-px bg-white/8" />
    </>
  );
}
