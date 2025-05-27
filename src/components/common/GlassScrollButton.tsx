import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface GlassScrollButtonProps {
  className?: string;
}

const GlassScrollButton: React.FC<GlassScrollButtonProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const location = useLocation();

  // Ensure scroll button works on all pages, including iframe pages
  const isFullScreenPage = ['/learnhub', '/ai-search', '/calendar', '/schedule-visit'].some(path =>
    location.pathname.startsWith(path)
  );

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

            // More responsive direction change based on scroll position
            // Show down arrow in upper half (0-50%) to encourage scrolling down
            // Show up arrow in lower half (50%+) to encourage scrolling back up
            if (scrollPercentage > 0.5) {
              setScrollDirection('up'); // Lower half, show up arrow to go to top
            } else {
              setScrollDirection('down'); // Upper half, show down arrow to go to bottom
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
          className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8
            lg:bottom-4 lg:left-auto lg:right-4 xl:bottom-6 xl:right-6 2xl:bottom-8 2xl:right-8
            ${isFullScreenPage ? 'z-[99995]' : 'z-[9995]'} flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14
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
            initial={{ opacity: 0, y: scrollDirection === 'up' ? 10 : -10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: scrollDirection === 'up' ? -10 : 10, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {scrollDirection === 'up' ? (
              <ArrowUp
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-300 font-bold"
                strokeWidth={3}
                style={{ filter: 'drop-shadow(0 0 4px rgba(234, 179, 8, 0.5))' }}
              />
            ) : (
              <ArrowDown
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-300 font-bold"
                strokeWidth={3}
                style={{ filter: 'drop-shadow(0 0 4px rgba(234, 179, 8, 0.5))' }}
              />
            )}
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default GlassScrollButton;
