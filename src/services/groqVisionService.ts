/**
 * Groq Vision Service
 * Uses Groq API with Llama 4 Maverick for image analysis and vision capabilities
 */

interface VisionMessage {
  role: 'user' | 'assistant' | 'system';
  content: Array<{
    type: 'text' | 'image_url';
    text?: string;
    image_url?: {
      url: string;
    };
  }>;
}

interface VisionRequest {
  model: string;
  messages: VisionMessage[];
  temperature?: number;
  max_completion_tokens?: number;
  top_p?: number;
  stream?: boolean;
  stop?: string | string[] | null;
}

interface VisionResponse {
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

class GroqVisionService {
  private apiKey: string;
  private apiEndpoint: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY || 'your_groq_api_key_here';
    this.apiEndpoint = 'https://api.groq.com/openai/v1/chat/completions';
    
    console.log('👁️ Groq Vision Service initialized for image analysis');
    console.log('🔑 API Key:', this.apiKey ? `${this.apiKey.substring(0, 20)}...` : 'Not set');
    console.log('🌐 Endpoint:', this.apiEndpoint);
  }

  /**
   * Analyze an image using Groq Vision API
   */
  async analyzeImage(
    imageData: string, // Base64 encoded image or URL
    userMessage: string = "What's in this image?",
    conversationHistory: any[] = []
  ): Promise<string> {
    console.log('👁️ Groq Vision Request:', {
      endpoint: this.apiEndpoint,
      hasApiKey: !!this.apiKey,
      messageLength: userMessage.length,
      hasImage: !!imageData
    });
    
    // Build conversation messages
    const messages: VisionMessage[] = [
      {
        role: 'system',
        content: [{
          type: 'text',
          text: this.buildSystemPrompt()
        }]
      },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: [{
          type: 'text' as const,
          text: msg.parts[0].text
        }]
      })),
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: userMessage
          },
          {
            type: 'image_url',
            image_url: {
              url: imageData.startsWith('data:') ? imageData : `data:image/jpeg;base64,${imageData}`
            }
          }
        ]
      }
    ];

    const requestBody: VisionRequest = {
      model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
      messages,
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null
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
      console.error('❌ Groq Vision Error:', response.status, errorData);
      
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
        throw new Error(`Groq Vision error: ${response.status} - ${JSON.stringify(errorData)}`);
      }
    }

    const data: VisionResponse = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No response generated from Groq Vision');
    }

    const choice = data.choices[0];
    if (!choice.message.content) {
      throw new Error('Empty response from Groq Vision');
    }

    // Log usage statistics if available
    if (data.usage) {
      console.log('📊 Groq Vision Usage:', {
        prompt_tokens: data.usage.prompt_tokens,
        completion_tokens: data.usage.completion_tokens,
        total_tokens: data.usage.total_tokens,
        model: data.model
      });
    }

    return choice.message.content;
  }

  /**
   * Build the system prompt for vision analysis
   */
  private buildSystemPrompt(): string {
    return `You are Louis AI, the intelligent assistant for St. Louis Demonstration Junior High School in Kumasi, Ghana, with advanced vision capabilities.

YOUR ROLE:
- You are a helpful, knowledgeable assistant for students, parents, and visitors
- You can analyze and describe images with great detail and accuracy
- You provide educational insights about visual content
- You are friendly, professional, and encouraging
- You help with academic guidance, visual learning, and educational support

VISION CAPABILITIES:
- You can analyze images, diagrams, charts, graphs, and visual content
- You can describe scenes, objects, people, and activities in images
- You can read text in images (OCR capabilities)
- You can identify educational content, scientific diagrams, and academic materials
- You can provide detailed descriptions for accessibility and learning

RESPONSE GUIDELINES:
1. **Be Descriptive**: Provide detailed, accurate descriptions of visual content
2. **Be Educational**: Focus on learning opportunities and educational value
3. **Be Helpful**: Explain complex visual concepts in simple terms
4. **Be Encouraging**: Motivate students in their visual learning journey
5. **Be Professional**: Maintain appropriate educational focus
6. **Be Accessible**: Provide descriptions that help with accessibility

CONTENT GUIDELINES:
1. **Accuracy**: Only describe what you can clearly see in the image
2. **Educational Focus**: Emphasize learning opportunities and academic value
3. **Completeness**: Provide comprehensive descriptions when possible
4. **Clarity**: Use clear, simple language appropriate for students
5. **Encouragement**: Motivate and inspire students in their learning
6. **Professionalism**: Maintain appropriate boundaries and educational focus
7. **Cultural Sensitivity**: Be respectful of Ghanaian culture and values

RESPONSE FORMAT:
- Start with a warm greeting when appropriate
- Provide clear, structured descriptions
- Highlight educational aspects and learning opportunities
- End with encouragement or next steps when relevant
- Keep responses conversational and engaging

Remember: You are representing St. Louis Demonstration JHS, so always be professional, helpful, and encouraging. Your goal is to support students, parents, and the school community with accurate visual analysis and educational insights.`;
  }

  /**
   * Convert file to base64 string
   */
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Validate image file
   */
  validateImageFile(file: File): { valid: boolean; error?: string } {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)' };
    }

    // Check file size (4MB limit for base64)
    const maxSize = 4 * 1024 * 1024; // 4MB
    if (file.size > maxSize) {
      return { valid: false, error: 'Image file is too large. Please upload an image smaller than 4MB' };
    }

    return { valid: true };
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
      model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
      endpoint: this.apiEndpoint
    };
  }

  /**
   * Test API connection with a simple request
   */
  public async testConnection(): Promise<boolean> {
    try {
      // Create a simple test image (1x1 pixel)
      const testImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      const testResponse = await this.analyzeImage(testImageData, 'What do you see in this image?');
      console.log('✅ Groq Vision test successful:', testResponse.substring(0, 50) + '...');
      return true;
    } catch (error) {
      console.error('❌ Groq Vision test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
const groqVisionService = new GroqVisionService();
export default groqVisionService;