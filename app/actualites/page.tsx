import type { Metadata } from "next";
import Link from "next/link";
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
      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      ) : (
        <p className="text-center text-ink-soft">
          Les premiers articles de la rédaction seront publiés très
          prochainement. En attendant, découvrez nos{" "}
          <Link
            href="/comparatifs"
            className="font-semibold text-rouge hover:text-rouge-deep"
          >
            comparatifs
          </Link>
          .
        </p>
      )}
    </PageShell>
  );
}
