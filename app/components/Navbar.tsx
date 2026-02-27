"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 50);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      // Active section detection
      const sections = ["home", "about", "skills", "projects", "experience", "services", "testimonials", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Progress bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-2 left-0 right-0 z-50 mx-4 transition-all duration-500 ${
          scrolled ? "top-2" : "top-4"
        }`}
      >
        <div
          className={`max-w-5xl mx-auto rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "glass-strong shadow-2xl shadow-black/50"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 glass-crystal rounded-lg" />
              <div className="relative w-full h-full glass border border-white/[0.12] rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white/60" />
              </div>
            </div>
            <span className="font-bold text-sm tracking-widest text-gradient-static font-mono">
              WH
            </span>
          </motion.button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 hover-underline ${
                  activeSection === link.href.slice(1)
                    ? "text-white"
                    : "text-white/35 hover:text-white/75"
                }`}
              >
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/[0.06] rounded-xl border border-white/[0.10]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.button>
            ))}
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/[0.12] text-white/70 text-sm font-semibold hover:text-white hover:border-white/20 transition-all"
            >
              <span>Hire Me</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </motion.a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl glass text-slate-300 hover:text-white transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mt-2 mx-0 glass-strong rounded-2xl p-4 flex flex-col gap-2 max-w-5xl mx-auto"
            >
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl text-left transition-all duration-200 ${
                    activeSection === link.href.slice(1)
                      ? "bg-white/[0.06] text-white border border-white/10"
                      : "text-white/35 hover:bg-white/[0.04] hover:text-white/75"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="mailto:waqarkhalid2024@gmail.com"
                className="mt-2 px-4 py-3 rounded-xl glass border border-white/[0.12] text-white/70 text-sm font-semibold text-center hover:text-white transition-all"
              >
                Hire Me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
