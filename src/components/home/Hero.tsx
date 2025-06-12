import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import ShimmerLoader from '../common/ShimmerLoader';
import AsSeenOn from './AsSeenOn';
import { galleryImages } from '../../data';

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImageIndices, setLoadedImageIndices] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  // 🎨 FUTURE-PROOF DAILY CYCLING HERO SYSTEM 🎨
  // Every day, the hero section displays a different set of 11 images from the gallery
  // Automatically adapts when new images are added to the gallery!
  // Current: 26 images = 3 day cycle, Future: 50 images = 5 day cycle, etc.
  // This keeps the homepage fresh and showcases ALL school photos over time!
  const getDailyHeroImages = () => {
    const totalImages = galleryImages.length;
    const imagesPerDay = 11;
    const totalDays = Math.ceil(totalImages / imagesPerDay);

    // Calculate days since a reference date (e.g., Jan 1, 2025)
    const referenceDate = new Date('2025-01-01');
    const currentDate = new Date();
    const daysDifference = Math.floor((currentDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24));

    // Since this is "day 2", let's start from day 2 (index 1)
    const currentDay = (daysDifference + 1) % totalDays;

    // Calculate starting index for today's set of 11 images
    const startIndex = currentDay * imagesPerDay;

    // Get 11 images starting from the calculated index, wrapping around if needed
    const todaysImages = [];
    const imageIds = [];

    for (let i = 0; i < imagesPerDay; i++) {
      const imageIndex = (startIndex + i) % totalImages;
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

    // Enhanced logging with future-proof information
    console.log(`🎨 Hero System Status:`);
    console.log(`   📊 Total Gallery Images: ${totalImages}`);
    console.log(`   📅 Total Cycle Days: ${totalDays}`);
    console.log(`   🎆 Current Day: ${currentDay + 1}/${totalDays}`);
    console.log(`   🖼️ Today's Images: [${imageIds.join(', ')}]`);
    console.log(`   🔄 Next refresh: Tomorrow with images starting from ID ${((currentDay + 1) % totalDays) * imagesPerDay + 1}`);

    return todaysImages;
  };

  // Get today's hero images - automatically adapts to gallery size!
  // Current (26 images): Day 2 = images 12-22
  // Future (50 images): Day 2 = images 12-22, but cycle extends to 5 days
  // Future (100 images): Day 2 = images 12-22, but cycle extends to 10 days
  const images = getDailyHeroImages();

  // Handle responsive design and PWA install
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // PWA Install Event Listeners
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Show the install button
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      // Hide the install button after successful installation
      setShowInstallButton(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    const isInstalled = isStandalone || isInWebAppiOS;

    if (!isInstalled) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Add preload link tags to document head for better performance
  useEffect(() => {
    const preloadLinks: HTMLLinkElement[] = [];

    // Note: Logo preload removed to prevent unused preload warning

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

  // PWA Install Handler with Enhanced UX
  const handleInstallApp = async () => {
    if (!deferredPrompt) {
      // Enhanced fallback for iOS with better instructions
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const message = `📱 Install St. Louis Demo. J.H.S App on iOS:\n\n1. Tap the Share button (📤) at the bottom\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to install the app\n\n✨ Get instant access with the school logo on your home screen!`;
        alert(message);
      } else {
        const message = `📱 Install St. Louis Demo. J.H.S App:\n\n• Look for "Install" or "Add to Home Screen" in your browser menu\n• Or check the address bar for an install icon\n\n✨ Get the full app experience with offline access!`;
        alert(message);
      }
      return;
    }

    try {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('✅ User accepted the install prompt');

        // Show success notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('🎉 St. Louis Demo. J.H.S App Installing!', {
            body: 'The app is being added to your device. You\'ll see the school logo on your home screen shortly.',
            icon: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs',
            badge: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs',
            tag: 'pwa-install',
            requireInteraction: false
          });
        }

        // Show in-page success message
        setTimeout(() => {
          alert('🎉 App installed successfully! Look for the St. Louis Demo. J.H.S icon with the school logo on your home screen.');
        }, 1000);

      } else {
        console.log('❌ User dismissed the install prompt');
      }

    } catch (error) {
      console.error('Error during installation:', error);
    } finally {
      // Clear the deferredPrompt
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  // Request notification permission for better UX
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }
  }, []);

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

              {/* Download App Button - PWA Install with School Logo */}
              {showInstallButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  onClick={handleInstallApp}
                  className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-yellow-500/25 hover:bg-yellow-500/35 backdrop-blur-xl border-2 border-yellow-400/60 text-yellow-50 font-bold rounded-xl shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:shadow-[0_0_35px_rgba(251,191,36,0.7)] transition-all duration-500 text-[10px] sm:text-xs md:text-sm relative overflow-hidden flex-shrink-0 group"
                  style={{
                    textShadow: '1px 1px 3px rgba(0,0,0,0.9), 0 0 15px rgba(251,191,36,0.6)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)'
                  }}
                >
                  {/* Enhanced glass effect background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/15 via-yellow-300/25 to-yellow-400/15 rounded-xl"></span>

                  {/* Multiple animated glow effects */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200"></span>
                  <span className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 delay-200"></span>

                  {/* Pulsing border glow */}
                  <span className="absolute inset-0 rounded-xl border-2 border-yellow-400/40 animate-pulse"></span>

                  {/* School Logo */}
                  <img
                    src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs"
                    alt="St. Louis Demo. J.H.S Logo"
                    className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-sm shadow-lg"
                  />

                  <span className="relative z-10 whitespace-nowrap">Download App</span>

                  {/* Download icon */}
                  <Download size={10} className="relative z-10 sm:w-3 sm:h-3 md:w-4 md:h-4 animate-bounce" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>



        {/* Mayamiles AI Button - Clean Olive Green Design */}
        <div className="absolute top-1/2 right-2 sm:right-4 md:right-6 lg:right-8 xl:right-12 transform -translate-y-1/2 z-20">
          <Link
            to="/mayamiles-ai"
            onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            className="group relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36"
          >
            {/* Simple glow effect */}
            <span className="absolute inset-0 rounded-full bg-white/10 animate-pulse" style={{ animationDuration: '2s' }}></span>

            {/* Main button container */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full">
              {/* White outer ring */}
              <div className="absolute inset-0 rounded-full border-3 border-white/70 shadow-[0_0_15px_rgba(255,255,255,0.3)]"></div>

              {/* Olive green circle - properly sized for mobile */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-olive-500 via-olive-600 to-olive-700 shadow-[0_0_20px_rgba(107,124,50,0.4)] hover:shadow-[0_0_25px_rgba(107,124,50,0.6)] transition-all duration-300 group-hover:scale-105">

                {/* Simple inner glow */}
                <span className="absolute inset-1 rounded-full bg-gradient-to-br from-white/10 to-transparent"></span>

                {/* Text content - Simplified and properly sized */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold text-center px-1">
                  <span className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base leading-tight" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    Mayamiles<br/>AI
                  </span>
                </div>
              </div>
            </div>
          </Link>
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