# SEO Date Update Scripts

This directory contains automated scripts to keep SEO files fresh with current dates.

## 📁 Scripts Overview

### `update-robots-date.js`
Updates the "Last Updated" date in `robots.txt` to the current date.

### `update-sitemaps-date.js`
Updates all `<lastmod>` dates in sitemap files to the current date/time.

### `update-all-dates.js` ⭐
**Master script** that updates both robots.txt and all sitemaps in one go.

## 🚀 Usage

### Manual Updates

```bash
# Update only robots.txt
npm run update-robots

# Update only sitemaps
npm run update-sitemaps

# Update everything (recommended)
npm run update-dates
```

### Automatic Updates

The scripts run automatically:

1. **On every build** - `prebuild` script ensures fresh dates before deployment
2. **Daily at 00:01 UTC** - GitHub Action keeps files current
3. **On every push to main** - Ensures dates are fresh on deployments

## 📋 Files Updated

### robots.txt
- Updates: `# Last Updated: YYYY-MM-DD`
- Format: Simple date format

### Sitemaps
- `sitemap.xml` - Main sitemap
- `sitemap-news.xml` - News articles
- `sitemap-images.xml` - Image gallery
- Updates: `<lastmod>YYYY-MM-DDTHH:mm:ss.sssZ</lastmod>`
- Format: Full ISO datetime
## 🎯 Benefits

### SEO Advantages
- **Fresh Appearance**: Search engines see recently updated files
- **Crawl Priority**: Recent dates encourage more frequent crawling
- **Trust Signals**: Shows active maintenance and content updates

### Automation Benefits
- **Zero Maintenance**: Runs automatically without manual intervention
- **Consistent Updates**: Never forget to update dates manually
- **Build Integration**: Automatic updates before every deployment

## 🔧 Technical Details

### Date Formats
- **robots.txt**: `2025-06-25` (YYYY-MM-DD)
- **Sitemaps**: `2025-06-25T07:47:41.625Z` (ISO 8601)

### Error Handling
- Graceful handling of missing files
- Detailed logging of all operations
- Non-destructive updates (only changes dates)

### GitHub Action
- Runs daily to keep dates current
- Only commits if changes are made
- Comprehensive logging for monitoring

## 📊 Example Output

```
🚀 Starting comprehensive date updates...
📅 Current date: 2025-06-25
🕐 Current datetime: 2025-06-25T07:47:41.625Z

🤖 Updating robots.txt...
✅ Updated robots.txt date to: 2025-06-25

🗺️  Updating sitemaps...
✅ Updated sitemap.xml with current dates
✅ Updated sitemap-news.xml with current dates
✅ Updated sitemap-images.xml with current dates

══════════════════════════════════════════════════
🎯 SUMMARY: 4 file(s) updated
📁 Files checked: robots.txt + 3 sitemaps
✨ All SEO files are now fresh and current!
🔍 Search engines will see recent update dates
══════════════════════════════════════════════════
```

## 🎉 Result

Your SEO files will always appear fresh and recently maintained, encouraging search engines to crawl more frequently and index your content with higher priority!


