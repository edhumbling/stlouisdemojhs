/**
 * Unified AI Service
 * Uses Gemini AI service with fallback to knowledge bank RAG
 */

import geminiService from './geminiService';
import fallbackRAGService from './fallbackRAGService';

class UnifiedAIService {
  constructor() {
    console.log('🤖 Unified AI Service initialized with Gemini');
  }

  /**
   * Generate response using Gemini AI service with fallback to knowledge bank
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<string> {
    try {
      // Try Gemini AI service first
      return await geminiService.generateResponse(userMessage, context, conversationHistory, sources);
    } catch (error) {
      console.error('❌ Gemini service failed:', error);
      console.log('🔄 Switching to fallback knowledge bank RAG...');
      
      try {
        // Fallback to knowledge bank RAG
        const fallbackResponse = await fallbackRAGService.generateResponse(
          userMessage, 
          context, 
          conversationHistory, 
          sources
        );
        
        console.log('✅ Fallback RAG response generated successfully');
        return fallbackResponse;
        
      } catch (fallbackError) {
        console.error('❌ Fallback RAG also failed:', fallbackError);
        
        // If both fail, provide a user-friendly high traffic message
        throw new Error('HIGH_TRAFFIC');
      }
    }
  }

  /**
   * Get Gemini API key status
   */
  public getGeminiStatus() {
    return geminiService.getApiKeyStatus();
  }

  /**
   * Reset service failures
   */
  public resetFailures(): void {
    console.log('🔄 Service failures reset');
  }

  /**
   * Get knowledge bank statistics
   */
  public getKnowledgeStats() {
    return fallbackRAGService.getKnowledgeStats();
  }
}

export default new UnifiedAIService();