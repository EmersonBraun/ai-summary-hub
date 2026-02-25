---
title: Retrieval-augmented generation (RAG)
description: Combining retrieval with LLM generation for accurate, grounded answers.
keywords: [RAG, retrieval, retrieval-augmented generation, embeddings]
---

# Retrieval-augmented generation (RAG)

## Definition

**Retrieval-augmented generation (RAG)** augments a large language model with a retrieval step: given a query, you retrieve relevant documents (from a vector store or search index), then pass them as context to the LLM to generate an answer. This reduces hallucination and keeps answers grounded in your data.

RAG is often preferred over fine-tuning when you need to **update knowledge frequently** (e.g. internal docs, support articles) without retraining, when you have **domain-specific or private data** that shouldn't be baked into weights, or when you want to **cite sources** in the model's answer. Fine-tuning is better when the desired behavior or style is stable and you can afford training and hosting.

## How it works

1. **Index:** Documents are chunked and embedded; vectors are stored in a [vector database](/docs/rag/vector-databases).
2. **Query:** The user query is embedded; the system retrieves the top-k most similar chunks (see [embeddings](/docs/rag/embeddings) and [RAG architecture](/docs/rag/architecture)).
3. **Generate:** The LLM receives the query plus retrieved text and produces the final answer.

The diagram below shows the query-time flow: **query** and **vector DB** feed into **embed** and **retrieve**; retrieved text becomes **context** and is passed with the query to the **LLM** to produce the **answer**. Indexing (chunking, embedding, storing) is done offline or incrementally; retrieval and generation run at query time. Quality depends on chunking, [embedding](/docs/rag/embeddings) choice, and how the prompt includes context.

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

## Use cases

RAG fits any application where answers must be grounded in up-to-date or private documents rather than the model’s training data.

- Customer support chatbots that answer from a knowledge base
- Internal wiki and document Q&A
- Legal or contract search and summarization
- Product and FAQ search with cited answers

## Pros and cons

| Pros | Cons |
|------|------|
| Reduces hallucination | Retrieval quality depends on chunks and embeddings |
| No need to retrain for new docs | Latency from retrieval + generation |
| Easy to update knowledge | Need good chunking and indexing strategy |

## External documentation

- [RAG paper (Lewis et al.)](https://arxiv.org/abs/2005.11401) — Original retrieval-augmented generation
- [LangChain – Question answering / RAG](https://python.langchain.com/docs/use_cases/question_answering/)
- [LlamaIndex – RAG](https://docs.llamaindex.ai/en/stable/module_guides/deploying/rag/)
- [Vertex AI – RAG and grounding](https://cloud.google.com/vertex-ai/docs/generative-ai/grounding/overview) — RAG on Google Cloud

## See also

- [RAG architecture](/docs/rag/architecture)
- [Vector databases](/docs/rag/vector-databases)
- [Embeddings](/docs/rag/embeddings)
- [LLMs](/docs/llms)
