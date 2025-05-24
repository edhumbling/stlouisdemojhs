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

      {/* Content - Clean Overlay - Positioned Lower */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-end pb-20 md:pb-24 h-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white"
          >
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              The <span className="text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse">Leading</span> Forces in Excellent & Wholistic <span className="text-yellow-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse">Education</span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-6 max-w-2xl">
              Powering the Next Generation of Ghana's Brightest and Skilled Workforce of the future since 1977
            </p>

            {/* Glass-like Small Buttons - Horizontal on Mobile */}
            <div className="flex flex-row gap-2 sm:gap-3">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 hover:bg-blue-600/30 hover:border-blue-400/50 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
              >
                Our Story
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 bg-green-600/20 backdrop-blur-sm border border-green-400/30 hover:bg-green-600/30 hover:border-green-400/50 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
              >
                Visit Us
              </Link>

              <Link
                to="/donate"
                className="inline-flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 bg-red-600/20 backdrop-blur-sm border border-red-400/30 hover:bg-red-600/30 hover:border-red-400/50 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm"
              >
                Donate
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