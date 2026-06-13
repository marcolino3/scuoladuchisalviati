import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/* -------------------------------------------------------------------------- */
/*  Better-Auth-Tabellen                                                       */
/*  Struktur entspricht dem Better-Auth-Schema (siehe `better-auth` CLI).      */
/*  `role` ist ein zusaetzliches Feld fuer die Admin-Rechtepruefung.           */
/* -------------------------------------------------------------------------- */

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  image: text("image"),
  role: text("role").notNull().default("user"), // "user" | "admin"
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

/* -------------------------------------------------------------------------- */
/*  Header-News                                                                */
/*  Das Banner im Seiten-Header (Label + Meldung + Kalender-Download).         */
/*  - `eventStart`/`eventEnd`: Termin fuer die herunterladbare .ics-Datei.     */
/*  - `publishUp`/`publishDown`: Sichtbarkeitsfenster im Header (beide opt.).  */
/* -------------------------------------------------------------------------- */

/**
 * Ein einzelner Termin innerhalb einer Header-News (mehrere pro Eintrag).
 * `start`/`end` als ISO-String; bei All-Day liegt `start` auf UTC-Mitternacht
 * und das Datum ergibt sich aus den UTC-Komponenten (kein TZ-Drift).
 */
export type HeaderNewsDate = {
  start: string;
  end: string | null;
  allDay: boolean;
};

export const headerNews = sqliteTable("header_news", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  // Hervorgehobenes Label, z. B. "Open Day".
  label: text("label").notNull(),
  // Fliesstext der Meldung.
  message: text("message").notNull(),
  // Ein oder mehrere Termine (fuer den Kalender-Download als .ics).
  dates: text("dates", { mode: "json" })
    .$type<HeaderNewsDate[]>()
    .notNull(),
  location: text("location"),
  // Veroeffentlichung + Sichtbarkeitsfenster im Header.
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  publishUp: integer("publish_up", { mode: "timestamp" }),
  publishDown: integer("publish_down", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type HeaderNewsRow = typeof headerNews.$inferSelect;
