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
  private primaryModel: string;
  private fallbackModel: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY || 'your_groq_api_key_here';
    this.apiEndpoint = 'https://api.groq.com/openai/v1/chat/completions';
    this.primaryModel = 'openai/gpt-oss-20b';
    this.fallbackModel = 'openai/gpt-oss-120b';
    
    if (!this.apiKey) {
      console.warn('⚠️ No Groq API key found. Please set VITE_GROQ_API_KEY environment variable.');
    } else {
      console.log('🤖 Groq Service initialized with GPT-20B (primary) and GPT-120B (fallback)');
      console.log('🔑 API Key:', this.apiKey.substring(0, 20) + '...');
      console.log('🌐 Endpoint:', this.apiEndpoint);
      console.log('🎯 Primary Model:', this.primaryModel);
      console.log('🔄 Fallback Model:', this.fallbackModel);
    }
  }

  /**
   * Generate a response using Groq API with fallback to GPT-120B
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<string> {
    // Try primary model first (GPT-20B)
    try {
      return await this.makeApiRequest(userMessage, context, conversationHistory, sources, this.primaryModel);
    } catch (error) {
      console.warn('⚠️ Primary model (GPT-20B) failed, trying fallback (GPT-120B):', error);
      
      // Try fallback model (GPT-120B)
      try {
        return await this.makeApiRequest(userMessage, context, conversationHistory, sources, this.fallbackModel);
      } catch (fallbackError) {
        console.error('❌ Both primary and fallback models failed');
        throw fallbackError;
      }
    }
  }

  /**
   * Make API request to Groq with specified model
   */
  private async makeApiRequest(
    userMessage: string,
    context: string,
    conversationHistory: any[],
    sources: string[],
    model: string
  ): Promise<string> {
    console.log('🚀 Groq API Request:', {
      model: model,
      endpoint: this.apiEndpoint,
      hasApiKey: !!this.apiKey,
      messageLength: userMessage.length
    });
    
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
      model: model,
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
      console.error('❌ Groq API Error:', response.status, errorData);
      
      if (response.status === 429) {
        throw new Error('HIGH_TRAFFIC');
      } else if (response.status === 401) {
        console.error('🔑 Groq API Key Invalid or Expired');
        console.error('🔍 Current API Key:', this.apiKey);
        console.error('📊 Error Details:', errorData);
        throw new Error('API_KEY_INVALID');
      } else if (response.status >= 500) {
        throw new Error('SERVICE_UNAVAILABLE');
      } else {
        throw new Error(`Groq API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }
    }

    const data: OpenRouterResponse = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response generated from Groq API');
    }

    const choice = data.choices[0];
    if (!choice.message.content) {
      throw new Error('Empty response from Groq API');
    }

    // Log usage statistics if available
    if (data.usage) {
      console.log('📊 Groq Usage:', {
        prompt_tokens: data.usage.prompt_tokens,
        completion_tokens: data.usage.completion_tokens,
        total_tokens: data.usage.total_tokens,
        model: data.model
      });
    }

    return choice.message.content;
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
- Be creative and varied in your openings - avoid always starting with "Hello"
- Use engaging, context-appropriate openings that feel natural
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
    primaryModel: string;
    fallbackModel: string;
    endpoint: string;
  } {
    return {
      hasApiKey: !!this.apiKey,
      primaryModel: this.primaryModel,
      fallbackModel: this.fallbackModel,
      endpoint: this.apiEndpoint
    };
  }

  /**
   * Test API connection with a simple request
   */
  public async testConnection(): Promise<boolean> {
    try {
      const testResponse = await this.generateResponse('Hello, this is a test message.');
      console.log('✅ Groq API test successful:', testResponse.substring(0, 50) + '...');
      return true;
    } catch (error) {
      console.error('❌ Groq API test failed:', error);
      return false;
    }
  }

}

// Export singleton instance
const openRouterService = new OpenRouterService();
export default openRouterService;
