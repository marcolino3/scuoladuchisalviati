import { type NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { account, user } from "@/lib/db/schema";
import { authAdmin } from "@/lib/auth-admin";
import { requireAdmin, unauthorized } from "@/lib/api/auth-guard";
import { serializeUser, updateUserSchema } from "@/lib/api/users-schema";

type Params = { params: Promise<{ id: string }> };

/** PATCH /api/users/[id] — Rolle aendern und/oder Passwort zuruecksetzen (Admin). */
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  const { id } = await params;

  const json = await req.json().catch(() => null);
  const parsed = updateUserSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { role, password } = parsed.data;

  const current = (
    await db.select().from(user).where(eq(user.id, id)).limit(1)
  )[0];
  if (!current) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Sich selbst nicht die Admin-Rechte entziehen (kein Aussperren).
  if (role && role !== "admin" && session.user.id === id) {
    return NextResponse.json(
      { error: "Du kannst dir nicht selbst die Admin-Rechte entziehen" },
      { status: 400 }
    );
  }

  if (password) {
    // Passwort ueber die Better-Auth-Hash-Utilities setzen und in den
    // credential-Account schreiben (anlegen, falls noch keiner existiert).
    const ctx = await authAdmin.$context;
    const hash = await ctx.password.hash(password);
    const cred = (
      await db
        .select({ id: account.id })
        .from(account)
        .where(
          and(eq(account.userId, id), eq(account.providerId, "credential"))
        )
        .limit(1)
    )[0];

    const now = new Date();
    if (cred) {
      await db
        .update(account)
        .set({ password: hash, updatedAt: now })
        .where(eq(account.id, cred.id));
    } else {
      await db.insert(account).values({
        id: crypto.randomUUID(),
        accountId: id,
        providerId: "credential",
        userId: id,
        password: hash,
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  if (role) {
    await db
      .update(user)
      .set({ role, updatedAt: new Date() })
      .where(eq(user.id, id));
  }

  const row = (
    await db.select().from(user).where(eq(user.id, id)).limit(1)
  )[0];
  return NextResponse.json({ data: serializeUser(row) });
}

/** DELETE /api/users/[id] — Benutzer loeschen (Admin). */
export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await requireAdmin();
  if (!session) return unauthorized();
  const { id } = await params;

  // Selbst-Loeschen verhindern.
  if (session.user.id === id) {
    return NextResponse.json(
      { error: "Du kannst dich nicht selbst löschen" },
      { status: 400 }
    );
  }

  // Sessions und Accounts haengen per FK (onDelete: cascade) am User und
  // werden automatisch mitgeloescht.
  const deleted = await db
    .delete(user)
    .where(eq(user.id, id))
    .returning({ id: user.id });

  if (!deleted.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
