import type { CodeGlyph, StatItem } from "@/app/types/content";

export const ABOUT_STATS: StatItem[] = [
  { value: "3+", label: "Years Experience" },
  { value: "15+", label: "Projects Delivered" },
  { value: "50+", label: "Technologies" },
  { value: "3", label: "Core Domains" },
];

// Cursor-reactive decorative glyphs in the profile card.
export const ABOUT_CODE_GLYPHS: CodeGlyph[] = [
  { symbol: "</>", x: 10, y: 16, size: 22, op: 0.28, px: 22, py: 14, rot: -8 },
  { symbol: "{  }", x: 62, y: 8, size: 20, op: 0.22, px: -26, py: 18, rot: 6 },
  { symbol: "//", x: 74, y: 50, size: 26, op: 0.2, px: 30, py: -20, rot: 0 },
  { symbol: "=>", x: 6, y: 60, size: 24, op: 0.25, px: -18, py: 26, rot: 0 },
  { symbol: "</div>", x: 48, y: 78, size: 16, op: 0.18, px: 22, py: -16, rot: -4 },
  { symbol: "const", x: 12, y: 38, size: 18, op: 0.2, px: -28, py: -12, rot: 3 },
  { symbol: "<>", x: 68, y: 28, size: 28, op: 0.22, px: 16, py: 24, rot: 12 },
  { symbol: "fn()", x: 35, y: 68, size: 20, op: 0.2, px: -14, py: -26, rot: -6 },
  { symbol: "===", x: 78, y: 72, size: 18, op: 0.17, px: 20, py: 18, rot: 0 },
  { symbol: "_;", x: 24, y: 86, size: 22, op: 0.18, px: -10, py: 20, rot: 5 },
];
