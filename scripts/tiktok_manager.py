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
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>St. Louis Demo JHS on TikTok</title>
    <link rel="preconnect" href="https://www.tiktok.com">
    <link rel="dns-prefetch" href="https://www.tiktok.com">
    <script>
        // Preload TikTok embed script for blazing fast loading
        const script = document.createElement('script');
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;
        document.head.appendChild(script);
    </script>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: 'Proxima Nova', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #000000;
            color: #ffffff;
            overflow-x: hidden;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }}

        /* TikTok Official Colors */
        :root {{
            --tiktok-red: #FE2C55;
            --tiktok-blue: #25F4EE;
            --tiktok-black: #000000;
            --tiktok-dark-gray: #161823;
            --tiktok-gray: #2F2F2F;
            --tiktok-light-gray: #8A8A8A;
            --tiktok-white: #FFFFFF;
        }}

        /* Cute Small Header */
        .header {{
            position: sticky;
            top: 0;
            z-index: 1000;
            background: linear-gradient(135deg, var(--tiktok-red), var(--tiktok-blue));
            padding: 8px 16px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(254, 44, 85, 0.3);
            backdrop-filter: blur(10px);
        }}

        .header h1 {{
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--tiktok-white);
            text-shadow: 0 1px 3px rgba(0,0,0,0.3);
            letter-spacing: 0.5px;
        }}

        .header .school-name {{
            font-size: 0.9rem;
            opacity: 0.9;
            margin-top: 2px;
        }}

        /* Native TikTok-like Container */
        .tiktok-container {{
            height: calc(100vh - 60px);
            overflow-y: auto;
            scroll-snap-type: y mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }}

        .tiktok-container::-webkit-scrollbar {{
            display: none;
        }}

        /* Video Items - Native TikTok Style */
        .video-item {{
            height: calc(100vh - 60px);
            display: flex;
            justify-content: center;
            align-items: center;
            scroll-snap-align: start;
            position: relative;
            background: var(--tiktok-black);
        }}

        /* Silver Shimmer Loading Effect */
        .video-placeholder {{
            width: 100%;
            max-width: 325px;
            height: 578px;
            background: linear-gradient(
                90deg,
                #2a2a2a 25%,
                #3a3a3a 50%,
                #2a2a2a 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 12px;
            position: relative;
            overflow: hidden;
        }}

        @keyframes shimmer {{
            0% {{
                background-position: -200% 0;
            }}
            100% {{
                background-position: 200% 0;
            }}
        }}

        .video-placeholder::before {{
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60px;
            height: 60px;
            border: 3px solid var(--tiktok-red);
            border-top: 3px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }}

        @keyframes spin {{
            0% {{ transform: translate(-50%, -50%) rotate(0deg); }}
            100% {{ transform: translate(-50%, -50%) rotate(360deg); }}
        }}

        /* TikTok Embed Styling */
        .tiktok-embed {{
            max-width: 325px !important;
            min-height: 578px !important;
            margin: 0 auto;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 8px 32px rgba(254, 44, 85, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }}

        .tiktok-embed:hover {{
            transform: scale(1.02);
            box-shadow: 0 12px 48px rgba(254, 44, 85, 0.3);
        }}

        /* Loading States */
        .video-item.loading .tiktok-embed {{
            display: none;
        }}

        .video-item.loaded .video-placeholder {{
            display: none;
        }}

        /* Mobile Optimizations */
        @media (max-width: 768px) {{
            .header h1 {{
                font-size: 1rem;
            }}

            .header .school-name {{
                font-size: 0.8rem;
            }}

            .tiktok-embed {{
                max-width: 100vw !important;
                width: 100% !important;
            }}

            .video-placeholder {{
                max-width: 100vw;
                width: 100%;
            }}
        }}

        @media (max-width: 480px) {{
            .header {{
                padding: 6px 12px;
            }}

            .tiktok-container {{
                height: calc(100vh - 50px);
            }}

            .video-item {{
                height: calc(100vh - 50px);
            }}
        }}

        /* Smooth Scrolling Enhancement */
        html {{
            scroll-behavior: smooth;
        }}

        /* Performance Optimizations */
        .video-item {{
            will-change: transform;
            contain: layout style paint;
        }}

        /* Loading Animation for Better UX */
        .fade-in {{
            animation: fadeIn 0.5s ease-in-out;
        }}

        @keyframes fadeIn {{
            from {{ opacity: 0; transform: translateY(20px); }}
            to {{ opacity: 1; transform: translateY(0); }}
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>🎵 TikTok</h1>
        <div class="school-name">St. Louis Demonstration JHS</div>
    </div>
    <div class="tiktok-container">
"""
        
        for i, video in enumerate(self.videos):
            html_content += f"""
        <div class="video-item loading fade-in" id="video-{i}">
            <!-- Silver Shimmer Loading Placeholder -->
            <div class="video-placeholder"></div>

            <!-- TikTok Embed -->
            <blockquote class="tiktok-embed"
                       cite="{video['url']}"
                       data-video-id="{video['id']}"
                       data-unique-id="{video['username']}"
                       style="max-width: 325px; min-height: 578px;">
                <section>
                    <a target="_blank"
                       title="@{video['username']}"
                       href="{video['url']}">
                        @{video['username']} on TikTok
                    </a>
                </section>
            </blockquote>
        </div>
"""
        
        html_content += f"""
    </div>

    <script>
        // Enhanced TikTok Loading with Performance Optimizations
        document.addEventListener('DOMContentLoaded', function() {{
            // Preload and optimize TikTok embeds
            const videoItems = document.querySelectorAll('.video-item');
            let loadedCount = 0;

            // Intersection Observer for lazy loading
            const observer = new IntersectionObserver((entries) => {{
                entries.forEach(entry => {{
                    if (entry.isIntersecting) {{
                        loadVideo(entry.target);
                        observer.unobserve(entry.target);
                    }}
                }});
            }}, {{
                rootMargin: '50px',
                threshold: 0.1
            }});

            // Observe all video items
            videoItems.forEach(item => {{
                observer.observe(item);
            }});

            function loadVideo(videoItem) {{
                const embed = videoItem.querySelector('.tiktok-embed');
                if (embed) {{
                    // Add loading class for shimmer effect
                    videoItem.classList.add('loading');

                    // Simulate network delay then show video
                    setTimeout(() => {{
                        videoItem.classList.remove('loading');
                        videoItem.classList.add('loaded');
                        loadedCount++;

                        // Trigger TikTok embed refresh
                        if (window.tiktokEmbed) {{
                            window.tiktokEmbed.lib.render(embed);
                        }}
                    }}, Math.random() * 1000 + 500); // Random delay 0.5-1.5s for realistic loading
                }}
            }}

            // Enhanced scroll behavior for native TikTok feel
            const container = document.querySelector('.tiktok-container');
            let isScrolling = false;

            container.addEventListener('scroll', () => {{
                if (!isScrolling) {{
                    window.requestAnimationFrame(() => {{
                        // Add any scroll-based animations here
                        isScrolling = false;
                    }});
                    isScrolling = true;
                }}
            }});

            // Keyboard navigation (up/down arrows)
            document.addEventListener('keydown', (e) => {{
                if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {{
                    e.preventDefault();
                    const currentVideo = getCurrentVideo();
                    const nextVideo = e.key === 'ArrowDown' ?
                        currentVideo?.nextElementSibling :
                        currentVideo?.previousElementSibling;

                    if (nextVideo) {{
                        nextVideo.scrollIntoView({{ behavior: 'smooth', block: 'start' }});
                    }}
                }}
            }});

            function getCurrentVideo() {{
                const videos = Array.from(videoItems);
                const containerRect = container.getBoundingClientRect();

                return videos.find(video => {{
                    const rect = video.getBoundingClientRect();
                    return rect.top >= containerRect.top && rect.top < containerRect.bottom;
                }});
            }}

            // Performance: Pause videos not in view
            const pauseObserver = new IntersectionObserver((entries) => {{
                entries.forEach(entry => {{
                    const iframe = entry.target.querySelector('iframe');
                    if (iframe) {{
                        if (!entry.isIntersecting) {{
                            // Video out of view - could pause here if TikTok API allows
                        }}
                    }}
                }});
            }}, {{ threshold: 0.5 }});

            videoItems.forEach(item => {{
                pauseObserver.observe(item);
            }});
        }});

        // TikTok embed callback for when script loads
        window.addEventListener('load', () => {{
            if (window.tiktokEmbed) {{
                // Force render all embeds
                document.querySelectorAll('.tiktok-embed').forEach(embed => {{
                    window.tiktokEmbed.lib.render(embed);
                }});
            }}
        }});
    </script>
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
