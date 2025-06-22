import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { programs } from '../../data';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEnhancedNavigation } from '../../hooks/useEnhancedNavigation';

const ProgramsSection: React.FC = () => {
  const [activeProgram, setActiveProgram] = useState(programs[0].id);
  const { navigateToWithState } = useEnhancedNavigation();

  // Subject name to route mapping with distinct colors and silver reflections
  const getSubjectRoute = (subject: string): string => {
    const routeMap: { [key: string]: string } = {
      'English Language': '/subject/english-language',
      'Mathematics': '/subject/mathematics',
      'Integrated Science': '/subject/integrated-science',
      'Social Studies': '/subject/social-studies',
      'Religious & Moral Education': '/subject/religious-moral-education',
      'Ghanaian Language (Asante Twi)': '/subject/ghanaian-language',
      'French': '/subject/french',
      'Career Technology': '/subject/career-technology',
      'Computing (ICT)': '/subject/computing-ict',
      'Creative Arts & Design': '/subject/creative-arts-design',
      'Music': '/subject/music'
    };
    return routeMap[subject] || '/academics';
  };

  // Subject styling with solid colors and glass effect
  const getSubjectStyle = (subject: string) => {
    const styleMap: { [key: string]: any } = {
      'English Language': {
        solidColor: 'bg-blue-600/80',
        shadow: 'shadow-blue-500/50',
        glow: '#3b82f6',
        border: 'border-blue-400/40',
        text: 'text-white'
      },
      'Mathematics': {
        solidColor: 'bg-emerald-600/80',
        shadow: 'shadow-emerald-500/50',
        glow: '#10b981',
        border: 'border-emerald-400/40',
        text: 'text-white'
      },
      'Integrated Science': {
        solidColor: 'bg-purple-600/80',
        shadow: 'shadow-purple-500/50',
        glow: '#8b5cf6',
        border: 'border-purple-400/40',
        text: 'text-white'
      },
      'Social Studies': {
        solidColor: 'bg-orange-600/80',
        shadow: 'shadow-orange-500/50',
        glow: '#f97316',
        border: 'border-orange-400/40',
        text: 'text-white'
      },
      'Religious & Moral Education': {
        solidColor: 'bg-indigo-600/80',
        shadow: 'shadow-indigo-500/50',
        glow: '#6366f1',
        border: 'border-indigo-400/40',
        text: 'text-white'
      },
      'Ghanaian Language (Asante Twi)': {
        solidColor: 'bg-red-600/80',
        shadow: 'shadow-red-500/50',
        glow: '#ef4444',
        border: 'border-red-400/40',
        text: 'text-white'
      },
      'French': {
        solidColor: 'bg-pink-600/80',
        shadow: 'shadow-pink-500/50',
        glow: '#ec4899',
        border: 'border-pink-400/40',
        text: 'text-white'
      },
      'Career Technology': {
        solidColor: 'bg-amber-500/80',
        shadow: 'shadow-amber-500/50',
        glow: '#f59e0b',
        border: 'border-amber-400/40',
        text: 'text-black'
      },
      'Computing (ICT)': {
        solidColor: 'bg-cyan-600/80',
        shadow: 'shadow-cyan-500/50',
        glow: '#06b6d4',
        border: 'border-cyan-400/40',
        text: 'text-white'
      },
      'Creative Arts & Design': {
        solidColor: 'bg-teal-600/80',
        shadow: 'shadow-teal-500/50',
        glow: '#14b8a6',
        border: 'border-teal-400/40',
        text: 'text-white'
      },
      'Music': {
        solidColor: 'bg-violet-600/80',
        shadow: 'shadow-violet-500/50',
        glow: '#7c3aed',
        border: 'border-violet-400/40',
        text: 'text-white'
      }
    };
    return styleMap[subject] || {
      solidColor: 'bg-gray-600/80',
      shadow: 'shadow-gray-500/50',
      glow: '#6b7280',
      border: 'border-gray-400/40',
      text: 'text-white'
    };
  };

  // Handle subject navigation with state preservation
  const handleSubjectClick = (subject: string) => {
    const route = getSubjectRoute(subject);
    navigateToWithState(route);
  };

  return (
    <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-br from-blue-900 via-slate-900 to-green-900 relative overflow-hidden">
      {/* Enhanced Blue-Green Background Elements - School Colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/25 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-500/20 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-blue-600/15 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="max-w-5xl mx-auto text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6"
              style={{
                fontFamily: 'Arial, sans-serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)'
              }}>
            Our Academic Curriculum
          </h2>
          <p className="text-sm sm:text-lg text-gray-200 mb-6 sm:mb-8 px-2 sm:px-0"
             style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
            <span className="hidden sm:inline">St. Louis Demonstration Junior High School offers a comprehensive curriculum designed to develop well-rounded students
            through rigorous academics, technology integration, cultural awareness, and character formation.</span>
            <span className="sm:hidden">Comprehensive curriculum developing well-rounded students through academics, tech & character formation 📚✨</span>
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
              ].map((subject, index) => {
                const style = getSubjectStyle(subject);
                return (
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
                    className={`group relative ${style.solidColor} backdrop-blur-md rounded-xl p-2 sm:p-3 ${style.shadow} hover:shadow-2xl border border-white/20 ${style.border} transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 hover:-translate-y-1`}
                    style={{
                      boxShadow: `0 0 20px ${style.glow}40, 0 0 40px ${style.glow}20, inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.1)`,
                      backdropFilter: 'blur(12px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                    }}
                    whileHover={{
                      scale: 1.08,
                      y: -3,
                      transition: { duration: 0.2 },
                      boxShadow: `0 0 30px ${style.glow}60, 0 0 60px ${style.glow}40, inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.3)`
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSubjectClick(subject)}
                  >
                    {/* Glass Reflection Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300 rounded-xl"></div>

                    {/* Glass Top Highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-t-xl"></div>

                    {/* Glass Side Highlights */}
                    <div className="absolute top-0 left-0 w-0.5 bottom-0 bg-gradient-to-b from-white/50 via-white/20 to-transparent rounded-l-xl"></div>
                    <div className="absolute top-0 right-0 w-0.5 bottom-0 bg-gradient-to-b from-white/50 via-white/20 to-transparent rounded-r-xl"></div>

                    {/* Glass Frosted Effect */}
                    <div className="absolute inset-0 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors duration-300"></div>

                    {/* Intense Glow Effect */}
                    <div
                      className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300 rounded-xl"
                      style={{
                        background: `radial-gradient(circle at center, ${style.glow}30 0%, transparent 70%)`
                      }}
                    ></div>

                    {/* Pulsing Border Effect */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(45deg, ${style.glow}20, transparent, ${style.glow}20)`,
                        animation: 'pulse 2s infinite'
                      }}
                    ></div>

                    {/* Glass Corner Highlights */}
                    <div className="absolute top-1 left-1 w-3 h-3 bg-white/20 rounded-full blur-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-1 right-1 w-2 h-2 bg-white/15 rounded-full blur-sm opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                    <span className={`relative z-10 ${style.text} font-bold group-hover:drop-shadow-lg transition-all duration-300 leading-tight text-center block`}
                          style={{
                            textShadow: `0 0 10px ${style.glow}, 0 0 20px ${style.glow}80, 0 1px 2px rgba(0,0,0,0.8), 0 0 5px rgba(255,255,255,0.3)`
                          }}>
                      {subject}
                    </span>
                  </motion.div>
                );
              })}
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
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
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
                          : 'hover:bg-blue-100 text-blue-700 bg-blue-50 border border-blue-200'
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
                className="glass-dark rounded-lg overflow-hidden shadow-2xl h-full"
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
                  <p className="text-gray-200 mb-4 lg:mb-6 text-sm lg:text-base">{program.description}</p>
                  <Link
                    to={program.id === 1 ? '/core-academic' :
                        program.id === 2 ? '/stem-education' :
                        program.id === 3 ? '/creative-arts' :
                        program.id === 4 ? '/character-education' : '/academics'}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base"
                  >
                    {program.id === 1 ? 'Explore Core Academic Subjects' :
                     program.id === 2 ? 'Discover STEM Education Programs' :
                     program.id === 3 ? 'View Creative Arts Curriculum' :
                     program.id === 4 ? 'Learn About Character Education' : 'Learn more'}
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