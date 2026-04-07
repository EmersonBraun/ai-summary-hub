---
title: Prompt Engineering
description: Prompts gestalten, um das Verhalten von LLMs zu steuern und die Ausgabequalität zu verbessern.
keywords: [Prompt Engineering, Prompting, In-Context Learning, LLM-Konfiguration]
---

# Prompt Engineering

## Definition

Prompt Engineering ist die Praxis, Eingabetexte zu gestalten — Anweisungen, Beispiele, Einschränkungen und Kontext — um das Verhalten von Large Language Models zu steuern, ohne deren Gewichte zu verändern. Es ist die primäre Schnittstelle zwischen menschlicher Absicht und Modellausgabe und umfasst alles von einfacher Anweisungsformulierung bis hin zu ausgefeilten mehrstufigen Denkstrategien.

Die Disziplin erstreckt sich über drei miteinander verbundene Bereiche. **Konfiguration** umfasst die Sampling-Parameter (Temperature, Top-K, Top-P) und Generierungssteuerungen (Max Tokens, Stop-Sequenzen), die formen, wie das Modell Tokens erzeugt. **Techniken** beinhalten strukturierte Ansätze wie Chain-of-Thought, Self-Consistency, Step-Back Prompting und System-/Rollen-Prompting, die den Denkprozess des Modells leiten. **Zuverlässigkeit** befasst sich mit Methoden, um Ausgaben vertrauenswürdiger zu machen — Debiasing, Prompt Ensembling und Selbstevaluation.

Da LLMs zunehmend in Produktionssystemen eingesetzt werden, hat sich Prompt Engineering von ad-hoc-Experimenten zu einer systematischen Praxis entwickelt. Tools wie [DSPy](https://dspy-docs.vercel.app/) und [Automatic Prompt Engineering](/docs/prompt-engineering/automatic-prompt-engineering) automatisieren sogar Teile des Prozesses. Ob Sie einen Chatbot, einen Code-Assistenten oder eine Datenextraktionspipeline entwickeln — Prompt Engineering ist der erste und zugänglichste Hebel zur Verbesserung der Ausgabequalität.

## Funktionsweise

### Die Prompt-Pipeline

Jede Interaktion mit einem LLM beginnt mit einem Prompt — einer strukturierten Eingabe, die eine Systemnachricht, Benutzeranweisungen, Beispiele und abgerufenen Kontext enthalten kann. Das Modell verarbeitet diese Eingabe und generiert die Ausgabe Token für Token, geformt sowohl durch den Prompt-Inhalt als auch durch die Sampling-Konfiguration.

```mermaid
flowchart LR
  SM[System Message] -->|sets behavior| P[Prompt Builder]
  CTX[Context / Examples] -->|grounds output| P
  UI[User Input] -->|defines task| P
  P -->|structured input| LLM[LLM]
  CFG[Config: temp, top-p, max tokens] -->|controls sampling| LLM
  LLM -->|generated| OUT[Output]
  OUT -->|evaluated by| REL[Reliability Layer]
  REL -->|self-eval, ensembling| FINAL[Final Output]
```

### Konfiguration vs. Technik

Konfigurationsparameter (Temperature, Top-K, Top-P, Max Tokens) wirken auf der Token-Sampling-Ebene — sie beeinflussen *wie* das Modell jeden Token auswählt. Techniken (Chain-of-Thought, Self-Consistency, Step-Back) wirken auf der Prompt-Design-Ebene — sie beeinflussen *worüber* das Modell nachdenkt. Beide Ebenen interagieren: Self-Consistency erfordert hohe Temperature, um diverse Denkpfade zu erzeugen, während strukturierte Ausgabeextraktion am besten mit niedriger Temperature für Determinismus funktioniert.

### Die Zuverlässigkeitsschicht

Fortgeschrittenes Prompt Engineering fügt eine Zuverlässigkeitsschicht über dem grundlegenden Prompting hinzu. Dazu gehören das parallele Ausführen mehrerer Prompts (Ensembling), das Modell seine eigene Ausgabe kritisieren lassen (Selbstevaluation) und die Anwendung von Debiasing-Strategien zur Reduzierung systematischer Fehler. Diese Methoden tauschen Rechenkosten gegen Ausgabequalität und sind besonders wichtig in hochriskanten Anwendungen.

## Praktische Ressourcen

- [OpenAI — Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering) — Umfassender Leitfaden zu Best Practices und Strategien
- [Anthropic — Prompt Design](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — Anthropics offizielle Prompting-Dokumentation
- [Learn Prompting](https://learnprompting.org/) — Open-Source-Kurs zu Prompt Engineering Techniken
- [Prompt Engineering Guide (DAIR.AI)](https://www.promptingguide.ai/) — Community-gepflegter Leitfaden mit Papieren und Techniken
- [DSPy Dokumentation](https://dspy-docs.vercel.app/) — Framework für programmatische Prompt-Optimierung

## Siehe auch

- [Temperature, Top-K, Top-P](/docs/prompt-engineering/temperature-top-k-top-p)
- [Max Tokens und Stop-Sequenzen](/docs/prompt-engineering/max-tokens-stop-sequences)
- [Strukturierte Ausgaben](/docs/prompt-engineering/structured-outputs)
- [System-, Rollen- und kontextuelles Prompting](/docs/prompt-engineering/system-role-contextual-prompting)
- [Self-Consistency](/docs/prompt-engineering/self-consistency)
- [Step-Back Prompting](/docs/prompt-engineering/step-back-prompting)
- [Automatic Prompt Engineering (APE)](/docs/prompt-engineering/automatic-prompt-engineering)
- [Debiasing-Techniken](/docs/prompt-engineering/debiasing-techniques)
- [Prompt Ensembling](/docs/prompt-engineering/prompt-ensembling)
- [Selbstevaluation und Kalibrierung](/docs/prompt-engineering/self-evaluation-calibration)
- [LLMs](/docs/llms)
- [Chain-of-Thought](/docs/reasoning-patterns/cot)
- [RAG](/docs/rag)
- [KI-Agenten](/docs/agents)
