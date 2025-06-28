#!/usr/bin/env node

/**
 * Auto-update sitemaps date script
 * Updates lastmod dates in all sitemap files to current date
 * Keeps sitemaps appearing fresh for search engines
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Sitemap files to update
const SITEMAP_FILES = [
  'sitemap.xml',
  'sitemap-news.xml',
  'sitemap-images.xml'
];

function getCurrentDate() {
  const now = new Date();
  return now.toISOString().split('T')[0]; // YYYY-MM-DD format
}

function getCurrentDateTime() {
  const now = new Date();
  return now.toISOString(); // Full ISO format for sitemaps
}

function updateSitemapFile(filename) {
  const filePath = path.join(PUBLIC_DIR, filename);

  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ${filename} not found, skipping...`);
      return false;
    }

    // Read current content
    const content = fs.readFileSync(filePath, 'utf8');
    const currentDateTime = getCurrentDateTime();

    // Update all lastmod dates - handles Z, +00:00, and other timezone formats
    let updatedContent = content.replace(
      /<lastmod>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})?<\/lastmod>/g,
      `<lastmod>${currentDateTime}</lastmod>`
    );

    // Also update simple date format if present
    updatedContent = updatedContent.replace(
      /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g,
      `<lastmod>${getCurrentDate()}</lastmod>`
    );

    // Check if any updates were made
    if (content === updatedContent) {
      console.log(`ℹ️  ${filename} already has current dates`);
      return false;
    }

    // Write updated content
    fs.writeFileSync(filePath, updatedContent);
    console.log(`✅ Updated ${filename} with current dates`);
    return true;

  } catch (error) {
    console.error(`❌ Error updating ${filename}:`, error.message);
    return false;
  }
}

function updateAllSitemaps() {
  console.log('🗺️  Starting sitemap date updates...');
  console.log(`📅 Current date: ${getCurrentDate()}`);
  console.log(`🕐 Current datetime: ${getCurrentDateTime()}`);
  console.log('');

  let updatedCount = 0;

  for (const filename of SITEMAP_FILES) {
    if (updateSitemapFile(filename)) {
      updatedCount++;
    }
  }

  console.log('');
  console.log(`🎯 Summary: ${updatedCount} sitemap(s) updated`);

  if (updatedCount > 0) {
    console.log('✨ Sitemaps are now fresh and current!');
  } else {
    console.log('😊 All sitemaps were already up to date');
  }
}

// Run the update
updateAllSitemaps();
