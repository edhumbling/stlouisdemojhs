#!/usr/bin/env python3
"""
🎵 TikTok Video Manager for St. Louis Demo JHS
Simple system to manage TikTok videos without external APIs
"""

import json
import os
import re
from datetime import datetime
from typing import List, Dict, Optional

class TikTokManager:
    def __init__(self):
        self.output_file = "public/tiktok-videos.json"
        self.html_file = "public/tiktok-videos.html"
        
        # Ensure public directory exists
        os.makedirs("public", exist_ok=True)
        
        # Load existing videos
        self.videos = self.load_videos()
    
    def load_videos(self) -> List[Dict]:
        """Load existing videos from JSON file"""
        if os.path.exists(self.output_file):
            try:
                with open(self.output_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    # Handle both old format (array) and new format (object with videos array)
                    if isinstance(data, list):
                        return data
                    elif isinstance(data, dict) and 'videos' in data:
                        return data['videos']
                    else:
                        return []
            except:
                pass
        return []
    
    def save_videos(self):
        """Save videos to JSON file"""
        data = {
            "last_updated": datetime.now().isoformat(),
            "total_videos": len(self.videos),
            "videos": self.videos
        }
        with open(self.output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"💾 Saved {len(self.videos)} videos to {self.output_file}")
    
    def add_video(self, url: str, description: str = "", manual_data: Optional[Dict] = None) -> bool:
        """Add a single TikTok video"""
        try:
            # Extract video ID from URL
            video_id = self.extract_video_id(url)
            if not video_id:
                print(f"❌ Could not extract video ID from: {url}")
                return False

            # Check if video already exists
            if any(v['id'] == video_id for v in self.videos):
                print(f"⚠️ Video {video_id} already exists")
                return False
            
            # Create video object
            username = 'unknown'
            final_description = description
            date = datetime.now().strftime("%Y-%m-%d")
            likes = '0'
            comments = '0'
            shares = '0'
            verified = False

            if manual_data:
                username = manual_data.get('username', 'unknown')
                if not final_description:
                    final_description = manual_data.get('description', '')
                date = manual_data.get('date', date)
                likes = manual_data.get('likes', '0')
                comments = manual_data.get('comments', '0')
                shares = manual_data.get('shares', '0')
                verified = manual_data.get('verified', False)

            video = {
                "id": video_id,
                "url": url,
                "username": username,
                "description": final_description,
                "date": date,
                "likes": likes,
                "comments": comments,
                "shares": shares,
                "verified": verified,
                "added_date": datetime.now().isoformat()
            }
            
            self.videos.append(video)
            print(f"✅ Added video: {video_id}")
            return True
            
        except Exception as e:
            print(f"❌ Error adding video: {str(e)}")
            return False
    
    def extract_video_id(self, url: str) -> str:
        """Extract TikTok video ID from URL"""
        try:
            # Handle different TikTok URL formats
            patterns = [
                r'tiktok\.com/@[^/]+/video/(\d+)',  # Standard format
                r'vm\.tiktok\.com/([A-Za-z0-9]+)',   # Short format
                r'tiktok\.com/t/([A-Za-z0-9]+)',     # Another short format
            ]
            
            for pattern in patterns:
                match = re.search(pattern, url)
                if match:
                    return match.group(1)
            
            return None
        except:
            return None
    
    def remove_video(self, video_id: str) -> bool:
        """Remove a video by ID"""
        original_count = len(self.videos)
        self.videos = [v for v in self.videos if v['id'] != video_id]
        
        if len(self.videos) < original_count:
            print(f"✅ Removed video: {video_id}")
            return True
        else:
            print(f"❌ Video not found: {video_id}")
            return False
    
    def list_videos(self):
        """List all videos"""
        if not self.videos:
            print("📭 No videos found")
            return
        
        print(f"📹 Found {len(self.videos)} videos:")
        print("-" * 80)
        
        for i, video in enumerate(self.videos, 1):
            print(f"{i:2d}. ID: {video['id']}")
            print(f"    👤 @{video['username']}")
            print(f"    📝 {video['description'][:60]}{'...' if len(video['description']) > 60 else ''}")
            print(f"    📅 {video['date']} | 👍 {video['likes']} | 💬 {video['comments']}")
            print(f"    🔗 {video['url']}")
            print()
    
    def generate_html(self):
        """Generate HTML page with TikTok embeds"""
        if not self.videos:
            print("❌ No videos to generate HTML for")
            return
        
        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>St. Louis Demo JHS on TikTok</title>
    <script async src="https://www.tiktok.com/embed.js"></script>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #000;
            color: #fff;
            padding: 20px;
            margin: 0;
        }}
        h1 {{
            text-align: center;
            color: #ff0050;
            margin-bottom: 30px;
            font-size: 2.5rem;
            font-weight: bold;
        }}
        .video-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }}
        .video-item {{
            background: transparent;
            display: flex;
            flex-direction: column;
            align-items: center;
        }}
        .tiktok-embed {{
            max-width: 325px;
            min-height: 578px;
            margin: 0 auto;
        }}
        .video-info {{
            margin-top: 15px;
            text-align: center;
            max-width: 325px;
        }}
        .video-stats {{
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 10px;
            font-size: 14px;
            color: #888;
        }}
        footer {{
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #333;
            color: #666;
        }}
    </style>
</head>
<body>
    <h1>🎵 St. Louis Demonstration JHS on TikTok</h1>
    <div class="video-grid">
"""
        
        for video in self.videos:
            html_content += f"""
        <div class="video-item">
            <blockquote class="tiktok-embed"
                       cite="{video['url']}"
                       data-video-id="{video['id']}"
                       style="max-width: 325px; min-height: 578px;">
                <section>
                    <a target="_blank"
                       title="@{video['username']}"
                       href="{video['url']}">
                        @{video['username']}
                    </a>
                </section>
            </blockquote>
            <div class="video-info">
                <div class="video-stats">
                    <span>👍 {video['likes']}</span>
                    <span>💬 {video['comments']}</span>
                    <span>🔄 {video['shares']}</span>
                </div>
            </div>
        </div>
"""
        
        html_content += f"""
    </div>
    <footer>
        <p>🎓 St. Louis Demonstration JHS</p>
        <p>📅 Last updated: {datetime.now().strftime("%B %d, %Y")}</p>
        <p>📹 {len(self.videos)} videos</p>
    </footer>
</body>
</html>"""
        
        with open(self.html_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"🌐 Generated HTML page: {self.html_file}")
    
    def add_sample_videos(self):
        """Add some sample videos for demonstration"""
        sample_videos = [
            {
                "url": "https://www.tiktok.com/@ghanaschools/video/7234567890123456789",
                "description": "Amazing students at St. Louis Demo JHS showing their talents! #education #ghana #school #stlouisdemo",
                "manual_data": {
                    "username": "ghanaschools",
                    "likes": "2.1K",
                    "comments": "89",
                    "shares": "45",
                    "verified": False
                }
            },
            {
                "url": "https://www.tiktok.com/@educationgh/video/7234567890123456790",
                "description": "Visit to St. Louis Demonstration JHS - incredible learning environment! #ghanaschools #education #demonstration",
                "manual_data": {
                    "username": "educationgh",
                    "likes": "1.8K",
                    "comments": "67",
                    "shares": "34",
                    "verified": True
                }
            }
        ]
        
        added = 0
        for video_data in sample_videos:
            if self.add_video(video_data["url"], video_data["description"], video_data["manual_data"]):
                added += 1
        
        print(f"📹 Added {added} sample videos")
        return added > 0

def main():
    """Main function for command line usage"""
    import sys
    
    manager = TikTokManager()
    
    if len(sys.argv) == 1:
        # Interactive mode
        print("🎵 TikTok Video Manager for St. Louis Demo JHS")
        print("=" * 50)
        print("1. Add video")
        print("2. List videos") 
        print("3. Remove video")
        print("4. Generate HTML")
        print("5. Add sample videos")
        print("6. Exit")
        
        while True:
            choice = input("\nChoose an option (1-6): ").strip()
            
            if choice == '1':
                url = input("Enter TikTok URL: ").strip()
                description = input("Enter description (optional): ").strip()
                if manager.add_video(url, description):
                    manager.save_videos()
            
            elif choice == '2':
                manager.list_videos()
            
            elif choice == '3':
                video_id = input("Enter video ID to remove: ").strip()
                if manager.remove_video(video_id):
                    manager.save_videos()
            
            elif choice == '4':
                manager.generate_html()
            
            elif choice == '5':
                if manager.add_sample_videos():
                    manager.save_videos()
                    manager.generate_html()
            
            elif choice == '6':
                break
            
            else:
                print("Invalid choice")
    
    else:
        # Command line mode
        command = sys.argv[1]
        
        if command == 'add' and len(sys.argv) >= 3:
            url = sys.argv[2]
            description = sys.argv[3] if len(sys.argv) > 3 else ""
            if manager.add_video(url, description):
                manager.save_videos()
                manager.generate_html()
        
        elif command == 'list':
            manager.list_videos()
        
        elif command == 'generate':
            manager.generate_html()
        
        elif command == 'sample':
            if manager.add_sample_videos():
                manager.save_videos()
                manager.generate_html()
        
        else:
            print("Usage:")
            print("  python scripts/tiktok_manager.py                    # Interactive mode")
            print("  python scripts/tiktok_manager.py add <url> [desc]   # Add video")
            print("  python scripts/tiktok_manager.py list               # List videos")
            print("  python scripts/tiktok_manager.py generate           # Generate HTML")
            print("  python scripts/tiktok_manager.py sample             # Add sample videos")

if __name__ == "__main__":
    main()
