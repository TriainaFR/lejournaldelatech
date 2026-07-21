import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import PageShell from "@/components/PageShell";

const SITE_URL = "https://lejournaldelatech.fr";

export const metadata: Metadata = {
  title: "Contact & partenariats",
  description:
    "Contacter la rédaction du Journal de la Tech : proposer un sujet, signaler une erreur, exercer un droit de réponse ou discuter d'un partenariat.",
  alternates: { canonical: "/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact#page`,
      url: `${SITE_URL}/contact`,
      name: "Contact & partenariats — Le Journal de la Tech",
      inLanguage: "fr-FR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <PageShell
      kicker="Le Journal"
      title="Nous écrire"
      intro="Un sujet à proposer, une erreur à signaler, un partenariat à discuter ? La rédaction répond sous deux jours ouvrés."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <ContactForm />
        </div>

        <aside className="space-y-6">
          <div className="border border-ink/15 bg-paper-deep/60 p-6">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-rouge">
              Signaler une erreur
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Une erreur de calcul, un chiffre contestable, une source à
              actualiser ? Les corrections sont vérifiées, publiées et datées,
              comme le prévoit notre{" "}
              <Link
                href="/charte-editoriale"
                className="font-semibold text-rouge hover:text-rouge-deep"
              >
                charte éditoriale
              </Link>
              .
            </p>
          </div>

          <div className="border border-ink/15 bg-card p-6">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-rouge">
              Partenariats &amp; publicité
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Formats publicitaires signalés, études, événements : utilisez le
              formulaire avec l&apos;objet correspondant.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Rappel : aucune entreprise ne peut acheter sa place dans nos
              classements, quelle que soit la nature du partenariat.
            </p>
          </div>

          <div className="border border-ink/15 bg-card p-6">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-rouge">
              Délai de réponse
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              La rédaction traite les messages sous deux jours ouvrés. Les
              signalements d&apos;erreur sont prioritaires.
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
