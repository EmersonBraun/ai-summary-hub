---
title: 上下文管理
description: Claude Code 如何在长会话中管理上下文窗口——自动压缩、对话历史策略以及在大规模场景中保持会话有效性的实用技巧。
keywords: [上下文管理, 上下文窗口, 对话历史, /clear, 上下文压缩, token 限制, Claude Code 会话, 长会话]
tags: [intermediate]
authors: [EmersonBraun]
---

# 上下文管理

## 定义

上下文管理是指 Claude Code 在模型上下文窗口的有限范围内保持对话有效的策略和机制。每个模型都有一个最大上下文窗口——它在单个请求中可以处理的 token 总数——该窗口必须容纳系统提示、工具定义、完整的对话历史（用户消息、助手响应、工具调用和工具结果）以及会话期间加载的任何文件内容。当累积上下文接近限制时，必须有所取舍：要么压缩或丢弃旧内容，要么必须重置会话。

理解上下文管理对于长时间的 Claude Code 会话尤为重要。一个直接的调试会话可能在 30-50 轮后就会耗尽完整的上下文窗口，特别是当 Claude 读取多个大文件、运行带有冗长输出的命令或积累了许多轮工具调用时。不了解上下文限制的开发者可能会注意到 Claude 开始"忘记"早期决定、给出不一致的答案，或者对之前的上下文感到困惑——这些都是上下文压力的症状，而非模型故障。

Claude Code 通过自动机制（上下文压缩、选择性文件加载）和用户控制策略（`/clear` 命令、聚焦任务范围、用于持久规范的 CLAUDE.md）的组合来解决上下文限制。有效的上下文管理不仅仅是为了避免错误——它是关于通过在活跃窗口中始终保留最相关的信息来设计从头到尾保持敏锐和准确的会话。

## 工作原理

### 上下文窗口结构

上下文窗口分为几个区域，每个区域都对总 token 数有贡献。**系统提示区域**包含 CLAUDE.md 指令和工具定义——这些相对稳定，可以被缓存（参见提示缓存）。**对话历史区域**随每个轮次增长：每条用户消息、助手响应、工具调用和工具结果都会添加 token。**文件内容区域**包含 Claude 在会话期间读取的实际源代码和文件内容。随着会话的进行，对话历史和文件内容区域不断增长，直到接近模型的限制。

### 自动上下文压缩

当 Claude Code 检测到上下文窗口接近其限制时，它会对对话历史应用自动压缩。压缩算法识别对当前任务不太可能需要的较旧轮次，并对其进行汇总或截断。工具结果——特别是大型结果，如目录列表或长文件内容——被优先压缩，因为它们包含模型已经处理过的原始数据。目标是在保留对话逻辑主线的同时丢弃较旧轮次的逐字内容。用户可能会注意到压缩的摘要出现在替代了早期详细交流的位置。

### 选择性文件加载

Claude Code 不会在会话开始时预加载所有项目文件到上下文中。相反，它使用即时加载策略：只有当 Claude 确定文件与当前任务相关时，才会使用 `Read` 或 `Glob` 工具读取文件。这使初始上下文保持小而专注。然而，随着会话的进行，Claude 读取更多文件，文件内容在上下文中积累。对于非常大的代码库，Claude 可能需要有选择地重新读取特定文件，而不是将所有之前读取的文件保留在活跃窗口中。

### /clear 命令

`/clear` 命令丢弃整个对话历史并开始一个新会话。这是最激进的上下文管理形式——相当于关闭并重新打开终端。在不相关的任务之间、完成主要功能后，或当上下文漂移（历史中矛盾或过时的信息）导致混乱行为时使用它。CLAUDE.md 指令和项目配置在 `/clear` 后存留，因为它们在每次会话开始时从文件系统重新加载。

```mermaid
flowchart LR
  UserMsg[User message] -->|appended to history| History[Conversation history]
  History -->|within limit| Assemble[Context assembled]
  ToolCall[Tool calls + results] -->|appended to history| History
  FileRead[File contents loaded] -->|appended to history| History
  Assemble -->|sent to| Model[Claude model]
  Model -->|response + new tool calls| History
  History -->|approaching limit| Compress[Auto-compression\nold turns summarized]
  Compress -->|trimmed history| Assemble
  Clear[/clear command] -->|resets| History
```

## 何时使用 / 何时不使用

| 使用场景 | 避免场景 |
|---|---|
| 开始一个新的不相关任务——使用 `/clear` 以干净的上下文开始 | 对话历史包含您仍然需要的关键决策或发现 |
| 会话已运行多轮，Claude 似乎困惑——上下文漂移是一个迹象 | 您正处于需要先前上下文的多步骤任务中间 |
| 加载非常大的文件——先考虑 `/clear`，只加载当前任务需要的内容 | 会话很短，上下文压力还不是问题 |
| 希望对响应质量进行基准测试——干净的上下文提供干净的基准 | 依赖 CLAUDE.md 获取项目上下文——`/clear` 保留它，但会话特定上下文会丢失 |
| 正在编写捕获重要项目上下文的 CLAUDE.md，使其在 `/clear` 后存留 | "困惑"实际上是与上下文无关的模型限制——更多上下文无济于事 |

## 代码示例

```bash
# Context management strategies in a Claude Code session

# Strategy 1: Use /clear between unrelated tasks
# Working on feature A...
claude
> Implement the user registration endpoint in src/routes/auth.ts
> Add validation for email format and password strength
> Write the unit tests for the new endpoint

# Feature A is done. Switch to a completely different task.
> /clear    # Reset context — start fresh for unrelated work
> Refactor the logging module in src/utils/logger.ts to use structured JSON output

# ---

# Strategy 2: Scope tasks narrowly to avoid loading unnecessary files
# BAD: Loads everything, inflates context early
> Read all files in the src/ directory and tell me how authentication works

# GOOD: Targeted question that loads only relevant files
> How does authentication work? Start by reading src/routes/auth.ts and src/middleware/auth.ts

# ---

# Strategy 3: Summarize before /clear to preserve key decisions
> Before I run /clear, summarize the architectural decisions we made in this session
  so I can paste them into CLAUDE.md

# Paste the summary into CLAUDE.md, then:
> /clear    # Now the decisions persist via CLAUDE.md across future sessions

# ---

# Strategy 4: Use focused sessions for large codebases
# Instead of one giant session, break work into focused chunks
# Session 1: Understand the data model
claude
> Read src/models/ and explain the database schema and entity relationships
> /exit

# Session 2: Implement a specific feature
claude
> Given our Prisma schema in prisma/schema.prisma, add a 'tags' relation to Post
```

```bash
# Monitoring context usage (verbose mode)
claude --verbose

# Look for token count indicators in the verbose output:
# "Context: 45,231 / 200,000 tokens (22%)"
# When this approaches 80-90%, consider /clear or wrapping up the session

# The model will also proactively warn you when context is getting full:
# "Note: This session is using a significant portion of the context window.
#  Consider using /clear before starting unrelated tasks."
```

```markdown
# CLAUDE.md pattern: capturing session context for future sessions
# This lets important discoveries survive /clear

## Current architecture decisions (updated 2026-04-01)
- Authentication uses JWT with 24h access tokens and 30d refresh tokens stored in httpOnly cookies
- All database queries go through the repository layer in src/repositories/ — never call Prisma directly from routes
- We decided against Redis for session storage in favor of stateless JWT (revisit if auth rate-limiting is needed)
- The `UserService` was split into `UserAuthService` and `UserProfileService` in the April 2026 refactor

## Known complexity areas (read these files before touching related code)
- `src/services/billing.ts` — complex subscription state machine, read the inline comments carefully
- `src/middleware/rateLimit.ts` — custom sliding window implementation, not a standard library
```

## 实用资源

- [Claude Code 上下文和内存](https://docs.anthropic.com/en/docs/claude-code/memory) — 关于 Claude Code 如何管理上下文的官方指南，包括 /clear 和用于持久内存的 CLAUDE.md。
- [Claude 模型上下文窗口](https://docs.anthropic.com/en/docs/about-claude/models) — 每个 Claude 模型变体的 token 限制。
- [提示缓存文档](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) — 如何缓存稳定的上下文部分以降低长会话中的成本和延迟。
- [Claude Code CLI 参考](https://docs.anthropic.com/en/docs/claude-code/cli-reference) — 所有斜杠命令的完整列表，包括 /clear 和 /compact。

## 另请参阅

- [Claude Code 概述](/docs/claude-code)
- [提示缓存](/docs/claude-code/prompt-caching)
- [CLAUDE.md 配置](/docs/claude-code/claude-md)
