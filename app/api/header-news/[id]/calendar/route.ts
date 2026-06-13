import { type NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { headerNews } from "@/lib/db/schema";
import { buildIcs, icsFilename } from "@/lib/ics";

/**
 * GET /api/header-news/[id]/calendar — .ics-Datei mit allen Terminen des
 * Eintrags (oeffentlich, nur fuer veroeffentlichte Eintraege).
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const row = (
    await db
      .select()
      .from(headerNews)
      .where(and(eq(headerNews.id, id), eq(headerNews.published, true)))
      .limit(1)
  )[0];

  if (!row || row.dates.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  // Optional: ?i=<index> liefert nur einen einzelnen Termin als .ics.
  const raw = _req.nextUrl.searchParams.get("i");
  const idx = raw === null ? null : Number(raw);
  const selected =
    idx !== null && Number.isInteger(idx) && idx >= 0 && idx < row.dates.length
      ? [{ d: row.dates[idx], i: idx }]
      : row.dates.map((d, i) => ({ d, i }));

  const ics = buildIcs(
    selected.map(({ d, i }) => ({
      uid: `${row.id}-${i}@duchisalviati`,
      stamp: row.updatedAt,
      start: new Date(d.start),
      end: d.end ? new Date(d.end) : null,
      allDay: d.allDay,
      summary: row.label,
      description: row.message,
      location: row.location,
    }))
  );

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${icsFilename(row.label)}"`,
      "Cache-Control": "no-store",
    },
  });
}
