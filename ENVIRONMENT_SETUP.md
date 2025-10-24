# Environment Setup Guide

## 🔧 Required Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# Gemini API Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_BACKUP_API_KEY=your_backup_gemini_key_here
VITE_GEMINI_SECOND_BACKUP_API_KEY=your_second_backup_gemini_key_here
VITE_GEMINI_THIRD_BACKUP_API_KEY=your_third_backup_gemini_key_here
```

## 🚀 Quick Start

1. **Copy the environment variables above into a `.env` file**
2. **Run the application**: `npm run dev`
3. **Test the AI**: Visit `/louis-ai` and start chatting!

## 🔒 Security Notes

- The `.env` file should be added to `.gitignore`
- Never commit API keys to version control
- For production, consider using a backend proxy to hide tokens

## 📊 Service Configuration

### **AI Service: Gemini**
- Primary API key with 3 backup keys
- Automatic switching on rate limits
- High-quality responses for educational content

## 🎯 Benefits

- ✅ **Maximum Reliability**: Multiple API keys for failover
- ✅ **Automatic Failover**: Seamless switching between keys
- ✅ **Rate Limit Protection**: Multiple backup options
- ✅ **High Performance**: Optimized for educational use