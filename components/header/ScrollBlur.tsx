"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Frosted-Blur-Streifen oberhalb der sticky Desktop-Nav. Wird erst sichtbar,
 * sobald die HeaderNews-Leiste oben aus dem Viewport gescrollt ist — getriggert
 * ueber einen Sentinel am Ende der HeaderNews (siehe Header.tsx).
 *
 * Nur Desktop (lg+), da die Nav-Pille erst dort sticky ist.
 */
export const ScrollBlur = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("header-news-end");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Sentinel hat den oberen Viewport-Rand passiert => HeaderNews ist raus
        setActive(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-30 hidden h-32 backdrop-blur-md transition-opacity duration-300 lg:block",
        "bg-gradient-to-b from-white/70 via-white/40 to-transparent",
        "[mask-image:linear-gradient(to_bottom,black_50%,transparent)]",
        active ? "opacity-100" : "opacity-0"
      )}
    />
  );
};
