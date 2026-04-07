---
title: Température, Top-K, Top-P
description: Comment les paramètres d'échantillonnage température, Top-K et Top-P contrôlent le caractère aléatoire et la créativité dans les sorties des LLM.
keywords: [température, top-k, top-p, nucleus sampling, paramètres d'échantillonnage, configuration LLM, caractère aléatoire, créativité]
---

# Température, Top-K, Top-P

## Définition

La température, Top-K et Top-P sont des paramètres d'échantillonnage qui contrôlent comment un LLM sélectionne le prochain token pendant la génération de texte. Après que le modèle a calculé une distribution de probabilité sur tout son vocabulaire (via softmax sur les logits), ces paramètres façonnent quels tokens sont candidats à la sélection et quelle est la probabilité de choisir chaque candidat. Ensemble, ils gouvernent le compromis entre déterminisme et diversité : des valeurs basses rendent le modèle prévisible et concentré, des valeurs élevées le rendent créatif et varié.

**La température** redimensionne les logits bruts avant l'étape softmax, aplatissant ou affinant efficacement la distribution de probabilité. Une température de 1.0 laisse la distribution inchangée. Les valeurs inférieures à 1.0 rendent la distribution plus pointue — le modèle choisit presque toujours le token avec la probabilité la plus élevée. Les valeurs supérieures à 1.0 aplatissent la distribution — davantage de tokens deviennent des candidats plausibles, produisant des sorties plus surprenantes et variées. À température 0, la génération devient déterministe (décodage argmax).

**Top-K** et **Top-P** sont des stratégies de troncation appliquées après la mise à l'échelle par la température. Top-K conserve uniquement les K tokens les plus probables et redistribue la masse de probabilité entre eux, écartant tous les autres. Top-P (également appelé nucleus sampling) sélectionne dynamiquement le plus petit ensemble de tokens dont la masse de probabilité cumulée atteint un seuil P, puis échantillonne depuis cet ensemble. Top-P est généralement préféré à Top-K parce que la taille de l'ensemble candidat s'adapte à la forme de la distribution : quand le modèle est confiant, le noyau est petit ; quand le modèle est incertain, le noyau s'étend pour inclure plus d'alternatives.

## Fonctionnement

```mermaid
flowchart LR
  L[Raw logits] -->|"divide by temperature T"| TS[Temperature-scaled logits]
  TS -->|softmax| SM[Full probability distribution]
  SM -->|"keep top-K tokens"| TK[Top-K filtered distribution]
  TK -->|"keep tokens until cumulative p ≥ P"| TP[Top-P nucleus]
  TP -->|"sample one token"| TOK[Next token]
```

Les paramètres sont appliqués séquentiellement : mise à l'échelle par la température en premier, puis troncation Top-K, puis sélection du noyau Top-P, puis échantillonnage. En pratique, la plupart des API appliquent uniquement température + Top-P (défaut OpenAI) ou température + Top-K (défaut Anthropic) ; appliquer Top-K et Top-P ensemble est possible mais inhabituel.

### Température

La température `T` divise chaque logit brut `z_i` avant le softmax : `p_i = softmax(z / T)`. Quand `T < 1`, les différences de logit sont amplifiées — le token avec la probabilité la plus élevée obtient une part encore plus grande de la masse de probabilité. Quand `T > 1`, les différences de logit diminuent — la masse de probabilité se répartit plus uniformément. Préréglages communs : `T = 0` pour les tâches d'extraction déterministes, `T = 0.2–0.4` pour le QA factuel, `T = 0.7–1.0` pour l'écriture créative, `T > 1.0` pour la diversité maximale (bien que la qualité se dégrade aux valeurs extrêmes).

### Top-K

L'échantillonnage Top-K restreint le pool de candidats aux K tokens avec la probabilité la plus élevée après la mise à l'échelle par la température. Tous les tokens en dehors du top K se voient attribuer une probabilité nulle avant la renormalisation. La limitation clé est que K est fixe indépendamment de l'apparence de la distribution : quand le modèle est très confiant, même K=50 pourrait inclure de nombreux tokens de probabilité quasi nulle qui introduisent du bruit ; quand le modèle est incertain, un K petit pourrait couper des alternatives raisonnables. L'API d'Anthropic expose `top_k` comme paramètre direct ; l'API d'OpenAI ne le prend pas en charge nativement.

### Top-P (nucleus sampling)

L'échantillonnage Top-P construit l'ensemble candidat dynamiquement. En partant du token le plus probable et en progressant vers le bas, des tokens sont ajoutés au noyau jusqu'à ce que leur probabilité cumulée atteigne le seuil P. Seuls les tokens dans le noyau sont considérés pour l'échantillonnage. Avec `P = 0.9`, le modèle échantillonne parmi les tokens qui représentent ensemble 90% de la masse de probabilité. Parce que le noyau se contracte quand le modèle est confiant (quelques tokens dominent) et s'étend quand il est incertain (la masse de probabilité est étalée mince), Top-P s'adapte naturellement à l'état interne du modèle. Top-P est pris en charge par les API OpenAI (`top_p`) et Anthropic (`top_p`).

## Quand utiliser / Quand NE PAS utiliser

| Scénario | Paramètres recommandés | Éviter |
|----------|------------------------|--------|
| QA factuel, extraction de données, classification | `temperature=0–0.2`, `top_p=1.0` pour une sortie quasi-déterministe | Température élevée ; introduit des hallucinations et des erreurs de format |
| Écriture créative, brainstorming, idéation | `temperature=0.8–1.0`, `top_p=0.95` pour des sorties diverses et originales | Temperature=0 ; produit un texte répétitif et prévisible |
| Génération de code | `temperature=0.2–0.4`, `top_p=0.95` ; une certaine variation aide à éviter les optima locaux | Température > 0.8 ; les erreurs de syntaxe et la dérive logique augmentent |
| Self-consistency (plusieurs chemins de raisonnement) | `temperature=0.6–1.0` ; la diversité est intentionnelle | Temperature=0 ; tous les chemins seraient identiques, contrecarrant l'objectif |
| Extraction de sortie structurée (JSON, tableaux) | `temperature=0`, `top_p=1.0` pour une adhérence stricte au schéma | Top-P < 0.9 combiné avec une température élevée ; les violations de schéma augmentent |
| Dialogue / chatbots | `temperature=0.5–0.7`, `top_p=0.9` ; équilibre cohérence et naturel | Température extrême dans les deux sens ; trop robotique ou trop incohérent |

## Exemples de code

### OpenAI — température et Top-P

```python
# OpenAI API call with temperature and top_p
# pip install openai

import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])


def generate(prompt: str, temperature: float = 0.7, top_p: float = 0.95) -> str:
    """Generate text with configurable sampling parameters."""
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
        top_p=top_p,
        max_tokens=512,
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    # Deterministic factual extraction
    factual = generate(
        "List the three primary colors.",
        temperature=0.0,
        top_p=1.0,
    )
    print("Factual:", factual)

    # Creative brainstorming
    creative = generate(
        "Suggest five unusual names for a café that serves only breakfast.",
        temperature=0.9,
        top_p=0.95,
    )
    print("Creative:", creative)
```

### Anthropic — température et Top-K

```python
# Anthropic API call with temperature and top_k
# pip install anthropic

import os
import anthropic

client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])


def generate(prompt: str, temperature: float = 0.7, top_k: int = 50) -> str:
    """Generate text with configurable temperature and top-k sampling."""
    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=512,
        temperature=temperature,
        top_k=top_k,
        messages=[{"role": "user", "content": prompt}],
    )
    return message.content[0].text


if __name__ == "__main__":
    # Near-deterministic output for structured tasks
    deterministic = generate(
        "Translate 'hello world' into French, German, and Japanese.",
        temperature=0.0,
        top_k=1,
    )
    print("Deterministic:", deterministic)

    # Creative output with broader candidate pool
    creative = generate(
        "Write the opening sentence of a science fiction novel set on Europa.",
        temperature=1.0,
        top_k=250,
    )
    print("Creative:", creative)
```

## Ressources pratiques

- [OpenAI — Référence API : température et top_p](https://platform.openai.com/docs/api-reference/chat/create) — Documentation officielle des paramètres avec plages valides et valeurs par défaut
- [Anthropic — Référence API : temperature, top_k, top_p](https://docs.anthropic.com/en/api/messages) — Référence des paramètres Anthropic incluant top_k (non disponible dans OpenAI)
- [L'article Nucleus Sampling (Holtzman et al., 2020)](https://arxiv.org/abs/1904.09751) — Article original introduisant Top-P / nucleus sampling avec motivation et résultats empiriques
- [Hugging Face — Stratégies de génération de texte](https://huggingface.co/docs/transformers/generation_strategies) — Guide complet des stratégies d'échantillonnage incluant greedy, beam search, température, Top-K et Top-P
- [Lilian Weng — Génération de texte contrôlable](https://lilianweng.github.io/posts/2021-01-02-controllable-text-generation/) — Article de blog approfondi couvrant les méthodes d'échantillonnage dans le contexte de la génération contrôlable

## Voir aussi

- [Prompt engineering](/docs/prompt-engineering)
- [Max tokens et séquences d'arrêt](/docs/prompt-engineering/max-tokens-stop-sequences)
- [Sorties structurées](/docs/prompt-engineering/structured-outputs)
- [Self-consistency](/docs/prompt-engineering/self-consistency)
- [Chaîne de pensée](/docs/reasoning-patterns/cot)
- [LLMs](/docs/llms)
