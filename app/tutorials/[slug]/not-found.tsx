import Link from "next/link";
import { getSyllabus } from "@/lib/content";
import TutorialClientLayout from "./TutorialClientLayout";
import TutorialSidebar from "@/components/layout/TutorialSidebar";
import styles from "./page.module.css";

export default async function LessonNotFound() {
  const syllabus = await getSyllabus();
  const sidebar = <TutorialSidebar syllabus={syllabus} currentSlug="" currentModule={1} />;

  return (
    <TutorialClientLayout sidebarContent={sidebar}>
      <div className={styles.article}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/tutorials" className={styles.breadcrumbLink}>Tutorials</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>
            404
          </span>
        </nav>

        <div style={{ textAlign: "center", paddingTop: "5rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚠️</div>
          <h1 className={styles.title} style={{ margin: "0 0 1rem 0" }}>Lesson Scope Missing</h1>
          <p className="text-muted" style={{ maxWidth: "600px", margin: "0 auto 2rem", lineHeight: "1.6" }}>
            The requested tutorial resource could not be found in the active workspace. It may be an upcoming lesson that hasn't been published yet, or the route may be misspelled.
          </p>
          <p className="text-subtle" style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>
            Select a different module from the sidebar router to continue debugging.
          </p>
        </div>
      </div>
    </TutorialClientLayout>
  );
}
