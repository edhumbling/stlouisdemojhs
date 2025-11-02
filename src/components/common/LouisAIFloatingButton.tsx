import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const LouisAIFloatingButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  
  // Don't show the floating button on the Louis AI page itself or any AI Search pages/sub-pages (where Humbl AI and other AI engines are embedded)
  if (location.pathname === '/louis-ai' || location.pathname.startsWith('/ai-search')) {
    return null;
  }

  return (
    <motion.div
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50"
      initial={{ opacity: 0, scale: 0.8, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <Link
        to="/louis-ai"
        className="block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {/* Main Button - Cute mobile design */}
          <div className="relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden">
              <img
                src="/ai bot.png"
                alt="Louis AI"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
            </div>
            
            {/* Pulse Animation Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Tooltip - Upper region positioning */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 pointer-events-none"
              >
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 shadow-xl">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={14} className="text-blue-400" />
                    <span className="text-white text-xs sm:text-sm font-medium whitespace-nowrap">
                      Chat with Louis AI
                    </span>
                  </div>
                  <div className="text-xs text-white/70 mt-1 text-center">
                    Your intelligent school assistant
                  </div>
                  
                  {/* Arrow pointing down to button */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#2a2a2a]"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating particles effect - Cute mobile version */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    initial={{ 
                      opacity: 0, 
                      scale: 0,
                      x: 28,
                      y: 28
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [28, 28 + (Math.random() - 0.5) * 30],
                      y: [28, 28 + (Math.random() - 0.5) * 30]
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 2.5
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default LouisAIFloatingButton;
