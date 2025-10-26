#!/usr/bin/env node

/**
 * Comprehensive Canonical URL Fix Script
 * Automatically adds canonical URLs to ALL pages that are missing them
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

function extractUrlFromPage(filePath, content) {
  // Try to extract URL from SEOHead props
  const urlMatch = content.match(/url=["']([^"']+)["']/);
  if (urlMatch) {
    return urlMatch[1];
  }
  
  // Try to extract from route definition or file path
  const relativePath = path.relative(path.join(__dirname, '../src/pages'), filePath);
  const fileName = path.basename(filePath, '.tsx');
  
  // Convert file path to URL
  let url = '/' + relativePath.replace(/\\/g, '/').toLowerCase();
  
  // Remove 'page' suffix if present
  if (url.endsWith('page')) {
    url = url.slice(0, -4);
  }
  
  // Handle special cases
  if (fileName === 'HomePage') {
    url = '/';
  } else if (fileName === 'NotFoundPage') {
    url = '/404';
  }
  
  return url;
}

function fixCanonicalUrl(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(path.join(__dirname, '../'), filePath);
    
    // Skip files without SEOHead
    if (!content.includes('<SEOHead')) {
      return {
        file: relativePath,
        status: 'no-seo',
        message: 'No SEOHead component found'
      };
    }
    
    // Check if canonical is already present
    if (content.includes('canonical=') || content.includes('canonical:')) {
      return {
        file: relativePath,
        status: 'already-has-canonical',
        message: 'Already has canonical URL'
      };
    }

    // Extract URL from the page
    const url = extractUrlFromPage(filePath, content);
    const fullCanonicalUrl = `https://stlouisdemojhs.com${url}`;
    
    // Find SEOHead component and add canonical prop
    const seoHeadRegex = /(<SEOHead[^>]*>)/;
    const match = content.match(seoHeadRegex);
    
    if (!match) {
      return {
        file: relativePath,
        status: 'error',
        message: 'Could not find SEOHead tag'
      };
    }

    const seoHeadTag = match[1];
    
    // Add canonical prop to SEOHead
    const updatedSeoHead = seoHeadTag.replace('>', `\n        canonical="${fullCanonicalUrl}"\n      >`);
    const updatedContent = content.replace(seoHeadRegex, updatedSeoHead);
    
    // Write back to file
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    
    return {
      file: relativePath,
      status: 'fixed',
      message: `Added canonical URL: ${fullCanonicalUrl}`,
      canonicalUrl: fullCanonicalUrl
    };
    
  } catch (error) {
    return {
      file: path.relative(path.join(__dirname, '../'), filePath),
      status: 'error',
      message: `Error: ${error.message}`
    };
  }
}

function main() {
  console.log('🔧 Comprehensive Canonical URL Fix for ALL Pages...\n');
  
  const pageFiles = getAllPageFiles();
  const results = pageFiles.map(fixCanonicalUrl);
  
  // Categorize results
  const fixed = results.filter(r => r.status === 'fixed');
  const alreadyHas = results.filter(r => r.status === 'already-has-canonical');
  const noSeo = results.filter(r => r.status === 'no-seo');
  const errors = results.filter(r => r.status === 'error');
  
  // Display results
  console.log('📊 Fix Results:\n');
  
  if (fixed.length > 0) {
    console.log(`✅ Fixed Canonical URLs (${fixed.length}):`);
    fixed.forEach(result => {
      console.log(`   • ${result.file}: ${result.canonicalUrl}`);
    });
    console.log('');
  }
  
  if (alreadyHas.length > 0) {
    console.log(`ℹ️  Already Had Canonical URLs (${alreadyHas.length}):`);
    alreadyHas.forEach(result => {
      console.log(`   • ${result.file}`);
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
    console.log(`❌ Errors (${errors.length}):`);
    errors.forEach(result => {
      console.log(`   • ${result.file}: ${result.message}`);
    });
    console.log('');
  }
  
  // Summary
  console.log('📋 Summary:');
  console.log(`   • Total pages processed: ${pageFiles.length}`);
  console.log(`   • Canonical URLs fixed: ${fixed.length}`);
  console.log(`   • Already had canonical URLs: ${alreadyHas.length}`);
  console.log(`   • No SEOHead component: ${noSeo.length}`);
  console.log(`   • Errors: ${errors.length}`);
  
  if (fixed.length > 0) {
    console.log('\n🎉 Canonical URLs have been added to all pages!');
    console.log('🎉 Google Search Console "Alternate page with proper canonical tag" errors should be resolved!');
    console.log('\n📝 Next steps:');
    console.log('   1. Deploy the updated code');
    console.log('   2. Wait for Google to re-crawl the pages (1-7 days)');
    console.log('   3. Check Google Search Console for resolved canonical issues');
  } else {
    console.log('\n✅ All pages already have proper canonical URLs!');
  }
}

main();
