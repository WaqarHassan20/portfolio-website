"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

// ── 3D Infinity Loop for Boot Screen (Pure Volumetric Glass & Flowing Core, No Icons) ──
class BootInfinityCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const angle = t * 2 * Math.PI;
    const x = 4.5 * Math.cos(angle);
    const y = 1.9 * Math.sin(2 * angle);
    const z = -0.9 * Math.sin(angle);
    return optionalTarget.set(x, y, z);
  }
}

function Boot3DInfinityCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.8);

    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.0);
    scene.add(ambientLight);

    const dirLightTopRight = new THREE.DirectionalLight(0xffffff, 4.0);
    dirLightTopRight.position.set(5, 5, 4);
    scene.add(dirLightTopRight);

    const dirLightTopLeft = new THREE.DirectionalLight(0x00f0ff, 4.5);
    dirLightTopLeft.position.set(-5, 5, 2);
    scene.add(dirLightTopLeft);

    const curve = new BootInfinityCurve();

    // Inner Glowing Core
    const innerGeo = new THREE.TubeGeometry(curve, 180, 0.16, 12, true);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      emissive: 0x38bdf8,
      emissiveIntensity: 4.0,
      roughness: 0.1,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Volumetric Outer Glass Casing
    const outerGeo = new THREE.TubeGeometry(curve, 180, 0.55, 32, true);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c4a6e,
      roughness: 0.03,
      metalness: 0.05,
      clearcoat: 1.0,
      transmission: 0.92,
      ior: 1.5,
      thickness: 1.8,
      transparent: true,
      opacity: 0.85,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    // Glowing Pulse Sphere looping along the path
    const pulseGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    scene.add(pulseMesh);

    const updateSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    updateSize();

    let rafId: number;
    const pulseVec = new THREE.Vector3();

    const animate = (now: number) => {
      const t = (now * 0.00014) % 1.0;
      curve.getPointAt(t, pulseVec);
      pulseMesh.position.copy(pulseVec);

      // Stationed tube casing (no 3D mesh spinning)
      innerMesh.rotation.set(0, 0, 0);
      outerMesh.rotation.set(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl aspect-[2.4/1] h-[320px] sm:h-[420px] flex items-center justify-center pointer-events-none select-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

export default function BootLoader1({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    let cancelled = false;
    const totalDur = 2200;
    const TICK = 25;
    const steps = Math.ceil(totalDur / TICK);
    let tick = 0;

    const interval = setInterval(() => {
      if (cancelled) return;
      tick++;
      const pct = Math.min(Math.round((tick / steps) * 100), 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        if (cancelled) return;
        setTimeout(() => {
          if (cancelled) return;
          setExiting(true);
          setTimeout(() => onDoneRef.current(), 700);
        }, 500);
      }
    }, TICK);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const pct = Math.round(progress);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#060606] overflow-hidden"
    >
      {/* Dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center select-none w-full px-6 max-w-md">
        {/* 3D DevOps Infinity Canvas (Bigger Size, Loop Movement, Zero Icons) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-12"
        >
          <Boot3DInfinityCanvas />
        </motion.div>

        {/* Small Size Name */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-jetbrains text-lg sm:text-xl font-bold tracking-[0.25em] text-white uppercase mb-1.5"
        >
          Waqar UL Hassan
        </motion.h2>

        {/* Word "software engineer" */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-xs tracking-[0.35em] text-blue-400 font-semibold uppercase mb-8"
        >
          Software Engineer
        </motion.p>

        {/* Compact Blue Box Loading with Percentage */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-2.5 w-full"
        >
          <div className="w-48 sm:w-64 h-1 rounded-full bg-zinc-950 border border-blue-500/30 overflow-hidden relative shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(59,130,246,0.8)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="font-mono text-xs font-bold text-blue-400 tracking-wider">
            {pct}%
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
