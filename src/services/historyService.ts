/**
 * History Service
 * Manages conversation history in localStorage with categorization
 */

export interface ConversationEntry {
  id: string;
  title: string;
  messages: any[];
  timestamp: Date;
  date: string; // YYYY-MM-DD format
  week: string; // YYYY-WW format
  month: string; // YYYY-MM format
}

export interface CategorizedHistory {
  today: ConversationEntry[];
  thisWeek: ConversationEntry[];
  thisMonth: ConversationEntry[];
  older: ConversationEntry[];
}

class HistoryService {
  private readonly STORAGE_KEY = 'louis_ai_conversation_history';
  private readonly MAX_HISTORY_ENTRIES = 100; // Limit to prevent localStorage overflow

  /**
   * Save a conversation to history
   */
  saveConversation(messages: any[]): void {
    if (messages.length === 0) return;

    const history = this.getHistory();
    const now = new Date();
    
    // Generate a title from the first user message
    const firstUserMessage = messages.find(msg => msg.role === 'user');
    const title = firstUserMessage?.content?.substring(0, 50) + (firstUserMessage?.content?.length > 50 ? '...' : '') || 'New Conversation';

    const entry: ConversationEntry = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      title,
      messages: [...messages], // Deep copy
      timestamp: now,
      date: this.formatDate(now),
      week: this.formatWeek(now),
      month: this.formatMonth(now)
    };

    // Add to beginning of array (most recent first)
    history.unshift(entry);

    // Limit history size
    if (history.length > this.MAX_HISTORY_ENTRIES) {
      history.splice(this.MAX_HISTORY_ENTRIES);
    }

    this.setHistory(history);
  }

  /**
   * Get all conversation history
   */
  getHistory(): ConversationEntry[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading conversation history:', error);
      return [];
    }
  }

  /**
   * Get categorized history
   */
  getCategorizedHistory(): CategorizedHistory {
    const history = this.getHistory();
    const now = new Date();
    const today = this.formatDate(now);
    const thisWeek = this.formatWeek(now);
    const thisMonth = this.formatMonth(now);

    return {
      today: history.filter(entry => entry.date === today),
      thisWeek: history.filter(entry => entry.week === thisWeek && entry.date !== today),
      thisMonth: history.filter(entry => entry.month === thisMonth && entry.week !== thisWeek),
      older: history.filter(entry => entry.month !== thisMonth)
    };
  }

  /**
   * Delete a specific conversation
   */
  deleteConversation(conversationId: string): void {
    const history = this.getHistory();
    const filtered = history.filter(entry => entry.id !== conversationId);
    this.setHistory(filtered);
  }

  /**
   * Clear all conversation history
   */
  clearAllHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Load a conversation by ID
   */
  loadConversation(conversationId: string): ConversationEntry | null {
    const history = this.getHistory();
    return history.find(entry => entry.id === conversationId) || null;
  }

  /**
   * Update conversation title
   */
  updateConversationTitle(conversationId: string, newTitle: string): void {
    const history = this.getHistory();
    const entry = history.find(entry => entry.id === conversationId);
    if (entry) {
      entry.title = newTitle;
      this.setHistory(history);
    }
  }

  /**
   * Get conversation statistics
   */
  getStats(): { total: number; today: number; thisWeek: number; thisMonth: number } {
    const categorized = this.getCategorizedHistory();
    return {
      total: this.getHistory().length,
      today: categorized.today.length,
      thisWeek: categorized.thisWeek.length,
      thisMonth: categorized.thisMonth.length
    };
  }

  /**
   * Private helper methods
   */
  private setHistory(history: ConversationEntry[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving conversation history:', error);
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private formatWeek(date: Date): string {
    const year = date.getFullYear();
    const week = this.getWeekNumber(date);
    return `${year}-W${week.toString().padStart(2, '0')}`;
  }

  private formatMonth(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }

  private getWeekNumber(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  }
}

// Export singleton instance
const historyService = new HistoryService();
export default historyService;