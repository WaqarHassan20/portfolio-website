import type { Metadata } from "next";
import { Saira, Roboto, Playfair_Display, Outfit, Roboto_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SocialSidebar from "./components/SocialSidebar";
import BootLoaderGate from "./components/BootLoaderGate";
import GlobalTopProgress from "./components/GlobalTopProgress";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Waqar Hassan | MERN Full-Stack Developer & DevOps Engineer",
  description:
    "Portfolio of Waqar Hassan — MERN Full-Stack Developer and DevOps Engineer specializing in Kubernetes, Docker, CI/CD automated pipelines, cloud orchestration (AWS), Next.js, and Node.js.",
  keywords: [
    "Waqar Hassan",
    "MERN Full-Stack Developer",
    "DevOps Engineer",
    "Cloud Orchestration",
    "CI/CD Pipeline",
    "Kubernetes",
    "Docker",
    "AWS",
    "Next.js",
    "React Developer",
    "Node.js Developer",
    "Terraform IaC",
    "Software Engineer Portfolio"
  ],
  authors: [{ name: "Waqar Hassan" }],
  openGraph: {
    title: "Waqar Hassan | MERN Full-Stack Developer & DevOps Engineer",
    description: "Orchestrating cloud-native infrastructure and building production-grade MERN stack applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={`${saira.variable} ${roboto.variable} ${robotoMono.variable} ${playfairDisplay.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased noise bg-[#060606] text-[#b8c0cc] overflow-x-hidden`}
      >
        <GlobalTopProgress />
        <SocialSidebar />
        <BootLoaderGate>
          {children}
        </BootLoaderGate>
      </body>
    </html>
  );
}
