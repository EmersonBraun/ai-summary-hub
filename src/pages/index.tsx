import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';

import styles from './index.module.css';

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
function Hero(): ReactNode {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="home.hero.title">
            Master AI — from fundamentals to production
          </Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="home.hero.tagline">
            145+ in-depth articles with code examples, comparison tables, and
            Mermaid diagrams. Follow curated learning paths or browse by category.
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to={useBaseUrl('/docs/intro')}
            aria-label={translate({id: 'home.hero.startLearning', message: 'Start learning'})}
          >
            <Translate id="home.hero.startLearning">
              Start Learning
            </Translate>
          </Link>
          <Link
            className="button button--secondary button--lg"
            to={useBaseUrl('/all-topics')}
            aria-label={translate({id: 'home.hero.browseTopics', message: 'Browse all topics'})}
          >
            <Translate id="home.hero.browseTopics">
              Browse All Topics
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats bar                                                          */
/* ------------------------------------------------------------------ */
const stats = [
  {value: '145+', label: 'Articles'},
  {value: '8', label: 'Learning Paths'},
  {value: '47', label: 'Categories'},
  {value: '6', label: 'Languages'},
];

function StatsBar(): ReactNode {
  return (
    <section className={styles.statsBar}>
      <div className="container">
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Features / benefits                                                */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: '\u{1F5FA}\uFE0F',
    title: 'Curated Learning Paths',
    desc: 'Follow step-by-step sequences like "RAG from Zero" or "Mastering Agents" — from beginner to advanced, in the right order.',
  },
  {
    icon: '\u{1F3F7}\uFE0F',
    title: 'Difficulty Levels',
    desc: 'Every article is tagged Beginner, Intermediate, or Advanced. Filter by level to find content that matches your experience.',
  },
  {
    icon: '\u{1F4BB}',
    title: 'Runnable Code Examples',
    desc: 'Functional Python and TypeScript snippets you can copy-paste. No pseudocode — real SDK calls with OpenAI, Anthropic, LangChain, and more.',
  },
  {
    icon: '\u2696\uFE0F',
    title: 'Head-to-Head Comparisons',
    desc: 'Side-by-side tables compare LangChain vs LlamaIndex, RAG vs Fine-tuning, PyTorch vs TensorFlow, and dozens more — right inside each article.',
  },
  {
    icon: '\u{1F4D0}',
    title: 'Architecture Diagrams',
    desc: 'Mermaid diagrams with labeled edges explain how things work visually — RAG pipelines, agent loops, MCP architecture, MLOps workflows.',
  },
  {
    icon: '\u2705',
    title: '"When to Use" Guidance',
    desc: 'Every article includes a practical "When to use / When NOT to use" table so you know exactly when a technique or tool fits your problem.',
  },
];

function Features(): ReactNode {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          <Translate id="home.feat.heading">
            Everything you need to learn AI — structured, practical, and deep
          </Translate>
        </Heading>
        <div className={styles.featuresGrid}>
          {features.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <Heading as="h3" className={styles.featureTitle}>
                {f.title}
              </Heading>
              <p className={styles.featureDesc}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Project banners (AgentsKit + Skills)                               */
/* ------------------------------------------------------------------ */
function ProjectBanners(): ReactNode {
  return (
    <section className={styles.bannersSection}>
      <div className="container">
        <div className={styles.bannersGrid}>
          <Link
            to="https://emersonbraun.github.io/agentskit/"
            className={styles.banner}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.bannerContent}>
              <span className={styles.bannerBadge}>Open Source</span>
              <Heading as="h3" className={styles.bannerTitle}>
                AgentsKit
              </Heading>
              <p className={styles.bannerDesc}>
                <Translate id="home.banner.agentskit">
                  The most complete library for building AI agents. Production-ready
                  framework with memory, tools, multi-agent orchestration, and more.
                </Translate>
              </p>
              <span className={styles.bannerCta}>
                <Translate id="home.banner.agentskitCta">Visit documentation &rarr;</Translate>
              </span>
            </div>
          </Link>

          <Link
            to="https://github.com/EmersonBraun/skills"
            className={styles.banner}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.bannerContent}>
              <span className={styles.bannerBadge}>Open Source</span>
              <Heading as="h3" className={styles.bannerTitle}>
                Skills
              </Heading>
              <p className={styles.bannerDesc}>
                <Translate id="home.banner.skills">
                  A curated repository of reusable AI skills for Claude Code
                  and other AI coding assistants. Boost your dev workflow instantly.
                </Translate>
              </p>
              <span className={styles.bannerCta}>
                <Translate id="home.banner.skillsCta">View on GitHub &rarr;</Translate>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Topic highlights (clickable)                                       */
/* ------------------------------------------------------------------ */
const topicGroups: {label: string; topics: {name: string; path: string}[]}[] = [
  {
    label: 'Fundamentals & LLMs',
    topics: [
      {name: 'Machine Learning', path: '/docs/fundamentals/machine-learning'},
      {name: 'Deep Learning', path: '/docs/fundamentals/deep-learning'},
      {name: 'Transformers', path: '/docs/transformers'},
      {name: 'BERT', path: '/docs/transformers/bert'},
      {name: 'GPT', path: '/docs/transformers/gpt'},
      {name: 'Fine-tuning', path: '/docs/llms/fine-tuning'},
    ],
  },
  {
    label: 'Prompt Engineering',
    topics: [
      {name: 'Temperature & Top-P', path: '/docs/prompt-engineering/temperature-top-k-top-p'},
      {name: 'Self-consistency', path: '/docs/prompt-engineering/self-consistency'},
      {name: 'Step-back Prompting', path: '/docs/prompt-engineering/step-back-prompting'},
      {name: 'Structured Outputs', path: '/docs/prompt-engineering/structured-outputs'},
      {name: 'APE', path: '/docs/prompt-engineering/automatic-prompt-engineering'},
    ],
  },
  {
    label: 'RAG & Search',
    topics: [
      {name: 'RAG Architecture', path: '/docs/rag/architecture'},
      {name: 'Vector Databases', path: '/docs/rag/vector-databases'},
      {name: 'Embeddings', path: '/docs/rag/embeddings'},
      {name: 'Semantic Search', path: '/docs/semantic-search'},
      {name: 'Cohere Rerank', path: '/docs/model-providers/cohere'},
    ],
  },
  {
    label: 'AI Agents',
    topics: [
      {name: 'Multi-Agent Systems', path: '/docs/agents/multi-agent-systems'},
      {name: 'Memory', path: '/docs/agents/memory'},
      {name: 'Planner-Executor', path: '/docs/agents/planner-executor'},
      {name: 'LangGraph', path: '/docs/agents/langgraph'},
      {name: 'CrewAI', path: '/docs/agents/crewai'},
      {name: 'MCP', path: '/docs/mcp'},
    ],
  },
  {
    label: 'MLOps',
    topics: [
      {name: 'MLflow', path: '/docs/mlops/mlflow'},
      {name: 'Airflow', path: '/docs/mlops/data-engineering/airflow'},
      {name: 'Kubernetes', path: '/docs/mlops/deployment/ml-kubernetes'},
      {name: 'Prometheus', path: '/docs/mlops/monitoring/prometheus'},
      {name: 'Terraform', path: '/docs/mlops/iac/terraform'},
      {name: 'DVC', path: '/docs/mlops/cicd/dvc'},
    ],
  },
  {
    label: 'Model Providers',
    topics: [
      {name: 'OpenAI', path: '/docs/model-providers/openai'},
      {name: 'Anthropic', path: '/docs/model-providers/anthropic'},
      {name: 'Google Gemini', path: '/docs/model-providers/google-gemini'},
      {name: 'Meta Llama', path: '/docs/model-providers/meta-llama'},
      {name: 'Mistral', path: '/docs/model-providers/mistral'},
      {name: 'Cohere', path: '/docs/model-providers/cohere'},
    ],
  },
];

function TopicHighlights(): ReactNode {
  return (
    <section className={styles.topicsSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          <Translate id="home.topics.heading">
            Covering the full AI stack
          </Translate>
        </Heading>
        <div className={styles.topicsGrid}>
          {topicGroups.map((group) => (
            <div key={group.label} className={styles.topicGroup}>
              <Heading as="h3" className={styles.topicGroupTitle}>
                {group.label}
              </Heading>
              <div className={styles.topicTags}>
                {group.topics.map((t) => (
                  <TopicLink key={t.name} name={t.name} path={t.path} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TopicLink({name, path}: {name: string; path: string}): ReactNode {
  return (
    <Link to={useBaseUrl(path)} className={styles.topicTag}>
      {name}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Learning paths preview (clickable)                                 */
/* ------------------------------------------------------------------ */
const paths = [
  {name: 'AI Fundamentals', level: 'Beginner', docs: 14, color: '#34a853', firstDoc: '/docs/intro'},
  {name: 'RAG from Zero', level: 'Beginner \u2192 Intermediate', docs: 15, color: '#4285f4', firstDoc: '/docs/llms'},
  {name: 'Mastering Agents', level: 'Intermediate \u2192 Advanced', docs: 22, color: '#ea4335', firstDoc: '/docs/agents'},
  {name: 'Prompt Engineering Mastery', level: 'Beginner \u2192 Advanced', docs: 13, color: '#fbbc04', firstDoc: '/docs/prompt-engineering'},
  {name: 'Practical MLOps', level: 'Intermediate \u2192 Advanced', docs: 20, color: '#ea4335', firstDoc: '/docs/mlops'},
  {name: 'AI Tools & Frameworks', level: 'Beginner \u2192 Intermediate', docs: 16, color: '#4285f4', firstDoc: '/docs/model-providers'},
  {name: 'AI Safety & Ethics', level: 'Beginner \u2192 Intermediate', docs: 7, color: '#4285f4', firstDoc: '/docs/ai-safety'},
  {name: 'Claude Code Deep Dive', level: 'Beginner \u2192 Advanced', docs: 12, color: '#fbbc04', firstDoc: '/docs/tools/claude-code'},
];

function PathCard({name, level, docs, color, firstDoc}: typeof paths[number]): ReactNode {
  return (
    <Link to={useBaseUrl(firstDoc)} className={styles.pathCard}>
      <span className={styles.pathLevel} style={{color}}>{level}</span>
      <Heading as="h3" className={styles.pathName}>{name}</Heading>
      <span className={styles.pathDocs}>{docs} articles</span>
    </Link>
  );
}

function LearningPaths(): ReactNode {
  return (
    <section className={styles.pathsSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          <Translate id="home.paths.heading">
            8 guided learning paths
          </Translate>
        </Heading>
        <p className={styles.sectionSubtitle}>
          <Translate id="home.paths.subtitle">
            Don&apos;t know where to start? Pick a path and follow it step by step.
          </Translate>
        </p>
        <div className={styles.pathsGrid}>
          {paths.map((p) => (
            <PathCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contribute (compact)                                               */
/* ------------------------------------------------------------------ */
function Contribute(): ReactNode {
  return (
    <section className={styles.contributeSection}>
      <div className="container">
        <div className={styles.contributeInner}>
          <div>
            <Heading as="h2" className={styles.contributeTitle}>
              <Translate id="home.contribute.heading">
                Open source and community-driven
              </Translate>
            </Heading>
            <p className={styles.contributeDesc}>
              <Translate id="home.contribute.body">
                AI Summary Hub is free and open source. Add new topics, improve existing articles,
                contribute code examples, or help translate content into 6 languages.
              </Translate>
            </p>
          </div>
          <Link
            className="button button--secondary button--lg"
            to="https://github.com/EmersonBraun/ai-summary-hub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Translate id="home.contribute.cta">
              Contribute on GitHub
            </Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={translate({
        id: 'home.meta.description',
        message: 'Master AI from fundamentals to production. 145+ in-depth articles with code examples, comparisons, learning paths, and diagrams.',
      })}
    >
      <Hero />
      <main>
        <StatsBar />
        <Features />
        <ProjectBanners />
        <TopicHighlights />
        <LearningPaths />
        <Contribute />
      </main>
    </Layout>
  );
}
