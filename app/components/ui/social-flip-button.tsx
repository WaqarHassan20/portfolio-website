"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface SocialItem {
  letter: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface SocialFlipButtonProps {
  items: SocialItem[];
  className?: string;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
  direction?: "horizontal" | "vertical";
}

const SocialFlipNode = ({
  item,
  index,
  isHovered,
  setTooltipIndex,
  tooltipIndex,
  itemClassName,
  frontClassName,
  backClassName,
  direction,
}: {
  item: SocialItem;
  index: number;
  isHovered: boolean;
  setTooltipIndex: (val: number | null) => void;
  tooltipIndex: number | null;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
  direction: "horizontal" | "vertical";
}) => {
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : { onClick: item.onClick };

  return (
    <Wrapper
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(wrapperProps as any)}
      className={cn("relative h-9 w-9 cursor-pointer", itemClassName)}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setTooltipIndex(index)}
      onMouseLeave={() => setTooltipIndex(null)}
    >
      <AnimatePresence>
        {isHovered && tooltipIndex === index && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              ...(direction === "horizontal"
                ? { y: 10, x: "-50%", left: "1/2" }
                : { x: -10, y: "-50%", top: "50%", right: "44px" }),
            }}
            animate={{
              opacity: 1,
              scale: 1,
              ...(direction === "horizontal"
                ? { y: -45, x: "-50%", left: "50%" }
                : { x: 0, y: "-50%", top: "50%", right: "44px" }),
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              ...(direction === "horizontal"
                ? { y: 10, x: "-50%", left: "50%" }
                : { x: -10, y: "-50%", top: "50%", right: "44px" }),
            }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "absolute z-50 whitespace-nowrap rounded-lg bg-neutral-900 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white shadow-xl border border-white/8 backdrop-blur-md"
            )}
          >
            {item.label}
            {/* Arrow */}
            {direction === "horizontal" ? (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rotate-45 bg-neutral-900 border-r border-b border-white/8" />
            ) : (
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rotate-45 bg-neutral-900 border-r border-t border-white/8" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{
          duration: 0.65,
          type: "spring",
          stiffness: 140,
          damping: 14,
          delay: index * 0.06,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Letter */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-xl bg-transparent text-base font-jetbrains font-bold text-white/55 shadow-sm border border-white/10 backdrop-blur-md transition-colors hover:text-white/80 hover:border-white/18",
            frontClassName
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {item.letter}
        </div>

        {/* Back - Icon */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-xl bg-transparent text-white border border-white/20 shadow-[0_0_14px_3px_rgba(255,255,255,0.18)]",
            backClassName
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {item.icon}
        </div>
      </motion.div>
    </Wrapper>
  );
};

export default function SocialFlipButton({
  items,
  className,
  itemClassName,
  frontClassName,
  backClassName,
  direction = "horizontal",
}: SocialFlipButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);

  const isVertical = direction === "vertical";

  return (
    <div
      className={cn(
        "group relative flex items-center justify-center gap-2.5 rounded-2xl p-2.5 transition-all duration-300",
        isVertical ? "flex-col" : "flex-row",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTooltipIndex(null);
      }}
    >
      {/* Border Lines Container - Clipped */}
      <div
        className={cn(
          "absolute -inset-px overflow-hidden rounded-2xl pointer-events-none transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-80"
        )}
      >
        {/* Animated Left Border Line */}
        <motion.div
          className="absolute left-0 top-0 w-px h-full bg-linear-to-b from-transparent via-white/40 to-transparent"
          animate={isHovered ? { y: ["-100%", "100%"] } : { y: "0%" }}
          transition={isHovered ? { duration: 3.5, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
        />
        {/* Animated Right Border Line */}
        <motion.div
          className="absolute right-0 top-0 w-px h-full bg-linear-to-b from-transparent via-white/40 to-transparent"
          animate={isHovered ? { y: ["100%", "-100%"] } : { y: "0%" }}
          transition={isHovered ? { duration: 3.5, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
        />
        {/* Animated Top Border Line */}
        <motion.div
          className="absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/40 to-transparent"
          animate={isHovered ? { x: ["-100%", "100%"] } : { x: "0%" }}
          transition={isHovered ? { duration: 3.5, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
        />
        {/* Animated Bottom Border Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/40 to-transparent"
          animate={isHovered ? { x: ["100%", "-100%"] } : { x: "0%" }}
          transition={isHovered ? { duration: 3.5, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
        />
      </div>

      {items.map((item, index) => (
        <SocialFlipNode
          key={index}
          item={item}
          index={index}
          isHovered={isHovered}
          setTooltipIndex={setTooltipIndex}
          tooltipIndex={tooltipIndex}
          itemClassName={itemClassName}
          frontClassName={frontClassName}
          backClassName={backClassName}
          direction={direction}
        />
      ))}
    </div>
  );
}
