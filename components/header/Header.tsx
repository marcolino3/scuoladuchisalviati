import { MobileNav } from "@/components/nav/MobileNav";
import { NavBar } from "@/components/nav/NavBar";
import { Logo } from "@/components/ui/Logo";

import { HeaderNews } from "./HeaderNews";
import { ScrollBlur } from "./ScrollBlur";

export const Header = () => {
  return (
    <header className="contents">
      {/* Frosted-Blur oberhalb der Nav, sobald HeaderNews aus der View ist */}
      <ScrollBlur />
      {/* Mobile (Standard): Marke + Hamburger — Strip mit Border-Bottom */}
      <div className="mx-auto flex w-full max-w-content items-center justify-between border-b border-light-grey px-4 py-3 lg:hidden">
        <Logo />
        <MobileNav />
      </div>

      {/* HeaderNews: volle Viewport-Breite, ohne Border (mobil unter Strip, am Desktop oben) */}
      <HeaderNews />

      {/* Sentinel: markiert das Ende der HeaderNews für den Scroll-Blur-Trigger */}
      <div id="header-news-end" aria-hidden className="h-0 w-full" />

      {/* Desktop (ab lg): volle Nav-Pille, klebt mit 32px Abstand oben (Blur über Pille) */}
      <div className="sticky top-8 z-40 mx-auto hidden w-full max-w-content px-4 py-4 lg:block">
        <NavBar />
      </div>
    </header>
  );
};
