---
title: Reconnaissance vocale
description: Conversion de la parole en texte et tâches audio connexes.
keywords: [speech recognition, ASR, audio]
tags: [beginner]
authors: [EmersonBraun]
---

# Reconnaissance vocale

## Définition

La reconnaissance vocale, formellement connue sous le nom de Reconnaissance Automatique de la Parole (ASR), est la technologie qui convertit l'audio parlé en texte écrit. C'est l'un des domaines les plus anciens et les plus matures commercialement de l'IA, alimentant désormais les assistants vocaux, les sous-titres en direct, la transcription de réunions, l'analyse des centres d'appels et les outils d'accessibilité. Au-delà de la transcription, le domaine de la parole englobe l'identification du locuteur (qui parle ?), la compréhension du langage parlé (SLU, extraction d'intention et d'entités à partir de la parole), et la synthèse vocale — texte-à-parole (TTS) — qui est la tâche inverse de génération d'audio au son naturel à partir du texte.

Les systèmes ASR modernes sont principalement des modèles de neurones de bout en bout. Le paradigme dominant est passé des systèmes de pipeline traditionnels (modèle acoustique → modèle de langage → décodeur, chacun entraîné séparément) aux modèles de bout en bout comme Whisper (OpenAI) et wav2vec 2.0 (Meta), qui apprennent à mapper l'audio brut ou les spectrogrammes directement en texte dans un seul modèle. Le pré-entraînement auto-supervisé sur de grands corpus audio non étiquetés — apprendre des représentations sans étiquettes de transcription — a considérablement réduit les données étiquetées nécessaires pour atteindre une haute précision sur diverses langues et accents. Des modèles comme Whisper, entraîné sur 680 000 heures d'audio multilingue, fonctionnent bien en zero-shot sur des langues pour lesquelles il n'a pas été explicitement optimisé.

La reconnaissance vocale se situe à l'intersection de l'[IA multimodale](/docs/multimodal-ai) (l'audio est une modalité distincte du texte et de la vision) et du [NLP](/docs/nlp) (la sortie de l'ASR est du texte qui alimente la compréhension du langage en aval). Les défis incluent les environnements bruyants, la parole avec accent, le vocabulaire spécifique au domaine, l'alternance codique (mélanger les langues en milieu de phrase) et le coût de calcul de l'inférence en streaming en temps réel. La diarisation du locuteur — segmenter qui a parlé quand — est une tâche étroitement liée souvent combinée avec l'ASR dans les applications de réunion ou de centre d'appels.

## Comment ça fonctionne

### Extraction de caractéristiques

L'audio brut (une forme d'onde échantillonnée à 16 kHz ou plus) est converti en une représentation de caractéristiques. Les systèmes traditionnels calculent les coefficients cepstraux de fréquence mel (MFCC) ou les caractéristiques de banque de filtres. Les modèles de bout en bout modernes comme Whisper acceptent des spectrogrammes mel calculés avec une transformée de Fourier à court terme ; wav2vec 2.0 apprend des représentations directement à partir des formes d'onde brutes en utilisant un encodeur de caractéristiques CNN.

### Modélisation acoustique et décodage

```mermaid
flowchart LR
  Waveform[Forme d'onde audio] -->|STFT / banque de filtres mel| Spectrogram[Spectrogramme mel]
  Spectrogram -->|CNN ou encodeur conformer| AcousticRep[Représentations acoustiques]
  AcousticRep -->|pré-entraînement auto-supervisé| Pretrained[Encodeur pré-entraîné]
  Pretrained -->|affiner sur données ASR étiquetées| AcousticModel[Modèle acoustique]
  AcousticModel -->|décodeur CTC / attention| Tokens[Tokens de sous-mots]
  Tokens -->|rescore modèle de langage| Text[Transcription finale]
```

### Stratégies de décodage

Trois architectures de décodage principales existent. **CTC (Classification Temporelle Connectionniste)** aligne les tokens de sortie avec les trames sans nécessiter d'étiquettes d'alignement explicites, permettant un décodage rapide et capable de streaming. **RNN-T (Transducteur de Réseau de Neurones Récurrent)** étend CTC avec un réseau de prédiction, permettant une inférence en streaming avec une forte modélisation du langage. **L'encodeur-décodeur basé sur l'attention** (utilisé dans Whisper) traite l'audio complet avec un encodeur et génère des tokens autoregressivement avec un décodeur, produisant la précision la plus élevée mais nécessitant l'audio complet en amont.

## Quand utiliser / Quand NE PAS utiliser

| Utiliser quand | Éviter quand |
|----------|------------|
| L'entrée est de l'audio parlé et la sortie doit être du texte (transcription, sous-titres, commandes vocales) | La qualité audio est si mauvaise que même les transcripteurs humains ne peuvent pas comprendre |
| Construction d'interfaces vocales ou d'outils d'accessibilité | Une interface texte uniquement est plus simple et répond aux besoins des utilisateurs |
| Traitement des enregistrements de réunions ou de l'audio de centres d'appels à grande échelle | Les exigences de latence en temps réel sont incompatibles avec l'inférence encodeur-décodeur |
| L'identification ou la diarisation du locuteur est nécessaire avec la transcription | Le vocabulaire du domaine est si spécialisé que les modèles généraux nécessitent une adaptation coûteuse |

## Comparaisons

| Modèle / approche | Forces | Limites |
|-----------------|-----------|-------------|
| Whisper (OpenAI) | Multilingue, robuste, zero-shot | Pas natif pour le streaming ; plus lent pour le temps réel |
| wav2vec 2.0 | Auto-supervisé, peu de données étiquetées | Affinement nécessaire par domaine/langue |
| Google Cloud Speech-to-Text | API prête pour la production, streaming | Propriétaire, coût par minute |
| HMM-DNN traditionnel | Bien compris, streaming | Nécessite une ingénierie de caractéristiques extensive ; précision moindre |

## Avantages et inconvénients

| Avantages | Inconvénients |
|------|------|
| Technologie mature avec de solides options open-source et cloud | La précision se dégrade avec le bruit, les accents ou les termes spécifiques au domaine |
| Le pré-entraînement auto-supervisé réduit les besoins en données étiquetées | Le streaming en temps réel ajoute de la latence et de la complexité |
| Permet des fonctionnalités d'accessibilité à grande échelle | La diarisation du locuteur et la parole qui se chevauche restent des problèmes difficiles |
| Les modèles multilingues couvrent des centaines de langues | Les grands modèles sont coûteux à exécuter sur l'appareil ou en périphérie |

## Exemples de code

### Transcription avec OpenAI Whisper (Python)

```python
import whisper

# Charger le modèle (options : tiny, base, small, medium, large-v3)
model = whisper.load_model("base")

# Transcrire un fichier audio
result = model.transcribe("meeting.mp3", language="fr", word_timestamps=True)

print(f"Transcription :\n{result['text']}\n")

# Afficher les horodatages au niveau des mots
for segment in result["segments"]:
    for word_info in segment.get("words", []):
        start = word_info["start"]
        end = word_info["end"]
        word = word_info["word"]
        print(f"  [{start:.2f}s - {end:.2f}s] {word}")
```

## Ressources pratiques

- [Article wav2vec 2.0 (Baevski et al., 2020)](https://arxiv.org/abs/2006.11477) — Apprentissage de représentation vocale auto-supervisée fondamental
- [Article Whisper (Radford et al., 2022)](https://arxiv.org/abs/2212.04356) — Reconnaissance vocale robuste via supervision faible à grande échelle
- [Hugging Face – Cours audio](https://huggingface.co/learn/audio-course/) — Cours pratique couvrant ASR, TTS et classification
- [OpenAI Whisper GitHub](https://github.com/openai/whisper) — Whisper open-source avec des exemples d'utilisation
- [NVIDIA NeMo – Speech AI](https://docs.nvidia.com/nemo-framework/user-guide/latest/nemotoolkit/asr/intro.html) — Framework ASR et TTS de qualité production

## Voir aussi

- [NLP](/docs/nlp)
- [IA multimodale](/docs/multimodal-ai)
