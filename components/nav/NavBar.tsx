import { Logo } from "@/components/ui/Logo";

import { NavItem } from "./NavItem";
import { navLinks } from "./nav-links";

export const NavBar = () => {
  return (
    <nav
      aria-label="Hauptnavigation"
      className="mx-auto flex w-fit items-center gap-2 rounded-[32px] border-2 border-light-grey bg-white/80 py-2 pr-6 pl-4 shadow-[0_2px_4px_0_rgba(139,145,154,0.18)] backdrop-blur-[18px] xl:gap-5"
    >
      <Logo className="px-4 py-2" />
      {navLinks.map(({ href, label, exact }) => (
        <NavItem key={href} href={href} exact={exact}>
          {label}
        </NavItem>
      ))}
    </nav>
  );
};
