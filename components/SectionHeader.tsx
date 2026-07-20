import Link from "next/link";
import { CircuitSprig } from "./ornaments";

/** Tête de section éditoriale : kicker en capitales, grand titre serif, ornement. */
export default function SectionHeader({
  id,
  kicker,
  title,
  moreHref,
  moreLabel,
  align = "center",
}: {
  id: string;
  kicker: string;
  title: string;
  moreHref?: string;
  moreLabel?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`mb-10 flex flex-col gap-3 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-rouge">
        {kicker}
      </p>
      <h2
        id={id}
        className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
      >
        {title}
      </h2>
      <CircuitSprig className="h-5 w-28 text-silver-deep" />
      {moreHref ? (
        <Link
          href={moreHref}
          className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-rouge"
        >
          {moreLabel ?? "Tout voir"} <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </div>
  );
}
