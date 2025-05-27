import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface GlassScrollButtonProps {
  className?: string;
}

const GlassScrollButton: React.FC<GlassScrollButtonProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = document.documentElement.scrollTop;
          const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrollPercentage = scrolled / maxScroll;

          // Show button after scrolling 200px
          if (scrolled > 200) {
            setIsVisible(true);

            // Change direction based on scroll position
            if (scrollPercentage > 0.7) {
              setScrollDirection('up'); // Near bottom, show up arrow to go to top
            } else {
              setScrollDirection('down'); // In upper/middle, show down arrow to go to bottom
            }
          } else {
            setIsVisible(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (scrollDirection === 'up') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleClick}
          className={`fixed
            left-4 bottom-4 sm:left-6 sm:bottom-6 md:left-8 md:bottom-8
            lg:left-auto lg:right-4 lg:bottom-4 xl:right-6 xl:bottom-6 2xl:right-8 2xl:bottom-8
            z-[9995] flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
            rounded-full shadow-lg hover:shadow-xl transition-all duration-300
            bg-yellow-500/20 backdrop-blur-md border border-yellow-400/30
            hover:bg-yellow-400/30 hover:border-yellow-300/50
            ${className}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: '0 0 20px rgba(234, 179, 8, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
            contain: 'layout style'
          }}
        >
          <motion.div
            key={scrollDirection}
            initial={{ opacity: 0, y: scrollDirection === 'up' ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: scrollDirection === 'up' ? -10 : 10 }}
            transition={{ duration: 0.2 }}
          >
            {scrollDirection === 'up' ? (
              <ArrowUp className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-300 font-bold" strokeWidth={3} />
            ) : (
              <ArrowDown className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-300 font-bold" strokeWidth={3} />
            )}
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default GlassScrollButton;
