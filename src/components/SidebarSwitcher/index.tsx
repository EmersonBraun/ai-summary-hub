import React, {useState, useCallback} from 'react';
import {useLocation} from '@docusaurus/router';
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

/** First doc URL for each learning path */
const firstDocMap: Record<string, string> = {
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

  const isCategory = activeSidebar === CATEGORY_SIDEBAR_ID;
  const activePath = learningPaths.find((p) => p.sidebarId === activeSidebar);

  const handleSelectCategory = useCallback(() => {
    storeSidebar(CATEGORY_SIDEBAR_ID);
    window.location.href = location.pathname;
  }, [location.pathname]);

  const handleSelectPath = useCallback(
    (path: LearningPath) => {
      storeSidebar(path.sidebarId);
      const targetUrl = firstDocMap[path.sidebarId] || '/docs/intro';
      window.location.href = targetUrl;
    },
    [],
  );

  return (
    <div className={styles.switcher}>
      <button
        className={`${styles.categoryButton} ${isCategory ? styles.active : ''}`}
        onClick={handleSelectCategory}
        type="button"
      >
        Browse by Category
      </button>

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
