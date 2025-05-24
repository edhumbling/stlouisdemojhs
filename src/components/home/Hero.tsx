import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MvnyEMdmbxU06Mca57V3tJ1r8NOShqgZsCH9p',
    'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MRZwFWWpo7s1MlWNERCjA3OUSQ9nHvY65ui4I'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background Images with Overlay */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`St. Louis Demonstration Junior High School ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
            {/* Dark gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
            {/* Additional overlay for mobile */}
            <div className="absolute inset-0 bg-black/20 md:bg-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
              Excellence in<br />
              <span className="text-yellow-400">Education</span>
            </h1>

            <div className="max-w-2xl mb-8 md:mb-12">
              <p className="text-lg sm:text-xl md:text-2xl mb-4 text-gray-100 leading-relaxed">
                Nurturing minds and shaping futures since 1977.
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed">
                Where academic excellence meets character development in the heart of Kumasi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 text-black font-semibold rounded-full shadow-xl hover:bg-yellow-400 hover:shadow-2xl transition-all duration-300 text-base sm:text-lg group"
              >
                Discover Our Story
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 shadow-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 text-base sm:text-lg"
              >
                Visit Our Campus
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImage
                ? 'bg-yellow-400 scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;