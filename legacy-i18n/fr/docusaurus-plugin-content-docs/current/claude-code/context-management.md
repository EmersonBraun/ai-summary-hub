---
title: Gestion du contexte
description: Comment Claude Code gère la fenêtre de contexte sur de longues sessions — compression automatique, stratégies d'historique de conversation et techniques pratiques pour maintenir l'efficacité des sessions à grande échelle.
keywords: [gestion du contexte, fenêtre de contexte, historique de conversation, /clear, compression du contexte, limites de tokens, sessions Claude Code, longues sessions]
tags: [intermediate]
authors: [EmersonBraun]
---

# Gestion du contexte

## Définition

La gestion du contexte fait référence aux stratégies et mécanismes que Claude Code utilise pour maintenir l'efficacité des conversations dans les limites finies de la fenêtre de contexte du modèle. Chaque modèle a une fenêtre de contexte maximale — le nombre total de tokens qu'il peut traiter en une seule requête — et cette fenêtre doit accueillir le prompt système, les définitions d'outils, l'historique complet de la conversation (messages utilisateur, réponses de l'assistant, appels d'outils et résultats d'outils) et tout contenu de fichier chargé pendant la session. Lorsque le contexte cumulatif approche la limite, quelque chose doit céder : soit l'ancien contenu est compressé ou éliminé, soit la session doit être réinitialisée.

Comprendre la gestion du contexte est particulièrement important pour les longues sessions Claude Code. Une session de débogage simple peut consommer toute la fenêtre de contexte après 30 à 50 tours, surtout si Claude lit plusieurs grands fichiers, exécute des commandes avec une sortie détaillée ou accumule de nombreux cycles d'appels d'outils. Les développeurs qui ne sont pas conscients des limites de contexte peuvent remarquer que Claude commence à « oublier » les décisions antérieures, à donner des réponses incohérentes ou à sembler confus à propos du contexte précédent — ce sont des symptômes de pression sur le contexte, pas une défaillance du modèle.

Claude Code traite les limites de contexte via une combinaison de mécanismes automatiques (compression du contexte, chargement sélectif des fichiers) et de stratégies contrôlées par l'utilisateur (la commande `/clear`, le cadrage ciblé des tâches, CLAUDE.md pour les conventions persistantes). Une gestion efficace du contexte n'est pas seulement question d'éviter les erreurs — c'est de concevoir des sessions qui restent précises et exactes du début à la fin en maintenant les informations les plus pertinentes dans la fenêtre active à tout moment.

## Comment ça fonctionne

### Structure de la fenêtre de contexte

La fenêtre de contexte est divisée en plusieurs zones, chacune contribuant au nombre total de tokens. La **zone du prompt système** contient les instructions CLAUDE.md et les définitions d'outils — celles-ci sont relativement stables et peuvent être mises en cache (voir la mise en cache des prompts). La **zone d'historique de conversation** croît à chaque tour : chaque message utilisateur, réponse de l'assistant, appel d'outil et résultat d'outil ajoute des tokens. La **zone de contenu de fichiers** contient le code source réel et le contenu des fichiers que Claude a lus pendant la session. Au fil de la session, les zones d'historique de conversation et de contenu de fichiers croissent jusqu'à approcher la limite du modèle.

### Compression automatique du contexte

Lorsque Claude Code détecte que la fenêtre de contexte approche sa limite, il applique une compression automatique à l'historique de conversation. L'algorithme de compression identifie les tours plus anciens qui sont moins susceptibles d'être nécessaires pour la tâche actuelle et les résume ou les tronque. Les résultats d'outils — surtout les volumineux comme les listings de répertoires ou les longs contenus de fichiers — sont compressés en priorité car ils contiennent des données brutes que le modèle a déjà traitées. L'objectif est de préserver le fil logique de la conversation tout en supprimant le contenu verbatim des tours plus anciens. Les utilisateurs peuvent remarquer des résumés compressés apparaissant à la place des échanges détaillés antérieurs.

### Chargement sélectif des fichiers

Claude Code ne pré-charge pas tous les fichiers du projet dans le contexte au démarrage de la session. Au lieu de cela, il utilise une stratégie de chargement à la demande : les fichiers sont lus avec l'outil `Read` ou `Glob` uniquement lorsque Claude détermine qu'ils sont pertinents pour la tâche actuelle. Cela maintient le contexte initial petit et ciblé. Cependant, au fil de la session et au fur et à mesure que Claude lit plus de fichiers, les contenus de fichiers s'accumulent dans le contexte. Pour les très grandes bases de code, Claude peut avoir besoin de relire des fichiers spécifiques plutôt que de conserver tous les fichiers précédemment lus dans la fenêtre active.

### La commande /clear

La commande `/clear` supprime tout l'historique de conversation et démarre une session fraîche. C'est la forme la plus agressive de gestion du contexte — équivalente à fermer et rouvrir le terminal. Utilisez-la entre des tâches non liées, après avoir terminé une fonctionnalité majeure, ou lorsque la dérive du contexte (informations contradictoires ou obsolètes dans l'historique) provoque un comportement confus. Les instructions CLAUDE.md et la configuration du projet survivent à `/clear` car elles sont rechargées depuis le système de fichiers au début de chaque session.

```mermaid
flowchart LR
  UserMsg[User message] -->|appended to history| History[Conversation history]
  History -->|within limit| Assemble[Context assembled]
  ToolCall[Tool calls + results] -->|appended to history| History
  FileRead[File contents loaded] -->|appended to history| History
  Assemble -->|sent to| Model[Claude model]
  Model -->|response + new tool calls| History
  History -->|approaching limit| Compress[Auto-compression\nold turns summarized]
  Compress -->|trimmed history| Assemble
  Clear[/clear command] -->|resets| History
```

## Quand utiliser / Quand NE PAS utiliser

| Utiliser quand | Éviter quand |
|---|---|
| Vous démarrez une nouvelle tâche non liée — utilisez `/clear` pour commencer avec un contexte propre | L'historique de conversation contient des décisions ou découvertes critiques dont vous avez encore besoin |
| La session tourne depuis de nombreux tours et Claude semble confus — la dérive du contexte est un signe | Vous êtes au milieu d'une tâche multi-étapes où le contexte précédent est activement nécessaire |
| Vous chargez de très grands fichiers — envisagez `/clear` d'abord et chargez seulement ce dont la tâche actuelle a besoin | La session est courte et la pression de contexte n'est pas encore une préoccupation |
| Vous voulez évaluer la qualité des réponses — un contexte frais donne une base de référence propre | Vous dépendez de CLAUDE.md pour le contexte du projet — `/clear` le préserve, mais le contexte spécifique à la session est perdu |
| Vous écrivez un CLAUDE.md qui capture le contexte important du projet pour qu'il survive à `/clear` | La « confusion » est en réalité une limitation du modèle sans rapport avec le contexte — plus de contexte n'aidera pas |

## Exemples de code

```bash
# Context management strategies in a Claude Code session

# Strategy 1: Use /clear between unrelated tasks
# Working on feature A...
claude
> Implement the user registration endpoint in src/routes/auth.ts
> Add validation for email format and password strength
> Write the unit tests for the new endpoint

# Feature A is done. Switch to a completely different task.
> /clear    # Reset context — start fresh for unrelated work
> Refactor the logging module in src/utils/logger.ts to use structured JSON output

# ---

# Strategy 2: Scope tasks narrowly to avoid loading unnecessary files
# BAD: Loads everything, inflates context early
> Read all files in the src/ directory and tell me how authentication works

# GOOD: Targeted question that loads only relevant files
> How does authentication work? Start by reading src/routes/auth.ts and src/middleware/auth.ts

# ---

# Strategy 3: Summarize before /clear to preserve key decisions
> Before I run /clear, summarize the architectural decisions we made in this session
  so I can paste them into CLAUDE.md

# Paste the summary into CLAUDE.md, then:
> /clear    # Now the decisions persist via CLAUDE.md across future sessions

# ---

# Strategy 4: Use focused sessions for large codebases
# Instead of one giant session, break work into focused chunks
# Session 1: Understand the data model
claude
> Read src/models/ and explain the database schema and entity relationships
> /exit

# Session 2: Implement a specific feature
claude
> Given our Prisma schema in prisma/schema.prisma, add a 'tags' relation to Post
```

```bash
# Monitoring context usage (verbose mode)
claude --verbose

# Look for token count indicators in the verbose output:
# "Context: 45,231 / 200,000 tokens (22%)"
# When this approaches 80-90%, consider /clear or wrapping up the session

# The model will also proactively warn you when context is getting full:
# "Note: This session is using a significant portion of the context window.
#  Consider using /clear before starting unrelated tasks."
```

```markdown
# CLAUDE.md pattern: capturing session context for future sessions
# This lets important discoveries survive /clear

## Current architecture decisions (updated 2026-04-01)
- Authentication uses JWT with 24h access tokens and 30d refresh tokens stored in httpOnly cookies
- All database queries go through the repository layer in src/repositories/ — never call Prisma directly from routes
- We decided against Redis for session storage in favor of stateless JWT (revisit if auth rate-limiting is needed)
- The `UserService` was split into `UserAuthService` and `UserProfileService` in the April 2026 refactor

## Known complexity areas (read these files before touching related code)
- `src/services/billing.ts` — complex subscription state machine, read the inline comments carefully
- `src/middleware/rateLimit.ts` — custom sliding window implementation, not a standard library
```

## Ressources pratiques

- [Contexte et mémoire Claude Code](https://docs.anthropic.com/en/docs/claude-code/memory) — Guide officiel sur la façon dont Claude Code gère le contexte, incluant /clear et CLAUDE.md pour la mémoire persistante.
- [Fenêtres de contexte des modèles Claude](https://docs.anthropic.com/en/docs/about-claude/models) — Limites de tokens pour chaque variante de modèle Claude.
- [Documentation sur la mise en cache des prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) — Comment mettre en cache les portions de contexte stables pour réduire le coût et la latence dans les longues sessions.
- [Référence CLI Claude Code](https://docs.anthropic.com/en/docs/claude-code/cli-reference) — Liste complète des commandes slash incluant /clear et /compact.

## Voir aussi

- [Vue d'ensemble de Claude Code](/docs/claude-code)
- [Mise en cache des prompts](/docs/claude-code/prompt-caching)
- [Configuration CLAUDE.md](/docs/claude-code/claude-md)
