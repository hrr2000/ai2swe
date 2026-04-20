import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  console.warn("[Gemini] GEMINI_API_KEY not set. AI features will not work.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

// Text model for rewriting, expansion, summarization
export const textModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

// Structured output model for metadata extraction and JSON responses
export const structuredModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
  },
});

// ─── Blog Rewriting ───────────────────────────────────────────────────────────

const REWRITE_SYSTEM_PROMPT = `You are a technical writer for "AI Teachers", a platform that explains AI to software engineers.

RULES:
1. Rewrite the given AI news article so it's immediately useful to a software engineer.
2. Use software engineering analogies (APIs, data structures, design patterns, DevOps, system architecture).
3. NEVER use mathematical notation without showing the code equivalent first.
4. Start with a "## TL;DR for Engineers" section (3-5 bullet points).
5. Include a "## What This Means for Your Code" section with practical impact.
6. Add code examples in TypeScript or Python where relevant.
7. Include a "## Should You Care?" section with an honest 1-paragraph assessment.
8. Tone: Smart, direct, slightly opinionated — like a senior engineer explaining to a peer.
9. Target reader: Someone who knows React and Node.js but not machine learning.
10. Output: Clean Markdown (no frontmatter).`;

export async function rewriteArticleForEngineers(article: {
  title: string;
  content: string;
  source: string;
}): Promise<string> {
  const prompt = `${REWRITE_SYSTEM_PROMPT}

Rewrite this AI news article for software engineers:

SOURCE: ${article.source}
TITLE: ${article.title}

ORIGINAL CONTENT:
${article.content}`;

  const result = await textModel.generateContent(prompt);
  return result.response.text();
}

// ─── Tutorial Content Expansion ────────────────────────────────────────────────

const EXPAND_SYSTEM_PROMPT = `You are a curriculum designer for "AI Teachers". You write tutorial content that explains AI/ML concepts using software engineering analogies.

RULES:
1. Primary explanation: software engineering analogies (data structures, design patterns, system architecture, DevOps).
2. NEVER lead with math. If math is necessary, always show the code equivalent first.
3. Structure: Analogy intro → How it works → Code example → Visual suggestion → Exercise.
4. Use Python and TypeScript for code examples.
5. Use MDX callout components: <Callout type="insight">...</Callout> for key points.
6. Use MDX analogy components: <AnalogyBox code="..." ai="..." /> for comparisons.
7. Include a "## Try It Yourself" section at the end with a practical exercise.
8. Tone: Mentor explaining to a curious engineer. Patient but not patronizing.
9. Output: MDX-compatible Markdown (no frontmatter).`;

export async function expandTutorialContent(params: {
  title: string;
  analogy: string;
  module: number;
  existingOutline?: string;
}): Promise<string> {
  const prompt = `${EXPAND_SYSTEM_PROMPT}

Write a complete tutorial lesson:

TITLE: ${params.title}
CORE ANALOGY: ${params.analogy}
MODULE: ${params.module} (${getModuleName(params.module)})
${params.existingOutline ? `OUTLINE TO EXPAND:\n${params.existingOutline}` : ""}

Generate the full lesson content.`;

  const result = await textModel.generateContent(prompt);
  return result.response.text();
}

// ─── Blog Image Generation ────────────────────────────────────────────────────

export async function generateBlogImagePrompt(post: {
  title: string;
  summary: string;
  tags: string[];
}): Promise<string> {
  // Returns an optimized image generation prompt
  const prompt = `Create a concise, detailed image generation prompt for a tech blog cover image.

Blog post title: "${post.title}"
Summary: "${post.summary}"
Tags: ${post.tags.join(", ")}

Requirements for the image:
- Dark background with deep navy/purple tones (#08080f to #1a1a2e)
- Modern, abstract, geometric design
- Tech/circuit/data visualization elements
- Electric blue, violet, or cyan accent colors
- Clean, professional, developer aesthetic
- NO text, NO people, NO logos
- 16:9 landscape format
- Style: similar to Vercel blog headers, GitHub Universe

Output: A single, detailed prompt string ready for an image generation API. No other text.`;

  const result = await textModel.generateContent(prompt);
  return result.response.text().trim();
}

// ─── Post Metadata Extraction ─────────────────────────────────────────────────

export interface ExtractedPostMeta {
  suggestedTitle: string;
  summary: string;
  tags: string[];
  category: string;
  relevanceScore: number;
  keyTakeaways: string[];
}

export async function extractPostMetadata(content: string): Promise<ExtractedPostMeta> {
  const prompt = `Extract structured metadata from this AI news article for a developer blog. Return a JSON object with:
- suggestedTitle: string (engineer-friendly headline)
- summary: string (2 sentences max, what engineers need to know)
- tags: string[] (3-6 lowercase tags)
- category: one of ["model-releases","tools-and-frameworks","research-simplified","industry-moves","tutorials-and-guides","opinions"]
- relevanceScore: number 1-10 (how relevant to software engineers)
- keyTakeaways: string[] (3-5 bullet points for engineers)

Article content:
${content.slice(0, 3000)}`;

  const result = await structuredModel.generateContent(prompt);
  try {
    return JSON.parse(result.response.text()) as ExtractedPostMeta;
  } catch {
    return {
      suggestedTitle: "AI News Update",
      summary: "Latest AI news update.",
      tags: ["ai", "news"],
      category: "industry-moves",
      relevanceScore: 5,
      keyTakeaways: [],
    };
  }
}

// ─── Topic Suggestions ────────────────────────────────────────────────────────

export async function suggestTutorialTopics(existingSlugs: string[]): Promise<
  Array<{ title: string; analogy: string; module: number; rationale: string }>
> {
  const prompt = `You are a curriculum designer for an AI education platform targeting software engineers.

Existing tutorial slugs: ${existingSlugs.slice(0, 30).join(", ")}

Suggest 5 new tutorial topics that are:
1. Missing from the current syllabus
2. Highly relevant to AI in 2025-2026
3. Explainable through software engineering analogies

Return a JSON array of objects with: title, analogy, module (0-10), rationale`;

  const result = await structuredModel.generateContent(prompt);
  try {
    return JSON.parse(result.response.text());
  } catch {
    return [];
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getModuleName(moduleId: number): string {
  const names: Record<number, string> = {
    0: "Mental Model Shift",
    1: "Neural Networks",
    2: "Embeddings",
    3: "Tokenization",
    4: "Transformers",
    5: "Large Language Models",
    6: "Prompt Engineering",
    7: "Training & Fine-Tuning",
    8: "Inference & Deployment",
    9: "RAG & AI Applications",
    10: "Multimodal & Frontier AI",
  };
  return names[moduleId] ?? `Module ${moduleId}`;
}
