# Tech Stack

## Portfolio Project Stack

### Frontend Framework
- **Next.js** (App Router) — React-based framework for SSR, SSG, and routing
- **TypeScript** — Type safety and better developer experience

### Styling
- **Tailwind CSS** — Utility-first CSS for fast, responsive UI
- **Shadcn/ui** — Accessible, customizable component library
- **PostCSS** — CSS processing pipeline

### Deployment
- **Vercel** — Zero-config deployment, optimized for Next.js

### Code Quality
- **ESLint** — Linting and code style enforcement

### Assets & Media
- **Next.js Image component** — Optimized image loading
- **Public folder** — Static assets (icons, resume PDF, images)

---

## My Full Skills Profile

### 💻 Programming Languages
- **JavaScript** — Primary language for web development
- **TypeScript** — Typed superset for safer, scalable code
- **Python** — Scripting, automation, data science & AI
- **C / C++** — Systems programming and DSA
- **Java** — Object-oriented programming
- **C#** — .NET ecosystem
- **Jupyter** — Interactive computing & data notebooks

### 🌐 Frontend Technologies
- **HTML5** — Semantic markup
- **CSS3** — Styling and animations
- **Tailwind CSS** — Utility-first styling
- **React** — Component-based UI library
- **Next.js** — Full-stack React framework (SSR, SSG, App Router)
- **Shadcn/ui** — Accessible UI component system
- **Zustand** — Lightweight global state management
- **Chart.js** — Data visualization and charts
- **Jest** — Unit testing framework
- **Vitest** — Fast Vite-native unit testing
- **Cypress** — End-to-end testing

### 🚀 Backend & Runtime
- **Node.js** — JavaScript server-side runtime
- **Bun** — Ultra-fast JavaScript runtime and bundler
- **Express.js** — Minimal web framework for Node.js
- **Hono** — Lightweight, fast web framework (edge-ready)
- **GraphQL** — Flexible API query language
- **tRPC** — End-to-end type-safe APIs
- **OpenAPI** — API specification and documentation
- **Postman** — API development and testing

### 🗄️ Databases & ORMs
- **PostgreSQL** — Relational database
- **MongoDB** — NoSQL document database
- **Redis** — In-memory data store and caching
- **ClickHouse** — Column-oriented OLAP database
- **TimescaleDB** — Time-series PostgreSQL extension
- **Prisma** — Type-safe ORM for Node.js
- **Drizzle ORM** — Lightweight TypeScript ORM

### 📡 Message Queues & Streaming
- **Apache Kafka** — Distributed event streaming platform
- **RabbitMQ** — Message broker
- **Redis Streams** — Stream data structure for real-time data
- **Socket.IO** — Real-time bidirectional event-based communication

### 🔐 Authentication & Authorization
- **NextAuth.js** — Authentication for Next.js apps

### 🤖 AI & LangChain Ecosystem
- **LangChain** — Framework for LLM-powered applications
- **LangGraph** — Stateful multi-agent workflows
- **LangSmith** — Observability and tracing for LLM apps
- **LangServe** — Deploy LangChain apps as REST APIs

### ☁️ Cloud & DevOps
- **AWS** — Cloud infrastructure (EC2, S3, Lambda, etc.)
- **DigitalOcean** — Cloud platform for VPS and managed services
- **Cloudflare** — CDN, DNS, edge compute, and security
- **Docker** — Containerization platform
- **Kubernetes** — Container orchestration at scale
- **Nginx** — Reverse proxy and web server
- **Bash** — Shell scripting and automation

### 🔧 Infrastructure & Orchestration
- **Terraform** — Infrastructure as Code (IaC)
- **Ansible** — Configuration management and automation
- **Helm** — Kubernetes package manager
- **ArgoCD** — GitOps continuous delivery for Kubernetes
- **Vault** — Secrets management
- **Turborepo** — High-performance monorepo build system

### 📊 Monitoring & Observability
- **Prometheus** — Metrics collection and alerting
- **Grafana** — Dashboards and data visualization

### 🚀 CI/CD & Version Control
- **GitHub Actions** — CI/CD automation workflows
- **Jenkins** — Open-source automation server
- **Git** — Distributed version control

---

## Decision Notes

| Decision | Reason |
|----------|--------|
| Next.js over plain React | Built-in routing, SEO support, performance optimizations |
| Tailwind over CSS Modules | Faster iteration, consistent design system |
| Vercel for hosting | Native Next.js support, free tier, easy CI/CD |
| TypeScript | Safer code, better IDE support, scales well |
| Shadcn/ui for components | Accessible, customizable, and Tailwind-compatible |

---

## File Structure Overview

```
my-portfolio/
├── app/
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── app/components/
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About section
│   ├── TechStack.tsx      # Skills & tech stack section
│   ├── Projects.tsx       # Projects showcase
│   ├── Experience.tsx     # Work/education timeline
│   ├── Testimonials.tsx   # Recommendations
│   ├── Services.tsx       # Services offered
│   ├── Contact.tsx        # Contact form & links
│   ├── Navbar.tsx         # Sticky navigation
│   └── Footer.tsx         # Footer
├── public/                # Static assets
├── next.config.ts
├── tailwind.config.*
└── tsconfig.json
```
