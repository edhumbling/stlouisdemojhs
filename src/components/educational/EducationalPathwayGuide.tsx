import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, GraduationCap, Globe, Briefcase, BookOpen, Target, Users, Award, CheckCircle } from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

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
            'Science and business program eligibility',
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
          id: 'science-programs',
          title: 'Science Programs',
          description: 'Prepare for STEM careers and international opportunities',
          requirements: [
            'Strong performance in Mathematics',
            'Excellence in Science subjects',
            'Good English proficiency',
            'Analytical thinking skills'
          ],
          outcomes: [
            'University science programs',
            'Engineering opportunities',
            'Medical school eligibility',
            'International scholarships'
          ],
          nextSteps: [
            'Start SAT preparation in SHS 2',
            'Join science clubs',
            'Research international universities'
          ],
          difficulty: 'Hard',
          timeframe: '3 years',
          cost: 'Medium'
        },
        {
          id: 'business-programs',
          title: 'Business Programs',
          description: 'Develop business acumen and entrepreneurial skills',
          requirements: [
            'Strong Mathematics skills',
            'Good communication abilities',
            'Interest in economics',
            'Leadership potential'
          ],
          outcomes: [
            'Business school opportunities',
            'Entrepreneurship skills',
            'Management careers',
            'International business programs'
          ],
          nextSteps: [
            'Develop business projects',
            'Join business clubs',
            'Seek internship opportunities'
          ],
          difficulty: 'Medium',
          timeframe: '3 years',
          cost: 'Medium'
        },
        {
          id: 'technical-vocational',
          title: 'Technical & Vocational Education',
          description: 'Gain practical skills for immediate employment or further training',
          requirements: [
            'Hands-on learning preference',
            'Technical aptitude',
            'Problem-solving skills',
            'Practical orientation'
          ],
          outcomes: [
            'Immediate employment opportunities',
            'Technical certifications',
            'Entrepreneurship possibilities',
            'Further technical education'
          ],
          nextSteps: [
            'Choose specialized technical field',
            'Seek apprenticeship opportunities',
            'Build practical portfolio'
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
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Educational Pathway Decision Guide
          </h1>
          <p className="text-gray-400 text-lg">
            Make informed decisions about your educational journey from JHS to University
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          {pathwaySteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                index <= currentStep 
                  ? 'bg-purple-600 border-purple-600 text-white' 
                  : 'bg-gray-800 border-gray-600 text-gray-400'
              }`}>
                {index < currentStep ? <CheckCircle className="w-6 h-6" /> : index + 1}
              </div>
              {index < pathwaySteps.length - 1 && (
                <div className={`w-16 h-1 mx-2 ${
                  index < currentStep ? 'bg-purple-600' : 'bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Current Step */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentStepData.color} flex items-center justify-center text-white`}>
              {currentStepData.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{currentStepData.title}</h2>
              <p className="text-gray-400">{currentStepData.description}</p>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentStepData.options.map((option) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-gray-800/50 rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                  selectedPath === option.id 
                    ? 'border-purple-500 bg-purple-500/10' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onClick={() => setSelectedPath(selectedPath === option.id ? null : option.id)}
              >
                <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                <p className="text-gray-400 mb-4">{option.description}</p>
                
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

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Step {currentStep + 1} of {pathwaySteps.length}
            </p>
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === pathwaySteps.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors duration-300"
          >
            Next
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationalPathwayGuide;
