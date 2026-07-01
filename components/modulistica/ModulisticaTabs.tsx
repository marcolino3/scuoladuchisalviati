"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Download } from "lucide-react";

import { accentClasses } from "@/components/scuola/services-data";
import { cn } from "@/lib/utils";

import { modulisticaSchools } from "./modulistica-data";

export const ModulisticaTabs = () => {
  const [activeId, setActiveId] = useState(modulisticaSchools[1].id); // Infanzia
  const activeIndex = Math.max(
    0,
    modulisticaSchools.findIndex((s) => s.id === activeId)
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
    setActiveId(modulisticaSchools[i].id);
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
        setActiveId(modulisticaSchools[nearest].id);
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
    <div className="mt-10">
      {/* Reiter-Navigation – mobil horizontal scrollbar, ab sm zentriert */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Livelli scolastici"
        className="flex snap-x snap-mandatory items-center gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {modulisticaSchools.map((school, i) => {
          const isActive = school.id === activeId;
          const tabAccent = accentClasses[school.accent];
          return (
            <button
              key={school.id}
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
              <span aria-hidden className="size-5 shrink-0" />
              <span className="grid text-center">
                <span
                  aria-hidden
                  className="invisible col-start-1 row-start-1 font-medium"
                >
                  {school.label}
                </span>
                <span
                  className={cn(
                    "col-start-1 row-start-1",
                    isActive ? "font-medium" : "font-normal"
                  )}
                >
                  {school.label}
                </span>
              </span>
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
          {modulisticaSchools.map((school, i) => {
            const Icon = school.icon;
            const accent = accentClasses[school.accent];
            const isActive = school.id === activeId;
            return (
              <article
                key={school.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                aria-hidden={!isActive}
                className={cn(
                  "w-[min(100vw-2rem,var(--container-content))] shrink-0 snap-center rounded-[24px] bg-white p-5 shadow-[0_8px_40px_rgba(44,44,44,0.06)] ring-1 ring-black/[0.04] transition-opacity duration-300 sm:p-8 lg:p-10",
                  isActive ? "opacity-100" : "opacity-60"
                )}
              >
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
                  {/* Schul-Titel */}
                  <div className="lg:w-1/3">
                    <div className="flex flex-col items-start gap-4 lg:sticky lg:top-8">
                      <span
                        className={cn(
                          "grid size-[100px] place-items-center rounded-full border-2 border-dotted bg-white text-navy",
                          accent.activeTag
                        )}
                      >
                        <Icon
                          className="size-12"
                          strokeWidth={1.25}
                          aria-hidden
                        />
                      </span>
                      <h2 className="text-2xl leading-[1.1] tracking-tight text-navy lg:text-3xl">
                        {school.titleLead}
                        <br />
                        <span className="font-semibold">
                          {school.titleStrong}
                        </span>
                      </h2>
                    </div>
                  </div>

                  {/* Download-Liste */}
                  <ul className="flex flex-1 flex-col">
                    {school.items.map((item, j) => (
                      <li key={item.title}>
                        {j > 0 && (
                          <hr className="my-6 border-light-beige-200" />
                        )}
                        <h3 className="text-lg leading-[1.4] font-semibold text-black">
                          {item.title}
                        </h3>
                        {item.text && (
                          <p className="mt-1 text-base leading-[1.4] text-black">
                            {item.text}
                          </p>
                        )}
                        <a
                          href="#"
                          tabIndex={isActive ? undefined : -1}
                          className="mt-3 inline-flex items-center gap-2 text-base font-medium text-navy transition-colors hover:text-navy/70"
                        >
                          <Download
                            className="size-5 shrink-0"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                          Scarica il modulo PDF ({item.size})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
