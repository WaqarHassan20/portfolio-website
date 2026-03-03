"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Heart, ArrowUp, Github, Linkedin, Twitter } from "lucide-react";

const SCROLL_LINKS = [
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Services", href: "#services" },
];
const ROUTE_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/WaqarHassan20", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/waqar-khalid-9a1342338", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/Waqarkhalid", label: "X" },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollTo = (href: string) => {
    if (!isHome) { window.location.assign(`/${href}`); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-8">
          {/* Branding */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg glass border border-white/12 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white/55" />
            </div>
            <span className="text-slate-300 font-bold text-sm font-mono">Waqar Hassan</span>
          </div>

          {/* Quick nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {SCROLL_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-slate-500 text-sm hover:text-slate-300 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            {ROUTE_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
              >
                {link.label}
              </Link>
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
                className="w-8 h-8 rounded-lg glass border border-white/6 flex items-center justify-center text-slate-500 hover:text-slate-300 hover:border-white/12 transition-all"
              >
                <s.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
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
            className="w-9 h-9 rounded-xl glass border border-white/6 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/14 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
