import {type ReactNode, useCallback, useMemo} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation, useHistory} from '@docusaurus/router';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import {useLatestVersion} from '@docusaurus/plugin-content-docs/client';
import sidebars from '../../sidebars';
import docTags from '../data/doc-tags.json';

type Level = 'beginner' | 'intermediate' | 'advanced';

const LEVELS: {key: Level; label: string; color: string; darkColor: string}[] = [
  {key: 'beginner', label: 'Beginner', color: '#34a853', darkColor: '#5cd87a'},
  {key: 'intermediate', label: 'Intermediate', color: '#4285f4', darkColor: '#7eadf6'},
  {key: 'advanced', label: 'Advanced', color: '#ea4335', darkColor: '#f28b83'},
];

type SidebarItem =
  | string
  | {type: 'category'; label: string; items: SidebarItem[]};

function filterToExistingDocs(
  items: SidebarItem[],
  validDocIds: Set<string>,
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

function filterByLevel(
  items: SidebarItem[],
  activeLevels: Set<Level>,
): SidebarItem[] {
  return items
    .map((item): SidebarItem | null => {
      if (typeof item === 'string') {
        const level = (docTags as Record<string, string>)[item];
        // If doc has no level tag, show it always
        if (!level) return item;
        return activeLevels.has(level as Level) ? item : null;
      }
      const filtered = filterByLevel(item.items, activeLevels);
      return filtered.length > 0 ? {...item, items: filtered} : null;
    })
    .filter((x): x is SidebarItem => x !== null);
}

function useActiveLevels(): [Set<Level>, (level: Level) => void] {
  const location = useLocation();
  const history = useHistory();

  const activeLevels = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const levelParam = params.get('level');
    if (!levelParam) return new Set<Level>();
    return new Set(
      levelParam.split(',').filter((l): l is Level =>
        LEVELS.some((lv) => lv.key === l),
      ),
    );
  }, [location.search]);

  const toggleLevel = useCallback(
    (level: Level) => {
      const next = new Set(activeLevels);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }
      const params = new URLSearchParams(location.search);
      if (next.size === 0) {
        params.delete('level');
      } else {
        params.set('level', [...next].join(','));
      }
      const search = params.toString();
      history.push({
        pathname: location.pathname,
        search: search ? `?${search}` : '',
      });
    },
    [activeLevels, history, location],
  );

  return [activeLevels, toggleLevel];
}

function LevelFilter({
  activeLevels,
  onToggle,
}: {
  activeLevels: Set<Level>;
  onToggle: (level: Level) => void;
}): ReactNode {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginBottom: '1.5rem',
      }}
    >
      {LEVELS.map(({key, label, color}) => {
        const isActive = activeLevels.has(key);
        return (
          <button
            key={key}
            onClick={() => onToggle(key)}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              border: `2px solid ${color}`,
              backgroundColor: isActive ? color : 'transparent',
              color: isActive ? '#fff' : color,
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function DocLink({docId}: {docId: string}): ReactNode {
  const base = docId.replace(/\/index$/, '') || docId;
  const path = useBaseUrl(`/docs/${base}`);
  const label =
    docId === 'intro'
      ? 'Introduction'
      : docId.split('/').pop()?.replace(/^index$/, 'Overview') ?? docId;
  const displayLabel = label
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const level = (docTags as Record<string, string>)[docId] as Level | undefined;
  const levelInfo = LEVELS.find((l) => l.key === level);

  return (
    <li>
      <Link to={path}>{displayLabel}</Link>
      {levelInfo && (
        <span
          style={{
            marginLeft: '0.5rem',
            padding: '0.1rem 0.4rem',
            borderRadius: '3px',
            fontSize: '0.7rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            backgroundColor: `${levelInfo.color}22`,
            color: levelInfo.color,
            border: `1px solid ${levelInfo.color}44`,
          }}
        >
          {levelInfo.label}
        </span>
      )}
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
            <li
              key={item.label}
              style={{listStyle: 'none', marginTop: '1rem'}}
            >
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
  const existingItems =
    validDocIds !== null
      ? filterToExistingDocs(rawItems, validDocIds)
      : rawItems;

  const [activeLevels, toggleLevel] = useActiveLevels();

  const filteredItems =
    activeLevels.size > 0
      ? filterByLevel(existingItems, activeLevels)
      : existingItems;

  return (
    <Layout
      title={translate({id: 'allTopics.title', message: 'All topics'})}
      description={translate({
        id: 'allTopics.description',
        message: 'Complete list of all topics in AI Summary Hub.',
      })}
    >
      <main>
        <div
          className="container"
          style={{paddingTop: '2rem', paddingBottom: '1rem'}}
        >
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
              {
                'Browse every topic in the hub by category. You can also use the {sidebarLink} or search.'
              }
            </Translate>
          </p>
          <LevelFilter activeLevels={activeLevels} onToggle={toggleLevel} />
        </div>
        <TopicListByCategory items={filteredItems} />
      </main>
    </Layout>
  );
}
