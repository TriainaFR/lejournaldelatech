import Link from "next/link";
import type { Article } from "@/lib/data";
import { categoryBySlug } from "@/lib/data";
import ArticleArt from "./ArticleArt";

/** Carte article réutilisée sur les pages rubrique / actualités / recherche. */
export default function ArticleCard({ article }: { article: Article }) {
  const cat = categoryBySlug(article.category);
  return (
    <article>
      <Link href={`/${article.category}/${article.slug}`} className="group block">
        <figure className="relative aspect-[16/9] overflow-hidden bg-night">
          <ArticleArt
            seed={article.seed}
            tone={cat.tone}
            glyph={cat.short.charAt(0)}
            className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.22,.61,.21,1)] group-hover:scale-[1.035]"
          />
        </figure>
        <p className="mt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-rouge">
          {cat.name}
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
          <span className="headline-link">{article.title}</span>
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {article.excerpt}
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
          <time dateTime={article.date}>{article.dateLabel}</time> · Lecture{" "}
          {article.readingTime} min
        </p>
      </Link>
    </article>
  );
}
