---
title: Explainable AI (XAI)
description: KI-Entscheidungen interpretierbar und erklärbar machen.
keywords: [Explainable AI, XAI, Interpretierbarkeit]
tags: [beginner]
authors: [EmersonBraun]
---

# Explainable AI (XAI)

## Definition

Explainable AI (XAI) ist die Menge von Methoden und Praktiken, die das Verhalten von Machine-Learning-Modellen für Menschen verständlich machen — identifizieren, welche Eingaben oder Features eine Entscheidung getrieben haben, die interne Logik eines Modells aufzeigen oder natürlichsprachliche Begründungen erzeugen, auf die nicht-technische Stakeholder reagieren können. Das Ziel ist nicht nur zu beschreiben, was ein Modell getan hat, sondern Erklärungen zu liefern, die dem tatsächlichen Reasoning des Modells treu sind und für die Person nützlich sind, die sie erhält: ein Prüfer, der auf Bias prüft, ein Arzt, der eine Diagnose validiert, oder ein Benutzer, der eine Kreditentscheidung anfechtet.

Erklärungen können **global** sein (das allgemeine Modellverhalten beschreiben — welche Features generell am wichtigsten sind) oder **lokal** (eine spezifische Vorhersage erklären — warum wurde dieser spezielle Kredit abgelehnt?). Sie können **post-hoc** sein (nach dem Training auf ein bestehendes Modell angewendet, wie SHAP oder LIME) oder **intrinsisch** (Modelle, die von Natur aus interpretierbar sind, wie lineare Modelle, Entscheidungsbäume oder regelbasierte Systeme). Die post-hoc vs. intrinsische Unterscheidung ist wichtig: Post-hoc-Erklärungen sind flexibel und auf jedes Modell anwendbar, erfassen aber möglicherweise nicht vollständig den tatsächlichen Mechanismus des Modells; intrinsische Modelle sind treuer, aber oft weniger ausdrucksstark.

XAI ist ein kritischer Enabler für [KI-Sicherheits](/docs/ai-safety)-Audits und [Bias-in-KI](/docs/bias-in-ai)-Untersuchungen. Es ist in regulierten Domänen gesetzlich vorgeschrieben oder stark empfohlen — unter dem EU-KI-Gesetz und DSGVO haben Personen, die von automatisierten Entscheidungen betroffen sind, das Recht auf eine sinnvolle Erklärung. Da [LLMs](/docs/llms) und [Agenten](/docs/agents) fähiger werden, ist die Herausforderung, emergentes Verhalten und mehrstufiges Reasoning zu erklären, eine aktive Forschungsgrenze.

## Funktionsweise

### Feature-Attributionsmethoden

Feature-Attributionsmethoden weisen jedem Eingabe-Feature Wichtigkeitswerte für eine gegebene Vorhersage zu. SHAP (SHapley Additive exPlanations) verwendet kooperative Spieltheorie, um den Beitrag jedes Features fair zu verteilen und Konsistenz und lokale Genauigkeit zu garantieren. LIME (Local Interpretable Model-agnostic Explanations) passt ein einfaches interpretierbares Modell um die Nachbarschaft einer einzelnen Vorhersage an. Beide funktionieren mit jedem Modelltyp, können aber voneinander und vom wahren Modellmechanismus abweichen.

### Visuelle und Attention-basierte Erklärungen

```mermaid
flowchart LR
  Input[Eingabe: Text oder Bild] -->|Forward Pass| Model[Black-Box-Modell]
  Model -->|Vorhersage| Output[Vorhersage]
  Output -->|Attributionsmethode| Explainer[Explainer: SHAP / LIME / Attention]
  Explainer -->|Wichtigkeitswerte| Visualization[Erklärungsvisualisierung]
  Visualization -->|überprüfen| Stakeholder[Prüfer / Benutzer / Entwickler]
```

Für Vision-Modelle heben Saliency Maps und GradCAM Bildbereiche hervor, die eine Vorhersage am meisten beeinflusst haben. Für Sprachmodelle zeigen Attention-Gewichte, welchen Token das Modell Aufmerksamkeit gewidmet hat; obwohl Attention nicht immer eine zuverlässige Erklärung des kausalen Reasonings ist, wird sie weitgehend zum Debuggen verwendet.

### Inhärent interpretierbare Modelle

Lineare Modelle, logistische Regression, Entscheidungsbäume und Regellisten sind inhärent interpretierbar: Ihre Logik kann direkt aus Modellparametern abgelesen werden. Wenn Interpretierbarkeit paramount ist — zum Beispiel bei klinischen Risikobewertungen oder regulierten Kreditmodellen — könnten diese einfacheren Modelle auch auf Kosten einiger Vorhersagegenauigkeit bevorzugt werden.

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|----------|------------|
| Regulierte Domäne Erklärungen für automatisierte Entscheidungen erfordert (Kredit, Einstellung, Gesundheitswesen) | Das Modell geringes Risiko hat, keinen individuellen Einfluss hat und keine regulatorischen Anforderungen hat |
| Modellversagen oder unerwartetes Verhalten debuggen | Erklärungsaufwand inakzeptable Produktionslatenz einführen würde |
| Benutzer eine Modellentscheidung verstehen oder anfechten müssen | Das Modell eine inhärent interpretierbare Baseline ist, die keine separate Erklärung benötigt |
| Auf Bias oder Sicherheitsprobleme vor oder nach der Bereitstellung prüfen | Die Erklärungsmethode, auf die Sie zugreifen können, für Ihren Modelltyp als unzuverlässig bekannt ist |

## Vergleiche

| Methode | Typ | Modell-agnostisch | Umfang | Treue |
|--------|------|---------------|-------|---------|
| SHAP | Post-hoc | Ja | Lokal + Global | Hoch (mathematisch begründet) |
| LIME | Post-hoc | Ja | Lokal | Moderat (lokale Approximation) |
| GradCAM | Post-hoc | Nein (gradient-basiert) | Lokal (Vision) | Moderat |
| Attention | Post-hoc | Nein (transformer-spezifisch) | Lokal | Variabel |
| Entscheidungsbaum | Intrinsisch | Nicht anwendbar | Global | Perfekt (Modell IST die Erklärung) |

## Vor- und Nachteile

| Vorteile | Nachteile |
|------|------|
| Unterstützt die Einhaltung von DSGVO und EU-KI-Gesetz Recht auf Erklärung | Post-hoc-Erklärungen spiegeln möglicherweise nicht den wahren Modellmechanismus wider |
| Ermöglicht Bias-Erkennung durch Attribution von Entscheidungen auf geschützte Proxys | Erklärungen können manipuliert werden, um fair auszusehen, auch wenn das Modell es nicht ist |
| Baut Benutzervertrauen auf und unterstützt Anfechtbarkeit | Inhärent interpretierbare Modelle opfern oft Vorhersagekraft |
| Erleichtert Model-Debugging und iterative Verbesserung | Das Erklären emergenten Verhaltens in LLMs und tiefen Netzen bleibt ein offenes Problem |

## Code-Beispiele

### SHAP Feature-Attribution für einen tabellarischen Klassifikator (Python)

```python
import shap
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.datasets import make_classification

# Train a simple classifier
X, y = make_classification(n_samples=500, n_features=10, random_state=42)
feature_names = [f"feature_{i}" for i in range(X.shape[1])]

model = GradientBoostingClassifier(n_estimators=50, random_state=42)
model.fit(X, y)

# Compute SHAP values for the test set
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X[:10])

# Show feature importances for the first prediction
print("SHAP values for prediction 0 (positive class):")
for name, value in sorted(
    zip(feature_names, shap_values[0]),
    key=lambda x: abs(x[1]),
    reverse=True,
):
    print(f"  {name}: {value:+.4f}")
```

## Praktische Ressourcen

- [Interpretable Machine Learning (Molnar)](https://interpretable.ml/) — Umfassendes kostenloses Online-Buch zu allen wichtigen XAI-Methoden
- [SHAP Dokumentation](https://shap.readthedocs.io/) — Offizielle Docs, Tutorials und Visualisierungsgalerie
- [LIME GitHub](https://github.com/marcotcr/lime) — Originale LIME-Implementierung mit Beispielen
- [Google – What-If Tool](https://pair-code.github.io/what-if-tool/) — Interaktive visuelle Erkundung von Modell-Fairness und Erklärungen
- [Explainability for Large Language Models (Umfrage)](https://arxiv.org/abs/2309.01029) — Aktuelle Umfrage zu XAI-Methoden für LLMs

## Siehe auch

- [KI-Sicherheit](/docs/ai-safety)
- [Bias in KI](/docs/bias-in-ai)
