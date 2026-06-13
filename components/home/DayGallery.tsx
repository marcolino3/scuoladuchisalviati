"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Bild-Slider für „La nostra scuola in un giorno".
 * Aktuell Platzhalter: alle Slides nutzen dasselbe Bild.
 */
const slides = [
  "/images/home/video.jpg",
  "/images/home/video.jpg",
  "/images/home/video.jpg",
];

export const DayGallery = () => {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const goTo = (i: number) => setIndex((i + count) % count);

  return (
    <div className="relative">
      <div className="relative aspect-[1256/550] overflow-hidden rounded-[24px]">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((src, i) => (
            <div key={i} className="relative h-full w-full shrink-0">
              <Image
                src={src}
                alt="La nostra scuola in un giorno"
                fill
                sizes="100vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Immagine precedente"
        className="absolute top-1/2 left-4 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-black hover:text-white md:grid"
      >
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Immagine successiva"
        className="absolute top-1/2 right-4 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-black hover:text-white md:grid"
      >
        <ChevronRight className="size-5" aria-hidden />
      </button>

      {/* Punkt-Navigation */}
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Vai all'immagine ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "size-2.5 rounded-full transition-colors",
              i === index ? "bg-navy" : "bg-light-beige"
            )}
          />
        ))}
      </div>
    </div>
  );
};
