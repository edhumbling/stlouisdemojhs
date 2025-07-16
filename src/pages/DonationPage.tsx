import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, BookOpen } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import { useDeviceDetection } from '../hooks/useDeviceDetection';

const DonationPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as any;

  // Smart device detection for edge-to-edge layout
  const deviceInfo = useDeviceDetection();
  const isTabletOrDesktop = deviceInfo.type === 'tablet' || deviceInfo.type === 'desktop';

  // Drag state for all buttons - Lego-like play (mobile only)
  const [dragPositions, setDragPositions] = useState<{[key: number]: {x: number, y: number}}>({});

  // Reset button position after drag (Lego bounce-back effect)
  const handleDragEnd = (amount: number) => {
    setTimeout(() => {
      setDragPositions(prev => ({
        ...prev,
        [amount]: { x: 0, y: 0 }
      }));
    }, 1500); // Shorter delay for more playful feel
  };

  // Skip loading if returning from monthly donation page for instant navigation
  const skipLoading = state?.preserveState && state?.returnFromCardContent;
  const [isLoading, setIsLoading] = useState(!skipLoading);
  const [imagesLoaded, setImagesLoaded] = useState(skipLoading ? 4 : 0);
  const [componentsLoaded, setComponentsLoaded] = useState(skipLoading);
  const [paymentFormLoaded, setPaymentFormLoaded] = useState(skipLoading);
  const totalImages = 5; // Header background image + 3 payment icons + USSD image

  // Haptic feedback function
  const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30]
      };
      navigator.vibrate(patterns[type]);
    }
  };

  // Image loading handler
  const handleImageLoad = () => {
    setImagesLoaded(prev => {
      const newCount = prev + 1;
      checkAllLoaded(newCount, componentsLoaded, paymentFormLoaded);
      return newCount;
    });
  };

  // Component loading handler
  const handleComponentLoad = () => {
    setComponentsLoaded(true);
    checkAllLoaded(imagesLoaded, true, paymentFormLoaded);
  };

  // Payment form loading handler
  const handlePaymentFormLoad = () => {
    setPaymentFormLoaded(true);
    checkAllLoaded(imagesLoaded, componentsLoaded, true);
  };

  // Check if all components are loaded
  const checkAllLoaded = (images: number, components: boolean, payment: boolean) => {
    if (images >= totalImages && components && payment) {
      // Very fast transition to prevent glitches
      setTimeout(() => setIsLoading(false), 300);
    }
  };

  // Emoji support detection and fallback
  useEffect(() => {
    const detectEmojiSupport = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;

      canvas.width = 20;
      canvas.height = 20;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.font = '16px Arial';

      // Test with a flag emoji
      ctx.fillText('🇺🇸', 10, 10);
      const imageData = ctx.getImageData(0, 0, 20, 20);

      // Check if any pixels are colored (emoji rendered)
      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i] !== 0 || imageData.data[i + 1] !== 0 || imageData.data[i + 2] !== 0) {
          return true;
        }
      }
      return false;
    };

    if (!detectEmojiSupport()) {
      // Apply fallback styles if emojis aren't supported
      document.documentElement.style.setProperty('--emoji-fallback', '1');

      // Replace emoji content with currency symbols
      const emojiElements = document.querySelectorAll('.emoji-fallback');
      emojiElements.forEach((element) => {
        const fallback = element.getAttribute('data-fallback');
        if (fallback) {
          element.textContent = fallback;
          element.classList.add('currency-symbol');
        }
      });
    }
  }, []);

  // Loading timeout, smooth scroll enhancement, and dynamic height
  useEffect(() => {
    // Enable smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';

    // Mark components as loaded after a short delay
    const componentTimeout = setTimeout(() => {
      handleComponentLoad();
    }, 500);

    // Blazingly fast fallback timeout to prevent long loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second maximum loading time

    // Listen for Paystack height changes (if supported)
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://paystack.shop' && event.data.type === 'paystack-height-change') {
        const iframe = document.querySelector('iframe[src*="paystack.shop"]') as HTMLIFrameElement;
        if (iframe && event.data.height) {
          iframe.style.height = event.data.height + 'px';
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      clearTimeout(loadingTimeout);
      clearTimeout(componentTimeout);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Handle immediate scroll to section when returning from monthly donation pages
  useEffect(() => {
    const state = location.state as any;
    if (state?.scrollToSection === 'monthly-support' && state?.returnFromCardContent && state?.preserveState) {
      // Immediate scroll without delay for smooth back navigation
      const element = document.getElementById('monthly-support');
      if (element) {
        // Use requestAnimationFrame for immediate, smooth scroll
        requestAnimationFrame(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',  // Center the section for better visibility
            inline: 'nearest'
          });
        });
      }
    }
  }, [location]);
  // Show blazingly fast silver shimmer loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-900 z-50 flex items-center justify-center">
        {/* Intense Background Shimmer */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-l from-transparent via-silver/30 to-transparent"
            animate={{
              x: ['100%', '-100%']
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.3
            }}
          />
        </div>

        {/* Main Loader */}
        <div className="relative z-10 text-center">
          {/* School Logo/Icon with Silver Glow */}
          <div className="mb-6">
            <motion.div
              className="w-20 h-20 mx-auto bg-gradient-to-br from-silver/40 to-white/20 rounded-full flex items-center justify-center shadow-2xl border-2 border-silver/50"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 20px rgba(192, 192, 192, 0.3)',
                  '0 0 40px rgba(192, 192, 192, 0.6)',
                  '0 0 20px rgba(192, 192, 192, 0.3)'
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
          </div>

          {/* Multiple Silver Shimmer Bars */}
          <div className="space-y-3 mb-6">
            <div className="relative">
              <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-transparent via-silver/80 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
                <motion.div
                  className="h-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 0.2
                  }}
                />
              </div>
            </div>
            <div className="relative">
              <div className="w-56 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
                <motion.div
                  className="h-full bg-gradient-to-r from-transparent via-silver/60 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 0.4
                  }}
                />
              </div>
            </div>
          </div>

          {/* Loading Text with Silver Glow */}
          <motion.h2
            className="text-2xl font-bold text-white mb-2"
            style={{
              textShadow: '0 0 10px rgba(192, 192, 192, 0.5)'
            }}
            animate={{
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            💖 St. Louis Demo JHS
          </motion.h2>
          <p className="text-white/90 text-lg">Loading donation portal...</p>
          <p className="text-silver/80 text-sm mt-1">Supporting education • Changing lives</p>

          {/* Fast Floating Hearts */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 text-red-300 text-2xl"
              animate={{
                y: [0, -15, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              ❤️
            </motion.div>
            <motion.div
              className="absolute top-1/3 right-1/4 text-pink-300 text-xl"
              animate={{
                y: [0, -12, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5
              }}
            >
              💕
            </motion.div>
            <motion.div
              className="absolute bottom-1/3 left-1/3 text-red-400 text-lg"
              animate={{
                y: [0, -8, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
            >
              💖
            </motion.div>
            <motion.div
              className="absolute bottom-1/4 right-1/3 text-pink-400 text-xl"
              animate={{
                y: [0, -14, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.3
              }}
            >
              💗
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Donate | Support Our Educational Mission & Student Development - St. Louis Demonstration JHS"
        description="Support quality education at St. Louis Demonstration JHS with your generous donation. Help us provide better facilities, resources, and opportunities for our students. Every contribution makes a difference in shaping young minds for Ghana's future."
        keywords="donate, support education, school donation, Ghana education support, educational funding, school development, student support, charitable giving"
        image="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/hhh.png"
        url="/donate"
        type="website"
        pageType="donation"
        useGalleryImages={false}
        socialImagePreferences={{
          facebook: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/hhh.png",
          twitter: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/hhh.png",
          linkedin: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/hhh.png",
          whatsapp: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/hhh.png"
        }}
      />
      {/* Silver Shimmer Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-900 z-50 flex items-center justify-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          </div>

          {/* Main Loader */}
          <div className="relative z-10 text-center">
            {/* School Logo/Icon */}
            <div className="mb-8">
              <motion.div
                className="w-24 h-24 mx-auto bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center shadow-2xl border border-white/30"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Heart className="w-12 h-12 text-white" />
              </motion.div>
            </div>

            {/* Silver Shimmer Effect */}
            <div className="relative mb-6">
              <div className="w-80 h-3 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </div>
            </div>

            {/* Loading Text */}
            <motion.h2
              className="text-3xl font-bold text-white mb-2"
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              💖 St. Louis Demo JHS
            </motion.h2>
            <p className="text-white/90 text-xl">Loading donation page...</p>
            <p className="text-white/70 text-sm mt-2">Preparing secure payment options</p>

            {/* Floating Hearts */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/4 left-1/4 text-red-300 text-3xl"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                ❤️
              </motion.div>
              <motion.div
                className="absolute top-1/3 right-1/4 text-pink-300 text-2xl"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1
                }}
              >
                💕
              </motion.div>
              <motion.div
                className="absolute bottom-1/3 left-1/3 text-red-400 text-xl"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2
                }}
              >
                💖
              </motion.div>
              <motion.div
                className="absolute bottom-1/4 right-1/3 text-pink-400 text-2xl"
                animate={{
                  y: [0, -18, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5
                }}
              >
                💗
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Original Page Content with Anti-Glitch */}
      <motion.div
        className="min-h-screen bg-white lg:overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
      {/* Back Button and Title Section - Red Love Theme */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-2 sm:py-3 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              onClick={() => triggerHapticFeedback('light')}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-700/50 hover:bg-red-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-red-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </Link>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              💝 Donate with Love
            </h1>
          </div>
        </div>
      </div>

      {/* Announcement Bar - Attached to Back Bar */}
      <div className="bg-green-600 py-3">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-white font-semibold text-sm sm:text-base">
              🛡️ 100% of donations received are directed to the School for development
            </p>
          </div>
        </div>
      </div>

      {/* Optimized Header Section - Red Love Theme with Background Image */}
      <motion.section className="pb-6 sm:pb-8 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/edhumbling/Whisk_5d78f380df.jpg"
            alt="School Background"
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
            onError={handleImageLoad}
          />
          {/* Overlay to maintain readability and love theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/70 via-pink-600/70 to-red-700/70"></div>
        </div>

        {/* Floating 3D Love Emojis */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Simple 3D Love Emojis using Unicode with CSS 3D effects */}
          <div className="absolute top-4 left-4 animate-bounce text-2xl sm:text-3xl" style={{
            animationDelay: '0s',
            animationDuration: '3s',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
            transform: 'rotateY(15deg) rotateX(5deg)'
          }}>
            ❤️
          </div>
          <div className="absolute top-8 right-8 animate-bounce text-xl sm:text-2xl" style={{
            animationDelay: '1s',
            animationDuration: '4s',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
            transform: 'rotateY(-15deg) rotateX(5deg)'
          }}>
            💕
          </div>
          <div className="absolute bottom-6 left-8 animate-bounce text-3xl sm:text-4xl" style={{
            animationDelay: '2s',
            animationDuration: '3.5s',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
            transform: 'rotateY(10deg) rotateX(-5deg)'
          }}>
            💖
          </div>
          <div className="absolute top-12 left-1/2 animate-bounce text-lg sm:text-xl" style={{
            animationDelay: '0.5s',
            animationDuration: '4.5s',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
            transform: 'rotateY(-10deg) rotateX(10deg)'
          }}>
            💗
          </div>
          <div className="absolute bottom-4 right-4 animate-bounce text-2xl sm:text-3xl" style={{
            animationDelay: '1.5s',
            animationDuration: '3.8s',
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
            transform: 'rotateY(20deg) rotateX(-10deg)'
          }}>
            💘
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6 shadow-xl border border-white/30">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              💖 Support Our School with Love
            </h1>

            <p className="text-sm sm:text-base text-white/90 mb-3 sm:mb-4 max-w-xl mx-auto">
              Every donation helps provide better education for our students
            </p>

            {/* Payment Options Message */}
            <div className="text-center text-white font-medium text-sm sm:text-base mb-2 drop-shadow-lg">
              Choose your preferred donation method:
            </div>

            {/* Donation Buttons Container */}
            <div className="mt-8 mb-10 flex flex-wrap justify-center gap-2 sm:gap-4 px-2">
              {/* $1 Donation Button - Featured */}
              <Link
                to="/donate-one-dollar"
                onClick={() => triggerHapticFeedback('medium')}
                className="inline-flex items-center justify-center px-4 py-3 sm:px-6 sm:py-3 text-sm sm:text-lg font-bold text-white bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 border border-green-700 rounded-xl hover:from-green-400 hover:via-emerald-400 hover:to-green-500 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ring-2 ring-green-300/50"
              >
                <span className="mr-2 text-lg sm:text-xl">💵</span>
                <span>Just $1</span>
              </Link>

              {/* PayPal Donation Button - Optimized */}
              <Link
                to="/donate-paypal"
                onClick={() => triggerHapticFeedback('medium')}
                className="inline-flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-base font-bold text-yellow-900 bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-400 border border-yellow-600 rounded-lg hover:from-yellow-200 hover:via-yellow-100 hover:to-yellow-300 shadow-lg transition-colors duration-200"
              >
                <img
                  src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                  alt="PayPal Logo"
                  className="h-3 sm:h-4 w-auto mr-1 sm:mr-2"
                />
                <span>PayPal</span>
              </Link>

              {/* US Bank Donation Button - Optimized */}
              <Link
                to="/donate-us-bank"
                onClick={() => triggerHapticFeedback('medium')}
                className="inline-flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-base font-bold text-white bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 border border-blue-800 rounded-lg hover:from-blue-500 hover:via-blue-400 hover:to-blue-600 shadow-lg transition-colors duration-200"
              >
                <span className="mr-1 sm:mr-2 text-sm sm:text-lg">🇺🇸</span>
                <span>US Bank</span>
              </Link>

              {/* UK Bank Donation Button - Optimized */}
              <Link
                to="/donate-uk-bank"
                onClick={() => triggerHapticFeedback('medium')}
                className="inline-flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-base font-bold text-white bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 border border-purple-800 rounded-lg hover:from-purple-500 hover:via-purple-400 hover:to-purple-600 shadow-lg transition-colors duration-200"
              >
                <span className="mr-1 sm:mr-2 text-sm sm:text-lg">🇬🇧</span>
                <span>UK Bank</span>
              </Link>

              {/* Euro Bank Donation Button - Optimized */}
              <Link
                to="/donate-euro-bank"
                onClick={() => triggerHapticFeedback('medium')}
                className="inline-flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-base font-bold text-white bg-gradient-to-br from-green-600 via-green-500 to-green-700 border border-green-800 rounded-lg hover:from-green-500 hover:via-green-400 hover:to-green-600 shadow-lg transition-colors duration-200"
              >
                <span className="mr-1 sm:mr-2 text-sm sm:text-lg">🇪🇺</span>
                <span>Euro Bank</span>
              </Link>
            </div>

            {/* Payment Option Icons - Optimized */}
            <div className="w-full flex justify-center sm:justify-between items-center mb-6 px-2 gap-4">
              <img
                src="https://schoolerpghana.com/img/gateways/momo.png"
                alt="Momo"
                className="h-7 sm:h-14 w-auto rounded shadow-lg"
                onLoad={handleImageLoad}
                onError={handleImageLoad}
              />
              <img
                src="https://schoolerpghana.com/img/gateways/tco.png"
                alt="TCO"
                className="h-7 sm:h-14 w-auto rounded shadow-lg"
                onLoad={handleImageLoad}
                onError={handleImageLoad}
              />
              <img
                src="https://schoolerpghana.com/img/gateways/bankwire.png"
                alt="Bankwire"
                className="h-7 sm:h-14 w-auto rounded shadow-lg"
                onLoad={handleImageLoad}
                onError={handleImageLoad}
              />
            </div>

            {/* USSD Code Alternative Section - Mobile Optimized, Desktop Free */}
            <div className="mb-4 px-1 sm:px-2 lg:px-0">
              <div className="bg-gradient-to-r from-orange-500/20 via-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-lg border border-white/20 p-3 sm:p-4 lg:p-8 text-center lg:bg-none lg:border-none lg:backdrop-blur-none">
                <h3 className="text-white font-bold text-sm sm:text-lg lg:text-2xl mb-3 drop-shadow">
                  📱 Alternative: Use Our USSD Code
                </h3>

                {/* USSD Code Image - Guy with hands extended - 2/3 bigger on desktop */}
                <div className="mb-5 flex justify-center">
                  <img
                    src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/hhh.png"
                    alt="USSD Code Donation - Guy extending hands with code"
                    className="h-24 sm:h-32 md:h-40 lg:h-96 w-auto rounded-xl shadow-lg border-2 border-white/50"
                  />
                </div>

                {/* USSD Code Display */}
                <div className="mb-4">
                  <div className="bg-gradient-to-r from-yellow-300 to-orange-400 text-orange-900 font-black text-lg sm:text-xl lg:text-3xl px-4 py-3 lg:px-8 lg:py-6 rounded-lg border border-orange-500 shadow-lg inline-block">
                    📞 Dial: <span className="font-black text-2xl lg:text-4xl">*246#</span>
                  </div>
                </div>

                {/* Step-by-step Instructions - Free layout on desktop */}
                <div className="text-left max-w-md lg:max-w-none mx-auto mb-4 lg:mb-2">
                  <h4 className="text-white font-bold text-sm sm:text-base lg:text-xl mb-3 lg:mb-1 text-center">
                    📋 Follow These Steps:
                  </h4>
                  <div className="space-y-2 lg:space-y-1 text-white/90 text-xs sm:text-sm lg:text-base lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
                    <div className="flex items-start gap-2 lg:gap-4">
                      <span className="bg-orange-500 text-white rounded-full w-5 h-5 lg:w-8 lg:h-8 flex items-center justify-center text-xs lg:text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                      <span>Dial <strong className="text-yellow-300">*246#</strong></span>
                    </div>
                    <div className="flex items-start gap-2 lg:gap-4">
                      <span className="bg-orange-500 text-white rounded-full w-5 h-5 lg:w-8 lg:h-8 flex items-center justify-center text-xs lg:text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                      <span>Choose a service. eg. <strong className="text-yellow-300">Transfer Money</strong></span>
                    </div>
                    <div className="flex items-start gap-2 lg:gap-4">
                      <span className="bg-orange-500 text-white rounded-full w-5 h-5 lg:w-8 lg:h-8 flex items-center justify-center text-xs lg:text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                      <span>Select a Destination Account eg. <strong className="text-yellow-300">To Mobile Wallet</strong></span>
                    </div>
                    <div className="flex items-start gap-2 lg:gap-4">
                      <span className="bg-orange-500 text-white rounded-full w-5 h-5 lg:w-8 lg:h-8 flex items-center justify-center text-xs lg:text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                      <span>Select Mobile Network - <strong className="text-yellow-300">Telecel</strong></span>
                    </div>
                    <div className="flex items-start gap-2 lg:gap-4">
                      <span className="bg-orange-500 text-white rounded-full w-5 h-5 lg:w-8 lg:h-8 flex items-center justify-center text-xs lg:text-sm font-bold flex-shrink-0 mt-0.5">5</span>
                      <span>Enter Recipient Wallet Number - <strong className="text-yellow-300">0208705290</strong></span>
                    </div>
                    <div className="flex items-start gap-2 lg:gap-4">
                      <span className="bg-orange-500 text-white rounded-full w-5 h-5 lg:w-8 lg:h-8 flex items-center justify-center text-xs lg:text-sm font-bold flex-shrink-0 mt-0.5">6</span>
                      <span>Enter Amount - <strong className="text-yellow-300">any amount</strong></span>
                    </div>
                    <div className="flex items-start gap-2 lg:gap-4">
                      <span className="bg-orange-500 text-white rounded-full w-5 h-5 lg:w-8 lg:h-8 flex items-center justify-center text-xs lg:text-sm font-bold flex-shrink-0 mt-0.5">7</span>
                      <span>Enter Reference eg: <strong className="text-yellow-300">your Name</strong></span>
                    </div>
                    <div className="flex items-start gap-2 lg:gap-4">
                      <span className="bg-orange-500 text-white rounded-full w-5 h-5 lg:w-8 lg:h-8 flex items-center justify-center text-xs lg:text-sm font-bold flex-shrink-0 mt-0.5">8</span>
                      <span>Wait for Prompt and confirm <strong className="text-yellow-300">Mobile Money Wallet Pin</strong></span>
                    </div>
                  </div>
                </div>

                {/* Mobile Money Number Highlight */}
                <div className="mb-3 lg:mb-1">
                  <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-yellow-900 font-black text-sm sm:text-base lg:text-xl px-3 py-2 lg:px-6 lg:py-4 rounded-lg border border-yellow-500 shadow-lg inline-block">
                    📱 Send to: <span className="font-black">0208705290</span>
                  </div>
                </div>

                <p className="text-white/90 text-xs sm:text-sm lg:text-base drop-shadow font-medium leading-relaxed lg:leading-tight">
                  Quick and easy way to donate using your mobile phone's USSD service
                </p>
              </div>
            </div>

            {/* International Transfers Section - Mobile Optimized */}
            <div className="mb-4 px-1 sm:px-2">
              <div className="bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 backdrop-blur-sm rounded-lg border border-white/20 p-3 sm:p-4 text-center">
                <h3 className="text-white font-bold text-sm sm:text-lg mb-3 drop-shadow">
                  🌍 International Transfers
                </h3>

                {/* International Transfer Image - Optimized */}
                <div className="mb-5 flex justify-center">
                  <img
                    src="https://ik.imagekit.io/humbling/emma.png"
                    alt="International Transfer Services"
                    className="h-24 sm:h-32 md:h-40 lg:h-44 w-auto rounded-xl shadow-lg border-2 border-white/50"
                  />
                </div>

                {/* Transfer Service Cards - Optimized */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-white mb-4">
                  {/* TapTapSend - Optimized */}
                  <a
                    href="https://www.taptapsend.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-br from-red-600 via-red-500 to-red-700 border border-red-800 rounded-lg hover:from-red-500 hover:via-red-400 hover:to-red-600 shadow-lg transition-colors duration-200"
                  >
                    <img src="https://www.taptapsend.com/favicon.ico" alt="TapTapSend" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <span className="leading-tight">TapTap Send</span>
                  </a>

                  {/* PayAngel - Optimized */}
                  <a
                    href="https://www.payangel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 border border-blue-800 rounded-lg hover:from-blue-500 hover:via-blue-400 hover:to-blue-600 shadow-lg transition-colors duration-200"
                  >
                    <img src="https://www.payangel.com/favicon.ico" alt="PayAngel" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <span className="leading-tight">PayAngel</span>
                  </a>

                  {/* Sendwave - Optimized */}
                  <a
                    href="https://www.sendwave.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-br from-green-600 via-green-500 to-green-700 border border-green-800 rounded-lg hover:from-green-500 hover:via-green-400 hover:to-green-600 shadow-lg transition-colors duration-200"
                  >
                    <img src="https://www.sendwave.com/favicon.ico" alt="Sendwave" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <span className="leading-tight">Sendwave</span>
                  </a>

                  {/* WorldRemit - Optimized */}
                  <a
                    href="https://www.worldremit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-2 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 border border-purple-800 rounded-lg hover:from-purple-500 hover:via-purple-400 hover:to-purple-600 shadow-lg transition-colors duration-200"
                  >
                    <img src="https://www.worldremit.com/favicon.ico" alt="WorldRemit" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <span className="leading-tight">WorldRemit</span>
                  </a>
                </div>

                {/* Mobile Money Number - Optimized */}
                <div className="mb-3">
                  <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 text-yellow-900 font-black text-sm sm:text-base px-3 py-2 rounded-lg border border-yellow-500 shadow-lg inline-block">
                    📱 Send to: <span className="font-black">0208705290</span>
                  </div>
                </div>

                <p className="text-white/90 text-xs sm:text-sm drop-shadow font-medium leading-relaxed">
                  Use these services to send money directly to our Mobile Money account
                </p>
              </div>
            </div>

            {/* Physical Donations Welcome - Free Floating */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center mb-2 gap-2">
                  <BookOpen className="w-6 h-6 text-white drop-shadow" />
                  <h3 className="text-base sm:text-lg font-extrabold text-white drop-shadow">Physical Donations Welcome!</h3>
              </div>
                <p className="text-white/90 text-xs sm:text-sm mb-3 font-medium drop-shadow">
                  We also warmly receive gifts in the form of physical assets such as books, computers, furniture, and any other educational materials. Your contributions are received gladly and cheerfully with gratitude!
              </p>
              <p className="text-white/90 text-xs sm:text-sm mb-3 font-medium drop-shadow">
                <span className="text-yellow-300 font-bold" style={{ textShadow: '0 0 10px rgba(255, 255, 0, 0.8)' }}>
                  🤝 Local Organizations, Foreign Education-Oriented Organizations, and Non-Profits are welcomed to donate officially with us too!
                </span>
              </p>
              <a
                href="/partner"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="inline-flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg border border-white/40 transition-colors duration-200 text-base mt-2"
              >
                  <Heart className="w-5 h-5" />
                Partner With Us
              </a>
                <div className="w-full flex justify-center items-center mt-4 gap-4">
                  <span className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-blue-600/80 shadow-lg text-2xl sm:text-4xl">
                    💻
                  </span>
                  <span className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-green-600/80 shadow-lg text-2xl sm:text-4xl">
                    👨‍🏫
                  </span>
                  <span className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-pink-600/80 shadow-lg text-2xl sm:text-4xl">
                    🏫
                  </span>
                  <span className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-yellow-400/80 shadow-lg text-2xl sm:text-4xl">
                    🧑‍🎓
                  </span>
                </div>
            </div>


          </motion.div>
        </div>
      </motion.section>

      {/* Main Content - Natural Scrolling Payment Form - White Background */}
      <motion.section
        className="py-6 cute-font payment-section bg-white"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
      >
        <div className={isTabletOrDesktop ? '' : 'px-3'}>
          <div className={isTabletOrDesktop ? 'w-full' : 'max-w-sm mx-auto'}>

            {/* Payment Form - Natural Scrolling */}
            <div className="w-full">
              <div className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white overflow-hidden"
                >

                  {/* Payment Info - Short and Snappy */}
                  <div className="bg-white py-4 text-center">
                    <div className={`max-w-md mx-auto ${isTabletOrDesktop ? 'px-0' : 'px-4'}`}>
                      <p className="text-blue-600 text-sm font-semibold mb-1">
                        💳 Ghana: MoMo • Cards • Bank Transfer
                      </p>
                      <p className="text-gray-600 text-xs">
                        MTN • Vodafone • AirtelTigo • Visa/Mastercard
                      </p>
                    </div>
                  </div>

                  {/* Monthly Support Section - White Background */}
                  <div id="monthly-support" className={`bg-white py-8 ${isTabletOrDesktop ? '' : 'px-4'}`}>
                    {/* Bold Section Header in Rounded Rectangle */}
                    <div className="text-center mb-6">
                      <div className="inline-block bg-black px-4 sm:px-8 py-2 sm:py-4 rounded-2xl border border-gray-900 shadow-sm">
                        <h2 className="text-base sm:text-4xl font-black text-white mb-0">
                          MONTHLY SUPPORT
                        </h2>
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-3 flex items-center justify-center gap-2">
                        <span>⭐</span>
                        <span>Support Levels</span>
                        <span>⭐</span>
                      </h3>
                      <p className="text-green-500 text-sm sm:text-base font-semibold mb-2 text-center px-2">
                        Join our monthly supporters community
                      </p>
                      <p className="text-blue-500 text-xs sm:text-sm font-medium text-center px-2">
                        ✨ Recurring • Secure • Cancel anytime ✨
                      </p>
                    </div>

                    {/* Support Level Buttons - Larger with Stars and Labels */}
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                      {/* Desktop: All 9 in single row, Mobile: 5 top, 4 bottom */}
                      <div className="hidden lg:flex gap-3">
                        {[
                          { amount: 10, label: 'Stone', stars: '⭐', route: '/donate-monthly-10' },
                          { amount: 30, label: 'Bronze', stars: '⭐⭐', route: '/donate-monthly-30' },
                          { amount: 50, label: 'Silver', stars: '⭐⭐⭐', route: '/donate-monthly-50' },
                          { amount: 100, label: 'Gold', stars: '⭐⭐⭐⭐', route: '/donate-monthly-100' },
                          { amount: 200, label: 'Diamond', stars: '⭐⭐⭐⭐⭐', route: '/donate-monthly-200' },
                          { amount: 500, label: 'Platinum', stars: '⭐⭐⭐⭐⭐⭐', route: '/donate-monthly-500' },
                          { amount: 1000, label: 'Vibranium', stars: '⭐⭐⭐⭐⭐⭐⭐', route: '/donate-monthly-1000' },
                          { amount: 3000, label: 'Omega Force', stars: '⭐⭐⭐⭐⭐⭐⭐⭐', route: '/donate-monthly-3000' },
                          { amount: 5000, label: 'Sovereign One', stars: '⭐⭐⭐⭐⭐⭐⭐⭐⭐', route: '/donate-monthly-5000' }
                        ].map((tier) => (
                          <Link
                            key={tier.amount}
                            to={tier.route}
                            className="relative bg-black border border-gray-800 hover:border-gray-600 px-4 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group text-center block overflow-hidden min-w-[80px]"
                          >
                            {/* Simple shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                            <div className="relative">
                              <div className="text-xs mb-1">{tier.stars}</div>
                              <div className="text-white font-bold text-sm mb-1">₵{tier.amount}</div>
                              <div className="text-yellow-400 text-xs font-medium" style={{ textShadow: '0 0 8px rgba(255, 255, 0, 0.6)' }}>
                                {tier.label}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Mobile: 3 rows with 3 buttons each */}
                      <div className="lg:hidden w-full space-y-2">
                        {/* Row 1: Stone, Bronze, Silver - Lego Draggable */}
                        <div className="flex justify-center gap-2">
                          {[
                            { amount: 10, label: 'Stone', stars: '⭐', route: '/donate-monthly-10' },
                            { amount: 30, label: 'Bronze', stars: '⭐⭐', route: '/donate-monthly-30' },
                            { amount: 50, label: 'Silver', stars: '⭐⭐⭐', route: '/donate-monthly-50' }
                          ].map((tier) => (
                            <motion.div
                              key={tier.amount}
                              drag
                              dragConstraints={{ left: -60, right: 60, top: -40, bottom: 40 }}
                              dragElastic={0.3}
                              whileDrag={{ scale: 1.15, rotate: Math.random() * 10 - 5, zIndex: 20 }}
                              dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                              onDragEnd={() => handleDragEnd(tier.amount)}
                              className="relative"
                              animate={dragPositions[tier.amount] || { x: 0, y: 0 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              <Link
                                to={tier.route}
                                className="relative bg-black border border-gray-800 hover:border-gray-600 px-3 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group text-center block overflow-hidden min-w-[80px] cursor-pointer"
                                style={{ pointerEvents: 'auto' }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                                <div className="relative">
                                  <div className="text-xs mb-1">{tier.stars}</div>
                                  <div className="text-white font-bold text-xs mb-1">₵{tier.amount}</div>
                                  <div className="text-yellow-400 text-xs font-medium" style={{ textShadow: '0 0 6px rgba(255, 255, 0, 0.6)' }}>
                                    {tier.label}
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>

                        {/* Row 2: Gold, Diamond, Platinum - Lego Draggable */}
                        <div className="flex justify-center gap-2">
                          {[
                            { amount: 100, label: 'Gold', stars: '⭐⭐⭐⭐', route: '/donate-monthly-100' },
                            { amount: 200, label: 'Diamond', stars: '⭐⭐⭐⭐⭐', route: '/donate-monthly-200' },
                            { amount: 500, label: 'Platinum', stars: '⭐⭐⭐⭐⭐⭐', route: '/donate-monthly-500' }
                          ].map((tier) => (
                            <motion.div
                              key={tier.amount}
                              drag
                              dragConstraints={{ left: -60, right: 60, top: -40, bottom: 40 }}
                              dragElastic={0.3}
                              whileDrag={{ scale: 1.15, rotate: Math.random() * 10 - 5, zIndex: 20 }}
                              dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                              onDragEnd={() => handleDragEnd(tier.amount)}
                              className="relative"
                              animate={dragPositions[tier.amount] || { x: 0, y: 0 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              <Link
                                to={tier.route}
                                className="relative bg-black border border-gray-800 hover:border-gray-600 px-3 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group text-center block overflow-hidden min-w-[80px] cursor-pointer"
                                style={{ pointerEvents: 'auto' }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                                <div className="relative">
                                  <div className="text-xs mb-1">{tier.stars}</div>
                                  <div className="text-white font-bold text-xs mb-1">₵{tier.amount}</div>
                                  <div className="text-yellow-400 text-xs font-medium" style={{ textShadow: '0 0 6px rgba(255, 255, 0, 0.6)' }}>
                                    {tier.label}
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>

                        {/* Row 3: Vibranium Edge, Omega Force, Sovereign One - Premium Lego Draggable */}
                        <div className="flex justify-center gap-2 relative">
                          {[
                            { amount: 1000, label: 'Vibranium', stars: '⭐⭐⭐⭐⭐⭐⭐', route: '/donate-monthly-1000' },
                            { amount: 3000, label: 'Omega Force', stars: '⭐⭐⭐⭐⭐⭐⭐⭐', route: '/donate-monthly-3000' },
                            { amount: 5000, label: 'Sovereign One', stars: '⭐⭐⭐⭐⭐⭐⭐⭐⭐', route: '/donate-monthly-5000' }
                          ].map((tier) => (
                            <motion.div
                              key={tier.amount}
                              drag
                              dragConstraints={{ left: -60, right: 60, top: -40, bottom: 40 }}
                              dragElastic={0.3}
                              whileDrag={{ scale: 1.15, rotate: Math.random() * 15 - 7.5, zIndex: 20 }}
                              dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                              onDragEnd={() => handleDragEnd(tier.amount)}
                              className="relative"
                              animate={dragPositions[tier.amount] || { x: 0, y: 0 }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              <Link
                                to={tier.route}
                                className="relative bg-black border border-gray-800 hover:border-gray-600 px-3 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group text-center block overflow-hidden min-w-[80px] cursor-pointer"
                                style={{ pointerEvents: 'auto' }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                                <div className="relative">
                                  <div className="text-xs mb-1" style={{ fontSize: '8px', lineHeight: '10px' }}>
                                    {tier.stars}
                                  </div>
                                  <div className="text-white font-bold text-xs mb-1">₵{tier.amount}</div>
                                  <div className="text-yellow-400 text-xs font-medium" style={{ textShadow: '0 0 6px rgba(255, 255, 0, 0.6)' }}>
                                    {tier.label}
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                    {/* Fun Lego Drag Instruction - Mobile Only */}
                    <div className="text-center mt-2 px-4 lg:hidden">
                      <p className="text-purple-600 text-xs font-medium animate-pulse">
                        🧱 Play with the donation buttons like Lego blocks! Drag them around - they'll bounce back! 🎮
                      </p>
                    </div>

                    {/* Gratitude Message - Black Text with Gold Glow */}
                    <div className="text-center mt-4 px-4">
                      <p className="text-black text-xs sm:text-sm font-medium" style={{ textShadow: '0 0 12px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.4)' }}>
                        ✨ Donors will be extended gratitude and added to a special group to further strengthen relations with the School. Thank you! 💛
                      </p>
                    </div>
                    </div>


                  </div>

                  {/* One-Time Payment Section - Light Blue Background */}
                  <div style={{ backgroundColor: '#EAF6FC' }} className={`py-8 ${isTabletOrDesktop ? '' : 'px-4'}`}>
                    {/* Bold Section Header in Rounded Rectangle */}
                    <div className="text-center mb-6">
                      <div className="inline-block bg-white px-4 sm:px-8 py-2 sm:py-4 rounded-2xl border border-blue-200 shadow-sm">
                        <h2 className="text-base sm:text-4xl font-black text-black mb-0">
                          ONE-TIME SUPPORT
                        </h2>
                      </div>
                    </div>

                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-black mb-3">
                        ⭐ One-Time Donation ⭐
                      </h3>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <span className="text-xl">👇</span>
                        <p className="text-orange-500 text-sm sm:text-base font-semibold text-center">
                          Payment form below
                        </p>
                        <span className="text-xl">👇</span>
                      </div>
                      <p className="text-black text-xs sm:text-sm font-medium">Single contribution • Any amount</p>
                    </div>
                  </div>

                  {/* Payment Form Container - White Background */}
                  <div className="relative w-full bg-white">
                    <div className="payment-container w-full">
                      <iframe
                        src="https://paystack.shop/pay/stlouisjhsdonations"
                        className="w-full border-0"
                        height="600"
                        title="St. Louis Demonstration JHS Donation Form"
                        allow="payment *"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-popups-to-escape-sandbox"
                        loading="lazy"
                        onLoad={(e) => {
                          const loadingOverlay = e.currentTarget.parentElement?.nextElementSibling as HTMLElement;
                          if (loadingOverlay) {
                            loadingOverlay.style.display = 'none';
                          }
                          handlePaymentFormLoad();
                          triggerHapticFeedback('medium');
                        }}
                        style={{
                          border: 0,
                          width: '100%',
                          display: 'block'
                        }}
                      />
                    </div>

                    {/* Enhanced Loading overlay with Silver Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center z-10">
                      {/* Background Silver Shimmer */}
                      <div className="absolute inset-0">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-silver/20 to-transparent"
                          animate={{
                            x: ['-100%', '100%']
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                        />
                      </div>
                      <div className="text-center max-w-xs lg:max-w-md mx-auto p-4 lg:p-8">
                        <div className="relative mb-4 lg:mb-8">
                          <div className="animate-spin rounded-full h-12 w-12 lg:h-20 lg:w-20 border-4 lg:border-6 border-green-200 border-t-green-600 mx-auto"></div>
                          <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 lg:w-8 lg:h-8 text-green-600 animate-pulse" />
                        </div>

                        <h3 className="text-lg lg:text-2xl font-bold text-gray-800 mb-2 lg:mb-4">🚀 Loading Donation Portal</h3>
                        <p className="text-gray-600 text-sm lg:text-base mb-3 lg:mb-6">Preparing secure payment form...</p>

                        <div className="bg-white/80 backdrop-blur-sm sharp-container p-3 lg:p-6 mb-3 lg:mb-6">
                          <h4 className="font-medium text-green-700 mb-2 lg:mb-4 text-sm lg:text-base">Ready to Accept:</h4>
                          <div className="grid grid-cols-2 gap-1 lg:gap-3 text-xs lg:text-sm">
                            <div className="flex items-center text-green-600">
                              <span className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full mr-1 lg:mr-2"></span>
                              MTN MoMo
                            </div>
                            <div className="flex items-center text-blue-600">
                              <span className="w-2 h-2 lg:w-3 lg:h-3 bg-blue-500 rounded-full mr-1 lg:mr-2"></span>
                              Vodafone Cash
                            </div>
                            <div className="flex items-center text-green-600">
                              <span className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full mr-1 lg:mr-2"></span>
                              AirtelTigo Money
                            </div>
                            <div className="flex items-center text-blue-600">
                              <span className="w-2 h-2 lg:w-3 lg:h-3 bg-blue-500 rounded-full mr-1 lg:mr-2"></span>
                              Visa/Mastercard
                            </div>
                          </div>
                        </div>

                        <div className="text-xs lg:text-sm text-gray-500 space-y-1 lg:space-y-2">
                          <p><span className="font-medium text-green-600">Bank-Level Security</span> by Paystack</p>
                          <p><span className="font-medium text-blue-600">Instant Processing</span> • <span className="font-medium text-purple-600">Receipt via Email</span></p>
                          <div className="hidden lg:block mt-4 pt-4 border-t border-gray-200">
                            <p className="text-gray-400 text-xs">🔒 SSL Encrypted • 🛡️ PCI Compliant • 🌍 International Standards</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      </motion.div>
    </>
  );
};

export default DonationPage;
