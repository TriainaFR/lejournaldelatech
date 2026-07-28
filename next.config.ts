import type { NextConfig } from "next";

/**
 * En-têtes `Link` (RFC 8288) — découverte par les agents.
 *
 * Un agent qui n'a lu que les en-têtes de la réponse doit pouvoir trouver
 * les ressources structurantes du site sans analyser le HTML. On ne déclare
 * ici que des relations enregistrées à l'IANA, et uniquement vers des
 * ressources qui existent réellement : annoncer un catalogue d'API ou une
 * documentation de service que le journal n'a pas reviendrait à envoyer les
 * agents dans le vide.
 */
const AGENT_LINKS = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</mentions-legales>; rel="terms-of-service"',
  '</confidentialite>; rel="privacy-policy"',
].join(", ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Link", value: AGENT_LINKS }],
      },
    ];
  },
};

export default nextConfig;
