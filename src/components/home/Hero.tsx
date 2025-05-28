import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ShimmerLoader from '../common/ShimmerLoader';
import AsSeenOn from './AsSeenOn';
import { galleryImages } from '../../data';

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImageIndices, setLoadedImageIndices] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // 🎨 CREATIVE DAILY CYCLING HERO SYSTEM 🎨
  // Every day, the hero section displays a different set of 11 images from the gallery
  // Day 1: Images 1-11, Day 2: Images 12-22, Day 3: Images 23-26 + 1-7, etc.
  // This keeps the homepage fresh and showcases all school photos over time!
  const getDailyHeroImages = () => {
    // Calculate days since a reference date (e.g., Jan 1, 2025)
    const referenceDate = new Date('2025-01-01');
    const currentDate = new Date();
    const daysDifference = Math.floor((currentDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24));

    // Since this is "day 2", let's start from day 2 (index 1)
    const currentDay = (daysDifference + 1) % Math.ceil(galleryImages.length / 11);

    // Calculate starting index for today's set of 11 images
    const startIndex = currentDay * 11;

    // Get 11 images starting from the calculated index, wrapping around if needed
    const todaysImages = [];
    const imageIds = [];

    for (let i = 0; i < 11; i++) {
      const imageIndex = (startIndex + i) % galleryImages.length;
      const galleryImage = galleryImages[imageIndex];

      // Track which images we're using
      imageIds.push(galleryImage.id);

      // Determine if image is portrait or landscape based on URL patterns
      const isPortrait = galleryImage.src.includes('HEIC') || galleryImage.src.includes('portrait');

      todaysImages.push({
        url: galleryImage.src,
        isPortrait: isPortrait,
        mobilePosition: isPortrait ? 'center 75%' : 'center 45%',
        desktopPosition: isPortrait ? 'center 70%' : 'center 40%'
      });
    }

    // Log today's hero images for debugging
    console.log(`🎨 Hero Day ${currentDay + 1}: Displaying gallery images [${imageIds.join(', ')}]`);

    return todaysImages;
  };

  // Get today's hero images (starting with day 2 set: images 12-22)
  const images = getDailyHeroImages();

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

  // Ultra-fast progressive image loading with instant fallback
  useEffect(() => {
    const loadImagesProgressively = async () => {
      // Show hero immediately with fallback background
      setImagesLoaded(true);

      // Load first image with high priority
      const firstImagePromise = new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImageIndices([0]);
          resolve();
        };
        img.onerror = () => {
          console.warn('Failed to load first image');
          resolve();
        };
        img.fetchPriority = 'high';
        img.loading = 'eager';
        img.src = images[0].url;
      });

      try {
        await firstImagePromise;

        // Load remaining images much faster - reduce stagger time
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
          }, actualIndex * 100); // Much faster stagger - 100ms instead of 300ms
        });

      } catch (error) {
        console.error('Error loading first image:', error);
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
    <section className="relative min-h-[100svh] h-screen flex items-center overflow-hidden hero-section">
      {/* Background Images with Overlay */}
      <div className="absolute inset-0">
        {/* Instant fallback background - shows immediately */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-800 to-green-900 opacity-80"></div>

        {/* Beautiful shimmer loading */}
        {!imagesLoaded && (
          <ShimmerLoader variant="hero" />
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
                    transform: 'translateZ(0)',
                    objectPosition: isMobile ? image.mobilePosition : image.desktopPosition,
                    objectFit: 'cover',
                    minHeight: '100%',
                    minWidth: '100%',
                    transition: 'opacity 0.5s ease-in-out',
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

            {/* Deep Color Glowing Buttons - Responsive Layout */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 max-w-full">
              <Link
                to="/about"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="inline-flex items-center justify-center px-1.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-300 text-[10px] sm:text-xs md:text-sm relative overflow-hidden flex-shrink-0"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Our Story</span>
                <span className="absolute inset-0 bg-blue-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/schedule-visit"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="inline-flex items-center justify-center px-1.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] transition-all duration-300 text-[10px] sm:text-xs md:text-sm relative overflow-hidden flex-shrink-0"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Visit Us</span>
                <span className="absolute inset-0 bg-green-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/apply-now"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="inline-flex items-center justify-center px-1.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(234,88,12,0.5)] hover:shadow-[0_0_20px_rgba(234,88,12,0.7)] transition-all duration-300 text-[10px] sm:text-xs md:text-sm relative overflow-hidden flex-shrink-0"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Apply</span>
                <span className="absolute inset-0 bg-orange-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/news"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="inline-flex items-center justify-center px-1.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_20px_rgba(147,51,234,0.7)] transition-all duration-300 text-[10px] sm:text-xs md:text-sm relative overflow-hidden flex-shrink-0"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Latest News</span>
                <span className="absolute inset-0 bg-purple-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/partner"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="inline-flex items-center justify-center px-1.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_20px_rgba(6,182,212,0.7)] transition-all duration-300 text-[10px] sm:text-xs md:text-sm relative overflow-hidden flex-shrink-0"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Partner with Us</span>
                <span className="absolute inset-0 bg-cyan-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/donate"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="inline-flex items-center justify-center px-1.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.5)] hover:shadow-[0_0_20px_rgba(239,68,68,0.7)] transition-all duration-300 text-[10px] sm:text-xs md:text-sm relative overflow-hidden flex-shrink-0"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Donate</span>
                <span className="absolute inset-0 bg-red-500 opacity-30 rounded-lg"></span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* As Seen On Section - Mobile: above dots, Desktop: at dots line level */}
      <div className="absolute bottom-12 sm:bottom-16 md:bottom-6 left-0 right-0 md:right-0 md:left-auto z-15 md:w-3/4 lg:w-2/3">
        <AsSeenOn />
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