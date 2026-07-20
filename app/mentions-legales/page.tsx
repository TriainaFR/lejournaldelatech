import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site lejournaldelatech.fr : éditeur, directeur de la publication, hébergement.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <PageShell kicker="Le Journal" title="Mentions légales">
      <div className="mx-auto max-w-[720px] space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Éditeur</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Le site lejournaldelatech.fr est édité par Triaina.
            {/* À compléter avant mise en ligne : forme juridique, capital,
                SIREN, adresse du siège social. */}
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">
            Directeur de la publication
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Lucas — Triaina.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">
            Hébergement
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            {/* À compléter selon l'hébergeur retenu (nom, adresse, téléphone). */}
            Informations d&apos;hébergement communiquées à la mise en ligne du
            site.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">
            Propriété intellectuelle
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            L&apos;ensemble des contenus (textes, illustrations, logos) est la
            propriété de Triaina, sauf mention contraire. Toute reproduction
            sans autorisation est interdite.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">
            Crédits photos
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Les photographies d&apos;illustration proviennent de{" "}
            <a
              href="https://unsplash.com"
              rel="noopener"
              className="font-semibold text-rouge hover:text-rouge-deep"
            >
              Unsplash
            </a>{" "}
            et sont utilisées dans le cadre de la licence Unsplash. Le détail
            des sources est conservé par la rédaction.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
