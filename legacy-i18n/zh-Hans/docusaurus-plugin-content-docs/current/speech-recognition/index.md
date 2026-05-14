---
title: 语音识别
description: Converting speech to text and related audio tasks.
keywords: [speech recognition, ASR, audio]
---

# 语音识别

## 定义

语音识别（ASR）将音频转录为文本。 Related areas include speaker identification, speech synthesis (TTS), and spoken language understanding.

It bridges [multimodal](/docs/multimodal-ai) (audio as one modality) and [NLP](/docs/nlp) (output is text). Modern ASR is mostly end-to-end neural; self-supervised pretraining (例如 wav2vec 2.0) reduces the need for huge labeled datasets. Deployed in voice assistants, captions, and meeting tools.

## 工作原理

```mermaid
flowchart LR
  Audio[Audio] --> Features[Features]
  Features --> AcousticModel[Acoustic model]
  AcousticModel --> Decoder[Decoder]
  Decoder --> Text[Text]
```

**Audio** (waveform or mel spectrogram) is converted to **features** (例如 filter banks, learned representations). An **acoustic model** (例如 conformer, wav2vec 2.0 encoder) maps features to frame- or segment-level representations. A **decoder** (CTC, RNN-T, or attention-based) produces **text** (characters or subwords). Modern systems are often end-to-end (waveform or features → text in one model). Self-supervised pretraining on unlabeled audio (例如 wav2vec) then fine-tuning on labeled ASR data improves robustness and reduces labeled data needs.

## 应用场景

Speech technologies apply when the input or output is audio: transcription, assistants, and speaker or synthesis systems.

- Automatic speech recognition (ASR) for transcription and captions
- Voice assistants and spoken dialogue systems
- Speaker identification and speech synthesis (TTS)

## 外部文档

- [wav2vec 2.0 (Baevski et al.)](https://arxiv.org/abs/2006.11477)
- [Hugging Face – Audio](https://huggingface.co/docs/transformers/tasks/speech_recognition)

## 另请参阅

- [NLP](/docs/nlp)
- [Multimodal AI](/docs/multimodal-ai)
