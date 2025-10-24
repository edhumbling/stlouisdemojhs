/**
 * Groq Compound Service
 * Uses Groq Compound model with web search tools for internet search
 */

interface CompoundMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface CompoundRequest {
  model: string;
  messages: CompoundMessage[];
  temperature?: number;
  max_completion_tokens?: number;
  top_p?: number;
  stream?: boolean;
  stop?: string | string[] | null;
  compound_custom?: {
    tools: {
      enabled_tools: string[];
    };
  };
}

interface CompoundResponse {
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

class GroqCompoundService {
  private apiKey: string;
  private apiEndpoint: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY || 'your_groq_api_key_here';
    this.apiEndpoint = 'https://api.groq.com/openai/v1/chat/completions';
    
    console.log('🌐 Groq Compound Service initialized for web search');
    console.log('🔑 API Key:', this.apiKey ? `${this.apiKey.substring(0, 20)}...` : 'Not set');
    console.log('🌐 Endpoint:', this.apiEndpoint);
  }

  /**
   * Generate a response using Groq Compound with web search tools
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<string> {
    console.log('🚀 Groq Compound Request:', {
      endpoint: this.apiEndpoint,
      hasApiKey: !!this.apiKey,
      messageLength: userMessage.length
    });
    
    // Build system prompt with context
    const systemPrompt = this.buildSystemPrompt(context, sources);
    
    // Build conversation messages
    const messages: CompoundMessage[] = [
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

    const requestBody: CompoundRequest = {
      model: 'groq/compound',
      messages,
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
      compound_custom: {
        tools: {
          enabled_tools: ['web_search', 'code_interpreter', 'visit_website']
        }
      }
    };

    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Groq-Model-Version': 'latest'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Groq Compound Error:', response.status, errorData);
      
      if (response.status === 429) {
        throw new Error('HIGH_TRAFFIC');
      } else if (response.status === 401) {
        console.error('🔑 Groq API Key Invalid or Expired');
        console.error('🔍 Current API Key:', this.apiKey.substring(0, 20) + '...');
        console.error('📊 Error Details:', errorData);
        throw new Error('API_KEY_INVALID');
      } else if (response.status >= 500) {
        throw new Error('SERVICE_UNAVAILABLE');
      } else {
        throw new Error(`Groq Compound error: ${response.status} - ${JSON.stringify(errorData)}`);
      }
    }

    const data: CompoundResponse = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response generated from Groq Compound');
    }

    const choice = data.choices[0];
    if (!choice.message.content) {
      throw new Error('Empty response from Groq Compound');
    }

    // Log usage statistics if available
    if (data.usage) {
      console.log('📊 Groq Compound Usage:', {
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

    return `You are Louis AI, the intelligent assistant for St. Louis Demonstration Junior High School in Kumasi, Ghana, with access to real-time web search capabilities.

YOUR ROLE:
- You are a helpful, knowledgeable assistant for students, parents, and visitors
- You provide accurate information about the school, its programs, and services
- You have access to web search tools to find current, up-to-date information
- You are friendly, professional, and encouraging
- You help with academic guidance, admissions, and general school information

SCHOOL INFORMATION:
${cleanContext ? `\nRELEVANT SCHOOL DATA:\n${cleanContext}\n` : ''}

WEB SEARCH CAPABILITIES:
- You can search the web for real-time information using web_search tool
- You can visit websites to get detailed information using visit_website tool
- Use current data to provide accurate, up-to-date answers
- Combine school information with current web data when relevant
- Always verify information and provide reliable sources

RESPONSE GUIDELINES:
1. **Be Helpful**: Provide clear, accurate, and useful information
2. **Be Professional**: Maintain a respectful and educational tone
3. **Be Encouraging**: Motivate students and support their learning journey
4. **Be Specific**: Use the school data and web information to give detailed answers
5. **Be Friendly**: Show enthusiasm for education and student success
6. **Be Current**: Use real-time web data when relevant

CONTENT GUIDELINES:
1. **Accuracy**: Only provide information you're certain about
2. **Relevance**: Focus on school-related topics and educational guidance
3. **Completeness**: Give comprehensive answers when possible
4. **Clarity**: Use clear, simple language appropriate for students
5. **Encouragement**: Motivate and inspire students in their educational journey
6. **Professionalism**: Maintain appropriate boundaries and educational focus
7. **Cultural Sensitivity**: Be respectful of Ghanaian culture and values
8. **Educational Focus**: Emphasize learning, growth, and academic success

RESPONSE FORMAT:
- Start with a warm greeting when appropriate
- Provide clear, structured information
- End with encouragement or next steps when relevant
- Keep responses conversational and engaging

Remember: You are representing St. Louis Demonstration JHS, so always be professional, helpful, and encouraging. Your goal is to support students, parents, and the school community with accurate and useful information, enhanced by real-time web search capabilities.`;
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
      model: 'groq/compound',
      endpoint: this.apiEndpoint
    };
  }

  /**
   * Test API connection with a simple request
   */
  public async testConnection(): Promise<boolean> {
    try {
      const testResponse = await this.generateResponse('Hello, this is a test message.');
      console.log('✅ Groq Compound test successful:', testResponse.substring(0, 50) + '...');
      return true;
    } catch (error) {
      console.error('❌ Groq Compound test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
const groqCompoundService = new GroqCompoundService();
export default groqCompoundService;