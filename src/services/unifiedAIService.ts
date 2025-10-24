/**
 * Unified AI Service
 * Simple wrapper around Gemini AI service
 */

import geminiService from './geminiService';

class UnifiedAIService {
  constructor() {
    console.log('🤖 Unified AI Service initialized with Gemini');
  }

  /**
   * Generate response using Gemini AI service
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<string> {
    try {
      return await geminiService.generateResponse(userMessage, context, conversationHistory, sources);
    } catch (error) {
      console.error('❌ Gemini service failed:', error);
      
      // If Gemini fails, provide a user-friendly high traffic message
      throw new Error('HIGH_TRAFFIC');
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
}

export default new UnifiedAIService();