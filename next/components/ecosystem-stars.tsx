import { ECOSYSTEM } from '@/lib/ecosystem';
import type { Locale } from '@/lib/site';

const LABEL: Record<Locale, string> = {
  en: 'across the ecosystem',
  'pt-BR': 'no ecossistema',
};

/**
 * Header badge showing the summed GitHub stars of the whole AgentsKit
 * ecosystem. Small numbers individually — together they tell one story.
 */
export function EcosystemStars({ stars, lang }: { stars: number; lang: Locale }) {
  return (
    <a
      href={ECOSYSTEM.agentskitGithub}
      target="_blank"
      rel="noopener noreferrer"
      title={`${stars} ${LABEL[lang]}`}
      className="inline-flex items-center gap-1.5 rounded-full border border-fd-border px-2.5 py-1 text-xs font-medium text-fd-muted-foreground transition-colors hover:border-fd-primary hover:text-fd-primary"
    >
      <svg
        width={13}
        height={13}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        className="text-fd-primary"
      >
        <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.8 5.8 20.9l1.6-7L2 9.2l7.1-.6z" />
      </svg>
      <span className="tabular-nums text-fd-foreground">{stars}</span>
      <span className="hidden sm:inline">{LABEL[lang]}</span>
    </a>
  );
}
