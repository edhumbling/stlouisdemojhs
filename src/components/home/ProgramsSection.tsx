import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { programs } from '../../data';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProgramsSection: React.FC = () => {
  const [activeProgram, setActiveProgram] = useState(programs[0].id);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
            Academic Excellence
          </h2>
          <p className="text-lg text-gray-700">
            Our diverse academic programs are designed to challenge students, foster critical thinking, 
            and prepare them for future success in high school and beyond.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary-800 mb-6">Our Programs</h3>
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