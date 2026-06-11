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
 */
export const Bubble = ({ src, alt = "", className }: BubbleProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-full border-[6px] border-white bg-light-beige shadow-[0_8px_28px_rgba(139,145,154,0.28)]",
        className
      )}
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      )}
    </div>
  );
};
