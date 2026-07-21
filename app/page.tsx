import Link from "next/link";
import EditorialPhoto from "@/components/EditorialPhoto";
import NewsletterForm from "@/components/NewsletterForm";
import SectionHeader from "@/components/SectionHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { CircuitSprig } from "@/components/ornaments";
import {
  articleImage,
  articlesByCategory,
  articlesSorted,
  categories,
  categoryBySlug,
  categoryImage,
  faqItems,
} from "@/lib/data";

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
  const [feature, ...autres] = articlesSorted();
  const featureCat = feature ? categoryBySlug(feature.category) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader isHomepage />

      <main id="contenu" className="flex-1">
        {/* ——————— À la une ——————— */}
        {feature && featureCat ? (
          <section
            aria-labelledby="titre-une"
            className="mx-auto w-full max-w-[1240px] px-6 pb-16 pt-10"
          >
            <h2 id="titre-une" className="sr-only">
              À la une
            </h2>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
              <article className="rise rise-1">
                <Link
                  href={`/${feature.category}/${feature.slug}`}
                  className="group block"
                >
                  <figure className="relative aspect-[16/10] overflow-hidden bg-night">
                    <EditorialPhoto
                      image={articleImage(feature)}
                      seed={feature.seed}
                      tone={featureCat.tone}
                      glyph={featureCat.short.charAt(0)}
                      sizes="(min-width: 1024px) 56vw, 100vw"
                      priority
                    />
                  </figure>
                  <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
                    Comparatif — {featureCat.name}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-bold leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-[2.6rem]">
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
                aria-labelledby="titre-presentation"
                className="rise rise-2 lg:border-l lg:border-ink/15 lg:pl-10"
              >
                <h3
                  id="titre-presentation"
                  className="rule-double pt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink"
                >
                  Le Journal de la Tech
                </h3>
                <p className="mt-5 leading-relaxed text-ink-soft">
                  Média français indépendant consacré aux technologies qui font
                  tourner les entreprises et accélèrent la transition :
                  logiciels et SaaS, intelligence artificielle, hébergement web,
                  mobilité, énergie solaire et green tech.
                </p>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  Nos critères sont publics, nos sources citées, nos chiffres
                  datés. Aucune entreprise ne rémunère sa place dans nos
                  classements.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="#newsletter"
                    className="bg-rouge px-5 py-3 text-center font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-rouge-deep"
                  >
                    S&apos;abonner à la newsletter
                  </a>
                  <Link
                    href="/methodologie"
                    className="border border-ink/25 bg-card px-5 py-3 text-center font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-rouge hover:text-rouge"
                  >
                    Notre méthodologie
                  </Link>
                </div>

                {autres.length > 0 ? (
                  <ol className="mt-8 divide-y divide-ink/10 border-t border-ink/15">
                    {autres.slice(0, 4).map((a) => {
                      const c = categoryBySlug(a.category);
                      return (
                        <li key={a.slug}>
                          <Link
                            href={`/${a.category}/${a.slug}`}
                            className="group block py-4"
                          >
                            <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-rouge">
                              {c.name}
                            </span>
                            <span className="mt-1 block font-display text-lg font-medium leading-snug text-ink">
                              <span className="headline-link">{a.title}</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                ) : null}
              </aside>
            </div>
          </section>
        ) : null}

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
              {categories.map((c, i) => {
                const nb = articlesByCategory(c.slug).length;
                const media = (
                  <>
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
                      {nb > 0 ? (
                        <span className="headline-link">{c.name}</span>
                      ) : (
                        c.name
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {c.description}
                    </p>
                  </>
                );

                return (
                  <li key={c.slug}>
                    {nb > 0 ? (
                      <Link href={`/${c.slug}`} className="group block">
                        {media}
                        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-rouge">
                          {nb} article{nb > 1 ? "s" : ""} publié
                          {nb > 1 ? "s" : ""} →
                        </p>
                      </Link>
                    ) : (
                      media
                    )}
                  </li>
                );
              })}
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
