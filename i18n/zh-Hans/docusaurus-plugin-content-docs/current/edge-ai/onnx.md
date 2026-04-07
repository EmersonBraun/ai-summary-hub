---
title: ONNX Runtime
description: 跨平台、高性能的 ONNX 模型推理引擎，支持 CPU、GPU 和 NPU 执行提供程序。
keywords: [ONNX Runtime, ONNX, 跨平台推理, 执行提供程序, TensorRT, DirectML, CoreML, 模型互操作性]
---

# ONNX Runtime

## 定义

ONNX Runtime（ORT）是由 Microsoft 开发的开源跨平台推理和训练加速库。其主要目的是以高性能在各种硬件目标和操作系统上执行 **Open Neural Network Exchange（ONNX）**格式的模型——这是机器学习模型与框架无关的中间表示。ORT 不与任何单一训练框架绑定：来自 PyTorch、TensorFlow、scikit-learn、LightGBM、XGBoost 等的模型都可以导出为 ONNX 并通过相同的运行时 API 执行，使其成为最具互操作性的推理解决方案之一。

ORT 的核心加载 ONNX 图，应用广泛的图级优化（常量折叠、节点融合、布局转换），并将操作分发到当前硬件的最佳可用执行提供程序。**执行提供程序（EP）**抽象允许 ORT 将子图路由到 CPU、通过 CUDA 或 TensorRT 的 NVIDIA GPU、通过 ROCm 的 AMD GPU、通过 OpenVINO 的 Intel 硬件、通过 CoreML 的 Apple Silicon、通过 NNAPI 的 Android 以及通过 DirectML 的 Windows——所有这些都通过统一的 API 接口。这使 ORT 适合从云服务器到 Windows 笔记本电脑再到移动设备的部署范围。

ONNX Runtime 在企业和生产环境中特别有价值，这些环境中单个部署管道必须服务于在不同框架中训练的模型。它是 Azure ML 端点、Hugging Face 的 Optimum 库、Windows ML 以及许多生产推荐和排名系统的推理后端。其训练扩展（ORT Training）还支持大型变换器模型的加速微调，但推理是其主要用例。

## 工作原理

```mermaid
flowchart LR
  PyTorch["PyTorch Model"] -->|"torch.onnx.export()"| ONNX["ONNX Model (.onnx)"]
  TF["TensorFlow / Keras"] -->|"tf2onnx convert"| ONNX
  SKLearn["scikit-learn / XGBoost"] -->|"skl2onnx / onnxmltools"| ONNX
  ONNX -->|"ort.InferenceSession()"| ORT["ONNX Runtime\nSession"]
  ORT -->|"graph optimizations"| GraphOpt["Optimized Graph\n(fused ops, constants folded)"]
  GraphOpt -->|"EP selection"| EP["Execution Provider\n(CPU / CUDA / TensorRT / CoreML / NNAPI)"]
  EP -->|"kernel dispatch"| Device["Target Device\n(CPU, GPU, NPU)"]
```

### ONNX 格式和模型互操作性

ONNX 将模型表示为有向无环计算图，其中节点是 ONNX 操作符规范中定义的标准化运算符（如 `Conv`、`MatMul`、`LayerNormalization`），边承载类型化张量。该格式是版本化的：每个 ONNX opset 版本（目前是 21）定义了完整的支持运算符集及其语义。来自每个框架的导出器将框架特定的运算符映射到其 ONNX 等效项；当不存在直接映射时，可以注册 `custom_op` 扩展。Protobuf 序列化的 `.onnx` 文件包含图拓扑、运算符名称、张量形状和常量权重值，使格式自包含且可移植。

### 图优化

当创建 `InferenceSession` 时，ORT 应用由 `GraphOptimizationLevel` 设置控制的三级图优化。级别 1（基本）执行安全重写：常量折叠、冗余节点消除、形状推断和恒等删除。级别 2（扩展）增加操作融合：`Conv + BatchNorm`、`Conv + Relu`、`Transpose + MatMul` 等类似模式被融合成单个内核以消除中间内存分配和内核启动开销。级别 3（布局优化）重构张量内存布局以匹配执行提供程序的偏好（如 GPU 卷积的 NHWC）。优化后的图可以序列化回 `.onnx` 以供检查或跳过后续加载时的重新优化。

### 执行提供程序

执行提供程序机制是 ORT 的主要可扩展性和性能杠杆。当使用特定 EP 创建会话时，ORT 查询 EP 可以处理哪些节点，对图进行分区，并将声明的子图替换为 EP 特定的 `ComputeKernel` 实现。**CPU EP** 使用 MLAS（Microsoft 线性代数子程序），这是一个具有 AVX-512 和 NEON 支持的手工向量化 BLAS 实现。**CUDA EP** 将卷积和 GEMM 卸载到 cuDNN 和 cuBLAS。**TensorRT EP** 应用 TensorRT 的层融合和 FP16 与 INT8 的精度校准，在 NVIDIA GPU 上产生最高吞吐量。**CoreML EP** 在 macOS 和 iOS 上委托给 Apple 的 Neural Engine。**DirectML EP** 在 Windows 上支持任何支持 DirectX 12 的 GPU 的硬件加速推理，包括 AMD 和 Intel 集成显卡。

### ONNX Runtime 中的量化

ORT 通过 **QDQ（量化-去量化）**节点模式支持 INT8 推理：ONNX 图包含表示精度边界的显式 `QuantizeLinear` 和 `DequantizeLinear` 节点。静态量化需要校准数据集来计算输入/输出缩放；`onnxruntime.quantization` Python 包提供 `quantize_static` 和 `quantize_dynamic` 函数。ORT 还接受在训练期间插入了 Q/DQ 节点的 QAT 导出模型。硬件 INT8 加速仅在执行提供程序支持时激活（CUDA EP 需要 CUDA 11+，TensorRT EP 通过校准表原生处理 INT8）。Hugging Face Optimum 中的 `ORTQuantizer` 为端到端量化变换器模型提供了高级接口。

### 移动和边缘部署

ORT Mobile 是为 Android 和 iOS 构建的精简版 ONNX Runtime，删除了未使用的运算符和 EP 库，将二进制大小减少到约 1-3 MB（压缩后）。`onnxruntime-mobile` Python 包通过预打包权重和剥离训练时元数据来为移动设备准备模型。在 Android 上，NNAPI EP 委托给硬件加速器。在 iOS 和 macOS 上，CoreML EP 使用 Apple Neural Engine。ORT 还通过 CPU EP 在树莓派（ARM Linux）上运行，并且存在对 WebAssembly 目标的实验性支持。`ort` npm 包通过 WASM 在 Node.js 和浏览器上下文中启用 ORT。

## 何时使用 / 何时不使用

| 使用场景 | 避免场景 |
|---|---|
| 需要框架无关的推理——通过单一运行时服务来自 PyTorch、TF 和 scikit-learn 的模型 | 部署目标是 RAM \<256 KB 的微控制器（TFLM 更好地覆盖此场景） |
| 在 Windows/Azure 上构建企业 ML 管道，其中 Microsoft 工具已在使用中 | 需要目前具有成熟工具的深度 Android 硬件委托（TFLite 对 Android 更成熟） |
| 需要 NVIDIA TensorRT 加速而不直接管理 TensorRT API | 模型使用没有 ONNX 等效项且不切实际注册的自定义运算符 |
| 希望对服务器端运行的同一模型进行浏览器/WASM 推理 | 团队以 PyTorch 为主，希望从训练到移动端有最紧密的循环（PyTorch Mobile/ExecuTorch 可能更简单） |
| 跨平台可移植性是一级关注点（相同模型在 Windows、Linux、macOS、Android、iOS 上） | 需要在边缘进行实时训练或在线学习（ORT Training 存在但增加了大量复杂性） |

## 比较

ONNX Runtime 与 TFLite 和 PyTorch Mobile 的边缘和跨平台部署比较。

| 标准 | ONNX Runtime | TensorFlow Lite | PyTorch Mobile |
|---|---|---|---|
| 平台支持 | Windows、Linux、macOS、Android、iOS、WASM、云——覆盖最广 | Android、iOS、嵌入式 Linux、微控制器（TFLM） | Android、iOS；ExecuTorch 扩展到嵌入式和裸机 |
| 模型转换 | 任何框架 → ONNX 导出（最具互操作性，多个转换器） | TF/Keras → TFLite Converter（成熟，仅 TF 生态系统） | PyTorch → TorchScript 或 ExecuTorch（PyTorch 原生，对 PT 用户摩擦更低） |
| 设备端性能 | 具有 MLAS 的 CPU EP 有竞争力；TensorRT/CUDA EP 在 GPU 上领先；CoreML/NNAPI EP 用于移动端 | 通过 NNAPI/GPU 委托在 Android 上出色；微控制器上最优 | ARM CPU 上的 XNNPACK；Vulkan GPU；ExecuTorch NPU 委托 |
| 生态系统 | 框架无关；Hugging Face Optimum；Windows ML；Azure ML；强大的企业采用 | 成熟：MediaPipe、TF Hub、Model Garden；最大的移动 ML 社区 | 研究中强大；Hugging Face；不断增长的 ExecuTorch 社区 |
| 量化支持 | 通过 QDQ 节点的 INT8；动态和静态 PTQ；QAT；通过 EP 的硬件 INT8 | 全面：动态范围、INT8、FP16、具有完整 INT8 路径的 QAT | 通过 torch.ao.quantization 的 PTQ（动态 + 静态 INT8）和 QAT |

## 优缺点

| 优点 | 缺点 |
|------|------|
| 框架无关：任何可 ONNX 导出的模型都与相同运行时配合 | ONNX 导出对于不支持或自定义运算符的模型可能失败 |
| 最广泛的执行提供程序覆盖：CPU、CUDA、TensorRT、DirectML、CoreML、NNAPI、OpenVINO | 调试 ONNX 图比原生框架调试更难 |
| 强大的 Windows 和 Azure 集成；Microsoft ML 技术栈的一等公民 | 对于纯 Android/iOS 场景，比 TFLite 具有更多的运营复杂性 |
| Hugging Face Optimum 为变换器提供了高级量化和优化 | ONNX opset 版本控制可能在导出器和 ORT 版本之间产生兼容性摩擦 |
| 通过 AVX-512 和 NEON 向量化的 MLAS 具有竞争力的 CPU 性能 | 包含所有 EP 时，移动二进制大小比 TFLite 更大 |

## 代码示例

```python
import numpy as np
import torch
import torch.nn as nn
import onnxruntime as ort

# ── 1. Define a simple model in PyTorch ───────────────────────────────────────
class SimpleClassifier(nn.Module):
    """Minimal classifier for demonstration."""

    def __init__(self, input_dim: int = 784, num_classes: int = 10):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)


model = SimpleClassifier()
# Switch to inference mode: disables dropout, BatchNorm uses running statistics
model.train(False)

# ── 2. Export PyTorch model to ONNX ──────────────────────────────────────────
dummy_input = torch.randn(1, 784)  # batch=1, flattened 28x28 image

torch.onnx.export(
    model,
    dummy_input,
    "model.onnx",
    opset_version=17,                         # target ONNX opset
    input_names=["input"],
    output_names=["logits"],
    dynamic_axes={
        "input":  {0: "batch_size"},          # allow variable batch size
        "logits": {0: "batch_size"},
    },
    do_constant_folding=True,                 # fold constant sub-expressions during export
)
print("Exported model.onnx")

# ── 3. Apply INT8 post-training dynamic quantization ─────────────────────────
from onnxruntime.quantization import quantize_dynamic, QuantType

quantize_dynamic(
    "model.onnx",
    "model_int8.onnx",
    weight_type=QuantType.QInt8,              # quantize weights to INT8
)
print("Quantized model saved as model_int8.onnx")

# ── 4. Run inference with ONNX Runtime ───────────────────────────────────────
# SessionOptions allow controlling graph optimization level and thread counts
sess_options = ort.SessionOptions()
sess_options.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL

# Providers list is checked in order; falls back to CPU if GPU is unavailable
providers = ["CUDAExecutionProvider", "CPUExecutionProvider"]
session = ort.InferenceSession("model_int8.onnx", sess_options, providers=providers)

print(f"Active execution provider: {session.get_providers()[0]}")

# Prepare a batch of random inputs as float32 numpy arrays
batch = np.random.randn(4, 784).astype(np.float32)
input_name = session.get_inputs()[0].name
output_name = session.get_outputs()[0].name

outputs = session.run([output_name], {input_name: batch})
logits = outputs[0]                          # shape (4, 10)
predicted_classes = np.argmax(logits, axis=1)
print(f"Batch predictions: {predicted_classes}")
```

## 实用资源

- [ONNX Runtime 文档](https://onnxruntime.ai/docs/) — 涵盖安装、执行提供程序、图优化、量化以及所有支持平台的移动部署的官方参考。
- [ONNX Runtime Python API 参考](https://onnxruntime.ai/docs/api/python/api_summary.html) — `InferenceSession`、`SessionOptions`、执行提供程序和量化子包的详细 API 文档。
- [Hugging Face Optimum](https://huggingface.co/docs/optimum/onnxruntime/overview) — 为变换器模型优化包装 ORT 的高级库，提供 `ORTModelForXxx` 类和 `ORTQuantizer` 用于一步模型导出和 INT8 量化。
- [ONNX Model Zoo](https://github.com/onnx/models) — 涵盖计算机视觉、NLP、语音和经典 ML 的预训练 ONNX 模型的精选仓库；对于基准测试 ORT 性能和作为部署模板很有用。
- [ONNX Runtime 移动部署指南](https://onnxruntime.ai/docs/tutorials/mobile/) — 构建最小 ORT Android 或 iOS 应用程序的分步教程，包括模型准备和 NNAPI/CoreML EP 配置。

## 另请参阅

- [TensorFlow Lite](/docs/edge-ai/tflite)
- [PyTorch Mobile](/docs/edge-ai/pytorch-mobile)
- [PyTorch](/docs/frameworks/pytorch)
- [TensorFlow](/docs/frameworks/tensorflow)
