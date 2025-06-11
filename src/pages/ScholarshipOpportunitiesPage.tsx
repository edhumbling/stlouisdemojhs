import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, BookOpen, Globe, DollarSign, Users, Target, Award, Briefcase, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

interface ScholarshipItem {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
}

const ScholarshipOpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // External link handler
  const handleExternalLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleBack = () => {
    navigate('/students-hub');
  };

  // Comprehensive scholarship data organized by categories
  const scholarshipOpportunities: ScholarshipItem[] = [
    // JHS Excellence & BECE Preparation
    {
      id: 'bece-preparation',
      name: 'BECE Excellence Hub',
      url: 'https://www.khanacademy.org/math',
      description: 'Achieve outstanding BECE results to access the best SHS programs. Strong performance opens doors to science programs, business courses, and technical/vocational opportunities that lead to scholarships.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'technical-vocational-guide',
      name: 'Technical & Vocational Pathways',
      url: 'https://www.tvet.gov.gh',
      description: 'Explore technical and vocational education opportunities. These paths offer excellent career prospects, practical skills, and scholarship opportunities in engineering, ICT, agriculture, and trades.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },

    // SHS SAT Preparation & University Readiness (Khan Academy removed)
    {
      id: 'afex-hub-shs',
      name: 'AFEX Hub - SHS SAT Classes',
      url: 'https://www.afextestprep.com',
      description: 'Start SAT preparation in SHS through professional organizations. Early preparation gives you 2-3 years to achieve high scores for international scholarships and top university admissions.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },
    {
      id: 'yaf-ghana-shs',
      name: 'YAfGhana - Free SHS SAT Training',
      url: 'https://yafghana.org',
      description: 'Access free SAT training while in SHS. Join their programs early to build strong foundations for university applications and scholarship opportunities.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#2563eb'
    },
    {
      id: 'education-usa-guidance',
      name: 'EducationUSA - University Pathway',
      url: 'https://gh.usembassy.gov/education-culture/educationusa/',
      description: 'Get official guidance on U.S. university applications. Learn about the complete process from SHS through university admission and scholarship applications.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-cyan-600',
      glowColor: '#0891b2'
    },
    {
      id: 'veritas-foundation-counseling',
      name: 'Veritas Foundation - College Counseling',
      url: 'https://theveritasfoundation.co',
      description: 'Professional college counseling services to help you make informed decisions about university choices, application strategies, and scholarship opportunities.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#9333ea'
    },
    {
      id: 'college-board-official',
      name: 'College Board - Official SAT Resources',
      url: 'https://www.collegeboard.org',
      description: 'Access official SAT practice tests, study materials, and registration information. Essential for students planning to apply to international universities.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#4f46e5'
    },

    // Local Scholarship Opportunities - Comprehensive Guide
    {
      id: 'ghana-scholarship-secretariat',
      name: 'Ghana Scholarship Secretariat',
      url: 'https://www.scholarshipgh.com',
      description: 'Government scholarships for tertiary education. Apply early with strong academic records. Covers tuition, accommodation, and living expenses for qualified students pursuing degrees in priority fields.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-cyan-600',
      glowColor: '#0891b2'
    },
    {
      id: 'mastercard-foundation-comprehensive',
      name: 'Mastercard Foundation Scholars Program',
      url: 'https://mastercardfdn.org/en/what-we-do/our-programs/mastercard-foundation-scholars-program/',
      description: 'Full scholarships covering tuition, accommodation, meals, books, and leadership development. Targets academically talented students from disadvantaged backgrounds. Includes mentorship and career support.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    },
    {
      id: 'knust-comprehensive-scholarships',
      name: 'KNUST Scholarships & Programs',
      url: 'https://apps.knust.edu.gh/admissions',
      description: 'KNUST offers merit scholarships, need-based aid, and special programs for engineering, science, and technology students. Strong WASSCE results in science subjects increase your chances significantly.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-teal-600',
      glowColor: '#059669'
    },
    {
      id: 'ug-comprehensive-aid',
      name: 'University of Ghana Financial Support',
      url: 'https://www.ug.edu.gh/financialaid/',
      description: 'UG provides various financial aid options including academic scholarships, sports scholarships, and need-based grants. Excellent WASSCE grades and extracurricular achievements are key factors.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-green-600',
      glowColor: '#10b981'
    },
    {
      id: 'ashesi-comprehensive-scholarships',
      name: 'Ashesi University Scholarship Programs',
      url: 'https://ashesi.edu.gh/scholarships/',
      description: 'Ashesi offers full and partial scholarships based on academic merit, leadership potential, and financial need. Strong performance in mathematics and English is essential for consideration.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-indigo-600',
      glowColor: '#7c3aed'
    },
    {
      id: 'getfund-comprehensive',
      name: 'Ghana Education Trust Fund (GETFund)',
      url: 'https://getfund.gov.gh',
      description: 'Government scholarships for students with excellent academic records. Covers local and international studies. Priority given to students in science, technology, engineering, and mathematics (STEM) fields.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-purple-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'gnpc-foundation-stem',
      name: 'GNPC Foundation STEM Scholarships',
      url: 'https://gnpcfoundation.org',
      description: 'Specialized scholarships for students pursuing petroleum engineering, geology, chemistry, and related STEM fields. Includes internship opportunities and career mentorship programs.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#ea580c'
    },
    {
      id: 'vodafone-ghana-ict',
      name: 'Vodafone Ghana ICT Scholarships',
      url: 'https://www.vodafone.com.gh/foundation',
      description: 'Scholarships for students pursuing ICT, telecommunications, and digital technology programs. Includes practical training and potential employment opportunities.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-pink-600',
      glowColor: '#dc2626'
    },
    {
      id: 'mtn-foundation-digital',
      name: 'MTN Foundation Digital Skills',
      url: 'https://www.mtn.com.gh/mtn-foundation',
      description: 'Educational support for students in digital technology, computer science, and telecommunications. Combines academic scholarships with practical skills development.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#d97706'
    },
    {
      id: 'cocobod-agricultural',
      name: 'COCOBOD Agricultural Scholarships',
      url: 'https://cocobod.gh',
      description: 'Scholarships for children of cocoa farmers and students pursuing agricultural studies. Covers agribusiness, agricultural engineering, and food science programs.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-amber-600 to-yellow-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'dream-hive-comprehensive',
      name: 'Dream Hive Scholarship Program',
      url: 'https://dhscholarship.org',
      description: 'Comprehensive support for ambitious students including academic scholarships, mentorship, career guidance, and leadership development. "A Hive of Dreams, A Buzz of Success"',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-pink-600 to-purple-600',
      glowColor: '#ec4899'
    },
    // International Opportunities - Comprehensive University Pathway Guide
    {
      id: 'commonwealth-scholarships-comprehensive',
      name: 'Commonwealth Scholarships (UK)',
      url: 'https://www.cscuk.fcdo.gov.uk',
      description: 'Full scholarships for master\'s and PhD studies in the UK. Requires excellent academic record (First Class or Upper Second), leadership experience, and commitment to development. Start preparing applications 18 months in advance.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'daad-scholarships-comprehensive',
      name: 'DAAD Scholarships (Germany)',
      url: 'https://www.daad.de/en',
      description: 'German Academic Exchange Service offers scholarships for undergraduate, master\'s, and PhD programs. Strong emphasis on STEM fields. Requires good German language skills or English proficiency for international programs.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-orange-600',
      glowColor: '#dc2626'
    },
    {
      id: 'chevening-scholarships-leadership',
      name: 'Chevening Scholarships (UK Leadership)',
      url: 'https://www.chevening.org',
      description: 'Prestigious UK government scholarships for future leaders. Covers master\'s degree, living expenses, and return flights. Requires 2+ years work experience, leadership potential, and strong academic background.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-cyan-600',
      glowColor: '#0891b2'
    },
    {
      id: 'fulbright-program-comprehensive',
      name: 'Fulbright Program (USA)',
      url: 'https://gh.usembassy.gov/education-culture/fulbright/',
      description: 'Prestigious US government exchange program for master\'s and PhD studies. Highly competitive - requires exceptional academic record, research proposal, and demonstrated leadership. Covers full tuition and living expenses.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#4f46e5'
    },
    {
      id: 'erasmus-plus-comprehensive',
      name: 'Erasmus+ Program (Europe)',
      url: 'https://erasmus-plus.ec.europa.eu',
      description: 'EU scholarships for study and training across Europe. Offers joint master\'s programs, exchange opportunities, and full degree scholarships. Strong focus on innovation, sustainability, and digital skills.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      glowColor: '#9333ea'
    },
    {
      id: 'australia-awards-comprehensive',
      name: 'Australia Awards Scholarships',
      url: 'https://www.dfat.gov.au/people-to-people/australia-awards',
      description: 'Full scholarships for undergraduate and postgraduate studies in Australia. Covers tuition, living allowance, health insurance, and return airfare. Priority areas include agriculture, education, and governance.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#059669'
    },
    {
      id: 'chinese-government-comprehensive',
      name: 'Chinese Government Scholarships',
      url: 'https://www.studyinchina.edu.cn',
      description: 'Full and partial scholarships for all academic levels in China. Strong programs in engineering, medicine, business, and Chinese language studies. Many programs taught in English.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-red-600 to-yellow-600',
      glowColor: '#dc2626'
    },
    {
      id: 'mext-scholarships-comprehensive',
      name: 'MEXT Scholarships (Japan)',
      url: 'https://www.studyinjapan.go.jp/en',
      description: 'Japanese Government scholarships covering tuition, living allowance, and airfare. Strong programs in technology, engineering, and research. Basic Japanese language skills recommended but not always required.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-pink-600 to-red-600',
      glowColor: '#ec4899'
    },
    {
      id: 'korean-government-comprehensive',
      name: 'Korean Government Scholarship (KGSP)',
      url: 'https://www.studyinkorea.go.kr',
      description: 'Full scholarships including Korean language training, tuition, living allowance, and airfare. Excellent programs in technology, business, and Korean studies. One-year Korean language course included.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-purple-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'rotary-global-grants-comprehensive',
      name: 'Rotary Foundation Global Grants',
      url: 'https://www.rotary.org/en/our-programs/scholarships',
      description: 'International scholarships for graduate studies in peace, disease prevention, water sanitation, maternal health, basic education, and economic development. Requires Rotary club sponsorship.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-orange-600',
      glowColor: '#f59e0b'
    }
  ];

  // Enhanced category logic with proper grouping
  const getCategory = (scholarship: ScholarshipItem): string => {
    const name = scholarship.name.toLowerCase();
    const description = scholarship.description.toLowerCase();

    // SHS SAT Preparation
    if (name.includes('afex') || name.includes('yaf') || name.includes('educationusa') ||
        name.includes('veritas') || name.includes('college board') ||
        description.includes('sat') || description.includes('shs')) {
      return 'SHS SAT Preparation';
    }

    // International Scholarships
    if (name.includes('international') || name.includes('commonwealth') || name.includes('daad') ||
        name.includes('chevening') || name.includes('fulbright') || name.includes('erasmus') ||
        name.includes('australia') || name.includes('chinese') || name.includes('japanese') ||
        name.includes('korean') || name.includes('rotary') || name.includes('mext')) {
      return 'International Scholarships';
    }

    // Local Scholarships
    if (name.includes('ghana') || name.includes('knust') || name.includes('ug') ||
        name.includes('ashesi') || name.includes('getfund') || name.includes('gnpc') ||
        name.includes('vodafone') || name.includes('mtn') || name.includes('cocobod') ||
        name.includes('dream hive') || name.includes('mastercard')) {
      return 'Local Scholarships';
    }

    // JHS & BECE Preparation
    return 'JHS & BECE Preparation';
  };

  const filteredScholarships = scholarshipOpportunities.filter(scholarship => {
    // Apply category filter
    if (selectedCategory && getCategory(scholarship) !== selectedCategory) {
      return false;
    }

    // Apply search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      return scholarship.name.toLowerCase().includes(searchLower) ||
             scholarship.description.toLowerCase().includes(searchLower);
    }

    return true;
  });

  const handleScholarshipClick = (scholarshipId: string) => {
    const scholarship = scholarshipOpportunities.find(s => s.id === scholarshipId);
    if (scholarship) {
      handleExternalLinkClick(scholarship.url);
    }
  };

  // Updated categories for filtering
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'JHS & BECE Preparation', label: 'JHS & BECE Preparation' },
    { value: 'SHS SAT Preparation', label: 'SHS SAT Preparation' },
    { value: 'Local Scholarships', label: 'Local Scholarships' },
    { value: 'International Scholarships', label: 'International Scholarships' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Scholarship Opportunities | St. Louis Demonstration JHS"
        description="Comprehensive guide to scholarships, SAT preparation, and educational opportunities in Ghana and abroad for students at St. Louis Demonstration JHS."
        keywords="scholarships, SAT preparation, educational opportunities, Ghana scholarships, international scholarships, college preparation"
        url="/scholarship-opportunities"
        type="website"
      />

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                Scholarship Opportunities
              </h1>
              <p className="text-sm text-purple-200 truncate">
                Explore scholarships, SAT preparation, and educational opportunities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">

          {/* Search Bar - First Priority */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Target className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search scholarship opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-gray-600/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 backdrop-blur-sm hover:bg-white/10"
              />
            </div>
          </div>

          {/* Category Filters - Grouped Before Search Results */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Educational Pathway Guide - Like BECE Placement Checker */}
          <div className="mb-12 bg-gradient-to-r from-emerald-900/50 via-teal-900/50 to-emerald-900/50 rounded-2xl p-6 border border-emerald-500/30">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Educational Pathway Decision Guide</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Get comprehensive guidance on your educational journey from JHS excellence to university success.
                  Make informed decisions about SHS programs, SAT preparation, technical/vocational alternatives,
                  and scholarship opportunities.
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• JHS to SHS transition strategies</li>
                  <li>• Academic vs. technical/vocational pathways</li>
                  <li>• SAT preparation timeline and resources</li>
                  <li>• Local and international scholarship guidance</li>
                  <li>• University application strategies</li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => navigate('/educational-pathway-guide')}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Target className="w-5 h-5" />
                  Start Guide
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm">
              {(filteredScholarships?.length || 0) === (scholarshipOpportunities?.length || 0)
                ? `Showing all ${scholarshipOpportunities?.length || 0} scholarship opportunities`
                : `Showing ${filteredScholarships?.length || 0} of ${scholarshipOpportunities?.length || 0} scholarship opportunities`
              }
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {/* Scholarship Opportunities Grid - Exact AI Search Page Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {(filteredScholarships || []).map((scholarship, index) => (
              <motion.div
                key={scholarship.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <button
                  onClick={() => handleScholarshipClick(scholarship.id)}
                  className="w-full h-[200px] bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:bg-gray-700/60 active:scale-[0.98] text-left relative overflow-hidden group flex flex-col"
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${scholarship.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
                  />

                  {/* Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${scholarship.glowColor}20 0%, transparent 70%)`
                    }}
                  />

                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm mb-3 group-hover:bg-white/20 transition-colors duration-300">
                    {scholarship.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                      {scholarship.name}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-3 flex-1 leading-relaxed">
                      {scholarship.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-600/30">
                    <span className="text-xs text-gray-400 font-medium">
                      Visit Website
                    </span>
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                      <ExternalLink size={10} className="text-gray-400 group-hover:text-white" />
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* No results message */}
          {(!filteredScholarships || filteredScholarships.length === 0) && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No scholarships found</h3>
              <p className="text-gray-400 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ScholarshipOpportunitiesPage; 