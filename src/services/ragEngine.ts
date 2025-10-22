import { ContentChunk, RAGEngineInterface } from '../types/chatbot';
import { CHATBOT_CONFIG } from '../config/chatbot';
import { getAllKnowledge, KnowledgeChunk } from '../data/knowledgeBase';

/**
 * RAG Engine - Retrieval-Augmented Generation system
 * Indexes site content and retrieves relevant context for AI responses
 */
export class RAGEngine implements RAGEngineInterface {
  private contentIndex: ContentChunk[] = [];
  private isInitialized = false;

  /**
   * Initialize the RAG engine and build content index
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('RAG Engine already initialized');
      return;
    }

    try {
      // Try to load from cache first
      const cached = this.loadFromCache();
      if (cached && cached.length > 0) {
        this.contentIndex = cached;
        this.isInitialized = true;
        console.log(`RAG Engine initialized with ${cached.length} cached chunks`);
        return;
      }

      // Build new index
      await this.indexContent();
      this.isInitialized = true;
      console.log(`RAG Engine initialized with ${this.contentIndex.length} chunks`);
    } catch (error) {
      console.error('Failed to initialize RAG Engine:', error);
      throw error;
    }
  }

  /**
   * Index all site content
   */
  async indexContent(): Promise<void> {
    try {
      this.contentIndex = [];

      // Index static content about the school
      this.indexStaticContent();

      // Save to cache
      this.saveToCache();

      console.log(`Indexed ${this.contentIndex.length} content chunks`);
    } catch (error) {
      console.error('Failed to index content:', error);
      throw error;
    }
  }

  /**
   * Search for relevant content chunks
   */
  async search(query: string, limit: number = 5): Promise<ContentChunk[]> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2);

    // Score each chunk based on relevance
    const scoredChunks = this.contentIndex.map(chunk => ({
      chunk,
      score: this.calculateRelevance(queryWords, chunk),
    }));

    // Sort by score and return top results
    return scoredChunks
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.chunk);
  }

  /**
   * Index comprehensive content from knowledge base
   */
  private indexStaticContent(): void {
    // Load comprehensive knowledge base
    const knowledgeChunks: KnowledgeChunk[] = getAllKnowledge();
    
    // Convert knowledge chunks to content chunks for RAG system
    const contentChunks: ContentChunk[] = knowledgeChunks.map(chunk => ({
      id: chunk.id,
      source: chunk.source,
      content: chunk.content,
        metadata: {
        title: chunk.title,
        category: chunk.category,
        keywords: chunk.keywords,
        priority: chunk.priority,
      },
    }));

    this.contentIndex.push(...contentChunks);
    
    console.log(`✅ Indexed ${contentChunks.length} knowledge chunks from comprehensive knowledge base`);
    console.log(`📚 Categories: ${[...new Set(knowledgeChunks.map(k => k.category))].join(', ')}`);
  }

  /**
   * Calculate relevance score for a content chunk with enhanced scoring
   */
  private calculateRelevance(queryWords: string[], chunk: ContentChunk): number {
    let score = 0;
    const contentLower = chunk.content.toLowerCase();
    const titleLower = chunk.metadata.title?.toLowerCase() || '';
    const categoryLower = chunk.metadata.category?.toLowerCase() || '';
    const keywords = chunk.metadata.keywords || [];
    const priority = (chunk.metadata as any).priority || 5;

    // Check query words in content
    queryWords.forEach(word => {
      // Exact title match (highest weight)
      if (titleLower === word) {
        score += 20;
      } else if (titleLower.includes(word)) {
        score += 12;
      }

      // Category match (high weight for relevant sections)
      if (categoryLower.includes(word)) {
        score += 8;
      }

      // Exact keyword match (very high weight)
      if (keywords.some(keyword => keyword.toLowerCase() === word)) {
        score += 15;
      }
      // Partial keyword match (high weight)
      else if (keywords.some(keyword => keyword.toLowerCase().includes(word))) {
        score += 7;
      }

      // Content match (base weight, with frequency consideration)
      const contentMatches = (contentLower.match(new RegExp(`\\b${word}\\b`, 'gi')) || []).length;
      score += Math.min(contentMatches * 3, 15); // Cap at 15 to prevent over-weighting
    });

    // Boost score based on content priority (1-10 scale)
    score *= (1 + (priority / 20)); // 5% to 50% boost based on priority

    // Bonus for comprehensive content (longer, more detailed answers)
    const contentLength = chunk.content.length;
    if (contentLength > 500) score += 2;
    if (contentLength > 1000) score += 3;

    return Math.round(score);
  }

  /**
   * Load content index from localStorage cache
   */
  private loadFromCache(): ContentChunk[] | null {
    try {
      const cached = localStorage.getItem(CHATBOT_CONFIG.rag.cacheKey);
      if (!cached) return null;

      const data = JSON.parse(cached);
      if (data.version !== CHATBOT_CONFIG.rag.cacheVersion) {
        return null; // Cache version mismatch
      }

      return data.chunks;
    } catch (error) {
      console.error('Failed to load cache:', error);
      return null;
    }
  }

  /**
   * Save content index to localStorage cache
   */
  private saveToCache(): void {
    try {
      const data = {
        version: CHATBOT_CONFIG.rag.cacheVersion,
        chunks: this.contentIndex,
        timestamp: Date.now(),
      };
      localStorage.setItem(CHATBOT_CONFIG.rag.cacheKey, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save cache:', error);
    }
  }
}

// Export singleton instance
export const ragEngine = new RAGEngine();
