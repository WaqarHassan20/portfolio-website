"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  FOOTER_NAME,
  FOOTER_NAME_LINE_1,
  FOOTER_NAME_LINE_2,
} from "@/app/data/footer";
import { FOOTER_SOCIALS } from "@/app/data/social";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      ref={ref}
      className="relative flex flex-col justify-center lg:min-h-screen overflow-hidden "
    >
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start px-8 py-8 lg:mt-24 text-left sm:items-center sm:px-14 sm:text-center md:py-20 md:-translate-y-3">
        {/* ── Headline — letter stagger ──────────────────────── */}
        <div className="mb-8 sm:mb-16 w-full overflow-hidden">
          <h2
            className="font-jetbrains font-bold uppercase leading-[0.88] tracking-normal select-none text-white text-left sm:text-center"
            style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
            aria-label={FOOTER_NAME}
          >
            {/* Line 1: "Waqar UL" — block on mobile, inline on desktop */}
            <span className="block sm:inline-block ml-2">
              {FOOTER_NAME_LINE_1.split("").map((char, i) => (
                <motion.span
                  key={`l1-${i}`}
                  initial={{ opacity: 0, y: 60 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.04,
                    ease: EASE,
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00a0" : char}
                </motion.span>
              ))}
            </span>

            {/* Spacer visible only on desktop between the two words */}
            <span className="hidden sm:inline-block">&nbsp;</span>

            {/* Line 2: "Hassan" — block on mobile, inline on desktop */}
            <span className="block sm:inline-block ml-2">
              {FOOTER_NAME_LINE_2.split("").map((char, i) => (
                <motion.span
                  key={`l2-${i}`}
                  initial={{ opacity: 0, y: 60 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + (FOOTER_NAME_LINE_1.length + 1 + i) * 0.04,
                    ease: EASE,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </h2>
        </div>

        {/* ── Divider ────────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          className="origin-left h-px bg-white/[0.07] mb-7 sm:mb-14 w-full"
        />

        {/* ── 3-col grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-10 px-4 w-full">
          {/* Col 1 — Contact */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
              className="flex flex-col"
            >
              <p className="font-jetbrains text-[11px] tracking-[0.35em] text-start uppercase text-gray-500 mb-1 md:mb-3">
                Contact
              </p>
              <a
                href="mailto:waqarkhalid2024@gmail.com"
                className="group w-fit mb-4"
              >
                <span className="font-jetbrains md:text-[14px] text-[14px] tracking-wider text-white/90 group-hover:text-white transition-colors duration-300">
                  waqarkhalid2024@gmail.com
                </span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
              className="flex flex-col"
            >
              <p className="font-jetbrains text-[11px] tracking-[0.35em] text-start uppercase text-gray-500 mb-1 md:mb-3">
                Location
              </p>
              <span className="font-jetbrains text-[14px] tracking-wider text-white text-start">
                Pakistan — Hafizabad
              </span>
            </motion.div>
          </div>

          {/* Col 2 — Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
            className="flex flex-col w-full"
          >
            <p className="font-jetbrains text-[11px] text-start tracking-[0.35em] uppercase text-gray-500 md:mb-7">
              Social
            </p>
            <ul className="w-full max-w-60">
              {FOOTER_SOCIALS.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.7 + i * 0.07,
                    ease: EASE,
                  }}
                  className="border-b border-white/[0.07]"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between md:py-3 py-2"
                  >
                    <span className="font-jetbrains text-[16px] text-white/80 group-hover:text-white transition-colors duration-300">
                      {s.label}
                    </span>
                    <ArrowUpRight
                      size={13}
                      strokeWidth={1.5}
                      className="text-white/25 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 ease-out"
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
            className="flex flex-col"
          >
            <p className="font-jetbrains text-start text-[11px] tracking-[0.35em] uppercase text-gray-500 md:mb-7">
              About
            </p>
            <p className="font-jetbrains text-[14px] text-start md:mt-5 mt-2 tracking-[0.01em] text-gray-500">
              Designed &amp; Developed by
            </p>
            <span className="font-jetbrains text-white text-[14px] text-start tracking-[0.08em]">
              Waqar UL Hassan
            </span>
            <span className="font-jetbrains text-[14px] text-start md:mt-4 mt-2 tracking-[0.01em] text-gray-500">
              © {new Date().getFullYear()}.All rights reserved
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
