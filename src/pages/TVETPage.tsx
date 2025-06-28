import React, { useState } from 'react';
import { ArrowLeft, Monitor, BookOpen, Users, Building, Briefcase, GraduationCap, Wrench, MapPin, Star, Play, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';

// Enhanced Video Component with Shimmer Loading and Error Handling
const TVETVideo: React.FC<{
  src: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  note: string;
}> = ({ src, title, description, icon, gradient, note }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount(prev => prev + 1);
  };

  return (
    <section className={`w-full bg-gradient-to-r ${gradient} py-8 sm:py-12`}>
      <div className="px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">{title}</h3>
        </div>

        <p className="text-sm sm:text-base text-green-100 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Shimmer Loading Effect */}
        {isLoading && (
          <div className="relative w-full mb-4" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 rounded-lg animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Play size={48} className="text-white/50" />
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {hasError && retryCount < 3 && (
          <div className="relative w-full mb-4 bg-red-900/30 border border-red-600/50 rounded-lg p-6" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <X size={48} className="text-red-400 mb-4" />
              <p className="text-red-200 mb-4">Video failed to load</p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-red-600/50 hover:bg-red-600/70 text-white rounded-lg border border-red-500/50 transition-all duration-200 text-sm"
              >
                Retry Now ({retryCount}/3)
              </button>
            </div>
          </div>
        )}

        <div className={`relative w-full ${isLoading || hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`} style={{ paddingBottom: '56.25%' }}>
          <iframe
            key={retryCount}
            className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-600/30"
            src={src}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          ></iframe>
        </div>

        <p className="text-xs sm:text-sm text-green-200 mt-4 italic">
          {note}
        </p>
      </div>
    </section>
  );
};

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

              {/* TVET Logos */}
              <div className="flex justify-center items-center gap-8 sm:gap-12 lg:gap-16 mb-8">
                <div className="flex flex-col items-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl shadow-white/20 border border-white/30 hover:shadow-white/40 transition-all duration-300">
                    <img
                      src="https://ctvet.gov.gh/wp-content/uploads/2022/07/logo-with-name.png"
                      alt="Commission for Technical and Vocational Education and Training (CTVET)"
                      className="h-16 sm:h-20 lg:h-24 w-auto object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 mt-3 text-center font-medium">Commission for Technical and<br />Vocational Education and Training</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl shadow-white/20 border border-white/30 hover:shadow-white/40 transition-all duration-300">
                    <img
                      src="https://gtvets.gov.gh/wp-content/uploads/2023/01/TVET-LOGO-PNG-272x300.png"
                      alt="Ghana TVET Service"
                      className="h-16 sm:h-20 lg:h-24 w-auto object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 mt-3 text-center font-medium">Ghana TVET Service</p>
                </div>
              </div>

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

            {/* Ghana TVET Overview Video */}
            <TVETVideo
              src="https://www.youtube.com/embed/OuepDAC07bA"
              title="🇬🇭 How Ghana's TVET is Making Children Engineers"
              description="Discover how Ghana's Technical and Vocational Education and Training system is transforming young lives and creating the next generation of engineers and skilled professionals."
              icon={<Wrench size={20} className="text-white" />}
              gradient="from-green-900 to-green-800"
              note="🎯 BWT-African Rising: Showcasing Ghana's innovative approach to TVET education and youth empowerment through practical skills training."
            />

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

            {/* Commission for Technical and Vocational Education and Training (CTVET) */}
            <section className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  🏛️ Commission for Technical and Vocational Education and Training (CTVET)
                </h3>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  CTVET is the apex regulatory body for Ghana's TVET system, established by the Education Regulatory Bodies Act 2020 (Act 1023) to regulate, promote and administer technical and vocational education and training for transformation and innovation for sustainable development.
                </p>
              </div>

              {/* CTVET Mandate and Vision */}
              <div className="mb-8">
                <h4 className="text-xl sm:text-2xl font-bold text-blue-300 mb-6 text-center">
                  🎯 CTVET Mandate, Vision & Mission
                </h4>

                <div className="space-y-6 text-gray-100">
                  <div>
                    <h5 className="text-lg font-semibold text-blue-300 mb-3">📋 Mandate</h5>
                    <p className="text-sm sm:text-base leading-relaxed">
                      To regulate, promote and administer technical and vocational education and training for transformation and innovation for sustainable development.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-green-300 mb-3">🌟 Vision</h5>
                    <p className="text-sm sm:text-base leading-relaxed">
                      The vision of the Commission is to be a world-class leader in coordinating skills development.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-purple-300 mb-3">🚀 Mission</h5>
                    <p className="text-sm sm:text-base leading-relaxed">
                      The mission is to coordinate and oversee a TVET system that produces a globally competitive workforce through quality-oriented and demand-driven learning for national development.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTVET Functions */}
              <div className="mb-8">
                <h4 className="text-xl sm:text-2xl font-bold text-orange-300 mb-6 text-center">
                  ⚙️ CTVET Functions & Responsibilities
                </h4>

                <div className="space-y-4 text-gray-100">
                  <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6">
                    The Education Regulatory Bodies Act 2020 (Act 1023) stipulates comprehensive functions for CTVET to ensure quality TVET delivery across Ghana:
                  </p>

                  <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                    <p><strong className="text-orange-200">Policy Formulation:</strong> Formulate national policies for skills development across the broad spectrum of pre-tertiary and tertiary education, formal, informal and alternative education</p>

                    <p><strong className="text-orange-200">Coordination & Supervision:</strong> Co-ordinate, harmonise and supervise the activities of technical and vocational education and training institutions to meet the requirements of both the formal and informal sectors</p>

                    <p><strong className="text-orange-200">Assessment & Certification:</strong> Develop and implement a national assessment and certification system in the technical and vocational education and training</p>

                    <p><strong className="text-orange-200">Quality Assurance:</strong> Take measures to ensure quality, equitable and inclusive access in the provision of technical and vocational education and training</p>

                    <p><strong className="text-orange-200">Database Management:</strong> Develop and maintain a national database on the technical and vocational education and training sector</p>

                    <p><strong className="text-orange-200">Research & Development:</strong> Facilitate research and development in the technical and vocational education and training system</p>

                    <p><strong className="text-orange-200">Funding Support:</strong> Source for funds to support technical and vocational education and training activities</p>

                    <p><strong className="text-orange-200">Industry Collaboration:</strong> Facilitate collaboration between training institutions and industry to promote industry-led and demand-driven curriculum development, workplace experience learning, and recognition of prior learning</p>

                    <p><strong className="text-orange-200">International Cooperation:</strong> Promote co-operation with international agencies and development partners</p>

                    <p><strong className="text-orange-200">Reporting:</strong> Issue reports on the state of skills development in the country</p>

                    <p><strong className="text-orange-200">Advisory Role:</strong> Advise the Minister on all matters relating to the management and improvement of the technical and vocational education and training system</p>

                    <p><strong className="text-orange-200">Standards Development:</strong> Co-ordinate and promote industry-led occupational standards generation for demand-driven curriculum development and delivery</p>

                    <p><strong className="text-orange-200">Accreditation:</strong> Accredit programmes, institutions, centres, facilitators, assessors and verifiers at the formal, informal, non-formal, technical and vocational education and training institutions to ensure quality delivery</p>

                    <p><strong className="text-orange-200">Framework Implementation:</strong> Collaborate with tertiary institutions and relevant agencies to implement competency-based training programmes on the National Technical and Vocational Education and Training Qualifications Framework</p>
                  </div>
                </div>
              </div>

              {/* CTVET Core Services */}
              <div className="mb-8">
                <h4 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-6 text-center">
                  🔧 CTVET Core Services
                </h4>

                <div className="space-y-6 text-gray-100">
                  <div>
                    <h5 className="text-lg font-semibold text-cyan-300 mb-3">📝 Registration</h5>
                    <p className="text-sm sm:text-base leading-relaxed">
                      CTVET provides comprehensive registration services for TVET institutions, ensuring they meet national standards and requirements for quality education delivery.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-green-300 mb-3">✅ Accreditation</h5>
                    <p className="text-sm sm:text-base leading-relaxed">
                      The Commission accredits TVET programmes, institutions, and training providers to ensure they meet established quality standards and deliver competency-based training aligned with industry needs.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-yellow-300 mb-3">📊 Assessment</h5>
                    <p className="text-sm sm:text-base leading-relaxed">
                      CTVET develops and implements national assessment systems, conducts examinations, and ensures standardized evaluation of TVET learners across all qualification levels.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-semibold text-red-300 mb-3">⚖️ Enforcement</h5>
                    <p className="text-sm sm:text-base leading-relaxed">
                      The Commission enforces TVET standards and regulations, monitors compliance, and takes corrective measures to maintain quality and integrity in the TVET system.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-300 italic">
                  🏛️ CTVET serves as the cornerstone of Ghana's TVET system, ensuring quality, relevance, and accessibility of technical and vocational education for national development and global competitiveness.
                </p>
              </div>
            </section>

            {/* Ghana TVET Report Video */}
            <TVETVideo
              src="https://www.youtube.com/embed/IFyPl7AlCLk"
              title="📊 Ghana TVET Report 2024 - Second Edition"
              description="The official Ghana TVET Report showcasing the latest developments, achievements, and future plans for technical and vocational education in Ghana."
              icon={<BookOpen size={20} className="text-white" />}
              gradient="from-blue-900 to-blue-800"
              note="📈 CTVET Ghana: Official report highlighting Ghana's progress in TVET development and strategic initiatives for skills training."
            />

            {/* Major TVET Institutions in Ghana */}
            <section className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
                🏫 Major TVET Institutions in Ghana
              </h3>

              <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Technical Universities */}
                <div className="bg-gradient-to-r from-red-900/40 to-red-800/40 rounded-xl p-6 border border-red-700/40">
                  <h4 className="text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
                    <GraduationCap size={24} />
                    Technical Universities 🎓
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-red-800/30 rounded-lg p-3 border border-red-600/30">
                      <h5 className="font-semibold text-red-300 text-sm mb-2">Premier Institutions:</h5>
                      <ul className="space-y-1 text-xs text-red-100">
                        <li>• <strong>Accra Technical University (ATU)</strong> - Premier TVET tertiary institution</li>
                        <li>• <strong>Kumasi Technical University (KsTU)</strong> - Engineering and technology focus</li>
                        <li>• <strong>Takoradi Technical University (TTU)</strong> - Oil and gas specialization</li>
                        <li>• <strong>Tamale Technical University (TaTU)</strong> - Northern Ghana development</li>
                        <li>• <strong>Cape Coast Technical University (CCTU)</strong> - Coastal region hub</li>
                        <li>• <strong>Bolgatanga Technical University (BTU)</strong> - Upper East region</li>
                        <li>• <strong>Wa Technical University (WaTU)</strong> - Upper West region</li>
                        <li>• <strong>Ho Technical University (HTU)</strong> - Volta region</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* NVTI and Training Centers */}
                <div className="bg-gradient-to-r from-cyan-900/40 to-cyan-800/40 rounded-xl p-6 border border-cyan-700/40">
                  <h4 className="text-xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
                    <Wrench size={24} />
                    NVTI & Training Centers 🔧
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-cyan-800/30 rounded-lg p-3 border border-cyan-600/30">
                      <h5 className="font-semibold text-cyan-300 text-sm mb-2">National Vocational Training Institute (NVTI):</h5>
                      <ul className="space-y-1 text-xs text-cyan-100">
                        <li>• <strong>28+ Skill Areas:</strong> Comprehensive vocational training</li>
                        <li>• <strong>Multiple Centers:</strong> Nationwide coverage</li>
                        <li>• <strong>Apprenticeship Programs:</strong> Traditional and modern skills</li>
                        <li>• <strong>Industry Partnerships:</strong> Real-world training opportunities</li>
                      </ul>
                    </div>
                    <div className="bg-cyan-800/30 rounded-lg p-3 border border-cyan-600/30">
                      <h5 className="font-semibold text-cyan-300 text-sm mb-2">Specialized Centers:</h5>
                      <ul className="space-y-1 text-xs text-cyan-100">
                        <li>• <strong>Danfa Technical Institute</strong> - Greater Accra region</li>
                        <li>• <strong>Don Bosco Technical Institute</strong> - Skills development</li>
                        <li>• <strong>Global Artisans Training Institute</strong> - Artisan skills</li>
                        <li>• <strong>Regional Training Centers</strong> - 101+ government assisted centers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* National TVET Qualifications Framework */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-indigo-900/40 to-indigo-800/40 rounded-2xl p-6 sm:p-8 border border-indigo-700/30 backdrop-blur-sm">
                <h3 className="text-2xl sm:text-3xl font-bold text-indigo-300 mb-6 text-center flex items-center justify-center gap-3">
                  <GraduationCap size={32} className="text-indigo-400" />
                  📋 National TVET Qualifications Framework (NTVETQF)
                </h3>

                <div className="text-center mb-8">
                  <img
                    src="https://gtvets.gov.gh/wp-content/uploads/2024/02/Artboard-1Logo-1536x1303.jpg"
                    alt="Ghana TVET Qualifications Framework"
                    className="mx-auto rounded-xl shadow-2xl border border-indigo-600/30 max-w-full h-auto"
                    style={{ maxHeight: '400px', width: 'auto' }}
                  />
                </div>

                <div className="mb-6">
                  <p className="text-base sm:text-lg text-gray-100 leading-relaxed mb-4">
                    The <strong className="text-indigo-300">National TVET Qualifications Framework (NTVETQF)</strong> administered by CTVET, aims to improve and increase the different pathways for TVET graduates. It provides clear entry and exit points for learners and successful graduates.
                  </p>

                  <div className="bg-indigo-800/30 rounded-lg p-4 border border-indigo-600/30 mb-6">
                    <h4 className="text-base sm:text-lg font-semibold text-indigo-300 mb-3">🎯 Framework Objectives</h4>
                    <ul className="space-y-2 text-sm text-indigo-100">
                      <li>• <strong>Unified Framework:</strong> Bring all post-basic occupation-oriented qualifications into one system</li>
                      <li>• <strong>Access to Education:</strong> Facilitate access to further education and training for technical professionals</li>
                      <li>• <strong>Quality Standards:</strong> Improve product and service quality through uniform practice standards</li>
                      <li>• <strong>Lifelong Learning:</strong> Promote access to continuous learning, especially for informal sector operators</li>
                    </ul>
                  </div>
                </div>

                {/* Qualification Levels */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Foundation Levels */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-indigo-300 mb-4">🔰 Foundation Levels</h4>

                    <div className="bg-indigo-800/20 rounded-lg p-4 border border-indigo-600/20">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-2">National Proficiency I</h5>
                      <p className="text-xs text-indigo-100 mb-2">
                        Bridging programme for people with minimal education background. Focuses on basic skills and knowledge within technical/vocational areas.
                      </p>
                      <ul className="text-xs text-indigo-200 space-y-1">
                        <li>• Entry: No formal certificate required</li>
                        <li>• Work: Routine tasks under close supervision</li>
                        <li>• Progression: National Proficiency II</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-800/20 rounded-lg p-4 border border-indigo-600/20">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-2">National Proficiency II</h5>
                      <p className="text-xs text-indigo-100 mb-2">
                        Allows progression to National Certificate I and provides technical institution entrance opportunities.
                      </p>
                      <ul className="text-xs text-indigo-200 space-y-1">
                        <li>• Entry: National Proficiency I achievement</li>
                        <li>• Work: Varied activities under limited supervision</li>
                        <li>• Progression: National Certificate I</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-800/20 rounded-lg p-4 border border-indigo-600/20">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-2">National Certificate I</h5>
                      <p className="text-xs text-indigo-100 mb-2">
                        Develops employable skills through significant workplace experience learning.
                      </p>
                      <ul className="text-xs text-indigo-200 space-y-1">
                        <li>• Entry: National Proficiency II or BECE pass</li>
                        <li>• Work: Complex activities under minimum supervision</li>
                        <li>• Progression: National Certificate II</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-800/20 rounded-lg p-4 border border-indigo-600/20">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-2">National Certificate II</h5>
                      <p className="text-xs text-indigo-100 mb-2">
                        Provides considerable responsibility and autonomy with guidance capabilities.
                      </p>
                      <ul className="text-xs text-indigo-200 space-y-1">
                        <li>• Entry: National Certificate I or WASSCE pass</li>
                        <li>• Work: Complex, non-routine tasks with autonomy</li>
                        <li>• Progression: HND or B.Tech</li>
                      </ul>
                    </div>
                  </div>

                  {/* Advanced Levels */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-indigo-300 mb-4">🎓 Advanced Levels</h4>

                    <div className="bg-indigo-800/20 rounded-lg p-4 border border-indigo-600/20">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-2">Higher National Diploma (HND)</h5>
                      <p className="text-xs text-indigo-100 mb-2">
                        Involves organizational ability, resource management, and accountability for processes and outputs.
                      </p>
                      <ul className="text-xs text-indigo-200 space-y-1">
                        <li>• Entry: National Certificate II or WASSCE</li>
                        <li>• Work: Complex tasks with resource management</li>
                        <li>• Progression: B.Tech or M.Tech</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-800/20 rounded-lg p-4 border border-indigo-600/20">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-2">Bachelor of Technology (B.Tech)</h5>
                      <p className="text-xs text-indigo-100 mb-2">
                        Self-directed activities requiring strategic thinking and high-level organizational skills.
                      </p>
                      <ul className="text-xs text-indigo-200 space-y-1">
                        <li>• Entry: National Certificate II or HND</li>
                        <li>• Work: Strategic thinking and judgement</li>
                        <li>• Progression: M.Tech</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-800/20 rounded-lg p-4 border border-indigo-600/20">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-2">Master of Technology (M.Tech)</h5>
                      <p className="text-xs text-indigo-100 mb-2">
                        Resolution of complex issues and sound judgment in absence of complete data.
                      </p>
                      <ul className="text-xs text-indigo-200 space-y-1">
                        <li>• Entry: HND or B.Tech</li>
                        <li>• Work: Independent problem-solving</li>
                        <li>• Progression: D.Tech</li>
                      </ul>
                    </div>

                    <div className="bg-indigo-800/20 rounded-lg p-4 border border-indigo-600/20">
                      <h5 className="font-semibold text-indigo-300 text-sm mb-2">Doctor of Technology (D.Tech)</h5>
                      <p className="text-xs text-indigo-100 mb-2">
                        Highly complex work with informed judgment on complex technological issues.
                      </p>
                      <ul className="text-xs text-indigo-200 space-y-1">
                        <li>• Entry: M.Tech qualification</li>
                        <li>• Work: Complex technological leadership</li>
                        <li>• Progression: Professional practice</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-indigo-200 italic">
                    🌟 The NTVETQF provides clear pathways from basic skills to advanced technology leadership, ensuring quality standards and lifelong learning opportunities for all Ghanaians.
                  </p>
                </div>
              </div>
            </section>

            {/* Accredited TVET Programmes */}
            <section className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  📋 Accredited TVET Programmes in Ghana
                </h3>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Ghana TVET Service offers a comprehensive range of accredited programmes across multiple sectors, designed to meet industry demands and provide clear career pathways for learners at all levels.
                </p>
              </div>

              {/* Competency Based Training Programmes */}
              <div className="mb-12">
                <h4 className="text-xl sm:text-2xl font-bold text-green-300 mb-6 text-center">
                  🎯 Competency Based Training Programmes
                </h4>

                <div className="space-y-6 text-gray-100">
                  {/* ICT Programmes */}
                  <div>
                    <h5 className="text-lg font-semibold text-blue-300 mb-3">💻 Information Communication Technology (ICT)</h5>
                    <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                      <p><strong className="text-blue-200">Computer Data Administration</strong> - Available at NC I and NC II levels (ICT-CDA320A, ICT-CDA420A)</p>
                      <p><strong className="text-blue-200">Computer Networking System</strong> - Available at NC I and NC II levels (ICT-CNSL320A, ICT-CNSL420A)</p>
                      <p><strong className="text-blue-200">Computer Software Development</strong> - Available at NC I and NC II levels (ICT-CSD320A, ICT-CSD420A)</p>
                    </div>
                  </div>

                  {/* Agriculture Programmes */}
                  <div>
                    <h5 className="text-lg font-semibold text-green-300 mb-3">🌱 Agriculture, Agribusiness and Agro Processing (AAA)</h5>
                    <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                      <p><strong className="text-green-200">Cashew Value Chain</strong> - Complete pathway from NP I to NC II (AAA-CVC120A through AAA-CVC420A)</p>
                      <p><strong className="text-green-200">Mango Value Chain</strong> - Available at NP I and NP II levels (AAA-MVC120A, AAA-MVC220A)</p>
                      <p><strong className="text-green-200">Oil Palm Value Chain</strong> - Available at NC I and NC II levels (AAA-OPV120A, AAA-OPV220A)</p>
                    </div>
                  </div>

                  {/* Construction Programmes */}
                  <div>
                    <h5 className="text-lg font-semibold text-orange-300 mb-3">🏗️ Construction (CON)</h5>
                    <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                      <p><strong className="text-orange-200">Plumbing and Gas Technology</strong> - Complete pathway from NP I to NC II (CON-PGT120A through CON-PGT420A)</p>
                      <p><strong className="text-orange-200">Block Laying and Tiling</strong> - Available at NP I and NP II levels (CON-BLT120A, CON-BLT220A)</p>
                      <p><strong className="text-orange-200">Furniture Works</strong> - Available at NP I and NP II levels (CON-FUW120A, CON-FUW220A)</p>
                      <p><strong className="text-orange-200">Welding & Fabrication Technology</strong> - Complete pathway from NP I to NC II (CON-WFT120B through CON-WFT420B)</p>
                    </div>
                  </div>

                  {/* Electronics and Electrical */}
                  <div>
                    <h5 className="text-lg font-semibold text-yellow-300 mb-3">⚡ Electronics, Automation and Electrical (EEA)</h5>
                    <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                      <p><strong className="text-yellow-200">Electrical Installation</strong> - Available at NP I and NP II levels (EEA-ELI120A, EEA-ELI220A)</p>
                      <p><strong className="text-yellow-200">Electronics</strong> - Available at NP I and NP II levels (EEA-ELS120A, EEA-ELS220A)</p>
                    </div>
                  </div>

                  {/* Energy and Oil & Gas */}
                  <div>
                    <h5 className="text-lg font-semibold text-red-300 mb-3">🛢️ Energy and Oil and Gas (EOG)</h5>
                    <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                      <p><strong className="text-red-200">Welding (Oil and Gas)</strong> - NC II level (EOG-WEL420A)</p>
                      <p><strong className="text-red-200">Mechanical (Oil and Gas)</strong> - NC II level (EOG-MEC420A)</p>
                      <p><strong className="text-red-200">Hydraulics Technology</strong> - NC II level (EOG-HYT420A)</p>
                      <p><strong className="text-red-200">Instrumentation Technology</strong> - NC II level (EOG-INT420A)</p>
                      <p><strong className="text-red-200">Well Control</strong> - NC II level (EOG-WEC420A)</p>
                    </div>
                  </div>

                  {/* Cosmetology and Wellness */}
                  <div>
                    <h5 className="text-lg font-semibold text-pink-300 mb-3">💄 Cosmetology and Wellness (COW)</h5>
                    <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                      <p><strong className="text-pink-200">Cosmetology</strong> - Available at NP I and NP II levels (COW-COS120B, COW-COS220B)</p>
                      <p><strong className="text-pink-200">Make-Up Artistry</strong> - NC I level (COW-MUA320A)</p>
                    </div>
                  </div>

                  {/* Textile and Apparel */}
                  <div>
                    <h5 className="text-lg font-semibold text-purple-300 mb-3">👗 Textile and Apparel (TEA)</h5>
                    <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                      <p><strong className="text-purple-200">Garment Making</strong> - Available at NP I and NP II levels (TEA-GAM120B)</p>
                    </div>
                  </div>

                  {/* Automotive Skills Development */}
                  <div>
                    <h5 className="text-lg font-semibold text-cyan-300 mb-3">🚗 Automotive Skills Development (ASD)</h5>
                    <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                      <p><strong className="text-cyan-200">Automotive Mechanic</strong> - Available at NP I and NP II levels (ASD-AUM120B, ASD-AUM220B)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generic Programmes */}
              <div className="mb-12">
                <h4 className="text-xl sm:text-2xl font-bold text-indigo-300 mb-6 text-center">
                  📚 Generic Programmes (Foundation Skills)
                </h4>

                <div className="space-y-4 text-gray-100">
                  <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6">
                    Generic programmes provide essential foundation skills that support all technical and vocational training. These programmes are available across all NTVETQF levels from National Proficiency I to National Certificate II.
                  </p>

                  <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                    <p><strong className="text-indigo-200">English Language</strong> - Communication skills development across all levels (GEN-ENG120B through GEN-ENG420B)</p>
                    <p><strong className="text-indigo-200">Mathematics</strong> - Numerical and analytical skills for technical applications (GEN-MAT120B through GEN-MAT420B)</p>
                    <p><strong className="text-indigo-200">Science</strong> - Scientific principles and applications for technical fields (GEN-SCI120B through GEN-SCI420B)</p>
                    <p><strong className="text-indigo-200">Information Communication Technology (ICT)</strong> - Digital literacy and computer skills (GEN-ICT120B through GEN-ICT420B)</p>
                    <p><strong className="text-indigo-200">Entrepreneurship</strong> - Business development and self-employment skills (GEN-ENT120B through GEN-ENT420B)</p>
                  </div>
                </div>
              </div>

              {/* Programme Code Interpretation */}
              <div className="mb-12">
                <h4 className="text-xl sm:text-2xl font-bold text-gray-300 mb-6 text-center">
                  🔍 Understanding Programme Codes
                </h4>

                <div className="space-y-4 text-gray-100">
                  <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">
                    Each TVET programme has a unique 10-character alphanumeric code that provides important information about the programme:
                  </p>

                  <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                    <p><strong className="text-gray-200">First 3 letters:</strong> Sector code (e.g., ICT = Information Communication Technology)</p>
                    <p><strong className="text-gray-200">Hyphen (-):</strong> Separator</p>
                    <p><strong className="text-gray-200">Next 3 letters:</strong> Trade/occupation code (e.g., CDA = Computer Data Administration)</p>
                    <p><strong className="text-gray-200">Single digit:</strong> NTVETQF qualification level (1=NP I, 2=NP II, 3=NC I, 4=NC II)</p>
                    <p><strong className="text-gray-200">Two digits:</strong> Year of programme approval (e.g., 20 = 2020)</p>
                    <p><strong className="text-gray-200">Final letter:</strong> Programme version (A=first version, B=second version)</p>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-gray-300 italic">
                      <strong>Example:</strong> ICT-CDA320A = Information Communication Technology - Computer Data Administration - National Certificate I - Approved 2020 - Version A
                    </p>
                  </div>
                </div>
              </div>

              {/* Sector Codes Reference */}
              <div className="mb-8">
                <h4 className="text-xl sm:text-2xl font-bold text-gray-300 mb-6 text-center">
                  🏭 Sector Codes Reference
                </h4>

                <div className="space-y-2 text-sm sm:text-base leading-relaxed text-gray-100">
                  <p><strong className="text-gray-200">AAA</strong> - Agriculture, Agribusiness and Agro Processing</p>
                  <p><strong className="text-gray-200">ASD</strong> - Automotive Skills Development</p>
                  <p><strong className="text-gray-200">BAF</strong> - Banking and Finance</p>
                  <p><strong className="text-gray-200">CON</strong> - Construction</p>
                  <p><strong className="text-gray-200">COW</strong> - Cosmetology and Wellness</p>
                  <p><strong className="text-gray-200">EAE</strong> - Electronics, Automation and Electrical</p>
                  <p><strong className="text-gray-200">EIB</strong> - Earthmoving & Infrastructure Building</p>
                  <p><strong className="text-gray-200">EOG</strong> - Energy and Oil and Gas</p>
                  <p><strong className="text-gray-200">ESW</strong> - Environmental, Sanitation and Waste Management</p>
                  <p><strong className="text-gray-200">HEC</strong> - Health Care</p>
                  <p><strong className="text-gray-200">ICT</strong> - Information Communication Technology</p>
                  <p><strong className="text-gray-200">LOT</strong> - Logistics and Transportation</p>
                  <p><strong className="text-gray-200">MEE</strong> - Media and Entertainment</p>
                  <p><strong className="text-gray-200">MEM</strong> - Machine and Equipment Manufacturing</p>
                  <p><strong className="text-gray-200">MET</strong> - Metals</p>
                  <p><strong className="text-gray-200">MIN</strong> - Mining</p>
                  <p><strong className="text-gray-200">SES</strong> - Security and Safety</p>
                  <p><strong className="text-gray-200">STM</strong> - Strategic Manufacturing</p>
                  <p><strong className="text-gray-200">TEA</strong> - Textile and Apparel</p>
                  <p><strong className="text-gray-200">TEL</strong> - Telecom</p>
                  <p><strong className="text-gray-200">TOH</strong> - Tourism and Hospitality</p>
                  <p><strong className="text-gray-200">WOF</strong> - Wood and Forestry</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-300 italic">
                  📋 All programmes are regularly reviewed and updated to ensure they meet current industry standards and employer requirements. Programme approval dates and expiry dates ensure quality and relevance.
                </p>
              </div>
            </section>

            {/* Free TVET Schools for JHS Graduates */}
            <section className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  🎓 Free TVET Schools for JHS Graduates
                </h3>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
                  After completing JHS, students can continue their education at any of these 47 government-sponsored free TVET schools across Ghana. These institutions offer quality technical and vocational training without tuition fees.
                </p>

                <div className="mb-8">
                  <a
                    href="https://ctvet.gov.gh/wp-content/uploads/2021/06/LIST-OF-FREE-TVET-SCHOOLS.xlsx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg hover:shadow-green-400/25 hover:scale-105"
                  >
                    <BookOpen size={20} />
                    <span>📥 Download Complete List (Excel)</span>
                  </a>
                </div>
              </div>

              {/* Schools by Region */}
              <div className="space-y-8 text-gray-100">
                {/* Greater Accra Region */}
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4">
                    🏙️ Greater Accra Region (6 Schools)
                  </h4>
                  <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                    <p><strong className="text-blue-200">Accra Tech. Training Centre</strong> - Kokomlemle, Accra</p>
                    <p><strong className="text-blue-200">Sacred Heart Tech. Institute</strong> - James Town, Accra</p>
                    <p><strong className="text-blue-200">Ada Tech. Institute</strong> - Ada, Ada East</p>
                    <p><strong className="text-blue-200">Ashiaman Tech/Voc. Institute</strong> - Ashiaman</p>
                    <p><strong className="text-blue-200">Teshie Tech. Institute</strong> - Teshie, Ledzokuku-Krowor</p>
                    <p><strong className="text-blue-200">Tema Tech. Institute</strong> - Tema</p>
                  </div>
                </div>

                {/* Ashanti Region */}
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-green-300 mb-4">
                    🌳 Ashanti Region (4 Schools)
                  </h4>
                  <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                    <p><strong className="text-green-200">St. Michael Tech/Voc Institute</strong> - Pramso, Bosomtwe</p>
                    <p><strong className="text-green-200">Kumasi Tech. Institute</strong> - Kumasi</p>
                    <p><strong className="text-green-200">Methodist Technical Institute</strong> - Kwadaso, Kumasi</p>
                    <p><strong className="text-green-200">Krobea Asante Tech/Voc School</strong> - Asokore, Sekyere East</p>
                  </div>
                </div>

                {/* Eastern Region */}
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-yellow-300 mb-4">
                    ⛰️ Eastern Region (8 Schools)
                  </h4>
                  <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                    <p><strong className="text-yellow-200">J.G. Knol Voc. Tech. Institute</strong> - Adukrom Akwapem, Akuapem North</p>
                    <p><strong className="text-yellow-200">Akwatia Tech. Institute</strong> - Akwatia, Denkyembour</p>
                    <p><strong className="text-yellow-200">St. Paul's Tech. School</strong> - Kukurantumi, East Akim</p>
                    <p><strong className="text-yellow-200">Amankwakrom Fisheries Agric. Tech. Institute</strong> - Amankwakrom, Kwahu Afram Plains North</p>
                    <p><strong className="text-yellow-200">St. Mary's Voc./Tech. Institute</strong> - Adiembra, Kwahu Afram Plains North</p>
                    <p><strong className="text-yellow-200">Abetifi Tech. Institute</strong> - Abetifi, Kwahu East</p>
                    <p><strong className="text-yellow-200">St. Joseph's Tech. Institute</strong> - Kwahu-Tafo, Kwahu South</p>
                    <p><strong className="text-yellow-200">Koforidua Tech. Institute</strong> - Koforidua, New Juaben</p>
                  </div>
                </div>

                {/* Volta Region */}
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-purple-300 mb-4">
                    ⚡ Volta Region (9 Schools)
                  </h4>
                  <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                    <p><strong className="text-purple-200">Have Tech. Institute</strong> - Have, Afadzto South</p>
                    <p><strong className="text-purple-200">St. Daniel Comboni Tech/Voc Institute</strong> - Liati, Afadzto South</p>
                    <p><strong className="text-purple-200">Volta Tech Institute</strong> - Matse, Ho</p>
                    <p><strong className="text-purple-200">Amedzofe Technical Institute</strong> - Amedzofe, Ho West</p>
                    <p><strong className="text-purple-200">E.P. Tech./Voc. Institute</strong> - Alavanyo, Hohoe</p>
                    <p><strong className="text-purple-200">Anlo Tech. Institute</strong> - Anloga, Keta</p>
                    <p><strong className="text-purple-200">Kpando Tech. Institute</strong> - Kpando</p>
                    <p><strong className="text-purple-200">C.Y.O.Voc. Tech. Institute</strong> - Sovie, Kpando</p>
                    <p><strong className="text-purple-200">Comboni Tech/Voc Institute</strong> - Sogakope, South Tongu</p>
                  </div>
                </div>

                {/* Central Region */}
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-4">
                    🏖️ Central Region (3 Schools)
                  </h4>
                  <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                    <p><strong className="text-cyan-200">Asuansi Tech. Institute</strong> - Asuansi, Abura/Asebu/Kwaman</p>
                    <p><strong className="text-cyan-200">Enyan-Abaasa Technical Institute</strong> - Enyan-Abaasa, Ajumako/Enyan/Essiam</p>
                    <p><strong className="text-cyan-200">Cape Coast Tech. Institute</strong> - Cape Coast</p>
                  </div>
                </div>

                {/* Brong Ahafo Region */}
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-orange-300 mb-4">
                    🌾 Brong Ahafo Region (3 Schools)
                  </h4>
                  <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                    <p><strong className="text-orange-200">Nkoranza Tech Institute</strong> - Nkoranza</p>
                    <p><strong className="text-orange-200">Sunyani Methodist Technical Institute</strong> - Sunyani</p>
                    <p><strong className="text-orange-200">Don Bosco Voc./Tech. Institute</strong> - Odumasi, Sunyani West</p>
                  </div>
                </div>

                {/* Northern Regions */}
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-red-300 mb-4">
                    🏜️ Northern Regions (7 Schools)
                  </h4>
                  <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                    <p><strong className="text-red-200">St. Joseph's Tech. Institute</strong> - Saboba, Northern</p>
                    <p><strong className="text-red-200">Tamale Technical Institute</strong> - Tamale, Sagnerigu</p>
                    <p><strong className="text-red-200">Dabokpa Voc/Tech. Institute</strong> - Tamale, Tamale Metro</p>
                    <p><strong className="text-red-200">Walewale Tech/Voc Institute</strong> - Walewale, West Mampusi (North East)</p>
                    <p><strong className="text-red-200">Fr. Dogli Memorial Voc.Tech. Institute</strong> - New Ayoma, Jasikan (Oti)</p>
                    <p><strong className="text-red-200">Buipe Tech/Voc Institute</strong> - Buipe, Central Gonja (Savannah)</p>
                  </div>
                </div>

                {/* Upper Regions */}
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-pink-300 mb-4">
                    🏔️ Upper East & Upper West (6 Schools)
                  </h4>
                  <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                    <p><strong className="text-pink-200">Bawku Tech. Institute</strong> - Bawku, Upper East</p>
                    <p><strong className="text-pink-200">Bolga Tech. Institute</strong> - Bolgatanga, Upper East</p>
                    <p><strong className="text-pink-200">St. Bernadettes Tech/Voc. Institute</strong> - Navrongo, Upper East</p>
                    <p><strong className="text-pink-200">St. Basilides Voc./Tech. Institute</strong> - Kaleo, Upper West</p>
                    <p><strong className="text-pink-200">St.John's Voc. Tech. Institute</strong> - Nandom, Upper West</p>
                    <p><strong className="text-pink-200">Wa Tech. Institute</strong> - Wa, Upper West</p>
                  </div>
                </div>

                {/* Western Region */}
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-indigo-300 mb-4">
                    🌊 Western Region (2 Schools)
                  </h4>
                  <div className="space-y-2 text-sm sm:text-base leading-relaxed">
                    <p><strong className="text-indigo-200">Kikam Tech. Institute</strong> - Kikam, Ellembelle</p>
                    <p><strong className="text-indigo-200">Takoradi Tech. Institute</strong> - Takoradi, Sekondi-Takoradi</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-gray-300 italic">
                  🎯 These 47 free TVET schools provide excellent opportunities for JHS graduates to acquire practical skills and technical knowledge without financial barriers. Each school offers various programmes aligned with regional economic needs and national development priorities.
                </p>
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

            {/* Women in TVET Video */}
            <TVETVideo
              src="https://www.youtube.com/embed/HFzHRdy2N7A"
              title="👩‍🔧 Ghana TVET Encourages Women to Break Barriers"
              description="Ghana TVET Service joins International Women's Day celebration, encouraging women to break barriers and pursue careers in technical and vocational fields."
              icon={<Users size={20} className="text-white" />}
              gradient="from-purple-900 to-purple-800"
              note="🌟 GhanaWeb TV: Highlighting Ghana's commitment to gender inclusion in TVET and empowering women in technical careers."
            />

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

            {/* TVET Transformation Video */}
            <TVETVideo
              src="https://www.youtube.com/embed/c0gUMPNKEjM"
              title="🔄 Transformation of TVET in Ghana"
              description="Explore the role of Ghana TVET Service in transforming technical and vocational education, creating opportunities for youth development and economic growth."
              icon={<GraduationCap size={20} className="text-white" />}
              gradient="from-indigo-900 to-indigo-800"
              note="📺 Graphic Online TV: In-depth discussion on Ghana's TVET transformation and the strategic role of Ghana TVET Service."
            />

            {/* TVET Leadership Video */}
            <TVETVideo
              src="https://www.youtube.com/embed/3_usjTp9q1A"
              title="🎙️ The Seat with David Prah - Deputy Director General Ghana TVET"
              description="Insightful interview with David Prah, Deputy Director-General of Ghana TVET Service, discussing the future of technical education in Ghana."
              icon={<Briefcase size={20} className="text-white" />}
              gradient="from-orange-900 to-orange-800"
              note="🎯 Leadership Insights: Strategic vision and leadership perspectives on Ghana's TVET development from top officials."
            />

            {/* Skills Training Campaign Video */}
            <TVETVideo
              src="https://www.youtube.com/embed/pAMO7d6bd4s"
              title="📢 Ghana TVET Service Skills Training Campaign"
              description="Ghana TVET Service takes to the streets with awareness campaigns, promoting skills training opportunities and encouraging youth participation in TVET programs."
              icon={<Star size={20} className="text-white" />}
              gradient="from-red-900 to-red-800"
              note="🚀 Community Outreach: Ghana TVET Service's grassroots approach to creating awareness about technical education opportunities."
            />

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
