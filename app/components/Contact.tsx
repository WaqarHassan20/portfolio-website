"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const BUDGET_PRESETS = [
  "$1k – $5k",
  "$5k – $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k+",
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [budget, setBudget] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [timeline, setTimeline] = useState("");

  const effectiveBudget = isCustom ? customBudget : budget;
  const isReady =
    name.trim() !== "" &&
    projectDesc.trim() !== "" &&
    effectiveBudget.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isReady) return;
    const subject = encodeURIComponent(`Project Inquiry — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n\nProject / Service:\n${projectDesc}\n\nBudget: ${effectiveBudget}\n\nTimeline: ${timeline || "Not specified"}`,
    );
    window.location.href = `mailto:waqarkhalid2024@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(201,214,223,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/40 text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open for work
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
            Start a Project
          </h2>
          <p className="text-white/35 max-w-md mx-auto">
            Fill in the details below and I&apos;ll get back to you with a plan.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass border border-white/8 rounded-2xl p-8 sm:p-10 space-y-8"
        >
          {/* Name */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono tracking-[0.2em] text-white/35 uppercase">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Waqar Hassan"
              className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm outline-none focus:border-white/25 transition-colors duration-200"
            />
          </div>

          {/* Project / Service */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono tracking-[0.2em] text-white/35 uppercase">
              Project / Service
            </label>
            <textarea
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              placeholder="Describe what you need — a web app, AI integration, design system, or anything else…"
              rows={4}
              className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm outline-none focus:border-white/25 transition-colors duration-200 resize-none leading-relaxed"
            />
          </div>

          {/* Budget */}
          <div className="space-y-3">
            <label className="text-[11px] font-mono tracking-[0.2em] text-white/35 uppercase">
              Budget Range
            </label>
            <div className="flex flex-wrap gap-2">
              {BUDGET_PRESETS.map((b) => {
                const active = !isCustom && budget === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      setBudget(b);
                      setIsCustom(false);
                    }}
                    className="px-4 py-2 rounded-full text-sm font-mono border transition-all duration-200"
                    style={{
                      borderColor: active
                        ? "rgba(201,214,223,0.50)"
                        : "rgba(255,255,255,0.10)",
                      background: active
                        ? "rgba(201,214,223,0.10)"
                        : "rgba(255,255,255,0.03)",
                      color: active ? "#C9D6DF" : "rgba(255,255,255,0.40)",
                      boxShadow: active
                        ? "0 0 14px rgba(201,214,223,0.15)"
                        : "none",
                    }}
                  >
                    {b}
                  </button>
                );
              })}
              {/* Custom toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsCustom(true);
                  setBudget("");
                }}
                className="px-4 py-2 rounded-full text-sm font-mono border transition-all duration-200"
                style={{
                  borderColor: isCustom
                    ? "rgba(201,214,223,0.50)"
                    : "rgba(255,255,255,0.10)",
                  background: isCustom
                    ? "rgba(201,214,223,0.10)"
                    : "rgba(255,255,255,0.03)",
                  color: isCustom ? "#C9D6DF" : "rgba(255,255,255,0.40)",
                  boxShadow: isCustom
                    ? "0 0 14px rgba(201,214,223,0.15)"
                    : "none",
                }}
              >
                Custom
              </button>
            </div>

            {/* Custom budget input */}
            {isCustom && (
              <motion.input
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                type="text"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                placeholder="e.g. $3,500 or negotiable"
                className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm outline-none focus:border-white/25 transition-colors duration-200"
              />
            )}
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <label className="text-[11px] font-mono tracking-[0.2em] text-white/35 uppercase">
              Timeline{" "}
              <span className="text-white/20 normal-case tracking-normal font-sans">
                (optional)
              </span>
            </label>
            <input
              type="text"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="e.g. 2–3 months, ASAP, flexible…"
              className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm outline-none focus:border-white/25 transition-colors duration-200"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={!isReady}
              whileHover={isReady ? { scale: 1.02 } : {}}
              whileTap={isReady ? { scale: 0.98 } : {}}
              className="w-full py-4 rounded-xl font-mono text-sm tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                background: isReady
                  ? "linear-gradient(135deg, rgba(201,214,223,0.18) 0%, rgba(82,97,107,0.28) 100%)"
                  : "rgba(255,255,255,0.04)",
                border: isReady
                  ? "1px solid rgba(201,214,223,0.35)"
                  : "1px solid rgba(255,255,255,0.08)",
                color: isReady ? "#F0F5F9" : "rgba(255,255,255,0.20)",
                cursor: isReady ? "pointer" : "not-allowed",
                boxShadow: isReady ? "0 0 24px rgba(201,214,223,0.12)" : "none",
              }}
            >
              {isReady
                ? "Send Inquiry via Email →"
                : "Fill in name, project & budget to continue"}
            </motion.button>
            {isReady && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-[11px] font-mono text-white/22 mt-3"
              >
                Opens your email client · waqarkhalid2024@gmail.com
              </motion.p>
            )}
          </div>
        </motion.form>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-white/20 text-xs font-mono mt-8"
        >
          Typically respond within 24 hours · Available for full-time & contract
        </motion.p>
      </div>
    </section>
  );
}
