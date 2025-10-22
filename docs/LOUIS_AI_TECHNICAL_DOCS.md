# Louis AI Chatbot - Technical Documentation

## Architecture Overview

Louis AI is a full-stack conversational AI assistant built with React, TypeScript, and Google's Gemini 2.0 Flash API. It uses Retrieval-Augmented Generation (RAG) to provide contextually relevant responses based on the entire St. Louis Demo JHS website content.

## Technology Stack

- **Frontend**: React 18.3.1, TypeScript
- **AI Model**: Google Gemini 2.0 Flash
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **Styling**: Inline CSS with responsive design

## Project Structure

```
src/
├── components/
│   └── chatbot/
│       ├── LouisAIChatbot.tsx      # Main chatbot component
│       ├── ChatWidget.tsx          # Hovering button
│       ├── ChatPanel.tsx           # Full-screen overlay
│       ├── ChatHeader.tsx          # Header with logo and close button
│       ├── MessageList.tsx         # Scrollable message container
│       ├── UserMessage.tsx         # User message bubble
│       ├── AIMessage.tsx           # AI message bubble
│       └── ChatInput.tsx           # Text input with send button
├── services/
│   ├── ragEngine.ts                # RAG content indexing and search
│   ├── geminiService.ts            # Gemini API integration
│   └── chatStorage.ts              # localStorage session management
├── types/
│   └── chatbot.ts                  # TypeScript interfaces
├── config/
│   └── chatbot.ts                  # Configuration and constants
└── .env                            # Environment variables (API key)
```

## Key Components

### 1. LouisAIChatbot (Main Component)

**Location**: `src/components/chatbot/LouisAIChatbot.tsx`

**Responsibilities**:
- Manages chatbot state (open/closed, messages, loading, errors)
- Initializes RAG engine on mount
- Coordinates between UI components and services
- Handles message sending logic
- Implements educational content filtering

**State Management**:
```typescript
const [isOpen, setIsOpen] = useState(false);
const [messages, setMessages] = useState<Message[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### 2. ChatWidget (Hovering Button)

**Location**: `src/components/chatbot/ChatWidget.tsx`

**Features**:
- Fixed positioning on left side (24px from edges on desktop, 16px on mobile)
- St. Louis favicon logo
- Pulse animation to attract attention
- Responsive sizing (64px desktop, 56px mobile)
- Respects `prefers-reduced-motion`

### 3. ChatPanel (Full-Screen Overlay)

**Location**: `src/components/chatbot/ChatPanel.tsx`

**Features**:
- Full-screen overlay with backdrop blur
- Slide-in animation from left
- Prevents body scrolling when open
- Escape key to close
- Click outside to close
- Responsive design (max-width 480px on desktop, full-width on mobile)

### 4. Message Components

**UserMessage**: Right-aligned, blue gradient background
**AIMessage**: Left-aligned, dark gray background, St. Louis avatar, markdown support

### 5. ChatInput

**Location**: `src/components/chatbot/ChatInput.tsx`

**Features**:
- Auto-expanding textarea (max 120px height)
- Enter to send, Shift+Enter for new line
- Send button with icon
- Disabled state during loading
- Input validation

## Services

### 1. RAG Engine

**Location**: `src/services/ragEngine.ts`

**Purpose**: Index and retrieve relevant content from the website

**Key Methods**:
- `initialize()`: Load or build content index
- `indexContent()`: Scan and index static content
- `search(query, limit)`: Find relevant content chunks
- `calculateRelevance()`: Score content based on query

**Content Index**:
- Stores 10 pre-defined content chunks about the school
- Includes: About, Academics, Admissions, STEM, Facilities, Faculty, Activities, Career Guidance, Values, Contact
- Cached in localStorage for performance

**Search Algorithm**:
- Keyword-based matching
- Weighted scoring: Title (10x), Keywords (5x), Content (2x)
- Returns top 5 most relevant chunks

### 2. Gemini Service

**Location**: `src/services/geminiService.ts`

**Purpose**: Communicate with Google's Gemini API

**Key Methods**:
- `generateResponse()`: Send request and get AI response
- `formatRequest()`: Build prompt with context and history
- `parseResponse()`: Extract text from API response
- `handleError()`: User-friendly error messages
- `checkRateLimit()`: Enforce 10 requests per minute

**System Prompt**:
```
You are Louis AI, an educational assistant for St. Louis Demonstration JHS in Ghana.
Your purpose is to help students, parents, and visitors learn about the school and educational topics.

Guidelines:
1. Focus exclusively on educational content
2. Provide accurate information based on context
3. Be friendly, encouraging, and supportive
4. Redirect non-educational queries politely
5. Cite sources when possible
6. Admit when you don't know something
7. Keep responses concise and helpful
8. Use simple, clear language
```

**API Configuration**:
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
- Model: Gemini 2.0 Flash
- Authentication: API key in header

### 3. Chat Storage

**Location**: `src/services/chatStorage.ts`

**Purpose**: Persist chat sessions in browser localStorage

**Key Methods**:
- `saveSession()`: Save session to localStorage
- `loadSession()`: Load session from localStorage
- `getCurrentSession()`: Get or create active session
- `clearSession()`: Clear conversation history
- `exportConversation()`: Export as text

**Storage Keys**:
- `louis-ai-session-{sessionId}`: Individual sessions
- `louis-ai-session-list`: List of session IDs
- `louis-ai-content-index`: RAG content cache

## Configuration

**Location**: `src/config/chatbot.ts`

```typescript
export const CHATBOT_CONFIG = {
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  maxMessages: 50,
  maxContextChunks: 5,
  rateLimit: {
    maxRequests: 10,
    windowMs: 60000, // 1 minute
  },
  ui: {
    widgetPosition: { desktop: { left: 24, bottom: 24 }, mobile: { left: 16, bottom: 16 } },
    widgetSize: { desktop: 64, mobile: 56 },
    animationDuration: 300,
  },
  rag: {
    searchDebounceMs: 300,
    cacheKey: 'louis-ai-content-index',
    cacheVersion: '1.0.0',
  },
  storage: {
    sessionKey: 'louis-ai-session',
    maxStoredSessions: 10,
  },
};
```

## Environment Variables

**File**: `.env`

```bash
VITE_GEMINI_API_KEY=your_api_key_here
```

**Getting an API Key**:
1. Visit https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Create a new API key
4. Copy and paste into `.env` file

## Message Flow

1. **User Input**: User types message and clicks send
2. **Validation**: Check if message is educational
3. **RAG Search**: Retrieve relevant content chunks from index
4. **API Request**: Send query + context + history to Gemini API
5. **Response**: Parse and display AI response
6. **Storage**: Save conversation to localStorage

## Educational Content Filtering

**Keywords**: School, education, learning, academics, admission, curriculum, etc.

**Behavior**:
- If query contains educational keywords → Process normally
- If query is non-educational → Polite redirection message
- Examples: Weather, sports scores, entertainment → Redirected

## Error Handling

**Error Types**:
1. **API Errors**: Network, authentication, rate limit
2. **RAG Errors**: Indexing, search failures
3. **Input Errors**: Empty messages, validation

**User Messages**:
- API Error: "I'm having trouble connecting right now..."
- Rate Limit: "I'm receiving too many requests..."
- Network: "Please check your internet connection..."

## Performance Optimizations

1. **Content Caching**: RAG index stored in localStorage
2. **Debouncing**: 300ms delay on search queries
3. **Message Limit**: Max 50 messages in memory
4. **Lazy Loading**: Components loaded on demand
5. **Auto-scroll**: Smooth scroll to latest message

## Accessibility Features

1. **ARIA Labels**: All interactive elements labeled
2. **Keyboard Navigation**: Tab, Enter, Escape support
3. **Focus Management**: Auto-focus input when panel opens
4. **Screen Readers**: Proper semantic HTML and roles
5. **Color Contrast**: WCAG AA compliant (4.5:1)
6. **Reduced Motion**: Respects user preference

## Responsive Design

**Breakpoints**:
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

**Adaptations**:
- Widget size: 64px → 56px
- Widget position: 24px → 16px from edges
- Panel width: 480px max → 100% on mobile
- Padding: 24px → 16px on mobile
- Font sizes: Slightly smaller on mobile

## Styling Approach

**Method**: Inline CSS with `<style>` tags in components

**Advantages**:
- Component-scoped styles
- No CSS conflicts
- Easy to maintain
- No build configuration needed

**Color Palette**:
```css
--louis-primary: #3b82f6 (Blue)
--louis-secondary: #2563eb (Dark Blue)
--louis-bg-panel: #1f1f1f (Dark Gray)
--louis-bg-message: #2a2a2a (Medium Gray)
--louis-text-primary: #ffffff (White)
--louis-text-secondary: #a0a0a0 (Light Gray)
```

## Testing

**Manual Testing Checklist**:
- [ ] Widget appears on all pages
- [ ] Click widget opens panel
- [ ] Panel slides in smoothly
- [ ] Messages send and receive correctly
- [ ] RAG retrieves relevant context
- [ ] Educational filtering works
- [ ] Error handling displays properly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Keyboard navigation works
- [ ] Accessibility features functional

## Deployment

1. **Build**: `npm run build`
2. **Environment**: Ensure `.env` has API key
3. **Verify**: Test on staging environment
4. **Deploy**: Push to production

**Important**: Never commit `.env` file to version control!

## Troubleshooting

### Chatbot Not Appearing
- Check Layout.tsx includes `<LouisAIChatbot />`
- Verify all component files exist
- Check browser console for errors

### API Errors
- Verify API key in `.env` file
- Check API key is valid and active
- Ensure internet connection
- Check rate limits (10 req/min)

### RAG Not Working
- Check localStorage is enabled
- Clear cache and rebuild index
- Verify content chunks in ragEngine.ts

### Styling Issues
- Check inline styles in components
- Verify responsive breakpoints
- Test on different browsers

## Future Enhancements

**Phase 2**:
- Voice input (speech-to-text)
- Multi-language support
- Conversation export as PDF
- Suggested quick-reply buttons
- Rich media in responses (images, videos)

**Phase 3**:
- Backend API proxy for security
- Vector embeddings for semantic search
- User accounts and cloud sync
- Analytics dashboard
- Admin panel for content management

## Security Considerations

1. **API Key**: Currently client-side (consider backend proxy)
2. **Rate Limiting**: 10 requests per minute enforced
3. **Input Validation**: Check for empty/malicious input
4. **Content Filtering**: Educational topics only
5. **No PII**: Don't collect personal information

## Support

For technical issues or questions:
- Review this documentation
- Check browser console for errors
- Contact development team
- Submit issue on project repository

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Maintained by**: St. Louis Demo JHS Development Team
