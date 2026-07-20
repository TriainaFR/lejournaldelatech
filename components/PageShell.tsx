import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { CircuitSprig } from "./ornaments";

/** Gabarit des pages intérieures : en-tête du site, titre de page, contenu, pied. */
export default function PageShell({
  kicker,
  title,
  intro,
  children,
}: {
  kicker: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main id="contenu" className="flex-1">
        <div className="border-b border-ink/15 bg-paper-deep/60">
          <div className="mx-auto w-full max-w-[1240px] px-6 py-12 text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-rouge">
              {kicker}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {title}
            </h1>
            <CircuitSprig className="mx-auto mt-4 h-5 w-28 text-silver-deep" />
            {intro ? (
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
                {intro}
              </p>
            ) : null}
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1240px] px-6 py-14">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
