---
title: Data Version Control (DVC)
description: Git für Daten und Modelle — Datensätze, Pipelines und Experimente zusammen mit dem Quellcode versionieren.
keywords: [DVC, Data Version Control, Datenversionierung, ML-Pipelines, Reproduzierbarkeit, Remote-Speicher, Experimente]
---

# Data Version Control (DVC)

## Definition

Data Version Control (DVC) ist ein Open-Source-Werkzeug, das Git erweitert, um große Dateien, Datensätze und Modellartefakte zu verfolgen, die nicht effizient in einem Git-Repository gespeichert werden können. Während Git jede Änderung am Quellcode aufzeichnet, speichert DVC eine kleine Zeigerdatei (`.dvc`) im Repository und schiebt die eigentlichen Datenbytes in ein konfigurierbares Remote-Speicher-Backend — S3, GCS, Azure Blob, SSH oder sogar ein lokales Verzeichnis. Dies hält das Repository schlank, während die vollständige Reproduzierbarkeit erhalten bleibt.

DVC geht über einfache Dateiversionierung hinaus. Es führt das Konzept von **Pipelines** ein — einen DAG (Directed Acyclic Graph) von Stufen, definiert in einer `dvc.yaml`-Datei. Jede Stufe gibt ihren Befehl, ihre Eingaben (Abhängigkeiten) und ihre Ausgaben an, sodass DVC bestimmen kann, welche Stufen bei Änderungen der Eingaben erneut ausgeführt werden müssen. Das Ergebnis ist ein Build-System für ML: reproduzierbar, inkrementell und zusammen mit dem Code versioniert, der es erzeugte.

DVC integriert sich eng in Git-Workflows. Eine in Git committete `dvc.lock`-Datei erfasst den genauen Inhalts-Hash aller Eingaben und Ausgaben zum Zeitpunkt des Pipeline-Laufs, sodass das Auschecken eines historischen Git-Commits und das Ausführen von `dvc pull` genau die Datensatz- und Modellartefakte wiederherstellt, die zu diesem Zeitpunkt in der Geschichte existierten.

## Funktionsweise

```mermaid
flowchart LR
  Code["Code & Config\n(Git)"] -->|"dvc repro"| Pipeline["DVC Pipeline\n(dvc.yaml)"]
  Pipeline -->|"runs stage"| Train["Training Stage"]
  Train -->|"produces artifact"| Artifact["model artifact\n(local cache)"]
  Artifact -->|"dvc push"| Remote["Remote Storage\n(S3 / GCS / Azure)"]
  Remote -->|"dvc pull"| Colleague["Colleague's machine\nor CI runner"]
  Artifact -->|"pointer .dvc file"| Git["Git repository"]
  Git -->|"git checkout"| Colleague
```

### Initialisierung eines DVC-Repositories

Das Ausführen von `dvc init` in einem Git-Repository erstellt ein `.dvc/`-Verzeichnis, das DVCs Konfiguration und lokalen Cache enthält. DVC registriert einen `.gitignore`-Eintrag für den Cache-Ordner und fügt einige kleine Tracking-Dateien hinzu, die in Git committet werden müssen. Ab diesem Zeitpunkt erstellt `dvc add <datei>` eine `.dvc`-Zeigerdatei für jede große Datei — die eigentlichen Bytes gehen in den lokalen Cache und werden nie in Git committet. Dieser zweischichtige Ansatz bedeutet, dass das Repository schnell zu klonen bleibt, während DVC die schweren Assets separat verwaltet.

### Pipelines definieren und ausführen

Eine `dvc.yaml`-Datei deklariert jede Pipeline-Stufe mit ihrem Befehl, Eingabe-Abhängigkeiten und Ausgabe-Artefakten. Beim Ausführen von `dvc repro` prüft DVC den Abhängigkeitsgraphen, vergleicht Inhalts-Hashes aller Eingaben mit dem `dvc.lock`-Snapshot und führt nur die Stufen erneut aus, deren Eingaben sich geändert haben. Dies ist analog zu `make`, aber inhaltsbasiert statt zeitstempelbasiert, sodass es deterministische Ergebnisse auch über verschiedene Maschinen und CI-Runner liefert. Pipelines können über eine `params.yaml`-Datei parametrisiert werden, und DVC zeichnet auf, welche Parameterwerte in jedem Lauf verwendet wurden.

### Remote-Speicher und Zusammenarbeit

Ein DVC-Remote ist ein mit `dvc remote add` konfigurierter Speicherort. Teams konfigurieren typischerweise einen gemeinsamen Cloud-Bucket, damit alle Mitglieder dieselben Daten abrufen. `dvc push` lädt neue oder geänderte Artefakte in den Remote hoch, und `dvc pull` lädt genau die Versionen herunter, auf die die `dvc.lock` des aktuellen Git-Commits verweist. Dieser Workflow bedeutet, dass das Onboarding eines neuen Teammitglieds in ein Projekt `git clone` gefolgt von `dvc pull` ist — ein einziger Befehl, der die korrekten Datensatz- und Modellartefakte für diesen Branch materialisiert.

### Experimente

`dvc exp run` und `dvc exp show` bieten eine leichtgewichtige Experiment-Tracking-Schicht auf Pipelines. Jedes Experiment ist ein temporärer Git-Stash von Parameteränderungen und Ergebnismetriken, die in einer Tabelle verglichen und bei vielversprechenden Ergebnissen zu einem vollständigen Branch promoviert werden können. Dies ist weniger funktionsreich als dedizierte Werkzeuge wie MLflow oder W&B, hat aber den Vorteil, keine zusätzliche Infrastruktur zu erfordern — alles lebt im Git-Repository.

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|---|---|
| Datensätze oder Modelldateien zu groß für Git sind (>100 MB) | Alle Daten bequem in Git LFS passen und keine Pipelines benötigt werden |
| Reproduzierbare ML-Pipelines an Code-Versionen gekoppelt benötigt werden | Experiment-Tracking-Anforderungen DVCs leichtgewichtigen Ansatz übersteigen |
| Das Team Git verwendet und einen einheitlichen Versionskontroll-Workflow wünscht | Eine vollständige UI für das Experiment-Management benötigt wird (MLflow oder W&B bevorzugen) |
| CI/CD-Pipelines genaue Datenartefakte pro Branch abrufen müssen | Daten extrem sensibel sind und On-Premises-Speicher nicht verlassen können |
| Experimentergebnisse ohne separaten Server verglichen werden sollen | Das Projekt keinen gemeinsamen Remote hat und Zusammenarbeit kein Anliegen ist |

## Vergleiche

| Kriterium | DVC | Git LFS | MLflow Tracking |
|---|---|---|---|
| Hauptzweck | Daten + Pipeline-Versionierung | Versionierung großer Dateien | Experiment-Tracking + Modell-Registry |
| Pipeline-Unterstützung | Ja (dvc.yaml DAG) | Nein | Nein (protokolliert nur Läufe) |
| Experiment-Vergleich | Grundlegend (dvc exp show) | Nein | Umfangreich (UI + API) |
| Remote-Backends | S3, GCS, Azure, SSH, lokal | GitHub, GitLab LFS-Server | Lokal, S3, Azure, SFTP |
| Server erforderlich | Nein | Nein | Optional (MLflow-Server) |
| Git-Integration | Kerndesignprinzip | Kerndesignprinzip | Optional (via mlflow.log_param) |

## Vor- und Nachteile

| Vorteile | Nachteile |
|---|---|
| Kein extra Server erforderlich — alles in Git + Object Storage | Lernkurve für Teams, die mit DAG-basierten Pipelines nicht vertraut sind |
| Reproduzierbare Pipelines mit inhaltsbasiertem Caching | Große dvc.lock-Konflikte können in sehr aktiven Monorepos schwierig sein |
| Funktioniert mit jedem Cloud-Speicher oder sogar lokalen Verzeichnissen | Experiment-UI ist im Vergleich zu MLflow / W&B minimal |
| Leichtgewichtig — DVC ist nur ein CLI-Werkzeug | Verwaltet keine verteilte Trainings-Orchestrierung |
| First-Class-CI/CD-Integration via CML | Remote-Speicherkosten liegen in der Verantwortung des Teams |

## Code-Beispiele

```bash
# --- DVC setup and basic data tracking ---

# 1. Initialize DVC inside an existing Git repository
git init my-ml-project && cd my-ml-project
dvc init
git add .dvc .dvcignore
git commit -m "Initialize DVC"

# 2. Configure a remote storage backend (AWS S3 example)
dvc remote add -d myremote s3://my-bucket/dvc-store
git add .dvc/config
git commit -m "Add DVC remote"

# 3. Track a large dataset — DVC creates data/train.csv.dvc
dvc add data/train.csv
git add data/train.csv.dvc data/.gitignore
git commit -m "Track training dataset with DVC"

# 4. Push data to the remote
dvc push

# --- Collaborator workflow ---

# 5. Clone the repo and pull the data artifacts
git clone https://github.com/org/my-ml-project
cd my-ml-project
dvc pull   # downloads data/train.csv from the configured remote
```

```yaml
# dvc.yaml — Define a two-stage pipeline: featurize -> train

stages:
  featurize:
    cmd: python src/featurize.py --input data/train.csv --output data/features.parquet
    deps:
      - src/featurize.py
      - data/train.csv
    outs:
      - data/features.parquet

  train:
    cmd: python src/train.py --features data/features.parquet --output models/
    deps:
      - src/train.py
      - data/features.parquet
      - params.yaml        # parameter file changes trigger re-run
    outs:
      - models/
    metrics:
      - reports/metrics.json:
          cache: false     # small metrics file — commit it to Git
```

```python
# src/train.py — DVC-compatible training script

import json
import argparse
from pathlib import Path

import yaml
import joblib
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


def main(features_path: str, output_dir: str) -> None:
    # Load parameters tracked by DVC from params.yaml
    params = yaml.safe_load(Path("params.yaml").read_text())["train"]

    # Load feature-engineered data produced by the featurize stage
    df = pd.read_parquet(features_path)
    X = df.drop(columns=["label"])
    y = df["label"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Train with parameters sourced from params.yaml — DVC tracks these
    model = GradientBoostingClassifier(
        n_estimators=params["n_estimators"],
        max_depth=params["max_depth"],
        random_state=42,
    )
    model.fit(X_train, y_train)

    # Save the model artifact — DVC will cache and hash the output directory
    out = Path(output_dir)
    out.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, out / "model.joblib")

    # Write metrics.json so DVC can track and compare across experiments
    accuracy = float(accuracy_score(y_test, model.predict(X_test)))
    Path("reports").mkdir(exist_ok=True)
    Path("reports/metrics.json").write_text(
        json.dumps({"accuracy": accuracy}, indent=2)
    )
    print(f"Accuracy: {accuracy:.4f}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--features", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    main(args.features, args.output)
```

## Praktische Ressourcen

- [DVC offizielle Dokumentation](https://dvc.org/doc) — Umfassender Leitfaden zu Installation, Pipelines, Remotes und Experimenten.
- [DVC Get Started-Tutorial](https://dvc.org/doc/start) — Praktische Anleitung zur Einrichtung eines DVC-Projekts von Grund auf.
- [Iterative Blog: Git-basiertes MLOps](https://iterative.ai/blog) — Artikel zu MLOps-Workflows mit DVC, CML und MLEM.
- [DVC GitHub-Repository](https://github.com/iterative/dvc) — Quellcode und Community-Issues.

## Siehe auch

- [CI/CD für ML](/docs/mlops/cicd)
- [Experiment-Tracking](/docs/mlops/experiment-tracking)
- [MLflow](/docs/mlops/mlflow)
