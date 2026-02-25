import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

export function EbookCta(): ReactNode {
  return (
    <div className={styles.wrapper}>
      <Heading as="h3" className={styles.title}>
        🎯 Tired of failing technical interviews?
      </Heading>
      <p className={styles.description}>
        Get my <strong>FREE e-book</strong> &quot;Cracking The Technical Interview&quot; and learn proven strategies
        to ace your next technical interview with confidence!
      </p>
      <Link
        to="https://ebook.emersonbraun.dev/"
        className={styles.cta}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get My Free E-book 📚
      </Link>
      <p className={styles.footer}>
        Trusted by 2,000+ developers • No spam, we promise
      </p>
    </div>
  );
}
