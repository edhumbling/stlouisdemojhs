/**
 * RAG (Retrieval-Augmented Generation) Engine
 * Searches and retrieves relevant content from the knowledge base
 */

import { schoolKnowledgeBase, type KnowledgeChunk } from '../data/knowledgeBase';

export interface RAGResult {
  chunks: KnowledgeChunk[];
  context: string;
  sources: string[];
}

class RAGEngine {
  private knowledgeBase: KnowledgeChunk[];

  constructor() {
    this.knowledgeBase = schoolKnowledgeBase;
  }

  /**
   * Search the knowledge base for relevant content
   */
  async search(query: string, limit: number = 5): Promise<RAGResult> {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Score each chunk based on relevance
    const scoredChunks = this.knowledgeBase.map(chunk => ({
      chunk,
      score: this.calculateRelevance(normalizedQuery, chunk)
    }));

    // Sort by score (highest first) and take top results
    const topChunks = scoredChunks
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .filter(item => item.score > 0) // Only include chunks with some relevance
      .map(item => item.chunk);

    // Build context string from chunks
    const context = topChunks
      .map((chunk, index) => {
        return `[Source ${index + 1}: ${chunk.source}]\nTitle: ${chunk.title}\nCategory: ${chunk.category}\n\n${chunk.content}\n`;
      })
      .join('\n---\n\n');

    // Extract unique sources
    const sources = [...new Set(topChunks.map(chunk => chunk.source))];

    return {
      chunks: topChunks,
      context,
      sources
    };
  }

  /**
   * Calculate relevance score for a knowledge chunk
   */
  private calculateRelevance(query: string, chunk: KnowledgeChunk): number {
    let score = 0;
    const queryWords = query.split(/\s+/).filter(w => w.length > 2);

    // Exact keyword match (highest weight)
    chunk.keywords.forEach(keyword => {
      if (query.includes(keyword.toLowerCase())) {
        score += 10;
      }
    });

    // Title matching
    const titleLower = chunk.title.toLowerCase();
    queryWords.forEach(word => {
      if (titleLower.includes(word)) {
        score += 5;
      }
    });

    // Content matching
    const contentLower = chunk.content.toLowerCase();
    queryWords.forEach(word => {
      if (contentLower.includes(word)) {
        score += 2;
      }
    });

    // Category matching
    const categoryLower = chunk.category.toLowerCase();
    queryWords.forEach(word => {
      if (categoryLower.includes(word)) {
        score += 3;
      }
    });

    // Priority boost
    score += chunk.priority;

    // Bonus for longer, more comprehensive content
    if (chunk.content.length > 500) {
      score += 2;
    }

    return score;
  }

  /**
   * Get all available categories
   */
  getCategories(): string[] {
    return [...new Set(this.knowledgeBase.map(chunk => chunk.category))];
  }

  /**
   * Get all chunks from a specific category
   */
  getByCategory(category: string): KnowledgeChunk[] {
    return this.knowledgeBase.filter(chunk => chunk.category === category);
  }

  /**
   * Get a specific chunk by ID
   */
  getById(id: string): KnowledgeChunk | undefined {
    return this.knowledgeBase.find(chunk => chunk.id === id);
  }

  /**
   * Get total number of chunks in knowledge base
   */
  getTotalChunks(): number {
    return this.knowledgeBase.length;
  }
}

// Export singleton instance
export const ragEngine = new RAGEngine();
export default ragEngine;
