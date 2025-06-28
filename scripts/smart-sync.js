#!/usr/bin/env node

/**
 * Smart Sync Script for St. Louis Demonstration JHS
 * Automatically syncs local repository with remote changes
 * Specifically designed to sync auto-updated SEO files
 */

import { execSync } from 'child_process';
import fs from 'fs';

console.log('🔄 Smart Sync - Checking for remote updates...\n');

function runCommand(command, silent = false) {
  try {
    const result = execSync(command, {
      encoding: 'utf8',
      stdio: silent ? 'pipe' : 'inherit'
    });
    return result.trim();
  } catch (error) {
    if (!silent) {
      console.error(`❌ Error running command: ${command}`);
      console.error(error.message);
    }
    return null;
  }
}

function checkGitStatus() {
  console.log('📋 Checking git status...');

  // Check if we're in a git repository
  const isGitRepo = runCommand('git rev-parse --is-inside-work-tree', true);
  if (!isGitRepo) {
    console.log('❌ Not in a git repository');
    return false;
  }

  // Check current branch
  const currentBranch = runCommand('git branch --show-current', true);
  console.log(`📍 Current branch: ${currentBranch}`);

  if (currentBranch !== 'main') {
    console.log('⚠️  Not on main branch, skipping sync');
    return false;
  }

  return true;
}

function checkForRemoteUpdates() {
  console.log('\n🔍 Fetching remote changes...');

  // Fetch latest changes
  const fetchResult = runCommand('git fetch origin main', true);
  if (fetchResult === null) {
    console.log('❌ Failed to fetch remote changes');
    return false;
  }

  // Check if local is behind remote
  const localCommit = runCommand('git rev-parse HEAD', true);
  const remoteCommit = runCommand('git rev-parse origin/main', true);

  if (localCommit === remoteCommit) {
    console.log('✅ Local repository is up to date');
    return false;
  }

  // Check what files would be updated
  const changedFiles = runCommand('git diff --name-only HEAD origin/main', true);
  if (changedFiles) {
    console.log('\n📁 Files that will be updated:');
    changedFiles.split('\n').forEach(file => {
      if (file.trim()) {
        const isSeOFile = file.includes('robots.txt') || file.includes('sitemap');
        const icon = isSeOFile ? '🤖' : '📄';
        console.log(`   ${icon} ${file}`);
      }
    });
  }

  return true;
}

function syncChanges() {
  console.log('\n🚀 Syncing changes...');

  // Check for uncommitted local changes
  const hasLocalChanges = runCommand('git status --porcelain', true);
  if (hasLocalChanges && hasLocalChanges.trim()) {
    console.log('⚠️  You have uncommitted local changes:');
    console.log(hasLocalChanges);
    console.log('\n🔄 Stashing local changes...');
    runCommand('git stash push -m "Auto-stash before sync"');
  }

  // Pull changes
  console.log('📥 Pulling remote changes...');
  const pullResult = runCommand('git pull origin main', true);

  if (pullResult === null) {
    console.log('❌ Failed to pull changes');
    return false;
  }

  // Restore stashed changes if any
  if (hasLocalChanges && hasLocalChanges.trim()) {
    console.log('🔄 Restoring your local changes...');
    const stashList = runCommand('git stash list', true);
    if (stashList && stashList.includes('Auto-stash before sync')) {
      runCommand('git stash pop');
    }
  }

  console.log('✅ Sync completed successfully!');
  return true;
}

function checkSEOFiles() {
  console.log('\n🤖 Verifying SEO files...');

  const seoFiles = [
    'public/robots.txt',
    'public/sitemap.xml',
    'public/sitemap-news.xml',
    'public/sitemap-images.xml'
  ];

  let allPresent = true;
  let needsUpdate = false;

  seoFiles.forEach(file => {
    const exists = fs.existsSync(file);
    const icon = exists ? '✅' : '❌';
    console.log(`   ${icon} ${file}`);
    if (!exists) allPresent = false;
  });

  if (allPresent) {
    // Check robots.txt date
    const robotsContent = fs.readFileSync('public/robots.txt', 'utf8');
    const dateMatch = robotsContent.match(/# Last Updated: (\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      const lastUpdated = dateMatch[1];
      const today = new Date().toISOString().split('T')[0];
      const isToday = lastUpdated === today;
      const icon = isToday ? '🟢' : '🟡';
      console.log(`   ${icon} robots.txt last updated: ${lastUpdated} ${isToday ? '(today)' : '(older)'}`);

      if (!isToday) {
        needsUpdate = true;
      }
    }

    // Check sitemap.xml dates
    const sitemapContent = fs.readFileSync('public/sitemap.xml', 'utf8');
    const lastmodMatches = sitemapContent.match(/<lastmod>([^<]+)<\/lastmod>/);
    if (lastmodMatches) {
      const sitemapDate = lastmodMatches[1].split('T')[0];
      const today = new Date().toISOString().split('T')[0];
      const isToday = sitemapDate === today;
      const icon = isToday ? '🟢' : '🟡';
      console.log(`   ${icon} sitemap.xml last updated: ${sitemapDate} ${isToday ? '(today)' : '(older)'}`);

      if (!isToday) {
        needsUpdate = true;
      }
    }
  }

  return { allPresent, needsUpdate };
}

function updateSEOFiles() {
  console.log('\n🔄 Updating SEO files locally...');

  try {
    const result = runCommand('node scripts/update-all-dates.js', true);
    if (result !== null) {
      console.log('✅ SEO files updated successfully');

      // Check if there are changes to commit
      const hasChanges = runCommand('git status --porcelain public/robots.txt public/sitemap*.xml', true);
      if (hasChanges && hasChanges.trim()) {
        console.log('📝 SEO file changes detected, committing...');
        runCommand('git add public/robots.txt public/sitemap*.xml');
        runCommand('git commit -m "🤖 Auto-update SEO files dates to ' + new Date().toISOString().split('T')[0] + '"');
        console.log('✅ SEO files committed locally');

        // Ask if user wants to push
        console.log('\n💡 SEO files updated and committed locally');
        console.log('   Run "git push" to sync these changes to remote');
      } else {
        console.log('ℹ️  SEO files were already up to date');
      }

      return true;
    } else {
      console.log('❌ Failed to update SEO files');
      return false;
    }
  } catch (error) {
    console.log('❌ Error updating SEO files:', error.message);
    return false;
  }
}

function main() {
  console.log('🎯 Smart Sync for St. Louis Demonstration JHS');
  console.log('📅 Syncing auto-updated SEO files and other changes\n');

  // Check git status
  if (!checkGitStatus()) {
    process.exit(1);
  }

  // Check for remote updates
  const hasUpdates = checkForRemoteUpdates();

  if (hasUpdates) {
    // Sync changes
    const syncSuccess = syncChanges();
    if (!syncSuccess) {
      process.exit(1);
    }
  }

  // Verify SEO files
  const seoStatus = checkSEOFiles();

  // Update SEO files if needed
  if (seoStatus.allPresent && seoStatus.needsUpdate) {
    console.log('\n🔄 SEO files need updating...');
    updateSEOFiles();
  }

  console.log('\n🎉 Smart sync completed!');
  console.log('🚀 Your local environment is now up to date');

  if (hasUpdates) {
    console.log('\n💡 Tip: SEO files are automatically updated daily');
    console.log('   Run "npm run sync" anytime to get the latest changes');
  }

  if (seoStatus.needsUpdate) {
    console.log('\n🤖 SEO files are now current with today\'s date');
    console.log('   They will be automatically synced on next push');
  }
}

// Run the smart sync
main();
