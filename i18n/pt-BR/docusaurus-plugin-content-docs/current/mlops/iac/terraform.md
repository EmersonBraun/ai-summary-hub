---
title: Terraform
description: Ferramenta declarativa de Infraestrutura como Código da HashiCorp para provisionar e gerenciar recursos em nuvem, amplamente usada para criar infraestrutura de ML reprodutível, incluindo instâncias de GPU, buckets de armazenamento e clusters Kubernetes.
keywords: [Terraform, IaC, infraestrutura como código, declarativo, HCL, AWS, GCP, Azure, gerenciamento de estado, instâncias de GPU, infraestrutura de ML]
---

# Terraform

## Definição

Terraform é uma ferramenta de Infraestrutura como Código (IaC) open-source criada pela HashiCorp que permite definir, provisionar e gerenciar infraestrutura em nuvem e on-premises usando uma linguagem de configuração declarativa chamada HCL (HashiCorp Configuration Language). Você descreve o estado final desejado da sua infraestrutura — quais recursos devem existir, como devem ser configurados e como se relacionam entre si — e o Terraform descobre o que criar, atualizar ou destruir para atingir esse estado. Esse modelo declarativo é fundamentalmente diferente das abordagens de scripting imperativo, onde você descreve a sequência de etapas a executar.

A pedra angular da arquitetura do Terraform é seu ecossistema de **providers**. Um provider é um plugin que traduz definições de recursos HCL em chamadas de API contra uma plataforma específica: AWS, Google Cloud, Azure, Kubernetes, Datadog, GitHub e centenas mais. Cada provider mantém seu próprio ciclo de release versionado, e o Terraform baixa providers automaticamente com base em blocos `required_providers`. Isso significa que uma única configuração Terraform pode simultaneamente provisionar um cluster de treinamento de GPU na AWS, um bucket GCS para dados de treinamento, um namespace Kubernetes para servição de modelos e um dashboard Grafana para monitoramento — com tooling consistente em todas as plataformas.

O **gerenciamento de estado** é o que torna o Terraform idempotente e planejável. O Terraform mantém um arquivo de estado que mapeia cada recurso na configuração ao seu equivalente no mundo real (identificado pelos IDs de recursos do provedor de nuvem). Quando você executa `terraform plan`, o Terraform compara o arquivo de estado atual com sua configuração e a infraestrutura ao vivo, produzindo um diff que mostra exatamente o que mudará antes que qualquer mudança seja feita. Para fluxos de trabalho em equipe, o estado é armazenado em um backend compartilhado (S3, GCS, Terraform Cloud) com locking para evitar modificações concorrentes. Essa auditabilidade e previsibilidade tornam o Terraform a ferramenta de IaC dominante para provisionar infraestrutura de treinamento e servição de ML em ambientes regulados e colaborativos.

## Como funciona

### Escrever configuração

Os engenheiros escrevem arquivos HCL (`.tf`) que declaram recursos, fontes de dados, variáveis, outputs e módulos. Os recursos correspondem a objetos de infraestrutura (uma instância EC2, um bucket S3, um deployment Kubernetes). As fontes de dados leem infraestrutura existente sem gerenciá-la. As variáveis parametrizam as configurações para reutilização em ambientes. Os módulos encapsulam conjuntos reutilizáveis de recursos — um módulo de "cluster de treinamento de GPU" pode ser instanciado múltiplas vezes com diferentes tipos de instância e regiões.

### Inicializar e planejar

Executar `terraform init` baixa os providers e módulos necessários e inicializa o backend. Executar `terraform plan` produz um plano de execução legível por humanos: uma lista de recursos para adicionar (+), alterar (~) ou destruir (−). A fase de planejamento é somente leitura — ela não faz alterações na infraestrutura. As equipes tipicamente integram `terraform plan` em pipelines de CI para revisar mudanças em pull requests antes de fazer o merge.

### Aplicar e gerenciamento de estado

`terraform apply` executa o plano, chamando APIs de providers para criar, atualizar ou excluir recursos na ordem de dependência. O Terraform resolve o gráfico de dependências automaticamente com base em referências entre recursos (por exemplo, uma subnet que referencia um ID de VPC). Após o apply, o arquivo de estado é atualizado para refletir o novo estado da infraestrutura. Para infraestrutura de ML, isso significa que instâncias de GPU, buckets de armazenamento, roles IAM e clusters Kubernetes são todos criados na ordem correta com as configurações corretas em um único comando.

### Destruir e gerenciamento de ciclo de vida

`terraform destroy` derruba todos os recursos gerenciados pela configuração — útil para ambientes de treinamento efêmeros que não devem rodar (e custar dinheiro) entre jobs de treinamento. Meta-argumentos de ciclo de vida (`create_before_destroy`, `prevent_destroy`, `ignore_changes`) fornecem controle refinado sobre como o Terraform lida com recursos sensíveis como buckets de armazenamento de artefatos de modelos que nunca devem ser acidentalmente excluídos.

```mermaid
flowchart LR
  HCL[HCL configuration\n.tf files] -->|"terraform init"| Init[Provider & module\ndownload]
  Init -->|"terraform plan"| Plan[Execution plan\ndiff against state]
  Plan -->|"human review / CI approval"| Apply[terraform apply]
  Apply -->|"API calls"| Cloud[Cloud provider APIs\nAWS / GCP / Azure]
  Cloud -->|"resource IDs"| State[State file\nS3 / GCS backend]
  State -->|"next plan reads state"| Plan
```

## Quando usar / Quando NÃO usar

| Usar quando | Evitar quando |
|-------------|---------------|
| Provisionando infraestrutura em nuvem que deve ser reprodutível entre ambientes | Configurando software dentro de instâncias existentes (use Ansible para isso) |
| Gerenciando infraestrutura de ML em escala: clusters de GPU, armazenamento, redes, Kubernetes | Sua equipe não tem infraestrutura em nuvem para gerenciar (sem servidores, sem contas de nuvem) |
| Múltiplos membros da equipe precisam colaborar na mesma infraestrutura | Você precisa executar comandos shell arbitrários ou configurar configurações de nível de SO em instâncias |
| Você quer mudanças de infraestrutura revisadas via pull requests antes da aplicação | Sua infraestrutura existente não foi criada com Terraform e o custo de migração é proibitivo |
| A infraestrutura precisa ser versionada, auditada e revertida de forma confiável | Você precisa de mudanças rápidas e iterativas na configuração da aplicação durante o desenvolvimento |
| Você opera em múltiplos provedores de nuvem e quer um fluxo de trabalho unificado | Sua organização já padronizou em uma ferramenta de IaC concorrente (Pulumi, CDK) com conhecimento institucional |

## Comparações

| Critério | Terraform | Ansible |
|----------|-----------|---------|
| Paradigma | Declarativo — descreva o estado desejado | Procedural — descreva os passos para atingir o estado |
| Gerenciamento de estado | Arquivo de estado explícito; rastreia IDs de recursos | Sem estado — sem rastreamento de estado integrado |
| Caso de uso principal | Provisionamento de recursos em nuvem (instâncias, redes, armazenamento) | Gerenciamento de configuração e implantação de aplicações em instâncias existentes |
| Suporte a provedores de nuvem | 1.000+ providers via ecossistema de plugins | Módulos para as principais nuvens; menos abrangente do que Terraform |
| Idempotência | Nativa — plan/apply sempre converge para o estado desejado | Em nível de task — cada task deve ser escrita para ser idempotente |
| Curva de aprendizado | Sintaxe HCL + modelo mental de state/plan | Playbooks YAML; barreira inicial menor |
| Quando usar ambos | Terraform provisiona infraestrutura; Ansible configura software nela — são complementares | Veja acima |

## Prós e contras

| Aspecto | Prós | Contras |
|---------|------|---------|
| Modelo declarativo | A intenção é clara; o plano mostra mudanças exatas antes do apply | Não é possível expressar facilmente lógica condicional ou loops complexos (embora o HCL tenha melhorado) |
| Arquivo de estado | Habilita planejamento preciso e detecção de desvio | O arquivo de estado é sensível; corrupção ou perda é um incidente grave |
| Ecossistema de providers | Cobre virtualmente todo serviço de nuvem e ferramenta SaaS | A qualidade dos providers varia; alguns providers da comunidade são mal mantidos |
| Fluxo de trabalho plan/apply | Mudanças são revisáveis antes da execução | Ciclo de iteração mais lento do que scripts imperativos para prototipagem rápida |
| Reutilização de módulos | Padrões de infraestrutura DRY via módulos publicados ou internos | Grandes grafos de módulos podem ser lentos para inicializar e planejar |
| Idempotência | Seguro para executar repetidamente; comportamento convergente | Ciclos de destruição/recriação para certas mudanças de recursos (por exemplo, renomeação) causam downtime |

## Exemplos de código

```hcl
# ml_infrastructure.tf
# Provisions an AWS GPU training instance and S3 bucket for ML artifacts.
# Prerequisites: AWS CLI configured, Terraform >= 1.5, appropriate IAM permissions.
# Run: terraform init && terraform plan && terraform apply

terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  # Remote state backend — replace with your bucket and key
  backend "s3" {
    bucket         = "my-org-terraform-state"
    key            = "mlops/training/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region
}

# --- Variables ---

variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment: dev, staging, prod"
  type        = string
  default     = "dev"
}

variable "gpu_instance_type" {
  description = "EC2 instance type for GPU training. p3.2xlarge has 1x V100."
  type        = string
  default     = "p3.2xlarge"
}

variable "key_pair_name" {
  description = "Name of an existing EC2 key pair for SSH access"
  type        = string
}

# --- Data sources ---

# Use the latest Deep Learning AMI (GPU) for the region
data "aws_ami" "dl_ami" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["Deep Learning AMI GPU PyTorch*"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}

# Default VPC for simplicity — use a dedicated VPC in production
data "aws_vpc" "default" {
  default = true
}

# --- S3 bucket for training artifacts ---

resource "aws_s3_bucket" "ml_artifacts" {
  bucket = "ml-artifacts-${var.environment}-${random_id.suffix.hex}"

  tags = {
    Environment = var.environment
    Purpose     = "ml-training-artifacts"
    ManagedBy   = "terraform"
  }
}

resource "random_id" "suffix" {
  byte_length = 4
}

# Block all public access to the artifacts bucket
resource "aws_s3_bucket_public_access_block" "ml_artifacts" {
  bucket                  = aws_s3_bucket.ml_artifacts.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Enable versioning so artifact overwrites can be recovered
resource "aws_s3_bucket_versioning" "ml_artifacts" {
  bucket = aws_s3_bucket.ml_artifacts.id
  versioning_configuration {
    status = "Enabled"
  }
}

# --- IAM role for the training instance ---

resource "aws_iam_role" "ml_training" {
  name = "ml-training-role-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

resource "aws_iam_role_policy" "ml_s3_access" {
  name = "ml-s3-access"
  role = aws_iam_role.ml_training.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:GetObject",
        "s3:PutObject",
        "s3:ListBucket",
        "s3:DeleteObject"
      ]
      Resource = [
        aws_s3_bucket.ml_artifacts.arn,
        "${aws_s3_bucket.ml_artifacts.arn}/*"
      ]
    }]
  })
}

resource "aws_iam_instance_profile" "ml_training" {
  name = "ml-training-profile-${var.environment}"
  role = aws_iam_role.ml_training.name
}

# --- Security group for training instance ---

resource "aws_security_group" "ml_training" {
  name        = "ml-training-sg-${var.environment}"
  description = "Security group for ML GPU training instances"
  vpc_id      = data.aws_vpc.default.id

  # SSH access — restrict to your IP in production
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "SSH — restrict to known IPs in production"
  }

  # JupyterLab access
  ingress {
    from_port   = 8888
    to_port     = 8888
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "JupyterLab — restrict to known IPs in production"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}

# --- GPU Training EC2 instance ---

resource "aws_instance" "ml_training" {
  ami                    = data.aws_ami.dl_ami.id
  instance_type          = var.gpu_instance_type
  key_name               = var.key_pair_name
  iam_instance_profile   = aws_iam_instance_profile.ml_training.name
  vpc_security_group_ids = [aws_security_group.ml_training.id]

  # 100 GB root volume for datasets and model checkpoints
  root_block_device {
    volume_type           = "gp3"
    volume_size           = 100
    delete_on_termination = true
    encrypted             = true
  }

  # Bootstrap script: export the S3 bucket name as an environment variable
  user_data = <<-EOF
    #!/bin/bash
    echo "export ML_ARTIFACTS_BUCKET=${aws_s3_bucket.ml_artifacts.bucket}" >> /etc/environment
    echo "export AWS_DEFAULT_REGION=${var.aws_region}" >> /etc/environment
  EOF

  tags = {
    Name        = "ml-training-${var.environment}"
    Environment = var.environment
    Purpose     = "gpu-training"
    ManagedBy   = "terraform"
  }

  # Prevent accidental destruction in production
  lifecycle {
    prevent_destroy = false # Set to true for production instances
  }
}

# --- Outputs ---

output "training_instance_id" {
  description = "EC2 instance ID of the GPU training instance"
  value       = aws_instance.ml_training.id
}

output "training_instance_public_ip" {
  description = "Public IP address of the GPU training instance"
  value       = aws_instance.ml_training.public_ip
}

output "ml_artifacts_bucket_name" {
  description = "Name of the S3 bucket for ML artifacts"
  value       = aws_s3_bucket.ml_artifacts.bucket
}

output "ml_artifacts_bucket_arn" {
  description = "ARN of the S3 bucket for ML artifacts"
  value       = aws_s3_bucket.ml_artifacts.arn
}
```

## Recursos práticos

- [Terraform documentation](https://developer.hashicorp.com/terraform/docs) — Documentação oficial da HashiCorp cobrindo sintaxe HCL, providers, estado, workspaces e módulos.
- [Terraform AWS provider documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) — Referência abrangente para todos os recursos e fontes de dados AWS disponíveis no provider Terraform AWS.
- [Terraform best practices](https://developer.hashicorp.com/terraform/language/style) — Guia de estilo oficial cobrindo estrutura de módulos, convenções de nomenclatura e padrões de gerenciamento de estado.
- [Gruntwork — Terraform: Up and Running](https://www.terraformupandrunning.com/) — Livro amplamente recomendado sobre padrões Terraform em produção, módulos e testes.
- [Terraform Registry](https://registry.terraform.io/) — Registro oficial de providers e módulos publicados, incluindo módulos da comunidade para Kubernetes, EKS e configurações de instâncias de GPU.

## Veja também

- [Ansible](/docs/mlops/iac/ansible)
- [ML Kubernetes](/docs/mlops/deployment/ml-kubernetes)
- [MLOps](/docs/mlops)
