import React from 'react';
import { ArrowLeft, Mic, Brain, MessageCircle, BookOpen, Calculator, Globe, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/seo/SEOHead';

const MayamilesAIPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartLearning = () => {
    window.open('https://app.sesame.com', '_blank', 'noopener,noreferrer');
  };

  const handleSuperChat = () => {
    // Open SuperChat externally in new tab
    window.open('https://supermemory.chat', '_blank', 'noopener,noreferrer');
  };



  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice-First Learning",
      description: "Ask questions naturally using your voice - no typing required!"
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Mathematics Mastery",
      description: "Get step-by-step solutions for algebra, geometry, calculus, and more"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "All Subjects Covered",
      description: "Science, History, Literature, Languages - ask about anything!"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Personalized Learning",
      description: "AI adapts to your learning style and pace for better understanding"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Interactive Conversations",
      description: "Have natural conversations about complex topics and concepts"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "24/7 Availability",
      description: "Learn anytime, anywhere - your AI tutor never sleeps!"
    }
  ];

  const subjects = [
    "Mathematics", "English Language", "Integrated Science", "Social Studies", "French",
    "Information Communication Technology (ICT)", "Religious & Moral Education (RME)", "Creative Arts",
    "Career Technology", "Physical Education", "Life Skills"
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <SEOHead
        title="MayaMiles AI | Personalized Voice & Text Learning Assistant - St. Louis Demonstration JHS"
        description="MayaMiles AI - Experience personalized AI learning with MayaMiles. Choose Maya (lady voice) or Miles (guy voice) for voice-powered education, or use SuperChat for text-based learning. Available 24/7 for all subjects."
        keywords="MayaMiles AI, AI learning, voice learning, personalized education, AI tutor, Maya Miles, SuperChat, educational AI, student learning assistant"
        url="/mayamiles-ai"
        type="website"
        pageType="ai-search"
        useGalleryImages={true}
      />
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              🤖 Learn with MayaMiles AI
            </h1>
          </div>
        </div>
      </div>

      {/* Compact Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-b border-amber-400/30 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-center">
            <span className="text-amber-200 text-sm font-medium">
              🔍 Discover more AI tools beyond MayaMiles!
            </span>
            <button
              onClick={() => navigate('/ai-search')}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold rounded-full text-xs hover:from-amber-400 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Zap className="w-3 h-3" />
              <span>Explore Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Hero Section - Compact Design */}
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
            >
              AI Learning Companions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-6"
            >
              Choose <strong className="text-pink-400">Maya</strong> (lady voice) or <strong className="text-blue-400">Miles</strong> (guy voice) for voice learning, or use <strong className="text-yellow-400">SuperChat</strong> for text-based conversations.
            </motion.p>

            {/* Start Learning Button - Larger and Enhanced */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center mb-8"
            >
              <button
                onClick={handleStartLearning}
                className="group relative inline-flex items-center justify-center w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52"
              >
                {/* Enhanced glow effects */}
                <span className="absolute inset-0 rounded-full bg-white/15 animate-pulse" style={{ animationDuration: '2s' }}></span>
                <span className="absolute inset-0 rounded-full bg-olive-400/20 animate-ping" style={{ animationDuration: '3s' }}></span>
                <span className="absolute inset-0 rounded-full bg-white/10 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></span>

                {/* Main button container - Larger */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full">
                  {/* White outer ring with enhanced glow */}
                  <div className="absolute inset-0 rounded-full border-4 border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.6),0_0_60px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.8),0_0_80px_rgba(255,255,255,0.4)]"></div>

                  {/* Olive green circle with enhanced glow */}
                  <div className="absolute inset-3 rounded-full bg-gradient-to-br from-olive-500 via-olive-600 to-olive-700 shadow-[0_0_35px_rgba(107,124,50,0.7),0_0_70px_rgba(107,124,50,0.4)] hover:shadow-[0_0_45px_rgba(107,124,50,0.9),0_0_90px_rgba(107,124,50,0.5)] transition-all duration-300 group-hover:scale-105">

                    {/* Enhanced inner glow */}
                    <span className="absolute inset-1 rounded-full bg-gradient-to-br from-white/25 via-white/15 to-transparent animate-pulse" style={{ animationDuration: '1.5s' }}></span>

                    {/* Text content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-center px-2">
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
                        Start<br/>MayaMiles<br/>AI
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>

            {/* SuperChat Button - Yellow Glowing Design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="inline-flex items-center justify-center mb-8"
            >
              <button
                onClick={handleSuperChat}
                className="group relative inline-flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44"
              >
                {/* Enhanced yellow glow effects */}
                <span className="absolute inset-0 rounded-full bg-yellow-400/20 animate-pulse" style={{ animationDuration: '2s' }}></span>
                <span className="absolute inset-0 rounded-full bg-yellow-500/15 animate-ping" style={{ animationDuration: '3s' }}></span>
                <span className="absolute inset-0 rounded-full bg-yellow-300/10 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></span>

                {/* Main button container */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full">
                  {/* White outer ring with yellow glow */}
                  <div className="absolute inset-0 rounded-full border-4 border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.6),0_0_60px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.8),0_0_80px_rgba(255,255,255,0.4)]"></div>

                  {/* Yellow circle with enhanced glow */}
                  <div className="absolute inset-3 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-[0_0_35px_rgba(234,179,8,0.7),0_0_70px_rgba(234,179,8,0.4)] hover:shadow-[0_0_45px_rgba(234,179,8,0.9),0_0_90px_rgba(234,179,8,0.5)] transition-all duration-300 group-hover:scale-105">

                    {/* Enhanced inner glow */}
                    <span className="absolute inset-1 rounded-full bg-gradient-to-br from-white/25 via-white/15 to-transparent animate-pulse" style={{ animationDuration: '1.5s' }}></span>

                    {/* Text content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-center px-2">
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
                        SuperChat
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Usage Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-green-900/30 to-olive-800/30 rounded-lg p-4 border border-olive-500/20 max-w-2xl mx-auto"
            >
              <p className="text-sm text-gray-300 mb-2">
                🎯 <strong className="text-green-400">Voice AI:</strong> 5min free • 30min with login
              </p>
              <p className="text-sm text-gray-300 mb-2">
                💬 <strong className="text-yellow-400">SuperChat:</strong> Begin with "Super Chat" for text learning
              </p>
              <p className="text-xs text-gray-400">
                💡 Voice: Enable "Allow All the Time" for audio • Text: Type freely for help & explanations
              </p>
            </motion.div>
          </div>

          {/* Personality Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-6">
              Choose Your Companion
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Maya */}
              <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/30 rounded-lg p-4 border border-pink-500/20 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👩‍🏫</span>
                </div>
                <h4 className="text-lg font-bold text-pink-400 mb-2">Maya</h4>
                <p className="text-sm text-gray-300 mb-3">Warm lady voice. Patient guidance and detailed explanations.</p>
                <div className="flex flex-wrap justify-center gap-1">
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">Warm</span>
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">Patient</span>
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">Detailed</span>
                </div>
              </div>

              {/* Miles */}
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-lg p-4 border border-blue-500/20 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <h4 className="text-lg font-bold text-blue-400 mb-2">Miles</h4>
                <p className="text-sm text-gray-300 mb-3">Energetic guy voice. Fun learning and simplified concepts.</p>
                <div className="flex flex-wrap justify-center gap-1">
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Energetic</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Fun</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Simple</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* How to Use Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-r from-olive-900/30 to-olive-800/30 rounded-lg p-6 border border-olive-500/20 mb-8"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-6">
              Quick Start Guide
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Voice Learning */}
              <div className="bg-gradient-to-br from-olive-800/30 to-olive-700/30 rounded-lg p-4 border border-olive-500/20">
                <h4 className="text-sm font-bold text-olive-300 mb-3 text-center">🎤 Voice Learning</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-olive-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">1</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Choose Maya or Miles companion</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-olive-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">2</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Enable "Allow All the Time" for audio</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-olive-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">3</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Speak your questions naturally</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Learning */}
              <div className="bg-gradient-to-br from-yellow-800/30 to-yellow-700/30 rounded-lg p-4 border border-yellow-500/20">
                <h4 className="text-sm font-bold text-yellow-300 mb-3 text-center">💬 Text Learning</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">1</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Click the yellow SuperChat button</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">2</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Begin conversation with "Super Chat"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">3</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-300">Chat, learn, get help & explanations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subjects Available */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-8"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              Available Subjects
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-olive-500/20 text-olive-300 rounded-full border border-olive-500/30 text-xs font-medium hover:bg-olive-500/30 transition-colors duration-200"
                >
                  {subject}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Sesame AI Attribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center py-6 border-t border-gray-700/50"
          >
            <p className="text-xs text-gray-500">
              MayaMiles AI is powered by <strong className="text-gray-400">Sesame AI Inc</strong>
            </p>
          </motion.div>

          {/* Cute AI Tools Card - Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center py-8"
          >
            <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border-2 border-amber-400/50 shadow-xl max-w-sm mx-auto text-center group hover:border-amber-300/70 transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <Brain className="w-4 h-4 text-black" />
                </div>
                <h3 className="text-sm font-bold text-white">More AI Tools! ✨</h3>
              </div>

              <p className="text-gray-300 text-xs mb-4 leading-relaxed">
                Explore our collection of AI assistants and search tools! 🚀
              </p>

              <button
                onClick={() => navigate('/ai-search')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold rounded-lg shadow-lg hover:from-amber-400 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 text-xs group-hover:shadow-amber-400/25"
              >
                <Globe className="w-3 h-3 group-hover:rotate-12 transition-transform duration-300" />
                <span>Browse Tools</span>
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MayamilesAIPage;
