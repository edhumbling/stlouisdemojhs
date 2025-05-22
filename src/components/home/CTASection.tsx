import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-green-700 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
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
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6"
          >
            Join Our School Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-100 px-1"
          >
            Experience a supportive learning environment where students thrive academically,
            socially, and emotionally. Visit our campus or contact us today to learn more
            about admission opportunities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4"
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-yellow-500 text-black font-medium rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300 text-sm sm:text-base hover:scale-105"
            >
              Schedule a Visit
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link
              to="/admissions"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-white font-medium rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 text-sm sm:text-base hover:scale-105"
            >
              Apply Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;