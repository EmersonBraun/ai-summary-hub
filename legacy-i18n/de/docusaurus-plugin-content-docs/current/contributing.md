---
title: Contributing
description: How to add topics, improve examples, and translate content.
keywords: [contributing, template, PR]
authors: [EmersonBraun]
---

# Zu AI Summary Hub beitragen

Vielen Dank, dass Sie helfen, dieses Wiki zu verbessern. So können Sie beitragen.

## Artikelvorlage

Jeder Artikel folgt einer strukturierten Vorlage, die den AI Summary Hub zu einem umfassenden Wissensorakel machen soll. Die Abschnitte sind in **Pflicht-** und **optionale** Abschnitte unterteilt.

### Pflichtabschnitte

Jeder Artikel **muss** diese Abschnitte in dieser genauen Reihenfolge enthalten:

1. **Frontmatter** — Metadaten-Block am Anfang der Datei (siehe [Frontmatter-Spezifikation](#frontmatter-spezifikation) unten)
2. **Definition** — Was es ist, Kontext und warum es wichtig ist. Mindestens 2–3 Absätze.
3. **Funktionsweise** — Technische Erklärung. Verwenden Sie H3-Unterabschnitte für komplexe Themen. Mindestens ein Mermaid-Diagramm mit **beschrifteten Kanten** (nicht nur Kästchen). Mindestens 3–5 Sätze pro Unterabschnitt.
4. **Wann verwenden / Wann NICHT verwenden** — Eine zweispaltige Tabelle mit praktischen Hinweisen. Mindestens 3 Zeilen.
5. **Codebeispiele** — Mindestens ein **funktionierendes** Snippet (kein Pseudocode). Die Sprache liegt im Ermessen des Autors: Python ist die Standardsprache für ML/MLOps-Themen; TypeScript für MCP/Claude Code-Themen; verwenden Sie, was für das Thema am natürlichsten ist.
6. **Praktische Ressourcen** — 2–5 kuratierte externe Links. Akzeptierte Typen: offizielle Docs, Kurse (kostenlos oder kostenpflichtig), GitHub-Repos, arXiv-Papers, Unternehmensblog-Posts (z. B. OpenAI Blog, Anthropic Blog).
7. **Siehe auch** — Interne Links zu verwandten Docs in diesem Wiki.

### Optionale Abschnitte

Fügen Sie diese **nur ein, wenn relevant**. Wenn ein Abschnitt nicht zutrifft, lassen Sie ihn vollständig weg — fügen Sie die Überschrift nicht mit „N/A" oder einem Platzhalter hinzu.

- **Vergleiche** — Eine schnelle Vergleichstabelle mit 3–5 Kriterien (z. B. Benutzerfreundlichkeit, Community, Performance). **Reziprozitätsregel**: Wenn Artikel A einen Vergleich mit Artikel B enthält, muss Artikel B auch einen Vergleich mit Artikel A enthalten.
- **Vor- & Nachteile** — Tabellenformat mit zwei Spalten.
- **Benchmarks** — Links zu Benchmarks, Bestenlisten oder Papers mit quantitativen Daten.

### Abschnittsreihenfolge

Die vollständige Reihenfolge, wenn alle Abschnitte vorhanden sind:

```
1. Definition
2. Funktionsweise
3. Wann verwenden / Wann NICHT verwenden
4. Vergleiche (optional)
5. Vor- & Nachteile (optional)
6. Benchmarks (optional)
7. Codebeispiele
8. Praktische Ressourcen
9. Siehe auch
```

### Tiefenrichtlinien

| Abschnitt | Mindesttiefe |
|-----------|--------------|
| Definition | 2–3 Absätze über Was, Kontext und warum es wichtig ist |
| Funktionsweise | H3-Unterabschnitte für komplexe Themen; 1+ Mermaid-Diagramm mit beschrifteten Kanten; 3–5 Sätze pro Unterabschnitt |
| Wann verwenden / Wann NICHT verwenden | Tabelle mit 3+ Zeilen |
| Codebeispiele | 1+ funktionierendes Snippet mit Kommentaren; muss ausführbar oder klar annotiert sein |
| Praktische Ressourcen | 2–5 kuratierte Links |
| Vergleiche (wenn vorhanden) | Tabelle mit 3–5 Kriterien |

### Frontmatter-Spezifikation

Jedes Dokument muss diesen Frontmatter-Block enthalten:

```yaml
---
title: "Vollständiger Artikeltitel"
description: "Einzeilige Beschreibung für SEO und Suche"
keywords: [keyword1, keyword2, keyword3]
tags: [intermediate]  # genau eines von: beginner, intermediate, advanced
authors: [GitHubBenutzername]  # GitHub-Benutzername(n) des/der Autor(en)
---
```

**Pflichtfelder:**

| Feld | Beschreibung |
|------|-------------|
| `title` | Vollständiger Artikeltitel |
| `description` | Einzeilige Beschreibung (wird für SEO und Suche verwendet) |
| `keywords` | Array relevanter Schlüsselwörter |
| `tags` | Array mit **genau einem** Level-Tag: `beginner`, `intermediate` oder `advanced` |
| `authors` | Array der GitHub-Benutzernamen der Artikelautoren |

**Optionale Felder:**

| Feld | Beschreibung | Wann verwenden |
|------|-------------|----------------|
| `sidebar_label` | Kurzes Label für die Seitenleiste | Nur wenn der Titel ~30 Zeichen überschreitet |

**Hinweis:** `last_updated` wird von Docusaurus automatisch über den Git-Verlauf verwaltet. Fügen Sie es nicht manuell hinzu.

### Vollständiges Vorlagenbeispiel

```markdown
---
title: "Beispielthema"
description: "Eine kurze Beschreibung des Themas."
keywords: [thema, beispiel, ki]
tags: [intermediate]
authors: [IhrGitHubBenutzername]
---

# Beispielthema

## Definition

Absatz 1: Was es ist.

Absatz 2: Kontext und Beziehung zu anderen Konzepten.

Absatz 3: Warum es wichtig ist.

## Funktionsweise

### Unterabschnitt A

Erklärung mit 3–5 Sätzen.

### Unterabschnitt B

Erklärung mit Diagramm:

(Mermaid-Diagramm hier mit beschrifteten Kanten)

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|----------------|----------------|
| Szenario A | Gegenszenario A |
| Szenario B | Gegenszenario B |
| Szenario C | Gegenszenario C |

## Vergleiche

(Optional — nur wenn Alternativen existieren)

| Kriterium | Dieses Thema | Alternative |
|-----------|-------------|-------------|
| Kriterium 1 | ... | ... |
| Kriterium 2 | ... | ... |
| Kriterium 3 | ... | ... |

## Vor- und Nachteile

(Optional)

| Vorteile | Nachteile |
|----------|-----------|
| Vorteil 1 | Nachteil 1 |
| Vorteil 2 | Nachteil 2 |

## Benchmarks

(Optional — Link zu Papers oder Bestenlisten)

## Codebeispiele

(Funktionierendes Code-Snippet hier)

## Praktische Ressourcen

- [Offizielle Dokumentation](https://example.com) — Beschreibung
- [Tutorial oder Kurs](https://example.com) — Beschreibung
- [GitHub-Repo](https://example.com) — Beschreibung

## Siehe auch

- [Verwandtes Dokument 1](/docs/pfad)
- [Verwandtes Dokument 2](/docs/pfad)
```

## Neue Themen hinzufügen

1. Erstellen Sie eine neue Datei unter `docs/` in der richtigen Kategorie (z. B. `docs/tools/mein-tool.md`).
2. Verwenden Sie die obige Vorlage und stellen Sie eine eindeutige Dokument-ID (pfadbasiert) sicher.
3. Fügen Sie alle **Pflichtabschnitte** und relevante optionale Abschnitte ein.
4. Fügen Sie das Dokument zu `sidebars.ts` in der richtigen Kategorie hinzu.
5. Wenn Ihr Artikel einen **Vergleich** zu einem anderen Artikel enthält, aktualisieren Sie diesen Artikel mit einem gegenseitigen Vergleich.
6. Öffnen Sie einen PR mit einer kurzen Beschreibung.

## Beispiele verbessern

- Bevorzugen Sie ausführbaren Code; fügen Sie Kommentare hinzu, wenn Abhängigkeiten oder Setup nicht offensichtlich sind.
- Verwenden Sie Prism-unterstützte Sprachen (Python, JavaScript, TypeScript, bash, yaml, docker).
- Verlinken Sie auf offizielle Docs oder Repos, wo relevant.

## Diagramme (Mermaid)

Diagramme in den Docs sind in [Mermaid](https://mermaid.js.org/intro/getting-started.html) geschrieben und werden von der Website über Docusaurus gerendert. Richtlinien:

- Verwenden Sie gültige Mermaid.js-Syntax — testen Sie im [Mermaid Live Editor](https://mermaid.live/), bevor Sie einreichen.
- **Beschriften Sie Kanten**, um Beziehungen zu beschreiben (nicht nur mit Pfeilen verbundene Kästchen).
- Verwenden Sie Subgraphen, um verwandte Komponenten zu gruppieren, wenn Diagramme 5+ Knoten haben.
- Bevorzugen Sie `flowchart LR` oder `flowchart TD` für Architektur; `sequenceDiagram` für Interaktionen.

## Übersetzungen

Die Website ist für **Spanisch (es), Portugiesisch (pt-BR), Deutsch (de), Französisch (fr) und Vereinfachtes Chinesisch (zh-Hans)** lokalisiert. Standardinhalt ist auf Englisch.

Neue Artikel werden **nur auf Englisch** erstellt. Übersetzungen werden in einer separaten Phase bearbeitet.

**Wo Übersetzungsdateien gespeichert werden:**

- **Seitenleiste und Dokumentlabels:** `i18n/<locale>/docusaurus-plugin-content-docs/current.json` (Seitenleis-Kategorielabels). Dokumenttitel kommen aus dem Frontmatter jedes übersetzten Dokuments in `i18n/<locale>/docusaurus-plugin-content-docs/current/`.
- **Navigationsleiste:** `i18n/<locale>/docusaurus-theme-classic/navbar.json`
- **Fußzeile:** `i18n/<locale>/docusaurus-theme-classic/footer.json`
- **Theme-UI und benutzerdefinierte Seiten (Home, all-topics):** `i18n/<locale>/code.json`
- **Dokumentinhalt:** Spiegeln Sie den `docs/`-Baum unter `i18n/<locale>/docusaurus-plugin-content-docs/current/` und übersetzen Sie jede `.md`-Datei (Frontmatter `title`, `description` und Inhalt). Behalten Sie interne Links als `/docs/...` bei, damit sie mit dem Locale-Präfix funktionieren.

**Eine neue Sprache hinzufügen:** Fügen Sie die Sprache zu `i18n.locales` in `docusaurus.config.ts` hinzu, dann führen Sie `npm run write-translations` aus (optional mit `--locale <locale>`), um die JSON-Struktur zu generieren. Füllen Sie Übersetzungen für Navigationsleiste, Fußzeile, `code.json`, Seitenleiste und Dokumentinhalt aus.

**Wann `write-translations` ausführen:** Führen Sie `npm run write-translations` aus, wenn Sie neue Seitenleistenelemente, Theme-Strings oder benutzerdefinierte Seitenschlüssel hinzufügen, damit neue Schlüssel in den JSON-Dateien jeder Sprache für Übersetzer erscheinen.

## Code-Stil und Commits

- Befolgen Sie die vorhandene Formatierung (z. B. 2 Leerzeichen, abschließende Zeilenumbruch).
- Verwenden Sie klare Commit-Nachrichten (z. B. "Add doc: X", "Fix link in Y").

## Versionierung

Wenn der Inhalt stabil ist, können Maintainer `npm run docusaurus docs:version 1.0.0` ausführen, um versionierte Snapshots zu erstellen. Der Versionsauswähler erscheint in der Navigationsleiste. Siehe [Docusaurus-Versionierung](https://docusaurus.io/docs/versioning) für Details.

---

Fragen? Öffnen Sie einen Issue oder PR auf [GitHub](https://github.com/EmersonBraun/ai-summary-hub).
