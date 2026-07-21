import Link from "next/link";
import type { Article } from "@/lib/data";
import { authorBySlug, authorHref } from "@/lib/authors";

/** Signature en tête d'article : qui écrit, quand, et comment il a travaillé. */
export default function AuthorByline({ article }: { article: Article }) {
  const author = authorBySlug(article.author);

  return (
    <div className="mt-5 border-t border-ink/15 pt-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
        Par{" "}
        <Link
          href={authorHref(author.slug)}
          rel="author"
          className="font-semibold text-ink transition-colors hover:text-rouge"
        >
          {author.name}
        </Link>
        {" · "}
        <time dateTime={article.date}>Publié le {article.dateLabel}</time>
        {article.updated && article.updatedLabel ? (
          <>
            {" · "}
            <time dateTime={article.updated}>
              Mis à jour le {article.updatedLabel}
            </time>
          </>
        ) : null}
        {" · "}Lecture {article.readingTime} min
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
        {author.role}
      </p>
      {article.authorNote ? (
        <p className="mt-3 border-l-2 border-rouge pl-3 text-sm leading-relaxed text-ink-soft">
          {article.authorNote}
        </p>
      ) : null}
    </div>
  );
}
