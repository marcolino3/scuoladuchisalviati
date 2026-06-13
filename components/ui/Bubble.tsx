import Image from "next/image";

import { cn } from "@/lib/utils";

interface BubbleProps {
  /** Bildquelle. Ohne src wird ein farbiger Platzhalter gezeigt. */
  src?: string;
  alt?: string;
  /** Positions-/Größen-Utilities (absolute, h-…, w-…, top-…, …). */
  className?: string;
}

/**
 * Runder Foto-"Bubble" mit weißem Ring und weichem Schatten.
 * Größe & Position werden über className gesteuert.
 * `relative` macht den Container zum Bezugsrahmen für das `fill`-Bild;
 * absolut positionierte Aufrufe überschreiben das via tailwind-merge.
 */
export const Bubble = ({ src, alt = "", className }: BubbleProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full border-[6px] border-white bg-light-beige shadow-[0_8px_28px_rgba(139,145,154,0.28)]",
        className
      )}
    >
      {src && (
        <Image src={src} alt={alt} fill sizes="360px" className="object-cover" />
      )}
    </div>
  );
};
