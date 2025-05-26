#!/usr/bin/env node

/**
 * Clean Dependencies Script
 * Removes problematic Cal.com dependencies and cleans build cache
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');

console.log('🧹 Cleaning up dependencies...');

// Remove node_modules if it exists
const nodeModulesPath = path.join(projectRoot, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('📦 Removing node_modules...');
  fs.rmSync(nodeModulesPath, { recursive: true, force: true });
  console.log('✅ node_modules removed');
}

// Remove package-lock.json if it exists
const packageLockPath = path.join(projectRoot, 'package-lock.json');
if (fs.existsSync(packageLockPath)) {
  console.log('🔒 Removing package-lock.json...');
  fs.unlinkSync(packageLockPath);
  console.log('✅ package-lock.json removed');
}

// Remove dist folder if it exists
const distPath = path.join(projectRoot, 'dist');
if (fs.existsSync(distPath)) {
  console.log('📁 Removing dist folder...');
  fs.rmSync(distPath, { recursive: true, force: true });
  console.log('✅ dist folder removed');
}

// Remove .vite cache if it exists
const viteCachePath = path.join(projectRoot, 'node_modules', '.vite');
if (fs.existsSync(viteCachePath)) {
  console.log('⚡ Removing Vite cache...');
  fs.rmSync(viteCachePath, { recursive: true, force: true });
  console.log('✅ Vite cache removed');
}

console.log('🎉 Cleanup completed!');
console.log('📝 Next steps:');
console.log('   1. Run: npm install');
console.log('   2. Run: npm run build');
console.log('   3. Test the application');

export default function cleanDependencies() {
  // This function can be called from other scripts if needed
  console.log('Dependencies cleaned successfully');
}
