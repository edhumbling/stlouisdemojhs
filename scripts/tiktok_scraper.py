#!/usr/bin/env python3
"""
TikTok Video Scraper for St. Louis Demonstration JHS
Automatically searches for and publishes TikTok videos mentioning the school
"""

import json
import os
import re
import time
import logging
from datetime import datetime
from typing import List, Dict, Optional
import requests
from bs4 import BeautifulSoup

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('tiktok_scraper.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class TikTokScraper:
    def __init__(self):
        self.search_terms = [
            "St. Louis Demo JHS",
            "Demonstration JHS",
            "St Louis Demonstration",
            "StLouisDemoJHS"
        ]
        self.output_file = "public/tiktok-videos.json"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })

    def search_tiktok_videos(self, search_term: str) -> List[Dict]:
        """
        Search for TikTok videos using web scraping
        Note: This is a simplified version. In production, you might want to use:
        - TikTok Research API (requires approval)
        - Third-party APIs like RapidAPI TikTok scrapers
        - Selenium for dynamic content
        """
        videos = []
        
        try:
            # Simulate TikTok search (this is a placeholder - actual implementation would vary)
            logger.info(f"Searching for videos with term: {search_term}")
            
            # For demonstration, we'll create sample data
            # In a real implementation, you would scrape actual TikTok data
            sample_videos = self._generate_sample_videos(search_term)
            videos.extend(sample_videos)
            
            time.sleep(2)  # Rate limiting
            
        except Exception as e:
            logger.error(f"Error searching for {search_term}: {str(e)}")
        
        return videos

    def _generate_sample_videos(self, search_term: str) -> List[Dict]:
        """
        Generate sample video data for demonstration
        Replace this with actual TikTok scraping logic
        """
        sample_videos = [
            {
                "id": "7234567890123456789",
                "url": "https://www.tiktok.com/@stlouisdemo/video/7234567890123456789",
                "username": "stlouisdemo",
                "description": f"Amazing students at {search_term} showing their talents! #education #ghana #school",
                "date": datetime.now().strftime("%Y-%m-%d"),
                "likes": "1.2K",
                "comments": "45",
                "shares": "23",
                "verified": True
            },
            {
                "id": "7234567890123456790",
                "url": "https://www.tiktok.com/@ghanaschools/video/7234567890123456790",
                "username": "ghanaschools",
                "description": f"Visit to {search_term} - incredible learning environment! #ghanaschools #education",
                "date": datetime.now().strftime("%Y-%m-%d"),
                "likes": "856",
                "comments": "32",
                "shares": "18",
                "verified": False
            }
        ]
        
        return sample_videos

    def filter_relevant_videos(self, videos: List[Dict]) -> List[Dict]:
        """
        Filter videos to ensure they actually mention our school
        """
        filtered_videos = []
        
        for video in videos:
            description = video.get('description', '').lower()
            
            # Check if any of our search terms appear in the description
            for term in self.search_terms:
                if term.lower() in description:
                    filtered_videos.append(video)
                    logger.info(f"Found relevant video: {video['id']}")
                    break
        
        return filtered_videos

    def generate_html_embeds(self, videos: List[Dict]) -> str:
        """
        Generate HTML with TikTok embed codes
        """
        html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>St. Louis Demo JHS on TikTok</title>
    <script async src="https://www.tiktok.com/embed.js"></script>
    <style>
        body { font-family: Arial, sans-serif; background: #000; color: #fff; padding: 20px; }
        .video-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .video-item { background: #111; padding: 20px; border-radius: 10px; }
        h1 { text-align: center; color: #ff0050; }
    </style>
</head>
<body>
    <h1>🎵 St. Louis Demonstration JHS on TikTok</h1>
    <div class="video-grid">
"""
        
        for video in videos:
            html_content += f"""
        <div class="video-item">
            <blockquote class="tiktok-embed" cite="{video['url']}" data-video-id="{video['id']}">
                <section>
                    <a target="_blank" title="@{video['username']}" href="https://www.tiktok.com/@{video['username']}">@{video['username']}</a>
                    <p>{video['description']}</p>
                    <a target="_blank" title="♬ original sound" href="{video['url']}">♬ original sound</a>
                </section>
            </blockquote>
            <div style="margin-top: 10px; font-size: 12px; color: #888;">
                <p>👤 @{video['username']} | 📅 {video['date']}</p>
                <p>❤️ {video['likes']} | 💬 {video['comments']} | 🔄 {video['shares']}</p>
            </div>
        </div>
"""
        
        html_content += """
    </div>
    <footer style="text-align: center; margin-top: 40px; color: #666;">
        <p>Videos automatically updated weekly | Last update: """ + datetime.now().strftime("%Y-%m-%d %H:%M:%S") + """</p>
    </footer>
</body>
</html>
"""
        
        return html_content

    def save_videos_json(self, videos: List[Dict]) -> None:
        """
        Save videos data as JSON for the React component
        """
        data = {
            "last_updated": datetime.now().isoformat(),
            "total_videos": len(videos),
            "videos": videos
        }
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(self.output_file), exist_ok=True)
        
        with open(self.output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Saved {len(videos)} videos to {self.output_file}")

    def save_html_file(self, html_content: str) -> None:
        """
        Save HTML file with embedded videos
        """
        html_file = "public/tiktok-videos.html"
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        logger.info(f"Saved HTML file to {html_file}")

    def run(self) -> None:
        """
        Main execution function
        """
        logger.info("Starting TikTok video scraper for St. Louis Demo JHS")
        
        all_videos = []
        
        # Search for videos with each term
        for term in self.search_terms:
            videos = self.search_tiktok_videos(term)
            all_videos.extend(videos)
        
        # Remove duplicates based on video ID
        unique_videos = []
        seen_ids = set()
        
        for video in all_videos:
            if video['id'] not in seen_ids:
                unique_videos.append(video)
                seen_ids.add(video['id'])
        
        # Filter for relevance
        relevant_videos = self.filter_relevant_videos(unique_videos)
        
        if relevant_videos:
            # Generate HTML embeds
            html_content = self.generate_html_embeds(relevant_videos)
            
            # Save files
            self.save_videos_json(relevant_videos)
            self.save_html_file(html_content)
            
            logger.info(f"Successfully processed {len(relevant_videos)} relevant videos")
        else:
            logger.info("No relevant videos found")
            # Save empty data
            self.save_videos_json([])

def main():
    """
    Main function for command line execution
    """
    scraper = TikTokScraper()
    scraper.run()

if __name__ == "__main__":
    main()
