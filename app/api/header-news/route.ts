import { type NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { headerNews } from "@/lib/db/schema";
import { requireAdmin, unauthorized } from "@/lib/api/auth-guard";
import {
  createHeaderNewsSchema,
  parseEvent,
  parseInstant,
  serializeHeaderNews,
} from "@/lib/api/header-news-schema";

/** GET /api/header-news — alle Header-News auflisten (Admin). */
export async function GET() {
  if (!(await requireAdmin())) return unauthorized();

  const rows = await db
    .select()
    .from(headerNews)
    .orderBy(desc(headerNews.createdAt));
  return NextResponse.json({ data: rows.map(serializeHeaderNews) });
}

/** POST /api/header-news — neue Header-News anlegen (Admin). */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();

  const json = await req.json().catch(() => null);
  const parsed = createHeaderNewsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const d = parsed.data;

  const eventStart = parseEvent(d.eventStart, d.allDay);
  if (!eventStart) {
    return NextResponse.json({ error: "Ungültiges Startdatum" }, { status: 400 });
  }
  const eventEnd = d.eventEnd ? parseEvent(d.eventEnd, d.allDay) : null;
  const publishUp = parseInstant(d.publishUp);
  const publishDown = parseInstant(d.publishDown);

  if (publishUp && publishDown && publishDown < publishUp) {
    return NextResponse.json(
      { error: "„Sichtbar bis“ liegt vor „Sichtbar ab“." },
      { status: 400 }
    );
  }

  const now = new Date();
  const inserted = await db
    .insert(headerNews)
    .values({
      label: d.label,
      message: d.message,
      allDay: d.allDay,
      eventStart,
      eventEnd,
      location: d.location ?? null,
      published: d.published,
      publishUp,
      publishDown,
      createdAt: now,
      updatedAt: now,
    })
    .returning();

  return NextResponse.json(
    { data: serializeHeaderNews(inserted[0]) },
    { status: 201 }
  );
}
