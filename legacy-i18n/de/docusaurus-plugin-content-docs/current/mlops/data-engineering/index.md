---
title: Data pipelines
description: An overview of data pipelines in the ML context — batch vs streaming, ETL vs ELT, data quality, and schema validation.
keywords: [data pipelines, ETL, ELT, batch processing, streaming, data quality, schema validation, MLOps]
tags: [intermediate]
authors: [EmersonBraun]
---

# Datenpipelines

## Definition

Eine Datenpipeline ist eine automatisierte Abfolge von Schritten, die Rohdaten von einer oder mehreren Quellen zu einem Ziel bewegt, wo sie von Analysten, Dashboards oder Machine-Learning-Modellen konsumiert werden können. Im ML-Kontext geht es bei Pipelines nicht nur darum, Daten zu verschieben: Sie stellen sicher, dass Daten in der richtigen Form, zur richtigen Zeit und mit überprüfbarer Qualität ankommen, damit Modelle vorhersehbar trainieren und dienen. Ohne zuverlässige Pipelines ist jedes nachgelagerte Artefakt — Features, trainierte Modelle, Vorhersagen — verdächtig.

Datenpipelines bilden die Grundlage jedes MLOps-Systems. Sie umfassen die Ingestion aus heterogenen Quellen (Datenbanken, APIs, Event-Streams, Dateien), die Transformation zur Erzeugung sauberer und strukturierter Datensätze oder Feature-Vektoren, die Speicherung in Data Warehouses oder Feature Stores und die Bereitstellung für Trainings-Jobs oder Online-Inferenz-Endpunkte. Die Designentscheidungen auf der Pipeline-Ebene — Batch vs. Streaming, Push vs. Pull, Schema-on-Read vs. Schema-on-Write — wirken sich auf Modelllatenz, Aktualität und Zuverlässigkeit aus.

Datenqualität ist der versteckte Vertrag zwischen Dateningenieuren und Modellteams. Schema-Drift, Null-Explosionen, Verteilungsverschiebungen und doppelte Datensätze gehören zu den häufigsten Ursachen für stillen Modellabbau. Moderne Pipelines betten Validierungsprüfpunkte ein (mit Tools wie Great Expectations oder dbt-Tests), um diese Probleme zu erkennen, bevor fehlerhafte Daten das Training oder Serving erreichen.

## Funktionsweise

### Batch vs. Streaming

Batch-Pipelines verarbeiten Daten in begrenzten Chunks nach einem Zeitplan — stündlich, täglich oder ausgelöst durch Dateiankünfte. Sie sind einfacher zu erstellen und zu verstehen und sind der richtige Standard, wenn der nachgelagerte Konsument (ein nächtlicher Trainingsjob, ein BI-Dashboard) keine Aktualität unter einer Minute erfordert. Streaming-Pipelines verarbeiten Datensätze bei ihrer Ankunft und ermöglichen nahezu Echtzeit-Features für Online-Modelle. Der Kompromiss ist die operative Komplexität: Sie müssen mit verspäteten Ankünften, ungeordneten Ereignissen und Exactly-Once-Semantik umgehen. Die meisten reifen ML-Plattformen führen beides aus: Batch für umfangreiches Nachtraining und Offline-Evaluierung, Streaming für die Online-Feature-Berechnung.

### ETL vs. ELT

Extract-Transform-Load (ETL) wendet Transformationen an, bevor Daten im Ziel-Store landen. Dies war das dominierende Muster, als Speicher teuer war und Warehouses keine Rechenleistung hatten. Extract-Load-Transform (ELT) lädt zunächst Rohdaten und transformiert sie dann innerhalb eines leistungsstarken Warehouse oder Lakehouse (z. B. BigQuery, Snowflake, Databricks). ELT bewahrt die Rohgeschichte und ermöglicht Ad-hoc-Exploration ohne Re-Ingestion — ein großer Vorteil in ML-Workloads, wo Feature-Engineering sich ständig weiterentwickelt.

### Datenqualität und Schema-Validierung

Datenqualitätsprüfungen sollten in jede Pipeline-Phase eingebettet werden, nicht am Ende angehängt. Bei der Ingestion überprüfen Checks, ob die Quelldaten dem erwarteten Schema entsprechen. Bei der Transformation prüfen Zeilenebenen-Checks Geschäftsregeln. Auf der Serving-Ebene erkennen statistische Checks Verteilungsdrift — den stillen Killer bereitgestellter Modelle.

```mermaid
flowchart LR
  Sources["Sources\n(DB / API / Events)"] -- "raw records" --> Ingest["Ingest\n(Extract & Load)"]
  Ingest -- "raw data" --> Transform["Transform\n(Clean / Validate / Feature eng.)"]
  Transform -- "validated features" --> Store["Store\n(Warehouse / Feature store)"]
  Store -- "query / serve" --> Serve["Serve\n(Training / Inference)"]
```

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|---|---|
| Mehrere Datenquellen für ML-Training konsolidiert werden müssen | Daten bereits in einer einzigen, sauberen Tabelle vorliegen |
| Daten nach einem Zeitplan oder in Echtzeit aktualisiert werden müssen | Ihre Analyse eine einmalige Exploration ist, die nicht wiederholt wird |
| Qualitätsgarantien von nachgelagerten Modellen erforderlich sind | Der Overhead einer vollständigen Pipeline den Wert für einen schnellen Prototyp übersteigt |
| Transformationen versioniert, getestet und reproduzierbar sein müssen | Das Datenvolumen trivial ist und ein einfaches Skript in einem Notebook ausreicht |
| Mehrere Konsumenten (Training, Dashboards, APIs) dieselben Daten teilen | Das Quellsystem bereits eine saubere, kontrahierte API bereitstellt |

## Vergleiche

| Kriterium | Batch-Pipeline | Streaming-Pipeline |
|---|---|---|
| Datenaktualität | Minuten bis Stunden (zeitplangesteuert) | Unter einer Sekunde bis Sekunden |
| Komplexität | Niedrig — begrenzte Datensätze, einfache Wiederholungen | Hoch — verspätete Daten, Windowing, Zustand |
| Kosten | Vorhersehbar, stoßartige Rechenlast | Kontinuierliche Rechenlast, oft höhere Baseline |
| Fehlertoleranz | Fehlgeschlagenen Batch erneut ausführen | Exactly-Once oder At-Least-Once-Semantik erforderlich |
| Typischer ML-Anwendungsfall | Offline-Training, nächtliche Feature-Aktualisierung | Online Feature Store, Echtzeit-Bewertung |

## Vor- und Nachteile

| Vorteile | Nachteile |
|---|---|
| Zentralisiert und standardisiert den Datenzugang für Teams | Nicht-trivialer anfänglicher Investitionsaufwand für Aufbau und Wartung |
| Ermöglicht reproduzierbare, getestete Datentransformationen | Pipeline-Fehler breiten sich auf alle nachgelagerten Konsumenten aus |
| Bettete Qualitätsprüfungen ein, bevor schlechte Daten Modelle erreichen | Das Debuggen verteilter Pipelines ist komplex |
| Unterstützt Versionierung und Herkunftsverfolgung | Streaming fügt erheblichen operativen Overhead hinzu |
| Entkoppelt Produzenten von Konsumenten | Erfordert Data-Governance- und Eigentumsdisziplin |

## Codebeispiele

```python
"""
Simple batch data pipeline with pandas.
Reads raw CSV data, validates schema, applies transformations,
and writes a clean Parquet file ready for model training.
"""

import pandas as pd
import pandera as pa
from pandera import Column, DataFrameSchema, Check
from pathlib import Path


raw_schema = DataFrameSchema(
    {
        "user_id": Column(int, nullable=False),
        "event_ts": Column(str, nullable=False),
        "amount": Column(float, Check(lambda x: x >= 0), nullable=False),
        "category": Column(str, nullable=True),
    }
)

output_schema = DataFrameSchema(
    {
        "user_id": Column(int),
        "event_date": Column("datetime64[ns]"),
        "amount": Column(float),
        "category": Column(str),
        "log_amount": Column(float),
    }
)


def extract(source_path: str) -> pd.DataFrame:
    df = pd.read_csv(source_path)
    print(f"[extract] loaded {len(df):,} rows from {source_path}")
    return df


def validate(df: pd.DataFrame, schema: DataFrameSchema) -> pd.DataFrame:
    validated = schema.validate(df)
    print(f"[validate] schema check passed for {len(validated):,} rows")
    return validated


def transform(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["event_date"] = pd.to_datetime(df["event_ts"])
    df.drop(columns=["event_ts"], inplace=True)
    df["category"] = df["category"].fillna("unknown")
    import numpy as np
    df["log_amount"] = np.log1p(df["amount"])
    df.drop_duplicates(subset=["user_id", "event_date"], inplace=True)
    print(f"[transform] produced {len(df):,} clean rows")
    return df


def load(df: pd.DataFrame, dest_path: str) -> None:
    Path(dest_path).parent.mkdir(parents=True, exist_ok=True)
    df.to_parquet(dest_path, index=False)
    print(f"[load] wrote {len(df):,} rows to {dest_path}")


def run_pipeline(source: str, destination: str) -> None:
    raw = extract(source)
    validated_raw = validate(raw, raw_schema)
    clean = transform(validated_raw)
    validated_clean = validate(clean, output_schema)
    load(validated_clean, destination)
    print("[pipeline] completed successfully")


if __name__ == "__main__":
    run_pipeline(
        source="data/raw/events.csv",
        destination="data/processed/events.parquet",
    )
```

## Praktische Ressourcen

- [The Data Engineering Cookbook (Andreas Kretz)](https://github.com/andkret/Cookbook) — Umfassender Open-Source-Leitfaden zu Ingestion-, Speicher- und Verarbeitungsmustern.
- [dbt-Dokumentation](https://docs.getdbt.com/) — Der Standard für ELT-Transformationen in SQL mit eingebautem Testen und Lineage.
- [Great Expectations](https://docs.greatexpectations.io/) — Datenqualitäts- und Validierungsframework, das mit den meisten Pipeline-Tools integriert.
- [Pandera](https://pandera.readthedocs.io/) — Leichtgewichtige Schema-Validierung für pandas und Spark DataFrames in Python.
- [Fundamentals of Data Engineering (O'Reilly)](https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/) — Buch, das den vollständigen Data-Engineering-Lebenszyklus abdeckt.

## Siehe auch

- [Apache Airflow](/docs/mlops/data-engineering/airflow)
- [Apache Spark](/docs/mlops/data-engineering/spark)
- [Apache Kafka](/docs/mlops/data-engineering/kafka)
- [MLOps](/docs/mlops)
