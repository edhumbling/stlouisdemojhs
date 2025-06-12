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

            {/* Start Learning Button - Larger with Beautiful Ripple Effects */}
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
                {/* Beautiful ripple glow effects - multiple expanding rings */}
                <span className="absolute inset-0 rounded-full bg-white/8 animate-ping" style={{ animationDuration: '4s' }}></span>
                <span className="absolute inset-0 rounded-full bg-white/12 animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.3s' }}></span>
                <span className="absolute inset-0 rounded-full bg-white/16 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.6s' }}></span>
                <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.9s' }}></span>
                <span className="absolute inset-0 rounded-full bg-white/24 animate-ping" style={{ animationDuration: '2s', animationDelay: '1.2s' }}></span>

                {/* Outer glow ring */}
                <span className="absolute inset-2 rounded-full bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse" style={{ animationDuration: '2.5s' }}></span>

                {/* Main button - Larger and more beautiful */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full bg-gradient-to-br from-green-600 via-green-700 to-green-800 shadow-[0_0_30px_rgba(255,255,255,0.4),0_0_60px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6),0_0_80px_rgba(255,255,255,0.3)] transition-all duration-500 group-hover:scale-105 border-4 border-white/40 hover:border-white/60">

                  {/* Inner rotating glow */}
                  <span className="absolute inset-3 rounded-full bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-spin" style={{ animationDuration: '6s' }}></span>

                  {/* Pulsing inner core */}
                  <span className="absolute inset-4 rounded-full bg-gradient-to-br from-green-500/30 to-green-600/30 animate-pulse" style={{ animationDuration: '2s' }}></span>

                  {/* Text content - White and Cute */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-center">
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                      Start Learning<br/>with<br/>Mayamiles AI
                    </span>
                  </div>

                  {/* Beautiful sweeping light effect */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent -rotate-45 translate-x-full group-hover:-translate-x-full transition-transform duration-2000"></span>

                  {/* Additional sparkle effect */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-l from-transparent via-white/20 to-transparent rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-1800 delay-200"></span>
                </div>

                {/* Continuous beautiful beaming effect */}
                <span className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5" style={{ animationDuration: '1.8s' }}></span>
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
