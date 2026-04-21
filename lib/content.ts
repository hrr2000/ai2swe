import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { cacheLife, unstable_cacheLife } from "next/cache";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TutorialFrontmatter {
  title: string;
  module: number;
  lesson: number;
  slug: string;
  analogy: string;
  prerequisites?: string[];
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  lastUpdated: string;
  published?: boolean;
  summary?: string;
}

export interface Tutorial extends TutorialFrontmatter {
  content: string;
  readingTime: string;
}

export interface BlogFrontmatter {
  title: string;
  slug: string;
  date: string;
  author?: string;
  source?: string;
  sourceUrl?: string;
  coverImage?: string;
  tags: string[];
  readingTime?: string;
  summary: string;
  category: string;
  published?: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  content: string;
  readingTime: string;
}

export interface SyllabusLesson {
  slug: string;
  title: string;
  lesson: number;
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  published?: boolean;
}

export interface SyllabusModule {
  id: number;
  title: string;
  description: string;
  analogy: string;
  icon: string;
  color: string;
  lessons: SyllabusLesson[];
}

// ─── Tutorial Helpers ─────────────────────────────────────────────────────────

export async function getAllTutorials(): Promise<Tutorial[]> {
  "use cache";
  try {
    if (typeof cacheLife !== "undefined") cacheLife("days");
    else if (typeof unstable_cacheLife !== "undefined") unstable_cacheLife("days");
  } catch {}

  const dir = path.join(CONTENT_DIR, "tutorials");
  const tutorials: Tutorial[] = [];

  try {
    const moduleDirs = await fs.readdir(dir);
    for (const moduleDir of moduleDirs) {
      const modulePath = path.join(dir, moduleDir);
      const stat = await fs.stat(modulePath);
      if (!stat.isDirectory()) continue;

      const files = await fs.readdir(modulePath);
      for (const file of files) {
        if (!file.endsWith(".mdx")) continue;
        const raw = await fs.readFile(path.join(modulePath, file), "utf-8");
        const { data, content } = matter(raw);
        const rt = readingTime(content);
        tutorials.push({
          ...(data as TutorialFrontmatter),
          content,
          readingTime: rt.text,
        });
      }
    }
  } catch {
    return [];
  }

  return tutorials.sort((a, b) => {
    if (a.module !== b.module) return a.module - b.module;
    return a.lesson - b.lesson;
  });
}

export async function getTutorialBySlug(slug: string): Promise<Tutorial | null> {
  const all = await getAllTutorials();
  return all.find((t) => t.slug === slug) ?? null;
}

export async function getTutorialSlugs(): Promise<string[]> {
  const all = await getAllTutorials();
  return all.filter((t) => t.published !== false).map((t) => t.slug);
}

// ─── Blog Helpers ─────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<BlogPost[]> {
  "use cache";
  try {
    // Next.js versions differ on exact import, fallback to standard cache setup.
    if (typeof cacheLife !== "undefined") {
      cacheLife("days");
    } else if (typeof unstable_cacheLife !== "undefined") {
      unstable_cacheLife("days");
    }
  } catch (e) {
    // Ignore if not supported in this minor version
  }

  const dir = path.join(CONTENT_DIR, "blog");
  const posts: BlogPost[] = [];

  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      if (!file.endsWith(".mdx")) continue;
      const raw = await fs.readFile(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);
      posts.push({
        ...(data as BlogFrontmatter),
        content,
        readingTime: rt.text,
      });
    }
  } catch {
    return [];
  }

  return posts
    .filter((p) => p.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const all = await getAllPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getPostSlugs(): Promise<string[]> {
  const all = await getAllPosts();
  return all.map((p) => p.slug);
}

// ─── Syllabus ─────────────────────────────────────────────────────────────────

export async function getSyllabus(): Promise<SyllabusModule[]> {
  "use cache";
  try {
    if (typeof cacheLife !== "undefined") cacheLife("days");
    else if (typeof unstable_cacheLife !== "undefined") unstable_cacheLife("days");
  } catch {}
  
  try {
    const raw = await fs.readFile(
      path.join(CONTENT_DIR, "syllabus.json"),
      "utf-8"
    );
    return JSON.parse(raw) as SyllabusModule[];
  } catch {
    return [];
  }
}

// ─── Admin write helpers ─────────────────────────────────────────────────────

export async function savePost(
  slug: string,
  frontmatter: Record<string, unknown>,
  content: string
): Promise<void> {
  const dir = path.join(CONTENT_DIR, "blog");
  await fs.mkdir(dir, { recursive: true });
  const fileContent = matter.stringify(content, frontmatter);
  await fs.writeFile(path.join(dir, `${slug}.mdx`), fileContent, "utf-8");
}

export async function saveTutorial(
  moduleId: number,
  slug: string,
  frontmatter: Record<string, unknown>,
  content: string
): Promise<void> {
  const dir = path.join(CONTENT_DIR, "tutorials", `module-${moduleId}`);
  await fs.mkdir(dir, { recursive: true });
  const fileContent = matter.stringify(content, frontmatter);
  await fs.writeFile(path.join(dir, `${slug}.mdx`), fileContent, "utf-8");
}

export async function saveSyllabus(data: SyllabusModule[]): Promise<void> {
  await fs.writeFile(
    path.join(CONTENT_DIR, "syllabus.json"),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}
