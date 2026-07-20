import Image from "next/image";
import type { EditorialImage } from "@/lib/data";
import ArticleArt from "./ArticleArt";

const MEDIA_CLASS =
  "absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,.61,.21,1)] group-hover:scale-[1.035]";

/**
 * Média d'un article/rubrique/guide : photo éditoriale si disponible,
 * sinon illustration générative. Ajoute le liseré intérieur « cadre technique ».
 * À placer dans un conteneur `relative` (figure) avec un aspect-ratio.
 */
export default function EditorialPhoto({
  image,
  seed,
  tone,
  glyph,
  sizes,
  priority = false,
}: {
  image?: EditorialImage;
  seed: number;
  tone: "rouge" | "silver" | "ink";
  glyph?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={MEDIA_CLASS}
        />
      ) : (
        <ArticleArt
          seed={seed}
          tone={tone}
          glyph={glyph}
          className={MEDIA_CLASS}
        />
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[10px] border border-white/40"
      />
    </>
  );
}
