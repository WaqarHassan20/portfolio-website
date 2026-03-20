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
} from "@/app/data/domains";
import type { CircleKey, HitZone } from "@/app/types/domains";

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
        className="relative h-screen py-12 px-8 flex flex-col overflow-hidden"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col flex-1 min-h-0">
          {/* heading */}
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
              primaryClassName="text-white font-bold text-[clamp(2rem,7.2vw,4rem)]"
              secondaryClassName="text-white/65 font-normal ml-3 sm:ml-6 text-[clamp(2rem,7.2vw,4rem)]"
            />
          </motion.div>

          {/* card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass border border-white/13 rounded-3xl p-4 md:mx-4 flex flex-col flex-1 min-h-0"
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
                            ? "rgba(255,255,255,0.11)"
                            : v === "lit"
                              ? "rgba(255,255,255,0.07)"
                              : "rgba(255,255,255,0.03)",
                      stroke:
                        v === "dim"
                          ? "rgba(255,255,255,0.04)"
                          : v === "glow"
                            ? "rgba(255,255,255,0.55)"
                            : v === "lit"
                              ? "rgba(255,255,255,0.36)"
                              : "rgba(255,255,255,0.10)",
                      opacity: v === "dim" ? 0.15 : 1,
                      filter:
                        v === "glow"
                          ? "drop-shadow(0 0 18px rgba(255,255,255,0.45)) drop-shadow(0 0 40px rgba(255,255,255,0.2))"
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
                    style={{ textTransform: "uppercase" }}
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
                    style={{ textTransform: "uppercase" }}
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
                              <tspan key={skill} fill="rgba(255,255,255,0.38)">
                                {skill}
                              </tspan>,
                            ]
                          : [
                              <tspan
                                key={`d${j}`}
                                fill="rgba(255,255,255,0.85)"
                              >
                                {" "}
                                ·{" "}
                              </tspan>,
                              <tspan key={skill} fill="rgba(255,255,255,0.38)">
                                {skill}
                              </tspan>,
                            ],
                      )}
                    </text>
                  ))}
                </g>
              ))}

              {/* ── intersection zone labels ── */}
              {DOMAIN_INTERSECTION_LABELS.map(
                ({ x, y, lines, center }, idx) => (
                  <g key={idx}>
                    {lines.map((line, i) => (
                      <text
                        key={line}
                        x={x}
                        y={y + i * (center ? 15 : 0)}
                        textAnchor="middle"
                        fontSize={center ? "13" : "10"}
                        fontFamily="monospace"
                        fontWeight={center ? "700" : "400"}
                        letterSpacing={center ? "3" : "1.5"}
                        fill={
                          center
                            ? "rgba(255,255,255,0.65)"
                            : "rgba(255,255,255,0.22)"
                        }
                        style={{ textTransform: "uppercase" }}
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                ),
              )}

              {/* ── invisible hit areas — drawn last so they sit on top ── */}
              {DOMAIN_HIT_AREAS.map(({ id, cx, cy, r }) => (
                <circle
                  key={id}
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setActive(id)}
                  onMouseLeave={() => setActive(null)}
                />
              ))}
            </motion.svg>
          </motion.div>
        </div>
      </section>
      <div className="my-2 md:my-24 w-full h-px bg-white/8" />
    </>
  );
}
