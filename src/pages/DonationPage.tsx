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
      {/* Header Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-blue-700 text-white pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Back Button - Fixed Position */}
        <div className="fixed top-24 left-4 z-50">
          <Link
            to="/"
            onClick={() => triggerHapticFeedback('light')}
            className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
          >
            <ArrowLeft size={18} className="mr-2" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-red-500 to-pink-500 rounded-full mr-4 shadow-lg">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Transform Lives Today
                  </h1>
                  <p className="text-xl md:text-2xl text-yellow-200 font-semibold">
                    🚀 Modernize Education • 🎓 Empower Students • 🌟 Shape the Future
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-lg md:text-xl text-green-100 max-w-4xl mx-auto leading-relaxed">
                🎯 <span className="text-yellow-300 font-bold">Every donation matters!</span> Join <span className="text-blue-200 font-semibold">1000+ alumni and supporters</span> who are already transforming
                St. Louis Demonstration JHS into a <span className="text-orange-300 font-bold">world-class institution</span> ready for the AI era.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <span className="text-yellow-300">💡</span> <span className="text-sm font-medium">Smart Classrooms</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <span className="text-blue-300">🤖</span> <span className="text-sm font-medium">AI Learning Tools</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <span className="text-green-300">📚</span> <span className="text-sm font-medium">Modern Library</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <span className="text-purple-300">🔬</span> <span className="text-sm font-medium">Science Labs</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">

              {/* Left side - Information */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
                      🎯 Your Impact Creates Miracles
                    </h2>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                      See how your <span className="text-green-600 font-bold">generous donation</span> transforms lives and builds Ghana's future leaders
                    </p>
                  </div>

                  <div className="space-y-6">
                    <motion.div
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-green-50 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() => triggerHapticFeedback('light')}
                    >
                      <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex-shrink-0 shadow-md">
                        <Laptop className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-green-800">🚀 Modern Technology Integration</h3>
                        <p className="text-gray-600">Support the integration of <span className="text-blue-600 font-medium">AI and modern educational technologies</span> to prepare students for the digital future. Help us equip classrooms with smart boards, computers, and learning software.</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() => triggerHapticFeedback('light')}
                    >
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex-shrink-0 shadow-md">
                        <GraduationCap className="w-6 h-6 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-blue-800">👨‍🏫 Teacher Development</h3>
                        <p className="text-gray-600">Help us provide <span className="text-purple-600 font-medium">professional development opportunities</span>, training programs, and resources for our dedicated teaching staff to enhance their skills in modern pedagogy.</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() => triggerHapticFeedback('light')}
                    >
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex-shrink-0 shadow-md">
                        <Users className="w-6 h-6 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-purple-800">🎓 Student Progress & Facilities</h3>
                        <p className="text-gray-600">Enable <span className="text-green-600 font-medium">faster academic progress</span> through improved facilities, modern laboratories, library resources, and learning materials that support the NaCCA-based Common Core Programme.</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

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

              {/* Right side - Donation Form */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 px-6 py-6 text-white">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold mb-2">💳 Donate Securely Now</h3>
                      <p className="text-green-100 text-sm">🔒 Bank-level security • 🚀 Instant processing • 📧 Immediate receipt</p>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                      <h4 className="text-yellow-300 font-semibold mb-3 text-center">🇬🇭 All Ghanaian Payment Networks Accepted</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                        <div className="bg-white/20 rounded-lg p-2 text-center">
                          <Smartphone className="w-5 h-5 mx-auto mb-1 text-yellow-300" />
                          <div className="font-medium">MTN Mobile Money</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-2 text-center">
                          <Smartphone className="w-5 h-5 mx-auto mb-1 text-red-300" />
                          <div className="font-medium">Vodafone Cash</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-2 text-center">
                          <Smartphone className="w-5 h-5 mx-auto mb-1 text-blue-300" />
                          <div className="font-medium">AirtelTigo Money</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-2 text-center">
                          <CreditCard className="w-5 h-5 mx-auto mb-1 text-green-300" />
                          <div className="font-medium">Bank Cards</div>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-center gap-4 text-sm">
                        <span className="bg-blue-500/20 px-3 py-1 rounded-full">💳 Visa</span>
                        <span className="bg-red-500/20 px-3 py-1 rounded-full">💳 Mastercard</span>
                        <span className="bg-green-500/20 px-3 py-1 rounded-full">🏦 Bank Transfer</span>
                      </div>
                    </div>

                    <div className="text-center text-xs text-yellow-200">
                      ⚡ <span className="font-semibold">Instant donations</span> • 🛡️ <span className="font-semibold">100% secure</span> • 🎯 <span className="font-semibold">Direct impact</span>
                    </div>
                  </div>

                  <div
                    className="relative overflow-auto"
                    style={{
                      height: '600px',
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

                    {/* Loading overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center z-10">
                      <div className="text-center max-w-sm mx-auto p-6">
                        <div className="relative mb-6">
                          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto"></div>
                          <Heart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-red-500 animate-pulse" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2">🚀 Loading Your Impact Portal</h3>
                        <p className="text-gray-600 text-sm mb-4">Preparing secure donation form...</p>

                        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-green-700 mb-2">🇬🇭 Ready to Accept:</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center text-yellow-600">
                              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                              MTN Mobile Money
                            </div>
                            <div className="flex items-center text-red-600">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                              Vodafone Cash
                            </div>
                            <div className="flex items-center text-blue-600">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              AirtelTigo Money
                            </div>
                            <div className="flex items-center text-green-600">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              Bank Cards
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 space-y-1">
                          <p>🔒 <span className="font-semibold text-green-600">Bank-level security</span> by Paystack</p>
                          <p>⚡ <span className="font-semibold text-blue-600">Instant processing</span> & receipts</p>
                          <p>🎯 <span className="font-semibold text-purple-600">100% goes to school</span> development</p>
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
