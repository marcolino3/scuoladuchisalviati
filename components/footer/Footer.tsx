import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { INSTAGRAM_PROFILE } from "@/lib/links";

const footerNav = [
  { href: "/", label: "Home" },
  { href: "/scuola", label: "La Scuola" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/news-storia", label: "News & Storia" },
  { href: "/modulistica-faq", label: "Modulistica & FAQ" },
  { href: "/contatti", label: "Contatti" },
];

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-light-beige-200 bg-light-beige-50 lg:mt-28">
      <div className="mx-auto max-w-content px-4 py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Marke */}
          <div>
            <p className="text-base text-black/70">Casa di Procura Missionaria</p>
            <p className="mt-1 text-xl leading-tight font-semibold text-navy">
              Instituto Paritario
              <br />
              Duchi Salviati
            </p>
          </div>

          {/* Sede e Contatti */}
          <div>
            <h2 className="text-lg font-semibold text-navy">Sede e Contatti</h2>
            <address className="mt-4 flex flex-col gap-2 text-base text-black not-italic">
              <span>
                Viale Dei Pini, 194
                <br />
                56019 Vecchiano (PI)
              </span>
              <span>P.IVA: 01519250508</span>
              <span>
                Telefono:{" "}
                <a className="underline" href="tel:+39050804100">
                  +39 050 804 100
                </a>
              </span>
              <span>
                Email:{" "}
                <a className="underline" href="mailto:scuola.salviati@virgillio.it">
                  scuola.salviati@virgillio.it
                </a>
              </span>
              <span>
                PEC:{" "}
                <a className="underline" href="mailto:scuola.salviati@pec.it">
                  scuola.salviati@pec.it
                </a>
              </span>
            </address>
          </div>

          {/* Navigazione */}
          <div>
            <h2 className="text-lg font-semibold text-navy">Navigazione</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {footerNav.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-base text-black transition-colors hover:text-navy"
                  >
                    <ArrowRight
                      className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-8 border-light-beige-200" />

        {/* Untere Zeile */}
        <div className="flex flex-col gap-4 text-sm text-black/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/impressum" className="underline hover:text-black">
              Impressum e Privacy Policy
            </Link>
            <span>
              © 2026 Scuola Paritaria Duchi Salviati – Tutti i diritti riservati.
            </span>
          </div>
          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-black"
          >
            <InstagramIcon className="size-5 shrink-0" />
            Seguici su Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};
