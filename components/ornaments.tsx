/** Petits ornements SVG partagés : brin de circuit (motif du logo) et monogramme JLT. */

export function CircuitSprig({
  className,
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 28"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <g stroke={color} strokeWidth="1.3">
        <line x1="14" y1="14" x2="48" y2="14" />
        <line x1="48" y1="14" x2="60" y2="6" />
        <line x1="48" y1="14" x2="60" y2="22" />
        <line x1="60" y1="6" x2="76" y2="6" />
        <line x1="60" y1="22" x2="76" y2="22" />
        <line x1="76" y1="6" x2="88" y2="14" />
        <line x1="76" y1="22" x2="88" y2="14" />
        <line x1="88" y1="14" x2="108" y2="14" />
      </g>
      <g fill={color}>
        <circle cx="14" cy="14" r="3" />
        <circle cx="48" cy="14" r="2.2" />
        <circle cx="60" cy="6" r="2.2" />
        <circle cx="60" cy="22" r="2.2" />
        <circle cx="76" cy="6" r="2.2" />
        <circle cx="76" cy="22" r="2.2" />
        <circle cx="88" cy="14" r="2.2" />
        <circle cx="108" cy="14" r="3" />
      </g>
    </svg>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border border-silver bg-card font-masthead font-bold text-rouge ${className ?? ""}`}
    >
      JLT
    </span>
  );
}

export function Diamond({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      ◆
    </span>
  );
}
