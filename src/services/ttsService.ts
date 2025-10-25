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
      console.log('🎵 Generating TTS audio...');
      const startTime = Date.now();
      
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

      // Wait for the complete response
      const audioBuffer = await response.arrayBuffer();
      const generationTime = Date.now() - startTime;
      
      console.log(`🎵 TTS audio generated in ${generationTime}ms (${(audioBuffer.byteLength / 1024).toFixed(1)}KB)`);
      
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
      console.log('🎵 Preparing audio for playback...');
      const blob = new Blob([audioBuffer], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);
      
      const audio = new Audio(audioUrl);
      
      // Wait for audio to be ready before playing
      return new Promise((resolve, reject) => {
        const handleCanPlay = () => {
          console.log('🎵 Audio ready, starting playback...');
          audio.play()
            .then(() => {
              console.log('🎵 Audio playback started');
              resolve();
            })
            .catch(reject);
        };

        const handleError = (error: Event) => {
          console.error('Audio playback error:', error);
          URL.revokeObjectURL(audioUrl);
          reject(error);
        };

        // Wait for audio to be ready
        audio.addEventListener('canplay', handleCanPlay, { once: true });
        audio.addEventListener('error', handleError, { once: true });
        
        // Load the audio
        audio.load();
        
        // Clean up the URL after playing
        audio.addEventListener('ended', () => {
          URL.revokeObjectURL(audioUrl);
        });
      });
    } catch (error) {
      console.error('Audio playback error:', error);
      throw error;
    }
  }
}

export const ttsService = new TTSService();