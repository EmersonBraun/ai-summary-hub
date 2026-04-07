---
title: Kontextverwaltung
description: Wie Claude Code das Kontextfenster über lange Sitzungen hinweg verwaltet — automatische Komprimierung, Strategien für den Gesprächsverlauf und praktische Techniken, um Sitzungen im großen Maßstab effektiv zu halten.
keywords: [Kontextverwaltung, Kontextfenster, Gesprächsverlauf, /clear, Kontextkomprimierung, Token-Limits, Claude-Code-Sitzungen, lange Sitzungen]
---

# Kontextverwaltung

## Definition

Kontextverwaltung bezieht sich auf die Strategien und Mechanismen, die Claude Code verwendet, um Gespräche innerhalb der endlichen Grenzen des Kontextfensters des Modells effektiv zu halten. Jedes Modell hat ein maximales Kontextfenster – die Gesamtzahl der Tokens, die es in einer einzigen Anfrage verarbeiten kann – und dieses Fenster muss den System-Prompt, Tool-Definitionen, den gesamten Gesprächsverlauf (Benutzernachrichten, Assistentenantworten, Tool-Aufrufe und Tool-Ergebnisse) und alle während der Sitzung geladenen Dateiinhalte aufnehmen. Wenn der kumulative Kontext an das Limit heranreicht, muss etwas nachgeben: Entweder werden alte Inhalte komprimiert oder verworfen, oder die Sitzung muss zurückgesetzt werden.

Das Verständnis der Kontextverwaltung ist besonders wichtig für lange Claude-Code-Sitzungen. Eine unkomplizierte Debugging-Sitzung könnte das gesamte Kontextfenster nach 30-50 Runden verbrauchen, insbesondere wenn Claude mehrere große Dateien liest, Befehle mit ausführlicher Ausgabe ausführt oder viele Runden von Tool-Aufrufen anhäuft. Entwicklern, die sich der Kontextgrenzen nicht bewusst sind, fällt möglicherweise auf, dass Claude anfängt, frühere Entscheidungen zu "vergessen", inkonsistente Antworten zu geben oder über frühere Kontexte verwirrt zu erscheinen – das sind Symptome von Kontextdruck, kein Modellversagen.

Claude Code begegnet Kontextgrenzen durch eine Kombination aus automatischen Mechanismen (Kontextkomprimierung, selektives Dateiladen) und benutzergesteuerten Strategien (der `/clear`-Befehl, fokussiertes Aufgaben-Scoping, CLAUDE.md für persistente Konventionen). Effektive Kontextverwaltung geht nicht nur darum, Fehler zu vermeiden – es geht darum, Sitzungen zu gestalten, die von Anfang bis Ende scharf und genau bleiben, indem die relevantesten Informationen jederzeit im aktiven Fenster gehalten werden.

## Funktionsweise

### Kontextfensterstruktur

Das Kontextfenster ist in mehrere Zonen unterteilt, von denen jede zur Gesamtzahl der Tokens beiträgt. Die **System-Prompt-Zone** enthält CLAUDE.md-Anweisungen und Tool-Definitionen – diese sind relativ stabil und können gecacht werden (siehe Prompt-Caching). Die **Gesprächsverlauf-Zone** wächst mit jedem Zug: Jede Benutzernachricht, Assistentenantwort, Tool-Aufruf und Tool-Ergebnis fügt Tokens hinzu. Die **Dateiinhalt-Zone** enthält den eigentlichen Quellcode und Dateiinhalte, die Claude während der Sitzung gelesen hat. Mit fortschreitender Sitzung wachsen die Gesprächsverlaufs- und Dateiinhalt-Zonen, bis sie das Modelllimit erreichen.

### Automatische Kontextkomprimierung

Wenn Claude Code erkennt, dass das Kontextfenster seinem Limit nähert, wendet es automatische Komprimierung auf den Gesprächsverlauf an. Der Komprimierungsalgorithmus identifiziert ältere Runden, die wahrscheinlich nicht für die aktuelle Aufgabe benötigt werden, und fasst sie zusammen oder kürzt sie. Tool-Ergebnisse – besonders große wie Verzeichnislisten oder lange Dateiinhalte – werden bevorzugt komprimiert, da sie Rohdaten enthalten, die das Modell bereits verarbeitet hat. Ziel ist es, den logischen Faden des Gesprächs zu bewahren, während der Wortlaut älterer Runden entfernt wird. Benutzer bemerken möglicherweise komprimierte Zusammenfassungen anstelle früherer detaillierter Austausche.

### Selektives Dateiladen

Claude Code lädt nicht alle Projektdateien beim Sitzungsstart in den Kontext. Stattdessen verwendet es eine Just-in-Time-Ladestrategie: Dateien werden mit dem `Read`- oder `Glob`-Tool nur geladen, wenn Claude feststellt, dass sie für die aktuelle Aufgabe relevant sind. Dies hält den anfänglichen Kontext klein und fokussiert. Mit fortschreitender Sitzung und mehr gelesenen Dateien sammeln sich die Dateiinhalte jedoch im Kontext an. Für sehr große Codebasen muss Claude möglicherweise bestimmte Dateien selektiv erneut lesen, anstatt alle zuvor gelesenen Dateien im aktiven Fenster zu behalten.

### Der /clear-Befehl

Der `/clear`-Befehl verwirft den gesamten Gesprächsverlauf und startet eine neue Sitzung. Es ist die aggressivste Form der Kontextverwaltung – gleichwertig mit dem Schließen und Wiederöffnen des Terminals. Verwenden Sie ihn zwischen nicht zusammenhängenden Aufgaben, nach Abschluss eines größeren Features oder wenn Kontextdrift (widersprüchliche oder veraltete Informationen in der Geschichte) verwirrendes Verhalten verursacht. CLAUDE.md-Anweisungen und Projektkonfiguration überleben `/clear`, da sie beim Start jeder Sitzung aus dem Dateisystem neu geladen werden.

```mermaid
flowchart LR
  UserMsg[User message] -->|appended to history| History[Conversation history]
  History -->|within limit| Assemble[Context assembled]
  ToolCall[Tool calls + results] -->|appended to history| History
  FileRead[File contents loaded] -->|appended to history| History
  Assemble -->|sent to| Model[Claude model]
  Model -->|response + new tool calls| History
  History -->|approaching limit| Compress[Auto-compression\nold turns summarized]
  Compress -->|trimmed history| Assemble
  Clear[/clear command] -->|resets| History
```

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|---|---|
| Eine neue, nicht zusammenhängende Aufgabe beginnt — verwenden Sie `/clear`, um mit einem sauberen Kontext zu beginnen | Der Gesprächsverlauf kritische Entscheidungen oder Erkenntnisse enthält, die Sie noch brauchen |
| Die Sitzung viele Runden läuft und Claude verwirrt erscheint — Kontextdrift ist ein Zeichen | Sie sich mitten in einer mehrstufigen Aufgabe befinden, für die früherer Kontext aktiv benötigt wird |
| Sie sehr große Dateien laden — erwägen Sie `/clear` zuerst und laden Sie nur das, was die aktuelle Aufgabe benötigt | Die Sitzung kurz ist und Kontextdruck noch kein Problem ist |
| Sie die Antwortqualität benchmarken möchten — ein frischer Kontext liefert eine saubere Basis | Sie sich auf CLAUDE.md für Projektkontext verlassen — `/clear` bewahrt ihn, aber sitzungsspezifischer Kontext geht verloren |
| Sie eine CLAUDE.md schreiben, die wichtigen Projektkontext erfasst, sodass dieser `/clear` überlebt | Die "Verwirrung" tatsächlich eine Modellbegrenzung ohne Bezug zum Kontext ist — mehr Kontext hilft nicht |

## Codebeispiele

```bash
# Context management strategies in a Claude Code session

# Strategy 1: Use /clear between unrelated tasks
# Working on feature A...
claude
> Implement the user registration endpoint in src/routes/auth.ts
> Add validation for email format and password strength
> Write the unit tests for the new endpoint

# Feature A is done. Switch to a completely different task.
> /clear    # Reset context — start fresh for unrelated work
> Refactor the logging module in src/utils/logger.ts to use structured JSON output

# ---

# Strategy 2: Scope tasks narrowly to avoid loading unnecessary files
# BAD: Loads everything, inflates context early
> Read all files in the src/ directory and tell me how authentication works

# GOOD: Targeted question that loads only relevant files
> How does authentication work? Start by reading src/routes/auth.ts and src/middleware/auth.ts

# ---

# Strategy 3: Summarize before /clear to preserve key decisions
> Before I run /clear, summarize the architectural decisions we made in this session
  so I can paste them into CLAUDE.md

# Paste the summary into CLAUDE.md, then:
> /clear    # Now the decisions persist via CLAUDE.md across future sessions

# ---

# Strategy 4: Use focused sessions for large codebases
# Instead of one giant session, break work into focused chunks
# Session 1: Understand the data model
claude
> Read src/models/ and explain the database schema and entity relationships
> /exit

# Session 2: Implement a specific feature
claude
> Given our Prisma schema in prisma/schema.prisma, add a 'tags' relation to Post
```

```bash
# Monitoring context usage (verbose mode)
claude --verbose

# Look for token count indicators in the verbose output:
# "Context: 45,231 / 200,000 tokens (22%)"
# When this approaches 80-90%, consider /clear or wrapping up the session

# The model will also proactively warn you when context is getting full:
# "Note: This session is using a significant portion of the context window.
#  Consider using /clear before starting unrelated tasks."
```

```markdown
# CLAUDE.md pattern: capturing session context for future sessions
# This lets important discoveries survive /clear

## Current architecture decisions (updated 2026-04-01)
- Authentication uses JWT with 24h access tokens and 30d refresh tokens stored in httpOnly cookies
- All database queries go through the repository layer in src/repositories/ — never call Prisma directly from routes
- We decided against Redis for session storage in favor of stateless JWT (revisit if auth rate-limiting is needed)
- The `UserService` was split into `UserAuthService` and `UserProfileService` in the April 2026 refactor

## Known complexity areas (read these files before touching related code)
- `src/services/billing.ts` — complex subscription state machine, read the inline comments carefully
- `src/middleware/rateLimit.ts` — custom sliding window implementation, not a standard library
```

## Praktische Ressourcen

- [Claude-Code-Kontext und -Speicher](https://docs.anthropic.com/en/docs/claude-code/memory) — Offizieller Leitfaden zur Kontextverwaltung in Claude Code, einschließlich /clear und CLAUDE.md für persistenten Speicher.
- [Claude-Modell-Kontextfenster](https://docs.anthropic.com/en/docs/about-claude/models) — Token-Limits für jede Claude-Modellvariante.
- [Prompt-Caching-Dokumentation](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) — Wie man stabile Kontextteile cached, um Kosten und Latenz in langen Sitzungen zu reduzieren.
- [Claude-Code-CLI-Referenz](https://docs.anthropic.com/en/docs/claude-code/cli-reference) — Vollständige Liste der Slash-Befehle einschließlich /clear und /compact.

## Siehe auch

- [Claude-Code-Übersicht](/docs/claude-code)
- [Prompt-Caching](/docs/claude-code/prompt-caching)
- [CLAUDE.md-Konfiguration](/docs/claude-code/claude-md)
