---
title: Speech recognition
description: Converting speech to text and related audio tasks.
keywords: [speech recognition, ASR, audio]
---

# Speech recognition

## Definition

Speech recognition (ASR) transcribes audio into text. Related areas include speaker identification, speech synthesis (TTS), and spoken language understanding.

It bridges [multimodal](/docs/multimodal-ai) (audio as one modality) and [NLP](/docs/nlp) (output is text). Modern ASR is mostly end-to-end neural; self-supervised pretraining (e.g. wav2vec 2.0) reduces the need for huge labeled datasets. Deployed in voice assistants, captions, and meeting tools.

## How it works

```mermaid
flowchart LR
  Audio[Audio] --> Features[Features]
  Features --> AcousticModel[Acoustic model]
  AcousticModel --> Decoder[Decoder]
  Decoder --> Text[Text]
```

**Audio** (waveform or mel spectrogram) is converted to **features** (e.g. filter banks, learned representations). An **acoustic model** (e.g. conformer, wav2vec 2.0 encoder) maps features to frame- or segment-level representations. A **decoder** (CTC, RNN-T, or attention-based) produces **text** (characters or subwords). Modern systems are often end-to-end (waveform or features → text in one model). Self-supervised pretraining on unlabeled audio (e.g. wav2vec) then fine-tuning on labeled ASR data improves robustness and reduces labeled data needs.

## Use cases

Speech technologies apply when the input or output is audio: transcription, assistants, and speaker or synthesis systems.

- Automatic speech recognition (ASR) for transcription and captions
- Voice assistants and spoken dialogue systems
- Speaker identification and speech synthesis (TTS)

## External documentation

- [wav2vec 2.0 (Baevski et al.)](https://arxiv.org/abs/2006.11477)
- [Hugging Face – Audio](https://huggingface.co/docs/transformers/tasks/speech_recognition)

## See also

- [NLP](/docs/nlp)
- [Multimodal AI](/docs/multimodal-ai)
