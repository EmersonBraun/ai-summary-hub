import { source } from '@/lib/source';
import { SITE } from '@/lib/site';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const pages = source.getPages('en');
  const items = pages
    .slice(0, 50)
    .map((page) => {
      const url = `${SITE.url}${page.url}`;
      const title = escapeXml(page.data.title ?? page.url);
      const description = escapeXml(page.data.description ?? '');
      return `<item>
  <title>${title}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <description>${description}</description>
</item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${escapeXml(SITE.name)}</title>
<link>${SITE.url}</link>
<atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
<description>${escapeXml(SITE.tagline)}</description>
<language>en-US</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
