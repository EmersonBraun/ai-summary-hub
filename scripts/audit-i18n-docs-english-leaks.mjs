#!/usr/bin/env node
/**
 * Finds translated doc pages that still contain obvious English fragments.
 *
 * - zh-Hans: lines with CJK + common English function words (strong signal).
 * - Other locales: lines with 2+ English stop-word tokens (weaker; review manually).
 *
 * Usage: node scripts/audit-i18n-docs-english-leaks.mjs [--locale=zh-Hans]
 *        npm run i18n:audit-docs
 */

import fs from 'node:fs';
import path from 'node:path';
import {glob} from 'glob';

const ROOT = process.cwd();
const DOCS_GLOB =
  'i18n/{de,es,fr,pt-BR,zh-Hans}/docusaurus-plugin-content-docs/current/**/*.md';

const CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;

const EN_STOP = new RegExp(
  String.raw`\b(the|and|for|with|from|this|that|these|those|when|where|what|how|why|your|you|they|them|their|have|has|had|been|being|also|only|just|such|most|some|many|very|well|between|through|before|after|without|within|using|used|based|including|following|example|examples|note|important|summary|overview|introduction|instead|rather|combines|applies|returns|inputs|outputs|training|inference|learning|model|models|network|layer|layers|weights|vector|vectors|search|query|queries|embedding|embeddings|token|tokens|step|steps|state|reward|action|policy|agent|agents|task|tasks|data|batch|scale|latency|memory|device|devices|hardware|software|pipeline|pipelines|framework|frameworks)\b`,
  'gi',
);

function inCodeFence(lines, lineIndex) {
  let fence = false;
  for (let i = 0; i < lineIndex; i++) {
    const t = lines[i].trimStart();
    if (t.startsWith('```')) fence = !fence;
  }
  return fence;
}

function analyzeFile(filePath, locale) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const hits = [];

  for (let i = 0; i < lines.length; i++) {
    if (inCodeFence(lines, i)) continue;
    const line = lines[i];
    if (!line.trim()) continue;
    if (/^[\s>*#\-[\]|0-9.]+$/.test(line)) continue;

    const stopMatches = line.match(EN_STOP);
    if (!stopMatches || stopMatches.length < 1) continue;

    if (locale === 'zh-Hans') {
      if (!CJK.test(line)) continue;
      if (stopMatches.length < 2) continue;
    } else {
      if (stopMatches.length < 3) continue;
      if (CJK.test(line)) continue;
    }

    hits.push({line: i + 1, text: line.trim().slice(0, 200)});
  }

  return hits;
}

const localeArg = process.argv.find((a) => a.startsWith('--locale='));
const onlyLocale = localeArg ? localeArg.split('=')[1] : null;

async function main() {
  const files = await glob(DOCS_GLOB, {cwd: ROOT, nodir: true});
  const byFile = [];

  for (const rel of files.sort()) {
    const parts = rel.split(path.sep);
    const fileLocale = parts[1];
    if (onlyLocale && fileLocale !== onlyLocale) continue;

    const full = path.join(ROOT, rel);
    const hits = analyzeFile(full, fileLocale);
    if (hits.length > 0) byFile.push({rel, locale: fileLocale, hits});
  }

  byFile.sort((a, b) => b.hits.length - a.hits.length);

  console.log(
    `i18n docs English-leak audit${onlyLocale ? ` (locale=${onlyLocale})` : ''}\n` +
      `Files with hits: ${byFile.length}\n`,
  );

  for (const {rel, locale: fileLocaleTag, hits} of byFile) {
    console.log(`--- ${rel} [${fileLocaleTag}] (${hits.length} lines) ---`);
    for (const h of hits.slice(0, 12)) {
      console.log(`  L${h.line}: ${h.text}`);
    }
    if (hits.length > 12) console.log(`  ... +${hits.length - 12} more`);
    console.log('');
  }

  if (byFile.length === 0) {
    console.log('No hits (try --locale=zh-Hans or relax rules in script).');
  } else {
    console.log(
      'Tip: fix English in docs/i18n/<locale>/.../current/**/*.md, or re-translate from docs/ (English).\n' +
        'Same relative path across es, de, fr, pt-BR, zh-Hans usually shares the same gaps.',
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
