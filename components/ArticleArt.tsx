/**
 * Illustration générative de substitution : dégradés + tracés de circuit,
 * variée de façon déterministe par `seed`. Remplacée à terme par de vraies
 * photos éditoriales (webp) — l'attribut alt reste porté par la figure appelante.
 */

type Tone = "rouge" | "silver" | "ink";

const TONES: Record<
  Tone,
  { from: string; to: string; trace: string; glyph: string; dots: string }
> = {
  rouge: {
    from: "#8f0a17",
    to: "#e11326",
    trace: "#ffffff",
    glyph: "#ffffff",
    dots: "#ffffff",
  },
  ink: {
    from: "#0b0c0f",
    to: "#1d2026",
    trace: "#e11326",
    glyph: "#f4f5f7",
    dots: "#868d98",
  },
  silver: {
    from: "#eef0f3",
    to: "#c9cdd3",
    trace: "#e11326",
    glyph: "#0f1115",
    dots: "#0f1115",
  },
};

/** générateur pseudo-aléatoire déterministe (mulberry32) */
function mulberry32(seed: number) {
  let a = seed + 0x6d2b79f5;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ArticleArt({
  seed,
  tone,
  glyph,
  className,
}: {
  seed: number;
  tone: Tone;
  /** grande lettrine décorative (initiale de la rubrique) */
  glyph?: string;
  className?: string;
}) {
  const t = TONES[tone];
  const rnd = mulberry32(seed * 7919);
  const gid = `g${seed}-${tone}`;

  // tracé de circuit : départ à gauche, deux coudes, arrivée à droite
  const y0 = 120 + rnd() * 260;
  const x1 = 140 + rnd() * 160;
  const y1 = 90 + rnd() * 320;
  const x2 = 420 + rnd() * 180;
  const y2 = 90 + rnd() * 320;
  const path = `M -10 ${y0} H ${x1} V ${y1} H ${x2} V ${y2} H 810`;

  // grands cercles translucides
  const c1x = 120 + rnd() * 560;
  const c1y = 80 + rnd() * 340;
  const c1r = 120 + rnd() * 130;
  const c2x = 120 + rnd() * 560;
  const c2y = 80 + rnd() * 340;

  const glyphX = 560 + rnd() * 120;
  const glyphRot = -8 + rnd() * 16;

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.from} />
          <stop offset="1" stopColor={t.to} />
        </linearGradient>
        <pattern
          id={`${gid}-dots`}
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.1" fill={t.dots} opacity="0.2" />
        </pattern>
      </defs>

      <rect width="800" height="500" fill={`url(#${gid}-bg)`} />
      <rect width="800" height="500" fill={`url(#${gid}-dots)`} />

      <circle
        cx={c1x}
        cy={c1y}
        r={c1r}
        fill="none"
        stroke={t.trace}
        strokeWidth="1.2"
        opacity="0.35"
      />
      <circle
        cx={c2x}
        cy={c2y}
        r={c1r * 0.55}
        fill={t.trace}
        opacity="0.06"
      />

      {glyph ? (
        <text
          x={glyphX}
          y="400"
          fontSize="430"
          fill={t.glyph}
          opacity="0.09"
          textAnchor="middle"
          transform={`rotate(${glyphRot} ${glyphX} 320)`}
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
        >
          {glyph}
        </text>
      ) : null}

      <path
        d={path}
        fill="none"
        stroke={t.trace}
        strokeWidth="1.6"
        opacity="0.7"
      />
      <circle cx={x1} cy={y1} r="6" fill={t.trace} opacity="0.9" />
      <circle cx={x1} cy={y1} r="11" fill="none" stroke={t.trace} strokeWidth="1" opacity="0.5" />
      <circle cx={x2} cy={y2} r="6" fill={t.trace} opacity="0.9" />
      <circle cx={x2} cy={y2} r="11" fill="none" stroke={t.trace} strokeWidth="1" opacity="0.5" />

      {/* liseré intérieur, façon cadre technique */}
      <rect
        x="10"
        y="10"
        width="780"
        height="480"
        fill="none"
        stroke={t.trace}
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}
