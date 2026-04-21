import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "ai2swe — AI Concepts for Software Engineers",
    template: "%s | ai2swe",
  },
  description:
    "Learn transformers, LLMs, embeddings, and every AI concept from 2022–2026 — explained through software engineering analogies. No math, just code.",
  keywords: [
    "AI for developers",
    "LLM tutorial",
    "transformer explained",
    "machine learning software engineers",
    "embeddings tutorial",
    "prompt engineering",
    "ai2swe",
  ],
  authors: [{ name: "ai2swe" }],
  creator: "ai2swe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai2swe.dev",
    siteName: "ai2swe",
    title: "ai2swe — AI Concepts for Software Engineers",
    description:
      "Learn AI from zero to hero using software engineering analogies. No math, just code.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ai2swe",
    description: "AI explained for software engineers. No math, just code.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import InlineAssistant from "@/components/content/InlineAssistant";
import { ProgressProvider } from "@/context/ProgressContext";
import { getTutorialSlugs } from "@/lib/content";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allSlugs = await getTutorialSlugs();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ProgressProvider allSlugs={allSlugs}>
          <Header />
          <main style={{ minHeight: "calc(100vh - 64px)" }}>{children}</main>
          <Footer />
          <InlineAssistant />
        </ProgressProvider>
      </body>
    </html>
  );
}
