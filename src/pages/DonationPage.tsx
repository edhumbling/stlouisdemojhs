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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section - Responsive Design */}
      <section className="bg-gradient-to-br from-blue-600 via-green-600 to-blue-700 text-white pt-16 pb-8 lg:pb-16 relative overflow-hidden cute-font">
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Back Button - Responsive */}
        <div className="absolute top-20 left-3 lg:left-8 z-50">
          <Link
            to="/"
            onClick={() => triggerHapticFeedback('light')}
            className="inline-flex items-center px-3 py-2 lg:px-6 lg:py-3 bg-green-500 hover:bg-green-400 text-white font-medium sharp-container shadow-md hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft size={16} className="mr-1 lg:mr-2" />
            <span className="text-sm lg:text-base">Back to Home</span>
          </Link>
        </div>

        <div className="px-3 lg:px-8 relative z-10">
          <div className="max-w-sm lg:max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 lg:mb-12"
            >
              <div className="flex flex-col items-center">
                <div className="p-4 lg:p-8 bg-gradient-to-br from-green-500 to-blue-500 sharp-container mb-4 lg:mb-8 shadow-lg">
                  <Heart className="w-10 h-10 lg:w-16 lg:h-16 text-white" />
                </div>
                <div className="text-center">
                  <h1 className="text-2xl lg:text-5xl xl:text-6xl font-bold mb-2 lg:mb-4 text-white">
                    💝 Support Our School
                  </h1>
                  <p className="text-sm lg:text-xl xl:text-2xl text-blue-100 font-medium">
                    Building Tomorrow's Leaders Together
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4 lg:space-y-8"
            >
              <p className="text-sm lg:text-lg xl:text-xl text-white leading-relaxed px-2 lg:px-8 max-w-4xl mx-auto">
                Join our <span className="text-green-200 font-semibold">alumni community</span> in supporting
                St. Louis Demonstration JHS with <span className="text-blue-200 font-semibold">modern technology</span>
                and resources for the future. Every contribution helps us maintain our legacy as
                <span className="text-yellow-200 font-bold"> "The Best Amongst the Rest."</span>
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 mt-4 lg:mt-8 max-w-4xl mx-auto">
                <div className="bg-white/15 backdrop-blur-sm sharp-container mini-container lg:p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-lg lg:text-3xl mb-1 lg:mb-3">💻</div>
                  <div className="text-xs lg:text-base font-medium text-green-100">Smart Tech</div>
                  <div className="text-xs lg:text-sm text-green-200 mt-1 hidden lg:block">AI & Digital Tools</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm sharp-container mini-container lg:p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-lg lg:text-3xl mb-1 lg:mb-3">📚</div>
                  <div className="text-xs lg:text-base font-medium text-blue-100">Library</div>
                  <div className="text-xs lg:text-sm text-blue-200 mt-1 hidden lg:block">Modern Resources</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm sharp-container mini-container lg:p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-lg lg:text-3xl mb-1 lg:mb-3">🔬</div>
                  <div className="text-xs lg:text-base font-medium text-green-100">Labs</div>
                  <div className="text-xs lg:text-sm text-green-200 mt-1 hidden lg:block">Science Equipment</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm sharp-container mini-container lg:p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-lg lg:text-3xl mb-1 lg:mb-3">🎓</div>
                  <div className="text-xs lg:text-base font-medium text-blue-100">Training</div>
                  <div className="text-xs lg:text-sm text-blue-200 mt-1 hidden lg:block">Teacher Development</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* Main Content - Responsive Two-Column Layout */}
      <section className="py-6 lg:py-16 cute-font">
        <div className="px-3 lg:px-8">
          <div className="max-w-sm lg:max-w-7xl mx-auto">

            {/* Payment Form - Full Width */}
            <div className="w-full">
              <div className="lg:max-w-4xl lg:mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white sharp-container shadow-md lg:shadow-2xl overflow-hidden"
                >

                  {/* Payment Form Container - Full Width and Much Larger */}
                  <div
                    className="relative overflow-auto"
                    style={{
                      height: '500px',
                      scrollBehavior: 'smooth',
                      WebkitOverflowScrolling: 'touch'
                    }}
                    onScroll={() => triggerHapticFeedback('light')}
                  >
                    <style>
                      {`
                        @media (min-width: 1024px) {
                          .payment-container {
                            height: 900px !important;
                          }
                        }
                        @media (min-width: 1280px) {
                          .payment-container {
                            height: 1000px !important;
                          }
                        }
                        @media (min-width: 1536px) {
                          .payment-container {
                            height: 1100px !important;
                          }
                        }
                      `}
                    </style>
                    <div className="payment-container w-full h-full">
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
