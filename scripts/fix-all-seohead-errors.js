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
  
  // Pattern 1: Fix the most common syntax error
  // Matches: prop / canonical="..." >
  const pattern1 = /(\s+)([^>]*?)\s*\/\s*\n\s*canonical="([^"]*)"\s*>/g;
  
  fixedContent = fixedContent.replace(pattern1, (match, indent, props, canonical) => {
    hasChanges = true;
    console.log(`✅ Fixed pattern 1 in ${path.basename(filePath)}`);
    return `${indent}${props.trim()}\n${indent}canonical="${canonical}"\n${indent}/>`;
  });
  
  // Pattern 2: Fix malformed SEOHead with nested components in description
  const pattern2 = /description="([^"]*?)<SEOHead[\s\S]*?<\/SEOHead>([^"]*?)"/g;
  
  fixedContent = fixedContent.replace(pattern2, (match, before, after) => {
    hasChanges = true;
    console.log(`✅ Fixed pattern 2 in ${path.basename(filePath)}`);
    return `description="${before}${after}"`;
  });
  
  // Pattern 3: Fix leftover malformed text after SEOHead
  const pattern3 = /\/>\s*[^<]*?keywords="[^"]*?"[\s\S]*?\/\s*canonical="[^"]*"\s*>/g;
  
  fixedContent = fixedContent.replace(pattern3, (match) => {
    hasChanges = true;
    console.log(`✅ Fixed pattern 3 in ${path.basename(filePath)}`);
    return '/>';
  });
  
  // Pattern 4: Fix any remaining malformed SEOHead components
  const pattern4 = /<SEOHead[\s\S]*?\/\s*canonical="[^"]*"\s*>/g;
  
  fixedContent = fixedContent.replace(pattern4, (match) => {
    // Extract the canonical URL
    const canonicalMatch = match.match(/canonical="([^"]*)"/);
    if (canonicalMatch) {
      const canonical = canonicalMatch[1];
      // Extract the props before the malformed part
      const propsMatch = match.match(/<SEOHead([^>]*?)\s*\/\s*canonical/);
      if (propsMatch) {
        const props = propsMatch[1].trim();
        hasChanges = true;
        console.log(`✅ Fixed pattern 4 in ${path.basename(filePath)}`);
        return `<SEOHead${props}\n        canonical="${canonical}"\n      />`;
      }
    }
    return match;
  });
  
  // Pattern 5: Fix any remaining malformed closing tags
  const pattern5 = /(\s+)([^>]*?)\s*\/\s*\n\s*canonical="([^"]*)"\s*>/g;
  
  fixedContent = fixedContent.replace(pattern5, (match, indent, props, canonical) => {
    hasChanges = true;
    console.log(`✅ Fixed pattern 5 in ${path.basename(filePath)}`);
    return `${indent}${props.trim()}\n${indent}canonical="${canonical}"\n${indent}/>`;
  });
  
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
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔍 Scanning all TSX files for SEOHead syntax errors...\n');
  
  const tsxFiles = getAllTsxFiles(pagesDir);
  console.log(`Found ${tsxFiles.length} TSX files to process\n`);
  
  let fixedCount = 0;
  let processedCount = 0;
  
  for (const file of tsxFiles) {
    processedCount++;
    console.log(`[${processedCount}/${tsxFiles.length}] Processing ${path.relative(pagesDir, file)}...`);
    
    const wasFixed = processFile(file);
    if (wasFixed) {
      fixedCount++;
    }
  }
  
  console.log(`\n🎉 Processing complete!`);
  console.log(`📊 Summary:`);
  console.log(`   - Total files processed: ${processedCount}`);
  console.log(`   - Files fixed: ${fixedCount}`);
  console.log(`   - Files unchanged: ${processedCount - fixedCount}`);
  
  if (fixedCount > 0) {
    console.log('\n📝 Types of fixes applied:');
    console.log('   - Fixed missing closing tags in SEOHead components');
    console.log('   - Fixed malformed canonical URL props');
    console.log('   - Fixed nested SEOHead components');
    console.log('   - Fixed leftover malformed text');
    console.log('   - Ensured proper JSX syntax');
  }
  
  console.log('\n🚀 Ready to run build!');
}

main();
