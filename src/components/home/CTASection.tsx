import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-6 md:py-10 text-white relative overflow-hidden min-h-[280px] md:min-h-[320px] flex items-center">
      {/* Background Image with Overlay - Apple Style */}
      <div className="absolute inset-0">
        <img
          src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7115.HEIC?updatedAt=1748185690882"
          alt="St. Louis Demonstration School Campus"
          className="w-full h-full object-cover"
        />
        {/* Dark Apple-style Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-slate-900/75 to-black/80"></div>
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      {/* Edge-to-Edge Content */}
      <div className="w-full px-0 relative z-10">
        <div className="w-full text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3 text-white"
            style={{
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
              fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
            }}
          >
            Join Our School Family
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base mb-3 md:mb-4 text-gray-200 px-2 max-w-lg mx-auto"
            style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}
          >
            Excellence in education. <strong>800+ students</strong> strong.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 max-w-md mx-auto"
          >
            {/* Schedule a Visit Button - Apple Style */}
            <Link
              to="/schedule-visit"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="group w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-xs sm:text-sm transform hover:scale-105 relative overflow-hidden"
              style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <span className="relative z-10 flex items-center">
                📅 Schedule Visit
                <ArrowRight size={12} className="ml-1.5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>
            </Link>

            {/* Apply Now Button - Apple Style */}
            <Link
              to="/apply-now"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="group w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600/80 backdrop-blur-sm text-white font-medium rounded-2xl border border-blue-500/30 hover:bg-blue-500/80 transition-all duration-300 text-xs sm:text-sm transform hover:scale-105 relative overflow-hidden"
              style={{
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <span className="relative z-10 flex items-center">
                🎓 Apply Now
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;