import type {
  CircleKey,
  CirclePoint,
  DomainCircle,
  HitArea,
  HitZone,
  IntersectionLabel,
} from "@/types/domains";

// Geometry for SVG viewBox="0 0 900 770".
export const DOMAIN_RADIUS = 240;

export const DOMAIN_CENTERS: Record<CircleKey, CirclePoint> = {
  frontend: { cx: 310, cy: 260 },
  backend: { cx: 590, cy: 260 },
  devops: { cx: 450, cy: 502 },
};

export const DOMAIN_LIT_ZONES: Record<HitZone, CircleKey[]> = {
  frontend: ["frontend"],
  backend: ["backend"],
  devops: ["devops"],
  "fs-be": ["frontend", "backend"],
  "fs-do": ["frontend", "devops"],
  "be-do": ["backend", "devops"],
  all: ["frontend", "backend", "devops"],
};

export const DOMAIN_CIRCLES: DomainCircle[] = [
  {
    key: "frontend",
    title: "MERN Stack",
    sub: "Web Development",
    skillRows: [
      ["React", "Next.js", "TypeScript"],
      ["Node.js", "Express", "MongoDB"],
    ],
    lx: 200,
    ly: 210,
  },
  {
    key: "backend",
    title: "AI Injecting",
    sub: "LLM / Agents",
    skillRows: [
      ["LangChain", "AI Agents", "Python"],
      ["FastAPI", "VectorDBs", "LLMs"],
    ],
    lx: 700,
    ly: 210,
  },
  {
    key: "devops",
    title: "DevOps",
    sub: "Infrastructure",
    skillRows: [
      ["Docker", "Kubernetes", "GitOps"],
      ["AWS", "Terraform", "CI/CD"],
    ],
    lx: 450,
    ly: 598,
  },
];

export const DOMAIN_INTERSECTION_LABELS: IntersectionLabel[] = [
  { x: 450, y: 148, lines: ["MERN & AI"] },
  { x: 340, y: 415, lines: ["MERN Ops"] },
  { x: 560, y: 415, lines: ["AI Ops"] },
  { x: 450, y: 332, center: true, lines: ["AI & DEVOPS", "ORCHESTRATION"] },
];

export const DOMAIN_HIT_AREAS: HitArea[] = [
  { id: "frontend", cx: 310, cy: 260, r: 240 },
  { id: "backend", cx: 590, cy: 260, r: 240 },
  { id: "devops", cx: 450, cy: 502, r: 240 },
  { id: "fs-be", cx: 450, cy: 148, r: 28 },
  { id: "fs-do", cx: 340, cy: 418, r: 28 },
  { id: "be-do", cx: 560, cy: 418, r: 28 },
  { id: "all", cx: 450, cy: 335, r: 36 },
];
