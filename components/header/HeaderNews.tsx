import { CalendarPlus, Lightbulb } from "lucide-react";

interface HeaderNewsProps {
  /** Hervorgehobenes Label, z.B. "Open Day". */
  label?: string;
  /** Fließtext der Meldung. */
  message?: string;
  /** Ziel für "Aggiungi al calendario" (z.B. .ics-Datei). */
  calendarHref?: string;
}

export const HeaderNews = ({
  label = "Open Day",
  message = "Scuola Infanzia e Scuola Primaria: Sabato 13. Dicembre e Martedì 13. Gennaio",
  calendarHref = "#",
}: HeaderNewsProps) => {
  return (
    <div className="w-full border-b border-light-beige">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-3">
        <p className="flex items-center gap-3 text-base leading-[1.4]">
          <Lightbulb className="size-5 shrink-0 text-black" aria-hidden />
          <span>
            <span className="font-semibold text-success">{label}</span>
            <span className="font-semibold text-black">: </span>
            <span className="text-black">{message}</span>
          </span>
        </p>

        <a
          href={calendarHref}
          className="flex shrink-0 items-center gap-2 rounded-[8px] px-[17px] py-[9px] text-sm leading-[1.4] font-medium text-navy transition-colors hover:bg-navy/5"
        >
          <CalendarPlus className="size-4 shrink-0" aria-hidden />
          Aggiungi al calendario
        </a>
      </div>
    </div>
  );
};
