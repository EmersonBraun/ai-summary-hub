import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMDXComponents } from '@/mdx-components';
import { JsonLd } from '@/components/json-ld';
import { SITE, type Locale } from '@/lib/site';

type PageParams = { slug?: string[]; lang: Locale };

function pathFor(lang: string, slug: string[] | undefined): string {
  const seg = slug?.length ? `/${slug.join('/')}` : '';
  return lang === 'en' ? `/docs${seg}` : `/${lang}/docs${seg}`;
}

export default async function Page(props: { params: Promise<PageParams> }) {
  const { slug, lang } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const path = pathFor(lang, slug);
  const breadcrumb = [
    { name: SITE.name, item: SITE.url },
    { name: 'Docs', item: `${SITE.url}${lang === 'en' ? '/docs' : `/${lang}/docs`}` },
    ...((slug ?? []).map((s, i) => ({
      name: s.replace(/-/g, ' '),
      item: `${SITE.url}${pathFor(lang, (slug ?? []).slice(0, i + 1))}`,
    }))),
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: page.data.title,
      description: page.data.description,
      url: `${SITE.url}${path}`,
      inLanguage: SITE.locales[lang],
      author: { '@type': 'Person', name: SITE.author, url: SITE.authorUrl },
      publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.item,
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX components={getMDXComponents()} />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export function generateStaticParams() {
  return source.generateParams('slug', 'lang');
}

export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug, lang } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const path = pathFor(lang, slug);
  const langs = source.getLanguages();
  const availableLangs = new Set(
    langs
      .filter(({ pages }) => pages.some((p) => p.url === page.url))
      .map(({ language }) => language),
  );

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        (['en', 'pt-BR'] as const)
          .filter((l) => availableLangs.has(l))
          .map((l) => [l, pathFor(l, slug)]),
      ),
    },
    openGraph: {
      type: 'article',
      title: page.data.title,
      description: page.data.description,
      url: `${SITE.url}${path}`,
      siteName: SITE.name,
      locale: SITE.locales[lang],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
      creator: SITE.twitter,
    },
  };
}
