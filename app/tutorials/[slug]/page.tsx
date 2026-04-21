import { notFound } from "next/navigation";
import { getTutorialBySlug, getTutorialSlugs, getSyllabus } from "@/lib/content";
import type { Metadata } from "next";
import styles from "./page.module.css";
import TutorialSidebar from "@/components/layout/TutorialSidebar";
import TutorialClientLayout from "./TutorialClientLayout";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getTutorialSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = await getTutorialBySlug(slug);
  if (!tutorial) return {};
  return {
    title: tutorial.title,
    description: tutorial.summary,
  };
}

export default async function TutorialPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <React.Suspense fallback={<div className={styles.loading}>Loading lesson...</div>}>
      <TutorialContent slug={slug} />
    </React.Suspense>
  );
}

async function TutorialContent({ slug }: { slug: string }) {
  const tutorial = await getTutorialBySlug(slug);
  if (!tutorial) notFound();

  const syllabus = await getSyllabus();
  const currentModule = syllabus.find((m) => m.id === tutorial.module);

  // Find prev/next
  const allLessonsFlat = syllabus.flatMap((m) =>
    m.lessons.filter((l) => l.published !== false).map((l) => ({ ...l, moduleId: m.id }))
  );
  const currentIdx = allLessonsFlat.findIndex((l) => l.slug === slug);
  const prevLesson = currentIdx > 0 ? allLessonsFlat[currentIdx - 1] : null;
  const nextLesson = currentIdx < allLessonsFlat.length - 1 ? allLessonsFlat[currentIdx + 1] : null;

  // Dynamically import MDX
  let Content: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/tutorials/module-${tutorial.module}/${slug}.mdx`);
    Content = mod.default;
  } catch {
    Content = null;
  }

  const sidebar = <TutorialSidebar syllabus={syllabus} currentSlug={slug} currentModule={tutorial.module} />;

  return (
    <TutorialClientLayout sidebarContent={sidebar}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/tutorials" className={styles.breadcrumbLink}>Tutorials</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbCurrent}>
          Module {tutorial.module}
        </span>
      </nav>

      {/* Header */}
      <header className={styles.articleHeader}>
        <div className={styles.metaRow}>
          <span className="text-subtle text-sm">⏱ {tutorial.estimatedTime}</span>
          <span className="text-subtle text-sm">· {tutorial.readingTime}</span>
        </div>

        <h1 className={styles.title}>{tutorial.title}</h1>

        {tutorial.analogy && (
          <div className={styles.analogyHint}>
            <span className={styles.analogyLabel}>Analogy</span>
            <span className={styles.analogyText}>{tutorial.analogy}</span>
          </div>
        )}
      </header>

      {/* Content */}
      <div className={`prose ${styles.prose}`}>
        {Content ? <Content /> : (
          <div className={styles.noContent}>
            <p>Content for this lesson is being written. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Prev / Next navigation */}
      <nav className={styles.lessonNav} aria-label="Lesson navigation">
        {prevLesson ? (
          <Link href={`/tutorials/${prevLesson.slug}`} className={styles.navPrev}>
            <span className={styles.navDir}>← Previous</span>
            <span className={styles.navTitle}>{prevLesson.title}</span>
          </Link>
        ) : <div />}

        {nextLesson ? (
          <Link href={`/tutorials/${nextLesson.slug}`} className={styles.navNext}>
            <span className={styles.navDir}>Next →</span>
            <span className={styles.navTitle}>{nextLesson.title}</span>
          </Link>
        ) : <div />}
      </nav>
    </TutorialClientLayout>
  );
}
