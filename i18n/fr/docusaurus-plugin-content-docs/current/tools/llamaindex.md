---
title: LlamaIndex
description: Framework de données pour applications LLM et RAG.
keywords: [LlamaIndex, RAG, data layer]
---

# LlamaIndex

## Définition

LlamaIndex focuses on connecting [LLMs](/docs/llms) to your data: ingestion, indexing, and querying. It provides flexible [RAG](/docs/rag) pipelines, multiple index types, and evaluation tools.

Il complète [LangChain](/docs/tools/langchain): LlamaIndex emphasizes the **data layer** (documents, [embeddings](/docs/rag/embeddings), [vector stores](/docs/rag/vector-databases), indexing strategies). Utilisez-le quand your priority is robust RAG over your own docs, APIs, or databases, with control over chunking, récupération, and synthesis. Also supports [agents](/docs/agents) and query engines.

## Comment ça fonctionne

**Charger** des données depuis des documents, APIs ou bases de données dans un format de document unifié. **Construire des index** : index vectoriel ([embeddings](/docs/rag/embeddings) + [vector store](/docs/rag/vector-databases)), keyword index, or hybrid; you choose node parsers (chunking), embedding model, and index type. **Query engines** run récupération (optionally with reranking) and then **synthesis** (the LLM answers from retrieved nodes). You can customize retrievers, node parsers, and response synthesis (par ex. tree summarization, simple concatenation). **Evaluation** tools (par ex. faithfulness, relevance) help tune chunking and récupération for production [RAG](/docs/rag). Agents can use LlamaIndex query engines as tools inside [LangChain](/docs/tools/langchain) or native agent loops.

## Cas d'utilisation

LlamaIndex fits when you need flexible RAG indexing, query engines, and evaluation over your own data and APIs.

- RAG and document Q&A with flexible indexing and query engines
- Connecting LLMs to internal data (docs, APIs, databases)
- Evaluating and tuning récupération and synthesis for production RAG

## Documentation externe

- [LlamaIndex documentation](https://docs.llamaindex.ai/)
- [LlamaIndex – RAG](https://docs.llamaindex.ai/en/stable/module_guides/deploying/rag/)
- [LlamaIndex – Agents](https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/)

## Voir aussi

- [RAG](/docs/rag)
- [LangChain](/docs/tools/langchain)
- [Vector databases](/docs/rag/vector-databases)
