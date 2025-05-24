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

            {/* Desktop: Two-column layout, Mobile: Single column */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 space-y-8 lg:space-y-0">

              {/* Left Column: Impact Information */}
              <div className="space-y-6 lg:space-y-8">
                {/* Impact Cards Header */}
                <div className="text-center lg:text-left mb-4 lg:mb-8">
                  <h2 className="text-lg lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2 lg:mb-4">
                    ✨ Your Impact
                  </h2>
                  <p className="text-sm lg:text-lg xl:text-xl text-gray-600">
                    See how your <span className="text-green-600 font-semibold">donation</span> transforms lives and builds the future
                  </p>
                </div>

                {/* Impact Cards - Enhanced for Desktop */}
                <div className="space-y-3 lg:space-y-6">
                  <motion.div
                    className="bg-white sharp-container mini-container lg:p-6 shadow-sm border border-green-100 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => triggerHapticFeedback('light')}
                  >
                    <div className="flex items-center space-x-3 lg:space-x-6">
                      <div className="p-2 lg:p-4 bg-gradient-to-br from-green-100 to-green-200 sharp-container flex-shrink-0">
                        <Laptop className="w-4 h-4 lg:w-8 lg:h-8 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm lg:text-xl text-green-800">💻 Smart Technology</h3>
                        <p className="text-xs lg:text-base text-gray-600 mt-1 lg:mt-2">AI tools, modern computers, and digital classrooms for 21st-century learning</p>
                        <div className="hidden lg:block mt-3">
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">AI Tools</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Digital Boards</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Computers</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white sharp-container mini-container lg:p-6 shadow-sm border border-blue-100 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => triggerHapticFeedback('light')}
                  >
                    <div className="flex items-center space-x-3 lg:space-x-6">
                      <div className="p-2 lg:p-4 bg-gradient-to-br from-blue-100 to-blue-200 sharp-container flex-shrink-0">
                        <GraduationCap className="w-4 h-4 lg:w-8 lg:h-8 text-blue-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm lg:text-xl text-blue-800">👨‍🏫 Teacher Development</h3>
                        <p className="text-xs lg:text-base text-gray-600 mt-1 lg:mt-2">Professional training, workshops, and resources for excellent education delivery</p>
                        <div className="hidden lg:block mt-3">
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Workshops</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Training</span>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Resources</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white sharp-container mini-container lg:p-6 shadow-sm border border-green-100 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => triggerHapticFeedback('light')}
                  >
                    <div className="flex items-center space-x-3 lg:space-x-6">
                      <div className="p-2 lg:p-4 bg-gradient-to-br from-green-100 to-green-200 sharp-container flex-shrink-0">
                        <Users className="w-4 h-4 lg:w-8 lg:h-8 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm lg:text-xl text-green-800">🎓 Modern Facilities</h3>
                        <p className="text-xs lg:text-base text-gray-600 mt-1 lg:mt-2">Upgraded labs, library, and infrastructure for enhanced learning experiences</p>
                        <div className="hidden lg:block mt-3">
                          <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Science Labs</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Library</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Infrastructure</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Alumni Support Section - Enhanced */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-green-50 to-blue-50 p-6 lg:p-8 rounded-xl border border-green-200 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => triggerHapticFeedback('medium')}
                >
                  <div className="flex items-center mb-3 lg:mb-6">
                    <Star className="w-5 h-5 lg:w-8 lg:h-8 text-yellow-500 mr-2 lg:mr-4" />
                    <h3 className="font-semibold lg:text-2xl text-green-900">🎓 Alumni & Community Support</h3>
                  </div>
                  <p className="text-green-700 lg:text-lg mb-4 lg:mb-6 leading-relaxed">
                    Join <span className="text-blue-600 font-semibold">fellow alumni and community members</span> in supporting our beloved school.
                    Every contribution, no matter the size, makes a meaningful difference in
                    modernizing education and maintaining our reputation as <span className="text-yellow-600 font-bold">"The Best Amongst the Rest."</span>
                  </p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 text-sm lg:text-base">
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full mr-2 lg:mr-3"></div>
                      <span>🔒 Secure Paystack payments</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <div className="w-2 h-2 lg:w-3 lg:h-3 bg-blue-500 rounded-full mr-2 lg:mr-3"></div>
                      <span>💳 Visa/Mastercard accepted</span>
                    </div>
                    <div className="flex items-center text-purple-600">
                      <div className="w-2 h-2 lg:w-3 lg:h-3 bg-purple-500 rounded-full mr-2 lg:mr-3"></div>
                      <span>📱 Mobile Money (MTN, Vodafone, AirtelTigo)</span>
                    </div>
                    <div className="flex items-center text-orange-600">
                      <div className="w-2 h-2 lg:w-3 lg:h-3 bg-orange-500 rounded-full mr-2 lg:mr-3"></div>
                      <span>📧 Instant donation receipts</span>
                    </div>
                  </div>

                  {/* Additional info for desktop */}
                  <div className="hidden lg:block mt-6 pt-6 border-t border-green-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white/60 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">500+</div>
                        <div className="text-sm text-green-700">Alumni Connected</div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">₵50K+</div>
                        <div className="text-sm text-blue-700">Raised This Year</div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-4">
                        <div className="text-2xl font-bold text-purple-600">100%</div>
                        <div className="text-sm text-purple-700">Goes to School</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Payment Form - Enhanced for Desktop */}
              <div className="lg:sticky lg:top-8 lg:h-fit">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white sharp-container shadow-md lg:shadow-2xl overflow-hidden"
                >

                  {/* Payment Form Header - Enhanced */}
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 lg:p-8 text-white">
                    <div className="text-center mb-3 lg:mb-6">
                      <h3 className="text-lg lg:text-3xl font-bold mb-1 lg:mb-3">💳 Donate Now</h3>
                      <p className="text-green-100 text-xs lg:text-base">Secure • Instant • Direct Impact</p>
                    </div>

                    {/* Payment Methods - Enhanced for Desktop */}
                    <div className="bg-white/15 backdrop-blur-sm sharp-container p-3 lg:p-6 mb-3 lg:mb-6">
                      <h4 className="text-white font-medium mb-2 lg:mb-4 text-center text-sm lg:text-lg">🇬🇭 All Ghana Payment Networks</h4>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 text-xs lg:text-sm">
                        <div className="bg-white/20 sharp-container p-2 lg:p-4 text-center hover:bg-white/30 transition-all">
                          <Smartphone className="w-4 h-4 lg:w-6 lg:h-6 mx-auto mb-1 lg:mb-2 text-green-200" />
                          <div className="font-medium">MTN MoMo</div>
                          <div className="text-xs text-green-200 hidden lg:block">Mobile Money</div>
                        </div>
                        <div className="bg-white/20 sharp-container p-2 lg:p-4 text-center hover:bg-white/30 transition-all">
                          <Smartphone className="w-4 h-4 lg:w-6 lg:h-6 mx-auto mb-1 lg:mb-2 text-blue-200" />
                          <div className="font-medium">Vodafone</div>
                          <div className="text-xs text-blue-200 hidden lg:block">Cash</div>
                        </div>
                        <div className="bg-white/20 sharp-container p-2 lg:p-4 text-center hover:bg-white/30 transition-all">
                          <Smartphone className="w-4 h-4 lg:w-6 lg:h-6 mx-auto mb-1 lg:mb-2 text-green-200" />
                          <div className="font-medium">AirtelTigo</div>
                          <div className="text-xs text-green-200 hidden lg:block">Money</div>
                        </div>
                        <div className="bg-white/20 sharp-container p-2 lg:p-4 text-center hover:bg-white/30 transition-all">
                          <CreditCard className="w-4 h-4 lg:w-6 lg:h-6 mx-auto mb-1 lg:mb-2 text-blue-200" />
                          <div className="font-medium">Cards</div>
                          <div className="text-xs text-blue-200 hidden lg:block">Visa/Master</div>
                        </div>
                      </div>

                      <div className="mt-2 lg:mt-4 flex justify-center gap-2 lg:gap-4 text-xs lg:text-sm">
                        <span className="bg-blue-500/20 px-2 py-1 lg:px-4 lg:py-2 sharp-container">Visa</span>
                        <span className="bg-green-500/20 px-2 py-1 lg:px-4 lg:py-2 sharp-container">Mastercard</span>
                        <span className="bg-purple-500/20 px-2 py-1 lg:px-4 lg:py-2 sharp-container hidden lg:inline">International</span>
                      </div>
                    </div>

                    <div className="text-center text-xs lg:text-base text-green-100">
                      ⚡ <span className="font-medium">Instant Processing</span> • 🛡️ <span className="font-medium">Bank-Level Security</span> • 🎯 <span className="font-medium">Direct to School</span>
                    </div>
                  </div>

                  {/* Payment Form Container - Much Larger on Desktop */}
                  <div
                    className="relative overflow-auto"
                    style={{
                      height: '400px',
                      scrollBehavior: 'smooth',
                      WebkitOverflowScrolling: 'touch'
                    }}
                    onScroll={() => triggerHapticFeedback('light')}
                  >
                    <style>
                      {`
                        @media (min-width: 1024px) {
                          .payment-container {
                            height: 700px !important;
                          }
                        }
                        @media (min-width: 1280px) {
                          .payment-container {
                            height: 800px !important;
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
