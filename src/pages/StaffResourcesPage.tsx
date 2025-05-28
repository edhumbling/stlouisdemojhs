import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ExternalLink, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';
import ShimmerLoader from '../components/common/ShimmerLoader';

const StaffResourcesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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

  const handleBack = () => {
    setSelectedResource(null);
    setIsLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openResource = (resourceId: string) => {
    setIsLoading(true);
    setSelectedResource(resourceId);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
  };

  const resources = [
    {
      id: 'nacca-ccp',
      title: 'NaCCA CCP',
      subtitle: 'All Subjects',
      description: 'Ghana\'s Common Core Programme curriculum guidelines',
      url: 'https://nacca.gov.gh/common-core-programme-ccp/',
      icon: BookOpen,
      category: 'Curriculum',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'teacher-resource-pack',
      title: 'Teacher Resource Pack',
      subtitle: 'P1-P6 Materials',
      description: 'Comprehensive teaching materials and resources for Primary 1-6',
      url: 'https://nacca.gov.gh/wp-content/uploads/2019/06/TEACHER-RESOURCE-PACK-P1-P6.pdf',
      icon: FileText,
      category: 'Teaching Materials',
      color: 'from-green-500 to-green-600'
    }
  ];

  if (selectedResource) {
    // Full-screen embedded view - No header, no footer
    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* Header - Enhanced Blue Back Button */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-4 sm:py-5 shadow-2xl border-b border-blue-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-blue-700/70 hover:bg-blue-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/50 hover:border-blue-400/70 flex-shrink-0 ring-2 ring-blue-500/20 hover:ring-blue-400/30"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {resources.find(r => r.id === selectedResource)?.title}
              </h1>

              <a
                href={resources.find(r => r.id === selectedResource)?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/80 hover:bg-blue-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm ml-auto"
              >
                <ExternalLink size={14} />
                <span className="hidden sm:inline">Open Original</span>
              </a>
            </div>
          </div>
        </div>

        {/* Content Area - Full height iframe */}
        <div className="w-full h-full pt-20 sm:pt-24 relative">
          <iframe
            ref={iframeRef}
            src={resources.find(r => r.id === selectedResource)?.url}
            className="w-full h-full border-0 relative z-10"
            title={resources.find(r => r.id === selectedResource)?.title}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            style={{ background: 'white' }}
          />

          {/* Shimmer Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 z-20">
              <ShimmerLoader
                variant="hero"
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-white mb-2">Loading {resources.find(r => r.id === selectedResource)?.title}...</h3>
                  <p className="text-gray-300 text-sm">Please wait while we load the educational resource</p>
                </div>
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
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleMainBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <div className="flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                Staff Resources
              </h1>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                Access curriculum guides, teaching materials, and educational resources
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Students Hub Style */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          {/* Resources Grid - Apple Style (Same as Students Hub) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                >
                  <button
                    onClick={() => openResource(resource.id)}
                    className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 active:scale-95 text-left relative"
                  >
                    {/* Icon */}
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 flex items-center justify-center text-white"
                      style={{
                        backgroundColor: resource.id === 'teacher-resource-pack' ? '#22c55e' : '#3b82f6' // Green-500 or Blue-500
                      }}
                    >
                      <IconComponent size={20} className="sm:w-6 sm:h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1 leading-tight">
                      {resource.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-gray-400 mb-2 font-medium">
                      {resource.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-tight">
                      {resource.description}
                    </p>

                    {/* Category Badge */}
                    <div className="mt-2">
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
                        {resource.category}
                      </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Message - Same as Students Hub */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-sm text-gray-300 mb-2">
              Tap any resource to open it within Staff Resources
            </p>
            <div className="flex items-center justify-center text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <BookOpen size={12} className="text-blue-400" />
                <span>Educational resources for teaching excellence</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffResourcesPage;
