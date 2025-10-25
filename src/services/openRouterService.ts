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
  reasoning_format?: 'parsed' | 'raw' | 'hidden';
  reasoning_effort?: 'none' | 'default';
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
  private fallbackModels: string[];

  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY || 'your_groq_api_key_here';
    this.apiEndpoint = 'https://api.groq.com/openai/v1/chat/completions';
    this.primaryModel = 'qwen/qwen3-32b';
    this.fallbackModels = [
      'moonshotai/kimi-k2-instruct-0905', 
      'openai/gpt-oss-120b', 
      'openai/gpt-oss-20b',
      'meta-llama/llama-3.1-8b-instant',
      'meta-llama/llama-3.3-70b-versatile'
    ];
    
    if (!this.apiKey) {
      console.warn('⚠️ No Groq API key found. Please set VITE_GROQ_API_KEY environment variable.');
    } else {
      console.log('🤖 Groq Service initialized with Qwen3-32B (primary) and Kimi K2, GPT-120B, GPT-20B, Llama-3.1-8B, Llama-3.3-70B (fallbacks)');
      console.log('🔑 API Key:', this.apiKey.substring(0, 20) + '...');
      console.log('🌐 Endpoint:', this.apiEndpoint);
      console.log('🎯 Primary Model:', this.primaryModel);
      console.log('🔄 Fallback Models:', this.fallbackModels.join(', '));
    }
  }

  /**
   * Generate a response using Groq API with Kimi K2 primary and multiple fallbacks
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<string> {
    // Try primary model first (Kimi K2)
    try {
      const fullResponse = await this.makeApiRequest(userMessage, context, conversationHistory, sources, this.primaryModel);
      // Strip thinking content silently
      return this.stripThinkingContent(fullResponse);
    } catch (error) {
      // Handle quick fallback errors silently for primary model
      if (error instanceof Error && error.message === 'QUICK_FALLBACK') {
        console.log('🔄 Quick fallback for primary model - trying fallbacks silently');
      } else {
      console.warn('⚠️ Primary model (Kimi K2) failed, trying fallbacks:', error);
      }
      
      // Try each fallback model in order
      for (let i = 0; i < this.fallbackModels.length; i++) {
        const fallbackModel = this.fallbackModels[i];
      try {
          console.log(`🔄 Trying fallback ${i + 1}/${this.fallbackModels.length}: ${fallbackModel}`);
          const fullResponse = await this.makeApiRequest(userMessage, context, conversationHistory, sources, fallbackModel);
          // Strip thinking content silently
          return this.stripThinkingContent(fullResponse);
      } catch (fallbackError) {
          // Handle quick fallback errors silently
          if (fallbackError instanceof Error && fallbackError.message === 'QUICK_FALLBACK') {
            console.log(`🔄 Quick fallback for ${fallbackModel} - trying next model silently`);
            continue;
          }
          
          console.warn(`⚠️ Fallback model ${fallbackModel} failed:`, fallbackError);
          if (i === this.fallbackModels.length - 1) {
            console.error('❌ All models failed');
        throw fallbackError;
      }
    }
      }
      
      throw new Error('All models failed');
    }
  }

  /**
   * Strip thinking content from response silently
   */
  private stripThinkingContent(fullResponse: string): string {
    // Remove <think>...</think> tags and their content
    return fullResponse.replace(/<think>[\s\S]*?<\/think>\s*/g, '').trim();
  }

  /**
   * Generate a response with thinking mode support
   */
  async generateResponseWithThinking(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<{ response: string; thinking: string }> {
    const fullResponse = await this.generateResponse(userMessage, context, conversationHistory, sources);
    
    // Parse thinking content from response using <think> tags
    const thinkingMatch = fullResponse.match(/<think>([\s\S]*?)<\/think>/);
    const thinking = thinkingMatch ? thinkingMatch[1].trim() : '';
    
    // Extract the final response (everything after </think> or the full response if no thinking tags)
    const response = thinkingMatch 
      ? fullResponse.replace(/<think>[\s\S]*?<\/think>\s*/, '').trim()
      : fullResponse;
    
    return { response, thinking };
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
      user: 'stlouisdemojhs-user',
      // Add reasoning format parameters for Qwen3-32B
      ...(model === 'qwen/qwen3-32b' && {
        reasoning_format: 'hidden',
        reasoning_effort: 'default'
      })
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
      
      // Quick fallback for specific errors without showing error to user
      if (response.status === 413 || response.status === 400 || response.status === 429) {
        console.log(`🔄 Quick fallback triggered for status ${response.status} - switching to next model silently`);
        throw new Error('QUICK_FALLBACK');
      }
      
      console.error('❌ Groq API Error:', response.status, errorData);
      
      if (response.status === 401) {
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

THINKING MODE:
When responding, you should show your thinking process by using the following format:
<think>
[Your internal reasoning, analysis, and thought process here]
</think>

[Your final response to the user]

The thinking section should contain:
- Your analysis of the question
- How you're using the provided context
- Your reasoning process
- Any considerations or alternatives you're weighing
- Your confidence level in the information

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
    primaryModel: string;
    fallbackModels: string[];
    endpoint: string;
  } {
    return {
      hasApiKey: !!this.apiKey,
      primaryModel: this.primaryModel,
      fallbackModels: this.fallbackModels,
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
