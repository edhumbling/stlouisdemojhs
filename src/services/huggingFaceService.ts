/**
 * Hugging Face API Service
 * Provides access to various Hugging Face models with automatic failover
 */

interface HuggingFaceResponse {
  generated_text?: string;
  error?: string;
}

interface ModelConfig {
  name: string;
  displayName: string;
  maxTokens: number;
  temperature: number;
}

class HuggingFaceService {
  private apiToken: string;
  private baseUrl: string = 'https://api-inference.huggingface.co/models';
  private currentModelIndex: number = 0;
  
  // Your selected models
  private models: ModelConfig[] = [
    {
      name: 'meta-llama/Meta-Llama-3-8B',
      displayName: 'Llama 3 8B',
      maxTokens: 2048,
      temperature: 0.7
    },
    {
      name: 'meta-llama/Llama-3.1-8B-Instruct',
      displayName: 'Llama 3.1 8B Instruct',
      maxTokens: 2048,
      temperature: 0.7
    },
    {
      name: 'mistralai/Mistral-Small-24B-Instruct-2501',
      displayName: 'Mistral Small 24B',
      maxTokens: 4096,
      temperature: 0.7
    },
    {
      name: 'google/gemma-3-27b-it',
      displayName: 'Gemma 3 27B',
      maxTokens: 4096,
      temperature: 0.7
    },
    {
      name: 'sesame/csm-1b',
      displayName: 'CSM 1B',
      maxTokens: 1024,
      temperature: 0.7
    }
  ];

  constructor() {
    this.apiToken = import.meta.env.VITE_HF_TOKEN || '';
    
    if (!this.apiToken) {
      console.warn('⚠️ No Hugging Face API token found. Please set VITE_HF_TOKEN environment variable.');
    }
  }

  /**
   * Get current model configuration
   */
  private getCurrentModel(): ModelConfig {
    return this.models[this.currentModelIndex];
  }

  /**
   * Switch to next available model
   */
  private switchToNextModel(): void {
    const previousIndex = this.currentModelIndex;
    this.currentModelIndex = (this.currentModelIndex + 1) % this.models.length;
    console.log(`🔄 Switched from ${this.models[previousIndex].displayName} to ${this.getCurrentModel().displayName}`);
  }

  /**
   * Check if there are more models available
   */
  private hasMoreModels(): boolean {
    return this.models.length > 1;
  }

  /**
   * Generate response using Hugging Face API
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = [],
    retryCount: number = 0
  ): Promise<string> {
    if (!this.apiToken) {
      throw new Error('Hugging Face API token is not configured');
    }

    const currentModel = this.getCurrentModel();
    const url = `${this.baseUrl}/${currentModel.name}`;

    // Build the prompt with context
    let prompt = this.buildPrompt(userMessage, context, conversationHistory);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: currentModel.maxTokens,
            temperature: currentModel.temperature,
            return_full_text: false,
            do_sample: true,
          }
        }),
      });

      if (!response.ok) {
        if (response.status === 429 || response.status === 503) {
          console.log(`🔄 Model ${currentModel.displayName} hit rate limit (${response.status})`);
          
          // Try next model if available and retry count is under limit
          if (this.hasMoreModels() && retryCount < 3) {
            this.switchToNextModel();
            console.log(`✅ Switched to ${this.getCurrentModel().displayName}, retrying... (attempt ${retryCount + 1})`);
            return this.generateResponse(userMessage, context, conversationHistory, sources, retryCount + 1);
          } else {
            throw new Error('SERVICE_UNAVAILABLE');
          }
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Hugging Face API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      const data: HuggingFaceResponse | HuggingFaceResponse[] = await response.json();
      
      // Handle both single response and array response
      let generatedText: string;
      if (Array.isArray(data)) {
        generatedText = data[0]?.generated_text || '';
      } else {
        generatedText = data.generated_text || '';
      }

      if (!generatedText) {
        throw new Error('No response generated from Hugging Face API');
      }

      // Clean up the response
      return this.cleanResponse(generatedText, prompt);

    } catch (error) {
      console.error('❌ Hugging Face API Error:', error);
      
      // Try next model if available and retry count is under limit
      if (this.hasMoreModels() && retryCount < 3 && error instanceof Error && error.message !== 'SERVICE_UNAVAILABLE') {
        this.switchToNextModel();
        console.log(`✅ Switched to ${this.getCurrentModel().displayName} due to error, retrying... (attempt ${retryCount + 1})`);
        return this.generateResponse(userMessage, context, conversationHistory, sources, retryCount + 1);
      }
      
      throw error;
    }
  }

  /**
   * Build the prompt with context and conversation history
   */
  private buildPrompt(userMessage: string, context: string, conversationHistory: any[]): string {
    let prompt = `You are Louis AI, an intelligent assistant for St. Louis Demonstration JHS. You help students, parents, and staff with school-related questions.

Context about St. Louis Demonstration JHS:
${context}

Recent conversation:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User: ${userMessage}

Louis AI:`;

    return prompt;
  }

  /**
   * Clean up the generated response
   */
  private cleanResponse(response: string, originalPrompt: string): string {
    // Remove the original prompt if it appears in the response
    let cleaned = response.replace(originalPrompt, '').trim();
    
    // Remove any remaining "Louis AI:" prefixes
    cleaned = cleaned.replace(/^Louis AI:\s*/i, '').trim();
    
    // Remove any trailing incomplete sentences
    if (cleaned.endsWith('...') || cleaned.endsWith('---')) {
      cleaned = cleaned.slice(0, -3).trim();
    }
    
    return cleaned || 'I apologize, but I couldn\'t generate a proper response. Please try again.';
  }

  /**
   * Get available models
   */
  public getAvailableModels(): ModelConfig[] {
    return this.models;
  }

  /**
   * Get current model status
   */
  public getCurrentModelStatus(): { currentModel: string; totalModels: number; hasMore: boolean } {
    return {
      currentModel: this.getCurrentModel().displayName,
      totalModels: this.models.length,
      hasMore: this.hasMoreModels()
    };
  }

  /**
   * Switch to a specific model by index
   */
  public switchToModel(index: number): void {
    if (index >= 0 && index < this.models.length) {
      this.currentModelIndex = index;
      console.log(`✅ Switched to ${this.getCurrentModel().displayName}`);
    }
  }
}

export default new HuggingFaceService();