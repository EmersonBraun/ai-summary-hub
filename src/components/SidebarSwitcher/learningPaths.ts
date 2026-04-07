export interface LearningPath {
  sidebarId: string;
  label: string;
  description: string;
  level: string;
}

export const CATEGORY_SIDEBAR_ID = 'docsSidebar';

export const learningPaths: LearningPath[] = [
  {
    sidebarId: 'aiFundamentals',
    label: 'AI Fundamentals',
    description: 'Core concepts from ML to transformers',
    level: 'beginner',
  },
  {
    sidebarId: 'ragFromZero',
    label: 'RAG from Zero',
    description: 'Build retrieval-augmented generation systems',
    level: 'beginner \u2192 intermediate',
  },
  {
    sidebarId: 'masteringAgents',
    label: 'Mastering Agents',
    description: 'From basic agents to multi-agent systems',
    level: 'intermediate \u2192 advanced',
  },
  {
    sidebarId: 'promptEngineeringMastery',
    label: 'Prompt Engineering Mastery',
    description: 'Configuration, techniques, and reliability',
    level: 'beginner \u2192 advanced',
  },
  {
    sidebarId: 'practicalMlops',
    label: 'Practical MLOps',
    description: 'End-to-end ML operations pipeline',
    level: 'intermediate \u2192 advanced',
  },
  {
    sidebarId: 'aiToolsFrameworks',
    label: 'AI Tools & Frameworks',
    description: 'Model providers, frameworks, and dev tools',
    level: 'beginner \u2192 intermediate',
  },
  {
    sidebarId: 'aiSafetyEthics',
    label: 'AI Safety & Ethics',
    description: 'Safety, bias, explainability, and ethics',
    level: 'beginner \u2192 intermediate',
  },
  {
    sidebarId: 'claudeCodeDeepDive',
    label: 'Claude Code Deep Dive',
    description: 'Master Claude Code and MCP',
    level: 'beginner \u2192 advanced',
  },
];
