import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI Blog — News for Engineers",
  description:
    "AI news, model releases, and research — rewritten for software engineers. No hype, no math. Just what you need to know.",
};

const CATEGORIES = [
  { id: "all", label: "All Posts" },
  { id: "model-releases", label: "Model Releases" },
  { id: "tools-and-frameworks", label: "Tools & Frameworks" },
  { id: "research-simplified", label: "Research Simplified" },
  { id: "industry-moves", label: "Industry Moves" },
  { id: "tutorials-and-guides", label: "Guides" },
];

const categoryColorMap: Record<string, string> = {
  "model-releases":       "tag-violet",
  "tools-and-frameworks": "tag-blue",
  "research-simplified":  "tag-cyan",
  "industry-moves":       "tag-amber",
  "tutorials-and-guides": "tag-emerald",
  "opinions":             "tag-rose",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className="container">
          <div className={styles.heroBadge}>
            <span />
            AI-powered · Engineer-focused · Updated daily
          </div>
          <h1>
            AI News for<br />
            <span className="gradient-text">Software Engineers</span>
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
                  <span className={`tag ${categoryColorMap[posts[0].category] ?? "tag-default"}`}>
                    {posts[0].category.replace(/-/g, " ")}
                  </span>
                  <span className="tag tag-blue">Featured</span>
                </div>
                <h2 className={styles.featuredTitle}>{posts[0].title}</h2>
                <p className={styles.featuredSummary}>{posts[0].summary}</p>
                <div className={styles.featuredMeta}>
                  <span className="text-muted text-sm">
                    {new Date(posts[0].date).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </span>
                  <span className="text-muted text-sm">·</span>
                  <span className="text-muted text-sm">{posts[0].readingTime}</span>
                  <span className={styles.readFull}>Read full post →</span>
                </div>
              </article>
            </Link>
          </div>
        )}

        {/* Post Grid */}
        <div className={styles.grid}>
          {posts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card-link">
              <article className="card">
                <div className={styles.postMeta}>
                  <span className={`tag ${categoryColorMap[post.category] ?? "tag-default"}`}>
                    {post.category.replace(/-/g, " ")}
                  </span>
                  <span className="text-subtle text-sm">{post.readingTime}</span>
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postSummary}>{post.summary}</p>
                {post.tags?.length > 0 && (
                  <div className={styles.postTags}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tag tag-default">{tag}</span>
                    ))}
                  </div>
                )}
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
                Add First Post →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
