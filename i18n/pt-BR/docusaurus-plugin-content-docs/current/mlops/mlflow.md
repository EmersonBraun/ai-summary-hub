---
title: MLflow
description: Plataforma open-source para o ciclo de vida completo de ML, cobrindo rastreamento de experimentos, projetos, modelos e o registro.
keywords: [MLflow, rastreamento de experimentos, registro de modelos, MLflow Projects, MLflow Models, self-hosted, Databricks]
---

# MLflow

## Definição

MLflow é uma plataforma open-source projetada para gerenciar o ciclo de vida completo do aprendizado de máquina. Lançado originalmente pela Databricks em 2018, tornou-se uma das ferramentas de MLOps mais amplamente adotadas devido à sua simplicidade, independência de framework e ao fato de poder ser executado inteiramente on-premise sem nenhuma dependência de nuvem. Um único `pip install mlflow` e uma alteração de duas linhas no código é suficiente para começar a rastrear experimentos.

O MLflow organiza a funcionalidade em quatro componentes fortemente integrados. **Tracking** registra parâmetros, métricas e artefatos para cada execução de treinamento. **Projects** empacota código de ML em unidades reprodutíveis e executáveis definidas por um arquivo `MLproject`. **Models** fornece um formato padrão para empacotar modelos que podem ser servidos por qualquer destino de implantação suportado. **Model Registry** fornece um armazenamento centralizado de modelos com gerenciamento de ciclo de vida (estados Staging, Production, Archived) e histórico de versões. Juntos, esses componentes cobrem a jornada desde o experimento bruto até a implantação em produção.

O MLflow pode ser executado localmente (backend SQLite, artefatos no sistema de arquivos local), em um servidor auto-gerenciado (PostgreSQL + S3) ou como serviço totalmente gerenciado via Databricks Managed MLflow. O núcleo open-source é licenciado sob Apache 2.0, tornando-o adequado para indústrias reguladas onde os dados não podem sair da infraestrutura on-premise.

## Como funciona

### Servidor de rastreamento

Quando você chama `mlflow.start_run()`, o cliente abre uma execução no servidor de rastreamento e começa a armazenar logs em buffer. Parâmetros (`log_param`, `log_params`) e métricas (`log_metric`, `log_metrics`) são gravados no armazenamento backend (SQLite ou PostgreSQL). Artefatos são enviados para o armazenamento de artefatos (sistema de arquivos local, S3, GCS, Azure Blob, HDFS). O servidor expõe uma API REST consumida pelo SDK do cliente e pela interface web.

### MLflow Projects

Um projeto é um diretório (ou repositório git) com um arquivo YAML `MLproject` que declara os pontos de entrada, parâmetros e o ambiente conda/pip. Executar `mlflow run . -P lr=0.01` resolve o ambiente, define os parâmetros e inicia o ponto de entrada — produzindo automaticamente uma execução rastreada. Isso torna os experimentos reprodutíveis por qualquer pessoa com acesso ao repositório.

### MLflow Models

Um modelo salvo com `mlflow.<flavor>.log_model()` é armazenado no formato MLmodel: um diretório contendo o modelo serializado, um descritor YAML `MLmodel` e um `conda.yaml` / `requirements.txt`. O flavor `pyfunc` fornece uma interface uniforme `model.predict(data)` independentemente do framework subjacente, permitindo que o mesmo modelo seja carregado por diferentes backends de servição.

### Model Registry

O registro armazena versões de modelos nomeadas com estados de transição. Sistemas de CI/CD automatizados consultam o registro para a versão `Production` mais recente a ser implantada. Aprovadores humanos ou jobs de validação automatizados fazem a transição das versões entre os estados. Cada versão está vinculada à sua execução de origem, preservando a proveniência completa.

```mermaid
flowchart LR
  Code[Training code] -->|"mlflow.start_run()"| Run[Active run]
  Run -->|"log_params / log_metrics"| Backend[(Backend store\nSQLite / Postgres)]
  Run -->|"log_artifact / log_model"| ArtStore[(Artifact store\nS3 / GCS / local)]
  Backend -->|"query"| UI[MLflow UI]
  ArtStore -->|"retrieve"| UI
  UI -->|"register_model"| Registry[Model Registry]
  Registry -->|"transition to Production"| Deploy[Serving / CI-CD]
```

## Quando usar / Quando NÃO usar

| Usar quando | Evitar quando |
|-------------|---------------|
| Você precisa de uma plataforma de MLOps totalmente self-hosted e open-source | Sua equipe precisa de recursos ricos de colaboração (relatórios compartilhados, notificações no Slack) prontos para uso |
| Os dados não podem sair da sua infraestrutura (indústrias reguladas) | Você prefere um produto SaaS com zero infraestrutura para gerenciar |
| Você já usa o Databricks e quer integração nativa | Seu fluxo de trabalho é apenas de notebooks sem implantação em produção planejada |
| A independência de framework é importante (sklearn, XGBoost, PyTorch, TF, etc.) | Você precisa de otimização avançada de sweep/hiperparâmetros integrada |
| O controle de custos é crítico; licenciamento open-source é necessário | Sua equipe não tem largura de banda de engenharia para gerenciar um servidor e armazenamento de artefatos |

## Comparações

| Critério | MLflow | Weights & Biases (W&B) |
|----------|--------|------------------------|
| Facilidade de configuração | Hospedável localmente com um comando; sem conta necessária | SaaS; conta gratuita necessária; sem infraestrutura para gerenciar |
| Qualidade da interface | Limpa mas básica; focada em métricas tabulares e comparação de execuções | Altamente refinada; excelente registro de mídia, gráficos personalizados, relatórios |
| Colaboração | Servidor compartilhado necessário; sem RBAC integrado na versão OSS | Workspaces em equipe integrados, links de compartilhamento e acesso baseado em funções |
| Preços | Gratuito e open-source; Databricks Managed MLflow custa a mais | Gratuito para indivíduos; planos pagos para equipes |
| Otimização de hiperparâmetros | Integra-se com Optuna, Ray Tune externamente | Sweeps integrados com busca Bayesiana/grid/aleatória |

## Exemplos de código

```python
# mlflow_full_example.py
# Full MLflow tracking example: logs params, metrics, a custom artifact,
# and registers the model in the Model Registry.
# pip install mlflow scikit-learn matplotlib

import mlflow
import mlflow.sklearn
import matplotlib.pyplot as plt
import numpy as np
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import (
    accuracy_score, roc_auc_score, classification_report
)
import os, tempfile, json

# ── 1. Data ──────────────────────────────────────────────────────────────────
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=0
)

# ── 2. Hyperparameters ────────────────────────────────────────────────────────
params = {
    "n_estimators": 200,
    "learning_rate": 0.05,
    "max_depth": 4,
    "subsample": 0.8,
    "random_state": 0,
}

# ── 3. MLflow run ─────────────────────────────────────────────────────────────
mlflow.set_experiment("breast-cancer-gbt")

with mlflow.start_run(run_name="gbt-tuned") as run:

    # Log hyperparameters
    mlflow.log_params(params)

    # Train
    clf = GradientBoostingClassifier(**params)
    clf.fit(X_train, y_train)

    # Evaluate
    y_pred = clf.predict(X_test)
    y_prob = clf.predict_proba(X_test)[:, 1]
    cv_scores = cross_val_score(clf, X_train, y_train, cv=5, scoring="roc_auc")

    metrics = {
        "accuracy": accuracy_score(y_test, y_pred),
        "roc_auc": roc_auc_score(y_test, y_prob),
        "cv_roc_auc_mean": cv_scores.mean(),
        "cv_roc_auc_std": cv_scores.std(),
    }
    mlflow.log_metrics(metrics)

    # Log a feature importance plot as an artifact
    with tempfile.TemporaryDirectory() as tmp:
        fig, ax = plt.subplots(figsize=(8, 5))
        feat_imp = clf.feature_importances_
        top_idx = np.argsort(feat_imp)[-10:]
        ax.barh(range(10), feat_imp[top_idx])
        ax.set_title("Top 10 feature importances")
        fig.tight_layout()
        plot_path = os.path.join(tmp, "feature_importance.png")
        fig.savefig(plot_path)
        plt.close(fig)
        mlflow.log_artifact(plot_path, artifact_path="plots")

        # Log classification report as JSON
        report = classification_report(y_test, y_pred, output_dict=True)
        report_path = os.path.join(tmp, "classification_report.json")
        with open(report_path, "w") as f:
            json.dump(report, f, indent=2)
        mlflow.log_artifact(report_path, artifact_path="evaluation")

    # Log and register the model
    mlflow.sklearn.log_model(
        clf,
        artifact_path="model",
        registered_model_name="breast-cancer-gbt",  # creates registry entry
    )

    print(f"Run ID  : {run.info.run_id}")
    for k, v in metrics.items():
        print(f"  {k}: {v:.4f}")

# ── 4. Load a registered model (simulates downstream serving) ─────────────────
# model_uri = "models:/breast-cancer-gbt/1"
# loaded = mlflow.sklearn.load_model(model_uri)
# print(loaded.predict(X_test[:3]))
```

## Recursos práticos

- [MLflow Official Documentation](https://mlflow.org/docs/latest/index.html) — Referência completa cobrindo todos os quatro componentes, API REST e destinos de implantação.
- [MLflow GitHub Repository](https://github.com/mlflow/mlflow) — Código fonte, rastreador de issues e exemplos; útil para entender os internos e contribuir.
- [Databricks – MLflow Tutorials](https://docs.databricks.com/en/mlflow/index.html) — Uso de MLflow em produção no Databricks com integração Unity Catalog.
- [Towards Data Science – MLflow in Production](https://towardsdatascience.com/deploy-mlflow-with-docker-compose-8059f16b6039) — Guia da comunidade sobre implantação de um servidor MLflow self-hosted com Docker Compose, PostgreSQL e MinIO.

## Veja também

- [Rastreamento de experimentos](/docs/mlops/experiment-tracking)
- [Weights & Biases](/docs/mlops/wandb)
- [MLOps](/docs/mlops)
