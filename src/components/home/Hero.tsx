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
      isPortrait: false, // Landscape image
      mobilePosition: 'center 35%', // Standard positioning
      desktopPosition: 'center 30%' // Standard positioning
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
      if (index === 0) {
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
          // Set priority for first image
          if (index === 0) {
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
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds (faster with more images)

    return () => clearInterval(interval);
  }, [images.length, imagesLoaded]);

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
              className="w-full h-full object-cover transition-opacity duration-500"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              onLoad={(e) => {
                // Smooth fade-in when image loads
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
            {/* Dark gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
            {/* Additional overlay for mobile */}
            <div className="absolute inset-0 bg-black/20 md:bg-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
              Excellence in<br />
              <span className="text-yellow-400">Education</span>
            </h1>

            <div className="max-w-2xl mb-8 md:mb-12">
              <p className="text-lg sm:text-xl md:text-2xl mb-4 text-gray-100 leading-relaxed">
                Nurturing minds and shaping futures since 1977.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                Where academic excellence meets character development in the heart of Kumasi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 text-black font-semibold rounded-full shadow-xl hover:bg-yellow-400 hover:shadow-2xl transition-all duration-300 text-base sm:text-lg group"
              >
                Discover Our Story
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 shadow-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-base sm:text-lg"
              >
                Visit Our Campus
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage
                ? 'bg-yellow-400 scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;