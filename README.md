# AI Summary Hub

A comprehensive, multilingual knowledge base covering 145+ articles across 47 categories of modern AI — from fundamentals to MLOps, agents, prompt engineering, and beyond. Built with [Docusaurus 3](https://docusaurus.io) and deployed on GitHub Pages.

## Features

- **145+ articles across 47 categories** — Fundamentals, neural networks, transformers, LLMs, RAG, agents, prompt engineering, Claude Code, MCP, MLOps, edge AI, model providers, and more
- **6 locales** — English (default), Spanish, Portuguese (BR), German, French, Simplified Chinese
- **Learning paths** — Curated sidebar switcher with 8 guided learning paths
- **SEO optimized** — Structured metadata, Open Graph tags, and Plausible analytics
- **Algolia DocSearch** — Full-text search (configure with your own credentials for production)
- **Mermaid diagrams** — In-doc flowcharts and architecture diagrams
- **Dark default** — AWS-Cheatsheet-style theme with optional light mode
- **Content validation** — Frontmatter, link, and markdown linting via CI

## Content categories

| Area | Topics |
|------|--------|
| Foundations | Fundamentals, Neural Networks, Transformers, NLP, CV |
| Models | LLMs, GANs, VAEs, Diffusion Models, Transfer/Few-shot/Zero-shot Learning |
| Applications | RAG, Agents, Subagents, Autonomous Agents, Reasoning Patterns |
| Tooling | Claude Code, MCP, Prompt Engineering, Tools (Cursor, Copilot, etc.) |
| Infrastructure | MLOps, Frameworks (PyTorch, TensorFlow), Edge AI, Model Compression, Quantization, Pruning |
| Advanced | Federated Learning, Knowledge Distillation, DRL, XAI, AI Safety, AI Ethics |
| Reference | Model Providers, Benchmarks, Case Studies, Glossary |

## Quick start

**Requirements:** Node.js >= 18

```bash
npm install
npm run start
```

Open [http://localhost:3000](http://localhost:3000). For production build:

```bash
npm run build
npm run serve
```

## Available scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start dev server |
| `npm run build` | Production build (all 6 locales) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run validate` | Frontmatter + links + markdown lint |
| `npm run i18n:audit-docs` | Detect English leaks in translations |
| `npm run i18n:generate-code` | Generate locale-specific code.json |

Run `npm run lint` and `npm run typecheck` before committing.

## Configuration

- **Base URL:** `/ai-summary-hub/` (GitHub Pages project site)
- **Algolia:** Copy `example.env` to `.env` and set `ALGOLIA_APP_ID` and `ALGOLIA_API_KEY` (or use placeholders; search will work once you [apply for DocSearch](https://docsearch.algolia.io/)). For GitHub Actions deploy, add these as repo secrets.
- **Analytics:** Plausible is pre-configured in `docusaurus.config.ts`

## Deployment

1. Push the repo to `EmersonBraun/ai-summary-hub` on GitHub.
2. In **Settings → Pages**, set source to **GitHub Actions**.
3. On push to `main`, the workflow builds and deploys to `https://emersonbraun.github.io/ai-summary-hub/`.

## Tech stack

- **Framework:** Docusaurus 3.9.2
- **Language:** TypeScript 6.0, React 19
- **Linting:** ESLint 10 (flat config), markdownlint-cli2
- **CI/CD:** GitHub Actions (deploy + dependabot auto-merge)

## Contributing

See [Contributing](/docs/contributing) in the docs (or `docs/contributing.md`) for the topic template, how to add/translate content, and versioning.

## Spec

Implementation follows [prd.md](./prd.md) (Product Requirements Document).
