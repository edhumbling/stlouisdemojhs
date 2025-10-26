import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Monitor, Target, Award, Code, Wifi, Database, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import ShimmerLoader from '../../components/common/ShimmerLoader';

const ComputingICTPage: React.FC = () => {
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
        title="Computing (ICT) - Digital Literacy & Technology | St. Louis Demonstration JHS"
        description="Excel in Computing (ICT) at St. Louis Demonstration JHS. Our GES-aligned curriculum covers digital literacy, programming, networks, and technology skills for Basic 7-9 students."
        keywords="Computing ICT, GES curriculum, digital literacy, programming, computer science, technology skills, St. Louis Demonstration JHS, Ghana JHS Computing"
        canonicalUrl="https://stlouisdemojhs.com/subject/computing-ict"
      
      canonical="https://stlouisdemojhs.com/subjects/computingictpage.tsx"
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
                <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-white">
                  Computing (ICT)
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
                src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7095.HEIC?updatedAt=1748099386709"
                alt="Computing ICT Laboratory at St. Louis Demonstration JHS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-black/50 to-blue-900/40"></div>
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-cyan-500/20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
                >
                  <Monitor className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-cyan-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  Computing <span className="text-cyan-400">(ICT)</span> Excellence
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Master digital literacy, programming, and technology skills through comprehensive computing education aligned with Ghana Education Service curriculum
                </motion.p>
              </div>
            </div>
          </div>

          {/* GES Curriculum Overview Section */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-cyan-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-cyan-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-cyan-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  GES Computing (ICT) Curriculum
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
                    The Ghana Education Service Computing (ICT) curriculum for Basic 7-9 develops digital literacy and computational thinking skills. Students learn to use technology effectively while understanding fundamental computing concepts and programming principles.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Computing Areas:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        'Digital Literacy',
                        'Programming Basics',
                        'Computer Systems',
                        'Networks & Internet',
                        'Data & Information',
                        'Computational Thinking',
                        'Digital Citizenship',
                        'Technology Applications'
                      ].map((area, index) => (
                        <motion.div
                          key={area}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-cyan-400/30"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-cyan-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-cyan-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Learning Objectives</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Develop digital literacy and computer operation skills</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Code className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Understand programming concepts and computational thinking</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Learn responsible digital citizenship and online safety</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-cyan-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Assessment Methods</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Practical computer skills demonstrations and projects</li>
                      <li>• Programming assignments and coding challenges</li>
                      <li>• Digital portfolio creation and presentation</li>
                      <li>• Online safety and digital citizenship assessments</li>
                      <li>• Technology research and innovation projects</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Digital Skills Development Section */}
          <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Code className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-blue-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-blue-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Digital Skills Development Areas
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Comprehensive technology education covering essential digital skills for the modern world
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Computer Fundamentals */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Monitor className="w-6 h-6 text-blue-400" />
                    <h4 className="text-lg font-bold text-blue-300">Computer Fundamentals</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Basic computer operations, hardware components, and software applications.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Computer hardware and software basics</li>
                      <li>• Operating system navigation</li>
                      <li>• File management and organization</li>
                      <li>• Input and output devices</li>
                      <li>• Computer maintenance and care</li>
                      <li>• Troubleshooting common problems</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Programming & Coding */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-green-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Code className="w-6 h-6 text-green-400" />
                    <h4 className="text-lg font-bold text-green-300">Programming & Coding</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Introduction to programming concepts and computational thinking skills.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Algorithm design and logic</li>
                      <li>• Visual programming with Scratch</li>
                      <li>• Basic HTML and web development</li>
                      <li>• Problem-solving strategies</li>
                      <li>• Debugging and testing</li>
                      <li>• Simple game and app creation</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Networks & Internet */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Wifi className="w-6 h-6 text-purple-400" />
                    <h4 className="text-lg font-bold text-purple-300">Networks & Internet</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Understanding networks, internet technologies, and online communication.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Internet basics and web browsing</li>
                      <li>• Email communication and etiquette</li>
                      <li>• Network types and connections</li>
                      <li>• Cloud computing and storage</li>
                      <li>• Online collaboration tools</li>
                      <li>• Internet safety and security</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Data & Information */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-orange-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-6 h-6 text-orange-400" />
                    <h4 className="text-lg font-bold text-orange-300">Data & Information</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Data collection, analysis, and information management skills.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Data types and representation</li>
                      <li>• Spreadsheet applications</li>
                      <li>• Database basics and queries</li>
                      <li>• Data visualization and charts</li>
                      <li>• Information research skills</li>
                      <li>• Digital data security</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Digital Citizenship */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-red-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-red-400" />
                    <h4 className="text-lg font-bold text-red-300">Digital Citizenship</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Responsible and ethical use of technology in digital society.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Online ethics and digital rights</li>
                      <li>• Cyberbullying prevention</li>
                      <li>• Privacy and personal information</li>
                      <li>• Digital footprint awareness</li>
                      <li>• Intellectual property respect</li>
                      <li>• Healthy technology use</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Technology Applications */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-cyan-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-cyan-400" />
                    <h4 className="text-lg font-bold text-cyan-300">Technology Applications</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Practical application of technology tools for productivity and creativity.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Word processing and documents</li>
                      <li>• Presentation software skills</li>
                      <li>• Digital media creation</li>
                      <li>• Educational software tools</li>
                      <li>• Mobile app usage</li>
                      <li>• Technology project management</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Future Technology Careers Section */}
          <div className="bg-gradient-to-br from-indigo-900/30 to-cyan-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 sm:mb-10 md:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-indigo-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-indigo-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-indigo-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Future Technology Careers
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Computing skills open doors to exciting career opportunities in our digital future
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-indigo-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 sm:mb-4">Technology Careers</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Software development and programming</li>
                      <li>• Web design and development</li>
                      <li>• Cybersecurity and information security</li>
                      <li>• Data analysis and data science</li>
                      <li>• Network administration and IT support</li>
                      <li>• Digital marketing and e-commerce</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-cyan-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-cyan-300 mb-3 sm:mb-4">Emerging Fields</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Artificial intelligence and machine learning</li>
                      <li>• Mobile app development</li>
                      <li>• Cloud computing and DevOps</li>
                      <li>• Digital content creation</li>
                      <li>• Technology entrepreneurship</li>
                      <li>• Educational technology</li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-indigo-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Why Learn Computing?</h4>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3">
                      <Monitor className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Digital Literacy</h5>
                        <p className="text-gray-100 text-sm">Essential skills for modern life and work</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Code className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Problem Solving</h5>
                        <p className="text-gray-100 text-sm">Computational thinking and logical reasoning</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wifi className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Global Connection</h5>
                        <p className="text-gray-100 text-sm">Access to worldwide information and opportunities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Innovation Skills</h5>
                        <p className="text-gray-100 text-sm">Creative use of technology for solutions</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* BECE Preparation Section */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4 sm:space-y-6 md:space-y-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-cyan-500/20 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-cyan-400" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-cyan-300 mb-3 sm:mb-4 md:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  BECE Computing (ICT) Preparation
                </h3>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Our comprehensive Computing (ICT) program prepares students for BECE success while developing essential digital skills for future academic and career pathways in technology.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {[
                    { title: 'Paper 1', desc: 'Objective Test - Multiple choice questions on computing concepts, digital literacy, and technology applications' },
                    { title: 'Paper 2', desc: 'Practical Assessment - Hands-on computer skills, programming tasks, and digital project presentations' }
                  ].map((paper, index) => (
                    <motion.div
                      key={paper.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-cyan-400/30"
                    >
                      <h4 className="text-cyan-300 font-bold text-base sm:text-lg mb-2">{paper.title}</h4>
                      <p className="text-gray-100 text-xs sm:text-sm">{paper.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-cyan-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Computing Excellence Strategies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                    <ul className="space-y-2 text-gray-100">
                      <li>• Hands-on computer lab practice and skill development</li>
                      <li>• Programming projects and computational thinking</li>
                      <li>• Digital portfolio creation and presentation skills</li>
                    </ul>
                    <ul className="space-y-2 text-gray-100">
                      <li>• Technology research and innovation projects</li>
                      <li>• Online safety and digital citizenship training</li>
                      <li>• Real-world technology application scenarios</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-indigo-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-indigo-300 mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>21st Century Digital Skills</h4>
                  <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                    Our Computing (ICT) program equips students with essential digital literacy skills for the modern world. Students learn to use technology responsibly and effectively while developing computational thinking abilities. The curriculum emphasizes practical skills, creative problem-solving, and ethical technology use, preparing students for success in Ghana's digital economy and global technology landscape.
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

export default ComputingICTPage;
