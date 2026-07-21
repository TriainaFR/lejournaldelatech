import Link from "next/link";
import EditorialPhoto from "@/components/EditorialPhoto";
import NewsletterForm from "@/components/NewsletterForm";
import SectionHeader from "@/components/SectionHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { CircuitSprig } from "@/components/ornaments";
import {
  categories,
  categoryImage,
  comparatifsProgramme,
  faqItems,
  guideImage,
  guides,
  intentTiles,
  stats,
} from "@/lib/data";

const SITE_URL = "https://lejournaldelatech.fr";

export const metadata = {
  alternates: { canonical: "/" },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default function Home() {
  const [featureGuide, ...railGuides] = guides;

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
        {/* ——————— À la une ——————— */}
        <section
          aria-labelledby="titre-une"
          className="mx-auto w-full max-w-[1240px] px-6 pb-16 pt-10"
        >
          <h2 id="titre-une" className="sr-only">
            À la une
          </h2>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[7.2fr_4.8fr] lg:gap-14">
            <article className="rise rise-1">
              <figure className="relative aspect-[16/10] overflow-hidden bg-night">
                <EditorialPhoto
                  image={guideImage(featureGuide)}
                  seed={featureGuide.seed}
                  tone="rouge"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  priority
                />
                <span className="absolute left-4 top-4 z-10 bg-rouge px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                  À paraître
                </span>
              </figure>
              <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
                À la une — Guide d&apos;achat
              </p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                {featureGuide.title}
              </h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {featureGuide.description}
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                {featureGuide.count} · Critères publics · Publication été 2026
              </p>
              <a
                href="#newsletter"
                className="mt-6 inline-block bg-rouge px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-rouge-deep"
              >
                Être averti de la publication
              </a>
            </article>

            <aside
              aria-label="Les comparatifs les plus consultés"
              className="rise rise-2 lg:border-l lg:border-ink/15 lg:pl-10"
            >
              <h3 className="rule-double pt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
                Les indispensables
              </h3>
              <ol className="mt-2 divide-y divide-ink/10">
                {railGuides.map((g, i) => (
                  <li key={g.slug} className="flex gap-5 py-5">
                    <span
                      aria-hidden="true"
                      className="font-mono text-2xl font-semibold leading-none text-silver-deep"
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-rouge">
                        Guide d’achat — À paraître
                      </span>
                      <span className="mt-1 block font-display text-lg font-medium leading-snug text-ink">
                        {g.title}
                      </span>
                      <span className="mt-1 block text-xs text-ink-faint">
                        {g.count}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>

        {/* ——————— Le média, en bref ——————— */}
        <section
          aria-labelledby="titre-bref"
          className="border-y border-ink/15 bg-paper-deep/60"
        >
          <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-10 px-6 py-12 md:grid-cols-[1.2fr_2fr]">
            <div>
              <h2
                id="titre-bref"
                className="font-display text-2xl font-semibold text-ink"
              >
                Le média, en bref
              </h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Le Journal de la Tech teste, compare et classe les solutions
                technologiques qui comptent : logiciels, hébergeurs,
                installateurs solaires, outils d’IA. Méthodologie publique,
                tests recoupés, zéro complaisance.
              </p>
              <Link
                href="/methodologie"
                className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-rouge transition-colors hover:text-rouge-deep"
              >
                Notre méthodologie <span aria-hidden="true">→</span>
              </Link>
            </div>
            <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col border-l-2 border-silver pl-5"
                >
                  <dt className="order-2 mt-1 text-sm text-ink-soft">
                    {s.label}
                  </dt>
                  <dd className="order-1 font-mono text-5xl font-semibold text-rouge">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ——————— Nos univers ——————— */}
        <section
          aria-labelledby="titre-univers"
          className="mx-auto w-full max-w-[1240px] px-6 py-16"
        >
          <SectionHeader
            id="titre-univers"
            kicker="Explorer"
            title="Nos univers"
          />
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c, i) => (
              <li key={c.slug}>
                <div className="border border-silver p-1.5">
                  <figure className="relative aspect-[3/4] overflow-hidden bg-night">
                    <EditorialPhoto
                      image={categoryImage(c)}
                      seed={41 + i * 13}
                      tone={c.tone}
                      glyph={c.short.charAt(0)}
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/95 via-night/45 to-transparent px-3 pb-3 pt-10 text-center">
                      <span className="font-display text-base font-semibold leading-tight text-paper">
                        {c.name}
                      </span>
                    </figcaption>
                  </figure>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ——————— Les comparatifs du moment ——————— */}
        <section
          aria-labelledby="titre-comparatifs"
          className="border-y border-ink/15 bg-paper-deep/60"
        >
          <div className="mx-auto w-full max-w-[1240px] px-6 py-16">
            <SectionHeader
              id="titre-comparatifs"
              kicker="Sélections & guides d’achat"
              title="Les comparatifs à paraître"
            />
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {railGuides.map((g, i) => (
                <article
                  key={g.slug}
                  className={i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
                >
                  <figure className="relative aspect-[16/9] overflow-hidden bg-night">
                    <EditorialPhoto
                      image={guideImage(g)}
                      seed={g.seed}
                      tone={i % 2 === 0 ? "silver" : "rouge"}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </figure>
                  <div className="relative">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap border border-silver bg-card px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-rouge">
                      À paraître
                    </span>
                  </div>
                  <h3 className="mt-7 text-center font-display text-lg font-semibold leading-snug text-ink">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-center text-sm leading-relaxed text-ink-soft">
                    {g.description}
                  </p>
                  <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                    {g.count}
                  </p>
                </article>
              ))}

              {/* Table extractible : le programme des bancs d’essai */}
              <div className="border border-ink/15 bg-card p-6 sm:col-span-2 lg:col-span-3">
                <h3 className="font-display text-xl font-semibold text-ink">
                  Au programme de la rédaction
                </h3>
                <table className="mt-4 w-full border-collapse text-left text-sm">
                  <caption className="sr-only">
                    Comparatifs en cours de publication et leur dernière mise à
                    jour
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-rouge font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                      <th scope="col" className="py-2 pr-3">Comparatif</th>
                      <th scope="col" className="hidden py-2 pr-3 md:table-cell">
                        Univers
                      </th>
                      <th scope="col" className="py-2 pr-3">Volume</th>
                      <th scope="col" className="py-2">Publication</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    {comparatifsProgramme.map((row) => (
                      <tr key={row.comparatif}>
                        <th scope="row" className="py-3 pr-3 font-medium text-ink">
                          {row.comparatif}
                        </th>
                        <td className="hidden py-3 pr-3 text-ink-soft md:table-cell">
                          {row.univers}
                        </td>
                        <td className="py-3 pr-3 text-ink-soft">{row.volume}</td>
                        <td className="py-3 text-ink-soft">{row.maj}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ——————— Citation ——————— */}
        <section
          aria-label="Citation"
          className="mx-auto w-full max-w-[880px] px-6 py-20 text-center"
        >
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
        </section>


        {/* ——————— Chaque projet, sa solution ——————— */}
        <section
          aria-labelledby="titre-projets"
          className="mx-auto w-full max-w-[1240px] px-6 py-16"
        >
          <SectionHeader
            id="titre-projets"
            kicker="Que choisir pour…"
            title="Chaque projet, sa solution"
          />
          <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-6">
            {intentTiles.map((tile) => (
              <li
                key={tile.title}
                className="relative border border-ink/20 bg-card p-5"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-1.5 border border-silver-soft"
                />
                <h3 className="font-display text-lg font-semibold leading-tight text-ink">
                  {tile.title}
                </h3>
                <p className="relative z-10 mt-3 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-soft">
                  {tile.keywords.map((k) => k.label).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ——————— Newsletter ——————— */}
        <section
          id="newsletter"
          aria-labelledby="titre-newsletter"
          className="border-y border-night bg-night text-paper"
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
              L’essentiel de la tech utile : nos comparatifs en avant-première,
              les actualités décryptées et zéro publicité déguisée.
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
              ne rémunère sa place dans nos comparatifs, nos critères sont
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
