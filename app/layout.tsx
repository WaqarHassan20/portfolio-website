import type { Metadata } from "next";
import { Saira, Roboto, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

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

export const metadata: Metadata = {
  title: "Waqar Hassan — Full-Stack Developer & Designer",
  description:
    "Portfolio of Waqar Hassan — crafting exceptional digital experiences with cutting-edge technology. Full-Stack Developer specializing in React, Next.js, Node.js, and modern web.",
  keywords: ["Waqar Hassan", "Full-Stack Developer", "React", "Next.js", "Portfolio", "Web Developer", "Designer"],
  authors: [{ name: "Waqar Hassan" }],
  openGraph: {
    title: "Waqar Hassan — Full-Stack Developer",
    description: "Crafting exceptional digital experiences with cutting-edge technology.",
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
        className={`${saira.variable} ${roboto.variable} ${playfairDisplay.variable} ${outfit.variable} antialiased noise bg-[#060606] text-[#b8c0cc] overflow-x-hidden`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
