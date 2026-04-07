import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function NotFound(): ReactNode {
  return (
    <Layout title="Page not found" description="The page you were looking for could not be found.">
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <Heading as="h1" style={{fontSize: '4rem', marginBottom: '0.5rem'}}>
          404
        </Heading>
        <p style={{fontSize: '1.25rem', color: 'var(--ifm-color-emphasis-600)', maxWidth: 480}}>
          <Translate id="notFound.message">
            The page you were looking for could not be found. It may have been
            moved, renamed, or no longer exists.
          </Translate>
        </p>
        <div style={{display: 'flex', gap: '1rem', marginTop: '1.5rem'}}>
          <Link className="button button--primary button--lg" to={useBaseUrl('/docs/intro')}>
            <Translate id="notFound.docs">Browse Docs</Translate>
          </Link>
          <Link className="button button--secondary button--lg" to={useBaseUrl('/')}>
            <Translate id="notFound.home">Go Home</Translate>
          </Link>
        </div>
      </main>
    </Layout>
  );
}
