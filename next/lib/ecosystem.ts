import type { Locale } from '@/lib/site';

const UTM = 'utm_source=aisummaryhub&utm_medium=ecosystem&utm_campaign=cohesion';

/**
 * The AgentsKit ecosystem. AI Summary Hub is the "learn" layer — read the
 * concepts here, build them with AgentsKit, ship them with AKOS. These links
 * and the summed star count keep every surface cross-related.
 */
export const ECOSYSTEM = {
  author: 'Emerson Braun',
  authorUrl: `https://emersonbraun.dev?${UTM}`,
  agentskit: `https://www.agentskit.io?${UTM}`,
  agentskitGithub: 'https://github.com/AgentsKit-io/agentskit',
} as const;

/** Repos whose stars are summed for the "across the ecosystem" header badge. */
export const ECOSYSTEM_REPOS = [
  'AgentsKit-io/agentskit',
  'AgentsKit-io/agentskit-os',
  'AgentsKit-io/agentskit-registry',
  'AgentsKit-io/agents-playbook',
  'EmersonBraun/ai-summary-hub',
  'EmersonBraun/skills',
] as const;

/** Last-known total — served if the GitHub API is unreachable or rate-limited. */
const FALLBACK_STARS = 18;

/**
 * The ecosystem nav: a single "learn → build → ship" story. Each step is a
 * real product, cross-linked with UTM so the funnel is measurable.
 */
export const ECOSYSTEM_LINKS: Record<
  Locale,
  { menuLabel: string; items: { label: string; sub: string; href: string; external: boolean }[] }
> = {
  en: {
    menuLabel: 'Ecosystem',
    items: [
      {
        label: 'AgentsKit',
        sub: 'Build agents in JavaScript',
        href: ECOSYSTEM.agentskit,
        external: true,
      },
      {
        label: 'AKOS',
        sub: 'Ship & orchestrate in production',
        href: `https://akos.agentskit.io?${UTM}`,
        external: true,
      },
      {
        label: 'Registry',
        sub: 'Pre-built production agents',
        href: `https://registry.agentskit.io?${UTM}`,
        external: true,
      },
      {
        label: 'Playbook',
        sub: 'Enterprise AI engineering standards',
        href: `https://playbook.agentskit.io?${UTM}`,
        external: true,
      },
      {
        label: 'Skills',
        sub: 'Reusable AI skills for Claude Code',
        href: 'https://github.com/EmersonBraun/skills',
        external: true,
      },
    ],
  },
  'pt-BR': {
    menuLabel: 'Ecossistema',
    items: [
      {
        label: 'AgentsKit',
        sub: 'Construa agentes em JavaScript',
        href: ECOSYSTEM.agentskit,
        external: true,
      },
      {
        label: 'AKOS',
        sub: 'Orquestre e suba em produção',
        href: `https://akos.agentskit.io?${UTM}`,
        external: true,
      },
      {
        label: 'Registry',
        sub: 'Agentes de produção prontos',
        href: `https://registry.agentskit.io?${UTM}`,
        external: true,
      },
      {
        label: 'Playbook',
        sub: 'Padrões de engenharia de IA enterprise',
        href: `https://playbook.agentskit.io?${UTM}`,
        external: true,
      },
      {
        label: 'Skills',
        sub: 'Skills de IA reutilizáveis para Claude Code',
        href: 'https://github.com/EmersonBraun/skills',
        external: true,
      },
    ],
  },
};

/**
 * Sum GitHub stars across the whole ecosystem. Cached for 6h via the Next
 * fetch cache so we never hammer the unauthenticated API (60 req/h/IP). Any
 * failure falls back to the last-known total — the header never breaks.
 */
export async function getEcosystemStars(): Promise<number> {
  try {
    const counts = await Promise.all(
      ECOSYSTEM_REPOS.map(async (slug) => {
        const res = await fetch(`https://api.github.com/repos/${slug}`, {
          headers: { Accept: 'application/vnd.github+json' },
          next: { revalidate: 21600 },
        });
        if (!res.ok) throw new Error(`${slug}: ${res.status}`);
        const data = (await res.json()) as { stargazers_count?: number };
        return data.stargazers_count ?? 0;
      }),
    );
    const total = counts.reduce((a, b) => a + b, 0);
    return total > 0 ? total : FALLBACK_STARS;
  } catch {
    return FALLBACK_STARS;
  }
}
