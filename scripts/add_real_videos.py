#!/usr/bin/env python3
"""
Script to help add real TikTok videos about St. Louis Demo JHS
This script helps you manually curate real TikTok videos for your school
"""

import json
import re
from datetime import datetime
from typing import Dict, List

def extract_video_id_from_url(url: str) -> str:
    """
    Extract TikTok video ID from URL
    Supports various TikTok URL formats
    """
    patterns = [
        r'tiktok\.com/@[^/]+/video/(\d+)',
        r'vm\.tiktok\.com/([A-Za-z0-9]+)',
        r'tiktok\.com/t/([A-Za-z0-9]+)',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    
    return "unknown"

def extract_username_from_url(url: str) -> str:
    """
    Extract username from TikTok URL
    """
    match = re.search(r'tiktok\.com/@([^/]+)', url)
    if match:
        return match.group(1)
    return "unknown"

def create_video_entry(url: str, description: str, date: str = None) -> Dict:
    """
    Create a video entry from a TikTok URL
    """
    if not date:
        date = datetime.now().strftime("%Y-%m-%d")
    
    video_id = extract_video_id_from_url(url)
    username = extract_username_from_url(url)
    
    return {
        "id": video_id,
        "url": url,
        "username": username,
        "description": description,
        "date": date,
        "likes": "0",  # Will be updated when video loads
        "comments": "0",
        "shares": "0",
        "verified": False
    }

def add_videos_interactive():
    """
    Interactive script to add real TikTok videos
    """
    print("🎵 Add Real TikTok Videos for St. Louis Demo JHS")
    print("=" * 60)
    print()
    print("Instructions:")
    print("1. Find TikTok videos about your school")
    print("2. Copy the video URLs")
    print("3. Enter them below with descriptions")
    print("4. The script will update your video database")
    print()
    
    videos = []
    
    while True:
        print("-" * 40)
        url = input("Enter TikTok video URL (or 'done' to finish): ").strip()
        
        if url.lower() == 'done':
            break
            
        if not url or 'tiktok.com' not in url:
            print("❌ Please enter a valid TikTok URL")
            continue
            
        description = input("Enter video description: ").strip()
        if not description:
            description = "Video about St. Louis Demo JHS"
            
        date = input("Enter date (YYYY-MM-DD) or press Enter for today: ").strip()
        
        video = create_video_entry(url, description, date if date else None)
        videos.append(video)
        
        print(f"✅ Added video: @{video['username']} - {video['description'][:50]}...")
        print()
    
    if videos:
        save_videos(videos)
        print(f"🎉 Successfully added {len(videos)} videos!")
        print("Run the scraper to update your website: python scripts/tiktok_scraper.py")
    else:
        print("No videos added.")

def save_videos(videos: List[Dict]):
    """
    Save videos to the curated videos section of the scraper
    """
    # Read current scraper file
    with open('scripts/tiktok_scraper.py', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create the new curated videos section
    curated_section = create_curated_videos_code(videos)
    
    # Replace the existing curated videos section
    pattern = r'curated_videos = \{.*?\}'
    replacement = f'curated_videos = {curated_section}'
    
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # Write back to file
    with open('scripts/tiktok_scraper.py', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"💾 Updated scripts/tiktok_scraper.py with {len(videos)} videos")

def create_curated_videos_code(videos: List[Dict]) -> str:
    """
    Create the Python code for curated videos
    """
    st_louis_videos = []
    demo_videos = []
    
    for video in videos:
        desc_lower = video['description'].lower()
        if 'st. louis demo' in desc_lower or 'st louis demo' in desc_lower:
            st_louis_videos.append(video)
        elif 'demonstration' in desc_lower:
            demo_videos.append(video)
        else:
            st_louis_videos.append(video)  # Default to St. Louis category
    
    code = "{\n"
    
    if st_louis_videos:
        code += '            "St. Louis Demo JHS": [\n'
        for video in st_louis_videos:
            code += f'''                {{
                    "id": "{video['id']}",
                    "url": "{video['url']}",
                    "username": "{video['username']}",
                    "description": "{video['description']}",
                    "date": "{video['date']}",
                    "likes": "{video['likes']}",
                    "comments": "{video['comments']}",
                    "shares": "{video['shares']}",
                    "verified": {str(video['verified']).lower()}
                }},\n'''
        code += '            ],\n'
    
    if demo_videos:
        code += '            "Demonstration JHS": [\n'
        for video in demo_videos:
            code += f'''                {{
                    "id": "{video['id']}",
                    "url": "{video['url']}",
                    "username": "{video['username']}",
                    "description": "{video['description']}",
                    "date": "{video['date']}",
                    "likes": "{video['likes']}",
                    "comments": "{video['comments']}",
                    "shares": "{video['shares']}",
                    "verified": {str(video['verified']).lower()}
                }},\n'''
        code += '            ]\n'
    
    code += "        }"
    return code

def example_videos():
    """
    Show example of how to find and add videos
    """
    print("🎵 Example: How to Find Real TikTok Videos")
    print("=" * 50)
    print()
    print("1. Search TikTok for:")
    print("   - 'St. Louis Demo JHS'")
    print("   - 'Demonstration JHS Ghana'")
    print("   - Your school's location + 'school'")
    print("   - Your school's hashtags")
    print()
    print("2. Look for videos that mention your school:")
    print("   - Student performances")
    print("   - School events")
    print("   - Graduation ceremonies")
    print("   - Sports activities")
    print("   - Academic achievements")
    print()
    print("3. Copy the video URLs (they look like):")
    print("   - https://www.tiktok.com/@username/video/1234567890123456789")
    print("   - https://vm.tiktok.com/ABC123/")
    print()
    print("4. Run this script to add them:")
    print("   python scripts/add_real_videos.py")
    print()

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == 'example':
        example_videos()
    else:
        add_videos_interactive()
