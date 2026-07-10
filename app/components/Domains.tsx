"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/app/components/shared/SectionHeading";
import {
  DOMAIN_CENTERS,
  DOMAIN_CIRCLES,
  DOMAIN_HIT_AREAS,
  DOMAIN_INTERSECTION_LABELS,
  DOMAIN_LIT_ZONES,
  DOMAIN_RADIUS,
} from "@/lib/data/domains";
import type { CircleKey, HitZone } from "@/types/domains";

export default function Domains() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState<HitZone | null>(null);

  const isSingleHover =
    active === "frontend" || active === "backend" || active === "devops";

  const getVariant = (key: CircleKey): "glow" | "dim" | "lit" | "default" => {
    if (!active) return "default";
    if (isSingleHover) return active === key ? "glow" : "dim";
    return DOMAIN_LIT_ZONES[active].includes(key) ? "lit" : "default";
  };

  return (
    <>
      <section
        id="domains"
        ref={ref}
        className="relative scroll-mt-20 py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col md:h-screen overflow-hidden"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col flex-1 min-h-0">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center py-6 shrink-0"
          >
            <SectionHeading
              eyebrow="Skills Intersection"
              primary="Main"
              secondary="Domains"
              className="text-center"
              primaryClassName="text-white font-bold text-[clamp(1.8rem,3.5vw,2.8rem)]"
              secondaryClassName="text-white/65 font-normal ml-3 sm:ml-6 text-[clamp(1.8rem,3.5vw,2.8rem)]"
            />
          </motion.div>

          {/* Mobile/Tablet view: Responsive Bento grid of 3 Glass Cards */}
          <div className="md:hidden flex flex-col gap-6 mt-4 w-full">
            {DOMAIN_CIRCLES.map((circle, index) => (
              <motion.div
                key={circle.key}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass border border-white/10 rounded-2xl p-5 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        circle.key === "frontend"
                          ? "#a855f7" // MERN
                          : circle.key === "backend"
                            ? "#00c896" // AI
                            : "#3b82f6", // DevOps
                      boxShadow: `0 0 8px currentColor`,
                    }}
                  />
                  <h3 className="font-mono font-bold text-base text-white uppercase tracking-wider">
                    {circle.title}
                  </h3>
                </div>
                <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                  {circle.sub}
                </p>
                <div className="flex flex-col gap-2 mt-2">
                  {circle.skillRows.map((row, rIdx) => (
                    <div key={rIdx} className="flex flex-wrap gap-2">
                      {row.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-full border border-white/6 bg-white/2 font-mono text-[10px] text-white/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop view Venn diagram SVG card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden md:flex glass border border-white/13 rounded-3xl p-4 md:mx-4 flex-col flex-1 min-h-0"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.04), 0 8px 40px rgba(255,255,255,0.04), inset 0 0 60px rgba(255,255,255,0.015)",
            }}
          >
            <motion.svg
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
              viewBox="0 0 900 770"
              className="w-full h-full flex-1"
              style={{ minHeight: 0 }}
            >
              {/* ── 3 main circles with animated glow / dim ── */}
              {(["frontend", "backend", "devops"] as const).map((key) => {
                const v = getVariant(key);
                return (
                  <motion.circle
                    key={key}
                    cx={DOMAIN_CENTERS[key].cx}
                    cy={DOMAIN_CENTERS[key].cy}
                    r={DOMAIN_RADIUS}
                    strokeWidth="1"
                    animate={{
                      fill:
                        v === "dim"
                          ? "rgba(255,255,255,0.005)"
                          : v === "glow"
                            ? "rgba(96, 165, 250, 0.08)"
                            : v === "lit"
                              ? "rgba(255,255,255,0.07)"
                              : "rgba(255,255,255,0.03)",
                      stroke:
                        v === "dim"
                          ? "rgba(255,255,255,0.04)"
                          : v === "glow"
                            ? "rgba(96, 165, 250, 0.85)"
                            : v === "lit"
                              ? "rgba(255,255,255,0.36)"
                              : "rgba(255,255,255,0.10)",
                      opacity: v === "dim" ? 0.15 : 1,
                      filter:
                        v === "glow"
                          ? "drop-shadow(0 0 16px rgba(96, 165, 250, 0.6)) drop-shadow(0 0 30px rgba(96, 165, 250, 0.25))"
                          : "drop-shadow(0 0 0px rgba(255,255,255,0))",
                    }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  />
                );
              })}

              {/* ── per-circle: title + sub + skill rows with dot separators ── */}
              {DOMAIN_CIRCLES.map(({ key, title, sub, skillRows, lx, ly }) => (
                <g key={key}>
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    fontSize="22"
                    fontFamily="monospace"
                    fontWeight="700"
                    letterSpacing="3"
                    fill="rgba(255,255,255,0.82)"
                    className="uppercase"
                  >
                    {title}
                  </text>
                  <text
                    x={lx}
                    y={ly + 18}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="monospace"
                    letterSpacing="2"
                    fill="rgba(255,255,255,0.28)"
                    className="uppercase"
                  >
                    {sub}
                  </text>
                  {skillRows.map((row, i) => (
                    <text
                       key={i}
                       x={lx}
                       y={ly + 38 + i * 17}
                       textAnchor="middle"
                       fontSize="10"
                       fontFamily="monospace"
                       letterSpacing="0.8"
                     >
                       {row.flatMap((skill, j) =>
                         j === 0
                           ? [
                               <tspan key={skill} fill="rgba(255,255,255,0.52)">
                                 {skill}
                               </tspan>,
                             ]
                           : [
                               <tspan key={`${skill}-dot`} fill="rgba(255,255,255,0.18)">
                                 {" · "}
                               </tspan>,
                               <tspan key={skill} fill="rgba(255,255,255,0.52)">
                                 {skill}
                               </tspan>,
                             ],
                       )}
                     </text>
                  ))}
                </g>
              ))}

              {/* ── 4 static intersection labels ── */}
              {DOMAIN_INTERSECTION_LABELS.map(({ x, y, center, lines }) => (
                <g key={x + "-" + y}>
                  {lines.map((line, lineIdx) => (
                    <text
                      key={line}
                      x={x}
                      y={y + lineIdx * 15}
                      textAnchor="middle"
                      fontSize={center ? "10.5" : "9.5"}
                      fontFamily="monospace"
                      fontWeight={center ? "700" : "500"}
                      letterSpacing="2"
                      fill={center ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.48)"}
                      className="uppercase"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              ))}

              {/* ── invisible hit areas — drawn last so they sit on top ── */}
              {DOMAIN_HIT_AREAS.map(({ id, cx, cy, r }) => (
                <circle
                  key={id}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setActive(id)}
                  onMouseLeave={() => setActive(null)}
                />
              ))}
            </motion.svg>
          </motion.div>
        </div>
      </section>
      <div className="my-2 md:my-10 lg:my-24 w-full h-px bg-white/8" />
    </>
  );
}
