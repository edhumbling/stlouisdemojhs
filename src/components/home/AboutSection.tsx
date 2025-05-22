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
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-4 md:mb-6"
          >
            Welcome to St. Louis Demonstration Junior High School
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-700 px-2"
          >
            For over three decades, we have been committed to academic excellence, character development, and preparing students
            for success in high school and beyond. Our dedicated faculty and staff provide a nurturing environment
            where students can explore their interests, develop their talents, and achieve their potential.
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
              className="glass-card p-5 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:bg-zinc-900/60 flex flex-col items-center sm:items-start text-center sm:text-left"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-3 sm:mb-4">{React.cloneElement(feature.icon, { className: "w-8 h-8 sm:w-10 sm:h-10 text-primary-600" })}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-yellow-500 text-black font-medium rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300 text-sm sm:text-base hover:scale-105"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;