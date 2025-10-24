/**
 * Unified AI Service
 * Uses OpenRouter API with DeepSeek model for AI responses
 */

import openRouterService from './openRouterService';

class UnifiedAIService {
  constructor() {
    console.log('🤖 Unified AI Service initialized with Groq (Qwen3-32B primary, Kimi K2, GPT-120B, GPT-20B fallbacks)');
  }

  /**
   * Generate response using Groq API
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
        console.error('❌ Groq service failed:', error);
      
        // Handle different error types
        if (error instanceof Error) {
          if (error.message === 'NETWORK_ERROR') {
            throw new Error('NETWORK_ERROR');
          } else if (error.message === 'HIGH_TRAFFIC') {
            throw new Error('HIGH_TRAFFIC');
          } else if (error.message === 'API_KEY_INVALID') {
            throw new Error('API_KEY_INVALID');
          } else {
            throw new Error('HIGH_TRAFFIC');
          }
        } else {
          throw new Error('HIGH_TRAFFIC');
        }
    }
  }

  /**
   * Generate response with thinking mode support
   */
  async generateResponseWithThinking(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<{ response: string; thinking: string }> {
    try {
      return await openRouterService.generateResponseWithThinking(userMessage, context, conversationHistory, sources);
    } catch (error) {
        console.error('❌ Groq service failed:', error);
      
        // Handle different error types
        if (error instanceof Error) {
          if (error.message === 'NETWORK_ERROR') {
            throw new Error('NETWORK_ERROR');
          } else if (error.message === 'HIGH_TRAFFIC') {
            throw new Error('HIGH_TRAFFIC');
          } else if (error.message === 'API_KEY_INVALID') {
            throw new Error('API_KEY_INVALID');
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