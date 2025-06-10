import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Heart, GraduationCap, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYouPage: React.FC = () => {
  // Confetti effect on page load
  useEffect(() => {
    // Simple confetti animation
    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.innerHTML = '🎉';
      confetti.style.position = 'fixed';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.fontSize = '20px';
      confetti.style.zIndex = '1000';
      confetti.style.pointerEvents = 'none';
      confetti.style.animation = 'fall 3s linear forwards';
      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 3000);
    };

    // Create multiple confetti
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createConfetti(), i * 200);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Back Button and Title Section - Apple Style */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
        <div className="px-4 py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full transition-all duration-200 text-sm active:scale-95"
            >
              <ArrowLeft size={16} />
              <span>Home</span>
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Application Submitted
            </h1>
          </div>
        </div>
      </div>

      {/* Main Thank You Content - Edge to Edge */}
      <div className="flex-1">
        {/* Hero Section */}
        <div className="px-4 py-8 sm:py-12 text-center bg-gradient-to-b from-green-50 to-white">
          {/* School Logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 relative">
              <img
                src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748099386709"
                alt="St. Louis Demo JHS Logo"
                className="w-full h-full object-contain rounded-full shadow-lg"
              />
              <div className="absolute -top-1 -right-1">
                <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Thank You! 🎉
            </h1>
            <h2 className="text-lg sm:text-xl font-medium text-gray-600 mb-4">
              Your application has been submitted successfully
            </h2>
            <p className="text-base text-gray-500 max-w-md mx-auto leading-relaxed">
              Welcome to the St. Louis Demo JHS family! We'll review your application carefully.
            </p>
          </motion.div>
        </div>

        {/* What Happens Next - Apple Style Cards */}
        <div className="px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              What happens next?
            </h3>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">📋</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Review Process</h4>
                    <p className="text-xs text-gray-500">Our team will carefully review your application</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">📞</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">We'll Contact You</h4>
                    <p className="text-xs text-gray-500">Expect to hear from us within 3-5 business days</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🎓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Next Steps</h4>
                    <p className="text-xs text-gray-500">We'll guide you through the enrollment process</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Information - Apple Style */}
        <div className="px-4 py-6 bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Questions? We're here to help
            </h3>
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Call Us</h4>
                    <p className="text-xs text-gray-500">0244758575 • 0244730726</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Email Us</h4>
                    <p className="text-xs text-gray-500">contact@stlouisdemojhs.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons - Apple Style */}
        <div className="px-4 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-3 mb-8"
          >
            <Link
              to="/"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl text-center transition-colors duration-200 active:scale-95 transform"
            >
              Return to Homepage
            </Link>
            <Link
              to="/about"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 px-4 rounded-xl text-center transition-colors duration-200 active:scale-95 transform"
            >
              Learn More About Us
            </Link>
          </motion.div>
        </div>

        {/* School Pride Message - Footer Style */}
        <div className="px-4 py-8 bg-gray-50 border-t border-gray-200">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-sm font-semibold text-gray-900 mb-1">
              St. Louis Demonstration Junior High School
            </p>
            <p className="text-xs text-gray-500">
              47+ Years of Excellence • 30,000+ Graduates • 98%+ BECE Success
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
