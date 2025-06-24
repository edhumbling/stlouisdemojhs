import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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

      {/* Back Button - Exact from Donate Page */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-2 sm:py-3">
        <div className="px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/donate"
              onClick={() => triggerHapticFeedback('light')}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-700/50 hover:bg-red-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-red-500/30 flex-shrink-0"
            >
              <span className="text-base sm:text-lg">←</span>
              <span>Back to Donate</span>
            </Link>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              💝 Thank You for Your Generosity
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content - Edge to Edge */}
      <div className="px-0">
        {/* School Logo in Round Modal */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: 'spring', damping: 20 }}
          className="flex justify-center pt-8 sm:pt-12"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white/95 backdrop-blur-sm rounded-full shadow-2xl border-4 border-white/50 flex items-center justify-center">
            <img
              src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs"
              alt="St. Louis Demonstration JHS Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
            />
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center px-6 sm:px-8 pt-8 sm:pt-12"
        >
          {/* Main Thank You */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 sm:mb-8 leading-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}>
            Thank You! 🙏
          </h1>

          {/* Heartfelt Message */}
          <div className="space-y-6 sm:space-y-8">
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium leading-relaxed" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
              Your generous donation has just made a profound difference in the lives of our students at 
              <span className="font-bold text-yellow-300"> St. Louis Demonstration Junior High School</span>.
            </p>

            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
              Because of your kindness, we can continue to provide quality education, improve our facilities, 
              and create opportunities that will shape the future of young minds in our community.
            </p>

            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
              Every donation, no matter the size, brings us closer to our mission of educational excellence. 
              You are now part of our extended family, and your contribution will be remembered with gratitude 
              for years to come.
            </p>
          </div>

          {/* Impact Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 sm:mt-16 bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-2xl"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300 mb-4 sm:mb-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}>
              Your Impact 🌟
            </h2>
            <p className="text-base sm:text-lg text-white/95 leading-relaxed" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
              Your donation directly supports student scholarships, educational resources, infrastructure 
              improvements, and innovative learning programs that prepare our students for success in 
              senior high school and beyond.
            </p>
          </motion.div>

          {/* Closing Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-12 sm:mt-16 mb-16 sm:mb-20"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-white/95 font-medium mb-6 sm:mb-8" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif' }}>
              From all of us at St. Louis Demonstration JHS:
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-300 mb-8 sm:mb-12" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}>
              THANK YOU! 💖
            </h2>

            {/* Floating Hearts */}
            <div className="flex justify-center space-x-4 sm:space-x-6">
              {['❤️', '💛', '💚', '💙', '💜'].map((heart, index) => (
                <motion.span
                  key={index}
                  className="text-2xl sm:text-3xl md:text-4xl"
                  animate={{
                    y: [0, -10, 0],
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
  );
};

export default DonationThankYouPage;
