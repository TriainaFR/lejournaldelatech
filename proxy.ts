import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Négociation de contenu pour les agents.
 *
 * Une requête qui demande explicitement `Accept: text/markdown` est réécrite
 * vers `/md/<chemin>`, qui sert la version Markdown. Les navigateurs, qui
 * demandent `text/html`, ne sont jamais concernés : le HTML reste la réponse
 * par défaut.
 *
 * Le fichier s'appelle `proxy` et non `middleware` : la convention a été
 * renommée dans Next 16, et le runtime y est Node.
 */
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";

  // `*/*` ne suffit pas : presque tous les clients l'envoient. Seule une
  // demande explicite de Markdown déclenche la réécriture.
  if (!accept.includes("text/markdown")) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/md")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/md${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /**
   * Exclut les ressources qui n'ont pas de version Markdown : fichiers
   * internes de Next, images, et les points d'entrée déjà servis en texte
   * (robots.txt, sitemap.xml, llms.txt).
   */
  matcher:
    "/((?!_next/|images/|favicon|icon|opengraph-image|robots\\.txt|sitemap\\.xml|llms\\.txt|.*\\.[a-z0-9]+$).*)",
};
