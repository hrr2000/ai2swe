import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "AI Teachers — AI Concepts for Software Engineers",
    template: "%s | AI Teachers",
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
    "AI blog",
  ],
  authors: [{ name: "AI Teachers" }],
  creator: "AI Teachers",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aiteachers.dev",
    siteName: "AI Teachers",
    title: "AI Teachers — AI Concepts for Software Engineers",
    description:
      "Learn AI from zero to hero using software engineering analogies. No math, just code.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Teachers",
    description: "AI explained for software engineers. No math, just code.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        <main style={{ minHeight: "calc(100vh - 64px)" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
