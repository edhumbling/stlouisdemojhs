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

        {/* Learn More Button */}
        <motion.div
          className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12 px-1 sm:px-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/leadership-excellence"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="group relative inline-flex items-center justify-center px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6),0_0_40px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8),0_0_60px_rgba(147,51,234,0.6)] transition-all duration-500 text-sm sm:text-base md:text-lg overflow-hidden border border-white/20"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              {/* Magical Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Button Text */}
              <span className="relative z-10 flex items-center gap-2">
                Learn More
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-lg"
                >
                  →
                </motion.span>
              </span>

              {/* Pulsing Background */}
              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>
        </motion.div>

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
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
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