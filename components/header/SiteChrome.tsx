"use client";

import { usePathname } from "next/navigation";

/**
 * Blendet den oeffentlichen Seiten-Header (und ggf. weiteres Chrome) im
 * Admin-Bereich aus. Der Header wird serverseitig gerendert und nur per
 * Pfad-Check ein-/ausgeblendet.
 */
export function SiteChrome({
  header,
  footer,
}: {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{header ?? footer}</>;
}
