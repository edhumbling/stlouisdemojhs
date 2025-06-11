import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, GraduationCap, Globe, Briefcase, BookOpen, Target, Users, Award, CheckCircle } from 'lucide-react';
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

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 py-3 sm:py-4 pt-20">
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
                Educational Pathway Decision Guide
              </h1>
              <p className="text-sm text-emerald-200 truncate">
                Your comprehensive guide from JHS to University success
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        {/* Introduction */}
        <div className="text-center mb-8 px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Make Informed Educational Decisions
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Navigate your educational journey with confidence. Get step-by-step guidance on excelling in JHS,
            choosing the right SHS program, preparing for SAT, and accessing scholarship opportunities.
          </p>
        </div>

        {/* Progress Indicator - Horizontal on all screen sizes */}
        <div className="flex justify-center mb-8 px-6">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {pathwaySteps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center border-2 shadow-lg transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500 text-white shadow-purple-500/30'
                    : 'bg-gray-800 border-gray-600 text-gray-400 shadow-gray-800/30'
                }`}>
                  {index < currentStep ? <CheckCircle className="w-6 h-6" /> : index + 1}
                </div>
                {index < pathwaySteps.length - 1 && (
                  <div className={`w-8 h-1 mx-1 rounded-full transition-all duration-300 ${
                    index < currentStep ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl mx-6 md:mx-auto md:max-w-6xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentStepData.color} flex items-center justify-center text-white`}>
              {currentStepData.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{currentStepData.title}</h2>
              <p className="text-gray-400">{currentStepData.description}</p>
            </div>
          </div>

          {/* Options Grid - Mobile Horizontal with Fade Edges, Desktop Grid */}
          <div className="relative mb-8">
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
              </motion.div>
            ))}
            </div>
          </div>
        </div>

        {/* Navigation - Mobile Optimized */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 px-6 md:px-0 md:max-w-6xl md:mx-auto">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Previous</span>
          </button>

          <div className="text-center order-first md:order-none">
            <p className="text-gray-400 text-sm font-medium">
              Step {currentStep + 1} of {pathwaySteps.length}
            </p>
            <div className="flex gap-1 mt-1 justify-center">
              {pathwaySteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === pathwaySteps.length - 1}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-xl transition-all duration-300 shadow-lg"
          >
            <span className="font-medium">Next</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationalPathwayGuide;
