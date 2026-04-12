import type { ProjectShowcaseItem } from "@/app/types/project";

export const PROJECT_SHOWCASE: ProjectShowcaseItem[] = [
  {
    number: '01',
    name: 'The Riser Consultancy',
    category: 'Education / Web',
    description:
      'University admission consultancy platform helping international students get admitted to abroad universities. Full-stack web application.',
    tools: 'Next.js, React, TypeScript, Tailwind CSS',
    accent: '#3b82f6',
    image: '/projects/landingpages/riser.png',
    live: 'https://www.theriserconsultancy.com/',
  },
  {
    number: '02',
    name: 'Ochi',
    category: 'UI / Frontend',
    description:
      'A modern, motion-heavy frontend experience focused on smooth interactions, bold typography, and high-end landing page polish.',
    tools: 'Next.js, React, Framer Motion, Tailwind CSS',
    accent: '#8be9fd',
    image: '/projects/landingpages/ochi.png',
    live: 'https://1-ochi-design-website.vercel.app/',
  },
  {
    number: '03',
    name: 'Duo Studio',
    category: 'Creative Web',
    description:
      'A premium agency-style website recreation with immersive transitions, layered sections, and pixel-precise interaction design.',
    tools: 'Next.js, TypeScript, Framer Motion, Tailwind CSS',
    accent: '#c9d6df',
    image: '/projects/landingpages/duo.png',
    live: 'https://2-duo-studio-website.vercel.app/',
  },
  {
    number: '04',
    name: 'Two Good',
    category: 'Product Landing',
    description:
      'A clean, conversion-focused landing experience inspired by modern product storytelling and smooth section-based animations.',
    tools: 'Next.js, React, GSAP, CSS Animations',
    accent: '#f59e0b',
    image: '/projects/landingpages/twogood.png',
    live: 'https://3-two-good-website.vercel.app/',
  },
  // {
  //   number: '05',
  //   name: 'Neural Dash',
  //   category: 'Full-Stack Web',
  //   description:
  //     'ML model performance dashboard featuring real-time metrics, multi-model comparison, and automated reporting pipelines.',
  //   tools: 'Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Docker',
  //   accent: '#38bdf8',
  // },
];
