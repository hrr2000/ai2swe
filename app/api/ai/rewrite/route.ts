import { NextResponse } from "next/server";
import { generateText } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { url, title, content } = await req.json();

    if (!content && !url) {
      return NextResponse.json({ error: "No content provided to rewrite." }, { status: 400 });
    }

    const prompt = `
      You are an expert technical writer for software engineers.
      Rewrite the following AI news article or blog post so that it is tailored to 
      software engineers. Remove heavy math, academic jargon, and marketing hype.
      Focus on WHAT it means for their code, HOW to use APIs, or WHY it matters structurally.
      Use an engaging title.
      
      Original Title: ${title || "Unknown"}
      Content:
      ${content?.substring(0, 5000)} // truncate to prevent max token limit
    `;

    const rewrittenContent = await generateText(prompt, { model: "gemini-flash-1.5" });

    return NextResponse.json({ result: rewrittenContent });
  } catch (err: any) {
    console.error("AI Rewrite Error:", err);
    return NextResponse.json({ error: "Failed to rewrite content" }, { status: 500 });
  }
}
