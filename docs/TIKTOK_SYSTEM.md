# 🎵 TikTok Video System for St. Louis Demo JHS

## 🌟 **Overview**

A simple, API-free system to manage and display TikTok videos about your school. No external dependencies, no API keys, no rate limits!

## ✨ **Features**

- ✅ **No External APIs** - No RapidAPI or other services needed
- ✅ **Manual Curation** - Add real TikTok videos manually
- ✅ **Official TikTok Embeds** - Uses TikTok's official embed system
- ✅ **Beautiful Display** - TikTok-style dark theme
- ✅ **JSON Storage** - Simple file-based storage
- ✅ **HTML Generation** - Creates standalone HTML page
- ✅ **Duplicate Prevention** - Won't add the same video twice

## 🚀 **Quick Start**

### **1. Add Sample Videos**
```bash
python scripts/tiktok_manager.py sample
```

### **2. View Videos**
```bash
python scripts/tiktok_manager.py list
```

### **3. Generate HTML Page**
```bash
python scripts/tiktok_manager.py generate
```

### **4. Open in Browser**
Open `public/tiktok-videos.html` in your browser

## 📝 **Adding Real Videos**

### **Interactive Mode**
```bash
python scripts/add_real_videos.py
```

### **Command Line Mode**
```bash
python scripts/tiktok_manager.py add "https://www.tiktok.com/@username/video/123" "Description"
```

### **Finding Videos**
1. Search TikTok for:
   - "St. Louis Demo JHS"
   - "Demonstration JHS Ghana"
   - Your school's hashtags
   
2. Copy video URLs like:
   - `https://www.tiktok.com/@username/video/1234567890123456789`
   - `https://vm.tiktok.com/ABC123/`

## 🛠 **Commands**

### **TikTok Manager**
```bash
# Interactive mode
python scripts/tiktok_manager.py

# Add video
python scripts/tiktok_manager.py add <url> [description]

# List all videos
python scripts/tiktok_manager.py list

# Generate HTML
python scripts/tiktok_manager.py generate

# Add sample videos
python scripts/tiktok_manager.py sample
```

### **Video Adder**
```bash
# Interactive mode
python scripts/add_real_videos.py

# Show examples
python scripts/add_real_videos.py examples

# Add sample videos
python scripts/add_real_videos.py sample

# Show help
python scripts/add_real_videos.py help
```

## 📁 **File Structure**

```
scripts/
├── tiktok_manager.py      # Main TikTok management system
└── add_real_videos.py     # Helper script for adding videos

public/
├── tiktok-videos.json     # Video data storage
└── tiktok-videos.html     # Generated HTML page
```

## 📊 **Data Format**

### **JSON Structure**
```json
{
  "last_updated": "2025-06-09T15:47:03.046960",
  "total_videos": 3,
  "videos": [
    {
      "id": "7234567890123456789",
      "url": "https://www.tiktok.com/@username/video/7234567890123456789",
      "username": "username",
      "description": "Video description",
      "date": "2024-12-01",
      "likes": "2.1K",
      "comments": "89",
      "shares": "45",
      "verified": false,
      "added_date": "2025-06-09T15:47:03.046960"
    }
  ]
}
```

## 🎨 **Customization**

### **HTML Styling**
Edit the CSS in `scripts/tiktok_manager.py` in the `generate_html()` method.

### **Video Information**
When adding videos, you can include:
- Username
- Like count
- Comment count
- Share count
- Verification status

## 🔧 **Integration with Website**

### **React Component**
Use the JSON data in your React components:
```javascript
import videoData from '../public/tiktok-videos.json';

const videos = videoData.videos;
```

### **Standalone Page**
Link to `public/tiktok-videos.html` from your website.

## 🚫 **What We Removed**

- ❌ RapidAPI dependencies
- ❌ API key requirements
- ❌ Rate limiting issues
- ❌ External service dependencies
- ❌ Complex authentication

## ✅ **Benefits**

- ✅ **Free Forever** - No API costs
- ✅ **Reliable** - No external service downtime
- ✅ **Simple** - Easy to understand and maintain
- ✅ **Fast** - No API calls needed
- ✅ **Secure** - No API keys to manage
- ✅ **Flexible** - Full control over content

## 🎯 **Next Steps**

1. **Find Real Videos**: Search TikTok for videos about your school
2. **Add Videos**: Use the interactive script to add them
3. **Generate Page**: Create the HTML page
4. **Integrate**: Add to your website
5. **Update Regularly**: Add new videos as they're posted

## 💡 **Tips**

- **Quality over Quantity**: Add videos that truly represent your school
- **Check Permissions**: Consider reaching out to creators
- **Regular Updates**: Add new videos monthly or quarterly
- **Backup Data**: Keep a backup of your `tiktok-videos.json` file

## 🆘 **Troubleshooting**

### **Video Not Adding**
- Check the URL format
- Ensure it's a valid TikTok URL
- Video might already exist

### **HTML Not Generating**
- Ensure you have videos in the system
- Check file permissions in `public/` directory

### **Embeds Not Loading**
- Ensure internet connection
- TikTok's embed script needs to load
- Some videos might be private or deleted

---

🎓 **St. Louis Demonstration JHS** - Showcasing our amazing students on TikTok!
