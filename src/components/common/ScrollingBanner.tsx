import React from 'react';
import { motion } from 'framer-motion';

interface ScrollingBannerProps {
  text: string;
  className?: string;
}

const ScrollingBanner: React.FC<ScrollingBannerProps> = ({ text, className = '' }) => {
  return (
    <div className={`w-full overflow-hidden bg-zinc-900/80 backdrop-blur-sm border-y border-zinc-800 py-2 relative ${className}`}>
      {/* Gradient overlays for fade effect on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-zinc-900 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-zinc-900 to-transparent z-10"></div>

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
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="inline-block px-8 text-gray-400 text-opacity-40 font-extrabold text-[8vw] md:text-[7vw] lg:text-[6vw] tracking-tighter uppercase"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                fontStretch: 'condensed'
              }}
            >
              {text}
              <span className="text-green-500 text-opacity-30 mx-4">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollingBanner;
