import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Target, Award, BookOpen, Users, MessageCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import ShimmerLoader from '../../components/common/ShimmerLoader';

const FrenchPage: React.FC = () => {
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
        title="French Language - International Communication | St. Louis Demonstration JHS"
        description="Excel in French Language at St. Louis Demonstration JHS. Our GES-aligned curriculum covers speaking, listening, reading, writing, and French culture for Basic 7-9 students."
        keywords="French Language, GES curriculum, foreign language, French culture, communication skills, St. Louis Demonstration JHS, Ghana JHS French"
        canonicalUrl="https://stlouisdemojhs.com/subject/french"
      
      canonical="https://stlouisdemojhs.com/subjects/frenchpage.tsx"
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
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-white">
                  French Language
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
                src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7115.HEIC?updatedAt=1748099386709"
                alt="French Language Learning at St. Louis Demonstration JHS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-red-900/40"></div>
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-500/20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
                >
                  <Globe className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  French <span className="text-blue-400">Language</span> Excellence
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Master the French language and explore Francophone culture through comprehensive language education aligned with Ghana Education Service curriculum
                </motion.p>
              </div>
            </div>
          </div>

          {/* GES Curriculum Overview Section */}
          <div className="bg-gradient-to-br from-blue-900/30 to-red-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-blue-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  GES French Language Curriculum
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
                    The Ghana Education Service French Language curriculum for Basic 7-9 introduces students to French as a foreign language, developing communicative competence and cultural awareness. Students acquire essential language skills for international communication and global citizenship.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Language Skills:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        'Oral Communication',
                        'Listening Comprehension',
                        'Reading Skills',
                        'Writing Proficiency',
                        'Grammar & Vocabulary',
                        'French Culture',
                        'Pronunciation',
                        'Conversation Practice'
                      ].map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-blue-400/30"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                          <span className="text-white font-medium text-xs sm:text-sm md:text-base">{skill}</span>
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Learning Objectives</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Develop basic communicative competence in French</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Understand French and Francophone cultures</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Build foundation for advanced French studies</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Assessment Methods</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Oral presentations and conversation assessments</li>
                      <li>• Listening comprehension exercises and tests</li>
                      <li>• Reading comprehension and vocabulary quizzes</li>
                      <li>• Written compositions and grammar exercises</li>
                      <li>• Cultural projects and research assignments</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Grade-Level Curriculum Section */}
          <div className="bg-gradient-to-br from-red-900/30 to-blue-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-red-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Grade-Level French Curriculum
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Progressive French language learning from Basic 7 through Basic 9, building communicative competence step by step
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                {/* Basic 7 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-red-400/30"
                >
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 rounded-xl mb-3 sm:mb-4">
                      <span className="text-red-400 font-bold text-lg sm:text-xl">7</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-red-300 mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Basic 7</h4>
                    <p className="text-red-200 text-sm sm:text-base font-medium">Foundation Level</p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <h5 className="font-semibold text-white text-sm sm:text-base">Key Topics:</h5>
                    <ul className="space-y-2 text-gray-100 text-xs sm:text-sm">
                      <li>• Basic greetings and introductions</li>
                      <li>• Numbers, colors, and days of the week</li>
                      <li>• Family members and personal information</li>
                      <li>• Simple present tense verbs</li>
                      <li>• Basic vocabulary (school, home, food)</li>
                      <li>• French alphabet and pronunciation</li>
                      <li>• Simple dialogues and conversations</li>
                      <li>• Introduction to French culture</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Basic 8 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30"
                >
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-xl mb-3 sm:mb-4">
                      <span className="text-blue-400 font-bold text-lg sm:text-xl">8</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Basic 8</h4>
                    <p className="text-blue-200 text-sm sm:text-base font-medium">Intermediate Level</p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <h5 className="font-semibold text-white text-sm sm:text-base">Key Topics:</h5>
                    <ul className="space-y-2 text-gray-100 text-xs sm:text-sm">
                      <li>• Past and future tenses</li>
                      <li>• Describing people and places</li>
                      <li>• Shopping and money expressions</li>
                      <li>• Time, dates, and weather</li>
                      <li>• Hobbies and leisure activities</li>
                      <li>• Food and restaurant vocabulary</li>
                      <li>• Travel and transportation</li>
                      <li>• Francophone countries and cultures</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Basic 9 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30"
                >
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-xl mb-3 sm:mb-4">
                      <span className="text-purple-400 font-bold text-lg sm:text-xl">9</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Basic 9</h4>
                    <p className="text-purple-200 text-sm sm:text-base font-medium">Advanced Level</p>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <h5 className="font-semibold text-white text-sm sm:text-base">Key Topics:</h5>
                    <ul className="space-y-2 text-gray-100 text-xs sm:text-sm">
                      <li>• Complex grammar structures</li>
                      <li>• Expressing opinions and emotions</li>
                      <li>• Formal and informal registers</li>
                      <li>• Reading comprehension texts</li>
                      <li>• Creative writing and compositions</li>
                      <li>• French literature and poetry</li>
                      <li>• Current events and social issues</li>
                      <li>• Preparation for advanced French studies</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Learning Resources Section */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-purple-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-purple-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  French Learning Resources
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Comprehensive resources to support French language learning and cultural understanding
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Textbooks & Materials */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                    <h4 className="text-lg font-bold text-purple-300">Textbooks & Materials</h4>
                  </div>
                  <ul className="space-y-2 text-gray-100 text-sm">
                    <li>• GES-approved French textbooks</li>
                    <li>• Audio-visual learning materials</li>
                    <li>• French-English dictionaries</li>
                    <li>• Grammar reference books</li>
                    <li>• Cultural reading materials</li>
                    <li>• Workbooks and exercise sheets</li>
                  </ul>
                </motion.div>

                {/* Digital Resources */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-blue-400" />
                    <h4 className="text-lg font-bold text-blue-300">Digital Resources</h4>
                  </div>
                  <ul className="space-y-2 text-gray-100 text-sm">
                    <li>• Online French learning platforms</li>
                    <li>• Interactive language apps</li>
                    <li>• French pronunciation tools</li>
                    <li>• Virtual cultural tours</li>
                    <li>• Educational French videos</li>
                    <li>• Online grammar exercises</li>
                  </ul>
                </motion.div>

                {/* Cultural Activities */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-red-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-red-400" />
                    <h4 className="text-lg font-bold text-red-300">Cultural Activities</h4>
                  </div>
                  <ul className="space-y-2 text-gray-100 text-sm">
                    <li>• French cultural celebrations</li>
                    <li>• Language exchange programs</li>
                    <li>• French cooking activities</li>
                    <li>• Music and dance workshops</li>
                    <li>• French film screenings</li>
                    <li>• International friendship projects</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Career Connections Section */}
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 sm:mb-10 md:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-blue-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  French Language Career Opportunities
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  French language skills open doors to diverse career opportunities in our globalized world
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-3 sm:mb-4">International Careers</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Diplomatic services and international relations</li>
                      <li>• International business and trade</li>
                      <li>• Tourism and hospitality industry</li>
                      <li>• International development organizations</li>
                      <li>• Multinational corporations</li>
                      <li>• Cultural exchange programs</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-3 sm:mb-4">Education & Communication</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• French language teaching</li>
                      <li>• Translation and interpretation</li>
                      <li>• International journalism</li>
                      <li>• Publishing and media</li>
                      <li>• Academic research</li>
                      <li>• Cultural consulting</li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Why Learn French?</h4>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Global Language</h5>
                        <p className="text-gray-100 text-sm">Spoken by over 280 million people across 5 continents</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Academic Advantage</h5>
                        <p className="text-gray-100 text-sm">Opens doors to French universities and international programs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Cultural Enrichment</h5>
                        <p className="text-gray-100 text-sm">Access to rich French and Francophone cultures</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MessageCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Communication Skills</h5>
                        <p className="text-gray-100 text-sm">Enhanced cognitive abilities and multilingual competence</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrenchPage;
