---
title: ML auf Kubernetes
description: Ausführen von Machine-Learning-Workloads auf Kubernetes — Containerisierung von Modellen, GPU-Scheduling und Skalierungsstrategien.
keywords: [Kubernetes, ML-Workloads, Docker, GPU-Scheduling, Containerisierung, K8s, MLOps, Ressourcenverwaltung, Skalierung]
---

# ML auf Kubernetes

## Definition

Kubernetes (K8s) ist eine Container-Orchestrierungsplattform, die das Deployment, die Skalierung und das Management von containerisierten Workloads automatisiert. Obwohl Kubernetes für zustandslose Webdienste konzipiert wurde, hat die ML-Community es weitgehend als Infrastruktur-Backbone für Trainingsjobs, Batch-Scoring und Model Serving übernommen — weil es die schwierigsten ML-Infrastrukturprobleme löst: Ressourcenisolierung, reproduzierbare Umgebungen, GPU-Scheduling und horizontale Skalierung.

Das Ausführen von ML auf Vanilla Kubernetes — ohne eine höherstufige Abstraktion wie [KubeFlow](/docs/mlops/deployment/kubeflow) — bedeutet das Zusammensetzen standard-mäßiger Kubernetes-Primitive: `Job` für einmalige Trainingsläufe, `CronJob` für geplantes Nachtraining, `Deployment` für langlebige Serving-Instanzen und `HorizontalPodAutoscaler` für Autoskalierung. Dieser Ansatz gibt Teams volle Kontrolle über jeden Aspekt ihrer Workloads auf Kosten von mehr YAML-Authoring und weniger ML-spezifischem Tooling.

Der wesentliche Unterschied zum Ausführen von ML auf Bare-Metal-VMs besteht darin, dass Kubernetes deklaratives Ressourcenmanagement bietet: Man gibt an, wie viel CPU, RAM und GPU ein Trainingsjob benötigt, und der Scheduler platziert ihn automatisch auf einem geeigneten Knoten. Kubernetes behandelt auch Knotenausfälle, Pod-Neustarts und Rolling Deployments ohne manuelle Eingriffe. Für ML-Teams, die bereits einen Kubernetes-Cluster betreiben (oder deren Organisation einen hat), ist dies oft der pragmatische Weg zur Produktion, bevor in eine vollständige Plattform wie KubeFlow investiert wird.

## Funktionsweise

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

### ML-Modelle containerisieren

Der erste Schritt beim Ausführen von ML auf Kubernetes besteht darin, den Modell-Code und seine Abhängigkeiten in ein Docker-Image zu verpacken. Ein gut strukturiertes ML-Dockerfile verwendet Multi-Stage-Builds, um die Abhängigkeitsinstallationsebene (die sich selten ändert und cacheable ist) von der Anwendungs-Code-Ebene (die sich häufig ändert) zu trennen. Das Basis-Image sollte auf eine bestimmte Version gepinnt sein — für GPU-Workloads bietet NVIDIA `nvcr.io/nvidia/pytorch`- und `nvcr.io/nvidia/tensorflow`-Basis-Images an, die CUDA, cuDNN und NCCL vorinstalliert und gemeinsam validiert enthalten. Das resultierende Image wird in eine Container-Registry gepusht und in Kubernetes-Manifesten nach Name und Digest (nicht `latest`) referenziert, was sicherstellt, dass jedes Mal genau dieselbe Umgebung verwendet wird.

### GPU-Scheduling und Ressourcenverwaltung

Kubernetes unterstützt GPU-Scheduling über das NVIDIA-Device-Plugin, das GPUs als planbare Ressource (`nvidia.com/gpu`) bereitstellt. Ein Pod, der `nvidia.com/gpu: 1` anfordert, wird nur auf einem Knoten geplant, der eine freie GPU hat, und die GPU wird diesem Pod für die Dauer seiner Lebensdauer exklusiv zugewiesen. Knoten-Pools werden typischerweise mit verschiedenen GPU-Typen konfiguriert (T4 für Inferenz, A100 für große Trainingsjobs) und entsprechend beschriftet, was Pods ermöglicht, `nodeSelector` oder `nodeAffinity` zu verwenden, um die geeignete Hardware zu targeten. Ressourcen-Quotas auf Namespace-Ebene verhindern, dass ein einzelnes Team die GPU-Kapazität des Clusters monopolisiert.

### Trainingsjobs

Einmalige Trainingsläufe werden als Kubernetes-`Job`-Objekte ausgedrückt. Ein Job erstellt einen oder mehrere Pods, wartet auf deren erfolgreichen Abschluss (Exit 0) und zeichnet das Ergebnis auf. Für verteiltes Training über mehrere GPUs oder Knoten erweitert der `training-operator` (früher der Kubeflow Training Operator, aber eigenständig deploybar) Kubernetes um `PyTorchJob`- und `TFJob`-Custom-Resources, die Multi-Node-, Multi-GPU-Training mit PyTorch DDP oder Horovod koordinieren. Jeder Worker-Pod erhält dasselbe Container-Image, aber verschiedene Rang- und World-Size-Umgebungsvariablen, was daten-paralleles Training mit automatischem Rendezvous ermöglicht.

### Serving-Deployments und Autoskalierung

Model Serving wird als Kubernetes-`Deployment` mit einer gewünschten Replikat-Anzahl und Ressourcenanforderungen/-limits ausgedrückt. Ein `Service` vom Typ `ClusterIP` routet Traffic zwischen Replikas, und ein `Ingress` oder `LoadBalancer`-Service stellt den Endpoint extern bereit. Der `HorizontalPodAutoscaler` (HPA) skaliert die Anzahl der Replikas basierend auf CPU-Auslastung, benutzerdefinierten Metriken (z. B. Anfragen pro Sekunde von Prometheus) oder externen Metriken (z. B. SQS-Warteschlangentiefe für Batch-Worker). Für latenzempfindliches Serving stellen `PodDisruptionBudgets` sicher, dass Rolling Updates nie mehr als einen konfigurierbaren Anteil der Replikas gleichzeitig herunterfahren.

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|---|---|
| Die Organisation bereits einen Kubernetes-Cluster betreibt | Das Team keine Kubernetes-Erfahrung hat und kein Platform-Team zur Unterstützung |
| Volle Kontrolle über Infrastruktur erforderlich ist (On-Premises, Air-gapped) | Ein verwalteter ML-Service (SageMaker, Vertex AI) verfügbar ist und den Anwendungsfall abdeckt |
| ML-Workloads einen Cluster mit anderen Engineering-Workloads teilen müssen | Die Einfachheit einer VM oder eines Cloud-Trainingsjobs ausreicht |
| GPU-Scheduling ohne den Overhead einer vollständigen ML-Plattform benötigt wird | Setup- und Wartungskosten von K8s die operativen Vorteile überwiegen |
| Portabilität über Cloud-Anbieter hinweg eine harte Anforderung ist | AutoML, Experiment-Tracking oder Multi-Tenancy benötigt wird (KubeFlow erwägen) |

## Vergleiche

| Kriterium | ML auf Kubernetes (Vanilla) | KubeFlow |
|---|---|---|
| Komplexität | Mittel — Standard-K8s-Objekte | Hoch — viele CRDs, Istio, Argo, MLMD |
| Features | Manuell — was gebaut werden muss | Eingebaut: Pipelines, AutoML (Katib), Serving (KServe), Notebooks |
| Lernkurve | Mittel — K8s-Wissen ausreichend | Steil — erfordert KubeFlow-spezifisches Wissen zusätzlich zu K8s |
| Flexibilität | Hoch — uneingeschränkte Nutzung von K8s-Primitiven | Moderat — an KubeFlow-Abstraktionen gebunden |
| Verwaltete Optionen | EKS, GKE, AKS (beliebiges verwaltetes K8s) | Vertex AI Pipelines (GKE-basiert), AWS Managed KubeFlow |
| Setup-Zeit | Stunden bis Tage | Tage bis Wochen |

## Vor- und Nachteile

| Vorteile | Nachteile |
|---|---|
| Volle Kontrolle — jede K8s-Ressource ohne Framework-Einschränkungen nutzen | Alle ML-spezifischen Werkzeuge (Pipeline-UI, Experiment-Tracking) müssen separat hinzugefügt werden |
| GPU-Scheduling und Multi-Node-Training mit dem Training-Operator | YAML-schwer — Manifest-Authoring kann tedious und fehleranfällig sein |
| Funktioniert auf jedem Cloud- oder On-Premises-Cluster (kein Vendor Lock-in) | GPU-Debugging auf K8s erfordert Vertrautheit mit Knoten-Taints, Limits und Device-Plugin |
| Rolling Deployments und Autoskalierung mit Standard-K8s-HPA | Ressourcen-Quota und Node-Affinity-Konfiguration erfordert Platform-Team-Beteiligung |
| Passt in bestehende GitOps-Workflows (Argo CD, Flux) | Keine eingebaute Modell-Registry, Experiment-Tracker oder Pipeline-UI |

## Code-Beispiele

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

## Praktische Ressourcen

- [Kubernetes offizielle Dokumentation](https://kubernetes.io/docs/) — Umfassende Referenz für alle Kubernetes-Konzepte und API-Objekte.
- [NVIDIA GPU Operator for Kubernetes](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/overview.html) — Automatisiert die Einrichtung von GPU-Treibern, Device-Plugins und Monitoring auf K8s-Knoten.
- [Kubeflow Training Operator](https://www.kubeflow.org/docs/components/training/) — Eigenständige CRDs für PyTorchJob, TFJob und MPI-verteiltes Training (deploybar ohne vollständiges KubeFlow).
- [Kubernetes HPA-Dokumentation](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/) — Offizieller Leitfaden für CPU-, Speicher- und Custom-Metrik-Autoskalierung.

## Siehe auch

- [KubeFlow](/docs/mlops/deployment/kubeflow)
- [Model Serving](/docs/mlops/deployment/model-serving)
- [Terraform für ML-Infrastruktur](/docs/mlops/iac/terraform)
