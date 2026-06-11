import { z } from "zod";

export const ROLES = ["admin", "user"] as const;
export type Role = (typeof ROLES)[number];

export const createUserSchema = z.object({
  name: z.string().min(1, "Name erforderlich").max(120),
  email: z.string().email("Ungültige E-Mail-Adresse").max(200),
  password: z.string().min(8, "Mindestens 8 Zeichen").max(128),
  role: z.enum(ROLES).default("user"),
});

export const updateUserSchema = z
  .object({
    role: z.enum(ROLES).optional(),
    // Optionaler Passwort-Reset durch den Admin.
    password: z.string().min(8, "Mindestens 8 Zeichen").max(128).optional(),
  })
  .refine((v) => v.role !== undefined || v.password !== undefined, {
    message: "Keine Änderung angegeben",
  });

export type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/** Wandelt eine User-DB-Zeile in eine API-Antwort um (ohne sensible Felder). */
export function serializeUser(row: UserRow) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    emailVerified: row.emailVerified,
    image: row.image,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export type UserListItem = ReturnType<typeof serializeUser>;
