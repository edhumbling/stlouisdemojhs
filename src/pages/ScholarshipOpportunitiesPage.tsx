import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, BookOpen, Globe, DollarSign, Users, Target, Award, Briefcase, ExternalLink } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import SmartSearchBar, { SearchableItem, FilterOption } from '../components/common/SmartSearchBar';
import ShimmerLoader from '../components/common/ShimmerLoader';

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
      id: 'jeq-foundation',
      name: 'JEQ Foundation (Jay Watson Foundation)',
      url: 'https://jeqfoundation.org',
      description: 'Educational scholarships for brilliant but needy Ghanaian students pursuing higher education. Focuses on academic excellence and community impact.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'ghana-scholarship-secretariat',
      name: 'Ghana Scholarship Secretariat',
      url: 'https://www.scholarships.gov.gh',
      description: 'Central portal for all government scholarships in Ghana including undergraduate, postgraduate, and professional development opportunities.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'mtn-foundation-scholarship',
      name: 'MTN Foundation Ghana Scholarship',
      url: 'https://www.mtn.com.gh/about-us/mtn-foundation',
      description: 'Annual scholarships for brilliant but financially challenged Ghanaian students in science, technology, engineering, and mathematics (STEM) fields.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },
    {
      id: 'vodafone-ghana-foundation',
      name: 'Vodafone Ghana Foundation Scholarship',
      url: 'https://vodafone.com.gh/foundation',
      description: 'Educational support for underprivileged but academically excellent students, particularly focusing on ICT and business-related programs.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      glowColor: '#3b82f6'
    },

    {
      id: 'myscholarshub',
      name: 'MyScholarsHub Ghana',
      url: 'https://myscholarshub.org',
      description: 'Comprehensive platform connecting Ghanaian students with local and international scholarship opportunities, educational resources, and career guidance.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
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
      id: 'larry-ellison-scholars-oxford',
      name: 'Larry Ellison Scholars Oxford',
      url: 'https://www.ox.ac.uk/admissions/graduate/fees-and-funding/fees-funding-and-scholarship-search/scholarships-a-z-listing',
      description: 'Prestigious scholarship program at Oxford University funded by Larry Ellison, supporting exceptional graduate students in various fields.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'rhodes-scholarship',
      name: 'Rhodes Scholarship Oxford',
      url: 'https://www.rhodeshouse.ox.ac.uk',
      description: 'The world\'s oldest international scholarship programme, enabling outstanding young people from around the world to study at Oxford.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'gates-cambridge-scholarship',
      name: 'Gates Cambridge Scholarship',
      url: 'https://www.gatescambridge.org',
      description: 'Full-cost scholarships for outstanding applicants from outside the UK to pursue a full-time postgraduate degree at Cambridge.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'marshall-scholarship',
      name: 'Marshall Scholarship',
      url: 'https://www.marshallscholarship.org',
      description: 'US-UK educational exchange programme for young Americans to study for a degree in the United Kingdom.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'clarendon-scholarship-oxford',
      name: 'Clarendon Scholarship Oxford',
      url: 'https://www.ox.ac.uk/admissions/graduate/fees-and-funding/fees-funding-and-scholarship-search/clarendon-fund',
      description: 'Oxford University\'s premier graduate scholarship scheme, offering around 140 new scholarships every year.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'knight-hennessy-stanford',
      name: 'Knight-Hennessy Scholars Stanford',
      url: 'https://knight-hennessy.stanford.edu',
      description: 'Stanford University\'s flagship fellowship program designed to prepare global leaders with the skills to address complex challenges.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'mastercard-foundation-scholars',
      name: 'Mastercard Foundation Scholars Program',
      url: 'https://mastercardfdn.org/all/scholars',
      description: 'Comprehensive scholarship and leadership development program for academically talented yet economically disadvantaged young people.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'erasmus-mundus-scholarship',
      name: 'Erasmus Mundus Joint Master Degrees',
      url: 'https://ec.europa.eu/programmes/erasmus-plus/opportunities/individuals/students/erasmus-mundus-joint-master-degrees_en',
      description: 'EU-funded international study programmes offering full scholarships for joint master\'s degrees at multiple European universities.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'swiss-government-excellence',
      name: 'Swiss Government Excellence Scholarships',
      url: 'https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html',
      description: 'Swiss government scholarships for foreign scholars and artists for doctoral and postdoctoral research in Switzerland.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'vanier-canada-graduate',
      name: 'Vanier Canada Graduate Scholarships',
      url: 'https://vanier.gc.ca',
      description: 'Canada\'s premier doctoral scholarship program, attracting and retaining world-class doctoral students.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'swedish-institute-scholarships',
      name: 'Swedish Institute Scholarships',
      url: 'https://si.se/en/apply/scholarships',
      description: 'Scholarships for global professionals to pursue master\'s studies in Sweden with focus on leadership and sustainability.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'netherlands-fellowship',
      name: 'Netherlands Fellowship Programmes (NFP)',
      url: 'https://www.nuffic.nl/en/subjects/netherlands-fellowship-programmes',
      description: 'Dutch government scholarships for professionals from developing countries to pursue master\'s or PhD studies in the Netherlands.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'eiffel-excellence-scholarship',
      name: 'Eiffel Excellence Scholarship France',
      url: 'https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence',
      description: 'French government scholarship program to attract top foreign students to French higher education institutions.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'orange-tulip-scholarship',
      name: 'Orange Tulip Scholarship Netherlands',
      url: 'https://www.orangetulipscholarship.nl',
      description: 'Scholarships for international students to study in the Netherlands, offered by Dutch higher education institutions.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'turkey-scholarships',
      name: 'Türkiye Scholarships',
      url: 'https://www.turkiyeburslari.gov.tr',
      description: 'Turkish government scholarship program offering undergraduate, graduate, and doctoral study opportunities in Turkey.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'hubert-humphrey-fellowship',
      name: 'Hubert H. Humphrey Fellowship Program',
      url: 'https://www.humphreyfellowship.org',
      description: 'US government program providing a year of professional enrichment in the United States for experienced professionals.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'joint-japan-world-bank',
      name: 'Joint Japan/World Bank Graduate Scholarship',
      url: 'https://www.worldbank.org/en/programs/scholarships',
      description: 'Scholarships for students from developing countries to pursue development-related studies at selected universities.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'aga-khan-foundation',
      name: 'Aga Khan Foundation International Scholarship',
      url: 'https://www.akdn.org/our-agencies/aga-khan-foundation',
      description: 'Scholarships for outstanding students from select developing countries who have no other means of financing their studies.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'inlaks-shivdasani-foundation',
      name: 'Inlaks Shivdasani Foundation Scholarships',
      url: 'https://www.inlaksfoundation.org',
      description: 'Scholarships for Indian students to pursue higher education at leading universities in the US, UK, and Europe.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'rotary-peace-fellowship',
      name: 'Rotary Peace Fellowship',
      url: 'https://www.rotary.org/en/our-programs/peace-fellowships',
      description: 'Fellowships for leaders committed to solving conflicts and promoting peace through master\'s degree or certificate programs.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'ford-foundation-fellowship',
      name: 'Ford Foundation Fellowship Programs',
      url: 'https://sites.nationalacademies.org/pga/fordfellowships',
      description: 'Fellowships for individuals who show promise of future achievement and whose studies will contribute to positive social change.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'british-council-scholarships',
      name: 'British Council Scholarships',
      url: 'https://www.britishcouncil.org/study-work-abroad/scholarships',
      description: 'Various scholarship opportunities offered by the British Council for international students to study in the UK.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'lester-b-pearson-scholarship',
      name: 'Lester B. Pearson International Scholarship',
      url: 'https://future.utoronto.ca/pearson',
      description: 'University of Toronto\'s most prestigious scholarship for international students demonstrating exceptional academic achievement and creativity.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'vienna-biocenter-fellowship',
      name: 'Vienna BioCenter PhD Fellowship',
      url: 'https://www.viennabiocenter.org/phd',
      description: 'International PhD program in life sciences offering full funding for doctoral studies in Vienna, Austria.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'emile-boutmy-scholarship',
      name: 'Émile Boutmy Scholarship Sciences Po',
      url: 'https://www.sciencespo.fr/students/en/finances/financial-aid/aid-international-students',
      description: 'Need-based scholarships for international students at Sciences Po Paris, covering tuition and living expenses.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'denmark-government-scholarship',
      name: 'Danish Government Scholarships',
      url: 'https://ufm.dk/en/education/higher-education/danish-government-scholarships',
      description: 'Scholarships for highly qualified students from non-EU/EEA countries to pursue higher education in Denmark.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'belgium-development-cooperation',
      name: 'Belgian Development Cooperation Scholarships',
      url: 'https://www.vliruos.be/en/scholarships',
      description: 'Scholarships for students from developing countries to pursue master\'s and training programs in Belgium.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'finland-cimo-scholarship',
      name: 'Finland CIMO Scholarships',
      url: 'https://www.oph.fi/en/development-and-international-cooperation/cimo-scholarships',
      description: 'Finnish government scholarships for international students and researchers to study or conduct research in Finland.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'norway-quota-scheme',
      name: 'Norwegian Quota Scheme',
      url: 'https://www.nokut.no/en/foreign-education/recognition/recognition-of-education-from-abroad/quota-scheme',
      description: 'Norwegian government scholarship program for students from developing countries to pursue master\'s and PhD studies.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'czech-government-scholarship',
      name: 'Czech Government Scholarships',
      url: 'https://www.msmt.cz/areas-of-work/tertiary-education/czech-government-scholarships',
      description: 'Scholarships offered by the Czech Republic for international students to study at Czech universities.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'hungarian-stipendium-hungaricum',
      name: 'Stipendium Hungaricum Scholarship',
      url: 'https://stipendiumhungaricum.hu',
      description: 'Hungarian government scholarship program offering full scholarships for international students in Hungary.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'polish-national-agency',
      name: 'Polish National Agency Scholarships',
      url: 'https://nawa.gov.pl/en/students/foreign-students',
      description: 'Various scholarship programs offered by Poland for international students at all academic levels.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'slovenia-government-scholarship',
      name: 'Slovenian Government Scholarships',
      url: 'https://www.gov.si/en/topics/scholarships-for-foreigners',
      description: 'Scholarships for international students to study in Slovenia, promoting academic and cultural exchange.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'portugal-camoes-scholarship',
      name: 'Camões Institute Scholarships Portugal',
      url: 'https://www.instituto-camoes.pt/en/scholarships',
      description: 'Portuguese government scholarships for international students to study Portuguese language and culture.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'spanish-government-scholarship',
      name: 'Spanish Government Scholarships',
      url: 'https://www.educacionyfp.gob.es/en/estudiantes/universidad/becas-ayudas.html',
      description: 'Various scholarship programs offered by Spain for international students at Spanish universities.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'italian-government-scholarship',
      name: 'Italian Government Scholarships',
      url: 'https://studyinitaly.esteri.it/en/scholarships',
      description: 'Scholarships offered by the Italian government for international students to study in Italy.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'greek-government-scholarship',
      name: 'Greek Government Scholarships (IKY)',
      url: 'https://www.iky.gr/en',
      description: 'State Scholarships Foundation of Greece offering scholarships for international students and researchers.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'russian-government-scholarship',
      name: 'Russian Government Scholarships',
      url: 'https://russia.study/en/scholarships/russian-government-scholarships',
      description: 'Scholarships provided by the Russian Federation for international students to study at Russian universities.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'new-zealand-development-scholarship',
      name: 'New Zealand Development Scholarships',
      url: 'https://www.mfat.govt.nz/en/aid-and-development/scholarships',
      description: 'New Zealand government scholarships for students from developing countries to study in New Zealand.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'australia-awards-scholarship',
      name: 'Australia Awards Scholarships',
      url: 'https://www.australiaawards.gov.au',
      description: 'Australian government scholarships for students from developing countries to undertake study in Australia.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'singapore-government-scholarship',
      name: 'Singapore Government Scholarships',
      url: 'https://www.moe.gov.sg/financial-matters/awards-scholarships',
      description: 'Various scholarship programs offered by Singapore for international students to study in Singapore.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'brunei-government-scholarship',
      name: 'Brunei Government Scholarships',
      url: 'https://www.moe.gov.bn/SitePages/Scholarships.aspx',
      description: 'Scholarships offered by Brunei Darussalam for international students to pursue higher education.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },
    {
      id: 'ecobank-foundation-scholarship',
      name: 'Ecobank Foundation Scholarship',
      url: 'https://www.ecobank.com/group/ecobank-foundation',
      description: 'Pan-African scholarship program supporting exceptional students from across Africa, including Ghana, in various academic disciplines.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-yellow-600 to-amber-600',
      glowColor: '#f59e0b'
    },

    // Fellowship Programs (Purple Category)
    {
      id: 'thiel-fellowship',
      name: 'Thiel Fellowship',
      url: 'https://thielfellowship.org',
      description: 'Two-year program giving $200,000 to young people (under 23) who want to build new things instead of attending college. Skip traditional education to pursue entrepreneurial ventures with mentorship from successful founders.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'steve-jobs-archive-fellowship',
      name: 'Steve Jobs Archive Fellowship',
      url: 'https://stevejobsarchive.com/fellowship',
      description: 'One-year fellowship for young creators (ages 21-26) working at the intersection of technology and liberal arts. Provides stipend, mentorship, and community for creative and professional development.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'emergent-ventures',
      name: 'Emergent Ventures Fellowship',
      url: 'https://www.mercatus.org/emergent-ventures',
      description: 'Grants of $1,000 to $50,000 for ambitious builders working on innovative projects. Supports entrepreneurs, researchers, and creators pursuing breakthrough ideas across various fields.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'zfellows',
      name: 'ZFellows',
      url: 'https://www.zfellows.com',
      description: '$10,000 fellowship for young founders (ages 18-25) to pursue entrepreneurial ventures. Provides funding, mentorship, and community support for early-stage startup development.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: '1517-fund-medici',
      name: '1517 Fund Medici Project',
      url: 'https://www.1517fund.com/medici-project',
      description: '$1,000 grants for young people working on ambitious projects. Supports students and young entrepreneurs pursuing innovative ideas outside traditional educational paths.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'neo-scholars',
      name: 'Neo Scholars',
      url: 'https://neo.com/scholars',
      description: 'Fellowship program for exceptional young people (ages 13-19) to accelerate their learning and career development. Provides mentorship, funding, and access to Silicon Valley network.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'atlas-fellowship',
      name: 'Atlas Fellowship',
      url: 'https://www.atlasfellowship.org',
      description: 'Summer fellowship for exceptional high school students interested in technology, entrepreneurship, and making a positive impact on the world. Includes mentorship and project funding.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'contrary-fellowship',
      name: 'Contrary Fellowship',
      url: 'https://contrarycap.com/fellowship',
      description: 'Fellowship program for ambitious students and young professionals interested in venture capital, startups, and technology. Provides training, mentorship, and career opportunities.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'kleiner-perkins-fellowship',
      name: 'Kleiner Perkins Fellowship',
      url: 'https://www.kleinerperkins.com/kp-fellows',
      description: 'Engineering and design fellowship program connecting top university students with leading technology companies for internships and career development.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'reforge-fellowship',
      name: 'Reforge Fellowship',
      url: 'https://www.reforge.com/fellowship',
      description: 'Fellowship for experienced professionals in product, growth, and marketing roles. Provides advanced training and networking opportunities in technology companies.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'pioneer-fellowship',
      name: 'Pioneer Fellowship',
      url: 'https://pioneer.app',
      description: 'Global tournament for ambitious people working on meaningful projects. Provides funding, mentorship, and community for entrepreneurs and creators worldwide.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'on-deck-fellowship',
      name: 'On Deck Fellowship',
      url: 'https://www.beondeck.com',
      description: 'Fellowship programs for founders, angels, writers, and other professionals. Provides community, education, and networking opportunities for career advancement.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'south-park-commons',
      name: 'South Park Commons Fellowship',
      url: 'https://www.southparkcommons.com',
      description: 'Residential fellowship for technologists exploring what to work on next. Provides funding, community, and resources for career transitions and new ventures.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'interact-fellowship',
      name: 'Interact Fellowship',
      url: 'https://www.interactfellowship.org',
      description: 'Fellowship for high school students passionate about social impact and entrepreneurship. Provides mentorship, funding, and community for young changemakers.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'davidson-fellowship',
      name: 'Davidson Fellowship',
      url: 'https://www.davidsongifted.org/fellowship',
      description: '$50,000, $25,000, and $10,000 scholarships for students 18 and under who have completed significant work in science, technology, engineering, mathematics, literature, music, or philosophy.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'coca-cola-scholars',
      name: 'Coca-Cola Scholars Program',
      url: 'https://www.coca-colascholarsfoundation.org',
      description: 'Merit-based scholarship program for high school seniors demonstrating leadership, academic excellence, and commitment to community service. Awards $20,000 scholarships.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'regeneron-science-talent',
      name: 'Regeneron Science Talent Search',
      url: 'https://www.societyforscience.org/regeneron-sts',
      description: 'Premier science and math competition for high school seniors. Top 40 finalists receive at least $25,000, with the top winner receiving $250,000.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'gates-millennium-scholars',
      name: 'Gates Millennium Scholars Program',
      url: 'https://gmsp.org',
      description: 'Scholarship program for outstanding minority students with significant financial need. Provides full funding for undergraduate and graduate education.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },
    {
      id: 'jack-kent-cooke',
      name: 'Jack Kent Cooke Foundation Scholarships',
      url: 'https://www.jkcf.org',
      description: 'Scholarships for high-achieving students with financial need. Provides comprehensive support including funding, advising, and networking opportunities.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-violet-600',
      glowColor: '#8b5cf6'
    },

    // Foreign Incubators & Accelerators (Teal Category)
    {
      id: 'y-combinator',
      name: 'Y Combinator',
      url: 'https://www.ycombinator.com',
      description: 'World\'s most successful startup accelerator. Provides $500,000 funding, 3-month program, and access to extensive alumni network. Has funded Airbnb, Stripe, Dropbox, and many unicorns.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'techstars',
      name: 'Techstars',
      url: 'https://www.techstars.com',
      description: 'Global startup accelerator with programs worldwide. Provides $120,000 funding, mentorship from successful entrepreneurs, and access to extensive investor network.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'neo-accelerator',
      name: 'Neo Accelerator',
      url: 'https://neo.com',
      description: 'Accelerator focused on young entrepreneurs (ages 13-25). Provides funding, mentorship, and access to Silicon Valley network for exceptional young founders.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'antler',
      name: 'Antler',
      url: 'https://www.antler.co',
      description: 'Global early-stage VC and startup generator. Helps individuals build startups from scratch, providing co-founder matching, funding, and ongoing support.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'entrepreneur-first',
      name: 'Entrepreneur First',
      url: 'https://www.joinef.com',
      description: 'Pre-team, pre-idea accelerator that helps ambitious individuals find co-founders and build startups. Provides funding and support from day zero.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'seedcamp',
      name: 'Seedcamp',
      url: 'https://seedcamp.com',
      description: 'European seed fund and accelerator supporting early-stage startups. Provides funding, mentorship, and access to European startup ecosystem.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'rocket-internet',
      name: 'Rocket Internet',
      url: 'https://www.rocket-internet.com',
      description: 'Global startup incubator and venture builder. Creates and invests in internet companies, providing operational support and scaling expertise.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'station-f',
      name: 'Station F',
      url: 'https://stationf.co',
      description: 'World\'s largest startup campus located in Paris. Hosts multiple accelerator programs and provides workspace, mentorship, and networking opportunities.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'plug-and-play',
      name: 'Plug and Play',
      url: 'https://www.plugandplaytechcenter.com',
      description: 'Global innovation platform connecting startups with corporations. Provides accelerator programs, corporate partnerships, and venture capital.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'founders-factory',
      name: 'Founders Factory',
      url: 'https://foundersfactory.com',
      description: 'London-based accelerator and incubator working with corporate partners. Provides funding, mentorship, and access to enterprise customers.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'mass-challenge',
      name: 'MassChallenge',
      url: 'https://masschallenge.org',
      description: 'Global network of accelerators supporting high-impact startups. Equity-free programs with access to mentors, corporate partners, and funding opportunities.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'startupbootcamp',
      name: 'Startupbootcamp',
      url: 'https://www.startupbootcamp.org',
      description: 'Global family of industry-focused accelerators. Provides sector-specific mentorship, funding, and access to corporate partners across various industries.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'techstars-london',
      name: 'Techstars London',
      url: 'https://www.techstars.com/accelerators/london',
      description: 'London branch of Techstars accelerator focusing on European startups. Provides funding, mentorship, and access to global Techstars network.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'ycombinator-china',
      name: 'Miracle Plus (YC China)',
      url: 'https://www.miracleplus.com',
      description: 'Chinese accelerator inspired by Y Combinator model. Supports early-stage startups in China with funding, mentorship, and market access.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'chinaccelerator',
      name: 'Chinaccelerator',
      url: 'https://chinaccelerator.com',
      description: 'Cross-border accelerator helping startups expand between China and global markets. Provides funding, mentorship, and market entry support.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },
    {
      id: 'alchemist-accelerator',
      name: 'Alchemist Accelerator',
      url: 'https://alchemistaccelerator.com',
      description: 'Enterprise-focused accelerator for B2B startups. Provides funding, mentorship from enterprise executives, and access to corporate customers.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-teal-600 to-cyan-600',
      glowColor: '#14b8a6'
    },

    // Grants & Microgrants (Rose Category)
    {
      id: 'merge-grant',
      name: 'Merge Grant',
      url: 'https://merge.club/program/mergegrant',
      description: 'Microgrants for ambitious young builders working on innovative projects. Part of Merge Club community connecting microgrant recipients worldwide.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'emergent-ventures-grant',
      name: 'Emergent Ventures Grant',
      url: 'https://www.mercatus.org/emergent-ventures',
      description: '$1,000 to $50,000 grants for ambitious builders working on breakthrough ideas. Supports entrepreneurs, researchers, and creators across various fields.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: '1517-medici-grant',
      name: '1517 Fund Medici Grant',
      url: 'https://www.1517fund.com/medici-project',
      description: '$1,000 grants for young people working on ambitious projects outside traditional educational paths. Supports student entrepreneurs and innovators.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'zfellows-grant',
      name: 'ZFellows Grant',
      url: 'https://www.zfellows.com',
      description: '$10,000 fellowship grants for young founders (ages 18-25) pursuing entrepreneurial ventures. Includes mentorship and community support.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'pioneer-grant',
      name: 'Pioneer Grant',
      url: 'https://pioneer.app',
      description: 'Global tournament for ambitious people working on meaningful projects. Provides funding, mentorship, and community for entrepreneurs and creators worldwide.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'unshackled-ventures-grant',
      name: 'Unshackled Ventures Grant',
      url: 'https://www.unshackledvc.com',
      description: 'Grants and funding for immigrant entrepreneurs building startups in the US. Provides visa support, funding, and mentorship for international founders.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'fast-grants',
      name: 'Fast Grants',
      url: 'https://fastgrants.org',
      description: 'Rapid funding for COVID-19 related research and projects. Provides quick decision-making and funding for urgent scientific and medical research.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'mozilla-grants',
      name: 'Mozilla Grants',
      url: 'https://foundation.mozilla.org/en/what-we-fund',
      description: 'Grants for projects advancing internet health, digital rights, and open source technology. Supports researchers, activists, and technologists.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'protocol-labs-grants',
      name: 'Protocol Labs Grants',
      url: 'https://grants.protocol.ai',
      description: 'Grants for projects building on decentralized web technologies. Supports research and development in blockchain, IPFS, and related technologies.',
      icon: <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'ethereum-foundation-grants',
      name: 'Ethereum Foundation Grants',
      url: 'https://ethereum.org/en/community/grants',
      description: 'Grants for projects building on Ethereum ecosystem. Supports developers, researchers, and community initiatives advancing blockchain technology.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'gitcoin-grants',
      name: 'Gitcoin Grants',
      url: 'https://gitcoin.co/grants',
      description: 'Quadratic funding for open source projects and public goods. Community-driven funding platform for developers and digital public infrastructure.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'open-philanthropy-grants',
      name: 'Open Philanthropy Grants',
      url: 'https://www.openphilanthropy.org',
      description: 'Large grants for high-impact projects in global health, AI safety, criminal justice reform, and other cause areas. Supports research and direct work.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'effective-altruism-grants',
      name: 'EA Infrastructure Fund',
      url: 'https://funds.effectivealtruism.org',
      description: 'Grants for projects building effective altruism community infrastructure. Supports organizations, research, and initiatives advancing high-impact causes.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'long-term-future-fund',
      name: 'Long-Term Future Fund',
      url: 'https://funds.effectivealtruism.org/funds/far-future',
      description: 'Grants for projects reducing existential risks and improving long-term outcomes for humanity. Supports AI safety, biosecurity, and related research.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
    },
    {
      id: 'survival-and-flourishing-fund',
      name: 'Survival and Flourishing Fund',
      url: 'https://survivalandflourishing.fund',
      description: 'Grants for research and projects aimed at improving humanity\'s long-term prospects. Focuses on existential risk reduction and technological safety.',
      icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-rose-600 to-pink-600',
      glowColor: '#f43f5e'
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
    },

    // Foreign Startup Programs & Accelerators
    {
      id: 'microsoft-for-startups',
      name: 'Microsoft for Startups',
      url: 'https://www.microsoft.com/en-us/startups',
      description: 'Global startup program offering up to $150,000 in Azure credits, technical support, mentorship, and access to Microsoft\'s partner network.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'google-for-startups',
      name: 'Google for Startups',
      url: 'https://startup.google.com',
      description: 'Google\'s global startup program providing cloud credits, mentorship, technical support, and access to Google\'s network of investors and partners.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'aws-activate',
      name: 'AWS Activate',
      url: 'https://aws.amazon.com/activate',
      description: 'Amazon Web Services startup program offering up to $100,000 in AWS credits, technical support, training, and business development resources.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'nvidia-inception',
      name: 'NVIDIA Inception',
      url: 'https://www.nvidia.com/en-us/startups',
      description: 'Global startup program for AI and data science companies, offering technical support, training, hardware discounts, and go-to-market support.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'facebook-startup-program',
      name: 'Meta for Startups',
      url: 'https://developers.facebook.com/startups',
      description: 'Meta\'s startup program providing advertising credits, technical support, mentorship, and access to Meta\'s developer tools and APIs.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'stripe-startup-program',
      name: 'Stripe Startup Program',
      url: 'https://stripe.com/startups',
      description: 'Payment processing platform offering waived fees, priority support, and access to Stripe\'s partner network for qualifying startups.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'hubspot-for-startups',
      name: 'HubSpot for Startups',
      url: 'https://www.hubspot.com/startups',
      description: 'CRM and marketing platform offering up to 90% discount on HubSpot software, training, and support for early-stage startups.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'salesforce-startup-program',
      name: 'Salesforce Startup Program',
      url: 'https://trailhead.salesforce.com/en/trailblazer-community/startups',
      description: 'CRM platform offering free licenses, training, mentorship, and access to Salesforce\'s ecosystem for qualifying startups.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'github-startup-program',
      name: 'GitHub for Startups',
      url: 'https://github.com/enterprise/startups',
      description: 'Code hosting platform offering free GitHub Enterprise, technical support, and access to developer tools for qualifying startups.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'atlassian-for-startups',
      name: 'Atlassian for Startups',
      url: 'https://www.atlassian.com/software/startups',
      description: 'Software development tools offering free licenses for Jira, Confluence, and other Atlassian products for teams under 10 people.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'digitalocean-hatch',
      name: 'DigitalOcean Hatch',
      url: 'https://www.digitalocean.com/hatch',
      description: 'Cloud infrastructure startup program offering up to $120,000 in credits, technical support, and access to startup resources.',
      icon: <Target className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'twilio-startup-program',
      name: 'Twilio Startup Program',
      url: 'https://www.twilio.com/startup',
      description: 'Communication platform offering $500 in Twilio credits, priority support, and access to startup resources for early-stage companies.',
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'mongodb-startup-program',
      name: 'MongoDB for Startups',
      url: 'https://www.mongodb.com/startups',
      description: 'Database platform offering free MongoDB Atlas credits, technical support, training, and access to MongoDB\'s partner network.',
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'snowflake-startup-program',
      name: 'Snowflake for Startups',
      url: 'https://www.snowflake.com/startups',
      description: 'Data cloud platform offering up to $100,000 in Snowflake credits, technical support, and access to data analytics resources.',
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },
    {
      id: 'notion-startup-program',
      name: 'Notion for Startups',
      url: 'https://www.notion.so/startups',
      description: 'Productivity platform offering free Notion Pro plans, templates, and resources for early-stage startups and teams.',
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-orange-600 to-red-600',
      glowColor: '#f97316'
    },

    // Venture Capital Firms (Indigo Category)
    {
      id: 'sequoia-capital',
      name: 'Sequoia Capital',
      url: 'https://www.sequoiacap.com',
      description: 'One of the most prestigious VC firms globally. $55.7B AUM. Famous investments include Apple, Google, Instagram, LinkedIn, PayPal, WhatsApp, and Zoom.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'andreessen-horowitz',
      name: 'Andreessen Horowitz (a16z)',
      url: 'https://a16z.com',
      description: 'Leading Silicon Valley VC firm. $52.3B AUM. Major investments in Facebook, Groupon, Twitter, Zynga, and crypto/web3 companies.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'tiger-global-management',
      name: 'Tiger Global Management',
      url: 'https://www.tigerglobal.com',
      description: 'World\'s largest VC firm by AUM. $58.5B assets. Most prolific US venture capital fund with investments in Briq, Wiz, and Scribe.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'accel',
      name: 'Accel',
      url: 'https://www.accel.com',
      description: 'Global VC firm with $19.1B AUM. Offices in California, Europe, and China. Notable investments include Etsy, Rovio, Braintree, and Atlassian.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'new-enterprise-associates',
      name: 'New Enterprise Associates (NEA)',
      url: 'https://www.nea.com',
      description: 'Nearly 50-year-old VC firm with $25.9B AUM. Based in Maryland with Silicon Valley presence. Investments include Patreon, Plaid, Upstart.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'lightspeed-venture-partners',
      name: 'Lightspeed Venture Partners',
      url: 'https://lsvp.com',
      description: '$25B AUM. Multi-stage investments in enterprise, consumer, and health. Notable investments include Grubhub, Flixster, Cameo, and Giphy.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'bessemer-venture-partners',
      name: 'Bessemer Venture Partners',
      url: 'https://www.bvp.com',
      description: 'One of the oldest VC firms in the US. $19.7B AUM. Global offices. Successful investments include LinkedIn, Shopify, Twitch, Pinterest, DocuSign.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'kleiner-perkins',
      name: 'Kleiner Perkins',
      url: 'https://www.kleinerperkins.com',
      description: 'Legendary Silicon Valley VC firm. Early investors in Amazon, Google, Genentech. Focus on technology and life sciences investments.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'benchmark',
      name: 'Benchmark',
      url: 'https://www.benchmark.com',
      description: 'Elite Silicon Valley VC firm known for early-stage investments. Portfolio includes Uber, Twitter, Instagram, Snapchat, and WeWork.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'greylock-partners',
      name: 'Greylock Partners',
      url: 'https://greylock.com',
      description: 'Premier early-stage VC firm. Investments include LinkedIn, Facebook, Airbnb, Dropbox, and Discord. Focus on consumer and enterprise technology.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'general-catalyst',
      name: 'General Catalyst',
      url: 'https://www.generalcatalyst.com',
      description: 'Global VC firm with offices in Boston, NYC, and Silicon Valley. Investments include Stripe, Snapchat, Airbnb, and HubSpot.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'first-round-capital',
      name: 'First Round Capital',
      url: 'https://firstround.com',
      description: 'Early-stage VC firm focused on seed and Series A investments. Portfolio includes Uber, Square, Warby Parker, and Notion.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'union-square-ventures',
      name: 'Union Square Ventures',
      url: 'https://www.usv.com',
      description: 'NYC-based VC firm focused on network-based businesses. Early investors in Twitter, Tumblr, Foursquare, Coinbase, and Etsy.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'founders-fund',
      name: 'Founders Fund',
      url: 'https://foundersfund.com',
      description: 'Peter Thiel\'s VC firm focused on breakthrough technologies. Investments include Facebook, SpaceX, Palantir, Stripe, and Airbnb.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'ggv-capital',
      name: 'GGV Capital',
      url: 'https://www.ggvc.com',
      description: 'Multi-stage VC firm with US-China focus. Investments include Alibaba, Airbnb, Slack, Square, and TikTok/ByteDance.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'insight-partners',
      name: 'Insight Partners',
      url: 'https://www.insightpartners.com',
      description: 'Global software investor with $90B+ AUM. Growth equity and venture investments in ScaleAI, Shopify, Twitter, and Delivery Hero.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'index-ventures',
      name: 'Index Ventures',
      url: 'https://www.indexventures.com',
      description: 'European VC firm with San Francisco office. $13B AUM. Investments include Betfair, MySQL, Facebook, and Zendesk.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'khosla-ventures',
      name: 'Khosla Ventures',
      url: 'https://www.khoslaventures.com',
      description: '$15B AUM. Founded by Vinod Khosla. Investments in technology and cleantech including Stripe, Instacart, DoorDash, and Square.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'battery-ventures',
      name: 'Battery Ventures',
      url: 'https://www.battery.com',
      description: 'Boston-based VC firm with $16.8B AUM. 40+ years experience. Investments include Coinbase, Databricks, Glassdoor, and Groupon.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'spark-capital',
      name: 'Spark Capital',
      url: 'https://www.sparkcapital.com',
      description: 'Early-stage VC firm with offices in Boston and San Francisco. Portfolio includes Twitter, Tumblr, Foursquare, and Discord.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'ycombinator',
      name: 'Y Combinator',
      url: 'https://www.ycombinator.com',
      description: 'World\'s most successful startup accelerator and seed fund. $500K investments. Alumni include Airbnb, Stripe, Dropbox, and Reddit.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'techstars',
      name: 'Techstars',
      url: 'https://www.techstars.com',
      description: 'Global startup accelerator with $120K funding. Extensive mentor network and investor access. Programs worldwide.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'matrix-partners',
      name: 'Matrix Partners',
      url: 'https://matrix.vc',
      description: 'Early-stage VC firm with US and India presence. Investments include Apple, Oculus, Zendesk, and HubSpot.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'menlo-ventures',
      name: 'Menlo Ventures',
      url: 'https://menlovc.com',
      description: 'Silicon Valley VC firm focused on early-stage technology companies. Investments include Uber, Warby Parker, and Roku.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'nea-venture-capital',
      name: 'NEA (New Enterprise Associates)',
      url: 'https://www.nea.com',
      description: 'One of the largest and most active VCs globally. $25B+ AUM. Investments across all stages from seed to growth.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'redpoint-ventures',
      name: 'Redpoint Ventures',
      url: 'https://www.redpoint.com',
      description: 'Early-stage VC firm focused on seed and Series A investments. Portfolio includes Stripe, Twilio, and HomeAway.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'initialized-capital',
      name: 'Initialized Capital',
      url: 'https://initialized.com',
      description: 'Early-stage VC firm co-founded by Alexis Ohanian (Reddit). Focus on seed investments in technology startups.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'lux-capital',
      name: 'Lux Capital',
      url: 'https://www.luxcapital.com',
      description: 'NYC-based VC firm focused on emerging science and technology. Investments in SpaceX, Planet Labs, and Recursion Pharmaceuticals.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'cowboy-ventures',
      name: 'Cowboy Ventures',
      url: 'https://cowboy.vc',
      description: 'Seed-stage VC firm led by Aileen Lee. Focus on mobile, marketplaces, and data-driven businesses.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'nfx',
      name: 'NFX',
      url: 'https://www.nfx.com',
      description: 'Pre-seed and seed VC firm focused on network effect businesses. Founded by serial entrepreneurs.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'emergence-capital',
      name: 'Emergence Capital',
      url: 'https://www.emcap.com',
      description: 'Early-stage VC firm focused on enterprise SaaS. First investor in Salesforce, also invested in Zoom and Box.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'social-capital',
      name: 'Social Capital',
      url: 'https://www.socialcapital.com',
      description: 'Technology-focused VC firm founded by Chamath Palihapitiya. Investments in Facebook, Slack, and Box.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'dcm-ventures',
      name: 'DCM Ventures',
      url: 'https://dcm.com',
      description: 'Global VC firm with US-Asia focus. Investments include Tesla, Twitter, SoundHound, and Mapbox.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'canaan-partners',
      name: 'Canaan Partners',
      url: 'https://www.canaan.com',
      description: 'Early-stage VC firm with focus on technology and healthcare. Investments include Lending Club and Instacart.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'dragoneer-investment-group',
      name: 'Dragoneer Investment Group',
      url: 'https://dragoneer.com',
      description: 'Growth-stage VC firm with $21.7B AUM. Focus on software, fintech, and e-commerce. Founded by Marc Stad.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'technology-crossover-ventures',
      name: 'Technology Crossover Ventures (TCV)',
      url: 'https://www.tcv.com',
      description: '$19.9B AUM. Growth capital for public and private companies. Investments include Netflix, LinkedIn, Airbnb, and Spotify.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'legend-capital',
      name: 'Legend Capital',
      url: 'https://www.legendcapital.com.cn/aboutus_en/index.aspx?nodeid=30',
      description: 'Prominent Asian VC firm based in Beijing. $48.1B AUM. Focus on healthcare, medical, and biotechnology investments.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'orbimed',
      name: 'OrbiMed',
      url: 'https://www.orbimed.com',
      description: 'Healthcare-focused VC firm with $18.3B AUM. Specializes in biopharmaceuticals, medical devices, and healthcare IT.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'deerfield-management',
      name: 'Deerfield Management',
      url: 'https://deerfield.com',
      description: 'Healthcare investment firm with $15.1B AUM. Focus on biopharmaceuticals, medical devices, and digital health.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'thrive-capital',
      name: 'Thrive Capital',
      url: 'https://thrivecap.com',
      description: 'Growth-stage VC firm founded by Josh Kushner. Investments include Instagram, Stripe, GitHub, and Oscar Health.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'coatue-management',
      name: 'Coatue Management',
      url: 'https://coatue.com',
      description: 'Technology-focused investment firm with public and private investments. Portfolio includes ByteDance, DoorDash, and Snowflake.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'ribbit-capital',
      name: 'Ribbit Capital',
      url: 'https://ribbitcap.com',
      description: 'Fintech-focused VC firm. Investments include Coinbase, Robinhood, Credit Karma, and Affirm.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'ggv-capital-global',
      name: 'GGV Capital',
      url: 'https://www.ggvc.com',
      description: 'Global VC firm bridging US and Asia. Investments include Alibaba, Xiaomi, Wish, and HashiCorp.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'iconiq-capital',
      name: 'ICONIQ Capital',
      url: 'https://www.iconiqcapital.com',
      description: 'Growth equity firm serving ultra-high-net-worth families. Investments include Facebook, Twitter, and Flipkart.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'dst-global',
      name: 'DST Global',
      url: 'https://www.dstglobal.com',
      description: 'Global technology investor. Investments include Facebook, Twitter, Spotify, Airbnb, and WhatsApp.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'general-atlantic',
      name: 'General Atlantic',
      url: 'https://www.generalatlantic.com',
      description: 'Global growth equity firm with $84B AUM. Investments include Airbnb, Uber, Snapchat, and ByteDance.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'silver-lake',
      name: 'Silver Lake',
      url: 'https://www.silverlake.com',
      description: 'Technology-focused private equity firm with $88B AUM. Investments include Airbnb, Twitter, and Dell Technologies.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'tpg-capital',
      name: 'TPG Capital',
      url: 'https://www.tpg.com',
      description: 'Global private equity firm with growth investments. $120B+ AUM. Investments include Uber, Airbnb, and Spotify.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    },
    {
      id: 'kkr',
      name: 'KKR & Co',
      url: 'https://www.kkr.com',
      description: 'Global investment firm with $504B AUM. Growth equity investments in technology, healthcare, and financial services.',
      icon: <DollarSign className="w-6 h-6 sm:w-8 sm:h-8" />,
      color: 'from-indigo-600 to-purple-600',
      glowColor: '#6366f1'
    }
  ];

  // Organize scholarships by category
  const scholarshipCategories = useMemo(() => {
    const categories = {
      'SAT Test Prep Opportunities': [] as ScholarshipItem[],
      'Local Scholarships': [] as ScholarshipItem[],
      'International Scholarships': [] as ScholarshipItem[],
      'Fellowship Programs': [] as ScholarshipItem[],
      'Foreign Incubators & Accelerators': [] as ScholarshipItem[],
      'Grants & Microgrants': [] as ScholarshipItem[],
      'Startup Hubs & Incubators': [] as ScholarshipItem[],
      'Venture Capital Firms': [] as ScholarshipItem[]
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
      // Fellowship Programs
      else if (name.includes('thiel fellowship') || name.includes('steve jobs archive') || name.includes('emergent ventures fellowship') ||
          name.includes('zfellows') || name.includes('1517 fund medici') || name.includes('neo scholars') ||
          name.includes('atlas fellowship') || name.includes('contrary fellowship') || name.includes('kleiner perkins') ||
          name.includes('reforge') || name.includes('pioneer fellowship') || name.includes('on deck') ||
          name.includes('south park commons') || name.includes('interact fellowship') || name.includes('davidson') ||
          name.includes('coca-cola scholars') || name.includes('regeneron') || name.includes('gates millennium') ||
          name.includes('jack kent cooke') || (description.includes('fellowship') && !description.includes('scholarship'))) {
        categories['Fellowship Programs'].push(scholarship);
      }
      // Foreign Incubators & Accelerators
      else if (name.includes('y combinator') || name.includes('techstars') || name.includes('neo accelerator') ||
          name.includes('antler') || name.includes('entrepreneur first') || name.includes('seedcamp') ||
          name.includes('rocket internet') || name.includes('station f') || name.includes('plug and play') ||
          name.includes('founders factory') || name.includes('masschallenge') || name.includes('startupbootcamp') ||
          name.includes('miracle plus') || name.includes('chinaccelerator') || name.includes('alchemist') ||
          (description.includes('accelerator') || description.includes('incubator')) &&
          !name.includes('ghana') && !name.includes('africa') && !name.includes('accra')) {
        categories['Foreign Incubators & Accelerators'].push(scholarship);
      }
      // Grants & Microgrants
      else if (name.includes('merge grant') || name.includes('emergent ventures grant') || name.includes('medici grant') ||
          name.includes('pioneer grant') || name.includes('unshackled ventures') || name.includes('fast grants') ||
          name.includes('mozilla grants') || name.includes('protocol labs') || name.includes('ethereum foundation') ||
          name.includes('gitcoin') || name.includes('open philanthropy') || name.includes('effective altruism') ||
          name.includes('long-term future') || name.includes('survival and flourishing') || name.includes('zfellows grant') ||
          (description.includes('grant') && !description.includes('scholarship')) || description.includes('microgrant')) {
        categories['Grants & Microgrants'].push(scholarship);
      }
      // Startup Hubs & Incubators (Local/African and Foreign)
      else if (name.includes('mest') || name.includes('ispace') || name.includes('kumasi hive') ||
          name.includes('impact hub') || name.includes('innovation hub') || name.includes('kosmos') ||
          name.includes('stanbic') || name.includes('angel investors') || name.includes('founder institute') ||
          name.includes('innohub') || name.includes('microsoft for startups') || name.includes('google for startups') ||
          name.includes('aws activate') || name.includes('nvidia inception') || name.includes('meta for startups') ||
          name.includes('stripe startup') || name.includes('hubspot for startups') || name.includes('salesforce startup') ||
          name.includes('github for startups') || name.includes('atlassian for startups') || name.includes('digitalocean hatch') ||
          name.includes('twilio startup') || name.includes('mongodb for startups') || name.includes('snowflake for startups') ||
          name.includes('notion for startups') || (description.includes('startup') || description.includes('incubator') ||
          description.includes('accelerator') || description.includes('entrepreneur'))) {
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
          name.includes('aga khan') || name.includes('world bank') || name.includes('japan') ||
          name.includes('larry ellison') || name.includes('marshall') || name.includes('clarendon') ||
          name.includes('knight-hennessy') || (name.includes('mastercard foundation') && !name.includes('knust')) ||
          name.includes('ecobank foundation') || name.includes('inlaks') || name.includes('ford foundation') ||
          name.includes('british council') || name.includes('lester b. pearson') || name.includes('vienna biocenter') ||
          name.includes('émile boutmy') || name.includes('danish') || name.includes('belgium') || name.includes('finland') ||
          name.includes('norway') || name.includes('czech') || name.includes('hungarian') || name.includes('stipendium hungaricum') ||
          name.includes('polish') || name.includes('slovenia') || name.includes('portugal') || name.includes('camões') ||
          name.includes('spanish') || name.includes('italian') || name.includes('greek') || name.includes('russian') ||
          name.includes('new zealand') || name.includes('singapore') || name.includes('brunei')) {
        categories['International Scholarships'].push(scholarship);
      }
      // Venture Capital Firms
      else if (name.includes('sequoia') || name.includes('andreessen') || name.includes('tiger global') ||
          name.includes('accel') || name.includes('nea') || name.includes('lightspeed') ||
          name.includes('bessemer') || name.includes('kleiner perkins') || name.includes('benchmark') ||
          name.includes('greylock') || name.includes('general catalyst') || name.includes('first round') ||
          name.includes('union square ventures') || name.includes('founders fund') || name.includes('ggv capital') ||
          name.includes('insight partners') || name.includes('index ventures') || name.includes('khosla ventures') ||
          name.includes('battery ventures') || name.includes('spark capital') || name.includes('matrix partners') ||
          name.includes('menlo ventures') || name.includes('redpoint') || name.includes('initialized') ||
          name.includes('lux capital') || name.includes('cowboy ventures') || name.includes('nfx') ||
          name.includes('emergence capital') || name.includes('social capital') || name.includes('dcm ventures') ||
          name.includes('canaan partners') || name.includes('dragoneer') || name.includes('tcv') ||
          name.includes('legend capital') || name.includes('orbimed') || name.includes('deerfield') ||
          name.includes('thrive capital') || name.includes('coatue') || name.includes('ribbit capital') ||
          name.includes('iconiq capital') || name.includes('dst global') || name.includes('general atlantic') ||
          name.includes('silver lake') || name.includes('tpg capital') || name.includes('kkr') ||
          description.includes('venture capital') || description.includes('vc firm') || description.includes('aum')) {
        categories['Venture Capital Firms'].push(scholarship);
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
        title="Scholarship Opportunities | Educational Funding & Global Academic Pathways - St. Louis Demonstration JHS"
        description="Scholarship Opportunities - Unlock your future with comprehensive scholarship opportunities and educational pathways. Discover local and international scholarships, SAT preparation resources, and global educational opportunities designed to help St. Louis Demonstration JHS students achieve their academic dreams."
        keywords="scholarships, SAT preparation, educational opportunities, Ghana scholarships, international scholarships, college preparation"
        url="/scholarship-opportunities"
        type="website"
        pageType="students-hub"
        useGalleryImages={true}
      />

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-2 sm:py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              Educational and Global Opportunities
            </h1>
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

            {/* Did you Know? Button */}
            <div className="flex justify-center mt-4">
              <Link
                to="/educational-guide"
                className="px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 shadow-md hover:shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300 text-sm sm:text-base flex items-center justify-center gap-2 relative overflow-hidden group"
                style={{ filter: 'drop-shadow(0 0 12px #eab308)' }}
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                Did you Know?
                <span className="text-xs bg-yellow-400/20 px-2 py-1 rounded-full ml-2">
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
                    categoryName === 'International Scholarships' ? 'text-yellow-400' :
                    categoryName === 'Fellowship Programs' ? 'text-purple-400' :
                    categoryName === 'Foreign Incubators & Accelerators' ? 'text-teal-400' :
                    categoryName === 'Grants & Microgrants' ? 'text-rose-400' :
                    categoryName === 'Startup Hubs & Incubators' ? 'text-orange-400' :
                    categoryName === 'Venture Capital Firms' ? 'text-indigo-400' :
                    'text-gray-400'
                  }`}>
                    {categoryName}
                  </h2>
                  <div className={`w-24 h-1 mx-auto rounded-full ${
                    categoryName === 'SAT Test Prep Opportunities' ? 'bg-green-500' :
                    categoryName === 'Local Scholarships' ? 'bg-blue-500' :
                    categoryName === 'International Scholarships' ? 'bg-yellow-500' :
                    categoryName === 'Fellowship Programs' ? 'bg-purple-500' :
                    categoryName === 'Foreign Incubators & Accelerators' ? 'bg-teal-500' :
                    categoryName === 'Grants & Microgrants' ? 'bg-rose-500' :
                    categoryName === 'Startup Hubs & Incubators' ? 'bg-orange-500' :
                    categoryName === 'Venture Capital Firms' ? 'bg-indigo-500' :
                    'bg-gray-500'
                  }`} />

                  {/* Category Explanation */}
                  <div className="mt-4 mb-6 text-center">
                    <p className="text-gray-300 text-sm sm:text-base max-w-4xl mx-auto leading-relaxed">
                      {categoryName === 'SAT Test Prep Opportunities' &&
                        'Comprehensive SAT preparation resources, test centers, and educational support services to help students excel in standardized testing and gain admission to top universities.'
                      }
                      {categoryName === 'Local Scholarships' &&
                        'Ghana-specific scholarship opportunities for Ghanaian students, including government programs, local foundations, and institutions based in Ghana offering educational funding.'
                      }
                      {categoryName === 'International Scholarships' &&
                        'Global scholarship programs from universities, governments, and organizations worldwide offering opportunities for Ghanaian students to study abroad with full or partial funding.'
                      }
                      {categoryName === 'Fellowship Programs' &&
                        'Alternative education pathways including entrepreneurship fellowships, leadership programs, and innovative learning opportunities that provide funding, mentorship, and community support outside traditional academic routes.'
                      }
                      {categoryName === 'Foreign Incubators & Accelerators' &&
                        'Global startup accelerators and incubators that provide funding, mentorship, and resources to help entrepreneurs build and scale their businesses internationally.'
                      }
                      {categoryName === 'Grants & Microgrants' &&
                        'Small to medium funding opportunities for projects, research, and innovative ideas, typically ranging from $1,000 to $50,000 without requiring equity or traditional repayment.'
                      }
                      {categoryName === 'Startup Hubs & Incubators' &&
                        'Local African startup ecosystems and global tech company startup programs offering workspace, mentorship, funding, cloud credits, technical support, and networking opportunities for entrepreneurs.'
                      }
                      {categoryName === 'Venture Capital Firms' &&
                        'Professional investment firms that provide capital to startups and growing companies in exchange for equity, offering funding from seed stage to late-stage growth rounds.'
                      }
                    </p>
                  </div>
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
                              : categoryName === 'International Scholarships'
                              ? 'bg-yellow-900/30 border-yellow-600/50 hover:border-yellow-500 hover:shadow-yellow-500/20 hover:bg-yellow-800/40'
                              : categoryName === 'Fellowship Programs'
                              ? 'bg-purple-900/30 border-purple-600/50 hover:border-purple-500 hover:shadow-purple-500/20 hover:bg-purple-800/40'
                              : categoryName === 'Foreign Incubators & Accelerators'
                              ? 'bg-teal-900/30 border-teal-600/50 hover:border-teal-500 hover:shadow-teal-500/20 hover:bg-teal-800/40'
                              : categoryName === 'Grants & Microgrants'
                              ? 'bg-rose-900/30 border-rose-600/50 hover:border-rose-500 hover:shadow-rose-500/20 hover:bg-rose-800/40'
                              : categoryName === 'Startup Hubs & Incubators'
                              ? 'bg-orange-900/30 border-orange-600/50 hover:border-orange-500 hover:shadow-orange-500/20 hover:bg-orange-800/40'
                              : categoryName === 'Venture Capital Firms'
                              ? 'bg-indigo-900/30 border-indigo-600/50 hover:border-indigo-500 hover:shadow-indigo-500/20 hover:bg-indigo-800/40'
                              : 'bg-gray-900/30 border-gray-600/50 hover:border-gray-500 hover:shadow-gray-500/20 hover:bg-gray-800/40'
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

                          {/* Strong Shimmer Silver Loading Effect */}
                          <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                            <ShimmerLoader
                              variant="silver"
                              className="w-full h-full"
                              width="w-full"
                              height="h-full"
                            />
                          </div>

                          {/* Icon */}
                          <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-3 group-hover:scale-110 transition-all duration-300 ${
                            categoryName === 'SAT Test Prep Opportunities'
                              ? 'bg-green-600/20 group-hover:bg-green-500/30'
                              : categoryName === 'Local Scholarships'
                              ? 'bg-blue-600/20 group-hover:bg-blue-500/30'
                              : categoryName === 'International Scholarships'
                              ? 'bg-yellow-600/20 group-hover:bg-yellow-500/30'
                              : categoryName === 'Fellowship Programs'
                              ? 'bg-purple-600/20 group-hover:bg-purple-500/30'
                              : categoryName === 'Foreign Incubators & Accelerators'
                              ? 'bg-teal-600/20 group-hover:bg-teal-500/30'
                              : categoryName === 'Grants & Microgrants'
                              ? 'bg-rose-600/20 group-hover:bg-rose-500/30'
                              : categoryName === 'Startup Hubs & Incubators'
                              ? 'bg-orange-600/20 group-hover:bg-orange-500/30'
                              : categoryName === 'Venture Capital Firms'
                              ? 'bg-indigo-600/20 group-hover:bg-indigo-500/30'
                              : 'bg-gray-600/20 group-hover:bg-gray-500/30'
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
                                : categoryName === 'International Scholarships'
                                ? 'bg-yellow-600/20 group-hover:bg-yellow-500/30'
                                : categoryName === 'Fellowship Programs'
                                ? 'bg-purple-600/20 group-hover:bg-purple-500/30'
                                : categoryName === 'Foreign Incubators & Accelerators'
                                ? 'bg-teal-600/20 group-hover:bg-teal-500/30'
                                : categoryName === 'Grants & Microgrants'
                                ? 'bg-rose-600/20 group-hover:bg-rose-500/30'
                                : categoryName === 'Startup Hubs & Incubators'
                                ? 'bg-orange-600/20 group-hover:bg-orange-500/30'
                                : categoryName === 'Venture Capital Firms'
                                ? 'bg-indigo-600/20 group-hover:bg-indigo-500/30'
                                : 'bg-gray-600/20 group-hover:bg-gray-500/30'
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