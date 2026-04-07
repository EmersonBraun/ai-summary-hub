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
/*  What you get (features / benefits)                                 */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: '🗺️',
    title: 'Curated Learning Paths',
    desc: 'Follow step-by-step sequences like "RAG from Zero" or "Mastering Agents" — from beginner to advanced, in the right order.',
  },
  {
    icon: '🏷️',
    title: 'Difficulty Levels',
    desc: 'Every article is tagged Beginner, Intermediate, or Advanced. Filter by level to find content that matches your experience.',
  },
  {
    icon: '💻',
    title: 'Runnable Code Examples',
    desc: 'Functional Python and TypeScript snippets you can copy-paste. No pseudocode — real SDK calls with OpenAI, Anthropic, LangChain, and more.',
  },
  {
    icon: '⚖️',
    title: 'Head-to-Head Comparisons',
    desc: 'Side-by-side tables compare LangChain vs LlamaIndex, RAG vs Fine-tuning, PyTorch vs TensorFlow, and dozens more — right inside each article.',
  },
  {
    icon: '📐',
    title: 'Architecture Diagrams',
    desc: 'Mermaid diagrams with labeled edges explain how things work visually — RAG pipelines, agent loops, MCP architecture, MLOps workflows.',
  },
  {
    icon: '✅',
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
/*  Topic highlights                                                   */
/* ------------------------------------------------------------------ */
const topicGroups = [
  {label: 'Fundamentals & LLMs', topics: ['Machine Learning', 'Deep Learning', 'Transformers', 'BERT', 'GPT', 'Fine-tuning']},
  {label: 'Prompt Engineering', topics: ['Temperature & Top-P', 'Self-consistency', 'Step-back Prompting', 'Structured Outputs', 'APE']},
  {label: 'RAG & Search', topics: ['RAG Architecture', 'Vector Databases', 'Embeddings', 'Semantic Search', 'Reranking']},
  {label: 'AI Agents', topics: ['Multi-Agent Systems', 'Memory', 'Planner-Executor', 'LangGraph', 'CrewAI', 'MCP']},
  {label: 'MLOps', topics: ['MLflow', 'Airflow', 'Kubernetes', 'Prometheus', 'Terraform', 'DVC']},
  {label: 'Model Providers', topics: ['OpenAI', 'Anthropic', 'Google Gemini', 'Meta Llama', 'Mistral', 'Cohere']},
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
                  <span key={t} className={styles.topicTag}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Learning paths preview                                             */
/* ------------------------------------------------------------------ */
const paths = [
  {name: 'AI Fundamentals', level: 'Beginner', docs: 14, color: '#34a853'},
  {name: 'RAG from Zero', level: 'Beginner \u2192 Intermediate', docs: 15, color: '#4285f4'},
  {name: 'Mastering Agents', level: 'Intermediate \u2192 Advanced', docs: 22, color: '#ea4335'},
  {name: 'Prompt Engineering Mastery', level: 'Beginner \u2192 Advanced', docs: 13, color: '#fbbc04'},
  {name: 'Practical MLOps', level: 'Intermediate \u2192 Advanced', docs: 20, color: '#ea4335'},
  {name: 'AI Tools & Frameworks', level: 'Beginner \u2192 Intermediate', docs: 16, color: '#4285f4'},
  {name: 'AI Safety & Ethics', level: 'Beginner \u2192 Intermediate', docs: 7, color: '#4285f4'},
  {name: 'Claude Code Deep Dive', level: 'Beginner \u2192 Advanced', docs: 12, color: '#fbbc04'},
];

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
            <div key={p.name} className={styles.pathCard}>
              <span className={styles.pathLevel} style={{color: p.color}}>{p.level}</span>
              <Heading as="h3" className={styles.pathName}>{p.name}</Heading>
              <span className={styles.pathDocs}>{p.docs} articles</span>
            </div>
          ))}
        </div>
        <div className={styles.buttons} style={{marginTop: '2rem'}}>
          <Link
            className="button button--primary button--lg"
            to={useBaseUrl('/docs/intro')}
          >
            <Translate id="home.paths.cta">
              Pick a Path and Start
            </Translate>
          </Link>
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
        <TopicHighlights />
        <LearningPaths />
        <Contribute />
      </main>
    </Layout>
  );
}
