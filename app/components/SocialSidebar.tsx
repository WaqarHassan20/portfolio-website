"use client";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/WaqarHassan20",
    icon: <Github size={17} strokeWidth={1.6} />,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/",
    icon: <Twitter size={17} strokeWidth={1.6} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/",
    icon: <Linkedin size={17} strokeWidth={1.6} />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: <Instagram size={17} strokeWidth={1.6} />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/",
    icon: (
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* outer rounded speech-bubble */}
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.526 3.654 1.438 5.162L2 22l4.956-1.418A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        {/* phone handset inside */}
        <path d="M8.5 9.5c.5 1.5 1.5 2.8 2.8 3.8l1.3-1c.3-.2.6-.2.9 0l1.8 1.2c.3.2.4.6.2.9l-.8 1.2c-.2.3-.6.4-.9.3C10.1 14.8 8.2 12.9 7.1 10.2c-.1-.3 0-.7.3-.9l1.2-.8c.3-.2.7-.1.9.2l.5.8z" />
      </svg>
    ),
  },
];

export default function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
      className="fixed left-7 top-[58%] -translate-y-1/2 z-40 flex flex-col items-center gap-1"
    >
      {SOCIALS.map(({ label, href, icon }, i) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 1.3 + i * 0.1, ease: "easeOut" }}
          whileHover="glow"
          className="group relative flex items-center justify-center w-9 h-9 rounded-xl
                     bg-white/[0.04] border border-white/[0.07]
                     text-white/35 transition-colors duration-300
                     hover:text-white/90 hover:bg-white/[0.08] hover:border-white/[0.18]"
          style={{ backdropFilter: "blur(8px)" }}
        >
          {/* glow ring */}
          <motion.span
            variants={{
              glow: { opacity: 1, scale: 1 },
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              boxShadow: "0 0 14px 3px rgba(255,255,255,0.18), 0 0 30px 6px rgba(255,255,255,0.07)",
            }}
          />
          {icon}
        </motion.a>
      ))}

      {/* decorative vertical line */}
      <motion.span
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5, delay: 1.8, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="mt-3 w-px h-14 bg-gradient-to-b from-white/20 to-transparent"
      />
    </motion.div>
  );
}
