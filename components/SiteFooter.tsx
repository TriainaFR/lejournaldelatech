import Link from "next/link";
import { Monogram } from "./ornaments";

const UNIVERS = [
  { label: "Intelligence artificielle", href: "/intelligence-artificielle" },
  { label: "SaaS & Logiciels", href: "/saas-logiciels" },
  { label: "Hébergement web", href: "/hebergement-web" },
  { label: "Mobilité", href: "/mobilite" },
  { label: "Énergie & Solaire", href: "/energie-solaire" },
  { label: "Green tech", href: "/green-tech" },
];

const GUIDES = [
  { label: "Meilleurs logiciels SaaS", href: "/comparatifs/meilleurs-logiciels-saas" },
  { label: "Meilleurs hébergeurs web", href: "/comparatifs/meilleurs-hebergeurs-web" },
  {
    label: "Meilleures entreprises solaires",
    href: "/comparatifs/meilleures-entreprises-panneaux-solaires",
  },
  { label: "Meilleurs outils IA", href: "/comparatifs/meilleurs-outils-ia" },
  { label: "Tous les comparatifs", href: "/comparatifs" },
];

const JOURNAL = [
  { label: "À propos & rédaction", href: "/a-propos" },
  { label: "Méthodologie des tests", href: "/methodologie" },
  { label: "Charte éditoriale", href: "/charte-editoriale" },
  { label: "Contact & partenariats", href: "/contact" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t-2 border-rouge bg-night text-paper">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-2 gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3">
            <Monogram className="h-11 w-11 text-[15px]" />
            <p className="font-masthead text-xl font-bold uppercase leading-tight tracking-wide">
              Le Journal
              <br />
              de la Tech
            </p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-silver">
            Le média français de la tech utile : SaaS, intelligence
            artificielle, hébergement, mobilité et énergie. Tests recoupés,
            comparatifs indépendants.
          </p>
          <p className="mt-4 font-masthead text-sm italic text-silver-soft">
            La tech, sans le bruit.
          </p>
        </div>

        <nav aria-labelledby="footer-univers">
          <h2
            id="footer-univers"
            className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-silver"
          >
            Univers
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {UNIVERS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-silver">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-guides">
          <h2
            id="footer-guides"
            className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-silver"
          >
            Comparatifs &amp; guides
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {GUIDES.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="transition-colors hover:text-silver">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-journal" className="col-span-2 md:col-span-1">
          <h2
            id="footer-journal"
            className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-silver"
          >
            Le Journal
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {JOURNAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-silver">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-paper/15">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-silver md:flex-row">
          <p>© 2026 Le Journal de la Tech — Tous droits réservés.</p>
          <p className="text-center md:text-right">
            Média indépendant : aucune entreprise ne rémunère sa place dans nos
            comparatifs.
          </p>
        </div>
      </div>
    </footer>
  );
}
