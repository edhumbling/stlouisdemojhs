# Louis AI Chatbot - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interface                            │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Browser Window                          │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │              St. Louis Demo JHS Website              │  │ │
│  │  │                                                      │  │ │
│  │  │  [Header]                                           │  │ │
│  │  │  [Content]                                          │  │ │
│  │  │  [Footer]                                           │  │ │
│  │  │                                                      │  │ │
│  │  │  ┌────────┐  ← Hovering Button (Left Side)         │  │ │
│  │  │  │  💬    │     - St. Louis Favicon                 │  │ │
│  │  │  │ Louis  │     - Pulse Animation                   │  │ │
│  │  │  │   AI   │     - z-index: 9999                     │  │ │
│  │  │  └────────┘                                          │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

                              ↓ (User Clicks)

┌─────────────────────────────────────────────────────────────────┐
│                    Full-Screen Chat Panel                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │  [Header]                                      [X]   │  │ │
│  │  │  🎓 Louis AI Assistant                              │  │ │
│  │  │  Ask me anything about St. Louis Demo JHS           │  │ │
│  │  ├──────────────────────────────────────────────────────┤  │ │
│  │  │  [Message List - Scrollable]                        │  │ │
│  │  │                                                      │  │ │
│  │  │  👋 Welcome to Louis AI!                            │  │ │
│  │  │  I'm here to help you learn about St. Louis...     │  │ │
│  │  │                                                      │  │ │
│  │  │  💡 What programs does St. Louis Demo JHS offer?   │  │ │
│  │  │  📚 Tell me about the academic curriculum          │  │ │
│  │  │  🎓 How can I apply for admission?                 │  │ │
│  │  │                                                      │  │ │
│  │  │  ┌──────────────────────────────────┐              │  │ │
│  │  │  │ User: What STEM programs?        │ (Right)      │  │ │
│  │  │  └──────────────────────────────────┘              │  │ │
│  │  │                                                      │  │ │
│  │  │  ┌──────────────────────────────────┐              │  │ │
│  │  │  │ 🎓 Louis AI: We offer robotics,  │ (Left)       │  │ │
│  │  │  │ space exploration, coding...     │              │  │ │
│  │  │  └──────────────────────────────────┘              │  │ │
│  │  │                                                      │  │ │
│  │  ├──────────────────────────────────────────────────────┤  │ │
│  │  │  [Input Area]                                       │  │ │
│  │  │  ┌────────────────────────────────────┐  ┌──────┐  │  │ │
│  │  │  │ Ask me anything...                 │  │ Send │  │  │ │
│  │  │  └────────────────────────────────────┘  └──────┘  │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
LouisAIChatbot (Root)
├── ChatWidget
│   └── St. Louis Favicon Image
│
└── ChatPanel
    ├── ChatHeader
    │   ├── St. Louis Favicon Logo
    │   ├── Title & Subtitle
    │   └── Close Button (X)
    │
    ├── MessageList
    │   ├── Welcome Message (empty state)
    │   ├── UserMessage (multiple)
    │   │   ├── Message Bubble
    │   │   └── Timestamp
    │   ├── AIMessage (multiple)
    │   │   ├── Avatar (favicon)
    │   │   ├── Message Bubble
    │   │   └── Timestamp
    │   └── Loading Indicator
    │
    └── ChatInput
        ├── Textarea (auto-expanding)
        └── Send Button
```

## Data Flow

```
┌──────────────┐
│     User     │
└──────┬───────┘
       │ 1. Types message
       ↓
┌──────────────────────┐
│    ChatInput         │
│  - Validates input   │
│  - Calls onSend()    │
└──────┬───────────────┘
       │ 2. Message content
       ↓
┌──────────────────────────────┐
│   LouisAIChatbot             │
│  - Checks educational filter │
│  - Adds user message         │
│  - Sets loading state        │
└──────┬───────────────────────┘
       │ 3. Query
       ↓
┌──────────────────────┐
│    RAG Engine        │
│  - Searches index    │
│  - Ranks relevance   │
│  - Returns chunks    │
└──────┬───────────────┘
       │ 4. Context chunks
       ↓
┌──────────────────────────────┐
│   Gemini Service             │
│  - Formats prompt            │
│  - Calls API                 │
│  - Parses response           │
└──────┬───────────────────────┘
       │ 5. AI response
       ↓
┌──────────────────────────────┐
│   LouisAIChatbot             │
│  - Adds AI message           │
│  - Clears loading state      │
│  - Saves to storage          │
└──────┬───────────────────────┘
       │ 6. Updated messages
       ↓
┌──────────────────────┐
│   MessageList        │
│  - Renders messages  │
│  - Auto-scrolls      │
└──────────────────────┘
```

## Service Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │           LouisAIChatbot Component                 │ │
│  └────────┬──────────────────────┬────────────────────┘ │
│           │                      │                       │
│           ↓                      ↓                       │
│  ┌────────────────┐    ┌────────────────┐              │
│  │  RAG Engine    │    │ Gemini Service │              │
│  │  - Index       │    │ - API calls    │              │
│  │  - Search      │    │ - Prompts      │              │
│  │  - Cache       │    │ - Parsing      │              │
│  └────────┬───────┘    └────────┬───────┘              │
│           │                      │                       │
│           ↓                      ↓                       │
│  ┌────────────────┐    ┌────────────────┐              │
│  │  localStorage  │    │  Gemini API    │              │
│  │  - Index cache │    │  (External)    │              │
│  │  - Sessions    │    │                │              │
│  └────────────────┘    └────────────────┘              │
└─────────────────────────────────────────────────────────┘
```

## RAG Engine Flow

```
┌─────────────────────────────────────────────────────────┐
│                    RAG Engine                            │
│                                                          │
│  1. Initialization                                       │
│     ┌──────────────────────────────────────┐            │
│     │ Check localStorage for cached index  │            │
│     └──────────┬───────────────────────────┘            │
│                │                                         │
│                ↓                                         │
│     ┌──────────────────────────────────────┐            │
│     │ If not cached: Build new index       │            │
│     │ - Index static content (10 chunks)   │            │
│     │ - Save to localStorage                │            │
│     └──────────────────────────────────────┘            │
│                                                          │
│  2. Search Process                                       │
│     ┌──────────────────────────────────────┐            │
│     │ User query: "What STEM programs?"    │            │
│     └──────────┬───────────────────────────┘            │
│                │                                         │
│                ↓                                         │
│     ┌──────────────────────────────────────┐            │
│     │ Tokenize: ["what", "stem", "programs"]│           │
│     └──────────┬───────────────────────────┘            │
│                │                                         │
│                ↓                                         │
│     ┌──────────────────────────────────────┐            │
│     │ Score each chunk:                    │            │
│     │ - Title match: +10 points            │            │
│     │ - Keyword match: +5 points           │            │
│     │ - Content match: +2 points each      │            │
│     └──────────┬───────────────────────────┘            │
│                │                                         │
│                ↓                                         │
│     ┌──────────────────────────────────────┐            │
│     │ Sort by score, return top 5 chunks   │            │
│     └──────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

## Gemini API Integration

```
┌─────────────────────────────────────────────────────────┐
│                  Gemini Service                          │
│                                                          │
│  1. Request Formatting                                   │
│     ┌──────────────────────────────────────┐            │
│     │ System Prompt Template               │            │
│     │ + Retrieved Context (RAG)            │            │
│     │ + Conversation History (last 6)      │            │
│     │ + User Question                      │            │
│     └──────────┬───────────────────────────┘            │
│                │                                         │
│                ↓                                         │
│     ┌──────────────────────────────────────┐            │
│     │ Format as Gemini API request:        │            │
│     │ {                                    │            │
│     │   contents: [{                       │            │
│     │     parts: [{ text: "..." }]         │            │
│     │   }]                                 │            │
│     │ }                                    │            │
│     └──────────┬───────────────────────────┘            │
│                │                                         │
│                ↓                                         │
│  2. API Call                                             │
│     ┌──────────────────────────────────────┐            │
│     │ POST to Gemini API                   │            │
│     │ - Add API key in URL                 │            │
│     │ - Set Content-Type header            │            │
│     │ - Send request body                  │            │
│     └──────────┬───────────────────────────┘            │
│                │                                         │
│                ↓                                         │
│  3. Response Parsing                                     │
│     ┌──────────────────────────────────────┐            │
│     │ Extract text from:                   │            │
│     │ response.candidates[0]               │            │
│     │   .content.parts[0].text             │            │
│     └──────────┬───────────────────────────┘            │
│                │                                         │
│                ↓                                         │
│     ┌──────────────────────────────────────┐            │
│     │ Return formatted response            │            │
│     └──────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

## Storage Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   localStorage                           │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  louis-ai-content-index                            │ │
│  │  {                                                 │ │
│  │    version: "1.0.0",                               │ │
│  │    chunks: [...],                                  │ │
│  │    timestamp: 1234567890                           │ │
│  │  }                                                 │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  louis-ai-session-{sessionId}                      │ │
│  │  {                                                 │ │
│  │    id: "session-123",                              │ │
│  │    messages: [...],                                │ │
│  │    createdAt: Date,                                │ │
│  │    lastActivity: Date                              │ │
│  │  }                                                 │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  louis-ai-session-list                             │ │
│  │  ["session-123", "session-456", ...]               │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Responsive Design Breakpoints

```
┌─────────────────────────────────────────────────────────┐
│                    Desktop (> 1024px)                    │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Widget: 64x64px, left: 24px, bottom: 24px        │ │
│  │  Panel: max-width 480px, padding: 24px            │ │
│  │  Font: 1rem (16px)                                │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Tablet (768px - 1024px)                 │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Widget: 60x60px, left: 20px, bottom: 20px        │ │
│  │  Panel: max-width 480px, padding: 20px            │ │
│  │  Font: 1rem (16px)                                │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    Mobile (< 768px)                      │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Widget: 56x56px, left: 16px, bottom: 16px        │ │
│  │  Panel: 100% width, padding: 16px                 │ │
│  │  Font: 0.9375rem (15px)                           │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Security & Privacy

```
┌─────────────────────────────────────────────────────────┐
│                   Security Layers                        │
│                                                          │
│  1. API Key Protection                                   │
│     ┌──────────────────────────────────────┐            │
│     │ Stored in .env file                  │            │
│     │ Not committed to git                 │            │
│     │ Loaded via import.meta.env           │            │
│     └──────────────────────────────────────┘            │
│                                                          │
│  2. Rate Limiting                                        │
│     ┌──────────────────────────────────────┐            │
│     │ Max 10 requests per minute           │            │
│     │ Enforced client-side                 │            │
│     │ Prevents API abuse                   │            │
│     └──────────────────────────────────────┘            │
│                                                          │
│  3. Content Filtering                                    │
│     ┌──────────────────────────────────────┐            │
│     │ Educational keywords check           │            │
│     │ Polite redirection for off-topic     │            │
│     │ System prompt constraints            │            │
│     └──────────────────────────────────────┘            │
│                                                          │
│  4. Data Privacy                                         │
│     ┌──────────────────────────────────────┐            │
│     │ No personal data collection          │            │
│     │ localStorage only (no server)        │            │
│     │ No external tracking                 │            │
│     └──────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

---

**Architecture Version**: 1.0.0  
**Last Updated**: January 2025  
**System Status**: Production Ready
