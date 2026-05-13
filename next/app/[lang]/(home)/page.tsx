import Link from 'next/link';
import type { Metadata } from 'next';
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
    title: SITE.name,
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
    author: {
      '@type': 'Person',
      name: SITE.author,
      url: SITE.authorUrl,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-24">
        <section className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-fd-muted-foreground">
            {copy.eyebrow}
          </p>
          <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight sm:text-6xl">
            {SITE.name}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-balance text-lg text-fd-muted-foreground">
            {SITE.tagline}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={docsHref}
              className="rounded-md bg-fd-primary px-6 py-3 font-medium text-fd-primary-foreground transition hover:opacity-90"
            >
              {copy.cta_primary}
            </Link>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-fd-border px-6 py-3 font-medium transition hover:bg-fd-accent"
            >
              {copy.cta_secondary}
            </a>
          </div>
        </section>

        <section className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-fd-border bg-fd-border sm:grid-cols-4">
          {copy.stats.map((s) => (
            <div key={s.label} className="bg-fd-background p-6 text-center">
              <div className="text-3xl font-bold">{s.value}</div>
              <div className="mt-1 text-sm text-fd-muted-foreground">{s.label}</div>
            </div>
          ))}
        </section>

        <section className="mt-24">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">{copy.featured_title}</h2>
            <p className="mt-2 text-fd-muted-foreground">{copy.featured_subtitle}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_CATEGORIES.map((cat) => {
              const href = lang === 'en' ? `/docs/${cat.slug}` : `/${lang}/docs/${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  href={href}
                  className="group rounded-xl border border-fd-border bg-fd-card p-6 transition hover:border-fd-primary hover:bg-fd-accent"
                >
                  <h3 className="text-lg font-semibold group-hover:text-fd-primary">
                    {cat.title[lang]}
                  </h3>
                  <p className="mt-2 text-sm text-fd-muted-foreground">
                    {cat.description[lang]}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-24 rounded-2xl border border-fd-border bg-fd-card p-10 text-center">
          <h2 className="mb-3 text-balance text-2xl font-bold sm:text-3xl">
            {copy.final_cta_title}
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-fd-muted-foreground">
            {copy.final_cta_subtitle}
          </p>
          <Link
            href={docsHref}
            className="inline-block rounded-md bg-fd-primary px-6 py-3 font-medium text-fd-primary-foreground transition hover:opacity-90"
          >
            {copy.cta_primary}
          </Link>
        </section>
      </main>
    </>
  );
}
