import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site lejournaldelatech.fr : éditeur, directeur de la publication, hébergement.",
  alternates: { canonical: "/mentions-legales" },
};

/**
 * Hébergeur déclaré au titre de la LCEN (art. 6 III).
 *
 * ⚠️ À vérifier au moment du déploiement : la loi impose de nommer l'entité qui
 * stocke réellement le site, pas le registrar ni le CDN. Le projet n'ayant pas
 * de `output: "export"`, il lui faut un runtime Node — d'où Railway. Si le
 * déploiement part ailleurs (Vercel, VPS OVH…), corriger ce bloc AVANT la mise
 * en ligne.
 */
const HEBERGEUR = {
  nom: "Railway Corporation",
  adresse: "2261 Market Street #4980, San Francisco, CA 94114, États-Unis",
  site: "https://railway.com",
};

/** Prestataire de diffusion (CDN/DNS) — mention informative, non obligatoire. */
const CDN = {
  nom: "Cloudflare, Inc.",
  adresse: "101 Townsend Street, San Francisco, CA 94107, États-Unis",
};

function Section({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-ink">{titre}</h2>
      <div className="mt-2 leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  return (
    <PageShell kicker="Le Journal" title="Mentions légales">
      <div className="mx-auto max-w-[720px] space-y-8">
        <Section titre="Éditeur">
          <p>
            Le site lejournaldelatech.fr est édité par <strong>TRIAINA</strong>,
            société par actions simplifiée au capital de 1 000 euros.
          </p>
          <ul className="mt-3 space-y-1">
            <li>Siège social : 60 rue François Ier, 75008 Paris, France</li>
            <li>RCS Paris 999 402 654</li>
            <li>SIRET 999 402 654 00019</li>
            <li>Code APE 70.22Z — Conseil pour les affaires et autres conseils de gestion</li>
          </ul>
          <p className="mt-3">
            Pour toute demande :{" "}
            <Link
              href="/contact"
              className="font-semibold text-rouge hover:text-rouge-deep"
            >
              formulaire de contact
            </Link>
            .
          </p>
        </Section>

        <Section titre="Directeur de la publication">
          <p>Lucas Lecoq-Pellizzon, président de TRIAINA.</p>
        </Section>

        <Section titre="Hébergement">
          <p>
            Le site est hébergé par <strong>{HEBERGEUR.nom}</strong>,{" "}
            {HEBERGEUR.adresse} —{" "}
            <a
              href={HEBERGEUR.site}
              rel="noopener noreferrer nofollow"
              className="font-semibold text-rouge hover:text-rouge-deep"
            >
              {HEBERGEUR.site.replace("https://", "")}
            </a>
            .
          </p>
          <p className="mt-3">
            La diffusion et la résolution DNS sont assurées par {CDN.nom},{" "}
            {CDN.adresse}.
          </p>
        </Section>

        <Section titre="Propriété intellectuelle">
          <p>
            L&apos;ensemble des contenus (textes, illustrations, logos) est la
            propriété de TRIAINA, sauf mention contraire. Toute reproduction sans
            autorisation est interdite.
          </p>
        </Section>

        <Section titre="Crédits photos">
          <p>
            Les photographies d&apos;illustration proviennent de{" "}
            <a
              href="https://unsplash.com"
              rel="noopener"
              className="font-semibold text-rouge hover:text-rouge-deep"
            >
              Unsplash
            </a>{" "}
            et sont utilisées dans le cadre de la licence Unsplash. Le détail des
            sources est conservé par la rédaction.
          </p>
        </Section>
      </div>
    </PageShell>
  );
}
