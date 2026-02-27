import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
        className={`${saira.variable} antialiased noise bg-[#060606] text-[#b8c0cc] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
