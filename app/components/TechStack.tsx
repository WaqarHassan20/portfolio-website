"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Raw GitHub devicon URLs — exact same source as reference portfolio
const DV = "https://raw.githubusercontent.com/devicons/devicon/master/icons";

type TechEntry = { img: string; label: string; color: string; invert?: boolean };

const TECHS: TechEntry[] = [
  // ── Languages
  { img: `${DV}/javascript/javascript-original.svg`,   label: "JavaScript",   color: "#F7DF1E" },
  { img: `${DV}/typescript/typescript-original.svg`,   label: "TypeScript",   color: "#3178C6" },
  { img: `${DV}/python/python-original.svg`,           label: "Python",       color: "#3776AB" },
  { img: `${DV}/c/c-original.svg`,                     label: "C",            color: "#A8B9CC" },
  { img: `${DV}/cplusplus/cplusplus-original.svg`,     label: "C++",          color: "#00599C" },
  { img: `${DV}/java/java-original.svg`,               label: "Java",         color: "#ED8B00" },
  { img: `${DV}/csharp/csharp-original.svg`,           label: "C#",           color: "#512BD4" },
  { img: `${DV}/jupyter/jupyter-original.svg`,         label: "Jupyter",      color: "#F37626" },
  // ── Frontend
  { img: `${DV}/react/react-original.svg`,             label: "React",        color: "#61DAFB" },
  { img: `${DV}/nextjs/nextjs-original.svg`,           label: "Next.js",      color: "#FFFFFF" },
  { img: `${DV}/html5/html5-original.svg`,             label: "HTML5",        color: "#E34F26" },
  { img: `${DV}/css3/css3-original.svg`,               label: "CSS3",         color: "#1572B6" },
  { img: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",                                                    label: "Tailwind CSS",  color: "#06B6D4" },
  { img: "https://avatars.githubusercontent.com/u/124599?s=200&v=4",                                                              label: "shadcn/ui",     color: "#FFFFFF" },
  { img: "https://avatars.githubusercontent.com/u/10342521?s=200&v=4",                                                            label: "Chart.js",      color: "#FF6384" },
  // ── Testing
  { img: `${DV}/jest/jest-plain.svg`,                  label: "Jest",         color: "#C21325" },
  { img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/500px-Vitejs-logo.svg.png",                    label: "Vitest",       color: "#6E9F18" },
  { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOmtyerOsIHJ4qF84e6tKiRtq3FmpJsa06Wg&s",                         label: "Cypress",      color: "#69D3A7" },
  // ── Backend & Runtime
  { img: `${DV}/nodejs/nodejs-original.svg`,           label: "Node.js",      color: "#339933" },
  { img: "https://user-images.githubusercontent.com/709451/182802334-d9c42afe-f35d-4a7b-86ea-9985f73f20c3.png",                    label: "Bun",          color: "#FBF0DF" },
  { img: "https://www.peanutsquare.com/wp-content/uploads/2024/04/Express.png",                                                    label: "Express",      color: "#FFFFFF" },
  { img: `${DV}/fastapi/fastapi-original.svg`,         label: "FastAPI",      color: "#009688" },
  { img: "https://avatars.githubusercontent.com/u/98495527?s=280&v=4",                                                             label: "Hono",         color: "#E36002" },
  { img: `${DV}/graphql/graphql-plain.svg`,            label: "GraphQL",      color: "#E10098" },
  { img: "https://avatars.githubusercontent.com/u/78011399?s=200&v=4",                                                             label: "tRPC",         color: "#2596BE" },
  { img: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",                                                       label: "Postman",      color: "#FF6C37" },
  // ── Databases & ORMs
  { img: `${DV}/postgresql/postgresql-original.svg`,   label: "PostgreSQL",   color: "#4169E1" },
  { img: `${DV}/mongodb/mongodb-original.svg`,         label: "MongoDB",      color: "#47A248" },
  { img: `${DV}/redis/redis-original.svg`,             label: "Redis",        color: "#FF4438" },
  { img: `${DV}/prisma/prisma-original.svg`,           label: "Prisma",       color: "#5A67D8", invert: true },
  { img: "https://pic.vsixhub.com/22/91/rphlmr.vscode-drizzle-orm-logo.webp",                                                      label: "Drizzle",      color: "#C5F74F" },
  { img: "https://avatars.githubusercontent.com/u/54801242?s=200&v=4",                                                             label: "ClickHouse",   color: "#FFCC01" },
  { img: "https://cdn.simpleicons.org/timescale/FDB515",                                                                          label: "TimescaleDB",  color: "#FDB515" },
  // ── Messaging & Realtime
  { img: `${DV}/apachekafka/apachekafka-original.svg`, label: "Kafka",        color: "#CDCDCD", invert: true },
  { img: "https://www.vectorlogo.zone/logos/rabbitmq/rabbitmq-icon.svg",                                                           label: "RabbitMQ",     color: "#FF6600" },
  { img: `${DV}/socketio/socketio-original.svg`,       label: "Socket.IO",    color: "#FFFFFF", invert: true },
  { img: "https://jwt.io/img/logo-asset.svg",          label: "JWT",          color: "#D63AFF" },
  // ── AI
  { img: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",                                                            label: "LangChain",    color: "#00C896" },
  // ── Cloud
  { img: `${DV}/amazonwebservices/amazonwebservices-original-wordmark.svg`,     label: "AWS",          color: "#FF9900" },
  { img: `${DV}/digitalocean/digitalocean-original.svg`, label: "DigitalOcean", color: "#0080FF" },
  { img: `${DV}/cloudflare/cloudflare-original.svg`,   label: "Cloudflare",   color: "#F38020" },
  { img: "https://www.svgrepo.com/show/327408/logo-vercel.svg",                                                                     label: "Vercel",       color: "#FFFFFF", invert: true },
  // ── DevOps & Infrastructure
  { img: `${DV}/docker/docker-original.svg`,           label: "Docker",       color: "#2496ED" },
  { img: `${DV}/kubernetes/kubernetes-plain.svg`,      label: "Kubernetes",   color: "#326CE5" },
  { img: `${DV}/nginx/nginx-original.svg`,             label: "Nginx",        color: "#009639" },
  { img: `${DV}/bash/bash-original.svg`,               label: "Bash",         color: "#4EAA25", invert: true },
  { img: `${DV}/terraform/terraform-original.svg`,     label: "Terraform",    color: "#844FBA" },
  { img: `${DV}/ansible/ansible-original.svg`,         label: "Ansible",      color: "#EE0000" },
  { img: `${DV}/helm/helm-original.svg`,               label: "Helm",         color: "#277A9F", invert: true },
  { img: "https://www.vectorlogo.zone/logos/vaultproject/vaultproject-icon.svg",                                                    label: "Vault",        color: "#FFEC6E", invert: true },
  { img: "https://user-images.githubusercontent.com/4060187/196936104-5797972c-ab10-4834-bd61-0d1e5f442c9c.png",                   label: "Turborepo",    color: "#EF4444" },
  { img: `${DV}/argocd/argocd-original.svg`,           label: "ArgoCD",       color: "#EF7B4D" },
  // ── Monitoring & CI/CD
  { img: `${DV}/prometheus/prometheus-original.svg`,   label: "Prometheus",   color: "#E6522C" },
  { img: `${DV}/grafana/grafana-original.svg`,         label: "Grafana",      color: "#F46800" },
  { img: `${DV}/githubactions/githubactions-original.svg`, label: "GH Actions", color: "#2088FF" },
  { img: `${DV}/jenkins/jenkins-original.svg`,         label: "Jenkins",      color: "#D33833" },
  { img: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",                                                              label: "Git",          color: "#F05032" },
  // ── Design
  { img: `${DV}/figma/figma-original.svg`,             label: "Figma",        color: "#F24E1E" },
];

const CLIP = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";

// ── Responsive grid config: cols + cell size adapt to viewport ───────────────
function useGridConfig() {
  const [winW, setWinW] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setWinW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  if (!winW || winW >= 1400) return { cols: 10, cell: 122, gap: 12 };
  if (winW >= 1100) return { cols: 8,  cell: 116, gap: 12 };
  if (winW >= 800)  return { cols: 6,  cell: 110, gap: 10 };
  if (winW >= 560)  return { cols: 5,  cell: 90,  gap: 10 };
  return                   { cols: 4,  cell: 72,  gap: 8  };
}

function TechCard({
  tech,
  index,
  cell,
  cols,
  onHover,
  colorized,
}: {
  tech: TechEntry;
  index: number;
  cell: number;
  cols: number;
  onHover: (hovered: boolean) => void;
  colorized: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const handleHover = (h: boolean) => {
    setHovered(h);
    onHover(h);
  };

  const staggerDelay = colorized ? `${index * 28}ms` : "0ms";
  const showColorIcon   = colorized || hovered;
  const showColorBorder = hovered;
  const logoSize = Math.round(cell * 0.265);

  return (
    <div
      style={{
        width: cell,
        height: cell,
        filter: showColorBorder
          ? `drop-shadow(0 0 1.5px ${tech.color})
             drop-shadow(0 0 6px  ${tech.color}aa)
             drop-shadow(0 0 16px ${tech.color}44)`
          : "none",
        transition: "filter 0.4s ease",
      }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.4,
          delay: (index % cols) * 0.04 + Math.floor(index / cols) * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full h-full"
      >
        {/* ── Outer diamond → border colour ────────────────────── */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: CLIP,
            background: showColorBorder ? tech.color : "rgba(255,255,255,0.14)",
            transition: "background 0.4s ease",
          }}
        />
        {/* ── Inner diamond → pitch-dark fill (creates the thin ring) ── */}
        <div
          className="absolute"
          style={{ inset: "2.5px", clipPath: CLIP, background: "#060606" }}
        />

        {/* ── Logo bg ambient glow — subtle colored radial light on hover ── */}
        <div
          className="absolute"
          style={{
            inset: "2.5px",
            clipPath: CLIP,
            background: showColorBorder
              ? `radial-gradient(circle at 50% 50%, ${tech.color}2e 0%, ${tech.color}12 55%, transparent 78%)`
              : "transparent",
            transition: "background 0.4s ease",
            zIndex: 2,
          }}
        />

        {/* ── Logo ─────────────────────────────────────────────── */}
        {/* rest → grayscale (colorless but visible), hover → full brand colors */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tech.img}
            alt={tech.label}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.opacity = "0";
            }}
            style={{
              width: logoSize,
              height: logoSize,
              objectFit: "contain",
              filter: showColorIcon
                ? tech.invert
                  ? `invert(1) brightness(1.25) drop-shadow(0 0 8px ${tech.color}cc)`
                  : `grayscale(0%) brightness(1.3) drop-shadow(0 0 8px ${tech.color}cc)`
                : tech.invert
                  ? "invert(1) grayscale(100%) brightness(0.78)"
                  : "grayscale(100%) brightness(0.82) saturate(0)",
              transition: `filter 0.4s ease ${staggerDelay}`,
            }}
          />
        </div>

        {/* ── Label — rendered below card, z-index lifted at grid level ── */}
        <div
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap
                     text-[10px] font-mono tracking-wide pointer-events-none"
          style={{
            color: tech.color,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          {tech.label}
        </div>
      </motion.div>
    </div>
  );
}


export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIdx, setHoveredIdx] = useState<number>(-1);
  const [locked, setLocked] = useState(false);   // click-locked on
  const [btnHover, setBtnHover] = useState(false); // pointer is on button
  const colorized = locked || btnHover;

  const { cols: COLS, cell: CELL, gap: GAP } = useGridConfig();
  const STEP = CELL + GAP;
  const OFFSET = STEP / 2;

  // Split into rows of COLS, odd rows offset
  const rows: ((typeof TECHS)[0] | null)[][] = [];
  for (let i = 0; i < TECHS.length; i += COLS) {
    rows.push(TECHS.slice(i, i + COLS));
  }
  // Pad last row
  const lastRow = rows[rows.length - 1];
  while (lastRow.length < COLS) lastRow.push(null);

  const gridW = COLS * STEP - GAP;
  // Actual bottom of last row: uses 0.72 vertical compression + half-step stagger for odd last row
  const gridH = Math.ceil((rows.length - 1) * STEP * 0.72 + CELL + (OFFSET * 0.72));

  return (
    <>
    <section
      id="skills"
      ref={ref}
      className="relative pt-16 pb-8 sm:pb-20 md:pb-32 overflow-hidden"
    >

      {/* Ambient glow  — layered silver bloom behind the icon grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 75% 50% at 50% 58%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 40%, transparent 68%)",
            "radial-gradient(ellipse 55% 40% at 30% 40%, rgba(200,214,224,0.055) 0%, transparent 55%)",
            "radial-gradient(ellipse 50% 45% at 72% 65%, rgba(180,200,220,0.045) 0%, transparent 55%)",
          ].join(", "),
        }}
      />

      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 px-6"
        >
          <p className="text-[12px] font-mono tracking-[0.3em] uppercase text-white/30 mb-4">
            Skills I work with
          </p>
          <div className="flex flex-col items-center gap-4 sm:relative sm:flex-row sm:justify-center" style={{ maxWidth: gridW, margin: "0 auto" }}>
            <h2 className="font-mono font-light leading-[1.02] tracking-[0.14em]">
              <span className="text-white font-bold about-heading-size">Tech</span>
              <span className="text-white/65 font-normal ml-5 about-heading-size">Stack</span>
            </h2>

            {/* Colors button — hover = peek (pulsing), click = lock (solid) */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full
                         font-mono text-[9px] tracking-[0.22em] uppercase
                         border transition-all duration-300 cursor-pointer select-none
                         sm:absolute sm:right-0"
              style={{
                borderColor: locked
                  ? "rgba(255,255,255,0.40)"
                  : btnHover
                    ? "rgba(255,255,255,0.22)"
                    : "rgba(255,255,255,0.18)",
                background: locked
                  ? "rgba(255,255,255,0.10)"
                  : btnHover
                    ? "rgba(255,255,255,0.04)"
                    : "transparent",
                color: locked
                  ? "rgba(255,255,255,0.85)"
                  : btnHover
                    ? "rgba(255,255,255,0.55)"
                    : "rgba(255,255,255,0.45)",
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              onClick={() => setLocked((v) => !v)}
            >
              {/* Dot: pulsing ring on hover-only, solid on locked */}
              <span className="relative flex items-center justify-center" style={{ width: 7, height: 7 }}>
                {/* Pulsing ring — shows only on hover when NOT locked */}
                {btnHover && !locked && (
                  <motion.span
                    className="absolute rounded-full"
                    style={{ inset: -3, border: "1px solid rgba(255,255,255,0.45)" }}
                    animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: locked
                      ? "#ffffff"
                      : btnHover
                        ? "rgba(255,255,255,0.55)"
                        : "rgba(255,255,255,0.2)",
                    display: "inline-block",
                    transition: "background 0.3s",
                    boxShadow: locked ? "0 0 6px 1px rgba(255,255,255,0.4)" : "none",
                  }}
                />
              </span>
              {locked ? "Unlock Colors" : "Lock Colors"}
            </div>
          </div>
        </motion.div>

        {/* Diamond net grid — full screen width */}
        <div className="w-full overflow-x-auto px-3 sm:px-8">
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
                    style={{ left: x, top: y, zIndex: hoveredIdx === globalIdx ? 50 : 1 }}
                  >
                    <TechCard
                      tech={tech}
                      index={globalIdx}
                      cell={CELL}
                      cols={COLS}
                      onHover={(h) => setHoveredIdx(h ? globalIdx : -1)}
                      colorized={colorized}
                    />
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
