---
title: Reconhecimento de fala
description: Converting speech to text and related audio tasks.
keywords: [speech recognition, ASR, audio]
---

# Reconhecimento de fala

## Definição

O reconhecimento de fala (ASR) transcreve áudio em texto. Related areas include speaker identification, speech synthesis (TTS), and spoken language understanding.

Ele faz a ponte entre [multimodal](/docs/multimodal-ai) (áudio como uma modalidade) e [NLP](/docs/nlp) (saída é texto). Modern ASR is mostly end-to-end neural; self-supervised pretraining (por ex. wav2vec 2.0) reduces the need for huge labeled datasets. Deployed in voice assistants, captions, and meeting tools.

## Como funciona

```mermaid
flowchart LR
  Audio[Audio] --> Features[Features]
  Features --> AcousticModel[Acoustic model]
  AcousticModel --> Decoder[Decoder]
  Decoder --> Text[Text]
```

**Audio** (waveform or mel spectrogram) is converted to **features** (por ex. filter banks, learned representations). An **acoustic model** (por ex. conformer, wav2vec 2.0 encoder) maps features to frame- or segment-level representations. A **decoder** (CTC, RNN-T, or attention-based) produces **text** (characters or subwords). Modern systems are often end-to-end (waveform or features → text in one model). Self-supervised pretraining on unlabeled audio (por ex. wav2vec) then fine-tuning on labeled ASR data improves robustness and reduces labeled data needs.

## Casos de uso

Speech technologies apply when the input or output is audio: transcription, assistants, and speaker or synthesis systems.

- Automatic speech recognition (ASR) for transcription and captions
- Voice assistants and spoken dialogue systems
- Speaker identification and speech synthesis (TTS)

## Documentação externa

- [wav2vec 2.0 (Baevski et al.)](https://arxiv.org/abs/2006.11477)
- [Hugging Face – Audio](https://huggingface.co/docs/transformers/tasks/speech_recognition)

## Veja também

- [NLP](/docs/nlp)
- [Multimodal AI](/docs/multimodal-ai)
