import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/seo/SEOHead';
import geminiService from '../services/geminiService';
import ragEngine from '../services/ragEngine';
import { getUniqueSources } from '../utils/pageMapping';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: Array<{ title: string; url: string; displayName: string; category: string }>;
}

const LouisAIPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Use RAG to find relevant content
      const ragResult = await ragEngine.search(userMessage.content);

      // Get conversation history for context
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'model' as const,
        parts: [{ text: msg.content }],
      }));

      // Generate response using Gemini
      const response = await geminiService.generateResponse(
        userMessage.content,
        ragResult.context,
        conversationHistory,
        ragResult.sources
      );

      // Extract sources for citation
      const sources = getUniqueSources(
        ragResult.chunks.map(chunk => ({
          title: chunk.title,
          source: chunk.source,
          category: chunk.category,
        }))
      );

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        sources: sources.length > 0 ? sources : undefined,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error generating response:', err);
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
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

  const quickActions = [
    { icon: "🔍", label: "DeepSearch", action: () => {} },
    { icon: "🎨", label: "Create Images", action: () => {} },
    { icon: "📁", label: "Try Projects", action: () => {} },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] overflow-hidden pt-16">
      <SEOHead
        title="Louis AI - Your Intelligent School Assistant | St. Louis Demo JHS"
        description="Chat with Louis AI, your intelligent assistant for St. Louis Demonstration JHS. Get instant, accurate answers about admissions, academics, facilities, and everything about our school."
        keywords="Louis AI, school assistant, AI chatbot, student help, school information, smart assistant"
        url="/louis-ai"
        type="website"
        pageType="ai-search"
      />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
          {messages.length === 0 ? (
            /* Welcome Screen - Grok Style */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 sm:py-20"
            >
              {/* Logo */}
              <div className="flex justify-center items-center gap-2 sm:gap-3 mb-8 sm:mb-12">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center">
                  <img src="/applogo.png" alt="Louis" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Louis</h1>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#2a2a2a] hover:bg-[#333333] text-white rounded-full border border-[#3a3a3a] transition-colors duration-200 text-xs sm:text-sm"
                  >
                    <span className="text-sm sm:text-base">{action.icon}</span>
                    <span className="hidden sm:inline">{action.label}</span>
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
                        <div className="bg-[#2a2a2a] text-white rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 max-w-[85%] sm:max-w-[80%]">
                          <p className="text-sm sm:text-[15px] leading-relaxed">{message.content}</p>
                        </div>
                      </div>
                    ) : (
                      /* Assistant Message - Grok Style */
                      <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                          <img src="/applogo.png" alt="Louis" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white/90 text-sm sm:text-[15px] leading-relaxed mb-2 sm:mb-3">
                            {message.content}
                          </div>

                          {/* Sources - Grok Style */}
                          {message.sources && message.sources.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                              {message.sources.map((source, idx) => (
                                <a
                                  key={idx}
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#2a2a2a] hover:bg-[#333333] text-white/80 hover:text-white rounded-full text-[10px] sm:text-xs transition-colors duration-150 border border-[#3a3a3a]"
                                >
                                  <span className="text-xs sm:text-sm">📚</span>
                                  <span className="truncate max-w-[120px] sm:max-w-none">{source.displayName}</span>
                                </a>
                              ))}
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
                    <img src="/applogo.png" alt="Louis" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                  </div>
                  <div className="flex gap-1 sm:gap-1.5 items-center mt-1.5 sm:mt-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
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

      {/* Input Area - Grok Style - Mobile Optimized */}
      <div className="border-t border-[#2a2a2a] bg-[#1a1a1a] safe-area-bottom">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-6">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              {/* Attachment Button */}
              <button
                type="button"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
              >
                <svg width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </button>

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What do you want to know?"
                disabled={isLoading}
                className="w-full pl-10 sm:pl-12 pr-20 sm:pr-24 py-3 sm:py-4 bg-[#2a2a2a] border border-[#3a3a3a] rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#4a4a4a] transition-colors text-sm sm:text-[15px] disabled:opacity-50"
              />

              {/* Right Side Buttons */}
              <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 sm:gap-2">
                {/* Auto Mode Selector - Hidden on mobile */}
                <button
                  type="button"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-transparent hover:bg-[#333333] text-white/70 hover:text-white rounded-full transition-colors text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <span>Auto</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Voice Button */}
                <button
                  type="button"
                  className="p-1.5 sm:p-2 hover:bg-[#333333] rounded-full transition-colors text-white/70 hover:text-white"
                >
                  <Mic size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LouisAIPage;

