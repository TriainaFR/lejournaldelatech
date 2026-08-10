import * as apparaitreGoogleAiOverview from "@/content/articles/apparaitre-google-ai-overview";
import * as claudeOuChatgptSelonVotreMetier from "@/content/articles/claude-ou-chatgpt-selon-votre-metier";
import * as claudeVsChatgpt from "@/content/articles/claude-vs-chatgpt";
import * as commentChoisirCrmSaas from "@/content/articles/comment-choisir-crm-saas";
import * as meilleurHebergeurWeb2026 from "@/content/articles/meilleur-hebergeur-web-2026";
import * as meilleurCrmGratuit2026 from "@/content/articles/meilleur-crm-gratuit-2026";
import * as meilleurCrmTpePme from "@/content/articles/meilleur-crm-tpe-pme";
import * as meilleurLogicielCrm2026 from "@/content/articles/meilleur-logiciel-crm-2026";
import * as meilleurOutilIa2026 from "@/content/articles/meilleur-outil-ia-2026";
import * as meilleurOutilIaDeveloppeurs from "@/content/articles/meilleur-outil-ia-developpeurs";
import * as googleAiOverviewDefinition from "@/content/articles/google-ai-overview-definition";
import * as meilleurHebergeurVpsPasCher from "@/content/articles/meilleur-hebergeur-vps-pas-cher";
import * as meilleurVps2026 from "@/content/articles/meilleur-vps-2026";
import * as meilleureAgenceGeoFrance from "@/content/articles/meilleure-agence-geo-france";
import * as meilleureAgenceSeoFrance from "@/content/articles/meilleure-agence-seo-france";
import * as meilleureAgenceSeoParis from "@/content/articles/meilleure-agence-seo-paris";
import * as meilleurOutilIaPme from "@/content/articles/meilleur-outil-ia-pme";
import * as meilleurHebergeurWordpress from "@/content/articles/meilleur-hebergeur-wordpress";
import * as notionVsObsidian from "@/content/articles/notion-vs-obsidian";

export type ArticleContent = {
  html: string;
  toc: { id: string; text: string }[];
  faq: { question: string; answer: string }[];
  sources: { url: string; label: string }[];
};

/** Corps des articles publiés, indexé par slug. */
const CONTENTS: Record<string, ArticleContent> = {
  "apparaitre-google-ai-overview": apparaitreGoogleAiOverview,
  "claude-ou-chatgpt-selon-votre-metier": claudeOuChatgptSelonVotreMetier,
  "claude-vs-chatgpt": claudeVsChatgpt,
  "comment-choisir-crm-saas": commentChoisirCrmSaas,
  "meilleur-hebergeur-web-2026": meilleurHebergeurWeb2026,
  "meilleur-crm-gratuit-2026": meilleurCrmGratuit2026,
  "meilleur-crm-tpe-pme": meilleurCrmTpePme,
  "meilleur-logiciel-crm-2026": meilleurLogicielCrm2026,
  "meilleur-outil-ia-2026": meilleurOutilIa2026,
  "meilleur-outil-ia-developpeurs": meilleurOutilIaDeveloppeurs,
  "meilleur-outil-ia-pme": meilleurOutilIaPme,
  "google-ai-overview-definition": googleAiOverviewDefinition,
  "meilleur-hebergeur-vps-pas-cher": meilleurHebergeurVpsPasCher,
  "meilleur-vps-2026": meilleurVps2026,
  "meilleure-agence-geo-france": meilleureAgenceGeoFrance,
  "meilleure-agence-seo-france": meilleureAgenceSeoFrance,
  "meilleure-agence-seo-paris": meilleureAgenceSeoParis,
  "meilleur-hebergeur-wordpress": meilleurHebergeurWordpress,
  "notion-vs-obsidian": notionVsObsidian,
};

export function articleContent(slug: string): ArticleContent | undefined {
  return CONTENTS[slug];
}
