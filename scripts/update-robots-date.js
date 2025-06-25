#!/usr/bin/env node

/**
 * Auto-update robots.txt date script
 * Updates the "Last Updated" date in robots.txt to current date
 * Runs automatically to keep robots.txt appearing fresh
 */

import fs from 'fs';
import path from 'path';

const ROBOTS_FILE = 'public/robots.txt';

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function updateRobotsDate() {
  try {
    // Check if robots.txt exists
    if (!fs.existsSync(ROBOTS_FILE)) {
      console.error(`❌ Error: ${ROBOTS_FILE} not found`);
      process.exit(1);
    }

    // Read current content
    const content = fs.readFileSync(ROBOTS_FILE, 'utf8');
    
    // Get current date
    const currentDate = getCurrentDate();
    
    // Update the date line
    const updatedContent = content.replace(
      /# Last Updated: \d{4}-\d{2}-\d{2}/,
      `# Last Updated: ${currentDate}`
    );

    // Check if update was made
    if (content === updatedContent) {
      console.log(`ℹ️  robots.txt already has today's date (${currentDate})`);
      return;
    }

    // Write updated content
    fs.writeFileSync(ROBOTS_FILE, updatedContent);
    
    console.log(`✅ Updated robots.txt date to: ${currentDate}`);
    console.log(`📁 File: ${ROBOTS_FILE}`);
    
  } catch (error) {
    console.error('❌ Error updating robots.txt:', error.message);
    process.exit(1);
  }
}

// Run the update
updateRobotsDate();
