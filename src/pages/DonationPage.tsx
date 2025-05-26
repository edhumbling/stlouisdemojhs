import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, GraduationCap, Users, Laptop, ArrowLeft, CreditCard, Smartphone, Globe, Star, Award, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionDivider from '../components/common/SectionDivider';

const DonationPage: React.FC = () => {
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

  // Smooth scroll enhancement
  useEffect(() => {
    // Enable smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 lg:overflow-hidden pt-16">
      {/* Back Button and Title Section - Red Love Theme */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-2 sm:py-3">
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

      {/* Compact Header Section - Red Love Theme with Gallery Background */}
      <section className="py-6 sm:py-8 relative overflow-hidden">
        {/* Gallery Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7118.HEIC"
            alt="St. Louis Demo JHS Students"
            className="w-full h-full object-cover"
          />
          {/* Red Love Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/85 via-pink-600/80 to-red-700/85"></div>
        </div>

        {/* Floating 3D Love Emojis */}
        <div className="absolute inset-0 pointer-events-none">
          {/* 3D Love Emojis from online sources */}
          <div className="absolute top-4 left-4 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2764.png" alt="love" className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" />
          </div>
          <div className="absolute top-8 right-8 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f495.png" alt="two hearts" className="w-5 h-5 sm:w-7 sm:h-7 opacity-70" />
          </div>
          <div className="absolute bottom-6 left-8 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f496.png" alt="sparkling heart" className="w-7 h-7 sm:w-9 sm:h-9 opacity-75" />
          </div>
          <div className="absolute top-12 left-1/2 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f497.png" alt="growing heart" className="w-4 h-4 sm:w-6 sm:h-6 opacity-60" />
          </div>
          <div className="absolute bottom-4 right-4 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.8s' }}>
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f498.png" alt="heart with arrow" className="w-6 h-6 sm:w-8 sm:h-8 opacity-85" />
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

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              💖 Support Our School with Love
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-6 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Every donation helps us provide better education for our students
            </p>

            {/* Quick Fund Usage - Compact */}
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                <div>
                  <div className="text-lg sm:text-xl mb-1">💻</div>
                  <p className="text-xs sm:text-sm text-white font-medium">Technology</p>
                </div>
                <div>
                  <div className="text-lg sm:text-xl mb-1">👨‍🏫</div>
                  <p className="text-xs sm:text-sm text-white font-medium">Teachers</p>
                </div>
                <div>
                  <div className="text-lg sm:text-xl mb-1">🏫</div>
                  <p className="text-xs sm:text-sm text-white font-medium">Infrastructure</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* Main Content - Full Screen Payment Form */}
      <section className="py-6 lg:py-0 lg:h-screen cute-font payment-section">
        <div className="px-3 lg:px-0 lg:h-full">
          <div className="max-w-sm lg:max-w-none lg:w-full lg:h-full mx-auto lg:mx-0">

            {/* Payment Form - Full Screen */}
            <div className="w-full lg:w-full lg:h-full">
              <div className="lg:w-full lg:h-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white sharp-container shadow-md lg:shadow-none lg:w-full lg:h-full overflow-hidden"
                >

                  {/* Payment Form Container - Full Viewport */}
                  <div
                    className="relative w-full h-full"
                    style={{
                      height: '500px'
                    }}
                  >
                    <style>
                      {`
                        @media (min-width: 1024px) {
                          .payment-container {
                            height: 100vh !important;
                            width: 100vw !important;
                            position: fixed !important;
                            top: 0 !important;
                            left: 0 !important;
                            z-index: 50 !important;
                          }
                          .payment-section {
                            height: 100vh !important;
                            position: relative !important;
                            z-index: 40 !important;
                          }
                          .payment-wrapper {
                            height: 100vh !important;
                            width: 100vw !important;
                          }
                          .payment-section .payment-container iframe {
                            height: 100vh !important;
                            width: 100vw !important;
                          }
                        }
                      `}
                    </style>
                    <div className="payment-container payment-wrapper w-full h-full">
                      <iframe
                        src="https://paystack.shop/pay/stlouisjhsdonations"
                        className="w-full h-full border-0"
                        title="St. Louis Demonstration JHS Donation Form"
                        allow="payment *"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-popups-to-escape-sandbox"
                        loading="lazy"
                        onLoad={(e) => {
                          const loadingOverlay = e.currentTarget.parentElement?.nextElementSibling as HTMLElement;
                          if (loadingOverlay) {
                            loadingOverlay.style.display = 'none';
                          }
                          triggerHapticFeedback('medium');
                        }}
                      />
                    </div>

                    {/* Loading overlay - Enhanced for Desktop */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center z-10">
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
      </section>
    </div>
  );
};

export default DonationPage;
