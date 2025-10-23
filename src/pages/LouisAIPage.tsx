import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, ArrowLeft, BookOpen, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/seo/SEOHead';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const suggestedQuestions = [
    "Where is the school located?",
    "What subjects do you teach?",
    "How can I apply for admission?",
    "What STEM programs do you offer?",
    "Tell me about your facilities",
    "What are the school fees?",
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <SEOHead
        title="Louis AI - Your Intelligent School Assistant | St. Louis Demo JHS"
        description="Chat with Louis AI, your intelligent assistant for St. Louis Demonstration JHS. Get instant, accurate answers about admissions, academics, facilities, and everything about our school."
        keywords="Louis AI, school assistant, AI chatbot, student help, school information, smart assistant"
        url="/louis-ai"
        type="website"
        pageType="ai-search"
      />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 font-medium"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Sparkles className="text-yellow-300" size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Louis AI</h1>
              <p className="text-xs sm:text-sm text-white/90">Your Intelligent School Assistant</p>
            </div>
          </div>

          <div className="w-20 sm:w-24"></div> {/* Spacer for balance */}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
                <Sparkles className="text-white" size={40} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Welcome to Louis AI
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                I'm your intelligent assistant for St. Louis Demonstration JHS. Ask me anything about our school!
              </p>

              {/* Suggested Questions */}
              <div className="mt-12">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Try asking about:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 text-left border border-gray-200 group"
                    >
                      <div className="flex items-start gap-3">
                        <Zap size={18} className="text-purple-500 mt-1 flex-shrink-0 group-hover:text-purple-600" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">
                          {question}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                    <BookOpen className="text-blue-600" size={24} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Comprehensive Knowledge</h4>
                  <p className="text-sm text-gray-600">Trained on all school information</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                    <Sparkles className="text-purple-600" size={24} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Smart & Accurate</h4>
                  <p className="text-sm text-gray-600">Powered by advanced AI</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-3">
                    <Zap className="text-pink-600" size={24} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Source Citations</h4>
                  <p className="text-sm text-gray-600">See where info comes from</p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Message List */
            <div className="space-y-6">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-3xl ${message.role === 'user' ? 'w-auto' : 'w-full'}`}>
                      {message.role === 'user' ? (
                        /* User Message */
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-5 py-3 shadow-md inline-block">
                          <p className="text-base whitespace-pre-wrap">{message.content}</p>
                        </div>
                      ) : (
                        /* Assistant Message */
                        <div className="bg-white rounded-2xl px-5 py-4 shadow-md border border-gray-200">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <Sparkles className="text-white" size={16} />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 mb-1">Louis AI</div>
                              <div className="text-gray-800 text-base whitespace-pre-wrap leading-relaxed">
                                {message.content}
                              </div>
                            </div>
                          </div>

                          {/* Sources/Citations */}
                          {message.sources && message.sources.length > 0 && (
                            <div className="mt-4 pt-3 border-t border-gray-200">
                              <div className="flex items-center gap-2 mb-2">
                                <BookOpen size={14} className="text-gray-500" />
                                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                  Sources:
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {message.sources.map((source, idx) => (
                                  <a
                                    key={idx}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-xs font-medium transition-colors duration-150 border border-blue-200"
                                  >
                                    {source.displayName}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Timestamp */}
                      <div className={`text-xs text-gray-400 mt-1 px-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-2xl px-5 py-4 shadow-md border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Sparkles className="text-white animate-pulse" size={16} />
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about St. Louis Demo JHS..."
                  rows={1}
                  disabled={isLoading}
                  className="w-full px-4 py-3 pr-12 rounded-2xl border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none resize-none text-base transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  style={{
                    minHeight: '52px',
                    maxHeight: '200px',
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
                  }}
                />
              </div>
              
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2 text-center">
              Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Shift + Enter</kbd> for new line
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LouisAIPage;
