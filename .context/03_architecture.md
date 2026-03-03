# Architecture — Waqar Hassan Portfolio

> Last updated: March 3, 2026

---

## 1. Project Overview

A **multi-page portfolio website** built with Next.js App Router. The homepage (`app/page.tsx`) is one long scrollable page covering the core identity sections. **Projects** and **Contact** each have their own dedicated routes (`/projects` and `/contact`) for richer content, better SEO, and direct shareability.

| Route       | File                              | Purpose                                      |
|-------------|-----------------------------------|----------------------------------------------|
| `/`         | `app/page.tsx`                    | Hero, About, Skills, Journey, Services, Testimonials |
| `/projects` | `app/projects/page.tsx`           | Full project showcase with filters & details |
| `/contact`  | `app/contact/page.tsx`            | Dedicated contact form + availability info   |

---

## 2. Directory Structure

```
portfolio-website/
├── .context/                   ← AI context docs (never imported in code)
│   ├── 01_agent_rules.md
│   ├── 02_system_prompt.md
│   ├── 03_architecture.md
│   ├── 03_context.md
│   ├── 04_plan.md
│   └── 05_prd.md
│
├── app/
│   ├── globals.css                  ← Tailwind @import, custom utilities (.glass, .noise, etc.)
│   ├── layout.tsx                   ← Root layout: AuroraBackground + Footer (global); no Navbar
│   ├── page.tsx                     ← Home: Hero → About → TechStack → Experience → Services → Testimonials
│   │
│   ├── projects/
│   │   ├── page.tsx                 ← /projects — full project showcase page ✅ Built
│   │   └── [slug]/
│   │       └── page.tsx             ← /projects/[slug] — individual case study [FUTURE]
│   │
│   ├── contact/
│   │   └── page.tsx                 ← /contact — dedicated contact form page ✅ Built
│   │
│   ├── api/
│   │   └── contact/
│   │       └── route.ts             ← POST handler, server validation, Resend TODO ✅ Built
│   │
│   ├── data/
│   │   └── projects.ts              ← Typed Project[] data + ProjectCategory ✅ Built
│   │
│   └── components/
│       ├── AuroraBackground.tsx     ← Animated radial gradient aurora (global) ✅ Built
│       ├── ParticleField.tsx        ← Canvas particles (home-only) ✅ Built
│       ├── Hero.tsx                 ← Full-viewport hero, crystal visual, CTAs → router.push ✅ Built
│       ├── About.tsx                ← About section ✅ Built
│       ├── TechStack.tsx            ← Infinite-scroll icon marquee ✅ Built
│       ├── Experience.tsx           ← Work/journey timeline ✅ Built
│       ├── Services.tsx             ← Services section ✅ Built
│       ├── Testimonials.tsx         ← Testimonials section ✅ Built
│       │
│       ├── projects/                ← Components used only on /projects page
│       │   ├── ProjectsGrid.tsx     ← AnimatePresence popLayout filterable grid ✅ Built
│       │   ├── ProjectCard.tsx      ← Card with hover micro-interactions, layoutId ✅ Built
│       │   ├── ProjectFilter.tsx    ← Category filter tabs with sliding glass pill ✅ Built
│       │   └── ProjectModal.tsx     ← Full-screen overlay with cursor glow tracking ✅ Built
│       │
│       ├── contact/                 ← Components used only on /contact page
│       │   ├── ContactForm.tsx      ← Validated form, POST /api/contact ✅ Built
│       │   ├── ContactInfo.tsx      ← Email copy-to-clipboard, socials, availability ✅ Built
│       │   └── FormToast.tsx        ← Success/error toast, auto-dismiss 5s ✅ Built
│       │
│       └── Footer.tsx               ← Links, socials, copyright (global, all pages) ✅ Built
│
├── public/                     ← Static assets (favicon, OG image, project screenshots)
├── bunfig.toml                 ← Bun configuration
├── next.config.ts              ← Next.js config
├── postcss.config.mjs          ← Tailwind CSS v4 PostCSS plugin
├── tsconfig.json               ← Strict TypeScript config
├── eslint.config.mjs           ← ESLint flat config with next rules
└── package.json                ← Dependencies, scripts
```

---

## 3. Page Composition

### Home Page — `app/page.tsx` (built)
```
<main>  bg-[#060606] relative min-h-screen
  ├── <AuroraBackground />        z-0 — animated gradient background  (global, from layout.tsx)
  ├── <ParticleField />           z-0 — canvas particles overlay       (home-only, in page.tsx)
  └── <div> relative z-10        content layer
      ├── <Hero />                section #home
      ├── <About />               section #about
      ├── <TechStack />           section #skills
      ├── <Experience />          section #experience
      ├── <Services />            section #services
      └── <Testimonials />        section #testimonials
```
**Footer** is global (in `app/layout.tsx`) and renders on all pages.  
**No Navbar** — the site has no navigation bar by design. Hero CTAs use `router.push()` for routing.

> ⚠️ `Projects` and `Contact` are **NOT** sections on the home page — they are separate routes.
> Footer links for these two point to `/projects` and `/contact` respectively.

---

### Projects Page — `app/projects/page.tsx` ✅ Built
```
<main>
  └── <div> relative z-10
      ├── Page hero header
      │     ├── Large staggered title: "My" plain + "Projects" gradient text
      │     ├── Subtitle tagline
      │     ├── Live project count badge
      │     └── Animated underline accent line
      ├── <ProjectFilter />      pill tabs: All Projects / Web3 / Full Stack / Frontend / DevOps / AI
      │     └── Animated sliding glass indicator follows active tab (layoutId)
      ├── <ProjectsGrid />       AnimatePresence popLayout grid of <ProjectCard /> items
      │     ├── Featured card spans 2 columns with larger visual
      │     └── Cards stagger-animate on filter change
      └── <ProjectModal />       full-screen takeover detail overlay with cursor glow
<Footer />  (global from layout.tsx)
```
**Route:** `/projects`  
**Metadata:** `title: 'Projects — Waqar Hassan'`  
**Future:** `/projects/[slug]` for individual case study pages

---

### Contact Page — `app/contact/page.tsx` ✅ Built
```
<main>
  └── <div> relative z-10
      ├── Page header            "Get In Touch" title + availability badge
      ├── Two-column layout (lg:grid-cols-[1fr_400px]):
      │   ├── <ContactForm />    name / email / subject / message + submit button
      │   └── <ContactInfo />    email copy-to-clipboard, socials, location, availability
      └── <FormToast />          success / error notification (AnimatePresence, auto-dismiss 5s)
<Footer />  (global from layout.tsx)
```
**Route:** `/contact`  
**API Route:** `app/api/contact/route.ts` — server-side validation, Resend TODO (`bun add resend`, set `RESEND_API_KEY` + `CONTACT_EMAIL` env vars)

---

## 4. Component Anatomy

### `Hero.tsx`
- **Type:** Client Component (`"use client"`)
- **Deps:** Framer Motion, react-type-animation, lucide-react
- **Sub-components (in same file):** `CrystalShard`, `CrystalVisual`
- **Key features:**
  - Scroll-based parallax via `useScroll` + `useTransform`
  - Crystal visual made of hexagon clip-path divs with animated light reflections
  - Smoke orbs using radial gradient blobs
  - Type animation cycling through developer role titles
  - Social icon links (GitHub, LinkedIn, X)
  - Two CTAs: `View My Work` and `Contact Me`

### `TechStack.tsx`
- **Type:** Client Component
- **Deps:** Framer Motion, react-icons/si, react-icons/fa
- **Key features:**
  - ~41 tech icons organized in a single flat array `TECHS`
  - Infinite horizontal marquee (CSS animation or Framer Motion)
  - Hover state shows tech label with colored accent
  - `useInView` for section entrance animation

### `AuroraBackground.tsx`
- **Type:** Client Component
- **Key features:** Animated radial gradients producing aurora/nebula glow effect, fixed positioning, `pointer-events-none`, very low opacity.

### `ParticleField.tsx`
- **Type:** Client Component
- **Key features:** `<canvas>` element, particle system drawn on `requestAnimationFrame`, low-opacity white dots, `pointer-events-none`.

### `Footer.tsx` ✅ Built
- **Type:** Client Component
- **Deps:** Framer Motion, lucide-react, `next/link`, `next/navigation`
- **Key features:** Branding logo, quick nav (smooth scroll anchors for home + `/projects` + `/contact` route links via `next/link`), social links, scroll-to-top button, copyright line.

> **Note:** There is **no Navbar** in this project by design. The hero CTAs use `router.push()` for cross-page navigation (`/projects`, `/contact`). The Footer handles all navigation links.

---

### Projects Page Components

#### `components/projects/ProjectsGrid.tsx` ✅ Built
- **Type:** Client Component
- **Deps:** Framer Motion (`AnimatePresence`, `motion`, `useInView`), `ProjectCard`
- **Layout:**
  - CSS Grid with `grid-auto-rows` for masonry-like density
  - Desktop: 3-column grid; first (featured) card spans `col-span-2 row-span-2`
  - Tablet: 2-column; Mobile: 1-column
- **Animations:**
  - Initial page load: cards cascade in with stagger `0.07s`, `y: 40 → 0`, `opacity: 0 → 1`
  - On filter change: `AnimatePresence mode="popLayout"` — exiting cards shrink + fade, entering cards expand + fade in, grid re-flows smoothly
  - Empty state (no matches): animated "No projects in this category" message
- **Data:** receives a typed `Project[]` array prop; filtering logic lives in the parent `projects/page.tsx`

#### `components/projects/ProjectCard.tsx` ✅ Built
- **Type:** Client Component
- **Deps:** Framer Motion, lucide-react, `next/image`
- **Visual structure (top → bottom):**
  ```
  ┌─────────────────────────────────┐
  │  Screenshot / mockup image       │  ← next/image, object-cover, aspect-video
  │  + category badge (top-left)     │  ← e.g. "Web3", "AI" — glass pill
  │  + hover: live/github icons fade │  ← icon buttons overlay on hover
  ├─────────────────────────────────┤
  │  Project title (slate-100, bold) │
  │  Short description (slate-400)   │
  │  Tech stack badges (icon + name) │  ← small colored glass chips
  └─────────────────────────────────┘
  ```
- **Micro-interactions:**
  - `whileHover`: card lifts `y: -6`, border shifts to `border-white/20`, radial glow expands behind card
  - Screenshot: `scale: 1 → 1.05` on hover (zoom-in effect, overflow hidden)
  - Category badge: subtle pulse animation (`scale: 1 → 1.04 → 1` loop)
  - Tech badges: slide in with stagger `0.04s` on card mount
  - `whileTap`: slight scale-down `0.97` for tactile feel
- **Featured card variant:** taller aspect ratio, larger title, longer description allowed, extra "Featured" glow border

#### `components/projects/ProjectFilter.tsx` ✅ Built
- **Type:** Client Component
- **Key features:**
  - **Categories:** `All Projects` / `Web3` / `Full Stack` / `Frontend` / `DevOps` / `AI`
  - Each tab is a glass pill button with icon + label
  - Active tab: animated `layoutId` sliding glass highlight (Framer Motion shared layout)
  - Inactive tabs: muted `slate-500`, no border
  - Active tab: `slate-100` text, `border-white/10` glass bg, subtle inner glow
  - On category change: grid items animate out (`opacity 0, scale 0.92`) then new items animate in (`opacity 1, scale 1`) with stagger
  - Category icons: `SiEthereum` (Web3), `SiNodedotjs` (Full Stack), `SiReact` (Frontend), `SiDocker` (DevOps), `SiOpenai` / `SiLangchain` (AI)

#### `components/projects/ProjectModal.tsx` ✅ Built
- **Type:** Client Component
- **Deps:** Framer Motion (`AnimatePresence`, `useMotionValue`, `useSpring`), lucide-react, `next/image`
- **Animation — open sequence:**
  1. Backdrop fades in (`opacity: 0 → 1`, `backdrop-blur: 0 → 20px`)
  2. Modal panel slides up from bottom on mobile, scales in from card position on desktop (`layoutId` shared with `ProjectCard`)
  3. Inner content staggers in: image → title → meta → description → tech stack → links
- **Animation — close:** reverse sequence, `AnimatePresence` handles unmount
- **Layout (two-column desktop / single-column mobile):**
  ```
  ┌──────────────────┬───────────────────────┐
  │  Screenshots     │  Title + category      │
  │  carousel        │  Problem statement     │
  │  (swipeable)     │  Solution summary      │
  │                  │  Tech stack grid       │
  │                  │  ─────────────────     │
  │                  │  [GitHub]  [Live Demo] │
  └──────────────────┴───────────────────────┘
  ```
- **Screenshots carousel:** mouse-drag / touch swipe (Framer Motion `drag="x"` with constraints), dot indicator
- **Cursor tracking glow:** `useMotionValue` tracks mouse X/Y inside modal, radial spotlight follows cursor
- **Close triggers:** backdrop click, `✕` button, `Escape` key (`useEffect` keydown listener)
- **Scroll lock:** `overflow: hidden` applied to `<body>` while modal is open

---

### Contact Page Components

#### `components/contact/ContactForm.tsx` ✅ Built
- **Type:** Client Component
- **Key features:** Controlled form (name, email, subject, message), client-side validation with inline errors, submit calls `POST /api/contact`, loading spinner on submit state

#### `components/contact/ContactInfo.tsx` ✅ Built
- **Type:** Client Component (or Server Component if no interactivity)
- **Key features:** Email address display with copy-to-clipboard, social links, availability badge (`Open to Work` / `Currently Booked`), timezone/location info

#### `components/contact/FormToast.tsx` ✅ Built
- **Type:** Client Component
- **Deps:** Framer Motion (AnimatePresence)
- **Key features:** Animated toast notification, auto-dismisses after 5s, two variants: `success` and `error`

---

### API Route

#### `app/api/contact/route.ts` ✅ Built
- **Type:** Next.js Route Handler (Server)
- **Key features:** `POST` handler only, server-side validation (manual, no Zod installed), returns `{ success: true }` or structured error
- **⚠️ TODO:** Install Resend (`bun add resend`), set `RESEND_API_KEY` + `CONTACT_EMAIL` env vars, uncomment Resend block in the file

---

## 5. Styling Architecture

### Tailwind CSS v4
- Config lives in `postcss.config.mjs` (`@tailwindcss/postcss` plugin).
- No `tailwind.config.js` — v4 uses CSS-first config.
- Extend via `@theme` in `globals.css` if custom tokens needed.

### Custom Utilities (`globals.css`)
| Class                   | Purpose                                           |
|-------------------------|---------------------------------------------------|
| `.glass`                | Standard glassmorphism card: blur + low-opacity bg + thin border |
| `.glass-crystal`        | Crystal shard variant: more reflective, clip-path friendly |
| `.noise`                | Subtle SVG noise texture overlay on body          |
| `.animate-crystal-light`| CSS keyframe for light sweep across crystal shards|

### Z-Index Stack
| Layer              | z-index |
|--------------------|--------|
| Backgrounds        | 0       |
| Content sections   | 10      |
| Modals / Overlays  | 100     |

---

## 6. Animation System

All animations use **Framer Motion**:

| Pattern              | Config                                                      |
|----------------------|-------------------------------------------------------------|
| Section entrance     | `initial: {opacity:0, y:24}` → `animate: {opacity:1, y:0}` |
| Stagger list items   | `staggerChildren: 0.08–0.12`                                |
| Scroll-triggered     | `useInView({ once: true, margin: '-80px' })`                |
| Hover glow           | `whileHover: { scale: 1.03 }` + CSS radial glow             |
| Parallax             | `useScroll` + `useTransform` (Hero section)                 |
| Infinite loop        | `animate: { x: [0, -50%] }` + `repeat: Infinity` (marquee) |

---

## 7. Metadata (`app/layout.tsx`)

```ts
metadata = {
  title: 'Waqar Hassan — Full-Stack Developer & Designer',
  description: 'Portfolio of Waqar Hassan — crafting exceptional digital experiences...',
  keywords: ['Waqar Hassan', 'Full-Stack Developer', 'React', 'Next.js', 'Portfolio', ...],
  authors: [{ name: 'Waqar Hassan' }],
  openGraph: { title, description, type: 'website' },
}
```
> TODO: Add `metadataBase`, `twitter` card, and `icons` (favicon) fields.

---

## 8. Performance Considerations

- Next.js Turbopack enabled in dev (`next dev --turbopack`).
- `sharp` and `unrs-resolver` are in `trustedDependencies` with `ignoreScripts` — manage carefully.
- Canvas particle system should be paused when tab is not visible (`document.visibilityState`).
- Large icon packs (`react-icons`) — only named imports used, tree-shaking handles it.
- Images in `public/` should be optimized WebP and served via `<Image>` from `next/image`.

---

## 9. Deployment Target

- **Platform:** Vercel
- **Build command:** `bun run build`
- **Output:** Static + SSR (App Router default)
- **Routes:** `/` (home), `/projects` (SSG), `/contact` (SSR for form), `/api/contact` (serverless POST)
- **Environment variables:**

| Variable        | Used In              | Notes                                  |
|-----------------|----------------------|----------------------------------------|
| `RESEND_API_KEY`| `app/api/contact`    | Email dispatch via Resend              |
| `CONTACT_EMAIL` | `app/api/contact`    | Recipient inbox for form submissions   |

> `/projects` can be fully statically generated (SSG) since project data is local.  
> `/contact` uses a server action / route handler so it remains a Node.js function on Vercel.