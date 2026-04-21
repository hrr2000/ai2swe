import * as cheerio from "cheerio";

export interface ScrapedArticle {
  title: string;
  url: string;
  content: string;
  source: string;
}

/**
 * Scrapes an AI article and extracts its text body, ignoring scripts and nav.
 * Usage: Provides raw context to Gemini to rewrite.
 */
export async function scrapeArticle(url: string): Promise<ScrapedArticle | null> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove noisy elements
    $("script, style, nav, header, footer, iframe, aside, .ad, .sponsor").remove();

    // Extract title (looks for main <h1> or falls back to title)
    let title = $("h1").first().text().trim();
    if (!title) {
      title = $("title").text().replace(/ - .*$/, "").trim();
    }

    // Extract content. Target likely content blocks.
    let content = "";
    const articleNode = $("article, main, .content, .post-content").first();
    
    if (articleNode.length > 0) {
      content = articleNode.text();
    } else {
      content = $("body").text();
    }

    // Basic cleanup
    content = content.replace(/\s+/g, " ").trim();

    return {
      title,
      url,
      content,
      source: new URL(url).hostname,
    };
  } catch (error) {
    console.error(`Scraping failed for ${url}:`, error);
    return null;
  }
}
