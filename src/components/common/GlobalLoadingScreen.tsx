import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalLoading } from '../../contexts/LoadingContext';

const GlobalLoadingScreen: React.FC = () => {
  const { isGlobalLoading, loadingMessage } = useGlobalLoading();

  return (
    <AnimatePresence>
      {isGlobalLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
        >
          {/* Background beams */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Rotating beam 1 */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-96 bg-gradient-to-t from-transparent via-blue-400/20 to-transparent origin-bottom"
              style={{ transformOrigin: '50% 100%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* Rotating beam 2 */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-96 bg-gradient-to-t from-transparent via-green-400/20 to-transparent origin-bottom"
              style={{ transformOrigin: '50% 100%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear', delay: 2 }}
            />
            
            {/* Rotating beam 3 */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-96 bg-gradient-to-t from-transparent via-purple-400/20 to-transparent origin-bottom"
              style={{ transformOrigin: '50% 100%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 4 }}
            />

            {/* Little sparkle beams */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-0.5 h-32 bg-gradient-to-t from-transparent via-white/10 to-transparent origin-bottom"
                style={{ 
                  transformOrigin: '50% 100%',
                  transform: `rotate(${i * 60}deg)`
                }}
                animate={{ 
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'easeInOut',
                  delay: i * 0.3
                }}
              />
            ))}
          </div>

          {/* Central loading area */}
          <div className="relative flex flex-col items-center">
            {/* Revolving circles around logo */}
            <div className="relative w-32 h-32 mb-8">
              {/* Outer revolving circle */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent border-t-blue-400/60 border-r-blue-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Middle revolving circle */}
              <motion.div
                className="absolute inset-2 border-2 border-transparent border-t-green-400/60 border-l-green-400/30 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Inner revolving circle */}
              <motion.div
                className="absolute inset-4 border-2 border-transparent border-t-purple-400/60 border-b-purple-400/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Tiny logo in center */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
              >
                <img
                  src="/applogo.png"
                  alt="St. Louis Demo JHS"
                  className="w-12 h-12 object-contain filter drop-shadow-lg"
                />
              </motion.div>

              {/* Orbiting dots */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/60 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0'
                  }}
                  animate={{
                    rotate: 360,
                    x: Math.cos((i * Math.PI) / 2) * 50,
                    y: Math.sin((i * Math.PI) / 2) * 50
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.5
                  }}
                />
              ))}
            </div>

            {/* Loading text */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.h2
                className="text-white text-lg font-medium mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {loadingMessage || 'Loading...'}
              </motion.h2>
              
              {/* Loading dots */}
              <div className="flex justify-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-white/60 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Subtle background shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalLoadingScreen;
