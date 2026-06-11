/**
 * Server-only Better-Auth-Instanz fuer admin-initiiertes Anlegen von Usern.
 *
 * Unterschied zur Haupt-Instanz (`lib/auth.ts`):
 *   - `emailAndPassword.enabled` (Signup hier bewusst erlaubt)
 *   - KEINE `databaseHooks` (kein Allowlist-Gate)
 *
 * Dadurch koennen Admins ueber die geschuetzten `/api/users`-Routes neue
 * Accounts mit Passwort anlegen, ohne das Allowlist-Gate (das weiterhin den
 * Google-Login der Haupt-Instanz schuetzt) zu beruehren.
 *
 * WICHTIG: Diese Instanz NIE als HTTP-Handler exponieren. Nur server-seitig
 * in `requireAdmin()`-geschuetzten Route-Handlern importieren.
 */
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const authAdmin = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: { enabled: true },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});
