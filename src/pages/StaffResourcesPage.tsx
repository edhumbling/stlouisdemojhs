import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ExternalLink, Bot, Globe, DollarSign, GraduationCap, Zap } from 'lucide-react';
import FileBarChart from 'lucide-react/dist/esm/icons/file-bar-chart';
import Brain from 'lucide-react/dist/esm/icons/brain';
import Eye from 'lucide-react/dist/esm/icons/eye';
import ScanText from 'lucide-react/dist/esm/icons/scan-text';
import Search from 'lucide-react/dist/esm/icons/search';
import PenTool from 'lucide-react/dist/esm/icons/pen-tool';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';
import ShimmerLoader from '../components/common/ShimmerLoader';
import SmartSearchBar, { SearchableItem, FilterOption } from '../components/common/SmartSearchBar';
import getSymbolFromCurrency from 'currency-symbol-map';

interface Resource {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  icon: any;
  color: string;
  openInNewTab?: boolean;
  customTitle?: () => React.ReactNode;
}

interface ResourceCategories {
  [key: string]: Resource[];
}

const StaffResourcesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [autoRedirectTimer, setAutoRedirectTimer] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
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
    setIframeError(false);
    setShowAlternatives(false);
    // Clear auto-redirect timer
    if (autoRedirectTimer) {
      clearTimeout(autoRedirectTimer);
      setAutoRedirectTimer(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openResource = (resourceId: string) => {
    // Handle internal routes
    if (resourceId === 'leveraging-ai-teaching') {
      navigate('/ai-teaching-guide');
      return;
    }

    // Find the resource to check if it should open in new tab
    const resource = resources.find(r => r.id === resourceId);

    // Handle resources that should open in new tab
    if (resource?.openInNewTab) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
      return;
    }

    setIsLoading(true);
    setIframeError(false);
    setShowAlternatives(false);
    setSelectedResource(resourceId);

    // Simulate connection timeout for certain resources (like AI tools)
    const timer = setTimeout(() => {
      if (resourceId === 'khamingo') {
        console.log('Simulating connection timeout for Khamingo');
        setIsLoading(false);
        setIframeError(true);
        setShowAlternatives(true);

        // Auto-redirect to browser after showing error
        if (resource) {
          setTimeout(() => {
            window.open(resource.url, '_blank', 'noopener,noreferrer');
            // Go back to main page after opening
            setTimeout(() => {
              setSelectedResource(null);
              setIframeError(false);
              setShowAlternatives(false);
            }, 500);
          }, 1500); // Wait 1.5 seconds to show the error message
        }
      }
    }, 2000);

    setAutoRedirectTimer(timer);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setIframeError(false);
    // Clear auto-redirect timer since iframe loaded successfully
    if (autoRedirectTimer) {
      clearTimeout(autoRedirectTimer);
      setAutoRedirectTimer(null);
    }
  };

  const handleIframeError = () => {
    console.log('Iframe error detected');
    setIsLoading(false);
    setIframeError(true);
    setShowAlternatives(true);

    // Clear auto-redirect timer
    if (autoRedirectTimer) {
      clearTimeout(autoRedirectTimer);
      setAutoRedirectTimer(null);
    }

    // Auto-redirect immediately when iframe fails
    const resource = resources.find(r => r.id === selectedResource);
    if (resource) {
      console.log(`Auto-redirecting ${resource.title} to browser due to iframe error`);
      setTimeout(() => {
        window.open(resource.url, '_blank', 'noopener,noreferrer');
        // Go back to main page after opening
        setTimeout(() => {
          setSelectedResource(null);
          setIframeError(false);
          setShowAlternatives(false);
        }, 500);
      }, 1500); // Wait 1.5 seconds to show the error message
    }
  };

  const handleOpenInBrowser = () => {
    const resource = resources.find(r => r.id === selectedResource);
    if (resource) {
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    }
  };

  // 🎯 CATEGORIZED STAFF RESOURCES 🎯
  // Organized by professional areas for better navigation and discovery
  const resourceCategories: ResourceCategories = {
    "📚 Curriculum & Assessment": [
      {
        id: 'nacca-ccp',
        title: 'NaCCA CCP',
        subtitle: 'All Subjects',
        description: 'Ghana\'s Common Core Programme curriculum guidelines',
        url: 'https://nacca.gov.gh/common-core-programme-ccp/',
        icon: BookOpen,
        color: 'from-blue-500 to-blue-600'
      },
      {
        id: 'chief-examiners-reports',
        title: 'Chief Examiners Reports',
        subtitle: 'WAEC Ghana',
        description: 'Official examination reports and analysis from WAEC Ghana',
        url: 'https://waecgh.org/chief-examiners-report/',
        icon: FileBarChart,
        color: 'from-orange-500 to-orange-600'
      }
    ],
    "🤖 AI Teaching Tools": [
      {
        id: 'khamingo',
        title: 'Khamingo',
        subtitle: 'AI Teaching Assistant',
        description: 'Khan Academy\'s AI-powered teaching assistant for educators',
        url: 'https://www.khanmigo.ai/teachers',
        icon: Bot,
        color: 'from-purple-500 to-purple-600',
        openInNewTab: true
      },
      {
        id: 'visual-teaching-aid',
        title: 'Visual Teaching Aid Tool',
        subtitle: 'AI-Powered Visual Generator',
        description: 'Create visual aids, diagrams, and educational images with advanced AI',
        url: 'https://huggingface.co/spaces/deepseek-ai/Janus-Pro-7B',
        icon: Eye,
        color: 'from-indigo-500 to-indigo-600',
        openInNewTab: true
      },
      {
        id: 'teachers-agent',
        title: 'Teacher\'s Agent',
        subtitle: 'Comprehensive AI Assistant',
        description: 'Advanced AI agent to answer questions, solve problems, and assist with all teaching tasks',
        url: 'https://demo.exa.ai/answer',
        icon: Zap,
        color: 'from-amber-500 to-amber-600'
      }
    ],
    "🎓 Professional Development": [
      {
        id: 'leveraging-ai-teaching',
        title: 'Leveraging AI in Teaching',
        subtitle: 'Comprehensive Guide',
        description: 'Complete guide to integrating AI tools in African classrooms',
        url: '/ai-teaching-guide',
        icon: Brain,
        color: 'from-emerald-500 to-emerald-600'
      },
      {
        id: 'teachers-personal-tutor',
        title: 'Teacher\'s Personal Tutor',
        subtitle: 'AI Learning Assistant',
        description: 'Personal AI tutor to help teachers learn new concepts and enhance their knowledge',
        url: 'https://llamatutor.together.ai/',
        icon: GraduationCap,
        color: 'from-teal-500 to-teal-600'
      }
    ],
    "📝 Content Creation & Research": [
      {
        id: 'teachers-writing-assistant',
        title: 'Teacher\'s Writing Assistant',
        subtitle: 'AI Content Creator',
        description: 'AI-powered writing tool to create lesson plans, educational content, and teaching materials',
        url: 'https://demo.exa.ai/writing',
        icon: PenTool,
        color: 'from-rose-500 to-rose-600'
      },
      {
        id: 'teachers-ai-researcher',
        title: 'Teacher\'s AI Researcher',
        subtitle: 'Intelligent Research Assistant',
        description: 'AI-powered research tool to find reliable sources and information for lesson planning',
        url: 'https://chat.exa.ai/',
        icon: Search,
        color: 'from-violet-500 to-violet-600'
      }
    ],
    "⚡ Productivity Tools": [
      {
        id: 'paper-to-text-notes',
        title: 'Paper to Text Notes',
        subtitle: 'OCR Document Scanner',
        description: 'Convert handwritten notes and documents to digital text with AI-powered OCR',
        url: 'https://llamaocr.com/',
        icon: ScanText,
        color: 'from-cyan-500 to-cyan-600'
      }
    ]
  };

  // Flatten all resources for backward compatibility
  const resources = Object.values(resourceCategories).flat();

  // Convert resources to searchable items
  const searchableItems: SearchableItem[] = useMemo(() => {
    return resources.map(resource => ({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      category: Object.keys(resourceCategories).find(categoryName =>
        resourceCategories[categoryName].some(r => r.id === resource.id)
      ) || 'Other',
      type: resource.openInNewTab ? 'external' : 'internal',
      url: resource.url
    }));
  }, [resources]);

  // Filter options for search
  const categoryOptions: FilterOption[] = useMemo(() => {
    return Object.keys(resourceCategories).map(categoryName => ({
      value: categoryName,
      label: categoryName,
      count: resourceCategories[categoryName].length
    }));
  }, []);

  const typeOptions: FilterOption[] = [
    { value: 'external', label: 'External Tools', count: resources.filter(r => (r as any).openInNewTab).length },
    { value: 'internal', label: 'Internal Resources', count: resources.filter(r => !(r as any).openInNewTab).length }
  ];

  // Handle search results
  const handleSearchResults = useCallback((results: SearchableItem[]) => {
    setSearchResults(results);
  }, []);

  // Get filtered categories based on search results
  const filteredCategories = useMemo(() => {
    if (searchResults.length === 0) {
      return resourceCategories;
    }

    // Group search results by category
    const filtered: Record<string, any[]> = {};

    searchResults.forEach(item => {
      const categoryName = item.category;
      if (!filtered[categoryName]) {
        filtered[categoryName] = [];
      }

      // Find the original resource
      const originalResource = resources.find(r => r.id === item.id);
      if (originalResource) {
        filtered[categoryName].push(originalResource);
      }
    });

    return filtered;
  }, [searchResults, resources]);

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

              <button
                onClick={handleOpenInBrowser}
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/80 hover:bg-blue-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm ml-auto"
              >
                <Globe size={14} />
                <span className="hidden sm:inline">Open in Browser</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area - Full height iframe */}
        <div className="w-full h-full pt-20 sm:pt-24 relative">
          {!iframeError ? (
            <>
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
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center z-20">
                  <div className="text-center max-w-md px-6">
                    {/* Shimmer Logo Placeholder */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-xl shimmer-dark"></div>

                    {/* Shimmer Text Lines */}
                    <div className="space-y-3 mb-6">
                      <div className="h-6 w-48 mx-auto rounded shimmer-dark"></div>
                      <div className="h-4 w-64 mx-auto rounded shimmer-dark"></div>
                      <div className="h-4 w-56 mx-auto rounded shimmer-dark"></div>
                    </div>

                    {/* Loading Spinner */}
                    <div className="w-8 h-8 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>

                    {/* Loading Text */}
                    <p className="text-white font-medium text-lg">Loading {resources.find(r => r.id === selectedResource)?.title}...</p>
                    <p className="text-gray-300 text-sm mt-2">Preparing your educational resource</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Error State - Show alternatives */
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Opening {resources.find(r => r.id === selectedResource)?.title}</h3>
                  <p className="text-gray-300 mb-4">
                    {resources.find(r => r.id === selectedResource)?.title} requires opening in a new browser tab for the best experience.
                  </p>
                  <p className="text-blue-400 mb-6 font-medium">
                    🚀 Opening in browser now...
                  </p>
                </div>

                {/* Open in Browser Button */}
                <div className="space-y-4">
                  <button
                    onClick={handleOpenInBrowser}
                    className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <Globe className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-semibold">Open {resources.find(r => r.id === selectedResource)?.title}</div>
                      <div className="text-sm opacity-90">Launch in new browser tab</div>
                    </div>
                  </button>

                  <p className="text-sm text-gray-400">
                    This will open {resources.find(r => r.id === selectedResource)?.title} in a new tab where you can use all its features without restrictions.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
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

      {/* Main Content - Categorized Resources */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {/* Introduction */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl mb-4 shadow-2xl">
              <BookOpen size={32} className="text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Professional Teaching Resources
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover {resources.length}+ carefully curated teaching tools, curriculum guides, and AI-powered resources for educational excellence.
            </p>
          </div>

          {/* Smart Search Bar */}
          <div className="mb-8">
            <SmartSearchBar
              items={searchableItems}
              onSearchResults={handleSearchResults}
              placeholder={`Search ${resources.length}+ teaching resources...`}
              accentColor="blue"
              categories={categoryOptions}
              types={typeOptions}
              enableIntentDetection={true}
              className="mb-6"
            />
          </div>

          {/* E-Payslip Button */}
          <div className="mb-8 flex justify-center gap-2 sm:gap-4">
            <button
              onClick={() => window.open('https://www.gogpayslip.com/index.php?action=login', '_blank', 'noopener,noreferrer')}
              className="bg-green-600/90 backdrop-blur-md rounded-xl px-3 sm:px-6 py-2 sm:py-3 text-white font-bold shadow-xl hover:bg-green-700/90 transition-all duration-300 border border-white/30 text-sm sm:text-lg flex items-center gap-2"
              style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #16a34a)' }}
            >
              <span className="text-lg">₵</span>
              Access E-PaySlip
            </button>
          </div>

          {/* Categorized Resources */}
          <div className="space-y-8">
            {Object.entries(filteredCategories).map(([categoryName, categoryResources], categoryIndex) => (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {categoryName}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                  <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                    {categoryResources.length} {categoryResources.length === 1 ? 'tool' : 'tools'}
                  </span>
                </div>

                {/* Category Resources Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {categoryResources.map((resource, index) => {
                    const IconComponent = resource.icon;
                    return (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                        className="group"
                      >
                        <button
                          onClick={() => openResource(resource.id)}
                          className="w-full h-[200px] bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:bg-gray-700/60 active:scale-[0.98] text-left relative overflow-hidden group flex flex-col"
                        >
                          {/* Background Gradient */}
                          <div
                            className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(135deg, ${resource.color.replace('from-', '').replace('to-', '')}20 0%, transparent 50%)`
                            }}
                          />

                          {/* Status Indicators */}
                          <div className="absolute top-3 right-3 flex gap-1">
                            {resource.openInNewTab && (
                              <div className="w-5 h-5 bg-green-500/80 rounded-full flex items-center justify-center">
                                <ExternalLink size={12} className="text-white" />
                              </div>
                            )}
                          </div>

                          {/* Icon Container */}
                          <div className="relative mb-3 flex-shrink-0 flex justify-center">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${resource.color}`}>
                              <IconComponent size={32} />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col space-y-1 overflow-hidden">
                            {/* Title */}
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg truncate" title={resource.customTitle ? resource.customTitle() : resource.title}>
                              {resource.customTitle ? resource.customTitle() : resource.title}
                            </h3>
                            {/* Subtitle */}
                            {resource.subtitle && (
                              <p className="text-xs text-gray-600 truncate" title={resource.subtitle}>{resource.subtitle}</p>
                            )}
                            {/* Description */}
                            <p className="text-xs text-gray-400 leading-relaxed break-words flex-1">
                              {resource.description}
                            </p>
                            {/* Action Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-700/30 mt-auto">
                              <div className="flex items-center gap-1">
                                <span className="text-xs text-blue-400 font-medium">
                                  {resource.openInNewTab ? 'External Tool' : 'Internal Resource'}
                                </span>
                              </div>
                              <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                                <ExternalLink size={10} className="text-blue-400 group-hover:text-blue-300" />
                              </div>
                            </div>
                          </div>

                          {/* Hover Effect Overlay */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
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
