import { CalendarPlus, Lightbulb } from "lucide-react";
import { getActiveHeaderNewsDates } from "@/lib/header-news";

// All-Day rechnet in UTC, getimte Termine in lokaler Zeit (Europe/Rome).
const TZ_ALLDAY = "UTC";
const TZ_TIMED = "Europe/Rome";

function datePart(d: Date, tz: string): string {
  return d.toLocaleDateString("it-IT", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    timeZone: tz,
  });
}

function timePart(d: Date, tz: string): string {
  return d.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: tz,
  });
}

/** Kalendertag (YYYY-MM-DD) in der jeweiligen Zeitzone, um gleiche Tage zu erkennen. */
function dayKey(d: Date, tz: string): string {
  return d.toLocaleDateString("en-CA", { timeZone: tz });
}

/**
 * Termin lesbar formatieren:
 * - Uhrzeit 00:00 wird weggelassen (gilt als reine Datumsangabe).
 * - Ende inkl. Datum/Uhrzeit anzeigen, falls vorhanden.
 * - Bei gleichem Start-/Endtag das Datum nur einmal nennen.
 */
function formatDateLabel(start: Date, end: Date | null, allDay: boolean): string {
  const tz = allDay ? TZ_ALLDAY : TZ_TIMED;

  const startDate = datePart(start, tz);
  const startTime =
    !allDay && timePart(start, tz) !== "00:00" ? timePart(start, tz) : "";
  const startLabel = startTime ? `${startDate}, ${startTime}` : startDate;

  if (!end) return startLabel;

  const endDate = datePart(end, tz);
  const endTime =
    !allDay && timePart(end, tz) !== "00:00" ? timePart(end, tz) : "";

  if (dayKey(start, tz) === dayKey(end, tz)) {
    // Gleicher Tag: Datum einmal, Uhrzeiten zusammenfassen.
    if (startTime && endTime) return `${startDate}, ${startTime} – ${endTime}`;
    if (startTime) return `${startDate}, ${startTime}`;
    if (endTime) return `${startDate}, ${endTime}`;
    return startDate;
  }

  const endLabel = endTime ? `${endDate}, ${endTime}` : endDate;
  return `${startLabel} – ${endLabel}`;
}

export const HeaderNews = async () => {
  const rows = await getActiveHeaderNewsDates();
  if (rows.length === 0) return null;

  return (
    <>
      {rows.map((row) => (
        <div
          key={`${row.entryId}-${row.dateIndex}`}
          className="w-full border-b border-light-beige"
        >
          <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-3">
            <p className="flex items-center gap-3 text-base leading-[1.4]">
              <Lightbulb className="size-5 shrink-0 text-black" aria-hidden />
              <span>
                <span className="font-semibold text-success">{row.label}</span>
                <span className="font-semibold text-black">: </span>
                <span className="text-black">{row.message}</span>
                <span className="font-semibold text-black">
                  {" — "}
                  {formatDateLabel(row.start, row.end, row.allDay)}
                </span>
              </span>
            </p>

            <a
              href={`/api/header-news/${row.entryId}/calendar?i=${row.dateIndex}`}
              className="flex shrink-0 items-center gap-2 rounded-[8px] px-[17px] py-[9px] text-sm leading-[1.4] font-medium text-navy transition-colors hover:bg-navy/5"
            >
              <CalendarPlus className="size-4 shrink-0" aria-hidden />
              Aggiungi al calendario
            </a>
          </div>
        </div>
      ))}
    </>
  );
};
