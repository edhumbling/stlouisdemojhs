import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Quote, Star, Heart, Award, Users, BookOpen, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

const FacultyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Faculty & Administration | St. Louis Demonstration JHS"
        description="Meet the dedicated faculty and administration team at St. Louis Demonstration JHS. Learn about our experienced educators, school leadership, and the passionate professionals committed to student success and educational excellence."
        keywords="faculty, administration, teachers, headmistress, school staff, educational leadership, professional educators, Ghana JHS teachers"
        url="/faculty"
        type="website"
        pageType="faculty"
        useGalleryImages={true}
      />
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>


            <div className="flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                School Administration
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                Leadership dedicated to excellence in education
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Headmistress Hero Section - Mobile Optimized */}
      <section className="py-4 sm:py-8 md:py-12 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 -mx-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
            {/* Headmistress Image - Compact Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-sm mx-auto lg:max-w-none"
            >
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl">
                <img
                  src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/b1e9e91071f64fd29fcc8a5f9c79e8d7.png"
                  alt="Mrs. Michelle Acquaye - Headmistress"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '4/5' }}
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                {/* Compact Badge */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-yellow-500 text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                  Headmistress
                </div>
              </div>
            </motion.div>

            {/* Headmistress Info - Compact Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white text-center lg:text-left"
            >
              <div className="mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3"
                    style={{ fontFamily: 'Arial, sans-serif' }}>
                  Mrs. Michelle Acquaye
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-blue-300 font-semibold mb-3 sm:mb-4">
                  Headmistress & Educational Leader
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <span className="bg-blue-600/30 text-blue-200 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                    Excellence
                  </span>
                  <span className="bg-green-600/30 text-green-200 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                    Leadership
                  </span>
                  <span className="bg-yellow-600/30 text-yellow-200 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                    Community
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6 max-w-2xl mx-auto lg:mx-0">
                Leading St. Louis Demonstration J.H.S with passion, dedication, and an unwavering
                commitment to educational excellence. Mrs. Michelle brings years of experience in
                nurturing young minds and building a community where every student can thrive.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">Excellence Focused</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Word from Our Headmistress - Mobile Optimized */}
      <section className="py-6 sm:py-10 md:py-16 bg-gradient-to-br from-blue-900 via-gray-900 to-green-900 -mx-4 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {/* Compact Section Header */}
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400" />
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white"
                    style={{ fontFamily: 'Arial, sans-serif' }}>
                  Word from Our Headmistress
                </h2>
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400 rotate-180" />
              </div>
              <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto rounded-full"></div>
            </div>

            {/* Compact Message Content */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 border border-gray-700/50 shadow-xl">
              <div className="space-y-4 sm:space-y-5 md:space-y-6 text-gray-200 leading-relaxed">
                <p className="text-base sm:text-lg md:text-xl font-semibold text-white mb-4 sm:mb-6 md:mb-8 text-center">
                  "Dear Students, Parents, and Community Members,"
                </p>

                <p className="text-sm sm:text-base md:text-lg">
                  It is with immense pride and joy that I welcome you to <span className="text-blue-300 font-semibold">St. Louis Demonstration Junior High School</span>,
                  a beacon of educational excellence that has been shaping young minds for over four decades. Our school stands as a testament to the power of
                  quality education, unwavering dedication, and the belief that every child possesses unlimited potential.
                </p>

                <p className="text-sm sm:text-base md:text-lg">
                  At St. Louis Demonstration J.H.S, we don't just teach subjects; we <span className="text-green-300 font-semibold">nurture dreams, build character, and inspire greatness</span>.
                  Our students are not merely learners—they are future leaders, innovators, and change-makers who will shape tomorrow's world.
                  We provide them with the tools, knowledge, and confidence they need to excel in every endeavor they pursue.
                </p>

                <p className="text-sm sm:text-base md:text-lg">
                  What makes our school truly special is our commitment to <span className="text-yellow-300 font-semibold">holistic education</span>. We believe in developing
                  not just academic excellence, but also emotional intelligence, creativity, critical thinking, and moral values. Our dedicated faculty
                  works tirelessly to create an environment where every student feels valued, supported, and challenged to reach their highest potential.
                </p>

                <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 my-4 sm:my-6 md:my-8 border-l-2 sm:border-l-4 border-yellow-400">
                  <p className="text-sm sm:text-base md:text-lg font-medium text-white">
                    <span className="text-yellow-300">"To our students:</span> Remember that education is the most powerful weapon you can use to change the world.
                    Embrace every challenge as an opportunity to grow, every failure as a lesson to learn, and every success as a stepping stone to greater achievements.
                    You are capable of extraordinary things—believe in yourselves as much as we believe in you."
                  </p>
                </div>

                <p className="text-sm sm:text-base md:text-lg">
                  As we continue our journey of excellence, I encourage our students to be <span className="text-blue-300 font-semibold">curious, compassionate, and courageous</span>.
                  Ask questions, seek knowledge beyond textbooks, and never stop learning. Be kind to one another, respect your teachers, and honor the values
                  that make our school community strong.
                </p>

                <p className="text-sm sm:text-base md:text-lg">
                  To our parents and guardians, thank you for entrusting us with your most precious gifts—your children. Together, we will continue to build
                  a legacy of excellence that will inspire generations to come.
                </p>

                <div className="text-center mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 md:pt-8 border-t border-gray-600">
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2">With warm regards and best wishes,</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-300 mb-1">Mrs. Michelle Acquaye</p>
                  <p className="text-sm sm:text-base text-blue-300 font-medium">Headmistress</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">St. Louis Demonstration Junior High School</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Dedicated Staff Section - Mobile Optimized */}
      <section className="py-6 sm:py-10 md:py-16 bg-gradient-to-br from-green-900 via-gray-900 to-blue-900 -mx-4 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            {/* Compact Section Header */}
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4"
                  style={{ fontFamily: 'Arial, sans-serif' }}>
                Our Dedicated Staff
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-2">
                The backbone of our institution - committed professionals who work tirelessly to create an environment of excellence
              </p>
            </div>

            {/* Compact Staff Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg">
                  <img
                    src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/f420fda0-fbc8-4159-af85-c31a32e4e256.jpg"
                    alt="St. Louis Demonstration J.H.S Staff Team"
                    className="w-full h-48 sm:h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1">Administrative Excellence</h3>
                    <p className="text-xs sm:text-sm text-gray-200">Supporting every aspect of student success</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg">
                  <img
                    src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/1372d92d-7b10-4cee-a9d2-8b755626f452.jpg"
                    alt="St. Louis Demonstration J.H.S Support Staff"
                    className="w-full h-48 sm:h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1">Dedicated Support Team</h3>
                    <p className="text-xs sm:text-sm text-gray-200">Creating a nurturing learning environment</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative group sm:col-span-2 lg:col-span-1"
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg">
                  <img
                    src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-25%20at%2017.50.56_49e6cf17.jpg"
                    alt="St. Louis Demonstration J.H.S Professional Staff"
                    className="w-full h-48 sm:h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-1">Professional Excellence</h3>
                    <p className="text-xs sm:text-sm text-gray-200">Committed to educational leadership</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Word from Our Staff */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-purple-900 via-gray-900 to-green-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Users className="w-8 h-8 text-green-400" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
                    style={{ fontFamily: 'Arial, sans-serif' }}>
                  Word from Our Staff
                </h2>
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
            </div>

            {/* Staff Message Content */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 border border-gray-700/50 shadow-2xl">
              <div className="space-y-6 text-gray-200 leading-relaxed">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-8 text-center">
                  "From the Heart of Our Staff Family"
                </p>

                <p className="text-base sm:text-lg">
                  As the dedicated staff of <span className="text-green-300 font-semibold">St. Louis Demonstration Junior High School</span>,
                  we stand united in our mission to create an environment where every student can flourish, dream big, and achieve greatness.
                  We are more than just employees—we are guardians of potential, architects of dreams, and champions of student success.
                </p>

                <p className="text-base sm:text-lg">
                  Every day, we arrive at school with <span className="text-blue-300 font-semibold">purpose, passion, and unwavering commitment</span>.
                  From the moment students step through our doors until they leave, we work tirelessly to ensure their safety, comfort, and growth.
                  We believe that a supportive environment is the foundation upon which academic excellence is built.
                </p>

                <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl p-6 my-8 border-l-4 border-green-400">
                  <p className="text-base sm:text-lg font-medium text-white">
                    <span className="text-green-300">"Our Commitment:</span> We pledge to maintain the highest standards of care,
                    create spaces that inspire learning, and support every student's journey toward success. Your dreams are our mission,
                    and your success is our greatest reward."
                  </p>
                </div>

                <p className="text-base sm:text-lg">
                  Our ambition extends beyond maintaining facilities and providing services. We strive to <span className="text-purple-300 font-semibold">uplift every student</span>,
                  to see the spark of curiosity in their eyes, and to know that we've played a part in nurturing the leaders, innovators,
                  and change-makers of tomorrow. We take pride in creating an atmosphere where learning thrives and character is built.
                </p>

                <p className="text-base sm:text-lg">
                  To our beloved students, we want you to know that <span className="text-yellow-300 font-semibold">you are seen, valued, and believed in</span>.
                  Every effort we make—from keeping your classrooms clean and welcoming to ensuring your safety and well-being—is done with love and dedication.
                  We see your potential even when you might not see it yourself.
                </p>

                <div className="bg-gradient-to-r from-purple-600/20 to-green-600/20 rounded-2xl p-6 my-8 border-l-4 border-purple-400">
                  <p className="text-base sm:text-lg font-medium text-white">
                    <span className="text-purple-300">"To Our Students:</span> Remember that success is not just about grades—it's about character,
                    kindness, perseverance, and the courage to pursue your dreams. Treat everyone with respect, work hard, stay curious,
                    and never forget that you have the power to make a positive difference in the world."
                  </p>
                </div>

                <p className="text-base sm:text-lg">
                  We encourage you to <span className="text-blue-300 font-semibold">embrace every opportunity to learn and grow</span>.
                  Be kind to your classmates, respect your teachers, and appreciate the efforts of everyone who contributes to your educational journey.
                  Remember that education is a privilege, and with it comes the responsibility to use your knowledge for the betterment of society.
                </p>

                <p className="text-base sm:text-lg">
                  Together, as one school family, we will continue to build upon the legacy of excellence that defines St. Louis Demonstration J.H.S.
                  Your success is our success, and we are honored to be part of your journey toward a bright and promising future.
                </p>

                <div className="text-center mt-10 pt-8 border-t border-gray-600">
                  <p className="text-lg font-semibold text-white mb-2">With dedication and best wishes,</p>
                  <p className="text-2xl font-bold text-green-300 mb-1">The Staff of St. Louis Demonstration J.H.S</p>
                  <p className="text-blue-300 font-medium">Administrative & Support Team</p>
                  <p className="text-sm text-gray-400 mt-2">"Building Excellence Together"</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 via-black to-blue-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                  style={{ fontFamily: 'Arial, sans-serif' }}>
                Our Leadership Values
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                The principles that guide our administration in creating an environment of excellence, growth, and success
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-2xl p-6 border border-blue-500/30 text-center"
              >
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Excellence</h3>
                <p className="text-gray-300 text-sm">
                  Striving for the highest standards in education, character development, and student achievement.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-2xl p-6 border border-green-500/30 text-center"
              >
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Compassion</h3>
                <p className="text-gray-300 text-sm">
                  Creating a nurturing environment where every student feels valued, supported, and loved.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-2xl p-6 border border-purple-500/30 text-center"
              >
                <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Community</h3>
                <p className="text-gray-300 text-sm">
                  Building strong partnerships between students, parents, teachers, and the wider community.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-2xl p-6 border border-yellow-500/30 text-center"
              >
                <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
                <p className="text-gray-300 text-sm">
                  Embracing modern teaching methods and technology to prepare students for the future.
                </p>
              </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-12 bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-3xl p-8 border border-gray-700/50"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Experience Excellence in Education
              </h3>
              <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                Join our community of learners, dreamers, and achievers. Together, we're building the leaders of tomorrow.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-blue-600/30 text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                  47+ Years of Excellence
                </span>
                <span className="bg-green-600/30 text-green-200 px-4 py-2 rounded-full text-sm font-medium">
                  30,000+ Students Trained
                </span>
                <span className="bg-yellow-600/30 text-yellow-200 px-4 py-2 rounded-full text-sm font-medium">
                  97%+ BECE Success Rate
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FacultyPage;