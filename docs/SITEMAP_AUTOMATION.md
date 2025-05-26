# Automated Sitemap Management

This document explains how the automated sitemap system works and how to set it up for daily updates.

## 🎯 Overview

The sitemap automation system automatically updates the following files daily:
- `public/sitemap.xml` - XML sitemap for search engines
- `public/robots.txt` - Robot instructions with current date
- `public/llms.txt` - AI crawler information with current date

## 🚀 Features

### ✅ Automatic Daily Updates
- Updates all dates to current date
- Maintains proper XML structure
- Preserves page priorities and change frequencies
- Updates last modified dates

### ✅ Multiple Deployment Options
- **GitHub Actions**: Automated via GitHub workflows
- **Cron Jobs**: Server-based automation
- **Build Process**: Updates during build
- **Manual**: Run anytime with npm script

### ✅ Search Engine Notifications
- Automatically pings Google and Bing
- Notifies search engines of sitemap updates
- Improves indexing speed

## 📋 Setup Instructions

### Option 1: GitHub Actions (Recommended)

The GitHub Actions workflow is already configured and will:
- Run daily at 2 AM UTC
- Update sitemap files automatically
- Commit changes to repository
- Notify search engines

**No additional setup required** - it works automatically!

### Option 2: Server Cron Job

For server deployments, set up a cron job:

1. **Make the script executable:**
   ```bash
   chmod +x scripts/cron-update-sitemap.sh
   ```

2. **Add to crontab:**
   ```bash
   crontab -e
   ```

   Add this line to run daily at 2 AM:
   ```bash
   0 2 * * * /path/to/your/project/scripts/cron-update-sitemap.sh
   ```

3. **Configure notifications (optional):**
   Edit `scripts/cron-update-sitemap.sh` and uncomment notification sections:
   - Slack webhook notifications
   - Email notifications

### Option 3: Manual Updates

Run the sitemap generator manually:

```bash
# Generate updated sitemap files
npm run generate-sitemap

# Or run directly
node scripts/generate-sitemap.js
```

## 📊 Configuration

### Page Configuration

Edit `scripts/generate-sitemap.js` to modify:

```javascript
// Add new pages
{
  path: '/new-page',
  priority: '0.8',
  changefreq: 'weekly',
  lastmod: getCurrentDate()
}

// Modify existing page priorities
{
  path: '/important-page',
  priority: '0.9',  // Higher priority
  changefreq: 'daily',  // More frequent updates
  lastmod: getCurrentDate()
}
```

### Change Frequencies
- `daily` - Homepage, news, frequently updated content
- `weekly` - Gallery, programs, regular updates
- `monthly` - About, contact, stable content
- `yearly` - Legal pages, rarely changed content

### Priority Values
- `1.0` - Homepage (highest priority)
- `0.9` - Main navigation, important pages
- `0.8` - Academic programs, key content
- `0.7` - Secondary pages
- `0.6` - Support pages
- `0.3` - Legal pages (lowest priority)

## 🔍 Monitoring

### GitHub Actions Logs
Check workflow runs at:
```
https://github.com/your-username/your-repo/actions
```

### Cron Job Logs
View logs at:
```bash
tail -f logs/sitemap-update.log
```

### Manual Verification
Check if files are updated:
```bash
ls -la public/sitemap.xml public/robots.txt public/llms.txt
```

## 🛠️ Troubleshooting

### Common Issues

1. **Script not running:**
   - Check file permissions: `chmod +x scripts/cron-update-sitemap.sh`
   - Verify cron job syntax: `crontab -l`
   - Check logs: `tail logs/sitemap-update.log`

2. **Node.js not found:**
   - Ensure Node.js is in PATH
   - Use full path in cron: `/usr/bin/node scripts/generate-sitemap.js`

3. **Permission denied:**
   - Check file ownership: `chown -R user:group /path/to/project`
   - Verify write permissions on `public/` directory

4. **GitHub Actions failing:**
   - Check repository permissions
   - Verify GITHUB_TOKEN has write access
   - Review workflow logs

### Debug Mode

Run with verbose logging:
```bash
DEBUG=true npm run generate-sitemap
```

## 📈 SEO Benefits

### Improved Indexing
- Fresh dates signal active content
- Search engines crawl more frequently
- Better discovery of new pages

### Enhanced Visibility
- Proper priority signals to search engines
- Optimized change frequencies
- Comprehensive page coverage

### AI Crawler Optimization
- Structured data in llms.txt
- Clear crawling permissions
- Optimized for AI training data

## 🔄 Maintenance

### Regular Tasks
- Monitor logs weekly
- Review page priorities monthly
- Update change frequencies as needed
- Add new pages to configuration

### Performance Optimization
- Keep sitemap under 50,000 URLs
- Use appropriate change frequencies
- Set realistic priorities
- Monitor crawl budget usage

## 📞 Support

For issues or questions:
- Check logs first
- Review configuration
- Test manually: `npm run generate-sitemap`
- Contact: contact@stlouisdemojhs.com

---

**Last Updated:** January 2025
**Version:** 1.0.0
