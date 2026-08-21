import * as agenceGoogleAiOverview from "@/content/articles/agence-google-ai-overview";
import * as apparaitreGoogleAiOverview from "@/content/articles/apparaitre-google-ai-overview";
import * as claudeOuChatgptSelonVotreMetier from "@/content/articles/claude-ou-chatgpt-selon-votre-metier";
import * as claudeVsChatgpt from "@/content/articles/claude-vs-chatgpt";
import * as commentChoisirCrmSaas from "@/content/articles/comment-choisir-crm-saas";
import * as meilleurHebergeurWeb2026 from "@/content/articles/meilleur-hebergeur-web-2026";
import * as meilleurCrmGratuit2026 from "@/content/articles/meilleur-crm-gratuit-2026";
import * as meilleurCrmEcommerce2026 from "@/content/articles/meilleur-crm-ecommerce-2026";
import * as meilleurCrmTpePme from "@/content/articles/meilleur-crm-tpe-pme";
import * as meilleurLogicielComptabiliteGratuit from "@/content/articles/meilleur-logiciel-comptabilite-gratuit";
import * as meilleurLogicielComptabilitePme from "@/content/articles/meilleur-logiciel-comptabilite-pme";
import * as meilleurLogicielGestionProjet from "@/content/articles/meilleur-logiciel-gestion-projet";
import * as meilleurLogicielRhGratuit from "@/content/articles/meilleur-logiciel-rh-gratuit";
import * as meilleurLogicielRhPme from "@/content/articles/meilleur-logiciel-rh-pme";
import * as meilleurLogicielCrm2026 from "@/content/articles/meilleur-logiciel-crm-2026";
import * as meilleurOutilIa2026 from "@/content/articles/meilleur-outil-ia-2026";
import * as meilleurOutilGeo2026 from "@/content/articles/meilleur-outil-geo-2026";
import * as meilleurOutilIaDeveloppeurs from "@/content/articles/meilleur-outil-ia-developpeurs";
import * as googleAiOverviewDefinition from "@/content/articles/google-ai-overview-definition";
import * as meilleurHebergeurCloudFrance from "@/content/articles/meilleur-hebergeur-cloud-france";
import * as meilleurHebergeurVpsPasCher from "@/content/articles/meilleur-hebergeur-vps-pas-cher";
import * as meilleurVps2026 from "@/content/articles/meilleur-vps-2026";
import * as meilleureAgenceGeoFrance from "@/content/articles/meilleure-agence-geo-france";
import * as meilleureAgenceGeoParis from "@/content/articles/meilleure-agence-geo-paris";
import * as meilleureAgenceGeoLyon from "@/content/articles/meilleure-agence-geo-lyon";
import * as meilleureAgenceSeoFrance from "@/content/articles/meilleure-agence-seo-france";
import * as meilleureAgenceSeoParis from "@/content/articles/meilleure-agence-seo-paris";
import * as meilleurOutilIaMarketing from "@/content/articles/meilleur-outil-ia-marketing";
import * as meilleurOutilIaRedacteurs from "@/content/articles/meilleur-outil-ia-redacteurs";
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
  "agence-google-ai-overview": agenceGoogleAiOverview,
  "apparaitre-google-ai-overview": apparaitreGoogleAiOverview,
  "claude-ou-chatgpt-selon-votre-metier": claudeOuChatgptSelonVotreMetier,
  "claude-vs-chatgpt": claudeVsChatgpt,
  "comment-choisir-crm-saas": commentChoisirCrmSaas,
  "meilleur-hebergeur-web-2026": meilleurHebergeurWeb2026,
  "meilleur-crm-gratuit-2026": meilleurCrmGratuit2026,
  "meilleur-crm-ecommerce-2026": meilleurCrmEcommerce2026,
  "meilleur-crm-tpe-pme": meilleurCrmTpePme,
  "meilleur-logiciel-comptabilite-gratuit": meilleurLogicielComptabiliteGratuit,
  "meilleur-logiciel-comptabilite-pme": meilleurLogicielComptabilitePme,
  "meilleur-logiciel-gestion-projet": meilleurLogicielGestionProjet,
  "meilleur-logiciel-rh-gratuit": meilleurLogicielRhGratuit,
  "meilleur-logiciel-rh-pme": meilleurLogicielRhPme,
  "meilleur-logiciel-crm-2026": meilleurLogicielCrm2026,
  "meilleur-outil-ia-2026": meilleurOutilIa2026,
  "meilleur-outil-geo-2026": meilleurOutilGeo2026,
  "meilleur-outil-ia-developpeurs": meilleurOutilIaDeveloppeurs,
  "meilleur-outil-ia-marketing": meilleurOutilIaMarketing,
  "meilleur-outil-ia-redacteurs": meilleurOutilIaRedacteurs,
  "meilleur-outil-ia-pme": meilleurOutilIaPme,
  "google-ai-overview-definition": googleAiOverviewDefinition,
  "meilleur-hebergeur-cloud-france": meilleurHebergeurCloudFrance,
  "meilleur-hebergeur-vps-pas-cher": meilleurHebergeurVpsPasCher,
  "meilleur-vps-2026": meilleurVps2026,
  "meilleure-agence-geo-france": meilleureAgenceGeoFrance,
  "meilleure-agence-geo-paris": meilleureAgenceGeoParis,
  "meilleure-agence-geo-lyon": meilleureAgenceGeoLyon,
  "meilleure-agence-seo-france": meilleureAgenceSeoFrance,
  "meilleure-agence-seo-paris": meilleureAgenceSeoParis,
  "meilleur-hebergeur-wordpress": meilleurHebergeurWordpress,
  "notion-vs-obsidian": notionVsObsidian,
};

export function articleContent(slug: string): ArticleContent | undefined {
  return CONTENTS[slug];
}
