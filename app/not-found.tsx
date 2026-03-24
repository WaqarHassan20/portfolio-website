"use client";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function NotFound() {
  useEffect(() => {
    document.body.classList.add("hide-nav-sidebars");
    return () => {
      document.body.classList.remove("hide-nav-sidebars");
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#050505] overflow-hidden">
      <style>{`
        body.hide-nav-sidebars [data-side-ui="social-sidebar"],
        body.hide-nav-sidebars [data-side-ui="nav-dock"] {
          display: none !important;
        }
      `}</style>

      {/* Background grid effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Animated grid scan */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
          backgroundSize: "100% 4px",
        }}
        animate={{ backgroundPosition: ["0% 0%", "0% 100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 70%)",
            "radial-gradient(ellipse 75% 55% at 20% 30%, rgba(100,150,255,0.04) 0%, transparent 70%)",
            "radial-gradient(ellipse 60% 45% at 80% 70%, rgba(150,100,255,0.04) 0%, transparent 70%)",
          ].join(", "),
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-2xl w-full text-center"
        >
          {/* Glitch 404 Text */}
          <div className="relative mb-12 inline-block w-full">
            <motion.h1
              className="font-mono font-black text-[clamp(4rem,18vw,11rem)] leading-none text-white/90 tracking-tighter relative"
              animate={{
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.5)",
                  "3px 3px 0px rgba(100,200,255,0.8), -3px -3px 0px rgba(255,100,200,0.8)",
                  "0 0 10px rgba(255,255,255,0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              404
            </motion.h1>

            {/* Glitch layers */}
            <motion.h1
              className="absolute inset-0 font-mono font-black text-[clamp(4rem,18vw,11rem)] leading-none text-red-500/40 tracking-tighter pointer-events-none"
              animate={{ x: [0, 2, -2, 2, 0] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
            >
              404
            </motion.h1>
            <motion.h1
              className="absolute inset-0 font-mono font-black text-[clamp(4rem,18vw,11rem)] leading-none text-cyan-500/30 tracking-tighter pointer-events-none"
              animate={{ x: [0, -3, 3, -1, 0] }}
              transition={{ duration: 0.25, repeat: Infinity, repeatDelay: 2.2 }}
            >
              404
            </motion.h1>
          </div>

          {/* Error title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="mb-8"
          >
            <h2 className="font-mono font-bold text-xl sm:text-2xl text-white mb-2 tracking-tight">
              Lost in the void
            </h2>
            <p className="font-light leading-relaxed text-white/60 text-sm sm:text-base max-w-sm mx-auto">
              This page exists only in the dreams of committed but never pushed branches.
            </p>
          </motion.div>

          {/* Animated particles around button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="mt-10 relative inline-block"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white/85 font-jetbrains text-xs uppercase tracking-[0.18em] transition-all duration-300 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 relative z-10"
            >
              <Home size={14} />
              Return Home
            </Link>
          </motion.div>

          {/* Decorative animated orbs */}
          {[0, 1, 2].map((i: number) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none opacity-10"
              style={{
                width: 200 + i * 100,
                height: 200 + i * 100,
                background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                x: [0, 40 * Math.cos((i / 3) * Math.PI * 2), 0],
                y: [0, 40 * Math.sin((i / 3) * Math.PI * 2), 0],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      </div>
    </main>
  );
}
