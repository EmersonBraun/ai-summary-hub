---
title: Chain-of-thought (CoT)
description: Step-by-step reasoning to improve LLM outputs.
keywords: [chain-of-thought, CoT, reasoning]
tags: [intermediate]
authors: [EmersonBraun]
---

# Cadeia de pensamento (CoT)

## Definição

O prompting de cadeia de pensamento (CoT) pede ao modelo para gerar etapas intermediárias de raciocínio antes da resposta final. Isso frequentemente melhora a precisão em tarefas de matemática, lógica e múltiplas etapas ao forçar o modelo a tornar seu raciocínio explícito, em vez de saltar diretamente para uma conclusão.

CoT funciona porque os modelos de linguagem são autoregressivos: cada token gerado atende a tokens anteriores. Ao gerar primeiro uma cadeia de etapas de raciocínio, o modelo essencialmente condiciona sua resposta final em um contexto mais estruturado e elaborado — reduzindo erros causados por pular etapas ou fazer suposições implícitas.

É um dos [padrões de raciocínio](/docs/reasoning-patterns) mais simples: sem ferramentas ou busca, apenas prompting. Use quando a tarefa se beneficia de etapas explícitas (ex. aritmética, dedução) e você quer evitar [ajuste fino](/docs/llms/fine-tuning). Para explorar múltiplos caminhos de solução, ver [árvore de pensamentos](/docs/reasoning-patterns/tot); para agentes que usam ferramentas, ver [ReAct](/docs/reasoning-patterns/react).

## Como funciona

### CoT sem exemplos

```mermaid
flowchart LR
  Question[Question] -->|append 'think step by step'| Prompt[Augmented prompt]
  Prompt -->|LLM generates| Steps[Step 1 → Step 2 → ...]
  Steps -->|LLM concludes| Answer[Final answer]
```

### CoT com poucos exemplos

```mermaid
flowchart LR
  Examples[Example Q+steps+A triples] -->|prepend to prompt| Prompt[Few-shot prompt]
  Prompt -->|LLM mimics format| NewSteps[New reasoning chain]
  NewSteps -->|LLM concludes| Answer[Final answer]
```

Você dá ao modelo uma **pergunta** (ou tarefa) e pede para raciocinar passo a passo. O modelo produz **Passo 1**, **Passo 2**, … (raciocínio intermediário) e então a **resposta**. **CoT sem exemplos**: adicionar "Vamos pensar passo a passo" (ou similar) ao prompt — sem necessidade de exemplos. **CoT com poucos exemplos**: incluir triplos de exemplo (pergunta, passos, resposta) para que o modelo imite o formato. O modelo gera a sequência completa em uma passagem; você pode opcionalmente analisar as etapas e verificá-las ou pontuá-las. A qualidade depende da [engenharia de prompts](/docs/prompt-engineering) e da capacidade do modelo.

## Quando usar / Quando NÃO usar

| Cenário | Usar CoT | Não usar CoT |
|---|---|---|
| Aritmética ou álgebra em múltiplas etapas | Sim — etapas intermediárias previnem erros de cálculo | Não — matemática simples de uma etapa não precisa |
| Dedução lógica ou inferência | Sim — etapas explícitas tornam o raciocínio auditável | Não — tarefas de recuperação de fatos não se beneficiam |
| Planejamento de código ou decisões de design | Sim — escrever etapas antes do código reduz bugs | Não — gerar boilerplate de um template |
| Inferência de alto volume e baixa latência | Não — tokens extras aumentam custo e latência | Sim — evitar para classificação ou extração simples |
| Modelo com raciocínio incorporado forte | Talvez — modelos mais novos raciocinam internamente (o1, o3) | Sim — forçar CoT explícito em modelos de pensamento adiciona redundância |

## Comparações

| Critério | CoT | Auto-consistência | Prompting de passo atrás |
|---|---|---|---|
| Ideia central | Cadeia de raciocínio única | Múltiplos caminhos CoT + votação majoritária | Pergunta abstrata primeiro, depois resposta |
| Confiabilidade | Moderada — um caminho pode errar | Alta — votação filtra erros | Alta — abstração reduz confusão |
| Custo (chamadas API) | 1 chamada | N chamadas (tipicamente 5–20) | 2 chamadas |
| Melhor para | Matemática, lógica, tarefas multi-etapa | Tarefas com respostas verificáveis | Questões complexas e com muito conhecimento |
| Combinabilidade | Independente ou como bloco de construção | Constrói sobre CoT | Constrói sobre CoT |

## Prós e contras

| Prós | Contras |
|---|---|
| Simples de implementar — apenas engenharia de prompts | Aumenta o comprimento de saída e o custo em tokens |
| Não precisa de ajuste fino ou treinamento especial | O modelo pode gerar etapas plausíveis mas incorretas |
| Torna o raciocínio inspecionável e depurável | Não ajuda em tarefas que precisam de informações externas |
| Funciona em muitos domínios (matemática, lógica, código) | Menor benefício em modelos pequenos vs. grandes |

## Exemplos de código

```python
from openai import OpenAI

client = OpenAI()

SYSTEM_PROMPT = (
    "You are a careful reasoning assistant. "
    "When solving problems, always show your reasoning step by step "
    "before giving the final answer."
)

def cot_query(question: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": question},
        ],
    )
    return response.choices[0].message.content

# Few-shot example
FEW_SHOT = """
Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 balls. How many does he have?
A: Roger starts with 5 balls. He buys 2 cans × 3 balls = 6 balls. Total: 5 + 6 = 11 balls.

Q: {question}
A:"""

def few_shot_cot(question: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": FEW_SHOT.format(question=question)}],
    )
    return response.choices[0].message.content

print(cot_query("A store has 40 apples. They sell 15 and receive 3 new shipments of 10. How many are left?"))
```

## Recursos práticos

- [Chain-of-Thought Prompting (Wei et al.)](https://arxiv.org/abs/2201.11903) — Artigo original que introduz o prompting CoT
- [OpenAI – Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering) — Inclui orientação sobre raciocínio e passo a passo
- [Self-consistency improves CoT (Wang et al.)](https://arxiv.org/abs/2203.11171) — Votação majoritária sobre múltiplos caminhos CoT para maior confiabilidade

## Veja também

- [Padrões de raciocínio](/docs/reasoning-patterns)
- [Árvore de pensamentos](/docs/reasoning-patterns/tot)
- [Engenharia de prompts](/docs/prompt-engineering)
- [Auto-consistência](/docs/prompt-engineering/self-consistency)
- [Prompting de passo atrás](/docs/prompt-engineering/step-back-prompting)
