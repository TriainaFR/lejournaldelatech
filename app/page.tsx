import Link from "next/link";
import EditorialPhoto from "@/components/EditorialPhoto";
import NewsletterForm from "@/components/NewsletterForm";
import SectionHeader from "@/components/SectionHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { CircuitSprig } from "@/components/ornaments";
import { categories, categoryImage, faqItems } from "@/lib/data";

const SITE_URL = "https://lejournaldelatech.fr";

export const metadata = {
  alternates: { canonical: "/" },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const ENGAGEMENTS: { title: string; text: string }[] = [
  {
    title: "Indépendance",
    text: "Aucune entreprise ne peut acheter sa place dans nos classements. La publicité, quand il y en a, est signalée et séparée de l'éditorial.",
  },
  {
    title: "Méthode publique",
    text: "Chaque test s'ouvre sur ses critères et leur pondération. Vous pouvez contester une note : nous publions les corrections.",
  },
  {
    title: "Utilité d'abord",
    text: "Des prix réels, des mesures reproductibles et des conseils applicables — plutôt que des communiqués de presse réécrits.",
  },
];

export default function Home() {
  const feature = categories[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />

      <main id="contenu" className="flex-1">
        {/* ——————— Ouverture ——————— */}
        <section
          aria-labelledby="titre-ouverture"
          className="mx-auto w-full max-w-[1240px] px-6 pb-16 pt-12"
        >
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[6fr_6fr] lg:gap-14">
            <div className="rise rise-1">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
                Nouveau média · France · 2026
              </p>
              <h2
                id="titre-ouverture"
                className="mt-4 font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl"
              >
                La tech utile, sans le bruit.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                Le Journal de la Tech est un média français indépendant consacré
                aux technologies qui font tourner les entreprises et accélèrent
                la transition : logiciels et SaaS, intelligence artificielle,
                hébergement web, mobilité, énergie solaire et green tech.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">
                La rédaction ouvre ses colonnes prochainement. Laissez-nous
                votre adresse pour recevoir le premier numéro.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#newsletter"
                  className="bg-rouge px-5 py-3 text-center font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-rouge-deep"
                >
                  Recevoir le premier numéro
                </a>
                <Link
                  href="/a-propos"
                  className="border border-ink/25 bg-card px-5 py-3 text-center font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-rouge hover:text-rouge"
                >
                  Qui sommes-nous
                </Link>
              </div>
            </div>

            <figure className="rise rise-2 relative aspect-[16/11] overflow-hidden bg-night">
              <EditorialPhoto
                image={categoryImage(feature)}
                seed={7}
                tone="rouge"
                sizes="(min-width: 1024px) 48vw, 100vw"
                priority
              />
            </figure>
          </div>
        </section>

        {/* ——————— Nos univers ——————— */}
        <section
          aria-labelledby="titre-univers"
          className="border-y border-ink/15 bg-paper-deep/60"
        >
          <div className="mx-auto w-full max-w-[1240px] px-6 py-16">
            <SectionHeader
              id="titre-univers"
              kicker="Notre ligne éditoriale"
              title="Ce que nous couvrons"
            />
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c, i) => (
                <li key={c.slug}>
                  <figure className="relative aspect-[16/9] overflow-hidden bg-night">
                    <EditorialPhoto
                      image={categoryImage(c)}
                      seed={41 + i * 13}
                      tone={c.tone}
                      glyph={c.short.charAt(0)}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </figure>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {c.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ——————— Nos engagements ——————— */}
        <section
          aria-labelledby="titre-engagements"
          className="mx-auto w-full max-w-[1240px] px-6 py-16"
        >
          <SectionHeader
            id="titre-engagements"
            kicker="Notre façon de travailler"
            title="Trois engagements"
          />
          <ol className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {ENGAGEMENTS.map((e, i) => (
              <li key={e.title} className="border-t-2 border-rouge pt-5">
                <p
                  aria-hidden="true"
                  className="font-mono text-sm font-semibold text-rouge"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                  {e.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{e.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-center">
            <Link
              href="/methodologie"
              className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-rouge transition-colors hover:text-rouge-deep"
            >
              Notre méthodologie détaillée <span aria-hidden="true">→</span>
            </Link>
          </p>
        </section>

        {/* ——————— Citation ——————— */}
        <section
          aria-label="Citation"
          className="border-y border-ink/15 bg-paper-deep/60"
        >
          <div className="mx-auto w-full max-w-[880px] px-6 py-16 text-center">
            <p
              aria-hidden="true"
              className="font-masthead text-7xl leading-none text-silver"
            >
              “
            </p>
            <blockquote className="mt-2 font-masthead text-2xl font-medium italic leading-snug text-ink sm:text-3xl">
              La meilleure façon de prédire l’avenir, c’est encore de
              l’inventer.
            </blockquote>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">
              — Alan Kay, pionnier de l’informatique
            </p>
          </div>
        </section>

        {/* ——————— Newsletter ——————— */}
        <section
          id="newsletter"
          aria-labelledby="titre-newsletter"
          className="bg-night text-paper"
        >
          <div className="mx-auto flex w-full max-w-[880px] flex-col items-center px-6 py-16 text-center">
            <CircuitSprig className="h-6 w-32 text-silver" />
            <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-silver">
              La newsletter du Journal
            </p>
            <h2
              id="titre-newsletter"
              className="mt-3 font-display text-3xl font-semibold sm:text-4xl"
            >
              La Dépêche Tech, chaque jeudi matin
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-silver-soft">
              Dès l’ouverture : nos enquêtes et nos bancs d’essai en
              avant-première, l’actualité décryptée et zéro publicité déguisée.
            </p>
            <div className="mt-7 flex w-full justify-center">
              <NewsletterForm />
            </div>
            <p className="mt-4 text-xs text-silver">
              Un e-mail par semaine. Désinscription en un clic.
            </p>
          </div>
        </section>

        {/* ——————— FAQ ——————— */}
        <section
          aria-labelledby="titre-faq"
          className="mx-auto w-full max-w-[880px] px-6 py-16"
        >
          <SectionHeader
            id="titre-faq"
            kicker="Les questions que vous nous posez"
            title="La tech en questions"
          />
          <div className="divide-y divide-ink/10 border-y border-ink/15">
            {faqItems.map((f) => (
              <details key={f.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 font-display text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl font-light text-rouge transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ——————— Manifeste ——————— */}
        <section
          id="manifeste"
          aria-labelledby="titre-manifeste"
          className="border-t border-ink/15 bg-paper-deep/60"
        >
          <div className="mx-auto flex w-full max-w-[880px] flex-col items-center px-6 py-16 text-center">
            <h2
              id="titre-manifeste"
              className="font-display text-3xl font-semibold text-ink"
            >
              Notre manifeste
            </h2>
            <CircuitSprig className="mt-4 h-5 w-28 text-silver-deep" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Le Journal de la Tech est un média indépendant. Aucune entreprise
              ne rémunère sa place dans nos classements, nos critères sont
              publics et nos tests sont recoupés. Nous croyons à une
              technologie utile, mesurable et durable — et nous la racontons
              sans le bruit.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <a
                href="#newsletter"
                className="bg-rouge px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-rouge-deep"
              >
                S&apos;abonner à la newsletter
              </a>
              <Link
                href="/charte-editoriale"
                className="border border-ink/25 bg-card px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-rouge hover:text-rouge"
              >
                Lire notre charte éditoriale
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
