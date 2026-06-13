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

/** Einen einzelnen Termin lesbar formatieren (Datum, bei timed mit Uhrzeit). */
function formatDate(date: HeaderNewsItem["dates"][number]): string {
  const d = new Date(date.allDay ? `${date.start}T00:00:00` : date.start);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(date.allDay ? {} : { hour: "2-digit", minute: "2-digit" }),
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
  if (!from && !to) return "sempre";
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
      toast.error("Impossibile caricare gli avvisi");
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
      toast.error(body?.error ?? "Eliminazione non riuscita");
      return;
    }
    toast.success("Avviso eliminato");
    load();
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "voce" : "voci"}
        </p>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Nuovo avviso
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Etichetta / Messaggio</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Visibile</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  Caricamento…
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-muted-foreground"
                >
                  Nessun avviso.
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
                    <span className="flex items-start gap-1.5">
                      <CalendarDays className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                      <span className="flex flex-col">
                        {item.dates.map((d, i) => (
                          <span key={i}>{formatDate(d)}</span>
                        ))}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {formatWindow(item)}
                  </TableCell>
                  <TableCell>
                    {item.published ? (
                      <Badge className="bg-success text-white">Pubblicato</Badge>
                    ) : (
                      <Badge variant="secondary">Bozza</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        aria-label="Scarica il file calendario"
                        title="Scarica il file calendario (.ics)"
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
                        aria-label="Modifica"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteItem(item)}
                        aria-label="Elimina"
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
            <DialogTitle>Eliminare l&apos;avviso?</DialogTitle>
            <DialogDescription>
              &laquo;{deleteItem?.label}&raquo; verrà rimosso definitivamente.
              L&apos;operazione non può essere annullata.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteItem(null)}>
              Annulla
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Elimina
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
