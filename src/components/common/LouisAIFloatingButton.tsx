import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const LouisAIFloatingButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50"
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
          {/* Main Button */}
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden">
              <img
                src="/ai bot.png"
                alt="Louis AI"
                className="w-12 h-12 object-contain filter brightness-0 invert"
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

          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              >
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 shadow-xl">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-blue-400" />
                    <span className="text-white text-sm font-medium whitespace-nowrap">
                      Chat with Louis AI
                    </span>
                  </div>
                  <div className="text-xs text-white/70 mt-1">
                    Your intelligent school assistant
                  </div>
                  
                  {/* Arrow pointing to button */}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2">
                    <div className="w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-[#2a2a2a]"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating particles effect */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    initial={{ 
                      opacity: 0, 
                      scale: 0,
                      x: 32,
                      y: 32
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [32, 32 + (Math.random() - 0.5) * 40],
                      y: [32, 32 + (Math.random() - 0.5) * 40]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 2
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