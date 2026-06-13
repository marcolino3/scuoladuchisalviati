"use client";

import { useId } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  /** Ziel-Link. `null` rendert die Wortmarke ohne Link. */
  href?: string | null;
  className?: string;
  /** Nur das Wappen anzeigen (Wortmarke ausblenden). */
  iconOnly?: boolean;
}

/** Schildkontur als Pfad – einmal zentral, für Körper, Clip und Rand. */
const SHIELD_PATH =
  "M24 4 L42 9 V25 C42 35 34 42 24 45 C14 42 6 35 6 25 V9 Z";

/** Fünfzackiger Stern über dem Wappenkreuz. */
const STAR_PATH =
  "M24 6.5 L24.76 8.45 L26.85 8.57 L25.24 9.9 L25.76 11.93 L24 10.8 L22.24 11.93 L22.76 9.9 L21.15 8.57 L23.24 8.45 Z";

/**
 * Wappen-Marke: an das echte Institutswappen angelehnt.
 * Navy-Himmelfeld mit goldenem Stern + Kreuz ("fede"), darunter Sandfeld mit
 * aufgeschlagenem Buch ("scienza"), gerahmt von einem goldenen Schildrand.
 * Als Inline-SVG, damit es scharf skaliert und leicht anpassbar bleibt.
 */
const ShieldMark = ({ className }: { className?: string }) => {
  // Eindeutige Clip-ID pro Instanz – verhindert ID-Kollisionen, wenn das
  // Logo mehrfach auf einer Seite steht (Header, Nav, Footer).
  const clipId = useId();

  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-hidden="true"
      className={cn("size-9 shrink-0", className)}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={SHIELD_PATH} />
        </clipPath>
      </defs>

      {/* Alles, was Schild ist, wird auf die Kontur geclippt. */}
      <g clipPath={`url(#${clipId})`}>
        {/* Oberes Feld: Navy-Himmel. Unteres Feld: goldener Sand. */}
        <rect x="0" y="0" width="48" height="28" fill="var(--color-navy)" />
        <rect x="0" y="28" width="48" height="20" fill="var(--color-ocker)" />
        {/* Trennlinie zwischen den Feldern */}
        <line
          x1="6"
          y1="28"
          x2="42"
          y2="28"
          stroke="var(--color-goldbrown)"
          strokeWidth="1"
        />

        {/* Goldener Stern */}
        <path d={STAR_PATH} fill="var(--color-goldbrown)" />

        {/* Goldenes Kreuz ("fede") */}
        <g fill="var(--color-goldbrown)">
          <rect x="22.9" y="13" width="2.2" height="12" rx="0.4" />
          <rect x="19.4" y="15.6" width="9.2" height="2.2" rx="0.4" />
        </g>

        {/* Aufgeschlagenes Buch ("scienza") – weiße Seiten, Navy-Bund/Zeilen */}
        <g>
          <path
            d="M24 32.4 C21.4 30.9 18.4 30.9 16 31.8 V39.6 C18.4 38.7 21.4 38.7 24 40.2 C26.6 38.7 29.6 38.7 32 39.6 V31.8 C29.6 30.9 26.6 30.9 24 32.4 Z"
            fill="var(--color-white)"
          />
          <g stroke="var(--color-navy)" strokeWidth="0.9" strokeLinecap="round">
            <line x1="24" y1="32.4" x2="24" y2="40.2" />
            <line x1="18" y1="33.8" x2="22" y2="34.6" />
            <line x1="26" y1="34.6" x2="30" y2="33.8" />
          </g>
        </g>
      </g>

      {/* Goldener Schildrand – doppelt gelegt für den geschichteten Look. */}
      <path
        d={SHIELD_PATH}
        fill="none"
        stroke="var(--color-goldbrown)"
        strokeWidth="2.5"
        clipPath={`url(#${clipId})`}
      />
      <path
        d={SHIELD_PATH}
        fill="none"
        stroke="var(--color-ocker)"
        strokeWidth="0.8"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
};

/**
 * Brand-Marke "Instituto Duchi Salviati": Wappen + Wortmarke.
 * Zentrale Quelle für das Logo in Header, Nav und Footer.
 */
export const Logo = ({ href = "/", className, iconOnly = false }: LogoProps) => {
  const content = (
    <span className={cn("flex items-center gap-2", className)}>
      <ShieldMark />
      {!iconOnly && (
        <span className="text-navy text-[18px] leading-none font-semibold tracking-[-0.36px]">
          Instituto Duchi Salviati
        </span>
      )}
    </span>
  );

  if (href === null) return content;

  return (
    <Link href={href} aria-label="Instituto Duchi Salviati – Startseite">
      {content}
    </Link>
  );
};
