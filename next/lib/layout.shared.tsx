import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { EcosystemStars } from '@/components/ecosystem-stars';
import { ECOSYSTEM_LINKS, getEcosystemStars } from '@/lib/ecosystem';
import type { Locale } from '@/lib/site';

/**
 * Shared nav/header config for every layout. Async because the ecosystem star
 * badge is fetched + summed at request time (cached 6h). Both the home and
 * docs layouts await this so the header is identical across the site.
 */
export async function getBaseOptions(lang: Locale): Promise<BaseLayoutProps> {
  const stars = await getEcosystemStars();
  const eco = ECOSYSTEM_LINKS[lang];
  const docsUrl = lang === 'en' ? '/docs' : `/${lang}/docs`;

  return {
    nav: {
      title: 'AI Summary Hub',
    },
    links: [
      {
        text: 'Docs',
        url: docsUrl,
        active: 'nested-url',
      },
      {
        type: 'menu',
        text: eco.menuLabel,
        items: eco.items.map((item) => ({
          text: item.label,
          description: item.sub,
          url: item.href,
          external: item.external,
        })),
      },
      {
        type: 'custom',
        secondary: true,
        children: <EcosystemStars stars={stars} lang={lang} />,
      },
    ],
  };
}
