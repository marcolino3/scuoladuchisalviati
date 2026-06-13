"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { UserManager } from "@/components/admin/UserManager";
import { ArrowLeft, LogOut } from "lucide-react";

export default function AdminUsersPage() {
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
          <h1 className="font-serif text-3xl font-bold">Gestione utenti</h1>
          <p className="text-sm text-muted-foreground">
            Accesso come {session.user.email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/admin">
              <ArrowLeft className="size-4" />
              Amministrazione
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

      <UserManager currentUserId={session.user.id} />
    </main>
  );
}
