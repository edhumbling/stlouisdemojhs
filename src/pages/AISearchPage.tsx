import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Globe, Zap, Brain, Sparkles, Bot, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Iframe from 'react-iframe';

const AISearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    if (selectedEngine) {
      setSelectedEngine(null);
      setIsLoading(false);
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
      id: 'scira',
      name: 'Scira AI',
      url: 'https://scira.ai/',
      description: 'Intelligent AI search platform with advanced reasoning capabilities',
      icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-blue-600',
      glowColor: '#0891b2',
      needsBrowser: true
    },
    {
      id: 'farfalle',
      name: 'Farfalle',
      url: 'https://www.farfalle.dev',
      description: 'Intelligent search platform designed for developers and researchers',
      icon: <Search className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#ec4899'
    },
    {
      id: 'turboseek',
      name: 'TurboSeek',
      url: 'https://www.turboseek.io',
      description: 'Lightning-fast AI search with turbocharged performance',
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-500 to-orange-600',
      glowColor: '#f97316'
    },
    {
      id: 'omniplex',
      name: 'Omniplex AI',
      url: 'https://omniplex.ai',
      description: 'Comprehensive AI search solution with multi-modal capabilities',
      icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'andi',
      name: 'Andi Search',
      url: 'https://andisearch.com',
      description: 'Next-generation search engine powered by conversational AI',
      icon: <Bot className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#8b5cf6'
    }
  ];

  const handleEngineClick = (engineId: string) => {
    setIsLoading(true);
    setSelectedEngine(engineId);
    // Loading will be hidden when iframe loads
  };

  const handleIframeLoad = () => {
    // Fast loading - hide loading state quickly
    setTimeout(() => {
      setIsLoading(false);
    }, 50);
  };

  const selectedEngineData = aiEngines.find(engine => engine.id === selectedEngine);

  // If an engine is selected, show the full-page iframe view - Like LearnHub
  if (selectedEngine && selectedEngineData) {
    // All AI engines use their original white backgrounds when opened

    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* Header - Original Style */}
        <div className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
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
                {selectedEngineData.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Native Browser Experience or Regular Iframe */}
        <div className="w-full h-full pt-16 relative bg-white">
          {selectedEngineData.needsBrowser ? (
            <>
              {/* Browser-like Address Bar */}
              <div className="absolute top-16 left-0 right-0 bg-gray-100 border-b border-gray-300 px-4 py-2 z-10">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <div className="flex-1 bg-white rounded-md px-3 py-1 text-sm text-gray-600 border border-gray-300 truncate">
                    {selectedEngineData.url}
                  </div>
                  <Maximize2 className="w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Enhanced Iframe with Browser */}
              <Iframe
                url={selectedEngineData.url}
                width="100%"
                height="100%"
                className="border-0"
                display="block"
                position="relative"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads"
                onLoad={handleIframeLoad}
                loading="eager"
                styles={{
                  backgroundColor: 'white',
                  colorScheme: 'light',
                  marginTop: '40px'
                }}
              />
            </>
          ) : (
            /* Regular Iframe */
            <iframe
              src={selectedEngineData.url}
              className="w-full h-full border-0"
              title={selectedEngineData.name}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads"
              onLoad={handleIframeLoad}
              loading="eager"
              style={selectedEngineData.hasWhiteBackground ? {
                filter: 'invert(1) hue-rotate(180deg)',
                background: 'white'
              } : {
                background: 'white'
              }}
            />
          )}

          {/* Fast Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex items-center justify-center z-20 transition-opacity duration-200">
              <div className="text-center">
                <div className="w-8 h-8 border-3 border-gray-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-800 font-medium text-sm">Loading {selectedEngineData.name}...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4 mt-16">
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
                    {React.cloneElement(engine.icon, {
                      className: "w-5 h-5"
                    })}
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
