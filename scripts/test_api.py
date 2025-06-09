#!/usr/bin/env python3
"""
Test script for RapidAPI TikTok Scraper
Run this to verify your API key works before deploying
"""

import os
import requests
import json
from datetime import datetime

def test_rapidapi_connection():
    """Test the RapidAPI TikTok Scraper connection"""
    
    # Your API key from the screenshot
    api_key = "159be58078msh565c766573919f8p1a8008jsn60a5afb4a615"
    host = "tiktok-scraper7.p.rapidapi.com"
    
    headers = {
        'X-RapidAPI-Key': api_key,
        'X-RapidAPI-Host': host
    }
    
    # Test search endpoint
    url = f"https://{host}/feed/search"
    
    params = {
        'keywords': 'St. Louis Demo JHS',
        'region': 'US',
        'count': '10',  # Conservative count for testing (respecting 300/month limit)
        'publish_time': '0',
        'sort_type': '0'
    }
    
    print("🔍 Testing RapidAPI TikTok Scraper...")
    print(f"📡 API Host: {host}")
    print(f"🔑 API Key: {api_key[:20]}...")
    print(f"🎯 Search Term: {params['keywords']}")
    print("📊 API Limits (Basic Plan):")
    print("   • 300 requests/month")
    print("   • 120 requests/minute")
    print("   • This test uses 1 request")
    print("-" * 50)
    
    try:
        response = requests.get(url, headers=headers, params=params, timeout=30)
        
        print(f"📊 Status Code: {response.status_code}")
        print(f"📝 Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            print("✅ API Connection Successful!")
            print(f"📦 Response Keys: {list(data.keys())}")
            
            # Try to find video data
            video_count = 0
            if 'data' in data and 'aweme_list' in data['data']:
                video_count = len(data['data']['aweme_list'])
            elif 'aweme_list' in data:
                video_count = len(data['aweme_list'])
            elif 'videos' in data:
                video_count = len(data['videos'])
            
            print(f"🎬 Videos Found: {video_count}")
            
            # Save response for inspection
            with open('api_test_response.json', 'w') as f:
                json.dump(data, f, indent=2)
            print("💾 Full response saved to 'api_test_response.json'")
            
            return True
            
        elif response.status_code == 401:
            print("❌ Authentication Failed!")
            print("🔧 Check your RapidAPI key")
            return False
            
        elif response.status_code == 403:
            print("❌ Access Forbidden!")
            print("🔧 Check your subscription status")
            return False
            
        elif response.status_code == 429:
            print("❌ Rate Limit Exceeded!")
            print("🔧 Wait before trying again")
            return False
            
        else:
            print(f"❌ API Error: {response.status_code}")
            print(f"📄 Response: {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        print("❌ Request Timeout!")
        print("🔧 API might be slow, try again")
        return False
        
    except requests.exceptions.RequestException as e:
        print(f"❌ Request Error: {e}")
        return False
        
    except json.JSONDecodeError:
        print("❌ Invalid JSON Response!")
        print(f"📄 Raw Response: {response.text}")
        return False

def test_environment_setup():
    """Test if environment is properly configured"""
    print("\n🔧 Testing Environment Setup...")
    print("-" * 50)
    
    # Check if API key is in environment
    env_key = os.getenv('RAPIDAPI_KEY')
    if env_key:
        print(f"✅ Environment API Key Found: {env_key[:20]}...")
    else:
        print("⚠️  No RAPIDAPI_KEY in environment variables")
        print("💡 You can set it with: export RAPIDAPI_KEY='your_key_here'")
    
    # Check Python packages
    try:
        import requests
        print("✅ requests package available")
    except ImportError:
        print("❌ requests package missing")
        print("💡 Install with: pip install requests")
    
    try:
        import beautifulsoup4
        print("✅ beautifulsoup4 package available")
    except ImportError:
        print("⚠️  beautifulsoup4 package missing (optional)")

if __name__ == "__main__":
    print("🎵 TikTok API Test Script")
    print("=" * 50)
    
    # Test environment
    test_environment_setup()
    
    # Test API connection
    success = test_rapidapi_connection()
    
    print("\n" + "=" * 50)
    if success:
        print("🎉 All tests passed! Your API is ready to use.")
        print("🚀 You can now run the main scraper script.")
    else:
        print("❌ Tests failed. Please check the issues above.")
        print("📞 Contact RapidAPI support if problems persist.")
    
    print("\n💡 Next steps:")
    print("1. Add your API key to GitHub Secrets as 'RAPIDAPI_KEY'")
    print("2. Run the main scraper: python scripts/tiktok_scraper.py")
    print("3. Check the generated files in public/ folder")
