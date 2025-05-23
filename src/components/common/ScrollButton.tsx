import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ScrollButtonProps {
  className?: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrolled > 300) {
        setIsVisible(true);
        // Show up arrow when not at bottom, down arrow when near bottom
        setScrollDirection(scrolled > maxScroll * 0.8 ? 'down' : 'up');
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleClick = () => {
    if (scrollDirection === 'up') {
      scrollToTop();
    } else {
      scrollToBottom();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleClick}
          className={`fixed bottom-6 right-4 z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-yellow-500 shadow-lg hover:shadow-xl hover:bg-yellow-400 transition-colors ${className}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {scrollDirection === 'up' ? (
            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black" />
          ) : (
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black" />
          )}
          
          {/* Pulse effect */}
          <span className="absolute w-full h-full rounded-full bg-yellow-500 animate-ping opacity-75"></span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollButton;
