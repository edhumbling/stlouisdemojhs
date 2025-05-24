import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const images = [
    {
      url: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MvnyEMdmbxU06Mca57V3tJ1r8NOShqgZsCH9p',
      isPortrait: true, // This image needs bottom portion visible
      mobilePosition: 'center 70%', // Show more of the bottom on mobile
      desktopPosition: 'center 65%' // Show more of the bottom on desktop
    },
    {
      url: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MRZwFWWpo7s1MlWNERCjA3OUSQ9nHvY65ui4I',
      isPortrait: true, // Portrait image with students holding books
      mobilePosition: 'center 80%', // Show more of the bottom on mobile
      desktopPosition: 'center 75%' // Show more of the bottom on desktop
    },
    {
      url: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1Mwf9R6zhW0NcVsvA1quWUypQ6IChZY53j4PSK',
      isPortrait: false, // Landscape image
      mobilePosition: 'center 40%', // Slightly lower for better composition
      desktopPosition: 'center 35%' // Balanced positioning
    },
    {
      url: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MC9tZ4UzDLioRYz5qf92ZpIJwTgmKdEu6AcFh',
      isPortrait: false, // Landscape image
      mobilePosition: 'center 45%', // Show middle portion
      desktopPosition: 'center 40%' // Balanced view
    },
    {
      url: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MSsSuPjLzTgIL0eaoWJ8UQBqvRNFysYxGXktA',
      isPortrait: false, // Landscape image
      mobilePosition: 'center 35%', // Standard positioning
      desktopPosition: 'center 30%' // Standard positioning
    }
  ];

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add preload link tags to document head for better performance
  useEffect(() => {
    const preloadLinks: HTMLLinkElement[] = [];

    images.forEach((image, index) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = image.url;
      // High priority for first two images for faster slideshow start
      if (index <= 1) {
        link.fetchPriority = 'high';
      }
      document.head.appendChild(link);
      preloadLinks.push(link);
    });

    // Cleanup function to remove preload links
    return () => {
      preloadLinks.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []);

  // Preload images for better performance
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((image, index) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = image.url;
          // High priority for first two images for faster slideshow
          if (index <= 1) {
            img.fetchPriority = 'high';
          }
        });
      });

      try {
        const loadedImgs = await Promise.all(imagePromises);
        setLoadedImages(loadedImgs);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        // Still show the component even if preloading fails
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    // Start slideshow immediately, don't wait for all images to load
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Faster slideshow - 4 seconds per image

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-[100svh] h-screen flex items-center overflow-hidden">
      {/* Background Images with Overlay */}
      <div className="absolute inset-0">
        {/* Fallback gradient background while images load */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black"></div>

        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              // Ensure full coverage without gaps
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <img
              src={image.url}
              alt={`St. Louis Demonstration Junior High School ${index + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
              loading={index <= 1 ? "eager" : "lazy"} // Eager load first two images
              decoding="async"
              fetchPriority={index <= 1 ? "high" : "auto"}
              onLoad={(e) => {
                // Faster fade-in when image loads
                e.currentTarget.style.opacity = '1';
              }}
              style={{
                imageRendering: 'auto',
                transform: 'translateZ(0)', // Hardware acceleration
                objectPosition: isMobile ? image.mobilePosition : image.desktopPosition,
                objectFit: 'cover',
                minHeight: '100%',
                minWidth: '100%',
                opacity: 0, // Start invisible, fade in when loaded
              }}
            />
          </div>
        ))}
      </div>

      {/* Beautiful Shaped Overlay for Text Areas */}
      <div className="absolute bottom-0 left-0 right-0 z-5">
        {/* Organic shaped overlay that covers text areas - Mobile optimized */}
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-96">
          {/* Main overlay shape */}
          <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

          {/* Artistic curved overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-3/4">
            <svg viewBox="0 0 1200 400" className="w-full h-full">
              <defs>
                <linearGradient id="overlayGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(0,0,0,0.8)" />
                  <stop offset="50%" stopColor="rgba(0,0,0,0.5)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </linearGradient>
              </defs>
              <path
                d="M0,400 C300,350 500,320 800,340 C900,350 1000,360 1200,320 L1200,400 Z"
                fill="url(#overlayGradient)"
              />
            </svg>
          </div>

          {/* Additional artistic elements */}
          <div className="absolute bottom-16 left-8 w-32 h-32 bg-black/30 rounded-full blur-xl transform -rotate-12"></div>
          <div className="absolute bottom-24 right-16 w-24 h-24 bg-black/20 rounded-full blur-lg transform rotate-45"></div>
        </div>
      </div>

      {/* Content - Clean Text - High Mobile Positioning */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-start pt-20 pb-6 sm:pb-12 md:pb-16 lg:pb-20 h-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white"
          >
            {/* Main Heading - Dark Glow - Mobile Compact */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 sm:mb-3 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.6)' }}>
              The <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(251,191,36,1)] animate-pulse" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 15px rgba(251,191,36,0.8)' }}>Leading</span> Forces in Excellent & Wholistic <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(251,191,36,1)] animate-pulse" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 15px rgba(251,191,36,0.8)' }}>Education</span>
            </h1>

            {/* Subtext - Dark Glow - Mobile Compact */}
            <p className="text-xs sm:text-sm md:text-base text-gray-100 mb-4 sm:mb-6 max-w-2xl drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)' }}>
              Powering the Next Generation of Ghana's Brightest and Skilled Workforce of the future since 1977
            </p>

            {/* Deep Color Glowing Buttons - Horizontal on Mobile */}
            <div className="flex flex-row gap-2 sm:gap-3">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.6),0_0_40px_rgba(59,130,246,0.4),0_0_60px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8),0_0_50px_rgba(59,130,246,0.6),0_0_75px_rgba(59,130,246,0.4)] transition-all duration-300 text-xs sm:text-sm relative overflow-hidden"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10">Our Story</span>
                <span className="absolute inset-0 bg-blue-500 opacity-40 animate-pulse rounded-lg"></span>
                <span className="absolute inset-0 bg-blue-400 opacity-30 animate-ping rounded-lg" style={{ animationDelay: '0.5s' }}></span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.6),0_0_40px_rgba(34,197,94,0.4),0_0_60px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.8),0_0_50px_rgba(34,197,94,0.6),0_0_75px_rgba(34,197,94,0.4)] transition-all duration-300 text-xs sm:text-sm relative overflow-hidden"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10">Visit Us</span>
                <span className="absolute inset-0 bg-green-500 opacity-40 animate-pulse rounded-lg"></span>
                <span className="absolute inset-0 bg-green-400 opacity-30 animate-ping rounded-lg" style={{ animationDelay: '0.5s' }}></span>
              </Link>

              <Link
                to="/donate"
                className="inline-flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.4),0_0_60px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8),0_0_50px_rgba(239,68,68,0.6),0_0_75px_rgba(239,68,68,0.4)] transition-all duration-300 text-xs sm:text-sm relative overflow-hidden"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10">Donate</span>
                <span className="absolute inset-0 bg-red-500 opacity-40 animate-pulse rounded-lg"></span>
                <span className="absolute inset-0 bg-red-400 opacity-30 animate-ping rounded-lg" style={{ animationDelay: '0.5s' }}></span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Super Cute Image Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-3 border border-white/20">
          <div className="flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 group ${
                  index === currentImage
                    ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50'
                    : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                {/* Cute pulse effect for active indicator */}
                {index === currentImage && (
                  <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-30"></div>
                )}
                {/* Cute hover glow */}
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;