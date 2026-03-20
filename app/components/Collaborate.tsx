"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import SectionHeading from "@/app/components/shared/SectionHeading";
import { COLLAB_BUDGETS, COLLAB_PROJECT_TYPES } from "@/app/data/collaborate";
import type { BudgetOption, ProjectTypeOption } from "@/app/types/content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Collaborate() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [selected, setSelected] = useState<ProjectTypeOption[]>([]);
  const [budget, setBudget] = useState<BudgetOption | "">("");
  const [brief, setBrief] = useState("");

  const toggleType = (t: ProjectTypeOption) =>
    setSelected((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );

  const isValid =
    name.trim().length > 0 &&
    selected.length > 0 &&
    budget.length > 0 &&
    brief.trim().length > 0;

  const handleSend = () => {
    if (!isValid) return;

    // Build a prefilled Gmail compose URL from the validated form state.
    const subject = encodeURIComponent(`Project Brief from ${name.trim()}`);
    const body = encodeURIComponent(
      `Hi Waqar,\n\nName: ${name.trim()}\nProject Type: ${selected.join(", ")}\nBudget: ${budget || "Not specified"}\n\nProject Brief:\n${brief.trim()}\n`,
    );
    // Open compose in Gmail web directly
    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=waqarkhalid2024@gmail.com` +
      `&su=${subject}` +
      `&body=${body}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section
        id="collaborate"
        ref={ref}
        className="relative min-h-screen py-20 px-6 overflow-hidden flex items-center"
      >
        {/* Subtle ambient — same neutral tone as Experience/Domains */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255,255,255,0.025) 0%, transparent 68%)",
          }}
        />

        <div className="max-w-3xl mx-auto w-full relative z-10 py-8">
          {/* ── Header — same pattern as every section ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-10 px-6"
          >
            <SectionHeading
              eyebrow="Got a project in mind?"
              primary="Let's"
              secondary="Collaborate"
              className="text-center"
              primaryClassName="text-white font-bold text-[clamp(1.9rem,8vw,4rem)]"
              secondaryClassName="text-white/65 font-normal ml-2 sm:ml-4 text-[clamp(1.9rem,8vw,4rem)]"
            />
          </motion.div>

          {/* ── Form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="relative overflow-hidden rounded-2xl border border-white/8 flex flex-col gap-4 mx-4 p-6 sm:p-8 md:p-10 md:m-6"
            style={{
              background: "rgba(255,255,255,0.038)",
              backdropFilter: "blur(24px) saturate(150%)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.40), 0 1px 0 rgba(255,255,255,0.12) inset",
            }}
          >
            {/* Top edge highlight */}
            <div
              className="absolute inset-x-0 top-0 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)",
              }}
            />
            {/* Corner reflection */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.045) 0%, transparent 48%)",
              }}
            />
            {/* Card heading */}
            <div>
              <h3 className="font-mono text-base font-semibold text-white/80 tracking-tight ">
                Tell me about your project
              </h3>
            </div>

            <div className="w-full h-px bg-white/6" />

            {/* Name */}
            <FieldBlock label="Your Name ">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="bg-transparent border border-white/10 rounded-xl px-4 py-3
                           text-white/80 text-[13px] font-mono w-full sm:w-1/2
                           placeholder:text-white/40 placeholder:font-sans placeholder:font-light placeholder:tracking-wide
                           focus:outline-none focus:border-white/50
                           transition-colors"
              />
            </FieldBlock>

            {/* Project type */}
            <FieldBlock label="Project Type ">
              <div className="flex flex-wrap gap-2 ">
                {COLLAB_PROJECT_TYPES.map((t) => {
                  const on = selected.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleType(t)}
                      className={`px-3.5 py-1.5 rounded-full font-mono text-[9px]
                                 tracking-[0.22em] uppercase border
                                 transition-all duration-200 cursor-pointer
                                 hover:border-white/55 hover:shadow-[0_0_10px_rgba(255,255,255,0.09)]
                                 ${on ? "border-white/35" : "border-white/10"}`}
                      style={{
                        background: on
                          ? "rgba(255,255,255,0.08)"
                          : "transparent",
                        color: on
                          ? "rgba(255,255,255,0.88)"
                          : "rgba(255,255,255,0.34)",
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </FieldBlock>

            {/* Budget */}
            <FieldBlock label="Budget Range">
              <div className="flex flex-wrap gap-2">
                {COLLAB_BUDGETS.map((b) => {
                  const on = budget === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(on ? "" : b)}
                      className={`px-3.5 py-1.5 rounded-full font-mono text-[9px]
                                 tracking-[0.22em] uppercase border
                                 transition-all duration-200 cursor-pointer
                                 hover:border-white/50 hover:shadow-[0_0_10px_rgba(255,255,255,0.08)]
                                 ${on ? "border-white/30" : "border-white/8"}`}
                      style={{
                        background: on
                          ? "rgba(255,255,255,0.06)"
                          : "transparent",
                        color: on
                          ? "rgba(255,255,255,0.80)"
                          : "rgba(255,255,255,0.30)",
                      }}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </FieldBlock>

            {/* Brief */}
            <FieldBlock label="Project Brief ">
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="What are you building, your timeline, and any specific requirements?"
                rows={4}
                className="bg-transparent border border-white/10 rounded-xl px-4 py-3
                           text-white/80 text-[13px] font-mono w-full
                           placeholder:text-white/20
                           focus:outline-none focus:border-white/50
                           transition-colors resize-none"
              />
            </FieldBlock>
          </motion.div>

          {/* ── Send button — below the card ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-10 flex flex-row items-center justify-between gap-4 md:m-6 mx-4"
          >
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-center md:text-start text-gray-500">
              * required fields — opens Gmail
            </p>
            <motion.button
              type="button"
              onClick={handleSend}
              disabled={!isValid}
              whileTap={{ scale: isValid ? 0.97 : 1 }}
              className="group inline-flex items-center gap-2.5 px-3 md:px-8 py-3 rounded-full
                         border font-mono text-[10px] tracking-[0.35em] uppercase
                         transition-all duration-300 shrink-0"
              style={{
                cursor: isValid ? "pointer" : "default",
                borderColor: isValid
                  ? "rgba(255,255,255,0.55)"
                  : "rgba(107,114,128,0.55)",
                background: isValid
                  ? "rgba(255,255,255,0.10)"
                  : "rgba(107,114,128,0.06)",
                color: isValid ? "rgba(255,255,255,0.95)" : "rgb(107,114,128)",
                boxShadow: isValid
                  ? "0 0 18px rgba(255,255,255,0.07), 0 1px 0 rgba(255,255,255,0.18) inset"
                  : "0 1px 0 rgba(255,255,255,0.04) inset",
              }}
            >
              Send Brief
              <SendHorizontal
                className="w-3.5 h-3.5 transition-transform duration-300
                           group-hover:translate-x-0.5"
                strokeWidth={1}
              />
            </motion.button>
          </motion.div>
        </div>
      </section>
      <div className="w-full h-px bg-white/8" />
    </>
  );
}

function FieldBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-gray-400">
        {label}
      </label>
      {children}
    </div>
  );
}
