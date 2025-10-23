# Cache Busting & Deployment Guide

## 🎯 Overview

This guide explains how to ensure users receive fresh updates on every deployment. The system is configured to automatically clear browser caches and prompt users to refresh.

---

## ✅ What Was Implemented

### 1. **Service Worker Version Control**
- **File**: `public/sw.js`
- **Feature**: Version-based cache naming
- **Mechanism**: Each deployment uses a unique cache name

### 2. **Automatic Cache Cleanup**
- Old caches are automatically deleted when new version activates
- Ensures users don't use stale content
- Logs cleanup process in console

### 3. **User Notification System**
- Beautiful slide-in notification when new version is available
- "Refresh Now" button for one-click update
- Auto-dismisses after 30 seconds
- Purple gradient design matching site theme

### 4. **Automatic Update Detection**
- Checks for updates every 2 minutes
- Checks when user returns to tab (visibility change)
- Immediate notification when new version detected

### 5. **Force No-Cache Headers**
- HTML meta tags prevent browser caching
- Ensures fresh HTML on every visit

---

## 📋 Deployment Checklist

### Every Time You Deploy:

#### 1. **Update Service Worker Version** (REQUIRED!)

Edit `public/sw.js`, line 2:

```javascript
const CACHE_VERSION = '2025-10-23-louis-ai-v1.0.0';  // ← UPDATE THIS!
```

**Version Format Suggestions:**
- **Date-based**: `'2025-10-23-v1'` or `'2025-10-23-deployment-1'`
- **Semantic**: `'v1.0.0'`, `'v1.1.0'`, `'v2.0.0'`
- **Feature-based**: `'louis-ai-v1'`, `'new-homepage-v2'`
- **Timestamp**: `'deploy-${Date.now()}'`

**Example:**
```javascript
// Before deployment #1
const CACHE_VERSION = '2025-10-23-louis-ai-v1.0.0';

// Before deployment #2 (next day)
const CACHE_VERSION = '2025-10-24-bug-fixes-v1.0.1';

// Before deployment #3 (major update)
const CACHE_VERSION = '2025-10-25-new-features-v1.1.0';
```

#### 2. **Build the Project**

```bash
npm run build
```

#### 3. **Deploy**

Push to your hosting platform (Netlify, Vercel, etc.)

```bash
git add -A
git commit -m "deploy: Update to version X.X.X"
git push origin main
```

---

## 🔄 How It Works

### When You Deploy:

1. **New service worker** with updated `CACHE_VERSION` is uploaded
2. Users visit site → browser detects new service worker
3. New service worker **installs in background**
4. When ready, service worker **activates**
5. On activation:
   - **Deletes ALL old caches** (with different version names)
   - **Creates new cache** with new version name
   - **Sends message to user's browser**
6. User sees **purple notification**: "New Update Available!"
7. User clicks **"Refresh Now"** → gets fresh content
8. If user doesn't click, notification **auto-dismisses after 30s**

### User Experience:

```
┌─────────────────────────────────┐
│   🎉 New Update Available!      │
│   Refresh to get latest features│
│                                 │
│   [    Refresh Now    ]         │
└─────────────────────────────────┘
```

---

## 🛠️ Technical Details

### Service Worker Cache Strategy

```javascript
// CACHE_VERSION changes → cache name changes → old cache deleted
const CACHE_VERSION = '2025-10-23-v1';
const CACHE_NAME = `st-louis-demo-jhs-${CACHE_VERSION}`;

// Example cache names:
// Old: 'st-louis-demo-jhs-2025-10-22-v1' ← DELETED
// New: 'st-louis-demo-jhs-2025-10-23-v1' ← ACTIVE
```

### Update Check Frequency

- **Every 2 minutes**: Automatic background check
- **On tab focus**: When user returns to tab
- **On page load**: Initial check

### Network Strategy

- **JavaScript/CSS/HTML**: Network-first (always try fresh content)
- **Images/Assets**: Cache-first (faster loading, less bandwidth)

---

## 🧪 Testing Cache Busting

### Test Locally:

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open DevTools** → Application → Service Workers

3. **Check current version:**
   - Look for registered service worker
   - Should show current `CACHE_VERSION`

4. **Update version in sw.js**

5. **Refresh page**

6. **Should see:**
   - New service worker installing
   - Console logs about cache cleanup
   - Update notification banner

### Test in Production:

1. **Deploy with Version 1:**
   ```javascript
   const CACHE_VERSION = 'test-v1';
   ```

2. **Visit site** → Note the service worker version

3. **Deploy with Version 2:**
   ```javascript
   const CACHE_VERSION = 'test-v2';
   ```

4. **Wait 2 minutes** OR **refresh page**

5. **Should see update notification** 🎉

---

## 🐛 Troubleshooting

### Users Not Getting Updates?

**Check 1: Version Updated?**
```bash
# In public/sw.js
const CACHE_VERSION = 'NEW_VERSION_HERE';  # Changed?
```

**Check 2: Service Worker Registered?**
- Open DevTools → Console
- Should see: `✅ SW registered`

**Check 3: Hard Refresh**
- Windows/Linux: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**Check 4: Clear Service Workers Manually**
- DevTools → Application → Service Workers
- Click "Unregister"
- Refresh page

### Update Notification Not Showing?

**Check Console for:**
```
🆕 New version detected: [version]
💡 Message: New version available! ...
```

If not showing:
1. Ensure service worker activated
2. Check browser console for errors
3. Try closing and reopening tab

### Old Content Still Showing?

**Force complete cache clear:**
```javascript
// Run in DevTools Console
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
location.reload();
```

---

## 📊 Monitoring

### Check What Users Are Seeing:

**Browser Console Logs:**
```
✅ SW registered
🔍 Checking for updates...
🎯 St. Louis Demo. J.H.S PWA activating...
📦 New cache version: 2025-10-23-v1
🔍 Found caches: ['st-louis-demo-jhs-2025-10-22-v1']
🗑️ Deleting old cache: st-louis-demo-jhs-2025-10-22-v1
✅ St. Louis Demo. J.H.S PWA activated and ready!
✨ Cache cleaned - users will get fresh content!
```

### Analytics (Optional)

Track update notifications:
```javascript
// Add to main.tsx notification code
gtag('event', 'update_notification_shown', {
  version: event.data.version
});
```

---

## 🚀 Quick Deploy Script

Create `deploy.sh`:

```bash
#!/bin/bash

# Get current date and time
VERSION=$(date +"%Y-%m-%d-%H%M")

# Update service worker version
sed -i "s/const CACHE_VERSION = '.*'/const CACHE_VERSION = '$VERSION'/" public/sw.js

echo "✅ Updated cache version to: $VERSION"

# Build
echo "🏗️ Building..."
npm run build

# Commit
echo "💾 Committing..."
git add .
git commit -m "deploy: Version $VERSION"

# Push
echo "🚀 Deploying..."
git push origin main

echo "✅ Deployment complete!"
echo "📦 Version: $VERSION"
```

**Usage:**
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 💡 Best Practices

### 1. **Always Update Version**
Never deploy without changing `CACHE_VERSION`

### 2. **Use Meaningful Versions**
```javascript
// Good
const CACHE_VERSION = '2025-10-23-louis-ai-launch';
const CACHE_VERSION = 'v1.2.0-bug-fixes';

// Bad
const CACHE_VERSION = 'asdf1234';
const CACHE_VERSION = 'test';
```

### 3. **Inform Users About Updates**
The notification does this automatically, but consider:
- Changelog page
- "What's New" modal on first visit
- Social media announcements

### 4. **Test Before Deploying**
```bash
# Build locally first
npm run build

# Test the build
npm run preview

# Then deploy
```

### 5. **Monitor Deployment**
- Check deployment logs
- Verify on live site
- Check browser console
- Test on mobile devices

---

## 📝 Version History Template

Keep track in `CHANGELOG.md`:

```markdown
## [1.0.1] - 2025-10-23
### Added
- Louis AI page with ChatGPT-style interface
- RAG system with source citations

### Changed
- Updated cache version to 2025-10-23-louis-ai-v1.0.1

### Fixed
- Loading screen flicker issue

## [1.0.0] - 2025-10-20
### Added
- Initial deployment
- Cache version: 2025-10-20-initial-v1.0.0
```

---

## ✅ Summary

With this system:
- ✅ **Users automatically get updates** within 2 minutes
- ✅ **Beautiful notification** prompts them to refresh
- ✅ **Old caches cleared** automatically
- ✅ **No manual cache clearing** needed by users
- ✅ **Just update one line** (`CACHE_VERSION`) before each deploy

**Remember**: The ONLY thing you MUST do before each deployment is update the `CACHE_VERSION` in `public/sw.js`!

---

**Last Updated**: October 23, 2025  
**Current System**: Fully Automated Cache Busting  
**Status**: ✅ Production Ready
