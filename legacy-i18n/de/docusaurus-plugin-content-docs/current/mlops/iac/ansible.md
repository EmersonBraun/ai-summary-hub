---
title: Ansible
description: Agentloses Konfigurationsmanagement- und Automatisierungswerkzeug, das deklarative YAML-Playbooks nutzt, um Server zu konfigurieren, Software zu installieren und ML-Trainingsumgebungen im großen Maßstab zu verwalten.
keywords: [Ansible, Konfigurationsmanagement, Playbooks, Rollen, Inventar, agentlos, CUDA, GPU-Treiber, ML-Umgebung, IaC]
tags: [advanced]
authors: [EmersonBraun]
---

# Ansible

## Definition

Ansible ist ein Open-Source-Automatisierungswerkzeug von Red Hat, das Konfigurationsmanagement, Anwendungsdeployment und Aufgabenautomatisierung über eine Flotte von Servern mithilfe einfacher, menschenlesbarer YAML-Dateien namens **Playbooks** übernimmt. Seine definierende architektonische Entscheidung ist **agentlos**: Ansible verbindet sich über SSH (Linux) oder WinRM (Windows) mit verwalteten Knoten und führt Aufgaben direkt aus, ohne dass auf den Zielmaschinen Daemon- oder Agent-Software erforderlich ist. Dies macht die Einführung erheblich einfacher als bei agentenbasierten Werkzeugen — man kann bestehende Server verwalten, ohne dass über Python und einen SSH-Server hinaus Software vorinstalliert sein muss.

Ansible arbeitet nach einem **Push-Modell**: Ein Operator führt ein Playbook von einem Steuerknoten aus, Ansible verbindet sich mit dem Ziel-Inventar der Hosts und führt Aufgaben der Reihe nach aus. Aufgaben rufen **Module** auf — idempotente Arbeitseinheiten, die wissen, wie Pakete installiert, Dateien verwaltet, Dienste gestartet, Befehle ausgeführt und mit Cloud-APIs interagiert werden. Community- und offizielle Module decken praktisch jeden Linux-Paketmanager, Dienst, Cloud-Anbieter, Netzwerkgerät und jede Anwendung ab. Rollen bündeln verwandte Aufgaben, Dateien, Vorlagen und Variablen in wiederverwendbare, teilbare Einheiten, die auf Ansible Galaxy veröffentlicht oder in internen Git-Repositories gepflegt werden können.

Im ML- und Data-Engineering-Kontext füllt Ansible die Lücke, die [Terraform](/docs/mlops/iac/terraform) hinterlässt. Terraform stellt Infrastruktur bereit (erstellt die GPU-Instanz, die VPC, den S3-Bucket); Ansible konfiguriert, was auf dieser Infrastruktur läuft (installiert die korrekte CUDA-Version, konfiguriert die Python-Umgebung, richtet verteilte Trainingsabhängigkeiten ein und stellt sicher, dass GPU-Monitoring-Tools laufen). Die beiden Werkzeuge ergänzen sich eher, als dass sie konkurrieren: Ein typischer MLOps-Workflow nutzt Terraform zur Bereitstellung von Cloud-Ressourcen und Ansible, um diese Ressourcen in einen trainierungsbereiten Zustand zu bringen.

## Funktionsweise

### Inventar

Das Inventar definiert, welche Hosts Ansible verwaltet. Ein statisches Inventar ist eine INI- oder YAML-Datei, die Hostnamen oder IP-Adressen nach Rolle gruppiert (z. B. `[gpu_training_nodes]`, `[model_serving]`). Dynamische Inventare fragen Cloud-APIs (AWS EC2, GCP Compute, Azure VMs) zur Laufzeit ab, um die Host-Liste aus lebender Infrastruktur aufzubauen — unerlässlich für Auto-Scaling-Umgebungen. Host- und Gruppen-Variablen definieren pro-Host- oder pro-Gruppen-Konfigurationswerte, die in Playbooks referenziert werden.

### Playbooks und Aufgaben

Ein Playbook ist eine YAML-Datei mit einem oder mehreren **Plays**. Jedes Play richtet sich an eine Gruppe von Hosts und eine Liste von **Aufgaben**. Jede Aufgabe ruft ein Modul mit Argumenten auf und definiert optional Bedingungen (`when`), Schleifen (`loop`) und bei Änderung ausgelöste Handler. Aufgaben werden innerhalb eines Plays sequenziell ausgeführt; Plays können parallel über Hosts ausgeführt werden. Das Ergebnis jeder Aufgabe ist eines von: `ok` (keine Änderung erforderlich), `changed` (Änderung vorgenommen), `failed` oder `skipped`. Ansible gibt nach jedem Playbook-Lauf eine Zusammenfassung dieser Ergebnisse aus.

### Rollen

Rollen bieten eine standardisierte Verzeichnisstruktur für die Organisation verwandter Automatisierung: `tasks/`, `handlers/`, `templates/`, `files/`, `vars/`, `defaults/` und `meta/`. Eine Rolle kann auf mehrere Plays in mehreren Playbooks angewendet werden, und Rollen können von anderen Rollen abhängen. Ansible Galaxy hostet Tausende von Community-Rollen (z. B. `geerlingguy.docker`, `nvidia.nvidia_driver`), die mit `ansible-galaxy install` installiert und direkt in Playbooks verwendet werden können.

### Variablen und Templating

Ansible verwendet die Jinja2-Template-Engine in Playbooks und Template-Dateien. Variablen können auf mehreren Ebenen definiert werden (Rollen-Defaults, Gruppen-Vars, Host-Vars, Playbook-Vars, Extra-Vars mit `-e`) mit einer klaren Prioritätsreihenfolge. Templates (`.j2`-Dateien) generieren Konfigurationsdateien dynamisch — zum Beispiel eine verteilte Trainingskonfigurationsdatei mit der korrekten Master-Knoten-IP, Anzahl der GPUs und Batch-Größe für jede Umgebung.

### Idempotenz und Handler

Ansible-Module sind so konzipiert, dass sie idempotent sind: Das mehrfache Ausführen eines Playbooks erzeugt denselben Endzustand ohne unbeabsichtigte Nebeneffekte. Wenn ein Paket bereits in der korrekten Version installiert ist, meldet die Aufgabe `ok` und tut nichts. **Handler** sind spezielle Aufgaben, die am Ende eines Plays nur dann ausgeführt werden, wenn sie von einer Aufgabe benachrichtigt wurden, die `changed` ergab — verwendet, um Dienste (wie einen CUDA-beschleunigten Training-Daemon) nur dann neu zu starten, wenn sich ihre Konfiguration tatsächlich geändert hat.

```mermaid
flowchart LR
  ControlNode[Control node\nAnsible CLI] -->|"parse inventory"| Inventory[Inventory\nstatic / dynamic]
  Inventory -->|"resolve target hosts"| Hosts[Target hosts\nGPU training nodes]
  ControlNode -->|"read playbook"| Playbook[Playbook\n.yml tasks & roles]
  Playbook -->|"SSH connection"| Hosts
  Hosts -->|"execute modules"| Tasks[Task execution\ninstall CUDA, pip, config]
  Tasks -->|"notify on change"| Handlers[Handlers\nrestart services]
  Tasks -->|"report status"| Summary[Run summary\nok / changed / failed]
```

## Wann verwenden / Wann NICHT verwenden

| Verwenden wenn | Vermeiden wenn |
|----------|------------|
| Software auf bestehenden Servern konfiguriert werden soll: CUDA, Python, Pip-Pakete, Systemdienste installieren | Neue Cloud-Infrastruktur von Grund auf bereitgestellt werden soll (dafür Terraform verwenden) |
| GPU-Trainingsknoten nach der Erstellung durch Terraform eingerichtet werden sollen | Feinkörnige Zustandsverfolgung über Hunderte von Ressourcen benötigt wird (Ansible hat keine State-Datei) |
| Konsistente ML-Umgebungen über Entwicklungs-, Staging- und Produktionsmaschinen eingerichtet werden sollen | Komplexe Abhängigkeitsgraphen zwischen Cloud-Ressourcen mit automatischer Sortierung benötigt werden |
| Ad-hoc-Befehle über eine Flotte von Servern ausgeführt werden sollen (z. B. eine Konfigurationsdatei überall aktualisieren) | Zielmaschinen nicht über SSH oder WinRM vom Steuerknoten erreichbar sind |
| Anwendungsupdates deployt oder Konfigurationsänderungen auf vielen Knoten ausgerollt werden sollen | Cloud-native Ressourcen (VPCs, IAM-Rollen, S3-Buckets) bereitgestellt werden sollen — Terraform verwenden |
| Teams IaC-Tooling mit flacher YAML-Lernkurve benötigen | Sehr schnelle parallele Ausführung erforderlich ist; Ansible's SSH-Overhead begrenzt die Skalierbarkeit bei Tausenden von Knoten |

## Vergleiche

| Kriterium | Ansible | Terraform |
|-----------|---------|-----------|
| Paradigma | Prozedural mit idempotenten Modulen — Aufgaben laufen der Reihe nach | Deklarativ — gewünschten Zustand beschreiben, Terraform berechnet das Diff |
| Zustandsverwaltung | Zustandslos — keine integrierte Verfolgung des zuvor angewendeten Zustands | Explizite State-Datei bildet Konfiguration auf echte Ressourcen-IDs ab |
| Primärer Anwendungsfall | Konfigurationsmanagement und Software-Deployment auf bestehenden Hosts | Cloud-Infrastruktur-Bereitstellung (Instanzen, Netzwerke, Speicher) |
| Cloud-Anbieter-Unterstützung | Cloud-Module vorhanden, aber weniger umfassend als Terraform-Provider | 1.000+ Provider mit tiefer, versionierter API-Abdeckung |
| Idempotenz | Aufgabenebene — jedes Modul muss idempotent geschrieben sein | Nativ — Plan/Apply konvergiert immer zum deklarierten Zustand |
| Lernkurve | Niedrig — YAML-Aufgaben sind lesbar; keine neue Sprache erforderlich | Moderat — HCL-Syntax + State/Plan-Konzept zu erlernen |
| Agent erforderlich | Nein — agentlos, verbindet sich über SSH | Nein — Terraform läuft auf dem Steuerrechner, ruft Cloud-APIs auf |
| Gemeinsamer Einsatz | Ansible konfiguriert Software auf Infrastruktur, die Terraform bereitgestellt hat | Terraform stellt Ressourcen bereit; Ansible übernimmt OS- und App-Konfiguration |

## Vor- und Nachteile

| Aspekt | Vorteile | Nachteile |
|--------|------|------|
| Agentlose Architektur | Keine Software auf Zielknoten zu installieren; funktioniert mit bestehendem SSH | SSH-Overhead begrenzt die Leistung bei sehr großem Maßstab (10.000+ Knoten) |
| YAML-Playbooks | Menschenlesbare, selbstdokumentierende Automatisierung | Komplexe Logik (Schleifen, Bedingungen) wird in YAML ausführlich |
| Idempotente Module | Sicher auszuführen; Drift-Korrektur ohne Nebeneffekte | Idempotenz hängt von Modulqualität ab; Shell/Command-Module sind nicht inhärent idempotent |
| Ansible Galaxy | Großes Ökosystem an Community-Rollen für gängige Software | Qualität der Community-Rollen variiert; Pinning von Rollenversionen ist für Reproduzierbarkeit entscheidend |
| Keine State-Datei | Einfach, kein State-Management-Overhead | Keine integrierte Drift-Erkennung zwischen Ausführungen; manuelles oder Drittanbieter-Tooling erforderlich |
| Jinja2-Templating | Leistungsstarke dynamische Konfigurationsgenerierung | Template-Debugging ist schwieriger als nativer Code; Fehler treten zur Laufzeit auf |

## Code-Beispiele

```yaml
# ml_environment_setup.yml
# Ansible playbook to configure a GPU training node for ML workloads.
# Installs CUDA toolkit, cuDNN, Python 3.11, pip packages, and sets up
# a systemd service for the Prometheus node exporter.
#
# Usage:
#   ansible-playbook -i inventory.ini ml_environment_setup.yml
#
# inventory.ini example:
#   [gpu_training_nodes]
#   10.0.1.10 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/ml-key.pem
#   10.0.1.11 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/ml-key.pem

---
- name: Configure GPU training nodes for ML workloads
  hosts: gpu_training_nodes
  become: true  # Run tasks as root via sudo
  vars:
    cuda_version: "12.1"
    python_version: "3.11"
    pip_packages:
      - torch==2.3.0
      - torchvision==0.18.0
      - torchaudio==2.3.0
      - numpy==1.26.4
      - pandas==2.2.2
      - scikit-learn==1.4.2
      - mlflow==2.13.0
      - evidently==0.4.30
      - prometheus-client==0.20.0
    node_exporter_version: "1.8.1"
    ml_user: "mlops"
    ml_workdir: "/opt/ml"

  handlers:
    - name: restart node_exporter
      ansible.builtin.systemd:
        name: node_exporter
        state: restarted
        daemon_reload: true

  tasks:
    # --- System prerequisites ---

    - name: Update apt package cache
      ansible.builtin.apt:
        update_cache: true
        cache_valid_time: 3600  # Skip update if cache is less than 1 hour old

    - name: Install system dependencies
      ansible.builtin.apt:
        name:
          - build-essential
          - git
          - wget
          - curl
          - htop
          - nvtop          # GPU monitoring in terminal
          - python{{ python_version }}
          - python{{ python_version }}-dev
          - python{{ python_version }}-venv
          - python3-pip
        state: present

    # --- CUDA installation ---

    - name: Check if CUDA {{ cuda_version }} is already installed
      ansible.builtin.command: nvcc --version
      register: nvcc_check
      changed_when: false
      failed_when: false

    - name: Add CUDA repository keyring
      ansible.builtin.shell: |
        wget -qO /tmp/cuda-keyring.deb \
          https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
        dpkg -i /tmp/cuda-keyring.deb
      when: cuda_version not in (nvcc_check.stdout | default(''))
      args:
        creates: /usr/share/keyrings/cuda-archive-keyring.gpg

    - name: Install CUDA toolkit {{ cuda_version }}
      ansible.builtin.apt:
        name: cuda-toolkit-{{ cuda_version | replace('.', '-') }}
        state: present
        update_cache: true
      when: cuda_version not in (nvcc_check.stdout | default(''))

    - name: Set CUDA environment variables in /etc/environment
      ansible.builtin.lineinfile:
        path: /etc/environment
        line: "{{ item }}"
        state: present
      loop:
        - 'CUDA_HOME=/usr/local/cuda'
        - 'PATH=/usr/local/cuda/bin:$PATH'
        - 'LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH'

    # --- ML user and workspace ---

    - name: Create dedicated ML user
      ansible.builtin.user:
        name: "{{ ml_user }}"
        shell: /bin/bash
        home: "/home/{{ ml_user }}"
        create_home: true
        state: present

    - name: Create ML working directory
      ansible.builtin.file:
        path: "{{ ml_workdir }}"
        state: directory
        owner: "{{ ml_user }}"
        group: "{{ ml_user }}"
        mode: "0755"

    # --- Python virtual environment and packages ---

    - name: Create Python virtual environment
      ansible.builtin.command:
        cmd: python{{ python_version }} -m venv {{ ml_workdir }}/venv
        creates: "{{ ml_workdir }}/venv/bin/python"
      become_user: "{{ ml_user }}"

    - name: Upgrade pip in virtual environment
      ansible.builtin.pip:
        name: pip
        state: latest
        virtualenv: "{{ ml_workdir }}/venv"
      become_user: "{{ ml_user }}"

    - name: Install ML Python packages
      ansible.builtin.pip:
        name: "{{ pip_packages }}"
        virtualenv: "{{ ml_workdir }}/venv"
        state: present
      become_user: "{{ ml_user }}"

    - name: Write requirements.txt for reproducibility
      ansible.builtin.copy:
        dest: "{{ ml_workdir }}/requirements.txt"
        content: "{{ pip_packages | join('\n') }}\n"
        owner: "{{ ml_user }}"
        group: "{{ ml_user }}"
        mode: "0644"

    # --- Prometheus Node Exporter for infrastructure monitoring ---

    - name: Check if node_exporter is already installed
      ansible.builtin.stat:
        path: /usr/local/bin/node_exporter
      register: node_exporter_stat

    - name: Download Prometheus node_exporter {{ node_exporter_version }}
      ansible.builtin.get_url:
        url: "https://github.com/prometheus/node_exporter/releases/download/v{{ node_exporter_version }}/node_exporter-{{ node_exporter_version }}.linux-amd64.tar.gz"
        dest: /tmp/node_exporter.tar.gz
        mode: "0644"
      when: not node_exporter_stat.stat.exists

    - name: Extract and install node_exporter
      ansible.builtin.unarchive:
        src: /tmp/node_exporter.tar.gz
        dest: /tmp
        remote_src: true
      when: not node_exporter_stat.stat.exists

    - name: Copy node_exporter binary to /usr/local/bin
      ansible.builtin.copy:
        src: "/tmp/node_exporter-{{ node_exporter_version }}.linux-amd64/node_exporter"
        dest: /usr/local/bin/node_exporter
        mode: "0755"
        remote_src: true
      when: not node_exporter_stat.stat.exists
      notify: restart node_exporter

    - name: Create node_exporter systemd service
      ansible.builtin.copy:
        dest: /etc/systemd/system/node_exporter.service
        content: |
          [Unit]
          Description=Prometheus Node Exporter
          After=network.target

          [Service]
          User=nobody
          ExecStart=/usr/local/bin/node_exporter \
            --collector.systemd \
            --collector.processes
          Restart=on-failure

          [Install]
          WantedBy=multi-user.target
        mode: "0644"
      notify: restart node_exporter

    - name: Enable and start node_exporter
      ansible.builtin.systemd:
        name: node_exporter
        enabled: true
        state: started
        daemon_reload: true

    # --- Verification ---

    - name: Verify GPU is visible to CUDA
      ansible.builtin.command: nvidia-smi
      register: nvidia_smi_output
      changed_when: false
      failed_when: nvidia_smi_output.rc != 0

    - name: Print GPU info
      ansible.builtin.debug:
        var: nvidia_smi_output.stdout_lines

    - name: Verify PyTorch can see the GPU
      ansible.builtin.command:
        cmd: "{{ ml_workdir }}/venv/bin/python -c \"import torch; print('CUDA available:', torch.cuda.is_available()); print('GPU count:', torch.cuda.device_count())\""
      register: torch_check
      changed_when: false
      become_user: "{{ ml_user }}"

    - name: Print PyTorch GPU availability
      ansible.builtin.debug:
        var: torch_check.stdout_lines
```

## Praktische Ressourcen

- [Ansible-Dokumentation](https://docs.ansible.com/ansible/latest/index.html) — Offizielle Dokumentation zu Playbooks, Modulen, Rollen, Inventar und Best Practices.
- [Ansible Galaxy](https://galaxy.ansible.com/) — Community-Hub für wiederverwendbare Ansible-Rollen und -Collections, einschließlich NVIDIA-GPU-Treiber, Docker- und Kubernetes-Rollen.
- [Jeff Geerling — Ansible für DevOps](https://www.ansiblefordevops.com/) — Umfassendes Buch und begleitendes GitHub-Repository zu Ansible von Grundlagen bis zu Produktionsmustern.
- [NVIDIA-Ansible-Collection](https://github.com/nvidia/ansible-collection-nvidia-gpu) — Offizielle NVIDIA-Ansible-Collection für die Verwaltung von GPU-Treibern, CUDA- und NCCL-Installationen.
- [Ansible-Best-Practices-Leitfaden](https://docs.ansible.com/ansible/latest/tips_tricks/ansible_tips_tricks.html) — Offizielle Tipps und Tricks zu Verzeichnisstruktur, Variablenverwaltung und Leistungsoptimierung.

## Siehe auch

- [Terraform](/docs/mlops/iac/terraform)
- [ML Kubernetes](/docs/mlops/deployment/ml-kubernetes)
- [MLOps](/docs/mlops)
