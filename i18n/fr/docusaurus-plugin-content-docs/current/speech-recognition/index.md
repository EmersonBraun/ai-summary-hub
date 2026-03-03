---
title: Reconnaissance vocale
description: Converting speech to text and related audio tasks.
keywords: [speech recognition, ASR, audio]
---

# Reconnaissance vocale

## Définition

La reconnaissance vocale (ASR) transcrit l'audio en texte. Related areas include speaker identification, speech synthesis (TTS), and spoken language understanding.

Il fait le pont entre [multimodal](/docs/multimodal-ai) (audio as one modality) and [NLP](/docs/nlp) (output is text). Modern ASR is mostly end-to-end neural; self-supervised pretraining (par ex. wav2vec 2.0) reduces the need for huge labeled datasets. Deployed in voice assistants, captions, and meeting tools.

## Comment ça fonctionne

```mermaid
flowchart LR
  Audio[Audio] --> Features[Features]
  Features --> AcousticModel[Acoustic model]
  AcousticModel --> Decoder[Decoder]
  Decoder --> Text[Text]
```

**Audio** (waveform or mel spectrogram) is converted to **features** (par ex. filter banks, learned representations). An **acoustic model** (par ex. conformer, wav2vec 2.0 encoder) maps features to frame- or segment-level representations. A **decoder** (CTC, RNN-T, or attention-based) produces **text** (characters or subwords). Modern systems are often end-to-end (waveform or features → text in one model). Self-supervised pretraining on unlabeled audio (par ex. wav2vec) then fine-tuning on labeled ASR data improves robustness and reduces labeled data needs.

## Cas d'utilisation

Speech technologies apply when the input or output is audio: transcription, assistants, and speaker or synthesis systems.

- Automatic speech recognition (ASR) for transcription and captions
- Voice assistants and spoken dialogue systems
- Speaker identification and speech synthesis (TTS)

## Documentation externe

- [wav2vec 2.0 (Baevski et al.)](https://arxiv.org/abs/2006.11477)
- [Hugging Face – Audio](https://huggingface.co/docs/transformers/tasks/speech_recognition)

## Voir aussi

- [NLP](/docs/nlp)
- [Multimodal AI](/docs/multimodal-ai)
