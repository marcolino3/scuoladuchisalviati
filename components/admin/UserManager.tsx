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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { UserFormDialog } from "./UserFormDialog";
import type { UserListItem } from "./types";

type Props = {
  /** ID des aktuell eingeloggten Admins — zum Ausblenden der Lösch-Aktion. */
  currentUserId: string;
};

export function UserManager({ currentUserId }: Props) {
  const [items, setItems] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [editUser, setEditUser] = useState<UserListItem | null>(null);
  const [deleteUser, setDeleteUser] = useState<UserListItem | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/users", { credentials: "include" });
      const body = await res.json();
      setItems(body.data ?? []);
    } catch {
      toast.error("Impossibile caricare gli utenti");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initiales Laden beim Mount — legitimer Effect-Use-Case; setState in load()
    // passiert erst nach dem await (keine kaskadierenden Renders).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  function openCreate() {
    setEditUser(null);
    setFormKey((k) => k + 1);
    setFormOpen(true);
  }
  function openEdit(user: UserListItem) {
    setEditUser(user);
    setFormKey((k) => k + 1);
    setFormOpen(true);
  }

  async function confirmDelete() {
    if (!deleteUser) return;
    const res = await fetch(`/api/users/${deleteUser.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    setDeleteUser(null);
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      toast.error(body?.error ?? "Eliminazione non riuscita");
      return;
    }
    toast.success("Utente eliminato");
    load();
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "utente" : "utenti"}
        </p>
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Nuovo utente
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Ruolo</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-muted-foreground"
                >
                  Caricamento…
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-muted-foreground"
                >
                  Nessun utente.
                </TableCell>
              </TableRow>
            ) : (
              items.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.role === "admin" ? (
                      <Badge>Admin</Badge>
                    ) : (
                      <Badge variant="secondary">Utente</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(user)}
                        aria-label="Modifica"
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteUser(user)}
                        aria-label="Elimina"
                        disabled={user.id === currentUserId}
                        title={
                          user.id === currentUserId
                            ? "Non puoi eliminare il tuo account"
                            : undefined
                        }
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

      <UserFormDialog
        key={formKey}
        open={formOpen}
        onOpenChange={setFormOpen}
        editUser={editUser}
        onSaved={load}
      />

      <Dialog
        open={Boolean(deleteUser)}
        onOpenChange={(o) => !o && setDeleteUser(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Eliminare l&apos;utente?</DialogTitle>
            <DialogDescription>
              &laquo;{deleteUser?.email}&raquo; verrà rimosso definitivamente.
              L&apos;operazione non può essere annullata.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteUser(null)}>
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
