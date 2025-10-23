import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const suggestedPrompts = [
    "What are the admission requirements?",
    "Tell me about St. Louis JHS's history.",
    "What STEM programs are available?",
    "How can I contact the school?",
  ];

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    // Directly submitting, creating a synthetic event
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
    // We need to ensure the state update is processed before submitting
    setTimeout(() => handleSubmit(fakeEvent), 0);
  };

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
    <div className="flex flex-col h-screen bg-[#1a1a1a] overflow-hidden">
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
              <div className="flex justify-center items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center">
                  <img src="/applogo.png" alt="Louis Ai" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white">Louis Ai</h1>
              </div>

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
                        <div className="bg-[#2a2a2a] text-white rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 max-w-[85%] sm:max-w-[80%]">
                          <p className="text-sm sm:text-[15px] leading-relaxed">{message.content}</p>
                        </div>
                      </div>
                    ) : (
                      /* Assistant Message - Grok Style with Markdown */
                      <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                          <img src="/applogo.png" alt="Louis Ai" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white/90 text-sm sm:text-[15px] leading-relaxed mb-2 sm:mb-3 prose prose-invert prose-sm sm:prose-base max-w-none">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm, remarkMath]}
                              rehypePlugins={[rehypeKatex]}
                              components={{
                                p: ({ children }) => <p className="mb-3 leading-7">{children}</p>,
                                ul: ({ children }) => <ul className="mb-3 ml-4 list-disc space-y-1">{children}</ul>,
                                ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal space-y-1">{children}</ol>,
                                li: ({ children }) => <li className="leading-6">{children}</li>,
                                strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                em: ({ children }) => <em className="italic text-white/95">{children}</em>,
                                code: ({ children }) => <code className="bg-[#2a2a2a] px-1.5 py-0.5 rounded text-yellow-300 text-sm">{children}</code>,
                                pre: ({ children }) => <pre className="bg-[#2a2a2a] p-3 rounded-lg overflow-x-auto mb-3 text-sm">{children}</pre>,
                                h1: ({ children }) => <h1 className="text-lg sm:text-xl font-bold mb-2 text-white">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-base sm:text-lg font-bold mb-2 text-white">{children}</h2>,
                                h3: ({ children }) => <h3 className="text-sm sm:text-base font-semibold mb-2 text-white">{children}</h3>,
                                a: ({ href, children }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-yellow-400 hover:text-yellow-300 italic underline transition-colors"
                                  >
                                    {children}
                                  </a>
                                ),
                                blockquote: ({ children }) => (
                                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-white/80 mb-3">
                                    {children}
                                  </blockquote>
                                ),
                              }}
                            >
                              {message.content}
                            </ReactMarkdown>
                          </div>

                          {/* Sources - Blue/Yellow Hyperlinks */}
                          {message.sources && message.sources.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-[#2a2a2a]">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs text-white/50 uppercase tracking-wide font-semibold">Sources:</span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                {message.sources.map((source, idx) => (
                                  <React.Fragment key={idx}>
                                  <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 text-yellow-400 hover:text-yellow-300 italic underline transition-colors duration-200 text-xs sm:text-sm decoration-yellow-400/50 hover:decoration-yellow-300"
                                  >
                                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    <span className="truncate max-w-[150px] sm:max-w-[200px]">{source.displayName}</span>
                                  </a>
                                    {idx < message.sources.length - 1 && <span className="text-white/50">,</span>}
                                  </React.Fragment>
                                ))}
                              </div>
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
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What do you want to know?"
                disabled={isLoading}
                className="w-full pl-4 sm:pl-6 pr-12 sm:pr-14 py-3 sm:py-4 bg-[#2a2a2a] border border-[#3a3a3a] rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#4a4a4a] transition-colors text-sm sm:text-[15px] disabled:opacity-50"
              />

              {/* Right Side Buttons */}
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center">
                <AnimatePresence>
                  {input.trim() && !isLoading && (
                    <motion.button
                      type="submit"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                      <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LouisAIPage;



                                ul: ({ children }) => <ul className="mb-3 ml-4 list-disc space-y-1">{children}</ul>,

                                ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal space-y-1">{children}</ol>,

                                li: ({ children }) => <li className="leading-6">{children}</li>,

                                strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,

                                em: ({ children }) => <em className="italic text-white/95">{children}</em>,

                                code: ({ children }) => <code className="bg-[#2a2a2a] px-1.5 py-0.5 rounded text-yellow-300 text-sm">{children}</code>,

                                pre: ({ children }) => <pre className="bg-[#2a2a2a] p-3 rounded-lg overflow-x-auto mb-3 text-sm">{children}</pre>,

                                h1: ({ children }) => <h1 className="text-lg sm:text-xl font-bold mb-2 text-white">{children}</h1>,

                                h2: ({ children }) => <h2 className="text-base sm:text-lg font-bold mb-2 text-white">{children}</h2>,

                                h3: ({ children }) => <h3 className="text-sm sm:text-base font-semibold mb-2 text-white">{children}</h3>,

                                a: ({ href, children }) => (

                                  <a

                                    href={href}

                                    target="_blank"

                                    rel="noopener noreferrer"

                                    className="text-yellow-400 hover:text-yellow-300 italic underline transition-colors"

                                  >

                                    {children}

                                  </a>

                                ),

                                blockquote: ({ children }) => (

                                  <blockquote className="border-l-4 border-blue-500 pl-4 italic text-white/80 mb-3">

                                    {children}

                                  </blockquote>

                                ),

                              }}

                            >

                              {message.content}

                            </ReactMarkdown>

                          </div>



                          {/* Sources - Blue/Yellow Hyperlinks */}

                          {message.sources && message.sources.length > 0 && (

                            <div className="mt-3 pt-3 border-t border-[#2a2a2a]">

                              <div className="flex items-center gap-2 mb-2">

                                <span className="text-xs text-white/50 uppercase tracking-wide font-semibold">Sources:</span>

                              </div>

                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                {message.sources.map((source, idx) => (

                                  <React.Fragment key={idx}>
                                  <a

                                    href={source.url}

                                    target="_blank"

                                    rel="noopener noreferrer"

                                    className="inline-flex items-center gap-1.5 text-blue-400 hover:text-yellow-300 transition-colors duration-200 text-xs sm:text-sm underline decoration-blue-400/50 hover:decoration-yellow-300"

                                  >

                                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />

                                    </svg>

                                    <span className="truncate max-w-[150px] sm:max-w-[200px]">{source.displayName}</span>

                                  </a>

                                    {idx < message.sources.length - 1 && <span className="text-white/50">,</span>}
                                  </React.Fragment>
                                ))}

                              </div>

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

            <div className="relative flex items-center">
              <input

                ref={inputRef}

                type="text"

                value={input}

                onChange={(e) => setInput(e.target.value)}

                onKeyDown={handleKeyDown}

                placeholder="What do you want to know?"

                disabled={isLoading}

                className="w-full pl-4 sm:pl-6 pr-12 sm:pr-14 py-3 sm:py-4 bg-[#2a2a2a] border border-[#3a3a3a] rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#4a4a4a] transition-colors text-sm sm:text-[15px] disabled:opacity-50"
              />



              {/* Right Side Buttons */}

              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex items-center">
                <AnimatePresence>
                  {input.trim() && !isLoading && (
                    <motion.button
                      type="submit"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >

                      <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

};



export default LouisAIPage;




