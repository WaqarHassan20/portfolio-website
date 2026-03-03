# Development Plan — Waqar Hassan Portfolio

> Phases are sequential. Complete all tasks in a phase before moving to the next.
> Mark tasks with ✅ when done, 🔄 when in-progress, ⬜ when pending.

---

## Phase 1 — Foundation & Core Sections ✅ COMPLETE

**Goal:** Get a polished, deployable page live with the hero and skills section.

| Task                                              | Status |
|---------------------------------------------------|--------|
| Initialize Next.js 16 project with Bun            | ✅     |
| Configure TypeScript strict mode                  | ✅     |
| Set up Tailwind CSS v4                            | ✅     |
| Set up ESLint flat config                         | ✅     |
| Load Saira font via next/font                     | ✅     |
| Define global CSS utilities (.glass, .noise, etc.)| ✅     |
| Build `AuroraBackground` component                | ✅     |
| Build `ParticleField` canvas component            | ✅     |
| Build `Hero` section (crystal, type anim, CTAs)   | ✅     |
| Build `TechStack` infinite marquee section        | ✅     |
| Build `Footer` component                          | ✅     |
| Set up SEO metadata in `layout.tsx`               | ✅     |
| Populate `.context` documentation files           | ✅     |

---

## Phase 2 — Navigation & Identity Sections ✅ COMPLETE

**Goal:** Add About, Experience sections and home page content.

| Task                                                       | Status |
|------------------------------------------------------------|--------|
| Build `About` section — bio, bento grid layout             | ✅     |
| Build `Experience` section — vertical timeline of roles    | ✅     |
| Build `Services` section — service offering cards          | ✅     |
| Build `Testimonials` section — quote cards                 | ✅     |
| Fix `Hero` CTA buttons → `router.push("/projects")` + `router.push("/contact")` | ✅ |
| ~~Build `Navbar`~~ — **Decision: No Navbar by design**     | ✅ N/A |
| ~~Wire `@tanem/react-nprogress`~~ — deferred               | ⬜     |
| Add favicon to `public/` and wire in `layout.tsx`          | ⬜     |
| Create OG image (`public/og-image.png`)                    | ⬜     |
| Add `metadataBase` + `twitter` card to layout metadata     | ⬜     |

---

## Phase 3 — Work Showcase ✅ COMPLETE

**Goal:** Showcase projects and services to potential clients/employers.

| Task                                                           | Status |
|----------------------------------------------------------------|--------|
| Build `/projects` page with filterable grid                    | ✅     |
| Build `ProjectFilter` — All / Web3 / Full Stack / Frontend / DevOps / AI | ✅ |
| Build `ProjectModal` — full-screen case study overlay          | ✅     |
| Add real project data to `app/data/projects.ts` (6 projects)   | ✅     |
| Build `Services` section — service offering cards              | ✅     |
| Add project screenshots to `public/projects/`                  | ⬜     |

---

## Phase 4 — Social Proof & Contact ✅ COMPLETE

**Goal:** Build trust with testimonials and provide a working contact form.

| Task                                                       | Status |
|------------------------------------------------------------|--------|
| Build `Testimonials` section — quote cards, avatar, role   | ✅     |
| Build `/contact` page — form with name, email, message     | ✅     |
| Wire contact form to API route (`POST /api/contact`)        | ✅     |
| Add `RESEND_API_KEY` to Vercel env vars                    | ⬜     |
| Install Resend (`bun add resend`) + uncomment in route.ts  | ⬜     |
| Form validation (server-side)                              | ✅     |
| Success / error toast notification on form submit          | ✅     |

---

## Phase 5 — Polish, Performance & Launch 🔄 CURRENT

**Goal:** Production-ready: fast, accessible, and deployed.

| Task                                                          | Status |
|---------------------------------------------------------------|--------|
| Audit all animations for `prefers-reduced-motion`             | ⬜     |
| Pause `ParticleField` canvas on hidden tab                    | ⬜     |
| Optimize all images to WebP and use `next/image`              | ⬜     |
| Run Lighthouse audit — target 95+ Performance, 100 A11y       | ⬜     |
| Add `aria-label` to all icon-only buttons                     | ⬜     |
| Add `sitemap.xml` and `robots.txt`                            | ⬜     |
| Deploy to Vercel with custom domain                           | ⬜     |
| Set up Vercel Analytics                                       | ⬜     |
| Write `README.md` with setup instructions                     | ⬜     |

---

## Phase 6 — Blog / Case Studies (Future)

**Goal:** Long-form content for SEO and thought leadership.

| Task                                              | Status |
|---------------------------------------------------|--------|
| Set up MDX for blog posts (`/blog/[slug]`)         | ⬜     |
| Build blog listing page                           | ⬜     |
| Build blog post layout template                   | ⬜     |
| Write 3 seed articles                             | ⬜     |
| Add blog link to Navbar and Footer                | ⬜     |

---

## Milestones

| Milestone                       | Target Date  | Status |
|---------------------------------|--------------|--------|
| Phase 1 complete + live preview | Done         | ✅     |
| Phase 2 complete                | Mar 3, 2026  | ✅     |
| Phase 3 complete                | Mar 3, 2026  | ✅     |
| Phase 4 complete                | Mar 3, 2026  | ✅     |
| Phase 5 — Production launch     | ~Mar 10, 2026| ⬜     |
| Phase 6 — Blog live             | TBD          | ⬜     |