import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skill Icons Builder | Show Off Your Skills",
  description: "Display the programming languages, development frameworks, libraries, and tools with our Skill Icons Builder. Perfect for portfolios, resumes, and personal branding.",
  keywords: "skill icons, icon builder, developer tools, custom icons, portfolio icons, tech stack icons, programming icons, web development icons, github readme, github profile, personal branding, github",
  authors: [{ name: "Zac" }, { name: "Otis Smylie" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://skill-icons-builder.vercel.app/",
    title: "Skill Icons Builder | Show Off Your Skills",
    description: "Showcase your skills on your GitHub or resumé with ease!",
    images: [
      {
        url: "https://skill-icons-builder.vercel.app/banner.png", 
        width: 1200,
        height: 630,
        alt: "Skill Icons Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@trixzydev",
    title: "Skill Icons Builder | Show Off Your Skills",
    description: "Showcase your skills on your GitHub or resumé with ease!",
    images: [
      {
        url: "https://skill-icons-builder.vercel.app/banner.png",
        alt: "Skill Icons Builder",
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Analytics />
      <link rel="icon" href="/favicon.ico" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
