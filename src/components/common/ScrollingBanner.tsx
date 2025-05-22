import React from 'react';
import { motion } from 'framer-motion';

interface ScrollingBannerProps {
  text: string;
  className?: string;
}

const ScrollingBanner: React.FC<ScrollingBannerProps> = ({ text, className = '' }) => {
  return (
    <div className={`w-full overflow-hidden py-6 sm:py-8 relative bg-black/20 ${className}`}>
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
              duration: 80, // Even slower scrolling to showcase the logo
              ease: "linear",
            },
          }}
        >
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className="inline-block px-0 sm:px-2 text-white text-opacity-90 font-extrabold text-[25vw] md:text-[22vw] lg:text-[20vw] tracking-tighter uppercase"
              style={{
                textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                fontFamily: "'Anton', sans-serif",
                letterSpacing: '-0.02em'
              }}
            >
              {text}
              <span className="inline-flex items-center justify-center mx-4 sm:mx-6 relative">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <motion.img
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [-2, 2, -2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs"
                  alt="School Logo"
                  className="h-[18vw] md:h-[16vw] lg:h-[14vw] w-auto object-contain inline-block drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                />
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollingBanner;
