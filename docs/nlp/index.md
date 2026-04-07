---
title: Natural language processing (NLP)
description: AI for understanding and generating human language.
keywords: [NLP, language, text, transformers]
tags: [beginner]
---

# Natural language processing (NLP)

## Definition

NLP covers tasks on text: classification, NER, QA, summarization, translation, and generation. Modern NLP is dominated by pretrained [transformers](/docs/transformers) (BERT, GPT, etc.) and [LLMs](/docs/llms).

Inputs are discrete (tokens); models learn from large corpora and are then adapted via [fine-tuning](/docs/llms/fine-tuning) or [prompting](/docs/llms/prompt-engineering). [RAG](/docs/rag) and [agents](/docs/agents) add retrieval and tools on top of NLP models for grounded QA and task completion.

## How it works

```mermaid
flowchart LR
  Text[Text] --> Tokenize[Tokenize]
  Tokenize --> Model[Model]
  Model --> TaskOutput[Task output]
```

**Text** is **tokenized** (split into subwords or words) and optionally normalized. The **model** (e.g. BERT, GPT) processes token IDs through embeddings and [transformer](/docs/transformers) layers to produce contextual representations. A **task output** head (e.g. classifier, span predictor, or next-token decoder) maps those to the final prediction. Models are pretrained on large corpora (masked LM or next-token prediction), then fine-tuned or prompted for downstream tasks. Pipelines often combine tokenization, embedding, and task-specific heads; [LLMs](/docs/llms) can do many tasks with a single model and the right prompt.

## Use cases

NLP applies to any product or pipeline that needs to understand or generate text at scale.

- Machine translation, summarization, and question answering
- Named entity recognition, sentiment analysis, and text classification
- Chatbots, code generation, and document understanding

## External documentation

- [Hugging Face – NLP course](https://huggingface.co/learn/nlp-course/)
- [Stanford CS224N – NLP with Deep Learning](http://web.stanford.edu/class/cs224n/)

## See also

- [Transformers](/docs/transformers)
- [LLMs](/docs/llms)
- [RAG](/docs/rag)
