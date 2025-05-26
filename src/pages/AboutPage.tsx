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

      {/* History Section with Prominent Zoomable Image & Comprehensive Story */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* Extremely Fluid Glass Crispy Anamorphic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/60 to-green-50/80 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0.05),rgba(34,197,94,0.05),rgba(59,130,246,0.05))] animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start">
            {/* Large Prominent Zoomable School Image */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-1"
            >
              <div className="group relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-sm border border-white/30 group-hover:scale-105 transition-all duration-500 cursor-zoom-in">
                  <img
                    src="https://www.linkedin.com/posts/eaboyeji_there-is-a-fundamental-issue-with-ai-no-activity-7332330750119235584-1bQY?utm_source=share&utm_medium=member_desktop&rcm=ACoAACjV3qUB6OL14lCQwrfKu9hB7eh_LEcVquQ"
                    alt="St. Louis Demonstration JHS - Our School Community"
                    className="w-full h-auto group-hover:scale-110 transition-transform duration-700"
                    onClick={() => window.open('https://www.linkedin.com/posts/eaboyeji_there-is-a-fundamental-issue-with-ai-no-activity-7332330750119235584-1bQY?utm_source=share&utm_medium=member_desktop&rcm=ACoAACjV3qUB6OL14lCQwrfKu9hB7eh_LEcVquQ', '_blank')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-sm font-medium backdrop-blur-sm bg-black/30 rounded-lg px-3 py-2">Click to view full image</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Comprehensive History Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-2"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <History size={20} className="text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-green-800 bg-clip-text text-transparent">
                  Our Remarkable Journey Since 1977
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Foundation Era */}
                <div className="glass-ultra rounded-2xl p-4 sm:p-5 border border-white/40 shadow-lg backdrop-blur-xl">
                  <h3 className="text-base sm:text-lg font-bold text-blue-800 mb-2 sm:mb-3">🏗️ Foundation Era (1977-1990s)</h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    <strong>St. Louis Demonstration Junior High School</strong> was established in 1977 as part of the
                    prestigious St. Louis Educational Complex in Kumasi, Ghana. Founded with the vision of providing
                    quality education rooted in Catholic values, the school began with modest facilities but an
                    unwavering commitment to excellence.
                  </p>
                </div>

                {/* Growth & Challenges */}
                <div className="glass-ultra rounded-2xl p-4 sm:p-5 border border-white/40 shadow-lg backdrop-blur-xl">
                  <h3 className="text-base sm:text-lg font-bold text-purple-800 mb-2 sm:mb-3">⚡ Growth Through Challenges (1990s-2000s)</h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                    The school faced significant challenges during Ghana's economic difficulties of the 1990s.
                    Limited resources, infrastructure constraints, and the need to maintain academic standards
                    while serving a growing student population tested our resilience. Despite these obstacles,
                    our dedicated staff and community support kept the vision alive.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    During this period, we developed our core values of perseverance, community spirit, and
                    academic excellence that continue to define us today.
                  </p>
                </div>

                {/* Leadership Legacy */}
                <div className="glass-ultra rounded-2xl p-4 sm:p-5 border border-white/40 shadow-lg backdrop-blur-xl">
                  <h3 className="text-base sm:text-lg font-bold text-green-800 mb-2 sm:mb-3">👑 Transformational Leadership</h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                    Under the visionary leadership of <strong>Mrs. Millicent Otoo</strong>, our former headmistress,
                    St. Louis Demonstration JHS experienced unprecedented growth and recognition. Mrs. Otoo's
                    innovative approaches to education, emphasis on discipline, and commitment to holistic
                    development elevated the school to new heights during her tenure.
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    Her legacy of excellence continues today under <strong>Mrs. Michelle Acquaye</strong>,
                    who builds upon this foundation while adapting to modern educational needs and global standards.
                  </p>
                </div>

                {/* Modern Era */}
                <div className="glass-ultra rounded-2xl p-4 sm:p-5 border border-white/40 shadow-lg backdrop-blur-xl">
                  <h3 className="text-base sm:text-lg font-bold text-orange-800 mb-2 sm:mb-3">🚀 Modern Era & Future Vision</h3>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    Today, with over <strong>30,000 graduates</strong> and <strong>800+ current students</strong>,
                    we stand as a testament to educational excellence in Ghana. Our motto <em>"Primus Intaparis"</em>
                    (The Best Among the Rest) reflects not just our aspirations, but our proven track record of
                    producing leaders, innovators, and responsible citizens who contribute meaningfully to society.
                  </p>
                </div>

                {/* Quote */}
                <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 p-4 sm:p-5 rounded-2xl border-l-4 border-gradient-to-b from-blue-500 to-green-500 backdrop-blur-sm">
                  <p className="text-xs sm:text-sm text-blue-900 font-medium italic">
                    "From humble beginnings to remarkable achievements, our journey reflects the power of
                    vision, perseverance, and community. We continue building tomorrow's leaders through
                    quality education, character formation, and unwavering commitment to excellence."
                  </p>
                  <p className="text-xs text-blue-700 mt-2 font-semibold">- St. Louis Demonstration JHS Legacy</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* Mission, Vision & Values Section - Fluid Glass Anamorphic Design */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* Extremely Fluid Glass Crispy Anamorphic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/70 via-blue-50/60 to-green-50/70 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.08),transparent_70%),radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_70%),radial-gradient(ellipse_at_bottom_left,rgba(34,197,94,0.08),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_45deg_at_30%_70%,rgba(147,51,234,0.03),rgba(59,130,246,0.03),rgba(34,197,94,0.03),rgba(147,51,234,0.03))] animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-12"
          >
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Target size={16} className="sm:w-5 sm:h-5 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-800 via-blue-800 to-green-800 bg-clip-text text-transparent">
                Our Purpose & Values
              </h2>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Guiding principles that shape our educational approach and community culture.
            </p>
          </motion.div>

          {/* Mobile 2-Column, Desktop 3-Column Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">

            {/* Mission Card - Glowing */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative col-span-2 md:col-span-1"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 animate-pulse"></div>
              <div className="relative glass-ultra rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] transition-all duration-500 border border-white/50 backdrop-blur-2xl">
                <div className="text-center mb-3 sm:mb-4 md:mb-6">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-lg sm:text-2xl md:text-3xl mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    🎯
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-700 to-cyan-700 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4">Our Mission</h3>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed text-center">
                  To provide quality education through the Ghana Education Service curriculum, developing
                  critical thinking, creativity, and character while preparing students for BECE success
                  and lifelong learning in a rapidly changing world.
                </p>
              </div>
            </motion.div>

            {/* Vision Card - Glowing */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative col-span-2 md:col-span-1"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500/30 via-emerald-500/30 to-green-500/30 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 animate-pulse"></div>
              <div className="relative glass-ultra rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] transition-all duration-500 border border-white/50 backdrop-blur-2xl">
                <div className="text-center mb-3 sm:mb-4 md:mb-6">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-lg sm:text-2xl md:text-3xl mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    🌟
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4">Our Vision</h3>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed text-center">
                  To become a world-class educational institution that produces globally competitive,
                  morally upright, and innovative leaders who contribute meaningfully to Ghana's
                  development and the global community.
                </p>
              </div>
            </motion.div>

            {/* Core Values Card - Glowing */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative col-span-2 md:col-span-1"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-yellow-500/30 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500 animate-pulse"></div>
              <div className="relative glass-ultra rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] transition-all duration-500 border border-white/50 backdrop-blur-2xl">
                <div className="text-center mb-3 sm:mb-4 md:mb-6">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center text-lg sm:text-2xl md:text-3xl mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    💎
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-yellow-700 to-orange-700 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4">Core Values</h3>
                </div>
                <div className="space-y-1 sm:space-y-2 md:space-y-3">
                  {[
                    { icon: "🤝", value: "Unity", desc: "Building strong community bonds" },
                    { icon: "🏆", value: "Excellence", desc: "Striving for the highest standards" },
                    { icon: "⚖️", value: "Integrity", desc: "Maintaining moral uprightness" },
                    { icon: "🌱", value: "Growth", desc: "Continuous learning and development" },
                    { icon: "❤️", value: "Service", desc: "Contributing to community and nation" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm md:text-base flex-shrink-0">{item.icon}</span>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold text-gray-800">{item.value}</div>
                        <div className="text-xs text-gray-600 hidden sm:block">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* Current Facilities & Development Needs Section - Fluid Glass Anamorphic */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* Extremely Fluid Glass Crispy Anamorphic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/70 via-white/50 to-orange-50/70 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.08),transparent_60%),radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_40%_60%,rgba(6,182,212,0.04),rgba(59,130,246,0.04),rgba(249,115,22,0.04),rgba(6,182,212,0.04))] animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-6 sm:mb-8 md:mb-12"
          >
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <BookOpen size={16} className="sm:w-5 sm:h-5 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-800 via-blue-800 to-orange-800 bg-clip-text text-transparent">
                Our Facilities & Development Vision
              </h2>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
              Building towards a modern educational environment that prepares our students for the global digital age.
            </p>
          </motion.div>

          {/* Current Facilities Grid - Mobile 2-Column, Desktop 3-Column */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-6 sm:mb-8 md:mb-12">
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
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7114.HEIC',
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
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-25%20at%2017.50.56_49e6cf17.jpg?updatedAt=1748196651837',
                status: 'needs-improvement',
                icon: '👩‍🏫'
              },
              {
                title: 'Science Laboratory',
                description: 'We are actively seeking support to establish a modern science laboratory for hands-on learning.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7121.HEIC',
                status: 'planned',
                icon: '🔬'
              },
              {
                title: 'Library & Resource Center',
                description: 'Planning to create a modern library with digital resources and quiet study areas for our students.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7107.HEIC',
                status: 'planned',
                icon: '📖'
              }
            ].map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Glowing Background */}
                <div className={`absolute -inset-1 rounded-3xl blur-lg transition-all duration-500 animate-pulse ${
                  facility.status === 'good' ? 'bg-gradient-to-r from-green-500/30 via-emerald-500/30 to-green-500/30' :
                  facility.status === 'needs-improvement' ? 'bg-gradient-to-r from-yellow-500/30 via-orange-500/30 to-yellow-500/30' :
                  'bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30'
                } group-hover:blur-xl`}></div>

                {/* Card Content */}
                <div className="relative glass-ultra rounded-2xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)] transition-all duration-500 border border-white/50 backdrop-blur-2xl">
                  <div className="relative h-24 sm:h-32 md:h-40 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                    {/* Status Badge - Glowing */}
                    <div className={`absolute top-1 sm:top-2 right-1 sm:right-2 px-1 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                      facility.status === 'good' ? 'bg-green-500/90 text-white shadow-green-500/50' :
                      facility.status === 'needs-improvement' ? 'bg-yellow-500/90 text-black shadow-yellow-500/50' :
                      'bg-blue-500/90 text-white shadow-blue-500/50'
                    }`}>
                      {facility.status === 'good' ? '✅ Good' :
                       facility.status === 'needs-improvement' ? '🔧 Improving' :
                       '🚧 Planned'}
                    </div>

                    {/* Icon Overlay - Glowing */}
                    <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-6 h-6 sm:w-8 sm:h-8 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center text-sm sm:text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {facility.icon}
                    </div>
                  </div>

                  <div className="p-2 sm:p-3 md:p-4">
                    <h3 className={`text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1 sm:mb-2 bg-gradient-to-r bg-clip-text text-transparent ${
                      facility.status === 'good' ? 'from-green-700 to-emerald-700' :
                      facility.status === 'needs-improvement' ? 'from-yellow-700 to-orange-700' :
                      'from-blue-700 to-cyan-700'
                    }`}>
                      {facility.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
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