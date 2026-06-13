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

/** Fünfzackiger Stern (Einheitsstern, wird per transform platziert). */
const STAR_PATH =
  "M0,-10 L2.35,-3.24 L9.51,-3.09 L3.8,1.24 L5.88,8.09 L0,4 L-5.88,8.09 L-3.8,1.24 L-9.51,-3.09 L-2.35,-3.24 Z";

// Wappen-spezifische Farben (am echten Wappen abgenommen, nicht in der Palette).
const SKY = "#5f8fb8";
const CROSS = "#7a3a2c";
const FLESH = "#eaa68d";
const STAR = "#e8651e";
const FLAME = "#f0902a";
const LAMP = "#c0392b";
const CAP = "#1b1b1b";
const BOOK_LINE = "#3a2a1a";

/**
 * Wappen-Marke: eng an das echte Institutswappen angelehnt.
 * Navy-Himmelfeld mit Kreuz und zwei umfassenden Armen ("fede"), Stern über
 * dem Schild, darunter Sandfeld mit Öllampe, aufgeschlagenem Buch und
 * Doktorhut ("scienza"), gerahmt von einem goldenen Schildrand.
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
        {/* Oberes Feld: Himmelblau. Unteres Feld: goldener Sand. */}
        <rect x="0" y="0" width="48" height="28" fill={SKY} />
        <rect x="0" y="28" width="48" height="20" fill="var(--color-ocker)" />
        <line
          x1="6"
          y1="28"
          x2="42"
          y2="28"
          stroke="var(--color-goldbrown)"
          strokeWidth="1"
        />

        {/* Wolken am Fuß des Himmelfeldes */}
        <g fill="var(--color-white)" opacity="0.95">
          <circle cx="11" cy="26.6" r="1.9" />
          <circle cx="14" cy="27" r="2.2" />
          <circle cx="17" cy="26.7" r="1.8" />
          <circle cx="31" cy="26.7" r="1.8" />
          <circle cx="34" cy="27" r="2.2" />
          <circle cx="37" cy="26.6" r="1.9" />
        </g>

        {/* Kreuz ("fede") */}
        <g fill={CROSS}>
          <rect x="22.7" y="11" width="2.6" height="14" rx="0.3" />
          <rect x="18.5" y="15" width="11" height="2.4" rx="0.3" />
        </g>

        {/* Zwei Arme, die das Kreuz umfassen */}
        <g
          fill="none"
          stroke={FLESH}
          strokeWidth="2.4"
          strokeLinecap="round"
        >
          <path d="M24 25.5 Q17.5 23 17 15.5" />
          <path d="M24 25.5 Q30.5 23 31 15.5" />
        </g>
        <g fill={FLESH}>
          <circle cx="17" cy="15" r="1.5" />
          <circle cx="31" cy="15" r="1.5" />
        </g>
        <g stroke={FLESH} strokeWidth="0.8" strokeLinecap="round">
          <line x1="16.2" y1="14.4" x2="15.6" y2="12.6" />
          <line x1="17" y1="14.2" x2="17" y2="12.2" />
          <line x1="17.8" y1="14.4" x2="18.4" y2="12.6" />
          <line x1="30.2" y1="14.4" x2="29.6" y2="12.6" />
          <line x1="31" y1="14.2" x2="31" y2="12.2" />
          <line x1="31.8" y1="14.4" x2="32.4" y2="12.6" />
        </g>

        {/* Öllampe links */}
        <g>
          <ellipse cx="14.6" cy="35.6" rx="2.6" ry="1.7" fill={LAMP} />
          <path d="M12.3 35.2 L10.6 34.6 L12.2 36.2 Z" fill={LAMP} />
          <path
            d="M14.2 34 Q15 34.6 14.6 35"
            fill="none"
            stroke="var(--color-goldbrown)"
            strokeWidth="0.7"
          />
          <path
            d="M10.4 34.4 C10 33.2 11 32.8 11.2 33.8 C11.3 34.2 11 34.6 10.4 34.4 Z"
            fill={FLAME}
          />
        </g>

        {/* Aufgeschlagenes Buch ("scienza") */}
        <g>
          <path
            d="M24 34 C22.2 32.9 20.3 32.9 18.6 33.5 V39.1 C20.3 38.5 22.2 38.5 24 39.6 C25.8 38.5 27.7 38.5 29.4 39.1 V33.5 C27.7 32.9 25.8 32.9 24 34 Z"
            fill="var(--color-white)"
          />
          <g stroke={BOOK_LINE} strokeWidth="0.7" strokeLinecap="round">
            <line x1="24" y1="34" x2="24" y2="39.6" />
            <line x1="20" y1="35" x2="22.6" y2="35.5" />
            <line x1="25.4" y1="35.5" x2="28" y2="35" />
            <line x1="20" y1="36.6" x2="22.6" y2="37.1" />
            <line x1="25.4" y1="37.1" x2="28" y2="36.6" />
          </g>
        </g>

        {/* Doktorhut rechts */}
        <g>
          <path
            d="M33 35.6 C31.6 35.6 30.6 35 30.6 35 V36.4 C30.6 37 31.7 37.5 33 37.5 C34.3 37.5 35.4 37 35.4 36.4 V35 C35.4 35 34.4 35.6 33 35.6 Z"
            fill={CAP}
          />
          <path d="M33 32.8 L36.6 34.2 L33 35.6 L29.4 34.2 Z" fill={CAP} />
          <circle cx="33" cy="34.2" r="0.5" fill="var(--color-goldbrown)" />
          <path
            d="M36.6 34.2 V36.4"
            stroke="var(--color-goldbrown)"
            strokeWidth="0.6"
          />
          <circle cx="36.6" cy="36.7" r="0.6" fill="var(--color-goldbrown)" />
        </g>
      </g>

      {/* Stern oben über dem Schild (außerhalb des Clips) */}
      <g transform="translate(24 3.2) scale(0.3)">
        <path
          d={STAR_PATH}
          fill={STAR}
          stroke="var(--color-goldbrown)"
          strokeWidth="0.6"
        />
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
