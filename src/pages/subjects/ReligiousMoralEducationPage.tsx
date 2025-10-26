import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Target, Award, Heart, BookOpen, Shield, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import ShimmerLoader from '../../components/common/ShimmerLoader';

const ReligiousMoralEducationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
        title="Religious & Moral Education - Character Development | St. Louis Demonstration JHS"
        description="Excel in Religious & Moral Education at St. Louis Demonstration JHS. Our GES-aligned curriculum covers ethics, values, world religions, and character development for Basic 7-9 students."
        keywords="Religious Moral Education, RME, GES curriculum, ethics values character, world religions, moral development, St. Louis Demonstration JHS, Ghana JHS RME"
        canonicalUrl="https://stlouisdemojhs.com/subject/religious-moral-education"
      
      canonical="https://stlouisdemojhs.com/subject/religious-moral-education"
      />

      <div className="min-h-screen bg-black text-white">
        {/* Header - Exact Back Bar from AI Search Page */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-2 sm:py-3">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
              >
                <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-white">
                  Religious & Moral Education
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Edge to Edge */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          {/* Hero Section - Smaller and Cuter on Mobile */}
          <div className="relative min-h-[25vh] sm:min-h-[35vh] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7110.HEIC?updatedAt=1748099386709"
                alt="Religious & Moral Education at St. Louis Demonstration JHS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-black/50 to-purple-900/40"></div>
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-indigo-500/20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
                >
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-indigo-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  Religious & <span className="text-indigo-400">Moral</span> Education
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Develop strong moral character, ethical reasoning, and spiritual understanding through comprehensive religious and moral education aligned with Ghana Education Service curriculum
                </motion.p>
              </div>
            </div>
          </div>

          {/* GES Curriculum Overview Section */}
          <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-indigo-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-indigo-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-indigo-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  GES Religious & Moral Education Curriculum
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
                    The Ghana Education Service Religious & Moral Education curriculum for Basic 7-9 promotes character development, ethical reasoning, and spiritual growth. Students explore diverse religious traditions while developing strong moral foundations for responsible citizenship.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Learning Areas:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        'Christian Education',
                        'Islamic Studies',
                        'Traditional Religion',
                        'Moral Values & Ethics',
                        'Character Development',
                        'Social Responsibility',
                        'Conflict Resolution',
                        'Religious Tolerance'
                      ].map((area, index) => (
                        <motion.div
                          key={area}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-indigo-400/30"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 flex-shrink-0" />
                          <span className="text-white font-medium text-xs sm:text-sm md:text-base">{area}</span>
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
                  className="space-y-4 sm:space-y-5 md:space-y-6"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-indigo-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Learning Objectives</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Develop strong moral character and ethical decision-making skills</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Understand and respect diverse religious and cultural traditions</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Apply religious and moral principles to contemporary issues</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-indigo-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Assessment Methods</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Character development portfolios and reflection journals</li>
                      <li>• Moral dilemma discussions and ethical reasoning exercises</li>
                      <li>• Community service projects and social action initiatives</li>
                      <li>• Religious studies research and presentation projects</li>
                      <li>• Peer mediation and conflict resolution activities</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Religious Traditions Section */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-purple-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-purple-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Religious Traditions & Moral Foundations
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {/* Christianity */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-blue-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Christianity</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Study of Christian beliefs, values, and practices. Students explore biblical teachings and their application to modern life.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Topics Include:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Biblical stories and teachings</li>
                        <li>• Christian values and ethics</li>
                        <li>• Prayer and worship practices</li>
                        <li>• Service to others and community</li>
                        <li>• Christian festivals and traditions</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Islam */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-green-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Islam</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Understanding Islamic principles, practices, and contributions to society. Students learn about Islamic values and their relevance today.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Key Areas:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Quranic teachings and guidance</li>
                        <li>• Five Pillars of Islam</li>
                        <li>• Islamic moral principles</li>
                        <li>• Prophet Muhammad's teachings</li>
                        <li>• Islamic festivals and observances</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Traditional Religion */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-amber-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Traditional Religion</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Exploration of African traditional religious beliefs, customs, and their role in Ghanaian culture and society.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Content Areas:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Ancestral reverence and wisdom</li>
                        <li>• Traditional moral teachings</li>
                        <li>• Cultural festivals and rituals</li>
                        <li>• Community values and practices</li>
                        <li>• Environmental stewardship</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Character Development Section */}
          <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-blue-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Character Development & Moral Values
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
                    Character development is central to our Religious & Moral Education program. Students develop essential life skills, ethical reasoning abilities, and moral courage to make positive contributions to society.
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Values</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Honesty & Integrity',
                        'Respect & Tolerance',
                        'Compassion & Empathy',
                        'Responsibility & Accountability',
                        'Justice & Fairness',
                        'Courage & Perseverance'
                      ].map((value, index) => (
                        <motion.div
                          key={value}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          <span className="text-gray-100 text-xs sm:text-sm">{value}</span>
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
                  className="space-y-4 sm:space-y-5 md:space-y-6"
                >
                  <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Practical Applications</h4>
                    <div className="space-y-3">
                      <p className="text-gray-100 text-sm sm:text-base">Students apply moral principles through:</p>
                      <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                        <li>• Community service and volunteer work</li>
                        <li>• Peer mediation and conflict resolution</li>
                        <li>• Environmental stewardship projects</li>
                        <li>• Social justice advocacy and awareness</li>
                        <li>• Interfaith dialogue and understanding</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-blue-300 mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Life Skills Development</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Critical thinking and ethical decision-making</li>
                      <li>• Communication and interpersonal skills</li>
                      <li>• Leadership and teamwork abilities</li>
                      <li>• Cultural sensitivity and global awareness</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* BECE Preparation Section */}
          <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4 sm:space-y-6 md:space-y-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-indigo-500/20 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-indigo-400" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-indigo-300 mb-3 sm:mb-4 md:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  BECE Religious & Moral Education Preparation
                </h3>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Our comprehensive Religious & Moral Education program prepares students for BECE success while developing strong character and ethical reasoning skills essential for life.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {[
                    { title: 'Paper 1', desc: 'Objective Test - Multiple choice questions on religious knowledge, moral principles, and ethical reasoning' },
                    { title: 'Paper 2', desc: 'Essay Writing - Analytical essays on religious teachings, moral dilemmas, and character development' }
                  ].map((paper, index) => (
                    <motion.div
                      key={paper.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-indigo-400/30"
                    >
                      <h4 className="text-indigo-300 font-bold text-base sm:text-lg mb-2">{paper.title}</h4>
                      <p className="text-gray-100 text-xs sm:text-sm">{paper.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-indigo-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>RME Excellence Strategies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                    <ul className="space-y-2 text-gray-100">
                      <li>• Religious text study and interpretation</li>
                      <li>• Moral case study analysis and discussion</li>
                      <li>• Character development reflection journals</li>
                    </ul>
                    <ul className="space-y-2 text-gray-100">
                      <li>• Community service project documentation</li>
                      <li>• Interfaith dialogue and understanding activities</li>
                      <li>• Ethical decision-making scenario practice</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReligiousMoralEducationPage;
