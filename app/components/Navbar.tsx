"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap } from "lucide-react";
import {
  HOME_SCROLL_SPY_IDS,
  NAVBAR_ROUTE_LINKS,
  NAVBAR_SCROLL_LINKS,
} from "@/app/data/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 50);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      if (!isHome) return;

      // Reverse scan picks the latest section crossed by the viewport.
      for (const id of [...HOME_SCROLL_SPY_IDS].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  /* body scroll lock when drawer is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (!isHome) return; // handled by Link
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Read-progress bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-3 sm:mx-6 mt-3">
          <div
            className={`max-w-6xl mx-auto rounded-2xl px-5 sm:px-6 py-3 flex items-center justify-between
                        transition-all duration-500 ${
                          scrolled
                            ? "glass-strong shadow-2xl shadow-black/50"
                            : "bg-transparent"
                        }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group shrink-0"
              aria-label="Home"
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 glass-crystal rounded-lg" />
                <div className="relative w-full h-full glass border border-white/12 rounded-lg flex items-center justify-center group-hover:border-white/25 transition-all">
                  <Zap className="w-4 h-4 text-white/60 group-hover:text-white/85 transition-colors" />
                </div>
              </div>
              <span className="font-bold text-sm tracking-widest text-gradient-static font-mono hidden sm:block">
                WH
              </span>
            </Link>

            {/* Desktop Links */}
            <nav
              className="hidden md:flex items-center gap-0.5"
              aria-label="Main navigation"
            >
              {/* Scroll-anchor links — only shown on home page */}
              {isHome &&
                NAVBAR_SCROLL_LINKS.map((link, i) => (
                  <motion.button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i + 0.25 }}
                    className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer ${
                      activeSection === link.href.slice(1)
                        ? "text-white"
                        : "text-white/35 hover:text-white/75 hover:bg-white/4"
                    }`}
                  >
                    {activeSection === link.href.slice(1) && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 bg-white/6 rounded-xl border border-white/10"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </motion.button>
                ))}

              {/* Route links */}
              {NAVBAR_ROUTE_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    pathname.startsWith(link.href)
                      ? "text-white bg-white/6 border border-white/10"
                      : "text-white/35 hover:text-white/75 hover:bg-white/4"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Hire Me CTA + hamburger */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/contact"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/12
                           text-white/70 text-sm font-semibold hover:text-white hover:border-white/20 transition-all shimmer-btn"
              >
                <span>Hire Me</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="md:hidden p-2 rounded-xl glass border border-white/8 text-slate-300 hover:text-white transition-colors"
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                key="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
              />
              <motion.div
                key="mobile-drawer"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
                className="fixed top-0 right-0 bottom-0 w-72 glass-strong border-l border-white/7
                           flex flex-col p-6 z-50"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-bold text-sm text-white/45 font-mono">
                    Navigation
                  </span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-8 h-8 rounded-lg glass border border-white/8 flex items-center justify-center text-white/45 hover:text-white/80"
                    aria-label="Close menu"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  {isHome &&
                    NAVBAR_SCROLL_LINKS.map((link, i) => (
                      <motion.button
                        key={link.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => scrollTo(link.href)}
                        className={`text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                          activeSection === link.href.slice(1)
                            ? "text-white/90 bg-white/6 border border-white/8"
                            : "text-white/50 hover:text-white/85 hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </motion.button>
                    ))}

                  {NAVBAR_ROUTE_LINKS.map((link, i) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay:
                          ((isHome ? NAVBAR_SCROLL_LINKS.length : 0) + i) *
                          0.05,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`block px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                          pathname.startsWith(link.href)
                            ? "text-white/90 bg-white/6 border border-white/8"
                            : "text-white/50 hover:text-white/85 hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/6">
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-center py-3.5 rounded-xl bg-white text-black font-bold text-xs tracking-widest uppercase shimmer-btn"
                  >
                    Hire Me
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
