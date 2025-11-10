#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function log(...args) { console.log(...args); }

try {
  // Resolve repo root using git (works even if script is run from subdir)
  const repoRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
  const githooksDir = path.join(repoRoot, '.githooks');
  const gitHooksDest = path.join(repoRoot, '.git', 'hooks');

  if (!fs.existsSync(githooksDir)) {
    console.error('No .githooks directory found at', githooksDir);
    process.exit(0); // Not fatal for consumers
  }

  if (!fs.existsSync(path.join(repoRoot, '.git'))) {
    console.error('No .git directory found. Are you inside a git repository?');
    process.exit(1);
  }

  if (!fs.existsSync(gitHooksDest)) {
    fs.mkdirSync(gitHooksDest, { recursive: true });
  }

  const hooks = fs.readdirSync(githooksDir, { withFileTypes: true })
    .filter(d => d.isFile())
    .map(d => d.name);

  if (hooks.length === 0) {
    log('No hooks found in .githooks. Nothing to install.');
    process.exit(0);
  }

  hooks.forEach(hookName => {
    const src = path.join(githooksDir, hookName);
    const dest = path.join(gitHooksDest, hookName);

    // Copy file contents (safer than symlink on Windows)
    fs.copyFileSync(src, dest);

    // Try to make executable where supported
    try {
      fs.chmodSync(dest, 0o755);
    } catch (e) {
      // chmod may fail on Windows; ignore
    }

    // Also make sure the source hook is executable for contributors on posix
    try { fs.chmodSync(src, 0o755); } catch (e) { }

    log(`Installed hook: ${hookName}`);
  });

  log('Git hooks installation complete.');
} catch (err) {
  console.error('Failed to install git hooks:', err.message || err);
  process.exit(1);
}
