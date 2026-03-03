---
title: Exemples de RAG
description: Exemples pratiques d'implémentation de RAG.
keywords: [RAG, examples, code, LangChain, LlamaIndex]
---

# Exemples de RAG

## Définition

Cette page rassemble des exemples concrets de RAG: simple Q&A, document QA, and hybrid search with code you can adapt.

Each example follows the same [RAG](/docs/rag) flow (index documents, embed query, retrieve, generate) but with different frameworks or options. Use them as starting points and adjust [chunking](/docs/rag/architecture), [embeddings](/docs/rag/embeddings), and [vector store](/docs/rag/vector-databases) to your data.

## Cas d'utilisation

These examples show how to get from zero to a working RAG pipeline with common frameworks and options.

- Implementing a minimal Q&A pipeline (par ex. LangChain, LlamaIndex)
- Document QA with custom chunking and embeddings
- Hybrid search (dense + keyword) for better recall

## Example: minimal RAG with LangChain

See the [RAG index](/docs/rag) for a Python snippet. More examples will be added for LlamaIndex, custom embeddings, and reranking.

## Documentation externe

- [LangChain – Question answering](https://python.langchain.com/docs/use_cases/question_answering/)
- [LlamaIndex – RAG tutorial](https://docs.llamaindex.ai/en/stable/getting_started/starter_example/)

## Voir aussi

- [RAG](/docs/rag)
- [RAG architecture](/docs/rag/architecture)
- [Tools: LangChain](/docs/tools/langchain)
- [Tools: LlamaIndex](/docs/tools/llamaindex)
