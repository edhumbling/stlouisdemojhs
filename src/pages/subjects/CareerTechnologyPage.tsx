import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Wrench, Target, Award, Hammer, Cog, Lightbulb, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import ShimmerLoader from '../../components/common/ShimmerLoader';

const CareerTechnologyPage: React.FC = () => {
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
        title="Career Technology - Technical & Vocational Skills | St. Louis Demonstration JHS"
        description="Excel in Career Technology at St. Louis Demonstration JHS. Our GES-aligned curriculum covers technical skills, vocational training, and career preparation for Basic 7-9 students."
        keywords="Career Technology, GES curriculum, technical skills, vocational training, career preparation, St. Louis Demonstration JHS, Ghana JHS Career Technology"
        canonicalUrl="https://stlouisdemojhs.com/subject/career-technology"
      /
        canonical="https://stlouisdemojhs.com/subjects/careertechnologypage.tsx"
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
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-white">
                  Career Technology
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
                src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7105.HEIC?updatedAt=1748099386709"
                alt="Career Technology Workshop at St. Louis Demonstration JHS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-black/50 to-orange-900/40"></div>
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-amber-500/20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
                >
                  <Wrench className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-amber-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  Career <span className="text-amber-400">Technology</span> Excellence
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Develop practical technical skills and vocational competencies through hands-on learning aligned with Ghana Education Service curriculum
                </motion.p>
              </div>
            </div>
          </div>

          {/* GES Curriculum Overview Section */}
          <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-amber-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-amber-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  GES Career Technology Curriculum
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
                    The Ghana Education Service Career Technology curriculum for Basic 7-9 provides students with practical technical skills and vocational competencies. Students explore various career pathways while developing hands-on abilities essential for future employment and entrepreneurship.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Technical Areas:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        'Woodwork & Carpentry',
                        'Metalwork & Fabrication',
                        'Electrical Installation',
                        'Masonry & Construction',
                        'Plumbing & Pipe Fitting',
                        'Auto Mechanics',
                        'Tailoring & Dressmaking',
                        'Catering & Hospitality'
                      ].map((area, index) => (
                        <motion.div
                          key={area}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-amber-400/30"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-amber-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-amber-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Learning Objectives</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Hammer className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Develop practical technical and vocational skills</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Cog className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Understand workplace safety and professional practices</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Foster entrepreneurial thinking and innovation</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-amber-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Assessment Methods</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Practical workshop projects and demonstrations</li>
                      <li>• Technical drawing and design portfolios</li>
                      <li>• Safety procedures and workplace practices</li>
                      <li>• Tool identification and proper usage tests</li>
                      <li>• Career exploration and planning assignments</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Technical Skills Areas Section */}
          <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-orange-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Cog className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-orange-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-orange-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Technical Skills Development Areas
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Comprehensive hands-on training in essential technical and vocational skills for career readiness
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Construction & Building */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-orange-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Hammer className="w-6 h-6 text-orange-400" />
                    <h4 className="text-lg font-bold text-orange-300">Construction & Building</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Fundamental construction skills including masonry, carpentry, and basic building techniques.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Woodwork and carpentry basics</li>
                      <li>• Masonry and bricklaying</li>
                      <li>• Concrete mixing and pouring</li>
                      <li>• Basic plumbing installation</li>
                      <li>• Roofing and tiling techniques</li>
                      <li>• Construction safety practices</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Electrical & Electronics */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-yellow-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-6 h-6 text-yellow-400" />
                    <h4 className="text-lg font-bold text-yellow-300">Electrical & Electronics</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Basic electrical installation and electronics fundamentals for modern technology applications.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Electrical circuit basics</li>
                      <li>• Wiring and installation</li>
                      <li>• Electronic components identification</li>
                      <li>• Basic appliance repair</li>
                      <li>• Electrical safety procedures</li>
                      <li>• Solar panel installation basics</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Automotive & Mechanics */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Cog className="w-6 h-6 text-blue-400" />
                    <h4 className="text-lg font-bold text-blue-300">Automotive & Mechanics</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Introduction to automotive systems and basic mechanical repair skills.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Engine components and function</li>
                      <li>• Basic vehicle maintenance</li>
                      <li>• Tire changing and repair</li>
                      <li>• Brake system basics</li>
                      <li>• Tool identification and usage</li>
                      <li>• Workshop safety protocols</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Fashion & Textiles */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-pink-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Wrench className="w-6 h-6 text-pink-400" />
                    <h4 className="text-lg font-bold text-pink-300">Fashion & Textiles</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Tailoring, dressmaking, and textile production skills for the fashion industry.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Pattern making and cutting</li>
                      <li>• Sewing machine operation</li>
                      <li>• Garment construction techniques</li>
                      <li>• Fabric selection and care</li>
                      <li>• Fashion design basics</li>
                      <li>• Quality control and finishing</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Hospitality & Catering */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-green-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-green-400" />
                    <h4 className="text-lg font-bold text-green-300">Hospitality & Catering</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Food preparation, service skills, and hospitality management fundamentals.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Food preparation techniques</li>
                      <li>• Kitchen safety and hygiene</li>
                      <li>• Customer service skills</li>
                      <li>• Menu planning and costing</li>
                      <li>• Table setting and service</li>
                      <li>• Food preservation methods</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Agriculture & Farming */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-emerald-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-6 h-6 text-emerald-400" />
                    <h4 className="text-lg font-bold text-emerald-300">Agriculture & Farming</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Modern farming techniques, crop production, and agricultural business skills.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Crop cultivation techniques</li>
                      <li>• Soil preparation and management</li>
                      <li>• Irrigation and water management</li>
                      <li>• Pest and disease control</li>
                      <li>• Livestock care basics</li>
                      <li>• Agricultural business planning</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Entrepreneurship & Career Preparation Section */}
          <div className="bg-gradient-to-br from-red-900/30 to-purple-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 sm:mb-10 md:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-red-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Entrepreneurship & Career Preparation
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Developing business skills and entrepreneurial mindset for future career success
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-red-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-red-300 mb-3 sm:mb-4">Business Skills Development</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Basic business planning and management</li>
                      <li>• Financial literacy and budgeting</li>
                      <li>• Marketing and customer relations</li>
                      <li>• Record keeping and accounting basics</li>
                      <li>• Product development and innovation</li>
                      <li>• Leadership and teamwork skills</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-purple-300 mb-3 sm:mb-4">Career Exploration</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Industry visits and workplace exposure</li>
                      <li>• Career guidance and counseling</li>
                      <li>• Skills assessment and development planning</li>
                      <li>• Interview preparation and job search skills</li>
                      <li>• Portfolio development and presentation</li>
                      <li>• Networking and professional relationships</li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-red-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Career Technology Benefits</h4>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3">
                      <Hammer className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Practical Skills</h5>
                        <p className="text-gray-100 text-sm">Hands-on technical abilities for immediate employment</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Innovation Mindset</h5>
                        <p className="text-gray-100 text-sm">Creative problem-solving and entrepreneurial thinking</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Cog className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Industry Readiness</h5>
                        <p className="text-gray-100 text-sm">Workplace skills and professional competencies</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Career Pathways</h5>
                        <p className="text-gray-100 text-sm">Multiple options for further education and employment</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* BECE Preparation Section */}
          <div className="bg-gradient-to-br from-purple-900/30 to-amber-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4 sm:space-y-6 md:space-y-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-purple-500/20 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-purple-400" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-purple-300 mb-3 sm:mb-4 md:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  BECE Career Technology Preparation
                </h3>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Our comprehensive Career Technology program prepares students for BECE success while developing practical skills essential for future career pathways and entrepreneurship.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {[
                    { title: 'Paper 1', desc: 'Objective Test - Multiple choice questions on technical knowledge, safety procedures, and career concepts' },
                    { title: 'Paper 2', desc: 'Practical Assessment - Hands-on demonstrations of technical skills and project presentations' }
                  ].map((paper, index) => (
                    <motion.div
                      key={paper.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-purple-400/30"
                    >
                      <h4 className="text-purple-300 font-bold text-base sm:text-lg mb-2">{paper.title}</h4>
                      <p className="text-gray-100 text-xs sm:text-sm">{paper.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-amber-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Career Technology Excellence Strategies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                    <ul className="space-y-2 text-gray-100">
                      <li>• Hands-on workshop practice and skill development</li>
                      <li>• Technical drawing and design project portfolios</li>
                      <li>• Safety procedures and workplace standards mastery</li>
                    </ul>
                    <ul className="space-y-2 text-gray-100">
                      <li>• Industry visits and real-world exposure</li>
                      <li>• Entrepreneurship projects and business planning</li>
                      <li>• Career exploration and pathway planning</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-amber-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-amber-300 mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Future-Ready Skills Development</h4>
                  <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                    Our Career Technology program equips students with both traditional technical skills and modern workplace competencies. Students develop practical abilities while learning entrepreneurial thinking, preparing them for diverse career opportunities in Ghana's evolving economy. The program emphasizes innovation, quality craftsmanship, and professional ethics essential for success in technical and vocational careers.
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

export default CareerTechnologyPage;
