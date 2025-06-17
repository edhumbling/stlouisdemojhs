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
    <section className="py-4 sm:py-6 md:py-8 relative overflow-hidden min-h-[400px] sm:min-h-[450px] md:min-h-[500px] flex items-center">
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
        <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto text-center mb-4 sm:mb-6 md:mb-8 px-2">
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
            At St. Louis Demonstration J.H.S, we cultivate <span className="text-green-400 font-bold">innovative minds</span> through cutting-edge educational approaches that blend <span className="text-blue-400 font-bold">academic rigor</span> with character development. Our dynamic learning environment empowers students to think critically, lead confidently, and excel globally. With over <span className="text-yellow-400 font-bold">{schoolStats.totalStudentsFormatted} graduates</span> making their mark worldwide, we continue to set new standards in transformative education that prepares young leaders for tomorrow's challenges.
          </motion.p>
        </div>

        {/* Horizontal Aligned Buttons */}
        <motion.div
          className="text-center mb-4 sm:mb-6 px-2 sm:px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center max-w-xl mx-auto">
            {/* Learn More Button - Cute Blue/Purple */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 max-w-[180px] sm:max-w-[200px]"
            >
              <Link
                to="/leadership-excellence"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="group relative inline-flex items-center justify-center w-full px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5),0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.7),0_0_50px_rgba(147,51,234,0.5)] transition-all duration-500 text-xs sm:text-sm overflow-hidden border border-white/20"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
              >
                {/* Cute Sparkle Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Floating Particles */}
                <div className="absolute top-1 right-2 w-1 h-1 bg-white/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-3 w-1.5 h-1.5 bg-blue-200/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>

                {/* Button Text */}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">📚</span>
                  Learn More
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-sm"
                  >
                    →
                  </motion.span>
                </span>

                {/* Cute Glow Effect */}
                <div className="absolute inset-0 bg-blue-400/20 rounded-2xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>

            {/* Discover Excellence Button - Cute Yellow/Orange */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 max-w-[180px] sm:max-w-[200px]"
            >
              <Link
                to="/about"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                className="group relative inline-flex items-center justify-center w-full px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-400 hover:to-orange-300 text-black font-bold rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.5),0_0_30px_rgba(251,146,60,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.7),0_0_50px_rgba(251,146,60,0.5)] transition-all duration-500 text-xs sm:text-sm overflow-hidden"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
              >
                {/* Cute Sparkle Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Floating Particles */}
                <div className="absolute top-2 right-3 w-1 h-1 bg-white/50 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-1 left-2 w-1.5 h-1.5 bg-yellow-200/40 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>

                {/* Button Text */}
                <span className="relative z-10 flex items-center gap-2">
                  <span className="text-lg">🌟</span>
                  Discover Excellence
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-sm"
                  >
                    ✨
                  </motion.span>
                </span>

                {/* Cute Glow Effect */}
                <div className="absolute inset-0 bg-yellow-300/30 rounded-2xl animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;