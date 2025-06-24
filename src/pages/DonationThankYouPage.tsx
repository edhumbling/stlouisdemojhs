import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const DonationThankYouPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

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

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Liquid Wine Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-purple-900">
        {/* Liquid Wave Effects */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 40%, rgba(139, 69, 19, 0.3) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0"
          />
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 60% 30%, rgba(165, 42, 42, 0.2) 0%, transparent 60%)',
                'radial-gradient(circle at 30% 70%, rgba(165, 42, 42, 0.2) 0%, transparent 60%)',
                'radial-gradient(circle at 70% 60%, rgba(165, 42, 42, 0.2) 0%, transparent 60%)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute inset-0"
          />
        </div>
      </div>

      {/* Floating Floral Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          >
            {['🌸', '🌺', '🌻', '🌷', '🌹', '💐'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}
      </div>

      {/* Back Button and Title Section - Exact from Donate Page */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-2 sm:py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/donate"
              onClick={() => triggerHapticFeedback('light')}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-700/50 hover:bg-red-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-red-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </Link>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              💝 Thank You for Your Generosity
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

      {/* Main Content - Edge to Edge */}
      <div className="relative">
        {/* Hero Section with School Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center py-16 sm:py-24 px-6"
        >
          {/* School Logo in Round Modal */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: 'spring', damping: 20 }}
            className="flex justify-center mb-8"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl border-4 border-white/50 flex items-center justify-center">
              <img
                src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs"
                alt="St. Louis Demonstration JHS Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
              />
            </div>
          </motion.div>

          {/* Main Thank You */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}
          >
            Thank You! 🙏
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium mb-12"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}
          >
            Your generosity makes a difference! ✨
          </motion.p>
        </motion.div>

        {/* Cute Appreciation Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 py-6"
        >
          <div className="text-center px-4">
            <p className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-relaxed" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
              Wow, You just gave back to Us! 💝 That's so kind of you!
            </p>
            <p className="text-white/95 font-medium text-base sm:text-lg mt-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
              Aww, We respect this seed and promise to yield greatness for our school! 🌱✨
            </p>
          </div>
        </motion.div>

        {/* Content Cards */}
        <div>
          <div>
            {/* Main Message Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-black/90 backdrop-blur-md p-8 sm:p-10 border-t border-white/20 shadow-2xl"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-6 text-center" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}>
                Your Heart Touches Lives 💝
              </h2>
              <p className="text-lg sm:text-xl text-white/95 leading-relaxed text-center mb-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
                Your generous donation has just made a profound difference in the lives of our students at
                <span className="font-bold text-yellow-300"> St. Louis Demonstration Junior High School</span>.
              </p>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed text-center" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
                Because of your kindness, we can continue to provide quality education, improve our facilities,
                and create opportunities that will shape the future of young minds in our community.
              </p>
            </motion.div>

            {/* Impact Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-black/90 backdrop-blur-md p-8 sm:p-10 shadow-2xl"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-6 text-center" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}>
                Your Impact 🌟
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 text-white/95">
                <div className="text-center">
                  <div className="text-4xl mb-3">🎓</div>
                  <h3 className="font-bold text-lg mb-2">Student Scholarships</h3>
                  <p className="text-sm">Supporting deserving students with financial assistance</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">📚</div>
                  <h3 className="font-bold text-lg mb-2">Educational Resources</h3>
                  <p className="text-sm">Books, technology, and learning materials</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🏫</div>
                  <h3 className="font-bold text-lg mb-2">Infrastructure</h3>
                  <p className="text-sm">Improving classrooms and school facilities</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🚀</div>
                  <h3 className="font-bold text-lg mb-2">Innovation Programs</h3>
                  <p className="text-sm">Preparing students for the future</p>
                </div>
              </div>
            </motion.div>

            {/* Family Message Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="bg-black/90 backdrop-blur-md p-8 sm:p-10 border-b border-white/20 shadow-2xl text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-yellow-300 mb-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}>
                Welcome to Our Family! 🤗
              </h2>
              <p className="text-lg sm:text-xl text-white/95 leading-relaxed mb-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
                You are now part of our extended family, and your contribution will be remembered with gratitude
                for years to come. Every donation, no matter the size, brings us closer to our mission of educational excellence.
              </p>

              {/* Final Thank You */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-2xl p-6 border border-yellow-300/30"
              >
                <p className="text-xl sm:text-2xl text-white/95 font-medium mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
                  From all of us at St. Louis Demonstration JHS:
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-yellow-300 mb-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}>
                  THANK YOU! 💖
                </h2>

                {/* Floating Hearts */}
                <div className="flex justify-center space-x-3 sm:space-x-4">
                  {['❤️', '💛', '💚', '💙', '💜'].map((heart, index) => (
                    <motion.span
                      key={index}
                      className="text-3xl sm:text-4xl"
                      animate={{
                        y: [0, -8, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: 'easeInOut',
                      }}
                    >
                      {heart}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Yellow Footer - WhatsApp Group Invitation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="bg-yellow-500 py-8 sm:py-12"
        >
          <div className="text-center px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}>
              Join Our Donors Community! 💬
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-black/90 font-medium mb-6 leading-relaxed" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
              Join this special WhatsApp group solely for donors. The school will communicate with you and build a long-term relationship with you.
            </p>

            {/* WhatsApp Link Button */}
            <motion.a
              href="https://chat.whatsapp.com/KruCXF0LEVpD2VdjouYUUg"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-lg border-2 border-green-800"
            >
              <span className="text-2xl">📱</span>
              <span>Join WhatsApp Group</span>
              <span className="text-xl">💚</span>
            </motion.a>

            <p className="text-sm sm:text-base text-black/80 font-medium mt-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
              Click the link above to join our exclusive donors WhatsApp community
            </p>

            {/* WhatsApp Icons */}
            <div className="flex justify-center space-x-4 mt-6">
              {['💬', '🤝', '📢', '❤️'].map((icon, index) => (
                <motion.span
                  key={index}
                  className="text-2xl sm:text-3xl"
                  animate={{
                    y: [0, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  {icon}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonationThankYouPage;
