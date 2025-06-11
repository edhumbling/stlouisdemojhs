import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, GraduationCap, Briefcase, Globe, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

const EducationalGuidePage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleExternalLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Educational Guide | St. Louis Demonstration JHS"
        description="Comprehensive guide to SAT, SHS programs, TVET, and entrepreneurship opportunities in Ghana. Make informed educational decisions."
        keywords="SAT guide, SHS programs Ghana, TVET education, entrepreneurship Ghana, educational pathways"
        url="/educational-guide"
        type="website"
      />

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 py-3 sm:py-4 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-emerald-700/50 hover:bg-emerald-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-emerald-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                Educational Guide
              </h1>
              <p className="text-sm text-emerald-200 truncate">
                Complete guide to SAT, SHS programs, TVET, and entrepreneurship
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">

          {/* Educational Information Sections */}
          <div className="space-y-8">
            {/* SAT Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-green-900/50 via-emerald-900/50 to-green-900/50 rounded-2xl p-6 border border-green-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">What is the SAT?</h2>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    The SAT (Scholastic Assessment Test) is a standardized test widely used for college admissions in the United States and internationally. 
                    It measures literacy, numeracy, and writing skills that are needed for academic success in college. The SAT is scored on a scale of 400-1600, 
                    with separate scores for Evidence-Based Reading and Writing (200-800) and Math (200-800).
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h3 className="font-semibold text-green-400 mb-2">Why Take the SAT?</h3>
                      <ul className="text-gray-400 space-y-1">
                        <li>• Required for most U.S. university applications</li>
                        <li>• Essential for international scholarship eligibility</li>
                        <li>• Demonstrates academic readiness for college</li>
                        <li>• Opens doors to top global universities</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-400 mb-2">When to Start Preparing?</h3>
                      <ul className="text-gray-400 space-y-1">
                        <li>• Begin in SHS 1 or 2 for best results</li>
                        <li>• Take practice tests regularly</li>
                        <li>• Join SAT prep classes early</li>
                        <li>• Plan to take the test multiple times</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SHS Programs Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-blue-900/50 rounded-2xl p-6 border border-blue-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">Senior High School (SHS) Programs in Ghana</h2>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Ghana's Senior High School system offers diverse academic programs designed to prepare students for university education and career paths. 
                    Each program focuses on specific subject areas that align with future academic and professional goals.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-400 mb-2">Science Program</h3>
                      <p className="text-gray-400 text-xs mb-2">Core subjects: Mathematics, Physics, Chemistry, Biology, English</p>
                      <p className="text-gray-300 text-xs">Leads to: Medicine, Engineering, Pure Sciences, Technology careers</p>
                    </div>
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-400 mb-2">Business Program</h3>
                      <p className="text-gray-400 text-xs mb-2">Core subjects: Mathematics, Economics, Accounting, Business Management</p>
                      <p className="text-gray-300 text-xs">Leads to: Business Administration, Finance, Economics, Entrepreneurship</p>
                    </div>
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-400 mb-2">General Arts</h3>
                      <p className="text-gray-400 text-xs mb-2">Core subjects: English, Literature, History, Geography, Government</p>
                      <p className="text-gray-300 text-xs">Leads to: Law, Teaching, Social Sciences, Humanities, Media</p>
                    </div>
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-400 mb-2">Visual Arts</h3>
                      <p className="text-gray-400 text-xs mb-2">Core subjects: General Knowledge in Art, Picture Making, Graphic Design</p>
                      <p className="text-gray-300 text-xs">Leads to: Fine Arts, Graphic Design, Architecture, Creative Industries</p>
                    </div>
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-400 mb-2">Home Economics</h3>
                      <p className="text-gray-400 text-xs mb-2">Core subjects: Food and Nutrition, Clothing and Textiles, Management</p>
                      <p className="text-gray-300 text-xs">Leads to: Nutrition, Food Science, Hospitality, Family Studies</p>
                    </div>
                    <div className="bg-blue-800/30 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-400 mb-2">Agricultural Science</h3>
                      <p className="text-gray-400 text-xs mb-2">Core subjects: Animal Husbandry, Crop Husbandry, Agricultural Economics</p>
                      <p className="text-gray-300 text-xs">Leads to: Agriculture, Veterinary Science, Agribusiness, Food Technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TVET Programs Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-purple-900/50 via-violet-900/50 to-purple-900/50 rounded-2xl p-6 border border-purple-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">Technical and Vocational Education and Training (TVET)</h2>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    TVET provides practical skills training and technical education that directly prepares students for the workforce.
                    These programs focus on hands-on learning and industry-relevant skills, offering an alternative pathway to traditional academic education.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-purple-400 mb-3">Popular TVET Programs</h3>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="bg-purple-800/30 rounded-lg p-3">
                          <h4 className="font-medium text-purple-300 mb-1">Information Technology</h4>
                          <p className="text-gray-400 text-xs">Computer repair, networking, software development, cybersecurity</p>
                        </div>
                        <div className="bg-purple-800/30 rounded-lg p-3">
                          <h4 className="font-medium text-purple-300 mb-1">Automotive Technology</h4>
                          <p className="text-gray-400 text-xs">Vehicle maintenance, auto mechanics, automotive electronics</p>
                        </div>
                        <div className="bg-purple-800/30 rounded-lg p-3">
                          <h4 className="font-medium text-purple-300 mb-1">Construction & Building</h4>
                          <p className="text-gray-400 text-xs">Masonry, carpentry, plumbing, electrical installation</p>
                        </div>
                        <div className="bg-purple-800/30 rounded-lg p-3">
                          <h4 className="font-medium text-purple-300 mb-1">Hospitality & Tourism</h4>
                          <p className="text-gray-400 text-xs">Hotel management, catering, tour guiding, event planning</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-400 mb-3">Benefits of TVET Education</h3>
                      <ul className="text-gray-400 space-y-2 text-sm mb-4">
                        <li>• Direct entry into skilled employment</li>
                        <li>• Shorter training duration (6 months - 3 years)</li>
                        <li>• High demand for technical skills in job market</li>
                        <li>• Entrepreneurship opportunities</li>
                        <li>• Pathway to technical universities</li>
                        <li>• Industry-recognized certifications</li>
                      </ul>
                      <div className="bg-purple-800/30 rounded-lg p-4">
                        <h4 className="font-medium text-purple-300 mb-2">TVET Institutions</h4>
                        <p className="text-gray-400 text-xs mb-3">
                          Explore official TVET programs and institutions in Ghana
                        </p>
                        <div className="space-y-2">
                          <button
                            onClick={() => handleExternalLinkClick('https://gtvets.gov.gh')}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition-colors duration-300 w-full justify-center"
                          >
                            <Globe className="w-4 h-4" />
                            Official TVET Ghana
                            <ExternalLink className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleExternalLinkClick('https://actt.edu.gh')}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium rounded-lg transition-colors duration-300 w-full justify-center"
                          >
                            <Briefcase className="w-4 h-4" />
                            African Centre for Technical Training
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-gray-500 text-xs mt-2">
                          ACTT: High-quality technical training for employment and entrepreneurship
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Entrepreneurship & Startup Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-orange-900/50 via-red-900/50 to-orange-900/50 rounded-2xl p-6 border border-orange-500/30"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">Entrepreneurship & Startup Opportunities</h2>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    Students can also create their own path through entrepreneurship and startups. Ghana has a vibrant startup ecosystem with numerous
                    innovation hubs, incubators, and accelerators that support young entrepreneurs in turning their ideas into successful businesses.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-orange-400 mb-3">Why Consider Entrepreneurship?</h3>
                      <ul className="text-gray-400 space-y-2 text-sm mb-4">
                        <li>• Create your own job and employ others</li>
                        <li>• Solve real problems in your community</li>
                        <li>• Build wealth and financial independence</li>
                        <li>• Flexible work schedule and lifestyle</li>
                        <li>• Make a positive impact on society</li>
                        <li>• Learn diverse business skills</li>
                      </ul>
                      <h3 className="font-semibold text-orange-400 mb-3">When to Start?</h3>
                      <ul className="text-gray-400 space-y-2 text-sm">
                        <li>• Start small businesses while in SHS</li>
                        <li>• Join entrepreneurship clubs and competitions</li>
                        <li>• Learn from successful entrepreneurs</li>
                        <li>• Develop business and financial literacy</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-orange-400 mb-3">Ghana's Top Startup Hubs & Incubators</h3>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="bg-orange-800/30 rounded-lg p-3">
                          <h4 className="font-medium text-orange-300 mb-1">MEST Africa</h4>
                          <p className="text-gray-400 text-xs">Pan-African training program, seed fund, and incubator for tech entrepreneurs</p>
                        </div>
                        <div className="bg-orange-800/30 rounded-lg p-3">
                          <h4 className="font-medium text-orange-300 mb-1">iSpace Foundation</h4>
                          <p className="text-gray-400 text-xs">Innovation hub offering workspace, mentorship, and startup support</p>
                        </div>
                        <div className="bg-orange-800/30 rounded-lg p-3">
                          <h4 className="font-medium text-orange-300 mb-1">Kumasi Hive</h4>
                          <p className="text-gray-400 text-xs">Tech innovation hub in Kumasi supporting startups and entrepreneurs</p>
                        </div>
                        <div className="bg-orange-800/30 rounded-lg p-3">
                          <h4 className="font-medium text-orange-300 mb-1">Impact Hub Accra</h4>
                          <p className="text-gray-400 text-xs">Global network supporting social entrepreneurs and impact startups</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 bg-orange-800/30 rounded-lg p-4">
                    <h4 className="font-medium text-orange-300 mb-2">Start Your Entrepreneurial Journey</h4>
                    <p className="text-gray-400 text-xs mb-3">
                      Remember: Every successful entrepreneur started with an idea. Whether you pursue traditional education or not,
                      entrepreneurship can be your path to success. Many successful business owners never completed university but
                      built thriving companies through determination, learning, and hard work.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-orange-600/20 text-orange-300 text-xs rounded-full">
                        Start Small
                      </span>
                      <span className="px-2 py-1 bg-orange-600/20 text-orange-300 text-xs rounded-full">
                        Learn Continuously
                      </span>
                      <span className="px-2 py-1 bg-orange-600/20 text-orange-300 text-xs rounded-full">
                        Network Actively
                      </span>
                      <span className="px-2 py-1 bg-orange-600/20 text-orange-300 text-xs rounded-full">
                        Solve Problems
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EducationalGuidePage;
