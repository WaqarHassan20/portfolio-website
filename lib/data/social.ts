import type {
  FooterSocial,
  HeroSocial,
  SidebarSocial,
} from "@/types/content";

export const HERO_SOCIALS: HeroSocial[] = [
  { icon: "github", href: "https://github.com/WaqarHassan20", label: "GitHub" },
  {
    icon: "linkedin",
    href: "https://linkedin.com/in/waqar-khalid-9a1342338",
    label: "LinkedIn",
  },
  { icon: "twitter", href: "https://x.com/WaqarKhalid2024", label: "X" },
];

export const FOOTER_SOCIALS: FooterSocial[] = [
  { label: "GitHub", href: "https://github.com/WaqarHassan20" },
  { label: "LinkedIn", href: "https://linkedin.com/in/waqar-khalid-9a1342338" },
  { label: "Twitter", href: "https://x.com/WaqarKhalid2024" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Waqar-Ul-Hassan/pfbid02GB6UZEB2RxDzY2x45YqbD32f5qvfJApZBhjfZhnzKfSZ7UxpCx5ZWNZ21h48NGAGl/?share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18NZSNL8x2%2F",
  },
  { label: "Instagram", href: "https://www.instagram.com/i_waqar__ul__hassan" },
];

export const SIDEBAR_SOCIALS: SidebarSocial[] = [
  { label: "GitHub", href: "https://github.com/WaqarHassan20", icon: "github" },
  { label: "Twitter", href: "https://x.com/WaqarKhalid2024", icon: "twitter" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/waqar-khalid-9a1342338",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/i_waqar__ul__hassan",
    icon: "instagram",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/923001234567?text=Hello%20Waqar%2C%20I%20want%20to%20connect",
    icon: "whatsapp",
  },
];

export type SidebarContactItemData = {
  letter: string;
  label: string;
  href: string;
  download?: string;
  iconName: "github" | "email" | "resume" | "twitter" | "instagram" | "whatsapp" | "linkedin";
};

export const SIDEBAR_CONTACT_ITEMS: SidebarContactItemData[] = [
  {
    letter: "C",
    label: "Code",
    href: "https://github.com/WaqarHassan20",
    iconName: "github",
  },
  {
    letter: "O",
    label: "Email",
    href: "mailto:waqarkhalid2024@gmail.com",
    iconName: "email",
  },
  {
    letter: "N",
    label: "Resume",
    href: "/resume.pdf",
    download: "Waqar_Hassan_Resume.pdf",
    iconName: "resume",
  },
  {
    letter: "T",
    label: "X",
    href: "https://x.com/WaqarKhalid2024",
    iconName: "twitter",
  },
  {
    letter: "A",
    label: "Instagram",
    href: "https://www.instagram.com/i_waqar__ul__hassan",
    iconName: "instagram",
  },
  {
    letter: "C",
    label: "Chat",
    href: "https://wa.me/923049171818?text=Hello%20Waqar%2C%20I%20want%20to%20connect",
    iconName: "whatsapp",
  },
  {
    letter: "T",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/waqar-ul-hassan-9a1342338/",
    iconName: "linkedin",
  },
];
