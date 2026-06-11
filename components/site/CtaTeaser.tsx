import { Mail } from "lucide-react";

import { BrandButton } from "@/components/ui/BrandButton";
import { cn } from "@/lib/utils";

interface CtaTeaserProps {
  title?: string;
  text?: string;
  className?: string;
}

/** Wiederkehrender CTA-Teaser („Hai domande…") – auf mehreren Seiten genutzt. */
export const CtaTeaser = ({
  title = "Hai domande o qualcosa non ti è ancora chiaro?",
  text = "Siamo sempre a disposizione per rispondere alle vostre domande e fornire tutte le informazioni necessarie. Non esitate a contattarci per qualsiasi dubbio: il nostro team sarà lieto di aiutarvi e accompagnarvi nella scelta del percorso educativo più adatto al vostro bambino.",
  className,
}: CtaTeaserProps) => {
  return (
    <section className={cn("mt-20 lg:mt-28", className)}>
      <div className="rounded-[20px] bg-light-grey p-4 sm:p-8">
        <div className="flex flex-col gap-6 rounded-[16px] bg-white p-8 sm:p-14 lg:flex-row lg:gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold tracking-tight text-black">
              {title}
            </h2>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-8">
            <p className="text-base leading-[1.4] text-black">{text}</p>
            <div className="flex flex-wrap gap-6">
              <BrandButton href="/contatti" variant="solid" color="goldbrown">
                Vai alla pagina dei contatti
              </BrandButton>
              <BrandButton href="/contatti" variant="outline" iconLeft={Mail}>
                Scrivici
              </BrandButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
