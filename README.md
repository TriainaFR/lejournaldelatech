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
| `--color-night` | `#0b0c0f` | ticker, footer |
| `--color-silver` | `#c9cdd3` | filets, ornements |
| `--color-ink` | `#0f1115` | texte |

Squelette éditorial de la famille « Le Journal » (cousin de lejournalduvin.fr
et lejournaldesecoles.fr) : masthead centré à datelines, filets de presse, hero
7,2/4,8 avec rail numéroté, interlude citation, tuiles d'intention, manifeste,
footer 4 colonnes à devise.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les identifiants EmailJS
npm run dev                  # http://localhost:3000
npm run build                # build de production statique
```

### Formulaire de contact (EmailJS)

La page `/contact` envoie les messages via [EmailJS](https://dashboard.emailjs.com),
sans back-end à maintenir. Trois identifiants à renseigner dans `.env.local` :
`NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` et
`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` (voir `.env.example`).

Les champs du formulaire correspondent aux variables du modèle EmailJS par
défaut : `{{name}}`, `{{email}}`, `{{title}}` (l'objet) et `{{message}}`. Tant
que la configuration est absente, le
formulaire affiche un message explicite et renvoie vers l'adresse e-mail de la
rédaction — il n'échoue jamais en silence. Un champ leurre (honeypot) filtre les
robots. Sur Vercel, reporter les trois variables dans les réglages du projet.

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
   `excerpt`, `metaDescription`, `author` (clé de `lib/authors.ts`),
   `authorNote` éventuelle, date, temps de lecture, `topics`, `datasets`,
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

### Signature des articles

Les auteurs sont décrits une fois dans `lib/authors.ts` (fonction, bio,
expertises, profils externes). Chaque article référence une clé d'auteur, ce
qui alimente automatiquement la byline, l'encadré de fin d'article, la page
`/auteurs/<slug>` et le balisage `Person` (`jobTitle`, `knowsAbout`, `sameAs`)
lié à l'`Article` — la brique E-E-A-T attendue sur des comparatifs chiffrés.
Le champ `authorNote` sert aux précisions de transparence (« qui a mené les
tests, comment »).

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

### Indexation IndexNow (Bing, Yandex, Seznam, Naver)

`npm run indexnow` prévient les moteurs qu'une URL a changé, sans console
webmaster. **Google ne participe pas à IndexNow** : pour Google, seuls le
sitemap déclaré dans `robots.txt` et la Search Console font foi.

La clé est publiée en clair dans `public/11ac43af4a39e363ad6ef131cc77afb8.txt`
— c'est le fonctionnement normal du protocole : elle sert à prouver qu'on
contrôle le domaine, pas à authentifier. Elle doit rester accessible à la
racine, sinon les soumissions repartent en 403.

```bash
npm run indexnow                                   # tout le sitemap publié
npm run indexnow -- --dry-run                      # affiche sans envoyer
node scripts/indexnow.mjs https://lejournaldelatech.fr/…  # URLs précises
```

À lancer **après** déploiement : le script relit le sitemap en ligne et vérifie
la clé avant d'envoyer. Soumettre une URL qui renvoie encore un 404 est
contre-productif. Après une publication, préférer la liste explicite des URLs
concernées (article + rubrique + `/articles`) plutôt que le sitemap entier.

## À faire avant mise en production

- [ ] Déployer (Vercel + domaine) puis lancer `npm run indexnow`
- [ ] Compléter les mentions légales (SIREN, hébergeur) et la politique de confidentialité
- [ ] Flux RSS
- [ ] Mettre à jour `public/llms.txt` à chaque vague de publication
