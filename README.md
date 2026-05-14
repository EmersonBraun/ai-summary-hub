# AI Summary Hub

Open AI knowledge wiki — 290+ articles across 50+ categories of modern AI, from fundamentals to MLOps, agents, prompt engineering, and beyond. Built with [Fumadocs](https://fumadocs.dev/) on Next.js, deployed on Vercel.

> The active app lives in [`/next`](./next). The legacy Docusaurus build at the repo root is preserved during the migration and will be removed after cutover (see [CUTOVER.md](./CUTOVER.md)).

## Features

- **290+ articles across 50+ categories** — Fundamentals, neural networks, transformers, LLMs, RAG, agents, prompt engineering, Claude Code, MCP, MLOps, edge AI, model providers, and more
- **Bilingual** — English (default, no URL prefix) and Portuguese (BR) at `/pt-BR/...`
- **Orama search** — Embedded, client-side full-text search via Fumadocs (no API keys, no Algolia)
- **SEO-first** — JSON-LD (WebSite, TechArticle, BreadcrumbList), canonical + hreflang, multi-locale sitemap, RSS feed, dynamic OG image
- **Mermaid diagrams** — Client-rendered via a small remark plugin
- **Content validation** — Frontmatter, link, and markdown linting in CI

## Quick start

**Requirements:** Node.js >= 22

```bash
cd next
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For production build:

```bash
cd next
npm run build
npm run start
```

## Available scripts

### Root (validation)

| Command | Description |
|---------|-------------|
| `npm run validate` | Frontmatter + links + markdownlint across `next/content/docs` |
| `npm run validate:frontmatter` | Validate MDX frontmatter |
| `npm run validate:links` | Validate internal links per locale |
| `npm run validate:markdown` | Run markdownlint-cli2 |

### `/next` (app)

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run typecheck` | TypeScript check |

### Migration scripts (`scripts/migrate/`)

| Command | Description |
|---------|-------------|
| `node scripts/migrate/codemod.mjs --src <dir> --dest <dir>` | Convert Docusaurus `.md` → Fumadocs `.mdx` |
| `node_modules/.bin/tsx scripts/migrate/gen-meta.ts --dest <dir>` | Generate `meta.json` files from `sidebars.ts` |

## Configuration

- **Search:** Orama embedded, served at `/api/search` via `createFromSource`
- **i18n:** `parser: 'dir'`, `hideLocale: 'default-locale'` — EN at `/docs/...`, pt-BR at `/pt-BR/docs/...`
- **Hosting:** Vercel (Root Directory: `next`)

## Deployment

See [CUTOVER.md](./CUTOVER.md) for the full Docusaurus → Fumadocs → Vercel migration plan and rollback procedure.

## Tech stack

- **Framework:** Fumadocs UI/Core/MDX + Next.js 16 (Turbopack)
- **Search:** Orama (embedded)
- **Styling:** Tailwind v4 + Fumadocs preset
- **Diagrams:** Mermaid 11 (client-rendered)
- **Language:** TypeScript, React 19
- **CI:** GitHub Actions (validation + build verification)
- **Deploy:** Vercel
