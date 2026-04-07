---
title: Temperatura, Top-K, Top-P
description: Como os parâmetros de amostragem temperatura, Top-K e Top-P controlam a aleatoriedade e a criatividade nas saídas de LLMs.
keywords: [temperatura, top-k, top-p, amostragem núcleo, parâmetros de amostragem, configuração de LLM, aleatoriedade, criatividade]
---

# Temperatura, Top-K, Top-P

## Definição

Temperatura, Top-K e Top-P são parâmetros de amostragem que controlam como um LLM seleciona o próximo token durante a geração de texto. Depois que o modelo calcula uma distribuição de probabilidade sobre todo o seu vocabulário (via softmax sobre logits), esses parâmetros moldam quais tokens são candidatos à seleção e qual a probabilidade de cada candidato ser escolhido. Juntos eles governam o trade-off entre determinismo e diversidade: valores baixos tornam o modelo previsível e focado, valores altos o tornam criativo e variado.

**Temperatura** reescala os logits brutos antes da etapa de softmax, efetivamente achatando ou aguçando a distribuição de probabilidade. Uma temperatura de 1,0 deixa a distribuição inalterada. Valores abaixo de 1,0 tornam a distribuição mais concentrada — o modelo quase sempre escolhe o token de maior probabilidade. Valores acima de 1,0 achatam a distribuição — mais tokens se tornam candidatos plausíveis, produzindo saídas mais surpreendentes e variadas. Na temperatura 0, a geração se torna determinística (decodificação argmax).

**Top-K** e **Top-P** são estratégias de truncamento aplicadas após o escalonamento de temperatura. O Top-K mantém apenas os K tokens mais prováveis e redistribui a massa de probabilidade entre eles, descartando todos os outros. O Top-P (também chamado de amostragem núcleo) seleciona dinamicamente o menor conjunto de tokens cuja massa de probabilidade cumulativa atinge um limiar P, depois amostra desse conjunto. O Top-P é geralmente preferido ao Top-K porque o tamanho do conjunto de candidatos se adapta à forma da distribuição: quando o modelo está confiante, o núcleo é pequeno; quando o modelo está incerto, o núcleo se expande para incluir mais alternativas.

## Como funciona

```mermaid
flowchart LR
  L[Raw logits] -->|"divide by temperature T"| TS[Temperature-scaled logits]
  TS -->|softmax| SM[Full probability distribution]
  SM -->|"keep top-K tokens"| TK[Top-K filtered distribution]
  TK -->|"keep tokens until cumulative p ≥ P"| TP[Top-P nucleus]
  TP -->|"sample one token"| TOK[Next token]
```

Os parâmetros são aplicados sequencialmente: primeiro o escalonamento de temperatura, depois o truncamento Top-K, depois a seleção do núcleo Top-P e então a amostragem. Na prática, a maioria das APIs aplica apenas temperatura + Top-P (o padrão da OpenAI) ou temperatura + Top-K (o padrão da Anthropic); aplicar tanto Top-K quanto Top-P juntos é possível, mas incomum.

### Temperatura

A temperatura `T` divide cada logit bruto `z_i` antes da softmax: `p_i = softmax(z / T)`. Quando `T < 1`, as diferenças de logit são amplificadas — o token de maior probabilidade obtém uma parcela ainda maior da massa de probabilidade. Quando `T > 1`, as diferenças de logit encolhem — a massa de probabilidade se espalha de forma mais uniforme. Predefinições comuns: `T = 0` para tarefas de extração determinísticas, `T = 0,2–0,4` para Q&A factual, `T = 0,7–1,0` para escrita criativa, `T > 1,0` para máxima diversidade (embora a qualidade se degrade em valores extremos).

### Top-K

A amostragem Top-K restringe o conjunto de candidatos aos K tokens com maior probabilidade após o escalonamento de temperatura. Todos os tokens fora do top K recebem probabilidade zero antes da renormalização. A limitação principal é que K é fixo independentemente de como a distribuição se parece: quando o modelo está muito confiante, mesmo K=50 pode incluir muitos tokens de probabilidade quase zero que introduzem ruído; quando o modelo está incerto, um K pequeno pode cortar alternativas razoáveis. A API da Anthropic expõe `top_k` como um parâmetro direto; a API da OpenAI não o suporta nativamente.

### Top-P (amostragem núcleo)

A amostragem Top-P constrói o conjunto de candidatos dinamicamente. Começando pelo token mais provável e trabalhando para baixo, os tokens são adicionados ao núcleo até que sua probabilidade cumulativa atinja o limiar P. Apenas os tokens no núcleo são considerados para amostragem. Com `P = 0,9`, o modelo amostra de quaisquer tokens que juntos representem 90% da massa de probabilidade. Como o núcleo se contrai quando o modelo está confiante (poucos tokens dominam) e se expande quando está incerto (a massa de probabilidade está espalhada), o Top-P se adapta naturalmente ao estado interno do modelo. O Top-P é suportado pelas APIs da OpenAI (`top_p`) e da Anthropic (`top_p`).

## Quando usar / Quando NÃO usar

| Cenário | Configurações recomendadas | Evite |
|---------|---------------------------|-------|
| Q&A factual, extração de dados, classificação | `temperature=0–0,2`, `top_p=1,0` para saída quase determinística | Alta temperatura; introduz alucinações e erros de formato |
| Escrita criativa, brainstorming, ideação | `temperature=0,8–1,0`, `top_p=0,95` para saídas diversas e originais | Temperature=0; produz texto repetitivo e previsível |
| Geração de código | `temperature=0,2–0,4`, `top_p=0,95`; alguma variação ajuda a evitar ótimos locais | Temperatura > 0,8; erros de sintaxe e deriva lógica aumentam |
| Auto-consistência (múltiplos caminhos de raciocínio) | `temperature=0,6–1,0`; a diversidade é intencional | Temperature=0; todos os caminhos seriam idênticos, derrotando o propósito |
| Extração de saída estruturada (JSON, tabelas) | `temperature=0`, `top_p=1,0` para estrita aderência ao esquema | Top-P < 0,9 combinado com alta temperatura; violações de esquema aumentam |
| Diálogo / chatbots | `temperature=0,5–0,7`, `top_p=0,9`; equilibra coerência com naturalidade | Temperatura extrema em qualquer direção; muito robótico ou muito incoerente |

## Exemplos de código

### OpenAI — temperatura e Top-P

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

### Anthropic — temperatura e Top-K

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

## Recursos práticos

- [OpenAI — Referência de API: temperatura e top_p](https://platform.openai.com/docs/api-reference/chat/create) — Documentação oficial de parâmetros com intervalos válidos e padrões
- [Anthropic — Referência de API: temperatura, top_k, top_p](https://docs.anthropic.com/en/api/messages) — Referência de parâmetros da Anthropic incluindo top_k (não disponível na OpenAI)
- [O artigo sobre Amostragem Núcleo (Holtzman et al., 2020)](https://arxiv.org/abs/1904.09751) — Artigo original introduzindo Top-P / amostragem núcleo com motivação e resultados empíricos
- [Hugging Face — Estratégias de geração de texto](https://huggingface.co/docs/transformers/generation_strategies) — Guia abrangente sobre estratégias de amostragem incluindo gulosa, busca em feixe, temperatura, Top-K e Top-P
- [Lilian Weng — Geração de texto controlável](https://lilianweng.github.io/posts/2021-01-02-controllable-text-generation/) — Post de blog aprofundado cobrindo métodos de amostragem no contexto de geração controlável

## Veja também

- [Engenharia de prompts](/docs/prompt-engineering)
- [Máximo de tokens e sequências de parada](/docs/prompt-engineering/max-tokens-stop-sequences)
- [Saídas estruturadas](/docs/prompt-engineering/structured-outputs)
- [Auto-consistência](/docs/prompt-engineering/self-consistency)
- [Chain-of-thought](/docs/reasoning-patterns/cot)
- [LLMs](/docs/llms)
