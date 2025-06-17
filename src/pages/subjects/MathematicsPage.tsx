import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calculator, Target, Award, TrendingUp, BarChart3, PieChart, CheckCircle2 } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import ShimmerLoader from '../../components/common/ShimmerLoader';
import { useEnhancedNavigation } from '../../hooks/useEnhancedNavigation';

const MathematicsPage: React.FC = () => {
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
        title="Mathematics - Comprehensive Mathematical Excellence | St. Louis Demonstration JHS"
        description="Excel in Mathematics at St. Louis Demonstration JHS. Our GES-aligned curriculum covers algebra, geometry, statistics, number operations, and problem-solving for Basic 7-9 students."
        keywords="Mathematics, GES curriculum, algebra geometry statistics, number operations, problem solving, St. Louis Demonstration JHS, Ghana JHS Mathematics"
        canonical="https://stlouisdemojhs.com/subject/mathematics"
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
                Mathematics
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
                src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7115.HEIC?updatedAt=1748099386709"
                alt="Mathematics Excellence at St. Louis Demonstration JHS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-black/50 to-green-900/40"></div>
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-emerald-500/20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
                >
                  <Calculator className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  Mathematical <span className="text-emerald-400">Excellence</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Develop analytical thinking and problem-solving skills through comprehensive mathematics education aligned with Ghana Education Service curriculum
                </motion.p>
              </div>
            </div>
          </div>

          {/* GES Curriculum Overview Section */}
          <div className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-emerald-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-emerald-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-emerald-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  GES Mathematics Curriculum
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
                    The Ghana Education Service Mathematics curriculum for Basic 7-9 emphasizes conceptual understanding, procedural fluency, and mathematical reasoning. Students develop critical thinking skills through problem-solving and real-world applications.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Mathematical Strands:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        'Number Operations',
                        'Algebra & Patterns',
                        'Geometry & Measurement',
                        'Statistics & Probability',
                        'Ratio & Proportion',
                        'Data Handling',
                        'Problem Solving',
                        'Mathematical Reasoning'
                      ].map((strand, index) => (
                        <motion.div
                          key={strand}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-emerald-400/30"
                        >
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
                          <span className="text-white font-medium text-xs sm:text-sm md:text-base">{strand}</span>
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-emerald-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-emerald-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Learning Objectives</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Develop computational fluency and mathematical reasoning skills</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Apply mathematical concepts to solve real-world problems</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Analyze data and interpret statistical information effectively</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-emerald-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Assessment Approach</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Continuous assessment through problem-solving tasks</li>
                      <li>• Mathematical investigations and project work</li>
                      <li>• Regular quizzes and computational exercises</li>
                      <li>• Group work and collaborative problem solving</li>
                      <li>• Real-world application assignments</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mathematical Strands Section */}
          <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-green-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Calculator className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-green-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Mathematical Content Areas
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {/* Number Operations */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-green-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Number Operations</h4>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Comprehensive study of whole numbers, fractions, decimals, percentages, and integers. Students master fundamental operations and develop number sense.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Topics Include:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Place value and number systems</li>
                        <li>• Operations with fractions and decimals</li>
                        <li>• Percentage calculations and applications</li>
                        <li>• Positive and negative integers</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Algebra & Patterns */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-green-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Algebra & Patterns</h4>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Introduction to algebraic thinking through patterns, expressions, and simple equations. Foundation for advanced mathematical concepts.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Key Areas:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Number patterns and sequences</li>
                        <li>• Simple algebraic expressions</li>
                        <li>• Linear equations and inequalities</li>
                        <li>• Substitution and evaluation</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Geometry & Measurement */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-green-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Geometry & Measurement</h4>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Exploration of shapes, space, and measurement concepts. Students develop spatial reasoning and practical measurement skills.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Content Areas:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Properties of 2D and 3D shapes</li>
                        <li>• Perimeter, area, and volume calculations</li>
                        <li>• Angles and geometric constructions</li>
                        <li>• Coordinate geometry basics</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Statistics & Probability */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-green-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-green-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Statistics & Probability</h4>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Data collection, analysis, and interpretation skills. Introduction to probability concepts and statistical reasoning.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Skills Developed:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Data collection and organization</li>
                        <li>• Charts, graphs, and tables</li>
                        <li>• Mean, median, and mode</li>
                        <li>• Basic probability concepts</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* BECE Preparation Section */}
          <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4 sm:space-y-6 md:space-y-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-500/20 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-400" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-300 mb-3 sm:mb-4 md:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  BECE Mathematics Preparation
                </h3>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Our comprehensive Mathematics program ensures students are thoroughly prepared for the BECE examination with extensive practice in all mathematical strands and problem-solving techniques.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {[
                    { title: 'Paper 1', desc: 'Objective Test - Multiple choice questions covering all mathematical strands' },
                    { title: 'Paper 2', desc: 'Theory - Problem-solving, calculations, and mathematical reasoning' }
                  ].map((paper, index) => (
                    <motion.div
                      key={paper.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-blue-400/30"
                    >
                      <h4 className="text-blue-300 font-bold text-base sm:text-lg mb-2">{paper.title}</h4>
                      <p className="text-gray-100 text-xs sm:text-sm">{paper.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Examination Success Strategies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                    <ul className="space-y-2 text-gray-100">
                      <li>• Regular practice with past questions</li>
                      <li>• Step-by-step problem-solving methods</li>
                      <li>• Time management techniques</li>
                    </ul>
                    <ul className="space-y-2 text-gray-100">
                      <li>• Mathematical formula memorization</li>
                      <li>• Error analysis and correction</li>
                      <li>• Mock examinations and assessments</li>
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

export default MathematicsPage;
