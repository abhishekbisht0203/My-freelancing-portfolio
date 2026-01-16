#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function parseDotenv(content) {
  const lines = content.split(/\r?\n/);
  const map = new Map();
  lines.forEach((raw, idx) => {
    const line = raw.trim();
    if (!line || line.startsWith('#')) return;
    const eq = line.indexOf('=');
    if (eq === -1) return;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1);
    if (map.has(key)) {
      map.set(key, { value: val, dup: true, line: idx + 1 });
    } else {
      map.set(key, { value: val, dup: false, line: idx + 1 });
    }
  });
  return map;
}

function checkFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('No .env file found at', filePath);
    process.exit(1);
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const map = parseDotenv(content);

  let ok = true;

  // Check duplicates
  for (const [k, v] of map.entries()) {
    if (v.dup) {
      console.warn(`Duplicate key detected: ${k} (line ${v.line})`);
      ok = false;
    }
  }

  // Check inline comments in values
  for (const [k, v] of map.entries()) {
    const value = v.value;
    if (value.includes('//') || value.includes('#')) {
      console.warn(`Inline comment-like text detected in value for ${k}. Remove comments from same line.`);
      ok = false;
    }
  }

  // Check app password grouped spaces
  const pwKeys = ['SMTP_PASSWORD', 'GMAIL_APP_PASSWORD', 'SMTP_PASS'];
  for (const pk of pwKeys) {
    if (map.has(pk)) {
      const raw = map.get(pk).value.trim();
      if (/\s/.test(raw)) {
        const noSpaces = raw.replace(/\s+/g, '');
        console.warn(`${pk} contains spaces. Suggestion: remove spaces -> ${noSpaces}`);
      }
    }
  }

  // Recommend SendGrid
  if (!map.has('SENDGRID_API_KEY')) {
    console.info('SENDGRID_API_KEY not found — on managed hosts SendGrid is recommended to avoid SMTP network issues.');
  }

  if (!ok) {
    console.error('Problems found in .env — please fix the warnings above before deploying to Render.');
    process.exit(2);
  }

  console.log('.env looks ok (no duplicate keys detected, no inline comments).');
}

const p = path.resolve(process.cwd(), '.env');
checkFile(p);
