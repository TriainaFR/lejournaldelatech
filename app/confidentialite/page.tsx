import type { Metadata } from "next";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de lejournaldelatech.fr : données collectées via le formulaire de contact, cookies et droits RGPD.",
  alternates: { canonical: "/confidentialite" },
};

export default function ConfidentialitePage() {
  return (
    <PageShell kicker="Le Journal" title="Politique de confidentialité">
      <div className="mx-auto max-w-[720px] space-y-8">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">
            Données collectées
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Le site ne collecte aucune donnée personnelle en dehors de celles
            que vous saisissez volontairement dans le formulaire de contact :
            votre nom, votre adresse e-mail et le contenu de votre message.
            {/* À réviser lors de l'ajout d'un outil de mesure d'audience. */}
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">
            Formulaire de contact
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Les messages envoyés depuis la page contact sont acheminés par le
            service EmailJS, qui les transmet à la boîte de la rédaction. Ces
            données servent uniquement à traiter votre demande et à vous
            répondre. Elles ne sont ni vendues, ni utilisées à des fins
            commerciales, et sont supprimées une fois l&apos;échange terminé.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">Cookies</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Le site n&apos;utilise pas de cookies publicitaires. Si un outil de
            mesure d&apos;audience respectueux de la vie privée est ajouté, cette
            page sera mise à jour en conséquence.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-ink">
            Vos droits
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
            rectification et de suppression de vos données. Écrivez-nous à{" "}
            <a
              href="mailto:redaction@lejournaldelatech.fr"
              className="font-semibold text-rouge hover:text-rouge-deep"
            >
              redaction@lejournaldelatech.fr
            </a>
            .
          </p>
        </section>
      </div>
    </PageShell>
  );
}
