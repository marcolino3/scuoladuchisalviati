"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Download } from "lucide-react";

import { BrandButton } from "@/components/ui/BrandButton";
import { cn } from "@/lib/utils";

import { accentClasses, serviceTabs } from "./services-data";

const galleryImages = [
  "/images/scuola/gallery-1.jpg",
  "/images/scuola/gallery-2.jpg",
  "/images/scuola/gallery-3.jpg",
  "/images/scuola/gallery-4.jpg",
];

/** Bild-Galerie einer Karte – horizontaler Slider (mobil & Desktop per Swipe). */
const ServiceGallery = () => (
  <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    {galleryImages.map((src) => (
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
);

export const ServicesTabs = () => {
  const [activeId, setActiveId] = useState(serviceTabs[2].id); // "Scuola Primaria"
  const activeIndex = Math.max(
    0,
    serviceTabs.findIndex((t) => t.id === activeId)
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Karte i mittig in den Track scrollen (Peek-Carousel).
  const scrollToCard = (i: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    const card = cardRefs.current[i];
    if (!track || !card) return;
    const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left, behavior });
  };

  // Aktiven Reiter im (mobil scrollbaren) Tablist mittig halten.
  const scrollTabIntoView = (i: number) => {
    const tabs = tabsRef.current;
    const tab = tabRefs.current[i];
    if (!tabs || !tab) return;
    const left = tab.offsetLeft - (tabs.clientWidth - tab.clientWidth) / 2;
    tabs.scrollTo({ left, behavior: "smooth" });
  };

  const selectIndex = (i: number) => {
    setActiveId(serviceTabs[i].id);
    scrollToCard(i);
  };

  // Startposition: aktive Karte ohne Animation mittig setzen.
  useEffect(() => {
    scrollToCard(activeIndex, "auto");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Beim Swipen die mittig stehende Karte als aktiv markieren.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let min = Infinity;
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const cardCenter = card.offsetLeft + card.clientWidth / 2;
          const distance = Math.abs(cardCenter - center);
          if (distance < min) {
            min = distance;
            nearest = i;
          }
        });
        setActiveId(serviceTabs[nearest].id);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Reiter dem aktiven Stand nachführen (mobiler Tab-Swiper).
  useEffect(() => {
    scrollTabIntoView(activeIndex);
  }, [activeIndex]);

  return (
    <section className="mt-20 lg:mt-28">
      <h2 className="text-center text-4xl font-semibold tracking-tight text-black lg:text-5xl">
        I nostri servizi
      </h2>

      {/* Reiter-Navigation – mobil horizontal scrollbar, ab sm zentriert */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Livelli scolastici"
        className="mt-10 flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {serviceTabs.map((tab, i) => {
          const isActive = tab.id === activeId;
          const tabAccent = accentClasses[tab.accent];
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              aria-selected={isActive}
              onClick={() => selectIndex(i)}
              className={cn(
                "flex shrink-0 snap-center items-center justify-center gap-2 rounded-[24px] border px-4 py-2 text-lg leading-[1.4] whitespace-nowrap text-black transition-colors",
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

      {/* Karten-Swiper: aktive Karte in Originalbreite mittig, Nachbarn füllen
          den restlichen Viewport (Full-Bleed-Track, ohne Breitenlimit). */}
      <div className="mt-8 mx-[calc(50%-50vw)]">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-var(--container-content))/2))] pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {serviceTabs.map((tab, i) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeId;
            return (
              <article
                key={tab.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                aria-hidden={!isActive}
                className={cn(
                  "w-[min(100vw-2rem,var(--container-content))] shrink-0 snap-center rounded-[24px] bg-white p-5 shadow-[0_8px_40px_rgba(44,44,44,0.06)] ring-1 ring-black/[0.04] transition-opacity duration-300 sm:p-8 lg:p-10",
                  isActive ? "opacity-100" : "opacity-60"
                )}
              >
                {/* Bild-Galerie */}
                <ServiceGallery />

                {/* Inhalt: Titel/Buttons + Feature-Liste */}
                <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:gap-8">
                  {/* Linke Spalte */}
                  <div className="flex flex-1 flex-col items-start gap-8">
                    <div className="flex flex-col items-start gap-4">
                      <span className="grid size-[100px] place-items-center rounded-full bg-light-grey text-navy">
                        <Icon
                          className="size-12"
                          strokeWidth={1.25}
                          aria-hidden
                        />
                      </span>
                      <h3 className="text-3xl leading-[1.1] tracking-tight text-navy lg:text-[2.625rem]">
                        {tab.titleLead}
                        <span className="font-semibold">{tab.titleStrong}</span>
                      </h3>
                    </div>

                    <div className="flex flex-col items-start gap-6">
                      <BrandButton
                        variant="solid"
                        color={tab.accent}
                        iconLeft={Download}
                        tabIndex={isActive ? undefined : -1}
                      >
                        {tab.downloadLabel}
                      </BrandButton>
                      <BrandButton
                        variant="outline"
                        iconRight={ArrowRight}
                        tabIndex={isActive ? undefined : -1}
                      >
                        Contattaci per informazioni
                      </BrandButton>
                    </div>
                  </div>

                  {/* Rechte Spalte: Feature-Liste */}
                  <ul className="flex flex-1 flex-col">
                    {tab.features.map((feature, j) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <li key={feature.title}>
                          {j > 0 && (
                            <hr className="my-6 border-light-beige-200" />
                          )}
                          <div className="flex items-center gap-2">
                            <FeatureIcon
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
