/**
 * Bootstrap-Liste der initialen Admin-E-Mails — wird NUR von den Seed-Skripten
 * (scripts/seed-admin.ts, scripts/set-admin-password.ts) verwendet, um die
 * ersten Admin-Accounts anzulegen.
 *
 * Das Runtime-Gate prueft NICHT gegen diese Liste, sondern dynamisch gegen die
 * DB (siehe databaseHooks in lib/auth.ts): Wer sich anmelden darf, ergibt sich
 * aus den vorhandenen User-Zeilen.
 */
export const ADMIN_EMAILS = ["marco.marranchelli@me.com"] as const;

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());
}
