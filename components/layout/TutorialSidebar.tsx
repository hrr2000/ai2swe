"use client";

import Link from "next/link";
import React, { useState } from "react";
import type { SyllabusModule } from "@/lib/content";
import styles from "./TutorialSidebar.module.css";
import { useProgress } from "@/context/ProgressContext";
import { CheckCircle2 } from "lucide-react";

interface Props {
  syllabus: SyllabusModule[];
  currentSlug: string;
  currentModule: number;
}

export default function TutorialSidebar({ syllabus, currentSlug, currentModule }: Props) {
  const { isLearned, calculateModuleProgress } = useProgress();
  const [expandedModules, setExpandedModules] = useState<Set<number>>(
    new Set([currentModule])
  );

  const toggleModule = (id: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Link href="/tutorials" className={styles.backLink}>
          ← All Modules
        </Link>
        <span className={styles.sidebarTitle}>Course Navigation</span>
      </div>

      <nav className={styles.nav} aria-label="Course navigation">
        {syllabus.map((module) => {
          const isExpanded = expandedModules.has(module.id);
          const isCurrentModule = module.id === currentModule;
          const publishedLessons = module.lessons.filter((l) => l.published !== false);

          return (
            <div key={module.id} className={styles.moduleGroup}>
              <button
                className={`${styles.moduleBtn} ${isCurrentModule ? styles.moduleBtnActive : ""}`}
                onClick={() => toggleModule(module.id)}
                aria-expanded={isExpanded}
              >
                <span className={styles.moduleBtnIcon}>{module.icon}</span>
                <span className={styles.moduleBtnText}>
                  <div className={styles.moduleMeta}>
                    <span className={styles.moduleBtnLabel}>Module {module.id}</span>
                    {calculateModuleProgress(publishedLessons.map(l => l.slug)) === 100 && (
                      <CheckCircle2 size={12} className={styles.fullyLearned} />
                    )}
                  </div>
                  <span className={styles.moduleBtnTitle}>{module.title}</span>
                </span>
                <span className={`${styles.moduleBtnChevron} ${isExpanded ? styles.expanded : ""}`}>
                  ›
                </span>
              </button>

              {isExpanded && (
                <div className={styles.expandableArea}>
                  <div className={styles.moduleProgressBar}>
                    <div 
                      className={styles.moduleProgressFill} 
                      style={{ width: `${calculateModuleProgress(publishedLessons.map(l => l.slug))}%` }}
                    />
                  </div>
                  <ul className={styles.lessonList} role="list">
                    {publishedLessons.map((lesson) => {
                      const isActive = lesson.slug === currentSlug;
                      const learned = isLearned(lesson.slug);
                      return (
                        <li key={lesson.slug}>
                          <Link
                            href={`/tutorials/${lesson.slug}`}
                            className={`${styles.lessonLink} ${isActive ? styles.lessonActive : ""} ${learned ? styles.lessonLearned : ""}`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <span className={styles.lessonIcon}>
                              {learned ? <CheckCircle2 size={14} strokeWidth={3} /> : lesson.lesson}
                            </span>
                            <span className={styles.lessonTitle}>{lesson.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  {module.lessons.filter((l) => l.published === false).length > 0 && (
                    <li className={styles.comingSoon}>
                      + {module.lessons.filter((l) => l.published === false).length} more coming soon
                    </li>
                  )}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
