import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 text-white relative overflow-hidden min-h-[600px] flex items-center">
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
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8"
            style={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontFamily: "'Playfair Display', serif"
            }}
          >
            🌟 Join Our Exceptional School Family 🌟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 text-white px-2 leading-relaxed"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}
          >
            🎓 Where dreams take flight and futures are built! Join over <strong>800+ students</strong> who call St. Louis Demo home.
            Experience world-class education, caring teachers, and a community that believes in your potential.
            <br />
            <span className="text-yellow-300 font-semibold">✨ Your journey to excellence starts here! ✨</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
          >
            {/* Schedule a Visit Button - Cute & Glowing */}
            <Link
              to="/schedule-visit"
              className="group w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-full shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 text-sm sm:text-base transform hover:scale-110 hover:-translate-y-1 relative overflow-hidden"
              style={{
                boxShadow: '0 0 30px rgba(255, 193, 7, 0.6), 0 0 60px rgba(255, 193, 7, 0.4)',
                filter: 'drop-shadow(0 4px 20px rgba(255, 193, 7, 0.3))'
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              <span className="relative z-10 flex items-center">
                📅 Schedule a Visit
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
            </Link>

            {/* Apply Now Button - Cute & Glowing */}
            <Link
              to="/apply-now"
              className="group w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 text-sm sm:text-base transform hover:scale-110 hover:-translate-y-1 relative overflow-hidden"
              style={{
                boxShadow: '0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)',
                filter: 'drop-shadow(0 4px 20px rgba(34, 197, 94, 0.3))'
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              <span className="relative z-10 flex items-center">
                🎓 Apply Now
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="ml-2"
                >
                  ✨
                </motion.span>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;