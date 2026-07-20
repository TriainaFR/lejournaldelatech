import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import PageShell from "@/components/PageShell";
import { articles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Toute l'actualité",
  description:
    "Toute l'actualité tech du Journal de la Tech : SaaS, intelligence artificielle, hébergement web, mobilité, énergie solaire et green tech, au fil des publications.",
  alternates: { canonical: "/actualites" },
};

export default function ActualitesPage() {
  const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <PageShell
      kicker="Le fil du journal"
      title="Toute l'actualité"
      intro="Les publications de la rédaction, de la plus récente à la plus ancienne."
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </PageShell>
  );
}
