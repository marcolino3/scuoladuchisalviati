"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  /** Nur exakte Übereinstimmung als aktiv werten (z.B. die Startseite "/"). */
  exact?: boolean;
}

export const NavItem = ({ href, children, exact = false }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "text-navy flex items-center justify-center gap-2 px-4 py-2 text-center text-[18px] leading-[1.4] font-semibold tracking-[-0.36px] whitespace-nowrap underline-offset-[6px] decoration-navy decoration-2 transition-colors hover:underline",
        isActive && "underline"
      )}
    >
      {children}
    </Link>
  );
};
