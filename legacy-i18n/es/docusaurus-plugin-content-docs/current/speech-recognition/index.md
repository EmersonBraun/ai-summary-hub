---
title: Reconocimiento de voz
description: Conversión de voz a texto y tareas de audio relacionadas.
keywords: [reconocimiento de voz, ASR, audio]
tags: [intermediate]
authors: [EmersonBraun]
---

# Reconocimiento de voz

## Definición

El reconocimiento de voz (ASR) transcribe audio a texto. Las áreas relacionadas incluyen identificación del hablante, síntesis de voz (TTS) y comprensión del lenguaje hablado.

Sirve de puente entre [multimodal](/docs/multimodal-ai) (audio como una modalidad) y [NLP](/docs/nlp) (la salida es texto). El ASR moderno es mayormente de extremo a extremo neuronal; el preentrenamiento autosupervisado (como wav2vec 2.0) reduce la necesidad de grandes conjuntos de datos etiquetados. Se despliega en asistentes de voz, subtítulos y herramientas de reuniones.

## Cómo funciona

```mermaid
flowchart LR
  Audio[Audio] --> Features[Características]
  Features --> AcousticModel[Modelo acústico]
  AcousticModel --> Decoder[Decodificador]
  Decoder --> Text[Texto]
```

El **audio** (forma de onda o espectrograma mel) se convierte en **características** (como bancos de filtros, representaciones aprendidas). Un **modelo acústico** (como conformer, codificador wav2vec 2.0) mapea las características a representaciones a nivel de fotograma o segmento. Un **decodificador** (CTC, RNN-T o basado en atención) produce **texto** (caracteres o subpalabras). Los sistemas modernos a menudo son de extremo a extremo (forma de onda o características → texto en un modelo). El preentrenamiento autosupervisado en audio no etiquetado (como wav2vec) seguido de ajuste fino en datos ASR etiquetados mejora la robustez y reduce las necesidades de datos etiquetados.

## Casos de uso

Las tecnologías de voz aplican cuando la entrada o salida es audio: transcripción, asistentes y sistemas de hablante o síntesis.

- Reconocimiento automático de voz (ASR) para transcripción y subtítulos
- Asistentes de voz y sistemas de diálogo hablado
- Identificación del hablante y síntesis de voz (TTS)

## Recursos prácticos

- [wav2vec 2.0 (Baevski et al.)](https://arxiv.org/abs/2006.11477)
- [Hugging Face – Audio](https://huggingface.co/docs/transformers/tasks/speech_recognition)

## Ver también

- [NLP](/docs/nlp)
- [IA multimodal](/docs/multimodal-ai)
