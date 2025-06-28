import React from 'react';
import { ArrowLeft, Monitor, BookOpen, Users, Building, Briefcase, GraduationCap, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';

const TVETPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <SEOHead
        title="TVET Learning - Technical & Vocational Education Training - St. Louis Demo JHS"
        description="Explore comprehensive TVET resources including career paths, schools, training programs, and vocational education opportunities. Learn about technical skills and professional development."
        keywords="TVET education, vocational training, technical education, career development, skills training, vocational schools, professional development"
        canonicalUrl="https://stlouisdemojhs.com/tvet"
      />
      <div className="min-h-screen bg-black">
        <Header />

        {/* Back Button and Title Section */}
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4 pt-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                TVET Learning Hub
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 py-6 sm:py-8">
          <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl mb-6 shadow-2xl">
                <Wrench size={40} className="text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Technical & Vocational Education Training
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                🚀 Discover practical skills, career opportunities, and professional development through TVET. From hands-on training to industry certifications - your pathway to a successful career starts here.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <span className="text-green-300">🏭 Industry Skills</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <span className="text-blue-300">🎓 Career Pathways</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <span className="text-purple-300">🔧 Practical Training</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                  <span className="text-yellow-300">💼 Job Opportunities</span>
                </div>
              </div>
            </div>

            {/* What is TVET Section */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 rounded-2xl p-6 sm:p-8 border border-green-700/30 backdrop-blur-sm">
                <h3 className="text-2xl sm:text-3xl font-bold text-green-300 mb-6 flex items-center gap-3">
                  <GraduationCap size={32} className="text-green-400" />
                  What is TVET? 🎯
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-base sm:text-lg text-gray-100 leading-relaxed mb-4">
                      <strong className="text-green-300">Technical and Vocational Education and Training (TVET)</strong> is education and training that provides knowledge and skills for employment. It's practical, hands-on learning that prepares you for specific careers and industries.
                    </p>
                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                      Unlike traditional academic education, TVET focuses on developing practical skills that employers need. It bridges the gap between education and the workplace, giving you real-world experience and industry-relevant qualifications.
                    </p>
                  </div>

                  <div className="bg-green-800/30 rounded-lg p-4 border border-green-600/30">
                    <h4 className="text-base sm:text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
                      <Briefcase size={20} />
                      Key Benefits of TVET 🌟
                    </h4>
                    <ul className="space-y-2 text-sm text-green-100">
                      <li>• <strong>Job-Ready Skills:</strong> Learn exactly what employers want</li>
                      <li>• <strong>Faster Employment:</strong> Get hired quickly after graduation</li>
                      <li>• <strong>Hands-On Learning:</strong> Practice with real tools and equipment</li>
                      <li>• <strong>Industry Connections:</strong> Network with professionals and employers</li>
                      <li>• <strong>Entrepreneurship:</strong> Start your own business with practical skills</li>
                      <li>• <strong>Career Advancement:</strong> Build expertise for leadership roles</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* TVET Career Categories */}
            <section className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
                🚀 TVET Career Categories
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Engineering & Technology */}
                <div className="bg-blue-900/40 rounded-xl p-6 border border-blue-700/40 hover:border-blue-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Monitor size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-blue-300 mb-3">Engineering & Technology 🔧</h4>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li>• Electrical Engineering</li>
                    <li>• Mechanical Engineering</li>
                    <li>• Civil Engineering</li>
                    <li>• Computer Technology</li>
                    <li>• Electronics & Telecommunications</li>
                    <li>• Automotive Technology</li>
                  </ul>
                </div>

                {/* Business & Finance */}
                <div className="bg-purple-900/40 rounded-xl p-6 border border-purple-700/40 hover:border-purple-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Briefcase size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-purple-300 mb-3">Business & Finance 💼</h4>
                  <ul className="space-y-2 text-sm text-purple-100">
                    <li>• Accounting & Finance</li>
                    <li>• Business Administration</li>
                    <li>• Marketing & Sales</li>
                    <li>• Human Resource Management</li>
                    <li>• Entrepreneurship</li>
                    <li>• Banking & Insurance</li>
                  </ul>
                </div>

                {/* Health & Social Care */}
                <div className="bg-red-900/40 rounded-xl p-6 border border-red-700/40 hover:border-red-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-4">
                    <Users size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-red-300 mb-3">Health & Social Care 🏥</h4>
                  <ul className="space-y-2 text-sm text-red-100">
                    <li>• Nursing & Midwifery</li>
                    <li>• Medical Laboratory Technology</li>
                    <li>• Pharmacy Technology</li>
                    <li>• Community Health</li>
                    <li>• Social Work</li>
                    <li>• Elderly Care</li>
                  </ul>
                </div>

                {/* Agriculture & Food */}
                <div className="bg-green-900/40 rounded-xl p-6 border border-green-700/40 hover:border-green-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <Building size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-green-300 mb-3">Agriculture & Food 🌱</h4>
                  <ul className="space-y-2 text-sm text-green-100">
                    <li>• Agricultural Technology</li>
                    <li>• Food Processing</li>
                    <li>• Animal Husbandry</li>
                    <li>• Horticulture</li>
                    <li>• Fisheries & Aquaculture</li>
                    <li>• Food Safety & Quality</li>
                  </ul>
                </div>

                {/* Creative Arts & Media */}
                <div className="bg-yellow-900/40 rounded-xl p-6 border border-yellow-700/40 hover:border-yellow-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-yellow-300 mb-3">Creative Arts & Media 🎨</h4>
                  <ul className="space-y-2 text-sm text-yellow-100">
                    <li>• Graphic Design</li>
                    <li>• Fashion Design</li>
                    <li>• Photography & Videography</li>
                    <li>• Music Production</li>
                    <li>• Digital Media</li>
                    <li>• Interior Design</li>
                  </ul>
                </div>

                {/* Hospitality & Tourism */}
                <div className="bg-cyan-900/40 rounded-xl p-6 border border-cyan-700/40 hover:border-cyan-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                    <Users size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-cyan-300 mb-3">Hospitality & Tourism 🏨</h4>
                  <ul className="space-y-2 text-sm text-cyan-100">
                    <li>• Hotel Management</li>
                    <li>• Culinary Arts</li>
                    <li>• Tourism & Travel</li>
                    <li>• Event Management</li>
                    <li>• Restaurant Management</li>
                    <li>• Recreation & Leisure</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* TVET Career Pathways in Ghana */}
            <section className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
                🚀 TVET Career Pathways in Ghana
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Engineering & Technology */}
                <div className="bg-blue-900/40 rounded-xl p-6 border border-blue-700/40 hover:border-blue-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Monitor size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-blue-300 mb-3">Engineering & Technology 🔧</h4>
                  <ul className="space-y-2 text-sm text-blue-100">
                    <li>• <strong>Electrical Engineering:</strong> Power systems, electronics</li>
                    <li>• <strong>Mechanical Engineering:</strong> Manufacturing, automotive</li>
                    <li>• <strong>Civil Engineering:</strong> Construction, infrastructure</li>
                    <li>• <strong>Computer Technology:</strong> IT support, programming</li>
                    <li>• <strong>Telecommunications:</strong> Network systems</li>
                    <li>• <strong>Renewable Energy:</strong> Solar, wind technology</li>
                  </ul>
                </div>

                {/* Agriculture & Food Technology */}
                <div className="bg-green-900/40 rounded-xl p-6 border border-green-700/40 hover:border-green-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-4">
                    <Building size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-green-300 mb-3">Agriculture & Food Technology 🌱</h4>
                  <ul className="space-y-2 text-sm text-green-100">
                    <li>• <strong>Agricultural Technology:</strong> Modern farming techniques</li>
                    <li>• <strong>Food Processing:</strong> Value addition, preservation</li>
                    <li>• <strong>Animal Husbandry:</strong> Livestock management</li>
                    <li>• <strong>Aquaculture:</strong> Fish farming, water management</li>
                    <li>• <strong>Horticulture:</strong> Crop production, gardening</li>
                    <li>• <strong>Agribusiness:</strong> Farm management, marketing</li>
                  </ul>
                </div>

                {/* Business & Entrepreneurship */}
                <div className="bg-purple-900/40 rounded-xl p-6 border border-purple-700/40 hover:border-purple-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Briefcase size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-purple-300 mb-3">Business & Entrepreneurship 💼</h4>
                  <ul className="space-y-2 text-sm text-purple-100">
                    <li>• <strong>Accounting & Finance:</strong> Bookkeeping, financial management</li>
                    <li>• <strong>Business Administration:</strong> Management skills</li>
                    <li>• <strong>Marketing & Sales:</strong> Digital marketing, retail</li>
                    <li>• <strong>Entrepreneurship:</strong> Business startup skills</li>
                    <li>• <strong>Supply Chain:</strong> Logistics, procurement</li>
                    <li>• <strong>E-commerce:</strong> Online business development</li>
                  </ul>
                </div>

                {/* Health & Social Services */}
                <div className="bg-red-900/40 rounded-xl p-6 border border-red-700/40 hover:border-red-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center mb-4">
                    <Users size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-red-300 mb-3">Health & Social Services 🏥</h4>
                  <ul className="space-y-2 text-sm text-red-100">
                    <li>• <strong>Community Health:</strong> Primary healthcare delivery</li>
                    <li>• <strong>Medical Laboratory:</strong> Diagnostic services</li>
                    <li>• <strong>Pharmacy Technology:</strong> Drug dispensing</li>
                    <li>• <strong>Nursing Assistant:</strong> Patient care support</li>
                    <li>• <strong>Social Work:</strong> Community development</li>
                    <li>• <strong>Elderly Care:</strong> Geriatric services</li>
                  </ul>
                </div>

                {/* Creative Arts & Media */}
                <div className="bg-yellow-900/40 rounded-xl p-6 border border-yellow-700/40 hover:border-yellow-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-yellow-300 mb-3">Creative Arts & Media 🎨</h4>
                  <ul className="space-y-2 text-sm text-yellow-100">
                    <li>• <strong>Graphic Design:</strong> Digital design, branding</li>
                    <li>• <strong>Fashion Design:</strong> Clothing, textile design</li>
                    <li>• <strong>Photography:</strong> Commercial, event photography</li>
                    <li>• <strong>Video Production:</strong> Content creation</li>
                    <li>• <strong>Music Production:</strong> Audio engineering</li>
                    <li>• <strong>Traditional Crafts:</strong> Kente weaving, pottery</li>
                  </ul>
                </div>

                {/* Hospitality & Tourism */}
                <div className="bg-cyan-900/40 rounded-xl p-6 border border-cyan-700/40 hover:border-cyan-500/60 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-cyan-300 mb-3">Hospitality & Tourism 🏨</h4>
                  <ul className="space-y-2 text-sm text-cyan-100">
                    <li>• <strong>Hotel Management:</strong> Hospitality operations</li>
                    <li>• <strong>Culinary Arts:</strong> Ghanaian and international cuisine</li>
                    <li>• <strong>Tourism & Travel:</strong> Tour guiding, travel planning</li>
                    <li>• <strong>Event Management:</strong> Wedding, corporate events</li>
                    <li>• <strong>Restaurant Management:</strong> Food service operations</li>
                    <li>• <strong>Cultural Tourism:</strong> Heritage site management</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Success Stories & Impact */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-gray-900/40 to-gray-800/40 rounded-2xl p-6 sm:p-8 border border-gray-700/30 backdrop-blur-sm">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                  🌟 TVET Success Stories & Impact in Ghana
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-600/30">
                    <h4 className="text-base sm:text-lg font-semibold text-green-300 mb-3">📈 Economic Impact</h4>
                    <ul className="space-y-2 text-sm text-gray-100">
                      <li>• <strong>80-90% of Ghana's economy</strong> relies on skills from apprenticeship training</li>
                      <li>• <strong>Youth Employment:</strong> TVET graduates have higher employment rates</li>
                      <li>• <strong>SME Development:</strong> Many TVET graduates start successful businesses</li>
                      <li>• <strong>Industry Growth:</strong> Skilled workforce drives manufacturing sector</li>
                      <li>• <strong>Export Potential:</strong> Quality products from skilled artisans</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-600/30">
                    <h4 className="text-base sm:text-lg font-semibold text-blue-300 mb-3">🎯 Government Commitment</h4>
                    <ul className="space-y-2 text-sm text-gray-100">
                      <li>• <strong>Free TVET Education:</strong> Government-sponsored programs</li>
                      <li>• <strong>Infrastructure Development:</strong> Modern training facilities</li>
                      <li>• <strong>International Partnerships:</strong> EU, Germany, World Bank support</li>
                      <li>• <strong>Policy Framework:</strong> National Apprenticeship Policy</li>
                      <li>• <strong>Quality Assurance:</strong> CTVET standards and certification</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center">
              <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 rounded-2xl p-8 border border-green-700/30 backdrop-blur-sm">
                <h3 className="text-2xl sm:text-3xl font-bold text-green-300 mb-4">
                  🚀 Start Your TVET Journey Today!
                </h3>
                <p className="text-lg text-gray-200 mb-6 max-w-3xl mx-auto">
                  Join thousands of Ghanaian youth who are building successful careers through TVET. Whether you're interested in technology, agriculture, business, or creative arts, there's a TVET pathway for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://ctvet.gov.gh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-green-400/25 hover:scale-105"
                  >
                    <Building size={20} />
                    <span>Visit CTVET Official Site</span>
                  </a>
                  <a
                    href="https://gtvets.gov.gh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-blue-400/25 hover:scale-105"
                  >
                    <GraduationCap size={20} />
                    <span>Ghana TVET Service</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default TVETPage;
