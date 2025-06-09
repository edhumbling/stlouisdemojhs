# 🎵 TikTok Video Scraper for St. Louis Demo JHS

This automated system searches for and publishes TikTok videos featuring St. Louis Demonstration Junior High School on the school website.

## 🎯 How It Works

### Search Terms
The script searches for TikTok videos containing:
- "St. Louis Demo JHS"
- "Demonstration JHS" 
- "St Louis Demonstration"
- "StLouisDemoJHS"

### Automation Schedule
- **Frequency**: Runs automatically every Sunday at 6:00 AM UTC
- **Method**: GitHub Actions workflow
- **Updates**: Automatically commits new videos to the repository

### Output Files
1. **`public/tiktok-videos.json`** - JSON data for the React component
2. **`public/tiktok-videos.html`** - Standalone HTML page with embeds

## 🚀 Manual Execution

### Local Development
```bash
# Install dependencies
pip install -r scripts/requirements.txt

# Run the scraper
python scripts/tiktok_scraper.py
```

### GitHub Actions (Manual Trigger)
1. Go to the "Actions" tab in the GitHub repository
2. Select "TikTok Video Scraper" workflow
3. Click "Run workflow"

## 📋 Features

### Video Filtering
- ✅ Exact match filtering for school mentions
- ✅ Duplicate removal by video ID
- ✅ Relevance scoring

### Data Extraction
- 📱 Video URL and ID
- 👤 Username and verification status
- 📝 Description/caption
- 📊 Engagement metrics (likes, comments, shares)
- 📅 Upload date

### Web Integration
- 🎨 Responsive TikTok embeds
- 📱 Mobile-optimized display
- 🔄 Automatic weekly updates
- 🎯 SEO-friendly structure

## 🛠️ Technical Implementation

### Current Method (Demonstration)
The current implementation uses sample data for demonstration purposes. 

### Production Implementation Options

#### Option 1: TikTok Research API (Recommended)
```python
# Requires TikTok Research API approval
# Best for academic/educational institutions
import tiktok_research_api

api = tiktok_research_api.Client(api_key="your_key")
videos = api.search_videos(query="St. Louis Demo JHS")
```

#### Option 2: Alternative Services
```python
# Using alternative TikTok data services
# (Implementation will be added based on chosen service)
import requests

# Example placeholder for future implementation
response = requests.get(
    "https://alternative-service.com/search",
    params={"query": "St. Louis Demo JHS"}
)
```

#### Option 3: Selenium Web Scraping
```python
# For dynamic content scraping
from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://www.tiktok.com/search?q=St.%20Louis%20Demo%20JHS")
# Extract video data
```

## 📊 Data Structure

### JSON Output Format
```json
{
  "last_updated": "2025-01-26T12:00:00.000Z",
  "total_videos": 5,
  "videos": [
    {
      "id": "7234567890123456789",
      "url": "https://www.tiktok.com/@username/video/7234567890123456789",
      "username": "username",
      "description": "Amazing students at St. Louis Demo JHS!",
      "date": "2025-01-26",
      "likes": "1.2K",
      "comments": "45",
      "shares": "23",
      "verified": true
    }
  ]
}
```

## 🔧 Configuration

### Environment Variables
- `TIKTOK_API_KEY` - TikTok Research API key (if using)
- `RAPIDAPI_KEY` - RapidAPI key (if using third-party)

### Search Terms Customization
Edit the `search_terms` list in `tiktok_scraper.py`:
```python
self.search_terms = [
    "St. Louis Demo JHS",
    "Demonstration JHS",
    "Your Custom Term"
]
```

## 📈 Monitoring & Logs

### GitHub Actions Logs
- View execution logs in the Actions tab
- Monitor success/failure rates
- Check for API rate limits

### Local Logs
- Log file: `tiktok_scraper.log`
- Console output with timestamps
- Error tracking and debugging

## 🎯 Usage on Website

The TikTok page (`/tiktok`) automatically:
1. Loads video data from `public/tiktok-videos.json`
2. Renders TikTok embeds using official embed code
3. Displays engagement metrics and video info
4. Updates weekly with new content

## 🔒 Privacy & Compliance

- Only searches public TikTok content
- Respects TikTok's terms of service
- No personal data collection
- Educational use case compliance

## 🚨 Rate Limiting

- 2-second delays between requests
- Respects API rate limits
- Implements exponential backoff
- Error handling for timeouts

## 📞 Support

For issues or questions about the TikTok scraper:
1. Check the GitHub Actions logs
2. Review the error logs in `tiktok_scraper.log`
3. Ensure API keys are properly configured
4. Verify search terms are relevant
