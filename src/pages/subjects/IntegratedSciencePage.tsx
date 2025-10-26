import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Microscope, Target, Award, Atom, Beaker, Leaf, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import ShimmerLoader from '../../components/common/ShimmerLoader';

const IntegratedSciencePage: React.FC = () => {
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
        title="Integrated Science - Comprehensive Science Education | St. Louis Demonstration JHS"
        description="Excel in Integrated Science at St. Louis Demonstration JHS. Our GES-aligned curriculum covers physics, chemistry, biology, earth science, and scientific method for Basic 7-9 students."
        keywords="Integrated Science, GES curriculum, physics chemistry biology, earth science, scientific method, St. Louis Demonstration JHS, Ghana JHS Science"
        canonicalUrl="https://stlouisdemojhs.com/subject/integrated-science"
      /
        canonical="https://stlouisdemojhs.com/subjects/integratedsciencepage.tsx"
      >

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
                <Microscope className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-white">
                  Integrated Science
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
                src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7000.HEIC?updatedAt=1748099386709"
                alt="Integrated Science Laboratory at St. Louis Demonstration JHS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black/50 to-violet-900/40"></div>
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-purple-500/20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
                >
                  <Microscope className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  Integrated <span className="text-purple-400">Science</span> Excellence
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Explore the wonders of physics, chemistry, and biology through hands-on scientific investigation aligned with Ghana Education Service curriculum
                </motion.p>
              </div>
            </div>
          </div>

          {/* GES Curriculum Overview Section */}
          <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-purple-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-purple-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  GES Integrated Science Curriculum
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
                    The Ghana Education Service Integrated Science curriculum for Basic 7-9 combines physics, chemistry, biology, and earth science into a unified approach. Students develop scientific literacy through inquiry-based learning and practical investigations.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Science Areas:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        'Physics Concepts',
                        'Chemistry Principles',
                        'Biology & Life Sciences',
                        'Earth & Space Science',
                        'Scientific Method',
                        'Laboratory Skills',
                        'Environmental Science',
                        'Science & Technology'
                      ].map((area, index) => (
                        <motion.div
                          key={area}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-purple-400/30"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Learning Objectives</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Atom className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Understand fundamental scientific concepts and principles</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Beaker className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Develop practical laboratory and investigation skills</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Apply scientific knowledge to environmental and health issues</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Assessment Methods</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Practical laboratory investigations and experiments</li>
                      <li>• Scientific project work and research assignments</li>
                      <li>• Continuous assessment through class tests and quizzes</li>
                      <li>• Group work and collaborative scientific investigations</li>
                      <li>• Science fair presentations and demonstrations</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Science Disciplines Section */}
          <div className="bg-gradient-to-br from-violet-900/30 to-indigo-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-violet-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Microscope className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-violet-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-violet-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Scientific Disciplines Integration
                </h3>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                {/* Physics */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-violet-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Atom className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-blue-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Physics</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Study of matter, energy, motion, and forces. Students explore fundamental physical principles through practical investigations.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Topics Include:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Motion and forces</li>
                        <li>• Energy and work</li>
                        <li>• Heat and temperature</li>
                        <li>• Light and sound</li>
                        <li>• Electricity and magnetism</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Chemistry */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-violet-400/30"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Beaker className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-green-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Chemistry</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Investigation of matter composition, properties, and chemical reactions. Hands-on laboratory work develops practical skills.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Key Areas:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Atoms and molecules</li>
                        <li>• Chemical reactions</li>
                        <li>• Acids, bases, and salts</li>
                        <li>• Metals and non-metals</li>
                        <li>• Air and water chemistry</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Biology */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-violet-400/30 md:col-span-2 lg:col-span-1"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
                    <h4 className="text-lg sm:text-xl font-bold text-emerald-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Biology</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                      Study of living organisms, their structure, function, and interactions with the environment. Focus on life processes and ecosystems.
                    </p>
                    <div className="space-y-2">
                      <h5 className="text-white font-semibold text-sm sm:text-base">Content Areas:</h5>
                      <ul className="text-gray-200 text-xs sm:text-sm space-y-1">
                        <li>• Cell structure and function</li>
                        <li>• Human body systems</li>
                        <li>• Plant and animal life</li>
                        <li>• Reproduction and genetics</li>
                        <li>• Ecology and environment</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Laboratory & Practical Skills Section */}
          <div className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-indigo-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Beaker className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-indigo-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-indigo-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Laboratory & Practical Skills
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
                    Hands-on laboratory work is central to our Integrated Science program. Students develop essential practical skills through guided investigations, experiments, and scientific inquiry projects that reinforce theoretical concepts.
                  </p>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-indigo-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Laboratory Skills</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Safe laboratory practices',
                        'Equipment handling',
                        'Measurement techniques',
                        'Data collection methods',
                        'Observation skills',
                        'Recording procedures'
                      ].map((skill, index) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                          <span className="text-gray-100 text-xs sm:text-sm">{skill}</span>
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
                  <div className="bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-indigo-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Scientific Method</h4>
                    <div className="space-y-3">
                      <p className="text-gray-100 text-sm sm:text-base">Students learn to apply the scientific method systematically:</p>
                      <ol className="space-y-2 text-gray-100 text-sm sm:text-base">
                        <li>1. Observation and questioning</li>
                        <li>2. Hypothesis formation</li>
                        <li>3. Experimental design</li>
                        <li>4. Data collection and analysis</li>
                        <li>5. Conclusion and communication</li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-indigo-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-indigo-300 mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Practical Investigations</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Physics experiments on motion, forces, and energy</li>
                      <li>• Chemistry reactions and material testing</li>
                      <li>• Biology observations and life process studies</li>
                      <li>• Environmental monitoring and analysis</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* BECE Preparation Section */}
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
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
                  BECE Science Preparation
                </h3>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Our comprehensive Integrated Science program ensures students excel in the BECE examination through thorough coverage of all scientific concepts and extensive practical experience.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {[
                    { title: 'Paper 1', desc: 'Objective Test - Multiple choice questions covering physics, chemistry, and biology' },
                    { title: 'Paper 2', desc: 'Theory & Practical - Scientific explanations, calculations, and practical applications' }
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

                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Science Excellence Strategies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                    <ul className="space-y-2 text-gray-100">
                      <li>• Regular practical investigations and experiments</li>
                      <li>• Scientific concept mapping and visualization</li>
                      <li>• Past question analysis and practice</li>
                    </ul>
                    <ul className="space-y-2 text-gray-100">
                      <li>• Laboratory skills assessment and improvement</li>
                      <li>• Science project presentations and demonstrations</li>
                      <li>• Mock examinations with detailed feedback</li>
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

export default IntegratedSciencePage;
