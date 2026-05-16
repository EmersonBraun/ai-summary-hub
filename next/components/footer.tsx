import { SITE } from '@/lib/site';
import type { Locale } from '@/lib/site';

const SOCIAL = [
  { label: 'Website', href: 'https://emersonbraun.dev/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/emerson-braun/' },
  { label: 'X / Twitter', href: 'https://x.com/EmersonfBraun' },
  { label: 'Instagram', href: 'https://www.instagram.com/emerson.braun.dev/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@emerson.braun_dev' },
  { label: 'GitHub', href: SITE.github },
] as const;

const COPY = {
  en: {
    builtBy: 'Built by',
    license: 'Open knowledge — feel free to share and adapt.',
    docs: 'Docs',
    rss: 'RSS feed',
  },
  'pt-BR': {
    builtBy: 'Feito por',
    license: 'Conhecimento aberto — compartilhe e adapte à vontade.',
    docs: 'Docs',
    rss: 'Feed RSS',
  },
} as const;

export function Footer({ lang }: { lang: Locale }) {
  const copy = COPY[lang];
  const docsHref = lang === 'en' ? '/docs' : `/${lang}/docs`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-fd-border bg-fd-card">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:justify-between">
        <div>
          <div className="text-lg font-semibold">{SITE.name}</div>
          <p className="mt-2 max-w-md text-sm text-fd-muted-foreground">{copy.license}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a href={docsHref} className="text-fd-muted-foreground hover:text-fd-primary">
              {copy.docs}
            </a>
            <a href="/feed.xml" className="text-fd-muted-foreground hover:text-fd-primary">
              {copy.rss}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fd-muted-foreground hover:text-fd-primary"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-fd-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-fd-muted-foreground">
          © {year} {SITE.name}. {copy.builtBy}{' '}
          <a
            href={SITE.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            {SITE.author}
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
