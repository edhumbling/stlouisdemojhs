import { ChatSession, ChatStorageInterface } from '../types/chatbot';
import { CHATBOT_CONFIG } from '../config/chatbot';

/**
 * Chat Storage Service - Manages chat session persistence
 */
export class ChatStorageService implements ChatStorageInterface {
  private currentSessionId: string;

  constructor() {
    this.currentSessionId = this.generateSessionId();
  }

  /**
   * Save session to localStorage
   */
  saveSession(session: ChatSession): void {
    try {
      const key = `${CHATBOT_CONFIG.storage.sessionKey}-${session.id}`;
      localStorage.setItem(key, JSON.stringify(session));
      
      // Update session list
      this.updateSessionList(session.id);
    } catch (error) {
      console.error('Failed to save session:', error);
    }
  }

  /**
   * Load session from localStorage
   */
  loadSession(sessionId: string): ChatSession | null {
    try {
      const key = `${CHATBOT_CONFIG.storage.sessionKey}-${sessionId}`;
      const data = localStorage.getItem(key);
      
      if (!data) return null;
      
      const session = JSON.parse(data);
      
      // Convert date strings back to Date objects
      session.createdAt = new Date(session.createdAt);
      session.lastActivity = new Date(session.lastActivity);
      session.messages = session.messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      
      return session;
    } catch (error) {
      console.error('Failed to load session:', error);
      return null;
    }
  }

  /**
   * Get current active session
   */
  getCurrentSession(): ChatSession {
    const existing = this.loadSession(this.currentSessionId);
    
    if (existing) {
      return existing;
    }
    
    // Create new session
    const newSession: ChatSession = {
      id: this.currentSessionId,
      messages: [],
      createdAt: new Date(),
      lastActivity: new Date(),
    };
    
    this.saveSession(newSession);
    return newSession;
  }

  /**
   * Clear session history
   */
  clearSession(): void {
    try {
      // Clear current session
      const key = `${CHATBOT_CONFIG.storage.sessionKey}-${this.currentSessionId}`;
      localStorage.removeItem(key);
      
      // Generate new session ID
      this.currentSessionId = this.generateSessionId();
      
      console.log('Session cleared');
    } catch (error) {
      console.error('Failed to clear session:', error);
    }
  }

  /**
   * Export conversation as text
   */
  exportConversation(sessionId: string): string {
    const session = this.loadSession(sessionId);
    
    if (!session) {
      return 'Session not found';
    }
    
    let text = `Louis AI Conversation\n`;
    text += `Date: ${session.createdAt.toLocaleString()}\n`;
    text += `\n${'='.repeat(50)}\n\n`;
    
    session.messages.forEach((message) => {
      const role = message.role === 'user' ? 'You' : 'Louis AI';
      const time = message.timestamp.toLocaleTimeString();
      text += `[${time}] ${role}:\n${message.content}\n\n`;
    });
    
    return text;
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Update list of stored sessions
   */
  private updateSessionList(sessionId: string): void {
    try {
      const listKey = `${CHATBOT_CONFIG.storage.sessionKey}-list`;
      const listData = localStorage.getItem(listKey);
      const sessionList: string[] = listData ? JSON.parse(listData) : [];
      
      // Add session if not already in list
      if (!sessionList.includes(sessionId)) {
        sessionList.push(sessionId);
      }
      
      // Keep only recent sessions
      const maxSessions = CHATBOT_CONFIG.storage.maxStoredSessions;
      if (sessionList.length > maxSessions) {
        const removed = sessionList.shift();
        if (removed) {
          const key = `${CHATBOT_CONFIG.storage.sessionKey}-${removed}`;
          localStorage.removeItem(key);
        }
      }
      
      localStorage.setItem(listKey, JSON.stringify(sessionList));
    } catch (error) {
      console.error('Failed to update session list:', error);
    }
  }
}

// Export singleton instance
export const chatStorage = new ChatStorageService();
