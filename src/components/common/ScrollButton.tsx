import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ScrollButtonProps {
  className?: string;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = scrolled / maxScroll;

      // Show button after scrolling 200px
      if (scrolled > 200) {
        setIsVisible(true);

        // Change direction based on scroll position
        // Show up arrow when in lower portion (to go back up), down arrow when in upper portion (to go down)
        if (scrollPercentage > 0.7) {
          setScrollDirection('up'); // Near bottom, show up arrow to go to top
        } else {
          setScrollDirection('down'); // In upper/middle, show down arrow to go to bottom
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
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
          className={`fixed bottom-4 right-5 sm:bottom-6 sm:right-4 z-30 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-yellow-500 shadow-lg hover:shadow-xl hover:bg-yellow-400 transition-all duration-200 ${className}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            key={scrollDirection}
            initial={{ opacity: 0, y: scrollDirection === 'up' ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: scrollDirection === 'up' ? -10 : 10 }}
            transition={{ duration: 0.2 }}
          >
            {scrollDirection === 'up' ? (
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black font-bold" strokeWidth={3} />
            ) : (
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black font-bold" strokeWidth={3} />
            )}
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollButton;
