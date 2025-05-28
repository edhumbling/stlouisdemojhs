import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mic, FileText, Calculator, Languages, X, ArrowLeft, Users, DollarSign, Briefcase, Lightbulb, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
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
  embedStrategy?: 'iframe' | 'external' | 'smart';
  forceExternal?: boolean;
  proxyUrls?: string[];
}

const LearnHubPage: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [smartLoadingPhase, setSmartLoadingPhase] = useState<'connecting' | 'loading' | 'error' | 'success'>('connecting');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  const { setShowHeader } = useHeader();

  // Control header visibility based on whether we're viewing an individual resource
  useEffect(() => {
    if (selectedResource) {
      // Hide header when viewing individual resource
      setShowHeader(false);
    } else {
      // Show header when viewing main grid
      setShowHeader(true);
    }

    // Cleanup: ensure header is shown when component unmounts
    return () => {
      setShowHeader(true);
    };
  }, [selectedResource, setShowHeader]);

  const handleMainBack = () => {
    navigate(-1); // Go back to previous page
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
      isInternal: true
    },
    {
      id: 8,
      title: "Financial Literacy",
      description: "Learn personal finance and money management",
      url: "https://www.khanacademy.org/college-careers-more/financial-literacy",
      icon: <DollarSign className="w-5 h-5" />,
      color: "#00C896",
      embedStrategy: 'smart',
      alternativeUrls: [
        "https://www.investopedia.com/financial-literacy-4776932",
        "https://www.practicalmoneyskills.com/",
        "https://www.jumpstart.org/",
        "https://www.mymoney.gov/"
      ],
      proxyUrls: [
        "https://web.archive.org/web/20240101000000*/https://www.khanacademy.org/college-careers-more/financial-literacy"
      ]
    },
    {
      id: 9,
      title: "Business Skills Chat",
      description: "AI-powered business skills development",
      url: "https://www.nfx.com/chat",
      icon: <Briefcase className="w-5 h-5" />,
      color: "#1E40AF",
      embedStrategy: 'smart',
      alternativeUrls: [
        "https://www.coursera.org/browse/business",
        "https://www.edx.org/learn/business",
        "https://www.futurelearn.com/subjects/business-and-management-courses",
        "https://alison.com/courses/business"
      ],
      proxyUrls: [
        "https://web.archive.org/web/20240101000000*/https://www.nfx.com/chat"
      ]
    },
    {
      id: 10,
      title: "Product Creation Chat",
      description: "Learn product development and creation",
      url: "https://www.lennybot.com/",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "#F59E0B",
      embedStrategy: 'smart',
      alternativeUrls: [
        "https://www.productplan.com/learn/",
        "https://www.mindtheproduct.com/",
        "https://productschool.com/blog/"
      ]
    }
  ];

  // Smart loading simulation effect
  useEffect(() => {
    if (isLoading && selectedResource?.embedStrategy === 'smart') {
      setSmartLoadingPhase('connecting');
      setLoadingProgress(0);

      // Simulate realistic loading phases
      const phases = [
        { phase: 'connecting', duration: 1500, progress: 25 },
        { phase: 'loading', duration: 2000, progress: 75 },
        { phase: 'error', duration: 1000, progress: 100 }
      ];

      let currentPhaseIndex = 0;

      const runPhase = () => {
        if (currentPhaseIndex < phases.length) {
          const currentPhase = phases[currentPhaseIndex];
          setSmartLoadingPhase(currentPhase.phase as any);

          // Animate progress
          let progress = loadingProgress;
          const progressInterval = setInterval(() => {
            progress += 2;
            setLoadingProgress(Math.min(progress, currentPhase.progress));

            if (progress >= currentPhase.progress) {
              clearInterval(progressInterval);
              currentPhaseIndex++;

              setTimeout(() => {
                if (currentPhaseIndex < phases.length) {
                  runPhase();
                } else {
                  // Show alternatives after loading simulation
                  setIframeError(true);
                  setShowAlternatives(true);
                  setIsLoading(false);
                }
              }, currentPhase.duration);
            }
          }, 50);
        }
      };

      runPhase();
    }
  }, [isLoading, selectedResource]);

  const handleResourceClick = (resource: Resource) => {
    if (resource.isInternal) {
      navigate(resource.url);
    } else if (resource.forceExternal || resource.embedStrategy === 'external') {
      // Open directly in new tab for resources that don't embed well
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    } else if (resource.embedStrategy === 'smart') {
      // Use smart loading strategy for problematic resources
      setIsLoading(true);
      setIframeError(false);
      setCurrentUrlIndex(0);
      setShowAlternatives(false);
      setSelectedResource(resource);
    } else {
      // Try iframe first for regular resources
      setIsLoading(true);
      setIframeError(false);
      setCurrentUrlIndex(0);
      setShowAlternatives(false);
      setSelectedResource(resource);
    }
  };

  const handleBack = () => {
    setSelectedResource(null);
    setIsLoading(false);
    setIframeError(false);
    setCurrentUrlIndex(0);
    setShowAlternatives(false);
    setLoadingProgress(0);
    setSmartLoadingPhase('connecting');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setIframeError(false);
    setSmartLoadingPhase('success');
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setIframeError(true);
    setShowAlternatives(true);
  };

  const handleTryAlternative = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenOriginal = () => {
    if (selectedResource) {
      window.open(selectedResource.url, '_blank', 'noopener,noreferrer');
    }
  };

  // If a resource is selected, show the iframe view - Full page without footer
  if (selectedResource) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* Header - Enhanced Purple Back Button */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-4 sm:py-5 shadow-2xl border-b border-purple-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-purple-700/70 hover:bg-purple-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/50 hover:border-purple-400/70 flex-shrink-0 ring-2 ring-purple-500/20 hover:ring-purple-400/30"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {selectedResource.title}
              </h1>

              {/* Quick access button for smart resources */}
              {selectedResource.embedStrategy === 'smart' && (
                <button
                  onClick={handleOpenOriginal}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/80 hover:bg-blue-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm ml-auto"
                >
                  <ExternalLink size={14} />
                  <span className="hidden sm:inline">Open Original</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full h-full pt-20 sm:pt-24 relative">
          {!iframeError && selectedResource.embedStrategy !== 'smart' ? (
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

              {/* Regular Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white font-medium">Loading {selectedResource.title}...</p>
                    <p className="text-gray-300 text-sm mt-1">Please wait while we load the resource</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Smart Loading or Error State */
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
              {isLoading ? (
                /* Smart Loading Animation */
                <div className="text-center max-w-md">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {smartLoadingPhase === 'connecting' && 'Connecting to External Resource...'}
                    {smartLoadingPhase === 'loading' && 'Loading Content...'}
                    {smartLoadingPhase === 'error' && 'Connection Restricted'}
                  </h3>

                  <p className="text-gray-300 mb-4">
                    {smartLoadingPhase === 'connecting' && 'Establishing secure connection'}
                    {smartLoadingPhase === 'loading' && 'Fetching educational content'}
                    {smartLoadingPhase === 'error' && 'This resource blocks iframe embedding'}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>

                  <p className="text-sm text-gray-400">{loadingProgress}% complete</p>
                </div>
              ) : (
                /* Alternative Resources Display */
                <div className="text-center max-w-4xl">
                  <div className="mb-8">
                    <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Resource Access Alternative</h3>
                    <p className="text-gray-300 mb-6">
                      {selectedResource.title} cannot be embedded directly. Choose from these excellent alternatives:
                    </p>
                  </div>

                  {/* Alternative Resources Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {/* Original Resource */}
                    <button
                      onClick={handleOpenOriginal}
                      className="p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <ExternalLink className="w-8 h-8 mx-auto mb-3" />
                      <h4 className="font-semibold mb-2">Original Resource</h4>
                      <p className="text-sm opacity-90">Open {selectedResource.title} in new tab</p>
                    </button>

                    {/* Alternative Resources */}
                    {selectedResource.alternativeUrls?.slice(0, 5).map((url, index) => (
                      <button
                        key={index}
                        onClick={() => handleTryAlternative(url)}
                        className="p-6 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <BookOpen className="w-8 h-8 mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Alternative {index + 1}</h4>
                        <p className="text-sm opacity-90">Similar learning resource</p>
                      </button>
                    ))}
                  </div>

                  <p className="text-sm text-gray-400">
                    All resources open in new tabs for the best learning experience
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Back Button and Title Section */}
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
          {/* Resources Grid - Apple Style */}
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
                  {/* External/Smart link indicator */}
                  {(resource.forceExternal || resource.embedStrategy === 'external' || resource.embedStrategy === 'smart') && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500/80 rounded-full flex items-center justify-center">
                      <ExternalLink size={12} className="text-white" />
                    </div>
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

                  {/* Smart resource indicator */}
                  {resource.embedStrategy === 'smart' && (
                    <div className="mt-2 text-xs text-blue-400 flex items-center gap-1">
                      <AlertCircle size={12} />
                      <span>Smart Access</span>
                    </div>
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Footer Message */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-sm text-gray-300 mb-2">
              Tap any resource to access educational content
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500/80 rounded-full flex items-center justify-center">
                  <ExternalLink size={8} className="text-white" />
                </div>
                <span>External Access</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertCircle size={12} className="text-blue-400" />
                <span>Smart Access with Alternatives</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnHubPage;
