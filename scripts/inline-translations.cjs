#!/usr/bin/env node
/**
 * Inline translations into the built index.html at build time.
 *
 * Super Productivity loads plugin index.html into an iframe via `srcdoc`
 * (see its `buildPluginIframeHtml` util), so companion files such as
 * `translations.js` are never served at any URL — a
 * `<script src="translations.js"></script>` tag fails with
 * net::ERR_FILE_NOT_FOUND and every translation lookup crashes with
 * "Cannot read properties of undefined (reading 'en')".
 *
 * To keep the built index.html under SP's 100 KB limit
 * (MAX_PLUGIN_MANIFEST_SIZE, reused for index.html in loadPluginFromZip),
 * the merged translations object is compressed with the lz-string copy
 * already vendored in index.html and embedded as a single base64 string,
 * decompressed at runtime. This keeps the payload ~24 KB instead of
 * ~45 KB of plain JS (or ~35 KB of raw JSON).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'date-range-reporter');
const buildDir = path.join(root, 'build', 'date-range-reporter');

const html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
const translationsSrc = fs.readFileSync(path.join(srcDir, 'translations.js'), 'utf8');

const SCRIPT_TAG = '<script src="translations.js"></script>';
if (!html.includes(SCRIPT_TAG)) {
  console.error('inline-translations: translations script tag not found in index.html');
  process.exit(1);
}

// Evaluate translations.js in isolation to collect window.reporterTranslations.
const sandbox = { window: {} };
vm.runInNewContext(translationsSrc, sandbox);
const translations = sandbox.window.reporterTranslations;
if (!translations || !translations.en) {
  console.error('inline-translations: translations.js did not define reporterTranslations.en');
  process.exit(1);
}

// Reuse the vendored lz-string from index.html so the build matches the
// runtime decompressor exactly.
const lzMatch = html.match(/var LZString=.*?;\s*\/\/ --- End vendored lz-string ---/s);
if (!lzMatch) {
  console.error('inline-translations: vendored lz-string not found in index.html');
  process.exit(1);
}
const lzSandbox = {};
vm.runInNewContext(lzMatch[0], lzSandbox);
const LZString = lzSandbox.LZString;
if (!LZString || typeof LZString.compressToBase64 !== 'function') {
  console.error('inline-translations: LZString.compressToBase64 unavailable');
  process.exit(1);
}

const payload = LZString.compressToBase64(JSON.stringify(translations));

// The lz-string library is vendored inside the main script block (after the
// old script tag position), so a separate inline <script> above it would run
// before LZString exists. Instead: drop the external script tag entirely and
// append the decompression to the main block, right after the vendored lib.
const LZ_END_MARKER = '// --- End vendored lz-string ---';
if (!html.includes(LZ_END_MARKER)) {
  console.error('inline-translations: vendored lz-string end marker not found');
  process.exit(1);
}
const decompressSnippet = [
  LZ_END_MARKER,
  '',
  '      // Translations merged from translations.js at build time and',
  '      // LZString-compressed (SP serves index.html via iframe srcdoc,',
  '      // so external <script src> companions never load).',
  `      window.reporterTranslations = JSON.parse(LZString.decompressFromBase64('${payload}'));`,
].join('\n');

// Function replacements avoid `$`-pattern interpretation in the replacement.
const merged = html
  .replace(SCRIPT_TAG, () => '')
  .replace(LZ_END_MARKER, () => decompressSnippet);

fs.mkdirSync(buildDir, { recursive: true });
const outPath = path.join(buildDir, 'index.html.raw');
fs.writeFileSync(outPath, merged);
console.log(`✓ Translations inlined (${payload.length} bytes compressed) -> ${path.relative(root, outPath)}`);