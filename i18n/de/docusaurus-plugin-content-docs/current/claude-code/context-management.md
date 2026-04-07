---
title: Context management
description: How Claude Code manages the context window across long sessions — automatic compression, conversation history strategies, and practical techniques for keeping sessions effective at scale.
keywords: [context management, context window, conversation history, /clear, context compression, token limits, Claude Code sessions, long sessions]
tags: [intermediate]
authors: [EmersonBraun]
---

# Kontextverwaltung

## Definition

Kontextverwaltung bezeichnet die Strategien und Mechanismen, die Claude Code verwendet, um Gespräche innerhalb der endlichen Grenzen des Kontextfensters des Modells effektiv zu halten. Jedes Modell hat ein maximales Kontextfenster – die Gesamtzahl der Token, die es in einer einzelnen Anfrage verarbeiten kann – und dieses Fenster muss den System-Prompt, Tool-Definitionen, den gesamten Gesprächsverlauf (Benutzernachrichten, Assistentenantworten, Tool-Aufrufe und Tool-Ergebnisse) sowie alle während der Sitzung geladenen Dateiinhalte aufnehmen. Wenn der kumulierte Kontext den Grenzwert nähert, muss entweder alter Inhalt komprimiert oder verworfen werden, oder die Sitzung muss zurückgesetzt werden.

Das Verständnis der Kontextverwaltung ist besonders wichtig für lange Claude Code-Sitzungen. Eine einfache Debugging-Sitzung kann das vollständige Kontextfenster nach 30–50 Runden aufbrauchen, insbesondere wenn Claude mehrere große Dateien liest, Befehle mit ausführlicher Ausgabe ausführt oder viele Runden von Tool-Aufrufen anhäuft. Entwickler, die sich der Kontextgrenzen nicht bewusst sind, könnten bemerken, dass Claude beginnt, frühere Entscheidungen zu „vergessen", inkonsistente Antworten zu geben oder über frühere Kontexte verwirrt zu erscheinen – das sind Symptome von Kontextdruck, kein Modellversagen.

Claude Code begegnet Kontextgrenzen durch eine Kombination aus automatischen Mechanismen (Kontextkomprimierung, selektives Dateiladen) und benutzerkontrollierten Strategien (der `/clear`-Befehl, fokussiertes Aufgaben-Scoping, CLAUDE.md für persistente Konventionen). Effektive Kontextverwaltung geht nicht nur darum, Fehler zu vermeiden – es geht darum, Sitzungen so zu gestalten, dass sie von Anfang bis Ende scharf und genau bleiben, indem die relevantesten Informationen jederzeit im aktiven Fenster gehalten werden.

## Funktionsweise

### Kontextfenster-Struktur

Das Kontextfenster ist in mehrere Bereiche unterteilt, die jeweils zur Gesamtzahl der Token beitragen. Der **System-Prompt-Bereich** enthält CLAUDE.md-Anweisungen und Tool-Definitionen – diese sind relativ stabil und können gecacht werden (siehe Prompt-Caching). Der **Gesprächsverlauf-Bereich** wächst mit jedem Zug: Jede Benutzernachricht, Assistentenantwort, jeder Tool-Aufruf und jedes Tool-Ergebnis fügt Token hinzu. Der **Dateiinhalt-Bereich** enthält den tatsächlichen Quellcode und die Dateiinhalte, die Claude während der Sitzung gelesen hat. Im Laufe der Sitzung wachsen der Gesprächsverlauf- und Dateiinhalt-Bereich, bis sie sich dem Grenzwert des Modells nähern.

### Automatische Kontextkomprimierung

Wenn Claude Code erkennt, dass sich das Kontextfenster seinem Grenzwert nähert, wendet es automatisch Komprimierung auf den Gesprächsverlauf an. Der Komprimierungsalgorithmus identifiziert ältere Züge, die für die aktuelle Aufgabe weniger wahrscheinlich benötigt werden, und fasst sie zusammen oder kürzt sie. Tool-Ergebnisse – besonders große wie Verzeichnisauflistungen oder lange Dateiinhalte – werden bevorzugt komprimiert, da sie Rohdaten enthalten, die das Modell bereits verarbeitet hat. Das Ziel ist es, den logischen Gesprächsfaden zu erhalten, während der wörtliche Inhalt älterer Züge verworfen wird. Benutzer könnten komprimierte Zusammenfassungen bemerken, die anstelle früherer detaillierter Austausche erscheinen.

### Selektives Dateiladen

Claude Code lädt nicht alle Projektdateien beim Sitzungsstart vorab in den Kontext. Stattdessen verwendet es eine Just-in-time-Ladetrategie: Dateien werden mit dem `Read`- oder `Glob`-Tool nur dann gelesen, wenn Claude feststellt, dass sie für die aktuelle Aufgabe relevant sind. Dies hält den initialen Kontext klein und fokussiert. Im Verlauf der Sitzung, wenn Claude mehr Dateien liest, häufen sich die Dateiinhalte im Kontext an. Bei sehr großen Codebasen muss Claude möglicherweise bestimmte Dateien selektiv erneut lesen, anstatt alle zuvor gelesenen Dateien im aktiven Fenster zu behalten.

### Der /clear-Befehl

Der `/clear`-Befehl verwirft den gesamten Gesprächsverlauf und startet eine neue Sitzung. Es ist die aggressivste Form der Kontextverwaltung – äquivalent zum Schließen und Wiedereröffnen des Terminals. Verwenden Sie ihn zwischen nicht zusammenhängenden Aufgaben, nach Abschluss einer wichtigen Funktion oder wenn Kontextdrift (widersprüchliche oder veraltete Informationen im Verlauf) verwirrende Verhaltensweisen verursacht. CLAUDE.md-Anweisungen und Projektkonfiguration überleben `/clear`, da sie beim Start jeder Sitzung aus dem Dateisystem neu geladen werden.

```mermaid
flowchart LR
  UserMsg[Benutzernachricht] -->|zum Verlauf hinzugefügt| History[Gesprächsverlauf]
  History -->|innerhalb des Grenzwerts| Assemble[Kontext zusammengestellt]
  ToolCall[Tool-Aufrufe + Ergebnisse] -->|zum Verlauf hinzugefügt| History
  FileRead[Geladene Dateiinhalte] -->|zum Verlauf hinzugefügt| History
  Assemble -->|gesendet an| Model[Claude Modell]
  Model -->|Antwort + neue Tool-Aufrufe| History
  History -->|nähert sich Grenzwert| Compress[Automatische Komprimierung\nalte Züge zusammengefasst]
  Compress -->|gekürzter Verlauf| Assemble
  Clear[/clear Befehl] -->|setzt zurück| History
```

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|---|---|
| Eine neue, nicht zusammenhängende Aufgabe beginnt – verwenden Sie `/clear`, um mit einem sauberen Kontext zu starten | Der Gesprächsverlauf kritische Entscheidungen oder Erkenntnisse enthält, die Sie noch benötigen |
| Die Sitzung viele Züge lief und Claude verwirrt erscheint – Kontextdrift ist ein Zeichen | Sie mitten in einer mehrstufigen Aufgabe sind, bei der der frühere Kontext aktiv benötigt wird |
| Sie sehr große Dateien laden – erwägen Sie zuerst `/clear` und laden Sie nur das, was die aktuelle Aufgabe benötigt | Die Sitzung kurz ist und Kontextdruck noch kein Problem ist |
| Sie die Antwortqualität benchmarken möchten – ein frischer Kontext gibt eine saubere Baseline | Sie sich auf CLAUDE.md für den Projektkontext verlassen – `/clear` bewahrt ihn, aber sitzungsspezifischer Kontext geht verloren |
| Sie eine CLAUDE.md schreiben, die wichtigen Projektkontext erfasst, damit er `/clear` überlebt | Die „Verwirrung" tatsächlich eine Modellbeschränkung ist, die nichts mit dem Kontext zu tun hat – mehr Kontext hilft nicht |

## Code-Beispiele

```bash
# Kontextverwaltungsstrategien in einer Claude Code-Sitzung

# Strategie 1: /clear zwischen nicht zusammenhängenden Aufgaben verwenden
# An Feature A arbeiten...
claude
> Implement the user registration endpoint in src/routes/auth.ts
> Add validation for email format and password strength
> Write the unit tests for the new endpoint

# Feature A ist fertig. Zu einer völlig anderen Aufgabe wechseln.
> /clear    # Kontext zurücksetzen — neu starten für nicht zusammenhängende Arbeit
> Refactor the logging module in src/utils/logger.ts to use structured JSON output

# ---

# Strategie 2: Aufgaben eng begrenzen, um das Laden unnötiger Dateien zu vermeiden
# SCHLECHT: Lädt alles, bläht den Kontext frühzeitig auf
> Read all files in the src/ directory and tell me how authentication works

# GUT: Gezielte Frage, die nur relevante Dateien lädt
> How does authentication work? Start by reading src/routes/auth.ts and src/middleware/auth.ts

# ---

# Strategie 3: Zusammenfassen vor /clear, um wichtige Entscheidungen zu bewahren
> Before I run /clear, summarize the architectural decisions we made in this session
  so I can paste them into CLAUDE.md

# Die Zusammenfassung in CLAUDE.md einfügen, dann:
> /clear    # Jetzt bleiben die Entscheidungen über CLAUDE.md für zukünftige Sitzungen erhalten

# ---

# Strategie 4: Fokussierte Sitzungen für große Codebasen verwenden
# Anstatt einer riesigen Sitzung, Arbeit in fokussierte Abschnitte aufteilen
# Sitzung 1: Das Datenmodell verstehen
claude
> Read src/models/ and explain the database schema and entity relationships
> /exit

# Sitzung 2: Eine spezifische Funktion implementieren
claude
> Given our Prisma schema in prisma/schema.prisma, add a 'tags' relation to Post
```

```bash
# Kontext-Nutzung überwachen (Verbose-Modus)
claude --verbose

# Im Verbose-Output nach Token-Zählindikatoren suchen:
# "Context: 45,231 / 200,000 tokens (22%)"
# Wenn sich dies 80-90% nähert, /clear erwägen oder die Sitzung abschließen

# Das Modell wird Sie auch proaktiv warnen, wenn der Kontext voll wird:
# "Note: This session is using a significant portion of the context window.
#  Consider using /clear before starting unrelated tasks."
```

```markdown
# CLAUDE.md-Muster: Sitzungskontext für zukünftige Sitzungen erfassen
# Dies lässt wichtige Erkenntnisse /clear überleben

## Aktuelle Architekturentscheidungen (aktualisiert 2026-04-01)
- Authentifizierung verwendet JWT mit 24h Zugangs-Tokens und 30d Refresh-Tokens gespeichert in httpOnly-Cookies
- Alle Datenbankabfragen gehen durch die Repository-Schicht in src/repositories/ — niemals Prisma direkt aus Routen aufrufen
- Wir haben uns gegen Redis für Session-Speicherung zugunsten von zustandslosem JWT entschieden (überprüfen, wenn Auth-Rate-Limiting benötigt wird)
- Der `UserService` wurde im April 2026 Refactoring in `UserAuthService` und `UserProfileService` aufgeteilt

## Bekannte Komplexitätsbereiche (diese Dateien lesen, bevor zugehöriger Code angefasst wird)
- `src/services/billing.ts` — komplexe Abonnement-Zustandsmaschine, die Inline-Kommentare sorgfältig lesen
- `src/middleware/rateLimit.ts` — benutzerdefinierte Sliding-Window-Implementierung, keine Standardbibliothek
```

## Praktische Ressourcen

- [Claude Code Kontext und Speicher](https://docs.anthropic.com/en/docs/claude-code/memory) — Offizieller Leitfaden, wie Claude Code den Kontext verwaltet, einschließlich /clear und CLAUDE.md für persistenten Speicher.
- [Claude Modell-Kontextfenster](https://docs.anthropic.com/en/docs/about-claude/models) — Token-Limits für jede Claude-Modellvariante.
- [Prompt-Caching-Dokumentation](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) — Wie stabile Kontextteile gecacht werden, um Kosten und Latenz in langen Sitzungen zu reduzieren.
- [Claude Code CLI-Referenz](https://docs.anthropic.com/en/docs/claude-code/cli-reference) — Vollständige Liste der Slash-Befehle einschließlich /clear und /compact.

## Siehe auch

- [Claude Code Übersicht](/docs/claude-code)
- [Prompt-Caching](/docs/claude-code/prompt-caching)
- [CLAUDE.md Konfiguration](/docs/claude-code/claude-md)
