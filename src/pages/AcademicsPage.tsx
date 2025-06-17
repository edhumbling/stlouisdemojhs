import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Lightbulb, Award, Globe, Palette, Calculator, Microscope, Music, Computer, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import SectionDivider from '../components/common/SectionDivider';
import DonateButton from '../components/common/DonateButton';
import { getSchoolStats } from '../utils/schoolStats';
import SEOHead from '../components/seo/SEOHead';
import { useEnhancedNavigation } from '../hooks/useEnhancedNavigation';

const AcademicsPage: React.FC = () => {
  const navigate = useNavigate();
  const { navigateBackWithState, navigateToWithState } = useEnhancedNavigation();

  // Get dynamic school statistics
  const schoolStats = getSchoolStats();

  const handleBack = () => {
    navigateBackWithState('/'); // Go back to previous page with fallback to home
  };

  // Handle subject navigation with state preservation
  const handleSubjectClick = (route: string) => {
    navigateToWithState(route);
  };

  // Enhanced subject styling with distinct colors and silver reflections
  const getEnhancedSubjectStyle = (subject: any) => {
    return {
      gradient: subject.color.replace('bg-', 'from-') + ' via-' + subject.color.replace('bg-', '').replace('-600', '-500') + ' to-' + subject.color.replace('bg-', '').replace('-600', '-700'),
      glow: subject.neonColor,
      border: 'border-' + subject.color.replace('bg-', '').replace('-600', '-400') + '/60',
      text: subject.textColor,
      shadow: subject.shadowColor
    };
  };

  const subjects = [
    {
      name: 'English Language',
      icon: <BookOpen className="w-8 h-8" />,
      description: 'Comprehensive language arts program focusing on reading, writing, speaking, and listening skills.',
      color: 'bg-blue-600',
      neonColor: '#3b82f6',
      shadowColor: 'shadow-blue-500/50',
      textColor: 'text-white',
      route: '/subject/english-language'
    },
    {
      name: 'Mathematics',
      icon: <Calculator className="w-8 h-8" />,
      description: 'Rigorous mathematical curriculum covering algebra, geometry, statistics, and problem-solving.',
      color: 'bg-emerald-600',
      neonColor: '#10b981',
      shadowColor: 'shadow-emerald-500/50',
      textColor: 'text-white',
      route: '/subject/mathematics'
    },
    {
      name: 'Integrated Science',
      icon: <Microscope className="w-8 h-8" />,
      description: 'Hands-on science education combining physics, chemistry, and biology concepts.',
      color: 'bg-purple-600',
      neonColor: '#8b5cf6',
      shadowColor: 'shadow-purple-500/50',
      textColor: 'text-white',
      route: '/subject/integrated-science'
    },
    {
      name: 'Social Studies',
      icon: <Globe className="w-8 h-8" />,
      description: 'Exploration of history, geography, civics, and cultural studies for global awareness.',
      color: 'bg-orange-600',
      neonColor: '#f97316',
      shadowColor: 'shadow-orange-500/50',
      textColor: 'text-white',
      route: '/subject/social-studies'
    },
    {
      name: 'Religious & Moral Education',
      icon: <Users className="w-8 h-8" />,
      description: 'Character development through ethical reasoning and moral value formation.',
      color: 'bg-indigo-600',
      neonColor: '#6366f1',
      shadowColor: 'shadow-indigo-500/50',
      textColor: 'text-white',
      route: '/subject/religious-moral-education'
    },
    {
      name: 'Ghanaian Language (Asante Twi)',
      icon: <Globe className="w-8 h-8" />,
      description: 'Cultural heritage preservation through native language and cultural studies.',
      color: 'bg-red-600',
      neonColor: '#ef4444',
      shadowColor: 'shadow-red-500/50',
      textColor: 'text-white',
      route: '/subject/ghanaian-language'
    },
    {
      name: 'French',
      icon: <BookOpen className="w-8 h-8" />,
      description: 'International language skills for global communication and cultural exchange.',
      color: 'bg-pink-600',
      neonColor: '#ec4899',
      shadowColor: 'shadow-pink-500/50',
      textColor: 'text-white',
      route: '/subject/french'
    },
    {
      name: 'Career Technology',
      icon: <Lightbulb className="w-8 h-8" />,
      description: 'Practical skills in design, technology, and vocational preparation (formerly BDT).',
      color: 'bg-amber-500',
      neonColor: '#f59e0b',
      shadowColor: 'shadow-amber-500/50',
      textColor: 'text-black',
      route: '/subject/career-technology'
    },
    {
      name: 'Computing (ICT)',
      icon: <Computer className="w-8 h-8" />,
      description: 'Digital literacy, programming, and technology skills for the modern world.',
      color: 'bg-cyan-600',
      neonColor: '#06b6d4',
      shadowColor: 'shadow-cyan-500/50',
      textColor: 'text-white',
      route: '/subject/computing-ict'
    },
    {
      name: 'Creative Arts & Design',
      icon: <Palette className="w-8 h-8" />,
      description: 'Artistic expression through visual arts, design, and creative projects.',
      color: 'bg-teal-600',
      neonColor: '#14b8a6',
      shadowColor: 'shadow-teal-500/50',
      textColor: 'text-white',
      route: '/subject/creative-arts-design'
    },
    {
      name: 'Music',
      icon: <Music className="w-8 h-8" />,
      description: 'Musical education including theory, performance, and appreciation of various genres.',
      color: 'bg-violet-600',
      neonColor: '#7c3aed',
      shadowColor: 'shadow-violet-500/50',
      textColor: 'text-white',
      route: '/subject/music'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Academic Excellence | St. Louis Demonstration JHS"
        description="Discover our comprehensive academic programs at St. Louis Demonstration JHS. From core subjects to specialized courses, we offer rigorous curriculum designed to challenge and inspire students while building strong foundations for future success."
        keywords="academic programs, curriculum, subjects, BECE preparation, core academic, STEM education, creative arts, Ghana JHS academics"
        url="/academics"
        type="website"
        pageType="academics"
        useGalleryImages={true}
      />
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Academic Excellence
            </h1>
          </div>
        </div>
      </div>

      {/* Compact Hero Section */}
      <section className="py-6 sm:py-8 md:py-10 relative overflow-hidden">
        {/* Gallery Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7126.HEIC"
            alt="Academic Excellence at St. Louis Demo JHS"
            className="w-full h-full object-cover"
          />
          {/* Blue and Yellow overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/85 via-blue-700/80 to-yellow-600/75"></div>
        </div>
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Compact Professional Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Main Heading - Cute & Professional */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-4 sm:mb-6"
              >
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white mb-2"
                    style={{ fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  🎓 Academic Excellence
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-yellow-300"
                    style={{ fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  St. Louis Demonstration JHS
                </h2>
              </motion.div>

              {/* Description - Concise */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 sm:mb-6"
              >
                <p className="text-sm sm:text-base md:text-lg text-gray-100 leading-relaxed max-w-3xl mx-auto"
                   style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Comprehensive curriculum developing well-rounded students through rigorous academics and character formation since 1977.
                </p>
              </motion.div>

              {/* Key Stats - Horizontal Layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <div className="text-lg sm:text-xl font-bold text-yellow-300" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    {schoolStats.ageFormatted}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">Years Excellence</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <div className="text-lg sm:text-xl font-bold text-blue-300" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    11
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">Subjects</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <div className="text-lg sm:text-xl font-bold text-green-300" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    800+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">Students</div>
                </div>
              </motion.div>

              {/* Achievement Badge - Cute */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex justify-center mb-6 sm:mb-8"
              >
                <div className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 py-2 shadow-lg">
                  <span className="text-yellow-400 text-lg">🏆</span>
                  <span className="text-yellow-300 text-sm font-semibold">Award-Winning Institution</span>
                </div>
              </motion.div>

              {/* Compact Awards Gallery - Professional Organization */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex justify-center"
              >
                <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto">
                  {/* Certificate Award */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="group"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 shadow-lg">
                      <img
                        src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-23%20at%2015.25.49_a13217f5.png?updatedAt=1748114499952"
                        alt="Recognition Certificate"
                        className="w-full h-16 sm:h-20 object-contain mx-auto drop-shadow-lg"
                      />
                      <div className="text-center mt-1">
                        <p className="text-xs text-blue-300 font-medium">Certificate</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Trophy Award */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="group"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 shadow-lg">
                      <img
                        src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-23%20at%2016.00.50_8a783049.png?updatedAt=1748113864722"
                        alt="Excellence Trophy"
                        className="w-full h-16 sm:h-20 object-contain mx-auto drop-shadow-lg"
                      />
                      <div className="text-center mt-1">
                        <p className="text-xs text-yellow-300 font-medium">Trophy</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Plaque Award */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    className="group"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105 shadow-lg">
                      <img
                        src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-23%20at%2016.00.49_8e4315da.png?updatedAt=1748114499850"
                        alt="Achievement Plaque"
                        className="w-full h-16 sm:h-20 object-contain mx-auto drop-shadow-lg"
                      />
                      <div className="text-center mt-1">
                        <p className="text-xs text-green-300 font-medium">Plaque</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* Curriculum Overview */}
      {/* Mobile-First Cute Curriculum */}
      <section className="py-4 sm:py-6 md:py-12 bg-white">
        <div className="container mx-auto px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-4 sm:mb-6"
          >
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-primary-800 mb-2 sm:mb-3">
              📚 Our 11 Subjects
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2">
              Comprehensive education for well-rounded development
            </p>
          </motion.div>

          {/* Mobile-Optimized Compact Subject Grid - First 6 */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5 sm:gap-2 mb-4">
            {subjects.slice(0, 6).map((subject, index) => {
              const style = getEnhancedSubjectStyle(subject);
              return (
                <motion.div
                  key={subject.name}
                  onClick={() => handleSubjectClick(subject.route)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`bg-gradient-to-br ${style.gradient} rounded-lg p-1.5 sm:p-2 text-center transition-all duration-300 hover:scale-110 relative overflow-hidden group cursor-pointer ${style.shadow} border-2 ${style.border}`}
                  style={{
                    boxShadow: `0 0 25px ${style.glow}40, 0 0 50px ${style.glow}20, inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)`,
                    filter: 'brightness(1.1) saturate(1.2)'
                  }}
                  whileHover={{
                    boxShadow: `0 0 40px ${style.glow}60, 0 0 80px ${style.glow}40, inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.3)`,
                    filter: 'brightness(1.3) saturate(1.4)',
                    scale: 1.15
                  }}
                >
                  {/* Sharp Silver Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 rounded-lg"></div>

                  {/* Top Silver Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-lg"></div>

                  {/* Side Silver Highlights */}
                  <div className="absolute top-0 left-0 w-0.5 bottom-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-l-lg"></div>
                  <div className="absolute top-0 right-0 w-0.5 bottom-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-r-lg"></div>

                  {/* Intense Neon Glow Effect */}
                  <div
                    className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"
                    style={{
                      background: `radial-gradient(circle at center, ${style.glow}30 0%, transparent 70%)`
                    }}
                  ></div>

                  {/* Pulsing Border Effect */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(45deg, ${style.glow}20, transparent, ${style.glow}20)`,
                      animation: 'pulse 2s infinite'
                    }}
                  ></div>

                  {/* Sharp Corner Reflections */}
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/40 rounded-full opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                  <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white/30 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="mb-1 flex justify-center">
                      {React.cloneElement(subject.icon, {
                        className: `w-3 h-3 sm:w-4 sm:h-4 ${style.text} drop-shadow-lg`,
                        style: {
                          filter: `drop-shadow(0 0 8px ${style.glow}) drop-shadow(0 0 4px ${style.glow}) drop-shadow(0 0 2px rgba(255,255,255,0.3))`
                        }
                      })}
                    </div>
                    <h3
                      className={`text-xs font-bold ${style.text} leading-tight`}
                      style={{
                        textShadow: `0 0 10px ${style.glow}, 0 0 20px ${style.glow}80, 0 1px 2px rgba(0,0,0,0.8), 0 0 3px rgba(255,255,255,0.3)`
                      }}
                    >
                      {subject.name}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>



          {/* Remaining Subjects */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5 sm:gap-2 mb-4">
            {subjects.slice(6).map((subject, index) => {
              const style = getEnhancedSubjectStyle(subject);
              return (
                <motion.div
                  key={subject.name}
                  onClick={() => handleSubjectClick(subject.route)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`bg-gradient-to-br ${style.gradient} rounded-lg p-1.5 sm:p-2 text-center transition-all duration-300 hover:scale-110 relative overflow-hidden group cursor-pointer ${style.shadow} border-2 ${style.border}`}
                  style={{
                    boxShadow: `0 0 25px ${style.glow}40, 0 0 50px ${style.glow}20, inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)`,
                    filter: 'brightness(1.1) saturate(1.2)'
                  }}
                  whileHover={{
                    boxShadow: `0 0 40px ${style.glow}60, 0 0 80px ${style.glow}40, inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.3)`,
                    filter: 'brightness(1.3) saturate(1.4)',
                    scale: 1.15
                  }}
                >
                  {/* Sharp Silver Reflection Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300 rounded-lg"></div>

                  {/* Top Silver Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-lg"></div>

                  {/* Side Silver Highlights */}
                  <div className="absolute top-0 left-0 w-0.5 bottom-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-l-lg"></div>
                  <div className="absolute top-0 right-0 w-0.5 bottom-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent rounded-r-lg"></div>

                  {/* Intense Neon Glow Effect */}
                  <div
                    className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300 rounded-lg"
                    style={{
                      background: `radial-gradient(circle at center, ${style.glow}30 0%, transparent 70%)`
                    }}
                  ></div>

                  {/* Pulsing Border Effect */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(45deg, ${style.glow}20, transparent, ${style.glow}20)`,
                      animation: 'pulse 2s infinite'
                    }}
                  ></div>

                  {/* Sharp Corner Reflections */}
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/40 rounded-full opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                  <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white/30 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="mb-1 flex justify-center">
                      {React.cloneElement(subject.icon, {
                        className: `w-3 h-3 sm:w-4 sm:h-4 ${style.text} drop-shadow-lg`,
                        style: {
                          filter: `drop-shadow(0 0 8px ${style.glow}) drop-shadow(0 0 4px ${style.glow}) drop-shadow(0 0 2px rgba(255,255,255,0.3))`
                        }
                      })}
                    </div>
                    <h3
                      className={`text-xs font-bold ${style.text} leading-tight`}
                      style={{
                        textShadow: `0 0 10px ${style.glow}, 0 0 20px ${style.glow}80, 0 1px 2px rgba(0,0,0,0.8), 0 0 3px rgba(255,255,255,0.3)`
                      }}
                    >
                      {subject.name}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>


        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* Academic Areas Section - Compact */}
      <section className="py-4 sm:py-6 md:py-8 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7115.HEIC"
            alt="Academic Areas Background"
            className="w-full h-full object-cover"
          />
          {/* Dark glass aero overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-4 sm:mb-6"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              🎯 Explore Our Academic Areas
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed max-w-2xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Specialized programs designed to nurture excellence in every student.
            </p>
          </motion.div>

          {/* Academic Areas Grid - Extremely Small 2 Column Layout */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto">
            {[
              {
                id: 1,
                title: "Core Academic",
                description: "11 BECE subjects including English, Math, Science & more.",
                icon: "📚",
                color: "from-blue-500 to-green-500",
                route: "/core-academic"
              },
              {
                id: 2,
                title: "STEM Excellence",
                description: "Science, Technology, Engineering & Mathematics programs.",
                icon: "🔬",
                color: "from-purple-500 to-cyan-500",
                route: "/stem-education"
              },
              {
                id: 3,
                title: "Creative Arts",
                description: "Ghanaian heritage through music, dance & visual arts.",
                icon: "🎨",
                color: "from-pink-500 to-rose-500",
                route: "/creative-arts"
              },
              {
                id: 4,
                title: "Character Values",
                description: "Moral foundations & ethical leadership development.",
                icon: "✨",
                color: "from-emerald-500 to-teal-500",
                route: "/character-education"
              }
            ].map((area, index) => (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-dark rounded-lg p-3 sm:p-4 md:p-5 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer backdrop-blur-lg"
              >
                {/* Compact Vertical Layout */}
                <div className="text-center">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br ${area.color} rounded-lg flex items-center justify-center text-lg sm:text-xl md:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 mx-auto mb-2 sm:mb-3`}>
                    {area.icon}
                  </div>
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors duration-300" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-tight mb-3 sm:mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    {area.description}
                  </p>
                  <Link
                    to={area.route}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                    className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-md shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm group-hover:scale-105"
                  >
                    Explore
                    <ChevronRight size={12} className="ml-1 sm:w-4 sm:h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compact Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-4 sm:mt-6"
          >
            <div className="glass-dark rounded-lg p-4 sm:p-5 border border-white/20 shadow-lg max-w-2xl mx-auto backdrop-blur-lg">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                🌟 Ready to Join Our Academic Excellence?
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 mb-3 sm:mb-4 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                Experience world-class education that has shaped thousands of graduates.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <Link
                  to="/apply-now"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
                >
                  Apply Now
                </Link>
                <Link
                  to="/schedule-visit"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
                >
                  Schedule Visit
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* Why Choose Our Academic Program - With Background Image */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7055.HEIC"
            alt="Academic Excellence Background"
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-6 sm:mb-8"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              🌟 Why Choose Our Academic Program?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Excellence in education since 1977 - Shaping tomorrow's leaders through innovative teaching and comprehensive development
            </p>
          </motion.div>

          {/* Enhanced Feature Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              { icon: '🏆', title: 'Premier School', desc: 'Leading educational institution in Ghana with 48+ years of excellence' },
              { icon: '👨‍🏫', title: 'Expert Faculty', desc: 'Highly qualified and dedicated teachers committed to student success' },
              { icon: '💡', title: 'Innovation', desc: 'Modern teaching methods integrated with cutting-edge technology' },
              { icon: '🌍', title: 'Global View', desc: 'International perspective preparing students for global opportunities' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{feature.icon}</div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{feature.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-200 leading-tight" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Achievement Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 max-w-2xl mx-auto"
          >
            {[
              { number: schoolStats.ageFormatted, label: 'Years of Excellence' },
              { number: '11', label: 'Subjects' },
              { number: schoolStats.totalStudentsFormatted.replace(',000+', 'K+'), label: 'Successful Graduates' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white/15 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 text-center border border-white/30"
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1 sm:mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{stat.number}</div>
                <div className="text-xs sm:text-sm md:text-base text-white font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* Academic Life at St. Louis - Image Gallery */}
      <section className="py-6 sm:py-8 md:py-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              📚 Academic Life at St. Louis
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Experience the vibrant academic environment where students thrive through interactive learning, collaborative projects,
              state-of-the-art facilities, and dedicated faculty guidance. Our campus buzzes with intellectual curiosity,
              creative expression, and the pursuit of excellence that has defined St. Louis Demonstration J.H.S for nearly five decades.
            </p>
          </motion.div>

          {/* Beautiful Image Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              {
                src: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_6995.HEIC",
                alt: "Interactive Learning Environment"
              },
              {
                src: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7010.HEIC",
                alt: "Collaborative Learning Approach"
              },
              {
                src: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7118.HEIC",
                alt: "Academic Excellence in Action"
              },
              {
                src: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7006.HEIC",
                alt: "Dedicated Faculty & Staff"
              }
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-contain bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bragging Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 sm:mt-12 md:mt-16 text-center max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-gray-200">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                🎓 Where Excellence Meets Innovation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2 text-sm sm:text-base">🏆 Academic Achievements</h4>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                    <li>• Top-performing students in national examinations</li>
                    <li>• Award-winning science and mathematics programs</li>
                    <li>• Outstanding BECE results year after year</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2 text-sm sm:text-base">🚧 Areas Needing Your Support</h4>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-1 font-medium">
                    <li>• <span className="text-red-600">Insufficient</span> computer laboratory equipment</li>
                    <li>• <span className="text-red-600">Limited</span> science laboratory resources</li>
                    <li>• <span className="text-red-600">Expanding</span> library collection needs</li>
                  </ul>
                  <p className="text-xs sm:text-sm text-orange-700 mt-2 font-medium italic">
                    Help us bridge these gaps to provide world-class education!
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-lg border-l-4 border-blue-500 shadow-lg">
                <p className="text-sm sm:text-base md:text-lg text-gray-800 italic font-semibold leading-relaxed" style={{ textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.1)' }}>
                  "At St. Louis Demonstration Junior High School, we don't just educate students - we shape future leaders,
                  innovators, and change-makers who will transform Ghana and the world. Our legacy of excellence
                  speaks for itself through the thousands of successful graduates who credit their foundation to our institution."
                </p>
                <p className="text-xs sm:text-sm text-blue-700 mt-3 font-medium text-right">
                  - St. Louis Demonstration JHS Mission
                </p>
              </div>


            </div>
          </motion.div>
        </div>
      </section>

      {/* Full-Width Donation Appeal Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-green-700 relative overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7109.HEIC?updatedAt=1748099386709"
            alt="St. Louis Demonstration JHS Campus"
            className="w-full h-full object-cover opacity-20"
            style={{ objectPosition: 'center center' }}
          />
          {/* Blue-Green overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-700/85 to-green-700/80"></div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#fff_1px,transparent_1px)] [background-size:30px_30px]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 md:mb-8" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}>
              🆘 Your Support Can Transform Lives!
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              While we excel in academics, our facilities need urgent upgrades to match our educational standards.
              Your generous donation will directly impact hundreds of students by providing modern equipment,
              enhanced laboratories, and expanded resources that will prepare them for tomorrow's challenges.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
              {[
                { number: schoolStats.currentEnrollmentFormatted, label: 'Students Impacted', icon: '👥' },
                { number: '11', label: 'Subjects Enhanced', icon: '📚' },
                { number: schoolStats.ageFormatted, label: 'Years of Excellence', icon: '🏆' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2">{stat.icon}</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300 mb-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-white font-medium" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Donation Button - Exact Same as Header/Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center mb-6 sm:mb-8"
            >
              <DonateButton variant="standalone" />
            </motion.div>

            {/* Bottom Message */}
            <p className="text-xs sm:text-sm md:text-base text-gray-200 italic max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Every donation, no matter the size, makes a meaningful difference in a student's educational journey.
              Together, we can build the future of education at St. Louis Demonstration Junior High School.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AcademicsPage;
