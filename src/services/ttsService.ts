/**
 * Text-to-Speech Service using Groq's playai-tts model
 */

const apiKey = import.meta.env.VITE_GROQ_API_KEY;
const apiEndpoint = 'https://api.groq.com/openai/v1/audio/speech';

export interface TTSRequest {
  model: string;
  input: string;
  voice: string;
  response_format: string;
}

export interface TTSResponse {
  audio: ArrayBuffer;
}

class TTSService {
  private apiKey: string;
  private apiEndpoint: string;

  constructor() {
    this.apiKey = apiKey;
    this.apiEndpoint = apiEndpoint;
    
    if (!this.apiKey) {
      console.warn('Groq API key not found. TTS functionality will be disabled.');
    }
  }

  /**
   * Convert text to speech using Groq's playai-tts model
   */
  async textToSpeech(text: string, voice: string = 'Aaliyah-PlayAI'): Promise<ArrayBuffer> {
    if (!this.apiKey) {
      throw new Error('Groq API key not found. Please set VITE_GROQ_API_KEY in your environment variables.');
    }

    const requestBody: TTSRequest = {
      model: 'playai-tts',
      input: text,
      voice: voice,
      response_format: 'wav'
    };

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`TTS API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const audioBuffer = await response.arrayBuffer();
      return audioBuffer;
    } catch (error) {
      console.error('TTS Service Error:', error);
      throw error;
    }
  }

  /**
   * Play audio from ArrayBuffer
   */
  async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    try {
      const blob = new Blob([audioBuffer], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);
      
      const audio = new Audio(audioUrl);
      audio.play();
      
      // Clean up the URL after playing
      audio.addEventListener('ended', () => {
        URL.revokeObjectURL(audioUrl);
      });
    } catch (error) {
      console.error('Audio playback error:', error);
      throw error;
    }
  }
}

export const ttsService = new TTSService();