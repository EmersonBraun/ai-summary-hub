#!/usr/bin/env node
/**
 * Validate Fumadocs MDX frontmatter under next/content/docs.
 *
 * Required fields (Fumadocs schema):
 *   - title       (string)
 *   - description (string)
 *
 * Optional tag conventions (kept from the Docusaurus era):
 *   - tags must include exactly one level tag from VALID_LEVEL_TAGS
 *     unless the file is in SKIP_TAG_VALIDATION.
 */

import { readFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { globSync } from 'glob';
import matter from 'gray-matter';

const ROOT = process.cwd();
const DOCS_DIR = resolve(ROOT, 'next/content/docs');
const VALID_LEVEL_TAGS = new Set(['beginner', 'intermediate', 'advanced']);

const SKIP_TAG_VALIDATION = new Set([
  'glossary.mdx',
  'changelog.mdx',
  'contributing.mdx',
]);

const files = globSync(`${DOCS_DIR}/**/*.mdx`);
const errors = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  const basename = file.split('/').pop();
  const content = readFileSync(file, 'utf8');
  const { data } = matter(content);

  if (!data.title || typeof data.title !== 'string') {
    errors.push(`${rel}: missing or non-string 'title'`);
  }
  if (!data.description || typeof data.description !== 'string') {
    errors.push(`${rel}: missing or non-string 'description'`);
  }

  if (SKIP_TAG_VALIDATION.has(basename)) continue;
  if (!data.tags) continue; // tags optional in Fumadocs

  if (!Array.isArray(data.tags)) {
    errors.push(`${rel}: 'tags' must be an array`);
    continue;
  }
  const levelTags = data.tags.filter((t) => VALID_LEVEL_TAGS.has(t));
  if (levelTags.length > 1) {
    errors.push(
      `${rel}: at most one level tag allowed (${[...VALID_LEVEL_TAGS].join(', ')}), got ${levelTags.length}: ${levelTags.join(', ')}`,
    );
  }
}

if (errors.length) {
  console.error(`\nFrontmatter validation failed (${errors.length} error(s)):\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log(`Frontmatter validation passed (${files.length} files checked).`);
