import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Optimistischer Schutz des Admin-Bereichs: prueft nur die Praesenz des
 * Session-Cookies (kein DB-Hit). Die eigentliche Rollen-Pruefung passiert
 * server-/clientseitig (requireAdmin bzw. useSession in /admin).
 */
export function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const hasSession = getSessionCookie(request);

  // Ohne Session -> immer auf den Login (ausser man ist schon dort).
  if (!hasSession && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  // Mit Session -> Login-Seite ueberspringen.
  if (hasSession && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
