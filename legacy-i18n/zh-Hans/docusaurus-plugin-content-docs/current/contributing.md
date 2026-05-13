---
title: Contributing
description: How to add topics, improve examples, and translate content.
keywords: [contributing, template, PR]
authors: [EmersonBraun]
---

# 为 AI Summary Hub 做贡献

感谢您帮助改进此 wiki。以下是贡献方式。

## 文章模板

每篇文章都遵循一个结构化模板，旨在使 AI Summary Hub 成为全面的知识宝库。章节分为**必填**和**可选**两类。

### 必填章节

每篇文章**必须**按以下确切顺序包含这些章节：

1. **Frontmatter** — 文件顶部的元数据块（见下方[Frontmatter 规范](#frontmatter-规范)）
2. **定义** — 是什么、背景以及为何重要。至少 2–3 个段落。
3. **工作原理** — 技术说明。对复杂主题使用 H3 小节。至少包含一个带有**标记边的** Mermaid 图（不仅仅是框）。每个小节至少 3–5 句话。
4. **何时使用 / 何时不使用** — 带有实用指导的两列表格。至少 3 行。
5. **代码示例** — 至少一个**可运行的**代码片段（非伪代码）。语言由作者自行决定：Python 是 ML/MLOps 主题的默认语言；TypeScript 用于 MCP/Claude Code 主题；使用最自然的语言。
6. **实用资源** — 2–5 个精选外部链接。可接受类型：官方文档、课程（免费或付费）、GitHub 仓库、arXiv 论文、公司博客文章（如 OpenAI 博客、Anthropic 博客）。
7. **另请参阅** — 指向此 wiki 内相关文档的内部链接。

### 可选章节

**仅在相关时**包含这些章节。如果某章节不适用，直接省略即可——不要添加带有"N/A"或占位符的标题。

- **比较** — 带有 3–5 个标准的快速比较表（如易用性、社区、性能）。**互惠原则**：如果文章 A 包含与文章 B 的比较，则文章 B 也必须包含与文章 A 的比较。
- **优缺点** — 两列表格格式。
- **基准测试** — 链接到含定量数据的基准测试、排行榜或论文。

### 章节顺序

所有章节都存在时的完整顺序：

```
1. 定义
2. 工作原理
3. 何时使用 / 何时不使用
4. 比较（可选）
5. 优缺点（可选）
6. 基准测试（可选）
7. 代码示例
8. 实用资源
9. 另请参阅
```

### 深度指南

| 章节 | 最低深度 |
|------|---------|
| 定义 | 2–3 个段落，涵盖是什么、背景和为何重要 |
| 工作原理 | 复杂主题使用 H3 小节；1+ 个带标记边的 Mermaid 图；每个小节 3–5 句话 |
| 何时使用 / 何时不使用 | 含 3+ 行的表格 |
| 代码示例 | 1+ 个带注释的可运行片段；必须可执行或有清晰注释 |
| 实用资源 | 2–5 个精选链接 |
| 比较（如包含） | 含 3–5 个标准的表格 |

### Frontmatter 规范

每个文档必须包含以下 frontmatter 块：

```yaml
---
title: "完整文章标题"
description: "用于 SEO 和搜索的单行描述"
keywords: [keyword1, keyword2, keyword3]
tags: [intermediate]  # 恰好一个：beginner、intermediate 或 advanced
authors: [GitHub用户名]  # 作者的 GitHub 用户名
---
```

**必填字段：**

| 字段 | 描述 |
|------|------|
| `title` | 完整文章标题 |
| `description` | 单行描述（用于 SEO 和搜索） |
| `keywords` | 相关关键词数组 |
| `tags` | 包含**恰好一个**级别标签的数组：`beginner`、`intermediate` 或 `advanced` |
| `authors` | 撰写文章的 GitHub 用户名数组 |

**可选字段：**

| 字段 | 描述 | 何时使用 |
|------|------|---------|
| `sidebar_label` | 侧边栏的简短标签 | 仅当标题超过约 30 个字符时 |

**注意：** `last_updated` 由 Docusaurus 通过 git 历史自动处理。请勿手动添加。

### 完整模板示例

```markdown
---
title: "示例主题"
description: "该主题的简短描述。"
keywords: [主题, 示例, ai]
tags: [intermediate]
authors: [您的GitHub用户名]
---

# 示例主题

## 定义

第一段：是什么。

第二段：背景和与其他概念的关系。

第三段：为何重要。

## 工作原理

### 子章节 A

包含 3–5 句话的说明。

### 子章节 B

带图的说明：

（此处放置带标记边的 Mermaid 图）

## 何时使用 / 何时不使用

| 使用时机 | 避免时机 |
|---------|---------|
| 场景 A | 反例 A |
| 场景 B | 反例 B |
| 场景 C | 反例 C |

## 比较

（可选 — 仅当存在替代方案时）

| 标准 | 本主题 | 替代方案 |
|------|--------|---------|
| 标准 1 | ... | ... |
| 标准 2 | ... | ... |
| 标准 3 | ... | ... |

## 优缺点

（可选）

| 优点 | 缺点 |
|------|------|
| 优点 1 | 缺点 1 |
| 优点 2 | 缺点 2 |

## 基准测试

（可选 — 链接到论文或排行榜）

## 代码示例

（此处放置可运行代码片段）

## 实用资源

- [官方文档](https://example.com) — 描述
- [教程或课程](https://example.com) — 描述
- [GitHub 仓库](https://example.com) — 描述

## 另请参阅

- [相关文档 1](/docs/路径)
- [相关文档 2](/docs/路径)
```

## 添加新主题

1. 在 `docs/` 下的正确类别中创建新文件（如 `docs/tools/my-tool.md`）。
2. 使用上述模板并确保唯一的文档 ID（基于路径）。
3. 包含**所有必填章节**和相关的可选章节。
4. 将文档添加到 `sidebars.ts` 的正确类别中。
5. 如果您的文章包含与另一篇文章的**比较**，请用互惠比较更新该文章。
6. 提交一个带有简短描述的 PR。

## 改进示例

- 优先使用可运行代码；如果依赖项或设置不明显，请添加注释。
- 使用 Prism 支持的语言（Python、JavaScript、TypeScript、bash、yaml、docker）。
- 在相关处链接到官方文档或仓库。

## 图表（Mermaid）

文档中的图表使用 [Mermaid](https://mermaid.js.org/intro/getting-started.html) 编写，并由站点通过 Docusaurus 渲染。指南：

- 使用有效的 Mermaid.js 语法 — 在提交前在 [Mermaid Live Editor](https://mermaid.live/) 中测试。
- **标记边**以描述关系（不仅仅是用箭头连接的框）。
- 当图表有 5 个以上节点时，使用子图对相关组件进行分组。
- 架构优先使用 `flowchart LR` 或 `flowchart TD`；交互使用 `sequenceDiagram`。

## 翻译

该站点已本地化为**西班牙语（es）、葡萄牙语（pt-BR）、德语（de）、法语（fr）和简体中文（zh-Hans）**。默认内容为英语。

新文章**仅以英语**制作。翻译在单独阶段处理。

**翻译文件存放位置：**

- **侧边栏和文档标签：** `i18n/<locale>/docusaurus-plugin-content-docs/current.json`（侧边栏类别标签）。文档标题来自 `i18n/<locale>/docusaurus-plugin-content-docs/current/` 中每个已翻译文档的 frontmatter。
- **导航栏：** `i18n/<locale>/docusaurus-theme-classic/navbar.json`
- **页脚：** `i18n/<locale>/docusaurus-theme-classic/footer.json`
- **主题 UI 和自定义页面（home、all-topics）：** `i18n/<locale>/code.json`
- **文档内容：** 在 `i18n/<locale>/docusaurus-plugin-content-docs/current/` 下镜像 `docs/` 树，并翻译每个 `.md`（frontmatter `title`、`description` 和正文）。保持内部链接为 `/docs/...`，以便它们与 locale 前缀一起使用。

**添加新语言：** 将语言添加到 `docusaurus.config.ts` 中的 `i18n.locales`，然后运行 `npm run write-translations`（可选带 `--locale <locale>`）以生成 JSON 结构。填写导航栏、页脚、`code.json`、侧边栏和文档内容的翻译。

**何时运行 `write-translations`：** 在添加新的侧边栏项目、主题字符串或自定义页面键时运行 `npm run write-translations`，以便新键出现在每个 locale 的 JSON 文件中供翻译人员使用。

## 代码风格和提交

- 遵循现有格式（如 2 个空格、末尾换行）。
- 使用清晰的提交消息（如 "Add doc: X"、"Fix link in Y"）。

## 版本控制

当内容基线稳定时，维护者可以运行 `npm run docusaurus docs:version 1.0.0` 创建版本化快照。版本选择器将出现在导航栏中。详见 [Docusaurus 版本控制](https://docusaurus.io/docs/versioning)。

---

有疑问？请在 [GitHub](https://github.com/EmersonBraun/ai-summary-hub) 上提交 issue 或 PR。
