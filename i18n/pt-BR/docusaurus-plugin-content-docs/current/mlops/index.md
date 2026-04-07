---
title: MLOps
description: Overview of MLOps, why it matters, and how it bridges machine learning and production engineering.
keywords: [MLOps, machine learning operations, ML lifecycle, reproducibility, automation, monitoring, DevOps]
tags: [beginner]
authors: [EmersonBraun]
---

# MLOps

## Definição

MLOps — Machine Learning Operations — é a disciplina de aplicar os princípios e práticas do DevOps ao ciclo de vida do aprendizado de máquina. Ela fornece as ferramentas, os processos e as normas culturais necessárias para desenvolver, implantar e manter modelos de ML de forma confiável em produção. Sem MLOps, as equipes frequentemente entregam modelos que funcionam em notebooks mas se degradam silenciosamente em produção, não podem ser reproduzidos seis meses depois ou levam semanas para serem atualizados.

Os princípios fundamentais do MLOps são a **reprodutibilidade** (cada experimento e implantação pode ser recriado exatamente), a **automação** (pipelines de dados, treinamento, avaliação e implantação são acionados por código, não por etapas manuais), o **monitoramento** (o desempenho do modelo é rastreado continuamente em produção) e a **colaboração** (cientistas de dados, engenheiros de ML e equipes de plataforma compartilham ferramentas, padrões e responsabilidades). Esses princípios correspondem diretamente aos pilares do DevOps — integração contínua, entrega e feedback — aplicados a dados e artefatos de modelos em vez de apenas código.

O MLOps surgiu quando as equipes descobriram que as práticas de engenharia de software que dominam a complexidade do software não se transferem automaticamente para o ML. O código é apenas uma entrada: as distribuições de dados mudam, a precisão do modelo decai, os experimentos proliferam, e um modelo que teve bom desempenho num conjunto de validação em janeiro pode se comportar de forma imprevisível em julho. O MLOps fornece o suporte para detectar e responder a esses problemas de forma sistemática.

## Como funciona

### Gerenciamento de dados

Os dados brutos são ingeridos, validados, versionados e armazenados em um feature store ou data lake. A validação de dados detecta desvios de esquema e mudanças de distribuição antes que corrompam uma execução de treinamento. O versionamento garante que os modelos possam ser retreinados exatamente com os dados que produziram uma versão anterior.

### Experimentação e treinamento

Os cientistas de dados executam experimentos — variando hiperparâmetros, arquiteturas e conjuntos de features — e todas as execuções são registradas em um rastreador de experimentos. A melhor execução é promovida para avaliação adicional. Os pipelines de treinamento automatizados (acionados por novos dados ou um commit de código) eliminam etapas manuais e permitem o retreinamento contínuo.

### Avaliação e validação

Os modelos candidatos são avaliados em conjuntos de teste retidos, verificações de equidade e orçamentos de latência antes da promoção. Os portais de avaliação impedem que regressões cheguem à produção. Testes A/B ou implantações sombra podem comparar modelos candidatos e de produção com tráfego real.

### Implantação e serving

Os modelos aprovados são empacotados, registrados em um registro de modelos e implantados por meio de pipelines CI/CD na infraestrutura de serving. Implantações canary e mecanismos de rollback reduzem o risco. A infraestrutura como código garante que os ambientes de serving sejam reproduzíveis.

### Monitoramento e feedback

As métricas de produção — distribuições de previsões, desvio de dados, latência, taxas de erro — são coletadas e retroalimentadas à equipe. Os alertas acionam pipelines de retreinamento ou rollbacks de modelos. Os loops de feedback fecham o ciclo de vida do ML, transformando sinais de produção em novos dados de treinamento.

```mermaid
flowchart LR
  Data[Raw data] -->|"validate & version"| Features[Feature engineering]
  Features -->|"create dataset"| Train[Model training]
  Train -->|"log run"| Experiment[Experiment tracker]
  Experiment -->|"select best run"| Evaluate[Evaluation & testing]
  Evaluate -->|"pass gates"| Registry[Model registry]
  Registry -->|"CI/CD deploy"| Serve[Model serving]
  Serve -->|"collect metrics"| Monitor[Monitoring]
  Monitor -->|"detect drift"| Data
```

## Quando usar / Quando NÃO usar

| Usar quando | Evitar quando |
|----------|------------|
| Modelos são implantados em produção e atendem usuários reais | O projeto é uma análise pontual ou um protótipo de pesquisa |
| Vários membros da equipe colaboram nos mesmos modelos | A equipe tem menos de duas pessoas e um único modelo |
| Os modelos requerem retreinamento periódico à medida que os dados derivam | O modelo é estático e nunca será atualizado |
| Requisitos regulatórios ou de auditoria exigem reprodutibilidade | A velocidade de exploração é a única prioridade e nenhuma implantação em produção está planejada |
| Há mais de um modelo em produção para gerenciar | A sobrecarga das ferramentas supera a vida útil esperada do projeto |

## Exemplos de código

```python
# mlflow_quickstart.py
# Demonstrates basic MLflow experiment tracking for a simple classifier.
# Run: pip install mlflow scikit-learn

import mlflow
import mlflow.sklearn
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score

# Load data
X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Define hyperparameters to log
params = {
    "n_estimators": 100,
    "max_depth": 5,
    "random_state": 42,
}

# Start an MLflow experiment run
mlflow.set_experiment("iris-classification")

with mlflow.start_run(run_name="random-forest-baseline"):
    # Log hyperparameters
    mlflow.log_params(params)

    # Train the model
    clf = RandomForestClassifier(**params)
    clf.fit(X_train, y_train)

    # Evaluate
    y_pred = clf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred, average="weighted")

    # Log metrics
    mlflow.log_metric("accuracy", accuracy)
    mlflow.log_metric("f1_score", f1)

    # Log the trained model with a registered name
    mlflow.sklearn.log_model(
        clf,
        artifact_path="model",
        registered_model_name="iris-random-forest",
    )

    print(f"Accuracy: {accuracy:.4f} | F1: {f1:.4f}")
    print(f"Run ID: {mlflow.active_run().info.run_id}")
```

## Recursos práticos

- [Google – Practitioners Guide to MLOps](https://services.google.com/fh/files/misc/practitioners_guide_to_mlops_whitepaper.pdf) — Whitepaper abrangente cobrindo os níveis de maturidade do MLOps, escolhas de ferramentas e padrões organizacionais do Google Cloud.
- [MLflow Documentation](https://mlflow.org/docs/latest/index.html) — Documentação oficial da plataforma MLOps de código aberto mais adotada, cobrindo rastreamento, registro, projetos e implantação.
- [Made With ML – MLOps Course](https://madewithml.com/) — Curso de MLOps gratuito e baseado em projetos que percorre todo o ciclo de vida com código real.
- [Chip Huyen – Designing Machine Learning Systems](https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/) — Livro da O'Reilly cobrindo design de sistemas de ML em produção, pipelines de dados, feature stores e monitoramento.
- [CD Foundation – MLOps SIG](https://github.com/cdfoundation/sig-mlops) — Definições conduzidas pela comunidade, panorama e melhores práticas para MLOps.

## Veja também

- [Experiment tracking](/docs/mlops/experiment-tracking)
- [MLflow](/docs/mlops/mlflow)
- [Weights & Biases](/docs/mlops/wandb)
- [Feature stores](/docs/mlops/feature-stores)
