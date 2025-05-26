import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Users, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSchoolStats } from '../../utils/schoolStats';

const AboutSection: React.FC = () => {
  // Get dynamic school statistics
  const schoolStats = getSchoolStats();

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
      description: 'Focus on developing academic, social, emotional, and physical aspects through diverse extracurricular activities including Music, Football, Volleyball, Cadet Corps, Band, Choreography Group, Choir Group, and creative arts programs.'
    }
  ];

  return (
    <section className="py-4 sm:py-6 md:py-8 lg:py-12 relative overflow-hidden min-h-screen flex items-center">
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

      <div className="w-full px-1 sm:px-2 md:px-4 lg:px-6 relative z-10">
        <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight"
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
            className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-100 px-1 sm:px-2 leading-relaxed"
            style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
          >
            Since {schoolStats.foundingYear}, St. Louis Demonstration J.H.S has been Ghana's premier educational institution, fully accredited by the <span className="text-green-400 font-bold">Ghana Education Service (GES)</span> and guided by the <span className="text-blue-400 font-bold">Roman Catholic principles</span>. We pioneer innovative teaching methods while nurturing exceptional minds in an environment of faith, excellence, and moral character. Having trained over <span className="text-yellow-400 font-bold">{schoolStats.totalStudentsFormatted} students</span> throughout our distinguished history, our legacy of academic excellence and spiritual formation continues to inspire generations to achieve greatness.
          </motion.p>
        </div>

        {/* Mobile-First Cute Feature Cards - Two Column Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2 md:gap-3 lg:gap-6 mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-1 sm:px-2">
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
              className="group relative bg-white/10 backdrop-blur-md p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-6 rounded-md sm:rounded-lg md:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:bg-white/20 flex flex-col items-center text-center border border-white/30 hover:border-yellow-400/50 overflow-hidden"
              whileHover={{
                y: -4,
                scale: 1.01,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Magical Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Floating Particles Effect - Smaller on Mobile */}
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-yellow-400/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 md:bottom-3 md:left-3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400/40 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>

              {/* Icon with Magical Glow - Smaller on Mobile */}
              <motion.div
                className="mb-1 sm:mb-2 md:mb-3 lg:mb-4 relative"
                whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.5 } }}
              >
                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-sm sm:blur-md md:blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {React.cloneElement(feature.icon, {
                  className: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-yellow-400 relative z-10 drop-shadow-lg group-hover:text-yellow-300 transition-colors duration-300"
                })}
              </motion.div>

              {/* Enhanced Typography - Smaller on Mobile */}
              <h3 className="text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold text-white mb-0.5 sm:mb-1 md:mb-2 lg:mb-3 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                {feature.title}
              </h3>
              <p className="text-xs sm:text-xs md:text-xs lg:text-sm xl:text-base text-gray-100 leading-tight sm:leading-relaxed"
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