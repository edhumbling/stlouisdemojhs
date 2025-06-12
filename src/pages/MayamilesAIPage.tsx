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
    "Mathematics", "Physics", "Chemistry", "Biology", "English", "History", 
    "Geography", "Economics", "Literature", "Computer Science", "Art", "Music"
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
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6 shadow-2xl"
            >
              <Brain size={40} className="sm:w-12 sm:h-12 text-white" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Your AI Learning Companion
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Meet Mayamiles AI - your intelligent voice-powered tutor that helps you master any subject through natural conversation. Just speak your questions and get instant, personalized explanations!
            </motion.p>

            {/* Start Learning Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={handleStartLearning}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-full shadow-[0_0_30px_rgba(34,197,94,0.6)] hover:shadow-[0_0_40px_rgba(34,197,94,0.8)] transition-all duration-300 text-lg relative overflow-hidden group animate-pulse"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-green-300/30 to-green-400/20 rounded-full"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              
              <Zap className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Start Learning Now</span>
              <Mic className="w-6 h-6 relative z-10 animate-bounce" />
            </motion.button>

            <p className="text-sm text-gray-400 mt-4">
              🎯 <strong>5 minutes free</strong> as Guest • <strong>30 minutes</strong> with account
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-500/20 rounded-lg text-green-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Subjects Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Ask About Any Subject
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full border border-green-500/30 text-sm font-medium"
                >
                  {subject}
                </span>
              ))}
            </div>
          </motion.div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-2xl p-8 border border-green-500/20"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
              How It Works
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Speak Your Question</h4>
                <p className="text-gray-300">Use your voice to ask any academic question naturally</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">AI Understands</h4>
                <p className="text-gray-300">Mayamiles processes your question and context</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Get Explanations</h4>
                <p className="text-gray-300">Receive clear, personalized answers and explanations</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default MayamilesAIPage;
