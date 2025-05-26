import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { programs } from '../../data';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProgramsSection: React.FC = () => {
  const [activeProgram, setActiveProgram] = useState(programs[0].id);

  return (
    <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Magical Background Elements - School Colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-500/20 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="max-w-5xl mx-auto text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6"
              style={{
                fontFamily: 'Arial, sans-serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)'
              }}>
            Our Academic Curriculum
          </h2>
          <p className="text-lg text-gray-200 mb-8"
             style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
            St. Louis Demonstration Junior High School offers a comprehensive curriculum designed to develop well-rounded students
            through rigorous academics, technology integration, cultural awareness, and character formation.
          </p>

          {/* Magical Subject List - School Colors */}
          <motion.div
            className="bg-gradient-to-br from-white/10 to-blue-500/10 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg border border-white/20 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h3
              className="text-lg sm:text-xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
            >
              ✨ Subjects We Teach ✨
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 text-xs sm:text-sm">
              {[
                'English Language',
                'Mathematics',
                'Integrated Science',
                'Social Studies',
                'Religious & Moral Education',
                'Ghanaian Language (Asante Twi)',
                'French',
                'Career Technology',
                'Computing (ICT)',
                'Creative Arts & Design',
                'Music'
              ].map((subject, index) => (
                <motion.div
                  key={subject}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-xl p-2 sm:p-3 shadow-md hover:shadow-lg border border-white/30 hover:border-yellow-400/50 transition-all duration-300 overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Magical Glow Effect - School Colors */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-green-500/5 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Sparkle Effect - Yellow School Color */}
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400/80 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>

                  <span className="relative z-10 text-gray-800 font-semibold group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                    {subject}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Horizontal Layout for Both Mobile and Desktop */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Navigation Buttons - Horizontal on Mobile, Vertical on Desktop */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-gray-50 rounded-lg p-4 lg:p-6">
              <h3 className="text-lg lg:text-xl font-semibold text-primary-800 mb-4 lg:mb-6">Academic Areas</h3>

              {/* Mobile: 2-Column Grid Layout */}
              <div className="lg:hidden">
                <div className="grid grid-cols-2 gap-2">
                  {programs.map((program) => (
                    <button
                      key={program.id}
                      onClick={() => setActiveProgram(program.id)}
                      className={`px-3 py-2 rounded-lg transition-colors duration-300 text-sm font-medium text-center ${
                        activeProgram === program.id
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {program.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Desktop: 2-Column Grid Layout */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-2">
                  {programs.map((program) => (
                    <button
                      key={program.id}
                      onClick={() => setActiveProgram(program.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-300 flex items-center justify-between ${
                        activeProgram === program.id
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'hover:bg-gray-100 text-gray-700 bg-white border border-gray-200'
                      }`}
                    >
                      <span className="text-sm font-medium">{program.title}</span>
                      <ChevronRight
                        size={16}
                        className={`transition-transform duration-300 ${
                          activeProgram === program.id ? 'transform rotate-90 text-white' : 'text-gray-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 lg:mt-8 text-center">
                <Link
                  to="/academics"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="inline-flex items-center justify-center px-4 lg:px-5 py-2 bg-yellow-500 text-black font-medium rounded-full shadow-md hover:bg-yellow-600 transition-colors duration-300 text-sm"
                >
                  Discover Academic Excellence
                </Link>
              </div>
            </div>
          </div>

          {/* Content Area - Always Horizontal */}
          <div className="flex-1">
            {programs.map((program) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{
                  opacity: activeProgram === program.id ? 1 : 0,
                  x: activeProgram === program.id ? 0 : 20,
                  display: activeProgram === program.id ? 'block' : 'none'
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-lg overflow-hidden shadow-md h-full"
              >
                <div className="relative h-48 lg:h-64">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <h3 className="text-xl lg:text-2xl font-bold text-white p-4 lg:p-6">{program.title}</h3>
                  </div>
                </div>
                <div className="p-4 lg:p-6">
                  <p className="text-gray-700 mb-4 lg:mb-6 text-sm lg:text-base">{program.description}</p>
                  <Link
                    to="/academics"
                    className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium text-sm lg:text-base"
                  >
                    Learn more
                    <ChevronRight size={16} className="ml-1 lg:w-5 lg:h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;