import Link from "next/link";
import { tickerItems } from "@/lib/data";
import DateStamp from "./DateStamp";
import Ticker from "./Ticker";
import { CircuitSprig, Diamond, Monogram } from "./ornaments";

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Intelligence artificielle", href: "/intelligence-artificielle" },
  { label: "SaaS & Logiciels", href: "/saas-logiciels" },
  { label: "Hébergement", href: "/hebergement-web" },
  { label: "Mobilité", href: "/mobilite" },
  { label: "Énergie & Solaire", href: "/energie-solaire" },
  { label: "Green tech", href: "/green-tech" },
  { label: "Comparatifs", href: "/comparatifs" },
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
              Édition digitale
            </p>
            <p className="whitespace-nowrap">
              <DateStamp />
            </p>
            <p className="hidden items-center gap-4 lg:flex">
              <span>SaaS · IA · Hébergement · Mobilité · Énergie</span>
              <Link
                href="#newsletter"
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

      {/* ——— Navigation (hors <header> pour que sticky fonctionne) ——— */}
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
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-5 gap-y-1.5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink lg:gap-x-7 lg:text-xs">
            {NAV_LINKS.map((link) => (
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
            href="/recherche"
            className="hidden shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-rouge sm:flex"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <circle cx="9" cy="9" r="6" />
              <line x1="13.5" y1="13.5" x2="18" y2="18" />
            </svg>
            Recherche
          </Link>
        </div>
      </nav>

      {/* ——— Fil « en continu » ——— */}
      <Ticker items={tickerItems} />
    </>
  );
}
