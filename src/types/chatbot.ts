/**
 * TypeScript type definitions for Louis AI Chatbot
 */

// Message types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    retrievedContext?: string[];
    tokensUsed?: number;
  };
}

// Chat session types
export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
  lastActivity: Date;
}

// RAG Engine types
export interface ContentChunk {
  id: string;
  source: string;
  content: string;
  metadata: {
    title?: string;
    category?: string;
    keywords?: string[];
  };
  embedding?: number[];
}

// Component prop interfaces
export interface ChatWidgetProps {
  onClick: () => void;
  isOpen: boolean;
}

export interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export interface ChatHeaderProps {
  onClose: () => void;
}

export interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export interface UserMessageProps {
  content: string;
  timestamp: Date;
}

export interface AIMessageProps {
  content: string;
  timestamp: Date;
}

export interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

// Service interfaces
export interface RAGEngineInterface {
  initialize(): Promise<void>;
  indexContent(): Promise<void>;
  search(query: string, limit?: number): Promise<ContentChunk[]>;
}

export interface GeminiServiceInterface {
  generateResponse(
    userMessage: string,
    context: string[],
    conversationHistory: Message[]
  ): Promise<string>;
}

export interface ChatStorageInterface {
  saveSession(session: ChatSession): void;
  loadSession(sessionId: string): ChatSession | null;
  getCurrentSession(): ChatSession;
  clearSession(): void;
  exportConversation(sessionId: string): string;
}

// API types
export interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

// Error types
export interface ErrorState {
  type: 'api' | 'rag' | 'input' | 'unknown';
  message: string;
  retryable: boolean;
}
