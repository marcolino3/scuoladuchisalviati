import { headers } from "next/headers";
import { auth, type Session } from "@/lib/auth";

/** Liest die aktuelle Better-Auth-Session aus den Request-Headern. */
export async function getSession(): Promise<Session | null> {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Gibt die Session zurueck, wenn der eingeloggte User Admin ist — sonst `null`.
 * In Route-Handlern als Guard verwenden:
 *
 *   const session = await requireAdmin();
 *   if (!session) return unauthorized();
 */
export async function requireAdmin(): Promise<Session | null> {
  const session = await getSession();
  if (!session || session.user.role !== "admin") return null;
  return session;
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
