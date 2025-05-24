import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Lightbulb, Award, Globe, Palette, Calculator, Microscope, Music, Computer } from 'lucide-react';
import SectionDivider from '../components/common/SectionDivider';
import DonateButton from '../components/common/DonateButton';

const AcademicsPage: React.FC = () => {
  const subjects = [
    {
      name: 'English Language',
      icon: <BookOpen className="w-8 h-8" />,
      description: 'Comprehensive language arts program focusing on reading, writing, speaking, and listening skills.',
      color: 'bg-blue-500'
    },
    {
      name: 'Mathematics',
      icon: <Calculator className="w-8 h-8" />,
      description: 'Rigorous mathematical curriculum covering algebra, geometry, statistics, and problem-solving.',
      color: 'bg-green-500'
    },
    {
      name: 'Integrated Science',
      icon: <Microscope className="w-8 h-8" />,
      description: 'Hands-on science education combining physics, chemistry, and biology concepts.',
      color: 'bg-purple-500'
    },
    {
      name: 'Social Studies',
      icon: <Globe className="w-8 h-8" />,
      description: 'Exploration of history, geography, civics, and cultural studies for global awareness.',
      color: 'bg-orange-500'
    },
    {
      name: 'Religious & Moral Education',
      icon: <Users className="w-8 h-8" />,
      description: 'Character development through ethical reasoning and moral value formation.',
      color: 'bg-indigo-500'
    },
    {
      name: 'Ghanaian Language (Asante Twi)',
      icon: <Globe className="w-8 h-8" />,
      description: 'Cultural heritage preservation through native language and cultural studies.',
      color: 'bg-red-500'
    },
    {
      name: 'French',
      icon: <BookOpen className="w-8 h-8" />,
      description: 'International language skills for global communication and cultural exchange.',
      color: 'bg-pink-500'
    },
    {
      name: 'Career Technology',
      icon: <Lightbulb className="w-8 h-8" />,
      description: 'Practical skills in design, technology, and vocational preparation (formerly BDT).',
      color: 'bg-yellow-500'
    },
    {
      name: 'Computing (ICT)',
      icon: <Computer className="w-8 h-8" />,
      description: 'Digital literacy, programming, and technology skills for the modern world.',
      color: 'bg-cyan-500'
    },
    {
      name: 'Creative Arts & Design',
      icon: <Palette className="w-8 h-8" />,
      description: 'Artistic expression through visual arts, design, and creative projects.',
      color: 'bg-teal-500'
    },
    {
      name: 'Music',
      icon: <Music className="w-8 h-8" />,
      description: 'Musical education including theory, performance, and appreciation of various genres.',
      color: 'bg-violet-500'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-blue-600 via-blue-700 to-green-700 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#fff_1px,transparent_1px)] [background-size:30px_30px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center max-w-6xl mx-auto">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                Academic Excellence at St. Louis Demonstration JHS
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-100 leading-relaxed mb-4 lg:mb-6"
              >
                Our comprehensive curriculum develops well-rounded students through rigorous academics, technology integration, and character formation since 1977.
              </motion.p>

              {/* Achievement Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-3 py-1.5 sm:px-4 sm:py-2"
              >
                <span className="text-yellow-400 text-sm sm:text-base">🏆</span>
                <span className="text-yellow-300 text-xs sm:text-sm font-semibold">Award-Winning Institution</span>
              </motion.div>
            </motion.div>

            {/* Awards Collection - Tree Branch Layout */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem]">
                {/* Global Glow Effect */}
                <div className="absolute inset-0 bg-yellow-400/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-125"></div>

                {/* Main Award (Center-Right) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 group"
                >
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 sm:p-3 md:p-4 border border-white/20 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 rotate-3 hover:rotate-0">
                    <img
                      src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-23%20at%2016.00.50_8a783049.png?updatedAt=1748113864722"
                      alt="Academic Excellence Award - St. Louis Demonstration JHS"
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain mx-auto drop-shadow-2xl"
                    />
                    {/* Floating Particles */}
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400/60 rounded-full animate-ping"></div>
                    <div className="absolute bottom-2 left-2 w-1 h-1 bg-yellow-300/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </motion.div>

                {/* Second Award (Top-Left, Overlapping) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 10 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="absolute top-8 left-4 sm:top-12 sm:left-8 md:top-16 md:left-12 group z-10"
                >
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 sm:p-3 md:p-4 border border-white/20 hover:border-blue-400/50 transition-all duration-500 hover:scale-105 -rotate-12 hover:-rotate-6">
                    <img
                      src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-23%20at%2016.00.49_8e4315da.png?updatedAt=1748114499850"
                      alt="Achievement Award - St. Louis Demonstration JHS"
                      className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain mx-auto drop-shadow-2xl"
                    />
                    {/* Floating Particles */}
                    <div className="absolute top-1 right-1 w-1 h-1 bg-blue-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                </motion.div>

                {/* Third Award (Bottom-Center, Overlapping) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: -8 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:bottom-8 md:bottom-12 group z-20"
                >
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 sm:p-3 md:p-4 border border-white/20 hover:border-green-400/50 transition-all duration-500 hover:scale-105 rotate-6 hover:rotate-2">
                    <img
                      src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-23%20at%2015.25.49_a13217f5.png?updatedAt=1748114499952"
                      alt="Recognition Award - St. Louis Demonstration JHS"
                      className="w-18 h-18 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain mx-auto drop-shadow-2xl"
                    />
                    {/* Floating Particles */}
                    <div className="absolute top-1 left-1 w-1 h-1 bg-green-400/60 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute bottom-2 right-1 w-1.5 h-1.5 bg-green-300/40 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                  </div>
                </motion.div>

                {/* Connecting Lines (Tree Branch Effect) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 400">
                  <motion.path
                    d="M200 200 Q150 120 80 80 M200 200 Q250 300 200 350 M200 200 Q320 180 380 200"
                    stroke="rgba(251, 191, 36, 0.3)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.2 }}
                  />
                </svg>

                {/* Awards Label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-600 via-blue-600 to-green-600 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full shadow-lg"
                >
                  🏆 Award-Winning Excellence 🏆
                </motion.div>
              </div>
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
            {subjects.slice(0, 6).map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className={`${subject.color} rounded-md shadow-lg border-2 border-white/20 p-1.5 sm:p-2 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group`}
                style={{
                  boxShadow: `0 0 20px ${subject.color.includes('blue') ? '#3b82f6' :
                                        subject.color.includes('green') ? '#10b981' :
                                        subject.color.includes('purple') ? '#8b5cf6' :
                                        subject.color.includes('orange') ? '#f97316' :
                                        subject.color.includes('indigo') ? '#6366f1' :
                                        subject.color.includes('red') ? '#ef4444' :
                                        subject.color.includes('pink') ? '#ec4899' :
                                        subject.color.includes('yellow') ? '#eab308' :
                                        subject.color.includes('cyan') ? '#06b6d4' :
                                        subject.color.includes('teal') ? '#14b8a6' :
                                        '#8b5cf6'}40, 0 0 40px ${subject.color.includes('blue') ? '#3b82f6' :
                                        subject.color.includes('green') ? '#10b981' :
                                        subject.color.includes('purple') ? '#8b5cf6' :
                                        subject.color.includes('orange') ? '#f97316' :
                                        subject.color.includes('indigo') ? '#6366f1' :
                                        subject.color.includes('red') ? '#ef4444' :
                                        subject.color.includes('pink') ? '#ec4899' :
                                        subject.color.includes('yellow') ? '#eab308' :
                                        subject.color.includes('cyan') ? '#06b6d4' :
                                        subject.color.includes('teal') ? '#14b8a6' :
                                        '#8b5cf6'}20`
                }}
              >
                {/* Neon glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-1 flex justify-center">
                    {React.cloneElement(subject.icon, { className: "w-3 h-3 sm:w-4 sm:h-4 text-white drop-shadow-lg" })}
                  </div>
                  <h3 className="text-xs font-bold text-white leading-tight drop-shadow-lg">{subject.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>



          {/* Remaining Subjects */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5 sm:gap-2 mb-4">
            {subjects.slice(6).map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className={`${subject.color} rounded-md shadow-lg border-2 border-white/20 p-1.5 sm:p-2 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group`}
                style={{
                  boxShadow: `0 0 20px ${subject.color.includes('blue') ? '#3b82f6' :
                                        subject.color.includes('green') ? '#10b981' :
                                        subject.color.includes('purple') ? '#8b5cf6' :
                                        subject.color.includes('orange') ? '#f97316' :
                                        subject.color.includes('indigo') ? '#6366f1' :
                                        subject.color.includes('red') ? '#ef4444' :
                                        subject.color.includes('pink') ? '#ec4899' :
                                        subject.color.includes('yellow') ? '#eab308' :
                                        subject.color.includes('cyan') ? '#06b6d4' :
                                        subject.color.includes('teal') ? '#14b8a6' :
                                        '#8b5cf6'}40, 0 0 40px ${subject.color.includes('blue') ? '#3b82f6' :
                                        subject.color.includes('green') ? '#10b981' :
                                        subject.color.includes('purple') ? '#8b5cf6' :
                                        subject.color.includes('orange') ? '#f97316' :
                                        subject.color.includes('indigo') ? '#6366f1' :
                                        subject.color.includes('red') ? '#ef4444' :
                                        subject.color.includes('pink') ? '#ec4899' :
                                        subject.color.includes('yellow') ? '#eab308' :
                                        subject.color.includes('cyan') ? '#06b6d4' :
                                        subject.color.includes('teal') ? '#14b8a6' :
                                        '#8b5cf6'}20`
                }}
              >
                {/* Neon glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="mb-1 flex justify-center">
                    {React.cloneElement(subject.icon, { className: "w-3 h-3 sm:w-4 sm:h-4 text-white drop-shadow-lg" })}
                  </div>
                  <h3 className="text-xs font-bold text-white leading-tight drop-shadow-lg">{subject.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

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
              { icon: '🏆', title: 'Premier School', desc: 'Leading educational institution in Ghana with 47+ years of excellence' },
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
              { number: '47+', label: 'Years of Excellence' },
              { number: '11', label: 'Core Subjects' },
              { number: '30K+', label: 'Successful Graduates' }
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
              creative expression, and the pursuit of excellence that has defined St. Louis Educational Institute for nearly five decades.
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
                { number: '500+', label: 'Students Impacted', icon: '👥' },
                { number: '11', label: 'Subjects Enhanced', icon: '📚' },
                { number: '47+', label: 'Years of Excellence', icon: '🏆' }
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
    </>
  );
};

export default AcademicsPage;
