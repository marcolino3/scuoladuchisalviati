/**
 * Legt die Admin-Accounts an.
 *   npm run db:seed
 *
 * 1. E-Mail/Passwort-Admin  (SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD aus .env)
 * 2. Google-Admins          (alle Allowlist-Adressen ohne Passwort-Account)
 *    -> werden als User-Zeile vorab angelegt; beim ersten Google-Login
 *       verknuepft Better Auth den Google-Account per E-Mail (accountLinking).
 *
 * Die oeffentliche Registrierung ist in lib/auth.ts deaktiviert, daher nutzt
 * der Passwort-Seed eine separate Better-Auth-Instanz mit aktivierter
 * Registrierung.
 */
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { eq } from "drizzle-orm";
import { db } from "../lib/db";
import * as schema from "../lib/db/schema";
import { ADMIN_EMAILS } from "../lib/admin-allowlist";

const pwEmail = process.env.SEED_ADMIN_EMAIL;
const pwPassword = process.env.SEED_ADMIN_PASSWORD;
const pwName = process.env.SEED_ADMIN_NAME ?? "Admin";

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
  emailAndPassword: { enabled: true }, // Registrierung hier bewusst erlaubt
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});

async function findUser(email: string) {
  return (
    await db
      .select({ id: schema.user.id })
      .from(schema.user)
      .where(eq(schema.user.email, email))
      .limit(1)
  )[0];
}

async function seedPasswordAdmin() {
  if (!pwEmail || !pwPassword) {
    console.log("• Passwort-Admin uebersprungen (SEED_ADMIN_* nicht gesetzt).");
    return;
  }
  if (await findUser(pwEmail)) {
    await db
      .update(schema.user)
      .set({ role: "admin" })
      .where(eq(schema.user.email, pwEmail));
    console.log(`• Passwort-Admin existierte — Rolle bestaetigt: ${pwEmail}`);
    return;
  }
  await seedAuth.api.signUpEmail({
    body: { email: pwEmail, password: pwPassword, name: pwName },
  });
  await db
    .update(schema.user)
    .set({ role: "admin", emailVerified: true })
    .where(eq(schema.user.email, pwEmail));
  console.log(`• Passwort-Admin angelegt: ${pwEmail}`);
}

async function seedGoogleAdmins() {
  const now = new Date();
  for (const email of ADMIN_EMAILS) {
    if (email === pwEmail) continue; // hat schon einen Passwort-Account
    if (await findUser(email)) {
      await db
        .update(schema.user)
        .set({ role: "admin" })
        .where(eq(schema.user.email, email));
      console.log(`• Google-Admin existierte — Rolle bestaetigt: ${email}`);
      continue;
    }
    await db.insert(schema.user).values({
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      emailVerified: true, // noetig fuer accountLinking via Google
      role: "admin",
      createdAt: now,
      updatedAt: now,
    });
    console.log(`• Google-Admin vorbereitet (Login via Google): ${email}`);
  }
}

async function main() {
  await seedPasswordAdmin();
  await seedGoogleAdmins();
  console.log("Seed abgeschlossen.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
