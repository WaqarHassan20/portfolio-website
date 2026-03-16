import type { LucideIcon } from "lucide-react";

export type DockSectionId =
  | "home"
  | "about"
  | "domains"
  | "skills"
  | "experience"
  | "collaborate"
  | "footer";

export type NavDockItem = {
  id: DockSectionId;
  label: string;
  Icon: LucideIcon;
};

export type ScrollNavLink = {
  label: string;
  href: `#${string}`;
};

export type RouteNavLink = {
  label: string;
  href: `/${string}`;
};
