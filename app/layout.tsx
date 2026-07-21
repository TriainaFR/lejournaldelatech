import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Playfair_Display,
  Schibsted_Grotesk,
} from "next/font/google";
import { authorBySlug } from "@/lib/authors";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://lejournaldelatech.fr";
const SITE_NAME = "Le Journal de la Tech";
const SITE_DESCRIPTION =
  "Comparatifs indépendants et guides d'achat : logiciels SaaS, outils IA, hébergeurs web, panneaux solaires et mobilité. Le média français de la tech utile.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — SaaS, IA, hébergement & tech durable`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — SaaS, IA, hébergement & tech durable`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — SaaS, IA, hébergement & tech durable`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  applicationName: SITE_NAME,
  publisher: "Triaina",
  category: "technology",
};

const fondateur = authorBySlug("lucas-lecoq");

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Présent sur toutes les pages pour que `founder` et `author` renvoient
      // vers une entité résolue, y compris sur l'accueil.
      "@type": "Person",
      "@id": `${SITE_URL}/#${fondateur.slug}`,
      name: fondateur.name,
      url: `${SITE_URL}/auteurs/${fondateur.slug}`,
      jobTitle: fondateur.role,
      description: fondateur.bio,
      knowsAbout: fondateur.expertise,
      sameAs: fondateur.sameAs,
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "NewsMediaOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
        width: 64,
        height: 64,
      },
      description: SITE_DESCRIPTION,
      foundingDate: "2026-07",
      inLanguage: "fr-FR",
      // Politiques éditoriales : chacune pointe vers une page réellement
      // publiée. Ce sont les propriétés que Google attend d'un éditeur de
      // presse — les déclarer, c'est réclamer un signal E-E-A-T déjà mérité.
      publishingPrinciples: `${SITE_URL}/charte-editoriale`,
      ethicsPolicy: `${SITE_URL}/charte-editoriale`,
      correctionsPolicy: `${SITE_URL}/charte-editoriale`,
      actionableFeedbackPolicy: `${SITE_URL}/contact`,
      masthead: `${SITE_URL}/a-propos`,
      founder: { "@id": `${SITE_URL}/#lucas-lecoq` },
      parentOrganization: { "@id": `${SITE_URL}/#editeur` },
      knowsAbout: [
        "SaaS",
        "Logiciels d'entreprise",
        "Intelligence artificielle",
        "Hébergement web",
        "Mobilité électrique",
        "Énergie solaire",
        "Green tech",
        "Écologie numérique",
      ],
    },
    {
      // Personne morale éditrice — rattache le média à une entité légale
      // identifiable, avec ses identifiants officiels.
      "@type": "Organization",
      "@id": `${SITE_URL}/#editeur`,
      name: "Triaina",
      legalName: "TRIAINA",
      foundingDate: "2026-01-06",
      address: {
        "@type": "PostalAddress",
        streetAddress: "60 rue François Ier",
        postalCode: "75008",
        addressLocality: "Paris",
        addressCountry: "FR",
      },
      identifier: [
        { "@type": "PropertyValue", propertyID: "SIREN", value: "999402654" },
        { "@type": "PropertyValue", propertyID: "SIRET", value: "99940265400019" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${schibsted.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="tech-grid min-h-full flex flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-rouge focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:text-white"
        >
          Aller au contenu
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
