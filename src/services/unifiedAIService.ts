/**
 * Unified AI Service
 * Uses OpenRouter API with DeepSeek model for AI responses
 */

import openRouterService from './openRouterService';

class UnifiedAIService {
  constructor() {
    console.log('🤖 Unified AI Service initialized with OpenRouter (Hermes 3)');
  }

  /**
   * Generate response using OpenRouter API
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<string> {
    try {
      return await openRouterService.generateResponse(userMessage, context, conversationHistory, sources);
    } catch (error) {
      console.error('❌ OpenRouter service failed:', error);
      
      // Handle different error types
      if (error instanceof Error) {
        if (error.message === 'NETWORK_ERROR') {
          throw new Error('NETWORK_ERROR');
        } else if (error.message === 'HIGH_TRAFFIC') {
          throw new Error('HIGH_TRAFFIC');
        } else {
          throw new Error('HIGH_TRAFFIC');
        }
      } else {
        throw new Error('HIGH_TRAFFIC');
      }
    }
  }

  /**
   * Get OpenRouter API status
   */
  public getApiStatus() {
    return openRouterService.getApiStatus();
  }

  /**
   * Reset service failures
   */
  public resetFailures(): void {
    console.log('🔄 Service failures reset');
  }
}

export default new UnifiedAIService();