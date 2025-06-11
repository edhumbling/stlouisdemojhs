import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, BookOpen, Globe, DollarSign, Users, Target, Award, Briefcase, ExternalLink } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import SmartSearchBar, { SearchableItem, FilterOption } from '../components/common/SmartSearchBar';

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
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);

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
    {
      id: 'ckodon-foundation',
      name: 'Ckodon Foundation - Test Preparation',
      url: 'https://www.ckodon.com/foundation',
      description: 'Comprehensive test preparation services and educational support for students pursuing academic excellence and international opportunities.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-emerald-600',
      glowColor: '#10b981'
    },
    {
      id: 'veritas-foundation-counseling',
      name: 'Veritas Foundation - College Counseling',
      url: 'https://theveritasfoundation.co',
      description: 'Professional college counseling services to help students make informed decisions about university choices, application strategies, and scholarship opportunities.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
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
    {
      id: 'dream-hive-scholarship',
      name: 'Dream Hive Scholarship',
      url: 'https://dhscholarship.org',
      description: 'Comprehensive scholarship database and application portal for Ghanaian students seeking local and international educational funding opportunities.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
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
    },

    // Startup Hubs & Incubators (Orange Category)
    {
      id: 'mest-africa',
      name: 'MEST Africa - Startup Incubator',
      url: 'https://meltwater.org',
      description: 'Pan-African training program, seed fund, and incubator for tech entrepreneurs. Offers comprehensive startup support and funding opportunities.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'ispace-foundation',
      name: 'iSpace Foundation',
      url: 'https://www.ispacefoundation.com',
      description: 'Innovation and technology hub offering conducive environment for startup growth with workspace, mentorship, and networking opportunities.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'kumasi-hive',
      name: 'Kumasi Hive',
      url: 'https://vc4a.com/kumasi-hive',
      description: 'Tech innovation hub in Kumasi supporting startups, entrepreneurs, and tech talent development in the Ashanti region.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'impact-hub-accra',
      name: 'Impact Hub Accra',
      url: 'https://accra.impacthub.net',
      description: 'Global network supporting social entrepreneurs and impact startups with workspace, community, and business development programs.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'ghana-innovation-hub',
      name: 'Ghana Innovation Hub',
      url: 'https://ghanainnovationhub.com',
      description: 'Supporting innovation and technology startups across various sectors with incubation, acceleration, and funding support.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'kosmos-innovation-centre',
      name: 'Kosmos Innovation Centre (KIC)',
      url: 'https://kicghana.org',
      description: 'Non-profit organization investing in young entrepreneurs and small businesses, especially in agriculture and energy sectors.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'venture-capital-trust-fund',
      name: 'Venture Capital Trust Fund (VCTF)',
      url: 'https://www.vctfund.com.gh',
      description: 'Government fund supporting SMEs and startups with venture capital funding and business development support.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'ghana-angel-investors',
      name: 'Ghana Angel Investors Network (GAIN)',
      url: 'https://abanangels.org/Networks/ghana-angel-investors-network',
      description: 'Network of angel investors providing early-stage funding and mentorship to promising Ghanaian startups and entrepreneurs.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'founder-institute-accra',
      name: 'Founder Institute Accra',
      url: 'https://fi.co/program/accra',
      description: 'Global pre-seed accelerator helping aspiring entrepreneurs launch meaningful and enduring technology companies.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'innohub-ghana',
      name: 'InnoHub Ghana',
      url: 'https://www.f6s.com/innohubghanalimited',
      description: 'Innovation hub fostering entrepreneurship and technology development with workspace, training, and startup support programs.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    }
  ];

  // Organize scholarships by category
  const scholarshipCategories = useMemo(() => {
    const categories = {
      'SAT Test Prep Opportunities': [] as ScholarshipItem[],
      'Local Scholarships': [] as ScholarshipItem[],
      'International Scholarships': [] as ScholarshipItem[],
      'Startup Hubs & Incubators': [] as ScholarshipItem[]
    };

    scholarshipOpportunities.forEach(scholarship => {
      const name = scholarship.name.toLowerCase();
      const description = scholarship.description.toLowerCase();

      // SAT Test Prep Opportunities
      if (name.includes('afex') || name.includes('yaf') || name.includes('educationusa') ||
          name.includes('veritas') || name.includes('college board') || name.includes('ckodon') ||
          name.includes('timeline') || description.includes('sat') || description.includes('test prep')) {
        categories['SAT Test Prep Opportunities'].push(scholarship);
      }
      // Startup Hubs & Incubators
      else if (name.includes('mest') || name.includes('ispace') || name.includes('kumasi hive') ||
          name.includes('impact hub') || name.includes('innovation hub') || name.includes('kosmos') ||
          name.includes('stanbic') || name.includes('angel investors') || name.includes('founder institute') ||
          name.includes('innohub') || description.includes('startup') || description.includes('incubator') ||
          description.includes('accelerator') || description.includes('entrepreneur')) {
        categories['Startup Hubs & Incubators'].push(scholarship);
      }
      // International Scholarships
      else if (name.includes('international') || name.includes('commonwealth') || name.includes('daad') ||
          name.includes('chevening') || name.includes('fulbright') || name.includes('erasmus') ||
          name.includes('australia') || name.includes('chinese') || name.includes('japanese') ||
          name.includes('korean') || name.includes('rotary') || name.includes('mext') ||
          name.includes('schwarzman') || name.includes('mandela') || name.includes('netherlands') ||
          name.includes('swedish') || name.includes('turkey') || name.includes('türkiye') ||
          name.includes('vanier') || name.includes('eiffel') || name.includes('swiss') ||
          name.includes('gates') || name.includes('rhodes') || name.includes('humphrey') ||
          name.includes('aga khan') || name.includes('world bank') || name.includes('japan')) {
        categories['International Scholarships'].push(scholarship);
      }
      // Local Scholarships (default for all others)
      else {
        categories['Local Scholarships'].push(scholarship);
      }
    });

    return categories;
  }, []);

  // Convert scholarships to searchable items
  const searchableItems: SearchableItem[] = useMemo(() => {
    return scholarshipOpportunities.map(scholarship => ({
      id: scholarship.id,
      title: scholarship.name,
      description: scholarship.description,
      url: scholarship.url,
      category: Object.keys(scholarshipCategories).find(categoryName =>
        scholarshipCategories[categoryName as keyof typeof scholarshipCategories].some(s => s.id === scholarship.id)
      ) || 'Other',
      type: 'website',
      icon: scholarship.icon,
      color: scholarship.color,
      glowColor: scholarship.glowColor
    }));
  }, [scholarshipCategories]);

  // Filter options for search
  const categoryOptions: FilterOption[] = useMemo(() => {
    return Object.keys(scholarshipCategories).map(categoryName => ({
      value: categoryName,
      label: categoryName,
      count: scholarshipCategories[categoryName as keyof typeof scholarshipCategories].length
    }));
  }, [scholarshipCategories]);

  const typeOptions: FilterOption[] = [
    { value: 'website', label: 'External Links', count: scholarshipOpportunities.length }
  ];

  // Handle search results
  const handleSearchResults = useCallback((results: SearchableItem[]) => {
    setSearchResults(results);
  }, []);

  // Get filtered categories based on search results
  const filteredCategories = useMemo(() => {
    if (searchResults.length === 0) {
      return scholarshipCategories;
    }

    // Group search results by category
    const filtered: Record<string, ScholarshipItem[]> = {};

    searchResults.forEach(item => {
      const categoryName = item.category;
      if (!filtered[categoryName]) {
        filtered[categoryName] = [];
      }

      // Find the original scholarship
      const originalScholarship = scholarshipOpportunities.find(s => s.id === item.id);
      if (originalScholarship) {
        filtered[categoryName].push(originalScholarship);
      }
    });

    return filtered;
  }, [searchResults, scholarshipCategories]);

  const handleScholarshipClick = (scholarshipId: string) => {
    const scholarship = scholarshipOpportunities.find(s => s.id === scholarshipId);
    if (scholarship) {
      handleExternalLinkClick(scholarship.url);
    }
  };

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



          {/* Smart Search Bar */}
          <div className="mb-8">
            <SmartSearchBar
              items={searchableItems}
              onSearchResults={handleSearchResults}
              placeholder={`Search ${scholarshipOpportunities.length}+ scholarship opportunities...`}
              accentColor="purple"
              categories={categoryOptions}
              types={typeOptions}
              enableIntentDetection={true}
              className="mb-6"
              pageKey="scholarship-opportunities"
            />

            {/* Educational Guide Button */}
            <div className="flex justify-center mt-4">
              <Link
                to="/educational-guide"
                className="px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 relative overflow-hidden group"
                style={{ filter: 'drop-shadow(0 0 8px #10b981)' }}
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                Complete Educational Guide
                <span className="text-xs bg-emerald-400/20 px-2 py-1 rounded-full ml-2">
                  SAT • SHS • TVET • Entrepreneurship
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </Link>
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
              {searchResults.length === 0
                ? `Showing all ${scholarshipOpportunities.length} scholarship opportunities`
                : `Showing ${searchResults.length} of ${scholarshipOpportunities.length} scholarship opportunities`
              }
            </p>
          </div>

          {/* Scholarship Categories with Grouped Display */}
          <div className="space-y-12">
            {Object.entries(filteredCategories).map(([categoryName, scholarships]) => (
              <div key={categoryName} className="space-y-6">
                {/* Category Title */}
                <div className="text-center">
                  <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${
                    categoryName === 'SAT Test Prep Opportunities' ? 'text-green-400' :
                    categoryName === 'Local Scholarships' ? 'text-blue-400' :
                    categoryName === 'Startup Hubs & Incubators' ? 'text-orange-400' :
                    'text-yellow-400'
                  }`}>
                    {categoryName}
                  </h2>
                  <div className={`w-24 h-1 mx-auto rounded-full ${
                    categoryName === 'SAT Test Prep Opportunities' ? 'bg-green-500' :
                    categoryName === 'Local Scholarships' ? 'bg-blue-500' :
                    categoryName === 'Startup Hubs & Incubators' ? 'bg-orange-500' :
                    'bg-yellow-500'
                  }`} />
                  <p className="text-gray-400 text-sm mt-2">
                    {scholarships.length} {scholarships.length === 1 ? 'opportunity' : 'opportunities'} available
                  </p>
                </div>

                {/* Scholarship Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {scholarships.map((scholarship, index) => (
                      <motion.div
                        key={scholarship.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group"
                      >
                        <button
                          onClick={() => handleScholarshipClick(scholarship.id)}
                          className={`w-full h-[200px] backdrop-blur-sm rounded-2xl p-4 border-2 transition-all duration-300 hover:shadow-xl active:scale-[0.98] text-left relative overflow-hidden group flex flex-col ${
                            categoryName === 'SAT Test Prep Opportunities'
                              ? 'bg-green-900/30 border-green-600/50 hover:border-green-500 hover:shadow-green-500/20 hover:bg-green-800/40'
                              : categoryName === 'Local Scholarships'
                              ? 'bg-blue-900/30 border-blue-600/50 hover:border-blue-500 hover:shadow-blue-500/20 hover:bg-blue-800/40'
                              : categoryName === 'Startup Hubs & Incubators'
                              ? 'bg-orange-900/30 border-orange-600/50 hover:border-orange-500 hover:shadow-orange-500/20 hover:bg-orange-800/40'
                              : 'bg-yellow-900/30 border-yellow-600/50 hover:border-yellow-500 hover:shadow-yellow-500/20 hover:bg-yellow-800/40'
                          }`}
                        >
                          {/* Background Gradient */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${scholarship.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`}
                          />

                          {/* Glow Effect */}
                          <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                            style={{
                              background: `radial-gradient(circle at center, ${scholarship.glowColor}30 0%, transparent 70%)`
                            }}
                          />

                          {/* Icon */}
                          <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300 ${
                            categoryName === 'SAT Test Prep Opportunities'
                              ? 'bg-green-600/20 group-hover:bg-green-500/30'
                              : categoryName === 'Local Scholarships'
                              ? 'bg-blue-600/20 group-hover:bg-blue-500/30'
                              : categoryName === 'Startup Hubs & Incubators'
                              ? 'bg-orange-600/20 group-hover:bg-orange-500/30'
                              : 'bg-yellow-600/20 group-hover:bg-yellow-500/30'
                          }`}>
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
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                              categoryName === 'SAT Test Prep Opportunities'
                                ? 'bg-green-600/20 group-hover:bg-green-500/30'
                                : categoryName === 'Local Scholarships'
                                ? 'bg-blue-600/20 group-hover:bg-blue-500/30'
                                : categoryName === 'Startup Hubs & Incubators'
                                ? 'bg-orange-600/20 group-hover:bg-orange-500/30'
                                : 'bg-yellow-600/20 group-hover:bg-yellow-500/30'
                            }`}>
                              <ExternalLink size={10} className="text-gray-400 group-hover:text-white" />
                            </div>
                          </div>

                          {/* Hover overlay */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* No results message */}
            {Object.keys(filteredCategories).length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No scholarships found</h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default ScholarshipOpportunitiesPage; 