"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_DOCK_SECTIONS } from "@/app/data/navigation";
import type { DockSectionId } from "@/app/types/navigation";

export default function NavDock() {
  const [active, setActive] = useState<DockSectionId>("home");
  const [hovered, setHovered] = useState<DockSectionId | null>(null);

  /* ── Scroll spy ──────────────────────────────────────── */
  useEffect(() => {
    const getActive = () => {
      const pivot = window.scrollY + window.innerHeight * 0.38;
      let current: DockSectionId = NAV_DOCK_SECTIONS[0].id;
      for (const { id } of NAV_DOCK_SECTIONS) {
        const el =
          id === "footer"
            ? document.querySelector("footer")
            : document.getElementById(id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= pivot) {
          current = id;
        }
      }
      setActive(current);
    };
    getActive();
    window.addEventListener("scroll", getActive, { passive: true });
    return () => window.removeEventListener("scroll", getActive);
  }, []);

  const scrollTo = (id: DockSectionId) => {
    const el =
      id === "footer"
        ? document.querySelector("footer")
        : document.getElementById(id);
    if (!el) return;

    // Keep a small global top offset, but let Domains sit slightly higher.
    const offset = id === "domains" ? -8 : 12;
    const top = window.scrollY + el.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  return (
    <motion.div
      data-side-ui="nav-dock"
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-16 top-3/5 -translate-y-1/2 z-40 hidden [@media(min-width:1440px)]:flex"
    >
      {/* Outer pill shell */}
      <div
        className="relative flex flex-col items-stretch py-3 px-0 rounded-2xl"
        style={{
          width: 52,
        }}
      >
        {/* Active glowing track — slides between items */}
        <AnimatePresence>
          {NAV_DOCK_SECTIONS.map((s, i) =>
            s.id === active ? (
              <motion.div
                key="track"
                layoutId="nav-track"
                className="absolute left-0 w-0.5 rounded-full pointer-events-none"
                style={{
                  top: 12 + i * 46 + 13,
                  height: 20,
                  background:
                    "linear-gradient(180deg, rgba(120,200,255,0.9), rgba(80,160,255,0.5))",
                  boxShadow:
                    "0 0 8px 2px rgba(120,200,255,0.5), 0 0 18px 4px rgba(80,160,255,0.25)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />
            ) : null,
          )}
        </AnimatePresence>

        {/* Nav items */}
        {NAV_DOCK_SECTIONS.map((section, i) => {
          const { id, label, Icon } = section;
          const isActive = active === id;
          const isHovered = hovered === id;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.35,
                delay: 1.2 + i * 0.07,
                ease: "easeOut",
              }}
              className="relative"
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    key="tip"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.14 }}
                    className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2
                               pointer-events-none select-none whitespace-nowrap"
                  >
                    <span
                      className="block font-mono text-[10px] tracking-[0.24em] uppercase"
                      style={{
                        color: "rgba(255,255,255,0.95)",
                        textShadow: "0 0 12px rgba(180,220,255,0.35)",
                      }}
                    >
                      {label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Button */}
              <motion.button
                onClick={() => scrollTo(id)}
                aria-label={`Navigate to ${label}`}
                animate={{
                  scale: isHovered ? 1.18 : 1,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
                className="relative flex items-center justify-center w-full outline-none cursor-pointer"
                style={{ height: 46 }}
              >
                {/* Hover shimmer */}
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-x-1 inset-y-1.5 rounded-xl pointer-events-none"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  />
                )}

                <Icon
                  size={20}
                  strokeWidth={isActive ? 1.8 : 1.5}
                  className="relative z-10 transition-all duration-300"
                  style={{
                    color: isActive
                      ? "rgba(255,255,255,0.95)"
                      : isHovered
                        ? "rgba(255,255,255,0.72)"
                        : "rgba(255,255,255,0.32)",
                    filter: isActive
                      ? "drop-shadow(0 0 6px rgba(160,220,255,0.7))"
                      : "none",
                    transition: "color 0.25s, filter 0.25s",
                  }}
                />
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
