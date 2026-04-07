---
title: KubeFlow
description: Open-Source-ML-Toolkit für Kubernetes — Pipelines, Hyperparameter-Tuning und Model Serving im großen Maßstab.
keywords: [KubeFlow, Kubernetes, ML-Pipelines, Katib, KFServing, Hyperparameter-Tuning, MLOps, verteiltes Training]
---

# KubeFlow

## Definition

KubeFlow ist ein Open-Source-ML-Toolkit, das darauf ausgelegt ist, die Bereitstellung von ML-Workflows auf Kubernetes einfach, portabel und skalierbar zu machen. Ursprünglich von Google erstellt, ist es jetzt ein Cloud Native Computing Foundation (CNCF)-Projekt mit breiter Industrieakzeptanz. KubeFlow versucht nicht, eine einzige monolithische Plattform zu sein; stattdessen ist es eine kuratierte Sammlung von Kubernetes-nativen Komponenten, die jeweils ein bestimmtes ML-Infrastrukturproblem lösen.

Die Kernkomponenten sind: **KubeFlow Pipelines (KFP)** zur Definition und Ausführung von DAG-basierten ML-Workflows als Kubernetes-Jobs; **Katib** für automatisiertes Hyperparameter-Tuning und neuronale Architektursuche mit Bayesian Optimization, Zufallssuche oder Reinforcement Learning; **KFServing (jetzt KServe)** für skalierbares Model Serving mit serverless Skalierung, Canary-Deployments und Unterstützung für mehrere Serving-Runtimes; und **Jupyter Notebook Server**, verwaltet vom KubeFlow-Dashboard für interaktive Entwicklung in einer Multi-Tenant-Umgebung. Die gesamte Plattform wird über einen einzigen Satz von Kubernetes-Manifesten installiert und über eine Web-UI verwaltet.

KubeFlows Stärke liegt darin, dass es auf jedem Kubernetes-Cluster läuft — On-Premises, GKE, EKS, AKS oder einem lokalen kind-Cluster — was es für Organisationen geeignet macht, die verlangen, dass Daten in ihrer eigenen Infrastruktur bleiben. Die Hauptkosten sind operative Komplexität: Die Lernkurve ist steil, und der Betrieb von KubeFlow in Produktion erfordert solide Kubernetes-Expertise.

## Funktionsweise

```mermaid
flowchart TB
  Developer["Data Scientist\n(Jupyter / SDK)"] -->|"define pipeline"| KFP["KubeFlow Pipelines\n(KFP)"]
  KFP -->|"schedules pods"| K8s["Kubernetes\n(control plane)"]
  K8s -->|"run training job"| TrainPod["Training Pod\n(GPU node pool)"]
  TrainPod -->|"log metrics"| Katib["Katib\n(hyperparameter tuning)"]
  Katib -->|"suggest next trial"| TrainPod
  TrainPod -->|"push artifact"| Storage["Model Store\n(S3 / GCS / MinIO)"]
  Storage -->|"register model"| KFServe["KServe\n(model serving)"]
  KFServe -->|"expose endpoint"| Client["Prediction Clients"]
  KFP -->|"emit events"| Dashboard["KubeFlow Dashboard\n(UI + RBAC)"]
```

### KubeFlow Pipelines (KFP)

KFP ermöglicht Data Scientists, ML-Pipelines als Python-Code mit dem KFP-SDK zu definieren. Jeder Pipeline-Schritt ist eine containerisierte Komponente: Eine mit `@dsl.component` dekorierte Python-Funktion wird in eine Container-Spezifikation kompiliert, die KFP als Kubernetes-Pod ausführt. Der Pipeline-DAG wird in eine Intermediate-Representation (IR YAML)-Datei kompiliert, die KFPs Backend-Controller auf dem Cluster plant. Dieser Ansatz bedeutet, dass jeder Schritt vollständig reproduzierbar ist: Das Container-Image ist gepinnt, Eingaben und Ausgaben sind Artefakte, die in KFPs Metadaten-Store (ML Metadata / MLMD) verfolgt werden, und der gesamte Ausführungsgraph ist in der UI mit Logs, Eingaben, Ausgaben und Status pro Schritt sichtbar.

### Katib — Hyperparameter-Tuning

Katib ist KubeFlows AutoML-Komponente. Es definiert eine `Experiment`-Kubernetes-Custom-Resource, die den Suchraum (Parameterbereiche und -typen), die Zielmission (Verlust minimieren, Genauigkeit maximieren) und den Suchalgorithmus (Bayesian Optimization via Gaussian Process, CMA-ES, Zufallssuche oder Gittersuche) spezifiziert. Katib führt parallele Trials durch — jeder Trial ist ein vollständiger Trainingsjob — und verwendet die Ergebnisse, um bessere Konfigurationen für nachfolgende Trials vorzuschlagen. Die Integration mit KFP bedeutet, dass eine vollständige Pipeline (Daten → Feature Engineering → Train → Evaluate) als einzelner Katib-Trial behandelt werden kann, was End-to-End-AutoML über komplexe Pipelines ermöglicht.

### KServe (früher KFServing)

KServe erweitert Kubernetes um `InferenceService`-Custom-Resources, die Model-Serving-Deployments deklarativ definieren. Framework (sklearn, xgboost, pytorch, tensorflow, custom) und Modell-URI (S3-Pfad, PVC) angeben, und KServe übernimmt: das Modell abrufen, die richtige Serving-Runtime auswählen, den Sidecar-Proxy konfigurieren, den Endpoint via Istio freigeben und Replicas auf null skalieren, wenn inaktiv (serverless Modus). Canary-Deployments teilen Traffic zwischen zwei Modellversionen nach Prozentsatz auf, was sichere Rollouts ermöglicht. Die Transformer- und Explainer-Komponenten ermöglichen das Einbinden von Vorverarbeitungslogik und SHAP-basierter Erklärbarkeit neben dem Predictor.

### Multi-Tenancy und RBAC

Das KubeFlow-Dashboard implementiert Multi-Tenancy via Kubernetes-Namespaces: Jeder Nutzer oder jedes Team erhält einen isolierten Namespace mit eigenen Ressourcenkontingenten, Notebook-Servern und Pipeline-Läufen. Role-Based Access Control (RBAC) beschränkt, welche Nutzer Pipelines und Modelle anzeigen, ausführen oder verwalten können. Das macht KubeFlow für große Organisationen geeignet, in denen mehrere Teams einen einzigen GPU-Cluster teilen und Isolation ohne separate Cluster benötigen.

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|---|---|
| ML-Workloads auf einem vorhandenen Kubernetes-Cluster ausgeführt werden | Das Team keine Kubernetes-Expertise hat und keinen dedizierten Platform-Ingenieur |
| Vollständige Pipeline-Orchestrierung, AutoML und Serving in einer Plattform benötigt werden | Ein verwalteter Service (SageMaker, Vertex AI) zur Cloud-Provider-Strategie passt |
| Datenresidenz-Anforderungen die Nutzung verwalteter Cloud-ML-Services verhindern | Nur Model Serving ohne vollständige Pipeline-Orchestrierung benötigt wird |
| Die Organisation einen gemeinsamen GPU-Cluster mit Multi-Tenancy-Anforderungen betreibt | ML-Workflows einfach genug für ein einzelnes Trainingsskript sind |
| Erweiterte Serving-Features (serverless Skalierung, Canary, Transformer) erforderlich sind | Schnelle Time-to-Production wichtiger als Infrastrukturkontrolle ist |

## Vergleiche

| Kriterium | KubeFlow | ML on Kubernetes (Vanilla) |
|---|---|---|
| Komplexität | Hoch — viele CRDs, Controller und Istio-Abhängigkeiten | Mittel — nur Standard-Kubernetes-Objekte |
| Features | Pipelines, AutoML (Katib), Serving (KServe), Notebook-Management | Was manuell gebaut und konfiguriert wird |
| Lernkurve | Steil — erfordert Kubernetes + KubeFlow-Domänenwissen | Mittel — Standard-K8s-Kenntnisse ausreichend |
| Flexibilität | Moderat — erweiterbar, aber an KubeFlow-Abstraktionen gebunden | Hoch — volle Kontrolle über jede Kubernetes-Ressource |
| Verwaltete Optionen | KubeFlow on GKE (Vertex AI Pipelines), AWS Managed KubeFlow | Jedes verwaltete Kubernetes (EKS, GKE, AKS) |
| Setup-Zeit | Tage bis Wochen für eine produktionsreife Installation | Stunden bis Tage je nach Workload-Komplexität |

## Vor- und Nachteile

| Vorteile | Nachteile |
|---|---|
| Einheitliche ML-Plattform — Pipelines, Tuning, Serving in einem System | Sehr hohe operative Komplexität und große Anzahl beweglicher Teile |
| Cloud-agnostisch — läuft auf jedem Kubernetes-Cluster | Steile Lernkurve; erfordert Kubernetes-Expertise zum Betrieb |
| Serverless Model Serving mit automatischem Scale-to-Zero | Ressourcenintensive Installation (Istio, Argo Workflows, MLMD, Knative) |
| Starke Multi-Tenancy mit Namespace-Isolation und RBAC | Upgrades zwischen KubeFlow-Versionen können aufwändig sein |
| Aktive CNCF-Community und breite Ökosystem-Integrationen | Das Debuggen von Fehlern erfordert oft das Verstehen mehrerer Ebenen (K8s → Argo → Python SDK) |

## Code-Beispiele

```python
# kubeflow_pipeline.py
# KubeFlow Pipelines v2 SDK — defines a two-step ML pipeline:
#   1. Data preprocessing component
#   2. Training component
# Requires: pip install kfp==2.*

from kfp import dsl
from kfp.client import Client


# --- Component 1: Preprocess raw CSV data ---

@dsl.component(
    base_image="python:3.11-slim",
    packages_to_install=["pandas==2.2.0", "scikit-learn==1.4.0"],
)
def preprocess(
    raw_data_path: str,
    output_features: dsl.Output[dsl.Dataset],
) -> None:
    """
    Reads raw CSV, applies feature engineering, and writes features as Parquet.
    KFP tracks output_features as a Dataset artifact with URI and metadata.
    """
    import pandas as pd
    from sklearn.preprocessing import StandardScaler

    df = pd.read_csv(raw_data_path)

    # Simple feature engineering: scale numeric columns
    scaler = StandardScaler()
    numeric_cols = df.select_dtypes("number").columns.tolist()
    df[numeric_cols] = scaler.fit_transform(df[numeric_cols])

    # KFP provides output_features.path — write artifact there
    df.to_parquet(output_features.path, index=False)
    print(f"Wrote {len(df)} rows to {output_features.path}")


# --- Component 2: Train a model on the preprocessed features ---

@dsl.component(
    base_image="python:3.11-slim",
    packages_to_install=["pandas==2.2.0", "scikit-learn==1.4.0", "joblib==1.3.0"],
)
def train(
    features: dsl.Input[dsl.Dataset],
    n_estimators: int,
    model_output: dsl.Output[dsl.Model],
    metrics_output: dsl.Output[dsl.Metrics],
) -> None:
    """
    Trains a RandomForestClassifier and writes the model artifact + metrics.
    """
    import json
    import joblib
    import pandas as pd
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import accuracy_score

    df = pd.read_parquet(features.path)
    X = df.drop(columns=["label"]).values
    y = df["label"].values
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    clf = RandomForestClassifier(n_estimators=n_estimators, random_state=42)
    clf.fit(X_train, y_train)

    accuracy = float(accuracy_score(y_test, clf.predict(X_test)))

    # Write model artifact (KFP tracks the URI and lineage)
    joblib.dump(clf, model_output.path)

    # Log metrics — visible in the KubeFlow Pipelines UI
    metrics_output.log_metric("accuracy", accuracy)
    metrics_output.log_metric("n_estimators", n_estimators)
    print(f"Accuracy: {accuracy:.4f}")


# --- Pipeline definition ---

@dsl.pipeline(
    name="fraud-detection-pipeline",
    description="Two-stage pipeline: preprocess CSV data, then train RandomForest.",
)
def fraud_pipeline(
    raw_data_path: str = "gs://my-bucket/data/train.csv",
    n_estimators: int = 100,
) -> None:
    # Step 1: preprocess — runs in its own pod
    preprocess_task = preprocess(raw_data_path=raw_data_path)

    # Step 2: train — depends on the Dataset artifact from step 1
    train_task = train(
        features=preprocess_task.outputs["output_features"],
        n_estimators=n_estimators,
    )
    # Assign this task to a node pool with GPU (optional resource request)
    train_task.set_accelerator_type("NVIDIA_TESLA_T4").set_accelerator_limit(1)


# --- Submit the pipeline to a running KubeFlow Pipelines instance ---

if __name__ == "__main__":
    # Connect to KFP backend (port-forward: kubectl port-forward -n kubeflow svc/ml-pipeline 8888:8888)
    client = Client(host="http://localhost:8888")

    run = client.create_run_from_pipeline_func(
        pipeline_func=fraud_pipeline,
        arguments={
            "raw_data_path": "gs://my-bucket/data/train.csv",
            "n_estimators": 200,
        },
        run_name="fraud-pipeline-run-v1",
        experiment_name="fraud-detection",
    )
    print(f"Pipeline run created: {run.run_id}")
    print(f"View at: http://localhost:8888/#/runs/details/{run.run_id}")
```

## Praktische Ressourcen

- [KubeFlow offizielle Dokumentation](https://www.kubeflow.org/docs/) — Architekturübersicht, Komponentenleitfäden und Installationsanweisungen.
- [KubeFlow Pipelines SDK-Referenz](https://kubeflow-pipelines.readthedocs.io/) — Vollständige API-Referenz für das KFP v2 Python-SDK.
- [KServe-Dokumentation](https://kserve.github.io/website/) — Serving-Runtime, InferenceService-Spezifikation und Canary-Rollout-Leitfaden.
- [Katib Hyperparameter-Tuning-Leitfaden](https://www.kubeflow.org/docs/components/katib/overview/) — Experiment-Spezifikation, Suchalgorithmen und Integration mit Training-Operatoren.

## Siehe auch

- [ML auf Kubernetes](/docs/mlops/deployment/ml-kubernetes)
- [Model Serving](/docs/mlops/deployment/model-serving)
- [Monitoring](/docs/mlops/monitoring)
