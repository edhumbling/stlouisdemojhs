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
  private backupApiKey: string;
  private secondBackupApiKey: string;
  private apiEndpoint: string;
  private currentKeyIndex: number = 0;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    this.backupApiKey = import.meta.env.VITE_GEMINI_BACKUP_API_KEY || '';
    this.secondBackupApiKey = import.meta.env.VITE_GEMINI_SECOND_BACKUP_API_KEY || 'AIzaSyB37s1tv6tmN7gA2JF0KEVfHNS4xp41W94';
    this.apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
    
    if (!this.apiKey && !this.backupApiKey && !this.secondBackupApiKey) {
      console.warn('⚠️ No Gemini API keys found. Please set VITE_GEMINI_API_KEY and/or backup API key environment variables.');
    } else if (!this.apiKey && this.backupApiKey) {
      console.warn('⚠️ Primary Gemini API key not found. Using backup key.');
      this.apiKey = this.backupApiKey;
    }
  }

  /**
   * Get the current API key (primary, backup, or second backup)
   */
  private getCurrentApiKey(): string {
    switch (this.currentKeyIndex) {
      case 0:
        return this.apiKey;
      case 1:
        return this.backupApiKey;
      case 2:
        return this.secondBackupApiKey;
      default:
        return this.apiKey;
    }
  }

  /**
   * Switch to next available API key
   */
  private switchToBackupKey(): void {
    if (this.currentKeyIndex === 0 && this.backupApiKey) {
      this.currentKeyIndex = 1;
      console.log('🔄 Switched to first backup Gemini API key due to primary key quota/credit issues.');
    } else if (this.currentKeyIndex === 1 && this.secondBackupApiKey) {
      this.currentKeyIndex = 2;
      console.log('🔄 Switched to second backup Gemini API key due to first backup key quota/credit issues.');
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
    const currentApiKey = this.getCurrentApiKey();
    if (!currentApiKey) {
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
          parts: [{ text: 'I understand. I am Louis AI, the intelligent assistant for St. Louis Demonstration JHS. I will provide accurate, helpful responses based on the school website data.' }]
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

      const response = await fetch(`${this.apiEndpoint}?key=${currentApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        if (response.status === 503) {
          throw new Error('SERVICE_UNAVAILABLE');
        }
        
        // Check for quota/credit issues and switch to backup key
        if (response.status === 429 || response.status === 403) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error?.message || '';
          
          // Check if it's a quota/credit issue and backup key is available
          if (errorMessage.includes('quota') || errorMessage.includes('credit') || errorMessage.includes('billing')) {
            if ((this.currentKeyIndex === 0 && this.backupApiKey) || 
                (this.currentKeyIndex === 1 && this.secondBackupApiKey)) {
              this.switchToBackupKey();
              // Retry with backup key
              return this.generateResponse(userMessage, context, conversationHistory, sources);
            }
          }
        }
        
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
    // Clean the context by removing source references and numbers
    const cleanContext = context
      .replace(/\[Source \d+: [^\]]+\]/g, '') // Remove [Source 1: page] references
      .replace(/Title: [^\n]+\n/g, '') // Remove Title: lines
      .replace(/Category: [^\n]+\n/g, '') // Remove Category: lines
      .replace(/\n---\n\n/g, '\n\n') // Clean up separators
      .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
      .trim();

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
- If you don't know something, acknowledge it honestly
- Do NOT mention sources, citations, or reference numbers in your responses

CONTEXT FROM SCHOOL WEBSITE:
${cleanContext}

FORMATTING GUIDELINES (IMPORTANT):
1. Use **markdown formatting** for better readability
2. Use **bold** for important terms and headings
3. Use bullet points (- or *) for lists
4. Use numbered lists (1. 2. 3.) for sequential information
5. Add **blank lines** between paragraphs for better spacing
6. Use > for quotes or important notes
7. For emphasis, use *italics* or **bold**
8. Format numbers and dates clearly

CONTENT GUIDELINES:
1. Use the context above to answer questions accurately
2. Provide specific details (dates, numbers, names) when available
3. **Break long responses into clear paragraphs** with spacing
4. Keep responses concise but comprehensive (aim for 150-300 words)
5. Use a warm, encouraging tone suitable for students and parents
6. If the question is unrelated to the school, politely redirect to school-related topics
7. Never make up information - only use what's in the context
8. End responses with a helpful follow-up question or offer to help further
9. **IMPORTANT: Do not include any source references, citations, or numbers in your response text**

EXAMPLE FORMAT:
**Main Topic**

First paragraph explaining the main point with proper spacing.

- Bullet point 1
- Bullet point 2
- Bullet point 3

Second paragraph with additional details.

**Important Note:** Use bold for key information.

Remember: You represent St. Louis Demo JHS, so maintain professionalism while being approachable and helpful.`;
  }
}

// Export a singleton instance
export const geminiService = new GeminiService();
export default geminiService;

