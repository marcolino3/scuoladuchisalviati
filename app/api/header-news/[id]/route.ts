import { type NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { headerNews } from "@/lib/db/schema";
import { requireAdmin, unauthorized } from "@/lib/api/auth-guard";
import {
  parseEvent,
  parseInstant,
  serializeHeaderNews,
  updateHeaderNewsSchema,
} from "@/lib/api/header-news-schema";

type Params = { params: Promise<{ id: string }> };

/** PATCH /api/header-news/[id] — Header-News bearbeiten (Admin). */
export async function PATCH(req: NextRequest, { params }: Params) {
  if (!(await requireAdmin())) return unauthorized();
  const { id } = await params;

  const json = await req.json().catch(() => null);
  const parsed = updateHeaderNewsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const d = parsed.data;

  const current = (
    await db.select().from(headerNews).where(eq(headerNews.id, id)).limit(1)
  )[0];
  if (!current) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // allDay-Modus: explizit gesetzt, sonst der bestehende Wert.
  const allDay = d.allDay ?? current.allDay;

  const set: Partial<typeof headerNews.$inferInsert> = { updatedAt: new Date() };
  if (d.label !== undefined) set.label = d.label;
  if (d.message !== undefined) set.message = d.message;
  if (d.allDay !== undefined) set.allDay = d.allDay;
  if (d.location !== undefined) set.location = d.location ?? null;
  if (d.published !== undefined) set.published = d.published;

  if (d.eventStart !== undefined) {
    const ev = parseEvent(d.eventStart, allDay);
    if (!ev) {
      return NextResponse.json(
        { error: "Ungültiges Startdatum" },
        { status: 400 }
      );
    }
    set.eventStart = ev;
  }
  if (d.eventEnd !== undefined) {
    set.eventEnd = d.eventEnd ? parseEvent(d.eventEnd, allDay) : null;
  }
  if (d.publishUp !== undefined) set.publishUp = parseInstant(d.publishUp);
  if (d.publishDown !== undefined) set.publishDown = parseInstant(d.publishDown);

  const updated = await db
    .update(headerNews)
    .set(set)
    .where(eq(headerNews.id, id))
    .returning();

  return NextResponse.json({ data: serializeHeaderNews(updated[0]) });
}

/** DELETE /api/header-news/[id] — Header-News löschen (Admin). */
export async function DELETE(_req: NextRequest, { params }: Params) {
  if (!(await requireAdmin())) return unauthorized();
  const { id } = await params;

  const deleted = await db
    .delete(headerNews)
    .where(eq(headerNews.id, id))
    .returning({ id: headerNews.id });

  if (!deleted.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
