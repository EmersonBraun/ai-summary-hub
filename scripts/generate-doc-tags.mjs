/**
 * Generates a JSON map of doc ID -> level tag for use in the All Topics page.
 * Run at build time: `node scripts/generate-doc-tags.mjs`
 * Output: src/data/doc-tags.json
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import matter from 'gray-matter';
import { resolve, relative } from 'path';

let globSync;
try {
  const globModule = await import('glob');
  globSync = globModule.globSync;
} catch {
  console.error('glob package not found');
  process.exit(1);
}

const DOCS_DIR = resolve(process.cwd(), 'docs');
const OUTPUT = resolve(process.cwd(), 'src/data/doc-tags.json');
const VALID_TAGS = ['beginner', 'intermediate', 'advanced'];

const files = globSync(`${DOCS_DIR}/**/*.md`).filter(
  (f) => !f.endsWith('tags.yml')
);

const tagMap = {};

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  const { data } = matter(content);

  // Derive doc ID from path (same as Docusaurus)
  let docId = relative(DOCS_DIR, file).replace(/\.md$/, '');
  // docs/rag/index.md -> rag/index, docs/intro.md -> intro

  if (data.tags && Array.isArray(data.tags)) {
    const level = data.tags.find((t) => VALID_TAGS.includes(t));
    if (level) {
      tagMap[docId] = level;
    }
  }
}

mkdirSync(resolve(process.cwd(), 'src/data'), { recursive: true });
writeFileSync(OUTPUT, JSON.stringify(tagMap, null, 2) + '\n');

console.log(`✅ Generated doc-tags.json (${Object.keys(tagMap).length} docs mapped)`);
