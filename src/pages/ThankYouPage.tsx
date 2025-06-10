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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100">
      {/* Back Button and Title Section - School Colors */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
            >
              <ArrowLeft size={14} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Link>
            <h1 className="text-sm sm:text-xl md:text-2xl font-bold text-white truncate">
              Application Submitted
            </h1>
          </div>
        </div>
      </div>

      {/* Main Thank You Content */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">

            {/* School Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 relative">
                <img
                  src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/logo.png?updatedAt=1748099386709"
                  alt="St. Louis Demo JHS Logo"
                  className="w-full h-full object-contain rounded-full shadow-2xl border-4 border-white"
                />
                <div className="absolute -top-2 -right-2">
                  <CheckCircle className="w-8 h-8 text-green-500 bg-white rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 mb-4">
                🎉 Thank You!
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
                Your Application Has Been Submitted Successfully
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Welcome to the St. Louis Demonstration Junior High School family!
                We have received your application and will review it carefully.
              </p>
            </motion.div>

            {/* What Happens Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8 border border-green-100"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-6 flex items-center justify-center gap-2">
                <GraduationCap className="w-6 h-6" />
                What Happens Next?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Review Process</h4>
                  <p className="text-sm text-gray-600">Our admissions team will carefully review your application</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Contact You</h4>
                  <p className="text-sm text-gray-600">We'll contact you within 3-5 business days</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Next Steps</h4>
                  <p className="text-sm text-gray-600">We'll guide you through the enrollment process</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-8"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                <Heart className="w-6 h-6" />
                Questions? We're Here to Help!
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center justify-center gap-3">
                  <Phone className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">Call Us</p>
                    <p className="text-sm opacity-90">0244758575 • 0244730726</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Mail className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <p className="text-sm opacity-90">contact@stlouisdemojhs.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                🏠 Return to Homepage
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                📚 Learn More About Us
              </Link>
            </motion.div>

            {/* School Pride Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20"
            >
              <p className="text-lg font-semibold text-green-800 mb-2">
                🎓 St. Louis Demonstration Junior High School
              </p>
              <p className="text-gray-600">
                47+ Years of Excellence • 30,000+ Successful Graduates • 98%+ BECE Success Rate
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ThankYouPage;
