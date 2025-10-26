#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.join(__dirname, '../src/pages');

function getAllTsxFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

function fixSeoHeadSyntax(content, filePath) {
  let fixedContent = content;
  let hasChanges = false;
  
  // The main pattern we've been seeing: prop / canonical="..." >
  const lines = fixedContent.split('\n');
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line has the malformed pattern
    if (line.trim().endsWith('/') && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      if (nextLine.trim().startsWith('canonical="') && i + 2 < lines.length) {
        const thirdLine = lines[i + 2];
        if (thirdLine.trim() === '>') {
          // Found the malformed pattern, fix it
          const indent = line.match(/^(\s*)/)[1];
          const props = line.trim().slice(0, -1).trim(); // Remove the trailing /
          const canonical = nextLine.trim();
          
          newLines.push(`${indent}${props}`);
          newLines.push(`${indent}${canonical}`);
          newLines.push(`${indent}/>`);
          
          i += 2; // Skip the next two lines
          hasChanges = true;
          console.log(`✅ Fixed SEOHead syntax in ${path.basename(filePath)}`);
          continue;
        }
      }
    }
    
    newLines.push(line);
  }
  
  return { content: newLines.join('\n'), hasChanges };
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: fixedContent, hasChanges } = fixSeoHeadSyntax(content, filePath);
    
    if (hasChanges) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔍 Fixing SEOHead syntax errors in all TSX files...\n');
  
  const tsxFiles = getAllTsxFiles(pagesDir);
  console.log(`Found ${tsxFiles.length} TSX files\n`);
  
  let fixedCount = 0;
  
  for (const file of tsxFiles) {
    const wasFixed = processFile(file);
    if (wasFixed) {
      fixedCount++;
    }
  }
  
  console.log(`\n🎉 Fixed ${fixedCount} files with SEOHead syntax errors`);
}

main();
