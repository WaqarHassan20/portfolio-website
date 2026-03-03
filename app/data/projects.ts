export type ProjectCategory = "all" | "web3" | "fullstack" | "frontend" | "devops" | "ai";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  category: Exclude<ProjectCategory, "all">;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "saas-crm",
    title: "SaaS CRM Platform",
    description:
      "A full-stack CRM with real-time dashboards, deal pipelines, and team collaboration — built for B2B sales teams.",
    longDescription:
      "Full-featured CRM built for B2B SaaS teams. Handles contacts, deals, pipelines, activity tracking, and email sequences with a real-time collaborative workspace powered by Socket.IO.",
    problem:
      "Growing sales teams lacked a lightweight, fast CRM that didn't require a 3-month onboarding process.",
    solution:
      "Built a Next.js app with a Postgres + Prisma backend, real-time updates via Socket.IO, Redis caching for hot data, and a glassmorphism UI that teams actually enjoy using.",
    category: "fullstack",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.IO", "Redis"],
    github: "https://github.com/WaqarHassan20",
    live: "#",
    featured: true,
  },
  {
    id: "ai-code-review",
    title: "AI Code Review Tool",
    description:
      "LLM-powered pull request reviewer — detects bugs, suggests improvements, and explains diffs using a RAG pipeline.",
    longDescription:
      "Integrates with GitHub webhooks to review every PR automatically. Uses LangChain + OpenAI to understand context across files and produce actionable, non-generic review comments.",
    problem:
      "Junior developers needed faster, more consistent code review feedback without blocking senior engineers.",
    solution:
      "Built a RAG pipeline that chunks the repo into a vector store, retrieves relevant context per PR diff, and generates structured review comments via OpenAI streaming.",
    category: "ai",
    tags: ["LangChain", "OpenAI", "Pinecone", "Node.js", "TypeScript", "GitHub Webhooks"],
    github: "https://github.com/WaqarHassan20",
    featured: false,
  },
  {
    id: "defi-dashboard",
    title: "DeFi Protocol Interface",
    description:
      "Multi-chain Web3 dashboard for staking, liquidity provision, and portfolio tracking across EVM chains.",
    longDescription:
      "Supports Ethereum, Polygon, and BSC. Real-time price feeds via Chainlink oracles, wallet connection via Wagmi + RainbowKit, smooth transaction UX with gas estimation and preview.",
    problem:
      "DeFi protocols had complex, intimidating interfaces that drove away non-technical users.",
    solution:
      "Designed a minimal frontend with progressive disclosure — simple overview up front, advanced options on demand. Gas estimation and confirmation preview reduce user anxiety.",
    category: "web3",
    tags: ["Next.js", "ethers.js", "Wagmi", "Solidity", "Chainlink", "TypeScript"],
    github: "https://github.com/WaqarHassan20",
    live: "#",
    featured: false,
  },
  {
    id: "devops-dashboard",
    title: "Infrastructure Monitor",
    description:
      "Real-time DevOps observability UI — aggregates Prometheus metrics, Grafana alerts, and container logs in one place.",
    longDescription:
      "Built to replace costly APM tools for small engineering teams. Aggregates Prometheus metrics, Grafana alert rules, and Docker container logs into a single, readable real-time interface.",
    problem:
      "Small teams couldn't afford DataDog or New Relic but still needed production visibility.",
    solution:
      "Node.js backend proxies Prometheus queries and streams container logs via WebSocket. React frontend renders live sparkline charts. Fully self-hosted with a single Docker Compose file.",
    category: "devops",
    tags: ["Node.js", "Prometheus", "Grafana", "Docker", "WebSocket", "React"],
    github: "https://github.com/WaqarHassan20",
    featured: false,
  },
  {
    id: "portfolio-v2",
    title: "Portfolio Website",
    description:
      "This portfolio — Next.js 16 with glassmorphism design, crystal animations, canvas aurora, and a diamond-net tech grid.",
    longDescription:
      "Built from scratch with a crystal shard 3D visual in the hero, canvas-based aurora and particle systems, a diamond-net tech stack grid, and smooth Framer Motion entrance animations throughout.",
    problem:
      "Generic portfolio templates don't communicate engineering depth or design sensibility.",
    solution:
      "Designed and built a completely custom portfolio using Next.js 16, Tailwind v4, and Framer Motion with a monochromatic glassmorphism aesthetic inspired by iOS 17.",
    category: "frontend",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS v4", "TypeScript", "Canvas API"],
    github: "https://github.com/WaqarHassan20",
    live: "#",
    featured: false,
  },
  {
    id: "e-commerce",
    title: "E-Commerce Platform",
    description:
      "Multi-vendor marketplace with product listings, Stripe Connect payments, Redis cart, and vendor + admin dashboards.",
    longDescription:
      "Complete e-commerce solution: Next.js storefront, vendor onboarding, Stripe Connect for split payouts, Redis-backed cart, S3 image storage, and a full admin panel for order management.",
    problem:
      "Small vendors needed a marketplace without Shopify's monthly fees or implementation complexity.",
    solution:
      "Multi-tenant architecture with per-vendor product isolation, Stripe Connect for direct payouts, and S3 + CloudFront for media. Deployed on AWS with zero-downtime Blue/Green deploys.",
    category: "fullstack",
    tags: ["Next.js", "Stripe Connect", "AWS S3", "Redis", "PostgreSQL", "TypeScript"],
    github: "https://github.com/WaqarHassan20",
    live: "#",
    featured: false,
  },
];
