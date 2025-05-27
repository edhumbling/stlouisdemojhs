import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ScrollButtonProps {
  className?: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ className = "" }) => {
  const [isVisible, setIsVisible] = useState(true); // Always visible like taskbar time
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smart scroll direction logic - always visible, changes behavior based on position
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrolled / maxScroll;

    // Smart direction logic based on scroll position and user behavior
    if (scrollPercentage > 0.7) {
      // Near bottom (70%+), always show up arrow to go to top
      setScrollDirection("up");
    } else if (scrolled < lastScrollY && scrolled > window.innerHeight * 0.3) {
      // User is scrolling up and past 30% of viewport, show up arrow
      setScrollDirection("up");
    } else {
      // User is in upper section or scrolling down, show down arrow
      setScrollDirection("down");
    }

    setLastScrollY(scrolled);
  }, [lastScrollY]);

  useEffect(() => {
    // Throttle scroll events for better performance
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

  const scrollToTop = () => {
    // Always scroll to the very top (0) regardless of current position
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  const handleClick = () => {
    if (scrollDirection === "up") {
      // Always go to the very top, especially important when clicked from footer
      scrollToTop();
    } else {
      // Scroll to bottom
      scrollToBottom();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleClick}
          className={`
            fixed z-50 flex items-center justify-center
            ${isMobile ? 'bottom-4 left-4 w-12 h-12' : 'bottom-6 right-6 w-14 h-14'}
            rounded-full backdrop-blur-md border border-yellow-400/30
            bg-gradient-to-br from-yellow-400/80 to-yellow-500/80
            shadow-[0_8px_32px_rgba(251,191,36,0.3)]
            hover:shadow-[0_12px_40px_rgba(251,191,36,0.4)]
            hover:from-yellow-300/90 hover:to-yellow-400/90
            transition-all duration-300 ease-out
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
              boxShadow: '0 16px 48px rgba(251,191,36,0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
          >
          {/* Glass overlay effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-50" />

          {/* Inner glow */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-yellow-200/40 to-yellow-400/20" />

          {/* Arrow icon with smooth transition */}
          <motion.div
            key={scrollDirection}
            initial={{ opacity: 0, y: scrollDirection === "up" ? 8 : -8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: scrollDirection === "up" ? -8 : 8, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            className="relative z-10"
          >
            {scrollDirection === "up" ? (
              <ArrowUp
                className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7'} text-black/80 font-bold drop-shadow-sm`}
                strokeWidth={2.5}
              />
            ) : (
              <ArrowDown
                className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7'} text-black/80 font-bold drop-shadow-sm`}
                strokeWidth={2.5}
              />
            )}
          </motion.div>

          {/* Pulse effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-400/30"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollButton;