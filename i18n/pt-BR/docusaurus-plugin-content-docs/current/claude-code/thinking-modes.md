---
title: Modos de raciocínio e esforço
description: Extended thinking no Claude Code — o que é, como os níveis de esforço afetam a profundidade do raciocínio versus velocidade, e como configurar o comportamento de raciocínio para diferentes tipos de tarefas.
keywords: [extended thinking, modos de raciocínio, níveis de esforço, raciocínio Claude, tokens de orçamento, tokens de pensamento, raciocínio profundo, Claude Code]
tags: [intermediate]
authors: [EmersonBraun]
---

# Modos de raciocínio e esforço

## Definição

Extended thinking é uma funcionalidade dos modelos Claude que permite ao modelo raciocinar sobre um problema passo a passo em um bloco de rascunho interno dedicado antes de produzir sua resposta final. Ao contrário da saída visível, esse processo de raciocínio é projetado para a deliberação interna do modelo — ele faz emergir conclusões intermediárias, avalia alternativas, detecta seus próprios erros e constrói em direção a uma resposta bem considerada. O resultado são respostas mais precisas em tarefas complexas, melhor fundamentadas em problemas ambíguos e menos suscetíveis a erros superficiais de correspondência de padrões.

No Claude Code, o extended thinking se manifesta como uma configuração de **nível de esforço** que controla quanto trabalho computacional o modelo realiza antes de responder. Respostas de baixo esforço são rápidas e apropriadas para tarefas simples e não ambíguas (formatar código, explicar uma função curta). Respostas de alto esforço investem mais orçamento de raciocínio e são mais adequadas para decisões arquiteturais complexas, sessões de depuração difíceis ou tarefas onde erros são custosos. A troca é sempre velocidade versus profundidade: mais raciocínio leva mais tempo e consome mais tokens.

É importante distinguir o extended thinking do chain-of-thought prompting. Chain-of-thought pede ao modelo que mostre seu trabalho na saída — o raciocínio é parte do texto de resposta. Extended thinking, por outro lado, acontece em um bloco `thinking` separado que o modelo processa internamente. Em sessões do Claude Code, você pode às vezes observar blocos `<thinking>` na saída bruta da API, embora a interface do Claude Code normalmente exiba apenas a resposta final. O raciocínio interno não está sujeito às mesmas restrições que a saída e é otimizado para qualidade de raciocínio em vez de legibilidade.

## Como funciona

### Blocos de raciocínio e tokens de orçamento

Quando o extended thinking está habilitado, o modelo recebe um parâmetro adicional: `budget_tokens`. Este inteiro especifica o número máximo de tokens que o modelo pode usar para seu raciocínio interno antes de produzir a resposta final. Um orçamento de 1.000 tokens permite uma breve deliberação; um orçamento de 10.000 tokens permite análise profunda e multi-etapas. O modelo nem sempre usa seu orçamento completo — ele para de raciocinar quando chega a uma conclusão satisfatória. Definir o orçamento mais alto que o necessário adiciona latência sem ganhos de qualidade proporcionais; o orçamento correto depende da complexidade da tarefa.

### Níveis de esforço no Claude Code

O Claude Code traduz o conceito abstrato de tokens de orçamento em níveis de esforço nomeados que são mais fáceis de raciocinar:

- **Baixo esforço (padrão para tarefas simples)**: orçamento mínimo de raciocínio, respostas rápidas, apropriado para formatação de código, explicações simples, edições de arquivo único e operações de busca.
- **Esforço médio**: orçamento moderado de raciocínio, o padrão para a maioria das sessões de codificação interativas; equilibra velocidade e qualidade para tarefas típicas de desenvolvimento.
- **Alto esforço / máximo**: grande orçamento de raciocínio, reservado para tarefas complexas — depuração de problemas difíceis de reproduzir, design de sistemas, análise de implicações de segurança ou qualquer tarefa onde uma resposta errada seria custosa de corrigir.

### Quando o modelo raciocina

Nem toda resposta aciona o extended thinking. O Claude Code usa heurísticas para determinar quando raciocínio adicional é justificado com base em sinais de complexidade da tarefa: o comprimento e ambiguidade da requisição, o número de arquivos envolvidos, se a tarefa envolve fazer mudanças irreversíveis e se o usuário solicitou explicitamente uma análise cuidadosa. Os usuários também podem sinalizar o esforço desejado explicitamente adicionando frases como "pense cuidadosamente sobre isso" ou "tome seu tempo" em suas requisições — estas são reconhecidas pelo modelo como sinais para investir mais orçamento de raciocínio.

### Streaming e latência

O extended thinking interage com o streaming de forma previsível: o modelo começa a transmitir sua saída visível somente após completar seu raciocínio interno. Isso significa que requisições de alto esforço têm uma pausa inicial mais longa antes que a saída comece, mas o primeiro token de conteúdo real chega completamente formado em vez de incrementalmente incerto. Na CLI do Claude Code e integrações de IDE, isso aparece como um breve indicador "pensando..." antes que a resposta comece. Para sessões interativas, esse atraso geralmente vale a pena para tarefas complexas; para loops de feedback apertados, manter o esforço baixo é preferível.

```mermaid
flowchart LR
  Request[User request] -->|complexity signals| Effort[Effort level selected]
  Effort -->|budget_tokens set| Think[Internal thinking block]
  Think -->|reasoning complete| Draft[Draft response]
  Draft -->|self-review| Final[Final response streamed]
  Final -->|delivered to| User[Developer]
```

## Quando usar / Quando NÃO usar

| Usar quando | Evitar quando |
|---|---|
| Depurando um erro complexo e difícil de reproduzir com muitas causas raízes possíveis | Pedindo um simples one-liner ou uma correção de sintaxe rápida — baixo esforço é mais rápido e suficiente |
| Projetando ou revisando uma arquitetura de sistema com trade-offs significativos | Sessões interativas de vai-e-vem onde cada turno é um pequeno passo — a latência se acumula |
| Analisando implicações de segurança de uma mudança de código antes de fazer merge | Gerando boilerplate ou scaffolding que segue padrões bem estabelecidos |
| Tarefas onde uma resposta errada exigiria retrabalho significativo | Executando em pipelines de CI onde determinismo e velocidade importam mais que profundidade de raciocínio |
| Qualquer tarefa que você daria a um engenheiro sênior conhecido por "pensar antes de codificar" | Você está trabalhando sob restrições apertadas de orçamento de tokens — tokens de raciocínio contam contra seu uso |

## Prós e contras

| | Prós | Contras |
|---|---|---|
| **Alto esforço** | Melhor precisão em tarefas complexas; detecta casos extremos; produz explicações bem fundamentadas | Maior latência; mais tokens consumidos; pausa mais longa antes do primeiro token de saída |
| **Baixo esforço** | Respostas rápidas; bom para loops interativos apertados; menor custo de tokens | Pode perder casos extremos em tarefas complexas; pode produzir análise superficial em problemas ambíguos |
| **Esforço automático** | Sem configuração necessária; modelo se calibra à complexidade da tarefa | Comportamento menos previsível; pode sub-investir em tarefas genuinamente difíceis que parecem simples |

## Exemplos de código

```bash
# Claude Code CLI — signaling desired effort level through natural language

# Low effort (fast): simple, well-defined tasks
> Format this function to match our Prettier config

# Medium effort (default): typical coding tasks
> Refactor the UserService class to use dependency injection

# High effort: complex tasks — add "think carefully", "take your time", or "analyze deeply"
> Think carefully: this WebSocket handler occasionally drops messages under high load.
  Analyze all the possible race conditions and ordering issues in src/ws/handler.ts
  before suggesting a fix.

# High effort: architectural decisions
> Take your time to analyze the trade-offs between using Redis Pub/Sub versus
  a message queue like RabbitMQ for our notification service. Consider our
  current scale (10k concurrent users) and the team's operational experience.

# High effort: security review
> Analyze src/auth/jwt.ts carefully for security vulnerabilities. Think through
  all the attack vectors — token forgery, replay attacks, expiry bypass —
  before giving me your assessment.
```

```json
// Claude Code settings.json — configuring default thinking behavior
// Located at: ~/.claude/settings.json or .claude/settings.json in project root
{
  "thinking": {
    "defaultEffort": "medium",
    "maxBudgetTokens": 8000,
    "enableForComplexTasks": true
  }
}
```

```python
# Using extended thinking directly via the Anthropic API (for custom integrations)
import anthropic

client = anthropic.Anthropic()

# High-effort request: complex architectural question
response = client.messages.create(
    model="claude-opus-4-5",
    max_tokens=16000,
    # thinking block enables extended reasoning; budget_tokens controls depth
    thinking={
        "type": "enabled",
        "budget_tokens": 10000  # allow up to 10k tokens of internal reasoning
    },
    messages=[{
        "role": "user",
        "content": (
            "Analyze the following database schema for potential performance issues "
            "at 1M+ rows. Consider indexing strategies, query patterns, and normalization "
            "trade-offs. Schema: [paste schema here]"
        )
    }]
)

# The response content may include both thinking blocks and text blocks
for block in response.content:
    if block.type == "thinking":
        # Internal reasoning — useful for debugging model behavior
        print(f"[THINKING]: {block.thinking[:200]}...")
    elif block.type == "text":
        # Final response — the part to show the user
        print(f"[RESPONSE]: {block.text}")

# Low-effort request: simple, fast task (thinking disabled or minimal budget)
quick_response = client.messages.create(
    model="claude-haiku-4-5",  # Haiku for fast, simple tasks
    max_tokens=1024,
    # No thinking block for simple requests — faster and cheaper
    messages=[{
        "role": "user",
        "content": "Convert this array of objects to a Map keyed by id: [{id: 1, name: 'a'}, {id: 2, name: 'b'}]"
    }]
)
print(quick_response.content[0].text)
```

## Recursos práticos

- [Documentação de extended thinking — Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) — Referência completa sobre blocos de raciocínio, tokens de orçamento, comportamento de streaming e parâmetros de API.
- [Cookbook de extended thinking](https://github.com/anthropics/anthropic-cookbook/tree/main/extended_thinking) — Notebooks práticos demonstrando extended thinking para tarefas de raciocínio complexas.
- [Comparação de modelos Claude](https://docs.anthropic.com/en/docs/about-claude/models) — Detalhes da ficha do modelo incluindo quais modelos suportam extended thinking e suas capacidades relativas.
- [Referência de configurações do Claude Code](https://docs.anthropic.com/en/docs/claude-code/settings) — Onde configurar níveis de esforço padrão e comportamento de raciocínio no Claude Code.

## Veja também

- [Visão geral do Claude Code](/docs/claude-code)
- [Cache de prompts](/docs/claude-code/prompt-caching)
- [Gerenciamento de contexto](/docs/claude-code/context-management)
