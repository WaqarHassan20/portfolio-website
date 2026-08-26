"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface AutoImageCarouselProps {
  images: string[];
  name: string;
}

export default function AutoImageCarousel({ images, name }: AutoImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length, isPaused]);

  if (images.length === 0) return null;

  return (
    <div
      className="relative w-full aspect-[16/10] sm:aspect-video h-[300px] sm:h-[380px] md:h-[440px] max-h-[72vh] overflow-hidden bg-black/90 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${name} preview ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20 pointer-events-none z-10" />

      {/* Navigation Controls - Persistent Monochromatic Dark Glass Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/70 border border-white/20 text-white/90 hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer backdrop-blur-md shadow-md"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/70 border border-white/20 text-white/90 hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer backdrop-blur-md shadow-md"
            aria-label="Next Slide"
          >
            <ChevronRight size={18} />
          </button>

          {/* Slimmer Monochromatic Dots Indicator */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex ? "bg-white w-4 shadow-[0_0_8px_rgba(255,255,255,0.7)]" : "bg-white/30 hover:bg-white/70 w-1.5"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
