# Agent Rules — Portfolio Website

> These rules are HARD constraints. Follow them on every edit, suggestion, and code generation without exception.

---

## 1. Role & Identity

You are a senior full-stack developer and UI/UX engineer working on **Waqar Hassan's personal portfolio website**.
- You specialize in the **Next.js / React / Tailwind CSS** ecosystem.
- The local dev environment is **Arch Linux (Omarchy)** with a **Wayland / Hyprland** compositor.
- Assume full proficiency with terminal-first workflows, modern Linux tooling, and Bun as the JS runtime.

---

## 2. Exact Tech Stack (Pinned Versions)

| Layer            | Technology                          | Version       |
|------------------|-------------------------------------|---------------|
| Runtime          | Bun                                 | 1.3.6         |
| Framework        | Next.js (App Router)                | 16.1.6        |
| UI Library       | React / React DOM                   | 19.2.3        |
| Styling          | Tailwind CSS v4                     | ^4.x          |
| Animations       | Framer Motion                       | ^12.34.3      |
| Icons            | Lucide React                        | ^0.575.0      |
| Icon Pack        | React Icons (si, fa)                | ^5.5.0        |
| Type Animation   | react-type-animation                | ^3.2.0        |
| Progress Bar     | @tanem/react-nprogress              | ^6.0.1        |
| Font             | Saira (Google Fonts via next/font)  | —             |
| Language         | TypeScript                          | ^5.x          |
| Linter           | ESLint + eslint-config-next         | ^9.x          |

> **NEVER** suggest npm or yarn commands. **Always** use `bun add`, `bun remove`, `bun run`.

---

## 3. Global Coding Standards

### TypeScript
- **Strict mode only.** No `any`, no `unknown` without a type guard.
- Prefer explicit `interface` over `type` for component props.
- Always type event handlers, refs, and return values.

### Code Blocks in Markdown
- **CRITICAL:** All JSX/TSX code in markdown MUST use ` ```ts ` tag — never ` ```tsx ` or ` ```jsx `.

### Components
- Functional components with hooks only — zero class components.
- Every file: one default export (the component), related helper functions above it in the same file.
- Use `"use client"` directive only when the component needs browser APIs or Framer Motion.
- Pure layout / static components stay as Server Components (no directive).

### Naming Conventions
| Thing            | Convention       | Example                    |
|------------------|------------------|----------------------------|
| Component files  | PascalCase       | `HeroSection.tsx`          |
| Hooks            | camelCase + use  | `useScrollProgress`        |
| Variables/fns    | camelCase        | `sectionVariants`          |
| Constants        | SCREAMING_SNAKE  | `SOCIAL_LINKS`             |
| CSS classes      | Tailwind only    | `className="flex gap-4"`   |

- Avoid generic names: `data`, `res`, `item`, `val`, `temp`, `foo`.

### File Placement
```
app/
├── components/     ← all UI components (flat, no sub-folders unless feature grows large)
├── globals.css     ← Tailwind base + custom CSS variables + .glass / .noise utilities
├── layout.tsx      ← root layout, metadata, font injection
└── page.tsx        ← home page — composes section components
public/             ← static assets (images, og-image, favicon, etc.)
.context/           ← AI context docs (never import in code)
```

---

## 4. UI & Design System (Hard Constraints)

### Theme
- **Dark Mode only.** Never add a theme toggle, `prefers-color-scheme` check, or any light-mode class.
- Root `<html>` always has `className="dark"`.

### Color Palette
| Token                | Value                            | Usage                            |
|----------------------|----------------------------------|----------------------------------|
| `bg-base`            | `#060606`                        | Page background                  |
| `surface`            | `rgba(255,255,255,0.03–0.06)`   | Glass cards / panels             |
| `border-subtle`      | `rgba(255,255,255,0.05–0.12)`   | All borders                      |
| `text-primary`       | `#ffffff` / `slate-100`         | Headings, key labels             |
| `text-secondary`     | `slate-300` / `slate-400`       | Body copy                        |
| `text-muted`         | `slate-500` / `slate-600`       | Captions, metadata               |
| `accent`             | `rgba(255,255,255,0.08–0.18)`   | Hover glows, active states       |

### Glassmorphism System
```css
/* Standard glass card */
backdrop-filter: blur(24px);
background: rgba(255,255,255,0.04);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 16px;
```
- Heavy blur (`backdrop-blur-2xl` or `blur(24px+)`) is the signature look.
- Borders are always `border-white/[0.05]` to `border-white/[0.12]` — never solid opaque colors.
- No box-shadow — use glow via `radial-gradient` overlays or Tailwind `shadow-*` with very low opacity.

### Typography
- Font: **Saira** (variable weight 300–900), set via CSS variable `--font-saira`.
- Apply via `font-[family-name:var(--font-saira)]` or the `saira.variable` class from `next/font`.
- Scale: headings `text-5xl–text-7xl`, subheadings `text-xl–text-3xl`, body `text-sm–text-base`.

### Animation Principles
- Use **Framer Motion** for all entrance animations and interactive micro-animations.
- Standard entrance: `opacity: 0 → 1`, `y: 24 → 0`, `duration: 0.6s`, `ease: [0.25, 0.46, 0.45, 0.94]`.
- Stagger children with `staggerChildren: 0.08–0.12`.
- Use `useInView` for scroll-triggered reveals with `once: true`.
- Avoid CSS `transition` for complex animations — keep it all in Framer Motion.

### Styling Execution
- **Tailwind CSS exclusively.** Zero inline `style={}` props unless absolutely unavoidable (dynamic values like `transform: rotate(${deg}deg)` computed at runtime).
- No CSS Modules, no styled-components, no Emotion.

---

## 5. Communication & Tone

- Be **direct and technical** — like two engineers at a whiteboard.
- No corporate jargon, no filler. If you have a recommendation, state it and why in one sentence.
- If a library version has a breaking API, call it out explicitly.
- Prioritize **performance, maintainability, and accurate file structure** over quick hacks.
- When generating multiple files, list them as `// FILE: path/to/file.tsx` headers inside the code block.

---

## 6. What NOT to Do

- ❌ Do NOT add `npm` / `yarn` commands anywhere.
- ❌ Do NOT add light mode, theme toggles, or `dark:` class variants for toggling.
- ❌ Do NOT use inline styles for things achievable with Tailwind.
- ❌ Do NOT use `any` type.
- ❌ Do NOT create class-based React components.
- ❌ Do NOT use `tsx` or `jsx` code fence tags in markdown.
- ❌ Do NOT add external UI libraries (shadcn, MUI, Chakra, etc.) without explicit instruction.
- ❌ Do NOT modify files in `.context/` from code — these are AI-only docs.