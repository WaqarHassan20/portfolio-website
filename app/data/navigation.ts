import {
  Briefcase,
  Code2,
  Github,
  FolderKanban,
  Home,
  Layers,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import type {
  NavDockItem,
  RouteNavLink,
  ScrollNavLink,
} from "@/app/types/navigation";

// Shared navigation model for dock and top navbar scroll spy.
export const NAV_DOCK_SECTIONS: NavDockItem[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "domains", label: "Domains", Icon: Layers },
  { id: "skills", label: "Tech Stack", Icon: Code2 },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "projects", label: "Projects", Icon: FolderKanban },
  { id: "collaborate", label: "Collaborate", Icon: MessageSquare },
  { id: "footer", label: "Contact", Icon: Mail },
];

export const NAVBAR_SCROLL_LINKS: ScrollNavLink[] = [
  { label: "Domains", href: "#domains" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

export const NAVBAR_ROUTE_LINKS: RouteNavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const HOME_SCROLL_SPY_IDS = [
  "home",
  "domains",
  "skills",
  "experience",
  "projects",
  "collaborate",
  "footer",
] as const;
