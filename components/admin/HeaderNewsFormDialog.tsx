"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { HeaderNewsItem } from "./types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Zu bearbeitender Eintrag — null = neuer Eintrag. */
  editItem: HeaderNewsItem | null;
  onSaved: () => void;
};

/** ISO-String -> Wert fuer <input type="datetime-local"> (lokale Zeit). */
function isoToLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** datetime-local-Wert -> ISO-String (oder null). */
function localInputToIso(value: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

export function HeaderNewsFormDialog({
  open,
  onOpenChange,
  editItem,
  onSaved,
}: Props) {
  const isEdit = Boolean(editItem);

  const [label, setLabel] = useState(editItem?.label ?? "");
  const [message, setMessage] = useState(editItem?.message ?? "");
  const [allDay, setAllDay] = useState(editItem?.allDay ?? false);
  // eventStart/eventEnd werden input-fertig gehalten (date- bzw. datetime-local).
  const [eventStart, setEventStart] = useState(() =>
    editItem
      ? editItem.allDay
        ? editItem.eventStart
        : isoToLocalInput(editItem.eventStart)
      : ""
  );
  const [eventEnd, setEventEnd] = useState(() =>
    editItem?.eventEnd
      ? editItem.allDay
        ? editItem.eventEnd
        : isoToLocalInput(editItem.eventEnd)
      : ""
  );
  const [location, setLocation] = useState(editItem?.location ?? "");
  const [published, setPublished] = useState(editItem?.published ?? true);
  const [publishUp, setPublishUp] = useState(
    isoToLocalInput(editItem?.publishUp ?? null)
  );
  const [publishDown, setPublishDown] = useState(
    isoToLocalInput(editItem?.publishDown ?? null)
  );
  const [saving, setSaving] = useState(false);

  function toggleAllDay(next: boolean) {
    setAllDay(next);
    // Eingabeformat wechselt (date <-> datetime-local) -> Termin-Felder leeren.
    setEventStart("");
    setEventEnd("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        label,
        message,
        allDay,
        // All-Day: roher "YYYY-MM-DD"-Wert. Timed: datetime-local -> ISO.
        eventStart: allDay ? eventStart : localInputToIso(eventStart),
        eventEnd: eventEnd
          ? allDay
            ? eventEnd
            : localInputToIso(eventEnd)
          : null,
        location: location.trim() || null,
        published,
        publishUp: localInputToIso(publishUp),
        publishDown: localInputToIso(publishDown),
      };

      const res = await fetch(
        isEdit ? `/api/header-news/${editItem!.id}` : "/api/header-news",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        toast.error(body?.error ?? "Speichern fehlgeschlagen");
        return;
      }

      toast.success(isEdit ? "Header-News aktualisiert" : "Header-News angelegt");
      onSaved();
      onOpenChange(false);
    } catch {
      toast.error("Speichern fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Header-News bearbeiten" : "Neue Header-News"}
            </DialogTitle>
            <DialogDescription>
              Banner im Seiten-Header mit Termin und Kalender-Download.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="hn-label">Label</Label>
              <Input
                id="hn-label"
                placeholder="z. B. Open Day"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hn-message">Meldung</Label>
              <textarea
                id="hn-message"
                className="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 md:text-sm"
                placeholder="Fließtext der Meldung…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label htmlFor="hn-allday">Ganztägig</Label>
                <p className="text-xs text-muted-foreground">
                  Termin ohne Uhrzeit (nur Datum).
                </p>
              </div>
              <Switch
                id="hn-allday"
                checked={allDay}
                onCheckedChange={toggleAllDay}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hn-start">Termin (Start)</Label>
                <Input
                  id="hn-start"
                  type={allDay ? "date" : "datetime-local"}
                  value={eventStart}
                  onChange={(e) => setEventStart(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hn-end">Ende (optional)</Label>
                <Input
                  id="hn-end"
                  type={allDay ? "date" : "datetime-local"}
                  value={eventEnd}
                  onChange={(e) => setEventEnd(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hn-location">Ort (optional)</Label>
              <Input
                id="hn-location"
                placeholder="z. B. Viale Dei Pini, 194"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hn-up">Sichtbar ab (optional)</Label>
                <Input
                  id="hn-up"
                  type="datetime-local"
                  value={publishUp}
                  onChange={(e) => setPublishUp(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hn-down">Sichtbar bis (optional)</Label>
                <Input
                  id="hn-down"
                  type="datetime-local"
                  value={publishDown}
                  onChange={(e) => setPublishDown(e.target.value)}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Ohne Angabe ist der Eintrag sofort bzw. unbegrenzt sichtbar.
            </p>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label htmlFor="hn-published">Veröffentlicht</Label>
                <p className="text-xs text-muted-foreground">
                  Nur veröffentlichte Einträge erscheinen im Header.
                </p>
              </div>
              <Switch
                id="hn-published"
                checked={published}
                onCheckedChange={setPublished}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Abbrechen
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Speichern…" : "Speichern"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
