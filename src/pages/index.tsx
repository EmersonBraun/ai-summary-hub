import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';

import {EbookCta} from '@site/src/components/EbookCta';
import styles from './index.module.css';

function Hero(): ReactNode {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="home.hero.title" description="Hero title">
            AI Summary Hub
          </Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="home.hero.tagline" description="Hero tagline">
            Your single source of truth for AI concepts, from fundamentals to advanced agents
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to={useBaseUrl('/docs/intro')}
            aria-label={translate({id: 'home.hero.startLearning', message: 'Start learning'})}
          >
            <Translate id="home.hero.startLearning" description="Button">
              Start Learning 🚀
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

function SectionWhat(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="text--center padding-horiz--md">
              <div className={styles.introSection}>
                <Heading as="h2">
                  <Translate id="home.section.whatTitle" description="Section title">
                    What is this project?
                  </Translate>
                </Heading>
                <p>
                  <Translate id="home.section.whatBody" description="Section body">
                    AI Summary Hub is your comprehensive companion for modern AI concepts. Each topic is
                    presented in a structured format with definitions, how it works, examples, and useful
                    links. This organization helps you quickly understand RAG, transformers, LLMs, agents,
                    subagents, RDD, spec-driven development, and 50+ topics—from fundamentals to advanced
                    systems.
                  </Translate>
                </p>
                <div className={styles.buttons}>
                  <Link
                    className="button button--primary button--lg"
                    to={useBaseUrl('/docs/intro')}
                    aria-label={translate({id: 'home.section.exploreDocs', message: 'Explore documentation'})}
                  >
                    <Translate id="home.section.exploreDocsButton" description="Button text">
                      Explore Docs ✨
                    </Translate>
                  </Link>
                </div>
              </div>

              <Heading as="h2">
                <Translate id="home.section.helpTitle" description="Section title">
                  Help Improve This Guide
                </Translate>
              </Heading>
              <p>
                <Translate id="home.section.helpBody" description="Section body">
                  This project thrives on community contributions. If you work with AI, LLMs, or agents,
                  your insights are valuable! You can help by:
                </Translate>
              </p>
              <ul>
                <li>
                  <Translate id="home.section.helpBullet1">Adding new topics based on your experience</Translate>
                </li>
                <li>
                  <Translate id="home.section.helpBullet2">Updating key points with the latest concepts</Translate>
                </li>
                <li>
                  <Translate id="home.section.helpBullet3">Contributing examples and code snippets</Translate>
                </li>
                <li>
                  <Translate id="home.section.helpBullet4">Fixing outdated information</Translate>
                </li>
                <li>
                  <Translate id="home.section.helpBullet5">Improving explanations and translating content</Translate>
                </li>
              </ul>
              <p>
                <Translate id="home.section.helpFooter" description="Help section closing">
                  Your contributions help keep this guide current and valuable for everyone. Check out our
                  contribution guidelines to get started!
                </Translate>
              </p>
              <div className={styles.buttons} style={{marginBottom: '4rem'}}>
                <Link
                  className="button button--secondary button--lg"
                  to="https://github.com/EmersonBraun/ai-summary-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={translate({id: 'home.section.contributeButton', message: 'Contribute to the project on GitHub'})}
                >
                  <Translate id="home.section.contributeButton" description="Contribute button">
                    Contribute to the Project 🤝
                  </Translate>
                </Link>
              </div>

              <EbookCta />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={translate({
        id: 'home.meta.description',
        message: 'Your single source of truth for AI concepts: RAG, transformers, LLMs, agents, and 50+ topics.',
      })}
    >
      <Hero />
      <main>
        <SectionWhat />
      </main>
    </Layout>
  );
}
