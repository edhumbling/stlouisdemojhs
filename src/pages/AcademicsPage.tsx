import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Lightbulb, Award, Globe, Palette, Calculator, Microscope, Music, Computer } from 'lucide-react';
import SectionDivider from '../components/common/SectionDivider';

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center px-3"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Academic Excellence at St. Louis Educational Institute
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xs sm:text-sm md:text-base text-gray-100 max-w-2xl mx-auto leading-relaxed"
            >
              Our comprehensive curriculum develops well-rounded students through rigorous academics, technology integration, and character formation since 1977.
            </motion.p>
          </motion.div>
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

          {/* First Image - Distributed */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 rounded-lg overflow-hidden shadow-sm relative"
          >
            <img
              src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_6995.HEIC"
              alt="Interactive Learning"
              className="w-full h-32 sm:h-40 md:h-48 object-contain bg-gray-100"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            {/* Text overlay */}
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-xs sm:text-sm font-medium drop-shadow-lg">
                Interactive Learning Environment
              </p>
            </div>
          </motion.div>

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

          {/* Second Image - Distributed */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden shadow-sm relative"
          >
            <img
              src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7010.HEIC"
              alt="Collaborative Learning"
              className="w-full h-32 sm:h-40 md:h-48 object-contain bg-gray-100"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            {/* Text overlay */}
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-xs sm:text-sm font-medium drop-shadow-lg">
                Collaborative Learning Approach
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* Mobile-First Academic Features */}
      <section className="py-4 sm:py-6 md:py-12 bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-4 sm:mb-6"
          >
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-primary-800 mb-2 sm:mb-3">
              🌟 Why Choose Our Academic Program?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-2">
              Excellence in education since 1977
            </p>
          </motion.div>

          {/* Compact Feature Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
            {[
              { icon: '🏆', title: 'Premier School', desc: 'Leading educational institution' },
              { icon: '👨‍🏫', title: 'Expert Faculty', desc: 'Qualified teachers' },
              { icon: '💡', title: 'Innovation', desc: 'Modern teaching methods' },
              { icon: '🌍', title: 'Global View', desc: 'International perspective' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-lg p-2 sm:p-3 shadow-sm text-center hover:shadow-md transition-all duration-200"
              >
                <div className="text-lg sm:text-xl mb-1">{feature.icon}</div>
                <h3 className="text-xs font-semibold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600 leading-tight">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Third Image - Distributed */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 rounded-lg overflow-hidden shadow-sm relative"
          >
            <img
              src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7055.HEIC"
              alt="Modern Facilities"
              className="w-full h-32 sm:h-40 md:h-48 object-contain bg-gray-100"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            {/* Text overlay */}
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-xs sm:text-sm font-medium drop-shadow-lg">
                Modern Learning Facilities
              </p>
            </div>
          </motion.div>

          {/* Achievement Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            {[
              { number: '47+', label: 'Years' },
              { number: '11', label: 'Subjects' },
              { number: '30K+', label: 'Graduates' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg p-2 sm:p-3 text-center shadow-sm"
              >
                <div className="text-lg sm:text-xl font-bold text-yellow-600">{stat.number}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Fourth Image - Distributed */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 rounded-lg overflow-hidden shadow-sm relative"
          >
            <img
              src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7118.HEIC"
              alt="Academic Excellence"
              className="w-full h-32 sm:h-40 md:h-48 object-contain bg-gray-100"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            {/* Text overlay */}
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-xs sm:text-sm font-medium drop-shadow-lg">
                Academic Excellence in Action
              </p>
            </div>
          </motion.div>

          {/* Final Image - Distributed */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden shadow-sm relative"
          >
            <img
              src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7006.HEIC"
              alt="Dedicated Faculty"
              className="w-full h-32 sm:h-40 md:h-48 object-contain bg-gray-100"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            {/* Text overlay */}
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-white text-xs sm:text-sm font-medium drop-shadow-lg">
                Dedicated Faculty & Staff
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AcademicsPage;
