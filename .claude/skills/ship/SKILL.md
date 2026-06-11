---
name: ship
description: Vollständiger Ship-Workflow für das Website-Projekt — Lint, Typecheck, Build, Security Review, Commit und Push. Use this skill when the user invokes /ship to deploy current changes safely.
---

# /ship — Lint · Typecheck · Build · Security · Commit · Push

Führe die folgenden Schritte **sequenziell** aus. Bricht ein Schritt ab, **stoppe sofort** und melde das Problem dem User. Niemals Fehler überspringen (`--no-verify`, force-push etc.).

Working directory: `/Users/marcomarranchelli/Desktop/Projekte/website`

---

## Schritt 1 — Pre-Check

Prüfe parallel:

```bash
git status
git diff --stat
git log -5 --oneline
git rev-parse --abbrev-ref HEAD
```

- Wenn keine Änderungen (nichts staged, nichts unstaged, keine untracked): melde "Nichts zu shippen" und stoppe.
- Notiere den aktuellen Branch — niemals direkt auf `main`/`master` pushen ohne explizite Bestätigung.

---

## Schritt 2 — Lint + Typecheck + Build

Befehle nacheinander ausführen:

```bash
npm run lint
npm run typecheck
npm run build
```

- **Bei Lint-Fehler:** Fehler dem User zeigen, fragen ob automatisch behoben werden soll (`npm run format` / manuell), **nicht** committen.
- **Bei Typecheck-Fehler:** Fehler zeigen, Root-Cause analysieren, beheben vorschlagen. **Nicht** weitermachen.
- **Bei Build-Fehler:** Fehler zeigen, Root-Cause analysieren, dem User vorschlagen wie zu beheben. **Nicht** weitermachen.
- Warnings sind OK, aber kurz erwähnen.

---

## Schritt 3 — Security Review

Invoke den `security-review`-Skill auf die pending Changes:

```
Skill: security-review
```

- Wenn kritische Findings (Secrets, Injection, XSS, exposed Credentials): **stoppe**, zeige Findings, frage User ob trotzdem geshipt werden soll.
- Bei niedrigeren Findings: kurz auflisten, weitermachen.

Zusätzlich manuell prüfen:
- Keine `.env*`-Dateien im Diff (nur `.env.example` ist erlaubt)
- Keine hardcoded API-Keys, Tokens, Passwörter, DB-Credentials (Turso/Auth)
- Keine `console.log`s mit sensiblen Daten

---

## Schritt 4 — Commit

Folge dem Git Safety Protocol aus der Standardanweisung:

1. Staged ALLE relevanten geänderten Dateien einzeln per Name (kein `git add -A`/`.`).
2. Niemals `.env`, `credentials.*`, Secrets committen.
3. Commit Message:
   - 1–2 Sätze auf **Deutsch** (User kommuniziert auf Deutsch).
   - Fokus auf das **Warum**, nicht nur das Was.
   - Style an `git log` der letzten Commits anpassen.
   - HEREDOC verwenden für saubere Formatierung.
   - Co-Author-Footer anhängen.

```bash
git commit -m "$(cat <<'EOF'
<Subject Line auf Deutsch>

<Optional: 1-2 Zeilen Kontext zum Warum>

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
EOF
)"
```

- **Bei Pre-Commit-Hook-Fehler:** Fix den Root-Cause, re-stage, neuen Commit erstellen — niemals `--amend` oder `--no-verify`.

---

## Schritt 5 — Push

```bash
git status                                # verify clean
git rev-parse --abbrev-ref HEAD           # confirm branch
git push                                  # oder git push -u origin <branch> wenn noch nicht getrackt
```

- Wenn Branch noch keinen Upstream hat: `git push -u origin <branch>`.
- Niemals `--force` / `--force-with-lease` ohne explizite User-Bestätigung.
- Bei Push-Fehler (z.B. non-fast-forward): **stoppe**, frage User wie vorgehen (rebase? merge?). Niemals einfach force-pushen.

---

## Schritt 6 — Final Report

Kurzer Status an den User:

- ✅/❌ Lint
- ✅/❌ Typecheck
- ✅/❌ Build
- ✅/❌ Security Review (Findings-Count)
- ✅ Commit `<short-sha>`: <subject>
- ✅ Push → `origin/<branch>`

Output bewusst kompakt halten — nicht den ganzen Build-Log wiedergeben.
