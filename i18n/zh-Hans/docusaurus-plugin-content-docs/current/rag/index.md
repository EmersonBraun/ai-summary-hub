---
title: 检索增强生成 (RAG)
description: 通过检索外部知识增强生成。
keywords: [RAG, 检索, 检索-augmented generation, embeddings]
---

# 检索增强生成 (RAG)

## 定义

**检索增强生成（RAG）**通过检索步骤增强大语言模型: given a query, you retrieve relevant documents (from a vector store or search index), then pass them as context to the LLM to generate an answer. 这减少了幻觉并使答案基于您的数据。

RAG 当需要以下情况时，通常比微调更受欢迎 **频繁更新知识** (例如 internal docs, support articles) 无需重新训练, when you have **domain-specific or private data** that shouldn't be baked into weights, or when you want to **cite sources** in the model's answer. Fine-tuning is better when the desired behavior or style is stable and you can afford training and hosting.

## 工作原理

1. **Index:** Documents are chunked and embedded; vectors are stored in a [vector database](/docs/rag/vector-databases).
2. **查询：**用户查询被嵌入；系统检索 top-k 个最相似的块（参见 [embeddings](/docs/rag/embeddings) and [RAG architecture](/docs/rag/architecture)).
3. **生成：**LLM 接收查询和检索到的文本并生成最终答案。

下图显示了查询时的流程：**查询**和**向量数据库**输入到**嵌入**和**检索**；检索到的 text becomes **context** and is passed with the query to the **LLM** to produce the **answer**. Indexing (chunking, embedding, storing) is done offline or incrementally; 检索 and generation run at query time. Quality depends on chunking, [embedding](/docs/rag/embeddings) choice, and how the prompt includes context.

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

## 应用场景

RAG fits any application where answers must be grounded in up-to-date or private documents rather than the model’s training data.

- Customer support chatbots that answer from a knowledge base
- Internal wiki and document Q&A
- Legal or contract search and summarization
- Product and FAQ search with cited answers

## 优缺点

| Pros | Cons |
|------|------|
| Reduces hallucination | Retrieval quality depends on chunks and embeddings |
| No need to retrain for new docs | Latency from 检索 + generation |
| Easy to update knowledge | Need good chunking and indexing strategy |

## 外部文档

- [RAG paper (Lewis et al.)](https://arxiv.org/abs/2005.11401) — Original 检索-augmented generation
- [LangChain – Question answering / RAG](https://python.langchain.com/docs/use_cases/question_answering/)
- [LlamaIndex – RAG](https://docs.llamaindex.ai/en/stable/module_guides/deploying/rag/)
- [Vertex AI – RAG and grounding](https://cloud.google.com/vertex-ai/docs/generative-ai/grounding/overview) — RAG on Google Cloud

## 另请参阅

- [RAG architecture](/docs/rag/architecture)
- [Vector databases](/docs/rag/vector-databases)
- [Embeddings](/docs/rag/embeddings)
- [LLMs](/docs/llms)
