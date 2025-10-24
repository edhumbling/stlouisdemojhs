# Environment Setup Guide

## 🔧 Required Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# Groq API Configuration
VITE_GROQ_API_KEY=your_groq_api_key_here
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

### **AI Service: Groq Platform with Llama Guard**
- Model: `meta-llama/llama-guard-4-12b`
- Advanced content moderation and safety features
- OpenAI-compatible API format
- Fast inference with Groq's optimized infrastructure

## 🎯 Benefits

- ✅ **Simple Setup**: Only one API key needed
- ✅ **High Performance**: Fast, reliable responses
- ✅ **Cost Effective**: Free tier available
- ✅ **Educational Focus**: Optimized for school information
- ✅ **Easy Maintenance**: Single service to manage