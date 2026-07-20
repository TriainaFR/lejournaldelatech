import Link from "next/link";
import ArticleArt from "@/components/ArticleArt";
import NewsletterForm from "@/components/NewsletterForm";
import SectionHeader from "@/components/SectionHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { CircuitSprig } from "@/components/ornaments";
import {
  articles,
  categories,
  categoryBySlug,
  comparatifsProgramme,
  faqItems,
  guides,
  intentTiles,
  popularSearches,
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
      "@type": "ItemList",
      "@id": `${SITE_URL}/#comparatifs-phares`,
      name: "Les comparatifs de référence du Journal de la Tech",
      itemListOrder: "https://schema.org/ItemListUnordered",
      numberOfItems: guides.length,
      itemListElement: guides.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: g.title,
        url: `${SITE_URL}/comparatifs/${g.slug}`,
      })),
    },
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
  const [feature, ...rest] = articles;
  const featureCategory = categoryBySlug(feature.category);
  const latest = rest.slice(0, 6);

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
              <Link href={`/${feature.category}/${feature.slug}`} className="group block">
                <figure className="relative aspect-[16/10] overflow-hidden bg-night">
                  <ArticleArt
                    seed={feature.seed}
                    tone={featureCategory.tone}
                    glyph={featureCategory.short.charAt(0)}
                    className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.22,.61,.21,1)] group-hover:scale-[1.035]"
                  />
                  <figcaption className="sr-only">
                    Illustration — {featureCategory.name}
                  </figcaption>
                </figure>
                <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
                  Enquête — {featureCategory.name}
                </p>
                <h3 className="mt-3 font-display text-3xl font-bold leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                  <span className="headline-link">{feature.title}</span>
                </h3>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                  {feature.excerpt}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                  Par {feature.author} ·{" "}
                  <time dateTime={feature.date}>{feature.dateLabel}</time> ·
                  Lecture {feature.readingTime} min
                </p>
              </Link>
            </article>

            <aside
              aria-label="Les comparatifs les plus consultés"
              className="rise rise-2 lg:border-l lg:border-ink/15 lg:pl-10"
            >
              <h3 className="rule-double pt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
                Les indispensables
              </h3>
              <ol className="mt-2 divide-y divide-ink/10">
                {guides.map((g, i) => (
                  <li key={g.slug}>
                    <Link
                      href={`/comparatifs/${g.slug}`}
                      className="group flex gap-5 py-5"
                    >
                      <span
                        aria-hidden="true"
                        className="font-mono text-2xl font-semibold leading-none text-silver-deep transition-colors group-hover:text-rouge"
                      >
                        {i + 1}
                      </span>
                      <span>
                        <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-rouge">
                          Guide d’achat
                        </span>
                        <span className="mt-1 block font-display text-lg font-medium leading-snug text-ink">
                          <span className="headline-link">{g.title}</span>
                        </span>
                        <span className="mt-1 block text-xs text-ink-faint">
                          {g.count}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              <Link
                href="/comparatifs"
                className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-rouge"
              >
                Tous les comparatifs <span aria-hidden="true">→</span>
              </Link>
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
                <Link
                  href={`/${c.slug}`}
                  className="group block border border-silver p-1.5 transition-colors hover:border-rouge"
                >
                  <figure className="relative aspect-[3/4] overflow-hidden bg-night">
                    <ArticleArt
                      seed={41 + i * 13}
                      tone={c.tone}
                      glyph={c.short.charAt(0)}
                      className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.22,.61,.21,1)] group-hover:scale-[1.05]"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/95 via-night/45 to-transparent px-3 pb-3 pt-10 text-center">
                      <span className="font-display text-base font-semibold leading-tight text-paper">
                        {c.name}
                      </span>
                    </figcaption>
                  </figure>
                </Link>
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
              title="Les comparatifs du moment"
              moreHref="/comparatifs"
              moreLabel="Tous les comparatifs"
            />
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
              {guides.map((g, i) => {
                const dominant = i === 0;
                return (
                  <article
                    key={g.slug}
                    className={dominant ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
                  >
                    <Link
                      href={`/comparatifs/${g.slug}`}
                      className="group block"
                    >
                      <figure
                        className={`relative overflow-hidden bg-night ${
                          dominant ? "aspect-[16/11]" : "aspect-[16/9]"
                        }`}
                      >
                        <ArticleArt
                          seed={g.seed}
                          tone={i % 2 === 0 ? "rouge" : "silver"}
                          className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.22,.61,.21,1)] group-hover:scale-[1.035]"
                        />
                      </figure>
                      <div className="relative">
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap border border-silver bg-card px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-rouge">
                          Comparatif
                        </span>
                      </div>
                      <h3
                        className={`mt-7 text-center font-display font-semibold leading-snug text-ink ${
                          dominant ? "text-2xl" : "text-lg"
                        }`}
                      >
                        <span className="headline-link">{g.title}</span>
                      </h3>
                      <p className="mt-2 text-center text-sm leading-relaxed text-ink-soft">
                        {g.description}
                      </p>
                      <p className="mt-2 text-center text-xs uppercase tracking-[0.16em] text-ink-faint">
                        {g.count}
                      </p>
                    </Link>
                  </article>
                );
              })}

              {/* 5e carte : l'article comparatif à la une, pour fermer la grille */}
              {(() => {
                const a = articles[1];
                const cat = categoryBySlug(a.category);
                return (
                  <article>
                    <Link href={`/${a.category}/${a.slug}`} className="group block">
                      <figure className="relative aspect-[16/9] overflow-hidden bg-night">
                        <ArticleArt
                          seed={a.seed}
                          tone={cat.tone}
                          className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(.22,.61,.21,1)] group-hover:scale-[1.035]"
                        />
                      </figure>
                      <div className="relative">
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap border border-silver bg-card px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-rouge">
                          {cat.short}
                        </span>
                      </div>
                      <h3 className="mt-7 text-center font-display text-lg font-semibold leading-snug text-ink">
                        <span className="headline-link">{a.title}</span>
                      </h3>
                      <p className="mt-2 text-center text-sm leading-relaxed text-ink-soft">
                        {a.excerpt.slice(0, 110)}…
                      </p>
                      <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                        <time dateTime={a.date}>{a.dateLabel}</time> · {a.readingTime} min
                      </p>
                    </Link>
                  </article>
                );
              })()}

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
                      <th scope="col" className="py-2">Mise à jour</th>
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
                        <td className="py-3 text-ink-soft">
                          <time dateTime={row.majIso}>{row.maj}</time>
                        </td>
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

        {/* ——————— L’actualité ——————— */}
        <section
          aria-labelledby="titre-actu"
          className="border-y border-ink/15 bg-paper-deep/60"
        >
          <div className="mx-auto w-full max-w-[1240px] px-6 py-16">
            <SectionHeader
              id="titre-actu"
              kicker="Le fil du journal"
              title="Les dernières actualités"
              moreHref="/actualites"
              moreLabel="Toute l’actualité"
            />
            <ul className="news-list grid grid-cols-1 gap-x-14 md:grid-cols-2">
              {latest.map((a) => {
                const cat = categoryBySlug(a.category);
                return (
                  <li
                    key={a.slug}
                    className="border-b border-ink/10 last:border-b-0"
                  >
                    <Link
                      href={`/${a.category}/${a.slug}`}
                      className="group flex gap-5 py-5"
                    >
                      <time
                        dateTime={a.date}
                        className="mt-0.5 shrink-0 border-l-2 border-rouge pl-3 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-soft"
                      >
                        {a.dateLabel.replace(" 2026", "")}
                      </time>
                      <span>
                        <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-rouge">
                          {cat.name}
                        </span>
                        <span className="mt-1 block font-display text-lg font-medium leading-snug text-ink">
                          <span className="headline-link">{a.title}</span>
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
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
                className="group relative border border-ink/20 bg-card p-5 transition-colors hover:border-rouge"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-1.5 border border-transparent transition-colors group-hover:border-silver"
                />
                <h3 className="font-display text-lg font-semibold leading-tight text-ink">
                  <Link href={tile.href}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {tile.title}
                  </Link>
                </h3>
                <p className="relative z-10 mt-3 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-soft">
                  {tile.keywords.map((k, i) => (
                    <Link
                      key={k.label}
                      href={k.href}
                      className="transition-colors hover:text-rouge"
                    >
                      {k.label}
                      {i < tile.keywords.length - 1 ? " ·" : ""}
                    </Link>
                  ))}
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

        {/* ——————— Manifeste + recherche ——————— */}
        <section
          id="recherche"
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
            <form
              action="/recherche"
              method="get"
              role="search"
              className="mt-8 flex w-full max-w-xl"
            >
              <label htmlFor="site-search" className="sr-only">
                Rechercher sur le site
              </label>
              <input
                id="site-search"
                type="search"
                name="q"
                placeholder="Un logiciel, un hébergeur, une solution…"
                className="h-12 flex-1 border border-ink/60 bg-card px-4 font-sans text-sm text-ink placeholder:text-ink-faint focus:border-rouge focus:outline-none focus:ring-1 focus:ring-rouge"
              />
              <button
                type="submit"
                className="h-12 shrink-0 cursor-pointer bg-rouge px-6 text-xs font-semibold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-rouge-deep"
              >
                Rechercher
              </button>
            </form>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                Recherches populaires :
              </span>
              {popularSearches.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="border border-ink/20 bg-card px-3 py-1 font-mono text-[11px] text-ink-soft transition-colors hover:border-rouge hover:text-rouge"
                >
                  {s.label}
                </Link>
              ))}
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
