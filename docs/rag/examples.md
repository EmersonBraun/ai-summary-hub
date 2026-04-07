---
title: RAG examples
description: Example RAG pipelines and code snippets.
keywords: [RAG, examples, code, LangChain, LlamaIndex]
tags: [intermediate]
authors: [EmersonBraun]
---

# RAG examples

## Definition

This page collects concrete RAG examples: simple Q&A, document QA, and hybrid search with code you can adapt.

Each example follows the same [RAG](/docs/rag) flow (index documents, embed query, retrieve, generate) but with different frameworks or options. Use them as starting points and adjust [chunking](/docs/rag/architecture), [embeddings](/docs/rag/embeddings), and [vector store](/docs/rag/vector-databases) to your data.

## Use cases

These examples show how to get from zero to a working RAG pipeline with common frameworks and options.

- Implementing a minimal Q&A pipeline (e.g. LangChain, LlamaIndex)
- Document QA with custom chunking and embeddings
- Hybrid search (dense + keyword) for better recall

## Example: minimal RAG with LangChain

See the [RAG index](/docs/rag) for a Python snippet. More examples will be added for LlamaIndex, custom embeddings, and reranking.

## External documentation

- [LangChain – Question answering](https://python.langchain.com/docs/use_cases/question_answering/)
- [LlamaIndex – RAG tutorial](https://docs.llamaindex.ai/en/stable/getting_started/starter_example/)

## See also

- [RAG](/docs/rag)
- [RAG architecture](/docs/rag/architecture)
- [Tools: LangChain](/docs/tools/langchain)
- [Tools: LlamaIndex](/docs/tools/llamaindex)
