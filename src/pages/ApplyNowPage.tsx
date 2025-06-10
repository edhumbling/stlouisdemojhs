import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ShimmerLoader from '../components/common/ShimmerLoader';

const ApplyNowPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formLoaded, setFormLoaded] = useState(false);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Load Tally script and handle loading
  useEffect(() => {
    // Tally embed script - inline version
    const tallyScript = `
      var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
    `;

    const script = document.createElement('script');
    script.innerHTML = tallyScript;
    document.body.appendChild(script);

    // Set loading timeout
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 second loading time

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      clearTimeout(loadingTimeout);
    };
  }, []);

  // Handle form load
  const handleFormLoad = () => {
    setFormLoaded(true);
    setTimeout(() => setIsLoading(false), 500); // Small delay for smooth transition
  };

  // Show loading screen while form loads
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-900 z-50 flex items-center justify-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        </div>

        {/* Main Loader */}
        <div className="relative z-10 text-center">
          {/* School Logo/Icon */}
          <div className="mb-8">
            <motion.div
              className="w-24 h-24 mx-auto bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center shadow-2xl border border-white/30"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <GraduationCap className="w-12 h-12 text-white" />
            </motion.div>
          </div>

          {/* Silver Shimmer Effect */}
          <div className="relative mb-6">
            <div className="w-80 h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>
          </div>

          {/* Loading Text */}
          <motion.h2
            className="text-3xl font-bold text-white mb-2"
            animate={{
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            🎓 St. Louis Demo JHS
          </motion.h2>
          <p className="text-white/90 text-xl">Loading application form...</p>
          <p className="text-white/70 text-sm mt-2">Preparing your admission portal</p>

          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 text-green-300 text-3xl"
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              📝
            </motion.div>
            <motion.div
              className="absolute top-1/3 right-1/4 text-blue-300 text-2xl"
              animate={{
                y: [0, -15, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
            >
              🎓
            </motion.div>
            <motion.div
              className="absolute bottom-1/3 left-1/3 text-yellow-300 text-xl"
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2
              }}
            >
              📚
            </motion.div>
            <motion.div
              className="absolute bottom-1/4 right-1/3 text-purple-300 text-2xl"
              animate={{
                y: [0, -18, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5
              }}
            >
              🏫
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button and Title Section - Original Style */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Apply to St. Louis Demo JHS
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section - Clean Mobile-Friendly */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-6 sm:mb-8 shadow-2xl">
              <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Join Our School Family
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8">
              Start your journey to excellence with St. Louis Demonstration Junior High School
            </p>
            <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-4 py-2 shadow-lg">
              <span className="text-green-600 text-lg">🎓</span>
              <span className="text-green-700 text-sm font-semibold">47+ Years of Excellence</span>
            </div>
          </motion.div>
        </div>

        {/* Key Benefits - Mobile-Friendly Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-gray-800 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">Excellence</h3>
            <p className="text-gray-600 text-xs sm:text-sm">47+ years of academic excellence</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-gray-800 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">Community</h3>
            <p className="text-gray-600 text-xs sm:text-sm">800+ students strong</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-gray-800 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">Curriculum</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Comprehensive programs</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-gray-800 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">Success</h3>
            <p className="text-gray-600 text-xs sm:text-sm">98%+ BECE success rate</p>
          </div>
        </motion.div>
      </section>

      {/* Application Form Section - Full Screen Tally Form */}
      <section className="bg-white">
        <div className="container mx-auto px-4 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Complete Your Application
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to begin your journey with St. Louis Demo JHS
            </p>
          </motion.div>
        </div>

        {/* Full Screen Tally Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full relative"
          style={{ minHeight: '100vh' }}
        >
          <iframe
            data-tally-src="https://tally.so/embed/nrbG22?alignLeft=1&hideTitle=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="200"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Application Form * St. Louis Demo. J.H.S"
            onLoad={handleFormLoad}
            style={{
              border: 0,
              minHeight: '100vh',
              width: '100%'
            }}
          />

          {/* Loading overlay for form */}
          {!formLoaded && (
            <div className="absolute inset-0 bg-white flex items-center justify-center">
              <ShimmerLoader variant="silver" width="w-full" height="h-full" />
            </div>
          )}
        </motion.div>
      </section>


    </div>
  );
};

export default ApplyNowPage;
