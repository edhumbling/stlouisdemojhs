import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AsSeenOn: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mediaLogos = [
    {
      id: 1,
      name: 'News Ghana',
      url: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo-newsghana-1.webp?updatedAt=1748331749060',
      width: 120,
      height: 40
    },
    {
      id: 2,
      name: 'Ghana Web',
      url: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo_desktop.png?updatedAt=1748331748149',
      width: 140,
      height: 45
    },
    {
      id: 3,
      name: 'Modern Ghana',
      url: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/site-logo2.webp?updatedAt=1748331748257',
      width: 130,
      height: 42
    },
    {
      id: 4,
      name: 'Ghana News',
      url: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/download.jpeg',
      width: 110,
      height: 38
    }
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedLogos = [...mediaLogos, ...mediaLogos, ...mediaLogos];

  return (
    <div className="w-full py-1 sm:py-2 relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10">
        {/* "As Seen On:" Title - Always visible at top */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mb-2 md:mb-3"
        >
          <h3 className="text-white/80 text-[10px] sm:text-xs md:text-sm font-light tracking-wider uppercase"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
            As Seen On:
          </h3>
        </motion.div>

        {/* Desktop: Right-to-left scroll with fade effect */}
        <div className="hidden md:block">
          {/* Fade effect - positioned where logos end (far right) */}
          <div className="absolute right-0 top-0 bottom-0 w-1/6 bg-gradient-to-l from-black/0 via-black/40 to-black/80 z-10 pointer-events-none"></div>

          {/* Right-to-left scrolling logos - continuous scroll */}
          <motion.div
            className="flex items-center space-x-8"
            animate={{
              x: [screenWidth, -screenWidth * 0.15] // Push ending much further to the right
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30, // Slower for smoother continuous effect
                ease: "linear"
              }
            }}
            style={{
              width: `${duplicatedLogos.length * 120}px`
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative group">
                  {/* Cute container for desktop */}
                  <div className="bg-white/90 rounded-lg p-2 shadow-md border border-white/30 group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                    <img
                      src={logo.url}
                      alt={logo.name}
                      className="h-5 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        maxWidth: `${logo.width * 0.5}px`,
                        maxHeight: `${logo.height * 0.7}px`
                      }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Cute sparkle effect */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: Scrolling design */}
        <div className="block md:hidden">

          {/* Mobile scroll container */}
          <div className="relative overflow-hidden">
            {/* Mobile fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/30 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black/30 to-transparent z-10 pointer-events-none"></div>

            {/* Mobile scrolling logos */}
            <motion.div
              className="flex items-center space-x-6"
              animate={{
                x: [0, -80 * mediaLogos.length]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear"
                }
              }}
              style={{
                width: `${duplicatedLogos.length * 100}px`
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <motion.div
                  key={`${logo.id}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative group">
                    {/* Cute mobile container */}
                    <div className="bg-white/85 rounded-md p-1.5 shadow-sm border border-white/20 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      <img
                        src={logo.url}
                        alt={logo.name}
                        className="h-4 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
                        style={{
                          maxWidth: `${logo.width * 0.4}px`,
                          maxHeight: `${logo.height * 0.6}px`
                        }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Mobile sparkle */}
                    <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsSeenOn;
