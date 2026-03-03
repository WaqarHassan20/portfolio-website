"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Copy, Check, Clock } from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

const SOCIALS = [
  { icon: Github,    label: "GitHub",   href: "https://github.com/WaqarHassan20" },
  { icon: Linkedin,  label: "LinkedIn", href: "https://linkedin.com/in/waqar-khalid-9a1342338" },
  { icon: FaXTwitter, label: "X",       href: "https://x.com/Waqarkhalid" },
];

const EMAIL = "waqarkhalid2024@gmail.com";

export default function ContactInfo() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silently fail */
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Availability badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass border border-white/[0.09] w-fit">
        <span className="w-2 h-2 rounded-full bg-white/50 animate-pulse" />
        <span className="text-white/55 text-sm font-medium">Open to new projects</span>
      </div>

      {/* Info cards */}
      <div className="space-y-3">
        {/* Email — click to copy */}
        <motion.button
          onClick={copyEmail}
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 rounded-2xl glass
                     border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-200 group text-left"
          aria-label={`Copy email address ${EMAIL}`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl glass border border-white/[0.08] flex items-center justify-center shrink-0
                          group-hover:border-white/20 transition-all"
            >
              <Mail className="w-4 h-4 text-white/38 group-hover:text-white/65 transition-colors" />
            </div>
            <div className="min-w-0">
              <div className="text-white/25 text-[10px] font-mono tracking-wide uppercase mb-0.5">Email</div>
              <div className="text-white/65 text-sm font-medium truncate">{EMAIL}</div>
            </div>
          </div>
          <div
            className="shrink-0 w-7 h-7 rounded-lg glass border border-white/[0.07] flex items-center justify-center
                        text-white/28 group-hover:text-white/55 transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </div>
        </motion.button>

        {/* Location */}
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl glass border border-white/[0.06]">
          <div className="w-9 h-9 rounded-xl glass border border-white/[0.08] flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-white/38" />
          </div>
          <div>
            <div className="text-white/25 text-[10px] font-mono tracking-wide uppercase mb-0.5">Location</div>
            <div className="text-white/65 text-sm font-medium">Pakistan · Remote Worldwide</div>
          </div>
        </div>

        {/* Response time */}
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl glass border border-white/[0.06]">
          <div className="w-9 h-9 rounded-xl glass border border-white/[0.08] flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-white/38" />
          </div>
          <div>
            <div className="text-white/25 text-[10px] font-mono tracking-wide uppercase mb-0.5">Response Time</div>
            <div className="text-white/65 text-sm font-medium">Within 24 hours</div>
          </div>
        </div>
      </div>

      {/* Social links */}
      <div className="pt-1">
        <div className="text-white/22 text-[10px] font-mono tracking-widest uppercase mb-3">
          Find me on
        </div>
        <div className="flex items-center gap-2">
          {SOCIALS.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-xl glass border border-white/[0.07] flex items-center justify-center
                         text-white/32 hover:text-white/78 hover:border-white/[0.15] transition-all"
              aria-label={s.label}
            >
              <s.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
