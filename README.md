# AI Summary Hub

A single source-of-truth wiki for modern AI concepts: RAG, transformers, LLMs, agents, subagents, RDD, spec-driven development, and 50+ topics. Built with [Docusaurus 3](https://docusaurus.io).

## Features

- **50+ topics** — Fundamentals, neural networks, transformers, LLMs, RAG, agents, reasoning patterns, tools, case studies, and more
- **6 locales** — English (default), Spanish, Portuguese (BR), German, French, Simplified Chinese
- **Dark default** — AWS-Cheatsheet-style theme with optional light mode
- **Algolia DocSearch** — Full-text search (configure with your own credentials for production)
- **Mermaid diagrams** — In-doc flowcharts and architecture diagrams
- **GitHub Pages** — Deploy via GitHub Actions

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

Run `npm run lint` and `npm run typecheck` before committing; CI runs them on push.

## Configuration

- **Edit URL:** Points to `https://github.com/EmersonBraun/ai-summary-hub/blob/main/`
- **Base URL:** `/ai-summary-hub/` (for GitHub Pages project site)
- **Algolia:** Copy `example.env` to `.env` and set `ALGOLIA_APP_ID` and `ALGOLIA_API_KEY` (or use placeholders; search will work once you [apply for DocSearch](https://docsearch.algolia.io/)). For GitHub Actions deploy, add these as repo secrets.
- **Favicon:** Add `static/img/favicon.ico` if you want a custom favicon (optional)

## Deployment

1. Push the repo to `EmersonBraun/ai-summary-hub` on GitHub.
2. In **Settings → Pages**, set source to **GitHub Actions**.
3. On push to `main`, the workflow builds and deploys to `https://emersonbraun.github.io/ai-summary-hub/`.

If the site loads a 404, check the workflow artifact path: with `baseUrl: '/ai-summary-hub/'`, Docusaurus may output to `build/` (not `build/ai-summary-hub/`). If so, change the upload step to `path: build`.

## Contributing

See [Contributing](/docs/contributing) in the docs (or `docs/contributing.md`) for the topic template, how to add/translate content, and versioning.

## Spec

Implementation follows [prd.md](./prd.md) (Product Requirements Document).
