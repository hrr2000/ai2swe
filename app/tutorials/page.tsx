import { getSyllabus } from "@/lib/content";
import type { Metadata } from "next";
import TutorialsClientView from "./TutorialsClientView";

export const metadata: Metadata = {
  title: "AI Tutorials — Zero to Hero",
  description:
    "Complete AI curriculum for software engineers. Learn neural networks, transformers, LLMs, RAG, and agents — using code analogies, not math.",
};

export default async function TutorialsPage() {
  const syllabus = await getSyllabus();
  return <TutorialsClientView syllabus={syllabus} />;
}
