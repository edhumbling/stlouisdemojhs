import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Users, Lightbulb, Award, GraduationCap, Target, Heart, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import ShimmerLoader from '../components/common/ShimmerLoader';
import { getSchoolStats } from '../utils/schoolStats';

const LeadershipExcellencePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const schoolStats = getSchoolStats();

  // Handle initial page loading with shimmer effect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  // Show shimmer loading for initial page load
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <ShimmerLoader variant="silver" width="w-16 sm:w-20" height="h-8 sm:h-10" className="rounded-lg" />
              <ShimmerLoader variant="silver" width="w-32 sm:w-40" height="h-6 sm:h-8" className="rounded-lg" />
            </div>
          </div>
        </div>
        <div className="px-4 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-3 sm:space-y-4">
                <ShimmerLoader variant="silver" width="w-2/3 sm:w-3/4" height="h-6 sm:h-8" className="rounded-lg" />
                <ShimmerLoader variant="silver" width="w-full" height="h-24 sm:h-32" className="rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Leadership Excellence - Shaping Tomorrow's Leaders Today | St. Louis Demonstration JHS"
        description="Discover how St. Louis Demonstration JHS shapes tomorrow's leaders through comprehensive curriculum, expert faculty, innovative learning, and holistic development programs."
        keywords="leadership excellence, comprehensive curriculum, expert faculty, innovative learning, holistic development, St. Louis Demonstration JHS, Ghana education"
        canonicalUrl="https://stlouisdemojhs.com/leadership-excellence"
      />

      <div className="min-h-screen bg-black text-white">
        {/* Header - Exact Back Bar from AI Search Page */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Leadership Excellence
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content - Edge to Edge */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          {/* Hero Section - Smaller and Cuter on Mobile */}
          <div className="relative min-h-[40vh] sm:min-h-[60vh] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7109.HEIC?updatedAt=1748099386709"
                alt="St. Louis Demonstration JHS Campus"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-purple-900/40"></div>
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  Shaping Tomorrow's <span className="text-yellow-400">Leaders</span> Today
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Discover the four pillars of excellence that have made St. Louis Demonstration JHS Ghana's premier educational institution for over {new Date().getFullYear() - schoolStats.foundingYear} years
                </motion.p>
              </div>
            </div>
          </div>

          {/* Comprehensive Curriculum Section */}
          <div className="bg-gradient-to-br from-green-900/30 to-blue-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-green-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-green-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Comprehensive Curriculum
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4 sm:space-y-5 md:space-y-6"
                >
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    Our rigorous academic programs are meticulously designed to challenge and inspire students to reach their full potential. We follow the Ghana Education Service curriculum while incorporating innovative teaching methodologies that prepare students for both local and international academic excellence.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Academic Areas:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'Mathematics & Science',
                        'English Language & Literature',
                        'Social Studies & History',
                        'Information Technology',
                        'Creative Arts & Music',
                        'Physical Education',
                        'Religious & Moral Education',
                        'Ghanaian Languages'
                      ].map((subject, index) => (
                        <motion.div
                          key={subject}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-green-400/30"
                        >
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                          <span className="text-white font-medium text-xs sm:text-sm md:text-base">{subject}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-green-400/30">
                    <h4 className="text-xl font-bold text-green-300 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Academic Excellence Standards</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100">Structured learning pathways aligned with Ghana's national curriculum standards</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <GraduationCap className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100">Continuous assessment and personalized learning support for every student</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100">Integration of global perspectives with local cultural values and traditions</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-green-400/30">
                    <h4 className="text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Curriculum Highlights</h4>
                    <ul className="space-y-2 text-gray-100">
                      <li>• STEM-focused programs with hands-on laboratory experiences</li>
                      <li>• Bilingual education in English and local Ghanaian languages</li>
                      <li>• Digital literacy and computer programming fundamentals</li>
                      <li>• Environmental science and sustainability education</li>
                      <li>• Critical thinking and problem-solving skill development</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Expert Faculty Section */}
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-purple-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-purple-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Expert Faculty
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <p className="text-lg sm:text-xl text-gray-100 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    Our dedicated teachers bring extensive experience and unwavering passion for nurturing young minds. With over {schoolStats.professionalTeachers}+ professional educators since {schoolStats.foundingYear}, our faculty represents the cornerstone of educational excellence at St. Louis Demonstration JHS.
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30">
                    <h4 className="text-xl font-bold text-purple-300 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Faculty Qualifications</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                        <p className="text-gray-100">University degrees in specialized subject areas with teaching certifications</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                        <p className="text-gray-100">Continuous professional development and modern teaching methodology training</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                        <p className="text-gray-100">Years of classroom experience with proven track records of student success</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30">
                    <h4 className="text-lg font-bold text-white mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Teaching Excellence</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-pink-400" />
                        <span className="text-gray-100">Passionate commitment to student growth and development</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-purple-400" />
                        <span className="text-gray-100">Personalized attention and individualized learning approaches</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-100">Recognition for outstanding teaching performance and innovation</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30">
                    <h4 className="text-lg font-bold text-purple-300 mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Student-Teacher Relationship</h4>
                    <p className="text-gray-100 leading-relaxed">
                      Our teachers serve as mentors, guides, and inspirational figures who create supportive learning environments where every student feels valued, challenged, and empowered to achieve their academic and personal goals.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Innovative Learning Section */}
          <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-orange-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-orange-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-orange-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Innovative Learning
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <p className="text-lg sm:text-xl text-gray-100 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    We embrace modern teaching methodologies and cutting-edge technology integration to create an enhanced learning experience that prepares students for the digital age. Our innovative approach combines traditional educational values with contemporary learning tools and techniques.
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-white mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Innovation in Education:</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { title: 'Interactive Learning', desc: 'Smart boards and multimedia presentations for engaging classroom experiences' },
                        { title: 'Digital Resources', desc: 'Online learning platforms and educational software for enhanced understanding' },
                        { title: 'Project-Based Learning', desc: 'Hands-on projects that connect classroom theory to real-world applications' },
                        { title: 'Collaborative Learning', desc: 'Group activities and peer-to-peer learning opportunities' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-orange-400/30"
                        >
                          <h5 className="text-orange-300 font-bold mb-2">{item.title}</h5>
                          <p className="text-gray-100 text-sm">{item.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-400/30">
                    <h4 className="text-xl font-bold text-orange-300 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Technology Integration</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                        <p className="text-gray-100">Computer laboratory with modern equipment for digital literacy development</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                        <p className="text-gray-100">Internet connectivity enabling access to global educational resources</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                        <p className="text-gray-100">Educational software and applications supporting various learning styles</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-400/30">
                    <h4 className="text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>21st Century Skills</h4>
                    <ul className="space-y-2 text-gray-100">
                      <li>• Critical thinking and analytical reasoning development</li>
                      <li>• Creative problem-solving and innovation encouragement</li>
                      <li>• Digital citizenship and responsible technology use</li>
                      <li>• Communication and presentation skills enhancement</li>
                      <li>• Adaptability and lifelong learning mindset cultivation</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Holistic Development Section */}
          <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-teal-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-teal-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-teal-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Holistic Development
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <p className="text-lg sm:text-xl text-gray-100 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                    We focus on developing the complete student - academically, socially, emotionally, and physically. Our comprehensive approach ensures that every student grows into a well-rounded individual prepared for success in all aspects of life through diverse extracurricular activities and character-building programs.
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-teal-400/30">
                    <h4 className="text-xl font-bold text-teal-300 mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Extracurricular Excellence</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        'Music Programs',
                        'Football Teams',
                        'Volleyball',
                        'Cadet Corps',
                        'Band',
                        'Choreography',
                        'Choir Group',
                        'Creative Arts'
                      ].map((activity, index) => (
                        <motion.div
                          key={activity}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="bg-teal-500/20 rounded-lg p-2 text-center border border-teal-400/30"
                        >
                          <span className="text-white text-sm font-medium">{activity}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl p-6 border border-teal-400/30">
                    <h4 className="text-lg font-bold text-white mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Character Development</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-pink-400" />
                        <span className="text-gray-100">Moral and ethical values rooted in Roman Catholic principles</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-teal-400" />
                        <span className="text-gray-100">Leadership skills and teamwork development</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-cyan-400" />
                        <span className="text-gray-100">Cultural awareness and community service engagement</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-teal-400/30">
                    <h4 className="text-lg font-bold text-teal-300 mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Student Support Services</h4>
                    <ul className="space-y-2 text-gray-100">
                      <li>• Academic counseling and career guidance programs</li>
                      <li>• Peer mentorship and student leadership opportunities</li>
                      <li>• Health and wellness education initiatives</li>
                      <li>• Social skills development and conflict resolution training</li>
                      <li>• Community outreach and service learning projects</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4 sm:space-y-6 md:space-y-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-yellow-500/20 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4 md:mb-6">
                  <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-400" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-300 mb-3 sm:mb-4 md:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Join Our Legacy of Excellence
                </h3>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  For over {new Date().getFullYear() - schoolStats.foundingYear} years, St. Louis Demonstration JHS has been shaping tomorrow's leaders through our four pillars of excellence. With over {schoolStats.totalStudentsFormatted} graduates and {schoolStats.professionalTeachers}+ professional teachers, we continue to set the standard for educational excellence in Ghana.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.button
                    onClick={() => navigate('/about')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold rounded-full shadow-[0_0_20px_rgba(251,191,36,0.6)] hover:shadow-[0_0_30px_rgba(251,191,36,0.8)] transition-all duration-300"
                  >
                    Learn More About Us
                  </motion.button>

                  <motion.button
                    onClick={() => navigate('/contact')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full border border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
                  >
                    Contact Us Today
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadershipExcellencePage;
