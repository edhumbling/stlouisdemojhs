# Environment Setup Guide

## 🔧 Required Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# DeepSeek API Configuration
VITE_DEEPSEEK_API_KEY=sk-fbc36b72981b4937ad44ff8e20e63ba5
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

### **AI Service: DeepSeek Platform Direct API**
- Model: `deepseek-chat` (DeepSeek-V3.2-Exp)
- Direct access to DeepSeek's latest model
- OpenAI-compatible API format
- Advanced reasoning and problem-solving capabilities

## 🎯 Benefits

- ✅ **Simple Setup**: Only one API key needed
- ✅ **High Performance**: Fast, reliable responses
- ✅ **Cost Effective**: Free tier available
- ✅ **Educational Focus**: Optimized for school information
- ✅ **Easy Maintenance**: Single service to manage