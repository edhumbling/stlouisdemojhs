# 🎵 How to Add Real TikTok Videos for St. Louis Demo JHS

## 🎯 **Current Status**

✅ **TikTok Official Embed Format** - Now using TikTok's native embedding system  
✅ **Curated Video System** - Ready to accept real TikTok URLs  
✅ **Professional Layout** - Matches TikTok's official design  
⚠️ **Need Real Videos** - Currently using placeholder examples  

## 🔍 **Step 1: Find Real TikTok Videos**

### **Search Strategies:**

#### **On TikTok App/Website:**
1. **Search hashtags:**
   - `#StLouisDemoJHS`
   - `#DemonstrationJHS`
   - `#GhanaSchools`
   - `#EducationGhana`

2. **Search keywords:**
   - "St. Louis Demo JHS"
   - "Demonstration JHS"
   - "St Louis Demonstration"
   - Your school's location + "school"

3. **Look for:**
   - **Student performances** (singing, dancing, drama)
   - **School events** (sports day, cultural day)
   - **Academic achievements** (awards, competitions)
   - **Graduation ceremonies**
   - **School tours** or visits
   - **Teacher content** about your school

### **Video Types to Find:**
- ✅ **Student-created content** about school life
- ✅ **Parent videos** of school events
- ✅ **Educational content** featuring your school
- ✅ **Community videos** mentioning your school
- ✅ **News coverage** of school achievements

## 📋 **Step 2: Collect Video Information**

For each video you find, collect:

1. **TikTok URL** (copy from browser or app)
   - Example: `https://www.tiktok.com/@username/video/1234567890123456789`

2. **Description** (what the video is about)
   - Example: "Students performing traditional dance at cultural day"

3. **Date** (when it was posted)
   - Example: "2024-11-15"

## 🛠️ **Step 3: Add Videos to Your System**

### **Method 1: Interactive Script**
```bash
python scripts/add_real_videos.py
```

Follow the prompts to add videos one by one.

### **Method 2: Manual Editing**
Edit `scripts/tiktok_scraper.py` and find the `_get_curated_videos` function:

```python
def _get_curated_videos(self, search_term: str) -> List[Dict]:
    curated_videos = {
        "St. Louis Demo JHS": [
            {
                "id": "REAL_VIDEO_ID_HERE",
                "url": "https://www.tiktok.com/@username/video/REAL_VIDEO_ID_HERE",
                "username": "real_username",
                "description": "Real video description about your school",
                "date": "2024-12-01",
                "likes": "0",  # Will update when video loads
                "comments": "0",
                "shares": "0",
                "verified": False
            },
            # Add more videos here...
        ],
        "Demonstration JHS": [
            # Add videos specifically about "Demonstration JHS"
        ]
    }
    return curated_videos.get(search_term, [])
```

## 🎬 **Step 4: Update Your Website**

After adding real videos:

1. **Run the scraper:**
   ```bash
   python scripts/tiktok_scraper.py
   ```

2. **Check the results:**
   - Open `public/tiktok-videos.html` in browser
   - Verify videos load properly
   - Check that embeds work

3. **Deploy to website:**
   - Commit changes to GitHub
   - Push to trigger automatic deployment

## 🔧 **Step 5: Fix API Subscription (Optional)**

To get automatic video discovery:

1. **Go to RapidAPI Dashboard**
2. **Find "TikTok Scraper" API**
3. **Subscribe to Basic Plan** (if not already)
4. **Verify subscription status**
5. **Test with:** `python scripts/test_api.py`

## 📊 **Expected Results**

### **With Real Videos:**
- ✅ **Actual TikTok embeds** that play real videos
- ✅ **Real engagement stats** (likes, comments, shares)
- ✅ **Authentic content** about your school
- ✅ **Professional presentation** using TikTok's design

### **Current Placeholder System:**
- ✅ **Perfect layout and design**
- ✅ **TikTok official embed format**
- ⚠️ **Sample videos** (will show as unavailable)
- ✅ **Ready for real content**

## 🎯 **Quick Start Example**

Let's say you found this real TikTok video:
`https://www.tiktok.com/@ghanaschools/video/7123456789012345678`

**Add it like this:**
```python
{
    "id": "7123456789012345678",
    "url": "https://www.tiktok.com/@ghanaschools/video/7123456789012345678",
    "username": "ghanaschools",
    "description": "Amazing performance by St. Louis Demo JHS students!",
    "date": "2024-12-01",
    "likes": "0",
    "comments": "0", 
    "shares": "0",
    "verified": False
}
```

## 🚀 **Next Steps**

1. **Find 3-5 real TikTok videos** about your school
2. **Use the interactive script** to add them: `python scripts/add_real_videos.py`
3. **Run the scraper** to update: `python scripts/tiktok_scraper.py`
4. **Check the results** in your browser
5. **Deploy to your website**

## 💡 **Pro Tips**

- **Start small** - Add 2-3 videos first to test
- **Use recent videos** - They're more likely to embed properly
- **Check permissions** - Make sure videos are public
- **Verify URLs** - Test that links work before adding
- **Update regularly** - Add new videos as they're posted

---

**🎉 Your TikTok page will show real, engaging content about St. Louis Demo JHS!**
