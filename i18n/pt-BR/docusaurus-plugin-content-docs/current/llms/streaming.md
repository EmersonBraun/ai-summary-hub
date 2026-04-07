---
title: Streaming (LLMs)
description: Streaming de tokens em tempo real de LLMs.
keywords: [streaming, token streaming, SSE, chat UX]
---

# Streaming (LLMs)

## Definição

Streaming significa retornar a saída do [LLM](/docs/llms) **token por token** (ou fragmento por fragmento) conforme é gerada, em vez de of waiting for the full response. Users see text appear incrementally, which lowers **perceived latency** and improves chat and assistant [use cases](/docs/llms).

É supported by most LLM APIs (OpenAI, Anthropic, Gemini, open-source servers like vLLM) via Server-Sent Events (SSE) or similar protocols. The same [prompt engineering](/docs/prompt-engineering) and [RAG](/docs/rag) or [agents](/docs/agents) patterns apply; only the response delivery is incremental.

## Como funciona

```mermaid
sequenceDiagram
  participant Client
  participant Server
  Client->>Server: Request (prompt)
  loop Each token
    Server->>Client: Token / chunk (stream)
  end
  Server->>Client: [done]
```

O **cliente** envia uma requisição com o prompt (e contexto [RAG](/docs/rag) ou resultados de ferramentas opcionais). O **servidor** euns the model autoregressively and, instead of buffering the full output, **pushes** each new token (or a small chunk of tokens) to the client as soon as it is generated. The client **renders** tokens as they arrive (por ex. in a chat UI). Connection stays open until the model emits an end-of-sequence token or the client stops the stream.

## Casos de uso

Streaming is the default for chat and any interactive use where users expect to see progress immediately.

- Chat UIs and assistants where text should appear as it is generated
- Long-form generation (summaries, code) to show progress and allow early cancellation
- Reducing perceived latency when full response would take several seconds

## Documentação externa

- [OpenAI – Streaming](https://platform.openai.com/docs/api-reference/streaming)
- [Anthropic – Streaming](https://docs.anthropic.com/en/api/streaming)
- [vLLM – Streaming](https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html#streaming)

## Veja também

- [LLMs](/docs/llms)
- [Prompt engineering](/docs/prompt-engineering)
- [Local inference](/docs/local-inference)
