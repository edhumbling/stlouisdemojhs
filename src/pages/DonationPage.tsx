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
      {/* Header Section - Mobile Optimized */}
      <section className="bg-gradient-to-br from-blue-600 via-green-600 to-blue-700 text-white pt-16 pb-8 relative overflow-hidden cute-font">
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Back Button - Mobile Friendly */}
        <div className="absolute top-20 left-3 z-50">
          <Link
            to="/"
            onClick={() => triggerHapticFeedback('light')}
            className="inline-flex items-center px-3 py-2 bg-green-500 hover:bg-green-400 text-white font-medium sharp-container shadow-md hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span className="text-sm">Back</span>
          </Link>
        </div>

        <div className="px-3 relative z-10">
          <div className="max-w-sm mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="flex flex-col items-center">
                <div className="p-4 bg-gradient-to-br from-green-500 to-blue-500 sharp-container mb-4 shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-2 text-white">
                    💝 Support Our School
                  </h1>
                  <p className="text-sm text-blue-100 font-medium">
                    Building Tomorrow's Leaders
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-sm text-white leading-relaxed px-2">
                Join our <span className="text-green-200 font-semibold">alumni community</span> in supporting
                St. Louis Demonstration JHS with <span className="text-blue-200 font-semibold">modern technology</span>
                for the future.
              </p>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-white/15 backdrop-blur-sm sharp-container mini-container border border-white/20">
                  <div className="text-lg mb-1">💻</div>
                  <div className="text-xs font-medium text-green-100">Smart Tech</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm sharp-container mini-container border border-white/20">
                  <div className="text-lg mb-1">📚</div>
                  <div className="text-xs font-medium text-blue-100">Library</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm sharp-container mini-container border border-white/20">
                  <div className="text-lg mb-1">🔬</div>
                  <div className="text-xs font-medium text-green-100">Labs</div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm sharp-container mini-container border border-white/20">
                  <div className="text-lg mb-1">🎓</div>
                  <div className="text-xs font-medium text-blue-100">Training</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* Main Content - Mobile First */}
      <section className="py-6 cute-font">
        <div className="px-3">
          <div className="max-w-sm mx-auto">
            <div className="space-y-4">

              {/* Impact Cards - Mobile Optimized */}
              <div className="space-y-3">
                <div className="text-center mb-4">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                    ✨ Your Impact
                  </h2>
                  <p className="text-sm text-gray-600">
                    See how your <span className="text-green-600 font-semibold">donation</span> transforms lives
                  </p>
                </div>

                <div className="space-y-3">
                  <motion.div
                    className="bg-white sharp-container mini-container shadow-sm border border-green-100 hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => triggerHapticFeedback('light')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 sharp-container flex-shrink-0">
                        <Laptop className="w-4 h-4 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm text-green-800">💻 Smart Tech</h3>
                        <p className="text-xs text-gray-600 mt-1">AI tools & modern classrooms for digital learning</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white sharp-container mini-container shadow-sm border border-blue-100 hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => triggerHapticFeedback('light')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 sharp-container flex-shrink-0">
                        <GraduationCap className="w-4 h-4 text-blue-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm text-blue-800">👨‍🏫 Teacher Growth</h3>
                        <p className="text-xs text-gray-600 mt-1">Training & resources for excellent education</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white sharp-container mini-container shadow-sm border border-green-100 hover:shadow-md transition-all"
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => triggerHapticFeedback('light')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 sharp-container flex-shrink-0">
                        <Users className="w-4 h-4 text-green-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm text-green-800">🎓 Better Facilities</h3>
                        <p className="text-xs text-gray-600 mt-1">Modern labs & library for faster progress</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => triggerHapticFeedback('medium')}
                >
                  <div className="flex items-center mb-3">
                    <Star className="w-5 h-5 text-yellow-500 mr-2" />
                    <h3 className="font-semibold text-green-900">🎓 Alumni & Community Support</h3>
                  </div>
                  <p className="text-green-700 mb-4">
                    Join <span className="text-blue-600 font-semibold">fellow alumni and community members</span> in supporting our beloved school.
                    Every contribution, no matter the size, makes a meaningful difference in
                    modernizing education and maintaining our reputation as <span className="text-yellow-600 font-bold">"The Best Amongst the Rest."</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>🔒 Secure Paystack payments</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>💳 Visa/Mastercard accepted</span>
                    </div>
                    <div className="flex items-center text-purple-600">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      <span>📱 Mobile Money (MTN, Vodafone, AirtelTigo)</span>
                    </div>
                    <div className="flex items-center text-orange-600">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      <span>📧 Instant donation receipts</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Donation Form - Mobile Optimized */}
              <div className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white sharp-container shadow-md overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 text-white">
                    <div className="text-center mb-3">
                      <h3 className="text-lg font-bold mb-1">💳 Donate Now</h3>
                      <p className="text-green-100 text-xs">Secure • Instant • Direct Impact</p>
                    </div>

                    {/* Payment Methods - Compact */}
                    <div className="bg-white/15 backdrop-blur-sm sharp-container p-3 mb-3">
                      <h4 className="text-white font-medium mb-2 text-center text-sm">🇬🇭 All Ghana Networks</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white/20 sharp-container p-2 text-center">
                          <Smartphone className="w-4 h-4 mx-auto mb-1 text-green-200" />
                          <div className="font-medium">MTN MoMo</div>
                        </div>
                        <div className="bg-white/20 sharp-container p-2 text-center">
                          <Smartphone className="w-4 h-4 mx-auto mb-1 text-blue-200" />
                          <div className="font-medium">Vodafone</div>
                        </div>
                        <div className="bg-white/20 sharp-container p-2 text-center">
                          <Smartphone className="w-4 h-4 mx-auto mb-1 text-green-200" />
                          <div className="font-medium">AirtelTigo</div>
                        </div>
                        <div className="bg-white/20 sharp-container p-2 text-center">
                          <CreditCard className="w-4 h-4 mx-auto mb-1 text-blue-200" />
                          <div className="font-medium">Cards</div>
                        </div>
                      </div>

                      <div className="mt-2 flex justify-center gap-2 text-xs">
                        <span className="bg-blue-500/20 px-2 py-1 sharp-container">Visa</span>
                        <span className="bg-green-500/20 px-2 py-1 sharp-container">Mastercard</span>
                      </div>
                    </div>

                    <div className="text-center text-xs text-green-100">
                      ⚡ <span className="font-medium">Instant</span> • 🛡️ <span className="font-medium">Secure</span> • 🎯 <span className="font-medium">Direct</span>
                    </div>
                  </div>

                  <div
                    className="relative overflow-auto"
                    style={{
                      height: '400px',
                      scrollBehavior: 'smooth',
                      WebkitOverflowScrolling: 'touch'
                    }}
                    onScroll={() => triggerHapticFeedback('light')}
                  >
                    <iframe
                      src="https://paystack.shop/pay/stlouisjhsdonations"
                      className="w-full h-full border-0"
                      title="St. Louis Demonstration JHS Donation Form"
                      allow="payment *"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-popups-to-escape-sandbox"
                      loading="lazy"
                      onLoad={(e) => {
                        const loadingOverlay = e.currentTarget.nextElementSibling as HTMLElement;
                        if (loadingOverlay) {
                          loadingOverlay.style.display = 'none';
                        }
                        triggerHapticFeedback('medium');
                      }}
                    />

                    {/* Loading overlay - Mobile Optimized */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center z-10">
                      <div className="text-center max-w-xs mx-auto p-4">
                        <div className="relative mb-4">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto"></div>
                          <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-green-600 animate-pulse" />
                        </div>

                        <h3 className="text-lg font-bold text-gray-800 mb-2">🚀 Loading Portal</h3>
                        <p className="text-gray-600 text-sm mb-3">Preparing secure form...</p>

                        <div className="bg-white/80 backdrop-blur-sm sharp-container p-3 mb-3">
                          <h4 className="font-medium text-green-700 mb-2 text-sm">Ready to Accept:</h4>
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            <div className="flex items-center text-green-600">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                              MTN MoMo
                            </div>
                            <div className="flex items-center text-blue-600">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                              Vodafone
                            </div>
                            <div className="flex items-center text-green-600">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                              AirtelTigo
                            </div>
                            <div className="flex items-center text-blue-600">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                              Cards
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 space-y-1">
                          <p><span className="font-medium text-green-600">Secure</span> by Paystack</p>
                          <p><span className="font-medium text-blue-600">Instant</span> processing</p>
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
