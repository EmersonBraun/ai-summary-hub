import {config as loadDotenv} from 'dotenv';
import {resolve} from 'node:path';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Docusaurus does not load .env by default; Algolia keys must be in process.env when this file runs.
loadDotenv({path: resolve(process.cwd(), '.env')});

const algoliaAppId = process.env.ALGOLIA_APP_ID?.trim();
const algoliaApiKey = process.env.ALGOLIA_API_KEY?.trim();
/** DocSearch only loads when real credentials are set (see example.env). */
const algoliaConfigured = Boolean(algoliaAppId && algoliaApiKey);

const config: Config = {
  title: 'AI Summary Hub',
  tagline:
    'Your single source of truth for AI concepts, from fundamentals to advanced agents',
  favicon: 'img/favicon.ico',

  future: {
    experimental_router: 'browser',
    v4: true,
  },

  url: 'https://emersonbraun.github.io',
  baseUrl: '/ai-summary-hub/',

  organizationName: 'EmersonBraun',
  projectName: 'ai-summary-hub',

  onBrokenLinks: 'throw',
  onDuplicateRoutes: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt-BR', 'de', 'fr', 'zh-Hans'],
    localeConfigs: {
      en: {label: 'English', direction: 'ltr'},
      es: {label: 'Español', direction: 'ltr'},
      'pt-BR': {label: 'Português (BR)', direction: 'ltr', htmlLang: 'pt-BR'},
      de: {label: 'Deutsch', direction: 'ltr'},
      fr: {label: 'Français', direction: 'ltr'},
      'zh-Hans': {label: '简体中文', direction: 'ltr', htmlLang: 'zh-Hans'},
    },
  },

  headTags: [
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AI Summary Hub',
        url: 'https://emersonbraun.github.io/ai-summary-hub/',
        description:
          'Your single source of truth for AI concepts, from fundamentals to advanced agents.',
        inLanguage: ['en', 'es', 'pt-BR', 'de', 'fr', 'zh-Hans'],
        author: {
          '@type': 'Person',
          name: 'Emerson Braun',
          url: 'https://emersonbraun.dev/',
        },
      }),
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/EmersonBraun/ai-summary-hub/blob/main/',
          // Disabled until repo has commits (git log fails on empty branch); set true to show "Last updated" on docs
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
          onInlineTags: 'throw',
          tags: 'tags.yml',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly' as const,
          priority: 0.5,
          ignorePatterns: ['**/tags/**', '**/search'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@EmersonfBraun'},
      {name: 'twitter:creator', content: '@EmersonfBraun'},
      {name: 'og:type', content: 'website'},
      {name: 'og:site_name', content: 'AI Summary Hub'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AI Summary Hub',
      logo: {
        alt: 'AI Summary Hub Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/all-topics',
          position: 'left',
          label: 'All Topics',
        },
        {type: 'localeDropdown', position: 'right'},
        {
          href: 'https://github.com/EmersonBraun/ai-summary-hub',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'All topics',
              to: '/all-topics',
            },
          ],
        },
        {
          title: 'Open Source',
          items: [
            {
              label: 'AgentsKit — AI agent framework',
              href: 'https://emersonbraun.github.io/agentskit/',
            },
            {
              label: 'Skills — Reusable AI skills',
              href: 'https://github.com/EmersonBraun/skills',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            { label: 'Website', href: 'https://emersonbraun.dev/' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/emerson-braun/' },
            { label: 'X / Twitter', href: 'https://x.com/EmersonfBraun' },
            { label: 'Instagram', href: 'https://www.instagram.com/emerson.braun.dev/' },
            { label: 'YouTube', href: 'https://www.youtube.com/@emerson.braun_dev' },
          ],
        },
      ],
      copyright: `AI Summary Hub. Created by <a href="https://www.linkedin.com/in/emerson-braun/" target="_blank" rel="noopener noreferrer">Emerson Braun</a>, last updated on ${new Date().toLocaleDateString('en-GB')}`,
    },
    ...(algoliaConfigured
      ? {
          algolia: {
            appId: algoliaAppId!,
            apiKey: algoliaApiKey!,
            indexName: 'ai-summary-hub',
            contextualSearch: true,
          },
        }
      : {}),
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'python',
        'javascript',
        'typescript',
        'bash',
        'yaml',
        'docker',
      ],
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    scripts: [
      {
        src: 'https://plausible.io/js/script.js',
        defer: true,
        'data-domain': 'emersonbraun.github.io/ai-summary-hub',
      },
    ],
  } satisfies Preset.ThemeConfig,

  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
