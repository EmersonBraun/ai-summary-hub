---
title: 贡献指南
description: 如何添加主题、改进示例和翻译内容。
keywords: [contributing, template, PR]
---

# Contributing to AI Summary Hub

Thank you for helping improve this wiki. Here’s how to contribute.

## Topic template

Each topic doc should include:

- **Frontmatter:** `title`, `description`, `keywords`
- **Definition** — At least 2 paragraphs (or one longer paragraph covering “what it is” and “context/why it matters”). Add key terms, relation to nearby concepts, or when to use vs alternatives. Up to 3 paragraphs unless the topic is broad.
- **How it works** — At least a short multi-sentence explanation (3–5 sentences) in addition to any diagram or code. Include a **Mermaid diagram** when it explains architecture, flow, or sequence (例如 agent loop, RAG pipeline, attention). Add numbered steps or component-by-component explanation where it helps.
- **Examples** — Python/JS code blocks where useful (commented if not runnable)
- **Pros/Cons** — Table when relevant
- **Benchmarks** — Links to benchmarks or papers (when applicable)
- **External documentation** (required) — At least 2–3 external resources per topic: official docs, codelabs, key papers, or repos. Prefer authoritative sources (Google, OpenAI, Hugging Face, arXiv). This section is for outbound links only; use **See also** for internal links.
- **See also** — Internal links to related docs

### Link checklist (External documentation)

When adding a topic, aim to include:

1. **Official product or framework doc** (例如 LangChain agents, Hugging Face transformers)
2. **Tutorial or codelab** when available (例如 [Google ADK codelab](https://codelabs.developers.google.com/your-first-agent-with-adk#0))
3. **Key paper or benchmark** (例如 arXiv, benchmark leaderboard) where relevant

## Adding new topics

1. Create a new file under `docs/` in the right category (例如 `docs/tools/my-tool.md`).
2. Use the template above and ensure a unique doc ID (path-based).
3. Add the doc to `sidebars.ts` in the right category.
4. Open a PR with a short description.

## Improving examples

- Prefer runnable code; add comments if dependencies or setup are non-obvious.
- Use Prism-supported languages (Python, JavaScript, TypeScript, bash, yaml, docker).
- Link to official docs or repos where relevant.

## Diagrams (Mermaid)

文档中的图表使用 [Mermaid](https://mermaid.js.org/intro/getting-started.html) 编写，并由站e via Docusaurus. Use valid Mermaid.js syntax so diagrams display correctly. If unsure, test your diagram in the [Mermaid Live Editor](https://mermaid.live/) before submitting.

## Translating content

- UI strings: edit `i18n/<locale>/code.json` and theme JSON (navbar, footer).
- 文档：将英文结构复制到 `i18n/<locale>/docusaurus-plugin-content-docs/current/` 并翻译 Markdown. Keep technical terms consistent (例如 “RAG”, “Transformer” often stay in English).
- Run `npm run write-translations` to regenerate keys for new locales if needed.

## Code style and commits

- Follow existing formatting (例如 2 spaces, trailing newline).
- Use clear commit messages (例如 “Add doc: X”, “Fix link in Y”).

## Versioning

当内容基线稳定时，维护者可以运行 `npm run docusaurus docs:version 1.0.0` 来创建版本化快照pshots. The version selector will appear in the navbar. See [Docusaurus versioning](https://docusaurus.io/docs/versioning) for details.

---

Questions? Open an issue or PR on [GitHub](https://github.com/EmersonBraun/ai-summary-hub).
