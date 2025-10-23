/**
 * Gemini API Service
 * Handles communication with Google's Gemini 2.0 Flash API
 */

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason: string;
    index: number;
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  }>;
  promptFeedback?: {
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  };
}

class GeminiService {
  private apiKey: string;
  private apiEndpoint: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
    
    if (!this.apiKey) {
      console.warn('⚠️ Gemini API key not found. Please set VITE_GEMINI_API_KEY in your environment variables.');
    }
  }

  /**
   * Generate a response from Gemini API
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: GeminiMessage[] = [],
    sources: string[] = []
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key is not configured. Please set VITE_GEMINI_API_KEY environment variable.');
    }

    try {
      // Build the system prompt with context
      const systemPrompt = this.buildSystemPrompt(context, sources);
      
      // Build the conversation history
      const contents: GeminiMessage[] = [
        {
          role: 'user',
          parts: [{ text: systemPrompt }]
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I am Louis AI, the intelligent assistant for St. Louis Demonstration JHS. I will provide accurate, helpful responses based on the school website data and cite my sources.' }]
        },
        ...conversationHistory,
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ];

      const requestBody = {
        contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      };

      const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data: GeminiResponse = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response generated from Gemini API');
      }

      const generatedText = data.candidates[0].content.parts[0].text;
      return generatedText;
    } catch (error) {
      console.error('❌ Gemini API Error:', error);
      throw error;
    }
  }

  /**
   * Build the system prompt with context and instructions
   */
  private buildSystemPrompt(context: string, sources: string[]): string {
    const sourcesText = sources.length > 0 
      ? `\n\nInformation retrieved from these pages:\n${sources.map(s => `- ${s}`).join('\n')}`
      : '';

    return `You are Louis AI, an intelligent and friendly assistant for St. Louis Demonstration Junior High School (St. Louis Demo JHS) in Kumasi, Ghana.

SCHOOL IDENTITY:
- Name: St. Louis Demonstration Junior High School
- Location: Suame Mbrom, Kumasi, Ashanti Region, Ghana
- Founded: 1977
- Type: Catholic Demonstration JHS
- Address: P.O. Box 3041, Mbrom-Kumasi, Ashanti Region, Ghana
- Phone: +233 20 870 5290
- Website: www.stlouisdemojhs.com

YOUR ROLE:
- Answer questions about the school accurately using the provided context
- Provide helpful, educational, and encouraging responses
- Be friendly, professional, and student-focused
- Cite specific information from the context when available
- If you don't know something, acknowledge it honestly

CONTEXT FROM SCHOOL WEBSITE:
${context}${sourcesText}

GUIDELINES:
1. Use the context above to answer questions accurately
2. Provide specific details (dates, numbers, names) when available
3. Format responses clearly with bullet points or numbered lists when appropriate
4. Keep responses concise but comprehensive (aim for 150-300 words)
5. Use a warm, encouraging tone suitable for students and parents
6. If the question is unrelated to the school, politely redirect to school-related topics
7. Never make up information - only use what's in the context
8. End responses with a helpful follow-up question or offer to help further when appropriate

Remember: You represent St. Louis Demo JHS, so maintain professionalism while being approachable and helpful.`;
  }
}

// Export a singleton instance
export const geminiService = new GeminiService();
export default geminiService;
