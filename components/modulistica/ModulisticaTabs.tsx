"use client";

import { useState } from "react";
import { Check, Download } from "lucide-react";

import { accentClasses } from "@/components/scuola/services-data";
import { BrandButton } from "@/components/ui/BrandButton";
import { cn } from "@/lib/utils";

import { modulisticaSchools } from "./modulistica-data";

export const ModulisticaTabs = () => {
  const [activeId, setActiveId] = useState(modulisticaSchools[1].id); // Infanzia
  const active =
    modulisticaSchools.find((s) => s.id === activeId) ?? modulisticaSchools[1];
  const ActiveIcon = active.icon;

  return (
    <div className="mt-10">
      {/* Reiter-Navigation */}
      <div
        role="tablist"
        aria-label="Livelli scolastici"
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {modulisticaSchools.map((school) => {
          const isActive = school.id === activeId;
          const tabAccent = accentClasses[school.accent];
          return (
            <button
              key={school.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(school.id)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-[24px] border px-4 py-2 text-lg leading-[1.4] whitespace-nowrap text-black transition-colors",
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

      {/* Karte */}
      <div className="mt-8 rounded-[24px] bg-white p-5 shadow-[0_8px_40px_rgba(44,44,44,0.06)] ring-1 ring-black/[0.04] sm:p-8 lg:p-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* Schul-Titel */}
          <div className="lg:w-1/3">
            <div className="flex flex-col items-start gap-4 lg:sticky lg:top-8">
              <span className="grid size-[100px] place-items-center rounded-full bg-light-grey text-navy">
                <ActiveIcon className="size-12" strokeWidth={1.25} aria-hidden />
              </span>
              <h2 className="text-2xl leading-[1.1] tracking-tight text-navy lg:text-3xl">
                {active.titleLead}
                <br />
                <span className="font-semibold">{active.titleStrong}</span>
              </h2>
            </div>
          </div>

          {/* Download-Liste */}
          <ul className="flex flex-1 flex-col">
            {active.items.map((item, i) => (
              <li key={item.title}>
                {i > 0 && <hr className="my-6 border-light-beige-200" />}
                <h3 className="text-lg leading-[1.4] font-semibold text-black">
                  {item.title}
                </h3>
                {item.text && (
                  <p className="mt-1 text-base leading-[1.4] text-black">
                    {item.text}
                  </p>
                )}
                <BrandButton
                  href="#"
                  variant="solid"
                  color={active.accent}
                  iconLeft={Download}
                  className="mt-3"
                >
                  Scarica il modulo PDF ({item.size})
                </BrandButton>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
