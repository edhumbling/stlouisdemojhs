/**
 * Whisper Speech-to-Text Service
 * Uses OpenAI's Whisper API for advanced speech recognition
 */

interface WhisperRequest {
  model: string;
  file: File;
  language?: string;
  prompt?: string;
  response_format?: string;
  temperature?: number;
}

interface WhisperResponse {
  text: string;
}

class WhisperService {
  private apiKey: string;
  private apiEndpoint: string;
  private model: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY || 'your_groq_api_key_here';
    this.apiEndpoint = 'https://api.groq.com/openai/v1/audio/transcriptions';
    this.model = 'whisper-large-v3';
    
    if (!this.apiKey) {
      console.warn('⚠️ No Groq API key found. Please set VITE_GROQ_API_KEY environment variable.');
    } else {
      console.log('🎤 Whisper Service initialized with Groq API');
      console.log('🔑 API Key:', this.apiKey.substring(0, 20) + '...');
      console.log('🌐 Endpoint:', this.apiEndpoint);
      console.log('🤖 Model:', this.model);
    }
  }

  /**
   * Transcribe audio using Whisper API
   */
  public async transcribeAudio(
    audioFile: File,
    language: string = 'en',
    prompt?: string
  ): Promise<string> {
    try {
      console.log('🎤 Whisper API Request:', {
        model: this.model,
        fileSize: audioFile.size,
        fileType: audioFile.type,
        language: language
      });

      const formData = new FormData();
      formData.append('model', this.model);
      formData.append('file', audioFile);
      formData.append('language', language);
      formData.append('response_format', 'json');
      
      if (prompt) {
        formData.append('prompt', prompt);
      }

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Whisper API Error:', response.status, errorData);
        
        if (response.status === 429) {
          throw new Error('HIGH_TRAFFIC');
        } else if (response.status === 401) {
          console.error('🔑 Groq API Key Invalid or Expired');
          throw new Error('API_KEY_INVALID');
        } else if (response.status >= 500) {
          throw new Error('SERVICE_UNAVAILABLE');
        } else {
          throw new Error(`Whisper API error: ${response.status} - ${JSON.stringify(errorData)}`);
        }
      }

      const data: WhisperResponse = await response.json();
      
      if (!data.text) {
        throw new Error('No transcription returned from Whisper API');
      }

      console.log('🎤 Whisper transcription successful:', data.text.substring(0, 50) + '...');
      return data.text.trim();

    } catch (error) {
      console.error('❌ Whisper API Error:', error);
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('🌐 Network error - possible CORS or connectivity issue');
        throw new Error('NETWORK_ERROR');
      } else if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('UNKNOWN_ERROR');
      }
    }
  }

  /**
   * Record audio from microphone
   */
  public async recordAudio(duration: number = 180000): Promise<File> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          const audioChunks: Blob[] = [];

          mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
            stream.getTracks().forEach(track => track.stop());
            resolve(audioFile);
          };

          mediaRecorder.onerror = (event) => {
            console.error('❌ MediaRecorder error:', event);
            stream.getTracks().forEach(track => track.stop());
            reject(new Error('Audio recording failed'));
          };

          mediaRecorder.start();
          
          // Stop recording after specified duration
          setTimeout(() => {
            mediaRecorder.stop();
          }, duration);
        })
        .catch(error => {
          console.error('❌ Microphone access denied:', error);
          reject(new Error('Microphone access denied'));
        });
    });
  }

  /**
   * Get supported audio formats
   */
  public getSupportedFormats(): string[] {
    return [
      'audio/mpeg',
      'audio/mp4',
      'audio/wav',
      'audio/webm',
      'audio/ogg',
      'audio/flac'
    ];
  }

  /**
   * Get supported languages
   */
  public getSupportedLanguages(): { code: string; name: string }[] {
    return [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Spanish' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'it', name: 'Italian' },
      { code: 'pt', name: 'Portuguese' },
      { code: 'ru', name: 'Russian' },
      { code: 'ja', name: 'Japanese' },
      { code: 'ko', name: 'Korean' },
      { code: 'zh', name: 'Chinese' },
      { code: 'ar', name: 'Arabic' },
      { code: 'hi', name: 'Hindi' },
      { code: 'th', name: 'Thai' },
      { code: 'vi', name: 'Vietnamese' },
      { code: 'tr', name: 'Turkish' }
    ];
  }

  /**
   * Check if API key is available
   */
  public hasApiKey(): boolean {
    return !!this.apiKey && this.apiKey !== 'your_openai_api_key_here';
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
      hasApiKey: this.hasApiKey(),
      model: this.model,
      endpoint: this.apiEndpoint
    };
  }

  /**
   * Test API connection
   */
  public async testConnection(): Promise<boolean> {
    try {
      // Create a small test audio file
      const testAudio = new File(['test'], 'test.wav', { type: 'audio/wav' });
      await this.transcribeAudio(testAudio);
      console.log('✅ Whisper API test successful');
      return true;
    } catch (error) {
      console.error('❌ Whisper API test failed:', error);
      return false;
    }
  }
}

// Export singleton instance
const whisperService = new WhisperService();
export default whisperService;
