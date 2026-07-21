import Link from "next/link";
import type { Article } from "@/lib/data";
import { articleImage, categoryBySlug } from "@/lib/data";
import EditorialPhoto from "./EditorialPhoto";

/** Carte article réutilisée sur la home et les pages rubrique. */
export default function ArticleCard({
  article,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  article: Article;
  sizes?: string;
}) {
  const cat = categoryBySlug(article.category);
  return (
    <article>
      <Link href={`/${article.category}/${article.slug}`} className="group block">
        <figure className="relative aspect-[16/9] overflow-hidden bg-night">
          <EditorialPhoto
            image={articleImage(article)}
            seed={article.seed}
            tone={cat.tone}
            glyph={cat.short.charAt(0)}
            sizes={sizes}
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
