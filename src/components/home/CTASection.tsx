import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-500 via-yellow-600 to-green-700 text-white relative overflow-hidden">
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
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Join Our School Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 text-gray-100"
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
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-700 font-medium rounded-full shadow-lg hover:bg-yellow-50 transition-colors duration-300"
            >
              Schedule a Visit
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-yellow-300 text-yellow-100 font-medium rounded-full hover:bg-yellow-400 hover:text-green-800 hover:border-yellow-400 transition-all duration-300"
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