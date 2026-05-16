import type { ReactNode } from 'react';
import { SITE } from '@/lib/site';
import type { Locale } from '@/lib/site';

const ICON = 20;

const Icons: Record<string, ReactNode> = {
  Website: (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  LinkedIn: (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  'X / Twitter': (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Instagram: (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  YouTube: (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  GitHub: (
    <svg width={ICON} height={ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
};

const SOCIAL = [
  { label: 'Website', href: 'https://emersonbraun.dev/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/emerson-braun/' },
  { label: 'X / Twitter', href: 'https://x.com/EmersonfBraun' },
  { label: 'Instagram', href: 'https://www.instagram.com/emerson.braun.dev/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@emerson.braun_dev' },
  { label: 'GitHub', href: SITE.github },
] as const;

const OSS = [
  { label: 'AgentsKit', href: 'https://www.agentskit.io/' },
  { label: 'Skills', href: 'https://github.com/EmersonBraun/skills' },
] as const;

const COPY = {
  en: {
    builtBy: 'Built by',
    license: 'Open knowledge — feel free to share and adapt.',
    docs: 'Docs',
    rss: 'RSS feed',
    connect: 'Connect',
    oss: 'Open Source',
    ossDesc: { AgentsKit: 'AI agent framework', Skills: 'Reusable AI skills' },
  },
  'pt-BR': {
    builtBy: 'Feito por',
    license: 'Conhecimento aberto — compartilhe e adapte à vontade.',
    docs: 'Docs',
    rss: 'Feed RSS',
    connect: 'Conectar',
    oss: 'Open Source',
    ossDesc: { AgentsKit: 'Framework de agentes de IA', Skills: 'Skills de IA reutilizáveis' },
  },
} as const;

export function Footer({ lang }: { lang: Locale }) {
  const copy = COPY[lang];
  const docsHref = lang === 'en' ? '/docs' : `/${lang}/docs`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-fd-border bg-fd-card">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <div className="text-lg font-semibold">{SITE.name}</div>
          <p className="mt-2 max-w-xs text-sm text-fd-muted-foreground">{copy.license}</p>
        </div>

        <div>
          <div className="text-sm font-semibold">{copy.docs}</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={docsHref} className="text-fd-muted-foreground hover:text-fd-primary">
                {copy.docs}
              </a>
            </li>
            <li>
              <a href="/feed.xml" className="text-fd-muted-foreground hover:text-fd-primary">
                {copy.rss}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold">{copy.oss}</div>
          <ul className="mt-4 space-y-2 text-sm">
            {OSS.map((o) => (
              <li key={o.label}>
                <a
                  href={o.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fd-muted-foreground hover:text-fd-primary"
                >
                  <span className="font-medium text-fd-foreground">{o.label}</span>
                  <span className="block text-xs text-fd-muted-foreground">
                    {copy.ossDesc[o.label as 'AgentsKit' | 'Skills']}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold">{copy.connect}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-fd-border text-fd-muted-foreground transition hover:border-fd-primary hover:text-fd-primary"
              >
                {Icons[s.label]}
              </a>
            ))}
          </div>
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
