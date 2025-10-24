# Environment Setup Guide

## 🔧 Required Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# Groq API Configuration (for both AI and Speech-to-Text)
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

### **AI Service: Groq Platform with Qwen3-32B**
- Primary Model: `qwen/qwen3-32b` (32B parameters with advanced reasoning)
- Fallback Models: `moonshotai/kimi-k2-instruct-0905`, `openai/gpt-oss-120b` (120B parameters), `openai/gpt-oss-20b` (20B parameters)
- Vision Model: `meta-llama/llama-4-maverick-17b-128e-instruct` (128K context, 17B parameters)
- Advanced language understanding and generation with hidden thinking mode
- OpenAI-compatible API format
- Fast inference with Groq's optimized infrastructure
- Enhanced reasoning capabilities with hidden reasoning process
- Multi-language support with excellent reasoning capabilities
- **Image Analysis**: Upload and analyze images with detailed descriptions

### **Speech-to-Text Service: Whisper via Groq**
- Model: `whisper-large-v3`
- Advanced speech recognition and transcription
- Multi-language support
- High accuracy audio processing
- Same API key as AI service

## 🎯 Benefits

- ✅ **Simple Setup**: Only one API key needed
- ✅ **High Performance**: Fast, reliable responses with Qwen3-32B and fallbacks
- ✅ **Hidden Thinking Mode**: Advanced AI reasoning process with hidden thinking
- ✅ **Speech Recognition**: Voice input with Whisper API
- ✅ **Image Analysis**: Upload and analyze images with detailed descriptions
- ✅ **Cost Effective**: Free tiers available
- ✅ **Educational Focus**: Optimized for school information
- ✅ **Easy Maintenance**: Single API key for both services
- ✅ **Accessibility**: Voice input and image analysis for better user experience
- ✅ **Enhanced Reasoning**: 32B parameter model with advanced reasoning capabilities
- ✅ **Multi-language Support**: Excellent reasoning and language capabilities
- ✅ **Robust Fallbacks**: Multiple model fallbacks for reliability
- ✅ **Visual Learning**: Analyze diagrams, charts, and educational images