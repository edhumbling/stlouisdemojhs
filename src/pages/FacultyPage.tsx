import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Quote, Star, Heart, Award, Users, BookOpen, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FacultyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-black pt-16">
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

      {/* Headmistress Hero Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Headmistress Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/b1e9e91071f64fd29fcc8a5f9c79e8d7.png"
                  alt="Mrs. Michelle - Headmistress"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '4/5' }}
                />
                {/* Elegant Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  <Star className="w-4 h-4 inline mr-1" />
                  Headmistress
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-green-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </motion.div>

            {/* Headmistress Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white"
            >
              <div className="mb-6">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
                    style={{ fontFamily: 'Arial, sans-serif' }}>
                  Mrs. Michelle
                </h2>
                <p className="text-xl sm:text-2xl text-blue-300 font-semibold mb-4">
                  Headmistress & Educational Leader
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-blue-600/30 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    <Award className="w-4 h-4 inline mr-1" />
                    Educational Excellence
                  </span>
                  <span className="bg-green-600/30 text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                    <Users className="w-4 h-4 inline mr-1" />
                    Student Leadership
                  </span>
                  <span className="bg-yellow-600/30 text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                    <Heart className="w-4 h-4 inline mr-1" />
                    Community Builder
                  </span>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Leading St. Louis Demonstration J.H.S with passion, dedication, and an unwavering
                commitment to educational excellence. Mrs. Michelle brings years of experience in
                nurturing young minds and building a community where every student can thrive.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-blue-300">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-medium">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Target className="w-5 h-5" />
                  <span className="text-sm font-medium">Excellence Focused</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Word from Our Headmistress */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-900 via-gray-900 to-green-900">
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
                <Quote className="w-8 h-8 text-yellow-400" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
                    style={{ fontFamily: 'Arial, sans-serif' }}>
                  Word from Our Headmistress
                </h2>
                <Quote className="w-8 h-8 text-yellow-400 rotate-180" />
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto rounded-full"></div>
            </div>

            {/* Message Content */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 border border-gray-700/50 shadow-2xl">
              <div className="space-y-6 text-gray-200 leading-relaxed">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-8 text-center">
                  "Dear Students, Parents, and Community Members,"
                </p>

                <p className="text-base sm:text-lg">
                  It is with immense pride and joy that I welcome you to <span className="text-blue-300 font-semibold">St. Louis Demonstration Junior High School</span>,
                  a beacon of educational excellence that has been shaping young minds for over four decades. Our school stands as a testament to the power of
                  quality education, unwavering dedication, and the belief that every child possesses unlimited potential.
                </p>

                <p className="text-base sm:text-lg">
                  At St. Louis Demonstration J.H.S, we don't just teach subjects; we <span className="text-green-300 font-semibold">nurture dreams, build character, and inspire greatness</span>.
                  Our students are not merely learners—they are future leaders, innovators, and change-makers who will shape tomorrow's world.
                  We provide them with the tools, knowledge, and confidence they need to excel in every endeavor they pursue.
                </p>

                <p className="text-base sm:text-lg">
                  What makes our school truly special is our commitment to <span className="text-yellow-300 font-semibold">holistic education</span>. We believe in developing
                  not just academic excellence, but also emotional intelligence, creativity, critical thinking, and moral values. Our dedicated faculty
                  works tirelessly to create an environment where every student feels valued, supported, and challenged to reach their highest potential.
                </p>

                <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-2xl p-6 my-8 border-l-4 border-yellow-400">
                  <p className="text-base sm:text-lg font-medium text-white">
                    <span className="text-yellow-300">"To our students:</span> Remember that education is the most powerful weapon you can use to change the world.
                    Embrace every challenge as an opportunity to grow, every failure as a lesson to learn, and every success as a stepping stone to greater achievements.
                    You are capable of extraordinary things—believe in yourselves as much as we believe in you."
                  </p>
                </div>

                <p className="text-base sm:text-lg">
                  As we continue our journey of excellence, I encourage our students to be <span className="text-blue-300 font-semibold">curious, compassionate, and courageous</span>.
                  Ask questions, seek knowledge beyond textbooks, and never stop learning. Be kind to one another, respect your teachers, and honor the values
                  that make our school community strong.
                </p>

                <p className="text-base sm:text-lg">
                  To our parents and guardians, thank you for entrusting us with your most precious gifts—your children. Together, we will continue to build
                  a legacy of excellence that will inspire generations to come.
                </p>

                <div className="text-center mt-10 pt-8 border-t border-gray-600">
                  <p className="text-lg font-semibold text-white mb-2">With warm regards and best wishes,</p>
                  <p className="text-2xl font-bold text-yellow-300 mb-1">Mrs. Michelle</p>
                  <p className="text-blue-300 font-medium">Headmistress</p>
                  <p className="text-sm text-gray-400 mt-2">St. Louis Demonstration Junior High School</p>
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