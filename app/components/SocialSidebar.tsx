"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, FileText , X } from "lucide-react";
import SocialFlipButton from "@/app/components/ui/social-flip-button";
import { cn } from "@/lib/utils";
import { SIDEBAR_CONTACT_ITEMS } from "@/lib/data/social";

function WhatsappIcon() {
  return (
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
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.526 3.654 1.438 5.162L2 22l4.956-1.418A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      <path d="M8.5 9.5c.5 1.5 1.5 2.8 2.8 3.8l1.3-1c.3-.2.6-.2.9 0l1.8 1.2c.3.2.4.6.2.9l-.8 1.2c-.2.3-.6.4-.9.3C10.1 14.8 8.2 12.9 7.1 10.2c-.1-.3 0-.7.3-.9l1.2-.8c.3-.2.7-.1.9.2l.5.8z" />
    </svg>
  );
}

export default function SocialSidebar() {
  const [direction, setDirection] = useState<"horizontal" | "vertical">("vertical");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const mediaDirection = window.matchMedia("(max-width: 768px)");
    const mediaVisible = window.matchMedia("(max-width: 425px)");

    const updateDirection = (matches: boolean) => {
      setDirection(matches ? "horizontal" : "vertical");
    };
    const updateVisibility = (matches: boolean) => {
      setIsVisible(!matches);
    };

    updateDirection(mediaDirection.matches);
    updateVisibility(mediaVisible.matches);

    const dirListener = (e: MediaQueryListEvent) => updateDirection(e.matches);
    const visListener = (e: MediaQueryListEvent) => updateVisibility(e.matches);

    mediaDirection.addEventListener("change", dirListener);
    mediaVisible.addEventListener("change", visListener);

    return () => {
      mediaDirection.removeEventListener("change", dirListener);
      mediaVisible.removeEventListener("change", visListener);
    };
  }, []);

  if (!isVisible) return null;

  const isVertical = direction === "vertical";

  const getIcon = (name: string) => {
    switch (name) {
      case "github":
        return <Github size={17} strokeWidth={1.6} />;
      case "email":
        return <Mail size={17} strokeWidth={1.6} />;
      case "resume":
        return <FileText size={17} strokeWidth={1.6} />;
      case "twitter":
        return <X size={17} strokeWidth={1.6} />;
      case "instagram":
        return <Instagram size={17} strokeWidth={1.6} />;
      case "whatsapp":
        return <WhatsappIcon />;
      case "linkedin":
        return <Linkedin size={17} strokeWidth={1.6} />;
      default:
        return null;
    }
  };

  const contactItems = SIDEBAR_CONTACT_ITEMS.map((item) => ({
    letter: item.letter,
    label: item.label,
    href: item.href,
    download: item.download,
    icon: getIcon(item.iconName),
  }));

  return (
    <motion.div
      data-side-ui="social-sidebar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
      className={cn(
        "fixed z-40 flex items-center transition-all duration-300",
        isVertical
          ? "right-10 top-[15%] bottom-0 flex-col gap-4"
          : "bottom-12 right-10 flex-row gap-2.5"
      )}
    >
      {/* decorative line for mobile (horizontal) */}
      {!isVertical && (
        <motion.span
          key="mobile-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 1.8, ease: "easeOut" }}
          style={{ transformOrigin: "right" }}
          className="w-12 h-px bg-linear-to-r from-transparent to-white/20"
        />
      )}

      <SocialFlipButton
        items={contactItems}
        direction={direction}
        className="p-1 gap-1.5"
        itemClassName="h-8.5 w-8.5"
      />

      {/* decorative line for desktop (vertical, anchors to bottom) */}
      {isVertical && (
        <motion.span
          key="desktop-line"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 1.8, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
          className="w-px flex-1 bg-linear-to-b from-white/20 to-transparent"
        />
      )}
    </motion.div>
  );
}
