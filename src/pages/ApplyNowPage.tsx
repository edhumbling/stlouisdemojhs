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
    <div className="min-h-screen bg-black pt-16">
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
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-2xl sm:text-3xl"
              >
                🎓
              </motion.div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                Apply to St. Louis Demo
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Apple Style */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                🌟 Join Our School Family 🌟
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                Start your journey to excellence with St. Louis Demonstration Junior High School!
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <GraduationCap className="text-blue-400 mb-4 mx-auto" size={40} />
                <h3 className="text-white font-semibold mb-2">Excellence</h3>
                <p className="text-gray-300 text-sm">47+ years of academic excellence</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <Users className="text-green-400 mb-4 mx-auto" size={40} />
                <h3 className="text-white font-semibold mb-2">Community</h3>
                <p className="text-gray-300 text-sm">800+ students strong</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <BookOpen className="text-yellow-400 mb-4 mx-auto" size={40} />
                <h3 className="text-white font-semibold mb-2">Curriculum</h3>
                <p className="text-gray-300 text-sm">Comprehensive programs</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <Award className="text-purple-400 mb-4 mx-auto" size={40} />
                <h3 className="text-white font-semibold mb-2">Success</h3>
                <p className="text-gray-300 text-sm">98%+ BECE success rate</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  🌟 Start Your Application 🌟
                </h2>
                <p className="text-gray-300 text-lg">
                  Complete the form below to begin your journey with us. We'll embed a Google Form here soon!
                </p>
              </div>

              {/* Placeholder for Google Form */}
              <div className="bg-gray-800/50 rounded-xl p-12 text-center border-2 border-dashed border-gray-600">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-white mb-4">Application Form Coming Soon!</h3>
                <p className="text-gray-300 mb-6">
                  We're preparing a comprehensive Google Form for your application.
                  In the meantime, please contact us directly for admission inquiries.
                </p>

                {/* Contact Information */}
                <div className="bg-white/10 rounded-lg p-6 max-w-md mx-auto">
                  <h4 className="text-white font-semibold mb-4">Contact Admissions Office</h4>
                  <div className="space-y-2 text-gray-300">
                    <p>📱 0244758575</p>
                    <p>📱 0244730726</p>
                    <p>✉️ support@stlouisdemojhs.com</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-500/20 rounded-lg p-6 border border-blue-400/30">
                  <h4 className="text-blue-300 font-semibold mb-3">📋 Required Documents</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Birth Certificate</li>
                    <li>• Previous School Records</li>
                    <li>• Passport Photos</li>
                    <li>• Parent/Guardian ID</li>
                  </ul>
                </div>

                <div className="bg-green-500/20 rounded-lg p-6 border border-green-400/30">
                  <h4 className="text-green-300 font-semibold mb-3">📅 Important Dates</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Application Opens: January</li>
                    <li>• Entrance Exam: March</li>
                    <li>• Results Release: April</li>
                    <li>• School Starts: September</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Ready to Join Our School Family? 🏫
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/schedule-visit"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105"
                style={{
                  boxShadow: '0 0 30px rgba(255, 193, 7, 0.6)',
                }}
              >
                📅 Schedule a Visit First
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
                style={{
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
                }}
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
