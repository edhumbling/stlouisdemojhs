import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Music, Target, Award, Volume2, Mic, Radio, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/seo/SEOHead';
import ShimmerLoader from '../../components/common/ShimmerLoader';

const MusicPage: React.FC = () => {
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
        title="Music Education - Musical Expression & Performance | St. Louis Demonstration JHS"
        description="Excel in Music at St. Louis Demonstration JHS. Our GES-aligned curriculum covers music theory, performance, composition, and cultural music traditions for Basic 7-9 students."
        keywords="Music education, GES curriculum, music theory, performance, composition, cultural music, St. Louis Demonstration JHS, Ghana JHS Music"
        canonicalUrl="https://stlouisdemojhs.com/subject/music"
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
                <Music className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                <h1 className="text-sm sm:text-lg md:text-xl font-bold text-white">
                  Music Education
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
                alt="Music Education at St. Louis Demonstration JHS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-black/50 to-teal-900/40"></div>
            </div>

            <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-emerald-500/20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6"
                >
                  <Music className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-400" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
                >
                  Music <span className="text-emerald-400">Education</span> Excellence
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 leading-relaxed"
                  style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
                >
                  Develop musical talents through comprehensive music education aligned with Ghana Education Service curriculum
                </motion.p>
              </div>
            </div>
          </div>

          {/* GES Curriculum Overview Section */}
          <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
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
                  GES Music Education Curriculum
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
                    The Ghana Education Service Music curriculum for Basic 7-9 develops students' musical abilities, cultural appreciation, and creative expression. Students learn music theory, performance skills, and explore both traditional Ghanaian music and global musical traditions.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Core Music Areas:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        'Music Theory',
                        'Vocal Performance',
                        'Instrumental Music',
                        'Traditional Music',
                        'Music Composition',
                        'Music Appreciation',
                        'Rhythm & Movement',
                        'Music Technology'
                      ].map((area, index) => (
                        <motion.div
                          key={area}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-emerald-400/30"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-emerald-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-emerald-300 mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Learning Objectives</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Music className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Develop musical skills and performance abilities</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Understand music theory and cultural traditions</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-100 text-sm sm:text-base">Foster creativity and artistic expression</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-emerald-400/30">
                    <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Assessment Methods</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Solo and ensemble performance assessments</li>
                      <li>• Music theory and notation examinations</li>
                      <li>• Creative composition and arrangement projects</li>
                      <li>• Cultural music research and presentations</li>
                      <li>• Listening skills and music appreciation tests</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Musical Skills Development Section */}
          <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-teal-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-teal-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-teal-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Musical Skills Development Areas
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Comprehensive music education covering performance, theory, composition, and cultural appreciation
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Music Theory & Notation */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-teal-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Music className="w-6 h-6 text-teal-400" />
                    <h4 className="text-lg font-bold text-teal-300">Music Theory & Notation</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Fundamental music theory concepts, notation reading, and musical literacy.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Musical notation and staff reading</li>
                      <li>• Rhythm patterns and time signatures</li>
                      <li>• Scales, intervals, and key signatures</li>
                      <li>• Chord progressions and harmony</li>
                      <li>• Musical forms and structures</li>
                      <li>• Sight-reading and ear training</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Vocal Performance */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-emerald-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Mic className="w-6 h-6 text-emerald-400" />
                    <h4 className="text-lg font-bold text-emerald-300">Vocal Performance</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Vocal technique development, solo and choral singing skills.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Proper breathing and vocal technique</li>
                      <li>• Solo singing and performance skills</li>
                      <li>• Choral singing and harmony</li>
                      <li>• Vocal warm-ups and exercises</li>
                      <li>• Song interpretation and expression</li>
                      <li>• Stage presence and confidence</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Instrumental Music */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-cyan-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Volume2 className="w-6 h-6 text-cyan-400" />
                    <h4 className="text-lg font-bold text-cyan-300">Instrumental Music</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Playing various musical instruments and ensemble performance.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Keyboard and piano basics</li>
                      <li>• Traditional Ghanaian instruments</li>
                      <li>• Percussion and rhythm instruments</li>
                      <li>• String and wind instruments</li>
                      <li>• Ensemble playing and coordination</li>
                      <li>• Instrument care and maintenance</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Traditional Ghanaian Music */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-yellow-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Radio className="w-6 h-6 text-yellow-400" />
                    <h4 className="text-lg font-bold text-yellow-300">Traditional Ghanaian Music</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Exploring Ghana's rich musical heritage and cultural traditions.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Traditional drumming patterns</li>
                      <li>• Folk songs and cultural music</li>
                      <li>• Ceremonial and ritual music</li>
                      <li>• Regional musical styles</li>
                      <li>• Traditional dance and music integration</li>
                      <li>• Cultural significance and history</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Music Composition */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-purple-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-purple-400" />
                    <h4 className="text-lg font-bold text-purple-300">Music Composition</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Creating original music and developing compositional skills.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Melody and rhythm creation</li>
                      <li>• Song writing and lyrics</li>
                      <li>• Simple arrangements and orchestration</li>
                      <li>• Creative musical expression</li>
                      <li>• Digital music composition tools</li>
                      <li>• Collaborative composition projects</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Music Technology */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-pink-400/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-pink-400" />
                    <h4 className="text-lg font-bold text-pink-300">Music Technology</h4>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-100 text-sm leading-relaxed">
                      Modern music technology and digital music production basics.
                    </p>
                    <ul className="space-y-1 text-gray-200 text-xs sm:text-sm">
                      <li>• Digital audio recording basics</li>
                      <li>• Music software and applications</li>
                      <li>• Sound editing and mixing</li>
                      <li>• Electronic instruments and MIDI</li>
                      <li>• Music streaming and distribution</li>
                      <li>• Technology in music education</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Music Career Opportunities Section */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-emerald-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-8 sm:mb-10 md:mb-12"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-cyan-500/20 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-cyan-400" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-cyan-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  Music Career Opportunities
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Music education opens doors to diverse career opportunities in performance, education, and the music industry
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-cyan-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-cyan-300 mb-3 sm:mb-4">Performance Careers</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Professional musician and performer</li>
                      <li>• Choir director and vocal coach</li>
                      <li>• Solo artist and recording artist</li>
                      <li>• Session musician and accompanist</li>
                      <li>• Orchestra and ensemble member</li>
                      <li>• Wedding and event performer</li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-emerald-400/30">
                    <h4 className="text-lg sm:text-xl font-bold text-emerald-300 mb-3 sm:mb-4">Music Education & Industry</h4>
                    <ul className="space-y-2 text-gray-100 text-sm sm:text-base">
                      <li>• Music teacher and educator</li>
                      <li>• Music producer and sound engineer</li>
                      <li>• Music therapist and counselor</li>
                      <li>• Music journalist and critic</li>
                      <li>• Music business and management</li>
                      <li>• Cultural arts administrator</li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-cyan-400/30"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Why Study Music?</h4>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3">
                      <Music className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Creative Expression</h5>
                        <p className="text-gray-100 text-sm">Develop artistic talents and personal creativity</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Volume2 className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Cultural Heritage</h5>
                        <p className="text-gray-100 text-sm">Connect with Ghanaian and global musical traditions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mic className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Communication Skills</h5>
                        <p className="text-gray-100 text-sm">Enhanced listening and expressive abilities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Radio className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-white mb-1">Cognitive Development</h5>
                        <p className="text-gray-100 text-sm">Improved memory, focus, and analytical thinking</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* BECE Preparation Section */}
          <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4 sm:space-y-6 md:space-y-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-emerald-500/20 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4 md:mb-6">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-400" />
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-emerald-300 mb-3 sm:mb-4 md:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  BECE Music Education Preparation
                </h3>

                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Our comprehensive Music Education program prepares students for BECE success while developing musical talents and cultural appreciation essential for artistic expression and creative careers.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {[
                    { title: 'Paper 1', desc: 'Objective Test - Multiple choice questions on music theory, cultural music, and musical knowledge' },
                    { title: 'Paper 2', desc: 'Practical Assessment - Musical performance, composition projects, and cultural music presentations' }
                  ].map((paper, index) => (
                    <motion.div
                      key={paper.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-emerald-400/30"
                    >
                      <h4 className="text-emerald-300 font-bold text-base sm:text-lg mb-2">{paper.title}</h4>
                      <p className="text-gray-100 text-xs sm:text-sm">{paper.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl p-4 sm:p-5 md:p-6 border border-emerald-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Music Excellence Strategies</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                    <ul className="space-y-2 text-gray-100">
                      <li>• Regular practice and performance opportunities</li>
                      <li>• Music theory study and notation mastery</li>
                      <li>• Cultural music research and appreciation</li>
                    </ul>
                    <ul className="space-y-2 text-gray-100">
                      <li>• Ensemble participation and collaboration</li>
                      <li>• Creative composition and arrangement projects</li>
                      <li>• Music technology integration and innovation</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-teal-400/30 mt-6 sm:mt-8">
                  <h4 className="text-base sm:text-lg font-bold text-teal-300 mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>Musical Excellence & Cultural Heritage</h4>
                  <p className="text-gray-100 text-sm sm:text-base leading-relaxed">
                    Our Music Education program celebrates Ghana's rich musical heritage while embracing global musical traditions. Students develop performance skills, theoretical knowledge, and creative expression through comprehensive musical training. The curriculum emphasizes both traditional Ghanaian music and contemporary musical practices, preparing students for artistic careers and cultural leadership roles in Ghana's vibrant music industry.
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

export default MusicPage;
