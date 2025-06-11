import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, BookOpen, Globe, DollarSign, Users, Target, Award, Briefcase, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';
import useEnhancedNavigation from '../hooks/useEnhancedNavigation';
import SEOHead from '../components/seo/SEOHead';

interface ScholarshipItem {
  name: string;
  description: string;
  website: string;
  embedStrategy?: 'iframe' | 'external' | 'smart';
  sandbox?: string;
}

interface Section {
  title: string;
  content: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  borderColor: string;
  hoverBorderColor: string;
  shadowColor: string;
  items: ScholarshipItem[];
}

const ScholarshipOpportunitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { setShowHeader } = useHeader();
  const { handleInternalStateChange, savePageState } = useEnhancedNavigation();
  const [selectedResource, setSelectedResource] = useState<ScholarshipItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const scholarshipData: Section[] = [
    {
      title: "Academic Success",
      content: "Resources and tools to help you excel in your studies",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "#FF6B35",
      gradient: "from-orange-500/20 to-orange-600/20",
      borderColor: "border-orange-500/30",
      hoverBorderColor: "hover:border-orange-500/50",
      shadowColor: "hover:shadow-orange-500/20",
      items: [
        {
          name: "Khan Academy",
          description: "Free online courses and practice exercises",
          website: "https://www.khanacademy.org",
          embedStrategy: 'iframe' as const,
          sandbox: "allow-same-origin allow-scripts allow-popups allow-forms"
        },
        {
          name: "AFEX Hub",
          description: "Professional SAT preparation and college application support with proven track record",
          website: "http://www.afextestprep.com",
          embedStrategy: 'iframe'
        },
        {
          name: "YAfGhana",
          description: "Provides free SAT training and scholarship opportunities for Ghanaian students",
          website: "https://yafghana.org",
          embedStrategy: 'iframe'
        },
        {
          name: "EducationUSA Ghana",
          description: "U.S. Department of State's official source for U.S. higher education",
          website: "https://gh.usembassy.gov/education-culture/educationusa/",
          embedStrategy: 'iframe'
        },
        {
          name: "Veritas Foundation",
          description: "Professional SAT preparation and college counseling services",
          website: "https://theveritasfoundation.co",
          embedStrategy: 'iframe'
        },
        {
          name: "College Board Ghana",
          description: "Official SAT testing and preparation resources",
          website: "https://www.collegeboard.org",
          embedStrategy: 'iframe'
        },
        {
          name: "Khan Academy SAT Prep",
          description: "Free official SAT practice tests and personalized study plans",
          website: "https://www.khanacademy.org/sat",
          embedStrategy: 'iframe'
        }
      ]
    },
    {
      title: "Local Scholarship Opportunities",
      content: "Ghanaian universities and organizations offering scholarships for tertiary education:",
      icon: <Award className="w-6 h-6" />,
      color: "#2196F3",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      hoverBorderColor: "hover:border-blue-500/50",
      shadowColor: "shadow-blue-500/10",
      items: [
        {
          name: "Ghana Scholarship Secretariat",
          description: "Government scholarships for tertiary education",
          website: "https://scholarshipgh.com",
          embedStrategy: 'iframe'
        },
        {
          name: "Mastercard Foundation Scholars Program",
          description: "Full scholarships at partner universities in Ghana",
          website: "https://mastercardfdn.org/scholars",
          embedStrategy: 'iframe'
        },
        {
          name: "KNUST Scholarship Portal",
          description: "Various scholarships available at Kwame Nkrumah University of Science and Technology",
          website: "https://apps.knust.edu.gh/admissions",
          embedStrategy: 'iframe'
        },
        {
          name: "University of Ghana Financial Aid",
          description: "Scholarships and financial support for UG students",
          website: "https://www.ug.edu.gh/students/financial-aid",
          embedStrategy: 'iframe'
        },
        {
          name: "Ashesi University Scholarships",
          description: "Merit-based and need-based scholarships for undergraduate studies",
          website: "https://www.ashesi.edu.gh/admissions/scholarships.html",
          embedStrategy: 'iframe'
        },
        {
          name: "Ghana Education Trust Fund (GETFund)",
          description: "Government scholarship fund for tertiary education",
          website: "https://getfund.gov.gh",
          embedStrategy: 'iframe'
        },
        {
          name: "Ghana National Petroleum Corporation (GNPC) Foundation",
          description: "Scholarships for students in STEM fields",
          website: "https://gnpcfoundation.org",
          embedStrategy: 'iframe'
        },
        {
          name: "Vodafone Ghana Foundation",
          description: "Scholarships and educational support programs",
          website: "https://www.vodafone.com.gh/foundation",
          embedStrategy: 'iframe'
        },
        {
          name: "MTN Foundation",
          description: "Educational scholarships and support initiatives",
          website: "https://www.mtn.com.gh/mtn-foundation",
          embedStrategy: 'iframe'
        },
        {
          name: "Ghana Cocoa Board (COCOBOD) Scholarships",
          description: "Scholarships for children of cocoa farmers",
          website: "https://cocobod.gh",
          embedStrategy: 'iframe'
        },
        {
          name: "Dream Hive Scholarship",
          description: "A Hive of Dreams, A Buzz of Success",
          website: "https://dhscholarship.org",
          embedStrategy: 'iframe'
        }
      ]
    },
    {
      title: "International Opportunities",
      content: "Global scholarship programs available to Ghanaian students:",
      icon: <Globe className="w-6 h-6" />,
      color: "#9C27B0",
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      hoverBorderColor: "hover:border-purple-500/50",
      shadowColor: "shadow-purple-500/10",
      items: [
        {
          name: "Commonwealth Scholarships",
          description: "UK government scholarships for Commonwealth citizens",
          website: "https://cscuk.fcdo.gov.uk",
          embedStrategy: 'iframe'
        },
        {
          name: "DAAD Scholarships",
          description: "German Academic Exchange Service scholarships",
          website: "https://www.daad.de/en",
          embedStrategy: 'iframe'
        },
        {
          name: "Chevening Scholarships",
          description: "UK government's global scholarship programme",
          website: "https://www.chevening.org",
          embedStrategy: 'iframe'
        },
        {
          name: "Fulbright Program",
          description: "US government's international educational exchange program",
          website: "https://gh.usembassy.gov/fulbright",
          embedStrategy: 'iframe'
        },
        {
          name: "Erasmus+ Program",
          description: "EU scholarships for study and training in Europe",
          website: "https://erasmus-plus.ec.europa.eu",
          embedStrategy: 'iframe'
        },
        {
          name: "Australia Awards",
          description: "Australian government scholarships for international students",
          website: "https://www.dfat.gov.au/people-to-people/australia-awards",
          embedStrategy: 'iframe'
        },
        {
          name: "Chinese Government Scholarships",
          description: "Full and partial scholarships for study in China",
          website: "https://www.campuschina.org",
          embedStrategy: 'iframe'
        },
        {
          name: "Japanese Government (MEXT) Scholarships",
          description: "Scholarships for international students in Japan",
          website: "https://www.studyinjapan.go.jp/en",
          embedStrategy: 'iframe'
        },
        {
          name: "Korean Government Scholarship Program",
          description: "Full scholarships for undergraduate and graduate studies in Korea",
          website: "https://www.studyinkorea.go.kr",
          embedStrategy: 'iframe'
        },
        {
          name: "Rotary Foundation Global Grants",
          description: "International scholarships for graduate-level studies",
          website: "https://www.rotary.org/en/our-programs/scholarships",
          embedStrategy: 'iframe'
        }
      ]
    }
  ];

  useEffect(() => {
    if (selectedResource) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    return () => {
      setShowHeader(true);
    };
  }, [selectedResource, setShowHeader]);

  const handleBack = () => {
    if (selectedResource) {
      handleInternalStateChange(() => {
        setSelectedResource(null);
        setIsLoading(false);
        setIframeError(false);
        setShowHeader(true);
      });
    } else {
      navigate('/students-hub');
    }
  };

  const handleResourceClick = (item: ScholarshipItem) => {
    if (item.embedStrategy === 'iframe') {
      setIsLoading(true);
      setIframeError(false);
      savePageState();
      setSelectedResource(item);
      setShowHeader(false);
    } else {
      window.open(item.website, '_blank', 'noopener,noreferrer');
    }
  };

  // If a resource is selected, show the embedded view
  if (selectedResource) {
    return (
      <div className="min-h-screen bg-black">
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
                  {selectedResource.name}
                </h1>
                <p className="text-sm text-purple-200 truncate">
                  {selectedResource.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Screen Resource Container */}
        <div className="w-full h-[calc(100vh-80px)]">
          {selectedResource.embedStrategy === 'iframe' ? (
            <iframe
              src={selectedResource.website}
              className="w-full h-full border-none"
              sandbox={selectedResource.sandbox || "allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation"}
              title={selectedResource.name}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
              <p>Loading resource...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

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
          {scholarshipData.map((section, index) => (
            <section key={index} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg backdrop-blur-md bg-gradient-to-br ${section.gradient} border ${section.borderColor}`}
                >
                  {section.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {section.title}
                </h2>
              </div>
              <p className="text-silver-300 mb-6">
                {section.content}
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {section.items?.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                  >
                    <button
                      onClick={() => handleResourceClick(item)}
                      className={`block w-full h-[180px] bg-gradient-to-br ${section.gradient} backdrop-blur-xl rounded-3xl p-3 sm:p-4 border ${section.borderColor} ${section.hoverBorderColor} transition-all duration-300 hover:shadow-2xl ${section.shadowColor} text-left relative overflow-hidden group flex flex-col`}
                    >
                      {/* Background Gradient */}
                      <div
                        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${section.color}40 0%, transparent 50%)`
                        }}
                      />
                      {/* Content */}
                      <div className="flex-1">
                        {/* Title */}
                        <h3 className="text-sm font-bold text-white leading-tight group-hover:text-white/90 transition-colors duration-300 line-clamp-2">
                          {item.name}
                        </h3>
                        {/* Description */}
                        <p className="text-xs text-gray-200 leading-relaxed line-clamp-3 flex-1 mt-2">
                          {item.description}
                        </p>
                      </div>
                      {/* Action Footer */}
                      <div className={`flex items-center justify-between pt-2 border-t ${section.borderColor} mt-auto`}>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-white/80 font-medium">
                            Visit Website
                          </span>
                        </div>
                        <div className={`w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300`}>
                          <ExternalLink size={10} className="text-white/80 group-hover:text-white" />
                        </div>
                      </div>
                      {/* Hover Effect Overlay */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ScholarshipOpportunitiesPage; 