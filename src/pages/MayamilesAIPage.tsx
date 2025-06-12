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
          {/* Hero Section - Compact and Cute */}
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Your AI Learning Companion
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8"
            >
              Meet Mayamiles AI - your intelligent voice-powered tutor that helps you master any subject through natural conversation. Just speak your questions and get instant, personalized explanations!
            </motion.p>

            {/* Start Learning Button - Clean Olive Green Design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <button
                onClick={handleStartLearning}
                className="group relative inline-flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44"
              >
                {/* Simple glow effect */}
                <span className="absolute inset-0 rounded-full bg-white/10 animate-pulse" style={{ animationDuration: '2s' }}></span>

                {/* Main button container */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full">
                  {/* White outer ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-white/70 shadow-[0_0_20px_rgba(255,255,255,0.4)]"></div>

                  {/* Olive green circle - properly sized */}
                  <div className="absolute inset-3 rounded-full bg-gradient-to-br from-olive-500 via-olive-600 to-olive-700 shadow-[0_0_25px_rgba(107,124,50,0.5)] hover:shadow-[0_0_30px_rgba(107,124,50,0.7)] transition-all duration-300 group-hover:scale-105">

                    {/* Simple inner glow */}
                    <span className="absolute inset-1 rounded-full bg-gradient-to-br from-white/15 to-transparent"></span>

                    {/* Text content - Simplified and properly sized */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-center px-2">
                      <span className="text-xs sm:text-sm md:text-base lg:text-lg leading-tight" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                        Start<br/>Mayamiles<br/>AI
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>

            <p className="text-sm text-gray-400">
              🎯 <strong>5 minutes free</strong> as Guest • <strong>30 minutes</strong> with account
            </p>
          </div>

          {/* Key Features - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Voice-Powered Learning for All Subjects
            </h3>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {subjects.slice(0, 8).map((subject, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full border border-green-500/30 text-xs font-medium"
                >
                  {subject}
                </span>
              ))}
            </div>
          </motion.div>

          {/* How It Works - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-xl p-6 border border-green-500/20"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-6">
              How It Works
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Speak</h4>
                <p className="text-xs text-gray-300">Ask any question with your voice</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">AI Processes</h4>
                <p className="text-xs text-gray-300">Mayamiles understands your question</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Learn</h4>
                <p className="text-xs text-gray-300">Get clear, personalized explanations</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MayamilesAIPage;
