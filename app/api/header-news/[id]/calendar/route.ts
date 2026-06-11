import { type NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { headerNews } from "@/lib/db/schema";
import { buildIcs, icsFilename } from "@/lib/ics";

/**
 * GET /api/header-news/[id]/calendar — .ics-Datei zum Termin (oeffentlich).
 * Nur fuer veroeffentlichte Eintraege.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const row = (
    await db
      .select()
      .from(headerNews)
      .where(and(eq(headerNews.id, id), eq(headerNews.published, true)))
      .limit(1)
  )[0];

  if (!row) {
    return new Response("Not found", { status: 404 });
  }

  const ics = buildIcs({
    uid: `${row.id}@duchisalviati`,
    stamp: row.updatedAt,
    start: row.eventStart,
    end: row.eventEnd,
    allDay: row.allDay,
    summary: row.label,
    description: row.message,
    location: row.location,
  });

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${icsFilename(row.label)}"`,
      "Cache-Control": "no-store",
    },
  });
}
