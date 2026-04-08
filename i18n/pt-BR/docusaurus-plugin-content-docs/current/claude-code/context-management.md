---
title: Gerenciamento de contexto
description: Como o Claude Code gerencia a janela de contexto em sessões longas — compressão automática, estratégias de histórico de conversas e técnicas práticas para manter as sessões eficazes em escala.
keywords: [gerenciamento de contexto, janela de contexto, histórico de conversas, /clear, compressão de contexto, limites de tokens, sessões do Claude Code, sessões longas]
tags: [intermediate]
authors: [EmersonBraun]
---

# Gerenciamento de contexto

## Definição

Gerenciamento de contexto refere-se às estratégias e mecanismos que o Claude Code usa para manter as conversas eficazes dentro dos limites finitos da janela de contexto do modelo. Todo modelo tem uma janela de contexto máxima — o número total de tokens que pode processar em uma única requisição — e essa janela deve acomodar o prompt de sistema, definições de ferramentas, o histórico completo da conversa (mensagens do usuário, respostas do assistente, chamadas de ferramentas e resultados de ferramentas) e qualquer conteúdo de arquivo carregado durante a sessão. Quando o contexto acumulado se aproxima do limite, algo deve ceder: ou conteúdo antigo é comprimido ou descartado, ou a sessão deve ser reiniciada.

Entender o gerenciamento de contexto é particularmente importante para sessões longas do Claude Code. Uma sessão de depuração direta pode consumir a janela de contexto inteira após 30-50 turnos, especialmente se o Claude lê múltiplos arquivos grandes, executa comandos com saída verbose ou acumula muitas rodadas de chamadas de ferramentas. Desenvolvedores não familiarizados com os limites de contexto podem notar que o Claude começa a "esquecer" decisões anteriores, dar respostas inconsistentes ou parecer confuso sobre o contexto anterior — esses são sintomas de pressão de contexto, não falhas do modelo.

O Claude Code aborda os limites de contexto por meio de uma combinação de mecanismos automáticos (compressão de contexto, carregamento seletivo de arquivos) e estratégias controladas pelo usuário (o comando `/clear`, escopo focado de tarefas, CLAUDE.md para convenções persistentes). O gerenciamento eficaz de contexto não é apenas evitar erros — é projetar sessões que se mantenham precisas e nítidas do início ao fim, mantendo as informações mais relevantes na janela ativa em todos os momentos.

## Como funciona

### Estrutura da janela de contexto

A janela de contexto é dividida em várias zonas, cada uma contribuindo para a contagem total de tokens. A **zona do prompt de sistema** contém instruções do CLAUDE.md e definições de ferramentas — estas são relativamente estáveis e podem ser armazenadas em cache (veja cache de prompts). A **zona do histórico de conversas** cresce a cada turno: cada mensagem do usuário, resposta do assistente, chamada de ferramenta e resultado de ferramenta adiciona tokens. A **zona de conteúdo de arquivos** contém o código-fonte real e os conteúdos de arquivos que o Claude leu durante a sessão. À medida que a sessão avança, as zonas de histórico de conversas e de conteúdo de arquivos crescem até se aproximarem do limite do modelo.

### Compressão automática de contexto

Quando o Claude Code detecta que a janela de contexto está se aproximando do seu limite, ele aplica compressão automática ao histórico de conversas. O algoritmo de compressão identifica turnos mais antigos com menor probabilidade de serem necessários para a tarefa atual e os resume ou trunca. Resultados de ferramentas — especialmente os grandes, como listagens de diretórios ou conteúdos longos de arquivos — são comprimidos preferencialmente porque contêm dados brutos que o modelo já processou. O objetivo é preservar o fio lógico da conversa enquanto descarta o conteúdo literal de turnos mais antigos. Os usuários podem notar resumos comprimidos aparecendo no lugar de trocas detalhadas anteriores.

### Carregamento seletivo de arquivos

O Claude Code não pré-carrega todos os arquivos do projeto no contexto ao início da sessão. Em vez disso, usa uma estratégia de carregamento just-in-time: os arquivos são lidos com a ferramenta `Read` ou `Glob` somente quando o Claude determina que são relevantes para a tarefa atual. Isso mantém o contexto inicial pequeno e focado. No entanto, à medida que a sessão avança e o Claude lê mais arquivos, os conteúdos de arquivos se acumulam no contexto. Para bases de código muito grandes, o Claude pode precisar reler arquivos específicos em vez de manter todos os arquivos lidos anteriormente na janela ativa.

### O comando /clear

O comando `/clear` descarta todo o histórico de conversas e inicia uma sessão nova. É a forma mais agressiva de gerenciamento de contexto — equivalente a fechar e reabrir o terminal. Use-o entre tarefas não relacionadas, após concluir uma funcionalidade importante, ou quando a deriva de contexto (informações contraditórias ou desatualizadas no histórico) estiver causando comportamento confuso. As instruções do CLAUDE.md e a configuração do projeto sobrevivem ao `/clear` porque são recarregadas do sistema de arquivos no início de cada sessão.

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

## Quando usar / Quando NÃO usar

| Usar quando | Evitar quando |
|---|---|
| Iniciando uma nova tarefa não relacionada — use `/clear` para começar com um contexto limpo | O histórico de conversas contém decisões ou descobertas críticas que você ainda precisa |
| A sessão está rodando por muitos turnos e o Claude parece confuso — a deriva de contexto é um sinal | Você está no meio de uma tarefa de múltiplas etapas onde o contexto anterior é ativamente necessário |
| Você está carregando arquivos muito grandes — considere `/clear` primeiro e carregue apenas o que a tarefa atual precisa | A sessão é curta e a pressão de contexto ainda não é uma preocupação |
| Você quer avaliar a qualidade das respostas — um contexto fresco fornece uma base de referência limpa | Você depende do CLAUDE.md para contexto do projeto — `/clear` o preserva, mas o contexto específico da sessão é perdido |
| Você está escrevendo um CLAUDE.md que captura o contexto importante do projeto para sobreviver ao `/clear` | A "confusão" é na verdade uma limitação do modelo não relacionada ao contexto — mais contexto não ajudará |

## Exemplos de código

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

## Recursos práticos

- [Contexto e memória do Claude Code](https://docs.anthropic.com/en/docs/claude-code/memory) — Guia oficial sobre como o Claude Code gerencia o contexto, incluindo /clear e CLAUDE.md para memória persistente.
- [Janelas de contexto dos modelos Claude](https://docs.anthropic.com/en/docs/about-claude/models) — Limites de tokens para cada variante de modelo Claude.
- [Documentação de cache de prompts](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) — Como armazenar em cache porções de contexto estáveis para reduzir custo e latência em sessões longas.
- [Referência de CLI do Claude Code](https://docs.anthropic.com/en/docs/claude-code/cli-reference) — Lista completa de comandos slash incluindo /clear e /compact.

## Veja também

- [Visão geral do Claude Code](/docs/claude-code)
- [Cache de prompts](/docs/claude-code/prompt-caching)
- [Configuração CLAUDE.md](/docs/claude-code/claude-md)
