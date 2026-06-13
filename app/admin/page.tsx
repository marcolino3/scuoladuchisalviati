"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { LogOut, Megaphone, Users } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const isAdmin = session?.user.role === "admin";

  useEffect(() => {
    if (!isPending && !isAdmin) router.replace("/admin/login");
  }, [isPending, isAdmin, router]);

  if (isPending || !isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center text-muted-foreground">
        Caricamento…
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-8 md:py-12">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold">Amministrazione</h1>
          <p className="text-sm text-muted-foreground">
            Accesso come {session.user.email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/header-news">
              <Megaphone className="size-4" />
              Avvisi
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/admin/users">
              <Users className="size-4" />
              Utenti
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await signOut();
              router.replace("/admin/login");
            }}
          >
            <LogOut className="size-4" />
            Esci
          </Button>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/header-news"
          className="group rounded-xl border bg-card p-6 text-card-foreground transition-colors hover:border-foreground/20"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Megaphone className="size-5" />
            </span>
            <div>
              <h2 className="font-medium">Avvisi</h2>
              <p className="text-sm text-muted-foreground">
                Gestisci i banner con data e download del calendario
              </p>
            </div>
          </div>
        </Link>
        <Link
          href="/admin/users"
          className="group rounded-xl border bg-card p-6 text-card-foreground transition-colors hover:border-foreground/20"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Users className="size-5" />
            </span>
            <div>
              <h2 className="font-medium">Gestione utenti</h2>
              <p className="text-sm text-muted-foreground">
                Crea, modifica ed elimina gli utenti
              </p>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
