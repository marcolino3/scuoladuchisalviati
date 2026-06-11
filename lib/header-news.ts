import { and, asc, eq, gte, isNull, lte, or } from "drizzle-orm";
import { db } from "@/lib/db";
import { headerNews } from "@/lib/db/schema";

/**
 * Aktuell im Header sichtbare News: published = true und (jetzt) innerhalb des
 * Sichtbarkeitsfensters (publishUp/publishDown jeweils optional).
 * Sortiert nach naechstem Termin (eventStart aufsteigend).
 */
export async function getActiveHeaderNews() {
  const now = new Date();
  return db
    .select()
    .from(headerNews)
    .where(
      and(
        eq(headerNews.published, true),
        or(isNull(headerNews.publishUp), lte(headerNews.publishUp, now)),
        or(isNull(headerNews.publishDown), gte(headerNews.publishDown, now))
      )
    )
    .orderBy(asc(headerNews.eventStart));
}
