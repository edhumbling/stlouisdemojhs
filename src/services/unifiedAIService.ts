/**
 * Unified AI Service
 * Uses OpenRouter API with DeepSeek model for AI responses
 */

import openRouterService from './openRouterService';
import groqCompoundService from './groqCompoundService';

class UnifiedAIService {
  constructor() {
    console.log('🤖 Unified AI Service initialized with Groq (Qwen3-32B primary, Kimi K2, GPT-120B, GPT-20B fallbacks)');
  }

  /**
   * Generate response using Groq API with occasional website visiting
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<string> {
    try {
      // Occasionally use Groq Compound with website visiting (20% chance)
      const shouldUseWebsiteVisiting = Math.random() < 0.2;
      
      if (shouldUseWebsiteVisiting) {
        console.log('🌐 Using Groq Compound with website visiting for enhanced response');
        
        // Add St. Louis website URL to the message for website visiting
        const enhancedMessage = `${userMessage}\n\nPlease visit the St. Louis Demonstration JHS website at https://stlouisdemojhs.com to get the most current information about the school.`;
        
        try {
          return await groqCompoundService.generateResponse(enhancedMessage, context, conversationHistory, sources);
        } catch (compoundError) {
          console.log('⚠️ Groq Compound failed, falling back to primary service');
          // Fall back to primary service if Compound fails
        }
      }
      
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
   * Generate response with thinking mode support and occasional website visiting
   */
  async generateResponseWithThinking(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<{ response: string; thinking: string }> {
    try {
      // Occasionally use Groq Compound with website visiting (20% chance)
      const shouldUseWebsiteVisiting = Math.random() < 0.2;
      
      if (shouldUseWebsiteVisiting) {
        console.log('🌐 Using Groq Compound with website visiting for enhanced thinking response');
        
        // Add St. Louis website URL to the message for website visiting
        const enhancedMessage = `${userMessage}\n\nPlease visit the St. Louis Demonstration JHS website at https://stlouisdemojhs.com to get the most current information about the school.`;
        
        try {
          const compoundResponse = await groqCompoundService.generateResponse(enhancedMessage, context, conversationHistory, sources);
          return {
            response: compoundResponse,
            thinking: "I visited the St. Louis Demonstration JHS website to get the most current information for this response."
          };
        } catch (compoundError) {
          console.log('⚠️ Groq Compound failed, falling back to primary service');
          // Fall back to primary service if Compound fails
        }
      }
      
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