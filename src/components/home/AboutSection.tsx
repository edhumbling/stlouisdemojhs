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
            Since 1977, we've been Ghana's premier demonstration school, pioneering innovative teaching methods and nurturing exceptional minds. Our legacy of excellence continues to inspire generations of students to achieve greatness.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 md:mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/20 flex flex-col items-center text-center border border-white/20"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-3 sm:mb-4">{React.cloneElement(feature.icon, { className: "w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" })}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-200" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full shadow-[0_0_20px_rgba(251,191,36,0.6),0_0_40px_rgba(251,191,36,0.4)] hover:shadow-[0_0_25px_rgba(251,191,36,0.8),0_0_50px_rgba(251,191,36,0.6)] transition-all duration-300 text-sm sm:text-base hover:scale-105"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}
          >
            Discover Our Excellence
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;