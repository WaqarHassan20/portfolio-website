import type { ProjectShowcaseItem } from "@/app/types/project";

export const PROJECT_SHOWCASE: ProjectShowcaseItem[] = [
  {
    id: 1,
    number: "01",
    name: "NexaFlow",
    details:
      "Enterprise collaboration suite with workflow automations, role-based access, and real-time team spaces.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "tRPC"],
    liveUrl: "https://nexaflow.app",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    number: "02",
    name: "VaultGuard",
    details:
      "Authentication platform with passkeys, OAuth providers, and lightweight SDK integrations for modern apps.",
    techStack: ["Bun", "TypeScript", "WebAuthn", "Prisma", "Docker"],
    liveUrl: "https://vaultguard.dev",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    number: "03",
    name: "ChronoBoard",
    details:
      "Real-time analytics cockpit with event streams, metric boards, and conversion monitoring for product teams.",
    techStack: ["Next.js", "WebSocket", "ClickHouse", "Node.js", "Tailwind"],
    liveUrl: "https://chronoboard.app",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1551281044-8d8d7f6f0f7f?auto=format&fit=crop&w=1600&q=80",
  },
];
