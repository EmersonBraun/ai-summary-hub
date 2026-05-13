---
title: Case study — BART
description: Predecesor codificador-decodificador de Gemini; preentrenamiento con eliminación de ruido para resumen y generación.
keywords: [BART, encoder-decoder, denoising, summarization]
tags: [intermediate]
authors: [EmersonBraun]
---

# Case study: BART

## Definición

BART (Bidirectional and Auto-Regressive Transformers) es un modelo **codificador-decodificador** [transformer](/docs/transformers) de Meta (Facebook AI). Se preentrena con objetivos de eliminación de ruido (p. ej., eliminación de tokens, enmascaramiento, permutación de oraciones) y se ajusta para resumen, traducción y generación condicional.

BART representa una generación anterior de grandes modelos secuencia a secuencia; [Gemini](/docs/case-studies/gemini) de Google y otros [LLMs](/docs/llms) modernos se basan en arquitecturas diferentes (solo decodificador, multimodal) pero comparten el objetivo de un sólido entendimiento y generación de texto. Caso de uso: resumen, respuesta a preguntas y generación de texto condicional donde la estructura codificador-decodificador es beneficiosa.

## Cómo funciona

**Codificador**: un codificador bidireccional similar a [BERT](/docs/transformers/bert) procesa la secuencia de origen. **Decodificador**: un decodificador causal (autorregresivo) atiende la salida del codificador y las posiciones anteriores del decodificador para generar el destino. **Preentrenamiento**: se corrompe la entrada (se enmascara, elimina, permuta) y se entrena al modelo para reconstruir el original — este objetivo de eliminación de ruido aprende representaciones robustas. **Ajuste fino**: se añade una cabeza específica de tarea o se utiliza la salida de secuencia para resumen (p. ej., CNN/DailyMail), traducción o respuesta a preguntas. Inferencia: codificar el origen y luego decodificar token por token.

## Casos de uso

Los modelos codificador-decodificador de estilo BART son adecuados para tareas de generación condicional y comprensión con un origen y un destino claros.

- Resumen de documentos y diálogos
- Generación condicional (p. ej., completar oraciones, datos a texto)
- Ajuste fino para NLU y generación específicos de dominio

## Documentación externa

- [BART: Denoising Sequence-to-Sequence Pre-training (Lewis et al.)](https://arxiv.org/abs/1910.13461)
- [Hugging Face – BART](https://huggingface.co/docs/transformers/model_doc/bart)

## Ver también

- [Transformers](/docs/transformers)
- [BERT](/docs/transformers/bert)
- [Gemini](/docs/case-studies/gemini)
