import { z } from "zod";
import type { HeaderNewsDate, HeaderNewsRow } from "@/lib/db/schema";

/**
 * Eingabe vom Admin-Formular. Pro Termin kommen Datumsfelder als Strings:
 *   - timed (allDay=false): ISO-String ("2026-06-13T09:00:00.000Z")
 *   - all-day (allDay=true): reines Datum ("2026-06-13")
 *   - publishUp/publishDown: immer ISO (datetime-local -> ISO im Client)
 * Die Umwandlung der Termine in Speicher-ISO passiert via normalizeDates().
 */
const dateInputSchema = z.object({
  start: z.string().min(1, "Data di inizio obbligatoria"),
  end: z.string().nullish(),
  allDay: z.boolean().default(false),
});

export const createHeaderNewsSchema = z.object({
  label: z.string().min(1, "Etichetta obbligatoria").max(120),
  message: z.string().min(1, "Messaggio obbligatorio").max(500),
  dates: z.array(dateInputSchema).min(1, "È richiesta almeno una data"),
  location: z.string().max(200).nullish(),
  published: z.boolean().default(true),
  publishUp: z.string().nullish(),
  publishDown: z.string().nullish(),
});

export const updateHeaderNewsSchema = createHeaderNewsSchema.partial();

export type DateInput = z.infer<typeof dateInputSchema>;

/** ISO-String -> Date (absoluter Zeitpunkt). */
export function parseInstant(v?: string | null): Date | null {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

/** "YYYY-MM-DD" -> Date an UTC-Mitternacht (stabiles Datum, keine TZ-Drift). */
export function parseDateOnly(v?: string | null): Date | null {
  if (!v) return null;
  const d = new Date(`${v}T00:00:00.000Z`);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Formular-Termine -> Speicher-Repraesentation (alle Werte als ISO-String).
 * Wirft bei ungueltigem Startdatum.
 */
export function normalizeDates(input: DateInput[]): HeaderNewsDate[] {
  return input.map((d) => {
    const start = d.allDay ? parseDateOnly(d.start) : parseInstant(d.start);
    if (!start) throw new Error("Data di inizio non valida");
    const end = d.end
      ? d.allDay
        ? parseDateOnly(d.end)
        : parseInstant(d.end)
      : null;
    return {
      start: start.toISOString(),
      end: end ? end.toISOString() : null,
      allDay: d.allDay,
    };
  });
}

/** Termin fuer die API/das Formular serialisieren (all-day -> reines Datum). */
function serializeDate(d: HeaderNewsDate): HeaderNewsDate {
  return {
    start: d.allDay ? d.start.slice(0, 10) : d.start,
    end: d.end ? (d.allDay ? d.end.slice(0, 10) : d.end) : null,
    allDay: d.allDay,
  };
}

/** Fruehester Start-Zeitpunkt eines Eintrags (fuer Sortierung). */
export function earliestStart(dates: HeaderNewsDate[]): number {
  return dates.reduce(
    (min, d) => Math.min(min, new Date(d.start).getTime()),
    Infinity
  );
}

/** DB-Zeile -> API-Antwort. */
export function serializeHeaderNews(row: HeaderNewsRow) {
  return {
    id: row.id,
    label: row.label,
    message: row.message,
    dates: row.dates.map(serializeDate),
    location: row.location,
    published: row.published,
    publishUp: row.publishUp ? row.publishUp.toISOString() : null,
    publishDown: row.publishDown ? row.publishDown.toISOString() : null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export type HeaderNewsItem = ReturnType<typeof serializeHeaderNews>;
