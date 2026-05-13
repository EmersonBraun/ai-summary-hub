export const SITE = {
  name: 'AI Summary Hub',
  tagline: 'Open AI knowledge wiki — concise, source-cited summaries on modern AI engineering.',
  description:
    'Open knowledge wiki covering AI fundamentals, neural networks, LLMs, prompt engineering, agents, MLOps, RAG, fine-tuning, Claude Code, MCP, and more — across 50+ categories and 290+ pages in English and Portuguese.',
  url: 'https://aisummaryhub.dev',
  ogImageAlt: 'AI Summary Hub — open AI knowledge wiki',
  author: 'Emerson Braun',
  authorUrl: 'https://emersonbraun.dev',
  twitter: '@EmersonfBraun',
  github: 'https://github.com/EmersonBraun/ai-summary-hub',
  locales: { en: 'en-US', 'pt-BR': 'pt-BR' } as const,
} as const;

export const FEATURED_CATEGORIES: Array<{
  slug: string;
  title: { en: string; 'pt-BR': string };
  description: { en: string; 'pt-BR': string };
}> = [
  {
    slug: 'fundamentals',
    title: { en: 'Fundamentals', 'pt-BR': 'Fundamentos' },
    description: {
      en: 'Core ideas behind learning, representation, and generalization.',
      'pt-BR': 'Ideias centrais sobre aprendizado, representação e generalização.',
    },
  },
  {
    slug: 'prompt-engineering',
    title: { en: 'Prompt Engineering', 'pt-BR': 'Engenharia de Prompt' },
    description: {
      en: 'Patterns and parameters that make LLM outputs predictable and useful.',
      'pt-BR': 'Padrões e parâmetros para tornar saídas de LLMs previsíveis e úteis.',
    },
  },
  {
    slug: 'agents',
    title: { en: 'AI Agents', 'pt-BR': 'Agentes de IA' },
    description: {
      en: 'Systems that perceive, reason, and act toward goals.',
      'pt-BR': 'Sistemas que percebem, raciocinam e agem em direção a objetivos.',
    },
  },
  {
    slug: 'rag',
    title: { en: 'Retrieval & RAG', 'pt-BR': 'Recuperação e RAG' },
    description: {
      en: 'Grounding LLMs in trusted, retrievable knowledge.',
      'pt-BR': 'Ancorando LLMs em conhecimento confiável e recuperável.',
    },
  },
  {
    slug: 'mlops',
    title: { en: 'MLOps', 'pt-BR': 'MLOps' },
    description: {
      en: 'Reliable training, deployment, and monitoring of ML systems.',
      'pt-BR': 'Treinamento, deploy e monitoramento confiáveis de sistemas ML.',
    },
  },
  {
    slug: 'claude-code',
    title: { en: 'Claude Code', 'pt-BR': 'Claude Code' },
    description: {
      en: 'Anthropic CLI, agent SDK, MCP, skills, and context management.',
      'pt-BR': 'CLI da Anthropic, SDK de agentes, MCP, skills e gestão de contexto.',
    },
  },
];

export const HOME_COPY = {
  en: {
    eyebrow: 'Open knowledge wiki',
    cta_primary: 'Explore docs',
    cta_secondary: 'View on GitHub',
    stats: [
      { label: 'Pages', value: '290+' },
      { label: 'Categories', value: '50+' },
      { label: 'Languages', value: 'EN / pt-BR' },
      { label: 'License', value: 'Open' },
    ],
    featured_title: 'Browse by topic',
    featured_subtitle: 'Hand-curated summaries linking to primary sources.',
    final_cta_title: 'Built for engineers who want to learn AI deeply.',
    final_cta_subtitle: 'No paywalls, no fluff — just concise, cited summaries.',
  },
  'pt-BR': {
    eyebrow: 'Wiki aberta de conhecimento',
    cta_primary: 'Explorar docs',
    cta_secondary: 'Ver no GitHub',
    stats: [
      { label: 'Páginas', value: '290+' },
      { label: 'Categorias', value: '50+' },
      { label: 'Idiomas', value: 'EN / pt-BR' },
      { label: 'Licença', value: 'Aberta' },
    ],
    featured_title: 'Navegue por tópico',
    featured_subtitle: 'Resumos curados, com links para fontes primárias.',
    final_cta_title: 'Feito para engenheiros que querem aprender IA com profundidade.',
    final_cta_subtitle: 'Sem paywall, sem enrolação — apenas resumos concisos e citados.',
  },
} as const;

export type Locale = keyof typeof HOME_COPY;
