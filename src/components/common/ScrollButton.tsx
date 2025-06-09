import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, ChevronUp, ChevronDown } from 'lucide-react';

interface ScrollButtonProps {
  className?: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ className = "" }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [dynamicPosition, setDynamicPosition] = useState({ bottom: 24, right: 24 });

  // Enhanced scroll detection with dynamic positioning like Chatbase
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.min(scrolled / maxScroll, 1);
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Determine scroll direction
    const direction = scrolled > lastScrollY ? 'down' : 'up';
    setScrollDirection(direction);
    setLastScrollY(scrolled);

    // Check if near bottom (within 200px of bottom)
    const nearBottom = scrolled + windowHeight >= documentHeight - 200;
    setIsNearBottom(nearBottom);

    // Dynamic positioning based on scroll behavior
    let newPosition = { bottom: 24, right: 24 };

    if (nearBottom) {
      // Move up when near bottom to avoid footer overlap
      newPosition.bottom = 120;
    } else if (direction === 'down' && scrolled > 300) {
      // Slightly adjust position when scrolling down
      newPosition.bottom = 32;
      newPosition.right = 20;
    } else if (direction === 'up' && scrolled > 100) {
      // Optimal position when scrolling up
      newPosition.bottom = 28;
      newPosition.right = 28;
    }

    setDynamicPosition(newPosition);
    setScrollProgress(scrollPercentage);
  }, [lastScrollY]);

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

  // Smart scroll behavior - always goes to top since button is always visible
  const handleScrollAction = useCallback(() => {
    // Always scroll to top with smooth animation
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleScrollAction();
    }
  }, [handleScrollAction]);

  return (
    <motion.div
      className="fixed z-50"
      style={{
        bottom: `${dynamicPosition.bottom}px`,
        right: `${dynamicPosition.right}px`,
      }}
      animate={{
        bottom: dynamicPosition.bottom,
        right: dynamicPosition.right,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }}
      initial={{ opacity: 1, scale: 1 }}
    >
          {/* Enhanced Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-yellow-900/95 text-yellow-100 text-sm font-medium rounded-xl backdrop-blur-sm border border-yellow-600/50 whitespace-nowrap pointer-events-none shadow-lg"
              >
                {scrollProgress > 0.1 ? 'Back to top' : 'Scroll to top'}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-yellow-900/95"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Beautiful Yellow Scroll Button */}
          <motion.button
            onClick={handleScrollAction}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={scrollProgress > 0.1 ? "Back to top" : "Scroll to top"}
            title={scrollProgress > 0.1 ? "Back to top" : "Scroll to top"}
            className={`
              relative rounded-full overflow-hidden
              flex items-center justify-center
              bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600
              backdrop-blur-md border-2 border-yellow-300/50
              shadow-[0_8px_32px_rgba(251,191,36,0.4)]
              hover:shadow-[0_16px_48px_rgba(251,191,36,0.6)]
              hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-500
              focus:outline-none focus:ring-4 focus:ring-yellow-300/50 focus:ring-offset-2 focus:ring-offset-transparent
              transition-all duration-300 ease-out
              cursor-pointer select-none
              w-12 h-12 sm:w-14 sm:h-14
              group
              ${className}
            `}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, scale: 0, y: 20, rotate: -180 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
              boxShadow: isHovered
                ? '0 20px 60px rgba(251,191,36,0.7)'
                : '0 8px 32px rgba(251,191,36,0.4)'
            }}
            exit={{ opacity: 0, scale: 0, y: 20, rotate: 180 }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
            }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              rotate: { duration: 0.6 }
            }}
          >
            {/* Animated Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 64 64"
              aria-hidden="true"
            >
              {/* Background ring */}
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="2"
              />
              {/* Progress ring */}
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="rgba(0,0,0,0.2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={175.93} // 2 * π * 28
                initial={{ strokeDashoffset: 175.93 }}
                animate={{
                  strokeDashoffset: 175.93 - (scrollProgress * 175.93)
                }}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-200/30 via-transparent to-transparent" />

            {/* Glass shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-60" />

            {/* Inner golden glow */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-200/50 to-yellow-400/30" />

            {/* Beautiful Arrow Icon */}
            <motion.div
              className="relative z-20 flex items-center justify-center"
              animate={{
                y: isHovered ? -3 : 0,
                rotate: scrollDirection === 'down' && !isNearBottom ? 180 : 0,
              }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <ArrowUp
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800 font-bold drop-shadow-lg"
                strokeWidth={3}
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}
              />
            </motion.div>

            {/* Ripple effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full bg-yellow-300/40"
              initial={{ scale: 1, opacity: 0 }}
              animate={isHovered ? {
                scale: [1, 1.4, 1],
                opacity: [0, 0.6, 0]
              } : { scale: 1, opacity: 0 }}
              transition={{
                duration: 1.2,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut"
              }}
            />

            {/* Sparkle effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={isHovered ? {
                background: [
                  'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 80%, rgba(255,255,255,0.8) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8) 0%, transparent 50%)'
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: "linear"
              }}
            />
          </motion.button>
        </motion.div>
  );
};

export default ScrollButton;