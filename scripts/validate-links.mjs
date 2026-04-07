import { readFileSync, existsSync } from 'fs';
import matter from 'gray-matter';
import { resolve, relative, dirname } from 'path';

let globSync;
try {
  const globModule = await import('glob');
  globSync = globModule.globSync;
} catch {
  console.error('glob package not found');
  process.exit(1);
}

const DOCS_DIR = resolve(process.cwd(), 'docs');
const files = globSync(`${DOCS_DIR}/**/*.md`).filter(
  (f) => !f.endsWith('tags.yml')
);

function resolveDocLink(link, sourceFile) {
  const cleanLink = link.split('#')[0];
  if (!cleanLink) return true;

  if (cleanLink.startsWith('http://') || cleanLink.startsWith('https://')) {
    return true;
  }

  if (!cleanLink.startsWith('/docs/') && !cleanLink.startsWith('./') && !cleanLink.startsWith('../')) {
    return true;
  }

  if (cleanLink.startsWith('/docs/')) {
    const docPath = cleanLink.replace(/^\//, '');
    if (existsSync(resolve(process.cwd(), `${docPath}.md`))) return true;
    if (existsSync(resolve(process.cwd(), `${docPath}/index.md`))) return true;
    if (existsSync(resolve(process.cwd(), docPath))) return true;
    return false;
  }

  const sourceDir = dirname(sourceFile);
  const targetPath = resolve(sourceDir, cleanLink);
  if (existsSync(targetPath)) return true;
  if (existsSync(`${targetPath}.md`)) return true;
  if (existsSync(resolve(targetPath, 'index.md'))) return true;
  return false;
}

const errors = [];
const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;

for (const file of files) {
  const rel = relative(process.cwd(), file);
  const content = readFileSync(file, 'utf-8');
  const { content: body } = matter(content);

  // Strip fenced code blocks to avoid checking links inside examples/templates
  const bodyNoCode = body.replace(/```[\s\S]*?```/g, '');

  let match;
  while ((match = linkRegex.exec(bodyNoCode)) !== null) {
    const [, linkText, link] = match;
    if (!resolveDocLink(link, file)) {
      errors.push(`${rel}: broken link [${linkText}](${link})`);
    }
  }
}

if (errors.length > 0) {
  console.error(`\n❌ Link validation failed (${errors.length} broken link(s)):\n`);
  errors.forEach((e) => console.error(`  • ${e}`));
  console.error('');
  process.exit(1);
} else {
  console.log(`✅ Link validation passed (${files.length} files checked)`);
}
