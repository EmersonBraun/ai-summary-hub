---
title: Spracherkennung
description: Converting speech to text and related audio tasks.
keywords: [speech recognition, ASR, audio]
---

# Spracherkennung

## Definition

Spracherkennung (ASR) transkribiert Audio in Text. Related areas include speaker identification, speech synthesis (TTS), and spoken language understanding.

Es überbrückt [multimodal](/docs/multimodal-ai) (audio as one modality) and [NLP](/docs/nlp) (output is text). Modern ASR is mostly end-to-end neural; self-supervised pretraining (z. B. wav2vec 2.0) reduces the need for huge labeled datasets. Deployed in voice assistants, captions, and meeting tools.

## Funktionsweise

```mermaid
flowchart LR
  Audio[Audio] --> Features[Features]
  Features --> AcousticModel[Acoustic model]
  AcousticModel --> Decoder[Decoder]
  Decoder --> Text[Text]
```

**Audio** (waveform or mel spectrogram) is converted to **features** (z. B. filter banks, learned representations). An **acoustic model** (z. B. conformer, wav2vec 2.0 encoder) maps features to frame- or segment-level representations. A **decoder** (CTC, RNN-T, or attention-based) erzeugt **text** (characters or subwords). Modern systems werden oft end-to-end (waveform or features → text in one model). Self-supervised pretraining on unlabeled audio (z. B. wav2vec) then Feinabstimmung on labeled ASR data improves robustness and reduces labeled data needs.

## Anwendungsfälle

Speech technologies gelten, wenn the input or output is audio: transcription, assistants, and speaker or synthesis systems.

- Automatic speech recognition (ASR) for transcription and captions
- Voice assistants and spoken dialogue systems
- Speaker identification and speech synthesis (TTS)

## Externe Dokumentation

- [wav2vec 2.0 (Baevski et al.)](https://arxiv.org/abs/2006.11477)
- [Hugging Face – Audio](https://huggingface.co/docs/transformers/tasks/speech_recognition)

## Siehe auch

- [NLP](/docs/nlp)
- [Multimodal AI](/docs/multimodal-ai)
