import React, {useState, useCallback} from 'react';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  learningPaths,
  CATEGORY_SIDEBAR_ID,
  type LearningPath,
} from './learningPaths';
import styles from './styles.module.css';

const STORAGE_KEY = 'ai-summary-hub-sidebar';

function storeSidebar(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // ignore
  }
}

/** First doc URL for each learning path (relative, will be resolved with useBaseUrl) */
const firstDocPaths: Record<string, string> = {
  aiFundamentals: '/docs/intro',
  ragFromZero: '/docs/llms',
  masteringAgents: '/docs/agents',
  promptEngineeringMastery: '/docs/prompt-engineering',
  practicalMlops: '/docs/mlops',
  aiToolsFrameworks: '/docs/model-providers',
  aiSafetyEthics: '/docs/ai-safety',
  claudeCodeDeepDive: '/docs/tools/claude-code',
};

interface SidebarSwitcherProps {
  currentSidebarId?: string;
}

export default function SidebarSwitcher({
  currentSidebarId,
}: SidebarSwitcherProps): React.ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);
  const activeSidebar = currentSidebarId || CATEGORY_SIDEBAR_ID;
  const location = useLocation();
  const baseUrl = useBaseUrl('/');

  const isCategory = activeSidebar === CATEGORY_SIDEBAR_ID;
  const activePath = learningPaths.find((p) => p.sidebarId === activeSidebar);

  /** Resolve a docs path with the site's baseUrl */
  const resolveUrl = useCallback(
    (path: string) => {
      // baseUrl ends with '/', path starts with '/' — avoid double slash
      return baseUrl.replace(/\/$/, '') + path;
    },
    [baseUrl],
  );

  const handleSelectCategory = useCallback(() => {
    storeSidebar(CATEGORY_SIDEBAR_ID);
    window.location.href = location.pathname;
  }, [location.pathname]);

  const handleSelectPath = useCallback(
    (path: LearningPath) => {
      storeSidebar(path.sidebarId);
      const docPath = firstDocPaths[path.sidebarId] || '/docs/intro';
      window.location.href = resolveUrl(docPath);
    },
    [resolveUrl],
  );

  return (
    <div style={{padding: '4rem 0.5rem 0 0.5rem'}}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsExpanded((prev) => !prev)}
        type="button"
        aria-expanded={isExpanded}
      >
        <span className={styles.toggleLabel}>
          {activePath ? activePath.label : 'Learning Paths'}
        </span>
        <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}>
          &#9660;
        </span>
      </button>

      {isExpanded && (
        <div className={styles.pathList}>
          {learningPaths.map((path) => (
            <button
              key={path.sidebarId}
              className={`${styles.pathItem} ${
                activeSidebar === path.sidebarId ? styles.active : ''
              }`}
              onClick={() => handleSelectPath(path)}
              type="button"
            >
              <span className={styles.pathLabel}>{path.label}</span>
              <span className={styles.pathLevel}>{path.level}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
