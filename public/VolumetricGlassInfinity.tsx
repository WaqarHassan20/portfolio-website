// "use client";

// import { useEffect, useRef, useState } from "react";
// import { TECHS } from "@/lib/data/techstack";
// import type { TechEntry } from "@/types/techstack";

// // 13 core tools covering the full Dev & Ops lifecycle (odd count ensures staggered center arrivals)
// const DEVOPS_CYCLE_LABELS = [
//   "Docker",
//   "Kubernetes",
//   "AWS",
//   "DigitalOcean",
//   "Cloudflare",
//   "Terraform",
//   "Ansible",
//   "Helm",
//   "Vault",
//   "ArgoCD",
//   "GH Actions",
//   "Jenkins",
//   "Prometheus",
// ];

// const SHOWCASE_SKILLS = DEVOPS_CYCLE_LABELS.map(
//   (lbl) => TECHS.find((t) => t.label === lbl)!
// ).filter(Boolean);

// interface OrbPos {
//   x: number;
//   y: number;
//   zDepth: number;
//   tech: TechEntry;
// }

// export default function VolumetricGlassInfinity({
//   onHoverTech,
// }: {
//   onHoverTech?: (tech: TechEntry | null) => void;
// }) {
//   const pathRef = useRef<SVGPathElement>(null);
//   const [positions, setPositions] = useState<OrbPos[]>([]);
//   const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
//   const animFrameRef = useRef<number | null>(null);
//   const distanceRef = useRef<number>(0);

//   // Full continuous figure-8 infinity path for seamless closed pipe rendering & high-precision tracking
//   const pathD =
//     "M 460,190 C 540,50 690,45 775,130 C 860,215 860,300 775,340 C 690,380 540,295 460,190 C 380,50 230,45 145,130 C 60,215 60,300 145,340 C 230,380 380,295 460,190 Z";

//   // Split Path 1: Underneath Crossover Ribbon (Right-Top to Left-Bottom)
//   const path1D =
//     "M 775,130 C 690,45 540,50 460,190 C 380,295 230,380 145,340";

//   // Split Path 2: Dominant Crossover Ribbon (Left-Bottom -> Left Loop -> Center -> Right Loop -> Right-Top)
//   const path2D =
//     "M 145,340 C 60,300 60,215 145,130 C 230,45 380,50 460,190 C 540,295 690,380 775,340 C 860,300 860,215 775,130";

//   useEffect(() => {
//     const path = pathRef.current;
//     if (!path) return;

//     const totalLength = path.getTotalLength();
//     const count = SHOWCASE_SKILLS.length;
//     let lastTime = performance.now();

//     const animate = (now: number) => {
//       const delta = (now - lastTime) / 1000;
//       lastTime = now;

//       // Smooth revolving speed
//       if (!hoveredSkill) {
//         distanceRef.current = (distanceRef.current + delta * 22) % totalLength;
//       }

//       const currentDist = distanceRef.current;
//       const nextPositions: OrbPos[] = SHOWCASE_SKILLS.map((tech, i) => {
//         const offset = (currentDist + (i / count) * totalLength) % totalLength;
//         const pt = path.getPointAtLength(offset);
//         const t = offset / totalLength;
//         // zDepth varies smoothly as a sine wave from -1 (farthest back) to +1 (closest front)
//         const zDepth = Math.sin(t * Math.PI * 4);

//         return { x: pt.x, y: pt.y, zDepth, tech };
//       });

//       setPositions(nextPositions);
//       animFrameRef.current = requestAnimationFrame(animate);
//     };

//     animFrameRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
//     };
//   }, [hoveredSkill]);

//   // Separate positions for DOM rendering order (z-indexing)
//   const backOrbs = positions.filter((p) => p.zDepth <= 0);
//   const frontOrbs = positions.filter((p) => p.zDepth > 0);

//   return (
//     <div className="relative w-full max-w-5xl mx-auto aspect-[2.4/1] min-h-[320px] sm:min-h-[380px] md:min-h-[440px] flex items-center justify-center select-none overflow-visible py-2">
//       {/* ── Background Soft Atmospheric Blue Glow ── */}
//       <div
//         className="absolute inset-x-12 inset-y-4 rounded-full pointer-events-none opacity-75"
//         style={{
//           background:
//             "radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.20) 0%, rgba(59, 130, 246, 0.12) 50%, transparent 75%)",
//           filter: "blur(45px)",
//         }}
//       />

//       {/* Hidden path used strictly for high-precision mathematical point calculations */}
//       <svg className="absolute w-0 h-0 pointer-events-none invisible">
//         <path ref={pathRef} d={pathD} />
//       </svg>

//       <svg
//         viewBox="0 0 920 380"
//         className="w-full h-full relative z-10 overflow-visible pointer-events-none"
//       >
//         <defs>
//           {/* Bluish-Only 3D Pipe Gradients */}
//           <linearGradient id="bluish-pipe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#00d2ff" />
//             <stop offset="35%" stopColor="#3b82f6" />
//             <stop offset="70%" stopColor="#1d4ed8" />
//             <stop offset="100%" stopColor="#06b6d4" />
//           </linearGradient>

//           {/* Laser Core Conduit Gradient */}
//           <linearGradient id="bluish-core-grad" x1="0%" y1="50%" x2="100%" y2="50%">
//             <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
//             <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
//             <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
//           </linearGradient>

//           {/* Glass Specular Highlight Line */}
//           <linearGradient id="glass-specular-line" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
//             <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
//             <stop offset="100%" stopColor="#ffffff" stopOpacity="0.75" />
//           </linearGradient>

//           {/* Blue Nebula Glow Filter */}
//           <filter id="blue-nebula-glow" x="-20%" y="-20%" width="140%" height="140%">
//             <feGaussianBlur stdDeviation="14" result="blur" />
//             <feMerge>
//               <feMergeNode in="blur" />
//               <feMergeNode in="SourceGraphic" />
//             </feMerge>
//           </filter>
//         </defs>

//         {/* ==================== BASE UNIFIED CLOSED PIPE BODY (No End Black Borders) ==================== */}
//         {/* Ambient Outer Glow */}
//         <path
//           d={pathD}
//           stroke="url(#bluish-pipe-grad)"
//           strokeWidth="78"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           opacity="0.22"
//           filter="url(#blue-nebula-glow)"
//           fill="none"
//         />
//         {/* Base 3D Pipe Body (64px width) */}
//         <path
//           d={pathD}
//           stroke="rgba(8, 14, 28, 0.96)"
//           strokeWidth="64"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           fill="none"
//         />

//         {/* ==================== PATH 1: UNDERNEATH GRADIENT & CORE (Drawn First) ==================== */}
//         {/* Main Bluish Gradient Pipe (48px width) */}
//         <path
//           d={path1D}
//           stroke="url(#bluish-pipe-grad)"
//           strokeWidth="48"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           opacity="0.9"
//           fill="none"
//         />
//         {/* Laser Core Conduit (14px width) */}
//         <path
//           d={path1D}
//           stroke="url(#bluish-core-grad)"
//           strokeWidth="14"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           fill="none"
//         />
//         {/* Glass Specular Highlight Edge (2.5px width) */}
//         <path
//           d={path1D}
//           stroke="url(#glass-specular-line)"
//           strokeWidth="2.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           opacity="0.8"
//           fill="none"
//         />


//         {/* ==================== PATH 2: DOMINANT GRADIENT & CORE (Drawn Second - Overlaps at Center) ==================== */}
//         {/* Main Bluish Gradient Pipe (48px width) */}
//         <path
//           d={path2D}
//           stroke="url(#bluish-pipe-grad)"
//           strokeWidth="48"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           opacity="0.95"
//           fill="none"
//         />
//         {/* Laser Core Conduit (14px width) */}
//         <path
//           d={path2D}
//           stroke="url(#bluish-core-grad)"
//           strokeWidth="14"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           fill="none"
//         />
//         {/* Glass Specular Highlight Edge (2.5px width) */}
//         <path
//           d={path2D}
//           stroke="url(#glass-specular-line)"
//           strokeWidth="2.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           opacity="0.85"
//           fill="none"
//         />


//         {/* ==================== ICON ORBS LAYER 1: BACK LAYER (UNDERNEATH) ==================== */}
//         {backOrbs.map(({ x, y, zDepth, tech }) => {
//           const isHovered = hoveredSkill === tech.label;
//           // Smooth sinusoidal transition from 0.78x scale & 0.35 opacity
//           const calculatedScale = 0.78 + (zDepth + 1) * 0.25;
//           const calculatedOpacity = 0.35 + (zDepth + 1) * 0.325;

//           // Occlude under-track icon when passing under the center crossover point (460, 190)
//           const distToCenter = Math.abs(x - 460);
//           const isUnderCenter = distToCenter < 55;
//           const currentOpacity = isHovered ? 1 : isUnderCenter ? 0.0 : calculatedOpacity;

//           return (
//             <g
//               key={tech.label}
//               transform={`translate(${x}, ${y})`}
//               className="cursor-pointer pointer-events-auto"
//               onMouseEnter={() => {
//                 setHoveredSkill(tech.label);
//                 onHoverTech?.(tech);
//               }}
//               onMouseLeave={() => {
//                 setHoveredSkill(null);
//                 onHoverTech?.(null);
//               }}
//             >
//               <foreignObject
//                 x="-24"
//                 y="-24"
//                 width="48"
//                 height="48"
//                 className="overflow-visible pointer-events-auto"
//               >
//                 <div
//                   className="w-full h-full flex items-center justify-center transition-all duration-300"
//                   style={{
//                     transform: `scale(${isHovered ? 1.5 : calculatedScale})`,
//                     opacity: currentOpacity,
//                   }}
//                 >
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img
//                     src={tech.img}
//                     alt={tech.label}
//                     className="w-8 h-8 object-contain shrink-0"
//                     style={{
//                       filter: tech.invert
//                         ? `invert(1) brightness(1.2) drop-shadow(0 0 5px ${tech.color}66)`
//                         : `drop-shadow(0 0 5px ${tech.color}66)`,
//                     }}
//                   />

//                   {isHovered && (
//                     <div
//                       className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded backdrop-blur-md bg-black/90 text-[10px] font-mono font-bold tracking-wider border border-white/20 z-50 pointer-events-none"
//                       style={{
//                         color: tech.color,
//                         boxShadow: `0 0 12px ${tech.color}aa`,
//                       }}
//                     >
//                       {tech.label}
//                     </div>
//                   )}
//                 </div>
//               </foreignObject>
//             </g>
//           );
//         })}

//         {/* ==================== ICON ORBS LAYER 2: FRONT LAYER (ON TOP) ==================== */}
//         {frontOrbs.map(({ x, y, zDepth, tech }) => {
//           const isHovered = hoveredSkill === tech.label;
//           // Smooth sinusoidal transition up to 1.28x scale & 1.0 opacity
//           const calculatedScale = 0.78 + (zDepth + 1) * 0.25;
//           const calculatedOpacity = 0.35 + (zDepth + 1) * 0.325;

//           return (
//             <g
//               key={tech.label}
//               transform={`translate(${x}, ${y})`}
//               className="cursor-pointer pointer-events-auto"
//               onMouseEnter={() => {
//                 setHoveredSkill(tech.label);
//                 onHoverTech?.(tech);
//               }}
//               onMouseLeave={() => {
//                 setHoveredSkill(null);
//                 onHoverTech?.(null);
//               }}
//             >
//               <foreignObject
//                 x="-24"
//                 y="-24"
//                 width="48"
//                 height="48"
//                 className="overflow-visible pointer-events-auto"
//               >
//                 <div
//                   className="w-full h-full flex items-center justify-center transition-all duration-300"
//                   style={{
//                     transform: `scale(${isHovered ? 1.65 : calculatedScale})`,
//                     opacity: isHovered ? 1 : calculatedOpacity,
//                   }}
//                 >
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img
//                     src={tech.img}
//                     alt={tech.label}
//                     className="w-8 h-8 object-contain shrink-0"
//                     style={{
//                       filter: tech.invert
//                         ? `invert(1) brightness(1.35) drop-shadow(0 0 10px ${tech.color})`
//                         : `drop-shadow(0 0 10px ${tech.color})`,
//                     }}
//                   />

//                   {isHovered && (
//                     <div
//                       className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded backdrop-blur-md bg-black/90 text-[10px] font-mono font-bold tracking-wider border border-white/20 z-50 pointer-events-none"
//                       style={{
//                         color: tech.color,
//                         boxShadow: `0 0 12px ${tech.color}aa`,
//                       }}
//                     >
//                       {tech.label}
//                     </div>
//                   )}
//                 </div>
//               </foreignObject>
//             </g>
//           );
//         })}
//       </svg>
//     </div>
//   );
// }
