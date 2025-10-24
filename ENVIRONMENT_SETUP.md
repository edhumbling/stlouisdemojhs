# Environment Setup Guide

## 🔧 Required Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# OpenRouter API Configuration
VITE_OPENROUTER_API_KEY=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
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

### **AI Service: OpenRouter with Hermes 3**
- Model: `nousresearch/hermes-3-llama-3.1-405b:free`
- High-quality responses for educational content
- Free tier available with excellent performance
- Reliable API with excellent uptime

## 🎯 Benefits

- ✅ **Simple Setup**: Only one API key needed
- ✅ **High Performance**: Fast, reliable responses
- ✅ **Cost Effective**: Free tier available
- ✅ **Educational Focus**: Optimized for school information
- ✅ **Easy Maintenance**: Single service to manage