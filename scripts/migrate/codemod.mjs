#!/usr/bin/env node
/**
 * Docusaurus → Fumadocs MDX codemod.
 *
 * Usage:
 *   node scripts/migrate/codemod.mjs --src docs --dest next/content/docs/en
 *   node scripts/migrate/codemod.mjs --src i18n/pt-BR/docusaurus-plugin-content-docs/current --dest next/content/docs/pt-BR
 *
 * Behaviour per .md file:
 *   - Parse frontmatter
 *   - Keep: title, description (Fumadocs schema)
 *   - Preserve as metadata extras: tags (array)
 *   - Drop: sidebar_position, sidebar_label, keywords, authors, slug, id, hide_title, pagination_*
 *   - Strip leading `# Heading` if it duplicates frontmatter title
 *   - Rewrite output as `.mdx`
 *   - Preserve mermaid fenced blocks (remark plugin in source.config.ts renders them)
 *   - Mirror directory structure into dest
 *   - Translate `_category_.json` (Docusaurus) → `meta.json` (Fumadocs)
 */

import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { join, relative, dirname, basename, extname } from 'node:path';
import matter from 'gray-matter';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith('--')) acc.push([cur.slice(2), arr[i + 1]]);
    return acc;
  }, []),
);

const SRC = args.src;
const DEST = args.dest;
const DRY = 'dry' in args;

if (!SRC || !DEST) {
  console.error('Usage: codemod.mjs --src <dir> --dest <dir> [--dry]');
  process.exit(1);
}

const DROP_KEYS = new Set([
  'sidebar_position',
  'sidebar_label',
  'sidebar_class_name',
  'keywords',
  'authors',
  'slug',
  'id',
  'hide_title',
  'hide_table_of_contents',
  'pagination_label',
  'pagination_next',
  'pagination_prev',
  'displayed_sidebar',
  'parse_number_prefixes',
  'last_update',
  'image',
  'draft',
  'unlisted',
  'toc_min_heading_level',
  'toc_max_heading_level',
  'custom_edit_url',
]);

let stats = { files: 0, categories: 0, h1Stripped: 0, mermaidBlocks: 0 };

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function slimFrontmatter(data) {
  const slim = {};
  if (data.title) slim.title = data.title;
  if (data.description) slim.description = data.description;
  if (Array.isArray(data.tags) && data.tags.length) slim.tags = data.tags;
  for (const [k, v] of Object.entries(data)) {
    if (DROP_KEYS.has(k)) continue;
    if (k in slim) continue;
    // Preserve unknown extras (better safe — easier to prune later)
    slim[k] = v;
  }
  return slim;
}

function stripDuplicateH1(content, title) {
  if (!title) return content;
  const lines = content.split('\n');
  let i = 0;
  while (i < lines.length && lines[i].trim() === '') i++;
  if (i >= lines.length) return content;
  const m = lines[i].match(/^#\s+(.+?)\s*$/);
  if (!m) return content;
  const heading = m[1].trim();
  if (heading.toLowerCase() === String(title).toLowerCase()) {
    lines.splice(i, 1);
    while (i < lines.length && lines[i].trim() === '') {
      lines.splice(i, 1);
    }
    stats.h1Stripped++;
    return lines.join('\n');
  }
  return content;
}

function countMermaid(content) {
  const m = content.match(/^```mermaid/gm);
  if (m) stats.mermaidBlocks += m.length;
}

async function migrateMarkdown(srcFile, destFile) {
  const raw = await readFile(srcFile, 'utf8');
  const { data, content } = matter(raw);
  const slim = slimFrontmatter(data);
  const body = stripDuplicateH1(content, slim.title);
  countMermaid(body);
  const out = matter.stringify(body, slim);
  if (!DRY) {
    await mkdir(dirname(destFile), { recursive: true });
    await writeFile(destFile, out, 'utf8');
  }
  stats.files++;
}

async function migrateCategory(srcFile, destFile) {
  const raw = await readFile(srcFile, 'utf8');
  const data = JSON.parse(raw);
  const meta = {};
  if (data.label) meta.title = data.label;
  if (data.position != null) meta.position = data.position;
  if (data.description) meta.description = data.description;
  if (data.link?.type === 'generated-index') meta.root = true;
  if (!DRY) {
    await mkdir(dirname(destFile), { recursive: true });
    await writeFile(destFile, JSON.stringify(meta, null, 2) + '\n', 'utf8');
  }
  stats.categories++;
}

async function main() {
  const all = await walk(SRC);
  for (const file of all) {
    const rel = relative(SRC, file);
    const ext = extname(file);
    const name = basename(file);

    if (name === '_category_.json') {
      const destFile = join(DEST, dirname(rel), 'meta.json');
      await migrateCategory(file, destFile);
    } else if (ext === '.md' || ext === '.mdx') {
      const destFile = join(DEST, rel.replace(/\.mdx?$/, '.mdx'));
      await migrateMarkdown(file, destFile);
    }
    // Skip everything else (images, JS, etc.) — caller can copy assets separately.
  }
  console.log(JSON.stringify(stats, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
