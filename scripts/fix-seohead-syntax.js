#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.join(__dirname, '../src/pages');

// Pattern to find SEOHead syntax errors
const seoHeadErrorPattern = /(\s+)([^>]*)\s*\/\s*\n\s*canonical="([^"]*)"\s*>/g;

// Pattern to find malformed SEOHead components
const malformedSeoHeadPattern = /<SEOHead[^>]*>[\s\S]*?<\/SEOHead>/g;

function fixSeoHeadSyntax(content, filePath) {
  let fixedContent = content;
  let hasChanges = false;
  
  // Fix the common pattern: prop / canonical="..." >
  const matches = [...content.matchAll(seoHeadErrorPattern)];
  
  for (const match of matches) {
    const [fullMatch, indent, props, canonical] = match;
    const fixedMatch = `${indent}${props.trim()}\n${indent}canonical="${canonical}"\n${indent}/>`;
    fixedContent = fixedContent.replace(fullMatch, fixedMatch);
    hasChanges = true;
    console.log(`Fixed SEOHead syntax in ${path.basename(filePath)}`);
  }
  
  // Fix malformed SEOHead components (nested or broken)
  const malformedMatches = [...content.matchAll(malformedSeoHeadPattern)];
  
  for (const match of malformedMatches) {
    const seoHeadContent = match[0];
    
    // Check if this is a malformed SEOHead (contains nested SEOHead or broken syntax)
    if (seoHeadContent.includes('<SEOHead') && seoHeadContent.includes('</SEOHead>')) {
      // Extract the first SEOHead component properly
      const lines = seoHeadContent.split('\n');
      const fixedLines = [];
      let inSeoHead = false;
      let seoHeadProps = [];
      
      for (const line of lines) {
        if (line.trim().startsWith('<SEOHead')) {
          inSeoHead = true;
          fixedLines.push(line);
          continue;
        }
        
        if (inSeoHead) {
          if (line.trim() === '/>' || line.trim() === '>') {
            // End of SEOHead
            fixedLines.push(...seoHeadProps);
            fixedLines.push('      />');
            inSeoHead = false;
            seoHeadProps = [];
            break;
          } else if (line.trim().startsWith('canonical=')) {
            seoHeadProps.push(line);
          } else if (line.trim() && !line.includes('<SEOHead')) {
            seoHeadProps.push(line);
          }
        } else {
          fixedLines.push(line);
        }
      }
      
      const fixedSeoHead = fixedLines.join('\n');
      fixedContent = fixedContent.replace(seoHeadContent, fixedSeoHead);
      hasChanges = true;
      console.log(`Fixed malformed SEOHead in ${path.basename(filePath)}`);
    }
  }
  
  return { content: fixedContent, hasChanges };
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
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

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

function main() {
  console.log('🔍 Scanning for SEOHead syntax errors...\n');
  
  const tsxFiles = getAllTsxFiles(pagesDir);
  let fixedCount = 0;
  
  for (const file of tsxFiles) {
    const wasFixed = processFile(file);
    if (wasFixed) {
      fixedCount++;
    }
  }
  
  console.log(`\n✅ Fixed ${fixedCount} files with SEOHead syntax errors`);
  
  if (fixedCount > 0) {
    console.log('\n📝 Summary of fixes:');
    console.log('- Fixed missing closing tags in SEOHead components');
    console.log('- Fixed malformed canonical URL props');
    console.log('- Fixed nested SEOHead components');
    console.log('- Ensured proper JSX syntax');
  }
}

main();
