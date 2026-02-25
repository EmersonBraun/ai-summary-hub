---
title: LlamaIndex
description: Data framework for LLM applications and RAG.
keywords: [LlamaIndex, RAG, data layer]
---

# LlamaIndex

## Definition

LlamaIndex focuses on connecting [LLMs](/docs/llms) to your data: ingestion, indexing, and querying. It provides flexible [RAG](/docs/rag) pipelines, multiple index types, and evaluation tools.

It complements [LangChain](/docs/tools/langchain): LlamaIndex emphasizes the **data layer** (documents, [embeddings](/docs/rag/embeddings), [vector stores](/docs/rag/vector-databases), indexing strategies). Use it when your priority is robust RAG over your own docs, APIs, or databases, with control over chunking, retrieval, and synthesis. Also supports [agents](/docs/agents) and query engines.

## How it works

**Load** data from documents, APIs, or databases into a unified document format. **Build indices**: vector index ([embeddings](/docs/rag/embeddings) + [vector store](/docs/rag/vector-databases)), keyword index, or hybrid; you choose node parsers (chunking), embedding model, and index type. **Query engines** run retrieval (optionally with reranking) and then **synthesis** (the LLM answers from retrieved nodes). You can customize retrievers, node parsers, and response synthesis (e.g. tree summarization, simple concatenation). **Evaluation** tools (e.g. faithfulness, relevance) help tune chunking and retrieval for production [RAG](/docs/rag). Agents can use LlamaIndex query engines as tools inside [LangChain](/docs/tools/langchain) or native agent loops.

## Use cases

LlamaIndex fits when you need flexible RAG indexing, query engines, and evaluation over your own data and APIs.

- RAG and document Q&A with flexible indexing and query engines
- Connecting LLMs to internal data (docs, APIs, databases)
- Evaluating and tuning retrieval and synthesis for production RAG

## External documentation

- [LlamaIndex documentation](https://docs.llamaindex.ai/)
- [LlamaIndex – RAG](https://docs.llamaindex.ai/en/stable/module_guides/deploying/rag/)
- [LlamaIndex – Agents](https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/)

## See also

- [RAG](/docs/rag)
- [LangChain](/docs/tools/langchain)
- [Vector databases](/docs/rag/vector-databases)
