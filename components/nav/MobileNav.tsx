"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { navLinks } from "./nav-links";

export const MobileNav = () => {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Menü öffnen">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-4/5 max-w-xs gap-0 bg-white/95 backdrop-blur-[18px]"
      >
        <SheetHeader>
          <SheetTitle className="text-left text-[18px] font-bold text-navy">
            Navigation
          </SheetTitle>
        </SheetHeader>

        <nav
          aria-label="Mobile Navigation"
          className="flex flex-col gap-1 px-4 pb-6"
        >
          {navLinks.map(({ href, label, exact }) => (
            <SheetClose asChild key={href}>
              <Link
                href={href}
                aria-current={isActive(href, exact) ? "page" : undefined}
                className={cn(
                  "rounded-[8px] px-4 py-3 text-[18px] leading-[1.4] font-semibold tracking-[-0.36px] text-navy transition-colors hover:bg-light-grey",
                  isActive(href, exact) && "bg-light-grey"
                )}
              >
                {label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
