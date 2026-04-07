---
title: Anthropic
description: Anthropic en tant que plateforme développeur — famille de modèles Claude, API Messages, utilisation d'outils, réflexion étendue, mise en cache des prompts et long contexte.
keywords: [Anthropic, Claude, Claude Opus, Claude Sonnet, Claude Haiku, utilisation d'outils, réflexion étendue, mise en cache des prompts, long contexte, API, SDK]
---

# Anthropic

## Définition

**Anthropic** est une entreprise de sécurité en IA et fournisseur de modèles fondée en 2021 par d'anciens chercheurs d'OpenAI. Sa thèse centrale est que construire des modèles d'IA capables et résoudre le problème d'alignement sont des objectifs inséparables — l'entreprise poursuit une capacité de pointe en parallèle de recherches en sécurité telles que l'IA constitutionnelle, l'interprétabilité et la compréhension mécanistique des modèles. Le produit commercial de cette recherche est la famille de modèles **Claude**, disponible via l'API Anthropic et les produits d'entreprise.

La gamme de modèles Claude suit une convention de nommage à trois niveaux reflétant les compromis entre capacité et coût : **Opus** (qualité la plus élevée, raisonnement complexe), **Sonnet** (équilibre entre qualité et vitesse), et **Haiku** (le plus rapide et le plus rentable). En 2025, la génération actuelle est **Claude 3.7 Sonnet** — le modèle phare avec des capacités de réflexion étendue — ainsi que **Claude 3 Opus**, **Claude 3.5 Sonnet** et **Claude 3.5 Haiku**. Tous les modèles Claude 3+ prennent en charge les entrées visuelles (images), et toute la famille est conçue autour d'une fenêtre de contexte de 200K tokens pouvant gérer des livres, de grandes bases de code et de longs historiques de conversation sans troncature.

Du point de vue de la plateforme, l'API d'Anthropic s'articule autour de l'**API Messages** — une interface propre et dédiée aux conversations multi-tours. La plateforme inclut l'utilisation d'outils (le terme d'Anthropic pour l'appel de fonctions), la réflexion étendue (raisonnement en chaîne de pensée visible), la mise en cache des prompts (réduit le coût et la latence pour les grands contextes répétés) et le traitement par lots. Le SDK Python (`anthropic`) et le SDK TypeScript sont les principales bibliothèques clientes. Les modèles Claude sont également disponibles via Amazon Bedrock, Google Cloud Vertex AI et des contrats d'entreprise avec des options de résidence des données.

## Comment ça fonctionne

### API Messages

L'API Messages (`POST /v1/messages`) est l'interface principale d'Anthropic. Contrairement à certaines API qui utilisent une chaîne `prompt` plate, l'API Messages est centrée sur la conversation : vous envoyez un tableau `messages` de tours alternés `user` et `assistant`, avec un paramètre `system` optionnel pour le contexte et la persona. Le modèle renvoie un objet `Message` contenant une liste `content` — des blocs de texte par défaut, des blocs d'utilisation d'outils lorsque le modèle décide d'appeler un outil. Le streaming est pris en charge et recommandé pour un usage interactif ; le SDK fournit des helpers de streaming et un accès SSE brut.

```mermaid
flowchart LR
  Client[Client app] -->|POST /v1/messages| API[Anthropic API]
  API -->|system + messages| Selector{Model\nselector}
  Selector -->|complex reasoning| Opus[Claude 3 Opus]
  Selector -->|balanced| Sonnet[Claude 3.7 Sonnet]
  Selector -->|fast / cheap| Haiku[Claude 3.5 Haiku]
  Opus -->|content blocks| Resp[Message response]
  Sonnet --> Resp
  Haiku --> Resp
  Resp --> Client
  Resp -.->|token usage,\nbilling| Platform[Anthropic platform]
```

### Utilisation d'outils

L'utilisation d'outils permet à Claude d'appeler des fonctions externes en émettant des blocs de contenu `tool_use` structurés. Vous déclarez les outils sous forme de schémas JSON dans le paramètre `tools`. Lorsque Claude décide qu'un outil est nécessaire, la réponse contient un bloc `tool_use` avec le nom de l'outil et l'entrée ; votre code exécute la fonction et renvoie un `tool_result` dans le prochain tour utilisateur. Claude utilise ensuite le résultat pour compléter sa réponse. Ce modèle permet des agents, des environnements d'exécution de code, des requêtes de base de données et des intégrations API sans que le modèle ait besoin d'un accès direct à un système quelconque.

```mermaid
flowchart LR
  UserMsg[User message] --> Claude[Claude model]
  Claude -->|emits tool_use block| ToolReq[Tool request\nname + input JSON]
  ToolReq -->|your code invokes| ExtSystem[External system\nor function]
  ExtSystem -->|result| ToolResult[tool_result message]
  ToolResult --> Claude
  Claude -->|final text response| UserMsg
```

### Réflexion étendue

La réflexion étendue est un mode disponible sur Claude 3.7 Sonnet qui permet au modèle de raisonner longuement avant de produire sa réponse finale. Lorsque vous définissez `thinking: {type: "enabled", budget_tokens: N}`, le modèle émet des blocs de contenu `thinking` contenant son brouillon interne — similaire à la chaîne de pensée mais natif et structuré. La réflexion étendue améliore significativement les performances sur les compétitions mathématiques, le code complexe, le raisonnement multi-étapes et les tâches nécessitant une analyse minutieuse pas à pas. Les tokens de réflexion comptent dans le budget de tokens mais sont visibles dans la réponse, vous offrant une transparence sur la façon dont le modèle est parvenu à sa réponse.

### Mise en cache des prompts

La mise en cache des prompts réduit considérablement le coût et la latence pour les charges de travail qui utilisent de manière répétée de grands prompts système ou des contextes de documents. Vous marquez des sections préfixées de votre requête avec `cache_control: {type: "ephemeral"}`. Au premier appel, Anthropic met en cache le préfixe du prompt sur son infrastructure ; les appels suivants qui correspondent au préfixe sont servis depuis le cache à un coût de token d'entrée 90% inférieur et avec une réduction significative du temps jusqu'au premier token. C'est particulièrement utile pour les pipelines RAG (grand contexte transmis à chaque requête), les boucles d'agents (grands prompts système répétés à chaque tour) et le traitement par lots de documents.

### Long contexte (200K tokens)

Tous les modèles Claude 3 et ultérieurs prennent en charge une fenêtre de contexte de 200K tokens — équivalent à environ 150 000 mots ou ~500 pages de texte. Le long contexte permet de traiter des bases de code entières, des documents juridiques, des articles de recherche ou des historiques de conversation complets en un seul appel sans découpage. Les recherches d'Anthropic sur les performances en long contexte (évaluations "needle in a haystack") montrent que Claude maintient une précision de rappel élevée sur toute la plage de 200K, le rendant fiable pour les questions-réponses sur des documents, l'analyse de contrats et la revue de code sur de grands dépôts. C'est l'un des différenciateurs les plus clairs d'Anthropic par rapport à la fenêtre de 128K de GPT-4o.

```mermaid
flowchart LR
  LargeDoc[Large document\nor codebase] -->|tokenize| Tokens[Up to 200K tokens]
  Tokens -->|single API call| Claude[Claude model]
  SystemPrompt[System prompt] -->|cached prefix| Cache[(Prompt cache)]
  Cache -->|cache hit: 90% cheaper| Claude
  Claude -->|grounded analysis| Output[Answer / analysis]
```

## Quand utiliser / Quand NE PAS utiliser

| Utiliser Anthropic quand | Éviter ou considérer des alternatives quand |
|--------------------|--------------------------------------|
| Vous avez besoin d'une fenêtre de contexte de 200K pour traiter de longs documents, des bases de code ou des conversations étendues sans découpage | Votre charge de travail nécessite la génération d'images, la transcription audio ou la synthèse vocale — Claude est uniquement texte/vision ; OpenAI couvre l'audio |
| Les contraintes de sécurité et un comportement de refus prévisible sont critiques (conformité, santé, finance) | Vous avez besoin de modèles à poids ouverts pour l'auto-hébergement, le fine-tuning ou la résidence des données — Anthropic ne propose pas d'option à poids ouverts |
| Vous souhaitez une réflexion étendue pour des tâches de raisonnement profond (mathématiques, code complexe, analyse multi-étapes) | Votre cas d'usage principal est la génération d'embeddings à fort volume — Anthropic ne propose pas d'API d'embeddings |
| La mise en cache des prompts réduira significativement les coûts (grands contextes répétés, prompts système d'agent) | Vous dépendez fortement des outils spécifiques à OpenAI (Assistants API, DALL-E, Whisper) qui n'ont pas d'équivalent Anthropic |
| Vous construisez des workflows d'utilisation d'outils ou d'utilisation d'ordinateur et souhaitez un modèle bien calibré pour les sorties structurées | Vous avez besoin du coût par token absolument le plus bas à grande échelle — Claude Haiku est compétitif sur le prix mais GPT-4o-mini et les modèles ouverts sont moins chers |

## Comparaisons

| Critère | Anthropic | OpenAI | Google Gemini |
|----------|-----------|--------|---------------|
| Modèle phare | Claude 3.7 Sonnet | GPT-4o | Gemini 2.5 Pro |
| Fenêtre de contexte | 200K (tous Claude 3+) | 128K (GPT-4o) | Jusqu'à 1M (Gemini 1.5 Pro) |
| Raisonnement / réflexion | Réflexion étendue (CoT natif) | Série o1, o3 | Gemini 2.5 Pro thinking |
| Entrée multimodale | Texte, image | Texte, image, audio, vidéo | Texte, image, audio, vidéo |
| Audio / parole | Non | Oui (Whisper, TTS) | Oui (Gemini) |
| Génération d'images | Non | Oui (DALL-E 3) | Oui (Imagen) |
| API d'embeddings | Non | Oui | Oui |
| Poids ouverts | Non | Non | Gemma (partiel) |
| Mise en cache des prompts | Oui (natif, 90% de réduction) | Mise en cache contextuelle (limitée) | Oui (Gemini) |
| Utilisation d'outils / appel de fonctions | Mature, support de l'utilisation d'ordinateur | Mature, largement adopté | Mature |
| Philosophie de sécurité | IA constitutionnelle, réglage des refus | API de modération, politique d'utilisation | Directives d'IA responsable |
| Options de résidence des données | Contrat d'entreprise | Contrat d'entreprise | Régions Google Cloud |

## Avantages et inconvénients

| Avantages | Inconvénients |
|------|------|
| Fenêtre de contexte de 200K sur tous les modèles — meilleure de sa catégorie pour les longs documents | Pas d'API audio, vocale ou de génération d'images |
| La réflexion étendue offre une chaîne de pensée transparente pour les tâches de raisonnement difficiles | Pas d'API d'embeddings — vous avez besoin d'un second fournisseur pour le RAG |
| La mise en cache des prompts réduit significativement les coûts pour les grands contextes répétés | Modèle fermé sans option à poids ouverts |
| Conception axée sur la sécurité avec un calibrage soigneux des refus et l'IA constitutionnelle | Écosystème plus petit qu'OpenAI — moins de tutoriels et intégrations tiers |
| Utilisation d'ordinateur (bêta) permet le contrôle agentique des interfaces graphiques de bureau | La tarification peut être plus élevée que GPT-4o-mini ou les alternatives à poids ouverts pour les tâches simples |

## Exemples de code

### API Messages — complétion de base et prompt système

```python
import anthropic

client = anthropic.Anthropic(api_key="sk-ant-...")  # or set ANTHROPIC_API_KEY env var

# Basic message
message = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=1024,
    system="You are a concise technical assistant. Answer in plain English.",
    messages=[
        {"role": "user", "content": "What is the Anthropic Messages API?"}
    ],
)
print(message.content[0].text)

# Multi-turn conversation
messages = [
    {"role": "user", "content": "What is prompt caching?"},
    {"role": "assistant", "content": "Prompt caching stores repeated large context..."},
    {"role": "user", "content": "How much does it save?"},
]
response = client.messages.create(
    model="claude-3-5-haiku-20241022",
    max_tokens=512,
    messages=messages,
)
print(response.content[0].text)
```

### Utilisation d'outils

```python
import json
import anthropic

client = anthropic.Anthropic()

# Define tools as JSON schemas
tools = [
    {
        "name": "search_docs",
        "description": "Search the documentation for a given query and return relevant passages.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {"type": "string", "description": "Search query"},
                "max_results": {"type": "integer", "default": 3},
            },
            "required": ["query"],
        },
    }
]

messages = [{"role": "user", "content": "How do I enable prompt caching?"}]

# First call — Claude may request a tool
response = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=1024,
    tools=tools,
    messages=messages,
)

# Process tool calls
if response.stop_reason == "tool_use":
    messages.append({"role": "assistant", "content": response.content})

    tool_results = []
    for block in response.content:
        if block.type == "tool_use":
            # Simulated tool execution
            result = f"Prompt caching docs for '{block.input['query']}': use cache_control param..."
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": block.id,
                "content": result,
            })

    messages.append({"role": "user", "content": tool_results})

    # Final call with tool result
    final = client.messages.create(
        model="claude-3-7-sonnet-20250219",
        max_tokens=1024,
        tools=tools,
        messages=messages,
    )
    print(final.content[0].text)
```

### Réflexion étendue

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=16000,
    thinking={
        "type": "enabled",
        "budget_tokens": 10000,  # tokens allocated for internal reasoning
    },
    messages=[{
        "role": "user",
        "content": (
            "A train leaves city A at 9am traveling at 80 km/h. "
            "Another train leaves city B (320 km away) at 10am traveling at 100 km/h. "
            "At what time do they meet, and how far from city A?"
        ),
    }],
)

for block in response.content:
    if block.type == "thinking":
        print("=== Model's internal reasoning ===")
        print(block.thinking[:500], "...")  # first 500 chars for brevity
    elif block.type == "text":
        print("=== Final answer ===")
        print(block.text)
```

### Mise en cache des prompts pour un grand contexte répété

```python
import anthropic

client = anthropic.Anthropic()

# Large document loaded once — cached after first call
large_document = open("contract.txt").read()  # e.g., 50K tokens

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": "You are a legal document analyst. Answer questions based solely on the document provided.",
        },
        {
            "type": "text",
            "text": large_document,
            "cache_control": {"type": "ephemeral"},  # mark for caching
        },
    ],
    messages=[{"role": "user", "content": "What are the termination clauses?"}],
)

print(response.content[0].text)
# usage.cache_creation_input_tokens — tokens cached this call (full price)
# usage.cache_read_input_tokens — tokens served from cache (10% price)
print(response.usage)
```

## Ressources pratiques

- [Référence API Anthropic](https://docs.anthropic.com/en/api/getting-started) — Documentation complète des endpoints avec schémas de requête/réponse et référence des paramètres
- [Guide d'ingénierie des prompts Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — Meilleures pratiques officielles pour les prompts système, la chaîne de pensée et les techniques spécifiques aux tâches
- [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) — Notebooks exécutables couvrant l'utilisation d'outils, le RAG, le multimodal, la mise en cache des prompts et les agents
- [Vue d'ensemble des modèles Claude](https://docs.anthropic.com/en/docs/about-claude/models) — IDs de modèles actuels, fenêtres de contexte, comparaison des capacités et calendrier de dépréciation
- [SDK Python Anthropic sur GitHub](https://github.com/anthropics/anthropic-sdk-python) — Source, journal des modifications, stubs de types et guides de migration

## Voir aussi

- [Fournisseurs de modèles](/docs/model-providers) — Vue d'ensemble et comparaison de tous les fournisseurs incluant un tableau comparatif à 7 fournisseurs
- [Étude de cas : Claude](/docs/case-studies/claude) — Pour un regard plus approfondi sur l'architecture et la méthodologie d'entraînement du modèle
- [OpenAI](/docs/model-providers/openai) — GPT-4o, raisonnement o-series, appel de fonctions, DALL-E, Whisper
- [Ingénierie des prompts](/docs/prompt-engineering) — Techniques applicables à tous les modèles Claude
- [Outils](/docs/tools/claude-code) — Claude Code, l'agent de codage IA d'Anthropic construit sur l'API Claude
- [Agents](/docs/agents) — Construire des workflows agentiques avec l'utilisation d'outils Claude
