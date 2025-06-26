import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingAIButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Show button after a delay (like Inkeep does)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip briefly after button appears
      setTimeout(() => {
        setShowTooltip(true);
        // Hide tooltip after 3 seconds
        setTimeout(() => setShowTooltip(false), 3000);
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Hide tooltip when hovered
  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowTooltip(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          duration: 0.6 
        }}
        className="fixed bottom-6 right-6 z-50"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/mayamiles-ai"
          onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
          className="group relative inline-flex items-center justify-center"
        >
          {/* Main Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            style={{
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4), 0 0 0 0 rgba(16, 185, 129, 0.4)',
              animation: 'pulse-emerald 2s infinite'
            }}
          >
            {/* Animated Background Rings */}
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-0 rounded-full bg-emerald-300/10 animate-pulse" style={{ animationDuration: '3s' }}></div>
            
            {/* Icon */}
            <div className="relative z-10 flex items-center justify-center">
              <Brain className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" />
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-300/30 to-emerald-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>

          {/* Expanded State on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-xl border border-emerald-500/20 whitespace-nowrap"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium">Learn with AI</span>
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  Maya & Miles are ready to help! 🤖
                </div>
                
                {/* Arrow pointing to button */}
                <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2">
                  <div className="w-0 h-0 border-l-[6px] border-l-gray-900/95 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </motion.div>

      {/* Initial Tooltip */}
      <AnimatePresence>
        {showTooltip && !isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 bg-gray-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-xl border border-emerald-500/20 max-w-xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Brain className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold">Need help with studies?</span>
                </div>
                <p className="text-xs text-gray-300">
                  Try our AI tutors Maya & Miles for personalized learning! 🎓✨
                </p>
              </div>
              <button
                onClick={() => setShowTooltip(false)}
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Arrow pointing to button */}
            <div className="absolute bottom-0 right-8 transform translate-y-full">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900/95"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse-emerald {
          0% {
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4), 0 0 0 0 rgba(16, 185, 129, 0.4);
          }
          70% {
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4), 0 0 0 10px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4), 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
      `}</style>
    </>
  );
};

export default FloatingAIButton;
