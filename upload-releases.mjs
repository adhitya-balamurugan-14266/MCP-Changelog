#!/usr/bin/env node
/**
 * Generates releases.json from releases.ts and uploads it to Stratus.
 * Run this after adding new entries to releases.ts instead of doing a full Slate deploy.
 *
 * Usage: node upload-releases.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const UPLOAD_URL =
  'https://mcp-changelog-60047186223.development.catalystserverless.in/server/asset_manager/upload';

const RELEASES_TS = path.join(__dirname, 'web-source/src/data/releases.ts');
const OUT_JSON    = path.join(__dirname, 'web-source/public/releases.json');

// ── 1. Read + strip TypeScript ─────────────────────────────────────────────
let src = fs.readFileSync(RELEASES_TS, 'utf8');

src = src
  .replace(/^import type.*;\n?/gm, '')          // remove import type lines
  .replace(/export const RELEASES:\s*Release\[\]\s*=/, 'const RELEASES ='); // strip type annotation

// ── 2. Eval to extract the array ───────────────────────────────────────────
let releases;
try {
  const fn = new Function(`${src}; return RELEASES;`);
  releases = fn();
} catch (err) {
  console.error('Failed to parse releases.ts:', err.message);
  process.exit(1);
}

console.log(`Parsed ${releases.length} release entries.`);

// ── 3. Write releases.json locally (as a record) ──────────────────────────
const json = JSON.stringify(releases, null, 2);
fs.writeFileSync(OUT_JSON, json, 'utf8');
console.log(`Written to ${OUT_JSON} (${(Buffer.byteLength(json) / 1024).toFixed(1)} KB)`);

// ── 4. Upload to Stratus via asset_manager function ────────────────────────
const base64 = Buffer.from(json, 'utf8').toString('base64');

console.log('Uploading releases.json to Stratus…');

const response = await fetch(UPLOAD_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    key: 'releases.json',
    content: base64,
    contentType: 'application/json',
  }),
});

const result = await response.json();

if (result.status === 'success') {
  console.log(`✔ Uploaded: ${result.url}`);
  console.log('releases.json is now live — no Slate deploy needed.');
} else {
  console.error('Upload failed:', result.message);
  process.exit(1);
}
