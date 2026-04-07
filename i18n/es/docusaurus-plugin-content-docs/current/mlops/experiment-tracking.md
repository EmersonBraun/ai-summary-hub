---
title: Seguimiento de experimentos
description: Cómo registrar, comparar y reproducir experimentos de ML de forma sistemática utilizando herramientas de tracking.
keywords: [seguimiento de experimentos, MLflow, Weights and Biases, reproducibilidad, hiperparámetros, artefactos, versionado de modelos]
---

# Seguimiento de experimentos

## Definición

El seguimiento de experimentos es la práctica de registrar sistemáticamente cada detalle de una ejecución de entrenamiento de ML para que los resultados puedan reproducirse, compararse y auditarse. Sin él, los equipos pierden el rastro de qué hiperparámetros produjeron qué resultados, desperdician cómputo redescubriendo configuraciones y no pueden demostrar cumplimiento cuando los modelos influyen en decisiones de alto riesgo.

Un registro completo de experimentos captura cuatro categorías de información. Los **parámetros** son las entradas al entrenamiento: tasa de aprendizaje, tamaño de lote, elecciones de arquitectura del modelo, conjuntos de características. Las **métricas** son las salidas: curvas de pérdida, precisión, F1, AUC, latencia. Los **artefactos** son los archivos producidos: pesos del modelo entrenado, conjuntos de datos preprocesados, gráficos de evaluación, matrices de confusión. Los **metadatos** son el contexto: versión del código (git commit), entorno (versiones de bibliotecas, hardware), versión del conjunto de datos, tiempo de reloj y el nombre de la persona que lo ejecutó.

El versionado de modelos es la extensión natural: una vez que rastreas experimentos, puedes promover el artefacto de la mejor ejecución a un registro de modelos, etiquetarlo con una versión semántica y vincular cada despliegue en servicio a un experimento específico. Esto cierra el ciclo entre experimentación y producción, facilitando los rollbacks y haciendo posibles las auditorías.

## Cómo funciona

### Instrumentación

El script de entrenamiento se instrumenta con unas pocas líneas de código SDK que abren un contexto de "ejecución" y registran datos en un servidor central durante el entrenamiento. La mayoría de los frameworks (PyTorch Lightning, Hugging Face Trainer, Keras) tienen integraciones nativas que auto-registran métricas comunes sin código adicional.

### Almacenamiento centralizado

Los datos registrados se persisten en un almacén backend — un sistema de archivos local, una base de datos en la nube gestionada o una plataforma SaaS. Los parámetros y métricas se almacenan como registros estructurados; los artefactos se envían a almacenamiento de objetos (S3, GCS, Azure Blob). El backend es consultado por la interfaz de usuario y el SDK.

### Comparación y análisis

La interfaz de tracking permite filtrar, ordenar y comparar ejecuciones en las cuatro dimensiones. Puedes trazar curvas de métricas para muchas ejecuciones en el mismo gráfico, agrupar por valores de parámetros y exportar resultados a un dataframe para análisis personalizados. Esto facilita la identificación de las ejecuciones Pareto-óptimas (mejor precisión para un presupuesto de latencia dado, por ejemplo).

### Promoción de modelos

El artefacto de la mejor ejecución se registra en un registro de modelos con un número de versión y un estado de transición (Staging → Production → Archived). Los sistemas de CI/CD de downstream consultan el registro para saber qué versión del modelo desplegar, creando una transferencia limpia entre experimentación y servicio.

```mermaid
flowchart LR
  Script[Training script] -->|"log params, metrics"| Tracker[Tracking server]
  Script -->|"upload weights, plots"| Artifacts[Artifact store]
  Tracker -->|"query runs"| UI[Comparison UI]
  Artifacts -->|"retrieve model"| UI
  UI -->|"promote best run"| Registry[Model registry]
  Registry -->|"version tag"| Deploy[CI/CD deployment]
```

## Cuándo usar / Cuándo NO usar

| Usar cuando | Evitar cuando |
|----------|------------|
| Ejecutas más de un puñado de experimentos y necesitas comparar resultados | Estás ejecutando un entrenamiento único y nunca lo revisitarás |
| Se requiere reproducibilidad (industria regulada, publicación de investigación) | El experimento es trivial (p. ej., una búsqueda de cuadrícula de dos parámetros con resultados obvios) |
| Varios miembros del equipo comparten resultados de experimentos | El equipo trabaja solo y lleva notas en una hoja de cálculo personal que es suficiente |
| Quieres promover versiones de modelos a producción de forma sistemática | El modelo nunca se despliega y los resultados no necesitan ser auditados |

## Comparaciones

| Criterio | MLflow | Weights & Biases (W&B) |
|-----------|--------|------------------------|
| Facilidad de configuración | Auto-hospedable con `mlflow ui`; solo pip install | Requiere cuenta SaaS; instalación CLI; nivel gratuito disponible |
| Calidad de la interfaz | Funcional pero espartana; buena para comparación tabular | Pulida, interactiva; excelente para medios y superposición de curvas |
| Colaboración | Requiere servidor compartido; sin control de acceso integrado en OSS | Espacios de trabajo en equipo, acceso basado en roles y compartición integrados |
| Precio | Gratuito y de código abierto; oferta gestionada vía Databricks | Nivel gratuito para individuos; de pago para equipos grandes |
| Integraciones | Integración profunda con Databricks, Spark, sklearn, PyTorch | Amplias integraciones; fuerte en investigación y academia |

## Ejemplos de código

```python
# generic_tracking.py
# Framework-agnostic experiment tracking pattern.
# Works with any ML library; swap out the model training code as needed.
# pip install mlflow scikit-learn pandas

import mlflow
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score
import numpy as np

# --- Configuration ---
EXPERIMENT_NAME = "binary-classification-demo"
PARAMS = {
    "C": 0.1,           # Regularization strength
    "max_iter": 1000,
    "solver": "lbfgs",
    "random_state": 42,
}

# --- Data preparation ---
X, y = make_classification(
    n_samples=2000, n_features=20, n_informative=10, random_state=42
)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# --- Tracking boilerplate (works with MLflow, swap with wandb.init() for W&B) ---
mlflow.set_experiment(EXPERIMENT_NAME)

with mlflow.start_run(run_name=f"logreg-C{PARAMS['C']}") as run:
    # 1. Log all hyperparameters at the start
    mlflow.log_params(PARAMS)

    # 2. Train the model
    model = LogisticRegression(**PARAMS)
    model.fit(X_train, y_train)

    # 3. Evaluate and log metrics
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]

    metrics = {
        "accuracy": accuracy_score(y_test, y_pred),
        "roc_auc": roc_auc_score(y_test, y_prob),
        "n_train": len(X_train),
        "n_test": len(X_test),
    }
    mlflow.log_metrics(metrics)

    # 4. Log the model artifact
    mlflow.sklearn.log_model(model, artifact_path="model")

    # 5. Log any extra files (e.g., feature importance, plots)
    import json, tempfile, os
    with tempfile.TemporaryDirectory() as tmp:
        meta_path = os.path.join(tmp, "run_metadata.json")
        with open(meta_path, "w") as f:
            json.dump({"git_commit": "abc1234", "dataset_version": "v1.3"}, f)
        mlflow.log_artifact(meta_path)

    print(f"Run ID : {run.info.run_id}")
    print(f"Accuracy: {metrics['accuracy']:.4f} | ROC-AUC: {metrics['roc_auc']:.4f}")
```

## Recursos prácticos

- [Documentación de MLflow Tracking](https://mlflow.org/docs/latest/tracking.html) — Guía oficial que cubre la API de tracking, backends, almacenes de artefactos y auto-registro.
- [Weights & Biases – Inicio rápido de seguimiento de experimentos](https://docs.wandb.ai/quickstart) — Guía paso a paso para registrar tu primera ejecución W&B en menos de cinco minutos.
- [Neptune.ai – Guía de seguimiento de experimentos](https://neptune.ai/blog/ml-experiment-tracking) — Visión general neutral al proveedor sobre qué rastrear, por qué y cómo comparar herramientas.
- [Made With ML – Seguimiento de experimentos](https://madewithml.com/courses/mlops/experiment-tracking/) — Tutorial práctico basado en notebooks que integra MLflow en un ciclo de entrenamiento real.

## Ver también

- [MLflow](/docs/mlops/mlflow)
- [Weights & Biases](/docs/mlops/wandb)
- [MLOps](/docs/mlops)
