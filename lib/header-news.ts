import { and, eq, gte, isNull, lte, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { headerNews } from "@/lib/db/schema";
import { earliestStart } from "@/lib/api/header-news-schema";

/**
 * Aktuell im Header sichtbare News: published = true und (jetzt) innerhalb des
 * Sichtbarkeitsfensters (publishUp/publishDown jeweils optional).
 * Sortiert nach naechstem Termin (fruehester Start aufsteigend).
 */
export async function getActiveHeaderNews() {
  const now = new Date();
  const rows = await db
    .select()
    .from(headerNews)
    .where(
      and(
        eq(headerNews.published, true),
        or(isNull(headerNews.publishUp), lte(headerNews.publishUp, now)),
        or(isNull(headerNews.publishDown), gte(headerNews.publishDown, now))
      )
    );

  return rows.sort((a, b) => earliestStart(a.dates) - earliestStart(b.dates));
}

export type HeaderNewsDateRow = {
  entryId: string;
  dateIndex: number;
  label: string;
  message: string;
  start: Date;
  end: Date | null;
  allDay: boolean;
};

/**
 * Aktive Einträge auf einzelne Termine "aufgefaltet" und global nach Start
 * sortiert — fuer die Anzeige "pro Termin eine Banner-Zeile".
 */
export async function getActiveHeaderNewsDates(): Promise<HeaderNewsDateRow[]> {
  const entries = await getActiveHeaderNews();
  const rows: HeaderNewsDateRow[] = [];
  for (const e of entries) {
    e.dates.forEach((d, i) => {
      rows.push({
        entryId: e.id,
        dateIndex: i,
        label: e.label,
        message: e.message,
        start: new Date(d.start),
        end: d.end ? new Date(d.end) : null,
        allDay: d.allDay,
      });
    });
  }
  return rows.sort((a, b) => a.start.getTime() - b.start.getTime());
}
