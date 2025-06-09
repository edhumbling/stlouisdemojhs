import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, BookOpen } from 'lucide-react';
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

  // Smooth scroll enhancement
  useEffect(() => {
    // Enable smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 lg:overflow-hidden">
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

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              💖 Support Our School with Love
            </h1>

            <p className="text-sm sm:text-base text-white/90 mb-3 sm:mb-4 max-w-xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Every donation helps provide better education for our students
            </p>

            {/* Payment Options Message */}
            <div className="text-center text-white font-medium text-sm sm:text-base mb-2 drop-shadow-lg">
              Choose your preferred donation method:
            </div>

            {/* Donation Buttons Container */}
            <div className="mt-8 mb-10 flex flex-wrap justify-center gap-2 sm:gap-4 px-2">
              {/* PayPal Donation Button */}
              <Link
                to="/donate-paypal"
                onClick={() => triggerHapticFeedback('medium')}
                className="group relative inline-flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-base font-bold text-yellow-900 bg-gradient-to-br from-yellow-300 via-yellow-200 to-yellow-400 border border-yellow-600 rounded-lg hover:from-yellow-200 hover:via-yellow-100 hover:to-yellow-300 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transform transition-all duration-300 ease-out shadow-lg hover:shadow-yellow-400/60 overflow-hidden"
                style={{
                  boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Silver reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                <img
                  src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg"
                  alt="PayPal Logo"
                  className="h-3 sm:h-4 w-auto mr-1 sm:mr-2 group-hover:scale-110 transition-transform relative z-10"
                />
                <span className="relative z-10">PayPal</span>

                {/* Smart glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
              </Link>

              {/* US Bank Donation Button */}
              <Link
                to="/donate-us-bank"
                onClick={() => triggerHapticFeedback('medium')}
                className="group relative inline-flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-base font-bold text-white bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 border border-blue-800 rounded-lg hover:from-blue-500 hover:via-blue-400 hover:to-blue-600 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transform transition-all duration-300 ease-out shadow-lg hover:shadow-blue-500/60 overflow-hidden"
                style={{
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                }}
              >
                {/* Silver reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                <span className="mr-1 sm:mr-2 text-sm sm:text-lg relative z-10">
                  <span className="inline-block group-hover:scale-110 transition-transform">
                    <span className="emoji-fallback" data-emoji="🇺🇸" data-fallback="$">🇺🇸</span>
                  </span>
                </span>
                <span className="relative z-10">US Bank</span>

                {/* Smart glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
              </Link>

              {/* UK Bank Donation Button */}
              <Link
                to="/donate-uk-bank"
                onClick={() => triggerHapticFeedback('medium')}
                className="group relative inline-flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-base font-bold text-white bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 border border-purple-800 rounded-lg hover:from-purple-500 hover:via-purple-400 hover:to-purple-600 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transform transition-all duration-300 ease-out shadow-lg hover:shadow-purple-500/60 overflow-hidden"
                style={{
                  boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                }}
              >
                {/* Silver reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                <span className="mr-1 sm:mr-2 text-sm sm:text-lg relative z-10">
                  <span className="inline-block group-hover:scale-110 transition-transform">
                    <span className="emoji-fallback" data-emoji="🇬🇧" data-fallback="£">🇬🇧</span>
                  </span>
                </span>
                <span className="relative z-10">UK Bank</span>

                {/* Smart glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
              </Link>

              {/* Euro Bank Donation Button */}
              <Link
                to="/donate-euro-bank"
                onClick={() => triggerHapticFeedback('medium')}
                className="group relative inline-flex items-center justify-center px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-base font-bold text-white bg-gradient-to-br from-green-600 via-green-500 to-green-700 border border-green-800 rounded-lg hover:from-green-500 hover:via-green-400 hover:to-green-600 hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transform transition-all duration-300 ease-out shadow-lg hover:shadow-green-500/60 overflow-hidden"
                style={{
                  boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                }}
              >
                {/* Silver reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>

                <span className="mr-1 sm:mr-2 text-sm sm:text-lg relative z-10">
                  <span className="inline-block group-hover:scale-110 transition-transform">
                    <span className="emoji-fallback" data-emoji="🇪🇺" data-fallback="€">🇪🇺</span>
                  </span>
                </span>
                <span className="relative z-10">Euro Bank</span>

                {/* Smart glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-green-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
              </Link>
            </div>

            {/* Payment Option Icons - Centered and Glowing on Mobile */}
            <div className="w-full flex justify-center sm:justify-between items-center mb-6 px-2 gap-4">
              <img src="https://schoolerpghana.com/img/gateways/momo.png" alt="Momo" className="h-7 sm:h-14 w-auto rounded shadow-lg" style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #fff)' }} />
              <img src="https://schoolerpghana.com/img/gateways/tco.png" alt="TCO" className="h-7 sm:h-14 w-auto rounded shadow-lg" style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #fff)' }} />
              <img src="https://schoolerpghana.com/img/gateways/bankwire.png" alt="Bankwire" className="h-7 sm:h-14 w-auto rounded shadow-lg" style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #fff)' }} />
            </div>

            {/* International Transfers Section */}
            <div className="mb-6 px-2">
              <div className="bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-green-500/20 backdrop-blur-sm rounded-xl border border-white/20 p-4 sm:p-6 text-center">
                <h3 className="text-white font-bold text-sm sm:text-lg mb-3 drop-shadow">
                  🌍 International Transfers
                </h3>

                {/* International Transfer Image */}
                <div className="mb-4 flex justify-center">
                  <img
                    src="https://ik.imagekit.io/humbling/emma.png"
                    alt="International Transfer Services"
                    className="h-16 sm:h-24 md:h-32 w-auto rounded-lg shadow-xl border border-white/30"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))' }}
                  />
                </div>

                {/* Transfer Services */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-white">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20">
                    <p className="font-semibold text-xs sm:text-sm">TapTapSend</p>
                    <p className="text-xs text-white/80">Fast & Secure</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20">
                    <p className="font-semibold text-xs sm:text-sm">PayAngel</p>
                    <p className="text-xs text-white/80">Low Fees</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20">
                    <p className="font-semibold text-xs sm:text-sm">Sendwave</p>
                    <p className="text-xs text-white/80">Instant</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20">
                    <p className="font-semibold text-xs sm:text-sm">WorldRemit</p>
                    <p className="text-xs text-white/80">Global</p>
                  </div>
                </div>

                <p className="text-white/90 text-xs sm:text-sm mt-3 drop-shadow">
                  Send money directly to our accounts using these trusted international transfer services
                </p>
              </div>
            </div>

            {/* Physical Donations Welcome - Yellow Glass, Rectangular, Four Icons */}
            <div className="bg-yellow-200/40 backdrop-blur-xl rounded-2xl sm:rounded-xl border border-yellow-300/60 shadow-2xl p-4 sm:p-6 text-center flex flex-col items-center gap-2 mb-6">
                <div className="flex items-center justify-center mb-2 gap-2">
                  <BookOpen className="w-6 h-6 text-white drop-shadow" />
                  <h3 className="text-base sm:text-lg font-extrabold text-white drop-shadow">Physical Donations Welcome!</h3>
              </div>
                <p className="text-white/90 text-xs sm:text-sm mb-3 font-medium drop-shadow">
                  We also warmly receive gifts in the form of physical assets such as books, computers, furniture, and any other educational materials. Your contributions are received gladly and cheerfully with gratitude!
              </p>
              <a
                href="/partner"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg border border-white/40 transition-all text-base mt-2"
                  style={{ boxShadow: '0 0 16px 4px #fff, 0 2px 8px 0 #22c55e80' }}
              >
                  <Heart className="w-5 h-5" />
                Partner With Us
              </a>
                <div className="w-full flex justify-center items-center mt-4 gap-4">
                  <span className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-blue-600/80 shadow-lg text-2xl sm:text-4xl" style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #fff)' }}>
                    💻
                  </span>
                  <span className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-green-600/80 shadow-lg text-2xl sm:text-4xl" style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #fff)' }}>
                    👨‍🏫
                  </span>
                  <span className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-pink-600/80 shadow-lg text-2xl sm:text-4xl" style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #fff)' }}>
                    🏫
                  </span>
                  <span className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-full bg-yellow-400/80 shadow-lg text-2xl sm:text-4xl" style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #fff)' }}>
                    🧑‍🎓
                  </span>
                </div>
            </div>

            {/* MoMo & Credit Card Reminder */}
            <div className="mt-6 text-center">
              <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl border border-blue-400/30 p-3 sm:p-4 max-w-lg mx-auto">
                <p className="text-white text-sm sm:text-base font-medium drop-shadow">
                  💳 <strong>In Ghana?</strong> Use MoMo or Credit Cards via Paystack below!
                </p>
                <p className="text-blue-200 text-xs sm:text-sm mt-1 drop-shadow">
                  MTN MoMo • Vodafone Cash • AirtelTigo • Visa/Mastercard
                </p>
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
