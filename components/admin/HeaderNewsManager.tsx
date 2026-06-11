"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarDays, Download, Pencil, Plus, Trash2 } from "lucide-react";
import { HeaderNewsFormDialog } from "./HeaderNewsFormDialog";
import type { HeaderNewsItem } from "./types";

/** Termin lesbar formatieren (Datum, bei timed mit Uhrzeit). */
function formatEvent(item: HeaderNewsItem): string {
  const d = new Date(item.allDay ? `${item.eventStart}T00:00:00` : item.eventStart);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(item.allDay ? {} : { hour: "2-digit", minute: "2-digit" }),
  });
}

function formatWindow(item: HeaderNewsItem): string {
  const fmt = (iso: string | null) =>
    iso
      ? new Date(iso).toLocaleDateString("it-IT", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : null;
  const from = fmt(item.publishUp);
  const to = fmt(item.publishDown);
  if (!from && !to) return "immer";
  return `${from ?? "…"} – ${to ?? "…"}`;
}

export function HeaderNewsManager() {
  const [items, setItems] = useState<HeaderNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [editItem, setEditItem] = useState<HeaderNewsItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<HeaderNewsItem | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/header-news", { credentials: "include" });
      const body = await res.json();
      setItems(body.data ?? []);
    } catch {
      toast.error("Header-News konnten nicht geladen werden");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initiales Laden beim Mount — setState in load() erst nach await.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  function openCreate() {
    setEditItem(null);
    setFormKey((k) => k + 1);
    setFormOpen(true);
  }
  function openEdit(item: HeaderNewsItem) {
    setEditItem(item);
    setFormKey((k) => k + 1);
    setFormOpen(true);
  }

  async function confirmDelete() {
    if (!deleteItem) return;
    const res = await fetch(`/api/header-news/${deleteItem.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setDeleteItem(null);
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      toast.error(body?.error ?? "Löschen fehlgeschlagen");
      return;
    }
    toast.success("Header-News gelöscht");
    load();
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "Eintrag" : "Einträge"}
        </p>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Neue Header-News
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label / Meldung</TableHead>
              <TableHead>Termin</TableHead>
              <TableHead>Sichtbar</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  Lädt…
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  Noch keine Header-News.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="max-w-xs">
                    <div className="font-medium">{item.label}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {item.message}
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-muted-foreground" />
                      {formatEvent(item)}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatWindow(item)}
                  </TableCell>
                  <TableCell>
                    {item.published ? (
                      <Badge>Veröffentlicht</Badge>
                    ) : (
                      <Badge variant="secondary">Entwurf</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        aria-label="Kalenderdatei herunterladen"
                        title="Kalenderdatei (.ics) herunterladen"
                      >
                        <a
                          href={`/api/header-news/${item.id}/calendar`}
                          download
                        >
                          <Download className="size-4" />
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(item)}
                        aria-label="Bearbeiten"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteItem(item)}
                        aria-label="Löschen"
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <HeaderNewsFormDialog
        key={formKey}
        open={formOpen}
        onOpenChange={setFormOpen}
        editItem={editItem}
        onSaved={load}
      />

      <Dialog
        open={Boolean(deleteItem)}
        onOpenChange={(o) => !o && setDeleteItem(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Header-News löschen?</DialogTitle>
            <DialogDescription>
              &bdquo;{deleteItem?.label}&ldquo; wird dauerhaft entfernt. Das kann
              nicht rückgängig gemacht werden.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteItem(null)}>
              Abbrechen
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Löschen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
