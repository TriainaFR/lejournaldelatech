import * as claudeVsChatgpt from "@/content/articles/claude-vs-chatgpt";
import * as meilleurHebergeurWeb2026 from "@/content/articles/meilleur-hebergeur-web-2026";
import * as meilleurHebergeurWordpress from "@/content/articles/meilleur-hebergeur-wordpress";
import * as notionVsObsidian from "@/content/articles/notion-vs-obsidian";

export type ArticleContent = {
  html: string;
  toc: { id: string; text: string }[];
  faq: { question: string; answer: string }[];
  sources: { url: string; label: string }[];
};

/** Corps des articles publiés, indexé par slug. */
const CONTENTS: Record<string, ArticleContent> = {
  "claude-vs-chatgpt": claudeVsChatgpt,
  "meilleur-hebergeur-web-2026": meilleurHebergeurWeb2026,
  "meilleur-hebergeur-wordpress": meilleurHebergeurWordpress,
  "notion-vs-obsidian": notionVsObsidian,
};

export function articleContent(slug: string): ArticleContent | undefined {
  return CONTENTS[slug];
}
