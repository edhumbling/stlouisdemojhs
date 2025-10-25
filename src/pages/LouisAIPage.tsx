import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Plus, MicOff, Volume2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import katex from 'katex';
import SEOHead from '../components/seo/SEOHead';
import AudioWaveform from '../components/AudioWaveform';
import unifiedAIService from '../services/unifiedAIService';
import ragEngine from '../services/ragEngine';
import speechToTextService from '../services/speechToTextService';
import whisperService from '../services/whisperService';
import microphonePermissionService from '../services/microphonePermissionService';
import groqCompoundService from '../services/groqCompoundService';
import groqVisionService from '../services/groqVisionService';
import { getUniqueSources } from '../utils/pageMapping';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Array<{ title: string; url: string; displayName: string; category: string }>;
  isRetryable?: boolean;
  originalQuery?: string;
  thinking?: string;
  images?: string[]; // Base64 image data for previews
}

const LouisAIPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [whisperSupported, setWhisperSupported] = useState(false);
  const [realtimeTranscript, setRealtimeTranscript] = useState('');
  const [showThinking, setShowThinking] = useState<{ [messageId: string]: boolean }>({});
  const [isInternetSearch, setIsInternetSearch] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isPlusClicked, setIsPlusClicked] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom only when user sends a message, not when AI responds
  useEffect(() => {
    // Only auto-scroll if the last message is from the user
    if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Initialize speech services
  useEffect(() => {
    const initializeSpeechServices = async () => {
      setSpeechSupported(speechToTextService.isSpeechSupported());
      setWhisperSupported(whisperService.hasApiKey());
      
      if (speechToTextService.isSpeechSupported()) {
        console.log('🎤 Browser speech recognition supported');
      }
      
      if (whisperService.hasApiKey()) {
        console.log('🎤 Whisper via Groq API available');
        
        // Check microphone permission
        const hasPermission = await microphonePermissionService.initialize();
        if (hasPermission) {
          console.log('🎤 Microphone permission already granted');
        } else {
          console.log('🎤 Microphone permission not granted - will request when needed');
        }
      }
    };

    initializeSpeechServices();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getDailyPrompts = () => {
    const dayOfWeek = new Date().getDay();
    const prompts = {
      0: [ // Sunday
    "What are the admission requirements?",
    "Tell me about St. Louis JHS's history.",
    "What STEM programs are available?",
        "How can I contact the school?"
      ],
      1: [ // Monday
        "What extracurricular activities are available?",
        "Tell me about the school's mission and values.",
        "What are the school hours?",
        "How can I apply for admission?"
      ],
      2: [ // Tuesday
        "What academic programs are offered?",
        "Tell me about the school's facilities.",
        "What support services are available?",
        "How can I schedule a visit?"
      ],
      3: [ // Wednesday
        "What are the school's achievements?",
        "Tell me about the faculty and staff.",
        "What technology resources are available?",
        "How can I get involved in school activities?"
      ],
      4: [ // Thursday
        "What are the school's policies?",
        "Tell me about the school's community involvement.",
        "What resources are available for parents?",
        "How can I stay updated with school news?"
      ],
      5: [ // Friday
        "What are the school's upcoming events?",
        "Tell me about the school's partnerships.",
        "What opportunities are available for students?",
        "How can I support the school?"
      ],
      6: [ // Saturday
        "What are the school's traditions?",
        "Tell me about the school's alumni network.",
        "What are the school's future plans?",
        "How can I learn more about the school?"
      ]
    };
    return prompts[dayOfWeek as keyof typeof prompts];
  };

  const suggestedPrompts = getDailyPrompts();

  const handlePromptClick = async (prompt: string) => {
    // Create a user message immediately without setting input
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Use RAG to find relevant content
      const ragResult = await ragEngine.search(prompt);

      // Get conversation history for context
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: msg.content }],
      }));

      // Generate response using Unified AI Service with thinking mode
      const { response, thinking } = await unifiedAIService.generateResponseWithThinking(
        prompt,
        ragResult.context,
        conversationHistory,
        ragResult.sources
      );

      // Extract sources for citation - only show if there are relevant sources
      const sources = getUniqueSources(
        ragResult.chunks.map(chunk => ({
          title: chunk.title,
          source: chunk.source,
          category: chunk.category,
        }))
      );

      // Only include sources if:
      // 1. There are sources available
      // 2. The query seems to be asking for factual information (not casual conversation)
      // 3. The response contains specific information that would benefit from citations
      const shouldShowSources = sources.length > 0 && (
        prompt.toLowerCase().includes('what') ||
        prompt.toLowerCase().includes('how') ||
        prompt.toLowerCase().includes('when') ||
        prompt.toLowerCase().includes('where') ||
        prompt.toLowerCase().includes('who') ||
        prompt.toLowerCase().includes('tell me') ||
        prompt.toLowerCase().includes('about') ||
        prompt.toLowerCase().includes('information') ||
        prompt.toLowerCase().includes('details') ||
        prompt.toLowerCase().includes('requirements') ||
        prompt.toLowerCase().includes('contact') ||
        prompt.toLowerCase().includes('admission') ||
        prompt.toLowerCase().includes('programs') ||
        prompt.toLowerCase().includes('facilities') ||
        prompt.toLowerCase().includes('history')
      );

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        sources: shouldShowSources ? sources : undefined,
        thinking: thinking,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error generating response:', err);

      let errorMessageContent = 'I apologize, but I encountered an error processing your request. Please try again.';
      let isRetryable = false;
      if (err instanceof Error) {
        if (err.message === 'SERVICE_UNAVAILABLE' || err.message === 'HIGH_TRAFFIC' || err.message === 'NETWORK_ERROR') {
          errorMessageContent = 'We are currently experiencing high traffic. Please come back later.';
          isRetryable = true;
        } else if (err.message === 'API_KEY_INVALID') {
          errorMessageContent = 'We are currently experiencing technical difficulties. Please try again later.';
          isRetryable = true;
        } else {
          setError(err.message); // Set specific error for debugging if needed
        }
      } else {
        setError('An unknown error occurred. Please try again.');
      }
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: errorMessageContent,
        timestamp: new Date(),
        isRetryable,
        originalQuery: isRetryable ? prompt : undefined,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Speech-to-text functions
  const handleStartListening = async () => {
    if (isListening || isLoading) return;
    
    try {
      setIsListening(true);
      setError(null);
      setRealtimeTranscript('Listening...');
      
      if (whisperSupported) {
        // Check microphone permission first
        const hasPermission = await microphonePermissionService.initialize();
        if (!hasPermission) {
          // Request permission
          const granted = await microphonePermissionService.requestMicrophonePermission();
          if (!granted) {
            throw new Error('Microphone permission denied');
          }
        }
        
        // Use Whisper API for better accuracy
        await handleWhisperRecording();
      } else if (speechSupported) {
        // Use browser speech recognition with real-time feedback
        console.log('🎤 Starting browser speech recognition...');
        const transcript = await speechToTextService.startListening((interimText) => {
          console.log('🎤 Interim result:', interimText);
          setRealtimeTranscript(interimText);
        });
        console.log('🎤 Final transcript:', transcript);
        setInput(transcript);
        setRealtimeTranscript('');
        setIsListening(false);
      } else {
        throw new Error('Speech recognition not supported');
      }
    } catch (error) {
      console.error('❌ Speech recognition error:', error);
      if (error instanceof Error && error.message.includes('permission')) {
        setError('Microphone permission is required for voice input. Please allow microphone access and try again.');
      } else {
        setError('Speech recognition failed. Please try typing your message.');
      }
      setRealtimeTranscript('');
      setIsListening(false);
    }
  };

  const handleWhisperRecording = async () => {
    try {
      setIsRecording(true);
      setRealtimeTranscript('Listening...');
      console.log('🎤 Starting real-time recording...');
      
      // Start recording with real-time feedback
      const audioFile = await whisperService.recordAudio(180000); // 3 minutes
      
      console.log('🎤 Recording completed, transcribing...');
      setRealtimeTranscript('Transcribing...');
      setIsRecording(false);
      setIsListening(false);
      
      // Process the audio file
      const transcript = await whisperService.transcribeAudio(audioFile);
      
      console.log('🎤 Transcription completed:', transcript);
      setInput(transcript);
      setRealtimeTranscript('');
    } catch (error) {
      console.error('❌ Whisper recording error:', error);
      setError('Audio recording failed. Please try typing your message.');
      setRealtimeTranscript('');
      setIsRecording(false);
      setIsListening(false);
    }
  };

  const handleStopListening = async () => {
    console.log('🎤 Stopping speech recognition...');
    
    if (whisperSupported && isRecording) {
      // Stop Whisper recording and process the audio
      try {
        whisperService.stopRecording();
        setRealtimeTranscript('Processing...');
        setIsRecording(false);
        setIsListening(false);
        
        // The recording will be processed in the handleWhisperRecording function
        // which will automatically transcribe and set the input
      } catch (error) {
        console.error('❌ Error stopping Whisper recording:', error);
        setError('Failed to stop recording. Please try again.');
        setIsRecording(false);
        setIsListening(false);
        setRealtimeTranscript('');
      }
    } else if (speechSupported && !whisperSupported) {
      // Stop browser speech recognition
      speechToTextService.stopListening();
      setIsListening(false);
      setRealtimeTranscript('');
    } else {
      // Fallback
      setIsListening(false);
      setIsRecording(false);
      setRealtimeTranscript('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      images: selectedImages.length > 0 ? imagePreviews : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    // Handle image analysis if images are selected
    if (selectedImages.length > 0) {
      try {
        const imageDataArray = await Promise.all(
          selectedImages.map(file => groqVisionService.fileToBase64(file))
        );
        
        const response = await groqVisionService.analyzeImages(
          imageDataArray,
          input.trim() || "What's in these images?",
          messages.slice(-6).map(msg => ({
            role: msg.role === 'user' ? 'user' as const : 'model' as const,
            parts: [{ text: msg.content }],
          }))
        );

        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          images: imagePreviews, // Include the analyzed images
        };

        setMessages(prev => [...prev, assistantMessage]);
        removeAllImages(); // Clear images after analysis
        return;
      } catch (err) {
        console.error('Error analyzing images:', err);
        setError('Failed to analyze images. Please try again.');
        return;
      } finally {
        setIsLoading(false);
      }
    }

    try {
      let response: string;
      let sources: any[] = [];
      let shouldShowSources = false;
      let thinking: string = '';

      if (isInternetSearch) {
        // Use Groq Compound for internet search
        console.log('🌐 Using internet search via Groq Compound');
        
        // Get conversation history for context
        const conversationHistory = messages.slice(-6).map(msg => ({
          role: msg.role === 'user' ? 'user' as const : 'model' as const,
          parts: [{ text: msg.content }],
        }));

        response = await groqCompoundService.generateResponse(
          userMessage.content,
          '', // No local context for internet search
          conversationHistory,
          []
        );
      } else {
      // Use RAG to find relevant content
      const ragResult = await ragEngine.search(userMessage.content);

      // Get conversation history for context
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: msg.content }],
      }));

        // Generate response using Unified AI Service with thinking mode
        const { response: aiResponse, thinking: aiThinking } = await unifiedAIService.generateResponseWithThinking(
        userMessage.content,
        ragResult.context,
        conversationHistory,
        ragResult.sources
      );

        response = aiResponse;
        thinking = aiThinking;

      // Extract sources for citation - only show if there are relevant sources
        sources = getUniqueSources(
        ragResult.chunks.map(chunk => ({
          title: chunk.title,
          source: chunk.source,
          category: chunk.category,
        }))
      );

      // Only include sources if:
      // 1. There are sources available
      // 2. The query seems to be asking for factual information (not casual conversation)
      // 3. The response contains specific information that would benefit from citations
        shouldShowSources = sources.length > 0 && (
        userMessage.content.toLowerCase().includes('what') ||
        userMessage.content.toLowerCase().includes('how') ||
        userMessage.content.toLowerCase().includes('when') ||
        userMessage.content.toLowerCase().includes('where') ||
        userMessage.content.toLowerCase().includes('who') ||
        userMessage.content.toLowerCase().includes('tell me') ||
        userMessage.content.toLowerCase().includes('about') ||
        userMessage.content.toLowerCase().includes('information') ||
        userMessage.content.toLowerCase().includes('details') ||
        userMessage.content.toLowerCase().includes('requirements') ||
        userMessage.content.toLowerCase().includes('contact') ||
        userMessage.content.toLowerCase().includes('admission') ||
        userMessage.content.toLowerCase().includes('programs') ||
        userMessage.content.toLowerCase().includes('facilities') ||
        userMessage.content.toLowerCase().includes('history')
      );
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        sources: shouldShowSources ? sources : undefined,
        thinking: thinking,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error generating response:', err);

      let errorMessageContent = 'I apologize, but I encountered an error processing your request. Please try again.';
      let isRetryable = false;
      if (err instanceof Error) {
        if (err.message === 'SERVICE_UNAVAILABLE' || err.message === 'HIGH_TRAFFIC' || err.message === 'NETWORK_ERROR') {
          errorMessageContent = 'We are currently experiencing high traffic. Please come back later.';
          isRetryable = true;
        } else if (err.message === 'API_KEY_INVALID') {
          errorMessageContent = 'We are currently experiencing technical difficulties. Please try again later.';
          isRetryable = true;
        } else {
          setError(err.message); // Set specific error for debugging if needed
        }
      } else {
        setError('An unknown error occurred. Please try again.');
      }
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: errorMessageContent,
        timestamp: new Date(),
        isRetryable,
        originalQuery: isRetryable ? userMessage.content : undefined,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleRetry = async (originalQuery: string) => {
    setInput(originalQuery);
    // Remove the error message from messages
    setMessages(prev => prev.filter(msg => !msg.isRetryable));
    // Directly submitting, creating a synthetic event
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    await handleSubmit(fakeEvent);
  };

  const startNewConversation = () => {
    setMessages([]);
    setInput('');
    setError(null);
    setShowThinking({});
    // Focus on input after clearing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const toggleThinking = (messageId: string) => {
    setShowThinking(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const toggleInternetSearch = () => {
    setIsInternetSearch(prev => !prev);
  };

  // Image handling functions
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // Check if adding these files would exceed the 5 image limit
    if (selectedImages.length + files.length > 5) {
      setError('Maximum 5 images allowed per request');
      return;
    }

    const validFiles: File[] = [];
    const validPreviews: string[] = [];

    for (const file of files) {
      const validation = groqVisionService.validateImageFile(file);
      if (validation.valid) {
        // Check resolution asynchronously
        const resolutionValidation = await groqVisionService.validateImageResolution(file);
        if (resolutionValidation.valid) {
          validFiles.push(file);
          
          // Create preview
          const reader = new FileReader();
          reader.onload = (e) => {
            const preview = e.target?.result as string;
            setImagePreviews(prev => [...prev, preview]);
          };
          reader.readAsDataURL(file);
        } else {
          setError(resolutionValidation.error || 'Invalid image resolution');
        }
      } else {
        setError(validation.error || 'Invalid image file');
      }
    }

    if (validFiles.length > 0) {
      setSelectedImages(prev => [...prev, ...validFiles]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeAllImages = () => {
    setSelectedImages([]);
    setImagePreviews([]);
  };

  const handlePlusClick = () => {
    setIsPlusClicked(true);
    // Reset highlight after animation
    setTimeout(() => setIsPlusClicked(false), 300);
  };

  // Custom tooltip component
  const CustomTooltip = ({ children, text }: { children: React.ReactNode; text: string }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    
    return (
      <div 
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
        {showTooltip && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-black text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
              {text}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Custom component to render LaTeX equations
  const renderLatex = (text: string) => {
    try {
      // Check if the text contains LaTeX commands
      if (text.includes('\\') || text.includes('$')) {
        // Clean up the text and try to render with KaTeX
        let cleanText = text;
        
        // Handle common LaTeX patterns
        if (text.includes('\\boxed')) {
          // Extract content from \boxed{...}
          const boxedMatch = text.match(/\\boxed\{([^}]+)\}/);
          if (boxedMatch) {
            cleanText = boxedMatch[1];
          }
        }
        
        // Handle chemical equations with semicolons
        if (cleanText.includes(';')) {
          cleanText = cleanText.replace(/;/g, ' ');
        }
        
        // Handle text commands
        cleanText = cleanText.replace(/\\text\{([^}]+)\}/g, '$1');
        
        // Handle subscripts and superscripts
        cleanText = cleanText.replace(/_(\d+)/g, '_{$1}');
        cleanText = cleanText.replace(/\^(\d+)/g, '^{$1}');
        
        // Handle arrows
        cleanText = cleanText.replace(/\\longrightarrow/g, '\\rightarrow');
        
        console.log('Processing LaTeX:', cleanText);
        
        // Try to render with KaTeX
        const html = katex.renderToString(cleanText, {
          throwOnError: false,
          displayMode: false,
          strict: false
        });
        return <span dangerouslySetInnerHTML={{ __html: html }} className="math-inline" />;
      }
      return text;
    } catch (error) {
      console.warn('LaTeX rendering error:', error);
      return text;
    }
  };


  const quickActions = [
    { icon: "🔍", label: "DeepSearch", action: () => {} },
    { icon: "🎨", label: "Create Images", action: () => {} },
    { icon: "📁", label: "Try Projects", action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <SEOHead
        title="Louis AI - Your Intelligent School Assistant | St. Louis Demo JHS"
        description="Chat with Louis AI, your intelligent assistant for St. Louis Demonstration JHS. Get instant, accurate answers about admissions, academics, facilities, and everything about our school."
        keywords="Louis AI, school assistant, AI chatbot, student help, school information, smart assistant"
        url="/louis-ai"
        type="website"
        pageType="ai-search"
      />

      {/* Louis AI Header */}
      <div className="sticky top-0 z-30 bg-[#1a1a1a] border-b border-[#2a2a2a]">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left side - New Chat button (far left on desktop) */}
            <div className="flex items-center">
              <button
                onClick={startNewConversation}
                className="flex items-center gap-2 px-3 py-2 bg-[#2a2a2a] hover:bg-[#333333] text-white/80 rounded-lg border border-[#3a3a3a] transition-colors duration-200 text-sm"
                title="Start new conversation"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">New Chat</span>
              </button>
            </div>

            {/* Center - Logo and Title */}
            <div className="flex items-center gap-3 flex-1 justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
                <img src="/applogo.png" alt="Louis Ai" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-white">Louis AI</h1>
            </div>

            {/* Right side - Placeholder for future features */}
            <div className="w-20 sm:w-24"></div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className={`h-[calc(100vh-140px)] overflow-y-auto pb-20 pt-16 ${imagePreviews.length > 0 ? 'pb-32' : ''}`}>
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
          {messages.length === 0 ? (
            /* Welcome Screen - Grok Style */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 sm:py-20"
            >
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">It's me Louis Ai!</h1>

              {/* Greeting */}
              <p className="text-base sm:text-lg text-white/70 mb-8 sm:mb-12">{getGreeting()}. How can I help you today?</p>


              {/* Suggested Prompts */}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 px-4">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(prompt)}
                    className="text-center px-3 py-2 bg-[#2a2a2a] hover:bg-[#333333] text-white/80 rounded-lg border border-[#3a3a3a] transition-colors duration-200 text-xs sm:text-sm sm:rounded-full sm:px-4 sm:py-1.5"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Message List - Grok Style */
            <div className="space-y-3 sm:space-y-4 pb-4 sm:pb-8">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                  >
                    {message.role === 'user' ? (
                      /* User Message - Grok Style */
                      <div className="flex justify-end mb-3 sm:mb-4">
                        <div className="bg-[#2a2a2a] text-white rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 max-w-[85%] sm:max-w-[80%] break-words overflow-wrap-anywhere">
                          {/* Image Previews */}
                          {message.images && message.images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {message.images.map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={`Uploaded image ${index + 1}`}
                                  className="w-16 h-16 object-cover rounded-lg border border-gray-600"
                                />
                              ))}
                            </div>
                          )}
                          <p className="text-sm sm:text-[15px] leading-relaxed break-words">{message.content}</p>
                        </div>
                      </div>
                    ) : (
                      /* Assistant Message - Grok Style with Markdown */
                      <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                          <img src="/applogo.png" alt="Louis Ai" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                        </div>
                        <div className="flex-1 min-w-0 break-words overflow-wrap-anywhere">
                          {/* Image Previews for Assistant Messages */}
                          {message.images && message.images.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {message.images.map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt={`Analyzed image ${index + 1}`}
                                  className="w-16 h-16 object-cover rounded-lg border border-gray-600"
                                />
                              ))}
                            </div>
                          )}
                          <div className="text-white/90 text-sm sm:text-[15px] leading-relaxed mb-2 sm:mb-3 prose prose-invert prose-sm sm:prose-base max-w-none break-words">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm, remarkMath]}
                              rehypePlugins={[rehypeKatex]}
                              components={{
                                p: ({ children }) => <p className="mb-3 leading-7 break-words">{children}</p>,
                                ul: ({ children }) => <ul className="mb-3 ml-4 list-disc space-y-1 break-words">{children}</ul>,
                                ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal space-y-1 break-words">{children}</ol>,
                                li: ({ children }) => <li className="leading-6 break-words">{children}</li>,
                                strong: ({ children }) => <strong className="font-semibold text-white break-words">{children}</strong>,
                                em: ({ children }) => <em className="italic text-white/95 break-words">{children}</em>,
                                code: ({ children }) => <code className="bg-[#2a2a2a] px-1.5 py-0.5 rounded text-yellow-300 text-sm break-words">{children}</code>,
                                pre: ({ children }) => <pre className="bg-[#2a2a2a] p-3 rounded-lg overflow-x-auto mb-3 text-sm break-words">{children}</pre>,
                                h1: ({ children }) => <h1 className="text-lg sm:text-xl font-bold mb-2 text-white break-words">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-base sm:text-lg font-bold mb-2 text-white break-words">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-sm sm:text-base font-semibold mb-2 text-white break-words">{children}</h3>,
                                a: ({ href, children }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-yellow-400 hover:text-yellow-300 italic underline transition-colors break-words"
                                  >
                                    {children}
                                  </a>
                                ),
                                blockquote: ({ children }) => (
                                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-white/80 mb-3 break-words">
                                    {children}
                                  </blockquote>
                                ),
                                // Math components for LaTeX rendering
                                math: ({ children }) => {
                                  console.log('Math component rendered:', children);
                                  return <span className="math-inline">{children}</span>;
                                },
                                inlineMath: ({ children }) => {
                                  console.log('Inline math component rendered:', children);
                                  return <span className="math-inline">{children}</span>;
                                },
                                blockMath: ({ children }) => {
                                  console.log('Block math component rendered:', children);
                                  return <div className="math-block my-4">{children}</div>;
                                },
                                // Custom text component to handle LaTeX in regular text
                                text: ({ children }) => {
                                  if (typeof children === 'string' && (children.includes('\\') || children.includes('$'))) {
                                    return renderLatex(children);
                                  }
                                  return children;
                                },
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>

                          {/* Thinking Mode Display with Faded Background */}
                          {message.thinking && (
                            <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
                              <button
                                onClick={() => toggleThinking(message.id)}
                                className="flex items-center gap-2 text-xs text-white/60 hover:text-white/80 transition-colors duration-200 mb-2"
                              >
                                <svg 
                                  className={`w-3 h-3 transition-transform duration-200 ${showThinking[message.id] ? 'rotate-90' : ''}`} 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                {showThinking[message.id] ? 'Hide' : 'Show'} AI thinking process
                              </button>
                              
                              {showThinking[message.id] && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="relative"
                                >
                                  {/* Faded background overlay */}
                                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none z-10"></div>
                                  
                                  {/* Thinking content with faded background */}
                                  <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3 text-xs text-white/50 leading-relaxed relative overflow-hidden">
                                    <div className="font-medium text-white/60 mb-2 flex items-center gap-2">
                                      <span>🤔</span>
                                      <span>AI Thinking Process:</span>
                                    </div>
                                    <div className="whitespace-pre-wrap break-words relative z-0">
                                      {message.thinking}
                                    </div>
                                    
                                    {/* Fade overlay that can be clicked to reveal */}
                                    {!showThinking[message.id] && (
                                      <div 
                                        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60 cursor-pointer z-20"
                                        onClick={() => toggleThinking(message.id)}
                                      >
                                        <div className="absolute bottom-2 left-2 right-2 text-center">
                                          <span className="text-white/40 text-xs">Click to reveal thinking...</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          )}

                          {/* Sources - Blue/Yellow Hyperlinks */}
                          {message.sources && message.sources.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs text-white/50 uppercase tracking-wide font-semibold">Sources:</span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 break-words">
                                {message.sources.map((source, idx) => (
                                  <React.Fragment key={idx}>
                                  <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 text-yellow-400 hover:text-yellow-300 italic underline transition-colors duration-200 text-xs sm:text-sm decoration-yellow-400/50 hover:decoration-yellow-300 break-words"
                                  >
                                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    <span className="break-words max-w-[120px] sm:max-w-[180px]">{source.displayName}</span>
                                  </a>
                                    {idx < message.sources.length - 1 && <span className="text-white/50">,</span>}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Retry Button for High Traffic Errors */}
                          {message.isRetryable && message.originalQuery && (
                            <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
                              <button
                                onClick={() => handleRetry(message.originalQuery!)}
                                disabled={isLoading}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors duration-200"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Try Again
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading Indicator - Grok Style */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 sm:gap-3 mb-3 sm:mb-4"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <img src="/applogo.png" alt="Louis Ai" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-1 sm:gap-1.5 items-center mb-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    {/* Fixed Thinking text */}
                    <div className="text-xs sm:text-sm text-white/60">
                      Thinking...
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ChatGPT-style Recording Status */}
              {(isRecording || isListening) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-white/80 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-white/60">
                      {realtimeTranscript || 'Listening...'}
                    </span>
                  </div>
                  <button
                    onClick={handleStopListening}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs rounded-md transition-colors border border-red-500/30"
                  >
                    Stop
                  </button>
                </motion.div>
              )}

              {/* Error Message - Grok Style */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-900/20 border border-red-700/30 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-red-400"
                >
                  {error}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Image Preview - Above Input Bar */}
      {imagePreviews.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50" style={{ bottom: '80px' }}>
          <div className="max-w-3xl mx-auto px-3 sm:px-4 pb-2">
            <div className="flex flex-wrap justify-center gap-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative w-16 h-16">
                  <img
                    src={preview}
                    alt={`Selected image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border border-gray-600 shadow-lg"
                  />
                  
                  {/* Edit Button */}
                  <CustomTooltip text="Edit image">
                    <button
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-x-3 w-4 h-4 bg-white hover:bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110"
                    >
                      <svg className="w-2 h-2 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </CustomTooltip>

                  {/* Remove Button */}
                  <CustomTooltip text="Remove image">
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 translate-x-3 w-4 h-4 bg-white hover:bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110"
                    >
                      <svg className="w-2 h-2 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </CustomTooltip>
                </div>
              ))}
              
              {/* Add More Button - Always visible when less than 5 images */}
              {imagePreviews.length < 5 && (
                <CustomTooltip text="Add more images">
                  <label
                    htmlFor="image-upload"
                    onClick={handlePlusClick}
                    className={`w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-300 transition-all duration-300 ${
                      isPlusClicked 
                        ? 'bg-blue-500/20 border-blue-400 scale-105 shadow-lg' 
                        : ''
                    }`}
                  >
                    <Plus size={20} className={`text-gray-400 transition-colors ${
                      isPlusClicked ? 'text-blue-400' : ''
                    }`} />
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isLoading}
                    />
                  </label>
                </CustomTooltip>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Input Area - Dynamic Design */}
      <div className={`border-t border-[#2a2a2a] bg-[#1a1a1a] safe-area-bottom fixed bottom-0 left-0 right-0 z-40`}>
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center">
              {/* ChatGPT-style Input Field */}
              <div className={`w-full transition-all duration-300 ease-in-out bg-[#2a2a2a] border border-[#3a3a3a] text-white focus-within:border-[#4a4a4a] disabled:opacity-50 ${
                (realtimeTranscript || input).length > 50 
                  ? 'py-4 sm:py-6 rounded-2xl text-base sm:text-lg' 
                  : 'py-3 sm:py-4 rounded-full text-sm sm:text-[15px]'
              } ${realtimeTranscript ? 'border-green-500/50 bg-green-900/10' : ''}`}>
                
                {/* Input Content */}
                <div className="flex items-center w-full">
                  {/* Plus Icon - Image Upload */}
                  <label
                    htmlFor="image-upload"
                    onClick={handlePlusClick}
                    className={`ml-3 sm:ml-4 p-1 transition-all duration-300 cursor-pointer rounded-full ${
                      selectedImages.length > 0
                        ? 'text-green-400 hover:text-green-300'
                        : 'text-white/60 hover:text-white/80'
                    } ${
                      isPlusClicked 
                        ? 'bg-blue-500/50 scale-110 text-blue-200 shadow-lg' 
                        : ''
                    }`}
                    title={selectedImages.length > 0 ? `${selectedImages.length} image(s) selected - Click to add more` : 'Upload images for analysis'}
                  >
                    <Plus size={16} />
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isLoading}
                    />
                  </label>

                  {/* Input Field or Waveform */}
                  <div className="flex-1 mx-2 sm:mx-3">
                    {isRecording || isListening ? (
                      /* Audio Waveform Visualization */
                      <div className="flex items-center h-6">
                        <AudioWaveform isActive={isRecording || isListening} />
                      </div>
                    ) : (
                      /* Text Input */
              <input
                ref={inputRef}
                type="text"
                        value={realtimeTranscript || input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                        placeholder={realtimeTranscript ? realtimeTranscript : "Message..."}
                disabled={isLoading}
                        className="w-full bg-transparent text-white placeholder-white/40 focus:outline-none"
                      />
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 mr-2 sm:mr-3">
                    {/* Internet Search Button */}
                    <button
                      type="button"
                      onClick={toggleInternetSearch}
                      disabled={isLoading}
                      className={`p-2 transition-all duration-300 ease-in-out rounded-full ${
                        isLoading
                          ? 'text-white/40 cursor-not-allowed'
                          : isInternetSearch
                          ? 'text-blue-400 hover:text-blue-300 bg-blue-500/20'
                          : 'text-white/60 hover:text-white/80'
                      }`}
                      title={isInternetSearch ? 'Disable internet search' : 'Enable internet search'}
                    >
                      <Globe size={16} />
                    </button>

                    {/* Microphone Button */}
                    {(speechSupported || whisperSupported) && (
                      <button
                        type="button"
                        onClick={isListening || isRecording ? handleStopListening : handleStartListening}
                        disabled={isLoading}
                        className={`p-2 transition-all duration-300 ease-in-out rounded-full ${
                          isLoading
                            ? 'text-white/40 cursor-not-allowed'
                            : isRecording
                            ? 'text-green-400 hover:text-green-300'
                            : isListening
                            ? 'text-red-400 hover:text-red-300'
                            : 'text-white/60 hover:text-white/80'
                        }`}
                        title={
                          isRecording 
                            ? 'Recording... Click to stop' 
                            : isListening 
                            ? 'Stop recording' 
                            : 'Start voice input'
                        }
                      >
                        {isRecording || isListening ? (
                          <MicOff size={16} />
                        ) : (
                          <Mic size={16} />
                        )}
                      </button>
                    )}

                    {/* Send Button */}
                  {input.trim() && !isLoading && (
                      <button
                      type="submit"
                        className="p-2 bg-white hover:bg-gray-100 text-gray-800 rounded-full transition-all duration-300 ease-in-out hover:scale-105"
                        title="Send message"
                      >
                        <Send size={16} />
                      </button>
                    )}

                    {/* Processing Indicator */}
                    {isLoading && (
                      <div className="p-2 text-white/60">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white/80 rounded-full animate-spin"></div>
                      </div>
                  )}
                  </div>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LouisAIPage;




