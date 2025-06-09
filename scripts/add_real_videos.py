#!/usr/bin/env python3
"""
🎵 Add Real TikTok Videos to St. Louis Demo JHS Collection
Simple script to add real TikTok videos using the new TikTok Manager
"""

import sys
import os

# Add scripts directory to path so we can import tiktok_manager
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from tiktok_manager import TikTokManager

def add_videos_interactive():
    """Interactive mode to add videos"""
    manager = TikTokManager()
    
    print("🎵 Add Real TikTok Videos to St. Louis Demo JHS")
    print("=" * 50)
    print("📝 Instructions:")
    print("1. Find TikTok videos about your school")
    print("2. Copy the video URLs")
    print("3. Paste them here one by one")
    print("4. Press Enter with empty URL to finish")
    print()
    
    added_count = 0
    
    while True:
        url = input("🔗 Enter TikTok URL (or press Enter to finish): ").strip()
        
        if not url:
            break
        
        if 'tiktok.com' not in url:
            print("❌ Please enter a valid TikTok URL")
            continue
        
        description = input("📝 Enter description (optional): ").strip()
        
        # Ask for additional details
        print("📊 Optional details (press Enter to skip):")
        username = input("👤 Username: ").strip()
        likes = input("👍 Likes: ").strip()
        comments = input("💬 Comments: ").strip()
        shares = input("🔄 Shares: ").strip()
        
        manual_data = {}
        if username:
            manual_data['username'] = username
        if likes:
            manual_data['likes'] = likes
        if comments:
            manual_data['comments'] = comments
        if shares:
            manual_data['shares'] = shares
        
        if manager.add_video(url, description, manual_data if manual_data else None):
            added_count += 1
            print(f"✅ Added video #{added_count}")
        
        print()
    
    if added_count > 0:
        manager.save_videos()
        manager.generate_html()
        print(f"🎉 Successfully added {added_count} videos!")
        print(f"📄 JSON file: {manager.output_file}")
        print(f"🌐 HTML file: {manager.html_file}")
    else:
        print("No videos added.")
    
    return added_count

def add_sample_videos():
    """Add sample videos for demonstration"""
    manager = TikTokManager()
    
    print("🎬 Adding sample videos for demonstration...")
    
    if manager.add_sample_videos():
        manager.save_videos()
        manager.generate_html()
        print("✅ Sample videos added successfully!")
        print(f"📄 JSON file: {manager.output_file}")
        print(f"🌐 HTML file: {manager.html_file}")
    else:
        print("❌ Failed to add sample videos")

def show_examples():
    """Show examples of how to find real TikTok videos"""
    print("🎵 How to Find Real TikTok Videos About Your School")
    print("=" * 60)
    print()
    print("🔍 Search Terms to Try:")
    print("   - 'St. Louis Demo JHS'")
    print("   - 'St. Louis Demonstration JHS'")
    print("   - 'Demonstration JHS Ghana'")
    print("   - Your school's location + 'school'")
    print("   - Your school's hashtags")
    print()
    print("📹 Types of Videos to Look For:")
    print("   - Student performances and talents")
    print("   - School events and ceremonies")
    print("   - Graduation ceremonies")
    print("   - Sports activities")
    print("   - Academic achievements")
    print("   - School tours")
    print("   - Teacher spotlights")
    print()

def main():
    """Main function"""
    if len(sys.argv) > 1:
        command = sys.argv[1].lower()
        
        if command == 'sample':
            add_sample_videos()
        elif command == 'examples':
            show_examples()
        elif command == 'help':
            print("🎵 TikTok Video Adder for St. Louis Demo JHS")
            print("Usage:")
            print("  python scripts/add_real_videos.py           # Interactive mode")
            print("  python scripts/add_real_videos.py sample    # Add sample videos")
            print("  python scripts/add_real_videos.py examples  # Show examples")
            print("  python scripts/add_real_videos.py help      # Show this help")
        else:
            print(f"Unknown command: {command}")
            print("Use 'help' to see available commands")
    else:
        # Interactive mode
        add_videos_interactive()

if __name__ == "__main__":
    main()
