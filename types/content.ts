export type StatItem = {
  value: string;
  label: string;
};

export type CodeGlyph = {
  symbol: string;
  x: number;
  y: number;
  size: number;
  op: number;
  px: number;
  py: number;
  rot: number;
};

export type ProjectTypeOption = string;
export type BudgetOption = string;

export type FooterSocial = {
  label: string;
  href: string;
};

export type HeroSocial = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter";
};

export type SidebarSocial = {
  label: string;
  href: string;
  icon: "github" | "twitter" | "linkedin" | "instagram" | "whatsapp";
};
