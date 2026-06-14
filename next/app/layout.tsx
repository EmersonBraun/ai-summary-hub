import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import Script from 'next/script';
import { Suspense } from 'react';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { PostHogProvider } from '@/components/posthog-provider';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.tagline,
  applicationName: SITE.name,
  authors: [{ name: SITE.author, url: SITE.authorUrl }],
  creator: SITE.author,
  publisher: SITE.author,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.tagline,
    url: SITE.url,
    images: ['/social-card.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    creator: SITE.twitter,
    images: ['/social-card.jpg'],
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  robots: { index: true, follow: true },
};

// Static root html: lang attribute stays "en" so all 300 pages can pre-render.
// Per-route content-language signaling lives in each page's metadata and in
// the hreflang alternates from sitemap.ts / generateMetadata. The inline
// script below patches document.documentElement.lang on the client so
// JS-enabled crawlers (Googlebot) see the correct value once hydrated.
// Content is a literal constant with no user input and no `<` characters.
const LANG_PATCH =
  "(function(){try{var p=location.pathname;if(p==='/pt-BR'||p.indexOf('/pt-BR/')===0){document.documentElement.lang='pt-BR'}}catch(e){}})();";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider
          theme={{ defaultTheme: 'dark', enableSystem: false }}
        >
          {/* Suspense required because PostHogProvider uses useSearchParams */}
          <Suspense>
            <PostHogProvider>{children}</PostHogProvider>
          </Suspense>
        </RootProvider>
        <script suppressHydrationWarning>{LANG_PATCH}</script>
        <Script
          defer
          data-domain="aisummaryhub.dev"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
