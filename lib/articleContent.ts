import * as claudeVsChatgpt from "@/content/articles/claude-vs-chatgpt";
import * as meilleurHebergeurWordpress from "@/content/articles/meilleur-hebergeur-wordpress";

export type ArticleContent = {
  html: string;
  toc: { id: string; text: string }[];
  faq: { question: string; answer: string }[];
  sources: { url: string; label: string }[];
};

/** Corps des articles publiés, indexé par slug. */
const CONTENTS: Record<string, ArticleContent> = {
  "claude-vs-chatgpt": claudeVsChatgpt,
  "meilleur-hebergeur-wordpress": meilleurHebergeurWordpress,
};

export function articleContent(slug: string): ArticleContent | undefined {
  return CONTENTS[slug];
}
