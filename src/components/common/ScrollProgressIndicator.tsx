import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollProgressIndicatorProps {
  className?: string;
  color?: string;
  height?: string;
  showOnPages?: string[];
  hideOnPages?: string[];
}

const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  className = '',
  color = 'bg-orange-500',
  height = 'h-1',
  showOnPages = [],
  hideOnPages = []
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollProgress(Math.min(Math.max(scrollPercent, 0), 100));
      
      // Show indicator when user starts scrolling (after 50px)
      setIsVisible(scrollTop > 50);
    };

    // Calculate initial progress
    calculateScrollProgress();

    // Add scroll listener with throttling for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          calculateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateScrollProgress);
    };
  }, []);

  // Don't render if not visible or no progress
  if (!isVisible && scrollProgress === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`fixed top-0 left-0 right-0 z-50 ${className}`}
          style={{ transformOrigin: 'left' }}
        >
          {/* Background track */}
          <div className={`w-full ${height} bg-black/10 backdrop-blur-sm border-b border-white/5`}>
            {/* Progress bar */}
            <motion.div
              className={`${height} shadow-lg relative overflow-hidden`}
              style={{
                width: `${scrollProgress}%`,
                background: color.includes('gradient')
                  ? color.replace('bg-gradient-to-r', 'linear-gradient(90deg')
                  : 'linear-gradient(90deg, #ff6b35, #f7931e, #ff8c00)',
                boxShadow: '0 0 15px rgba(255, 107, 53, 0.6), 0 0 30px rgba(255, 107, 53, 0.4)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {/* Animated shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 1
                }}
              />
            </motion.div>
          </div>

          {/* Enhanced glowing effect */}
          <motion.div
            className="absolute top-0 left-0 h-full opacity-40 blur-sm"
            style={{
              width: `${scrollProgress}%`,
              background: color.includes('gradient')
                ? color.replace('bg-gradient-to-r', 'linear-gradient(90deg')
                : 'linear-gradient(90deg, #ff6b35, #f7931e, #ff8c00)'
            }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          />

          {/* Enhanced animated sparkle at the end */}
          {scrollProgress > 3 && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-xl"
              style={{
                left: `${Math.max(scrollProgress - 0.5, 0)}%`,
                background: 'radial-gradient(circle, #ffffff 0%, #ffd700 50%, #ff8c00 100%)',
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 215, 0, 0.6)'
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.9, 1, 0.9],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )}

          {/* Progress percentage indicator (optional, for very long content) */}
          {scrollProgress > 10 && scrollProgress < 95 && (
            <motion.div
              className="absolute top-full mt-1 text-xs font-medium text-orange-400 bg-black/80 px-2 py-1 rounded-full backdrop-blur-sm"
              style={{ left: `${Math.min(scrollProgress, 85)}%` }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {Math.round(scrollProgress)}%
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollProgressIndicator;
