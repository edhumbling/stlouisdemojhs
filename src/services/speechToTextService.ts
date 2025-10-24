/**
 * Speech-to-Text Service
 * Uses browser's Web Speech API and Whisper model for speech recognition
 */

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  serviceURI: string;
  grammars: SpeechGrammarList;
  start(): void;
  stop(): void;
  abort(): void;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare var SpeechRecognition: SpeechRecognitionConstructor;
declare var webkitSpeechRecognition: SpeechRecognitionConstructor;

class SpeechToTextService {
  private recognition: SpeechRecognition | null = null;
  private isListening: boolean = false;
  private isSupported: boolean = false;

  constructor() {
    this.initializeSpeechRecognition();
  }

  /**
   * Initialize speech recognition
   */
  private initializeSpeechRecognition(): void {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        console.warn('⚠️ Speech recognition not supported in this browser');
        this.isSupported = false;
        return;
      }

      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;

      this.isSupported = true;
      console.log('🎤 Speech-to-Text service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize speech recognition:', error);
      this.isSupported = false;
    }
  }

  /**
   * Start listening for speech with real-time callbacks
   */
  public startListening(onInterimResult?: (text: string) => void): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.isSupported || !this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      if (this.isListening) {
        reject(new Error('Already listening'));
        return;
      }

      let finalTranscript = '';
      let interimTranscript = '';

      this.recognition!.onstart = () => {
        console.log('🎤 Speech recognition started');
        this.isListening = true;
      };

      this.recognition!.onresult = (event: SpeechRecognitionEvent) => {
        interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Emit interim results for real-time feedback
        if (interimTranscript && onInterimResult) {
          console.log('🎤 Interim transcript:', interimTranscript);
          onInterimResult(finalTranscript + interimTranscript);
        }
      };

      this.recognition!.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('❌ Speech recognition error:', event.error);
        this.isListening = false;
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      this.recognition!.onend = () => {
        console.log('🎤 Speech recognition ended');
        this.isListening = false;
        
        if (finalTranscript.trim()) {
          console.log('🎤 Final transcript:', finalTranscript);
          resolve(finalTranscript.trim());
        } else {
          reject(new Error('No speech detected'));
        }
      };

      this.recognition!.start();
    });
  }

  /**
   * Stop listening for speech
   */
  public stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      console.log('🎤 Speech recognition stopped');
    }
  }

  /**
   * Check if speech recognition is supported
   */
  public isSpeechSupported(): boolean {
    return this.isSupported;
  }

  /**
   * Check if currently listening
   */
  public isCurrentlyListening(): boolean {
    return this.isListening;
  }

  /**
   * Get available languages
   */
  public getSupportedLanguages(): string[] {
    return [
      'en-US', 'en-GB', 'en-AU', 'en-CA',
      'es-ES', 'es-MX', 'fr-FR', 'fr-CA',
      'de-DE', 'it-IT', 'pt-BR', 'pt-PT',
      'nl-NL', 'sv-SE', 'no-NO', 'da-DK',
      'fi-FI', 'pl-PL', 'ru-RU', 'ja-JP',
      'ko-KR', 'zh-CN', 'zh-TW', 'ar-SA',
      'hi-IN', 'th-TH', 'vi-VN', 'tr-TR'
    ];
  }

  /**
   * Set language for speech recognition
   */
  public setLanguage(lang: string): void {
    if (this.recognition) {
      this.recognition.lang = lang;
      console.log('🎤 Language set to:', lang);
    }
  }

  /**
   * Get current language
   */
  public getCurrentLanguage(): string {
    return this.recognition?.lang || 'en-US';
  }
}

// Export singleton instance
const speechToTextService = new SpeechToTextService();
export default speechToTextService;
