---
title: Denkmodi und Aufwand
description: Erweitertes Denken in Claude Code — was es ist, wie Aufwandsstufen die Denktiefe gegenüber der Geschwindigkeit beeinflussen und wie das Denkverhalten für verschiedene Aufgabentypen konfiguriert wird.
keywords: [erweitertes Denken, Denkmodi, Aufwandsstufen, Claude-Schlussfolgern, Budget-Tokens, Denk-Tokens, tiefes Schlussfolgern, Claude Code]
---

# Denkmodi und Aufwand

## Definition

Erweitertes Denken ist eine Funktion von Claude-Modellen, die es dem Modell ermöglicht, ein Problem Schritt für Schritt in einem dedizierten internen Notizbuch zu durchdenken, bevor es seine endgültige Antwort produziert. Im Gegensatz zur sichtbaren Ausgabe ist dieser Denkprozess für die interne Überlegung des Modells konzipiert – er führt Zwischenschlussfolgerungen an die Oberfläche, bewertet Alternativen, erkennt eigene Fehler und arbeitet auf eine wohlüberlegte Antwort hin. Das Ergebnis sind Antworten, die bei komplexen Aufgaben genauer, bei mehrdeutigen Problemen besser begründet und weniger anfällig für oberflächliche Musterzuordnungsfehler sind.

In Claude Code manifestiert sich erweitertes Denken als **Aufwandsstufen**-Einstellung, die steuert, wie viel Rechenarbeit das Modell vor der Beantwortung durchführt. Niedrig-Aufwand-Antworten sind schnell und für einfache, eindeutige Aufgaben geeignet (Code formatieren, eine kurze Funktion erklären). Hoch-Aufwand-Antworten investieren mehr Denk-Budget und eignen sich besser für komplexe Architekturentscheidungen, schwierige Debugging-Sitzungen oder Aufgaben, bei denen Fehler teuer sind. Der Kompromiss ist immer Geschwindigkeit gegenüber Tiefe: Mehr Denken braucht mehr Zeit und verbraucht mehr Tokens.

Es ist wichtig, erweitertes Denken von Chain-of-Thought-Prompting zu unterscheiden. Chain-of-Thought bittet das Modell, seine Arbeit in der Ausgabe zu zeigen – das Schlussfolgern ist Teil des Antworttextes. Erweitertes Denken hingegen geschieht in einem separaten `thinking`-Block, den das Modell intern verarbeitet. In Claude-Code-Sitzungen können Sie manchmal `<thinking>`-Blöcke in der rohen API-Ausgabe beobachten, obwohl Claude Codes UI typischerweise nur die endgültige Antwort anzeigt. Das interne Denken unterliegt nicht denselben Einschränkungen wie die Ausgabe und ist für Schlussfolgerungsqualität statt Lesbarkeit optimiert.

## Funktionsweise

### Denk-Blöcke und Budget-Tokens

Wenn erweitertes Denken aktiviert ist, erhält das Modell einen zusätzlichen Parameter: `budget_tokens`. Diese Ganzzahl gibt die maximale Anzahl von Tokens an, die das Modell für seine interne Schlussfolgerung verwenden darf, bevor es die endgültige Antwort produziert. Ein Budget von 1.000 Tokens erlaubt eine kurze Überlegung; ein Budget von 10.000 Tokens ermöglicht tiefe, mehrstufige Analyse. Das Modell verwendet nicht immer sein volles Budget – es hört auf zu denken, wenn es zu einer befriedigenden Schlussfolgerung gelangt. Ein Budget höher als notwendig zu setzen erhöht die Latenz ohne proportionale Qualitätsgewinne; das richtige Budget hängt von der Aufgabenkomplexität ab.

### Aufwandsstufen in Claude Code

Claude Code übersetzt das abstrakte Konzept von Budget-Tokens in benannte Aufwandsstufen, die leichter zu verstehen sind:

- **Niedriger Aufwand (Standard für einfache Aufgaben)**: minimales Denk-Budget, schnelle Antworten, geeignet für Code-Formatierung, einfache Erklärungen, Einzeldatei-Bearbeitungen und Nachschlageoperationen.
- **Mittlerer Aufwand**: moderates Denk-Budget, Standard für die meisten interaktiven Coding-Sitzungen; balanciert Geschwindigkeit und Qualität für typische Entwicklungsaufgaben.
- **Hoher Aufwand / maximal**: großes Denk-Budget, reserviert für komplexe Aufgaben – Debugging schwer reproduzierbarer Probleme, Systemdesign, Analyse von Sicherheitsimplikationen oder jede Aufgabe, bei der eine falsche Antwort teuer zu korrigieren wäre.

### Wann das Modell denkt

Nicht jede Antwort löst erweitertes Denken aus. Claude Code verwendet Heuristiken, um zu bestimmen, wann zusätzliches Schlussfolgern basierend auf Signalen zur Aufgabenkomplexität gerechtfertigt ist: die Länge und Mehrdeutigkeit der Anfrage, die Anzahl der beteiligten Dateien, ob die Aufgabe nicht umkehrbare Änderungen beinhaltet und ob der Benutzer ausdrücklich um sorgfältige Analyse gebeten hat. Benutzer können auch den gewünschten Aufwand explizit signalisieren, indem sie Phrasen wie "Denk sorgfältig darüber nach" oder "Nimm dir Zeit" in ihre Anfragen einfügen – diese werden vom Modell als Signale erkannt, mehr Denk-Budget zu investieren.

### Streaming und Latenz

Erweitertes Denken interagiert auf vorhersehbare Weise mit Streaming: Das Modell beginnt erst nach Abschluss seiner internen Schlussfolgerung mit dem Streaming seiner sichtbaren Ausgabe. Das bedeutet, dass hoch-Aufwand-Anfragen eine längere anfängliche Pause haben, bevor die Ausgabe beginnt, aber das erste Token des tatsächlichen Inhalts vollständig ausgearbeitet ankommt, anstatt inkrementell unsicher. In Claude Codes CLI- und IDE-Integrationen erscheint dies als kurzer "Denken..."-Indikator, bevor die Antwort startet. Für interaktive Sitzungen ist diese Verzögerung bei komplexen Aufgaben normalerweise lohnenswert; für enge Feedback-Schleifen ist es vorzuziehen, den Aufwand niedrig zu halten.

```mermaid
flowchart LR
  Request[User request] -->|complexity signals| Effort[Effort level selected]
  Effort -->|budget_tokens set| Think[Internal thinking block]
  Think -->|reasoning complete| Draft[Draft response]
  Draft -->|self-review| Final[Final response streamed]
  Final -->|delivered to| User[Developer]
```

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|---|---|
| Sie einen komplexen, schwer reproduzierbaren Fehler mit vielen möglichen Ursachen debuggen | Sie nach einem einfachen One-Liner oder einer schnellen Syntaxkorrektur fragen — niedriger Aufwand ist schneller und ausreichend |
| Sie eine Systemarchitektur mit erheblichen Kompromissen entwerfen oder überprüfen | Interaktive Gespräche, bei denen jeder Zug ein kleiner Schritt ist — Latenz summiert sich |
| Sie Sicherheitsimplikationen einer Code-Änderung vor dem Mergen analysieren | Boilerplate oder Gerüstbau generieren, das gut etablierten Mustern folgt |
| Aufgaben, bei denen eine falsche Antwort erhebliche Nacharbeit erfordern würde | CI-Pipelines, bei denen Determinismus und Geschwindigkeit wichtiger sind als Schlussfolgerungstiefe |
| Jede Aufgabe, die Sie einem Senior-Engineer geben würden, der dafür bekannt ist, "vor dem Coden zu denken" | Sie unter engen Token-Budget-Einschränkungen arbeiten — Denk-Tokens zählen gegen Ihren Verbrauch |

## Vor- und Nachteile

| | Vorteile | Nachteile |
|---|---|---|
| **Hoher Aufwand** | Bessere Genauigkeit bei komplexen Aufgaben; erkennt Edge Cases; produziert wohlbegründete Erklärungen | Höhere Latenz; mehr Tokens verbraucht; längere Pause vor dem ersten Ausgabe-Token |
| **Niedriger Aufwand** | Schnelle Antworten; gut für enge interaktive Schleifen; niedrigere Token-Kosten | Kann Edge Cases bei komplexen Aufgaben übersehen; kann oberflächliche Analyse bei mehrdeutigen Problemen produzieren |
| **Automatischer Aufwand** | Keine Konfiguration erforderlich; Modell kalibriert auf Aufgabenkomplexität | Weniger vorhersehbares Verhalten; kann bei wirklich schwierigen Aufgaben, die einfach erscheinen, zu wenig investieren |

## Codebeispiele

```bash
# Claude Code CLI — signaling desired effort level through natural language

# Low effort (fast): simple, well-defined tasks
> Format this function to match our Prettier config

# Medium effort (default): typical coding tasks
> Refactor the UserService class to use dependency injection

# High effort: complex tasks — add "think carefully", "take your time", or "analyze deeply"
> Think carefully: this WebSocket handler occasionally drops messages under high load.
  Analyze all the possible race conditions and ordering issues in src/ws/handler.ts
  before suggesting a fix.

# High effort: architectural decisions
> Take your time to analyze the trade-offs between using Redis Pub/Sub versus
  a message queue like RabbitMQ for our notification service. Consider our
  current scale (10k concurrent users) and the team's operational experience.

# High effort: security review
> Analyze src/auth/jwt.ts carefully for security vulnerabilities. Think through
  all the attack vectors — token forgery, replay attacks, expiry bypass —
  before giving me your assessment.
```

```json
// Claude Code settings.json — configuring default thinking behavior
// Located at: ~/.claude/settings.json or .claude/settings.json in project root
{
  "thinking": {
    "defaultEffort": "medium",
    "maxBudgetTokens": 8000,
    "enableForComplexTasks": true
  }
}
```

```python
# Using extended thinking directly via the Anthropic API (for custom integrations)
import anthropic

client = anthropic.Anthropic()

# High-effort request: complex architectural question
response = client.messages.create(
    model="claude-opus-4-5",
    max_tokens=16000,
    # thinking block enables extended reasoning; budget_tokens controls depth
    thinking={
        "type": "enabled",
        "budget_tokens": 10000  # allow up to 10k tokens of internal reasoning
    },
    messages=[{
        "role": "user",
        "content": (
            "Analyze the following database schema for potential performance issues "
            "at 1M+ rows. Consider indexing strategies, query patterns, and normalization "
            "trade-offs. Schema: [paste schema here]"
        )
    }]
)

# The response content may include both thinking blocks and text blocks
for block in response.content:
    if block.type == "thinking":
        # Internal reasoning — useful for debugging model behavior
        print(f"[THINKING]: {block.thinking[:200]}...")
    elif block.type == "text":
        # Final response — the part to show the user
        print(f"[RESPONSE]: {block.text}")

# Low-effort request: simple, fast task (thinking disabled or minimal budget)
quick_response = client.messages.create(
    model="claude-haiku-4-5",  # Haiku for fast, simple tasks
    max_tokens=1024,
    # No thinking block for simple requests — faster and cheaper
    messages=[{
        "role": "user",
        "content": "Convert this array of objects to a Map keyed by id: [{id: 1, name: 'a'}, {id: 2, name: 'b'}]"
    }]
)
print(quick_response.content[0].text)
```

## Praktische Ressourcen

- [Dokumentation zum erweiterten Denken — Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) — Vollständige Referenz zu Denk-Blöcken, Budget-Tokens, Streaming-Verhalten und API-Parametern.
- [Cookbook zum erweiterten Denken](https://github.com/anthropics/anthropic-cookbook/tree/main/extended_thinking) — Praktische Notebooks, die erweitertes Denken für komplexe Schlussfolgerungsaufgaben demonstrieren.
- [Claude-Modellvergleich](https://docs.anthropic.com/en/docs/about-claude/models) — Modellkarten-Details einschließlich der Modelle, die erweitertes Denken unterstützen, und ihrer relativen Fähigkeiten.
- [Claude-Code-Einstellungsreferenz](https://docs.anthropic.com/en/docs/claude-code/settings) — Wo Standard-Aufwandsstufen und Denkverhalten in Claude Code konfiguriert werden.

## Siehe auch

- [Claude-Code-Übersicht](/docs/claude-code)
- [Prompt-Caching](/docs/claude-code/prompt-caching)
- [Kontextverwaltung](/docs/claude-code/context-management)
