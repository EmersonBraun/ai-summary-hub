---
title: Streaming (LLMs)
description: Token-by-token output for lower perceived latency and better UX.
keywords: [streaming, token streaming, SSE, chat UX]
tags: [intermediate]
authors: [EmersonBraun]
---

# Streaming (LLMs)

## Definition

Streaming means returning [LLM](/docs/llms) output **token by token** (or chunk by chunk) as it is generated, instead of waiting for the full response. Users see text appear incrementally, which lowers **perceived latency** and improves chat and assistant [use cases](/docs/llms).

It is supported by most LLM APIs (OpenAI, Anthropic, Gemini, open-source servers like vLLM) via Server-Sent Events (SSE) or similar protocols. The same [prompt engineering](/docs/prompt-engineering) and [RAG](/docs/rag) or [agents](/docs/agents) patterns apply; only the response delivery is incremental.

## How it works

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

The **client** sends a request with the prompt (and optional [RAG](/docs/rag) context or tool results). The **server** runs the model autoregressively and, instead of buffering the full output, **pushes** each new token (or a small chunk of tokens) to the client as soon as it is generated. The client **renders** tokens as they arrive (e.g. in a chat UI). Connection stays open until the model emits an end-of-sequence token or the client stops the stream.

## Use cases

Streaming is the default for chat and any interactive use where users expect to see progress immediately.

- Chat UIs and assistants where text should appear as it is generated
- Long-form generation (summaries, code) to show progress and allow early cancellation
- Reducing perceived latency when full response would take several seconds

## External documentation

- [OpenAI – Streaming](https://platform.openai.com/docs/api-reference/streaming)
- [Anthropic – Streaming](https://docs.anthropic.com/en/api/streaming)
- [vLLM – Streaming](https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html#streaming)

## See also

- [LLMs](/docs/llms)
- [Prompt engineering](/docs/prompt-engineering)
- [Local inference](/docs/local-inference)
