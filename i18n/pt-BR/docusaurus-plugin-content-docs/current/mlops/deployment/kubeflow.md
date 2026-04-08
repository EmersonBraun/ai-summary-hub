---
title: KubeFlow
description: Kit de ferramentas ML de código aberto para Kubernetes — pipelines, ajuste de hiperparâmetros e serviço de modelos em escala.
keywords: [KubeFlow, Kubernetes, pipelines ML, Katib, KFServing, ajuste de hiperparâmetros, MLOps, treinamento distribuído]
tags: [advanced]
authors: [EmersonBraun]
---

# KubeFlow

## Definição

KubeFlow é um kit de ferramentas ML de código aberto projetado para tornar o deployment de fluxos de trabalho ML no Kubernetes simples, portátil e escalável. Foi originalmente criado pelo Google e agora é um projeto da Cloud Native Computing Foundation (CNCF) com ampla adoção na indústria. KubeFlow não tenta ser uma plataforma monolítica única; em vez disso, é uma coleção curada de componentes nativos do Kubernetes que cada um resolve um problema distinto de infraestrutura ML.

Os componentes principais são: **KubeFlow Pipelines (KFP)** para definir e executar fluxos de trabalho ML baseados em DAG como jobs Kubernetes; **Katib** para ajuste automatizado de hiperparâmetros e busca de arquitetura neural usando otimização bayesiana, busca aleatória ou aprendizado por reforço; **KFServing (agora KServe)** para serviço de modelos escalável com escalonamento sem servidor, deployments canary e suporte para múltiplos runtimes de serviço; e **Jupyter Notebook Servers** gerenciados pelo painel KubeFlow para desenvolvimento interativo em um ambiente multi-inquilino. Toda a plataforma é instalada via um único conjunto de manifestos do Kubernetes e gerenciada por uma interface web.

O ponto forte do KubeFlow é que ele roda em qualquer cluster Kubernetes — on-premises, GKE, EKS, AKS ou um cluster kind local — tornando-o adequado para organizações que exigem que os dados permaneçam dentro de sua própria infraestrutura. Seu principal custo é a complexidade operacional: a curva de aprendizado é íngreme, e operar o KubeFlow em produção requer sólida expertise em Kubernetes.

## Como funciona

```mermaid
flowchart TB
  Developer["Cientista de Dados\n(Jupyter / SDK)"] -->|"definir pipeline"| KFP["KubeFlow Pipelines\n(KFP)"]
  KFP -->|"agenda pods"| K8s["Kubernetes\n(plano de controle)"]
  K8s -->|"executar job de treinamento"| TrainPod["Pod de Treinamento\n(pool de nós GPU)"]
  TrainPod -->|"registrar métricas"| Katib["Katib\n(ajuste de hiperparâmetros)"]
  Katib -->|"sugerir próximo trial"| TrainPod
  TrainPod -->|"enviar artefato"| Storage["Repositório de Modelos\n(S3 / GCS / MinIO)"]
  Storage -->|"registrar modelo"| KFServe["KServe\n(serviço de modelos)"]
  KFServe -->|"expor endpoint"| Client["Clientes de Predição"]
  KFP -->|"emitir eventos"| Dashboard["Painel KubeFlow\n(UI + RBAC)"]
```

### KubeFlow Pipelines (KFP)

O KFP permite que cientistas de dados definam pipelines ML como código Python usando o SDK do KFP. Cada etapa do pipeline é um componente containerizado: uma função Python decorada com `@dsl.component` é compilada em uma especificação de container que o KFP executa como um pod Kubernetes. O DAG do pipeline é compilado em um arquivo de Representação Intermediária (IR YAML) que o controlador backend do KFP agenda no cluster. Essa abordagem significa que cada etapa é totalmente reproduzível: a imagem do container é fixada, entradas e saídas são artefatos rastreados no armazenamento de metadados do KFP (ML Metadata / MLMD), e todo o gráfico de execução é visível na UI com logs, entradas, saídas e status por etapa.

### Katib — Ajuste de Hiperparâmetros

Katib é o componente AutoML do KubeFlow. Ele define um recurso customizado `Experiment` do Kubernetes que especifica o espaço de busca (intervalos e tipos de parâmetros), a métrica objetivo (minimizar perda, maximizar precisão) e o algoritmo de busca (otimização bayesiana via Processo Gaussiano, CMA-ES, busca aleatória ou busca em grade). O Katib executa trials paralelos — cada trial é um job de treinamento completo — e usa os resultados para sugerir melhores configurações para trials subsequentes. A integração com o KFP significa que um pipeline completo (dados → engenharia de features → treinamento → avaliação) pode ser tratado como um único trial do Katib, habilitando AutoML de ponta a ponta em pipelines complexos.

### KServe (anteriormente KFServing)

O KServe estende o Kubernetes com recursos customizados `InferenceService` que definem declarativamente os deployments de serviço de modelos. Especifica-se o framework (sklearn, xgboost, pytorch, tensorflow, customizado) e o URI do modelo (caminho S3, PVC) e o KServe cuida de: baixar o modelo, selecionar o runtime de serviço correto, configurar o proxy sidecar, expor o endpoint via Istio e escalar réplicas para zero quando inativas (modo sem servidor). Deployments canary dividem o tráfego entre duas versões do modelo por percentual, habilitando lançamentos seguros. Os componentes de transformer e explainer permitem conectar lógica de pré-processamento e explicabilidade baseada em SHAP ao lado do preditor.

### Multi-inquilino e RBAC

O painel KubeFlow implementa multi-inquilino via namespaces Kubernetes: cada usuário ou equipe obtém um namespace isolado com suas próprias cotas de recursos, servidores de notebooks e execuções de pipeline. O Controle de Acesso Baseado em Funções (RBAC) restringe quais usuários podem visualizar, executar ou gerenciar pipelines e modelos. Isso torna o KubeFlow adequado para grandes organizações onde múltiplas equipes compartilham um único cluster GPU e precisam de isolamento sem clusters separados.

## Quando usar / Quando NÃO usar

| Usar quando | Evitar quando |
|---|---|
| Cargas de trabalho ML são executadas em um cluster Kubernetes existente | A equipe não tem expertise em Kubernetes nem engenheiro de plataforma dedicado |
| É necessária orquestração completa de pipelines, AutoML e serviço em uma plataforma | Um serviço gerenciado (SageMaker, Vertex AI) se encaixa na estratégia do provedor cloud |
| Requisitos de residência de dados impedem o uso de serviços ML cloud gerenciados | Apenas serviço de modelos é necessário, não orquestração completa de pipelines |
| A organização opera um cluster GPU compartilhado com necessidades de multi-inquilino | Os fluxos de trabalho ML são simples o suficiente para um único script de treinamento |
| Recursos avançados de serviço (escalonamento sem servidor, canary, transformers) são necessários | A velocidade de chegada à produção é mais importante do que o controle da infraestrutura |

## Comparações

| Critério | KubeFlow | ML no Kubernetes (vanilla) |
|---|---|---|
| Complexidade | Alta — muitos CRDs, controladores e dependências do Istio | Média — apenas objetos Kubernetes padrão |
| Recursos | Pipelines, AutoML (Katib), serviço (KServe), gerenciamento de notebooks | O que for construído e configurado manualmente |
| Curva de aprendizado | Íngreme — requer conhecimento específico de Kubernetes + KubeFlow | Média — conhecimento padrão de K8s suficiente |
| Flexibilidade | Moderada — extensível mas vinculado às abstrações do KubeFlow | Alta — controle total sobre cada recurso Kubernetes |
| Opções gerenciadas | Kubeflow no GKE (Vertex AI Pipelines), AWS Managed KubeFlow | Qualquer Kubernetes gerenciado (EKS, GKE, AKS) |
| Tempo de configuração | Dias a semanas para instalação de nível produção | Horas a dias dependendo da complexidade da carga de trabalho |

## Prós e contras

| Prós | Contras |
|---|---|
| Plataforma ML unificada — pipelines, ajuste, serviço em um sistema | Complexidade operacional muito alta e grande número de partes móveis |
| Agnóstico à nuvem — roda em qualquer cluster Kubernetes | Curva de aprendizado íngreme; requer expertise em Kubernetes para operar |
| Serviço de modelos sem servidor com escalonamento automático para zero | Instalação intensiva em recursos (Istio, Argo Workflows, MLMD, Knative) |
| Multi-inquilino robusto com isolamento de namespace e RBAC | Atualizações entre versões do KubeFlow podem ser trabalhosas |
| Comunidade CNCF ativa e amplas integrações do ecossistema | Depurar falhas frequentemente requer compreender múltiplas camadas (K8s → Argo → Python SDK) |

## Exemplos de código

```python
# kubeflow_pipeline.py
# SDK KubeFlow Pipelines v2 — define um pipeline ML de duas etapas:
#   1. Componente de pré-processamento de dados
#   2. Componente de treinamento
# Requer: pip install kfp==2.*

from kfp import dsl
from kfp.client import Client


# --- Componente 1: Pré-processar dados CSV brutos ---

@dsl.component(
    base_image="python:3.11-slim",
    packages_to_install=["pandas==2.2.0", "scikit-learn==1.4.0"],
)
def preprocess(
    raw_data_path: str,
    output_features: dsl.Output[dsl.Dataset],
) -> None:
    """
    Lê CSV bruto, aplica engenharia de features e escreve features como Parquet.
    KFP rastreia output_features como um artefato Dataset com URI e metadados.
    """
    import pandas as pd
    from sklearn.preprocessing import StandardScaler

    df = pd.read_csv(raw_data_path)

    # Engenharia de features simples: escalar colunas numéricas
    scaler = StandardScaler()
    numeric_cols = df.select_dtypes("number").columns.tolist()
    df[numeric_cols] = scaler.fit_transform(df[numeric_cols])

    # KFP fornece output_features.path — escrever artefato lá
    df.to_parquet(output_features.path, index=False)
    print(f"Wrote {len(df)} rows to {output_features.path}")


# --- Componente 2: Treinar um modelo nas features pré-processadas ---

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
    Treina um RandomForestClassifier e escreve o artefato do modelo + métricas.
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

    # Escrever artefato do modelo (KFP rastreia o URI e a linhagem)
    joblib.dump(clf, model_output.path)

    # Registrar métricas — visíveis na UI do KubeFlow Pipelines
    metrics_output.log_metric("accuracy", accuracy)
    metrics_output.log_metric("n_estimators", n_estimators)
    print(f"Accuracy: {accuracy:.4f}")


# --- Definição do pipeline ---

@dsl.pipeline(
    name="fraud-detection-pipeline",
    description="Pipeline de duas etapas: pré-processar dados CSV, depois treinar RandomForest.",
)
def fraud_pipeline(
    raw_data_path: str = "gs://my-bucket/data/train.csv",
    n_estimators: int = 100,
) -> None:
    # Etapa 1: pré-processamento — executa em seu próprio pod
    preprocess_task = preprocess(raw_data_path=raw_data_path)

    # Etapa 2: treinamento — depende do artefato Dataset da etapa 1
    train_task = train(
        features=preprocess_task.outputs["output_features"],
        n_estimators=n_estimators,
    )
    # Atribuir esta tarefa a um pool de nós com GPU (solicitação de recurso opcional)
    train_task.set_accelerator_type("NVIDIA_TESLA_T4").set_accelerator_limit(1)


# --- Enviar o pipeline para uma instância KubeFlow Pipelines em execução ---

if __name__ == "__main__":
    # Conectar ao backend KFP (port-forward: kubectl port-forward -n kubeflow svc/ml-pipeline 8888:8888)
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

## Recursos práticos

- [Documentação oficial do KubeFlow](https://www.kubeflow.org/docs/) — Visão geral da arquitetura, guias de componentes e instruções de instalação.
- [Referência do SDK do KubeFlow Pipelines](https://kubeflow-pipelines.readthedocs.io/) — Referência completa da API para o SDK Python KFP v2.
- [Documentação do KServe](https://kserve.github.io/website/) — Runtime de serviço, especificação InferenceService e guia de lançamento canary.
- [Guia de ajuste de hiperparâmetros do Katib](https://www.kubeflow.org/docs/components/katib/overview/) — Especificação de experimentos, algoritmos de busca e integração com operadores de treinamento.

## Veja também

- [ML no Kubernetes](/docs/mlops/deployment/ml-kubernetes)
- [Serviço de modelos](/docs/mlops/deployment/model-serving)
- [Monitoramento](/docs/mlops/monitoring)
