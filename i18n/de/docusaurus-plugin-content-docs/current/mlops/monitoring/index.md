---
title: ML-Monitoring
description: Umfassender Leitfaden zum Monitoring von Machine-Learning-Modellen in der Produktion, mit Concept Drift, Data Drift, Modellverfall, Metriken, Alerting-Strategien und Werkzeugen.
keywords: [ML-Monitoring, Concept Drift, Data Drift, Modellverfall, Modellverschlechterung, Evidently AI, WhyLabs, Alerting, Produktions-ML]
tags: [intermediate]
authors: [EmersonBraun]
---

# ML-Monitoring

## Definition

ML-Monitoring ist die Praxis der kontinuierlichen Beobachtung von Machine-Learning-Modellen und der Daten, auf denen sie nach dem Deployment operieren. Anders als traditionelle Software, die entweder funktioniert oder einen Fehler wirft, kann ein Modell still degradieren: Es erzeugt weiterhin Ausgaben, aber diese Ausgaben werden zunehmend falsch, wenn sich die Welt verändert. ML-Monitoring liefert die Frühwarnsysteme, die diese Degradation erkennen, bevor sie geschäftlichen Schaden verursacht.

Drei Phänomene treiben den größten Teil der Modell-Degradation in der Produktion an. **Concept Drift** tritt auf, wenn sich die statistische Beziehung zwischen Eingabe-Features und der Zielvariable ändert — beispielsweise wird ein Betrugserkenungs-Modell, das vor dem Auftreten eines neuen Angriffsvektors trainiert wurde, das neue Muster systematisch übersehen. **Data Drift** (auch Covariate Shift genannt) tritt auf, wenn sich die Verteilung der Eingabe-Features ändert, ohne eine entsprechende Änderung der Zielbeziehung — saisonale Muster, demografische Verschiebungen und Änderungen in vorgelagerten Datenpipelines verursachen alle Data Drift. **Modellverfall** ist der kumulative Leistungsverlust, der aus einem oder beiden dieser Drifts resultiert; unkontrolliert manifestiert er sich als steigende Fehlerquoten, sinkende Einnahmen und verschlechterte Benutzererfahrungen.

Effektives ML-Monitoring umfasst drei Schichten: **Datenqualitäts-Monitoring** (Schema, Null-Raten, Wertebereiche), **Distributions-Monitoring** (statistische Tests auf Drift in Features und Vorhersagen) und **Modellleistungs-Monitoring** (Geschäfts- und ML-Metriken, berechnet gegen Ground Truth, wenn Labels verfügbar sind). Die Kombination aller drei Schichten bietet Defense-in-Depth — Probleme frühzeitig, an ihrer Quelle und in ihrer nachgelagerten Wirkung erkennen.

## Funktionsweise

### Daten- und Vorhersagesammlung

Jede Vorhersageanfrage durchläuft eine instrumentierte Serving-Schicht, die Eingaben, Ausgaben, Zeitstempel und Metadaten in einem zentralisierten Store (Objektspeicher, ein Data Warehouse oder eine Streaming-Plattform wie Kafka) protokolliert. Referenzdatensätze — typischerweise der Trainings- oder Validierungsdatensatz — werden zusammen mit Produktionslogs gespeichert, um als statistische Baseline für Drift-Berechnungen zu dienen. Label-Pipelines nehmen verzögerte Ground-Truth-Labels entgegen (Labels kommen oft Stunden oder Wochen nach der Vorhersage an) und verbinden sie mit den protokollierten Vorhersagen.

### Drift-Erkennung

Drift-Detektoren vergleichen die aktuelle Produktionsverteilung mit der Referenz-Baseline mithilfe statistischer Tests. Für kontinuierliche Features messen der Population Stability Index (PSI), der Kolmogorov-Smirnov-Test oder die Wasserstein-Distanz verteilungsmäßige Änderungen. Für kategorische Features sind Chi-Quadrat-Tests oder Jensen-Shannon-Divergenz üblich. Vorhersagen selbst werden als Feature behandelt: Eine Verschiebung in der Vorhersageverteilung (z. B. ein Klassifikator, der plötzlich 80 % der Zeit „positiv" ausgibt, wenn die Baseline 30 % war) ist ein starkes Frühsignal, bevor Ground-Truth-Labels eintreffen.

### Berechnung von Leistungsmetriken

Wenn Ground-Truth-Labels verfügbar sind, werden Leistungsmetriken über rollende Fenster oder zeitbasierte Kohorten berechnet. Genauigkeit, Präzision, Recall, F1, RMSE und AUC-ROC sind gängige ML-Metriken. Business-Metriken — Einnahmen, die modellgesteuerten Entscheidungen zugeschrieben werden, Call-Deflection-Rate, Empfehlungs-Klickrate — sind oft handlungsrelevanter. Latenz, Durchsatz und Fehlerquoten sind Infrastrukturmetriken, die den Serving-Zustand anzeigen und neben der Modellqualität überwacht werden sollten.

### Alerting und Eskalation

Schwellenwerte und Anomalie-Erkennungsregeln lösen Alerts aus, wenn eine Metrik eine Grenze überschreitet. Statische Schwellenwerte sind einfach, aber spröde; Statistical Process Control (z. B. Kontrollkarten) und ML-basierte Anomalie-Erkennung passen sich an Saisonalität an. Alerts werden je nach Schweregrad an PagerDuty, Slack oder E-Mail weitergeleitet. Gut konzipierte Alert-Hierarchien unterscheiden zwischen informativen Ereignissen (nur protokollieren), Warnungen (ML-Team benachrichtigen) und kritischen Ereignissen (On-Call anrufen, automatisches Rollback oder Retraining auslösen).

### Retraining-Feedback-Schleife

Monitoring ist die Eingabe für die Retraining-Schleife. Wenn Drift erkannt wird oder die Leistung unter einen Schwellenwert fällt, löst eine automatisierte Pipeline (oder eine menschliche Entscheidung) einen Retraining-Job auf frischen Daten aus. Nach dem Retraining durchläuft der neue Modell-Kandidat Auswertungs-Gates, bevor er befördert wird, und schließt so die Schleife.

```mermaid
flowchart LR
  Predictions[Model predictions] -->|"log inputs & outputs"| Collector[Metrics collector]
  Collector -->|"compare to reference"| Drift[Drift detector]
  Drift -->|"threshold breached"| Alert[Alerting system]
  Alert -->|"notify team / trigger"| Retrain[Retraining pipeline]
  Retrain -->|"new model candidate"| Evaluate[Evaluation & promotion]
  Evaluate -->|"promoted model"| Predictions
```

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|----------|------------|
| Ein Modell in der Produktion deployt ist und echte Benutzer bedient | Das Modell eine einmalige Analyse ist, die nie wieder verwendet wird |
| Modellentscheidungen messbaren geschäftlichen Einfluss haben | Das Vorhersagevolumen so gering ist, dass statistische Tests keine Aussagekraft haben |
| Ground-Truth-Labels schließlich verfügbar sind | Kein Feedback-Mechanismus zum Sammeln von Labels oder Geschäftsergebnissen vorhanden ist |
| Regulatorische Anforderungen auditierbare Modellleistung verlangen | Die Kosten für Monitoring-Tooling den erwarteten Wert des deployten Modells übersteigen |
| Der datengenierende Prozess bekanntermaßen über die Zeit variiert | Das Modell ohnehin kontinuierlich retrainiert wird und Drift implizit behandelt wird |
| Mehrere Modelle gleichzeitig in der Produktion sind | Ein Mensch jede Vorhersage einzeln überprüft, was automatisches Monitoring überflüssig macht |

## Vergleiche

| Werkzeug | Primärer Fokus | Drift-Erkennung | Leistungsverfolgung | Hosting |
|------|--------------|-----------------|---------------------|---------|
| Evidently AI | Daten- und Modellqualitätsberichte | Ja (30+ Tests) | Ja | Selbst gehostet / Cloud |
| WhyLabs | LLM- und ML-Observability | Ja (statistisch) | Ja | SaaS |
| Arize AI | ML-Observability-Plattform | Ja | Ja | SaaS |
| Benutzerdefinierte Dashboards | Vollständig maßgeschneidert | Manuelle Implementierung | Manuelle Implementierung | Selbst gehostet |
| MLflow | Experiment-Tracking + Basis-Monitoring | Begrenzt | Ja (offline) | Selbst gehostet / Cloud |

## Vor- und Nachteile

| Aspekt | Vorteile | Nachteile |
|--------|------|------|
| Concept-Drift-Erkennung | Erkennt Modellverfall vor geschäftlichem Schaden | Erfordert Ground-Truth-Labels, die verzögert eintreffen |
| Data-Drift-Erkennung | Funktioniert ohne Labels — erkennt Probleme früh | Kann bei gutartigen Verteilungsverschiebungen falsch-positive Ergebnisse erzeugen |
| Automatisches Alerting | Reduziert die Zeit zur Erkennung von Wochen auf Minuten | Schlecht abgestimmte Schwellenwerte verursachen Alert-Fatigue |
| Tooling-Ökosystem | Reiche Open-Source- und SaaS-Optionen | Erhöht Infrastrukturkomplexität und Wartungsaufwand |
| Retraining-Trigger | Schließt die Schleife automatisch | Risiko von Trainingsinstabilität, wenn Retraining zu häufig ausgelöst wird |

## Code-Beispiele

```python
# drift_detection.py
# Demonstrates concept and data drift detection using Evidently AI.
# Run: pip install evidently scikit-learn pandas numpy

import numpy as np
import pandas as pd
from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

from evidently.report import Report
from evidently.metric_preset import DataDriftPreset, ClassificationPreset
from evidently import ColumnMapping

# --- 1. Simulate reference (training) data ---
X, y = make_classification(
    n_samples=1000,
    n_features=10,
    n_informative=5,
    random_state=42,
)
feature_names = [f"feature_{i}" for i in range(10)]
df = pd.DataFrame(X, columns=feature_names)
df["target"] = y

X_train, X_test, y_train, y_test = train_test_split(
    df[feature_names], df["target"], test_size=0.2, random_state=42
)

# --- 2. Train a simple classifier ---
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Build reference DataFrame with predictions
reference = X_test.copy()
reference["target"] = y_test.values
reference["prediction"] = clf.predict(X_test)

# --- 3. Simulate production data with drift ---
# Introduce feature shift: scale feature_0 to simulate distribution change
X_prod, y_prod = make_classification(
    n_samples=500,
    n_features=10,
    n_informative=5,
    random_state=99,  # Different seed = different distribution
)
df_prod = pd.DataFrame(X_prod, columns=feature_names)
df_prod["feature_0"] = df_prod["feature_0"] * 3.0  # Artificial drift on feature_0
df_prod["target"] = y_prod

production = df_prod[feature_names].copy()
production["target"] = df_prod["target"].values
production["prediction"] = clf.predict(df_prod[feature_names])

# --- 4. Run Evidently drift + performance report ---
column_mapping = ColumnMapping(
    target="target",
    prediction="prediction",
    numerical_features=feature_names,
)

report = Report(metrics=[DataDriftPreset(), ClassificationPreset()])
report.run(
    reference_data=reference,
    current_data=production,
    column_mapping=column_mapping,
)

# Save HTML report for inspection
report.save_html("drift_report.html")
print("Drift report saved to drift_report.html")

# --- 5. Extract drift results programmatically ---
result = report.as_dict()
drift_summary = result["metrics"][0]["result"]
n_drifted = drift_summary.get("number_of_drifted_columns", 0)
total = drift_summary.get("number_of_columns", 0)
share = drift_summary.get("share_of_drifted_columns", 0)

print(f"Drifted columns: {n_drifted}/{total} ({share:.1%})")
if share > 0.3:
    print("WARNING: Significant drift detected — consider retraining.")
else:
    print("Drift within acceptable bounds.")
```

## Praktische Ressourcen

- [Evidently AI-Dokumentation](https://docs.evidentlyai.com/) — Offizielle Dokumentation für die führende Open-Source-ML-Monitoring-Bibliothek, mit Drift-Tests, Berichten und Echtzeit-Monitoring.
- [WhyLabs ML-Observability-Plattform](https://whylabs.ai/docs) — SaaS-Plattform-Dokumentation für das Monitoring von LLM- und ML-Modellen mit statistischem Profiling und Alerting.
- [Chip Huyen — Monitoring von ML-Modellen in der Produktion](https://huyenchip.com/2022/02/07/data-distribution-shifts-and-monitoring.html) — Ausführlicher Blog-Beitrag zu Datenverteilungsverschiebungen, Monitoring-Strategien und praktischen Trade-offs.
- [Google — Rules of Machine Learning: Monitoring-Abschnitt](https://developers.google.com/machine-learning/guides/rules-of-ml#monitoring) — Googles Engineering-Leitfaden dazu, was überwacht werden soll und wie Alerts für Produktions-ML eingerichtet werden.
- [Arize AI — ML-Observability-Leitfaden](https://arize.com/ml-observability/) — Praktikerleitfaden zu Drift, Embeddings-Monitoring und dem Observability-Stack für ML.

## Siehe auch

- [Prometheus](/docs/mlops/monitoring/prometheus)
- [Grafana](/docs/mlops/monitoring/grafana)
- [Model-Serving](/docs/mlops/deployment/model-serving)
