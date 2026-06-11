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
import type { UserListItem } from "./types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Zu bearbeitender User — null = neuer User. */
  editUser: UserListItem | null;
  onSaved: () => void;
};

export function UserFormDialog({
  open,
  onOpenChange,
  editUser,
  onSaved,
}: Props) {
  const isEdit = Boolean(editUser);

  const [name, setName] = useState(editUser?.name ?? "");
  const [email, setEmail] = useState(editUser?.email ?? "");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(editUser?.role === "admin");
  const [saving, setSaving] = useState(false);

  // Hinweis: Die Felder werden ueber den initialen useState-Wert gesetzt. Der
  // Parent (UserManager) gibt diesem Dialog bei jedem Oeffnen einen neuen
  // `key`, sodass die Komponente frisch mountet und die Initialwerte greifen.

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const role = isAdmin ? "admin" : "user";
      let res: Response;

      if (isEdit && editUser) {
        // Nur geaenderte Felder senden. Passwort optional (Reset).
        const body: { role: string; password?: string } = { role };
        if (password.trim()) body.password = password;
        res = await fetch(`/api/users/${editUser.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name, email, password, role }),
        });
      }

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        toast.error(body?.error ?? "Speichern fehlgeschlagen");
        return;
      }

      toast.success(isEdit ? "Benutzer aktualisiert" : "Benutzer angelegt");
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
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Benutzer bearbeiten" : "Neuer Benutzer"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Rolle ändern oder ein neues Passwort vergeben."
                : "Lege einen neuen Account mit Initialpasswort an."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">Name</Label>
              <Input
                id="user-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isEdit}
                disabled={isEdit}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-email">E-Mail</Label>
              <Input
                id="user-email"
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={!isEdit}
                disabled={isEdit}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-password">
                {isEdit ? "Neues Passwort (optional)" : "Initialpasswort"}
              </Label>
              <Input
                id="user-password"
                type="password"
                autoComplete="new-password"
                placeholder={isEdit ? "Leer lassen = unverändert" : undefined}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!isEdit}
                minLength={8}
              />
              <p className="text-xs text-muted-foreground">
                Mindestens 8 Zeichen.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <Label htmlFor="user-admin">Admin-Rechte</Label>
                <p className="text-xs text-muted-foreground">
                  Voller Zugriff auf den Verwaltungsbereich.
                </p>
              </div>
              <Switch
                id="user-admin"
                checked={isAdmin}
                onCheckedChange={setIsAdmin}
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
