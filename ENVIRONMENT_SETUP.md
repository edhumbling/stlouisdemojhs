# Environment Setup Guide

## 🔧 Required Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# Gemini API Configuration
VITE_GEMINI_API_KEY=your_huggingface_token_here
VITE_GEMINI_BACKUP_API_KEY=your_backup_gemini_key_here
VITE_GEMINI_SECOND_BACKUP_API_KEY=your_second_backup_gemini_key_here
VITE_GEMINI_THIRD_BACKUP_API_KEY=your_third_backup_gemini_key_here

# Hugging Face Configuration
VITE_HF_TOKEN=your_huggingface_token_here

# AI Service Configuration
VITE_DEFAULT_AI_SERVICE=gemini
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

### **Primary Service: Gemini**
- Uses Hugging Face token as primary key
- 4 backup API keys for failover
- Automatic switching on rate limits

### **Fallback Service: Hugging Face**
- 5 different models available
- Automatic model switching
- Optimized for different use cases

## 🎯 Benefits

- ✅ **Maximum Reliability**: Multiple AI services and models
- ✅ **Automatic Failover**: Seamless switching between services
- ✅ **Rate Limit Protection**: Multiple backup options
- ✅ **High Performance**: Optimized model selection
