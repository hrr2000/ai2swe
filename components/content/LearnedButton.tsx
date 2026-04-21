"use client";

import { useProgress } from "@/context/ProgressContext";
import styles from "./LearnedButton.module.css";
import { Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function LearnedButton({ slug }: { slug: string }) {
  const { isLearned, toggleLearned } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className={styles.skeleton}></div>
  );

  const learned = isLearned(slug);

  return (
    <button 
      onClick={() => toggleLearned(slug)}
      className={`${styles.button} ${learned ? styles.learned : ""}`}
      aria-pressed={learned}
    >
      <div className={styles.iconContainer}>
        {learned ? <Check size={18} /> : <div className={styles.plus}>+</div>}
      </div>
      <span className={styles.text}>
        {learned ? "Lesson Learned" : "Mark as Learned"}
      </span>
    </button>
  );
}
