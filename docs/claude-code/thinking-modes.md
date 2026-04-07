---
title: Thinking modes and effort
description: Extended thinking in Claude Code — what it is, how effort levels affect reasoning depth versus speed, and how to configure thinking behavior for different task types.
keywords: [extended thinking, thinking modes, effort levels, Claude reasoning, budget tokens, thinking tokens, deep reasoning, Claude Code]
tags: [intermediate]
authors: [EmersonBraun]
---

# Thinking modes and effort

## Definition

Extended thinking is a feature of Claude models that enables the model to reason through a problem step by step in a dedicated internal scratchpad before producing its final response. Unlike the visible output, this reasoning process is designed for the model's internal deliberation — it surfaces intermediate conclusions, evaluates alternatives, catches its own errors, and builds toward a well-considered answer. The result is responses that are more accurate on complex tasks, better-reasoned on ambiguous problems, and less susceptible to shallow pattern-matching errors.

In Claude Code, extended thinking manifests as an **effort level** setting that controls how much computational work the model performs before answering. Low-effort responses are fast and appropriate for simple, unambiguous tasks (formatting code, explaining a short function). High-effort responses invest more reasoning budget and are better suited to complex architectural decisions, difficult debugging sessions, or tasks where mistakes are costly. The trade-off is always speed versus depth: more thinking takes more time and consumes more tokens.

It is important to distinguish extended thinking from chain-of-thought prompting. Chain-of-thought asks the model to show its work in the output — the reasoning is part of the response text. Extended thinking, by contrast, happens in a separate `thinking` block that the model processes internally. In Claude Code sessions, you can sometimes observe `<thinking>` blocks in the raw API output, though Claude Code's UI typically displays only the final response. The internal thinking is not subject to the same constraints as the output and is optimized for reasoning quality rather than readability.

## How it works

### Thinking blocks and budget tokens

When extended thinking is enabled, the model receives an additional parameter: `budget_tokens`. This integer specifies the maximum number of tokens the model may use for its internal reasoning before producing the final response. A budget of 1,000 tokens allows for brief deliberation; a budget of 10,000 tokens enables deep, multi-step analysis. The model does not always use its full budget — it stops thinking when it reaches a satisfactory conclusion. Setting the budget higher than necessary adds latency without proportional quality gains; the right budget depends on task complexity.

### Effort levels in Claude Code

Claude Code translates the abstract concept of budget tokens into named effort levels that are easier to reason about:

- **Low effort (default for simple tasks)**: minimal thinking budget, fast responses, appropriate for code formatting, simple explanations, single-file edits, and lookup operations.
- **Medium effort**: moderate thinking budget, the default for most interactive coding sessions; balances speed and quality for typical development tasks.
- **High effort / max**: large thinking budget, reserved for complex tasks — debugging hard-to-reproduce issues, designing systems, analyzing security implications, or any task where a wrong answer would be expensive to fix.

### When the model thinks

Not every response triggers extended thinking. Claude Code uses heuristics to determine when additional reasoning is warranted based on task complexity signals: the length and ambiguity of the request, the number of files involved, whether the task involves making irreversible changes, and whether the user has explicitly requested careful analysis. Users can also signal desired effort explicitly by adding phrases like "think carefully about this" or "take your time" in their requests — these are recognized by the model as signals to invest more reasoning budget.

### Streaming and latency

Extended thinking interacts with streaming in a predictable way: the model begins streaming its visible output only after completing its internal reasoning. This means high-effort requests have a longer initial pause before output begins, but the first token of actual content arrives fully-formed rather than incrementally uncertain. In Claude Code's CLI and IDE integrations, this shows up as a brief "thinking..." indicator before the response starts. For interactive sessions, this delay is usually worth it for complex tasks; for tight feedback loops, keeping effort low is preferable.

```mermaid
flowchart LR
  Request[User request] -->|complexity signals| Effort[Effort level selected]
  Effort -->|budget_tokens set| Think[Internal thinking block]
  Think -->|reasoning complete| Draft[Draft response]
  Draft -->|self-review| Final[Final response streamed]
  Final -->|delivered to| User[Developer]
```

## When to use / When NOT to use

| Use when | Avoid when |
|---|---|
| Debugging a complex, hard-to-reproduce error with many possible root causes | Asking for a simple one-liner or a quick syntax correction — low effort is faster and sufficient |
| Designing or reviewing a system architecture with significant trade-offs | Interactive back-and-forth sessions where each turn is a small step — latency accumulates |
| Analyzing security implications of a code change before merging | Generating boilerplate or scaffolding that follows well-established patterns |
| Tasks where a wrong answer would require significant rework to fix | Running in CI pipelines where determinism and speed matter more than reasoning depth |
| Any task you would give to a senior engineer who is known to "think before coding" | You are working under tight token budget constraints — thinking tokens count against your usage |

## Pros and cons

| | Pros | Cons |
|---|---|---|
| **High effort** | Better accuracy on complex tasks; catches edge cases; produces well-reasoned explanations | Higher latency; more tokens consumed; longer pause before first output token |
| **Low effort** | Fast responses; good for tight interactive loops; lower token cost | May miss edge cases on complex tasks; can produce shallow analysis on ambiguous problems |
| **Auto effort** | No configuration needed; model calibrates to task complexity | Less predictable behavior; may under-invest on genuinely hard tasks that appear simple |

## Code examples

```bash
# Claude Code CLI — signaling desired effort level through natural language

# Low effort (fast): simple, well-defined tasks
> Format this function to match our Prettier config

# Medium effort (default): typical coding tasks
> Refactor the UserService class to use dependency injection

# High effort: complex tasks — add "think carefully", "take your time", or "analyze deeply"
> Think carefully: this WebSocket handler occasionally drops messages under high load.
  Analyze all the possible race conditions and ordering issues in src/ws/handler.ts
  before suggesting a fix.

# High effort: architectural decisions
> Take your time to analyze the trade-offs between using Redis Pub/Sub versus
  a message queue like RabbitMQ for our notification service. Consider our
  current scale (10k concurrent users) and the team's operational experience.

# High effort: security review
> Analyze src/auth/jwt.ts carefully for security vulnerabilities. Think through
  all the attack vectors — token forgery, replay attacks, expiry bypass —
  before giving me your assessment.
```

```json
// Claude Code settings.json — configuring default thinking behavior
// Located at: ~/.claude/settings.json or .claude/settings.json in project root
{
  "thinking": {
    "defaultEffort": "medium",
    "maxBudgetTokens": 8000,
    "enableForComplexTasks": true
  }
}
```

```python
# Using extended thinking directly via the Anthropic API (for custom integrations)
import anthropic

client = anthropic.Anthropic()

# High-effort request: complex architectural question
response = client.messages.create(
    model="claude-opus-4-5",
    max_tokens=16000,
    # thinking block enables extended reasoning; budget_tokens controls depth
    thinking={
        "type": "enabled",
        "budget_tokens": 10000  # allow up to 10k tokens of internal reasoning
    },
    messages=[{
        "role": "user",
        "content": (
            "Analyze the following database schema for potential performance issues "
            "at 1M+ rows. Consider indexing strategies, query patterns, and normalization "
            "trade-offs. Schema: [paste schema here]"
        )
    }]
)

# The response content may include both thinking blocks and text blocks
for block in response.content:
    if block.type == "thinking":
        # Internal reasoning — useful for debugging model behavior
        print(f"[THINKING]: {block.thinking[:200]}...")
    elif block.type == "text":
        # Final response — the part to show the user
        print(f"[RESPONSE]: {block.text}")

# Low-effort request: simple, fast task (thinking disabled or minimal budget)
quick_response = client.messages.create(
    model="claude-haiku-4-5",  # Haiku for fast, simple tasks
    max_tokens=1024,
    # No thinking block for simple requests — faster and cheaper
    messages=[{
        "role": "user",
        "content": "Convert this array of objects to a Map keyed by id: [{id: 1, name: 'a'}, {id: 2, name: 'b'}]"
    }]
)
print(quick_response.content[0].text)
```

## Practical resources

- [Extended thinking documentation — Anthropic](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) — Full reference on thinking blocks, budget tokens, streaming behavior, and API parameters.
- [Extended thinking cookbook](https://github.com/anthropics/anthropic-cookbook/tree/main/extended_thinking) — Practical notebooks demonstrating extended thinking for complex reasoning tasks.
- [Claude model comparison](https://docs.anthropic.com/en/docs/about-claude/models) — Model card details including which models support extended thinking and their relative capabilities.
- [Claude Code settings reference](https://docs.anthropic.com/en/docs/claude-code/settings) — Where to configure default effort levels and thinking behavior in Claude Code.

## See also

- [Claude Code overview](/docs/claude-code)
- [Prompt caching](/docs/claude-code/prompt-caching)
- [Context management](/docs/claude-code/context-management)
