import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useHeader } from '../contexts/HeaderContext';

const AISearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const { setShowHeader } = useHeader();

  // Control header visibility based on whether we're viewing an individual engine
  useEffect(() => {
    if (selectedEngine) {
      // Hide header when viewing individual engine
      setShowHeader(false);
    } else {
      // Show header when viewing main grid
      setShowHeader(true);
    }

    // Cleanup: ensure header is shown when component unmounts
    return () => {
      setShowHeader(true);
    };
  }, [selectedEngine, setShowHeader]);

  const handleBack = () => {
    if (selectedEngine) {
      setSelectedEngine(null);
      setIsLoading(false);
      setIframeError(false);
      setShowAlternatives(false);
      // Scroll to top when returning to main page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(-1);
    }
  };

  const aiEngines = [
    {
      id: 'index-globe',
      name: 'Index.Globe',
      url: 'https://index.globe.engineer/?theme=light&mode=light&color-scheme=light',
      description: 'Advanced AI-powered search engine with global indexing capabilities',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-cyan-600',
      glowColor: '#06b6d4',
      hasWhiteBackground: true
    },

    {
      id: 'farfalle',
      name: 'Farfalle',
      url: 'https://www.farfalle.dev',
      description: 'Intelligent search platform designed for developers and researchers',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#ec4899'
    },
    {
      id: 'turboseek',
      name: 'TurboSeek',
      url: 'https://www.turboseek.io',
      description: 'Lightning-fast AI search with turbocharged performance',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-500 to-orange-600',
      glowColor: '#f97316'
    },
    {
      id: 'omniplex',
      name: 'Omniplex AI',
      url: 'https://omniplex.ai',
      description: 'Comprehensive AI search solution with multi-modal capabilities',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'andi',
      name: 'Andi Search',
      url: 'https://andisearch.com',
      description: 'Next-generation search engine powered by conversational AI',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'memfree',
      name: 'MemFree',
      url: 'https://www.memfree.me/',
      description: 'Free AI-powered search engine with memory and context awareness',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-teal-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'felladrin-minisearch',
      name: 'Felladrin MiniSearch',
      url: 'https://felladrin-minisearch.hf.space/',
      description: 'Compact AI search engine powered by Hugging Face with fast results',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },
    {
      id: 'explorer-globe',
      name: 'Explorer Globe',
      url: 'https://explorer.globe.engineer/',
      description: 'Advanced exploration and discovery platform with global search capabilities',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-cyan-600 to-blue-600',
      glowColor: '#0891b2'
    },
    {
      id: 'translator-globe',
      name: 'Translator Globe',
      url: 'https://translator.globe.engineer/',
      description: 'AI-powered translation and language processing platform with global reach',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-violet-600 to-purple-600',
      glowColor: '#7c3aed'
    },
    {
      id: 'britannica-chatbot',
      name: 'Britannica Chatbot',
      url: 'https://www.britannica.com/chatbot',
      description: 'Educational AI chatbot powered by Britannica\'s trusted knowledge base',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-amber-600 to-orange-600',
      glowColor: '#f59e0b',
      hasWhiteBackground: true
    },
    {
      id: 'grok',
      name: 'Grok',
      url: 'https://grok.com',
      description: 'Advanced AI assistant with real-time information and witty personality',
      icon: <img src="https://grok.com/favicon.ico" alt="Grok" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-gray-800 to-black',
      glowColor: '#000000',
      hasWhiteBackground: true
    },
    {
      id: 'claude',
      name: 'Claude AI',
      url: 'https://claude.ai',
      description: 'Anthropic\'s AI assistant for thoughtful, helpful, and harmless conversations',
      icon: <img src="https://claude.ai/favicon.ico" alt="Claude" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-500 to-red-600',
      glowColor: '#ea580c',
      hasWhiteBackground: true
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      url: 'https://chatgpt.com/c/',
      description: 'OpenAI\'s conversational AI for creative and analytical tasks',
      icon: <img src="https://chatgpt.com/favicon.ico" alt="ChatGPT" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-500 to-emerald-600',
      glowColor: '#10b981',
      hasWhiteBackground: true
    },
    {
      id: 'mistral',
      name: 'Mistral Chat',
      url: 'https://chat.mistral.ai/chat',
      description: 'European AI assistant with advanced reasoning capabilities',
      icon: <img src="https://chat.mistral.ai/favicon.ico" alt="Mistral" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-700',
      glowColor: '#3b82f6',
      hasWhiteBackground: true
    },
    {
      id: 'gemini',
      name: 'Gemini',
      url: 'https://gemini.google.com',
      description: 'Google\'s most capable AI model for multimodal understanding',
      icon: <img src="https://gemini.google.com/favicon.ico" alt="Gemini" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-500 to-purple-600',
      glowColor: '#8b5cf6',
      hasWhiteBackground: true
    },
    {
      id: 'deepseek',
      name: 'DeepSeek Chat',
      url: 'https://deepseek.com/chat',
      description: 'Advanced AI model with deep reasoning and coding capabilities',
      icon: <img src="https://deepseek.com/favicon.ico" alt="DeepSeek" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#ec4899',
      hasWhiteBackground: true
    },
    {
      id: 'opennote',
      name: 'OpenNote',
      url: 'https://opennote.me/',
      description: 'AI-powered note-taking and knowledge management platform',
      icon: <img src="https://opennote.me/favicon.ico" alt="OpenNote" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-500 to-cyan-600',
      glowColor: '#06b6d4',
      hasWhiteBackground: true
    },
    {
      id: 'perplexity',
      name: 'Perplexity AI',
      url: 'https://perplexity.ai',
      description: 'AI-powered search engine that provides accurate answers with cited sources',
      icon: <img src="https://perplexity.ai/favicon.ico" alt="Perplexity" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-blue-700',
      glowColor: '#3b82f6',
      hasWhiteBackground: true
    },
    {
      id: 'copilot',
      name: 'Microsoft Copilot',
      url: 'https://copilot.microsoft.com/',
      description: 'Microsoft\'s AI assistant for productivity, creativity, and everyday tasks',
      icon: <img src="https://copilot.microsoft.com/favicon.ico" alt="Microsoft Copilot" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-cyan-600',
      glowColor: '#0078d4',
      hasWhiteBackground: true
    },
    {
      id: 'genspark',
      name: 'Genspark AI',
      url: 'https://www.genspark.ai/',
      description: 'AI-powered search engine that generates comprehensive sparkpages for queries',
      icon: <img src="https://www.genspark.ai/favicon.ico" alt="Genspark" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-pink-500 to-rose-600',
      glowColor: '#ec4899',
      hasWhiteBackground: true
    },
    {
      id: 'pi',
      name: 'Pi AI',
      url: 'https://pi.ai/',
      description: 'Personal AI assistant designed for supportive, smart, and helpful conversations',
      icon: <img src="https://pi.ai/favicon.ico" alt="Pi AI" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-violet-500 to-purple-600',
      glowColor: '#8b5cf6',
      hasWhiteBackground: true
    },
    {
      id: 'qwen',
      name: 'Qwen Chat',
      url: 'https://chat.qwen.ai/',
      description: 'Advanced AI chat model with multilingual capabilities and reasoning skills',
      icon: <img src="https://chat.qwen.ai/favicon.ico" alt="Qwen Chat" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-500 to-orange-600',
      glowColor: '#f97316',
      hasWhiteBackground: true
    },
    {
      id: 'manus',
      name: 'Manus',
      url: 'https://manus.im/app',
      description: 'AI-powered writing and productivity assistant for enhanced creativity',
      icon: <img src="https://manus.im/favicon.ico" alt="Manus" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-500 to-green-600',
      glowColor: '#10b981',
      hasWhiteBackground: true
    },
    {
      id: 'together',
      name: 'Together AI',
      url: 'https://chat.together.ai/',
      description: 'Collaborative AI platform with access to multiple open-source models',
      icon: <img src="https://chat.together.ai/favicon.ico" alt="Together AI" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-slate-600 to-gray-700',
      glowColor: '#64748b',
      hasWhiteBackground: true
    },
    {
      id: 'huggingface',
      name: 'Hugging Face Chat',
      url: 'https://huggingface.co/chat/',
      description: 'Open-source AI chat platform with access to cutting-edge language models',
      icon: <img src="https://huggingface.co/favicon.ico" alt="Hugging Face Chat" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-500 to-amber-600',
      glowColor: '#f59e0b',
      hasWhiteBackground: true
    },
    {
      id: 'notebooklm',
      name: 'NotebookLM',
      url: 'https://notebooklm.google.com/',
      description: 'Google\'s AI-powered research and note-taking assistant for personalized insights',
      icon: <img src="https://notebooklm.google.com/favicon.ico" alt="NotebookLM" className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-500 to-indigo-600',
      glowColor: '#3b82f6',
      hasWhiteBackground: true
    }
  ];

  const handleEngineClick = (engineId: string) => {
    setIsLoading(true);
    setIframeError(false);
    setShowAlternatives(false);
    setSelectedEngine(engineId);
    // Loading will be hidden when iframe loads
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setIframeError(true);
    setShowAlternatives(true);
  };

  const handleOpenInBrowser = () => {
    if (selectedEngineData) {
      window.open(selectedEngineData.url, '_blank', 'noopener,noreferrer');
    }
  };

  const selectedEngineData = aiEngines.find(engine => engine.id === selectedEngine);

  // If an engine is selected, show the full-page iframe view - Like LearnHub
  if (selectedEngine && selectedEngineData) {
    // All AI engines use their original white backgrounds when opened

    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* Header - Enhanced Purple Back Button */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-4 sm:py-5 shadow-2xl border-b border-purple-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-purple-700/70 hover:bg-purple-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/50 hover:border-purple-400/70 flex-shrink-0 ring-2 ring-purple-500/20 hover:ring-purple-400/30"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {selectedEngineData.name}
              </h1>

              {/* Quick access button */}
              <button
                onClick={handleOpenInBrowser}
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/80 hover:bg-blue-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm ml-auto"
              >
                <Globe size={14} />
                <span className="hidden sm:inline">Open in Browser</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full viewport iframe - No footer */}
        <div className="w-full h-full pt-20 sm:pt-24 relative">
          {!iframeError ? (
            <>
              <iframe
                src={selectedEngineData.url}
                className="w-full h-full border-0 relative z-10"
                title={selectedEngineData.name}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads allow-modals"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={selectedEngineData.hasWhiteBackground ? {
                  filter: 'invert(1) hue-rotate(180deg)',
                  background: 'white'
                } : {}}
              />

              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-800 font-medium">Loading {selectedEngineData.name}...</p>
                    <p className="text-gray-600 text-sm mt-1">Please wait while we load the AI search engine</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Error State - Show alternatives */
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-10 h-10 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Access Restricted</h3>
                  <p className="text-gray-300 mb-6">
                    {selectedEngineData.name} cannot be embedded directly. Click below to open it in a new browser tab for the best experience.
                  </p>
                </div>

                {/* Open in Browser Button */}
                <div className="space-y-4">
                  <button
                    onClick={handleOpenInBrowser}
                    className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <Globe className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-semibold">Open {selectedEngineData.name}</div>
                      <div className="text-sm opacity-90">Launch in new browser tab</div>
                    </div>
                  </button>

                  <p className="text-sm text-gray-400">
                    This will open {selectedEngineData.name} in a new tab where you can use all its features without restrictions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              AI Search
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          {/* AI Engines Grid - Apple Style */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
            {aiEngines.map((engine, index) => (
              <motion.div
                key={engine.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <button
                  onClick={() => handleEngineClick(engine.id)}
                  className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 active:scale-95 text-left"
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 flex items-center justify-center text-white"
                    style={{ backgroundColor: engine.glowColor }}
                  >
                    {React.isValidElement(engine.icon) && engine.icon.type === 'img' ? (
                      engine.icon
                    ) : (
                      React.cloneElement(engine.icon, {
                        className: "w-5 h-5"
                      })
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1 leading-tight">
                    {engine.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-tight">
                    {engine.description}
                  </p>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Simple Footer Message */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-sm text-gray-300">
              Tap any AI search engine to open it within the website
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AISearchPage;
