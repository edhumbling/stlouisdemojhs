import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Globe, Zap, Brain, Sparkles, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const AISearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null);

  const handleBack = () => {
    if (selectedEngine) {
      setSelectedEngine(null);
    } else {
      navigate(-1);
    }
  };

  const aiEngines = [
    {
      id: 'index-globe',
      name: 'Index.Globe',
      url: 'https://index.globe.engineer/',
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
      glowColor: '#0891b2'
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
    setSelectedEngine(engineId);
  };

  const selectedEngineData = aiEngines.find(engine => engine.id === selectedEngine);

  if (selectedEngine && selectedEngineData) {
    return (
      <div className="min-h-screen bg-black pt-16">
        {/* Back Button and Title Section */}
        <div className={`bg-gradient-to-r ${selectedEngineData.color} py-3 sm:py-4`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-white/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="text-white">
                  {selectedEngineData.icon}
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {selectedEngineData.name}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Full Viewport Engine Embed */}
        <div
          className="w-full"
          style={{
            height: 'calc(100vh - 140px)',
            backgroundColor: selectedEngineData.hasWhiteBackground ? '#ffffff' : 'transparent'
          }}
        >
          <iframe
            src={selectedEngineData.url}
            title={`${selectedEngineData.name} AI Search Engine`}
            className="w-full h-full border-0"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              overflow: 'auto',
              backgroundColor: selectedEngineData.hasWhiteBackground ? '#ffffff' : 'transparent'
            }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
          />
        </div>

        {/* Fallback Link */}
        <div className={`bg-gradient-to-r ${selectedEngineData.color} bg-opacity-20 py-2 text-center`}>
          <p className="text-gray-200 text-xs sm:text-sm">
            Having trouble loading {selectedEngineData.name}?{' '}
            <a
              href={selectedEngineData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 underline font-medium"
            >
              Visit {selectedEngineData.name} directly
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-16">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-800 to-indigo-900 py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6 mb-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-white/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                AI Search Hub
              </h1>
            </div>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-3xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            Explore the future of search with cutting-edge AI-powered engines. Choose from our curated collection of advanced search platforms designed to enhance your research and discovery experience.
          </p>
        </div>
      </div>

      {/* AI Engines Grid - Cute Mobile Layout */}
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-3 md:gap-6 lg:gap-8">
          {aiEngines.map((engine, index) => (
            <motion.div
              key={engine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleEngineClick(engine.id)}
              className="group cursor-pointer"
            >
              <div
                className={`relative bg-gradient-to-br ${engine.color} rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 border border-white/20 hover:border-white/40 overflow-hidden`}
                style={{
                  boxShadow: `0 10px 40px ${engine.glowColor}30, 0 0 60px ${engine.glowColor}20`
                }}
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon - Smaller on Mobile */}
                  <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                    <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                      {React.cloneElement(engine.icon, {
                        className: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8"
                      })}
                    </div>
                  </div>

                  {/* Title - Smaller on Mobile */}
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl font-bold text-white mb-1 sm:mb-2 md:mb-3 lg:mb-4 group-hover:text-yellow-200 transition-colors duration-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    {engine.name}
                  </h3>

                  {/* Description - Smaller on Mobile */}
                  <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-200 leading-relaxed mb-2 sm:mb-3 md:mb-4 lg:mb-6" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    {engine.description}
                  </p>

                  {/* Action Button - Smaller on Mobile */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-xs md:text-sm text-white/80 font-medium">Click to explore</span>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                  background: `radial-gradient(circle at center, ${engine.glowColor}20 0%, transparent 70%)`
                }}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section - Compact on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 text-center px-2 sm:px-0"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              🚀 Enhance Your Learning Journey
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              These AI-powered search engines are carefully selected to support your academic research and curiosity.
              Each platform offers unique features and capabilities to help you discover information more effectively than traditional search methods.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AISearchPage;
