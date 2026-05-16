# Cutover plan — Docusaurus → Fumadocs on Vercel

Hand-off checklist for switching the production site from the existing
Docusaurus build (GitHub Pages) to the new Fumadocs app in `/next` on
Vercel.

## 1. Vercel project setup (one-time)

1. Go to https://vercel.com/new and import the repo.
2. **Root Directory:** set to `next` (this is a Vercel dashboard
   setting; it is intentionally **not** in `vercel.json` because Vercel
   only reads `rootDirectory` from project settings).
3. Framework Preset: **Next.js** (auto-detected).
4. Build Command: leave default (`next build`).
5. Output Directory: leave default (`.next`).
6. Install Command: leave default (`npm install`).
7. Environment Variables: **none required**. Search is embedded.
8. Deploy. The first deploy targets a Vercel preview URL (e.g.
   `ai-summary-hub-xxx.vercel.app`).

## 2. Smoke test (before DNS swap)

On the preview URL, verify:

- [ ] `/` renders the new landing page (EN)
- [ ] `/pt-BR` renders the pt-BR landing
- [ ] `/docs` shows the EN docs sidebar with 50+ categories
- [ ] `/pt-BR/docs` shows the pt-BR sidebar
- [ ] `/docs/fundamentals` and `/docs/fundamentals/machine-learning`
      load correctly with Mermaid diagrams rendering
- [ ] Cmd/Ctrl+K opens the Orama search dialog and finds results in
      both languages
- [ ] `/sitemap.xml` lists all 290+ docs with hreflang alternates
- [ ] `/robots.txt` references the sitemap
- [ ] `/feed.xml` returns valid RSS
- [ ] `/opengraph-image` returns a 1200×630 PNG
- [ ] Lighthouse SEO ≥ 95 on home and a sample doc
- [ ] View source on a doc page: confirms `<script type="application/ld+json">`
      with TechArticle + BreadcrumbList, and `<link rel="canonical">`

## 3. URL parity check

Compare the top 20 URLs the current Docusaurus site receives traffic on
(from Plausible / Google Search Console) against the Fumadocs build.
Each should return 200 on the preview URL. URLs in scope:

- `/docs/intro`
- `/docs/fundamentals`
- `/docs/fundamentals/machine-learning`
- `/docs/fundamentals/deep-learning`
- `/docs/prompt-engineering`
- `/docs/agents`
- `/docs/rag`
- `/docs/llms`
- `/docs/mlops`
- `/docs/claude-code`
- `/docs/mcp`
- `/pt-BR/docs/intro`
- `/pt-BR/docs/fundamentals`
- (etc — copy from analytics)

Any 404 here means a slug or category folder name changed during the
migration. Add a redirect in `next/next.config.mjs` (`redirects()` async
function) before cutover.

## 4. DNS swap

1. Add the production domain in Vercel project settings → Domains.
2. Vercel will show DNS records (A/ALIAS/CNAME). Update at the registrar.
3. Wait for DNS propagation (5–30 min).
4. Vercel issues a TLS cert automatically.

## 5. Search engine bookkeeping

1. In Google Search Console, submit the new sitemap:
   `https://<domain>/sitemap.xml`
2. Confirm hreflang is recognized (Indexing → Pages → Filter: hreflang).
3. The old GitHub Pages deploy is now a **redirect-only shell**: the
   `redirect/` directory (index.html + 404.html) is published to Pages by
   `.github/workflows/redirect-pages.yml`. GitHub Pages serves `404.html`
   for unknown deep links, so *every* old URL
   (`emersonbraun.github.io/ai-summary-hub/...`) bounces to the matching
   path on `https://ai-hub.emersonbraun.dev`, dropping unsupported locales
   (es/fr/de/zh-Hans → EN) and keeping `pt-BR`. To activate: repo Settings
   → Pages → Source = GitHub Actions, then run the workflow once.
4. Update any external backlinks pointing at the old GH Pages URL
   (`emersonbraun.github.io/ai-summary-hub/`).

## 6. Post-cutover (within 30 days)

If the new site is stable and Search Console shows no regressions:

1. Remove `/legacy-i18n/` (de, es, fr, zh-Hans archives).
2. Remove the root Docusaurus build:
   - Delete `docs/`, `sidebars.ts`, `docusaurus.config.ts`, `src/`,
     `static/`, `i18n/pt-BR/` (content now lives in `next/content/docs`)
   - Remove `@docusaurus/*` deps from root `package.json`
   - Move root `package.json` scripts that still matter
     (validate, lint) to be self-contained
3. Consider promoting `/next` to repo root in a separate PR.

## Rollback plan

If something blocks cutover after DNS is swapped:

1. In Vercel project settings → Domains, remove the production domain.
2. Re-enable GitHub Pages in the repo: Settings → Pages → Source =
   GitHub Actions, restore `.github/workflows/deploy.yml` from
   `git log --diff-filter=D` (commit 259b636 deleted it; revert).
3. Restore DNS records to point at GH Pages.

Total worst-case downtime: ~15 min.
