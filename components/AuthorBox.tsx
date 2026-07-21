import Link from "next/link";
import type { Article } from "@/lib/data";
import { authorBySlug, authorHref } from "@/lib/authors";
import { Monogram } from "./ornaments";

/** Encadré auteur en pied d'article : expertise, contact et méthodologie. */
export default function AuthorBox({ article }: { article: Article }) {
  const author = authorBySlug(article.author);

  return (
    <div className="border-t-2 border-rouge bg-paper-deep/60 p-6">
      <div className="flex items-start gap-4">
        <Monogram className="mt-1 h-11 w-11 shrink-0 text-[15px]" />
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-rouge">
            L&apos;auteur
          </p>
          <h2 className="mt-1 font-display text-xl font-semibold text-ink">
            <Link
              href={authorHref(author.slug)}
              rel="author"
              className="transition-colors hover:text-rouge"
            >
              {author.name}
            </Link>
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            {author.role}
          </p>
          <p className="mt-3 leading-relaxed text-ink-soft">{author.bio}</p>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em]">
            <Link
              href={authorHref(author.slug)}
              className="text-rouge hover:text-rouge-deep"
            >
              Tous ses articles →
            </Link>
            {author.sameAs.map((url) => (
              <a
                key={url}
                href={url}
                rel="noopener noreferrer me"
                target="_blank"
                className="text-rouge hover:text-rouge-deep"
              >
                LinkedIn →
              </a>
            ))}
            <Link href="/contact" className="text-rouge hover:text-rouge-deep">
              Signaler une erreur →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
