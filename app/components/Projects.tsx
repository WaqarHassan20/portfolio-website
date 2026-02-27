"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Layers, Zap, Globe, Shield, BarChart3, Cpu } from "lucide-react";

const CATEGORIES = ["All", "Full-Stack", "Frontend", "Backend", "Open Source"];

const PROJECTS = [
  {
    id: 1,
    title: "NexaFlow — SaaS Platform",
    description:
      "Enterprise-grade SaaS platform with real-time collaboration, AI-powered automation workflows, and multi-tenant architecture. Handles 50K+ daily active users.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "tRPC", "AWS"],
    category: "Full-Stack",
    live: "https://nexaflow.app",
    github: "https://github.com/waqarhassan/nexaflow",
    stars: 847,
    forks: 124,
    icon: Zap,
    color: "rgba(255,255,255,0.55)",
    gradient: "from-white/[0.04] to-white/[0.02]",
    featured: true,
    status: "Live",
  },
  {
    id: 2,
    title: "PixelForge — Design System",
    description:
      "A comprehensive React component library with 120+ accessible, customizable components. Zero-runtime CSS, full TypeScript support, and automatic dark/light theming.",
    tech: ["React", "TypeScript", "Storybook", "Vitest", "Rollup"],
    category: "Open Source",
    live: "https://pixelforge.dev",
    github: "https://github.com/waqarhassan/pixelforge",
    stars: 2341,
    forks: 389,
    icon: Layers,
    color: "rgba(255,255,255,0.50)",
    gradient: "from-white/[0.04] to-white/[0.02]",
    featured: true,
    status: "Open Source",
  },
  {
    id: 3,
    title: "PulseAPI — Backend Service",
    description:
      "High-performance REST + GraphQL API gateway built with Bun. Sub-10ms response times, built-in rate limiting, JWT auth, and OpenAPI spec generation.",
    tech: ["Bun", "Hono", "GraphQL", "PostgreSQL", "Drizzle", "Docker"],
    category: "Backend",
    live: "https://pulseapi.io",
    github: "https://github.com/waqarhassan/pulseapi",
    stars: 564,
    forks: 78,
    icon: Cpu,
    color: "rgba(255,255,255,0.48)",
    gradient: "from-white/[0.04] to-white/[0.02]",
    featured: false,
    status: "Live",
  },
  {
    id: 4,
    title: "ChronoBoard — Analytics",
    description:
      "Real-time analytics dashboard with custom chart engine, zero external chart dependencies. WebSocket-driven live updates with sub-second latency.",
    tech: ["Next.js", "Canvas API", "WebSocket", "ClickHouse", "Node.js"],
    category: "Frontend",
    live: "https://chronoboard.app",
    github: "https://github.com/waqarhassan/chronoboard",
    stars: 312,
    forks: 45,
    icon: BarChart3,
    color: "rgba(255,255,255,0.45)",
    gradient: "from-white/[0.04] to-white/[0.02]",
    featured: false,
    status: "Beta",
  },
  {
    id: 5,
    title: "VaultGuard — Auth SDK",
    description:
      "Plug-and-play authentication SDK supporting OAuth2, SAML, magic links, and passkeys. Drop-in solution for any Node.js/Bun framework.",
    tech: ["TypeScript", "Bun", "JWT", "WebAuthn", "Redis", "Prisma"],
    category: "Backend",
    live: "https://vaultguard.dev",
    github: "https://github.com/waqarhassan/vaultguard",
    stars: 1203,
    forks: 167,
    icon: Shield,
    color: "rgba(255,255,255,0.42)",
    gradient: "from-white/[0.04] to-white/[0.02]",
    featured: false,
    status: "Stable",
  },
  {
    id: 6,
    title: "Orbiton — Landing Page Engine",
    description:
      "Visual landing page builder with drag-and-drop editor, A/B testing, conversion tracking, and one-click Vercel deployment. No code required.",
    tech: ["Next.js", "Framer Motion", "Prisma", "Stripe", "Vercel Edge"],
    category: "Full-Stack",
    live: "https://orbiton.build",
    github: "https://github.com/waqarhassan/orbiton",
    stars: 688,
    forks: 92,
    icon: Globe,
    color: "rgba(255,255,255,0.55)",
    gradient: "from-white/[0.04] to-white/[0.02]",
    featured: false,
    status: "Live",
  },
];

const STATUS_COLORS: Record<string, string> = {
  Live: "rgba(255,255,255,0.55)",
  Beta: "rgba(255,255,255,0.40)",
  Stable: "rgba(255,255,255,0.45)",
  "Open Source": "rgba(255,255,255,0.38)",
};

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${-mousePos.y * 6}deg) rotateY(${mousePos.x * 6}deg) scale(1.02)`
          : "perspective(1000px) rotateX(0) rotateY(0) scale(1)",
        transition: "transform 0.3s ease",
      }}
      className={`relative glass rounded-3xl border overflow-hidden cursor-pointer group ${
        project.featured ? "border-white/[0.07]" : "border-white/5"
      }`}
    >
      {/* Holographic overlay on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 holographic pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="px-2 py-1 rounded-lg text-xs font-bold glass border border-white/[0.12] text-white/60">
            ⭐ Featured
          </span>
        </div>
      )}

      <div className="relative z-10 p-7">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
            style={{
              background: `rgba(255,255,255,0.04)`,
              border: `1px solid rgba(255,255,255,0.08)`,
              boxShadow: hovered ? `0 0 16px rgba(255,255,255,0.06)` : "none",
            }}
          >
            <project.icon className="w-6 h-6 text-white/50" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white truncate group-hover:text-white/80 transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse"
              />
              <span className="text-xs font-mono text-white/35">
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-lg text-xs font-mono text-slate-400"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Star className="w-3 h-3 text-white/30" />
              {project.stars.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <GitFork className="w-3 h-3 text-slate-400" />
              {project.forks}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
            >
              <Github className="w-3.5 h-3.5" />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-xl glass border border-white/10 flex items-center justify-center text-white/45 hover:text-white hover:border-white/20 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom glow bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)` }}
      />
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/40 text-sm font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
            Projects
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-4">
            Shipped &amp;{" "}
            <span className="text-gradient-cyan-purple">Shipped Hard</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Real products, real users, real impact. Each project is a testament to
            thoughtful engineering and obsessive attention to detail.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-white/[0.08] border border-white/[0.15] text-white"
                  : "glass border border-white/10 text-white/38 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { label: "Projects Shipped", value: "20+" },
            { label: "GitHub Stars", value: "5.9K+" },
            { label: "Happy Clients", value: "30+" },
            { label: "Years Coding", value: "5+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-5 border border-white/5 text-center"
            >
              <div className="text-3xl font-black mb-1 text-white/65">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
