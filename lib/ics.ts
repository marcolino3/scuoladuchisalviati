/**
 * Minimaler iCalendar-Generator (RFC 5545) fuer den Kalender-Download der
 * Header-News. Erzeugt eine einzelne VEVENT-Datei.
 */

type IcsEvent = {
  uid: string;
  /** Zeitstempel der Erstellung (DTSTAMP). */
  stamp: Date;
  start: Date;
  /** Optionales Ende. Timed: Default Start +1h. All-Day: Default Start +1 Tag. */
  end?: Date | null;
  allDay: boolean;
  summary: string;
  description?: string | null;
  location?: string | null;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** UTC-Zeitstempel "YYYYMMDDTHHMMSSZ" fuer timed Events. */
function fmtUtc(d: Date): string {
  return (
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`
  );
}

/** Reines Datum "YYYYMMDD" (UTC-Komponenten) fuer All-Day Events. */
function fmtDate(d: Date): string {
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
}

/** Escaping fuer TEXT-Werte (RFC 5545 §3.3.11). */
function esc(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function eventLines(event: IcsEvent): string[] {
  const lines: string[] = [
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${fmtUtc(event.stamp)}`,
  ];

  if (event.allDay) {
    const end =
      event.end ?? new Date(event.start.getTime() + 24 * 60 * 60 * 1000);
    lines.push(`DTSTART;VALUE=DATE:${fmtDate(event.start)}`);
    lines.push(`DTEND;VALUE=DATE:${fmtDate(end)}`);
  } else {
    const end = event.end ?? new Date(event.start.getTime() + 60 * 60 * 1000);
    lines.push(`DTSTART:${fmtUtc(event.start)}`);
    lines.push(`DTEND:${fmtUtc(end)}`);
  }

  lines.push(`SUMMARY:${esc(event.summary)}`);
  if (event.description) lines.push(`DESCRIPTION:${esc(event.description)}`);
  if (event.location) lines.push(`LOCATION:${esc(event.location)}`);
  lines.push("END:VEVENT");
  return lines;
}

/** Baut eine VCALENDAR-Datei mit einem oder mehreren VEVENTs. */
export function buildIcs(events: IcsEvent | IcsEvent[]): string {
  const list = Array.isArray(events) ? events : [events];
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Duchi Salviati//Header News//IT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...list.flatMap(eventLines),
    "END:VCALENDAR",
  ];

  // RFC 5545 verlangt CRLF als Zeilentrenner.
  return lines.join("\r\n") + "\r\n";
}

/** Macht aus einem Label einen dateinamen-tauglichen Slug. */
export function icsFilename(label: string): string {
  const slug =
    label
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "termin";
  return `${slug}.ics`;
}
