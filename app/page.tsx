import Link from "next/link";
import { getSyllabus, getAllPosts } from "@/lib/content";
import styles from "./page.module.css";
import LightningBackground from "@/components/motion/LightningBackground";
import Hero3DGraphic from "@/components/motion/Hero3DGraphic";

const FEATURED_MODULES = [0, 1, 4, 9];

export default async function HomePage() {
  const syllabus = await getSyllabus();
  const posts = await getAllPosts();
  const featuredModules = syllabus.filter((m) => FEATURED_MODULES.includes(m.id));
  const latestPosts = posts.slice(0, 3);

  return (
    <div className={styles.page}>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        <LightningBackground />
        
        <div className="container">
          <div className={`${styles.glassCard} ${styles.heroSplit}`}>
            <div className={styles.heroContent}>
              <div className={`${styles.heroBadge} animate-fade-in-up`}>
                Updated for 2026 · LLMs · Transformers · Agents
              </div>

              <h1 className={`${styles.heroTitle} animate-fade-in-up anim-delay-100`}>
                AI Concepts for<br />
                <span>Software Engineers</span>
              </h1>

              <p className={`${styles.heroSubtitle} animate-fade-in-up anim-delay-200`}>
                Everything from neural networks to agentic AI — explained using{" "}
                <strong>hash maps, middleware, and design patterns</strong>
                , not calculus.
                <br />Zero math. Just code.
              </p>

              <div className={`${styles.heroActions} animate-fade-in-up anim-delay-300`}>
                <Link href="/tutorials" className="btn btn-primary btn-lg">
                  Start Learning Free
                </Link>
                <Link href="/blog" className="btn btn-ghost btn-lg">
                  Read the AI Blog
                </Link>
              </div>

              <div className={`${styles.heroStats} animate-fade-in-up anim-delay-400`}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>70+</span>
                  <span className={styles.statLabel}>Lessons</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>10</span>
                  <span className={styles.statLabel}>Modules</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>0</span>
                  <span className={styles.statLabel}>Math</span>
                </div>
              </div>
            </div>
            
            <div className={styles.heroGraphicWrapper}>
               <Hero3DGraphic />
            </div>
          </div>
        </div>
      </section>



      {/* ─── Featured Modules ──────────────────────────────── */}
      <section className={`section ${styles.modulesSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>The Curriculum</h2>
            <p className="text-muted">
              Go in order or jump straight to what you need.
            </p>
          </div>

          <div className={styles.modulesLayout}>
            {featuredModules.map((module) => {
              const publishedLessons = module.lessons.filter((l) => l.published !== false);
              const firstLessonSlug = publishedLessons.length > 0 ? `/tutorials/${publishedLessons[0].slug}` : `/tutorials#module-${module.id}`;
              const publishedCount = publishedLessons.length;
              return (
                <Link
                  key={module.id}
                  href={firstLessonSlug}
                  className={styles.moduleItem}
                >
                  <div className={styles.moduleItemLeft}>
                    <span className={styles.moduleNum}>Module {module.id.toString().padStart(2, '0')}</span>
                    <h3 className={styles.moduleTitle}>{module.title}</h3>
                  </div>
                  <div className={styles.moduleItemRight}>
                    <p className={styles.moduleDesc}>{module.description}</p>
                    <div className={styles.moduleMeta}>
                      <span className="text-subtle">{module.lessons.length} lessons</span>
                      {publishedCount > 0 && (
                        <span className="text-subtle">· {publishedCount} available</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className={styles.viewAll}>
            <Link href="/tutorials" className="btn btn-secondary btn-lg">
              View All Modules
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Blog Section ──────────────────────────────────── */}
      {latestPosts.length > 0 && (
        <section className={`section ${styles.blogSection}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>Engineer-Focused AI News</h2>
            </div>

            <div className={styles.blogLayout}>
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={styles.blogItem}
                >
                  <article>
                    <div className={styles.blogMeta}>
                      <span className="text-subtle">{post.readingTime}</span>
                    </div>
                    <h3 className={styles.blogTitle}>{post.title}</h3>
                    <p className={styles.blogSummary}>{post.summary}</p>
                    <div className={styles.blogFooter}>
                      <span className="text-muted">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className={styles.viewAll}>
              <Link href="/blog" className="btn btn-ghost btn-lg">
                Read All Posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ───────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to finally understand AI?
            </h2>
            <p className={styles.ctaBody}>
              Start with Module 0 — no prerequisites, no math, 12 minutes.
            </p>
            <Link href="/tutorials/ai-is-just-software" className="btn btn-primary btn-lg">
              Start Lesson 1
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
