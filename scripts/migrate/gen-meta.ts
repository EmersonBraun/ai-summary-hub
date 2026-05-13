#!/usr/bin/env tsx
/**
 * Generate Fumadocs `meta.json` files from the Docusaurus `sidebars.ts`.
 *
 * Reads top-level sidebar `docsSidebar`, walks each category, and emits
 * a `meta.json` in the matching content folder listing pages in the
 * exact sidebar order. Nested categories are emitted recursively as
 * sub-folders with their own meta.json.
 *
 * Usage:
 *   npx tsx scripts/migrate/gen-meta.ts --dest next/content/docs
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import sidebars from '../../sidebars';

type DocItem = string | { type: 'ref'; id: string } | { type: 'doc'; id: string };
type Category = {
  type: 'category';
  label: string;
  items: (Category | DocItem)[];
  link?: unknown;
  collapsed?: boolean;
};
type SidebarItem = Category | DocItem;

const destArg = process.argv.findIndex((a) => a === '--dest');
const DEST = destArg !== -1 ? process.argv[destArg + 1] : 'next/content/docs';

function idOf(item: DocItem): string {
  if (typeof item === 'string') return item;
  return item.id;
}

function isCategory(item: SidebarItem): item is Category {
  return typeof item === 'object' && item !== null && 'type' in item && item.type === 'category';
}

type FolderMeta = { title?: string; pages: string[] };
const folders = new Map<string, FolderMeta>();

function ensureFolder(path: string, title?: string) {
  const existing = folders.get(path);
  if (!existing) {
    folders.set(path, { title, pages: [] });
  } else if (title && !existing.title) {
    existing.title = title;
  }
  return folders.get(path)!;
}

function commonDirOf(ids: string[]): string {
  const dirs = ids.map((id) => {
    const parts = id.split('/');
    return parts.length > 1 ? parts.slice(0, -1).join('/') : '';
  });
  const [first, ...rest] = dirs;
  if (first === undefined) return '';
  return rest.every((d) => d === first) ? first : '';
}

function walk(items: SidebarItem[], parentDir: string) {
  for (const item of items) {
    if (isCategory(item)) {
      const docIds = item.items.filter((x) => !isCategory(x)).map((x) => idOf(x as DocItem));
      const dir = docIds.length ? commonDirOf(docIds) : parentDir;
      ensureFolder(dir || parentDir, item.label);

      // Children: doc items go into THIS dir's pages list (basename only).
      for (const child of item.items) {
        if (isCategory(child)) {
          walk([child], dir || parentDir);
        } else {
          const id = idOf(child);
          const parts = id.split('/');
          const last = parts[parts.length - 1];
          const folder = parts.length > 1 ? parts.slice(0, -1).join('/') : '';
          ensureFolder(folder, undefined).pages.push(last);
        }
      }
    } else {
      const id = idOf(item);
      const parts = id.split('/');
      const last = parts[parts.length - 1];
      const folder = parts.length > 1 ? parts.slice(0, -1).join('/') : '';
      ensureFolder(folder, undefined).pages.push(last);
    }
  }
}

async function main() {
  const top = (sidebars as Record<string, SidebarItem[]>).docsSidebar;
  if (!top) throw new Error('docsSidebar not found in sidebars.ts');
  walk(top, '');

  // Root meta lists the categories (folders) in their first-appearance order.
  const rootCategories: string[] = [];
  for (const [path] of folders) {
    if (!path) continue;
    const top = path.split('/')[0];
    if (!rootCategories.includes(top)) rootCategories.push(top);
  }
  // Root-level page items (no folder).
  const rootMeta = folders.get('') ?? { pages: [] };
  const rootPages = [...rootMeta.pages, ...rootCategories];

  await mkdir(DEST, { recursive: true });
  await writeFile(
    join(DEST, 'meta.json'),
    JSON.stringify({ title: 'Docs', pages: rootPages }, null, 2) + '\n',
    'utf8',
  );

  for (const [path, meta] of folders) {
    if (!path) continue;
    const full = join(DEST, path, 'meta.json');
    await mkdir(dirname(full), { recursive: true });
    // Move 'index' to the front if present so the category landing is first.
    const pages = [...meta.pages];
    const idxOf = pages.indexOf('index');
    if (idxOf > 0) {
      pages.splice(idxOf, 1);
      pages.unshift('index');
    }
    const payload: Record<string, unknown> = { pages };
    if (meta.title) payload.title = meta.title;
    await writeFile(full, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  }

  console.log(`Wrote ${folders.size + 1} meta.json files under ${DEST}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
