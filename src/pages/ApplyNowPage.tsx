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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-green-900">
      {/* Back Button - Apple Style */}
      <div className="pt-20 pb-4 px-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Hero Section - Apple Style Clean */}
      <section className="px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Join Our School Family
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            Start your journey to excellence with St. Louis Demonstration Junior High School
          </p>
        </motion.div>

        {/* Key Benefits - Clean Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16"
        >
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Excellence</h3>
            <p className="text-gray-300 text-xs md:text-sm">47+ years of academic excellence</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Community</h3>
            <p className="text-gray-300 text-xs md:text-sm">800+ students strong</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Curriculum</h3>
            <p className="text-gray-300 text-xs md:text-sm">Comprehensive programs</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Award className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-white font-semibold mb-2 text-sm md:text-base">Success</h3>
            <p className="text-gray-300 text-xs md:text-sm">98%+ BECE success rate</p>
          </div>
        </motion.div>
      </section>

      {/* Application Form Section - Clean Apple Style */}
      <section className="px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Start Your Application
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            Begin your journey with us. Application form coming soon!
          </p>
        </motion.div>

        {/* Application Placeholder - Clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-dark p-8 md:p-12 rounded-3xl text-center mb-12"
        >
          <div className="text-6xl md:text-8xl mb-6">📝</div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Application Form Coming Soon!</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We're preparing a comprehensive application system. Contact us directly for admission inquiries.
          </p>

          {/* Contact Cards - Clean Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-white font-medium">0244758575</div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-white font-medium">0244730726</div>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="text-2xl mb-2">✉️</div>
              <div className="text-white font-medium text-sm">support@stlouisdemojhs.com</div>
            </div>
          </div>
        </motion.div>

        {/* Information Grid - Clean */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="glass-blue p-6 rounded-2xl">
            <h4 className="text-blue-300 font-semibold mb-4 text-lg">📋 Required Documents</h4>
            <ul className="text-gray-200 space-y-2">
              <li>• Birth Certificate</li>
              <li>• Previous School Records</li>
              <li>• Passport Photos</li>
              <li>• Parent/Guardian ID</li>
            </ul>
          </div>

          <div className="glass-green p-6 rounded-2xl">
            <h4 className="text-green-300 font-semibold mb-4 text-lg">📅 Important Dates</h4>
            <ul className="text-gray-200 space-y-2">
              <li>• Application Opens: January</li>
              <li>• Entrance Exam: March</li>
              <li>• Results Release: April</li>
              <li>• School Starts: September</li>
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Call to Action - Clean Apple Style */}
      <section className="px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-8" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Ready to Join Our School Family?
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
            <Link
              to="/schedule-visit"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-2xl shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105"
              style={{
                boxShadow: '0 0 30px rgba(255, 193, 7, 0.6)',
              }}
            >
              📅 Schedule a Visit First
            </Link>
            <Link
              to="/contact"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
              style={{
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
              }}
            >
              💬 Contact Admissions
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ApplyNowPage;
