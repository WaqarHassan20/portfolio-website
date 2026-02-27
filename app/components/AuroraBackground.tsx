"use client";
import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();

    function render() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      t += 0.0018;

      const w = canvas!.width;
      const h = canvas!.height;

      // Greyscale smoke / mist waves
      const smokes = [
        { y: h * 0.22, alpha: 0.022, freq: 0.0018, amp: 140, speed: 0.4 },
        { y: h * 0.50, alpha: 0.016, freq: 0.0013, amp: 180, speed: 0.28 },
        { y: h * 0.75, alpha: 0.018, freq: 0.0022, amp: 100, speed: 0.52 },
      ];

      for (const s of smokes) {
        ctx!.beginPath();
        ctx!.moveTo(0, s.y);

        for (let x = 0; x <= w; x += 4) {
          const y =
            s.y +
            Math.sin(x * s.freq + t * s.speed) * s.amp +
            Math.sin(x * s.freq * 2.1 + t * s.speed * 1.6) * (s.amp * 0.38);
          ctx!.lineTo(x, y);
        }

        ctx!.lineTo(w, h);
        ctx!.lineTo(0, h);
        ctx!.closePath();

        const grad = ctx!.createLinearGradient(0, s.y - s.amp, 0, s.y + s.amp * 2.2);
        grad.addColorStop(0, `rgba(255,255,255,${s.alpha})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx!.fillStyle = grad;
        ctx!.fill();
      }

      animId = requestAnimationFrame(render);
    }

    render();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
