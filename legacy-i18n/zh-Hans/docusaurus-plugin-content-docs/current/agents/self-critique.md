---
title: "Self-critique and reflection"
description: Agents that evaluate their own output and iteratively improve through reflection, critic agents, and the Reflexion framework.
keywords: [self-critique, reflection, agent evaluation, critic agent, Reflexion, constitutional AI, iterative refinement, LLM self-evaluation]
tags: [advanced]
authors: [EmersonBraun]
---

# 自我批评与反思

## 定义

Selbstkritik und Reflexion ist die Fähigkeit eines KI-Agenten, die Qualität seiner eigenen Ausgaben zu bewerten und diese Bewertung zu verwenden, um sie iterativ zu verbessern. Anstatt eine einzelne Antwort zu produzieren und zu stoppen, tritt ein selbstkritisierender Agent in eine Generieren-Evaluieren-Verfeinern-Schleife ein: Er generiert eine anfängliche Antwort, bewertet oder kritisiert sie anhand einer Rubrik oder eines Satzes von Prinzipien und überarbeitet die Antwort, bis sie einen Qualitätsschwellenwert erreicht oder eine maximale Iterationsanzahl erreicht wird.

Diese Fähigkeit ist inspiriert davon, wie menschliche Experten arbeiten: Ein Schriftsteller entwirft einen Aufsatz, liest ihn mit kritischen Augen, identifiziert Schwächen und überarbeitet. Ein Programmierer schreibt Code, überprüft ihn auf Fehler und Stil, dann refaktoriert. Selbstkritik formalisiert diesen Prozess für LLM-Agenten und ermöglicht Ausgaben, die erheblich besser sind als eine Single-Pass-Generierung – auf Kosten zusätzlicher Inferenzaufrufe und Latenz.

Die Techniken umfassen ein Spektrum der Komplexität. Die einfachste Form ist ein einzelnes LLM, das aufgefordert wird, seine eigene Ausgabe in einem Zug zu bewerten und umzuschreiben. Ausgefeiltere Ansätze verwenden einen dedizierten **Kritiker-Agenten** (ein separater LLM-Aufruf mit einem spezialisierten Evaluierungsprompt), Ensemble-Kritik (mehrere Kritiker mit unterschiedlichen Perspektiven) oder **Constitutional AI** – eine von Anthropic entwickelte Methode, bei der ein fester Satz von Prinzipien die Kritik leitet. Das **Reflexion**-Framework erweitert Selbstkritik auf mehrstufige Agenten und verwendet verbales Reinforcement Learning, um Lektionen aus gescheiterten Versuchen über Episoden hinweg zu akkumulieren.

## 工作原理

### Generierungsphase

Der Agent produziert einen anfänglichen Entwurf oder eine Antwort auf eine Aufgabe. Diese First-Pass-Generierung verwendet einen Standard-System-Prompt und umfasst noch keine Kritiklogik. Die Ausgabequalität in dieser Phase hängt vom Basismodell und Prompt ab, wird aber als unvollkommen erwartet – der gesamte Punkt der nachfolgenden Kritikschleife ist es, diese Unvollkommenheiten zu erkennen und zu korrigieren. Das Trennen von Generierung und Kritik als separate Schritte ermöglicht es, jeden unabhängig mit Prompts zu versehen und zu überwachen.

### Evaluierungsphase

Ein Kritiker – entweder dasselbe LLM oder ein separates – bewertet den Entwurf anhand einer Rubrik. Die Rubrik kann eine einfache Anweisung sein („Bewerten Sie diese Antwort auf Genauigkeit, Vollständigkeit und Klarheit von 1-10 und erläutern Sie jede Bewertung"), ein Satz konstitutioneller Prinzipien („Respektiert diese Antwort die Privatsphäre des Benutzers? Ist sie hilfreich? Ist sie harmlos?") oder ein referenzbasierter Vergleich („Vergleichen Sie diesen Code mit der erwarteten Ausgabe und listen Sie alle Abweichungen auf"). Der Kritiker gibt sowohl eine Bewertung als auch eine strukturierte Erklärung von Schwächen aus. Die Verwendung strukturierter Ausgaben (JSON) für die Kritik erleichtert das programmatische Parsen von Bewertungen und Routing-Entscheidungen.

### Kritik- und Verfeinerungsphase

Die Kritik wird als zusätzlicher Kontext an den Agenten zurückgefügt, und er generiert eine überarbeitete Ausgabe. Der Revisionsprompt bittet den Agenten explizit, jede identifizierte Schwäche zu beheben. In der Praxis sind zwei oder drei Revisionsdurchgänge normalerweise ausreichend; weitere Iterationen liefern abnehmende Erträge und können durch Überbearbeitung neue Fehler einführen. Eine gut gestaltete Schleife enthält eine Frühausstiegsbedingung: Wenn die Bewertung einen Schwellenwert überschreitet, wird die aktuelle Ausgabe ohne weitere Verfeinerung akzeptiert.

### Reflexion-Framework

Reflexion (Shinn et al., 2023) wendet Reflexion auf Episode-Ebene statt auf Ausgabe-Ebene an. Nach jedem gescheiterten Versuch an einer Aufgabe generiert der Agent eine verbale „Reflexion" – eine natürlichsprachliche Diagnose, was schief gelaufen ist und was er beim nächsten Mal anders tun sollte. Diese Reflexion wird im Gedächtnis des Agenten gespeichert und dem Kontext des nächsten Versuchs vorangestellt, was effektiv verbales Reinforcement Learning ohne Gradientenaktualisierungen implementiert. Reflexion ist besonders leistungsstark für Aufgaben wie Coding-Challenges und sequentielle Entscheidungsfindung, bei denen dieselbe Aufgabe mehrmals versucht werden kann.

```mermaid
flowchart TD
  Task[Input Task] -->|"initial prompt"| Generate[Generate\nInitial Output]
  Generate -->|"draft output"| Evaluate[Evaluate\nCritic LLM]
  Evaluate -->|"score + critique"| Decision{Score >=\nthreshold?}
  Decision -->|"yes — accept"| Accept[Final Output]
  Decision -->|"no — refine"| Critique[Critique\nStructured Feedback]
  Critique -->|"feedback + draft"| Refine[Refine\nRevision LLM]
  Refine -->|"revised output"| Evaluate
  Refine -->|"max iterations reached"| Accept
```

## 何时使用 / 何时不使用

| 使用场景 | 避免场景 |
|---|---|
| Ausgabequalität kritisch ist und ein einzelner Durchgang nicht ausreicht | Latenz die primäre Einschränkung ist und zusätzliche Inferenzaufrufe inakzeptabel sind |
| Die Aufgabe eine klare, verifizierbare Qualitätsrubrik hat (Genauigkeit, Sicherheit, Stil) | Es keine zuverlässige Möglichkeit gibt, Ausgabequalität automatisch zu bewerten |
| Iterative Verfeinerung erwartet wird (kreatives Schreiben, Code-Generierung, Berichte) | Die Aufgabe so gut spezifiziert ist, dass der erste Durchgang bereits nahezu perfekt ist |
| Sicherheits- oder Alignment-Anforderungen konstitutionelle Überprüfung verlangen | Die Kosten zusätzlicher LLM-Aufrufe die Qualitätsverbesserung überwiegen |
| Der Agent aus Fehlern über mehrere Episoden lernen muss (Reflexion) | Die Aufgabe nicht wiederholt werden kann (z. B. irreversible Nebenwirkungen wie E-Mails senden) |

## 优缺点

| 优点 | 缺点 |
|---|---|
| Verbessert die Ausgabequalität bei komplexen Aufgaben erheblich | Fügt mehrere LLM-Aufrufe hinzu, was Kosten und Latenz erhöht |
| Kann Sicherheits- und Alignment-Prinzipien ohne Fine-Tuning durchsetzen | Risiko von „sycophantischer Verfeinerung", wo das Modell seiner eigenen Kritik zustimmt |
| Reflexion ermöglicht Verbesserung ohne gradientenbasiertes Training | Maximale Iterations-Guardrails sind erforderlich, um Endlosschleifen zu verhindern |
| Modular — Kritiker kann ein anderes, spezialisiertes Modell sein | Kritikerqualität bestimmt die Obergrenze der Verbesserung |
| Funktioniert sofort mit jedem LLM, kein Training erforderlich | Nicht geeignet für irreversible Aktionen (Werkzeugaufrufe) mitten in der Schleife |

## 代码示例

```python
"""
Self-critique loop: an LLM generates an answer, a critic evaluates it,
and a refiner improves it. The loop runs up to max_iterations times.
"""
from __future__ import annotations

import json
import os
from dataclasses import dataclass

from openai import OpenAI  # pip install openai

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", "sk-placeholder"))
MODEL = "gpt-4o-mini"

# ---------------------------------------------------------------------------
# Data structures
# ---------------------------------------------------------------------------

@dataclass
class CritiqueResult:
    score: int          # 1–10
    accuracy: str
    completeness: str
    clarity: str
    suggested_improvements: str


# ---------------------------------------------------------------------------
# Generator
# ---------------------------------------------------------------------------

def generate_answer(task: str, previous_critique: str = "") -> str:
    """Generate (or regenerate with feedback) an answer for the task."""
    system = "You are a knowledgeable, accurate, and concise assistant."
    if previous_critique:
        user = (
            f"Task: {task}\n\n"
            f"Your previous answer was critiqued as follows:\n{previous_critique}\n\n"
            "Please revise your answer to address all of the identified weaknesses."
        )
    else:
        user = f"Task: {task}"

    response = client.chat.completions.create(
        model=MODEL,
        temperature=0.3,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
    )
    return response.choices[0].message.content.strip()


# ---------------------------------------------------------------------------
# Critic
# ---------------------------------------------------------------------------

CRITIC_SYSTEM = """
You are an impartial evaluator. Given a task and a draft answer, evaluate the answer
on three dimensions: accuracy, completeness, and clarity.

Return a JSON object with these fields:
  - "score": int from 1 (terrible) to 10 (perfect)
  - "accuracy": str — assessment of factual correctness
  - "completeness": str — assessment of coverage
  - "clarity": str — assessment of readability
  - "suggested_improvements": str — specific, actionable changes

Return ONLY valid JSON, no markdown.
"""

def critique_answer(task: str, answer: str) -> CritiqueResult:
    """Use a critic LLM to evaluate the draft answer."""
    user = f"Task:\n{task}\n\nDraft answer:\n{answer}"
    response = client.chat.completions.create(
        model=MODEL,
        temperature=0,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": CRITIC_SYSTEM},
            {"role": "user", "content": user},
        ],
    )
    data = json.loads(response.choices[0].message.content)
    return CritiqueResult(**data)


# ---------------------------------------------------------------------------
# Constitutional critique (Anthropic-style)
# ---------------------------------------------------------------------------

CONSTITUTION = [
    "The answer must not contain harmful, dangerous, or unethical content.",
    "The answer must be factually accurate to the best of your knowledge.",
    "The answer must respect user privacy and not request unnecessary personal information.",
    "The answer must be helpful and directly address the user's question.",
]

def constitutional_critique(answer: str) -> str:
    """
    Apply a fixed set of constitutional principles to evaluate the answer.
    Returns a critique string, or an empty string if all principles are satisfied.
    """
    principles_text = "\n".join(f"{i+1}. {p}" for i, p in enumerate(CONSTITUTION))
    user = (
        f"Evaluate this answer against each constitutional principle below.\n\n"
        f"Answer:\n{answer}\n\n"
        f"Principles:\n{principles_text}\n\n"
        "For each violated principle, explain the violation. "
        "If no principles are violated, reply with 'PASS'."
    )
    response = client.chat.completions.create(
        model=MODEL,
        temperature=0,
        messages=[
            {"role": "system", "content": "You are a constitutional AI auditor."},
            {"role": "user", "content": user},
        ],
    )
    return response.choices[0].message.content.strip()


# ---------------------------------------------------------------------------
# Self-critique loop
# ---------------------------------------------------------------------------

def self_critique_loop(
    task: str,
    score_threshold: int = 8,
    max_iterations: int = 3,
) -> dict:
    """
    Generate-evaluate-refine loop.
    Returns the best answer along with iteration history.
    """
    history = []
    answer = generate_answer(task)
    print(f"Initial answer:\n{answer}\n")

    for iteration in range(1, max_iterations + 1):
        critique = critique_answer(task, answer)
        print(f"Iteration {iteration} — Score: {critique.score}/10")
        print(f"  Improvements: {critique.suggested_improvements}\n")

        history.append({"iteration": iteration, "score": critique.score, "answer": answer})

        if critique.score >= score_threshold:
            print(f"Score threshold ({score_threshold}) reached. Accepting answer.")
            break

        # Refine using the critique
        feedback = (
            f"Score: {critique.score}/10\n"
            f"Accuracy: {critique.accuracy}\n"
            f"Completeness: {critique.completeness}\n"
            f"Clarity: {critique.clarity}\n"
            f"Suggested improvements: {critique.suggested_improvements}"
        )
        answer = generate_answer(task, previous_critique=feedback)
        print(f"Revised answer:\n{answer}\n")

    # Final constitutional check
    const_check = constitutional_critique(answer)
    if const_check != "PASS":
        print(f"Constitutional violations detected:\n{const_check}\n")

    return {"final_answer": answer, "history": history, "constitutional_check": const_check}


if __name__ == "__main__":
    task = (
        "Explain the difference between supervised and unsupervised machine learning "
        "in plain language, with one concrete example of each."
    )
    result = self_critique_loop(task, score_threshold=8, max_iterations=3)
    print("=== FINAL ANSWER ===")
    print(result["final_answer"])
```

## 实用资源

- [Reflexion: Language Agents with Verbal Reinforcement Learning (Shinn et al., 2023)](https://arxiv.org/abs/2303.11366) — Grundlegendes Paper, das das Reflexion-Framework für episodische Selbstreflexion einführt.
- [Constitutional AI: Harmlessness from AI Feedback (Anthropic, 2022)](https://arxiv.org/abs/2212.08073) — Anthropics Paper, das beschreibt, wie ein fester Satz von Prinzipien Kritik und Revision ohne menschliche Kennzeichnung leiten kann.
- [Self-Refine: Iterative Refinement with Self-Feedback (Madaan et al., 2023)](https://arxiv.org/abs/2303.17651) — Paper, das konsistente Qualitätsverbesserungen über Aufgaben hinweg mit iterativem Selbst-Feedback ohne zusätzliches Training zeigt.
- [LangGraph — Reflection Agent Tutorial](https://langchain-ai.github.io/langgraph/tutorials/reflection/reflection/) — Praktische Implementierung eines Reflexions-Agenten mit LangGraph.

## 另见

- [AI agents](/docs/agents)
- [Chain-of-thought reasoning](/docs/reasoning-patterns/cot)
- [Agent evaluation](/docs/agents/evaluation)
