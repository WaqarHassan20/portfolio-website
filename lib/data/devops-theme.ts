import { TECHS } from "./techstack";
import type { DevOpsTheme } from "@/types/techstack";

// 12 core tools representing a mix of MERN/Full-Stack and DevOps
export const DEVOPS_CYCLE_LABELS = [
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
export const ICON_OFFSETS = [
  0.000, 0.083, 0.166, 0.250, 0.333, 0.416,
  0.550, 0.633, 0.716, 0.800, 0.883, 0.966
];

export const SHOWCASE_SKILLS = DEVOPS_CYCLE_LABELS.map(
  (lbl) => TECHS.find((t) => t.label === lbl)!
).filter(Boolean);

export const THEME_COLORS: Record<
  DevOpsTheme,
  {
    coreColor: number;
    coreEmissive: number;
    glassColor: number;
    ambientLight: number;
    lightLeft: number;
    lightRight: number;
    glowStart: string;
    glowEnd: string;
    ribbonStops: string[];
    coreStops: string[];
    textColor: string;
    chevronColor: string;
  }
> = {
  galaxy: {
    coreColor: 0x00d2ff,
    coreEmissive: 0x38bdf8,
    glassColor: 0x0c4a6e,
    ambientLight: 0x0a192f,
    lightLeft: 0x00f0ff,
    lightRight: 0xffffff,
    glowStart: "rgba(6, 182, 212, 0.16)",
    glowEnd: "rgba(59, 130, 246, 0.08)",
    ribbonStops: ["#00d2ff", "#3b82f6", "#6366f1", "#06b6d4"],
    coreStops: ["#ffffff", "#38bdf8", "#ffffff"],
    textColor: "#38bdf8",
    chevronColor: "#38bdf8",
  },
  nebula: {
    coreColor: 0xec4899,
    coreEmissive: 0xf43f5e,
    glassColor: 0x1e0b36,
    ambientLight: 0x180828,
    lightLeft: 0xd946ef,
    lightRight: 0xf43f5e,
    glowStart: "rgba(236, 72, 153, 0.16)",
    glowEnd: "rgba(139, 92, 246, 0.08)",
    ribbonStops: ["#8b5cf6", "#ec4899", "#f97316", "#8b5cf6"],
    coreStops: ["#ffffff", "#f43f5e", "#ffffff"],
    textColor: "#f472b6",
    chevronColor: "#f472b6",
  },
  solar: {
    coreColor: 0xfbbf24,
    coreEmissive: 0xea580c,
    glassColor: 0x240a0a,
    ambientLight: 0x1a0505,
    lightLeft: 0xf59e0b,
    lightRight: 0xef4444,
    glowStart: "rgba(245, 158, 11, 0.16)",
    glowEnd: "rgba(239, 68, 68, 0.08)",
    ribbonStops: ["#f59e0b", "#ea580c", "#ef4444", "#f59e0b"],
    coreStops: ["#ffffff", "#ea580c", "#ffffff"],
    textColor: "#fbbf24",
    chevronColor: "#fbbf24",
  },
  aurora: {
    coreColor: 0x34d399,
    coreEmissive: 0x059669,
    glassColor: 0x051c14,
    ambientLight: 0x02120b,
    lightLeft: 0x10b981,
    lightRight: 0x06b6d4,
    glowStart: "rgba(16, 185, 129, 0.16)",
    glowEnd: "rgba(6, 182, 212, 0.08)",
    ribbonStops: ["#10b981", "#06b6d4", "#34d399", "#10b981"],
    coreStops: ["#ffffff", "#34d399", "#ffffff"],
    textColor: "#34d399",
    chevronColor: "#34d399",
  },
  orchid: {
    coreColor: 0xf472b6,
    coreEmissive: 0xc084fc,
    glassColor: 0x160825,
    ambientLight: 0x0d0315,
    lightLeft: 0xe879f9,
    lightRight: 0xa78bfa,
    glowStart: "rgba(232, 121, 249, 0.16)",
    glowEnd: "rgba(167, 139, 250, 0.08)",
    ribbonStops: ["#f472b6", "#e879f9", "#a78bfa", "#f472b6"],
    coreStops: ["#ffffff", "#e879f9", "#ffffff"],
    textColor: "#e879f9",
    chevronColor: "#e879f9",
  },
  frost: {
    coreColor: 0x99f6e4,
    coreEmissive: 0xe0f2fe,
    glassColor: 0x051c24,
    ambientLight: 0x01131a,
    lightLeft: 0xa5f3fc,
    lightRight: 0xbae6fd,
    glowStart: "rgba(165, 243, 252, 0.16)",
    glowEnd: "rgba(186, 230, 253, 0.08)",
    ribbonStops: ["#a5f3fc", "#99f6e4", "#bae6fd", "#a5f3fc"],
    coreStops: ["#ffffff", "#a5f3fc", "#ffffff"],
    textColor: "#7dd3fc",
    chevronColor: "#7dd3fc",
  },
};
