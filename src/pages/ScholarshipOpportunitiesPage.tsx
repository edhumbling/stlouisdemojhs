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

  // Comprehensive scholarship data organized by three main categories
  const scholarshipOpportunities: ScholarshipItem[] = [
    // SAT Test Prep Opportunities (Green Category)
    {
      id: 'afex-hub-shs',
      name: 'AFEX Hub - SHS SAT Classes',
      url: 'https://afexhub.com',
      description: 'Start SAT preparation in SHS through professional organizations. Early preparation gives you 2-3 years to achieve high scores for international scholarships and top university admissions.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'yaf-ghana-shs',
      name: 'YAF Ghana - SAT Bootcamp',
      url: 'https://yafghana.org/sat-bootcamp',
      description: 'Access free SAT training while in SHS. Join their programs early to build strong foundations for university applications and scholarship opportunities.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'timeline-trust-sat',
      name: 'Timeline Trust - SAT Preparation',
      url: 'https://www.timelinetrust.com/sat.php',
      description: 'Leading SAT preparation center in Ghana offering comprehensive classes, study materials, practice tests, and counseling services for students.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'education-usa-guidance',
      name: 'EducationUSA Ghana',
      url: 'https://gh.usembassy.gov/education/educationusa-center',
      description: 'Get official guidance on U.S. university applications. Learn about the complete process from SHS through university admission and scholarship applications.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'college-board-official',
      name: 'College Board - Official SAT Resources',
      url: 'https://www.collegeboard.org',
      description: 'Access official SAT practice tests, study materials, and registration information. Essential for students planning to apply to international universities.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },

    // Local Scholarships (Blue Category)
    {
      id: 'getfund-scholarship',
      name: 'GETFUND Scholarship Scheme',
      url: 'https://scholarships.getfund.gov.gh',
      description: 'Government of Ghana scholarship for brilliant but needy students. Covers tuition, accommodation, and living expenses for local and international studies.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'ghana-scholarships-secretariat',
      name: 'Ghana Scholarships Secretariat',
      url: 'http://scholarships.gov.gh',
      description: 'Official government portal for local and international scholarships available to Ghanaian students. Central hub for all government-sponsored scholarship opportunities.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'knust-mcf-scholarship',
      name: 'KNUST Mastercard Foundation Scholars',
      url: 'https://mcf.knust.edu.gh',
      description: 'Mastercard Foundation Scholars Program at KNUST for academically talented students from disadvantaged backgrounds in science and technology.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'ug-scholarship',
      name: 'University of Ghana Scholarships',
      url: 'https://apply.ug.edu.gh/finaid',
      description: 'Various scholarship opportunities at Ghana\'s premier university including academic excellence awards and need-based financial assistance.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'ucc-scholarship',
      name: 'University of Cape Coast Scholarships',
      url: 'https://www.ucc.edu.gh',
      description: 'Merit-based and need-based scholarships for undergraduate and graduate students at one of Ghana\'s leading universities.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'uew-scholarship',
      name: 'University of Education Winneba Scholarships',
      url: 'https://www.uew.edu.gh',
      description: 'Educational scholarships for future teachers and education professionals in Ghana, supporting academic excellence in education.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'umat-scholarship',
      name: 'University of Mines and Technology Scholarships',
      url: 'https://www.umat.edu.gh',
      description: 'Specialized scholarships for students pursuing mining, engineering, and technology programs at Ghana\'s premier mining university.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'ghana-atomic-energy-scholarship',
      name: 'Ghana Atomic Energy Commission Scholarships',
      url: 'https://www.gaecgh.org',
      description: 'Scholarships for students pursuing nuclear science, engineering, and related fields to support Ghana\'s nuclear energy development.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'cocoa-board-scholarship',
      name: 'Ghana Cocoa Board Scholarships',
      url: 'https://www.cocobod.gh',
      description: 'Educational support for students from cocoa-growing communities and those pursuing agriculture-related studies.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },

    // International Scholarships (Yellow Category)
    {
      id: 'commonwealth-scholarship',
      name: 'Commonwealth Scholarships',
      url: 'https://cscuk.fcdo.gov.uk',
      description: 'UK government scholarships for students from Commonwealth countries to pursue Master\'s and PhD studies in the United Kingdom.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'chevening-scholarship',
      name: 'Chevening Scholarships',
      url: 'https://www.chevening.org',
      description: 'UK government\'s global scholarship programme for emerging leaders to pursue one-year Master\'s degrees in the UK.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'fulbright-scholarship',
      name: 'Fulbright Foreign Student Program',
      url: 'https://foreign.fulbrightonline.org',
      description: 'US government scholarship program for international students to pursue Master\'s and PhD degrees in the United States.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'daad-scholarship',
      name: 'DAAD Scholarships Germany',
      url: 'https://www.daad.de',
      description: 'German Academic Exchange Service scholarships for international students to study in Germany at all academic levels.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'erasmus-mundus',
      name: 'Erasmus Mundus Joint Master Degrees',
      url: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en',
      description: 'Study across multiple EU countries with full scholarships covering tuition, living costs, travel, and insurance for master\'s programs.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'chinese-government-scholarship',
      name: 'Chinese Government Scholarship (CSC)',
      url: 'https://www.csc.edu.cn',
      description: 'Comprehensive scholarships for all levels of study in China including tuition, accommodation, stipend, and medical insurance.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'mext-scholarship',
      name: 'MEXT Scholarship Japan',
      url: 'https://www.studyinjapan.go.jp',
      description: 'Japanese government scholarships for undergraduate and graduate studies including tuition, flights, stipend, and language training.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'schwarzman-scholars',
      name: 'Schwarzman Scholars Program',
      url: 'https://www.schwarzmanscholars.org',
      description: 'One-year master\'s in Global Affairs at Tsinghua University, China. Fully funded including tuition, room, board, and travel.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'mandela-rhodes-scholarship',
      name: 'Mandela Rhodes Foundation Scholarship',
      url: 'https://www.mandelarhodes.org',
      description: 'Postgraduate studies and leadership training for African students at South African universities with full funding.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'australia-awards',
      name: 'Australia Awards Scholarships',
      url: 'https://www.australiaawards.gov.au',
      description: 'Australian government scholarships for developing country students to undertake full-time undergraduate or postgraduate study.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'korean-government-scholarship',
      name: 'Korean Government Scholarship (KGSP)',
      url: 'https://www.studyinkorea.go.kr',
      description: 'Full scholarships for international students to study in South Korea including Korean language training and cultural programs.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'netherlands-fellowship',
      name: 'Netherlands Fellowship Programme',
      url: 'https://www.nuffic.nl/en/subjects/netherlands-fellowship-programmes',
      description: 'Dutch government scholarships for professionals from developing countries for master\'s degree programmes and short courses.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'swedish-institute-scholarship',
      name: 'Swedish Institute Scholarships',
      url: 'https://si.se/en/apply/scholarships',
      description: 'Scholarships for global professionals to pursue master\'s studies in Sweden with full tuition coverage and living allowance.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'turkey-burslari',
      name: 'Türkiye Scholarships',
      url: 'https://www.turkiyeburslari.gov.tr',
      description: 'Turkish government scholarships covering tuition, accommodation, health insurance, and monthly stipend for international students.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'vanier-canada-scholarship',
      name: 'Vanier Canada Graduate Scholarships',
      url: 'https://vanier.gc.ca',
      description: 'Prestigious Canadian scholarships for doctoral students demonstrating leadership skills and high standard of scholarly achievement.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'eiffel-excellence-scholarship',
      name: 'Eiffel Excellence Scholarship Programme',
      url: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence',
      description: 'French government scholarships for international students pursuing master\'s and PhD programs in France.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'swiss-government-scholarship',
      name: 'Swiss Government Excellence Scholarships',
      url: 'https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html',
      description: 'Research scholarships for foreign scholars and artists at Swiss higher education institutions.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'gates-cambridge-scholarship',
      name: 'Gates Cambridge Scholarships',
      url: 'https://www.gatescambridge.org',
      description: 'Full-cost scholarships for outstanding applicants from outside the UK to pursue graduate study at Cambridge University.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'rhodes-scholarship',
      name: 'Rhodes Scholarships',
      url: 'https://www.rhodeshouse.ox.ac.uk',
      description: 'Prestigious international postgraduate awards for selected foreign students to study at the University of Oxford.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'rotary-peace-fellowship',
      name: 'Rotary Peace Fellowships',
      url: 'https://www.rotary.org/en/our-programs/peace-fellowships',
      description: 'Fully funded fellowships for master\'s degree or professional development certificate in peace and conflict resolution.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'joint-japan-world-bank',
      name: 'Joint Japan/World Bank Graduate Scholarship',
      url: 'https://www.worldbank.org/en/programs/scholarships',
      description: 'Scholarships for developing country nationals to pursue development-related studies at participating universities.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'aga-khan-foundation',
      name: 'Aga Khan Foundation International Scholarship',
      url: 'https://the.akdn.org/en/what-we-do/developing-human-capacity/education/international-scholarships',
      description: 'Scholarships for outstanding students from developing countries who have no other means of financing their studies.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'hubert-humphrey-fellowship',
      name: 'Hubert H. Humphrey Fellowship Program',
      url: 'https://www.humphreyfellowship.org',
      description: 'U.S. government program providing a year of professional enrichment in the United States for experienced professionals.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    }
  ];

  // Simplified category logic with three main categories
  const getCategory = (scholarship: ScholarshipItem): string => {
    const name = scholarship.name.toLowerCase();
    const description = scholarship.description.toLowerCase();

    // SAT Test Prep Opportunities
    if (name.includes('afex') || name.includes('yaf') || name.includes('educationusa') ||
        name.includes('veritas') || name.includes('college board') ||
        description.includes('sat') || description.includes('test prep')) {
      return 'SAT Test Prep Opportunities';
    }

    // International Scholarships
    if (name.includes('international') || name.includes('commonwealth') || name.includes('daad') ||
        name.includes('chevening') || name.includes('fulbright') || name.includes('erasmus') ||
        name.includes('australia') || name.includes('chinese') || name.includes('japanese') ||
        name.includes('korean') || name.includes('rotary') || name.includes('mext')) {
      return 'International Scholarships';
    }

    // Local Scholarships (default for all others)
    return 'Local Scholarships';
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

  // Three main categories with unique solid colors
  const categories = [
    { value: '', label: 'All Categories', color: 'bg-gray-700' },
    { value: 'SAT Test Prep Opportunities', label: 'SAT Test Prep', color: 'bg-green-600' },
    { value: 'Local Scholarships', label: 'Local Scholarships', color: 'bg-blue-600' },
    { value: 'International Scholarships', label: 'International Scholarships', color: 'bg-yellow-600' }
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

          {/* Category Filters - Horizontally Aligned on Mobile */}
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="flex flex-row gap-2 sm:gap-3 overflow-x-auto pb-2 w-full max-w-4xl">
                {categories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 text-sm sm:text-base ${
                      selectedCategory === category.value
                        ? `${category.color} text-white shadow-lg hover:opacity-90`
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
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
                  Make informed decisions about SHS programs (Science, Business, General Arts, Visual Arts, Home Economics),
                  SAT preparation, and scholarship opportunities.
                </p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• JHS to SHS transition strategies</li>
                  <li>• SHS program selection: Science, Business, General Arts, Visual Arts, Home Economics</li>
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