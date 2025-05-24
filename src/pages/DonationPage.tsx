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
      {/* Back Button and Title Section - Original Style */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              onClick={() => triggerHapticFeedback('light')}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </Link>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Donate
            </h1>
          </div>
        </div>
      </div>

      {/* Header Section - Professional Design */}
      <section className="bg-gradient-to-br from-blue-600 via-green-600 to-blue-700 text-white pb-8 lg:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="px-4 lg:px-8 pt-16 lg:pt-20 relative z-10">
          <div className="max-w-sm lg:max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 lg:mb-12"
            >
              <div className="flex flex-col items-center">
                <div className="p-6 lg:p-8 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 lg:mb-8 shadow-xl border border-white/30">
                  <Heart className="w-12 h-12 lg:w-20 lg:h-20 text-white" />
                </div>
                <div className="text-center">
                  <h1 className="text-3xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 text-white leading-tight">
                    Support Our School
                  </h1>
                  <p className="text-base lg:text-2xl xl:text-3xl text-blue-100 font-medium mb-6 lg:mb-8">
                    Empowering Excellence in Education
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 lg:space-y-8"
            >
              {/* Fund Usage - Clean & Clear */}
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 lg:p-8 border border-white/20 max-w-3xl mx-auto">
                <h2 className="text-lg lg:text-2xl font-bold text-white mb-4 lg:mb-6">Your Donation Will Fund:</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg lg:text-xl">💻</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm lg:text-base mb-1">Modern Technology</h3>
                      <p className="text-xs lg:text-sm text-blue-100">Computers, smart boards, and digital learning tools</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg lg:text-xl">👨‍🏫</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm lg:text-base mb-1">Teacher Training</h3>
                      <p className="text-xs lg:text-sm text-blue-100">Professional development and modern teaching methods</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-lg lg:text-xl">🏫</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm lg:text-base mb-1">Infrastructure</h3>
                      <p className="text-xs lg:text-sm text-blue-100">Upgraded classrooms, labs, and learning spaces</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <p className="text-sm lg:text-lg text-white/90 mb-4 lg:mb-6 max-w-2xl mx-auto">
                  Join our alumni community in maintaining our legacy as <span className="text-yellow-200 font-bold">"The Best Amongst the Rest"</span>
                </p>
                <div className="flex flex-wrap justify-center gap-2 lg:gap-4 text-xs lg:text-sm">
                  <span className="bg-white/20 px-3 py-1 lg:px-4 lg:py-2 rounded-full border border-white/30">🔒 Secure Payments</span>
                  <span className="bg-white/20 px-3 py-1 lg:px-4 lg:py-2 rounded-full border border-white/30">⚡ Instant Processing</span>
                  <span className="bg-white/20 px-3 py-1 lg:px-4 lg:py-2 rounded-full border border-white/30">📧 Receipt Provided</span>
                </div>
              </div>
            </motion.div>
          </div>
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
