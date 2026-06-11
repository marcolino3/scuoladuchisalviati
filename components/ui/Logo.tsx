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

/**
 * Wappen-Marke: schwarzes Schild mit goldenen Diagonalstreifen.
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
        {/* Schwarzer Schildkörper */}
        <path d={SHIELD_PATH} fill="#111111" />

        {/* Goldene Diagonalstreifen */}
        <g stroke="var(--color-goldbrown)" strokeWidth="3.5">
          <line x1="-22" y1="48" x2="26" y2="0" />
          <line x1="-12" y1="48" x2="36" y2="0" />
          <line x1="-2" y1="48" x2="46" y2="0" />
          <line x1="8" y1="48" x2="56" y2="0" />
          <line x1="18" y1="48" x2="66" y2="0" />
        </g>
      </g>

      {/* Goldener Rand – innen liegend, damit nichts übersteht. */}
      <path
        d={SHIELD_PATH}
        fill="none"
        stroke="var(--color-goldbrown)"
        strokeWidth="2"
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
