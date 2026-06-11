# CLAUDE.md

## Responsive: Mobile First

Für dieses Projekt gilt durchgängig ein **Mobile-First-Ansatz**.

- Basis-Styles (ohne Breakpoint-Prefix) gelten für **Mobile**; größere Layouts werden über Breakpoint-Prefixes (`sm:`, `md:`, `lg:`, `xl:`) **additiv aufgebaut** — nicht umgekehrt.
- Niemals von Desktop nach unten überschreiben (kein „Desktop-first" mit `max-*:`-Overrides).
- Layout, Spacing, Typografie und Komponenten zuerst für kleine Viewports denken und entwerfen, dann für größere erweitern.
