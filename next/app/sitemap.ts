import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { SITE } from '@/lib/site';

const LANGS = ['en', 'pt-BR'] as const;

function urlFor(lang: string, slug: string[]): string {
  const seg = slug.length ? `/${slug.join('/')}` : '';
  if (lang === 'en') return `${SITE.url}/docs${seg}`;
  return `${SITE.url}/${lang}/docs${seg}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const params = source.generateParams('slug', 'lang') as Array<{ slug: string[]; lang: string }>;

  // Group params by slug so we can emit hreflang alternates.
  const bySlug = new Map<string, Set<string>>();
  for (const p of params) {
    const key = p.slug.join('/');
    if (!bySlug.has(key)) bySlug.set(key, new Set());
    bySlug.get(key)!.add(p.lang);
  }

  const entries: MetadataRoute.Sitemap = [];

  // Home (each locale)
  for (const lang of LANGS) {
    entries.push({
      url: lang === 'en' ? SITE.url : `${SITE.url}/${lang}`,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          en: SITE.url,
          'pt-BR': `${SITE.url}/pt-BR`,
        },
      },
    });
  }

  // Doc pages
  for (const [slug, langs] of bySlug) {
    const slugParts = slug ? slug.split('/') : [];
    for (const lang of langs) {
      entries.push({
        url: urlFor(lang, slugParts),
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LANGS.filter((l) => langs.has(l)).map((l) => [l, urlFor(l, slugParts)]),
          ),
        },
      });
    }
  }

  return entries;
}
