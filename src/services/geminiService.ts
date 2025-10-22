import { Message, GeminiRequest, GeminiResponse, GeminiServiceInterface } from '../types/chatbot';
import { CHATBOT_CONFIG, SYSTEM_PROMPT } from '../config/chatbot';

/**
 * Gemini API Service - Handles communication with Google's Gemini API
 */
export class GeminiService implements GeminiServiceInterface {
  private apiKey: string;
  private baseURL: string;
  private requestCount: number = 0;
  private requestWindow: number = Date.now();

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseURL = CHATBOT_CONFIG.apiEndpoint;
  }

  /**
   * Generate AI response using Gemini API with source information
   */
  async generateResponse(
    userMessage: string,
    context: string[],
    conversationHistory: Message[],
    contextSources?: Array<{ title: string; source: string; category: string }>
  ): Promise<string> {
    try {
      // Check rate limiting
      this.checkRateLimit();

      // Format the request
      const request = this.formatRequest(userMessage, context, conversationHistory, contextSources);

      // Make API call
      const response = await fetch(`${this.baseURL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data: GeminiResponse = await response.json();
      return this.parseResponse(data);
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Format request payload for Gemini API with source tracking
   */
  private formatRequest(
    userMessage: string,
    context: string[],
    history: Message[],
    contextSources?: Array<{ title: string; source: string; category: string }>
  ): GeminiRequest {
    // Build context string with source attribution
    const contextStr = context.length > 0
      ? context.map((chunk, i) => {
          const sourceInfo = contextSources?.[i];
          return `[Source ${i + 1}: ${sourceInfo?.title || 'Unknown'} - ${sourceInfo?.source || 'School Website'}]: ${chunk}`;
        }).join('\n\n')
      : 'No specific context available.';

    // Build conversation history string
    const historyStr = history.length > 0
      ? history
          .slice(-6) // Last 6 messages for context
          .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
          .join('\n')
      : 'No previous conversation.';

    // Build the full prompt
    const fullPrompt = SYSTEM_PROMPT
      .replace('{context}', contextStr)
      .replace('{history}', historyStr)
      .replace('{question}', userMessage);

    return {
      contents: [
        {
          parts: [
            {
              text: fullPrompt,
            },
          ],
        },
      ],
    };
  }

  /**
   * Parse API response and extract generated text
   */
  private parseResponse(response: GeminiResponse): string {
    try {
      if (!response.candidates || response.candidates.length === 0) {
        throw new Error('No response candidates received');
      }

      const candidate = response.candidates[0];
      if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
        throw new Error('Invalid response structure');
      }

      return candidate.content.parts[0].text;
    } catch (error) {
      console.error('Failed to parse response:', error);
      throw new Error('Failed to parse AI response');
    }
  }

  /**
   * Handle API errors with user-friendly messages
   */
  private handleError(error: any): string {
    console.error('Gemini API error:', error);

    if (error.message?.includes('API request failed')) {
      if (error.message.includes('401') || error.message.includes('403')) {
        return "I'm having trouble connecting due to authentication issues. Please check the API configuration.";
      }
      if (error.message.includes('429')) {
        return "I'm receiving too many requests right now. Please wait a moment and try again.";
      }
      if (error.message.includes('500') || error.message.includes('503')) {
        return "The AI service is temporarily unavailable. Please try again in a moment.";
      }
    }

    if (error.message?.includes('Failed to fetch') || error.message?.includes('network')) {
      return "I'm having trouble connecting right now. Please check your internet connection and try again.";
    }

    return "I encountered an error while processing your request. Please try again.";
  }

  /**
   * Check and enforce rate limiting
   */
  private checkRateLimit(): void {
    const now = Date.now();
    const windowMs = CHATBOT_CONFIG.rateLimit.windowMs;

    // Reset counter if window has passed
    if (now - this.requestWindow > windowMs) {
      this.requestCount = 0;
      this.requestWindow = now;
    }

    // Check if limit exceeded
    if (this.requestCount >= CHATBOT_CONFIG.rateLimit.maxRequests) {
      throw new Error('Rate limit exceeded. Please wait a moment before sending another message.');
    }

    this.requestCount++;
  }
}

// Export singleton instance
export const geminiService = new GeminiService(CHATBOT_CONFIG.apiKey);
