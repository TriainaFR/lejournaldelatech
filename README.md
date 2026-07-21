# Le Journal de la Tech

Le média français de la tech utile : **SaaS & logiciels, intelligence artificielle,
hébergement web, mobilité, énergie solaire et green tech**. Comparatifs
indépendants, classements et guides d'achat — pensé pour être une référence
SEO **et** GEO (citabilité par les moteurs IA).

Site : [lejournaldelatech.fr](https://lejournaldelatech.fr) · Éditeur : Triaina

## Stack

- [Next.js 16](https://nextjs.org) (App Router, pages statiques)
- [Tailwind CSS v4](https://tailwindcss.com) (design tokens dans `app/globals.css`)
- TypeScript
- Polices : Playfair Display (wordmark, citations), Schibsted Grotesk
  (titres & texte), IBM Plex Mono (labels, kickers, données)

## Identité visuelle

Look « journal tech / IA » : blanc net, rouge signal, noir encre, argent du
logo, étiquettes monospace et grille technique en filigrane.

| Token | Valeur | Usage |
|---|---|---|
| `--color-paper` | `#ffffff` | fond |
| `--color-rouge` | `#e11326` | accent principal, wordmark |
| `--color-night` | `#0b0c0f` | ticker, newsletter, footer |
| `--color-silver` | `#c9cdd3` | filets, ornements |
| `--color-ink` | `#0f1115` | texte |

Squelette éditorial de la famille « Le Journal » (cousin de lejournalduvin.fr
et lejournaldesecoles.fr) : masthead centré à datelines, filets de presse, hero
7,2/4,8 avec rail numéroté, interlude citation, tuiles d'intention, manifeste,
footer 4 colonnes à devise.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production statique
```

## Structure

```
app/
  layout.tsx           # metadata, polices, JSON-LD (NewsMediaOrganization + WebSite)
  page.tsx             # home page + JSON-LD (FAQPage)
  globals.css          # tokens Tailwind v4, filets, grille technique, animations
  icon.svg             # favicon monogramme JLT
  opengraph-image.tsx  # image OG générée (1200×630)
  sitemap.ts, robots.ts
  a-propos/, methodologie/, charte-editoriale/, contact/,
  mentions-legales/, confidentialite/   # pages à contenu réel
components/            # header, footer, ticker, photos, illustrations, ornements
lib/data.ts            # données du site (articles vides pour l'instant)
```

**Mode pré-lancement** : tant qu'aucun contenu n'est publié, rubriques,
comparatifs et guides sont affichés en annonces « À paraître » non
cliquables (nav, cartes, tuiles, footer) et leurs routes n'existent pas.
Pour rouvrir une section : recréer sa route et rebrancher les `<Link>`
dans `SiteHeader`, `SiteFooter` et `app/page.tsx` (repères en commentaire).

## SEO / GEO intégré

- JSON-LD `@graph` : `NewsMediaOrganization` (knowsAbout, publishingPrinciples),
  `WebSite`, `FAQPage` (réintégrer `SearchAction` et `ItemList` quand les
  pages recherche et comparatifs rouvriront)
- Une seule `h1` (masthead), hiérarchie `h2`/`h3` stricte
- Table HTML extractible, FAQ en `<details>/<summary>` miroir du balisage
- `robots` : `max-image-preview:large`, `max-snippet:-1`
- Questions FAQ formulées en requêtes longue traîne conversationnelles

## À faire avant mise en production

- [ ] Brancher le formulaire newsletter sur un fournisseur (Brevo, Mailjet…)
- [ ] Remplacer le contenu de démonstration (`lib/data.ts`) par de vrais articles
      (et retirer le `noindex` des pages articles à la publication)
- [ ] Remplacer les illustrations génératives par de vraies photos éditoriales (webp)
- [ ] Compléter les mentions légales (SIREN, hébergeur) et la politique de confidentialité
- [ ] Flux RSS + publication du premier classement complet par comparatif
