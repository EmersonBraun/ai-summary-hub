---
title: Contributing
description: How to add topics, improve examples, and translate content.
keywords: [contributing, template, PR]
---

# Contributing to AI Summary Hub

Thank you for helping improve this wiki. Here’s how to contribute.

## Topic template

Each topic doc should include:

- **Frontmatter:** `title`, `description`, `keywords`
- **Definition** — At least 2 paragraphs (or one longer paragraph covering “what it is” and “context/why it matters”). Add key terms, relation to nearby concepts, or when to use vs alternatives. Up to 3 paragraphs unless the topic is broad.
- **How it works** — At least a short multi-sentence explanation (3–5 sentences) in addition to any diagram or code. Include a **Mermaid diagram** when it explains architecture, flow, or sequence (e.g. agent loop, RAG pipeline, attention). Add numbered steps or component-by-component explanation where it helps.
- **Examples** — Python/JS code blocks where useful (commented if not runnable)
- **Pros/Cons** — Table when relevant
- **Benchmarks** — Links to benchmarks or papers (when applicable)
- **External documentation** (required) — At least 2–3 external resources per topic: official docs, codelabs, key papers, or repos. Prefer authoritative sources (Google, OpenAI, Hugging Face, arXiv). This section is for outbound links only; use **See also** for internal links.
- **See also** — Internal links to related docs

### Link checklist (External documentation)

When adding a topic, aim to include:

1. **Official product or framework doc** (e.g. LangChain agents, Hugging Face transformers)
2. **Tutorial or codelab** when available (e.g. [Google ADK codelab](https://codelabs.developers.google.com/your-first-agent-with-adk#0))
3. **Key paper or benchmark** (e.g. arXiv, benchmark leaderboard) where relevant

## Adding new topics

1. Create a new file under `docs/` in the right category (e.g. `docs/tools/my-tool.md`).
2. Use the template above and ensure a unique doc ID (path-based).
3. Add the doc to `sidebars.ts` in the right category.
4. Open a PR with a short description.

## Improving examples

- Prefer runnable code; add comments if dependencies or setup are non-obvious.
- Use Prism-supported languages (Python, JavaScript, TypeScript, bash, yaml, docker).
- Link to official docs or repos where relevant.

## Diagrams (Mermaid)

Diagrams in the docs are written in [Mermaid](https://mermaid.js.org/intro/getting-started.html) and rendered by the site via Docusaurus. Use valid Mermaid.js syntax so diagrams display correctly. If unsure, test your diagram in the [Mermaid Live Editor](https://mermaid.live/) before submitting.

## Translations

The site is localized for **Spanish (es), Portuguese (pt-BR), German (de), French (fr), and Simplified Chinese (zh-Hans)**. Default content is in English.

**Where translation files live:**

- **Sidebar and doc labels:** `i18n/<locale>/docusaurus-plugin-content-docs/current.json` (sidebar category labels). Doc titles come from each translated doc's front matter in `i18n/<locale>/docusaurus-plugin-content-docs/current/`.
- **Navbar:** `i18n/<locale>/docusaurus-theme-classic/navbar.json`
- **Footer:** `i18n/<locale>/docusaurus-theme-classic/footer.json`
- **Theme UI and custom pages (home, all-topics):** `i18n/<locale>/code.json`
- **Doc content:** Mirror the `docs/` tree under `i18n/<locale>/docusaurus-plugin-content-docs/current/` and translate each `.md` (front matter `title`, `description`, and body). Keep internal links as `/docs/...` so they work with the locale prefix.

**Adding a new locale:** Add the locale to `i18n.locales` in `docusaurus.config.ts`, then run `npm run write-translations` (optionally with `--locale <locale>`) to generate the JSON structure. Fill in translations for navbar, footer, `code.json`, sidebar, and doc content.

**When to run `write-translations`:** Run `npm run write-translations` when you add new sidebar items, theme strings, or custom page keys so that new keys appear in each locale's JSON files for translators.

## Code style and commits

- Follow existing formatting (e.g. 2 spaces, trailing newline).
- Use clear commit messages (e.g. “Add doc: X”, “Fix link in Y”).

## Versioning

When the content baseline is stable, maintainers may run `npm run docusaurus docs:version 1.0.0` to create versioned snapshots. The version selector will appear in the navbar. See [Docusaurus versioning](https://docusaurus.io/docs/versioning) for details.

---

Questions? Open an issue or PR on [GitHub](https://github.com/EmersonBraun/ai-summary-hub).
