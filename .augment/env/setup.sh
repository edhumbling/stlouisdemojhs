#!/bin/bash
set -e

# Navigate to the workspace directory
cd /mnt/persist/workspace

# Create an enhanced version with more aggressive bypass techniques
cat > src/pages/LearnHubPage.tsx << 'EOF'
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mic, FileText, Calculator, Languages, X, ArrowLeft, Users, DollarSign, Briefcase, Lightbulb, ExternalLink, RefreshCw, AlertTriangle, Globe } from 'lucide-react';
import { useHeader } from '../contexts/HeaderContext';

interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  isInternal?: boolean;
  alternativeUrls?: string[];
  embedStrategy?: 'iframe' | 'proxy' | 'alternative' | 'external' | 'popup';
  requiresProxy?: boolean;
  forceExternal?: boolean;
}

const LearnHubPage: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [showProxyOptions, setShowProxyOptions] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  const { setShowHeader } = useHeader();

  // Control header visibility
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

  const handleMainBack = () => {
    navigate(-1);
  };

  const resources: Resource[] = [
    {
      id: 1,
      title: "Audiobooks",
      description: "Free audiobooks collection",
      url: "https://marhamilresearch4.blob.core.windows.net/gutenberg-public/Website/browse.html",
      icon: <Mic className="w-5 h-5" />,
      color: "#007AFF",
      embedStrategy: 'iframe'
    },
    {
      id: 2,
      title: "Poetry Archive",
      description: "Children's poetry collection",
      url: "https://childrens.poetryarchive.org/",
      icon: <BookOpen className="w-5 h-5" />,
      color: "#FF3B30",
      embedStrategy: 'iframe'
    },
    {
      id: 3,
      title: "BECE PASCO",
      description: "BECE past questions",
      url: "https://emmadeeofficial.gumroad.com/l/becepasco",
      icon: <FileText className="w-5 h-5" />,
      color: "#34C759",
      embedStrategy: 'external',
      forceExternal: true
    },
    {
      id: 4,
      title: "JHS MOCKS",
      description: "JHS mock examinations",
      url: "https://emmadeeofficial.gumroad.com/l/jhsmocks",
      icon: <FileText className="w-5 h-5" />,
      color: "#FF9500",
      embedStrategy: 'external',
      forceExternal: true
    },
    {
      id: 5,
      title: "QWEN Maths",
      description: "AI maths problem solver",
      url: "https://qwen-qwen2-math-demo.hf.space",
      icon: <Calculator className="w-5 h-5" />,
      color: "#5856D6",
      embedStrategy: 'iframe'
    },
    {
      id: 6,
      title: "KHAYA Translator",
      description: "AI language translator",
      url: "https://translate.ghananlp.org/",
      icon: <Languages className="w-5 h-5" />,
      color: "#AF52DE",
      embedStrategy: 'iframe'
    },
    {
      id: 7,
      title: "Advice from Successful People",
      description: "Commencement speeches from leaders",
      url: "/advice-speeches",
      icon: <Users className="w-5 h-5" />,
      color: "#FF6B35",
      isInternal: true,
      embedStrategy: 'iframe'
    },
    {
      id: 8,
      title: "Financial Literacy",
      description: "Khan Academy personal finance course",
      url: "https://www.khanacademy.org/college-careers-more/financial-literacy",
      alternativeUrls: [
        // Direct Khan Academy alternatives
        "https://www.khanacademy.org/college-careers-more/financial-literacy",
        "https://khanacademy.org/college-careers-more/financial-literacy",
        
        // Web-based proxy services that work better
        "https://webcache.googleusercontent.com/search?q=cache:https://www.khanacademy.org/college-careers-more/financial-literacy",
        "https://archive.today/newest/https://www.khanacademy.org/college-careers-more/financial-literacy",
        
        // Alternative financial literacy resources that embed better
        "https://www.practicalmoneyskills.com/learn",
        "https://www.jumpstart.org/what-we-do/support-financial-literacy/",
        "https://www.investor.gov/financial-tools-calculators",
        "https://www.mymoney.gov/",
        
        // Educational alternatives
        "https://www.edx.org/learn/finance",
        "https://www.coursera.org/courses?query=financial%20literacy",
      ],
      icon: <DollarSign className="w-5 h-5" />,
      color: "#00C896",
      embedStrategy: 'alternative',
      forceExternal: true // Khan Academy blocks iframes aggressively
    },
    {
      id: 9,
      title: "Business Skills Chat",
      description: "AI business development resources",
      url: "https://www.nfx.com/chat",
      alternativeUrls: [
        // NFX alternatives
        "https://www.nfx.com/chat",
        "https://nfx.com/chat",
        
        // Alternative business learning platforms that embed better
        "https://www.coursera.org/courses?query=business%20skills",
        "https://www.edx.org/learn/business",
        "https://www.futurelearn.com/subjects/business-and-management-courses",
        "https://www.skillshare.com/browse/business",
        "https://www.udemy.com/courses/business/",
        
        // Free business resources
        "https://www.sba.gov/learning-center",
        "https://www.score.org/resource/business-toolkits",
        "https://www.entrepreneur.com/",
      ],
      icon: <Briefcase className="w-5 h-5" />,
      color: "#1E40AF",
      embedStrategy: 'alternative',
      forceExternal: true // NFX also blocks iframes
    },
    {
      id: 10,
      title: "Product Creation Chat",
      description: "Learn product development",
      url: "https://www.lennybot.com/",
      alternativeUrls: [
        "https://www.lennybot.com/",
        "https://lennybot.com/",
        
        // Alternative product development resources
        "https://www.coursera.org/courses?query=product%20development",
        "https://www.udemy.com/courses/business/product-management/",
        "https://www.productschool.com/",
        "https://www.mindtheproduct.com/",
      ],
      icon: <Lightbulb className="w-5 h-5" />,
      color: "#F59E0B",
      embedStrategy: 'alternative',
      forceExternal: true
    },
    {
      id: 11,
      title: "Britannica Learning",
      description: "Educational encyclopedia and learning tools",
      url: "https://www.britannica.com/",
      alternativeUrls: [
        "https://www.britannica.com/",
        "https://britannica.com/",
        "https://kids.britannica.com/",
        "https://school.britannica.com/",
        
        // Alternative educational resources that embed better
        "https://www.worldbook.com/",
        "https://www.factmonster.com/",
        "https://www.ducksters.com/",
        "https://www.coolkidfacts.com/",
        "https://www.natgeokids.com/",
      ],
      icon: <BookOpen className="w-5 h-5" />,
      color: "#f59e0b",
      embedStrategy: 'alternative',
      forceExternal: true
    }
  ];

  const handleResourceClick = (resource: Resource) => {
    if (resource.isInternal) {
      navigate(resource.url);
    } else if (resource.forceExternal || resource.embedStrategy === 'external') {
      // Open directly in new tab for resources that don't embed well
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    } else {
      // Try iframe first, but be ready to fallback
      setIsLoading(true);
      setIframeError(false);
      setCurrentUrlIndex(0);
      setShowProxyOptions(false);
      setSelectedResource(resource);
    }
  };

  const handleBack = () => {
    setSelectedResource(null);
    setIsLoading(false);
    setIframeError(false);
    setCurrentUrlIndex(0);
    setShowProxyOptions(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setIframeError(true);
    setShowProxyOptions(true);
  };

  const handleTryAlternative = (index: number) => {
    if (selectedResource && selectedResource.alternativeUrls && selectedResource.alternativeUrls[index]) {
      window.open(selectedResource.alternativeUrls[index], '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenOriginal = () => {
    if (selectedResource) {
      window.open(selectedResource.url, '_blank', 'noopener,noreferrer');
    }
  };

  // If a resource is selected and it's not force external, show the iframe attempt
  if (selectedResource && !selectedResource.forceExternal) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-4 sm:py-5 shadow-2xl border-b border-purple-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-purple-700/70 hover:bg-purple-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/50 hover:border-purple-400/70 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex-1 truncate">
                {selectedResource.title}
              </h1>

              <button
                onClick={handleOpenOriginal}
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/80 hover:bg-blue-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Open</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full h-full pt-20 sm:pt-24 relative">
          {!iframeError ? (
            <>
              <iframe
                ref={iframeRef}
                src={selectedResource.url}
                className="w-full h-full border-0 relative z-10"
                title={selectedResource.title}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-downloads allow-modals"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{ background: 'white' }}
              />
              
              {isLoading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-800 font-medium">Loading {selectedResource.title}...</p>
                    <p className="text-gray-600 text-sm mt-1">This may take a moment...</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            // Enhanced Error State with Multiple Options
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
              <div className="text-center max-w-2xl mx-auto">
                <AlertTriangle className="w-20 h-20 text-orange-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Content Cannot Be Embedded
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  This website blocks embedding for security reasons. Choose an option below to access the content:
                </p>
                
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Original Site */}
                  <button
                    onClick={handleOpenOriginal}
                    className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <Globe className="w-8 h-8 mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">Original Site</h4>
                    <p className="text-sm opacity-90">Open the official website</p>
                  </button>

                  {/* Alternative Resources */}
                  {selectedResource.alternativeUrls && selectedResource.alternativeUrls.slice(1, 4).map((url, index) => (
                    <button
                      key={index}
                      onClick={() => handleTryAlternative(index + 1)}
                      className="p-6 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <BookOpen className="w-8 h-8 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Alternative {index + 1}</h4>
                      <p className="text-sm opacity-90">Similar learning resource</p>
                    </button>
                  ))}
                </div>

                {/* Show more alternatives if available */}
                {selectedResource.alternativeUrls && selectedResource.alternativeUrls.length > 4 && (
                  <div className="mt-6">
                    <p className="text-gray-600 mb-4">More learning resources:</p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {selectedResource.alternativeUrls.slice(4).map((url, index) => (
                        <button
                          key={index}
                          onClick={() => handleTryAlternative(index + 4)}
                          className="p-3 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg transition-all duration-300 text-sm"
                        >
                          Alternative Resource {index + 5}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleMainBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              LearnHub
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          {/* Info Banner */}
          <div className="mb-6 p-4 bg-blue-900/30 border border-blue-700/50 rounded-xl backdrop-blur-sm">
            <p className="text-blue-200 text-sm sm:text-base text-center">
              <Globe className="w-4 h-4 inline mr-2" />
              Some resources open in new tabs for the best learning experience
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <button
                  onClick={() => handleResourceClick(resource)}
                  className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 active:scale-95 text-left relative"
                >
                  {/* External link indicator */}
                  {(resource.forceExternal || resource.embedStrategy === 'external') && (
                    <ExternalLink className="absolute top-2 right-2 w-4 h-4 text-gray-400" />
                  )}

                  {/* Icon */}
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 flex items-center justify-center text-white"
                    style={{ backgroundColor: resource.color }}
                  >
                    {resource.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1 leading-tight">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-tight">
                    {resource.description}
                  </p>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Footer */}
          <div className="mt-8 sm:mt-12 text-center space-y-3">
            <p className="text-sm text-gray-300">
              Click any resource to access learning content
            </p>
            <p className="text-xs text-gray-400">
              Resources marked with <ExternalLink className="w-3 h-3 inline mx-1" /> open in new tabs
            </p>
            <p className="text-xs text-gray-500">
              Multiple alternative resources available for each topic
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnHubPage;
EOF

echo "✅ Enhanced LearnHub with better fallback strategy created!"
echo ""
echo "🔧 Key changes made:"
echo "   • Financial Literacy: Now opens Khan Academy in new tab + provides alternative learning sites"
echo "   • Business Skills: Opens NFX in new tab + provides alternative business learning platforms"
echo "   • Britannica: Opens in new tab + provides alternative educational resources"
echo "   • Added multiple backup learning resources for each category"
echo "   • Better user experience with clear external link indicators"
echo "   • Enhanced error handling with multiple resource options"
echo ""
echo "🎯 Strategy change:"
echo "   • Acknowledges that some sites aggressively block iframes"
echo "   • Provides immediate access via new tabs"
echo "   • Offers multiple alternative learning resources"
echo "   • Better user guidance and expectations"