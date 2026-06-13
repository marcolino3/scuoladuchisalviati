"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Fehler aus dem OAuth-Redirect (?error=…) abfangen und als freundlichen
  // Hinweis anzeigen, statt die rohe Better-Auth-Fehlerseite zu zeigen.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    if (!error) return;
    toast.error(authErrorMessage(error, params.get("error_description")));
    // Query aus der URL entfernen, damit der Hinweis bei Reload nicht erneut kommt.
    window.history.replaceState(null, "", "/admin/login");
  }, []);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message ?? "Accesso non riuscito");
      return;
    }
    toast.success("Bentornato");
    router.push("/admin");
    router.refresh();
  }

  async function handleGoogleLogin() {
    setLoading(true);
    const { data, error } = await signIn.social({
      provider: "google",
      callbackURL: "/admin",
      // Bei Fehlern (z.B. nicht freigeschaltete E-Mail) zurück auf den Login,
      // statt auf die rohe Better-Auth-Fehlerseite.
      errorCallbackURL: "/admin/login",
    });
    if (error) {
      setLoading(false);
      toast.error(error.message ?? "Accesso con Google non riuscito");
      return;
    }
    // Explizit weiterleiten, falls der Client nicht automatisch redirected.
    if (data?.url) window.location.href = data.url;
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Accesso amministratore</CardTitle>
          <CardDescription>Accesso all&apos;area di amministrazione</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Accesso in corso…" : "Accedi"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">oppure</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <GoogleIcon className="size-4" />
            Accedi con Google
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

/** Übersetzt einen Better-Auth-Fehlercode aus dem OAuth-Redirect in eine Meldung. */
function authErrorMessage(code: string, description?: string | null): string {
  switch (code) {
    case "ACCOUNT_NOT_ALLOWED":
      return "Non esiste un account per questo indirizzo e-mail. Contatta un amministratore.";
    case "email_not_found":
      return "Google non ha fornito un indirizzo e-mail. Consenti l'accesso alla tua e-mail.";
    default:
      return description ?? "Accesso non riuscito. Riprova.";
  }
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.56c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.56-2.76c-.98.66-2.23 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}
