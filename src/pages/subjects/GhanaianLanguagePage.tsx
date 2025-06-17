import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Target, Award, BookOpen, Users, Heart, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import ShimmerLoader from '../../components/common/ShimmerLoader';

const GhanaianLanguagePage: React.FC = () => {
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
        title="Ghanaian Language (Asante Twi) - Cultural Heritage & Language | St. Louis Demonstration JHS"
        description="Excel in Ghanaian Language at St. Louis Demonstration JHS. Our GES-aligned Asante Twi curriculum covers language skills, cultural heritage, and traditional values for Basic 7-9 students."
        keywords="Ghanaian Language, Asante Twi, GES curriculum, cultural heritage, traditional values, language skills, St. Louis Demonstration JHS, Ghana JHS Twi"
        canonicalUrl="https://stlouisdemojhs.com/subject/ghanaian-language"
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
                Ghanaian Language (Asante Twi)
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
                src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7125.HEIC?updatedAt=1748099386709"
                alt="Ghanaian Language Learning at St. Louis Demonstration JHS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black/50 to-yellow-900/40"></div>
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-red-500/20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
                >
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  Ghanaian Language <span className="text-red-400">(Asante Twi)</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Preserve and celebrate our rich cultural heritage through comprehensive Asante Twi language education aligned with Ghana Education Service curriculum
                </motion.p>
              </div>
            </div>
          </div>

          {/* GES Curriculum Overview Section */}
          <div className="bg-gradient-to-br from-red-900/30 to-yellow-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-red-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  GES Ghanaian Language Curriculum
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
                    The Ghana Education Service Ghanaian Language curriculum for Basic 7-9 focuses on Asante Twi as the primary indigenous language. Students develop proficiency in speaking, reading, writing, and understanding while exploring rich cultural traditions and values.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Learning Areas:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        'Oral Communication',
                        'Reading Comprehension',
                        'Creative Writing',
                        'Grammar & Syntax',
                        'Cultural Studies',
                        'Traditional Literature',
                        'Proverbs & Folktales',
                        'Contemporary Usage'
                      ].map((area, index) => (
                        <motion.div
                          key={area}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-red-400/30"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-red-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-red-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Learning Objectives</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Develop fluency in Asante Twi for effective communication</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Appreciate and preserve Ghanaian cultural heritage and traditions</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Understand traditional literature, proverbs, and oral traditions</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-red-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Assessment Methods</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Oral presentations and storytelling in Asante Twi</li>
                      <li>• Reading comprehension of traditional and modern texts</li>
                      <li>• Creative writing assignments and cultural essays</li>
                      <li>• Grammar exercises and language structure analysis</li>
                      <li>• Cultural research projects and heritage studies</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Language Skills Development Section */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-yellow-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-yellow-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Asante Twi Language Skills Development
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {/* Speaking & Listening */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-yellow-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-blue-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Speaking & Listening</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Development of oral communication skills through conversations, presentations, and traditional storytelling in Asante Twi.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Skills Include:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Proper pronunciation and intonation</li>
                        <li>• Conversational fluency and dialogue</li>
                        <li>• Traditional storytelling techniques</li>
                        <li>• Listening comprehension skills</li>
                        <li>• Public speaking and presentations</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Reading & Writing */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-yellow-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-green-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Reading & Writing</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Literacy development in Asante Twi through reading traditional and contemporary texts, and creative writing exercises.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Key Areas:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Reading comprehension strategies</li>
                        <li>• Creative and narrative writing</li>
                        <li>• Grammar and sentence structure</li>
                        <li>• Vocabulary development and usage</li>
                        <li>• Text analysis and interpretation</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Cultural Heritage */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-yellow-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-red-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Cultural Heritage</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Exploration of Akan culture, traditions, and values through language study, connecting students to their rich heritage.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Cultural Elements:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Traditional proverbs and their meanings</li>
                        <li>• Folktales and oral literature</li>
                        <li>• Cultural festivals and ceremonies</li>
                        <li>• Traditional values and customs</li>
                        <li>• Historical narratives and legends</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Modern Applications */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-yellow-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-purple-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Modern Applications</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Contemporary use of Asante Twi in media, technology, and modern communication while preserving traditional forms.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Contemporary Usage:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Media and broadcasting in Twi</li>
                        <li>• Digital communication and social media</li>
                        <li>• Modern literature and poetry</li>
                        <li>• Business and professional contexts</li>
                        <li>• Educational and academic discourse</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* BECE Preparation Section */}
          <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4 sm:space-y-6 md:space-y-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-orange-500/20 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-400" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-orange-300 mb-3 sm:mb-4 md:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  BECE Ghanaian Language Preparation
                </h3>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Our comprehensive Ghanaian Language program ensures students excel in BECE while developing deep appreciation for their cultural heritage and linguistic identity.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {[
                    { title: 'Paper 1', desc: 'Objective Test - Multiple choice questions on grammar, comprehension, and cultural knowledge' },
                    { title: 'Paper 2', desc: 'Essay Writing - Creative writing, cultural essays, and language analysis in Asante Twi' }
                  ].map((paper, index) => (
                    <motion.div
                      key={paper.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-orange-400/30"
                    >
                      <h4 className="text-orange-300 font-bold text-base sm:text-lg mb-2">{paper.title}</h4>
                      <p className="text-gray-100 text-xs sm:text-sm">{paper.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-orange-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Language Excellence Strategies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                    <ul className="space-y-2 text-gray-100">
                      <li>• Daily conversation practice in Asante Twi</li>
                      <li>• Traditional storytelling and oral presentations</li>
                      <li>• Cultural research and heritage projects</li>
                    </ul>
                    <ul className="space-y-2 text-gray-100">
                      <li>• Reading comprehension with traditional texts</li>
                      <li>• Creative writing in various Twi genres</li>
                      <li>• Grammar exercises and language structure analysis</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-orange-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-orange-300 mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Cultural Preservation & Pride</h4>
                  <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                    Through our Ghanaian Language program, students not only master Asante Twi but also develop a deep sense of cultural pride and responsibility to preserve their linguistic heritage for future generations. The program emphasizes the importance of indigenous languages in maintaining cultural identity while preparing students for academic success.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GhanaianLanguagePage;
