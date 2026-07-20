import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact & partenariats",
  description:
    "Contacter la rédaction du Journal de la Tech : proposer un sujet, signaler une erreur, discuter d'un partenariat média.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell
      kicker="Le Journal"
      title="Contact & partenariats"
      intro="Un sujet à proposer, une erreur à signaler, un partenariat à discuter ? Écrivez-nous."
    >
      <div className="mx-auto max-w-[720px] space-y-8">
        <section className="border border-ink/15 bg-card p-6">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
            Rédaction
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Sujets, corrections, droit de réponse :{" "}
            <a
              href="mailto:redaction@lejournaldelatech.fr"
              className="font-semibold text-rouge hover:text-rouge-deep"
            >
              redaction@lejournaldelatech.fr
            </a>
          </p>
        </section>
        <section className="border border-ink/15 bg-card p-6">
          <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-rouge">
            Partenariats &amp; publicité
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Formats publicitaires signalés, études, événements :{" "}
            <a
              href="mailto:partenariats@lejournaldelatech.fr"
              className="font-semibold text-rouge hover:text-rouge-deep"
            >
              partenariats@lejournaldelatech.fr
            </a>
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Rappel : aucune entreprise ne peut acheter sa place dans nos
            comparatifs, quelle que soit la nature du partenariat.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
