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
  { id: "about", label: "About", Icon: User },
  { id: "domains", label: "Domains", Icon: Layers },
  { id: "skills", label: "Tech Stack", Icon: Code2 },
  { id: "experience", label: "Experience", Icon: Briefcase },
  { id: "github", label: "GitHub", Icon: Github },
  { id: "projects", label: "Projects", Icon: FolderKanban },
  { id: "collaborate", label: "Collaborate", Icon: MessageSquare },
  { id: "footer", label: "Contact", Icon: Mail },
];

export const NAVBAR_SCROLL_LINKS: ScrollNavLink[] = [
  { label: "About", href: "#about" },
  { label: "Domains", href: "#domains" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Projects", href: "#projects" },
];

export const NAVBAR_ROUTE_LINKS: RouteNavLink[] = [
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const HOME_SCROLL_SPY_IDS = [
  "home",
  "about",
  "domains",
  "skills",
  "experience",
  "github",
  "projects",
  "collaborate",
  "footer",
] as const;
