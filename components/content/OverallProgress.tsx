"use client";

import { useProgress } from "@/context/ProgressContext";
import styles from "./OverallProgress.module.css";
import { useEffect, useState } from "react";

export default function OverallProgress() {
  const { progress, learnedSlugs } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.label}>Course Completion</div>
        <div className={styles.percentage}>{Math.round(progress)}%</div>
      </div>
      <div className={styles.track}>
        <div 
          className={styles.fill} 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={styles.meta}>
        {learnedSlugs.length} lessons mastered
      </div>
    </div>
  );
}
