import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImageIndices, setLoadedImageIndices] = useState<number[]>([]);
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
      url: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-25%20at%2006.05.16_4d8aef13.jpg',
      isPortrait: false, // New landscape image
      mobilePosition: 'center 45%', // Show middle portion for better composition
      desktopPosition: 'center 40%' // Balanced view
    },
    {
      url: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-25%20at%2006.05.16_f4d2c9bc.jpg',
      isPortrait: false, // New landscape image
      mobilePosition: 'center 45%', // Show middle portion for better composition
      desktopPosition: 'center 40%' // Balanced view
    },
    {
      url: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1Mtqqjxq2Z4OUSfDyHBMwru2hG3KJe97qYaoNx',
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
    },
    {
      url: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1McgTvUDyC0e41iyIWj2N9gloVHaOsx7JDtz8K',
      isPortrait: false, // Landscape image
      mobilePosition: 'center 40%', // Balanced positioning
      desktopPosition: 'center 35%' // Balanced positioning
    },
    {
      url: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO',
      isPortrait: false, // Landscape image
      mobilePosition: 'center 45%', // Show middle portion
      desktopPosition: 'center 40%' // Balanced view
    },
    {
      url: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MgqIz8s7W0LQyCA6JY2x5PlO4s79mU8GbXkh3',
      isPortrait: false, // Landscape image
      mobilePosition: 'center 40%', // Balanced positioning
      desktopPosition: 'center 65%' // Show from beneath - bottom portion visible
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

    // Preload logo first for instant loading screen
    const logoLink = document.createElement('link');
    logoLink.rel = 'preload';
    logoLink.as = 'image';
    logoLink.href = 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png';
    logoLink.fetchPriority = 'high';
    document.head.appendChild(logoLink);
    preloadLinks.push(logoLink);

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

  // Smart progressive image loading - only cycle through loaded images
  useEffect(() => {
    const loadImagesProgressively = async () => {
      // Load first image immediately
      const firstImagePromise = new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImageIndices([0]);
          setImagesLoaded(true); // Hero shows immediately!
          resolve();
        };
        img.onerror = () => {
          setImagesLoaded(true); // Show hero anyway
          resolve();
        };
        img.fetchPriority = 'high';
        img.loading = 'eager';
        img.src = images[0].url;
      });

      try {
        await firstImagePromise;

        // Load remaining images progressively and add to slideshow as they load
        images.slice(1).forEach((image, index) => {
          const actualIndex = index + 1;

          setTimeout(() => {
            const img = new Image();
            img.onload = () => {
              setLoadedImageIndices(prev => {
                if (!prev.includes(actualIndex)) {
                  return [...prev, actualIndex].sort((a, b) => a - b);
                }
                return prev;
              });
            };
            img.onerror = () => {
              console.warn(`Failed to load image ${actualIndex + 1}`);
            };
            img.fetchPriority = actualIndex <= 2 ? 'high' : 'low';
            img.loading = actualIndex <= 2 ? 'eager' : 'lazy';
            img.src = image.url;
          }, actualIndex * 300); // Stagger loading every 300ms
        });

      } catch (error) {
        console.error('Error loading first image:', error);
        setImagesLoaded(true);
      }
    };

    loadImagesProgressively();
  }, []);

  useEffect(() => {
    // Smart slideshow - only cycle through loaded images
    if (loadedImageIndices.length <= 1) return; // Don't start slideshow until we have at least 2 images

    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const currentIndex = loadedImageIndices.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadedImageIndices.length;
        return loadedImageIndices[nextIndex];
      });
    }, 4000); // 4 seconds per image

    return () => clearInterval(interval);
  }, [loadedImageIndices]);

  return (
    <section className="relative min-h-[100svh] h-screen flex items-center overflow-hidden">
      {/* Background Images with Overlay */}
      <div className="absolute inset-0">
        {/* Instant fallback background - shows immediately */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-800 to-green-900 opacity-80"></div>

        {/* Beautiful Logo Heartbeat Loader */}
        {!imagesLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-800 to-green-900 flex items-center justify-center">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-slate-700/40 to-green-600/30 animate-pulse"></div>

            {/* School Logo with Heartbeat Animation */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                {/* POWERFUL Energy Rings - The Heart's Aura! */}
                <div className="absolute -inset-4 rounded-full bg-yellow-400/25 animate-ping" style={{ animationDuration: '1.8s' }}></div>
                <div className="absolute -inset-6 rounded-full bg-blue-400/20 animate-ping" style={{ animationDuration: '2.2s', animationDelay: '0.3s' }}></div>
                <div className="absolute -inset-8 rounded-full bg-green-400/15 animate-ping" style={{ animationDuration: '2.6s', animationDelay: '0.6s' }}></div>
                <div className="absolute -inset-10 rounded-full bg-white/10 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.9s' }}></div>

                {/* LARGE Logo - Pure Heart of the School! */}
                <img
                  src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png"
                  alt="St. Louis Demonstration J.H.S Logo - The Heart of Excellence"
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 object-contain animate-heartbeat"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.8)) drop-shadow(0 0 60px rgba(59,130,246,0.5)) drop-shadow(0 0 90px rgba(34,197,94,0.4)) drop-shadow(0 0 120px rgba(251,191,36,0.3))',
                    imageRendering: 'crisp-edges'
                  }}
                />
              </div>

              {/* Loading Text */}
              <div className="mt-6 sm:mt-8 text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 animate-pulse"
                    style={{ fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  St. Louis Demonstration J.H.S
                </h3>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {images.map((image, index) => {
          const isLoaded = loadedImageIndices.includes(index);
          const isVisible = index === currentImage && isLoaded;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                display: isLoaded ? 'block' : 'none', // Only render loaded images
              }}
            >
              {isLoaded && (
                <img
                  src={image.url}
                  alt={`St. Louis Demonstration Junior High School ${index + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "low"}
                  style={{
                    imageRendering: 'optimizeSpeed',
                    transform: 'translateZ(0) scale(1.01)',
                    willChange: 'transform, opacity',
                    objectPosition: isMobile ? image.mobilePosition : image.desktopPosition,
                    objectFit: 'cover',
                    minHeight: '100%',
                    minWidth: '100%',
                    transition: 'opacity 0.5s ease-in-out, transform 0.3s ease-out',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>



      {/* Content - Mobile High, Desktop Low Positioning */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-start sm:items-start md:items-end lg:items-end justify-start pt-20 sm:pt-16 md:pt-0 lg:pt-0 pb-4 sm:pb-8 md:pb-16 lg:pb-24 h-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white"
          >
            {/* Main Heading - Mobile Compact, Desktop Reduced */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-1 sm:mb-2 md:mb-4 lg:mb-6 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.6)' }}>
              The <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(251,191,36,1)] animate-pulse" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 15px rgba(251,191,36,0.8)' }}>Leading</span> Forces in Excellent & Wholistic <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(251,191,36,1)] animate-pulse" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 15px rgba(251,191,36,0.8)' }}>Education</span>
            </h1>

            {/* Subtext - Mobile Compact, Desktop Reduced */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-100 mb-2 sm:mb-3 md:mb-6 lg:mb-8 max-w-2xl lg:max-w-3xl drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)' }}>
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
                to="/news"
                className="inline-flex items-center justify-center px-2 py-1 sm:px-4 sm:py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(147,51,234,0.6),0_0_40px_rgba(147,51,234,0.4),0_0_60px_rgba(147,51,234,0.2)] hover:shadow-[0_0_25px_rgba(147,51,234,0.8),0_0_50px_rgba(147,51,234,0.6),0_0_75px_rgba(147,51,234,0.4)] transition-all duration-300 text-xs sm:text-sm relative overflow-hidden"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10">News & Updates</span>
                <span className="absolute inset-0 bg-purple-500 opacity-40 animate-pulse rounded-lg"></span>
                <span className="absolute inset-0 bg-purple-400 opacity-30 animate-ping rounded-lg" style={{ animationDelay: '0.5s' }}></span>
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

      {/* Smart Image Indicators - Only Show Loaded Images */}
      {loadedImageIndices.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-3 border border-white/20">
            <div className="flex space-x-3">
              {loadedImageIndices.map((imageIndex) => (
                <button
                  key={imageIndex}
                  onClick={() => setCurrentImage(imageIndex)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 group ${
                    imageIndex === currentImage
                      ? 'bg-yellow-400 scale-125 shadow-lg shadow-yellow-400/50'
                      : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                  }`}
                  aria-label={`View image ${imageIndex + 1}`}
                >
                  {/* Cute pulse effect for active indicator */}
                  {imageIndex === currentImage && (
                    <div className="absolute inset-0 rounded-full bg-yellow-400 animate-ping opacity-30"></div>
                  )}
                  {/* Cute hover glow */}
                  <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;