#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.error('.env not found in project root.');
  process.exit(1);
}

const content = fs.readFileSync(envPath, 'utf8');
const lines = content.split(/\r?\n/);
const vars = [];
for (const raw of lines) {
  const line = raw.trim();
  if (!line || line.startsWith('#')) continue;
  const eq = line.indexOf('=');
  if (eq === -1) continue;
  const key = line.slice(0, eq).trim();
  const val = line.slice(eq + 1).trim();
  vars.push({ key, val });
}

if (vars.length === 0) {
  console.error('No env vars found in .env');
  process.exit(1);
}

console.log('# Run these commands locally to set env vars on Render.');
console.log('# Replace <RENDER_API_KEY> and <RENDER_SERVICE_ID> with your values.');
console.log('# For safety the commands use environment variables to pass the values.');
console.log('');
for (const v of vars) {
  // Escape single quotes in value
  const safeVal = v.val.replace(/'/g, "'\\''");
  console.log(`curl -s -X POST https://api.render.com/v1/services/<RENDER_SERVICE_ID>/env-vars \\`);
  console.log(`  -H "Authorization: Bearer <RENDER_API_KEY>" \\`);
  console.log('  -H "Content-Type: application/json" \\');
  console.log(`  -d '{"key":"${v.key}","value":"${safeVal}"}'`);
  console.log('');
}

console.log('# After running these, trigger a redeploy in the Render dashboard or restart the service.');
