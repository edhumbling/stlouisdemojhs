import React from 'react';
import { motion } from 'framer-motion';
import { History, Award, Target, BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionDivider from '../components/common/SectionDivider';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              About Our School
            </h1>
          </div>
        </div>
      </div>

      {/* Compact Hero Section with School Image */}
      <section className="py-6 sm:py-8 md:py-10 relative overflow-hidden">
        {/* School Gate Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/9008070f-6dc0-47b7-a52d-5ef4670a8396.jpg"
            alt="St. Louis Demonstration JHS School Gate"
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
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            >
              🏫 About St. Louis Demonstration JHS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              Discover our journey, mission, and vision as we build towards becoming a world-class educational institution.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* History Section with Prominent School Image */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
            {/* Large Prominent School Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-1"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl"
                   style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                <img
                  src="https://www.linkedin.com/posts/eaboyeji_there-is-a-fundamental-issue-with-ai-no-activity-7332330750119235584-1bQY?utm_source=share&utm_medium=member_desktop&rcm=ACoAACjV3qUB6OL14lCQwrfKu9hB7eh_LEcVquQ"
                  alt="St. Louis Demonstration JHS - Our School Community"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            {/* History Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-2"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <History size={20} className="text-green-600 mr-3 flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Our Journey Since 1977</h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  <strong>St. Louis Demonstration Junior High School</strong> was established in 1977 as part of the
                  prestigious St. Louis Educational Complex in Kumasi, Ghana. For over 47 years, we have been
                  committed to providing quality education to the youth of Ghana.
                </p>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Our school operates under the motto <em>"Primus Intaparis"</em> (The Best Among the Rest),
                  reflecting our dedication to excellence in education. We currently serve over 800 students
                  with a comprehensive curriculum that prepares them for the Basic Education Certificate
                  Examination (BECE) and beyond.
                </p>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Under the leadership of our current Headmistress, <strong>Mrs. Michelle Acquaye</strong>,
                  we continue to maintain high academic standards while fostering character development,
                  discipline, and moral values in our students.
                </p>

                <div className="bg-blue-50 p-4 sm:p-5 rounded-xl border-l-4 border-blue-500">
                  <p className="text-sm sm:text-base text-blue-800 font-medium">
                    "Building tomorrow's leaders through quality education, character formation, and academic excellence."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* Mission, Vision & Values Section - Apple Design */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <Target size={20} className="text-green-600 mr-3 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Our Purpose & Values</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Guiding principles that shape our educational approach and community culture.
            </p>
          </motion.div>

          {/* Three-Column Layout for Mobile Cuteness */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-light rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4 shadow-lg">
                  🎯
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700 mb-3 sm:mb-4">Our Mission</h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed text-center">
                To provide quality education through the Ghana Education Service curriculum, developing
                critical thinking, creativity, and character while preparing students for BECE success
                and lifelong learning in a rapidly changing world.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-light rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4 shadow-lg">
                  🌟
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-700 mb-3 sm:mb-4">Our Vision</h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed text-center">
                To become a world-class educational institution that produces globally competitive,
                morally upright, and innovative leaders who contribute meaningfully to Ghana's
                development and the global community.
              </p>
            </motion.div>

            {/* Core Values Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-light rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 md:col-span-1"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4 shadow-lg">
                  💎
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-700 mb-3 sm:mb-4">Core Values</h3>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { icon: "🤝", value: "Unity", desc: "Building strong community bonds" },
                  { icon: "🏆", value: "Excellence", desc: "Striving for the highest standards" },
                  { icon: "⚖️", value: "Integrity", desc: "Maintaining moral uprightness" },
                  { icon: "🌱", value: "Growth", desc: "Continuous learning and development" },
                  { icon: "❤️", value: "Service", desc: "Contributing to community and nation" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <span className="text-sm sm:text-base flex-shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-gray-800">{item.value}</div>
                      <div className="text-xs text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* Current Facilities & Development Needs Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <BookOpen size={20} className="text-green-600 mr-3 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Our Facilities & Development Vision</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Building towards a modern educational environment that prepares our students for the global digital age.
            </p>
          </motion.div>

          {/* Current Facilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {[
              {
                title: 'Classrooms',
                description: 'Traditional classrooms serving our 800+ students. We are working to modernize these spaces with smart boards and improved furniture.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7109.HEIC?updatedAt=1748099386709',
                status: 'needs-improvement',
                icon: '📚'
              },
              {
                title: 'Computer Lab',
                description: 'Basic computer lab that requires significant upgrades to meet modern technology education standards.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7033.HEIC?updatedAt=1748185379182',
                status: 'needs-improvement',
                icon: '💻'
              },
              {
                title: 'School Environment',
                description: 'Spacious grounds providing safe spaces for students to play, learn, and develop social skills.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7035.HEIC?updatedAt=1748185340320',
                status: 'good',
                icon: '🌳'
              },
              {
                title: 'Teacher Preparation Rooms',
                description: 'Dedicated spaces for teachers to prepare lessons and collaborate. These areas need modernization.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7109.HEIC?updatedAt=1748099386709',
                status: 'needs-improvement',
                icon: '👩‍🏫'
              },
              {
                title: 'Science Laboratory',
                description: 'We are actively seeking support to establish a modern science laboratory for hands-on learning.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7033.HEIC?updatedAt=1748185379182',
                status: 'planned',
                icon: '🔬'
              },
              {
                title: 'Library & Resource Center',
                description: 'Planning to create a modern library with digital resources and quiet study areas for our students.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7035.HEIC?updatedAt=1748185340320',
                status: 'planned',
                icon: '📖'
              }
            ].map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative h-32 sm:h-40 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {/* Status Badge */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                    facility.status === 'good' ? 'bg-green-100 text-green-800' :
                    facility.status === 'needs-improvement' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {facility.status === 'good' ? '✅ Good' :
                     facility.status === 'needs-improvement' ? '🔧 Improving' :
                     '🚧 Planned'}
                  </div>
                  {/* Icon Overlay */}
                  <div className="absolute top-2 left-2 w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center text-lg">
                    {facility.icon}
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2">{facility.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{facility.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Support Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-2xl p-6 sm:p-8 md:p-10 border border-blue-100 shadow-lg max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4 sm:mb-6 shadow-lg">
                🤝
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Help Us Build a World-Class Learning Environment
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                We are continuously seeking support from individuals, organizations, and partners to modernize our facilities
                and create a learning environment that prepares our students to compete in the rapidly changing global world.
                Your contribution can help us establish modern science labs, upgrade our computer facilities, create a
                well-equipped library, and enhance our overall educational infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="/donate"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.4),0_0_60px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8),0_0_50px_rgba(239,68,68,0.6),0_0_75px_rgba(239,68,68,0.4)] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base relative overflow-hidden"
                >
                  <span className="w-4 h-4 mr-2 fill-current relative z-10 text-white">❤️</span>
                  <span className="relative z-10 font-bold text-white">Support Our Vision</span>
                  <span className="absolute inset-0 bg-red-500 opacity-30 rounded-full"></span>
                  <span className="absolute -inset-1 bg-red-500 opacity-20 blur-sm rounded-full"></span>
                </a>
                <a
                  href="/contact"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-600 text-sm sm:text-base"
                >
                  Partner With Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* Community Impact & Future Goals Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-green-700 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <Award size={20} className="text-yellow-300 mr-3 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Our Impact & Aspirations</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-100 max-w-3xl mx-auto">
              Building on 47 years of educational excellence while working towards our vision of becoming a world-class institution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Current Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4">
                  🎓
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-yellow-300 mb-2 sm:mb-3">Educational Legacy</h3>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <p className="text-white/90">47+ years of service</p>
                  <p className="text-white/90">30,000+ graduates</p>
                  <p className="text-white/90">800+ current students</p>
                  <p className="text-white/90">Excellent BECE results</p>
                </div>
              </div>
            </motion.div>

            {/* Current Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500/20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4">
                  💪
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-green-300 mb-2 sm:mb-3">Current Strengths</h3>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <p className="text-white/90">Dedicated teaching staff</p>
                  <p className="text-white/90">Strong community support</p>
                  <p className="text-white/90">Comprehensive curriculum</p>
                  <p className="text-white/90">Character development focus</p>
                </div>
              </div>
            </motion.div>

            {/* Future Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 sm:col-span-2 lg:col-span-1"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4">
                  🚀
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-blue-300 mb-2 sm:mb-3">Future Vision</h3>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  <p className="text-white/90">Modern science laboratories</p>
                  <p className="text-white/90">Advanced computer facilities</p>
                  <p className="text-white/90">Digital library resources</p>
                  <p className="text-white/90">Global competitiveness</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-8 sm:mt-12"
          >
            <p className="text-sm sm:text-base text-gray-200 mb-4 sm:mb-6 max-w-2xl mx-auto">
              Join us in our journey to transform St. Louis Demonstration JHS into a world-class educational institution
              that prepares students for the challenges and opportunities of tomorrow.
            </p>
            <a
              href="/donate"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.4),0_0_60px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8),0_0_50px_rgba(239,68,68,0.6),0_0_75px_rgba(239,68,68,0.4)] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base relative overflow-hidden"
            >
              <span className="w-4 h-4 mr-2 fill-current relative z-10 text-white">❤️</span>
              <span className="relative z-10 font-bold text-white">Be Part of Our Story</span>
              <span className="absolute inset-0 bg-red-500 opacity-30 rounded-full"></span>
              <span className="absolute -inset-1 bg-red-500 opacity-20 blur-sm rounded-full"></span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;