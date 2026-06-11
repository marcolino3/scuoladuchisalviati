import { z } from "zod";
import type { HeaderNewsRow } from "@/lib/db/schema";

/**
 * Eingabe vom Admin-Formular. Datumsfelder kommen als Strings:
 *   - timed (allDay=false): ISO-String ("2026-06-13T09:00:00.000Z")
 *   - all-day (allDay=true): reines Datum ("2026-06-13")
 *   - publishUp/publishDown: immer ISO (datetime-local -> ISO im Client)
 * Die Umwandlung in `Date` passiert in den Route-Handlern (siehe parseEvent).
 */
export const createHeaderNewsSchema = z.object({
  label: z.string().min(1, "Label erforderlich").max(120),
  message: z.string().min(1, "Meldung erforderlich").max(500),
  allDay: z.boolean().default(false),
  eventStart: z.string().min(1, "Startdatum erforderlich"),
  eventEnd: z.string().nullish(),
  location: z.string().max(200).nullish(),
  published: z.boolean().default(true),
  publishUp: z.string().nullish(),
  publishDown: z.string().nullish(),
});

export const updateHeaderNewsSchema = createHeaderNewsSchema.partial();

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

/** Event-Datum je nach allDay-Modus parsen. */
export function parseEvent(v: string, allDay: boolean): Date | null {
  return allDay ? parseDateOnly(v) : parseInstant(v);
}

function toDateOnly(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** DB-Zeile -> API-Antwort (Datumsfelder serialisiert passend zu allDay). */
export function serializeHeaderNews(row: HeaderNewsRow) {
  return {
    id: row.id,
    label: row.label,
    message: row.message,
    allDay: row.allDay,
    eventStart: row.allDay
      ? toDateOnly(row.eventStart)
      : row.eventStart.toISOString(),
    eventEnd: row.eventEnd
      ? row.allDay
        ? toDateOnly(row.eventEnd)
        : row.eventEnd.toISOString()
      : null,
    location: row.location,
    published: row.published,
    publishUp: row.publishUp ? row.publishUp.toISOString() : null,
    publishDown: row.publishDown ? row.publishDown.toISOString() : null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export type HeaderNewsItem = ReturnType<typeof serializeHeaderNews>;
