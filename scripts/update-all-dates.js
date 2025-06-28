#!/usr/bin/env node

/**
 * Master date update script
 * Updates dates in robots.txt and all sitemap files
 * Keeps all SEO files appearing fresh and recently maintained
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ROBOTS_FILE = path.join(PUBLIC_DIR, 'robots.txt');

// Sitemap files to update
const SITEMAP_FILES = [
  'sitemap.xml',
  'sitemap-news.xml',
  'sitemap-images.xml'
];

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // Simple date format like robots.txt
}

function updateRobotsDate() {
  try {
    if (!fs.existsSync(ROBOTS_FILE)) {
      console.log('⚠️  robots.txt not found, skipping...');
      return false;
    }

    const content = fs.readFileSync(ROBOTS_FILE, 'utf8');
    const currentDate = getCurrentDate();

    const updatedContent = content.replace(
      /# Last Updated: \d{4}-\d{2}-\d{2}/,
      `# Last Updated: ${currentDate}`
    );

    if (content === updatedContent) {
      console.log(`ℹ️  robots.txt already has current date (${currentDate})`);
      return false;
    }

    fs.writeFileSync(ROBOTS_FILE, updatedContent);
    console.log(`✅ Updated robots.txt date to: ${currentDate}`);
    return true;

  } catch (error) {
    console.error('❌ Error updating robots.txt:', error.message);
    return false;
  }
}

function updateSitemapFile(filename) {
  const filePath = path.join(PUBLIC_DIR, filename);

  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${filename} not found, skipping...`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const currentDateTime = getCurrentDateTime();

    // Update all lastmod dates - both complex timestamps and simple dates
    let updatedContent = content.replace(
      /<lastmod>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})?<\/lastmod>/g,
      `<lastmod>${currentDateTime}</lastmod>`
    );

    // Update simple date format
    updatedContent = updatedContent.replace(
      /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
      `<lastmod>${currentDateTime}</lastmod>`
    );

    if (content === updatedContent) {
      console.log(`ℹ️  ${filename} already has current dates`);
      return false;
    }

    fs.writeFileSync(filePath, updatedContent);
    console.log(`✅ Updated ${filename} with current dates`);
    return true;

  } catch (error) {
    console.error(`❌ Error updating ${filename}:`, error.message);
    return false;
  }
}

function updateAllDates() {
  console.log('🚀 Starting comprehensive date updates...');
  console.log(`📅 Current date: ${getCurrentDate()}`);
  console.log(`🕐 Current datetime: ${getCurrentDateTime()}`);
  console.log('');

  let totalUpdated = 0;

  // Update robots.txt
  console.log('🤖 Updating robots.txt...');
  if (updateRobotsDate()) {
    totalUpdated++;
  }

  console.log('');

  // Update sitemaps
  console.log('🗺️  Updating sitemaps...');
  for (const filename of SITEMAP_FILES) {
    if (updateSitemapFile(filename)) {
      totalUpdated++;
    }
  }

  console.log('');
  console.log('═'.repeat(50));
  console.log(`🎯 SUMMARY: ${totalUpdated} file(s) updated`);
  console.log(`📁 Files checked: robots.txt + ${SITEMAP_FILES.length} sitemaps`);

  if (totalUpdated > 0) {
    console.log('✨ All SEO files are now fresh and current!');
    console.log('🔍 Search engines will see recent update dates');
  } else {
    console.log('😊 All files were already up to date');
  }
  console.log('═'.repeat(50));
}

// Run the update
updateAllDates();
