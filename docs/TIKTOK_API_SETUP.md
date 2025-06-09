# 🎵 TikTok API Setup - Optimized for Free Plan

## 📊 **API Limits (Basic/Free Plan)**

Your RapidAPI "TikTok Scraper" subscription includes:

- **✅ 300 requests/month** - Scraping API
- **✅ 300 requests/month** - Removed_1 
- **✅ 10 requests/month** - Removed_2
- **✅ 120 requests/minute** - Rate limit
- **💰 $0.00/month** - Free tier

## 🎯 **Optimized Strategy**

### **Smart Search Terms**
We've reduced search terms to maximize efficiency:
1. **"St. Louis Demo JHS"** - Primary search
2. **"Demonstration JHS"** - Secondary search

**Total API calls per run: 2** (well within 300/month limit)

### **Weekly Schedule**
- **Runs every Sunday** via GitHub Actions
- **2 API calls × 4 weeks = 8 calls/month**
- **Leaves 292 calls for manual testing/debugging**

### **Optimized Parameters**
```python
params = {
    'keywords': search_term,
    'region': 'US',
    'count': '50',          # Max videos per search
    'publish_time': '0',    # All time
    'sort_type': '0'        # Relevance
}
```

## 🚀 **Usage Instructions**

### **1. Test API Connection**
```bash
python scripts/test_api.py
```
This uses **1 API call** to verify everything works.

### **2. Run Full Scraper**
```bash
python scripts/tiktok_scraper.py
```
This uses **2 API calls** (one per search term).

### **3. Check Results**
- `public/tiktok-videos.json` - For React component
- `public/tiktok-videos.html` - Standalone page
- `tiktok_scraper.log` - Detailed logs

## 📈 **Expected Results**

With optimized settings, you should get:
- **Up to 100 videos per run** (50 per search term)
- **Filtered for relevance** to your school
- **Deduplicated** to avoid repeats
- **Sorted by date** (newest first)

## 🔧 **GitHub Secrets Setup**

Add your API key to GitHub repository secrets:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `RAPIDAPI_KEY`
4. Value: `159be58078msh565c766573919f8p1a8008jsn60a5afb4a615`

## 📊 **Monitoring Usage**

The script logs API usage:
```
📊 API calls made: 1, Remaining this month: 299
📊 API calls made: 2, Remaining this month: 298
```

## ⚠️ **Rate Limiting**

- **0.6 seconds** between requests (conservative)
- **120 requests/minute limit** = max 0.5 seconds between requests
- **Our 0.6 seconds** provides safety margin

## 🎬 **Video Processing**

Each video includes:
- **URL** - Direct TikTok link
- **Username** - Creator handle
- **Description** - Video caption
- **Stats** - Likes, comments, shares (formatted as 1.2K, 5.6M)
- **Date** - Upload date
- **Verification** - Creator verification status

## 🔄 **Automatic Updates**

GitHub Actions runs every Sunday at 2 AM UTC:
- **Searches for new videos**
- **Updates website automatically**
- **Commits changes to repository**
- **Deploys to live site**

## 🛠️ **Troubleshooting**

### **API Errors**
- **401 Unauthorized**: Check API key in GitHub Secrets
- **403 Forbidden**: Verify subscription status
- **429 Rate Limited**: Wait and try again
- **500 Server Error**: API temporary issue, try later

### **No Videos Found**
- Check search terms are relevant
- Verify videos exist on TikTok with those keywords
- Review filter criteria in `filter_relevant_videos()`

### **Quota Exceeded**
- Check monthly usage in RapidAPI dashboard
- Reduce search frequency if needed
- Consider upgrading plan for higher limits

## 📞 **Support**

- **RapidAPI Dashboard**: Monitor usage and billing
- **API Documentation**: Check endpoint details
- **GitHub Issues**: Report bugs or feature requests

---

**🎉 Your TikTok integration is optimized for the free tier and ready to go!**
