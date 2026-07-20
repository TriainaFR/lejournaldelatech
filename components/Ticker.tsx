"use client";

import { useState } from "react";
import { Diamond } from "./ornaments";

/** Fil « en continu » : défilement pausable (WCAG 2.2.2). */
export default function Ticker({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="overflow-hidden border-b border-night/40 bg-night text-paper">
      <div className="flex items-stretch">
        <p className="z-10 flex shrink-0 items-center gap-2 bg-rouge px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white"
          />
          En continu
        </p>
        <div className="relative flex-1 overflow-hidden">
          <div
            className="ticker-track flex w-max items-center whitespace-nowrap py-2 font-mono text-[11px] tracking-wide"
            style={{ animationPlayState: paused ? "paused" : undefined }}
          >
            {[0, 1, 2].map((dup) => (
              <span
                key={dup}
                aria-hidden={dup > 0}
                className="flex items-center"
              >
                {items.map((item) => (
                  <span key={item} className="flex items-center">
                    <span className="px-5">{item}</span>
                    <Diamond className="text-[8px] text-silver" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={
            paused ? "Reprendre le défilement" : "Mettre le défilement en pause"
          }
          className="z-10 shrink-0 cursor-pointer border-l border-paper/20 px-3 text-silver transition-colors hover:text-white"
        >
          {paused ? (
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor" aria-hidden="true">
              <path d="M2 1l9 5-9 5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor" aria-hidden="true">
              <rect x="2" y="1" width="3" height="10" />
              <rect x="7" y="1" width="3" height="10" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
