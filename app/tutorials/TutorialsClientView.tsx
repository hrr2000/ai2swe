"use client";

import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import type { SyllabusModule } from "@/lib/content";
import styles from "./page.module.css";
import { CheckCircle2, Lock } from "lucide-react";
import OverallProgress from "@/components/content/OverallProgress";

export default function TutorialsClientView({ syllabus }: { syllabus: SyllabusModule[] }) {
  const { isLearned, calculateModuleProgress } = useProgress();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                Updated 2026 · 10 Modules
              </div>
              <h1>
                The AI Syllabus for<br />
                <span>Software Engineers</span>
              </h1>
              <p className={styles.subtitle}>
                10 modules, 70+ lessons. Every concept explained through code —
                hash maps, middleware, and APIs. Zero math required.
              </p>
            </div>
            <div className={styles.heroProgress}>
              <OverallProgress />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
         <div className={styles.pathContainer}>
            <div className={styles.pathLine} aria-hidden />
            
            <div className={styles.modules}>
              {syllabus.map((module) => {
                const publishedLessons = module.lessons.filter((l) => l.published !== false);
                const moduleCompletion = calculateModuleProgress(publishedLessons.map(l => l.slug));
                
                return (
                  <section
                    key={module.id}
                    id={`module-${module.id}`}
                    className={`${styles.module} ${moduleCompletion === 100 ? styles.moduleCompleted : ""}`}
                  >
                    <div className={styles.moduleNode} aria-hidden />
                    
                    <div className={styles.moduleContent}>
                      {publishedLessons.length > 0 ? (
                        <Link href={`/tutorials/${publishedLessons[0].slug}`} className={styles.moduleHeaderLink}>
                          <div className={styles.moduleHeader}>
                            <div className={styles.moduleMeta}>
                              <span className={styles.moduleNum}>
                                Module {module.id.toString().padStart(2, '0')}
                              </span>
                              {moduleCompletion === 100 && (
                                <CheckCircle2 size={16} className={styles.moduleCheck} />
                              )}
                            </div>
                            <h2 className={styles.moduleTitle}>{module.title}</h2>
                            <p className={styles.moduleDesc}>{module.description}</p>
                            <div className={styles.moduleFooter}>
                              <div className={styles.moduleAnalogy}>
                                Analogy: <em className={styles.analogy}>{module.analogy}</em>
                              </div>
                              <div className={styles.moduleStats}>
                                {moduleCompletion > 0 && `${Math.round(moduleCompletion)}% complete`}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className={styles.moduleHeader}>
                          {/* ... Similar static header ... */}
                        </div>
                      )}

                      <div className={styles.lessonsList}>
                        {module.lessons.map((lesson) => {
                          const isAvailable = lesson.published !== false;
                          const learned = isLearned(lesson.slug);
                          
                          const lessonContent = (
                            <div className={`
                              ${styles.lessonItem} 
                              ${!isAvailable ? styles.lessonLocked : ""} 
                              ${learned ? styles.lessonLearned : ""}
                            `}>
                              <div className={styles.lessonIconIndicator}>
                                {learned ? (
                                  <CheckCircle2 size={16} strokeWidth={3} className={styles.itemCheck} />
                                ) : isAvailable ? (
                                  <span className={styles.itemDot}>·</span>
                                ) : (
                                  <Lock size={12} className={styles.itemLock} />
                                )}
                              </div>
                              <div className={styles.lessonText}>
                                <span className={styles.lessonTitle}>{lesson.title}</span>
                              </div>
                            </div>
                          );

                          return isAvailable ? (
                            <Link
                              key={lesson.slug}
                              href={`/tutorials/${lesson.slug}`}
                              className={styles.lessonLink}
                            >
                              {lessonContent}
                            </Link>
                          ) : (
                            <div key={lesson.slug} className={styles.lessonLinkDisabled}>
                              {lessonContent}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
         </div>
      </div>
    </div>
  );
}
