import Link from "next/link";
import { getSyllabus } from "@/lib/content";
import { getAllPosts } from "@/lib/content";
import styles from "./page.module.css";

const FEATURED_MODULES = [0, 1, 4, 9]; // Mental Model, Neural Nets, Transformers, RAG

const colorMap: Record<string, string> = {
  cyan:    "#06b6d4",
  blue:    "#3b82f6",
  violet:  "#8b5cf6",
  emerald: "#10b981",
  amber:   "#f59e0b",
  rose:    "#f43f5e",
  pink:    "#ec4899",
};

export default async function HomePage() {
  const syllabus = await getSyllabus();
  const posts = await getAllPosts();
  const featuredModules = syllabus.filter((m) => FEATURED_MODULES.includes(m.id));
  const latestPosts = posts.slice(0, 3);

  return (
    <div className={styles.page}>
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={`container ${styles.heroContent}`}>
          <div className={`${styles.heroBadge} animate-fade-in-up`}>
            <span className={styles.heroBadgeDot} />
            Updated for 2026 · LLMs · Transformers · Agents
          </div>

          <h1 className={`${styles.heroTitle} animate-fade-in-up anim-delay-100`}>
            AI Concepts for<br />
            <span className="gradient-text">Software Engineers</span>
          </h1>

          <p className={`${styles.heroSubtitle} animate-fade-in-up anim-delay-200`}>
            Everything from neural networks to agentic AI — explained using{" "}
            <strong>hash maps, middleware, and design patterns</strong>
            , not calculus.
            <br />Zero math. Just code.
          </p>

          <div className={`${styles.heroActions} animate-fade-in-up anim-delay-300`}>
            <Link href="/tutorials" className="btn btn-primary btn-lg">
              Start Learning Free →
            </Link>
            <Link href="/blog" className="btn btn-secondary btn-lg">
              Read the AI Blog
            </Link>
          </div>

          <div className={`${styles.heroStats} animate-fade-in-up anim-delay-400`}>
            <div className={styles.stat}>
              <span className={styles.statNum}>70+</span>
              <span className={styles.statLabel}>Lessons</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>10</span>
              <span className={styles.statLabel}>Modules</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>0</span>
              <span className={styles.statLabel}>Math prereqs</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What You'll Learn ─────────────────────────────── */}
      <section className={`section ${styles.featureSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Explained the Way You Think</h2>
            <p className="text-muted">
              Every concept is mapped to something you already know as an engineer.
            </p>
          </div>

          <div className={styles.analogyGrid}>
            {[
              { sw: "Middleware chain", ai: "Neural network layers", icon: "⛓️" },
              { sw: "HashMap lookup", ai: "Embedding search", icon: "🗺️" },
              { sw: "Lexer / tokenizer", ai: "LLM tokenization", icon: "🔤" },
              { sw: "DB JOIN on relevance", ai: "Attention mechanism", icon: "🔗" },
              { sw: "API with function calls", ai: "Tool use / Agents", icon: "🤖" },
              { sw: "Unit test assertion", ai: "Loss function", icon: "✅" },
            ].map((item) => (
              <div key={item.sw} className={styles.analogyCard}>
                <span className={styles.analogyIcon}>{item.icon}</span>
                <div className={styles.analogyContent}>
                  <div className={styles.analogySW}>{item.sw}</div>
                  <div className={styles.analogyArrow}>→</div>
                  <div className={styles.analogyAI}>{item.ai}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Modules ──────────────────────────────── */}
      <section className={`section ${styles.modulesSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Start with Any Module</h2>
            <p className="text-muted">
              Go in order or jump straight to what you need.
            </p>
          </div>

          <div className={styles.modulesGrid}>
            {featuredModules.map((module) => {
              const color = colorMap[module.color] ?? "#3b82f6";
              const publishedCount = module.lessons.filter((l) => l.published).length;
              return (
                <Link
                  key={module.id}
                  href={`/tutorials#module-${module.id}`}
                  className={`card-link ${styles.moduleLink}`}
                >
                  <div
                    className={`card ${styles.moduleCard}`}
                    style={{ "--module-color": color } as React.CSSProperties}
                  >
                    <div className={styles.moduleTop}>
                      <span className={styles.moduleIcon}>{module.icon}</span>
                      <span className={styles.moduleNum}>Module {module.id}</span>
                    </div>
                    <h3 className={styles.moduleTitle}>{module.title}</h3>
                    <p className={styles.moduleDesc}>{module.description}</p>
                    <div className={styles.moduleMeta}>
                      <span className="tag tag-default">{module.lessons.length} lessons</span>
                      {publishedCount > 0 && (
                        <span className="tag tag-emerald">{publishedCount} available</span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className={styles.viewAll}>
            <Link href="/tutorials" className="btn btn-secondary">
              View All 10 Modules →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Blog Section ──────────────────────────────────── */}
      {latestPosts.length > 0 && (
        <section className={`section ${styles.blogSection}`}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>AI News for Engineers</h2>
              <p className="text-muted">
                The latest AI developments, rewritten to cut through the hype.
              </p>
            </div>

            <div className={styles.blogGrid}>
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`card-link ${styles.blogLink}`}
                >
                  <article className={`card ${styles.blogCard}`}>
                    <div className={styles.blogMeta}>
                      <span className="tag tag-violet">{post.category}</span>
                      <span className="text-subtle text-sm">{post.readingTime}</span>
                    </div>
                    <h3 className={styles.blogTitle}>{post.title}</h3>
                    <p className={styles.blogSummary}>{post.summary}</p>
                    <div className={styles.blogFooter}>
                      <span className="text-muted text-sm">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className={styles.readMore}>Read →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className={styles.viewAll}>
              <Link href="/blog" className="btn btn-secondary">
                Read All Posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ───────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} aria-hidden />
            <h2 className={styles.ctaTitle}>
              Ready to finally understand AI?
            </h2>
            <p className={styles.ctaBody}>
              Start with Module 0 — no prerequisites, no math, 12 minutes.
            </p>
            <Link href="/tutorials/ai-is-just-software" className="btn btn-primary btn-lg">
              Start Lesson 1 — It's Free →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
