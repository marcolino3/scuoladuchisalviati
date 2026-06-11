import { type NextRequest, NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { authAdmin } from "@/lib/auth-admin";
import { requireAdmin, unauthorized } from "@/lib/api/auth-guard";
import { createUserSchema, serializeUser } from "@/lib/api/users-schema";

/** GET /api/users — alle Benutzer auflisten (Admin). */
export async function GET() {
  if (!(await requireAdmin())) return unauthorized();

  const rows = await db.select().from(user).orderBy(asc(user.createdAt));
  return NextResponse.json({ data: rows.map(serializeUser) });
}

/** POST /api/users — neuen Benutzer anlegen (Admin). */
export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();

  const json = await req.json().catch(() => null);
  const parsed = createUserSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { name, email, password, role } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  // E-Mail-Kollision frueh abfangen (eindeutiger, deutscher Fehler).
  const existing = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, normalizedEmail))
    .limit(1);
  if (existing.length) {
    return NextResponse.json(
      { error: "Diese E-Mail-Adresse existiert bereits" },
      { status: 409 }
    );
  }

  // Anlegen ueber die hook-freie Admin-Instanz (umgeht das Allowlist-Gate).
  try {
    await authAdmin.api.signUpEmail({
      body: { email: normalizedEmail, password, name },
    });
  } catch {
    return NextResponse.json(
      { error: "Benutzer konnte nicht angelegt werden" },
      { status: 500 }
    );
  }

  // Rolle + E-Mail-Status nachziehen (signUp setzt role = default "user").
  const updated = await db
    .update(user)
    .set({ role, emailVerified: true, updatedAt: new Date() })
    .where(eq(user.email, normalizedEmail))
    .returning();

  const row = updated[0];
  if (!row) {
    return NextResponse.json(
      { error: "Benutzer konnte nicht angelegt werden" },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: serializeUser(row) }, { status: 201 });
}
