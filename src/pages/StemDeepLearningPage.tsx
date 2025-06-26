import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

const StemDeepLearningPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="STEM Deep Learning | Definitions & Careers - St. Louis Demonstration JHS"
        description="Explore comprehensive STEM definitions and career opportunities from the Bureau of Labor Statistics. Learn about Science, Technology, Engineering, and Mathematics fields in depth."
        keywords="STEM definitions, STEM careers, Bureau of Labor Statistics, science careers, technology careers, engineering careers, mathematics careers"
        url="/stem-deep-learning"
        type="article"
        pageType="educational"
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Back Bar - Same as other pages */}
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
              STEM Deep Learning
            </h1>
          </div>
        </div>
      </div>

      {/* External Link Content - Opens in New Tab */}
      <main className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center px-6 py-12 max-w-2xl mx-auto">
          {/* Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-yellow-400/30">
            <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            STEM Deep Learning Resources
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Access comprehensive STEM definitions and career information from the Bureau of Labor Statistics.
            This government resource provides in-depth analysis of Science, Technology, Engineering, and Mathematics fields.
          </p>

          {/* External Link Button */}
          <a
            href="https://www.bls.gov/opub/btn/volume-14/stem-alternate-definitions.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 hover:scale-105 group text-lg"
            style={{
              textShadow: '0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.6), 0 0 30px rgba(255, 255, 0, 0.4)',
              boxShadow: '0 0 20px rgba(255, 255, 0, 0.3), 0 0 40px rgba(255, 255, 0, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.2)'
            }}
          >
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            <span>Open BLS STEM Resources</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">What You'll Find:</h3>
            <ul className="text-gray-300 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Comprehensive STEM field definitions</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Career opportunities and job market data</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Educational pathway recommendations</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Industry trends and future outlook</span>
              </li>
            </ul>
          </div>

          {/* Note */}
          <p className="text-sm text-gray-400 mt-6">
            This link opens in a new tab to the official Bureau of Labor Statistics website
          </p>
        </div>

        {/* In-Depth STEM Content */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* STEM Overview Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-6">Understanding STEM Fields</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                STEM represents the interconnected fields of Science, Technology, Engineering, and Mathematics -
                the foundation of innovation and progress in our modern world.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Science */}
              <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-2xl p-8 border border-blue-700/30 backdrop-blur-sm">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-300 mb-4 text-center">Science</h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  The systematic study of the natural world through observation, experimentation, and analysis.
                </p>
              </div>

              {/* Technology */}
              <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-2xl p-8 border border-green-700/30 backdrop-blur-sm">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-300 mb-4 text-center">Technology</h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  The application of scientific knowledge to create tools, systems, and solutions for practical purposes.
                </p>
              </div>

              {/* Engineering */}
              <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 rounded-2xl p-8 border border-orange-700/30 backdrop-blur-sm">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-orange-300 mb-4 text-center">Engineering</h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  The design and construction of machines, structures, and systems using scientific principles.
                </p>
              </div>

              {/* Mathematics */}
              <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-2xl p-8 border border-purple-700/30 backdrop-blur-sm">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-purple-300 mb-4 text-center">Mathematics</h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  The language of patterns, relationships, and logical reasoning that underlies all STEM fields.
                </p>
              </div>
            </div>
          </section>

          {/* Career Pathways Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-6">STEM Career Pathways</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Explore the diverse and rewarding career opportunities available in STEM fields,
                from research and development to innovation and entrepreneurship.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* High-Demand Careers */}
              <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 rounded-2xl p-8 border border-yellow-700/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">High-Demand STEM Careers</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300"><strong className="text-white">Data Scientists:</strong> $126,830 median salary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300"><strong className="text-white">Software Engineers:</strong> $110,140 median salary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300"><strong className="text-white">Biomedical Engineers:</strong> $97,410 median salary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300"><strong className="text-white">Cybersecurity Analysts:</strong> $103,590 median salary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300"><strong className="text-white">Environmental Engineers:</strong> $96,820 median salary</span>
                  </div>
                </div>
              </div>

              {/* Emerging Fields */}
              <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 rounded-2xl p-8 border border-cyan-700/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6">Emerging STEM Fields</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300"><strong className="text-white">AI/Machine Learning Engineers</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300"><strong className="text-white">Renewable Energy Specialists</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300"><strong className="text-white">Biotechnology Researchers</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300"><strong className="text-white">Quantum Computing Scientists</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300"><strong className="text-white">Space Technology Engineers</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Educational Pathways */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-6">Educational Pathways to STEM Success</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Build a strong foundation for your STEM career with these educational milestones and recommendations.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Junior High School */}
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-2xl p-8 border border-green-700/30 backdrop-blur-sm">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl font-bold text-white">JHS</span>
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-6 text-center">Junior High School</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <span>Strong foundation in Mathematics and Integrated Science</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <span>Introduction to Computing and ICT</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <span>Career Technology exploration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <span>Critical thinking and problem-solving skills</span>
                  </li>
                </ul>
              </div>

              {/* Senior High School */}
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-2xl p-8 border border-blue-700/30 backdrop-blur-sm">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl font-bold text-white">SHS</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">Senior High School</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span>Advanced Mathematics (Calculus, Statistics)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span>Specialized Sciences (Physics, Chemistry, Biology)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span>Programming and Computer Science</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span>Research projects and scientific method</span>
                  </li>
                </ul>
              </div>

              {/* University & Beyond */}
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-2xl p-8 border border-purple-700/30 backdrop-blur-sm">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl font-bold text-white">UNI</span>
                </div>
                <h3 className="text-2xl font-bold text-purple-400 mb-6 text-center">University & Beyond</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>Bachelor's degree in chosen STEM field</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>Internships and practical experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>Graduate studies for specialized roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                    <span>Continuous learning and professional development</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* STEM Skills Development */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-6">Essential STEM Skills</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Develop these critical skills to excel in any STEM field and prepare for the challenges of tomorrow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm text-center">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Problem Solving</h4>
                <p className="text-gray-300 text-sm">Breaking down complex challenges into manageable solutions</p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Programming</h4>
                <p className="text-gray-300 text-sm">Coding skills essential for modern STEM applications</p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm text-center">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Data Analysis</h4>
                <p className="text-gray-300 text-sm">Interpreting and drawing insights from complex datasets</p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Critical Thinking</h4>
                <p className="text-gray-300 text-sm">Evaluating information and making logical decisions</p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-2xl p-12 border border-yellow-700/30 backdrop-blur-sm">
              <h2 className="text-4xl font-bold text-white mb-6">Start Your STEM Journey Today</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                The future belongs to those who understand and shape technology. Begin building your STEM foundation
                at St. Louis Demonstration JHS and unlock unlimited possibilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/stem"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 hover:scale-105"
                >
                  <span>Explore STEM Resources</span>
                </a>
                <a
                  href="/academics"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  <span>View Our Curriculum</span>
                </a>
              </div>
            </div>
          </section>

          {/* STEM Education Pathways - Edge to Edge */}
          <section className="w-full bg-gradient-to-br from-gray-900 to-gray-800 py-12">
            <div className="px-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">STEM Education Pathways 🎓</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* K-12 Foundation */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border border-blue-700/30">
                  <h4 className="text-xl font-bold text-blue-300 mb-6">🏫 K-12 Foundation</h4>
                  <div className="space-y-4">
                    <div className="bg-blue-800/20 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Elementary (K-5)</h5>
                      <ul className="text-sm text-blue-100 space-y-1">
                        <li>• Basic math concepts and problem-solving</li>
                        <li>• Science observation and experimentation</li>
                        <li>• Introduction to coding and robotics</li>
                        <li>• Engineering design thinking</li>
                      </ul>
                    </div>
                    <div className="bg-cyan-800/20 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Middle School (6-8)</h5>
                      <ul className="text-sm text-cyan-100 space-y-1">
                        <li>• Advanced mathematics (algebra, geometry)</li>
                        <li>• Physical and life sciences</li>
                        <li>• Computer programming basics</li>
                        <li>• Engineering projects and competitions</li>
                      </ul>
                    </div>
                    <div className="bg-teal-800/20 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">High School (9-12)</h5>
                      <ul className="text-sm text-teal-100 space-y-1">
                        <li>• Calculus, statistics, and advanced math</li>
                        <li>• AP Sciences (Physics, Chemistry, Biology)</li>
                        <li>• Computer Science and AP Computer Science</li>
                        <li>• Engineering design and capstone projects</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Higher Education */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-700/30">
                  <h4 className="text-xl font-bold text-purple-300 mb-6">🎓 Higher Education</h4>
                  <div className="space-y-4">
                    <div className="bg-purple-800/20 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Associate Degrees (2 years)</h5>
                      <ul className="text-sm text-purple-100 space-y-1">
                        <li>• Engineering Technology</li>
                        <li>• Computer Information Systems</li>
                        <li>• Applied Mathematics</li>
                        <li>• Laboratory Sciences</li>
                      </ul>
                    </div>
                    <div className="bg-pink-800/20 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Bachelor's Degrees (4 years)</h5>
                      <ul className="text-sm text-pink-100 space-y-1">
                        <li>• Engineering (Civil, Mechanical, Electrical, etc.)</li>
                        <li>• Computer Science and Software Engineering</li>
                        <li>• Mathematics and Statistics</li>
                        <li>• Natural Sciences (Physics, Chemistry, Biology)</li>
                      </ul>
                    </div>
                    <div className="bg-rose-800/20 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Graduate Degrees (2-7 years)</h5>
                      <ul className="text-sm text-rose-100 space-y-1">
                        <li>• Master's in specialized STEM fields</li>
                        <li>• PhD for research and academia</li>
                        <li>• Professional degrees (MD, PharmD)</li>
                        <li>• Industry certifications and bootcamps</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STEM Skills & Competencies */}
          <section className="w-full bg-gradient-to-br from-gray-800 to-black py-12">
            <div className="px-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Essential STEM Skills 🛠️</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Technical Skills */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 rounded-2xl p-6 border border-indigo-700/30">
                  <h4 className="text-lg font-bold text-indigo-300 mb-4">🔧 Technical Skills</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-indigo-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                      <span className="text-sm text-white">Programming & Coding</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                      <span className="text-sm text-white">Data Analysis & Statistics</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                      <span className="text-sm text-white">Mathematical Modeling</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                      <span className="text-sm text-white">Scientific Method</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                      <span className="text-sm text-white">Engineering Design</span>
                    </div>
                  </div>
                </div>

                {/* Soft Skills */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-700/30">
                  <h4 className="text-lg font-bold text-green-300 mb-4">🧠 Soft Skills</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white">Critical Thinking</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white">Problem Solving</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white">Collaboration</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white">Communication</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-white">Creativity & Innovation</span>
                    </div>
                  </div>
                </div>

                {/* Digital Literacy */}
                <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 rounded-2xl p-6 border border-purple-700/30">
                  <h4 className="text-lg font-bold text-purple-300 mb-4">💻 Digital Literacy</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-purple-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm text-white">AI & Machine Learning</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm text-white">Cloud Computing</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm text-white">Cybersecurity</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm text-white">Data Visualization</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-800/20 rounded-lg">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-sm text-white">Digital Tools & Platforms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STEM Industry Impact */}
          <section className="w-full bg-gradient-to-br from-black to-gray-900 py-12">
            <div className="px-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">STEM's Global Impact 🌍</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Healthcare */}
                <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 rounded-xl p-6 border border-red-700/30">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-red-300 mb-3">Healthcare</h4>
                  <ul className="text-sm text-red-100 space-y-2">
                    <li>• Gene therapy & personalized medicine</li>
                    <li>• AI-powered diagnostics</li>
                    <li>• Robotic surgery systems</li>
                    <li>• Vaccine development</li>
                  </ul>
                </div>

                {/* Environment */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-700/30">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-green-300 mb-3">Environment</h4>
                  <ul className="text-sm text-green-100 space-y-2">
                    <li>• Renewable energy systems</li>
                    <li>• Climate modeling & prediction</li>
                    <li>• Sustainable materials</li>
                    <li>• Carbon capture technology</li>
                  </ul>
                </div>

                {/* Transportation */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-700/30">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-blue-300 mb-3">Transportation</h4>
                  <ul className="text-sm text-blue-100 space-y-2">
                    <li>• Autonomous vehicles</li>
                    <li>• Electric vehicle technology</li>
                    <li>• Smart traffic systems</li>
                    <li>• Aerospace innovation</li>
                  </ul>
                </div>

                {/* Communication */}
                <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 rounded-xl p-6 border border-purple-700/30">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-2.21-.896-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 12a5.984 5.984 0 01-.757 2.828 1 1 0 01-1.415-1.414A3.984 3.984 0 0013 12a3.983 3.983 0 00-.172-1.414 1 1 0 010-1.415z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-purple-300 mb-3">Communication</h4>
                  <ul className="text-sm text-purple-100 space-y-2">
                    <li>• 5G & 6G networks</li>
                    <li>• Satellite internet</li>
                    <li>• Quantum communication</li>
                    <li>• Virtual & augmented reality</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default StemDeepLearningPage;
