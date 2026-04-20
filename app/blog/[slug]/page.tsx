import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

const categoryColorMap: Record<string, string> = {
  "model-releases":       "tag-violet",
  "tools-and-frameworks": "tag-blue",
  "research-simplified":  "tag-cyan",
  "industry-moves":       "tag-amber",
  "tutorials-and-guides": "tag-emerald",
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Dynamically import MDX content
  let Content: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/blog/${slug}.mdx`);
    Content = mod.default;
  } catch {
    Content = null;
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          <article className={styles.article}>
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
              <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
              <span className={styles.breadcrumbSep}>›</span>
              <span className={styles.breadcrumbCurrent}>{post.category.replace(/-/g, " ")}</span>
            </nav>

            {/* Header */}
            <header className={styles.header}>
              <div className={styles.metaRow}>
                <span className={`tag ${categoryColorMap[post.category] ?? "tag-default"}`}>
                  {post.category.replace(/-/g, " ")}
                </span>
                <span className="text-subtle text-sm">{post.readingTime}</span>
                {post.source && (
                  <a
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceLink}
                  >
                    Source: {post.source} ↗
                  </a>
                )}
              </div>

              <h1 className={styles.title}>{post.title}</h1>
              <p className={styles.summary}>{post.summary}</p>

              <div className={styles.dateLine}>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </time>
                {post.author && <span>by {post.author}</span>}
              </div>

              {post.tags?.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag tag-default">{tag}</span>
                  ))}
                </div>
              )}
            </header>

            {/* Content */}
            <div className={`prose ${styles.prose}`}>
              {Content ? <Content /> : (
                <div className={styles.noContent}>
                  <p>Content loading failed. View the source post instead.</p>
                  {post.sourceUrl && (
                    <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                      View Original →
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Back */}
            <div className={styles.backRow}>
              <Link href="/blog" className="btn btn-secondary">
                ← Back to Blog
              </Link>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
