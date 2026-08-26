"use client";

import { useState } from "react";
import type { TechEntry } from "@/types/techstack";

interface TechVectorIconProps {
  tech: TechEntry;
  className?: string;
}

const DEV_CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

// Map each technology to its official multi-color CDN logo image URL
const REAL_BRAND_IMAGE_MAP: Record<string, string> = {
  Docker: `${DEV_CDN}/docker/docker-original.svg`,
  Kubernetes: `${DEV_CDN}/kubernetes/kubernetes-plain.svg`,
  PostgreSQL: `${DEV_CDN}/postgresql/postgresql-original.svg`,
  AWS: `${DEV_CDN}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  React: `${DEV_CDN}/react/react-original.svg`,
  "Next.js": `${DEV_CDN}/nextjs/nextjs-original.svg`,
  TypeScript: `${DEV_CDN}/typescript/typescript-original.svg`,
  "Node.js": `${DEV_CDN}/nodejs/nodejs-original.svg`,
  Express: `${DEV_CDN}/express/express-original.svg`,
  Terraform: `${DEV_CDN}/terraform/terraform-original.svg`,
  Prometheus: `${DEV_CDN}/prometheus/prometheus-original.svg`,
  "GH Actions": `${DEV_CDN}/githubactions/githubactions-original.svg`,
  JavaScript: `${DEV_CDN}/javascript/javascript-original.svg`,
  Python: `${DEV_CDN}/python/python-original.svg`,
  HTML5: `${DEV_CDN}/html5/html5-original.svg`,
  CSS3: `${DEV_CDN}/css3/css3-original.svg`,
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  MongoDB: `${DEV_CDN}/mongodb/mongodb-original.svg`,
  Redis: `${DEV_CDN}/redis/redis-original.svg`,
  ArgoCD: `${DEV_CDN}/argocd/argocd-original.svg`,
  Grafana: `${DEV_CDN}/grafana/grafana-original.svg`,
  Nginx: `${DEV_CDN}/nginx/nginx-original.svg`,
  Bash: `${DEV_CDN}/bash/bash-original.svg`,
  Git: `${DEV_CDN}/git/git-original.svg`,
  Figma: `${DEV_CDN}/figma/figma-original.svg`,
  FastAPI: `${DEV_CDN}/fastapi/fastapi-original.svg`,
  GraphQL: `${DEV_CDN}/graphql/graphql-plain.svg`,
};

export default function TechVectorIcon({ tech, className = "w-4 h-4" }: TechVectorIconProps) {
  const [hasImgError, setHasImgError] = useState(false);

  const realImgUrl = REAL_BRAND_IMAGE_MAP[tech.label] || tech.img;

  if (!hasImgError && realImgUrl) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={realImgUrl}
        alt={tech.label}
        onError={() => setHasImgError(true)}
        className={`${className} object-contain shrink-0 transition-transform duration-300`}
        style={{
          filter: tech.invert ? "invert(1) brightness(1.2)" : undefined,
        }}
      />
    );
  }

  // Multi-color vector SVG fallbacks if image is blocked or offline
  switch (tech.label) {
    case "Docker":
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <path fill="#2496ED" d="M13.98 11.08h-2.12v-2.1h2.12v2.1zm-2.84 0H9.02v-2.1h2.12v2.1zm5.67 0h-2.12v-2.1h2.12v2.1zm-8.51 0H6.18v-2.1h2.12v2.1zm8.51-2.83h-2.12V6.15h2.12v2.1zm-2.84 0h-2.12V6.15h2.12v2.1zm-2.83 0H9.02V6.15h2.12v2.1zm5.67-2.84h-2.12V3.31h2.12v2.1zM2.41 12.79c.32 2.37 2.19 5.86 6.72 5.86 5.16 0 8.78-2.61 9.94-6.42 1.05.09 2.76-.05 3.32-.97-.24-.13-.88-.29-1.57-.18-.3-.65-1.07-1.12-1.74-1.12h-.37c-.36-1.54-1.63-2.6-3.08-2.6h-.06V6.15h-2.83v2.83h-2.84v2.83H2.41z" />
        </svg>
      );

    case "Kubernetes":
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <path fill="#326CE5" d="M12 2L2 7.5v11L12 22l10-5.5v-11L12 2zm0 2.31l7.5 4.12v8.24L12 20.79l-7.5-4.12V8.43L12 4.31zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
        </svg>
      );

    case "PostgreSQL":
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <path fill="#336791" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v4h-2zm0 6h2v2h-2z" />
        </svg>
      );

    case "AWS":
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <path fill="#FF9900" d="M6.76 10.45c0-.82.67-1.49 1.49-1.49s1.49.67 1.49 1.49v2.98H6.76v-2.98zm8.95-1.49c.82 0 1.49.67 1.49 1.49v2.98h-2.98v-2.98c0-.82.67-1.49 1.49-1.49zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.28 14.54a7.99 7.99 0 01-6.12-2.84l1.32-1.02a6.38 6.38 0 004.8 2.22c2.18 0 4.14-1.12 5.25-2.82l1.35.96a7.98 7.98 0 01-6.6 3.5zm-5.04-5.09v-1h9.52v1H7.24z" />
        </svg>
      );

    case "React":
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
        </svg>
      );

    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <circle cx="12" cy="12" r="10" fill="#000000" stroke="#FFFFFF" strokeWidth="1.5" />
          <path fill="#FFFFFF" d="M14.8 16.5L9.5 9.2V16H8V8h1.6l5.7 7.2V8h1.5v8.5h-2z" />
        </svg>
      );

    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <rect width="22" height="22" x="1" y="1" rx="4" fill="#3178C6" />
          <path fill="#FFFFFF" d="M11.5 16.5h-2v-7h-2.5v-1.5h7v1.5h-2.5v7zm7-1.5c0 1.1-.9 1.5-2 1.5-1.5 0-2.2-.8-2.3-1.8l1.4-.3c.1.5.4.8 1 .8.4 0 .7-.2.7-.5 0-.4-.3-.6-1-.9l-.6-.3c-1-.5-1.6-1.1-1.6-2.1 0-1.2 1-2 2.3-2 1.3 0 2.1.7 2.3 1.6l-1.3.4c-.1-.4-.4-.7-.9-.7-.4 0-.7.2-.7.5 0 .3.2.5.8.7l.6.3c1.2.4 1.7 1.1 1.7 2.3z" />
        </svg>
      );

    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <path fill="#339933" d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm-1 14.5h-2v-5h2v5zm4 0h-2v-7h2v7z" />
        </svg>
      );

    case "Express":
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <path fill="#FFFFFF" d="M12 2A10 10 0 1022 12 10 10 0 0012 2zm4 13h-2l-2-3-2 3H8l3-4.5L8 9h2l2 3 2-3h2l-3 4.5 3 4.5z" />
        </svg>
      );

    case "Terraform":
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <path fill="#844FBA" d="M1.464 2.822l6.906 3.987v7.975L1.464 10.8V2.822zm7.625 4.402l6.906-3.987v7.977l-6.906 3.987V7.224zm0 8.791l6.906-3.987v7.976l-6.906 3.987v-7.976zm7.625-13.193L23.62 6.81v7.975l-6.906-3.987V2.822z" />
        </svg>
      );

    case "Prometheus":
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <path fill="#E6522C" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.84.63-3.53 1.69-4.88l1.43 1.43A5.94 5.94 0 006 12c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.25-.38-2.41-1.03-3.37l1.45-1.45A7.95 7.95 0 0120 12c0 4.41-3.59 8-8 8zm0-12a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
      );

    case "GH Actions":
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <path fill="#2088FF" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      );

    default:
      return (
        <span
          className="w-4 h-4 rounded-full inline-block shrink-0 shadow-xs"
          style={{ backgroundColor: tech.color || "#6366f1" }}
        />
      );
  }
}
