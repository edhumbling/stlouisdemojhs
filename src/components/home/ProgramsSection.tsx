import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { programs } from '../../data';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProgramsSection: React.FC = () => {
  const [activeProgram, setActiveProgram] = useState(programs[0].id);

  return (
    <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Magical Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-100/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-100/25 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="max-w-5xl mx-auto text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
            Our Academic Curriculum
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            St. Louis Demonstration JHS offers a comprehensive curriculum designed to develop well-rounded students
            through rigorous academics, technology integration, cultural awareness, and character formation.
          </p>

          {/* Magical Subject List */}
          <motion.div
            className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg border border-gray-100/50 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h3
              className="text-lg sm:text-xl font-bold text-primary-800 mb-4 sm:mb-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
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
                  className="group relative bg-white rounded-xl p-2 sm:p-3 shadow-md hover:shadow-lg border border-primary-100 hover:border-primary-300 transition-all duration-300 overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Magical Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Sparkle Effect */}
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400/60 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>

                  <span className="relative z-10 text-primary-700 font-semibold group-hover:text-primary-800 transition-colors duration-300 leading-tight">
                    {subject}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-6">Academic Areas</h3>
              <ul className="space-y-2">
                {programs.map((program) => (
                  <li key={program.id}>
                    <button
                      onClick={() => setActiveProgram(program.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-300 flex items-center justify-between ${
                        activeProgram === program.id
                          ? 'bg-primary-100 text-primary-800'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span>{program.title}</span>
                      <ChevronRight
                        size={18}
                        className={`transition-transform duration-300 ${
                          activeProgram === program.id ? 'transform rotate-90 text-primary-600' : ''
                        }`}
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-center">
                <Link
                  to="/academics"
                  className="inline-flex items-center justify-center px-5 py-2 bg-primary-600 text-white font-medium rounded-full shadow-md hover:bg-primary-700 transition-colors duration-300 text-sm"
                >
                  View All Programs
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            {programs.map((program) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeProgram === program.id ? 1 : 0,
                  display: activeProgram === program.id ? 'block' : 'none'
                }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg overflow-hidden shadow-md h-full"
              >
                <div className="relative h-64">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <h3 className="text-2xl font-bold text-white p-6">{program.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-6">{program.description}</p>
                  <Link
                    to="/academics"
                    className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
                  >
                    Learn more
                    <ChevronRight size={18} className="ml-1" />
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