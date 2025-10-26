#!/usr/bin/env node

/**
 * Canonical URL Fix Script
 * Automatically adds canonical URLs to all pages that are missing them
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of pages that need canonical URL fixes based on Google Search Console errors
const pagesToFix = [
  { file: 'src/pages/ArtCreativeSchoolsPage.tsx', url: '/art-creative-schools' },
  { file: 'src/pages/subjects/MusicPage.tsx', url: '/subject/music' },
  { file: 'src/pages/subjects/ReligiousMoralEducationPage.tsx', url: '/subject/religious-moral-education' },
  { file: 'src/pages/ThankYouPage.tsx', url: '/thank-you' },
  { file: 'src/pages/MediaFilesPage.tsx', url: '/media-files' },
  { file: 'src/pages/ApplyNowPage.tsx', url: '/apply-now' },
  { file: 'src/pages/DonateMonthly500Page.tsx', url: '/donate-monthly-500' },
  { file: 'src/pages/DonateMonthly1000Page.tsx', url: '/donate-monthly-1000' },
  { file: 'src/pages/EducationalGuidePage.tsx', url: '/educational-guide' },
  { file: 'src/pages/MoneySmartLinksPage.tsx', url: '/money-smart-links' }
];

function fixCanonicalUrl(filePath, canonicalUrl) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${filePath}`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if canonical is already present
    if (content.includes('canonical=') || content.includes('canonical:')) {
      console.log(`✅ ${filePath} already has canonical URL`);
      return true;
    }

    // Find SEOHead component and add canonical prop
    const seoHeadRegex = /(<SEOHead[^>]*>)/;
    const match = content.match(seoHeadRegex);
    
    if (!match) {
      console.log(`❌ No SEOHead found in ${filePath}`);
      return false;
    }

    const seoHeadTag = match[1];
    const fullCanonicalUrl = `https://stlouisdemojhs.com${canonicalUrl}`;
    
    // Add canonical prop to SEOHead
    const updatedSeoHead = seoHeadTag.replace('>', `\n        canonical="${fullCanonicalUrl}"\n      >`);
    const updatedContent = content.replace(seoHeadRegex, updatedSeoHead);
    
    // Write back to file
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✅ Fixed canonical URL for ${filePath}: ${fullCanonicalUrl}`);
    return true;
    
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}: ${error.message}`);
    return false;
  }
}

function main() {
  console.log('🔧 Fixing Canonical URLs for Google Search Console Issues...\n');
  
  let successCount = 0;
  let totalCount = pagesToFix.length;
  
  pagesToFix.forEach(({ file, url }) => {
    if (fixCanonicalUrl(file, url)) {
      successCount++;
    }
  });
  
  console.log(`\n📋 Summary:`);
  console.log(`   • Total pages processed: ${totalCount}`);
  console.log(`   • Successfully fixed: ${successCount}`);
  console.log(`   • Failed: ${totalCount - successCount}`);
  
  if (successCount === totalCount) {
    console.log('\n🎉 All canonical URLs have been fixed!');
    console.log('🎉 Google Search Console "Alternate page with proper canonical tag" errors should be resolved!');
    console.log('\n📝 Next steps:');
    console.log('   1. Deploy the updated code');
    console.log('   2. Wait for Google to re-crawl the pages (1-7 days)');
    console.log('   3. Check Google Search Console for resolved canonical issues');
  } else {
    console.log('\n⚠️  Some pages could not be fixed. Please check the errors above.');
  }
}

main();
export { fixCanonicalUrl };
