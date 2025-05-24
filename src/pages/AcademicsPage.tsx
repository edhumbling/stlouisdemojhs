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
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Academic Excellence at St. Louis Demonstration JHS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-100 max-w-3xl mx-auto"
            >
              Our comprehensive curriculum is designed to develop well-rounded students through rigorous academics,
              technology integration, cultural awareness, and character formation since 1977.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* Curriculum Overview */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-6">
              Our Comprehensive Curriculum
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              St. Louis Educational Institute offers 11 core subjects that provide students with a well-rounded education,
              preparing them for academic success and personal growth. Having successfully graduated over <span className="text-primary-600 font-semibold">10,000+ students</span>, our proven curriculum continues to shape future leaders.
            </p>
          </motion.div>

          {/* Subjects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className={`${subject.color} p-4 text-white`}>
                  <div className="flex items-center gap-3">
                    {subject.icon}
                    <h3 className="text-lg font-semibold">{subject.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed">{subject.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* Academic Life Gallery */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-6">
              Academic Life at St. Louis Demonstration
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              Experience the vibrant learning environment where students engage with our comprehensive curriculum
              through hands-on activities, collaborative projects, and innovative teaching methods.
            </p>
          </motion.div>

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_6995.HEIC',
                title: 'Interactive Learning',
                description: 'Students engage in hands-on activities that bring theoretical concepts to life.'
              },
              {
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7010.HEIC',
                title: 'Collaborative Projects',
                description: 'Group work and peer learning foster teamwork and communication skills.'
              },
              {
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7055.HEIC',
                title: 'Modern Facilities',
                description: 'State-of-the-art classrooms equipped with the latest educational technology.'
              },
              {
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7118.HEIC',
                title: 'Academic Excellence',
                description: 'Students consistently achieve outstanding results across all subject areas.'
              },
              {
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7006.HEIC',
                title: 'Dedicated Faculty',
                description: 'Expert teachers provide personalized attention and guidance to every student.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Image Container */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-bold mb-2 text-shadow-lg">{item.title}</h3>
                    <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {item.description}
                    </p>
                  </div>

                  {/* Decorative Corner Element */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400/20 rounded-full backdrop-blur-sm border border-yellow-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-full rounded-full bg-yellow-400/40 animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* Academic Excellence Features */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-6">
              Why Choose Our Academic Program?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <Award className="w-10 h-10 text-yellow-500" />,
                title: 'Demonstration School Status',
                description: 'As Ghana\'s premier demonstration school, we pioneer innovative teaching methods and educational excellence.'
              },
              {
                icon: <Users className="w-10 h-10 text-blue-500" />,
                title: 'Expert Faculty',
                description: 'Highly qualified teachers with extensive experience in their respective subject areas.'
              },
              {
                icon: <Lightbulb className="w-10 h-10 text-green-500" />,
                title: 'Innovative Methods',
                description: 'Modern teaching approaches that engage students and promote active learning.'
              },
              {
                icon: <Globe className="w-10 h-10 text-purple-500" />,
                title: 'Global Perspective',
                description: 'Curriculum that prepares students for success in an interconnected world.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Achievement with Background Image */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7118.HEIC"
            alt="St. Louis Demonstration Academic Excellence"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center center' }}
          />
          {/* Multi-layer Overlay for Perfect Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/80 to-green-800/85"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.6)'
                }}>
              Academic Excellence Since <span className="text-yellow-400">1977</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-100 mb-8 max-w-3xl mx-auto"
               style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
              For over four decades, St. Louis Demonstration JHS has been at the forefront of educational innovation in Ghana,
              consistently producing students who excel in their academic pursuits and become leaders in their communities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { number: '47+', label: 'Years of Excellence' },
                { number: '11', label: 'Subjects Taught' },
                { number: '100%', label: 'Student Success Rate' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-gray-200">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AcademicsPage;
