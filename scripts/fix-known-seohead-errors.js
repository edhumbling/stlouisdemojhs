#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pagesDir = path.join(__dirname, '../src/pages');

// List of files that we know have SEOHead syntax errors
const problematicFiles = [
  'src/pages/HomePage.tsx',
  'src/pages/NewsPage.tsx', 
  'src/pages/AdmissionsPage.tsx',
  'src/pages/FacultyPage.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/AISearchPage.tsx',
  'src/pages/AcademicsPage.tsx',
  'src/pages/CalendarPage.tsx',
  'src/pages/DonateOneDollarPage.tsx',
  'src/pages/STEMPage.tsx',
  'src/pages/DonationPage.tsx',
  'src/pages/SpaceExplorationPage.tsx',
  'src/pages/TVETPage.tsx',
  'src/pages/AlumniPage.tsx',
  'src/pages/GalleryPage.tsx',
  'src/pages/StudentsHubPage.tsx',
  'src/pages/CreativeArtsPage.tsx',
  'src/pages/LocalUniversitiesPage.tsx',
  'src/pages/LouisAIPage.tsx'
];

function fixSeoHeadSyntax(content, filePath) {
  let fixedContent = content;
  let hasChanges = false;
  
  // Pattern 1: Fix the common syntax error pattern
  // Matches: prop / canonical="..." >
  const pattern1 = /(\s+)([^>]*?)\s*\/\s*\n\s*canonical="([^"]*)"\s*>/g;
  
  fixedContent = fixedContent.replace(pattern1, (match, indent, props, canonical) => {
    hasChanges = true;
    console.log(`Fixed pattern 1 in ${path.basename(filePath)}`);
    return `${indent}${props.trim()}\n${indent}canonical="${canonical}"\n${indent}/>`;
  });
  
  // Pattern 2: Fix malformed SEOHead with nested components
  const pattern2 = /description="([^"]*?)<SEOHead[\s\S]*?<\/SEOHead>([^"]*?)"/g;
  
  fixedContent = fixedContent.replace(pattern2, (match, before, after) => {
    hasChanges = true;
    console.log(`Fixed pattern 2 in ${path.basename(filePath)}`);
    return `description="${before}${after}"`;
  });
  
  // Pattern 3: Fix leftover malformed text after SEOHead
  const pattern3 = /\/>\s*[^<]*?keywords="[^"]*?"[\s\S]*?\/\s*canonical="[^"]*"\s*>/g;
  
  fixedContent = fixedContent.replace(pattern3, (match) => {
    hasChanges = true;
    console.log(`Fixed pattern 3 in ${path.basename(filePath)}`);
    return '/>';
  });
  
  return { content: fixedContent, hasChanges };
}

function processFile(filePath) {
  try {
    const fullPath = path.join(__dirname, '..', filePath);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { content: fixedContent, hasChanges } = fixSeoHeadSyntax(content, filePath);
    
    if (hasChanges) {
      fs.writeFileSync(fullPath, fixedContent, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 Fixing SEOHead syntax errors in known problematic files...\n');
  
  let fixedCount = 0;
  
  for (const file of problematicFiles) {
    console.log(`Processing ${file}...`);
    const wasFixed = processFile(file);
    if (wasFixed) {
      fixedCount++;
      console.log(`✅ Fixed ${file}`);
    } else {
      console.log(`ℹ️  No changes needed for ${file}`);
    }
  }
  
  console.log(`\n🎉 Fixed ${fixedCount} files with SEOHead syntax errors`);
  
  if (fixedCount > 0) {
    console.log('\n📝 Summary of fixes:');
    console.log('- Fixed missing closing tags in SEOHead components');
    console.log('- Fixed malformed canonical URL props');
    console.log('- Fixed nested SEOHead components');
    console.log('- Ensured proper JSX syntax');
  }
}

main();
