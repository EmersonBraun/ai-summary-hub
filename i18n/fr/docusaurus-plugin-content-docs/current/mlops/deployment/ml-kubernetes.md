---
title: ML sur Kubernetes
description: Exécution de charges de travail d'apprentissage automatique sur Kubernetes — conteneurisation des modèles, planification GPU et stratégies de scaling.
keywords: [Kubernetes, charges de travail ML, Docker, planification GPU, conteneurisation, K8s, MLOps, gestion des ressources, scaling]
---

# ML sur Kubernetes

## Définition

Kubernetes (K8s) est une plateforme d'orchestration de conteneurs qui automatise le déploiement, le scaling et la gestion des charges de travail conteneurisées. Bien que Kubernetes ait été conçu pour les services web sans état, la communauté ML l'a largement adopté comme épine dorsale d'infrastructure pour les jobs d'entraînement, le scoring par lots et le service de modèles — parce qu'il résout les problèmes d'infrastructure ML les plus difficiles : isolation des ressources, environnements reproductibles, planification GPU et scaling horizontal.

Exécuter du ML sur Kubernetes vanilla — sans abstraction de niveau supérieur comme [KubeFlow](/docs/mlops/deployment/kubeflow) — signifie composer des primitives Kubernetes standard : `Job` pour les exécutions d'entraînement ponctuelles, `CronJob` pour le réentraînement planifié, `Deployment` pour les instances de service de longue durée et `HorizontalPodAutoscaler` pour l'autoscaling. Cette approche donne aux équipes un contrôle total sur tous les aspects de leurs charges de travail au prix d'une plus grande création de YAML et de moins d'outillage spécifique au ML intégré.

La différence clé par rapport à l'exécution du ML sur des VMs nues est que Kubernetes fournit une gestion déclarative des ressources : vous spécifiez combien de CPU, RAM et GPU un job d'entraînement nécessite, et le scheduler le place automatiquement sur un nœud approprié. Kubernetes gère également les défaillances de nœuds, les redémarrages de pods et les déploiements en cours sans intervention manuelle. Pour les équipes ML qui exploitent déjà un cluster Kubernetes (ou dont l'organisation en possède un), c'est souvent le chemin pragmatique vers la production avant d'investir dans une plateforme complète comme KubeFlow.

## Fonctionnement

```mermaid
flowchart TB
  Developer["Data Scientist\n(writes Dockerfile + YAML)"] -->|"docker build + push"| Registry["Container Registry\n(ECR / GCR / GHCR)"]
  Registry -->|"image pull"| K8s["Kubernetes Cluster"]
  K8s -->|"schedule on GPU node"| TrainJob["Training Job\n(K8s Job)"]
  K8s -->|"scale replicas"| ServingDeploy["Serving Deployment\n(K8s Deployment + HPA)"]
  ServingDeploy -->|"expose externally"| Ingress["Ingress / LoadBalancer"]
  Ingress -->|"traffic"| Client["Client"]
  TrainJob -->|"write artifacts"| PVC["Persistent Volume\nor Object Storage"]
  PVC -->|"model load"| ServingDeploy
  K8s -->|"GPU request"| GPUNode["GPU Node Pool\n(nvidia.com/gpu resource)"]
```

### Conteneurisation des modèles ML

La première étape pour exécuter du ML sur Kubernetes est d'empaqueter le code du modèle et ses dépendances dans une image Docker. Un Dockerfile ML bien structuré utilise des builds multi-étapes pour séparer la couche d'installation des dépendances (qui change rarement et est cacheable) de la couche de code d'application (qui change fréquemment). L'image de base doit être épinglée à une version spécifique — pour les charges de travail GPU, NVIDIA fournit des images de base `nvcr.io/nvidia/pytorch` et `nvcr.io/nvidia/tensorflow` qui incluent CUDA, cuDNN et NCCL pré-installés et validés ensemble. L'image résultante est poussée vers un registre de conteneurs et référencée par son nom et son digest (pas `latest`) dans les manifestes Kubernetes, garantissant que le même environnement exact est utilisé à chaque fois.

### Planification GPU et gestion des ressources

Kubernetes supporte la planification GPU via le plugin de périphérique NVIDIA, qui expose les GPUs comme une ressource planifiable (`nvidia.com/gpu`). Un pod qui demande `nvidia.com/gpu: 1` ne sera planifié que sur un nœud disposant d'un GPU libre, et le GPU est exclusivement alloué à ce pod pendant toute sa durée de vie. Les pools de nœuds sont généralement configurés avec différents types de GPU (T4 pour l'inférence, A100 pour les grands jobs d'entraînement) et étiquetés en conséquence, permettant aux pods d'utiliser `nodeSelector` ou `nodeAffinity` pour cibler le matériel approprié. Les quotas de ressources au niveau du namespace empêchent toute équipe unique de monopoliser la capacité GPU du cluster.

### Jobs d'entraînement

Les exécutions d'entraînement ponctuelles sont exprimées comme des objets `Job` Kubernetes. Un Job crée un ou plusieurs pods, attend leur completion avec succès (exit 0) et enregistre le résultat. Pour l'entraînement distribué sur plusieurs GPUs ou nœuds, le `training-operator` (anciennement le Kubeflow Training Operator, mais déployable de manière autonome) étend Kubernetes avec des ressources personnalisées `PyTorchJob` et `TFJob` qui coordonnent l'entraînement multi-nœud et multi-GPU avec PyTorch DDP ou Horovod. Chaque pod worker reçoit la même image de conteneur mais des variables d'environnement de rang et de world-size différentes, permettant un entraînement parallèle de données avec rendezvous automatique.

### Déploiements de service et autoscaling

Le service de modèles est exprimé comme un `Deployment` Kubernetes avec un nombre de réplicas souhaité et des demandes/limites de ressources. Un `Service` de type `ClusterIP` route le trafic entre les réplicas, et un `Ingress` ou service `LoadBalancer` expose l'endpoint en externe. Le `HorizontalPodAutoscaler` (HPA) fait évoluer le nombre de réplicas en fonction de l'utilisation du CPU, de métriques personnalisées (par exemple, les requêtes par seconde de Prometheus) ou de métriques externes (par exemple, la profondeur de file SQS pour les workers batch). Pour le service sensible à la latence, les `PodDisruptionBudgets` garantissent que les mises à jour en cours ne prennent jamais plus d'une fraction configurable de réplicas simultanément.

## Quand utiliser / Quand NE PAS utiliser

| Utiliser quand | Éviter quand |
|---|---|
| L'organisation exploite déjà un cluster Kubernetes | Votre équipe n'a pas d'expérience Kubernetes et pas d'équipe de plateforme pour la soutenir |
| Un contrôle total de l'infrastructure est requis (sur site, air-gapped) | Un service ML géré (SageMaker, Vertex AI) est disponible et correspond au cas d'utilisation |
| Les charges de travail ML doivent partager un cluster avec d'autres charges de travail d'ingénierie | La simplicité d'une VM ou d'un job d'entraînement cloud est suffisante |
| Vous avez besoin de planification GPU sans la surcharge d'une plateforme ML complète | Le coût de configuration et de maintenance de K8s dépasse les avantages opérationnels |
| La portabilité entre les fournisseurs cloud est une exigence stricte | Vous avez besoin d'AutoML, de suivi d'expériences ou de multi-tenancy (considérez KubeFlow) |

## Comparaisons

| Critère | ML sur Kubernetes (vanilla) | KubeFlow |
|---|---|---|
| Complexité | Moyenne — objets K8s standard | Élevée — nombreux CRDs, Istio, Argo, MLMD |
| Fonctionnalités | Manuel — construisez ce dont vous avez besoin | Pipelines intégrés, AutoML (Katib), service (KServe), notebooks |
| Courbe d'apprentissage | Moyenne — connaissance K8s suffisante | Raide — nécessite une connaissance spécifique à KubeFlow en plus de K8s |
| Flexibilité | Élevée — utilisation sans restriction des primitives K8s | Modérée — lié aux abstractions KubeFlow |
| Options gérées | EKS, GKE, AKS (tout K8s géré) | Vertex AI Pipelines (basé sur GKE), AWS managed KubeFlow |
| Temps de configuration | Heures à jours | Jours à semaines |

## Avantages et inconvénients

| Avantages | Inconvénients |
|---|---|
| Contrôle total — utilisez n'importe quelle ressource K8s sans contraintes de framework | Tout l'outillage spécifique au ML (interface pipeline, suivi d'expériences) doit être ajouté séparément |
| Planification GPU et entraînement multi-nœud avec le training-operator | Lourd en YAML — la création de manifestes peut être fastidieuse et sujette aux erreurs |
| Fonctionne sur tout cloud ou cluster sur site (pas de verrouillage fournisseur) | Le débogage GPU sur K8s nécessite une familiarité avec les taints de nœuds, les limites et le plugin de périphérique |
| Déploiements en cours et autoscaling avec le HPA standard K8s | La configuration des quotas de ressources et de l'affinité de nœuds nécessite l'implication de l'équipe de plateforme |
| S'intègre dans les workflows GitOps existants (Argo CD, Flux) | Pas de registre de modèles, de suivi d'expériences ou d'interface de pipeline intégrés |

## Exemples de code

```dockerfile
# Dockerfile — Multi-stage build for an ML model serving image
# Stage 1: install Python dependencies (cacheable layer)
# Stage 2: copy application code on top

# --- Stage 1: dependency builder ---
FROM python:3.11-slim AS builder

WORKDIR /build

# Install build tools and compile dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libgomp1 \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
# Install dependencies into an isolated prefix so we can copy only them to the final image
RUN pip install --prefix=/install --no-cache-dir -r requirements.txt


# --- Stage 2: lean runtime image ---
FROM python:3.11-slim AS runtime

WORKDIR /app

# Copy only the installed packages from the builder (keeps image small)
COPY --from=builder /install /usr/local

# Copy application source code
COPY src/ ./src/

# The model artifact is mounted via a Kubernetes PersistentVolumeClaim or downloaded at startup
# It is NOT baked into the image to keep image size manageable
ENV MODEL_PATH=/models/model.joblib
ENV MODEL_VERSION=unknown
ENV PORT=8080

EXPOSE 8080

# Run as non-root for security best practices
RUN useradd -m appuser
USER appuser

CMD ["python", "-m", "uvicorn", "src.fastapi_serving:app", "--host", "0.0.0.0", "--port", "8080"]
```

```yaml
# k8s-manifests.yaml
# Three Kubernetes resources:
#   1. Deployment — runs the model serving pods
#   2. Service — routes traffic to the pods
#   3. HorizontalPodAutoscaler — scales replicas based on CPU usage

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: fraud-detector
  namespace: ml-serving
  labels:
    app: fraud-detector
    version: v1
spec:
  replicas: 2
  selector:
    matchLabels:
      app: fraud-detector
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1          # allow one extra pod during rollout
      maxUnavailable: 0    # never take a pod down before a new one is ready
  template:
    metadata:
      labels:
        app: fraud-detector
        version: v1
    spec:
      # Pull the model from an init container instead of baking it into the image
      initContainers:
        - name: download-model
          image: amazon/aws-cli:2.15.0
          command:
            - aws
            - s3
            - cp
            - s3://my-ml-bucket/models/fraud-detector/v1/model.joblib
            - /models/model.joblib
          env:
            - name: AWS_REGION
              value: us-east-1
          volumeMounts:
            - name: model-volume
              mountPath: /models

      containers:
        - name: serving
          image: ghcr.io/org/fraud-detector:sha-abc1234  # pinned by digest, not latest
          ports:
            - containerPort: 8080
          env:
            - name: MODEL_PATH
              value: /models/model.joblib
            - name: MODEL_VERSION
              value: v1
          resources:
            requests:
              cpu: "500m"
              memory: "512Mi"
            limits:
              cpu: "1"
              memory: "1Gi"
              # Uncomment for GPU-based inference:
              # nvidia.com/gpu: "1"
          volumeMounts:
            - name: model-volume
              mountPath: /models
          # Liveness probe — restart if the app hangs
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 15
            periodSeconds: 10
          # Readiness probe — do not send traffic until model is loaded
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 10
            periodSeconds: 5

      volumes:
        - name: model-volume
          emptyDir: {}  # ephemeral volume shared between init and main containers

---
apiVersion: v1
kind: Service
metadata:
  name: fraud-detector
  namespace: ml-serving
spec:
  selector:
    app: fraud-detector
  ports:
    - name: http
      port: 80
      targetPort: 8080
  type: ClusterIP

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: fraud-detector-hpa
  namespace: ml-serving
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: fraud-detector
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70   # scale out when average CPU exceeds 70%
```

```bash
# Useful kubectl commands for ML workloads on Kubernetes

# Check GPU node availability and allocatable GPUs
kubectl get nodes -l accelerator=nvidia-tesla-t4 -o custom-columns="NODE:.metadata.name,GPU:.status.allocatable.nvidia\.com/gpu"

# Watch pod startup (useful for debugging model download in init containers)
kubectl logs -n ml-serving deploy/fraud-detector -c download-model --follow

# View resource usage of serving pods
kubectl top pods -n ml-serving -l app=fraud-detector

# Scale the deployment manually (overrides HPA temporarily)
kubectl scale deploy/fraud-detector -n ml-serving --replicas=4

# Trigger a rolling update with a new image
kubectl set image deploy/fraud-detector serving=ghcr.io/org/fraud-detector:sha-def5678 -n ml-serving

# Watch rollout status
kubectl rollout status deploy/fraud-detector -n ml-serving
```

## Ressources pratiques

- [Documentation officielle Kubernetes](https://kubernetes.io/docs/) — Référence complète pour tous les concepts et objets API Kubernetes.
- [NVIDIA GPU Operator pour Kubernetes](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/overview.html) — Automatise la configuration des pilotes GPU, des plugins de périphérique et de la surveillance sur les nœuds K8s.
- [Kubeflow Training Operator](https://www.kubeflow.org/docs/components/training/) — CRDs autonomes pour PyTorchJob, TFJob et entraînement distribué MPI (déployable sans KubeFlow complet).
- [Documentation Kubernetes HPA](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) — Guide officiel pour l'autoscaling CPU, mémoire et métriques personnalisées.

## Voir aussi

- [KubeFlow](/docs/mlops/deployment/kubeflow)
- [Service de modèles](/docs/mlops/deployment/model-serving)
- [Terraform pour l'infrastructure ML](/docs/mlops/iac/terraform)
