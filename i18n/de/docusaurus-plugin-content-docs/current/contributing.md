---
title: Beitragen
description: Wie man Themen hinzufügt, Beispiele verbessert und Inhalte übersetzt.
keywords: [contributing, template, PR]
---

# Contributing to AI Summary Hub

Thank you for helping improve this wiki. Here’s how to contribute.

## Topic template

Each topic doc should include:

- **Frontmatter:** `title`, `description`, `keywords`
- **Definition** — At least 2 paragraphs (or one longer paragraph covering “what it is” and “context/why it matters”). Add key terms, relation to nearby concepts, or when to use vs alternatives. Up to 3 paragraphs unless the topic is broad.
- **How it works** — At least a short multi-sentence explanation (3–5 sentences) in addition to any diagram or code. Include a **Mermaid diagram** when it explains architecture, flow, or sequence (z. B. agent loop, RAG pipeline, attention). Add numbered steps or component-by-component explanation where it helps.
- **Examples** — Python/JS code blocks where useful (commented if not runnable)
- **Pros/Cons** — Table when relevant
- **Benchmarks** — Links to benchmarks or papers (when applicable)
- **External documentation** (required) — At least 2–3 external resources per topic: official docs, codelabs, key papers, or repos. Prefer authoritative sources (Google, OpenAI, Hugging Face, arXiv). This section is for outbound links only; use **See also** for internal links.
- **See also** — Internal links to related docs

### Link checklist (External documentation)

When adding a topic, aim to include:

1. **Official product or framework doc** (z. B. LangChain agents, Hugging Face transformers)
2. **Tutorial or codelab** when available (z. B. [Google ADK codelab](https://codelabs.developers.google.com/your-first-agent-with-adk#0))
3. **Key paper or benchmark** (z. B. arXiv, benchmark leaderboard) where relevant

## Adding new topics

1. Create a new file under `docs/` in das richtige category (z. B. `docs/tools/my-tool.md`).
2. Use the template above and ensure a unique doc ID (path-based).
3. Add the doc to `sidebars.ts` in das richtige category.
4. Open a PR with a short description.

## Improving examples

- Prefer runnable code; add comments if dependencies or setup are non-obvious.
- Use Prism-supported languages (Python, JavaScript, TypeScript, bash, yaml, docker).
- Link to official docs or repos where relevant.

## Diagrams (Mermaid)

Diagramme in der Dokumentation sind in [Mermaid](https://mermaid.js.org/intro/getting-started.html) geschrieben und werden von der Seite via Docusaurus. Use valid Mermaid.js syntax so diagrams display correctly. If unsure, test your diagram in the [Mermaid Live Editor](https://mermaid.live/) before submitting.

## Translating content

- UI strings: edit `i18n/<locale>/code.json` and theme JSON (navbar, footer).
- Docs: die englische Struktur nach `i18n/<locale>/docusaurus-plugin-content-docs/current/` kopieren und das Markdown. Keep technical terms consistent (z. B. “RAG”, “Transformer” often stay in English).
- Run `npm run write-translations` to regenerate keys for new locales if needed.

## Code style and commits

- Follow existing formatting (z. B. 2 spaces, trailing newline).
- Use clear commit messages (z. B. “Add doc: X”, “Fix link in Y”).

## Versioning

Wenn die Inhaltsbasis stabil ist, können Maintainer `npm run docusaurus docs:version 1.0.0` ausführen, um versionierte Snappshots. The version selector will appear in the navbar. See [Docusaurus versioning](https://docusaurus.io/docs/versioning) for details.

---

Questions? Open an issue or PR on [GitHub](https://github.com/EmersonBraun/ai-summary-hub).
