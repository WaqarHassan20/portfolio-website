"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TECHS } from "@/lib/data/techstack";
import type { TechEntry } from "@/types/techstack";

// 12 core tools representing a mix of MERN/Full-Stack and DevOps
const DEVOPS_CYCLE_LABELS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Terraform",
  "GH Actions",
  "Prometheus",
];

// Staggered offsets so opposing icons never pass through the 2D center simultaneously
const ICON_OFFSETS = [
  0.000, 0.083, 0.166, 0.250, 0.333, 0.416,
  0.550, 0.633, 0.716, 0.800, 0.883, 0.966
];

const SHOWCASE_SKILLS = DEVOPS_CYCLE_LABELS.map(
  (lbl) => TECHS.find((t) => t.label === lbl)!
).filter(Boolean);

// 3D Parametric Lemniscate / Lissajous curve for the infinity loop
class InfinityCurve extends THREE.Curve<THREE.Vector3> {
  width: number;
  height: number;
  depth: number;

  constructor(width = 5.5, height = 2.3, depth = 1.1) {
    super();
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const angle = t * 2 * Math.PI;

    // Figure-8 parametric formulas
    const x = this.width * Math.cos(angle);
    const y = this.height * Math.sin(2 * angle);
    // Negating depth to match reference image overlap (top-left to bottom-right is on top)
    const z = -this.depth * Math.sin(angle);

    return optionalTarget.set(x, y, z);
  }
}

export default function VolumetricGlassInfinity({
  onHoverTech,
}: {
  onHoverTech?: (tech: TechEntry | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Refs for animation loop variables to avoid closures and unnecessary re-renders
  const hoveredSkillRef = useRef<string | null>(null);
  const baseOffset = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Sync hoveredSkill to ref
  useEffect(() => {
    hoveredSkillRef.current = hoveredSkill;
  }, [hoveredSkill]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Initialize Scene, Renderer, and Camera (Proportioned to fit the section)
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9.6); // Camera Z at 9.6 to keep logo boundary-safe

    // 2. Setup Studio Lighting for Glass Refraction
    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.5);
    scene.add(ambientLight);

    const dirLightTopRight = new THREE.DirectionalLight(0xffffff, 4.8);
    dirLightTopRight.position.set(6, 6, 4);
    scene.add(dirLightTopRight);

    const dirLightTopLeft = new THREE.DirectionalLight(0x00f0ff, 5.2);
    dirLightTopLeft.position.set(-6, 6, 2);
    scene.add(dirLightTopLeft);

    const dirLightBottomLeft = new THREE.DirectionalLight(0x3b82f6, 4.2);
    dirLightBottomLeft.position.set(-3, -5, -1);
    scene.add(dirLightBottomLeft);

    const rimLight = new THREE.DirectionalLight(0xffffff, 3.2);
    rimLight.position.set(0, 0, -6);
    scene.add(rimLight);

    // 3. Define Infinity Curve
    const curve = new InfinityCurve(5.5, 2.3, 1.1);

    // 4. Create Concentric Geometries (Proportioned Thickness)
    // A. Glowing Inner Neon Core (Radius 0.18)
    const innerGeo = new THREE.TubeGeometry(curve, 220, 0.18, 12, true);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00d2ff,
      emissive: 0x38bdf8,
      emissiveIntensity: 4.8,
      roughness: 0.1,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // B. Volumetric Glass Casing (Radius 0.65)
    const outerGeo = new THREE.TubeGeometry(curve, 220, 0.65, 36, true);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c4a6e, // Deep sky-900 tint for glass refraction
      roughness: 0.02,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      transmission: 0.95, // High refraction transmission
      ior: 1.54, // Index of refraction
      thickness: 2.0, // Physical refraction thickness
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      depthWrite: true,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    // 5. Handle Window Resize & Aspect Ratio Responsiveness
    const updateSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;

      // Adjust camera distance dynamically for smaller or portrait viewports
      const distFactor = Math.max(1, 2.1 / camera.aspect);
      camera.position.z = 9.6 * distFactor; // Dynamic camera scaling

      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(container);
    updateSize();

    // 6. Render/Animation Loop
    let lastTime = performance.now();
    let rafId: number;
    const tempV = new THREE.Vector3();
    const count = SHOWCASE_SKILLS.length;

    const animate = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Orbit badges
      if (!hoveredSkillRef.current) {
        baseOffset.current = (baseOffset.current + delta * 0.02) % 1.0;
      }

      // Interpolate mouse parallax tilt smoothly
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Gentle floating / breathing idle motion
      const breatheX = Math.sin(now * 0.0008) * 0.15;
      const breatheY = Math.cos(now * 0.0006) * 0.12;

      camera.position.x = mouseRef.current.x * 1.5 + breatheX;
      camera.position.y = mouseRef.current.y * 1.1 + breatheY;
      camera.lookAt(0, 0, 0);

      // Project & Update Orbiting Brand Badges
      SHOWCASE_SKILLS.forEach((tech, i) => {
        const el = itemRefs.current[i];
        if (!el) return;

        // Space badges along loop path with anti-collision staggered offsets
        const offset = (baseOffset.current + (ICON_OFFSETS[i] ?? (i / count))) % 1.0;
        curve.getPointAt(offset, tempV);

        // Project the world point to NDC [-1, 1] screen space
        tempV.project(camera);

        // Convert to percentage styles relative to parent container
        const xPercent = (tempV.x * 0.5 + 0.5) * 100;
        const yPercent = (-tempV.y * 0.5 + 0.5) * 100;

        // Calculate absolute distance to camera for depth calculations
        const dist = camera.position.distanceTo(tempV);

        const cameraZ = camera.position.z;
        const minDist = cameraZ - 1.6;
        const maxDist = cameraZ + 2.2;
        const range = maxDist - minDist;
        const depthFactor = Math.max(0, Math.min(1, (maxDist - dist) / range));

        const isHovered = hoveredSkillRef.current === tech.label;
        // Hover scale increased to 1.95 on hover as requested
        const scale = isHovered ? 1.95 : 0.68 + depthFactor * 0.45;
        const opacity = isHovered ? 1.0 : 0.22 + depthFactor * 0.78;
        const zIndex = isHovered ? 100 : Math.round(10 + depthFactor * 80);

        el.style.left = `${xPercent}%`;
        el.style.top = `${yPercent}%`;
        el.style.opacity = `${opacity}`;
        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
        el.style.zIndex = `${zIndex}`;
      });

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // 7. Cleanup WebGL and DOM Resources on Unmount
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();

      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();

      scene.clear();
      renderer.dispose();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
  };

  const handleMouseLeave = () => {
    mouseRef.current.targetX = 0;
    mouseRef.current.targetY = 0;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto aspect-[2.4/1] min-h-[320px] sm:min-h-[380px] md:min-h-[440px] flex items-center justify-center select-none overflow-visible py-2"
    >
      {/* Background Soft Atmospheric Blue Glow */}
      <div
        className="absolute inset-x-12 inset-y-4 rounded-full pointer-events-none opacity-75"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.16) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 75%)",
          filter: "blur(50px)",
        }}
      />

      {/* WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Orbiting HTML Badges Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {SHOWCASE_SKILLS.map((tech, i) => {
          const isHovered = hoveredSkill === tech.label;
          return (
            <div
              key={tech.label}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="absolute cursor-pointer pointer-events-auto select-none"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) scale(1)",
                willChange: "transform, opacity, left, top",
                width: "54px",
                height: "54px",
              }}
              onMouseEnter={() => {
                setHoveredSkill(tech.label);
                onHoverTech?.(tech);
              }}
              onMouseLeave={() => {
                setHoveredSkill(null);
                onHoverTech?.(null);
              }}
            >
              <div className="w-full h-full flex items-center justify-center relative">
                {/* Brand Logo - Enlarged to 26px size to fit inside the 3D glass tube nicely, with neon brand glow */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.img}
                  alt={tech.label}
                  style={{
                    width: "38px",
                    height: "38px",
                    objectFit: "contain",
                    filter: tech.invert
                      ? `invert(1) brightness(1.25) drop-shadow(0 0 7px ${tech.color})`
                      : `drop-shadow(0 0 7px ${tech.color})`,
                  }}
                  className="shrink-0 z-10 transition-all duration-300"
                />

                {/* Hover Tooltip */}
                {isHovered && (
                  <div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded backdrop-blur-md bg-black/90 text-[10px] font-mono font-bold tracking-wider border border-white/20 z-50 pointer-events-none"
                    style={{
                      color: tech.color,
                      boxShadow: `0 0 12px ${tech.color}88`,
                    }}
                  >
                    {tech.label}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
