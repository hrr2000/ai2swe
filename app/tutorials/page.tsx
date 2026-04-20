import Link from "next/link";
import { getSyllabus } from "@/lib/content";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI Tutorials — Zero to Hero",
  description:
    "Complete AI curriculum for software engineers. Learn neural networks, transformers, LLMs, RAG, and agents — using code analogies, not math.",
};

const colorMap: Record<string, string> = {
  cyan:    "#06b6d4",
  blue:    "#3b82f6",
  violet:  "#8b5cf6",
  emerald: "#10b981",
  amber:   "#f59e0b",
  rose:    "#f43f5e",
  pink:    "#ec4899",
};

export default async function TutorialsPage() {
  const syllabus = await getSyllabus();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <div className={styles.heroBadge}>
            <span />
            Zero to Hero · All Levels · Updated 2026
          </div>
          <h1>
            AI Tutorials for<br />
            <span className="gradient-text">Software Engineers</span>
          </h1>
          <p className={styles.subtitle}>
            10 modules, 70+ lessons. Every concept explained through code —
            hash maps, middleware, and APIs. No math required.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.modules}>
          {syllabus.map((module) => {
            const color = colorMap[module.color] ?? "#3b82f6";
            const publishedLessons = module.lessons.filter((l) => l.published !== false);
            const totalLessons = module.lessons.length;

            return (
              <section
                key={module.id}
                id={`module-${module.id}`}
                className={styles.module}
                style={{ "--mod-color": color } as React.CSSProperties}
              >
                <div className={styles.moduleHeader}>
                  <div className={styles.moduleIcon}>{module.icon}</div>
                  <div className={styles.moduleInfo}>
                    <div className={styles.moduleBadge}>
                      Module {module.id}
                    </div>
                    <h2 className={styles.moduleTitle}>{module.title}</h2>
                    <p className={styles.moduleDesc}>{module.description}</p>
                    <div className={styles.moduleMeta}>
                      <span className="text-subtle text-sm">
                        📖 Analogy: <em className={styles.analogy}>{module.analogy}</em>
                      </span>
                    </div>
                  </div>
                  <div className={styles.moduleProgress}>
                    <span className={styles.progressText}>
                      {publishedLessons.length}/{totalLessons} lessons
                    </span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{
                          width: `${(publishedLessons.length / totalLessons) * 100}%`,
                          background: color,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.lessonsGrid}>
                  {module.lessons.map((lesson) => {
                    const isAvailable = lesson.published !== false;
                    const lessonContent = (
                      <div className={`${styles.lessonCard} ${!isAvailable ? styles.lessonLocked : ""}`}>
                        <div className={styles.lessonNum}>
                          {isAvailable ? lesson.lesson : "🔒"}
                        </div>
                        <div className={styles.lessonContent}>
                          <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                          <div className={styles.lessonMeta}>
                            <span className={`tag ${getDifficultyClass(lesson.difficulty)}`}>
                              {lesson.difficulty}
                            </span>
                            <span className="text-subtle text-sm">⏱ {lesson.estimatedTime}</span>
                          </div>
                        </div>
                        {isAvailable && (
                          <div className={styles.lessonArrow}>→</div>
                        )}
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
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getDifficultyClass(difficulty: string): string {
  switch (difficulty) {
    case "beginner":     return "badge-beginner";
    case "intermediate": return "badge-intermediate";
    case "advanced":     return "badge-advanced";
    default:             return "tag-default";
  }
}
