import { readFileSync } from 'fs';
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
const VALID_TAGS = ['beginner', 'intermediate', 'advanced'];

// Utility docs excluded from tag validation (hardcoded list)
const SKIP_TAG_VALIDATION = [
  'docs/glossary.md',
  'docs/changelog.md',
  'docs/contributing.md',
];

const files = globSync(`${DOCS_DIR}/**/*.md`).filter(
  (f) => !f.endsWith('tags.yml')
);

const errors = [];

for (const file of files) {
  const rel = relative(process.cwd(), file);
  const content = readFileSync(file, 'utf-8');
  const { data } = matter(content);

  if (!data.title) {
    errors.push(`${rel}: missing 'title' field`);
  }
  if (!data.description) {
    errors.push(`${rel}: missing 'description' field`);
  }
  if (!data.authors || !Array.isArray(data.authors) || data.authors.length === 0) {
    errors.push(`${rel}: missing or empty 'authors' field (must be an array of GitHub usernames)`);
  }
  if (!data.keywords || !Array.isArray(data.keywords) || data.keywords.length === 0) {
    errors.push(`${rel}: missing or empty 'keywords' field (must be a non-empty array)`);
  }

  const skipTags = SKIP_TAG_VALIDATION.some((s) => rel === s || rel.endsWith(s));
  if (!skipTags) {
    if (!data.tags || !Array.isArray(data.tags)) {
      errors.push(`${rel}: missing 'tags' field`);
    } else {
      const levelTags = data.tags.filter((t) => VALID_TAGS.includes(t));
      if (levelTags.length === 0) {
        errors.push(
          `${rel}: must have exactly one level tag (${VALID_TAGS.join(', ')}), found none`
        );
      } else if (levelTags.length > 1) {
        errors.push(
          `${rel}: must have exactly one level tag, found ${levelTags.length}: ${levelTags.join(', ')}`
        );
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`\n❌ Frontmatter validation failed (${errors.length} error(s)):\n`);
  errors.forEach((e) => console.error(`  • ${e}`));
  console.error('');
  process.exit(1);
} else {
  console.log(`✅ Frontmatter validation passed (${files.length} files checked)`);
}
