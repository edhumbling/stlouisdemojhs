import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Users, Target, Award, Globe, Lightbulb, CheckCircle } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import ShimmerLoader from '../../components/common/ShimmerLoader';
import { useEnhancedNavigation } from '../../hooks/useEnhancedNavigation';

const EnglishLanguagePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { navigateBackWithState } = useEnhancedNavigation();

  // Handle initial page loading with shimmer effect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimer);
  }, []);

  // Note: Scroll restoration is now handled globally in Layout component

  const handleBack = () => {
    navigateBackWithState('/academics');
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
        title="English Language - Comprehensive Language Arts Program | St. Louis Demonstration JHS"
        description="Master English Language skills at St. Louis Demonstration JHS. Our GES-aligned curriculum covers reading, writing, speaking, listening, grammar, literature, and communication skills for Basic 7-9 students."
        keywords="English Language, GES curriculum, reading writing speaking listening, grammar literature, communication skills, St. Louis Demonstration JHS, Ghana JHS English"
        canonicalUrl="https://stlouisdemojhs.com/subject/english-language"
      
      canonical="https://stlouisdemojhs.com/subjects/englishlanguagepage.tsx"
      />

      <div className="min-h-screen bg-black text-white">
        {/* Compact Mobile Header */}
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
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-white">
                  English Language
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Edge to Edge */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          {/* Compact Mobile Hero */}
          <div className="relative min-h-[25vh] sm:min-h-[35vh] flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7126.HEIC?updatedAt=1748099386709"
                alt="English Language Learning at St. Louis Demonstration JHS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-purple-900/40"></div>
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-500/20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
                >
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  English Language <span className="text-blue-400">Excellence</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Master the art of communication through comprehensive language arts education aligned with Ghana Education Service curriculum for Basic 7-9
                </motion.p>
              </div>
            </div>
          </div>

          {/* GES Curriculum Overview Section */}
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
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-blue-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  GES Curriculum Objectives
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
                    The Ghana Education Service English Language curriculum for Basic 7-9 is designed to develop students' proficiency in all four language skills: listening, speaking, reading, and writing. Our program emphasizes practical communication skills essential for academic success and daily life.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Learning Areas:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        'Reading Comprehension',
                        'Creative & Essay Writing',
                        'Grammar & Language Use',
                        'Literature & Poetry',
                        'Oral Communication',
                        'Listening Skills',
                        'Vocabulary Development',
                        'Spelling & Punctuation'
                      ].map((area, index) => (
                        <motion.div
                          key={area}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-blue-400/30"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-blue-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Learning Outcomes</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Communicate effectively in both spoken and written English</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Appreciate literature from Ghana, Africa, and the global community</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Develop critical thinking through language analysis and interpretation</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Assessment Methods</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Continuous assessment through class participation and assignments</li>
                      <li>• Reading comprehension and literature analysis tests</li>
                      <li>• Creative writing and essay composition projects</li>
                      <li>• Oral presentations and speaking assessments</li>
                      <li>• Grammar and vocabulary quizzes</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Detailed Curriculum Content Section */}
          <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
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
                  Comprehensive Language Skills Development
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {/* Reading & Comprehension */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Reading & Comprehension</h4>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Students develop advanced reading skills through diverse texts including narratives, expository texts, poetry, and drama. Emphasis on critical analysis, inference, and interpretation.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Key Components:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Literal and inferential comprehension</li>
                        <li>• Critical evaluation of texts</li>
                        <li>• Vocabulary in context</li>
                        <li>• Reading strategies and techniques</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Writing Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Writing Skills</h4>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Comprehensive writing program covering narrative, descriptive, expository, and argumentative writing. Focus on structure, coherence, and effective communication.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Writing Types:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Creative and narrative writing</li>
                        <li>• Formal and informal letters</li>
                        <li>• Essays and compositions</li>
                        <li>• Reports and summaries</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Speaking & Listening */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Speaking & Listening</h4>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Oral communication skills development through presentations, discussions, debates, and listening activities. Emphasis on clarity, confidence, and effective expression.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Activities Include:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Oral presentations and speeches</li>
                        <li>• Group discussions and debates</li>
                        <li>• Listening comprehension exercises</li>
                        <li>• Drama and role-playing</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Literature Study */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Literature Study</h4>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Exploration of Ghanaian, African, and world literature including prose, poetry, and drama. Students analyze themes, characters, and literary devices.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Literary Forms:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Ghanaian and African literature</li>
                        <li>• Poetry analysis and appreciation</li>
                        <li>• Drama and theatrical works</li>
                        <li>• Short stories and novels</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* BECE Preparation Section */}
          <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4 sm:space-y-6 md:space-y-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-500/20 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-400" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-green-300 mb-3 sm:mb-4 md:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  BECE Excellence Preparation
                </h3>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Our English Language program thoroughly prepares students for the Basic Education Certificate Examination (BECE) with comprehensive coverage of all examination components and extensive practice opportunities.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {[
                    { title: 'Paper 1', desc: 'Objective Test - Grammar, Comprehension, Literature' },
                    { title: 'Paper 2', desc: 'Essay Writing - Creative, Formal, Informal Writing' },
                    { title: 'Paper 3', desc: 'Literature - Poetry, Prose, Drama Analysis' }
                  ].map((paper, index) => (
                    <motion.div
                      key={paper.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-green-400/30"
                    >
                      <h4 className="text-green-300 font-bold text-base sm:text-lg mb-2">{paper.title}</h4>
                      <p className="text-gray-100 text-xs sm:text-sm">{paper.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnglishLanguagePage;
