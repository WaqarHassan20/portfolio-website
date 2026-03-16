import type { FooterSocial, HeroSocial, SidebarSocial } from "@/app/types/content";

export const HERO_SOCIALS: HeroSocial[] = [
  { icon: "github", href: "https://github.com/WaqarHassan20", label: "GitHub" },
  {
    icon: "linkedin",
    href: "https://linkedin.com/in/waqar-khalid-9a1342338",
    label: "LinkedIn",
  },
  { icon: "twitter", href: "https://x.com/Waqarkhalid", label: "X" },
];

export const FOOTER_SOCIALS: FooterSocial[] = [
  { label: "GitHub", href: "https://github.com/WaqarHassan20" },
  { label: "LinkedIn", href: "https://linkedin.com/in/waqar-khalid-9a1342338" },
  { label: "Twitter", href: "https://x.com/Waqarkhalid" },
  { label: "Facebook", href: "https://facebook.com/waqar.hassan.5" },
  { label: "Instagram", href: "https://instagram.com/waqar_hassan20" },
];

export const SIDEBAR_SOCIALS: SidebarSocial[] = [
  { label: "GitHub", href: "https://github.com/WaqarHassan20", icon: "github" },
  { label: "Twitter", href: "https://twitter.com/", icon: "twitter" },
  { label: "LinkedIn", href: "https://linkedin.com/in/", icon: "linkedin" },
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "WhatsApp", href: "https://wa.me/", icon: "whatsapp" },
];
