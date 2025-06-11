import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, GraduationCap, Globe, Briefcase, BookOpen, Target, Users, Award, CheckCircle, Heart, ExternalLink, Shield, Palette, Leaf, Monitor, Wrench, DollarSign, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../seo/SEOHead';

interface PathwayStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  options: PathwayOption[];
}

interface PathwayOption {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  outcomes: string[];
  nextSteps: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeframe: string;
  cost: 'Low' | 'Medium' | 'High';
}

const EducationalPathwayGuide: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const handleBack = () => {
    navigate('/scholarship-opportunities');
  };

  const pathwaySteps: PathwayStep[] = [
    {
      id: 'jhs-completion',
      title: 'JHS Completion Strategy',
      description: 'Excel in your JHS studies to secure the best SHS opportunities',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-blue-600 to-indigo-600',
      options: [
        {
          id: 'academic-excellence',
          title: 'Academic Excellence Path',
          description: 'Focus on achieving outstanding BECE results for Category A schools',
          requirements: [
            'Maintain 80%+ average in all subjects',
            'Excel in Mathematics and English',
            'Participate in academic competitions',
            'Join study groups and clubs'
          ],
          outcomes: [
            'Access to top SHS programs',
            'Eligibility for Science, Business, General Arts, Visual Arts, or Home Economics programs',
            'Scholarship opportunities',
            'Strong foundation for university'
          ],
          nextSteps: [
            'Apply to Category A schools',
            'Prepare for entrance exams',
            'Research scholarship opportunities'
          ],
          difficulty: 'Hard',
          timeframe: '3 years',
          cost: 'Low'
        },
        {
          id: 'balanced-approach',
          title: 'Balanced Development Path',
          description: 'Combine academics with extracurricular activities',
          requirements: [
            'Maintain 70%+ academic average',
            'Participate in sports or arts',
            'Develop leadership skills',
            'Community service involvement'
          ],
          outcomes: [
            'Well-rounded profile',
            'Multiple SHS options',
            'Leadership opportunities',
            'Scholarship eligibility'
          ],
          nextSteps: [
            'Apply to multiple SHS categories',
            'Continue extracurricular activities',
            'Build leadership portfolio'
          ],
          difficulty: 'Medium',
          timeframe: '3 years',
          cost: 'Medium'
        }
      ]
    },
    {
      id: 'shs-pathway',
      title: 'SHS Program Selection',
      description: 'Choose the right SHS program based on your career goals',
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'from-green-600 to-emerald-600',
      options: [
        {
          id: 'science-program',
          title: 'Science Program',
          description: 'Focus on STEM subjects for university science programs and careers',
          requirements: [
            'Strong performance in Mathematics',
            'Excellence in Science subjects (Physics, Chemistry, Biology)',
            'Good English proficiency',
            'Analytical thinking skills'
          ],
          outcomes: [
            'University science programs (Medicine, Engineering, etc.)',
            'STEM career opportunities',
            'International scholarship eligibility',
            'Research and development careers'
          ],
          nextSteps: [
            'Start SAT preparation in SHS 2',
            'Join science clubs and competitions',
            'Research international universities'
          ],
          difficulty: 'Hard',
          timeframe: '3 years',
          cost: 'Medium'
        },
        {
          id: 'business-program',
          title: 'Business Program',
          description: 'Develop business skills, economics, and accounting knowledge',
          requirements: [
            'Strong Mathematics skills',
            'Good communication abilities',
            'Interest in economics and accounting',
            'Leadership potential'
          ],
          outcomes: [
            'Business school opportunities',
            'Accounting and finance careers',
            'Entrepreneurship skills',
            'Management and commerce programs'
          ],
          nextSteps: [
            'Develop business projects',
            'Join business and economics clubs',
            'Seek internship opportunities'
          ],
          difficulty: 'Medium',
          timeframe: '3 years',
          cost: 'Medium'
        },
        {
          id: 'general-arts-program',
          title: 'General Arts Program',
          description: 'Focus on literature, social studies, and humanities',
          requirements: [
            'Strong English language skills',
            'Interest in literature and history',
            'Good writing and communication abilities',
            'Critical thinking skills'
          ],
          outcomes: [
            'University arts and humanities programs',
            'Teaching and education careers',
            'Law and social sciences opportunities',
            'Media and communication fields'
          ],
          nextSteps: [
            'Develop writing and research skills',
            'Join debate and literary clubs',
            'Explore humanities university programs'
          ],
          difficulty: 'Medium',
          timeframe: '3 years',
          cost: 'Medium'
        },
        {
          id: 'visual-arts-program',
          title: 'Visual Arts Program',
          description: 'Develop creative and artistic skills in visual arts and design',
          requirements: [
            'Creative and artistic abilities',
            'Interest in visual arts and design',
            'Good hand-eye coordination',
            'Patience and attention to detail'
          ],
          outcomes: [
            'Art and design university programs',
            'Creative industry careers',
            'Graphic design and multimedia opportunities',
            'Fine arts and creative entrepreneurship'
          ],
          nextSteps: [
            'Build an art portfolio',
            'Join art clubs and exhibitions',
            'Explore creative arts universities'
          ],
          difficulty: 'Medium',
          timeframe: '3 years',
          cost: 'Medium'
        },
        {
          id: 'home-economics-program',
          title: 'Home Economics Program',
          description: 'Focus on nutrition, food science, textiles, and family studies',
          requirements: [
            'Interest in nutrition and food science',
            'Good organizational skills',
            'Attention to detail and hygiene',
            'Interest in family and consumer sciences'
          ],
          outcomes: [
            'Nutrition and dietetics programs',
            'Food science and technology careers',
            'Hospitality and catering opportunities',
            'Family and consumer sciences education'
          ],
          nextSteps: [
            'Develop cooking and nutrition knowledge',
            'Join home economics clubs',
            'Explore food science university programs'
          ],
          difficulty: 'Medium',
          timeframe: '3 years',
          cost: 'Medium'
        },
        {
          id: 'tvet-program',
          title: 'TVET Program',
          description: 'Technical and Vocational Education and Training for practical skills',
          requirements: [
            'Interest in hands-on technical work',
            'Good manual dexterity and problem-solving skills',
            'Basic mathematics and science understanding',
            'Willingness to learn practical trades'
          ],
          outcomes: [
            'Direct entry into skilled trades and technical careers',
            'Entrepreneurship opportunities in technical fields',
            'Pathway to technical universities and polytechnics',
            'High demand skills in construction, automotive, ICT, and manufacturing'
          ],
          nextSteps: [
            'Choose specific technical specialization',
            'Seek apprenticeship opportunities',
            'Consider technical university pathways'
          ],
          difficulty: 'Medium',
          timeframe: '2-3 years',
          cost: 'Low'
        }
      ]
    },
    {
      id: 'university-preparation',
      title: 'University Preparation Strategy',
      description: 'Prepare for local or international university admission',
      icon: <Target className="w-8 h-8" />,
      color: 'from-purple-600 to-pink-600',
      options: [
        {
          id: 'local-universities',
          title: 'Local Universities (Ghana)',
          description: 'Pursue higher education in Ghanaian universities',
          requirements: [
            'Strong WASSCE results',
            'Meet university cut-off points',
            'Complete application process',
            'Prepare for entrance exams'
          ],
          outcomes: [
            'Quality education at lower cost',
            'Cultural familiarity',
            'Local network building',
            'Immediate employment opportunities'
          ],
          nextSteps: [
            'Research university programs',
            'Apply for local scholarships',
            'Prepare application materials'
          ],
          difficulty: 'Medium',
          timeframe: '4 years',
          cost: 'Medium'
        },
        {
          id: 'health-training-institutions',
          title: 'Health Training Institutions',
          description: 'Pursue careers in healthcare through nursing, midwifery, and medical training',
          requirements: [
            'Strong WASSCE results in Science subjects',
            'Good performance in Biology and Chemistry',
            'Pass entrance examinations',
            'Meet specific health institution requirements'
          ],
          outcomes: [
            'Direct entry into healthcare careers',
            'High employment demand in health sector',
            'Opportunity to serve communities',
            'Pathway to specialized medical fields'
          ],
          nextSteps: [
            'Apply to University of Ghana Medical School',
            'Consider KNUST School of Medicine and Dentistry',
            'Explore nursing colleges (Korle-Bu, KATH, Cape Coast)',
            'Research University of Health and Allied Sciences (UHAS)'
          ],
          difficulty: 'Hard',
          timeframe: '3-6 years',
          cost: 'High'
        },
        {
          id: 'teacher-training-institutions',
          title: 'Teacher Training Institutions',
          description: 'Become an educator through colleges of education and teacher training programs',
          requirements: [
            'Good WASSCE results',
            'Pass teacher training entrance exams',
            'Demonstrate passion for education',
            'Meet specific college requirements'
          ],
          outcomes: [
            'Stable career in education sector',
            'Opportunity to shape future generations',
            'Government employment benefits',
            'Pathway to educational leadership'
          ],
          nextSteps: [
            'Apply to University of Education, Winneba (UEW)',
            'Consider local Colleges of Education (46 public institutions)',
            'Explore specialized programs (Early Childhood, Special Education)',
            'Research teacher training scholarships'
          ],
          difficulty: 'Medium',
          timeframe: '3-4 years',
          cost: 'Low'
        },
        {
          id: 'international-universities',
          title: 'International Universities',
          description: 'Pursue education abroad with scholarships',
          requirements: [
            'Excellent academic record',
            'High SAT/IELTS scores',
            'Strong personal statement',
            'Leadership experience',
            'Financial planning'
          ],
          outcomes: [
            'Global education experience',
            'International network',
            'Enhanced career prospects',
            'Cultural exposure'
          ],
          nextSteps: [
            'Start SAT preparation early',
            'Research scholarship opportunities',
            'Build strong application profile'
          ],
          difficulty: 'Hard',
          timeframe: '3-4 years',
          cost: 'High'
        },
        {
          id: 'professional-institutes',
          title: 'Professional Institutes',
          description: 'Specialized institutions for professional careers and certifications',
          requirements: [
            'Good academic background',
            'Interest in specific profession',
            'Meet institute requirements',
            'Professional commitment'
          ],
          outcomes: [
            'Professional certification',
            'Industry recognition',
            'Career advancement',
            'Specialized expertise'
          ],
          nextSteps: [
            'Research professional bodies (ICAG, GIB, GIM)',
            'Understand certification requirements',
            'Plan study timeline and costs'
          ],
          difficulty: 'Medium',
          timeframe: '1-3 years',
          cost: 'Medium'
        },
        {
          id: 'tvet-schools',
          title: 'TVET & Vocational Schools',
          description: 'Technical and vocational education for hands-on skills',
          requirements: [
            'Basic education completion',
            'Interest in technical skills',
            'Practical aptitude',
            'Career focus'
          ],
          outcomes: [
            'Marketable technical skills',
            'Quick employment opportunities',
            'Entrepreneurship potential',
            'Industry-relevant training'
          ],
          nextSteps: [
            'Explore NVTI and technical institutes',
            'Choose specific trade or skill',
            'Apply for training programs'
          ],
          difficulty: 'Easy',
          timeframe: '6 months - 2 years',
          cost: 'Low'
        },
        {
          id: 'military-academies',
          title: 'Military & Security Academies',
          description: 'Defense and security training institutions',
          requirements: [
            'Physical fitness',
            'Good character',
            'Educational qualifications',
            'Commitment to service'
          ],
          outcomes: [
            'Military/security career',
            'Leadership training',
            'Disciplined lifestyle',
            'National service'
          ],
          nextSteps: [
            'Research Ghana Armed Forces requirements',
            'Consider Police Academy programs',
            'Prepare for entrance examinations'
          ],
          difficulty: 'Hard',
          timeframe: '2-4 years',
          cost: 'Low'
        },
        {
          id: 'religious-seminaries',
          title: 'Religious Seminaries',
          description: 'Theological and religious education institutions',
          requirements: [
            'Religious calling',
            'Good academic record',
            'Character references',
            'Denominational requirements'
          ],
          outcomes: [
            'Religious leadership',
            'Community service',
            'Spiritual development',
            'Educational opportunities'
          ],
          nextSteps: [
            'Contact denominational leaders',
            'Research seminary programs',
            'Prepare application materials'
          ],
          difficulty: 'Medium',
          timeframe: '3-4 years',
          cost: 'Low'
        },
        {
          id: 'art-creative-schools',
          title: 'Art & Creative Schools',
          description: 'Creative arts, design, and media training',
          requirements: [
            'Creative talent',
            'Portfolio development',
            'Artistic passion',
            'Technical aptitude'
          ],
          outcomes: [
            'Creative career opportunities',
            'Artistic skill development',
            'Industry connections',
            'Cultural contribution'
          ],
          nextSteps: [
            'Build creative portfolio',
            'Research NAFTI and art schools',
            'Develop technical skills'
          ],
          difficulty: 'Medium',
          timeframe: '1-4 years',
          cost: 'Medium'
        },
        {
          id: 'agricultural-colleges',
          title: 'Agricultural Colleges',
          description: 'Farming and agricultural training institutions',
          requirements: [
            'Interest in agriculture',
            'Science background',
            'Practical orientation',
            'Environmental awareness'
          ],
          outcomes: [
            'Agricultural expertise',
            'Food security contribution',
            'Rural development',
            'Sustainable farming'
          ],
          nextSteps: [
            'Explore KNUST Agriculture programs',
            'Research agricultural research institutes',
            'Consider agribusiness opportunities'
          ],
          difficulty: 'Medium',
          timeframe: '2-4 years',
          cost: 'Medium'
        },
        {
          id: 'business-schools',
          title: 'Business Schools',
          description: 'Management education and executive development',
          requirements: [
            'Business aptitude',
            'Leadership potential',
            'Academic qualifications',
            'Professional goals'
          ],
          outcomes: [
            'Management skills',
            'Business network',
            'Career advancement',
            'Entrepreneurship preparation'
          ],
          nextSteps: [
            'Research MBA programs (UGBS, GIMPA)',
            'Gain work experience',
            'Prepare for entrance exams'
          ],
          difficulty: 'Hard',
          timeframe: '1-3 years',
          cost: 'High'
        },
        {
          id: 'online-universities',
          title: 'Online Universities',
          description: 'Accredited distance learning and virtual education',
          requirements: [
            'Self-discipline',
            'Technology access',
            'Time management',
            'Academic qualifications'
          ],
          outcomes: [
            'Flexible learning',
            'Work-study balance',
            'Global access',
            'Cost-effective education'
          ],
          nextSteps: [
            'Research accredited online programs',
            'Ensure technology requirements',
            'Plan study schedule'
          ],
          difficulty: 'Medium',
          timeframe: '2-4 years',
          cost: 'Medium'
        }
      ]
    },
    {
      id: 'entrepreneurship-pathway',
      title: 'Entrepreneurship & Business Creation',
      description: 'Start your own business and become a job creator',
      icon: <Briefcase className="w-8 h-8" />,
      color: 'from-orange-600 to-red-600',
      options: [
        {
          id: 'early-entrepreneurship',
          title: 'Start While in School',
          description: 'Begin entrepreneurial journey during SHS or immediately after',
          requirements: [
            'Identify a problem to solve',
            'Basic business knowledge',
            'Small starting capital or skills',
            'Willingness to learn and adapt'
          ],
          outcomes: [
            'Early business experience',
            'Financial independence potential',
            'Job creation for others',
            'Real-world business skills'
          ],
          nextSteps: [
            'Join startup hubs and incubators',
            'Attend entrepreneurship workshops',
            'Find mentors and advisors',
            'Start with small pilot projects'
          ],
          difficulty: 'Medium',
          timeframe: '1-2 years to start',
          cost: 'Low'
        },
        {
          id: 'tech-entrepreneurship',
          title: 'Technology Startups',
          description: 'Create technology-based solutions and digital businesses',
          requirements: [
            'Basic tech skills or tech co-founder',
            'Understanding of digital markets',
            'Problem-solving mindset',
            'Access to startup ecosystem'
          ],
          outcomes: [
            'Scalable business potential',
            'Access to venture capital',
            'Global market opportunities',
            'High growth potential'
          ],
          nextSteps: [
            'Learn basic coding or digital skills',
            'Join tech hubs like MEST, iSpace',
            'Participate in hackathons',
            'Build minimum viable product (MVP)'
          ],
          difficulty: 'Hard',
          timeframe: '2-3 years to scale',
          cost: 'Medium'
        },
        {
          id: 'social-entrepreneurship',
          title: 'Social Impact Business',
          description: 'Create businesses that solve social problems while generating profit',
          requirements: [
            'Passion for social change',
            'Understanding of community needs',
            'Basic business planning skills',
            'Networking and partnership abilities'
          ],
          outcomes: [
            'Positive community impact',
            'Sustainable income generation',
            'Recognition and awards',
            'Access to impact funding'
          ],
          nextSteps: [
            'Join Impact Hub Accra',
            'Research social problems in your area',
            'Connect with NGOs and community leaders',
            'Apply for social enterprise competitions'
          ],
          difficulty: 'Medium',
          timeframe: '1-3 years',
          cost: 'Low'
        },
        {
          id: 'traditional-business',
          title: 'Traditional Business Ventures',
          description: 'Start conventional businesses in trade, services, or manufacturing',
          requirements: [
            'Market research skills',
            'Basic capital or access to funding',
            'Understanding of local market',
            'Business registration knowledge'
          ],
          outcomes: [
            'Steady income potential',
            'Local market expertise',
            'Employment creation',
            'Community economic development'
          ],
          nextSteps: [
            'Conduct market research',
            'Develop business plan',
            'Register business with Registrar General',
            'Seek funding from banks or microfinance'
          ],
          difficulty: 'Easy',
          timeframe: '6 months to 1 year',
          cost: 'Medium'
        }
      ]
    }
  ];

  const currentStepData = pathwaySteps[currentStep];

  const nextStep = () => {
    if (currentStep < pathwaySteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedPath(null);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedPath(null);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < pathwaySteps.length) {
      setCurrentStep(stepIndex);
      setSelectedPath(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Hard': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'Low': return 'text-green-400 bg-green-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'High': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Educational Pathway Decision Guide | St. Louis Demonstration JHS"
        description="Comprehensive guide to help students make informed decisions about their educational journey from JHS excellence to university success, including SAT preparation and scholarship opportunities."
        keywords="educational pathway, JHS to SHS, SAT preparation, scholarship guide, university preparation, technical education, vocational training"
        url="/educational-pathway-guide"
        type="website"
      />

      {/* Hide footer on this page */}
      <style>{`
        footer { display: none !important; }
      `}</style>

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-emerald-700/50 hover:bg-emerald-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-emerald-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Educational Pathway Decision Guide
            </h1>
              <p className="text-sm text-emerald-200 truncate">
                Your comprehensive guide from JHS to University success
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="w-full">
          {/* Progress Navigation */}
          <div className="mb-6 px-4 sm:px-6 py-4 sm:py-6">
            {/* Introduction */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Make Informed Educational Decisions
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Navigate your educational journey with confidence. Get step-by-step guidance on excelling in JHS,
                choosing the right SHS program, preparing for SAT, and accessing scholarship opportunities.
              </p>
            </div>

            {/* Progress Indicator - Horizontal on all screen sizes with clickable steps */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                {pathwaySteps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-shrink-0">
                    <button
                      onClick={() => goToStep(index)}
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center border-2 shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 ${
                        index <= currentStep
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 text-white shadow-purple-500/30 hover:from-purple-700 hover:to-blue-700'
                          : 'bg-gray-800 border-gray-600 text-gray-400 shadow-gray-800/30 hover:bg-gray-700 hover:border-gray-500'
                      }`}
                      title={`Go to ${step.title}`}
                    >
                      {index < currentStep ? <CheckCircle className="w-6 h-6" /> : index + 1}
                    </button>
                    {index < pathwaySteps.length - 1 && (
                      <div className={`w-8 h-1 mx-1 rounded-full transition-all duration-300 ${
                        index < currentStep ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Step Content - Edge to Edge */}
          <div className={`p-6 border-y ${currentStepData.color.includes('blue') ? 'border-blue-500/30 bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-blue-900/50' :
                          currentStepData.color.includes('green') ? 'border-green-500/30 bg-gradient-to-r from-green-900/50 via-emerald-900/50 to-green-900/50' :
                          currentStepData.color.includes('purple') ? 'border-purple-500/30 bg-gradient-to-r from-purple-900/50 via-violet-900/50 to-purple-900/50' :
                          'border-emerald-500/30 bg-gradient-to-r from-emerald-900/50 via-teal-900/50 to-emerald-900/50'}`}>
            <div className="flex items-center gap-4 mb-6 px-4 sm:px-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentStepData.color} flex items-center justify-center text-white`}>
                {currentStepData.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentStepData.title}</h2>
                <p className="text-gray-400">{currentStepData.description}</p>
              </div>
            </div>

            {/* Options Grid - Mobile Horizontal with Fade Edges, Desktop Grid */}
            <div className="relative mb-8 px-4 sm:px-6">
              {/* Fade edges for mobile horizontal scroll */}
              <div className="md:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900/80 to-transparent z-10 pointer-events-none"></div>
              <div className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900/80 to-transparent z-10 pointer-events-none"></div>

              <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 px-4 md:px-0 scrollbar-hide">
            {currentStepData.options.map((option) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`min-w-[280px] md:min-w-0 bg-gray-800/50 rounded-xl p-4 md:p-6 border-2 cursor-pointer transition-all duration-300 shadow-lg flex-shrink-0 ${
                  selectedPath === option.id
                    ? 'border-purple-500 bg-purple-500/10 shadow-purple-500/20'
                    : 'border-gray-600 hover:border-gray-500 shadow-gray-800/30'
                }`}
                onClick={() => setSelectedPath(selectedPath === option.id ? null : option.id)}
              >
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{option.title}</h3>
                <p className="text-sm md:text-base text-gray-400 mb-3 md:mb-4">{option.description}</p>
                
                <div className="flex gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(option.difficulty)}`}>
                    {option.difficulty}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCostColor(option.cost)}`}>
                    {option.cost} Cost
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-blue-400 bg-blue-400/20">
                    {option.timeframe}
                  </span>
                </div>

                {selectedPath === option.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-purple-400 mb-2">Requirements:</h4>
                      <ul className="space-y-1">
                        {option.requirements.map((req, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-green-400 mb-2">Expected Outcomes:</h4>
                      <ul className="space-y-1">
                        {option.outcomes.map((outcome, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                            <Award className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Next Steps:</h4>
                      <ul className="space-y-1">
                        {option.nextSteps.map((step, index) => (
                          <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                            <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* Glowing Buttons for All Institution Categories */}
                {(option.id === 'health-training-institutions' || option.id === 'teacher-training-institutions' ||
                  option.id === 'local-universities' || option.id === 'professional-institutes' ||
                  option.id === 'tvet-schools' || option.id === 'military-academies' ||
                  option.id === 'religious-seminaries' || option.id === 'art-creative-schools' ||
                  option.id === 'agricultural-colleges' || option.id === 'business-schools' ||
                  option.id === 'online-universities') && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 pt-4 border-t border-white/20"
                  >
                    <button
                      onClick={() => navigate(
                        option.id === 'health-training-institutions' ? '/nursing-institutions' :
                        option.id === 'teacher-training-institutions' ? '/teacher-training' :
                        option.id === 'local-universities' ? '/local-universities' :
                        option.id === 'professional-institutes' ? '/professional-institutes' :
                        option.id === 'tvet-schools' ? '/tvet-schools' :
                        option.id === 'military-academies' ? '/military-academies' :
                        option.id === 'religious-seminaries' ? '/religious-seminaries' :
                        option.id === 'art-creative-schools' ? '/art-creative-schools' :
                        option.id === 'agricultural-colleges' ? '/agricultural-colleges' :
                        option.id === 'business-schools' ? '/business-schools' :
                        '/online-universities'
                      )}
                      className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        option.id === 'health-training-institutions'
                          ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 shadow-red-500/30 hover:shadow-red-500/50'
                          : option.id === 'teacher-training-institutions'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/30 hover:shadow-blue-500/50'
                          : option.id === 'local-universities'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-green-500/30 hover:shadow-green-500/50'
                          : option.id === 'professional-institutes'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-500/30 hover:shadow-purple-500/50'
                          : option.id === 'tvet-schools'
                          ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-orange-500/30 hover:shadow-orange-500/50'
                          : option.id === 'military-academies'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-green-500/30 hover:shadow-green-500/50'
                          : option.id === 'religious-seminaries'
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/30 hover:shadow-indigo-500/50'
                          : option.id === 'art-creative-schools'
                          ? 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-pink-500/30 hover:shadow-pink-500/50'
                          : option.id === 'agricultural-colleges'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-green-500/30 hover:shadow-green-500/50'
                          : option.id === 'business-schools'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/30 hover:shadow-blue-500/50'
                          : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-cyan-500/30 hover:shadow-cyan-500/50'
                      }`}
                      style={{
                        boxShadow: option.id === 'health-training-institutions'
                          ? '0 0 20px rgba(239, 68, 68, 0.4), 0 0 40px rgba(239, 68, 68, 0.2)'
                          : option.id === 'teacher-training-institutions'
                          ? '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)'
                          : option.id === 'local-universities'
                          ? '0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)'
                          : option.id === 'professional-institutes'
                          ? '0 0 20px rgba(147, 51, 234, 0.4), 0 0 40px rgba(147, 51, 234, 0.2)'
                          : option.id === 'tvet-schools'
                          ? '0 0 20px rgba(234, 88, 12, 0.4), 0 0 40px rgba(234, 88, 12, 0.2)'
                          : option.id === 'military-academies'
                          ? '0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)'
                          : option.id === 'religious-seminaries'
                          ? '0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(99, 102, 241, 0.2)'
                          : option.id === 'art-creative-schools'
                          ? '0 0 20px rgba(236, 72, 153, 0.4), 0 0 40px rgba(236, 72, 153, 0.2)'
                          : option.id === 'agricultural-colleges'
                          ? '0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)'
                          : option.id === 'business-schools'
                          ? '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)'
                          : '0 0 20px rgba(8, 145, 178, 0.4), 0 0 40px rgba(8, 145, 178, 0.2)'
                      }}
                    >
                      {option.id === 'health-training-institutions' ? (
                        <Heart className="w-5 h-5" />
                      ) : option.id === 'teacher-training-institutions' ? (
                        <BookOpen className="w-5 h-5" />
                      ) : option.id === 'local-universities' ? (
                        <GraduationCap className="w-5 h-5" />
                      ) : option.id === 'professional-institutes' ? (
                        <DollarSign className="w-5 h-5" />
                      ) : option.id === 'tvet-schools' ? (
                        <Wrench className="w-5 h-5" />
                      ) : option.id === 'military-academies' ? (
                        <Shield className="w-5 h-5" />
                      ) : option.id === 'religious-seminaries' ? (
                        <BookOpen className="w-5 h-5" />
                      ) : option.id === 'art-creative-schools' ? (
                        <Palette className="w-5 h-5" />
                      ) : option.id === 'agricultural-colleges' ? (
                        <Leaf className="w-5 h-5" />
                      ) : option.id === 'business-schools' ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <Monitor className="w-5 h-5" />
                      )}
                      <span>
                        {option.id === 'health-training-institutions'
                          ? 'View All Health Training Institutions'
                          : option.id === 'teacher-training-institutions'
                          ? 'View All Teacher Training Institutions'
                          : option.id === 'local-universities'
                          ? 'View All Local Universities'
                          : option.id === 'professional-institutes'
                          ? 'View All Professional Institutes'
                          : option.id === 'tvet-schools'
                          ? 'View All TVET Schools'
                          : option.id === 'military-academies'
                          ? 'View All Military Academies'
                          : option.id === 'religious-seminaries'
                          ? 'View All Religious Seminaries'
                          : option.id === 'art-creative-schools'
                          ? 'View All Art & Creative Schools'
                          : option.id === 'agricultural-colleges'
                          ? 'View All Agricultural Colleges'
                          : option.id === 'business-schools'
                          ? 'View All Business Schools'
                          : 'View All Online Universities'
                        }
                      </span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
              ))}
              </div>
            </div>
          </div>

          {/* Step Selection Buttons - Quick Navigation */}
          <div className="flex justify-center mb-6 px-4 sm:px-6">
            <div className="flex gap-2 bg-gray-800/50 rounded-xl p-2 backdrop-blur-sm border border-gray-600/50">
              {pathwaySteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                    index === currentStep
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                  title={step.title}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between mt-6 pt-4 px-4 sm:px-6 border-t border-gray-700/50 gap-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
                currentStep === 0
                  ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-500/25'
              }`}
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Previous Step</span>
              <span className="sm:hidden">Previous</span>
            </button>

            <div className="text-center flex-1">
              <div className="text-xs sm:text-sm text-gray-400 mb-1">Progress</div>
              <div className="flex items-center justify-center gap-1">
                {pathwaySteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                      index <= currentStep ? 'bg-emerald-500' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    title={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={currentStep === pathwaySteps.length - 1}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm ${
                currentStep === pathwaySteps.length - 1
                  ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-500/25'
              }`}
            >
              <span className="hidden sm:inline">
                {currentStep === pathwaySteps.length - 1 ? 'Completed' : 'Next Step'}
              </span>
              <span className="sm:hidden">
                {currentStep === pathwaySteps.length - 1 ? 'Done' : 'Next'}
              </span>
              {currentStep < pathwaySteps.length - 1 && <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EducationalPathwayGuide;
