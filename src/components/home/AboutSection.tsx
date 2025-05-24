import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-primary-600" />,
      title: 'Comprehensive Curriculum',
      description: 'Rigorous academic programs designed to challenge and inspire students to reach their full potential.'
    },
    {
      icon: <Users className="w-10 h-10 text-primary-600" />,
      title: 'Expert Faculty',
      description: 'Dedicated teachers with extensive experience and passion for nurturing young minds.'
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-primary-600" />,
      title: 'Innovative Learning',
      description: 'Modern teaching methodologies and technology integration for an enhanced learning experience.'
    },
    {
      icon: <Award className="w-10 h-10 text-primary-600" />,
      title: 'Holistic Development',
      description: 'Focus on developing academic, social, emotional, and physical aspects of each student.'
    }
  ];

  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7109.HEIC?updatedAt=1748099386709"
          alt="St. Louis Demonstration JHS Campus"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6"
            style={{
              fontFamily: 'Arial, sans-serif',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.6)'
            }}
          >
            Shaping Tomorrow's <span className="text-yellow-400">Leaders</span> Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-100 px-2 max-w-3xl mx-auto"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
          >
            Since 1977, we've been Ghana's premier educational institution, pioneering innovative teaching methods and nurturing exceptional minds. Having trained over <span className="text-yellow-400 font-bold">30,000+ students</span> throughout our distinguished history, our legacy of excellence continues to inspire generations to achieve greatness.
          </motion.p>
        </div>

        {/* Mobile-First Magical Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12 px-2 sm:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="group relative bg-white/10 backdrop-blur-md p-4 sm:p-5 md:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:bg-white/20 flex flex-col items-center text-center border border-white/30 hover:border-yellow-400/50 overflow-hidden"
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Magical Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating Particles Effect */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>

              {/* Icon with Magical Glow */}
              <motion.div
                className="mb-3 sm:mb-4 relative"
                whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
              >
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {React.cloneElement(feature.icon, {
                  className: "w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 text-yellow-400 relative z-10 drop-shadow-lg group-hover:text-yellow-300 transition-colors duration-300"
                })}
              </motion.div>

              {/* Enhanced Typography */}
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-100 leading-relaxed"
                 style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                {feature.description}
              </p>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-blue-400 group-hover:w-3/4 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Magical CTA Button */}
        <motion.div
          className="text-center px-4 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/about"
              className="group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-bold rounded-full shadow-[0_0_20px_rgba(251,191,36,0.6),0_0_40px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_rgba(251,191,36,0.8),0_0_60px_rgba(251,191,36,0.6)] transition-all duration-500 text-sm sm:text-base md:text-lg overflow-hidden"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
            >
              {/* Magical Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Button Text */}
              <span className="relative z-10 flex items-center gap-2">
                Discover Our Excellence
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-lg"
                >
                  ✨
                </motion.span>
              </span>

              {/* Pulsing Background */}
              <div className="absolute inset-0 bg-yellow-300/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;