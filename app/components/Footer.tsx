"use client";
import { motion } from "framer-motion";
import { Zap, Heart, ArrowUp, Github, Linkedin, Twitter } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/WaqarHassan20", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/waqar-khalid-9a1342338", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/Waqarkhalid", label: "X" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-8">
          {/* Branding */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg glass border border-white/[0.12] flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white/55" />
            </div>
            <span className="text-slate-300 font-bold text-sm font-mono">Waqar Hassan</span>
          </div>

          {/* Quick nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-lg glass border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-slate-300 hover:border-white/[0.12] transition-all"
              >
                <s.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.05]">
          <p className="text-slate-600 text-xs font-mono">
            &copy; {new Date().getFullYear()} Waqar Hassan. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-slate-600 text-xs">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-slate-500 fill-current" />
            <span>using Next.js &amp; Tailwind CSS</span>
          </div>
          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl glass border border-white/[0.06] flex items-center justify-center text-slate-500 hover:text-white hover:border-white/[0.14] transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
