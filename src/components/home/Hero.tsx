import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center py-16 md:py-0 bg-gradient-to-br from-black via-zinc-900 to-black">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white order-2 md:order-1 text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Nurturing Minds,<br />Shaping Futures
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-100 max-w-lg mx-auto md:mx-0">
              St. Louis Demonstration Junior High School provides a supportive
              and challenging environment where students develop the skills,
              knowledge, and character to excel in an ever-changing world.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-3 bg-yellow-500 text-black font-medium rounded-full shadow-lg hover:bg-yellow-400 transition-colors duration-300 text-sm sm:text-base"
              >
                Learn More
                <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 sm:px-6 py-3 bg-green-600 text-white font-medium rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 text-sm sm:text-base"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center order-1 md:order-2 mb-6 md:mb-0"
          >
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-white rounded-full opacity-10 animate-pulse"></div>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
              ></motion.div>
              <img
                src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs"
                alt="St. Louis Demonstration Junior High School"
                className="relative z-10 w-full h-full object-contain p-6 sm:p-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;