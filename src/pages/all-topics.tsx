import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {useLatestVersion} from '@docusaurus/plugin-content-docs/client';
import sidebars from '../../sidebars';

type SidebarItem =
  | string
  | {type: 'category'; label: string; items: SidebarItem[]};

/** Filter sidebar items to only those that exist in the docs version (same as sidebar). */
function filterToExistingDocs(
  items: SidebarItem[],
  validDocIds: Set<string>
): SidebarItem[] {
  return items
    .map((item): SidebarItem | null => {
      if (typeof item === 'string') {
        return validDocIds.has(item) ? item : null;
      }
      const filtered = filterToExistingDocs(item.items, validDocIds);
      return filtered.length > 0 ? {...item, items: filtered} : null;
    })
    .filter((x): x is SidebarItem => x !== null);
}

function DocLink({docId}: {docId: string}): ReactNode {
  const base = docId.replace(/\/index$/, '') || docId;
  const path = useBaseUrl(`/docs/${base}`);
  const label = docId === 'intro'
    ? 'Introduction'
    : docId.split('/').pop()?.replace(/^index$/, 'Overview') ?? docId;
  const displayLabel = label
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <li>
      <Link to={path}>{displayLabel}</Link>
    </li>
  );
}

function TopicList({items}: {items: SidebarItem[]}): ReactNode {
  return (
    <ul style={{marginBottom: '1.5rem'}}>
      {items.map((item) => {
        if (typeof item === 'string') {
          return <DocLink key={item} docId={item} />;
        }
        if (item.type === 'category') {
          return (
            <li key={item.label} style={{listStyle: 'none', marginTop: '1rem'}}>
              <strong style={{display: 'block', marginBottom: '0.5rem'}}>
                {item.label}
              </strong>
              <TopicList items={item.items} />
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
}

function TopicListByCategory({items}: {items: SidebarItem[]}): ReactNode {
  return (
    <div className="container" style={{padding: '2rem 0'}}>
      <div className="row">
        <div className="col col--10 col--offset-1">
          {items.map((item) => {
            if (typeof item === 'string') {
              return (
                <div key={item} style={{marginBottom: '1rem'}}>
                  <DocLink docId={item} />
                </div>
              );
            }
            if (item.type === 'category') {
              return (
                <div key={item.label} style={{marginBottom: '2rem'}}>
                  <Heading as="h3">{item.label}</Heading>
                  <TopicList items={item.items} />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default function AllTopicsPage(): ReactNode {
  const introPath = useBaseUrl('/docs/intro');
  const version = useLatestVersion('default');
  const rawItems = sidebars.docsSidebar as SidebarItem[];
  const validDocIds = version
    ? new Set(version.docs.map((d: {id: string}) => d.id))
    : null;
  const items =
    validDocIds !== null
      ? filterToExistingDocs(rawItems, validDocIds)
      : rawItems;
  return (
    <Layout
      title={translate({id: 'allTopics.title', message: 'All topics'})}
      description={translate({id: 'allTopics.description', message: 'Complete list of all topics in AI Summary Hub.'})}
    >
      <main>
        <div className="container" style={{paddingTop: '2rem', paddingBottom: '1rem'}}>
          <Heading as="h1">
            <Translate id="allTopics.title" description="All topics title">
              All topics
            </Translate>
          </Heading>
          <p>
            <Translate
              id="allTopics.intro"
              description="All topics intro"
              values={{sidebarLink: <Link to={introPath}>sidebar</Link>}}
            >
              {'Browse every topic in the hub by category. You can also use the {sidebarLink} or search.'}
            </Translate>
          </p>
        </div>
        <TopicListByCategory items={items} />
      </main>
    </Layout>
  );
}
