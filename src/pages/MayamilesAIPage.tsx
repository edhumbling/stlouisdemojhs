import React from 'react';
import { ArrowLeft, Mic, Brain, MessageCircle, BookOpen, Calculator, Globe, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MayamilesAIPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartLearning = () => {
    window.open('https://app.sesame.com', '_blank', 'noopener,noreferrer');
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
    "Mathematics", "English Language", "Integrated Science", "Social Studies", "Ghanaian Language", "French",
    "Information Communication Technology (ICT)", "Religious & Moral Education (RME)", "Creative Arts",
    "Career Technology", "Physical Education", "Life Skills"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
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
              🤖 Learn with Mayamiles AI
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Hero Section - Enhanced Design */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Meet Your AI Learning Companions
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Choose between <strong className="text-pink-400">Maya</strong> (amazing lady voice) and <strong className="text-blue-400">Miles</strong> (amazing guy voice) for personalized, fun conversations about any subject!
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
                        Start<br/>Mayamiles<br/>AI
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
              className="bg-gradient-to-r from-green-900/30 to-olive-800/30 rounded-xl p-6 border border-olive-500/20 max-w-2xl mx-auto"
            >
              <p className="text-gray-300 mb-4">
                🎯 <strong className="text-green-400">5 minutes free</strong> as Guest • <strong className="text-olive-400">30 minutes</strong> with Google/Apple login
              </p>
              <p className="text-sm text-gray-400">
                💡 <strong>Tip:</strong> Enable "Allow All the Time" for audio permissions to have consistent daily conversations!
              </p>
            </motion.div>
          </div>

          {/* Personality Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
              Choose Your AI Learning Companion
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Maya */}
              <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/30 rounded-xl p-6 border border-pink-500/20 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👩‍🏫</span>
                </div>
                <h4 className="text-xl font-bold text-pink-400 mb-3">Maya</h4>
                <p className="text-gray-300 mb-4">Amazing lady voice with a warm, encouraging personality. Perfect for detailed explanations and patient guidance through complex topics.</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">Warm & Encouraging</span>
                  <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">Detail-Oriented</span>
                  <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">Patient</span>
                </div>
              </div>

              {/* Miles */}
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl p-6 border border-blue-500/20 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍🏫</span>
                </div>
                <h4 className="text-xl font-bold text-blue-400 mb-3">Miles</h4>
                <p className="text-gray-300 mb-4">Amazing guy voice with an energetic, fun personality. Great for making learning exciting and breaking down complex concepts simply.</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Energetic & Fun</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Simplified Learning</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Motivating</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* How to Use Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-r from-olive-900/30 to-olive-800/30 rounded-xl p-8 border border-olive-500/20 mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
              How to Get Started
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-olive-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3">Choose Your Companion</h4>
                <p className="text-gray-300">Select Maya or Miles based on your learning preference. Both are fun and highly personalized!</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-olive-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3">Enable Audio Permissions</h4>
                <p className="text-gray-300">When prompted, click "Allow All the Time" for consistent daily conversations without interruptions.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-olive-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-3">Start Learning!</h4>
                <p className="text-gray-300">Ask questions about any subject. For longer sessions, login with Google or Apple account.</p>
              </div>
            </div>
          </motion.div>

          {/* Subjects Available */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Available Subjects for Voice Learning
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-olive-500/20 text-olive-300 rounded-full border border-olive-500/30 text-sm font-medium hover:bg-olive-500/30 transition-colors duration-200"
                >
                  {subject}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MayamilesAIPage;
