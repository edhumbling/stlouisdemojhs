/**
 * Exa AI Service
 * Uses Exa AI API for internet search and real-time information
 */

interface ExaMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ExaRequest {
  model: string;
  messages: ExaMessage[];
  stream: boolean;
}

interface ExaResponse {
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

class ExaService {
  private apiKey: string;
  private apiEndpoint: string;

  constructor() {
    this.apiKey = '0aa7c589-a676-42ce-968f-1f2870a66755';
    this.apiEndpoint = 'https://api.exa.ai/openai/v1/chat/completions';
    
    console.log('🌐 Exa AI Service initialized for internet search');
    console.log('🔑 API Key:', this.apiKey.substring(0, 20) + '...');
    console.log('🌐 Endpoint:', this.apiEndpoint);
  }

  /**
   * Generate a response using Exa AI for internet search
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<string> {
    console.log('🚀 Exa AI Request:', {
      endpoint: this.apiEndpoint,
      hasApiKey: !!this.apiKey,
      messageLength: userMessage.length
    });
    
    // Build system prompt with context
    const systemPrompt = this.buildSystemPrompt(context, sources);
    
    // Build conversation messages
    const messages: ExaMessage[] = [
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

    const requestBody: ExaRequest = {
      model: 'exa',
      messages,
      stream: false
    };

    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Exa AI Error:', response.status, errorData);
      
      if (response.status === 429) {
        throw new Error('HIGH_TRAFFIC');
      } else if (response.status === 401) {
        console.error('🔑 Exa AI Key Invalid or Expired');
        console.error('🔍 Current API Key:', this.apiKey.substring(0, 20) + '...');
        console.error('📊 Error Details:', errorData);
        throw new Error('API_KEY_INVALID');
      } else if (response.status >= 500) {
        throw new Error('SERVICE_UNAVAILABLE');
      } else {
        throw new Error(`Exa AI error: ${response.status} - ${JSON.stringify(errorData)}`);
      }
    }

    const data: ExaResponse = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response generated from Exa AI');
    }

    const choice = data.choices[0];
    if (!choice.message.content) {
      throw new Error('Empty response from Exa AI');
    }

    // Log usage statistics if available
    if (data.usage) {
      console.log('📊 Exa AI Usage:', {
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

    return `You are Louis AI, the intelligent assistant for St. Louis Demonstration Junior High School in Kumasi, Ghana, with access to real-time internet information.

YOUR ROLE:
- You are a helpful, knowledgeable assistant for students, parents, and visitors
- You provide accurate information about the school, its programs, and services
- You have access to real-time internet information to provide current and up-to-date answers
- You are friendly, professional, and encouraging
- You help with academic guidance, admissions, and general school information

SCHOOL INFORMATION:
${cleanContext ? `\nRELEVANT SCHOOL DATA:\n${cleanContext}\n` : ''}

INTERNET SEARCH CAPABILITIES:
- You can search the internet for real-time information
- Use current data to provide accurate, up-to-date answers
- Combine school information with current internet data when relevant
- Always verify information and provide reliable sources

THINKING MODE:
When responding, you should show your thinking process by using the following format:
<think>
[Your internal reasoning, analysis, and thought process here]
</think>

[Your final response to the user]

The thinking section should contain:
- Your analysis of the question
- How you're using the provided context and internet information
- Your reasoning process
- Any considerations or alternatives you're weighing
- Your confidence level in the information

RESPONSE GUIDELINES:
1. **Be Helpful**: Provide clear, accurate, and useful information
2. **Be Professional**: Maintain a respectful and educational tone
3. **Be Encouraging**: Motivate students and support their learning journey
4. **Be Specific**: Use the school data and internet information to give detailed answers
5. **Be Friendly**: Show enthusiasm for education and student success
6. **Be Current**: Use real-time internet data when relevant

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

Remember: You are representing St. Louis Demonstration JHS, so always be professional, helpful, and encouraging. Your goal is to support students, parents, and the school community with accurate and useful information, enhanced by real-time internet search capabilities.`;
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
      model: 'exa',
      endpoint: this.apiEndpoint
    };
  }

  /**
   * Test API connection with a simple request
   */
  public async testConnection(): Promise<boolean> {
    try {
      const testResponse = await this.generateResponse('Hello, this is a test message.');
      console.log('✅ Exa AI test successful:', testResponse.substring(0, 50) + '...');
      return true;
    } catch (error) {
      console.error('❌ Exa AI test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
const exaService = new ExaService();
export default exaService;
