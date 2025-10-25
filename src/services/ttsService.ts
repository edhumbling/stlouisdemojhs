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
  private currentAudio: HTMLAudioElement | null = null;

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
   * Get available English voices
   */
  getAvailableVoices(): string[] {
    return [
      'Aaliyah-PlayAI', 'Adelaide-PlayAI', 'Angelo-PlayAI', 'Arista-PlayAI', 'Atlas-PlayAI',
      'Basil-PlayAI', 'Briggs-PlayAI', 'Calum-PlayAI', 'Celeste-PlayAI', 'Cheyenne-PlayAI',
      'Chip-PlayAI', 'Cillian-PlayAI', 'Deedee-PlayAI', 'Eleanor-PlayAI', 'Fritz-PlayAI',
      'Gail-PlayAI', 'Indigo-PlayAI', 'Jennifer-PlayAI', 'Judy-PlayAI', 'Mamaw-PlayAI',
      'Mason-PlayAI', 'Mikail-PlayAI', 'Mitch-PlayAI', 'Nia-PlayAI', 'Quinn-PlayAI',
      'Ruby-PlayAI', 'Thunder-PlayAI'
    ];
  }

  /**
   * Play audio from ArrayBuffer
   */
  async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    try {
      console.log('🎵 Preparing audio for playback...');
      
      // Stop any currently playing audio
      this.stopAudio();
      
      const blob = new Blob([audioBuffer], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);
      
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;
      
      // Simple playback without complex event handling
      return new Promise((resolve, reject) => {
        audio.oncanplay = () => {
          console.log('🎵 Audio ready, starting playback...');
          audio.play()
            .then(() => {
              console.log('🎵 Audio playback started');
              resolve();
            })
            .catch((error) => {
              console.error('Audio play error:', error);
              URL.revokeObjectURL(audioUrl);
              this.currentAudio = null;
              reject(error);
            });
        };

        audio.onerror = (error) => {
          console.error('Audio loading error:', error);
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
          reject(error);
        };

        audio.onended = () => {
          console.log('🎵 Audio playback completed');
          URL.revokeObjectURL(audioUrl);
          this.currentAudio = null;
        };
      });
    } catch (error) {
      console.error('Audio playback error:', error);
      throw error;
    }
  }

  /**
   * Stop currently playing audio
   */
  stopAudio(): void {
    if (this.currentAudio) {
      console.log('🎵 Stopping audio playback...');
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  /**
   * Check if audio is currently playing
   */
  isPlaying(): boolean {
    return this.currentAudio !== null && !this.currentAudio.paused;
  }
}

export const ttsService = new TTSService();