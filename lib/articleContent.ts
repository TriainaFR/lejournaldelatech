import * as claudeVsChatgpt from "@/content/articles/claude-vs-chatgpt";

export type ArticleContent = {
  html: string;
  toc: { id: string; text: string }[];
  faq: { question: string; answer: string }[];
  sources: { url: string; label: string }[];
};

/** Corps des articles publiés, indexé par slug. */
const CONTENTS: Record<string, ArticleContent> = {
  "claude-vs-chatgpt": claudeVsChatgpt,
};

export function articleContent(slug: string): ArticleContent | undefined {
  return CONTENTS[slug];
}
