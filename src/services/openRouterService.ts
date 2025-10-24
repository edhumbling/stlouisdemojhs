/**
 * OpenRouter AI Service
 * Uses OpenRouter API with DeepSeek model for AI responses
 */

interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  user?: string;
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    finish_reason: string | null;
    message: {
      role: string;
      content: string | null;
    };
  }>;
  created: number;
  model: string;
  object: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class OpenRouterService {
  private apiKey: string;
  private apiEndpoint: string;
  private model: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY || 'sk-fbc36b72981b4937ad44ff8e20e63ba5';
    this.apiEndpoint = 'https://api.deepseek.com/chat/completions';
    this.model = 'deepseek-chat';
    
    if (!this.apiKey) {
      console.warn('⚠️ No DeepSeek API key found. Please set VITE_DEEPSEEK_API_KEY environment variable.');
    } else {
      console.log('🤖 DeepSeek Service initialized with DeepSeek-V3.2-Exp model');
      console.log('🔑 API Key:', this.apiKey.substring(0, 20) + '...');
      console.log('🌐 Endpoint:', this.apiEndpoint);
      console.log('🔍 Full API Key for debugging:', this.apiKey);
    }
  }

  /**
   * Generate a response using DeepSeek API
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<string> {
    try {
      console.log('🚀 DeepSeek API Request:', {
        model: this.model,
        endpoint: this.apiEndpoint,
        hasApiKey: !!this.apiKey,
        messageLength: userMessage.length
      });
      
      // Note: Using DeepSeek API directly with OpenAI-compatible format
      // Headers for DeepSeek API authentication
      // Build system prompt with context
      const systemPrompt = this.buildSystemPrompt(context, sources);
      
      // Build conversation messages
      const messages: OpenRouterMessage[] = [
        {
          role: 'system',
          content: systemPrompt
        },
        ...conversationHistory.map(msg => ({
          role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.parts[0].text
        })),
        {
          role: 'user',
          content: userMessage
        }
      ];

      const requestBody: OpenRouterRequest = {
        model: this.model,
        messages,
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 0.9,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
        user: 'stlouisdemojhs-user'
      };

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ DeepSeek API Error:', response.status, errorData);
        
        if (response.status === 429) {
          throw new Error('HIGH_TRAFFIC');
        } else if (response.status === 401) {
          console.error('🔑 DeepSeek API Key Invalid or Expired');
          console.error('🔍 Current API Key:', this.apiKey);
          console.error('📊 Error Details:', errorData);
          throw new Error('API_KEY_INVALID');
        } else if (response.status >= 500) {
          throw new Error('SERVICE_UNAVAILABLE');
        } else {
          throw new Error(`DeepSeek API error: ${response.status} - ${JSON.stringify(errorData)}`);
        }
      }

      const data: OpenRouterResponse = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response generated from DeepSeek API');
      }

      const choice = data.choices[0];
      if (!choice.message.content) {
        throw new Error('Empty response from DeepSeek API');
      }

      // Log usage statistics if available
      if (data.usage) {
        console.log('📊 DeepSeek Usage:', {
          prompt_tokens: data.usage.prompt_tokens,
          completion_tokens: data.usage.completion_tokens,
          total_tokens: data.usage.total_tokens,
          model: data.model
        });
      }

      return choice.message.content;

    } catch (error) {
      console.error('❌ DeepSeek API Error:', error);
      
      // Handle different types of errors
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('🌐 Network error - possible CORS or connectivity issue');
        throw new Error('NETWORK_ERROR');
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('UNKNOWN_ERROR');
      }
    }
  }

  /**
   * Build the system prompt with context and instructions
   */
  private buildSystemPrompt(context: string, sources: string[]): string {
    const cleanContext = context
      .replace(/\[Source \d+: [^\]]+\]/g, '') // Remove [Source 1: page] references
      .replace(/Title: [^\n]+\n/g, '') // Remove title lines
      .replace(/Category: [^\n]+\n/g, '') // Remove category lines
      .replace(/\n---\n\n/g, '\n\n') // Clean up separators
      .replace(/\n{3,}/g, '\n\n'); // Remove excessive line breaks

    return `You are Louis AI, the intelligent assistant for St. Louis Demonstration Junior High School in Kumasi, Ghana.

YOUR ROLE:
- You are a helpful, knowledgeable assistant for students, parents, and visitors
- You provide accurate information about the school, its programs, and services
- You are friendly, professional, and encouraging
- You help with academic guidance, admissions, and general school information

SCHOOL INFORMATION:
${cleanContext ? `\nRELEVANT SCHOOL DATA:\n${cleanContext}\n` : ''}

RESPONSE GUIDELINES:
1. **Be Helpful**: Provide clear, accurate, and useful information
2. **Be Professional**: Maintain a respectful and educational tone
3. **Be Encouraging**: Motivate students and support their learning journey
4. **Be Specific**: Use the school data provided to give detailed answers
5. **Be Friendly**: Show enthusiasm for education and student success

CONTENT GUIDELINES:
1. **Accuracy**: Only provide information you're certain about
2. **Relevance**: Focus on school-related topics and educational guidance
3. **Completeness**: Give comprehensive answers when possible
4. **Clarity**: Use clear, simple language appropriate for students
5. **Encouragement**: Motivate and inspire students in their educational journey
6. **Professionalism**: Maintain appropriate boundaries and educational focus
7. **Cultural Sensitivity**: Be respectful of Ghanaian culture and values
8. **Educational Focus**: Emphasize learning, growth, and academic success
9. **IMPORTANT: Do not include any source references, citations, or numbers in your response text**

RESPONSE FORMAT:
- Start with a warm greeting when appropriate
- Provide clear, structured information
- End with encouragement or next steps when relevant
- Keep responses conversational and engaging

Remember: You are representing St. Louis Demonstration JHS, so always be professional, helpful, and encouraging. Your goal is to support students, parents, and the school community with accurate and useful information.`;
  }

  /**
   * Get API status
   */
  public getApiStatus(): { 
    hasApiKey: boolean; 
    model: string; 
    endpoint: string;
  } {
    return {
      hasApiKey: !!this.apiKey,
      model: this.model,
      endpoint: this.apiEndpoint
    };
  }

  /**
   * Test API connection with a simple request
   */
  public async testConnection(): Promise<boolean> {
    try {
      const testResponse = await this.generateResponse('Hello, this is a test message.');
      console.log('✅ DeepSeek API test successful:', testResponse.substring(0, 50) + '...');
      return true;
    } catch (error) {
      console.error('❌ DeepSeek API test failed:', error);
      return false;
    }
  }

}

// Export singleton instance
const openRouterService = new OpenRouterService();
export default openRouterService;
