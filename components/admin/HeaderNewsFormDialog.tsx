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
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Plus, Trash2 } from "lucide-react";
import type { HeaderNewsItem } from "./types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Zu bearbeitender Eintrag — null = neuer Eintrag. */
  editItem: HeaderNewsItem | null;
  onSaved: () => void;
};

/** Termin-Zeile im Formular (Werte input-fertig: date bzw. datetime-local). */
type DateRow = { key: string; start: string; end: string; allDay: boolean };

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

function newKey(): string {
  return crypto.randomUUID();
}

function rowsFromItem(item: HeaderNewsItem | null): DateRow[] {
  if (!item || item.dates.length === 0) {
    return [{ key: newKey(), start: "", end: "", allDay: false }];
  }
  return item.dates.map((d) => ({
    key: newKey(),
    // All-Day kommt als "YYYY-MM-DD"; timed als ISO -> datetime-local.
    start: d.allDay ? d.start : isoToLocalInput(d.start),
    end: d.end ? (d.allDay ? d.end : isoToLocalInput(d.end)) : "",
    allDay: d.allDay,
  }));
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
  const [rows, setRows] = useState<DateRow[]>(() => rowsFromItem(editItem));
  const [location, setLocation] = useState(editItem?.location ?? "");
  const [published, setPublished] = useState(editItem?.published ?? true);
  const [publishUp, setPublishUp] = useState(
    isoToLocalInput(editItem?.publishUp ?? null)
  );
  const [publishDown, setPublishDown] = useState(
    isoToLocalInput(editItem?.publishDown ?? null)
  );
  const [saving, setSaving] = useState(false);

  function updateRow(key: string, patch: Partial<DateRow>) {
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  }
  function toggleRowAllDay(key: string, next: boolean) {
    // Eingabeformat wechselt (date <-> datetime-local) -> Werte leeren.
    setRows((rs) =>
      rs.map((r) =>
        r.key === key ? { ...r, allDay: next, start: "", end: "" } : r
      )
    );
  }
  function addRow() {
    setRows((rs) => [...rs, { key: newKey(), start: "", end: "", allDay: false }]);
  }
  function removeRow(key: string) {
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.key !== key) : rs));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (rows.some((r) => !r.start)) {
      toast.error("Indica un inizio per ogni data.");
      return;
    }

    setSaving(true);

    try {
      const dates = rows.map((r) => ({
        start: r.allDay ? r.start : localInputToIso(r.start),
        end: r.end ? (r.allDay ? r.end : localInputToIso(r.end)) : null,
        allDay: r.allDay,
      }));

      const payload = {
        label,
        message,
        dates,
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
        toast.error(body?.error ?? "Salvataggio non riuscito");
        return;
      }

      toast.success(isEdit ? "Avviso aggiornato" : "Avviso creato");
      onSaved();
      onOpenChange(false);
    } catch {
      toast.error("Salvataggio non riuscito");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-5xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Modifica avviso" : "Nuovo avviso"}
            </DialogTitle>
            <DialogDescription>
              Banner nell&apos;intestazione della pagina con una o più date e
              download del calendario.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="hn-label">Etichetta</Label>
              <Input
                id="hn-label"
                placeholder="es. Open Day"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hn-message">Messaggio</Label>
              <textarea
                id="hn-message"
                className="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 md:text-sm"
                placeholder="Testo del messaggio…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            {/* Termine (mehrere moeglich) */}
            <div className="space-y-3 rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <Label>Date</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRow}
                >
                  <Plus className="size-4" />
                  Data
                </Button>
              </div>

              {rows.map((row, i) => (
                <div key={row.key} className="space-y-2 rounded-md bg-muted/40 p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Data {i + 1}
                    </span>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        Tutto il giorno
                        <Switch
                          size="sm"
                          checked={row.allDay}
                          onCheckedChange={(v) => toggleRowAllDay(row.key, v)}
                        />
                      </label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Rimuovi data"
                        disabled={rows.length === 1}
                        onClick={() => removeRow(row.key)}
                      >
                        <Trash2 className="size-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Inizio</Label>
                      <DateTimePicker
                        mode={row.allDay ? "date" : "datetime"}
                        value={row.start}
                        onChange={(v) => updateRow(row.key, { start: v })}
                        placeholder="Scegli l'inizio"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Fine (facoltativo)</Label>
                      <DateTimePicker
                        mode={row.allDay ? "date" : "datetime"}
                        value={row.end}
                        onChange={(v) => updateRow(row.key, { end: v })}
                        placeholder="Scegli la fine"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hn-location">Luogo (facoltativo)</Label>
              <Input
                id="hn-location"
                placeholder="es. Viale Dei Pini, 194"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hn-up">Visibile dal (facoltativo)</Label>
                <DateTimePicker
                  id="hn-up"
                  mode="datetime"
                  value={publishUp}
                  onChange={setPublishUp}
                  placeholder="Subito"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hn-down">Visibile fino al (facoltativo)</Label>
                <DateTimePicker
                  id="hn-down"
                  mode="datetime"
                  value={publishDown}
                  onChange={setPublishDown}
                  placeholder="Senza limite"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Senza indicazioni la voce è visibile subito e senza limiti di tempo.
            </p>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label htmlFor="hn-published">Pubblicato</Label>
                <p className="text-xs text-muted-foreground">
                  Solo le voci pubblicate compaiono nell&apos;intestazione.
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
              Annulla
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Salvataggio…" : "Salva"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
