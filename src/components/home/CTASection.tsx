import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-8 md:py-16 text-white relative overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7115.HEIC?updatedAt=1748185690882"
          alt="St. Louis Demonstration School Campus"
          className="w-full h-full object-cover"
        />
        {/* Blue-Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/85 via-blue-700/80 to-green-700/85"></div>
        {/* Additional Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#fff_1px,transparent_1px)] [background-size:30px_30px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontFamily: "'Playfair Display', serif"
            }}
          >
            Join Our School Family
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg mb-4 md:mb-6 text-white px-2"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
          >
            Join <strong>800+ students</strong> at St. Louis Demo. Experience excellent education and caring teachers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4"
          >
            {/* Schedule a Visit Button - Small & Cute */}
            <Link
              to="/schedule-visit"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="group w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 text-xs sm:text-sm transform hover:scale-105 relative overflow-hidden"
              style={{
                boxShadow: '0 0 15px rgba(255, 193, 7, 0.4)',
                filter: 'drop-shadow(0 2px 10px rgba(255, 193, 7, 0.2))'
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              <span className="relative z-10 flex items-center">
                📅 Schedule Visit
                <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Link>

            {/* Apply Now Button - Small & Cute */}
            <Link
              to="/apply-now"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="group w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-green-500/50 transition-all duration-300 text-xs sm:text-sm transform hover:scale-105 relative overflow-hidden"
              style={{
                boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)',
                filter: 'drop-shadow(0 2px 10px rgba(34, 197, 94, 0.2))'
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
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