import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Mic, FileText, Calculator, Languages, X, ArrowLeft, Users } from 'lucide-react';
import { useHeader } from '../contexts/HeaderContext';

const LearnHubPage: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const resources = [
    {
      id: 1,
      title: "Audiobooks",
      description: "Free audiobooks collection",
      url: "https://marhamilresearch4.blob.core.windows.net/gutenberg-public/Website/browse.html",
      icon: <Mic className="w-5 h-5" />,
      color: "#007AFF"
    },
    {
      id: 2,
      title: "Poetry Archive",
      description: "Children's poetry collection",
      url: "https://childrens.poetryarchive.org/",
      icon: <BookOpen className="w-5 h-5" />,
      color: "#FF3B30"
    },
    {
      id: 3,
      title: "BECE PASCO",
      description: "BECE past questions",
      url: "https://emmadeeofficial.gumroad.com/l/becepasco",
      icon: <FileText className="w-5 h-5" />,
      color: "#34C759"
    },
    {
      id: 4,
      title: "JHS MOCKS",
      description: "JHS mock examinations",
      url: "https://emmadeeofficial.gumroad.com/l/jhsmocks",
      icon: <FileText className="w-5 h-5" />,
      color: "#FF9500"
    },
    {
      id: 5,
      title: "QWEN Maths",
      description: "AI maths problem solver",
      url: "https://qwen-qwen2-math-demo.hf.space",
      icon: <Calculator className="w-5 h-5" />,
      color: "#5856D6"
    },
    {
      id: 6,
      title: "KHAYA Translator",
      description: "AI language translator",
      url: "https://translate.ghananlp.org/",
      icon: <Languages className="w-5 h-5" />,
      color: "#AF52DE"
    },
    {
      id: 7,
      title: "Advice from Successful People",
      description: "Commencement speeches from leaders",
      url: "/advice-speeches",
      icon: <Users className="w-5 h-5" />,
      color: "#FF6B35",
      isInternal: true
    }
  ];

  const handleResourceClick = (resource: any) => {
    if (resource.isInternal) {
      // Navigate to internal route
      navigate(resource.url);
    } else {
      setIsLoading(true);
      setSelectedResource(resource);
      // Loading will be hidden when iframe loads
    }
  };

  const handleBack = () => {
    setSelectedResource(null);
    setIsLoading(false);
    // Scroll to top when returning to main page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
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
            </div>
          </div>
        </div>

        {/* Full viewport iframe - No footer */}
        <div className="w-full h-full pt-20 sm:pt-24 relative">
          <iframe
            src={selectedResource.url}
            className="w-full h-full border-0 relative z-10"
            title={selectedResource.title}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
            onLoad={handleIframeLoad}
          />

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white font-medium">Loading {selectedResource.title}...</p>
                <p className="text-gray-300 text-sm mt-1">Please wait while we load the resource</p>
              </div>
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
                  className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 active:scale-95 text-left"
                >
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

          {/* Simple Footer Message */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-sm text-gray-300">
              Tap any resource to open it within LearnHub
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnHubPage;
