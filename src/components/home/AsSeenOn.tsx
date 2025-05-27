import React from 'react';
import { motion } from 'framer-motion';

const AsSeenOn: React.FC = () => {
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
    <div className="w-full py-4 sm:py-6 relative overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/20 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* "As Seen On" Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-4 sm:mb-6"
        >
          <h3 className="text-white/90 text-xs sm:text-sm font-medium tracking-wider uppercase mb-2" 
              style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
            As Seen On
          </h3>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent mx-auto"></div>
        </motion.div>

        {/* Infinite Horizontal Scroll Container */}
        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling logos container */}
          <motion.div
            className="flex items-center space-x-8 sm:space-x-12 md:space-x-16"
            animate={{
              x: [0, -100 * mediaLogos.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25, // Slow, smooth scroll
                ease: "linear"
              }
            }}
            style={{
              width: `${duplicatedLogos.length * 160}px` // Approximate width calculation
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative group">
                  {/* Cute glow effect on hover */}
                  <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm scale-110"></div>
                  
                  {/* Logo container with glass effect */}
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg border border-white/20 group-hover:bg-white transition-all duration-300">
                    <img
                      src={logo.url}
                      alt={logo.name}
                      className="h-6 sm:h-8 md:h-10 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      style={{
                        maxWidth: `${logo.width * 0.8}px`,
                        maxHeight: `${logo.height}px`
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

        {/* Subtle bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 sm:mt-6"
        >
          <div className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default AsSeenOn;
