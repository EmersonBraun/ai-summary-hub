# Contributing to AI Summary Hub

Thanks for your interest in contributing! This project is an open-source AI knowledge base with 145+ articles across 47 categories.

## Quick start

1. Fork and clone the repo
2. Install dependencies: `npm install`
3. Start the dev server: `npm run start`
4. Make your changes
5. Run checks: `npm run lint && npm run typecheck && npm run validate`
6. Open a PR

## What you can contribute

- **New articles** — Add a doc under `docs/` following the [topic template](docs/contributing.md#topic-template)
- **Translations** — Translate articles into es, pt-BR, de, fr, or zh-Hans
- **Improvements** — Fix typos, improve examples, add diagrams, update links
- **Bug fixes** — Fix broken links, rendering issues, or CI problems

## Article guidelines

Every article must include mandatory sections (Definition, How it works, When to use / When NOT to use, Code examples, Practical resources, See also) and follow the [frontmatter spec](docs/contributing.md#frontmatter-spec).

For the full topic template, depth guidelines, diagram standards, and translation instructions, see **[docs/contributing.md](docs/contributing.md)**.

## Code style

- 2 spaces indentation, trailing newline
- Clear commit messages (e.g. `Add doc: X`, `Fix link in Y`)
- Run `npm run lint` and `npm run typecheck` before committing

## Pull requests

- Keep PRs focused — one article or one fix per PR
- Include a short description of what changed and why
- If adding a **Comparison** section to an article, update the compared article with a reciprocal comparison
- All CI checks must pass before merge

## Issues

Use the issue templates for:
- **Bug reports** — Broken links, rendering issues, CI failures
- **Feature requests** — New categories, site features, tooling improvements
- **New articles** — Propose a topic before writing

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## Questions?

Open an issue on [GitHub](https://github.com/EmersonBraun/ai-summary-hub/issues).
