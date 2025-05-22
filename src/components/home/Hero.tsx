import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center bg-gradient-to-br from-black via-zinc-900 to-black">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Nurturing Minds,<br />Shaping Futures
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-lg">
              St. Louis Demonstration Junior High School provides a supportive 
              and challenging environment where students develop the skills, 
              knowledge, and character to excel in an ever-changing world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/about" 
                className="inline-flex items-center justify-center px-6 py-3 glass font-medium rounded-full shadow-lg hover:bg-white/20 transition-colors duration-300"
              >
                Learn More
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 glass-dark border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-white rounded-full opacity-10"></div>
              <img 
                src="https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MQvvu88gADpy0Zti2YukxzfHQrcTFhNmSbnIs" 
                alt="St. Louis Demonstration Junior High School" 
                className="relative z-10 w-full h-full object-contain p-8"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;