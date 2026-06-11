export interface NavLink {
  href: string;
  label: string;
  /** Nur exakte Übereinstimmung als aktiv werten (z.B. die Startseite "/"). */
  exact?: boolean;
}

export const navLinks: NavLink[] = [
  { href: "/scuola", label: "La Scuola" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/news-storia", label: "News & Storia" },
  { href: "/modulistica-faq", label: "Modulistica & FAQ" },
  { href: "/contatti", label: "Contatti" },
];
