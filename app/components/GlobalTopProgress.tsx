"use client";

import { useEffect, useState } from "react";

export default function GlobalTopProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const root = document.documentElement;
      const scrollTop = root.scrollTop || document.body.scrollTop;
      const scrollHeight = root.scrollHeight - root.clientHeight;

      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }

      const next = Math.min(1, Math.max(0, scrollTop / scrollHeight));
      setProgress(next);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden">
      <div className="absolute inset-0 bg-white/8" />
      <div
        className="absolute inset-y-0 left-0 origin-left transition-transform duration-100"
        style={{
          width: "100%",
          transform: `scaleX(${progress})`,
          background:
            "linear-gradient(90deg, rgba(56,189,248,0.95) 0%, rgba(34,211,238,0.95) 38%, rgba(125,211,252,0.95) 72%, rgba(255,255,255,0.9) 100%)",
          boxShadow:
            "0 0 14px rgba(56,189,248,0.48), 0 0 30px rgba(34,211,238,0.28)",
        }}
      />
      <div
        className="absolute inset-y-0 left-0 origin-left opacity-75 transition-transform duration-100"
        style={{
          width: "100%",
          transform: `scaleX(${progress})`,
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0 1px, transparent 1px 10px)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.65) 12%, rgba(0,0,0,1) 100%)",
        }}
      />
      <div
        className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full transition-[left] duration-100"
        style={{
          left: `calc(${progress * 100}% - 5px)`,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(56,189,248,0.95) 55%, rgba(34,211,238,0) 100%)",
          boxShadow:
            "0 0 12px rgba(255,255,255,0.55), 0 0 22px rgba(56,189,248,0.58)",
          opacity: progress > 0 ? 1 : 0,
        }}
      />
      <div
        className="absolute inset-y-0 left-0 origin-left opacity-65 transition-transform duration-100"
        style={{ transform: `scaleX(${progress})` }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.48) 52%, transparent 100%)",
            backgroundSize: "180px 100%",
            animation: "shimmer 1.8s linear infinite",
          }}
        />
      </div>
    </div>
  );
}
