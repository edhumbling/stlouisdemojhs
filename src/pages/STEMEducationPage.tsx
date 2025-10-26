import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Microscope, Calculator, Cpu, Lightbulb, Atom, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

const STEMEducationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="STEM Education Excellence | St. Louis Demonstration JHS"
        description="Discover our comprehensive STEM education program at St. Louis Demonstration JHS. We prepare Ghana's next generation of scientists, engineers, and innovators through hands-on learning and modern technology integration."
        keywords="STEM education, science technology engineering mathematics, Ghana STEM, innovation, laboratory experiments, programming, engineering design, scientific research"
        url="/stem-education"
        type="website"
        pageType="stem"
        useGalleryImages={true}
      /
        canonical="https://stlouisdemojhs.com/stem-education"
      >
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              🚀 STEM Education Excellence
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-8 pb-12 md:pt-12 md:pb-16 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7118.HEIC"
            alt="STEM Education Background"
            className="w-full h-full object-cover"
          />
          {/* Blue-Green overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-700/85 to-green-700/80"></div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full mb-6 shadow-2xl">
              <Atom className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              STEM Education Excellence
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Preparing Ghana's next generation of scientists, engineers, and innovators
            </p>
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-4 py-2 mt-6 shadow-lg">
              <span className="text-cyan-400 text-lg">🔬</span>
              <span className="text-cyan-300 text-sm font-semibold">Innovation & Discovery</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STEM Components */}
      <section className="py-8 md:py-12 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7020.HEIC"
            alt="STEM Learning Background"
            className="w-full h-full object-cover"
          />
          {/* Dark glass overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              {
                icon: <Microscope className="w-8 h-8" />,
                title: "Science",
                description: "Integrated Science covering Physics, Chemistry, and Biology with hands-on laboratory experiences",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <Calculator className="w-8 h-8" />,
                title: "Mathematics",
                description: "Advanced mathematical concepts from algebra to statistics, building analytical thinking skills",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Cpu className="w-8 h-8" />,
                title: "Technology",
                description: "Computing and ICT skills, programming fundamentals, and digital literacy for the modern world",
                color: "from-purple-500 to-violet-500"
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Engineering",
                description: "Design thinking, problem-solving, and practical engineering concepts through Career Technology",
                color: "from-orange-500 to-red-500"
              }
            ].map((component, index) => (
              <motion.div
                key={component.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Liquid Glass Apple-style Card */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:border-white/30">
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>

                  {/* Content */}
                  <div className="relative z-10 p-6 text-center">
                    {/* Icon with enhanced glow */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${component.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110`}>
                      <div className="relative">
                        {component.icon}
                        {/* Icon glow effect */}
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>

                    {/* Title with enhanced styling */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                      {component.title}
                    </h3>

                    {/* Description with better readability */}
                    <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                      {component.description}
                    </p>
                  </div>

                  {/* Bottom highlight */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Ghana's STEM Landscape */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl mb-12"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-purple-500/20 opacity-70"></div>

            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">STEM in Ghana's Context</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4">National Priorities</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Digital Ghana Agenda:</strong> Building a technology-driven economy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Mining & Energy:</strong> Sustainable resource management and renewable energy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Agriculture Innovation:</strong> Modern farming techniques and food security</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span><strong>Healthcare Technology:</strong> Medical innovations and public health solutions</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-300 mb-4">Career Opportunities</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Software development and cybersecurity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Biomedical engineering and pharmaceuticals</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Environmental science and climate research</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Telecommunications and fintech innovation</span>
                  </li>
                </ul>
              </div>
            </div>
            </div>
          </motion.div>

          {/* Our STEM Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl mb-12"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 opacity-70"></div>

            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Our STEM Methodology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Hands-On Learning",
                  description: "Laboratory experiments, practical projects, and real-world problem solving",
                  gradient: "from-blue-500 to-purple-500",
                  textColor: "text-blue-300"
                },
                {
                  icon: <Lightbulb className="w-8 h-8" />,
                  title: "Innovation Focus",
                  description: "Encouraging creativity, critical thinking, and entrepreneurial mindset",
                  gradient: "from-green-500 to-cyan-500",
                  textColor: "text-green-300"
                },
                {
                  icon: <Cpu className="w-8 h-8" />,
                  title: "Technology Integration",
                  description: "Modern tools, software, and digital platforms for enhanced learning",
                  gradient: "from-purple-500 to-pink-500",
                  textColor: "text-purple-300"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group text-center"
                >
                  {/* Cute liquid glass card */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 p-6">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Icon with enhanced styling */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110`}>
                      <div className="relative">
                        {item.icon}
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-semibold ${item.textColor} mb-3 group-hover:text-white transition-colors duration-300`}>
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors duration-300">
                      {item.description}
                    </p>

                    {/* Bottom highlight */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  </div>
                </motion.div>
              ))}
            </div>
            </div>
          </motion.div>

          {/* Success Stories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 opacity-70"></div>

            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>

            {/* Content */}
            <div className="relative z-10 p-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Our STEM Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { number: "95%", label: "BECE Science Pass Rate", gradient: "from-green-400 to-emerald-500" },
                  { number: "40+", label: "Science Fair Awards", gradient: "from-blue-400 to-cyan-500" },
                  { number: "200+", label: "STEM Graduates Annually", gradient: "from-purple-400 to-violet-500" },
                  { number: "15+", label: "University STEM Programs", gradient: "from-orange-400 to-red-500" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group text-center"
                  >
                    {/* Cute stat card */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 p-6">
                      {/* Animated background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                      {/* Number with enhanced styling */}
                      <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                        {stat.number}
                      </div>

                      {/* Label */}
                      <div className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                        {stat.label}
                      </div>

                      {/* Bottom highlight */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default STEMEducationPage;
