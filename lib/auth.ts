import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    // Oeffentliche Registrierung deaktiviert — Admins werden ueber die
    // Seed-Skripte (`npm run db:seed`) bzw. das Set-Password-Skript angelegt.
    disableSignUp: true,
  },
  // Google nur aktiv, wenn Credentials gesetzt sind.
  socialProviders:
    googleId && googleSecret
      ? { google: { clientId: googleId, clientSecret: googleSecret } }
      : undefined,
  account: {
    // Google-Login mit bestehendem (geseedeten) User per E-Mail verknuepfen.
    accountLinking: { enabled: true, trustedProviders: ["google"] },
  },
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "user", input: false },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Dynamische Pruefung gegen die DB: Nur E-Mails, die bereits als
          // User-Zeile existieren (geseedet), duerfen sich anmelden. Vorhandene
          // User werden bei Google-Erstanmeldung per accountLinking verknuepft
          // (dieser Create-Hook feuert dann nicht); er greift also nur fuer
          // voellig unbekannte E-Mails -> blocken.
          const existing = await db
            .select({ id: schema.user.id })
            .from(schema.user)
            .where(eq(schema.user.email, user.email.toLowerCase()))
            .limit(1);
          if (!existing.length) {
            // Stabiler `code` -> die Login-Seite mappt ihn auf eine
            // freundliche Meldung (siehe app/admin/login/page.tsx).
            throw new APIError("FORBIDDEN", {
              code: "ACCOUNT_NOT_ALLOWED",
              message: "Diese E-Mail-Adresse ist nicht freigeschaltet.",
            });
          }
          return;
        },
      },
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});

export type Session = typeof auth.$Infer.Session;
