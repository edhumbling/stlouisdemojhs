/**
 * Exa AI Service
 * Uses Exa AI API for internet search and real-time information
 */

interface ExaSearchRequest {
  query: string;
  type?: 'auto' | 'neural' | 'keyword' | 'fast';
  numResults?: number;
  text?: boolean;
  context?: boolean;
}

interface ExaSearchResult {
  title: string;
  url: string;
  publishedDate?: string;
  author?: string;
  text?: string;
  summary?: string;
  highlights?: string[];
}

interface ExaSearchResponse {
  requestId: string;
  resolvedSearchType: 'neural' | 'keyword';
  results: ExaSearchResult[];
  searchType: 'auto' | 'neural' | 'keyword';
  context?: string;
  costDollars: {
    total: number;
    breakDown: Array<{
      search: number;
      contents: number;
    }>;
  };
}

class ExaService {
  private apiKey: string;
  private apiEndpoint: string;

  constructor() {
    this.apiKey = '0aa7c589-a676-42ce-968f-1f2870a66755';
    this.apiEndpoint = 'https://api.exa.ai/search';
    
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
    console.log('🚀 Exa AI Search Request:', {
      endpoint: this.apiEndpoint,
      hasApiKey: !!this.apiKey,
      query: userMessage
    });
    
    const requestBody: ExaSearchRequest = {
      query: userMessage,
      type: 'auto',
      numResults: 10,
      text: true,
      context: true
    };

    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey
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

    const data: ExaSearchResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error('No search results found from Exa AI');
    }

    // Log search statistics
    console.log('📊 Exa AI Search Results:', {
      requestId: data.requestId,
      searchType: data.resolvedSearchType,
      numResults: data.results.length,
      cost: data.costDollars.total
    });

    // Format the search results into a comprehensive response
    let responseText = `Based on my search of current information:\n\n`;
    
    // Add context if available
    if (data.context) {
      responseText += data.context + '\n\n';
    }

    // Add individual results
    data.results.forEach((result, index) => {
      responseText += `**${index + 1}. ${result.title}**\n`;
      if (result.url) {
        responseText += `Source: ${result.url}\n`;
      }
      if (result.summary) {
        responseText += `Summary: ${result.summary}\n`;
      }
      if (result.text && result.text.length > 0) {
        const textPreview = result.text.substring(0, 500);
        responseText += `Content: ${textPreview}${result.text.length > 500 ? '...' : ''}\n`;
      }
      if (result.publishedDate) {
        responseText += `Published: ${new Date(result.publishedDate).toLocaleDateString()}\n`;
      }
      responseText += '\n';
    });

    return responseText;
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
