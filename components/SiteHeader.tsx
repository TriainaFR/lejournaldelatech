import Link from "next/link";
import { activeCategories, articlesSorted } from "@/lib/data";
import { labelFromIso, todayIso } from "@/lib/date";
import DateStamp from "./DateStamp";
import { CircuitSprig, Diamond, Monogram } from "./ornaments";

/**
 * Navigation : rubriques qui ont au moins un article publié, puis les pages
 * institutionnelles. Une rubrique apparaît automatiquement dès son premier
 * article.
 */
const PAGES: { label: string; href: string }[] = [
  { label: "Le Journal", href: "/a-propos" },
  { label: "Méthodologie", href: "/methodologie" },
  { label: "Contact", href: "/contact" },
];

/**
 * `isHomepage` : sur l'accueil, le titre du journal est le <h1> de la page.
 * Ailleurs, le <h1> appartient au contenu (titre d'article ou de page) et le
 * wordmark n'est qu'un logo.
 */
export default function SiteHeader({
  isHomepage = false,
}: {
  isHomepage?: boolean;
}) {
  // Date du build : sert de valeur d'hydratation, le client affiche ensuite
  // toujours la date réelle du visiteur.
  const initialIso = todayIso();
  const initialLabel = labelFromIso(initialIso);
  const Wordmark = isHomepage ? "h1" : "p";

  const rubriques = activeCategories().map((c) => ({
    label: c.name,
    href: `/${c.slug}`,
  }));
  const navLinks = [...rubriques, ...PAGES];
  const dernier = articlesSorted()[0];

  return (
    <>
      <header>
        {/* ——— Topbar ——— */}
        <div className="border-b border-ink/15 bg-paper-deep">
          <div className="mx-auto flex h-9 w-full max-w-[1240px] items-center justify-between gap-4 px-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
            <p className="hidden items-center gap-2 sm:flex">
              Édition digitale
              <Diamond className="text-[8px] text-silver-deep" />
              France
            </p>
            <p className="whitespace-nowrap">
              <DateStamp initialIso={initialIso} initialLabel={initialLabel} />
            </p>
            <p className="hidden items-center gap-4 lg:flex">
              <span>SaaS · IA · Hébergement · Mobilité · Énergie</span>
              <Link
                href="/contact"
                className="font-semibold text-rouge transition-colors hover:text-rouge-deep"
              >
                Nous écrire
              </Link>
            </p>
          </div>
        </div>

        {/* ——— Masthead ——— */}
        <div className="border-b border-ink/15 bg-paper">
          <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-6 px-6 py-8 md:grid-cols-[1fr_auto_1fr] md:py-10">
            <div className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft md:block">
              <p className="font-semibold text-ink">France</p>
              <p className="mt-1">Le média de la tech utile &amp; durable</p>
            </div>

            <div className="rise text-center">
              <CircuitSprig className="mx-auto mb-3 h-6 w-32 text-silver-deep" />
              <Wordmark className="font-masthead font-bold uppercase leading-[0.95] tracking-[0.04em] text-rouge">
                <Link href="/" className="block">
                  <span className="block text-4xl sm:text-5xl md:text-[3.4rem]">
                    Le Journal
                  </span>
                  <span className="block text-4xl sm:text-5xl md:text-[3.4rem]">
                    de la Tech
                  </span>
                </Link>
              </Wordmark>
              <p className="mx-auto mt-3 max-w-md text-[11px] uppercase tracking-[0.24em] text-ink-soft">
                SaaS · Intelligence artificielle · Hébergement · Mobilité · Tech
                durable
              </p>
            </div>

            <div className="hidden text-right font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft md:block">
              <p className="font-semibold text-ink">Fondé en 2026</p>
              <p className="mt-1">Indépendant &amp; sans concession</p>
            </div>
          </div>
        </div>
      </header>

      {/* ——— Navigation (hors <header> pour que le sticky fonctionne) ——— */}
      <nav
        aria-label="Navigation principale"
        className="border-b border-ink/15 bg-paper/95 backdrop-blur-sm md:sticky md:top-0 md:z-40"
      >
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-3 px-6">
          <Link
            href="/"
            aria-label="Accueil — Le Journal de la Tech"
            className="shrink-0 py-2"
          >
            <Monogram className="h-9 w-9 text-[13px] tracking-[-0.06em]" />
          </Link>
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-6 gap-y-1.5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink lg:gap-x-8 lg:text-xs">
            {navLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <Link
                  href={link.href}
                  className="transition-colors hover:text-rouge"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/articles"
            className="hidden shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-rouge transition-colors hover:text-rouge-deep sm:flex"
          >
            Tous les articles
          </Link>
        </div>
      </nav>

      {/* ——— Bandeau : dernière publication ——— */}
      {dernier ? (
        <div className="border-b border-night/40 bg-night text-paper">
          <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-2.5 text-center font-mono text-[11px] tracking-wide">
            <span className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.18em] text-rouge-bright">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-rouge-bright"
              />
              À la une
            </span>
            <Link
              href={`/${dernier.category}/${dernier.slug}`}
              className="text-silver underline decoration-transparent underline-offset-4 transition-colors hover:text-paper hover:decoration-current"
            >
              {dernier.title}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
