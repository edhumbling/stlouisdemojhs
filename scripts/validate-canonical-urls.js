#!/usr/bin/env node

/**
 * Canonical URL Validation Script
 * Validates that all pages have proper canonical URLs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all TypeScript page files
function getAllPageFiles() {
  const pagesDir = path.join(__dirname, '../src/pages');
  const pageFiles = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.tsx') && !item.includes('.test.') && !item.includes('.spec.')) {
        pageFiles.push(fullPath);
      }
    }
  }
  
  scanDirectory(pagesDir);
  return pageFiles;
}

function validateCanonicalUrl(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(path.join(__dirname, '../'), filePath);
    
    // Check if file has SEOHead component
    if (!content.includes('<SEOHead')) {
      return {
        file: relativePath,
        status: 'no-seo',
        message: 'No SEOHead component found'
      };
    }
    
    // Check for canonical prop
    const canonicalMatch = content.match(/canonical=["']([^"']+)["']/);
    if (!canonicalMatch) {
      return {
        file: relativePath,
        status: 'missing-canonical',
        message: 'Missing canonical URL'
      };
    }
    
    const canonicalUrl = canonicalMatch[1];
    
    // Validate canonical URL format
    if (!canonicalUrl.startsWith('https://stlouisdemojhs.com/')) {
      return {
        file: relativePath,
        status: 'invalid-canonical',
        message: `Invalid canonical URL format: ${canonicalUrl}`
      };
    }
    
    // Check if canonical URL matches expected path
    const urlMatch = content.match(/url=["']([^"']+)["']/);
    if (urlMatch) {
      const urlPath = urlMatch[1];
      const expectedCanonical = `https://stlouisdemojhs.com${urlPath}`;
      
      if (canonicalUrl !== expectedCanonical) {
        return {
          file: relativePath,
          status: 'mismatch',
          message: `Canonical URL (${canonicalUrl}) doesn't match url prop (${expectedCanonical})`
        };
      }
    }
    
    return {
      file: relativePath,
      status: 'valid',
      message: `Valid canonical URL: ${canonicalUrl}`
    };
    
  } catch (error) {
    return {
      file: path.relative(path.join(__dirname, '../'), filePath),
      status: 'error',
      message: `Error reading file: ${error.message}`
    };
  }
}

function main() {
  console.log('🔍 Validating Canonical URLs across all pages...\n');
  
  const pageFiles = getAllPageFiles();
  const results = pageFiles.map(validateCanonicalUrl);
  
  // Categorize results
  const valid = results.filter(r => r.status === 'valid');
  const missing = results.filter(r => r.status === 'missing-canonical');
  const invalid = results.filter(r => r.status === 'invalid-canonical');
  const mismatch = results.filter(r => r.status === 'mismatch');
  const noSeo = results.filter(r => r.status === 'no-seo');
  const errors = results.filter(r => r.status === 'error');
  
  // Display results
  console.log('📊 Validation Results:\n');
  
  if (valid.length > 0) {
    console.log(`✅ Valid Canonical URLs (${valid.length}):`);
    valid.forEach(result => {
      console.log(`   • ${result.file}`);
    });
    console.log('');
  }
  
  if (missing.length > 0) {
    console.log(`❌ Missing Canonical URLs (${missing.length}):`);
    missing.forEach(result => {
      console.log(`   • ${result.file}`);
    });
    console.log('');
  }
  
  if (invalid.length > 0) {
    console.log(`⚠️  Invalid Canonical URLs (${invalid.length}):`);
    invalid.forEach(result => {
      console.log(`   • ${result.file}: ${result.message}`);
    });
    console.log('');
  }
  
  if (mismatch.length > 0) {
    console.log(`🔄 Canonical URL Mismatches (${mismatch.length}):`);
    mismatch.forEach(result => {
      console.log(`   • ${result.file}: ${result.message}`);
    });
    console.log('');
  }
  
  if (noSeo.length > 0) {
    console.log(`ℹ️  No SEOHead Component (${noSeo.length}):`);
    noSeo.forEach(result => {
      console.log(`   • ${result.file}`);
    });
    console.log('');
  }
  
  if (errors.length > 0) {
    console.log(`💥 Errors (${errors.length}):`);
    errors.forEach(result => {
      console.log(`   • ${result.file}: ${result.message}`);
    });
    console.log('');
  }
  
  // Summary
  console.log('📋 Summary:');
  console.log(`   • Total pages: ${pageFiles.length}`);
  console.log(`   • Valid canonical URLs: ${valid.length}`);
  console.log(`   • Missing canonical URLs: ${missing.length}`);
  console.log(`   • Invalid canonical URLs: ${invalid.length}`);
  console.log(`   • Canonical URL mismatches: ${mismatch.length}`);
  console.log(`   • No SEOHead component: ${noSeo.length}`);
  console.log(`   • Errors: ${errors.length}`);
  
  const totalIssues = missing.length + invalid.length + mismatch.length;
  
  if (totalIssues === 0) {
    console.log('\n🎉 All pages have proper canonical URLs!');
    console.log('🎉 Google Search Console canonical issues should be resolved!');
  } else {
    console.log(`\n⚠️  ${totalIssues} pages need canonical URL fixes.`);
    console.log('📝 Run the fix-canonical-urls.js script to automatically fix missing canonical URLs.');
  }
}

main();
