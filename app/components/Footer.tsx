"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  SiNextdotjs, SiTypescript, SiReact, SiNodedotjs, SiPostgresql,
  SiDocker, SiKubernetes, SiAmazon, SiTailwindcss, SiPrisma,
  SiPython, SiGo, SiRedis, SiGraphql, SiBun,
} from "react-icons/si";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SOCIALS = [
  { label: "GitHub",    href: "https://github.com/WaqarHassan20" },
  { label: "LinkedIn",  href: "https://linkedin.com/in/waqar-khalid-9a1342338" },
  { label: "Twitter",   href: "https://x.com/Waqarkhalid" },
  { label: "Facebook",  href: "https://facebook.com/waqar.hassan.5" },
  { label: "Instagram", href: "https://instagram.com/waqar_hassan20" },
];

const MARQUEE_ITEMS: { label: string; Icon: React.ElementType }[] = [
  { label: "Next.js",     Icon: SiNextdotjs },
  { label: "TypeScript",  Icon: SiTypescript },
  { label: "React",       Icon: SiReact },
  { label: "Node.js",     Icon: SiNodedotjs },
  { label: "PostgreSQL",  Icon: SiPostgresql },
  { label: "Docker",      Icon: SiDocker },
  { label: "Kubernetes",  Icon: SiKubernetes },
  { label: "AWS",         Icon: SiAmazon },
  { label: "Tailwind CSS",Icon: SiTailwindcss },
  { label: "Prisma",      Icon: SiPrisma },
  { label: "Python",      Icon: SiPython },
  { label: "Go",          Icon: SiGo },
  { label: "Redis",       Icon: SiRedis },
  { label: "GraphQL",     Icon: SiGraphql },
  { label: "Bun",         Icon: SiBun },
];

const NAME = "Waqar UL Hassan";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden border-t border-white/[0.07] min-h-screen flex flex-col justify-center"
    >

      <div className="relative z-10 max-w-6xl mx-auto w-full px-8 sm:px-14 py-24 sm:py-32 flex flex-col items-center text-center">

        {/* ── Headline — letter stagger ──────────────────────── */}
        <div className="mb-16 sm:mb-24 w-full overflow-hidden">
          <h2
            className="font-jetbrains font-bold uppercase leading-[0.88] tracking-normal select-none text-white whitespace-nowrap"
            style={{ fontSize: "clamp(2.8rem, 9vw, 7rem)" }}
            aria-label={NAME}
          >
            {NAME.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.035, ease: EASE }}
                className="inline-block"
              >
                {char === " " ? "\u00a0" : char}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* ── Marquee ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="w-full overflow-hidden mb-16 sm:mb-20"
        >
          <div className="relative">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
              style={{ background: "linear-gradient(to right, #060606, transparent)" }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
              style={{ background: "linear-gradient(to left, #060606, transparent)" }}
            />
            <motion.div
              className="flex gap-8 whitespace-nowrap w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
            >
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2.5 font-jetbrains text-[11px] tracking-[0.3em] uppercase text-white/40 select-none"
                >
                  <item.Icon size={14} className="shrink-0 opacity-60" />
                  {item.label}
                  <span className="mx-3 text-white/10">·</span>
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>

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
              <p className="font-jetbrains text-[11px] tracking-[0.35em] text-start uppercase text-gray-500 mb-3">
                Contact
              </p>
              <a href="mailto:waqarkhalid2024@gmail.com" className="group w-fit mb-4">
                <span className="font-jetbrains text-[14px] tracking-wider text-white/90 group-hover:text-white transition-colors duration-300">
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
              <p className="font-jetbrains text-[11px] tracking-[0.35em] text-start uppercase text-gray-500 mb-3">
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
            className="flex flex-col"
          >
            <p className="font-jetbrains text-[11px] text-start tracking-[0.35em] uppercase text-gray-500 mb-7">
              Social
            </p>
            <ul className="w-full max-w-[200px]">
              {SOCIALS.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.07, ease: EASE }}
                  className="border-b border-white/[0.07]"
                >
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3"
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
            <p className="font-jetbrains text-start text-[11px] tracking-[0.35em] uppercase text-gray-500 mb-7">
              About
            </p>
            <p className="font-jetbrains text-[14px] text-start mt-5 tracking-[0.01em] text-gray-500">
              Available for freelance &amp; full-time roles.
            </p>
            <p className="font-jetbrains text-[14px] text-start mt-5 tracking-[0.01em] text-gray-500">
              Designed &amp; Developed by
            </p>
            <span className="font-jetbrains text-white text-[14px] text-start tracking-[0.08em]">
              Waqar UL Hassan
            </span>
            <span className="font-jetbrains text-[14px] text-start mt-5 tracking-[0.01em] text-gray-500">
              © {new Date().getFullYear()} - All rights reserved
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
