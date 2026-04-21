"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ProgressContextType {
  learnedSlugs: string[];
  toggleLearned: (slug: string) => void;
  isLearned: (slug: string) => boolean;
  progress: number;
  calculateModuleProgress: (lessonSlugs: string[]) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children, allSlugs }: { children: ReactNode; allSlugs: string[] }) {
  const [learnedSlugs, setLearnedSlugs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ai-teachers-progress");
    if (saved) {
      try {
        setLearnedSlugs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ai-teachers-progress", JSON.stringify(learnedSlugs));
    }
  }, [learnedSlugs, isLoaded]);

  const toggleLearned = (slug: string) => {
    setLearnedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const isLearned = (slug: string) => learnedSlugs.includes(slug);

  const progress = allSlugs.length > 0 ? (learnedSlugs.length / allSlugs.length) * 100 : 0;

  const calculateModuleProgress = (lessonSlugs: string[]) => {
    if (lessonSlugs.length === 0) return 0;
    const learnedInModule = lessonSlugs.filter((s) => learnedSlugs.includes(s));
    return (learnedInModule.length / lessonSlugs.length) * 100;
  };

  return (
    <ProgressContext.Provider value={{ learnedSlugs, toggleLearned, isLearned, progress, calculateModuleProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
