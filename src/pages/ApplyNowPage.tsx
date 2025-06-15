import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ShimmerLoader from '../components/common/ShimmerLoader';
import SEOHead from '../components/seo/SEOHead';

const ApplyNowPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formLoaded, setFormLoaded] = useState(false);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Handle loading timeout and dynamic height
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second loading time

    // Listen for Tally height changes
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://tally.so' && event.data.type === 'tally-height-change') {
        const iframe = document.querySelector('iframe[src*="tally.so"]') as HTMLIFrameElement;
        if (iframe && event.data.height) {
          iframe.style.height = event.data.height + 'px';
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      clearTimeout(loadingTimeout);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // Handle form load
  const handleFormLoad = () => {
    setFormLoaded(true);
    setTimeout(() => setIsLoading(false), 500);
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
      <SEOHead
        title="Apply Now | St. Louis Demonstration JHS"
        description="Apply for admission to St. Louis Demonstration JHS - Ghana's premier junior high school. Complete your application online and join our community of academic excellence with 48+ years of educational leadership."
        keywords="apply now, school application, admission form, enroll, St. Louis Demonstration JHS application, Ghana JHS admission, school enrollment"
        url="/apply-now"
        type="website"
        pageType="admissions"
        useGalleryImages={true}
      />
      {/* Back Button and Title Section - Original Style */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4">
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

      {/* Compact Hero Section */}
      <section className="py-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full mb-3 shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Complete Your Application
            </h1>
            <p className="text-sm text-gray-600 mb-3">
              Begin your journey with St. Louis Demo JHS
            </p>
            <div className="inline-flex items-center gap-2 bg-green-100 border border-green-200 rounded-full px-3 py-1 text-xs">
              <span className="text-green-600">🎓</span>
              <span className="text-green-700 font-medium">47+ Years of Excellence</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form Section - Natural Scrolling */}
      <section className="bg-white">
        <div className="container mx-auto px-4 pb-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-4"
          >
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Application Form
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Fill out the form below to apply
            </p>

            {/* Important Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-yellow-600 text-lg">⚠️</span>
                <h3 className="text-sm font-bold text-yellow-800">Important Notice</h3>
              </div>
              <p className="text-xs text-yellow-700 leading-relaxed mb-2">
                <strong>Application forms are only available during application seasons.</strong>
                If the form appears closed or unavailable, it means the school year application period has not opened yet.
                Please check back during our official application periods or contact us for more information.
              </p>
              <p className="text-xs text-yellow-700 leading-relaxed">
                <strong>Prevent duplicate submissions:</strong> Each applicant can only submit once.
                Our system uses your email/phone to detect duplicates.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tally Form - Natural Page Scrolling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full relative"
        >
          <iframe
            src="https://tally.so/embed/nrbG22?alignLeft=1&hideTitle=1&dynamicHeight=1"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Application Form * St. Louis Demo. J.H.S"
            onLoad={handleFormLoad}
            style={{
              border: 0,
              width: '100%',
              display: 'block'
            }}
          />

          {/* Loading overlay for form */}
          {!formLoaded && (
            <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
              <div className="text-center">
                <ShimmerLoader variant="silver" width="w-80" height="h-4" className="mb-4" />
                <p className="text-gray-600">Loading application form...</p>
              </div>
            </div>
          )}
        </motion.div>
      </section>


    </div>
  );
};

export default ApplyNowPage;
