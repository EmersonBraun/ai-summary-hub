---
title: LangChain
description: Framework pour applications et agents LLM.
keywords: [LangChain, chains, agents, RAG]
---

# LangChain

## Définition

LangChain est un framework for building [LLM](/docs/llms) applications: chains, [agents](/docs/agents), tools, and [RAG](/docs/rag) pipelines. It abstracts providers, prompts, and récupération for quick prototyping and production.

Il complète [LlamaIndex](/docs/tools/llamaindex) (which emphasizes les données et l'indexation); LangChain emphasizes chaînes composables et boucles d'agents. Utilisez-le quand you need [RAG](/docs/rag), [agents](/docs/agents) with tools, or multi-step [prompt](/docs/prompt-engineering) workflows with minimal glue code.

## Comment ça fonctionne

On **compose** des composants : LLM (OpenAI, Anthropic, local, etc.), [prompts](/docs/prompt-engineering), récupérateurs ([vector stores](/docs/rag/vector-databases), [embeddings](/docs/rag/embeddings)), and tools (APIs, search, code). **Chains** wire them in sequence (par ex. prompt → LLM → parser). **Agents** add a loop: LLM decides which tool to call, you execute it and append the result, repeat until the LLM returns a final answer. LangSmith provides tracing and evaluation. Integrations cover many [vector databases](/docs/rag/vector-databases), document loaders, and tool APIs. Start with a template (par ex. RAG, agent) and swap or add components as needed.

## Cas d'utilisation

LangChain is used to assemble LLM apps quickly: RAG, agents, and workflows with minimal boilerplate.

- Building RAG pipelines and document Q&A applications
- Implementing agents with tools (search, APIs, code)
- Rapid prototyping of LLM workflows with minimal boilerplate

## Documentation externe

- [LangChain documentation](https://python.langchain.com/docs/)
- [LangChain – Agents](https://python.langchain.com/docs/concepts/agents/)
- [LangChain – Question answering / RAG](https://python.langchain.com/docs/use_cases/question_answering/)

## Voir aussi

- [RAG](/docs/rag)
- [Agents](/docs/agents)
- [LlamaIndex](/docs/tools/llamaindex)
