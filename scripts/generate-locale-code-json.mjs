#!/usr/bin/env node
/**
 * Generates i18n/<locale>/code.json from key → message maps (same keys as es/code.json).
 * Run: node scripts/generate-locale-code-json.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const esPath = path.join(ROOT, 'i18n/es/code.json');
const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));

const locales = {
  de: {
    'theme.common.editThisPage': 'Diese Seite bearbeiten',
    'theme.docs.paginator.previous': 'Zurück',
    'theme.docs.paginator.next': 'Weiter',
    'theme.docs.paginator.navAriaLabel': 'Dokumentationsseiten',
    'home.hero.title': 'AI meistern — von Grundlagen bis Produktion',
    'home.hero.tagline':
      '145+ vertiefende Artikel mit Codebeispielen, Vergleichstabellen und Mermaid-Diagrammen. Folge Lernpfaden oder stöbere nach Kategorie.',
    'home.hero.startLearning': 'Jetzt lernen',
    'home.section.whatTitle': 'Was ist dieses Projekt?',
    'home.section.whatBody':
      'AI Summary Hub ist dein Begleiter für moderne KI-Konzepte. Jedes Thema ist strukturiert mit Definitionen, Funktionsweise, Beispielen und Links. So verstehst du schnell RAG, Transformer, LLMs, Agenten und mehr als 50 Themen — von Grundlagen bis zu fortgeschrittenen Systemen.',
    'home.section.exploreDocs': 'Dokumentation erkunden',
    'home.section.exploreDocsButton': 'Docs erkunden',
    'home.section.helpTitle': 'Hilf mit, diesen Leitfaden zu verbessern',
    'home.section.helpBody':
      'Dieses Projekt lebt von Community-Beiträgen. Wenn du mit KI, LLMs oder Agenten arbeitest, sind deine Ideen willkommen. Du kannst:',
    'home.section.contributeButton': 'Zum Projekt beitragen',
    'home.section.helpBullet1': 'Neue Themen aus deiner Praxis hinzufügen',
    'home.section.helpBullet2': 'Kernaussagen mit aktuellen Konzepten aktualisieren',
    'home.section.helpBullet3': 'Beispiele und Code-Snippets beisteuern',
    'home.section.helpBullet4': 'Veraltete Informationen korrigieren',
    'home.section.helpBullet5': 'Erklärungen verbessern und Inhalte übersetzen',
    'home.section.helpFooter':
      'Deine Beiträge halten diesen Leitfaden aktuell und nützlich. Sieh dir unsere Contribution-Guides an, um zu starten.',
    'allTopics.title': 'Alle Themen',
    'allTopics.intro':
      'Stöbere nach Kategorie durch alle Themen. Du kannst auch die {sidebarLink} oder die Suche nutzen.',
    'allTopics.description':
      'Vollständige Liste aller Dokumentationsthemen im AI Summary Hub, nach Kategorie gruppiert.',
    'allTopics.sidebarLink': 'Seitenleiste',
    'allTopics.level.beginner': 'Einsteiger',
    'allTopics.level.intermediate': 'Fortgeschritten',
    'allTopics.level.advanced': 'Experte',
    'docLink.intro': 'Einführung',
    'docLink.overview': 'Überblick',
    'notFound.title': 'Seite nicht gefunden',
    'notFound.description': 'Die gesuchte Seite konnte nicht gefunden werden.',
    'notFound.message':
      'Wir konnten die Seite nicht finden. Sie wurde möglicherweise verschoben, umbenannt oder existiert nicht mehr.',
    'notFound.docs': 'Zur Dokumentation',
    'notFound.home': 'Zur Startseite',
    'sidebarSwitcher.title': 'Lernpfade',
    'home.hero.browseTopics': 'Alle Themen durchsuchen',
    'home.meta.description':
      'KI von Grundlagen bis Produktion meistern. Über 145 Artikel mit Code, Vergleichen, Lernpfaden und Diagrammen.',
    'home.feat.heading':
      'Alles, was du zum Lernen von KI brauchst — strukturiert, praxisnah und tiefgehend',
    'home.banner.agentskit':
      'Die umfassendste Bibliothek für KI-Agenten. Produktionsreifes Framework mit Speicher, Tools, Multi-Agent-Orchestrierung und mehr.',
    'home.banner.agentskitCta': 'Dokumentation ansehen →',
    'home.banner.skills':
      'Kuratiertes Repository wiederverwendbarer Skills für Claude Code und andere KI-Coding-Assistenten.',
    'home.banner.skillsCta': 'Auf GitHub ansehen →',
    'home.topics.heading': 'Die gesamte KI-Stack-Abdeckung',
    'home.paths.heading': '8 geführte Lernpfade',
    'home.paths.subtitle':
      'Du weißt nicht, wo du anfangen sollst? Wähle einen Pfad und folge Schritt für Schritt.',
    'home.contribute.heading': 'Open Source und community-getrieben',
    'home.contribute.body':
      'AI Summary Hub ist kostenlos und Open Source. Füge Themen hinzu, verbessere Artikel, liefere Codebeispiele oder hilf beim Übersetzen in 6 Sprachen.',
    'home.contribute.cta': 'Auf GitHub mitwirken',
    'learningPath.aiFundamentals.label': 'KI-Grundlagen',
    'learningPath.aiFundamentals.description': 'Kernkonzepte von ML bis Transformer',
    'learningPath.aiFundamentals.level': 'Einsteiger',
    'learningPath.ragFromZero.label': 'RAG von null',
    'learningPath.ragFromZero.description': 'Retrieval-Augmented-Generation-Systeme bauen',
    'learningPath.ragFromZero.level': 'Einsteiger → Fortgeschritten',
    'learningPath.masteringAgents.label': 'Agenten meistern',
    'learningPath.masteringAgents.description': 'Von einfachen Agenten zu Multi-Agent-Systemen',
    'learningPath.masteringAgents.level': 'Fortgeschritten → Experte',
    'learningPath.promptEngineeringMastery.label': 'Prompt Engineering meistern',
    'learningPath.promptEngineeringMastery.description': 'Konfiguration, Techniken und Zuverlässigkeit',
    'learningPath.promptEngineeringMastery.level': 'Einsteiger → Experte',
    'learningPath.practicalMlops.label': 'Praktisches MLOps',
    'learningPath.practicalMlops.description': 'End-to-End-ML-Operations-Pipeline',
    'learningPath.practicalMlops.level': 'Fortgeschritten → Experte',
    'learningPath.aiToolsFrameworks.label': 'KI-Tools & Frameworks',
    'learningPath.aiToolsFrameworks.description': 'Modellanbieter, Frameworks und Dev-Tools',
    'learningPath.aiToolsFrameworks.level': 'Einsteiger → Fortgeschritten',
    'learningPath.aiSafetyEthics.label': 'KI-Sicherheit & Ethik',
    'learningPath.aiSafetyEthics.description': 'Sicherheit, Bias, Erklärbarkeit und Ethik',
    'learningPath.aiSafetyEthics.level': 'Einsteiger → Fortgeschritten',
    'learningPath.claudeCodeDeepDive.label': 'Claude Code Deep Dive',
    'learningPath.claudeCodeDeepDive.description': 'Claude Code und MCP meistern',
    'learningPath.claudeCodeDeepDive.level': 'Einsteiger → Experte',
  },
  fr: {
    'theme.common.editThisPage': 'Modifier cette page',
    'theme.docs.paginator.previous': 'Précédent',
    'theme.docs.paginator.next': 'Suivant',
    'theme.docs.paginator.navAriaLabel': 'Pages de documentation',
    'home.hero.title': 'Maîtrisez l’IA — des fondamentaux à la production',
    'home.hero.tagline':
      'Plus de 145 articles approfondis avec exemples de code, tableaux comparatifs et diagrammes Mermaid. Suivez des parcours ou parcourez par catégorie.',
    'home.hero.startLearning': 'Commencer à apprendre',
    'home.section.whatTitle': "Qu'est-ce que ce projet ?",
    'home.section.whatBody':
      "AI Summary Hub est votre compagnon pour les concepts modernes d'IA. Chaque sujet est structuré avec définitions, fonctionnement, exemples et liens utiles. Vous comprenez rapidement RAG, transformers, LLM, agents et plus de 50 sujets, des fondamentaux aux systèmes avancés.",
    'home.section.exploreDocs': 'Explorer la documentation',
    'home.section.exploreDocsButton': 'Explorer les docs',
    'home.section.helpTitle': 'Aidez à améliorer ce guide',
    'home.section.helpBody':
      "Ce projet vit grâce aux contributions. Si vous travaillez sur l'IA, les LLM ou les agents, vos idées comptent. Vous pouvez :",
    'home.section.contributeButton': 'Contribuer au projet',
    'home.section.helpBullet1': 'Ajouter de nouveaux sujets selon votre expérience',
    'home.section.helpBullet2': 'Mettre à jour les points clés avec les concepts récents',
    'home.section.helpBullet3': 'Proposer des exemples et extraits de code',
    'home.section.helpBullet4': 'Corriger les informations obsolètes',
    'home.section.helpBullet5': "Améliorer les explications et traduire le contenu",
    'home.section.helpFooter':
      'Vos contributions gardent ce guide à jour et utile pour tous. Consultez nos guides de contribution pour commencer.',
    'allTopics.title': 'Tous les sujets',
    'allTopics.intro':
      'Parcourez tous les sujets du hub par catégorie. Vous pouvez aussi utiliser la {sidebarLink} ou la recherche.',
    'allTopics.description':
      'Liste complète des sujets de documentation du AI Summary Hub, regroupés par catégorie.',
    'allTopics.sidebarLink': 'barre latérale',
    'allTopics.level.beginner': 'Débutant',
    'allTopics.level.intermediate': 'Intermédiaire',
    'allTopics.level.advanced': 'Avancé',
    'docLink.intro': 'Introduction',
    'docLink.overview': 'Aperçu',
    'notFound.title': 'Page introuvable',
    'notFound.description': "La page que vous cherchez est introuvable.",
    'notFound.message':
      "Nous n'avons pas trouvé la page. Elle a peut-être été déplacée, renommée ou n'existe plus.",
    'notFound.docs': 'Voir la documentation',
    'notFound.home': "Retour à l'accueil",
    'sidebarSwitcher.title': 'Parcours d’apprentissage',
    'home.hero.browseTopics': 'Parcourir tous les sujets',
    'home.meta.description':
      "Maîtrisez l'IA des fondamentaux à la production. Plus de 145 articles avec code, comparaisons, parcours et schémas.",
    'home.feat.heading':
      "Tout ce qu'il vous faut pour apprendre l'IA — structuré, pratique et approfondi",
    'home.banner.agentskit':
      "La bibliothèque la plus complète pour construire des agents IA. Framework prêt pour la production avec mémoire, outils, orchestration multi-agents et plus.",
    'home.banner.agentskitCta': 'Voir la documentation →',
    'home.banner.skills':
      'Dépôt organisé de skills réutilisables pour Claude Code et autres assistants de code IA.',
    'home.banner.skillsCta': 'Voir sur GitHub →',
    'home.topics.heading': "Couverture de toute la stack IA",
    'home.paths.heading': '8 parcours guidés',
    'home.paths.subtitle':
      'Vous ne savez pas par où commencer ? Choisissez un parcours et suivez-le étape par étape.',
    'home.contribute.heading': 'Open source et porté par la communauté',
    'home.contribute.body':
      'AI Summary Hub est gratuit et open source. Ajoutez des sujets, améliorez les articles, proposez du code ou aidez à traduire en 6 langues.',
    'home.contribute.cta': 'Contribuer sur GitHub',
    'learningPath.aiFundamentals.label': 'Fondamentaux de l’IA',
    'learningPath.aiFundamentals.description': 'Concepts clés du ML aux transformers',
    'learningPath.aiFundamentals.level': 'débutant',
    'learningPath.ragFromZero.label': 'RAG depuis zéro',
    'learningPath.ragFromZero.description':
      'Construire des systèmes de génération augmentée par récupération',
    'learningPath.ragFromZero.level': 'débutant → intermédiaire',
    'learningPath.masteringAgents.label': 'Maîtriser les agents',
    'learningPath.masteringAgents.description': "Des agents simples aux systèmes multi-agents",
    'learningPath.masteringAgents.level': 'intermédiaire → avancé',
    'learningPath.promptEngineeringMastery.label': 'Maîtrise du prompt engineering',
    'learningPath.promptEngineeringMastery.description':
      'Configuration, techniques et fiabilité',
    'learningPath.promptEngineeringMastery.level': 'débutant → avancé',
    'learningPath.practicalMlops.label': 'MLOps pratique',
    'learningPath.practicalMlops.description': 'Pipeline MLOps de bout en bout',
    'learningPath.practicalMlops.level': 'intermédiaire → avancé',
    'learningPath.aiToolsFrameworks.label': 'Outils & frameworks IA',
    'learningPath.aiToolsFrameworks.description':
      'Fournisseurs de modèles, frameworks et outils de développement',
    'learningPath.aiToolsFrameworks.level': 'débutant → intermédiaire',
    'learningPath.aiSafetyEthics.label': 'Sécurité & éthique de l’IA',
    'learningPath.aiSafetyEthics.description': 'Sécurité, biais, explicabilité et éthique',
    'learningPath.aiSafetyEthics.level': 'débutant → intermédiaire',
    'learningPath.claudeCodeDeepDive.label': 'Claude Code en profondeur',
    'learningPath.claudeCodeDeepDive.description': 'Maîtriser Claude Code et MCP',
    'learningPath.claudeCodeDeepDive.level': 'débutant → avancé',
  },
  'pt-BR': {
    'theme.common.editThisPage': 'Editar esta página',
    'theme.docs.paginator.previous': 'Anterior',
    'theme.docs.paginator.next': 'Próxima',
    'theme.docs.paginator.navAriaLabel': 'Páginas de documentação',
    'home.hero.title': 'Domine IA — do básico à produção',
    'home.hero.tagline':
      'Mais de 145 artigos aprofundados com exemplos de código, tabelas comparativas e diagramas Mermaid. Siga trilhas de aprendizado ou navegue por categoria.',
    'home.hero.startLearning': 'Começar a aprender',
    'home.section.whatTitle': 'O que é este projeto?',
    'home.section.whatBody':
      'O AI Summary Hub é seu guia para conceitos modernos de IA. Cada tópico traz definições, como funciona, exemplos e links. Assim você entende rápido RAG, transformers, LLMs, agentes e mais de 50 temas, do básico ao avançado.',
    'home.section.exploreDocs': 'Explorar documentação',
    'home.section.exploreDocsButton': 'Explorar docs',
    'home.section.helpTitle': 'Ajude a melhorar este guia',
    'home.section.helpBody':
      'O projeto cresce com a comunidade. Se você trabalha com IA, LLMs ou agentes, sua experiência importa. Você pode:',
    'home.section.contributeButton': 'Contribuir com o projeto',
    'home.section.helpBullet1': 'Adicionar novos tópicos com base na sua prática',
    'home.section.helpBullet2': 'Atualizar pontos-chave com conceitos recentes',
    'home.section.helpBullet3': 'Enviar exemplos e trechos de código',
    'home.section.helpBullet4': 'Corrigir informações desatualizadas',
    'home.section.helpBullet5': 'Melhorar explicações e traduzir conteúdo',
    'home.section.helpFooter':
      'Suas contribuições mantêm o guia atual e útil. Veja nossos guias de contribuição para começar.',
    'allTopics.title': 'Todos os tópicos',
    'allTopics.intro':
      'Navegue por todos os tópicos do hub por categoria. Você também pode usar a {sidebarLink} ou a busca.',
    'allTopics.description':
      'Lista completa dos tópicos de documentação do AI Summary Hub, agrupados por categoria.',
    'allTopics.sidebarLink': 'barra lateral',
    'allTopics.level.beginner': 'Iniciante',
    'allTopics.level.intermediate': 'Intermediário',
    'allTopics.level.advanced': 'Avançado',
    'docLink.intro': 'Introdução',
    'docLink.overview': 'Visão geral',
    'notFound.title': 'Página não encontrada',
    'notFound.description': 'Não foi possível encontrar a página que você procura.',
    'notFound.message':
      'Não encontramos a página. Ela pode ter sido movida, renomeada ou não existir mais.',
    'notFound.docs': 'Ver documentação',
    'notFound.home': 'Ir para o início',
    'sidebarSwitcher.title': 'Trilhas de aprendizado',
    'home.hero.browseTopics': 'Explorar todos os tópicos',
    'home.meta.description':
      'Domine IA do básico à produção. Mais de 145 artigos com código, comparações, trilhas e diagramas.',
    'home.feat.heading':
      'Tudo que você precisa para aprender IA — estruturado, prático e aprofundado',
    'home.banner.agentskit':
      'A biblioteca mais completa para construir agentes de IA. Framework pronto para produção com memória, ferramentas, orquestração multiagente e mais.',
    'home.banner.agentskitCta': 'Ver documentação →',
    'home.banner.skills':
      'Repositório curado de skills reutilizáveis para Claude Code e outros assistentes de código com IA.',
    'home.banner.skillsCta': 'Ver no GitHub →',
    'home.topics.heading': 'Cobertura de toda a stack de IA',
    'home.paths.heading': '8 trilhas guiadas',
    'home.paths.subtitle':
      'Não sabe por onde começar? Escolha uma trilha e siga passo a passo.',
    'home.contribute.heading': 'Código aberto e feito pela comunidade',
    'home.contribute.body':
      'O AI Summary Hub é gratuito e open source. Adicione tópicos, melhore artigos, envie exemplos de código ou ajude a traduzir para 6 idiomas.',
    'home.contribute.cta': 'Contribuir no GitHub',
    'learningPath.aiFundamentals.label': 'Fundamentos de IA',
    'learningPath.aiFundamentals.description': 'Conceitos do ML aos transformers',
    'learningPath.aiFundamentals.level': 'iniciante',
    'learningPath.ragFromZero.label': 'RAG do zero',
    'learningPath.ragFromZero.description': 'Construir sistemas de geração aumentada por recuperação',
    'learningPath.ragFromZero.level': 'iniciante → intermediário',
    'learningPath.masteringAgents.label': 'Dominando agentes',
    'learningPath.masteringAgents.description': 'De agentes básicos a sistemas multiagente',
    'learningPath.masteringAgents.level': 'intermediário → avançado',
    'learningPath.promptEngineeringMastery.label': 'Domínio de prompt engineering',
    'learningPath.promptEngineeringMastery.description': 'Configuração, técnicas e confiabilidade',
    'learningPath.promptEngineeringMastery.level': 'iniciante → avançado',
    'learningPath.practicalMlops.label': 'MLOps prático',
    'learningPath.practicalMlops.description': 'Pipeline de operações de ML ponta a ponta',
    'learningPath.practicalMlops.level': 'intermediário → avançado',
    'learningPath.aiToolsFrameworks.label': 'Ferramentas e frameworks de IA',
    'learningPath.aiToolsFrameworks.description': 'Provedores de modelos, frameworks e ferramentas de dev',
    'learningPath.aiToolsFrameworks.level': 'iniciante → intermediário',
    'learningPath.aiSafetyEthics.label': 'Segurança e ética em IA',
    'learningPath.aiSafetyEthics.description': 'Segurança, viés, explicabilidade e ética',
    'learningPath.aiSafetyEthics.level': 'iniciante → intermediário',
    'learningPath.claudeCodeDeepDive.label': 'Claude Code a fundo',
    'learningPath.claudeCodeDeepDive.description': 'Domine Claude Code e MCP',
    'learningPath.claudeCodeDeepDive.level': 'iniciante → avançado',
  },
  'zh-Hans': {
    'theme.common.editThisPage': '编辑本页',
    'theme.docs.paginator.previous': '上一页',
    'theme.docs.paginator.next': '下一页',
    'theme.docs.paginator.navAriaLabel': '文档分页',
    'home.hero.title': '掌握 AI——从基础到生产',
    'home.hero.tagline':
      '145+ 篇深度文章，含代码示例、对比表与 Mermaid 图。可跟学学习路径或按分类浏览。',
    'home.hero.startLearning': '开始学习',
    'home.section.whatTitle': '本项目是什么？',
    'home.section.whatBody':
      'AI Summary Hub 是现代 AI 概念的学习伴侣。每个主题含定义、原理、示例与链接，帮助你快速理解 RAG、Transformer、LLM、智能体等 50+ 主题，从基础到进阶系统。',
    'home.section.exploreDocs': '浏览文档',
    'home.section.exploreDocsButton': '浏览文档',
    'home.section.helpTitle': '帮助改进本指南',
    'home.section.helpBody':
      '本项目依赖社区贡献。若你从事 AI、LLM 或智能体相关工作，欢迎参与。你可以：',
    'home.section.contributeButton': '参与项目',
    'home.section.helpBullet1': '根据经验补充新主题',
    'home.section.helpBullet2': '用最新概念更新要点',
    'home.section.helpBullet3': '贡献示例与代码片段',
    'home.section.helpBullet4': '修正过时信息',
    'home.section.helpBullet5': '改进讲解并翻译内容',
    'home.section.helpFooter':
      '你的贡献让本指南保持最新、对所有人有用。请参阅贡献指南开始参与。',
    'allTopics.title': '所有主题',
    'allTopics.intro':
      '按分类浏览知识库中的全部主题。也可使用{sidebarLink}或搜索。',
    'allTopics.description':
      'AI Summary Hub 全部文档主题列表，按分类分组。',
    'allTopics.sidebarLink': '侧边栏',
    'allTopics.level.beginner': '初级',
    'allTopics.level.intermediate': '中级',
    'allTopics.level.advanced': '高级',
    'docLink.intro': '简介',
    'docLink.overview': '概览',
    'notFound.title': '页面未找到',
    'notFound.description': '无法找到你要访问的页面。',
    'notFound.message':
      '我们找不到该页面。它可能已移动、重命名或不存在。',
    'notFound.docs': '浏览文档',
    'notFound.home': '返回首页',
    'sidebarSwitcher.title': '学习路径',
    'home.hero.browseTopics': '浏览全部主题',
    'home.meta.description':
      '从基础到生产掌握 AI。145+ 篇文章，含代码、对比、学习路径与图示。',
    'home.feat.heading':
      '学习 AI 所需的一切——结构化、可实践、有深度',
    'home.banner.agentskit':
      '构建 AI 智能体最完整的库之一。生产级框架，含记忆、工具、多智能体编排等。',
    'home.banner.agentskitCta': '查看文档 →',
    'home.banner.skills':
      '为 Claude Code 等 AI 编程助手整理的可复用技能仓库。',
    'home.banner.skillsCta': '在 GitHub 上查看 →',
    'home.topics.heading': '覆盖完整 AI 技术栈',
    'home.paths.heading': '8 条引导式学习路径',
    'home.paths.subtitle': '不知从何开始？选一条路径逐步跟随即可。',
    'home.contribute.heading': '开源且由社区共建',
    'home.contribute.body':
      'AI Summary Hub 免费开源。欢迎新增主题、完善文章、提交代码示例，或协助翻译成 6 种语言。',
    'home.contribute.cta': '在 GitHub 上贡献',
    'learningPath.aiFundamentals.label': 'AI 基础',
    'learningPath.aiFundamentals.description': '从机器学习到 Transformer 的核心概念',
    'learningPath.aiFundamentals.level': '初级',
    'learningPath.ragFromZero.label': '从零掌握 RAG',
    'learningPath.ragFromZero.description': '构建检索增强生成系统',
    'learningPath.ragFromZero.level': '初级 → 中级',
    'learningPath.masteringAgents.label': '精通智能体',
    'learningPath.masteringAgents.description': '从基础智能体到多智能体系统',
    'learningPath.masteringAgents.level': '中级 → 高级',
    'learningPath.promptEngineeringMastery.label': '提示工程精通',
    'learningPath.promptEngineeringMastery.description': '配置、技术与可靠性',
    'learningPath.promptEngineeringMastery.level': '初级 → 高级',
    'learningPath.practicalMlops.label': '实用 MLOps',
    'learningPath.practicalMlops.description': '端到端机器学习运维流水线',
    'learningPath.practicalMlops.level': '中级 → 高级',
    'learningPath.aiToolsFrameworks.label': 'AI 工具与框架',
    'learningPath.aiToolsFrameworks.description': '模型提供商、框架与开发工具',
    'learningPath.aiToolsFrameworks.level': '初级 → 中级',
    'learningPath.aiSafetyEthics.label': 'AI 安全与伦理',
    'learningPath.aiSafetyEthics.description': '安全、偏见、可解释性与伦理',
    'learningPath.aiSafetyEthics.level': '初级 → 中级',
    'learningPath.claudeCodeDeepDive.label': 'Claude Code 深入',
    'learningPath.claudeCodeDeepDive.description': '掌握 Claude Code 与 MCP',
    'learningPath.claudeCodeDeepDive.level': '初级 → 高级',
  },
};

for (const [locale, messages] of Object.entries(locales)) {
  const out = {};
  for (const [key, orig] of Object.entries(es)) {
    const msg = messages[key];
    if (!msg) {
      throw new Error(`Missing translation for ${locale} key: ${key}`);
    }
    out[key] = {...orig, message: msg};
  }
  const dir = path.join(ROOT, 'i18n', locale);
  fs.mkdirSync(dir, {recursive: true});
  const outPath = path.join(dir, 'code.json');
  fs.writeFileSync(outPath, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
  console.log('Wrote', outPath);
}
