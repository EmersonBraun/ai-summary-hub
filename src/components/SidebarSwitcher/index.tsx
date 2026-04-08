import React, {useState, useCallback} from 'react';
import {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  learningPaths,
  CATEGORY_SIDEBAR_ID,
  type LearningPath,
} from './learningPaths';
import styles from './styles.module.css';

const STORAGE_KEY = 'ai-summary-hub-sidebar';

function learningPathLabel(sidebarId: string): string {
  switch (sidebarId) {
    case 'aiFundamentals':
      return translate({
        id: 'learningPath.aiFundamentals.label',
        message: 'AI Fundamentals',
      });
    case 'ragFromZero':
      return translate({
        id: 'learningPath.ragFromZero.label',
        message: 'RAG from Zero',
      });
    case 'masteringAgents':
      return translate({
        id: 'learningPath.masteringAgents.label',
        message: 'Mastering Agents',
      });
    case 'promptEngineeringMastery':
      return translate({
        id: 'learningPath.promptEngineeringMastery.label',
        message: 'Prompt Engineering Mastery',
      });
    case 'practicalMlops':
      return translate({
        id: 'learningPath.practicalMlops.label',
        message: 'Practical MLOps',
      });
    case 'aiToolsFrameworks':
      return translate({
        id: 'learningPath.aiToolsFrameworks.label',
        message: 'AI Tools & Frameworks',
      });
    case 'aiSafetyEthics':
      return translate({
        id: 'learningPath.aiSafetyEthics.label',
        message: 'AI Safety & Ethics',
      });
    case 'claudeCodeDeepDive':
      return translate({
        id: 'learningPath.claudeCodeDeepDive.label',
        message: 'Claude Code Deep Dive',
      });
    default:
      return sidebarId;
  }
}

function learningPathLevel(sidebarId: string): string {
  switch (sidebarId) {
    case 'aiFundamentals':
      return translate({
        id: 'learningPath.aiFundamentals.level',
        message: 'beginner',
      });
    case 'ragFromZero':
      return translate({
        id: 'learningPath.ragFromZero.level',
        message: 'beginner \u2192 intermediate',
      });
    case 'masteringAgents':
      return translate({
        id: 'learningPath.masteringAgents.level',
        message: 'intermediate \u2192 advanced',
      });
    case 'promptEngineeringMastery':
      return translate({
        id: 'learningPath.promptEngineeringMastery.level',
        message: 'beginner \u2192 advanced',
      });
    case 'practicalMlops':
      return translate({
        id: 'learningPath.practicalMlops.level',
        message: 'intermediate \u2192 advanced',
      });
    case 'aiToolsFrameworks':
      return translate({
        id: 'learningPath.aiToolsFrameworks.level',
        message: 'beginner \u2192 intermediate',
      });
    case 'aiSafetyEthics':
      return translate({
        id: 'learningPath.aiSafetyEthics.level',
        message: 'beginner \u2192 intermediate',
      });
    case 'claudeCodeDeepDive':
      return translate({
        id: 'learningPath.claudeCodeDeepDive.level',
        message: 'beginner \u2192 advanced',
      });
    default:
      return '';
  }
}

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
  const baseUrl = useBaseUrl('/');

  const activePath = learningPaths.find((p) => p.sidebarId === activeSidebar);

  /** Resolve a docs path with the site's baseUrl */
  const resolveUrl = useCallback(
    (path: string) => {
      // baseUrl ends with '/', path starts with '/' — avoid double slash
      return baseUrl.replace(/\/$/, '') + path;
    },
    [baseUrl],
  );

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
          {activePath
            ? learningPathLabel(activePath.sidebarId)
            : translate({
                id: 'sidebarSwitcher.title',
                message: 'Learning Paths',
              })}
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
              <span className={styles.pathLabel}>
                {learningPathLabel(path.sidebarId)}
              </span>
              <span className={styles.pathLevel}>
                {learningPathLevel(path.sidebarId)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
