---
title: Geração aumentada por recuperação (RAG)
description: Geração aumentada por recuperação de conhecimento externo.
keywords: [RAG, recuperação, recuperação-augmented generation, embeddings]
---

# Geração aumentada por recuperação (RAG)

## Definição

A **geração aumentada por recuperação (RAG)** amplia um grande modelo de linguagem com uma etapa de recuperação: given a query, you retrieve relevant documents (from a vector store or search index), then pass them as context to the LLM to generate an answer. Isso reduz alucinações e mantém as respostas fundamentadas nos seus dados.

RAG é frequentemente preferido ao fine-tuning quando é necessário **atualizar o conhecimento frequentemente** (por ex. documentos internal docs, support articles) sem retreinar, when you have **domain-specific or private data** that shouldn't be baked into weights, or when you want to **cite sources** in the model's answer. Fine-tuning is better when the desired behavior or style is stable and you can afford training and hosting.

## Como funciona

1. **Index:** Documents are chunked and embedded; vectors are stored in a [vector database](/docs/rag/vector-databases).
2. **Consulta:** A consulta do usuário é incorporada; o sistema recupera os top-k fragmentos mais similares (veja [embeddings](/docs/rag/embeddings) and [RAG architecture](/docs/rag/architecture)).
3. **Gerar:** O LLM recebe a consulta mais o texto recuperado e produz a resposta final.

O diagrama abaixo mostra o fluxo em tempo de consulta: **consulta** e **banco de dados vetorial** alimentam **embed** e **recuperar**; texto recuperado text becomes **context** and is passed with the query to the **LLM** to produce the **answer**. Indexing (chunking, embedding, storing) is done offline or incrementally; recuperação and generation run at query time. Quality depends on chunking, [embedding](/docs/rag/embeddings) choice, and how the prompt includes context.

```mermaid
flowchart LR
  Q[Query] --> E1[Embed]
  E1 --> R[Retrieve]
  D[(Vector DB)] --> R
  R --> C[Context]
  Q --> C
  C --> LLM[LLM]
  LLM --> A[Answer]
```

### Simple RAG pipeline (Python)

```python
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# Index documents (one-time or incremental)
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(documents, embeddings)

# Query
query = "What is RAG?"
docs = vectorstore.similarity_search(query, k=4)
context = "\n\n".join(d.page_content for d in docs)

prompt = ChatPromptTemplate.from_messages([
    ("system", "Answer using only the context below.\n\n{context}"),
    ("human", "{question}"),
])
llm = ChatOpenAI(model="gpt-4")
chain = prompt | llm
answer = chain.invoke({"context": context, "question": query})
```

## Casos de uso

RAG fits any application where answers must be grounded in up-to-date or private documents rather than the model’s training data.

- Customer support chatbots that answer from a knowledge base
- Internal wiki and document Q&A
- Legal or contract search and summarization
- Product and FAQ search with cited answers

## Vantagens e desvantagens

| Pros | Cons |
|------|------|
| Reduces hallucination | Retrieval quality depends on chunks and embeddings |
| No need to retrain for new docs | Latency from recuperação + generation |
| Easy to update knowledge | Need good chunking and indexing strategy |

## Documentação externa

- [RAG paper (Lewis et al.)](https://arxiv.org/abs/2005.11401) — Original recuperação-augmented generation
- [LangChain – Question answering / RAG](https://python.langchain.com/docs/use_cases/question_answering/)
- [LlamaIndex – RAG](https://docs.llamaindex.ai/en/stable/module_guides/deploying/rag/)
- [Vertex AI – RAG and grounding](https://cloud.google.com/vertex-ai/docs/generative-ai/grounding/overview) — RAG on Google Cloud

## Veja também

- [RAG architecture](/docs/rag/architecture)
- [Vector databases](/docs/rag/vector-databases)
- [Embeddings](/docs/rag/embeddings)
- [LLMs](/docs/llms)
