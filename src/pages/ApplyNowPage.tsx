import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, Users, BookOpen, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ApplyNowPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button and Title Section - Original Style */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4 mt-16">
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

      {/* Application Form Section - Mobile-Friendly */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Start Your Application
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Begin your journey with us. Application form coming soon!
            </p>
          </motion.div>

          {/* Application Placeholder - Mobile-Friendly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 md:p-12 rounded-2xl text-center mb-8 sm:mb-12 border border-gray-200 shadow-lg"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">📝</div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">Application Form Coming Soon!</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              We're preparing a comprehensive application system. Contact us directly for admission inquiries.
            </p>

            {/* Contact Cards - Mobile-Friendly Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                <div className="text-xl sm:text-2xl mb-2">📱</div>
                <div className="text-gray-800 font-medium text-sm sm:text-base">0244758575</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                <div className="text-xl sm:text-2xl mb-2">📱</div>
                <div className="text-gray-800 font-medium text-sm sm:text-base">0244730726</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
                <div className="text-xl sm:text-2xl mb-2">✉️</div>
                <div className="text-gray-800 font-medium text-xs sm:text-sm">support@stlouisdemojhs.com</div>
              </div>
            </div>
          </motion.div>

          {/* Information Section - Mobile-Friendly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-blue-50 border border-blue-200 p-6 sm:p-8 rounded-2xl text-center">
              <h4 className="text-blue-700 font-semibold mb-4 sm:mb-6 text-lg sm:text-xl">📋 Required Documents</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-700">
                <div className="text-left">
                  <div className="mb-2 text-sm sm:text-base">• Birth Certificate</div>
                  <div className="text-sm sm:text-base">• Previous School Records</div>
                </div>
                <div className="text-left">
                  <div className="mb-2 text-sm sm:text-base">• Passport Photos</div>
                  <div className="text-sm sm:text-base">• Parent/Guardian ID</div>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mt-4 sm:mt-6 italic">
                All application details and deadlines will be provided in the application form
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action - Mobile-Friendly */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8">
              Ready to Join Our School Family?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
              <Link
                to="/schedule-visit"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                📅 Schedule a Visit First
              </Link>
              <Link
                to="/contact"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                💬 Contact Admissions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ApplyNowPage;
