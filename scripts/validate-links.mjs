#!/usr/bin/env node
/**
 * Validate internal links in Fumadocs MDX docs.
 *
 * Scans next/content/docs/{en,pt-BR}/**\/*.mdx and verifies that
 * `/docs/...` and relative links resolve to an existing .mdx file in
 * the same locale.
 *
 * Skips: external URLs, hash-only anchors, links inside fenced code
 * blocks (templates and tutorials often contain illustrative paths).
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { globSync } from 'glob';
import matter from 'gray-matter';

const ROOT = process.cwd();
const DOCS_DIR = resolve(ROOT, 'next/content/docs');
const LOCALES = ['en', 'pt-BR'];

const files = globSync(`${DOCS_DIR}/**/*.mdx`);

function resolveDocLink(link, sourceFile) {
  const clean = link.split('#')[0];
  if (!clean) return true;
  if (/^https?:\/\//.test(clean)) return true;
  if (clean.startsWith('mailto:')) return true;

  const relPath = relative(DOCS_DIR, sourceFile);
  const locale = LOCALES.find((l) => relPath === l || relPath.startsWith(`${l}/`));

  if (clean.startsWith('/docs/')) {
    if (!locale) return true;
    const sub = clean.slice('/docs/'.length);
    const candidates = [
      resolve(DOCS_DIR, locale, `${sub}.mdx`),
      resolve(DOCS_DIR, locale, sub, 'index.mdx'),
    ];
    return candidates.some(existsSync);
  }

  for (const loc of LOCALES) {
    const prefix = `/${loc}/docs/`;
    if (clean.startsWith(prefix)) {
      const sub = clean.slice(prefix.length);
      return (
        existsSync(resolve(DOCS_DIR, loc, `${sub}.mdx`)) ||
        existsSync(resolve(DOCS_DIR, loc, sub, 'index.mdx'))
      );
    }
  }

  if (clean.startsWith('./') || clean.startsWith('../')) {
    const sourceDir = dirname(sourceFile);
    const targetPath = resolve(sourceDir, clean);
    return (
      existsSync(targetPath) ||
      existsSync(`${targetPath}.mdx`) ||
      existsSync(resolve(targetPath, 'index.mdx'))
    );
  }

  return true;
}

const errors = [];
const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;

for (const file of files) {
  const rel = relative(ROOT, file);
  const raw = readFileSync(file, 'utf8');
  const { content } = matter(raw);

  const bodyNoCode = content.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]+`/g, '');

  let m;
  while ((m = linkRegex.exec(bodyNoCode))) {
    const [, text, link] = m;
    if (link.startsWith('<')) continue;
    if (!resolveDocLink(link, file)) {
      errors.push(`${rel}: broken link [${text}](${link})`);
    }
  }
}

if (errors.length) {
  console.error(`\nLink validation failed (${errors.length} broken link(s)):\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log(`Link validation passed (${files.length} files checked).`);
