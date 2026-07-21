import Link from "next/link";
import { tickerItems } from "@/lib/data";
import DateStamp from "./DateStamp";
import Ticker from "./Ticker";
import { CircuitSprig, Diamond, Monogram } from "./ornaments";

/**
 * Mode pré-lancement : les rubriques n'ont pas encore de contenu publié,
 * elles sont donc affichées sans lien. Rebrancher les <Link> quand les
 * pages rubriques rouvriront.
 */
const NAV_ITEMS: string[] = [
  "Intelligence artificielle",
  "SaaS & Logiciels",
  "Hébergement",
  "Mobilité",
  "Énergie & Solaire",
  "Green tech",
  "Comparatifs",
];

export default function SiteHeader() {
  return (
    <>
      <header>
        {/* ——— Topbar ——— */}
        <div className="border-b border-ink/15 bg-paper-deep">
          <div className="mx-auto flex h-9 w-full max-w-[1240px] items-center justify-between gap-4 px-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
            <p className="hidden items-center gap-2 sm:flex">
              Édition du jour
              <Diamond className="text-[8px] text-silver-deep" />
              Ouverture prochaine
            </p>
            <p className="whitespace-nowrap">
              <DateStamp />
            </p>
            <p className="hidden items-center gap-4 lg:flex">
              <span>SaaS · IA · Hébergement · Mobilité · Énergie</span>
              <Link
                href="/#newsletter"
                className="font-semibold text-rouge transition-colors hover:text-rouge-deep"
              >
                S&apos;abonner à la newsletter
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
              <h1 className="font-masthead font-bold uppercase leading-[0.95] tracking-[0.04em] text-rouge">
                <Link href="/" className="block">
                  <span className="block text-4xl sm:text-5xl md:text-[3.4rem]">
                    Le Journal
                  </span>
                  <span className="block text-4xl sm:text-5xl md:text-[3.4rem]">
                    de la Tech
                  </span>
                </Link>
              </h1>
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

      {/* ——— Rubriques (hors <header> pour le sticky) — sans lien avant l'ouverture ——— */}
      <nav
        aria-label="Rubriques du journal (ouverture prochaine)"
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
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-1.5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft lg:gap-x-7 lg:text-xs">
            {NAV_ITEMS.map((label) => (
              <li key={label} className="shrink-0 cursor-default">
                {label}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="hidden shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-rouge sm:flex"
          >
            Nous écrire
          </Link>
        </div>
      </nav>

      {/* ——— Fil « en continu » ——— */}
      <Ticker items={tickerItems} />
    </>
  );
}
