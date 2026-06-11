"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

import { BrandButton } from "@/components/ui/BrandButton";
import { cn } from "@/lib/utils";

import { accentClasses, serviceTabs } from "./services-data";

export const ServicesTabs = () => {
  const [activeId, setActiveId] = useState(serviceTabs[2].id); // "Scuola Primaria"
  const active = serviceTabs.find((t) => t.id === activeId) ?? serviceTabs[2];
  const ActiveIcon = active.icon;

  const trackRef = useRef<HTMLDivElement>(null);
  const slide = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="mt-20 lg:mt-28">
      <h2 className="text-center text-4xl font-semibold tracking-tight text-black lg:text-5xl">
        I nostri servizi
      </h2>

      {/* Reiter-Navigation */}
      <div
        role="tablist"
        aria-label="Livelli scolastici"
        className="mt-10 flex flex-wrap items-center justify-center gap-2"
      >
        {serviceTabs.map((tab) => {
          const isActive = tab.id === activeId;
          const tabAccent = accentClasses[tab.accent];
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-[24px] border px-4 py-2 text-lg leading-[1.4] whitespace-nowrap text-black transition-colors",
                isActive
                  ? cn("bg-white", tabAccent.activeTag)
                  : "border-grey hover:border-black"
              )}
            >
              {/* Linker Platzhalter = Check-Breite → hält den Begriff zentriert. */}
              <span aria-hidden className="size-5 shrink-0" />
              {/* Begriff zentriert; unsichtbarer Fett-Klon hält die Breite
                  konstant, damit der Tab beim Aktivieren nicht springt. */}
              <span className="grid text-center">
                <span
                  aria-hidden
                  className="invisible col-start-1 row-start-1 font-medium"
                >
                  {tab.label}
                </span>
                <span
                  className={cn(
                    "col-start-1 row-start-1",
                    isActive ? "font-medium" : "font-normal"
                  )}
                >
                  {tab.label}
                </span>
              </span>
              {/* Check immer gerendert (reserviert Platz), nur Sichtbarkeit toggelt. */}
              <Check
                className={cn(
                  "size-5 shrink-0 transition-opacity",
                  isActive ? cn("opacity-100", tabAccent.check) : "opacity-0"
                )}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      {/* Karte */}
      <div className="mt-8 rounded-[24px] bg-white p-5 shadow-[0_8px_40px_rgba(44,44,44,0.06)] ring-1 ring-black/[0.04] sm:p-8 lg:p-10">
        {/* Bild-Galerie als Slider / Swiper (Platzhalter) */}
        <div className="group/slider relative">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[
              "/images/scuola/gallery-1.jpg",
              "/images/scuola/gallery-2.jpg",
              "/images/scuola/gallery-3.jpg",
              "/images/scuola/gallery-4.jpg",
            ].map((src) => (
              <div
                key={src}
                className="aspect-square w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl bg-light-beige-200 sm:w-[260px]"
              >
                <Image
                  src={src}
                  alt=""
                  width={260}
                  height={260}
                  className="size-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Pfeile (nur Desktop – mobil per Touch-Swipe) */}
          <button
            type="button"
            aria-label="Vorherige Bilder"
            onClick={() => slide(-1)}
            className="absolute top-1/2 left-3 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-[0_2px_12px_rgba(44,44,44,0.18)] transition-colors hover:bg-black hover:text-white md:grid"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Weitere Bilder"
            onClick={() => slide(1)}
            className="absolute top-1/2 right-3 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-[0_2px_12px_rgba(44,44,44,0.18)] transition-colors hover:bg-black hover:text-white md:grid"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>

        {/* Inhalt: Titel/Buttons + Feature-Liste */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:gap-8">
          {/* Linke Spalte */}
          <div className="flex flex-1 flex-col items-start gap-8">
            <div className="flex flex-col items-start gap-4">
              <span className="grid size-[100px] place-items-center rounded-full bg-light-grey text-navy">
                <ActiveIcon className="size-12" strokeWidth={1.25} aria-hidden />
              </span>
              <h3 className="text-3xl leading-[1.1] tracking-tight text-navy lg:text-[2.625rem]">
                {active.titleLead}
                <span className="font-semibold">{active.titleStrong}</span>
              </h3>
            </div>

            <div className="flex flex-col items-start gap-6">
              <BrandButton
                variant="solid"
                color={active.accent}
                iconLeft={Download}
              >
                {active.downloadLabel}
              </BrandButton>
              <BrandButton variant="outline" iconRight={ArrowRight}>
                Contattaci per informazioni
              </BrandButton>
            </div>
          </div>

          {/* Rechte Spalte: Feature-Liste */}
          <ul className="flex flex-1 flex-col">
            {active.features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <li key={feature.title}>
                  {i > 0 && <hr className="my-6 border-light-beige-200" />}
                  <div className="flex items-center gap-2">
                    <Icon
                      className="size-5 shrink-0 text-black"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <h4 className="text-lg leading-[1.4] font-semibold text-black">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="mt-1 text-base leading-[1.4] text-black">
                    {feature.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
