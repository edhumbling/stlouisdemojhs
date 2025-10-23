/**
 * Unified AI Service
 * Provides a single interface for both Gemini and Hugging Face AI services
 */

import geminiService from './geminiService';
import huggingFaceService from './huggingFaceService';

type AIService = 'gemini' | 'huggingface';

interface AIServiceConfig {
  primary: AIService;
  fallback: AIService;
  autoSwitch: boolean;
}

class UnifiedAIService {
  private config: AIServiceConfig;
  private currentService: AIService;
  private serviceFailures: Map<AIService, number> = new Map();

  constructor() {
    // Get configuration from environment or use defaults
    const primaryService = (import.meta.env.VITE_DEFAULT_AI_SERVICE as AIService) || 'gemini';
    const fallbackService = primaryService === 'gemini' ? 'huggingface' : 'gemini';
    
    this.config = {
      primary: primaryService,
      fallback: fallbackService,
      autoSwitch: true
    };
    
    this.currentService = this.config.primary;
    
    console.log(`🤖 Unified AI Service initialized with primary: ${this.config.primary}, fallback: ${this.config.fallback}`);
  }

  /**
   * Generate response using the current AI service
   */
  async generateResponse(
    userMessage: string,
    context: string = '',
    conversationHistory: any[] = [],
    sources: string[] = []
  ): Promise<string> {
    try {
      if (this.currentService === 'gemini') {
        return await geminiService.generateResponse(userMessage, context, conversationHistory, sources);
      } else {
        return await huggingFaceService.generateResponse(userMessage, context, conversationHistory, sources);
      }
    } catch (error) {
      console.error(`❌ ${this.currentService} service failed:`, error);
      
      // Record failure
      const failures = this.serviceFailures.get(this.currentService) || 0;
      this.serviceFailures.set(this.currentService, failures + 1);
      
      // Auto-switch if enabled and fallback is available
      if (this.config.autoSwitch && this.currentService !== this.config.fallback) {
        console.log(`🔄 Auto-switching from ${this.currentService} to ${this.config.fallback}`);
        this.currentService = this.config.fallback;
        
        // Retry with fallback service
        return this.generateResponse(userMessage, context, conversationHistory, sources);
      }
      
      // If all services fail, provide a user-friendly high traffic message
      throw new Error('HIGH_TRAFFIC');
    }
  }

  /**
   * Switch to a specific AI service
   */
  public switchToService(service: AIService): void {
    this.currentService = service;
    console.log(`✅ Switched to ${service} service`);
  }

  /**
   * Get current service status
   */
  public getServiceStatus(): {
    current: AIService;
    primary: AIService;
    fallback: AIService;
    failures: Record<AIService, number>;
    availableServices: AIService[];
  } {
    return {
      current: this.currentService,
      primary: this.config.primary,
      fallback: this.config.fallback,
      failures: Object.fromEntries(this.serviceFailures),
      availableServices: ['gemini', 'huggingface']
    };
  }

  /**
   * Get Hugging Face models status
   */
  public getHuggingFaceStatus() {
    return huggingFaceService.getCurrentModelStatus();
  }

  /**
   * Get Gemini API key status
   */
  public getGeminiStatus() {
    return geminiService.getApiKeyStatus();
  }

  /**
   * Switch to a specific Hugging Face model
   */
  public switchToHuggingFaceModel(index: number): void {
    if (this.currentService === 'huggingface') {
      huggingFaceService.switchToModel(index);
    } else {
      console.warn('Cannot switch Hugging Face model when not using Hugging Face service');
    }
  }

  /**
   * Get available Hugging Face models
   */
  public getAvailableHuggingFaceModels() {
    return huggingFaceService.getAvailableModels();
  }

  /**
   * Reset service failures
   */
  public resetFailures(): void {
    this.serviceFailures.clear();
    console.log('🔄 Service failures reset');
  }

  /**
   * Set auto-switch behavior
   */
  public setAutoSwitch(enabled: boolean): void {
    this.config.autoSwitch = enabled;
    console.log(`🔄 Auto-switch ${enabled ? 'enabled' : 'disabled'}`);
  }
}

export default new UnifiedAIService();