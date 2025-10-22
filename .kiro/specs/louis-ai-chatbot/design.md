# Design Document: Louis AI Chatbot

## Overview

The Louis AI Chatbot is a full-screen conversational AI assistant that provides educational support and site-wide information retrieval for St. Louis Demonstration JHS. The system integrates Google's Gemini 2.0 Flash API with a Retrieval-Augmented Generation (RAG) engine to deliver contextually relevant responses based on the entire website content. The chatbot features a persistent hovering button with the St. Louis favicon logo, positioned on the left side of the viewport, and expands to full-screen on both desktop and mobile devices.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     React Application                        │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Layout Component                         │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │         Louis AI Chat Widget                    │ │  │
│  │  │  (Hovering Button - Left Side)                  │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │         Louis AI Chat Panel                     │ │  │
│  │  │  (Full-Screen Overlay)                          │ │  │
│  │  │  ┌───────────────────────────────────────────┐  │ │  │
│  │  │  │  Chat Header (Close Button)              │  │ │  │
│  │  │  ├───────────────────────────────────────────┤  │ │  │
│  │  │  │  Message List (Scrollable)               │  │ │  │
│  │  │  │  - User Messages                         │  │ │  │
│  │  │  │  - AI Responses                          │  │ │  │
│  │  │  ├───────────────────────────────────────────┤  │ │  │
│  │  │  │  Input Area (Text + Send Button)         │  │ │  │
│  │  │  └───────────────────────────────────────────┘  │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   RAG Engine Service                         │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Content Indexer                                      │  │
│  │  - Scans all pages, components, data files            │  │
│  │  - Extracts text content                              │  │
│  │  - Creates searchable index                           │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Semantic Search                                      │  │
│  │  - Query processing                                   │  │
│  │  - Context retrieval                                  │  │
│  │  - Relevance ranking                                  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   Gemini API Service                         │
│  - API request formatting                                    │
│  - Authentication                                            │
│  - Response parsing                                          │
│  - Error handling                                            │
│  - Rate limiting                                             │
└─────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
└── Layout
    ├── Header
    ├── Main Content (Outlet)
    ├── Footer
    └── LouisAIChatbot (Global)
        ├── ChatWidget (Hovering Button)
        └── ChatPanel (Full-Screen Overlay)
            ├── ChatHeader
            ├── MessageList
            │   ├── UserMessage
            │   └── AIMessage
            └── ChatInput
```

## Components and Interfaces

### 1. LouisAIChatbot Component

**Purpose**: Root component that manages chatbot state and orchestrates child components.

**Props**: None (global component)

**State**:
```typescript
interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
```

**Key Responsibilities**:
- Manage open/closed state
- Maintain conversation history
- Coordinate between RAG engine and Gemini API
- Handle error states

### 2. ChatWidget Component

**Purpose**: Persistent hovering button that triggers the chatbot.

**Props**:
```typescript
interface ChatWidgetProps {
  onClick: () => void;
  isOpen: boolean;
}
```

**Styling**:
- Position: `fixed`, `left: 24px`, `bottom: 24px`
- Z-index: `9999` (above all content)
- Size: `64px x 64px` (desktop), `56px x 56px` (mobile)
- Background: Gradient with school colors
- Logo: St. Louis favicon (`/favicon-32x32.png`)
- Animation: Subtle pulse effect to attract attention
- Shadow: Elevated shadow for depth

**Responsive Behavior**:
- Desktop: Left side, 24px from bottom
- Mobile: Left side, 16px from bottom
- Tablet: Left side, 20px from bottom

### 3. ChatPanel Component

**Purpose**: Full-screen overlay containing the chat interface.

**Props**:
```typescript
interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}
```

**Layout**:
- Position: `fixed`, covers entire viewport
- Z-index: `10000` (above widget)
- Background: Semi-transparent dark overlay with backdrop blur
- Content area: Centered, max-width for readability
- Animations: Slide-in from left, fade-in overlay

**Sections**:
1. **Header**: Logo, title, close button
2. **Message List**: Scrollable area with messages
3. **Input Area**: Text input and send button

### 4. ChatHeader Component

**Purpose**: Top bar with branding and close button.

**Props**:
```typescript
interface ChatHeaderProps {
  onClose: () => void;
}
```

**Elements**:
- St. Louis favicon logo (32px)
- Title: "Louis AI Assistant"
- Subtitle: "Ask me anything about St. Louis Demo JHS"
- Close button (X icon)

### 5. MessageList Component

**Purpose**: Scrollable container displaying conversation history.

**Props**:
```typescript
interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}
```

**Features**:
- Auto-scroll to latest message
- Loading indicator for AI responses
- Empty state with welcome message
- Smooth scroll behavior

### 6. UserMessage Component

**Purpose**: Display user-sent messages.

**Props**:
```typescript
interface UserMessageProps {
  content: string;
  timestamp: Date;
}
```

**Styling**:
- Alignment: Right side
- Background: Blue gradient
- Border radius: Rounded corners (sharp design)
- Typography: Clean, readable font
- Timestamp: Small, subtle text below message

### 7. AIMessage Component

**Purpose**: Display AI-generated responses.

**Props**:
```typescript
interface AIMessageProps {
  content: string;
  timestamp: Date;
}
```

**Styling**:
- Alignment: Left side
- Background: Dark gray with subtle border
- Avatar: St. Louis favicon (24px)
- Typography: Clean, readable font
- Markdown support: Bold, italic, lists, code blocks
- Timestamp: Small, subtle text below message

### 8. ChatInput Component

**Purpose**: Text input area for user queries.

**Props**:
```typescript
interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}
```

**Features**:
- Multi-line text input (auto-expanding)
- Send button with icon
- Character limit indicator (optional)
- Enter to send, Shift+Enter for new line
- Disabled state during loading

## Data Models

### Message Model

```typescript
interface Message {
  id: string;              // Unique identifier (UUID)
  role: 'user' | 'assistant';
  content: string;         // Message text
  timestamp: Date;         // When message was sent
  metadata?: {
    retrievedContext?: string[];  // RAG context used
    tokensUsed?: number;          // API tokens consumed
  };
}
```

### Chat Session Model

```typescript
interface ChatSession {
  id: string;              // Session identifier
  messages: Message[];     // Conversation history
  createdAt: Date;         // Session start time
  lastActivity: Date;      // Last message timestamp
}
```

### Site Content Index Model

```typescript
interface ContentChunk {
  id: string;              // Unique chunk identifier
  source: string;          // File path or URL
  content: string;         // Text content
  metadata: {
    title?: string;        // Page/section title
    category?: string;     // Content category
    keywords?: string[];   // Extracted keywords
  };
  embedding?: number[];    // Vector embedding (future enhancement)
}
```

## Services

### 1. RAG Engine Service

**File**: `src/services/ragEngine.ts`

**Key Functions**:

```typescript
class RAGEngine {
  private contentIndex: ContentChunk[] = [];

  // Initialize and build content index
  async initialize(): Promise<void>;

  // Index all site content
  async indexContent(): Promise<void>;

  // Search for relevant content
  async search(query: string, limit: number = 5): Promise<ContentChunk[]>;

  // Extract text from React components
  private extractTextFromComponent(filePath: string): string;

  // Extract text from data files
  private extractTextFromData(filePath: string): string;

  // Calculate relevance score
  private calculateRelevance(query: string, chunk: ContentChunk): number;
}
```

**Implementation Details**:
- **Content Sources**: Pages, components, data files, markdown files
- **Indexing Strategy**: On application load, index all text content
- **Search Algorithm**: TF-IDF or simple keyword matching initially
- **Caching**: Store index in memory, persist to localStorage
- **Update Mechanism**: Re-index on content changes (future enhancement)

### 2. Gemini API Service

**File**: `src/services/geminiService.ts`

**Key Functions**:

```typescript
class GeminiService {
  private apiKey: string;
  private baseURL: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor(apiKey: string);

  // Send message to Gemini API
  async generateResponse(
    userMessage: string,
    context: string[],
    conversationHistory: Message[]
  ): Promise<string>;

  // Format request payload
  private formatRequest(
    userMessage: string,
    context: string[],
    history: Message[]
  ): GeminiRequest;

  // Parse API response
  private parseResponse(response: GeminiResponse): string;

  // Handle API errors
  private handleError(error: any): string;
}
```

**Request Format**:
```typescript
interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}
```

**System Prompt**:
```
You are Louis AI, an educational assistant for St. Louis Demonstration JHS in Ghana. 
Your purpose is to help students, parents, and visitors learn about the school and 
educational topics. You should:

1. Focus exclusively on educational content
2. Provide accurate information based on the provided context
3. Be friendly, encouraging, and supportive
4. Redirect non-educational queries politely
5. Cite sources when possible
6. Admit when you don't know something

Context from the website:
{retrieved_context}

Conversation history:
{conversation_history}

User question: {user_message}
```

### 3. Chat Storage Service

**File**: `src/services/chatStorage.ts`

**Key Functions**:

```typescript
class ChatStorageService {
  // Save session to localStorage
  saveSession(session: ChatSession): void;

  // Load session from localStorage
  loadSession(sessionId: string): ChatSession | null;

  // Get current session
  getCurrentSession(): ChatSession;

  // Clear session history
  clearSession(): void;

  // Export conversation
  exportConversation(sessionId: string): string;
}
```

## Error Handling

### Error Types

1. **API Errors**:
   - Network failures
   - Authentication errors
   - Rate limit exceeded
   - Invalid responses

2. **RAG Engine Errors**:
   - Indexing failures
   - Search errors
   - Content parsing errors

3. **User Input Errors**:
   - Empty messages
   - Inappropriate content
   - Message too long

### Error Handling Strategy

```typescript
interface ErrorState {
  type: 'api' | 'rag' | 'input' | 'unknown';
  message: string;
  retryable: boolean;
}
```

**User-Facing Error Messages**:
- API Error: "I'm having trouble connecting right now. Please try again in a moment."
- RAG Error: "I couldn't find relevant information. Could you rephrase your question?"
- Input Error: "Please enter a valid question."
- Rate Limit: "I'm receiving too many requests. Please wait a moment and try again."

**Error Recovery**:
- Automatic retry for transient errors (max 3 attempts)
- Fallback to basic responses without RAG context
- Clear error state on successful message
- Log errors for debugging (console only, no external logging)

## Testing Strategy

### Unit Tests

1. **Component Tests**:
   - ChatWidget renders correctly
   - ChatPanel opens/closes properly
   - Messages display correctly
   - Input validation works

2. **Service Tests**:
   - RAG Engine indexes content correctly
   - Search returns relevant results
   - Gemini API service formats requests properly
   - Error handling works as expected

3. **Utility Tests**:
   - Message formatting
   - Timestamp display
   - Content extraction

### Integration Tests

1. **End-to-End Flow**:
   - User opens chatbot
   - User sends message
   - RAG engine retrieves context
   - Gemini API returns response
   - Response displays correctly

2. **Error Scenarios**:
   - API failure handling
   - Network timeout handling
   - Invalid input handling

### Manual Testing

1. **Responsive Design**:
   - Test on desktop (1920x1080, 1366x768)
   - Test on tablet (iPad, Android tablet)
   - Test on mobile (iPhone, Android phone)
   - Test landscape and portrait orientations

2. **User Experience**:
   - Button visibility and accessibility
   - Panel animations smooth
   - Scrolling behavior correct
   - Loading states clear
   - Error messages helpful

3. **Content Quality**:
   - RAG retrieves relevant context
   - AI responses are accurate
   - Educational focus maintained
   - Inappropriate content filtered

## Security Considerations

### API Key Management

- **Storage**: Use environment variables (`.env` file)
- **Access**: Never expose in client-side code
- **Proxy**: Consider backend proxy for API calls (future enhancement)

**Current Approach** (Client-Side):
```typescript
// vite.config.ts
export default defineConfig({
  define: {
    'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(process.env.VITE_GEMINI_API_KEY)
  }
});
```

**Future Enhancement** (Backend Proxy):
- Create serverless function (Netlify/Vercel)
- Proxy Gemini API requests
- Keep API key server-side only

### Content Filtering

- **Input Validation**: Check for inappropriate content before sending
- **Output Filtering**: Ensure AI responses are educational
- **Rate Limiting**: Prevent abuse (max 10 messages per minute per session)

### Data Privacy

- **No Personal Data**: Don't collect or store personal information
- **Session Storage**: Keep conversations in browser only (localStorage)
- **No Analytics**: Don't send conversation data to external services

## Performance Optimization

### Initial Load

- **Lazy Loading**: Load chatbot components only when needed
- **Code Splitting**: Separate chatbot bundle from main app
- **Asset Optimization**: Compress favicon logo

### Runtime Performance

- **Debouncing**: Debounce search queries (300ms)
- **Caching**: Cache RAG search results
- **Virtual Scrolling**: For long conversation histories
- **Request Batching**: Batch multiple API calls if needed

### Memory Management

- **Message Limit**: Keep max 50 messages in memory
- **Index Size**: Limit content index to essential text only
- **Cleanup**: Clear old sessions periodically

## Accessibility

### Keyboard Navigation

- **Tab Order**: Widget → Close Button → Input → Send Button
- **Enter Key**: Send message
- **Escape Key**: Close panel
- **Arrow Keys**: Navigate message history (future enhancement)

### Screen Readers

- **ARIA Labels**: All interactive elements labeled
- **Role Attributes**: Proper semantic roles
- **Live Regions**: Announce new messages
- **Focus Management**: Focus input when panel opens

### Visual Accessibility

- **Color Contrast**: WCAG AA compliant (4.5:1 minimum)
- **Font Size**: Minimum 16px for body text
- **Focus Indicators**: Clear focus outlines
- **Reduced Motion**: Respect `prefers-reduced-motion`

## Styling and Design System

### Color Palette

```css
:root {
  /* Primary Colors */
  --louis-primary: #1a1a1a;
  --louis-secondary: #3b82f6;
  --louis-accent: #10b981;

  /* Background Colors */
  --louis-bg-overlay: rgba(0, 0, 0, 0.85);
  --louis-bg-panel: #1f1f1f;
  --louis-bg-user-message: linear-gradient(135deg, #3b82f6, #2563eb);
  --louis-bg-ai-message: #2a2a2a;

  /* Text Colors */
  --louis-text-primary: #ffffff;
  --louis-text-secondary: #a0a0a0;
  --louis-text-muted: #666666;

  /* Border Colors */
  --louis-border: #333333;
  --louis-border-focus: #3b82f6;
}
```

### Typography

```css
.louis-chat {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.louis-chat-title {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.louis-chat-message {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}

.louis-chat-timestamp {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--louis-text-muted);
}
```

### Spacing

- **Widget**: 24px from edges (desktop), 16px (mobile)
- **Panel Padding**: 24px (desktop), 16px (mobile)
- **Message Spacing**: 16px between messages
- **Input Padding**: 16px all sides

### Animations

```css
/* Panel slide-in */
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Widget pulse */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 30px rgba(59, 130, 246, 0.5);
  }
}

/* Loading dots */
@keyframes loadingDots {
  0%, 20% { content: '.'; }
  40% { content: '..'; }
  60%, 100% { content: '...'; }
}
```

## Future Enhancements

### Phase 2 Features

1. **Voice Input**: Speech-to-text for queries
2. **Multi-Language**: Support for local languages
3. **Conversation Export**: Download chat history as PDF
4. **Suggested Questions**: Quick-reply buttons
5. **Rich Media**: Display images, videos in responses
6. **Feedback System**: Thumbs up/down for responses

### Phase 3 Features

1. **Backend Integration**: Server-side API proxy
2. **Vector Embeddings**: Semantic search with embeddings
3. **User Accounts**: Save conversations across devices
4. **Analytics Dashboard**: Track usage and popular queries
5. **Admin Panel**: Manage content index, view conversations
6. **A/B Testing**: Test different prompts and UI variations

## Implementation Notes

### Development Workflow

1. **Phase 1**: Build UI components (widget, panel, messages)
2. **Phase 2**: Implement RAG engine (content indexing, search)
3. **Phase 3**: Integrate Gemini API (request/response handling)
4. **Phase 4**: Add error handling and loading states
5. **Phase 5**: Polish UI/UX, animations, accessibility
6. **Phase 6**: Testing and optimization

### Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.344.0",
    "framer-motion": "^10.16.4"
  }
}
```

**No Additional Dependencies Required** - Use existing packages.

### File Structure

```
src/
├── components/
│   └── chatbot/
│       ├── LouisAIChatbot.tsx
│       ├── ChatWidget.tsx
│       ├── ChatPanel.tsx
│       ├── ChatHeader.tsx
│       ├── MessageList.tsx
│       ├── UserMessage.tsx
│       ├── AIMessage.tsx
│       └── ChatInput.tsx
├── services/
│   ├── ragEngine.ts
│   ├── geminiService.ts
│   └── chatStorage.ts
├── hooks/
│   └── useChatbot.ts
├── types/
│   └── chatbot.ts
└── utils/
    └── chatbotUtils.ts
```

### Configuration

```typescript
// src/config/chatbot.ts
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
    widgetPosition: { left: 24, bottom: 24 },
    widgetSize: { desktop: 64, mobile: 56 },
    animationDuration: 300,
  },
};
```
