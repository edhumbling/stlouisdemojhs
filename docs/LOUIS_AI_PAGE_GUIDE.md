# Louis AI Page - User Guide

## Overview

Louis AI is an intelligent conversational assistant for St. Louis Demonstration JHS, featuring a modern ChatGPT/Grok-style interface. It uses Google's Gemini 2.0 Flash API with Retrieval-Augmented Generation (RAG) to provide accurate, contextual answers about the school.

## Features

### 🎨 ChatGPT/Grok-Style Interface
- **Clean, Modern Design**: Full-screen chat interface with gradient header
- **Smooth Animations**: Message transitions and loading indicators
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Auto-Scrolling**: Automatically scrolls to show latest messages

### 🧠 Powered by Advanced AI
- **Google Gemini 2.0 Flash**: Fast, intelligent responses
- **RAG Technology**: Retrieves relevant information from 21+ knowledge chunks
- **Contextual Understanding**: Maintains conversation history for better context
- **Accurate Responses**: Based on real school website data

### 📚 Source Citations
- **Transparent Sources**: Every response shows where information came from
- **Clickable Links**: Blue pill-style badges link to source pages
- **Source Deduplication**: Unique sources shown per response
- **Trust & Verify**: Users can verify information directly

### ✨ Smart Features
- **Suggested Questions**: 6 pre-written questions to get started
- **Auto-Expanding Input**: Text area grows as you type
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line
- **Loading States**: Animated indicators show AI is thinking
- **Error Handling**: Graceful error messages if something goes wrong

## How to Use

### 1. Access Louis AI
Navigate to: `https://www.stlouisdemojhs.com/louis-ai`

Or click "Louis AI" in the navigation menu.

### 2. Start a Conversation

**Option A: Use Suggested Questions**
- Click any of the 6 suggested question cards on the welcome screen
- Questions cover common topics like location, admissions, programs, etc.

**Option B: Ask Your Own Question**
- Type your question in the input box at the bottom
- Press Enter or click the send button
- Ask about anything related to the school!

### 3. Review Responses
- Responses appear in white chat bubbles with the Louis AI avatar
- Read the detailed answer
- Check the source citations at the bottom (if available)
- Click source badges to visit the original page for more details

### 4. Continue the Conversation
- Ask follow-up questions
- The AI maintains conversation context
- Build on previous questions for deeper understanding

## Example Questions

### School Information
- "Where is the school located?"
- "What is the school's phone number?"
- "When was the school founded?"
- "What are your office hours?"

### Academics
- "What subjects do you teach?"
- "Tell me about the Mathematics program"
- "What STEM programs do you offer?"
- "How many subjects are in the curriculum?"

### Admissions
- "How can I apply for admission?"
- "What are the admission requirements?"
- "When does admission open?"
- "What age group can apply?"

### Facilities & Programs
- "What facilities does the school have?"
- "Do you have a computer lab?"
- "Tell me about the robotics program"
- "What extracurricular activities are available?"

### Financial
- "What are the school fees?"
- "Do you offer scholarships?"
- "How can I donate to the school?"

## Technical Details

### Architecture

```
User Question
    ↓
RAG Engine (searches knowledge base)
    ↓
Relevant Context Retrieved
    ↓
Gemini API (generates response with context)
    ↓
Response + Source Citations
    ↓
Display to User
```

### Knowledge Base Coverage

The system has access to 21+ comprehensive knowledge chunks covering:

1. **Contact & Location** - Address, GPS, phone, emails
2. **General Information** - History, mission, vision, values
3. **Academics** - All 11 JHS subjects with details
4. **Programs** - STEM, Robotics, Space Exploration, Coding
5. **Admissions** - Requirements, process, age groups
6. **Facilities** - Infrastructure, labs, equipment
7. **Faculty** - Teachers, qualifications, professional development
8. **Activities** - Clubs, sports, extracurricular programs
9. **Career Guidance** - SHS placement, career counseling
10. **Student Resources** - Digital learning, AI tools
11. **Financial** - Fees, donations, scholarships
12. **Community** - PTA, Alumni, partnerships
13. **Technology** - Digital infrastructure, innovation
14. **Events** - School calendar, activities

### Source Citation System

Every AI response includes:
- **Source Detection**: RAG engine identifies which knowledge chunks were used
- **Page Mapping**: Chunks are mapped to actual website pages
- **Deduplication**: Unique sources are extracted
- **Link Generation**: Blue pill badges with clickable links
- **Category Context**: Sources include category information

### Performance

- **Response Time**: Typically 2-5 seconds
- **Accuracy**: High - based on verified school data
- **Relevance**: Advanced scoring algorithm ensures best matches
- **Scalability**: Can handle unlimited concurrent users

## Setup for Developers

### 1. Get Gemini API Key

```bash
# Visit Google AI Studio
https://makersuite.google.com/app/apikey

# Create a new API key
# Copy the key
```

### 2. Configure Environment

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Access the Page

Navigate to: `http://localhost:5173/louis-ai`

## Files Structure

```
src/
├── pages/
│   └── LouisAIPage.tsx           # Main chat interface
├── services/
│   ├── geminiService.ts          # Gemini API integration
│   └── ragEngine.ts              # RAG search engine
├── data/
│   └── knowledgeBase.ts          # School knowledge base (21+ chunks)
└── utils/
    └── pageMapping.ts            # Source-to-URL mapping
```

## API Costs

### Gemini 2.0 Flash Pricing (as of 2025)
- **Input**: $0.075 per 1M tokens
- **Output**: $0.30 per 1M tokens

### Estimated Costs
- **Average Query**: ~500 input tokens + ~200 output tokens
- **Cost per Query**: ~$0.0001 (0.01 cents)
- **1000 Queries**: ~$0.10
- **Very cost-effective for school use!**

## Troubleshooting

### "Gemini API key is not configured"
**Solution**: Add `VITE_GEMINI_API_KEY` to your `.env` file

### "No response generated"
**Solution**: Check your API key is valid and has not exceeded quota

### "Error generating response"
**Solution**: 
1. Check internet connection
2. Verify API key is active
3. Check browser console for specific error

### Sources not showing
**Solution**: Ensure knowledge base chunks have proper `source` and `category` fields

### Slow responses
**Possible causes**:
- High API load (retry after a moment)
- Large conversation history (start new chat)
- Network latency

## Best Practices

### For Users
1. **Be Specific**: Ask clear, specific questions
2. **Use Follow-ups**: Build on previous answers
3. **Verify Sources**: Click source links for full details
4. **Start Fresh**: If context gets confused, refresh the page

### For Administrators
1. **Monitor API Usage**: Track daily/monthly API calls
2. **Update Knowledge Base**: Keep `knowledgeBase.ts` current
3. **Review Logs**: Check for common errors or issues
4. **Gather Feedback**: Track which questions are most common

## Future Enhancements

Potential additions:
- [ ] Voice input/output
- [ ] Multi-language support (French, local languages)
- [ ] Image upload for questions
- [ ] Conversation export/sharing
- [ ] Analytics dashboard
- [ ] Admin panel for knowledge base updates
- [ ] Rate limiting for API protection
- [ ] Offline mode with cached responses

## Support

For technical issues:
- Email: emma@stlouisdemojhs.com
- GitHub Issues: [Repository link]

For content/knowledge updates:
- Contact school administration
- Submit pull request to knowledge base

---

**Last Updated**: October 23, 2025  
**Version**: 1.0.0  
**Status**: ✅ Fully Functional
