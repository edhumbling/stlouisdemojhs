import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Target, Award, MapPin, Users, BookOpen, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import ShimmerLoader from '../../components/common/ShimmerLoader';

const SocialStudiesPage: React.FC = () => {
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
        title="Social Studies - Comprehensive Social Education | St. Louis Demonstration JHS"
        description="Excel in Social Studies at St. Louis Demonstration JHS. Our GES-aligned curriculum covers history, geography, civics, economics, and cultural studies for Basic 7-9 students."
        keywords="Social Studies, GES curriculum, history geography civics, economics culture, Ghana studies, St. Louis Demonstration JHS, Ghana JHS Social Studies"
        canonicalUrl="https://stlouisdemojhs.com/subject/social-studies"
      
      canonical="https://stlouisdemojhs.com/subjects/socialstudiespage.tsx"
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
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-white">
                  Social Studies
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
                src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7120.HEIC?updatedAt=1748099386709"
                alt="Social Studies Learning at St. Louis Demonstration JHS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-black/50 to-red-900/40"></div>
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-orange-500/20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
                >
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  Social Studies <span className="text-orange-400">Excellence</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Explore history, geography, civics, and culture to understand our world and develop responsible citizenship aligned with Ghana Education Service curriculum
                </motion.p>
              </div>
            </div>
          </div>

          {/* GES Curriculum Overview Section */}
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
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-orange-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-orange-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  GES Social Studies Curriculum
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
                    The Ghana Education Service Social Studies curriculum for Basic 7-9 integrates history, geography, civics, and economics to develop informed, responsible citizens. Students explore local, national, and global perspectives while building critical thinking skills.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Study Areas:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        'Ghana History & Heritage',
                        'African & World History',
                        'Physical & Human Geography',
                        'Civics & Government',
                        'Economics & Trade',
                        'Cultural Studies',
                        'Environmental Issues',
                        'Global Citizenship'
                      ].map((area, index) => (
                        <motion.div
                          key={area}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-orange-400/30"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0" />
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-orange-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-orange-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Learning Objectives</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Understand Ghana's place in Africa and the world</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Develop civic responsibility and democratic values</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Analyze historical events and their contemporary relevance</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-orange-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Assessment Methods</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Research projects on historical and contemporary issues</li>
                      <li>• Map work and geographical investigations</li>
                      <li>• Civic engagement and community service projects</li>
                      <li>• Group discussions and debates on social issues</li>
                      <li>• Cultural presentations and heritage studies</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Subject Areas Section */}
          <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-red-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Integrated Social Studies Disciplines
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {/* History */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-red-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-amber-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>History</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Study of Ghana's rich heritage, African civilizations, and world history. Students explore how past events shape present-day society and culture.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Topics Include:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Pre-colonial Ghana and African kingdoms</li>
                        <li>• Colonial period and independence struggle</li>
                        <li>• Post-independence Ghana and modern Africa</li>
                        <li>• World civilizations and global connections</li>
                        <li>• Historical thinking and source analysis</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Geography */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-red-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-green-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Geography</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Exploration of physical and human geography, focusing on Ghana, Africa, and the world. Students develop spatial thinking and environmental awareness.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Key Areas:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Ghana's physical features and climate</li>
                        <li>• Population and settlement patterns</li>
                        <li>• Natural resources and economic activities</li>
                        <li>• Environmental challenges and conservation</li>
                        <li>• Map reading and geographical skills</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Civics & Government */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-red-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-blue-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Civics & Government</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Understanding democratic principles, governance structures, and civic responsibilities. Students learn about rights, duties, and active citizenship.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Content Areas:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Ghana's constitution and government structure</li>
                        <li>• Democratic processes and elections</li>
                        <li>• Human rights and responsibilities</li>
                        <li>• Rule of law and justice system</li>
                        <li>• Community participation and leadership</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Economics & Culture */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-red-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-purple-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Economics & Culture</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Study of economic systems, cultural diversity, and social interactions. Students explore how societies organize resources and preserve traditions.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Skills Developed:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Economic concepts and market systems</li>
                        <li>• Cultural heritage and traditions</li>
                        <li>• Social institutions and relationships</li>
                        <li>• Globalization and international trade</li>
                        <li>• Sustainable development goals</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* BECE Preparation Section */}
          <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4 sm:space-y-6 md:space-y-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-pink-500/20 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-400" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-pink-300 mb-3 sm:mb-4 md:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  BECE Social Studies Preparation
                </h3>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Our comprehensive Social Studies program prepares students for BECE success through integrated learning that connects historical knowledge, geographical understanding, and civic awareness.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {[
                    { title: 'Paper 1', desc: 'Objective Test - Multiple choice questions covering history, geography, civics, and economics' },
                    { title: 'Paper 2', desc: 'Essay Writing - Analytical essays on historical events, geographical processes, and social issues' }
                  ].map((paper, index) => (
                    <motion.div
                      key={paper.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-pink-400/30"
                    >
                      <h4 className="text-pink-300 font-bold text-base sm:text-lg mb-2">{paper.title}</h4>
                      <p className="text-gray-100 text-xs sm:text-sm">{paper.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-pink-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Social Studies Success Strategies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                    <ul className="space-y-2 text-gray-100">
                      <li>• Historical timeline construction and analysis</li>
                      <li>• Map interpretation and geographical skills practice</li>
                      <li>• Current events analysis and discussion</li>
                    </ul>
                    <ul className="space-y-2 text-gray-100">
                      <li>• Research projects on Ghanaian heritage and culture</li>
                      <li>• Civic engagement activities and community studies</li>
                      <li>• Essay writing techniques for social studies topics</li>
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

export default SocialStudiesPage;
