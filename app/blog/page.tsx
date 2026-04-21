import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI Blog — News for Engineers",
  description:
    "AI news, model releases, and research — rewritten for software engineers. No hype, no math. Just what you need to know.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <div className={styles.heroBadge}>
            AI-powered · Engineer-focused
          </div>
          <h1>
            AI News for<br />
            <span>Software Engineers</span>
          </h1>
          <p className={styles.subtitle}>
            The latest AI developments, model releases, and research —
            rewritten to cut the hype and show you what matters for your code.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Featured Post */}
        {posts.length > 0 && (
          <div className={styles.featured}>
            <Link href={`/blog/${posts[0].slug}`} className={styles.featuredLink}>
              <article className={styles.featuredCard}>
                <div className={styles.featuredBadge}>
                  <span className="tag">
                    {posts[0].category.replace(/-/g, " ")}
                  </span>
                  <span className="tag tag-blue">Featured</span>
                </div>
                <h2 className={styles.featuredTitle}>{posts[0].title}</h2>
                <p className={styles.featuredSummary}>{posts[0].summary}</p>
                <div className={styles.featuredMeta}>
                  <span className="text-muted">
                    {new Date(posts[0].date).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </span>
                  <span className="text-muted">·</span>
                  <span className="text-muted">{posts[0].readingTime}</span>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* Post Grid */}
        <div className={styles.grid}>
          {posts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postLink}>
              <article className={styles.postCard}>
                <div className={styles.postMeta}>
                  <span className="tag">
                    {post.category.replace(/-/g, " ")}
                  </span>
                  <span className="text-subtle text-sm">{post.readingTime}</span>
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postSummary}>{post.summary}</p>
                <div className={styles.postFooter}>
                  <span className="text-subtle text-sm">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </span>
                  <span className={styles.readMore}>Read →</span>
                </div>
              </article>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className={styles.empty}>
              <p>No posts yet. Stay tuned — the AI blog pipeline is warming up.</p>
              <Link href="/admin/blog/scrape" className="btn btn-primary">
                Add First Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
