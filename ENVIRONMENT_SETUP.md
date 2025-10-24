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

### **AI Service: Groq Platform with Kimi K2**
- Primary Model: `moonshotai/kimi-k2-instruct-0905` (Advanced Chinese AI model)
- Fallback Models: `openai/gpt-oss-120b` (120B parameters), `openai/gpt-oss-20b` (20B parameters)
- Advanced language understanding and generation with thinking mode
- OpenAI-compatible API format
- Fast inference with Groq's optimized infrastructure
- Enhanced reasoning capabilities with transparent thinking process
- Multi-language support with excellent Chinese language capabilities

### **Speech-to-Text Service: Whisper via Groq**
- Model: `whisper-large-v3`
- Advanced speech recognition and transcription
- Multi-language support
- High accuracy audio processing
- Same API key as AI service

## 🎯 Benefits

- ✅ **Simple Setup**: Only one API key needed
- ✅ **High Performance**: Fast, reliable responses with Kimi K2 and fallbacks
- ✅ **Thinking Mode**: Transparent AI reasoning process with toggle display
- ✅ **Speech Recognition**: Voice input with Whisper API
- ✅ **Cost Effective**: Free tiers available
- ✅ **Educational Focus**: Optimized for school information
- ✅ **Easy Maintenance**: Single API key for both services
- ✅ **Accessibility**: Voice input for better user experience
- ✅ **Enhanced Reasoning**: Advanced AI model with thinking capabilities
- ✅ **Multi-language Support**: Excellent Chinese language capabilities
- ✅ **Robust Fallbacks**: Multiple model fallbacks for reliability