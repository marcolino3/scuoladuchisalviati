"use client";

import { type ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer?: ReactNode;
}

interface AccordionProps {
  items: FaqItem[];
  className?: string;
  /** Index, der initial geöffnet ist (Standard: keiner). */
  defaultOpen?: number | null;
}

export const Accordion = ({
  items,
  className,
  defaultOpen = null,
}: AccordionProps) => {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div
      className={cn(
        "flex flex-col divide-y divide-light-beige-200 overflow-hidden rounded-[16px] border border-light-beige-200 bg-white",
        className
      )}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-light-beige-50"
            >
              <span className="text-lg font-semibold text-black">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-black transition-transform",
                  isOpen && "rotate-180"
                )}
                aria-hidden
              />
            </button>
            {isOpen && item.answer && (
              <div className="px-6 pb-5 text-base leading-[1.4] text-black/80">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
