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
components/            # header, footer, photos, illustrations, ornements
lib/data.ts            # thématiques, FAQ, articles (vide pour l'instant)
lib/date.ts            # date d'édition partagée serveur / client
```

**Aucun contenu fantôme** : le site n'affiche et ne référence que des pages
réellement publiées. Une rubrique n'apparaît (navigation, sitemap, lien depuis
l'accueil) qu'à partir de son premier article — voir `activeCategories()`.

### Publier un article

1. Déposer le HTML livré par la rédaction dans `scripts/raw/<slug>.html` et sa
   configuration de transformation dans `scripts/articles/<slug>.mjs`
   (corrections de coquilles, maillage, encadrés de données), puis lancer :

   ```bash
   node scripts/build-article.mjs <slug>
   ```

   Le corps prêt à rendre est écrit dans `content/articles/<slug>.ts` ; le
   référencer dans `lib/articleContent.ts`.
2. Ajouter l'entrée dans `articles` (`lib/data.ts`) : titre, `metaTitle`,
   `excerpt`, `metaDescription`, date, temps de lecture, `topics`, `datasets`,
   `ranking` éventuel, et la photo `public/images/art-<slug>.jpg` avec son
   `imageAlt`.
3. C'est tout : la page article, la page rubrique, la navigation, l'accueil,
   le bandeau « À la une » et le sitemap se mettent à jour automatiquement.

Le balisage produit par page article : `Article` (avec `wordCount`, `about`,
`citation`, `isBasedOn`, `hasPart`), `Dataset` pour chaque étude propriétaire,
`FAQPage`, `BreadcrumbList`, Open Graph `article` complet et sommaire ancré.

### Protocole JDLT et données propriétaires

Le [Protocole JDLT](https://lejournaldelatech.fr/protocole-jdlt) est la
méthodologie d'évaluation des outils d'IA du journal — c'est le principal
différenciateur face aux comparatifs qui recopient les benchmarks publics.
Deux de ses axes produisent des données originales (test de fiabilité en
français sur 50 prompts, simulation de coût réel pour une PME).

Dans un article, ces données se déclarent dans `datasets` (`lib/data.ts`) :
elles sont alors balisées en `Dataset` rattaché au `DataCatalog` « Protocole
JDLT », donc citables nommément par les moteurs génératifs. Le rendu les
signale par un encadré rouge « Donnée exclusive ».

### Maillage interne différé

Un article peut viser une page pilier pas encore publiée avec le marqueur
`[[lien:<slug>|texte]]`. Tant que l'article cible n'existe pas, le marqueur
rend du texte simple ; dès qu'il est publié, le lien s'active partout
automatiquement (`lib/internalLinks.ts`). Piliers actuellement en attente :
`meilleur-outil-ia-2026` et `alternative-chatgpt`.

### Date d'édition

`components/DateStamp.tsx` affiche toujours la date réelle du visiteur : le
HTML statique porte la date du build (valeur d'hydratation), le client bascule
immédiatement sur sa date locale via `useSyncExternalStore`, puis rafraîchit au
passage de minuit et au retour sur l'onglet.

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
