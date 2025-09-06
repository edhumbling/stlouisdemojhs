import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import ShimmerLoader from '../common/ShimmerLoader';
import AsSeenOn from './AsSeenOn';
import { galleryImages } from '../../data';
import { useDeviceDetection, getTabletPadding, getTabletTextSizes } from '../../hooks/useDeviceDetection';

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImageIndices, setLoadedImageIndices] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [installComplete, setInstallComplete] = useState(false);

  // Smart device detection
  const deviceInfo = useDeviceDetection();

  // Helper function for button styling based on device - Cute small mobile buttons with no layout shift
  const getButtonClasses = (baseColor: string, hoverColor: string, shadowColor: string) => {
    // Mobile-first approach to prevent layout shift - start with mobile styles
    const baseClasses = `inline-flex items-center justify-center font-bold transition-all duration-300 relative overflow-hidden flex-shrink-0`;
    const colorClasses = `bg-${baseColor} hover:bg-${hoverColor} text-white shadow-[0_0_15px_${shadowColor}] hover:shadow-[0_0_20px_${shadowColor}]`;

    // Default to mobile styles to prevent stretching, then enhance for larger screens
    const mobileStyles = `px-2 py-1 rounded-lg text-xs`;
    const tabletStyles = `md:px-5 md:py-2.5 md:text-sm`;
    const desktopStyles = `lg:px-4 lg:py-2 lg:text-sm`;

    if (deviceInfo.type === 'tablet') {
      return `${baseClasses} ${colorClasses} ${mobileStyles} ${tabletStyles}`;
    } else if (deviceInfo.type === 'mobile') {
      return `${baseClasses} ${colorClasses} ${mobileStyles}`;
    } else {
      return `${baseClasses} ${colorClasses} ${mobileStyles} ${tabletStyles} ${desktopStyles}`;
    }
  };

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
      setIsInstalling(false);
      setInstallProgress(100);
      setInstallComplete(true);
      console.log('PWA was installed');

      // Attempt to immediately launch the installed PWA window
      try {
        const message = { type: 'LAUNCH_APP', url: '/' } as const;
        if (navigator.serviceWorker?.controller) {
          navigator.serviceWorker.controller.postMessage(message);
        } else if (navigator.serviceWorker) {
          navigator.serviceWorker.ready.then((reg) => {
            reg.active?.postMessage(message);
          });
        }
        // Best-effort: close the current tab after triggering launch (may be ignored by some browsers)
        setTimeout(() => {
          try { window.close(); } catch {}
        }, 300);
      } catch (e) {
        console.warn('Auto-launch after install failed:', e);
      }

      // Auto-hide completion message after 5 seconds
      setTimeout(() => {
        setInstallComplete(false);
      }, 5000);
    };

    // Listen for service worker messages
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'PWA_INSTALLED') {
        setInstallProgress(100);
        setInstallComplete(true);
        setIsInstalling(false);
        console.log('✅ PWA installation confirmed by service worker');
      } else if (event.data && event.data.type === 'PWA_INSTALL_FAILED') {
        setIsInstalling(false);
        setInstallProgress(0);
        alert('❌ App installation failed. Please try again.');
        console.error('❌ PWA installation failed');
      }
    };

    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    const isInstalled = isStandalone || isInWebAppiOS;

    if (!isInstalled) {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);
    }

    // Listen for service worker messages
    navigator.serviceWorker?.addEventListener('message', handleServiceWorkerMessage);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      navigator.serviceWorker?.removeEventListener('message', handleServiceWorkerMessage);
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

  // PWA Install Handler with Progress Tracking
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
      // Start installation process
      setIsInstalling(true);
      setInstallProgress(0);
      setInstallComplete(false);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setInstallProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        console.log('✅ User accepted the install prompt');

        // Complete progress
        setInstallProgress(100);

        // Wait a moment then show completion
        setTimeout(() => {
          setInstallComplete(true);
          setIsInstalling(false);

          // Fallback attempt to launch installed PWA in case appinstalled event is delayed
          try {
            const message = { type: 'LAUNCH_APP', url: '/' } as const;
            if (navigator.serviceWorker?.controller) {
              navigator.serviceWorker.controller.postMessage(message);
            } else if (navigator.serviceWorker) {
              navigator.serviceWorker.ready.then((reg) => {
                reg.active?.postMessage(message);
              });
            }
          } catch (e) {
            console.warn('Fallback auto-launch failed:', e);
          }

          // Auto-hide completion message after 5 seconds
          setTimeout(() => {
            setInstallComplete(false);
            setShowInstallButton(false);
          }, 5000);

        }, 1000);

      } else {
        console.log('❌ User dismissed the install prompt');
        clearInterval(progressInterval);
        setIsInstalling(false);
        setInstallProgress(0);
      }

    } catch (error) {
      console.error('Error during installation:', error);
      setIsInstalling(false);
      setInstallProgress(0);
    } finally {
      // Clear the deferredPrompt
      setDeferredPrompt(null);
    }
  };

  // Notification permission request removed

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



      {/* Content - Smart Device Detection Positioning */}
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-start h-full ${
        deviceInfo.type === 'tablet'
          ? `items-start ${getTabletPadding(deviceInfo)} pb-8`
          : deviceInfo.type === 'mobile'
          ? 'items-start pt-20 pb-4'
          : 'items-end pt-0 pb-16 xl:pb-24'
      }`}>
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white"
          >
            {/* Main Heading - Smart Device Detection Sizing */}
            <h1 className={`font-bold leading-tight drop-shadow-[0_0_8px_rgba(0,0,0,0.9)] ${
              deviceInfo.type === 'tablet'
                ? `${getTabletTextSizes(deviceInfo)?.heading || 'text-4xl'} mb-4`
                : deviceInfo.type === 'mobile'
                ? 'text-2xl sm:text-3xl mb-2'
                : 'text-5xl xl:text-6xl 2xl:text-7xl mb-6'
            }`} style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.6)' }}>
              The <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(251,191,36,1)] animate-pulse" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 15px rgba(251,191,36,0.8)' }}>Leading</span> Forces in Excellent & Holistic <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(251,191,36,1)] animate-pulse" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 15px rgba(251,191,36,0.8)' }}>Education</span>
            </h1>

            {/* Subtext - Smart Device Detection Sizing */}
            <p className={`text-gray-100 drop-shadow-[0_0_6px_rgba(0,0,0,0.8)] max-w-3xl ${
              deviceInfo.type === 'tablet'
                ? `${getTabletTextSizes(deviceInfo)?.subtitle || 'text-base'} mb-5`
                : deviceInfo.type === 'mobile'
                ? 'text-xs sm:text-sm mb-3'
                : 'text-lg xl:text-xl mb-8 max-w-4xl'
            }`} style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)' }}>
              Powering the Next Generation of Ghana's Brightest and Skilled Workforce of the future since 1977
            </p>

            {/* Deep Color Glowing Buttons - Mobile-first responsive layout to prevent shift */}
            <div className="flex flex-wrap max-w-full gap-2 md:gap-3 lg:gap-4">
              <Link
                to="/about"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className={getButtonClasses('blue-600', 'blue-700', 'rgba(59,130,246,0.5)')}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Our Story</span>
                <span className="absolute inset-0 bg-blue-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/schedule-visit"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className={getButtonClasses('green-600', 'green-700', 'rgba(34,197,94,0.5)')}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Visit Us</span>
                <span className="absolute inset-0 bg-green-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/apply-now"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className={getButtonClasses('orange-600', 'orange-700', 'rgba(234,88,12,0.5)')}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Apply</span>
                <span className="absolute inset-0 bg-orange-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/news"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className={getButtonClasses('purple-600', 'purple-700', 'rgba(147,51,234,0.5)')}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Latest News</span>
                <span className="absolute inset-0 bg-purple-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/mayamiles-ai"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className={getButtonClasses('emerald-600', 'emerald-700', 'rgba(16,185,129,0.5)')}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Learn with AI</span>
                <span className="absolute inset-0 bg-emerald-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/financialliteracy"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className={getButtonClasses('yellow-600', 'yellow-700', 'rgba(202,138,4,0.5)')}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Learn Financial Literacy</span>
                <span className="absolute inset-0 bg-yellow-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/partner"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className={getButtonClasses('cyan-600', 'cyan-700', 'rgba(6,182,212,0.5)')}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Partner with Us</span>
                <span className="absolute inset-0 bg-cyan-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/shop"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className={getButtonClasses('indigo-600', 'indigo-700', 'rgba(99,102,241,0.5)')}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Alumni Shop</span>
                <span className="absolute inset-0 bg-indigo-500 opacity-30 rounded-lg"></span>
              </Link>

              <Link
                to="/donate"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className={getButtonClasses('red-600', 'red-700', 'rgba(239,68,68,0.5)')}
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                <span className="relative z-10 whitespace-nowrap">Donate</span>
                <span className="absolute inset-0 bg-red-500 opacity-30 rounded-lg"></span>
              </Link>

              {/* Download App Button - PWA Install with Progress */}
              {(showInstallButton || isInstalling || installComplete) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  className="relative"
                >
                  {installComplete ? (
                    // Installation Complete State
                    <div className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-green-500/25 backdrop-blur-xl border-2 border-green-400/60 text-green-50 font-bold rounded-xl shadow-[0_0_25px_rgba(34,197,94,0.5)] text-[10px] sm:text-xs md:text-sm relative overflow-hidden flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="hidden sm:inline">App Installed!</span>
                      <span className="sm:hidden">Installed!</span>
                      <button
                        onClick={() => window.location.reload()}
                        className="ml-2 px-2 py-1 bg-green-600/50 hover:bg-green-600/70 rounded text-xs transition-colors"
                      >
                        Open
                      </button>
                    </div>
                  ) : isInstalling ? (
                    // Installing State with Progress
                    <div className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 bg-blue-500/25 backdrop-blur-xl border-2 border-blue-400/60 text-blue-50 font-bold rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.5)] text-[10px] sm:text-xs md:text-sm relative overflow-hidden flex-shrink-0">
                      <div className="flex items-center gap-2 w-full">
                        <div className="animate-spin w-3 h-3 sm:w-4 sm:h-4 border-2 border-blue-300 border-t-transparent rounded-full"></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs mb-1">
                            <span className="hidden sm:inline">Installing App...</span>
                            <span className="sm:hidden">Installing...</span>
                          </div>
                          <div className="w-full bg-blue-900/50 rounded-full h-1.5">
                            <div
                              className="bg-blue-400 h-1.5 rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${installProgress}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-xs opacity-75">{Math.round(installProgress)}%</span>
                      </div>
                    </div>
                  ) : (
                    // Default Install Button
                    <button
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
                    className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-sm shadow-lg"
                  />

                  <span className="relative z-10 whitespace-nowrap">Download App</span>

                      {/* Download icon */}
                      <span className="relative z-10 text-xs sm:text-sm animate-bounce">📱</span>
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>




      </div>

      {/* As Seen On Section - Mobile: above dots, Desktop: at dots line level */}
      <div className="absolute bottom-12 sm:bottom-16 md:bottom-12 lg:bottom-6 left-0 right-0 lg:right-0 lg:left-auto z-15 lg:w-3/4 xl:w-2/3">
        <AsSeenOn />
      </div>

      {/* Smart Image Indicators - Only Show Loaded Images */}
      {loadedImageIndices.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 md:bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
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