import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "À propos & rédaction",
  description:
    "Le Journal de la Tech est un média français indépendant : SaaS, IA, hébergement, mobilité et tech durable. Qui nous sommes, comment nous travaillons.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <PageShell
      kicker="Le Journal"
      title="À propos & rédaction"
      intro="Le Journal de la Tech est un média français indépendant, édité par Triaina, consacré à la tech utile : celle qui équipe les entreprises et accélère la transition."
    >
      <div className="mx-auto max-w-[720px] space-y-8">
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Notre mission
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Tester, comparer et classer les solutions technologiques qui
            comptent — logiciels SaaS, outils d&apos;IA, hébergeurs web,
            installateurs solaires, mobilité électrique — pour permettre à
            chacun de choisir en connaissance de cause. Nos critères sont
            publics, nos tests recoupés et nos mises à jour datées.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Ce sur quoi nous nous engageons
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Nos critères d&apos;évaluation sont publics et pondérés, nos sources
            citées, nos chiffres datés et nos corrections publiées. Les contenus
            commerciaux, lorsqu&apos;il y en a, sont signalés comme tels et
            distingués de l&apos;éditorial. Notre{" "}
            <Link href="/charte-editoriale" className="font-semibold text-rouge hover:text-rouge-deep">
              charte éditoriale
            </Link>{" "}
            et notre{" "}
            <Link href="/methodologie" className="font-semibold text-rouge hover:text-rouge-deep">
              méthodologie
            </Link>{" "}
            détaillent ces engagements.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Nous contacter
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            Une remarque, un sujet à nous proposer, un partenariat ? Rendez-vous
            sur la page{" "}
            <Link href="/contact" className="font-semibold text-rouge hover:text-rouge-deep">
              contact &amp; partenariats
            </Link>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
