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

      {/* History Section - Dark Aero with School Background */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* School Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>

        <div className="w-full px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-7xl mx-auto">
            {/* Large Prominent Zoomable School Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-1"
            >
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-green-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group-hover:scale-105 transition-all duration-500 cursor-zoom-in backdrop-blur-sm">
                  <img
                    src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/afffabd4-9771-46d5-b98a-a0adf6a5a3d0.png?updatedAt=1748272090100"
                    alt="St. Louis Demonstration JHS - Our School Community"
                    className="w-full h-auto group-hover:scale-110 transition-transform duration-700"
                    onClick={() => window.open('https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/afffabd4-9771-46d5-b98a-a0adf6a5a3d0.png?updatedAt=1748272090100', '_blank')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-sm font-medium backdrop-blur-sm bg-black/50 rounded-lg px-3 py-2">Click to view full image</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Comprehensive History Essay */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-2"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <History size={20} className="text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Our Remarkable Journey Since 1977
                </h2>
              </div>

              {/* Comprehensive Essay Style History */}
              <div className="glass-dark rounded-2xl p-6 sm:p-8 border border-white/20 shadow-xl backdrop-blur-lg">
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    <strong>St. Louis Demonstration Junior High School</strong> stands as a beacon of educational excellence in Kumasi, Ghana, with a rich history spanning over four decades. Established in 1977 as an integral part of the prestigious St. Louis Educational Complex, our institution was founded on the principles of academic rigor, moral uprightness, and spiritual grounding that continue to guide us today.
                  </p>

                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    The early years of our school were marked by modest beginnings but an unwavering commitment to providing quality education rooted in Catholic values. Our founders envisioned an institution that would not merely impart knowledge but would shape character, instill discipline, and nurture the holistic development of young minds. This vision became the cornerstone upon which our educational philosophy was built.
                  </p>

                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    The 1990s brought significant challenges as Ghana navigated through economic difficulties that affected educational institutions nationwide. Limited resources, infrastructure constraints, and the pressure to maintain academic standards while serving a growing student population tested our resilience. However, these challenges only strengthened our resolve and fostered the development of core values that define us today: perseverance, community spirit, and an unwavering commitment to academic excellence.
                  </p>

                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    A pivotal chapter in our history was written under the transformational leadership of <strong>Mrs. Millicent Otoo</strong>, our former headmistress whose visionary approach elevated the school to unprecedented heights. Mrs. Otoo's innovative educational methodologies, emphasis on discipline, and commitment to holistic student development established new benchmarks for excellence. Her tenure was characterized by significant improvements in academic performance, infrastructure development, and the establishment of programs that nurtured both intellectual and character growth.
                  </p>

                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    Today, under the capable leadership of <strong>Mrs. Michelle Acquaye</strong>, our current headmistress, we continue to build upon this solid foundation while adapting to the demands of modern education and global standards. Mrs. Acquaye has successfully integrated contemporary teaching methodologies with our time-tested values, ensuring that our students are well-prepared for the challenges of the 21st century.
                  </p>

                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    With over <strong>30,000 graduates</strong> who have gone on to make significant contributions to society and <strong>800+ current students</strong> who embody our motto <em>"Primus Intaparis"</em> (The Best Among the Rest), St. Louis Demonstration JHS stands as a testament to the power of vision, dedication, and community support in shaping educational excellence. Our journey from humble beginnings to becoming a recognized institution of learning reflects our unwavering commitment to developing critical thinking, creativity, collaboration, and character among our learners.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* St. Louis in the News Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white relative overflow-hidden">
        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v-1z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                St. Louis in the News
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
              Historical media coverage showcasing our school's journey, challenges, and achievements over the years.
            </p>
          </motion.div>

          {/* News Grid - Mobile 1-Column, Desktop 2-Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Make the classroom lively and pupil-friendly",
                source: "GhanaWeb",
                date: "Historical Coverage",
                description: "Educational insights and recommendations for creating engaging learning environments that benefit students.",
                url: "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/Make-the-classroom-lively-and-pupil-friendly-330489",
                type: "article",
                icon: "📰"
              },
              {
                title: "St. Louis JHS lacks infrastructural facilities - Headmistress",
                source: "GhanaWeb",
                date: "Historical Coverage",
                description: "Honest assessment of infrastructure challenges and the school's commitment to improvement and modernization.",
                url: "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/St-Louis-JHS-lacks-infrastructural-facilities-Headmistress-241061",
                type: "article",
                icon: "🏗️"
              },
              {
                title: "St. Louis Educational Complex - Facebook Feature",
                source: "Facebook",
                date: "Social Media Coverage",
                description: "Community engagement and school activities showcased through social media platforms.",
                url: "https://www.facebook.com/watch/?v=4921581154635610",
                type: "video",
                icon: "📱"
              },
              {
                title: "School Activities & Community Engagement",
                source: "YouTube",
                date: "Video Documentation",
                description: "Visual documentation of school events, activities, and community involvement initiatives.",
                url: "https://www.youtube.com/watch?v=c90tOBl5K6g",
                type: "video",
                icon: "🎥"
              },
              {
                title: "Educational Programs & Student Life",
                source: "YouTube",
                date: "Video Coverage",
                description: "Comprehensive look at educational programs, student life, and academic activities at St. Louis JHS.",
                url: "https://www.youtube.com/watch?v=vMUVyKTTFZA",
                type: "video",
                icon: "📚"
              }
            ].map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${index === 4 ? 'md:col-span-2 max-w-2xl mx-auto' : ''}`}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center text-lg mr-3 shadow-md">
                          {news.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-blue-600">{news.source}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              news.type === 'video' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {news.type === 'video' ? '🎥 Video' : '📰 Article'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{news.date}</p>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {news.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                      {news.description}
                    </p>

                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200"
                    >
                      <span>Read More</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* Mission, Vision & Values Section - Dark Aero with School Background */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* School Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?updatedAt=1748185709667"
            alt="St. Louis Demo JHS Campus Background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/35 via-black/45 to-green-900/35"></div>

        <div className="w-full px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Target size={20} className="text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                Our Purpose & Values
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Guiding principles that shape our educational approach and community culture.
            </p>
          </motion.div>

          {/* Mobile 2-Column, Desktop 3-Column Layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-2 md:col-span-1"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="glass-dark rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20 backdrop-blur-lg hover:shadow-2xl transition-all duration-300">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4 shadow-lg">
                    🎯
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Our Mission</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed text-center" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  To provide quality education through the Ghana Education Service curriculum, developing
                  critical thinking, creativity, and character while preparing students for BECE success
                  and lifelong learning in a rapidly changing world.
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-2 md:col-span-1"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="glass-dark rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20 backdrop-blur-lg hover:shadow-2xl transition-all duration-300">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4 shadow-lg">
                    🌟
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Our Vision</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed text-center" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  To become a world-class educational institution that produces globally competitive,
                  morally upright, and innovative leaders who contribute meaningfully to Ghana's
                  development and the global community.
                </p>
              </div>
            </motion.div>

            {/* Core Values Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="col-span-2 md:col-span-1"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="glass-dark rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20 backdrop-blur-lg hover:shadow-2xl transition-all duration-300">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-3 sm:mb-4 shadow-lg">
                    💎
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Core Values</h3>
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
                        <div className="text-sm font-semibold text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{item.value}</div>
                        <div className="text-xs sm:text-sm text-gray-300 hidden sm:block">{item.desc}</div>
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

      {/* Current Facilities & Development Needs Section - Dark Aero with Subtle Background */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* Subtle School Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC"
            alt="St. Louis Demo JHS Facilities Background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40"></div>

        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <BookOpen size={20} className="text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                Our Facilities & Development Vision
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-200 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Building towards a modern educational environment that prepares our students for the global digital age.
            </p>
          </motion.div>

          {/* Current Facilities Grid - Mobile 2-Column, Desktop 3-Column */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
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
                title: 'Canteen',
                description: 'Basic canteen facilities that need significant improvement to provide better nutrition and dining experience for students.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7109.HEIC?updatedAt=1748099386709',
                status: 'needs-improvement',
                icon: '🍽️'
              },
              {
                title: 'Toilet Facilities/Urinals',
                description: 'Current toilet and urinal facilities require major upgrades to meet modern hygiene and accessibility standards.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7114.HEIC',
                status: 'needs-improvement',
                icon: '🚻'
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="glass-dark rounded-2xl overflow-hidden shadow-xl border border-white/20 backdrop-blur-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Status Badge */}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                      facility.status === 'good' ? 'bg-green-500/90 text-white' :
                      facility.status === 'needs-improvement' ? 'bg-yellow-500/90 text-black' :
                      'bg-blue-500/90 text-white'
                    }`}>
                      {facility.status === 'good' ? '✅ Good' :
                       facility.status === 'needs-improvement' ? '🔧 Improving' :
                       '🚧 Planned'}
                    </div>

                    {/* Icon Overlay */}
                    <div className="absolute top-2 left-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-lg shadow-lg">
                      {facility.icon}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      {facility.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
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

      {/* Compact Community Impact Section */}
      <section className="py-6 sm:py-8 md:py-10 bg-gradient-to-br from-blue-600 via-blue-700 to-green-700 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        </div>
        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="flex items-center justify-center mb-3">
              <Award size={20} className="text-yellow-300 mr-3 flex-shrink-0" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Our Impact & Aspirations</h2>
            </div>
            <p className="text-sm text-gray-100 max-w-2xl mx-auto">
              Building on 47 years of educational excellence while working towards our vision of becoming a world-class institution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-6 sm:mb-8">
            {/* Current Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center text-xl sm:text-2xl mx-auto mb-2 sm:mb-3">
                  🎓
                </div>
                <h3 className="text-sm sm:text-base font-bold text-yellow-300 mb-2">Educational Legacy</h3>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="text-white/90">47+ years • 30,000+ graduates</p>
                  <p className="text-white/90">800+ students • Excellent BECE</p>
                </div>
              </div>
            </motion.div>

            {/* Current Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-xl sm:text-2xl mx-auto mb-2 sm:mb-3">
                  💪
                </div>
                <h3 className="text-sm sm:text-base font-bold text-green-300 mb-2">Current Strengths</h3>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="text-white/90">Dedicated staff • Community support</p>
                  <p className="text-white/90">Character focus • Quality curriculum</p>
                </div>
              </div>
            </motion.div>

            {/* Future Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-xl sm:text-2xl mx-auto mb-2 sm:mb-3">
                  🚀
                </div>
                <h3 className="text-sm sm:text-base font-bold text-blue-300 mb-2">Future Vision</h3>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="text-white/90">Modern labs • Digital library</p>
                  <p className="text-white/90">Global standards • Innovation</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Compact Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-sm text-gray-200 mb-4 max-w-xl mx-auto">
              Join us in transforming St. Louis Demonstration JHS into a world-class educational institution.
            </p>
            <a
              href="/donate"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.4),0_0_60px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8),0_0_50px_rgba(239,68,68,0.6),0_0_75px_rgba(239,68,68,0.4)] transition-all duration-300 transform hover:scale-105 text-sm relative overflow-hidden"
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