# Product Requirements Document (PRD)
## Waqar Hassan — Personal Portfolio Website

> Version: 1.0  
> Date: March 2, 2026  
> Author: Waqar Hassan

# Product Requirements Document (PRD): Engineering Portfolio

## 1. Objective
Build a high-performance, minimalist portfolio website that acts as a technical proof of concept. The site needs to showcase full-stack web, mobile (React Native/Expo), DevOps, and AI engineering capabilities. The design is strictly dark mode, featuring a monochromatic silver and zinc aesthetic on a pitch-black background, centered around a volumetric light prism effect.

## 2. Target Audience
* Engineering Managers and Tech Leads evaluating technical depth.
* Potential freelance clients looking for robust web, mobile, or AI solutions.
* University admissions committees reviewing project architecture and code quality.

## 3. Core Features & Scope

### 3.1. Hero Section (The Prism)
* **Visuals:** Pitch-black background (`#000000`) with a central "liquid silver" volumetric prism effect. The light refracts into sharp white highlights and soft zinc shadows.
* **Content:** High-contrast, minimalist typography. A sharp, direct headline stating your engineering focus.
* **Interactivity:** Subtle mouse tracking on the prism to demonstrate frontend animation capabilities without compromising overall site performance.



### 3.2. Career & Experience Timeline
* **Visuals:** A vertical timeline with a silver beam (`#F0F5F9`) connecting milestone nodes. Each milestone displays the year and role/experience category.
* **Content:** Journey from past (2021) to present (NOW), including roles such as:
    * Microsoft Office (2021) — Begin Learning
    * Graphic Designer (2022) — Freelance work
    * Python Developer (2023) — Self-Taught & Projects
    * Full-Stack Developer (2024) — Freelance & Projects
    * AI Engineer (2025) — Research & Projects
    * Learning Something New (NOW) — Self-Development
* **Design:** Each timeline point is a circular node with hover interactions revealing more detail. The silver beam runs vertically through all nodes, creating visual continuity and hierarchy.
* **Interactivity:** Nodes are clickable or hoverable to reveal expanded descriptions of each experience, skills gained, and relevant projects.

### 3.3. My Work
* **Layout:** A horizontal carousel/strip layout. As users scroll down the page, projects progress horizontally from right to left, creating a dynamic, flowing experience that pairs vertical scroll with horizontal project progression.
* **Categories:**
    * Full-Stack Web (Next.js applications, complex UI architecture).
    * Mobile Engineering (React Native/Expo applications).
    * AI & Data (RAG implementations, predictive analytics dashboards).
    * DevOps & Infrastructure (Docker, CI/CD pipelines).
* **Card Design:** Glassmorphic "frosted zinc" cards using `#1E2022` with a 0.5px silver border and subtle hover states.
* **Interaction:** Vertical scroll drives horizontal movement, creating a parallax-like effect where the project timeline shifts across the viewport as the user scrolls through the section.

### 3.4. Tech Stack
* **Visuals:** keep the design as it is already in form of crystals and mesh net like structure just change the ui and appearance like explained
  - Minimalist icon (SVG or lucide-react) in silver (`#F0F5F9`)
  - Technology name in zinc (`#C9D6DF`) below the icon
  - Subtle glow on hover (accent colour varies by category)
  - 0.5px silver border (`rgba(201,214,223,0.12)`)
* **Categories & Colours:**
  - **Frontend:** React, Next.js, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3 — accent: `#C9D6DF` (zinc)
  - **Backend:** Node.js, Python, FastAPI, Flask, Django, PostgreSQL, MongoDB — accent: `#52616B` (slate)
  - **Mobile:** React Native, Expo — accent: `#C9D6DF` (zinc)
  - **AI & ML:** PyTorch, TensorFlow, Scikit-learn, Pandas, Jupyter, LangChain — accent: `#52616B` (slate)
  - **DevOps & Infrastructure:** Docker, Kubernetes, AWS, Azure, Linux, Git, CI/CD — accent: `#C9D6DF` (zinc)
  - **Tools & Design:** Figma, Postman, Photoshop, VS Code — accent: `#52616B` (slate)
* **Background Animation:** `ColorBends` shader creates a flowing, iridescent light refraction effect behind the grid. The animation is subtle and non-intrusive, reinforcing the volumetric glass aesthetic.
* **Interaction:** Hover on any tech tile to reveal:
  - Larger glow effect with category-specific accent colour
  - Expanded tooltip with years of experience and 1–2 key projects using that technology
  - Optional: Link to GitHub repo or live demo (if applicable)
* **Implementation:**
  ```bash
  bun x --bun shadcn@latest add @react-bits/ColorBends-JS-CSS
  ```
  Then import `ColorBends` as a dynamic component with `ssr: false` (like Prism) to render the shader background in the tech stack section container. 

### 3.6. Contact & Collaborate
* **Interface:** Minimalist contact form with budget selector and email prefill.
* **Form Fields:**
  - **Name** — Contact's name (text input).
  - **Project/Service** — Project description (textarea).
  - **Budget** — 6 predefined options (`$1k-$5k`, `$5k-$10k`, `$10k-$25k`, `$25k-$50k`, `$50k+`) + custom input field.
  - **Timeline** — Project timeline (text input, e.g., "2-3 months", "ASAP").
* **Email Prefill Logic:**
  - Form generates a prefilled mailto link with subject and body.
  - Email body includes name, project description, timeline, and budget.
  - CTA button is disabled until all fields are filled.
* **Email Address:** `waqarkhalid2024@gmail.com` (professional work inquiries).
* **Section:** Includes availability pill with pulsing indicator, clean footer with copyright and tech stack mention.

### 3.7. Dedicated Projects Page (`/projects`)
* **Route:** `/projects` — a dedicated full-page project gallery accessible from the main Navbar "Projects" link.
* **Layout:** Two-panel split that fills 100vh with `overflow: hidden`:
  - **Left Panel (Fixed):** `320px` wide on desktop (`360px` on XL), hidden on mobile/tablet. Contains:
    - Profile picture (`/avatar.png`) in a circular container with silver glow ring.
    - Full name in Space Mono display font.
    - Role tagline (Full-Stack · Mobile · DevOps · AI).
    - Availability pulsing pill + Location badge (Pakistan).
    - Stats grid (3+ Yrs Exp / 20+ Projects / 55+ Technologies).
    - Short bio copy.
    - "Get in Touch" email CTA button (mailto link).
    - Back-to-Home arrow link at the top.
  - **Right Panel (Scrollable):** `flex-1`, independently scrolls via `overflow-y: auto`. Contains:
    - Sticky section header: eyebrow label + "All Projects" heading + filter tab pills.
    - Bento 2-column project card grid.
    - Full Collaborate section (existing `Collaborate.tsx` component).
    - Full Footer section (existing `Footer.tsx` component).
* **Filter System:** 7 pills — `All | Web | Mobile | AI | DevOps | Blockchain | IoT`. `AnimatePresence` drives grid re-mount with staggered card entry animations. `aria-pressed` on active button.
* **Project Cards (Bento Grid):** Glassmorphic cards (`rgba(30,32,34,0.35)`, 0.5px silver border, `backdrop-blur-8px`) featuring:
  - Project number, name, category badge (accent-coloured per project).
  - Description copy.
  - Tool/tech chips.
  - Optional GitHub / Live links with Lucide icons.
  - Hover: subtle `scale(1.012)` + ambient accent glow.
  - Top accent line per card using the project's accent colour.
* **Projects Showcased (8 total):**
  - **01 Drishti** — AI / LLM
  - **02 VoteChain** — Blockchain
  - **03 EIE** — IoT / Hardware
  - **04 Neural Dash** — Full-Stack Web
  - **05 Expo Commerce** — Mobile
  - **06 Infra Forge** — DevOps
  - **07 Semantic Core** — AI / Data
  - **08 Portfolio** — Full-Stack Web
* **Navbar Update:** The "Projects" link in `Navbar.tsx` now navigates to `/projects` instead of the `#projects` hash anchor.
* **SocialSidebar Update:** `SocialSidebar.tsx` uses `usePathname` to return `null` when on the `/projects` route, preventing the fixed sidebar from overlapping the profile panel.
* **Shared Data Source:** `/src/lib/projects-data.ts` exports `ProjectEntry` interface, `FilterTag` type, and `ALL_PROJECTS` array — single source of truth for all project data.

## 5. Non-Functional Requirements
* **Performance:** 95+ Lighthouse score. The prism animation must run smoothly at 60fps on standard hardware.
* **Responsiveness:** Fluid scaling from large desktop monitors down to mobile screens.
* **Accessibility:** High contrast ratios between the zinc text and black background. Proper ARIA labels for all interactive elements and forms.
* **Theme Lock:** Strictly dark mode. No light mode toggle to maintain the specific aesthetic.