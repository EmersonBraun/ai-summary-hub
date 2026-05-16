import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { FEATURED_CATEGORIES, HOME_COPY, SITE, type Locale } from '@/lib/site';
import { JsonLd } from '@/components/json-ld';

type Params = { lang: Locale };

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang } = await props.params;
  const isEn = lang === 'en';
  const canonical = isEn ? '/' : `/${lang}`;
  return {
    title: { absolute: `${SITE.name} — ${SITE.tagline}` },
    description: SITE.tagline,
    alternates: {
      canonical,
      languages: {
        en: '/',
        'pt-BR': '/pt-BR',
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'website',
      title: SITE.name,
      description: SITE.tagline,
      url: `${SITE.url}${canonical}`,
      siteName: SITE.name,
      locale: SITE.locales[lang],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE.name,
      description: SITE.tagline,
      creator: SITE.twitter,
    },
  };
}

/* Per-category line icons (inherit currentColor) */
const ICONS: Record<string, ReactNode> = {
  fundamentals: (
    <path d="M12 3 3 8l9 5 9-5-9-5Zm0 13L3 11m18 0-9 5" />
  ),
  'prompt-engineering': (
    <path d="M4 17h6m4-9 4 4-4 4M8 4l-2 16" />
  ),
  agents: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2m0-14-2 2M7 17l-2 2" />
    </>
  ),
  rag: (
    <path d="M4 6c0-1.1 3.6-2 8-2s8 .9 8 2-3.6 2-8 2-8-.9-8-2Zm0 0v12c0 1.1 3.6 2 8 2s8-.9 8-2V6M4 12c0 1.1 3.6 2 8 2s8-.9 8-2" />
  ),
  mlops: (
    <path d="M12 2v4m0 12v4M2 12h4m12 0h4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
  ),
  'claude-code': (
    <path d="m8 9-3 3 3 3m8-6 3 3-3 3m-2-9-4 12" />
  ),
};

const WHY = {
  en: [
    { t: 'Source-cited', d: 'Every summary links to primary papers, docs, or repos — no hand-wavy claims.' },
    { t: 'LLM-friendly', d: 'Dense, structured pages designed to drop straight into an agent context window.' },
    { t: 'No paywall', d: 'Fully open knowledge. Read it, share it, fork it, translate it.' },
  ],
  'pt-BR': [
    { t: 'Com fontes', d: 'Todo resumo cita papers, docs ou repositórios primários — sem achismo.' },
    { t: 'Pronto para LLM', d: 'Páginas densas e estruturadas, feitas para caber no contexto de um agente.' },
    { t: 'Sem paywall', d: 'Conhecimento 100% aberto. Leia, compartilhe, fork, traduza.' },
  ],
} as const;

export default async function HomePage(props: { params: Promise<Params> }) {
  const { lang } = await props.params;
  const copy = HOME_COPY[lang];
  const docsHref = lang === 'en' ? '/docs' : `/${lang}/docs`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    inLanguage: SITE.locales[lang],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/docs?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    author: { '@type': 'Person', name: SITE.author, url: SITE.authorUrl },
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section className="ash-hero">
        <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:py-32">
          <div className="flex flex-col items-center text-center">
            <span className="ash-eyebrow">{copy.eyebrow}</span>
            <h1 className="mt-7 text-balance text-5xl font-bold tracking-tight sm:text-7xl">
              <span className="ash-gradient-text">{SITE.name}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-white/70 sm:text-xl">
              {SITE.tagline}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href={docsHref} className="ash-btn-primary rounded-lg px-7 py-3.5 text-sm">
                {copy.cta_primary}
              </Link>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ash-btn-ghost rounded-lg px-7 py-3.5 text-sm"
              >
                {copy.cta_secondary}
              </a>
            </div>

            <div className="ash-term mt-14 w-full max-w-xl rounded-xl px-5 py-4 text-left text-sm">
              <div className="mb-3 flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <code className="block text-white/80">
                <span style={{ color: 'var(--ash-accent)' }}>$</span> curl
                aisummaryhub.dev/docs/agents/index.mdx
                <br />
                <span className="text-white/40">
                  # 290+ source-cited AI summaries, agent-ready
                </span>
              </code>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-4">
            {copy.stats.map((s) => (
              <div key={s.label} className="px-4 py-6 text-center">
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl px-4">
        {/* Featured categories */}
        <section className="py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {copy.featured_title}
            </h2>
            <p className="mt-3 text-fd-muted-foreground">{copy.featured_subtitle}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_CATEGORIES.map((cat) => {
              const href = lang === 'en' ? `/docs/${cat.slug}` : `/${lang}/docs/${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  href={href}
                  className="ash-card group flex flex-col rounded-2xl p-6"
                >
                  <span
                    className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-fd-border bg-fd-background text-fd-primary transition group-hover:scale-110"
                    aria-hidden
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {ICONS[cat.slug]}
                    </svg>
                  </span>
                  <h3 className="text-lg font-semibold">{cat.title[lang]}</h3>
                  <p className="mt-2 text-sm text-fd-muted-foreground">
                    {cat.description[lang]}
                  </p>
                  <span className="mt-4 text-sm font-medium text-fd-primary opacity-0 transition group-hover:opacity-100">
                    {lang === 'en' ? 'Explore →' : 'Explorar →'}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Why */}
        <section className="border-t border-fd-border py-24">
          <div className="grid gap-10 sm:grid-cols-3">
            {WHY[lang].map((w, i) => (
              <div key={w.t}>
                <div className="font-mono text-sm text-fd-primary">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-3 text-xl font-semibold">{w.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
                  {w.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mb-24">
          <div className="ash-cta-panel rounded-3xl px-6 py-16 text-center sm:px-10">
            <h2 className="mx-auto max-w-2xl text-balance text-2xl font-bold sm:text-4xl">
              {copy.final_cta_title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/65">
              {copy.final_cta_subtitle}
            </p>
            <Link
              href={docsHref}
              className="ash-btn-primary mt-8 inline-block rounded-lg px-7 py-3.5 text-sm"
            >
              {copy.cta_primary}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
