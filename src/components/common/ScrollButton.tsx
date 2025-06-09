import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ChevronUp } from 'lucide-react';

interface ScrollButtonProps {
  className?: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Enhanced scroll detection following FAB best practices
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.min(scrolled / maxScroll, 1);

    // Show button when user has scrolled down at least 200px or 20% of page
    const shouldShow = scrolled > 200 && scrolled > window.innerHeight * 0.2;

    setIsVisible(shouldShow);
    setScrollProgress(scrollPercentage);
  }, []);

  useEffect(() => {
    // Throttle scroll events for optimal performance
    let ticking = false;

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [handleScroll]);

  // Simple, predictable scroll-to-top behavior
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  }, [scrollToTop]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Scroll to top"
          title="Scroll to top"
          className={`
            fixed bottom-6 right-6 z-50
            w-14 h-14 rounded-full
            flex items-center justify-center
            bg-gradient-to-br from-purple-600/90 to-purple-700/90
            backdrop-blur-md border border-purple-400/30
            shadow-[0_8px_32px_rgba(147,51,234,0.3)]
            hover:shadow-[0_12px_40px_rgba(147,51,234,0.4)]
            hover:from-purple-500/95 hover:to-purple-600/95
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent
            transition-all duration-300 ease-out
            cursor-pointer select-none
            ${className}
          `}
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 16px 48px rgba(147,51,234,0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        >
          {/* Progress ring indicator */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 56 56"
            aria-hidden="true"
          >
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={163.36} // 2 * π * 26
              initial={{ strokeDashoffset: 163.36 }}
              animate={{
                strokeDashoffset: 163.36 - (scrollProgress * 163.36)
              }}
              transition={{ duration: 0.1 }}
            />
          </svg>

          {/* Glass overlay effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-50" />

          {/* Inner glow */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-200/40 to-purple-400/20" />

          {/* Arrow icon */}
          <motion.div
            className="relative z-10"
            animate={isHovered ? { y: -2 } : { y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp
              className="w-7 h-7 text-white font-bold drop-shadow-sm"
              strokeWidth={2.5}
            />
          </motion.div>

          {/* Pulse effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-400/30"
            initial={{ scale: 1, opacity: 0 }}
            animate={isHovered ? {
              scale: [1, 1.2, 1],
              opacity: [0, 0.3, 0]
            } : { scale: 1, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollButton;