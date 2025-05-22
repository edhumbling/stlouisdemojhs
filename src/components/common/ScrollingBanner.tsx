import React from 'react';
import { motion } from 'framer-motion';

interface ScrollingBannerProps {
  text: string;
  className?: string;
}

const ScrollingBanner: React.FC<ScrollingBannerProps> = ({ text, className = '' }) => {
  return (
    <div className={`w-full overflow-hidden py-12 relative bg-black/20 ${className}`}>
      <div className="relative whitespace-nowrap">
        {/* We duplicate the text multiple times to ensure continuous scrolling */}
        <motion.div
          className="inline-block"
          animate={{
            x: [0, -100 + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60, // Much slower scrolling
              ease: "linear",
            },
          }}
        >
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="inline-block px-12 text-white text-opacity-90 font-extrabold text-[25vw] md:text-[22vw] lg:text-[20vw] tracking-tighter uppercase"
              style={{
                textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                fontFamily: "'Anton', sans-serif",
                letterSpacing: '-0.02em'
              }}
            >
              {text}
              <span className="text-white text-opacity-30 mx-6">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollingBanner;
