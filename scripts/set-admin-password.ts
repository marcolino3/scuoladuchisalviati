/**
 * Setzt (oder ersetzt) das Passwort eines Admins aus der Allowlist.
 *   SET_ADMIN_EMAIL=… SET_ADMIN_PASSWORD=… npm run db:set-password
 *
 * Nutzbar, um einem bisher reinen Google-Admin einen Passwort-Login zu geben.
 * Eine evtl. vorhandene User-Zeile wird zuvor entfernt, damit Better Auth einen
 * sauberen Passwort-Account anlegt; danach werden Rolle und E-Mail-Status gesetzt.
 */
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { eq } from "drizzle-orm";
import { db } from "../lib/db";
import * as schema from "../lib/db/schema";
import { isAdminEmail } from "../lib/admin-allowlist";

const email = process.env.SET_ADMIN_EMAIL;
const password = process.env.SET_ADMIN_PASSWORD;
const name =
  process.env.SET_ADMIN_NAME ?? (email ? email.split("@")[0] : "Admin");

if (!email || !password) {
  console.error("SET_ADMIN_EMAIL und SET_ADMIN_PASSWORD sind erforderlich.");
  process.exit(1);
}
if (!isAdminEmail(email)) {
  console.error(
    `${email} steht nicht in der Allowlist (lib/admin-allowlist.ts).`
  );
  process.exit(1);
}

const seedAuth = betterAuth({
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

async function main() {
  // Bestehende Zeile (inkl. Accounts/Sessions) entfernen, damit signUp neu anlegt.
  const existing = await db
    .select({ id: schema.user.id })
    .from(schema.user)
    .where(eq(schema.user.email, email!))
    .limit(1);
  if (existing.length) {
    const id = existing[0].id;
    await db.delete(schema.session).where(eq(schema.session.userId, id));
    await db.delete(schema.account).where(eq(schema.account.userId, id));
    await db.delete(schema.user).where(eq(schema.user.id, id));
  }

  await seedAuth.api.signUpEmail({
    body: { email: email!, password: password!, name },
  });
  await db
    .update(schema.user)
    .set({ role: "admin", emailVerified: true })
    .where(eq(schema.user.email, email!));

  console.log(`Passwort gesetzt, Rolle = admin: ${email}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
