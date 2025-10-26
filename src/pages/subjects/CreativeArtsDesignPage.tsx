import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Palette, Target, Award, Brush, Music, Camera, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import ShimmerLoader from '../../components/common/ShimmerLoader';

const CreativeArtsDesignPage: React.FC = () => {
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
        title="Creative Arts & Design - Visual & Performing Arts | St. Louis Demonstration JHS"
        description="Excel in Creative Arts & Design at St. Louis Demonstration JHS. Our GES-aligned curriculum covers visual arts, performing arts, and creative expression for Basic 7-9 students."
        keywords="Creative Arts Design, GES curriculum, visual arts, performing arts, creative expression, art education, St. Louis Demonstration JHS, Ghana JHS Creative Arts"
        canonicalUrl="https://stlouisdemojhs.com/subject/creative-arts-design"
      /
        canonical="https://stlouisdemojhs.com/subjects/creativeartsdesignpage.tsx"
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
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-white">
                  Creative Arts & Design
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
                alt="Creative Arts & Design at St. Louis Demonstration JHS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-900/40 via-black/50 to-purple-900/40"></div>
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-pink-500/20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
                >
                  <Palette className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-pink-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  Creative Arts <span className="text-pink-400">&</span> <span className="text-purple-400">Design</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Unleash creativity through visual and performing arts education aligned with Ghana Education Service curriculum
                </motion.p>
              </div>
            </div>
          </div>

          {/* GES Curriculum Overview Section */}
          <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-pink-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-pink-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-pink-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  GES Creative Arts & Design Curriculum
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
                    The Ghana Education Service Creative Arts & Design curriculum for Basic 7-9 develops students' creative expression, artistic skills, and cultural appreciation. Students explore visual arts, performing arts, and design thinking while building aesthetic awareness and creative problem-solving abilities.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Creative Areas:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        'Visual Arts',
                        'Performing Arts',
                        'Design & Graphics',
                        'Cultural Arts',
                        'Art History',
                        'Creative Expression',
                        'Art Appreciation',
                        'Digital Arts'
                      ].map((area, index) => (
                        <motion.div
                          key={area}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-pink-400/30"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 flex-shrink-0" />
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-pink-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-pink-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Learning Objectives</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Develop artistic skills and creative expression</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Brush className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Understand art history and cultural heritage</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Build aesthetic appreciation and critical thinking</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-pink-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Assessment Methods</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Art portfolio development and presentation</li>
                      <li>• Creative projects and artistic performances</li>
                      <li>• Art history and cultural knowledge assessments</li>
                      <li>• Collaborative group projects and exhibitions</li>
                      <li>• Practical skills demonstrations and critiques</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Creative Arts Disciplines Section */}
          <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-purple-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Brush className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-purple-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-purple-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Creative Arts Disciplines
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Comprehensive artistic education covering visual arts, performing arts, and creative design
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Visual Arts */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="w-6 h-6 text-purple-400" />
                    <h4 className="text-lg font-bold text-purple-300">Visual Arts</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Drawing, painting, sculpture, and visual design fundamentals.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Drawing techniques and sketching</li>
                      <li>• Painting with various media</li>
                      <li>• Basic sculpture and 3D art</li>
                      <li>• Color theory and composition</li>
                      <li>• Printmaking and graphics</li>
                      <li>• Mixed media and collage</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Performing Arts */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-pink-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Music className="w-6 h-6 text-pink-400" />
                    <h4 className="text-lg font-bold text-pink-300">Performing Arts</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Drama, dance, music, and theatrical performance skills.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Drama and theatrical performance</li>
                      <li>• Traditional and contemporary dance</li>
                      <li>• Music appreciation and performance</li>
                      <li>• Storytelling and oral traditions</li>
                      <li>• Stage design and production</li>
                      <li>• Creative movement and expression</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Design & Graphics */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-blue-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Camera className="w-6 h-6 text-blue-400" />
                    <h4 className="text-lg font-bold text-blue-300">Design & Graphics</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Graphic design, digital arts, and visual communication principles.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Basic graphic design principles</li>
                      <li>• Logo and poster design</li>
                      <li>• Digital art and computer graphics</li>
                      <li>• Typography and layout design</li>
                      <li>• Photography basics</li>
                      <li>• Visual communication design</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Cultural Arts */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-green-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-green-400" />
                    <h4 className="text-lg font-bold text-green-300">Cultural Arts</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Traditional Ghanaian arts, crafts, and cultural expressions.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Traditional Ghanaian crafts</li>
                      <li>• Kente weaving and textile arts</li>
                      <li>• Pottery and ceramics</li>
                      <li>• Wood carving and sculpture</li>
                      <li>• Beadwork and jewelry making</li>
                      <li>• Cultural festivals and celebrations</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Art History & Appreciation */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-orange-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-orange-400" />
                    <h4 className="text-lg font-bold text-orange-300">Art History & Appreciation</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Understanding art movements, famous artists, and aesthetic principles.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• African art history and traditions</li>
                      <li>• World art movements and styles</li>
                      <li>• Famous artists and their works</li>
                      <li>• Art criticism and analysis</li>
                      <li>• Museum and gallery visits</li>
                      <li>• Contemporary art trends</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Creative Expression */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-red-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Brush className="w-6 h-6 text-red-400" />
                    <h4 className="text-lg font-bold text-red-300">Creative Expression</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Personal artistic development and creative problem-solving skills.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Personal artistic style development</li>
                      <li>• Creative problem-solving techniques</li>
                      <li>• Art therapy and emotional expression</li>
                      <li>• Collaborative art projects</li>
                      <li>• Art exhibitions and showcases</li>
                      <li>• Portfolio development</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Creative Careers Section */}
          <div className="bg-gradient-to-br from-indigo-900/30 to-pink-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
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
                  Creative Career Opportunities
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Creative arts education opens doors to diverse career paths in the creative economy
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
                    <h4 className="text-lg sm:text-xl font-bold text-indigo-300 mb-3 sm:mb-4">Visual Arts Careers</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Graphic designer and visual artist</li>
                      <li>• Illustrator and concept artist</li>
                      <li>• Art teacher and educator</li>
                      <li>• Museum curator and art critic</li>
                      <li>• Interior designer and decorator</li>
                      <li>• Fashion designer and stylist</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-pink-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-pink-300 mb-3 sm:mb-4">Performing Arts Careers</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Actor and theatrical performer</li>
                      <li>• Dancer and choreographer</li>
                      <li>• Music performer and composer</li>
                      <li>• Drama teacher and director</li>
                      <li>• Event planner and coordinator</li>
                      <li>• Cultural program manager</li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-br from-indigo-500/20 to-pink-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-indigo-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Why Study Creative Arts?</h4>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3">
                      <Palette className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Creative Expression</h5>
                        <p className="text-gray-100 text-sm">Develop unique artistic voice and personal style</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Brush className="w-5 h-5 text-pink-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Cultural Appreciation</h5>
                        <p className="text-gray-100 text-sm">Understanding of diverse cultures and traditions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Music className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Communication Skills</h5>
                        <p className="text-gray-100 text-sm">Visual and performance communication abilities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Camera className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Innovation Mindset</h5>
                        <p className="text-gray-100 text-sm">Creative problem-solving and design thinking</p>
                      </div>
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
                  BECE Creative Arts & Design Preparation
                </h3>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Our comprehensive Creative Arts & Design program prepares students for BECE success while developing artistic skills and creative expression essential for cultural appreciation and creative careers.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {[
                    { title: 'Paper 1', desc: 'Objective Test - Multiple choice questions on art history, cultural arts, and creative principles' },
                    { title: 'Paper 2', desc: 'Practical Assessment - Art portfolio, creative projects, and performance demonstrations' }
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
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Creative Arts Excellence Strategies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                    <ul className="space-y-2 text-gray-100">
                      <li>• Art portfolio development and curation</li>
                      <li>• Creative project planning and execution</li>
                      <li>• Cultural arts research and presentation</li>
                    </ul>
                    <ul className="space-y-2 text-gray-100">
                      <li>• Performance skills and stage presence</li>
                      <li>• Art history study and analysis</li>
                      <li>• Creative collaboration and teamwork</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-purple-300 mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Artistic Excellence & Cultural Heritage</h4>
                  <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                    Our Creative Arts & Design program nurtures artistic talent while preserving cultural heritage. Students develop technical skills, creative expression, and aesthetic appreciation through hands-on projects and cultural exploration. The curriculum emphasizes both traditional Ghanaian arts and contemporary creative practices, preparing students for artistic careers and cultural leadership roles in Ghana's creative economy.
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

export default CreativeArtsDesignPage;
