import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, ExternalLink, Play, Users, Target, Briefcase, Pen, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';
import ShimmerLoader from '../components/common/ShimmerLoader';
import SmartSearchBar, { SearchableItem, FilterOption } from '../components/common/SmartSearchBar';
import SEOHead from '../components/seo/SEOHead';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'tool';
  url: string;
  category: string;
  icon: React.ReactNode;
  color: string;
}

const CareerReelResourcesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const { setShowHeader } = useHeader();

  const handleBack = () => {
    navigate('/students-hub', {
      state: {
        scrollToSection: '🎓 Educational Resources',
        returnFromCardContent: true
      }
    });
  };

  const handleResourceBack = () => {
    setSelectedResource(null);
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  // Prevent body scroll when viewer is open
  useEffect(() => {
    if (selectedResource) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedResource]);

  // Extracted resources from thecareerreel.com/resources/
  const resourceCategories = {
    "📊 Job Tracking Tools": [
      {
        id: 'job-tracking-sheet',
        title: 'Blank Job Tracking Sheet',
        description: 'Stay organized during your job hunt with this comprehensive tracking spreadsheet.',
        type: 'tool' as const,
        url: 'https://bit.ly/4fMTdVl',
        category: 'Organization',
        icon: <Target className="w-6 h-6" />,
        color: '#059669'
      },
      {
        id: 'event-tracking-sheet',
        title: 'Blank Event Tracking Sheet',
        description: 'Track career events, job fairs, and networking opportunities effectively.',
        type: 'tool' as const,
        url: 'https://bit.ly/TCREventTracker',
        category: 'Organization',
        icon: <Target className="w-6 h-6" />,
        color: '#0EA5E9'
      },
      {
        id: 'referral-tracking-sheet',
        title: 'Blank Referral Tracking Sheet',
        description: 'Manage your professional referrals and networking connections.',
        type: 'tool' as const,
        url: 'https://bit.ly/TCRReferralTracker',
        category: 'Networking',
        icon: <Users className="w-6 h-6" />,
        color: '#8B5CF6'
      },
      {
        id: 'company-list-sheet',
        title: 'Pre-Populated Company List Sheet',
        description: 'Ready-to-use list of companies for your job search targeting.',
        type: 'tool' as const,
        url: 'https://bit.ly/TCRCompanyLists',
        category: 'Research',
        icon: <Briefcase className="w-6 h-6" />,
        color: '#F59E0B'
      },
      {
        id: 'mega-hiring-sheet',
        title: 'Mega Pre-populated Hiring Season Sheet',
        description: 'Comprehensive hiring season tracker with pre-populated data.',
        type: 'tool' as const,
        url: 'https://bit.ly/TCRMegaList',
        category: 'Organization',
        icon: <Target className="w-6 h-6" />,
        color: '#EF4444'
      }
    ],
    "📝 Resume & Cover Letter": [
      {
        id: 'resume-writing-article',
        title: 'Resume Writing Article',
        description: 'Seven resume mistakes that might be hurting your software engineering job hunt.',
        type: 'tool' as const,
        url: 'https://beyondthebytes.medium.com/seven-resume-mistakes-that-might-be-hurting-your-software-engineering-job-hunt-1e5f26e55ead',
        category: 'Career Guidance',
        icon: <FileText className="w-6 h-6" />,
        color: '#6366F1'
      },
      {
        id: 'cover-letter-creator',
        title: 'Free Cover Letter Creator',
        description: 'Create professional cover letters with this easy-to-use online tool.',
        type: 'tool' as const,
        url: 'https://app.flowcv.com/cover-letter/',
        category: 'Writing Tools',
        icon: <FileText className="w-6 h-6" />,
        color: '#10B981'
      },
      {
        id: 'resume-video',
        title: 'Follow-Along Resume Video',
        description: 'Step-by-step video guide for creating an effective resume.',
        type: 'video' as const,
        url: 'https://youtu.be/oAckpNuJDds?si=R0aKrkvbUcPaxhM-',
        category: 'Video Tutorial',
        icon: <Play className="w-6 h-6" />,
        color: '#EF4444'
      },
      {
        id: 'resume-presentation',
        title: 'Resume Writing Presentation',
        description: 'Comprehensive presentation on resume writing best practices and techniques.',
        type: 'pdf' as const,
        url: 'https://thecareerreel.com/wp-content/uploads/2024/08/Resume-Writing.pdf',
        category: 'Career Guidance',
        icon: <FileText className="w-6 h-6" />,
        color: '#3B82F6'
      },
      {
        id: 'resume-builder-flowcv',
        title: 'Free Resume Builder - ATS Friendly',
        description: 'Build professional, ATS-friendly resumes with FlowCV.',
        type: 'tool' as const,
        url: 'https://flowcv.com/',
        category: 'Resume Tools',
        icon: <FileText className="w-6 h-6" />,
        color: '#7C3AED'
      }
    ],
    "🛠️ Career Tools": [
      {
        id: 'resume-builder-simplify',
        title: 'Resume Builder',
        description: 'Professional resume builder with modern templates and ATS optimization.',
        type: 'tool' as const,
        url: 'https://simplify.jobs/resume-builder',
        category: 'Resume Tools',
        icon: <FileText className="w-6 h-6" />,
        color: '#059669'
      },
      {
        id: 'job-application-tracker',
        title: 'Job Application Tracker',
        description: 'Track your job applications and follow up on opportunities.',
        type: 'tool' as const,
        url: 'https://simplify.jobs/job-application-tracker',
        category: 'Organization',
        icon: <Target className="w-6 h-6" />,
        color: '#0EA5E9'
      },
      {
        id: 'job-auto-filler',
        title: 'Job Application Auto-Filler',
        description: 'Automate job application forms with Simplify Copilot.',
        type: 'tool' as const,
        url: 'https://simplify.jobs/copilot',
        category: 'Automation',
        icon: <Target className="w-6 h-6" />,
        color: '#8B5CF6'
      },
      {
        id: 'website-builder',
        title: 'Free Simple Personal Website Builder',
        description: 'Create a professional personal website to showcase your portfolio.',
        type: 'tool' as const,
        url: 'https://app.flowcv.com/website/',
        category: 'Portfolio',
        icon: <ExternalLink className="w-6 h-6" />,
        color: '#F59E0B'
      }
    ]
  };

  // Flatten all resources for easy access
  const allResources: Resource[] = Object.values(resourceCategories).flat();

  // Convert resources to searchable items
  const searchableItems: SearchableItem[] = useMemo(() => {
    return allResources.map(resource => ({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      category: Object.keys(resourceCategories).find(categoryName =>
        resourceCategories[categoryName].some(r => r.id === resource.id)
      ) || 'Other',
      type: resource.type,
      url: resource.url,
      ...resource
    }));
  }, [allResources]);

  // Filter options for search
  const categoryOptions: FilterOption[] = useMemo(() => {
    return Object.keys(resourceCategories).map(categoryName => ({
      value: categoryName,
      label: categoryName,
      count: resourceCategories[categoryName].length
    }));
  }, []);

  const typeOptions: FilterOption[] = [
    { value: 'tool', label: 'Tools', count: allResources.filter(r => r.type === 'tool').length },
    { value: 'pdf', label: 'PDFs', count: allResources.filter(r => r.type === 'pdf').length },
    { value: 'video', label: 'Videos', count: allResources.filter(r => r.type === 'video').length }
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
    const filtered: Record<string, Resource[]> = {};

    searchResults.forEach(item => {
      const categoryName = item.category;
      if (!filtered[categoryName]) {
        filtered[categoryName] = [];
      }

      // Find the original resource
      const originalResource = allResources.find(r => r.id === item.id);
      if (originalResource) {
        filtered[categoryName].push(originalResource);
      }
    });

    return filtered;
  }, [searchResults, allResources]);

  const openResource = (resource: Resource, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (resource.type === 'tool') {
      // Open tools in new tab
      window.open(resource.url, '_blank', 'noopener,noreferrer');
    } else {
      // Open PDFs and videos in internal viewer
      setSelectedResource(resource);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    if (!videoId) return url;

    // Enhanced YouTube embed with custom parameters
    const params = [
      'autoplay=1',           // Auto-play when loaded
      'rel=0',                // Don't show related videos
      'modestbranding=1',     // Minimal YouTube branding
      'playsinline=1',        // Play inline on mobile
      'enablejsapi=1',        // Enable JavaScript API
      'vq=hd720'              // Force HD quality
    ].join('&');

    return `https://www.youtube.com/embed/${videoId}?${params}`;
  };

  const getGooglePdfViewerUrl = (pdfUrl: string) => {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  };

  // If a resource is selected, show the viewer
  if (selectedResource) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        {/* Header with Back Button */}
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 pt-20 pb-2 sm:pb-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleResourceBack}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-700/50 hover:bg-red-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-red-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                {selectedResource.title}
              </h1>

              {/* Download/External Link Button */}
              <a
                href={selectedResource.url}
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

        {/* Content Viewer - Enhanced PDF and Video */}
        <div className="w-full h-full pt-20 sm:pt-24 relative">
          {selectedResource.type === 'video' ? (
            /* Enhanced YouTube Player */
            <div className="w-full h-full bg-black">
              <iframe
                src={getYouTubeEmbedUrl(selectedResource.url)}
                className="w-full h-full border-0"
                title={selectedResource.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                style={{
                  height: 'calc(100vh - 96px)',
                  minHeight: '400px'
                }}
                loading="lazy"
              />
            </div>
          ) : selectedResource.type === 'pdf' ? (
            isMobile ? (
              /* Google Docs Viewer for Mobile PDFs */
              <div className="w-full h-full bg-white">
                <iframe
                  src={getGooglePdfViewerUrl(selectedResource.url)}
                  className="w-full h-full border-0"
                  title={`${selectedResource.title} - Mobile PDF Viewer`}
                  style={{
                    height: 'calc(100vh - 96px)',
                    minHeight: '600px'
                  }}
                  loading="lazy"
                />
              </div>
            ) : (
              /* Native PDF Viewer for Desktop */
              <div className="w-full h-full bg-white">
                <object
                  data={selectedResource.url}
                  type="application/pdf"
                  className="w-full h-full"
                  style={{
                    height: 'calc(100vh - 96px)',
                    minHeight: '600px'
                  }}
                >
                  {/* Fallback to Google Viewer for browsers that don't support object tag */}
                  <iframe
                    src={getGooglePdfViewerUrl(selectedResource.url)}
                    className="w-full h-full border-0"
                    title={selectedResource.title}
                    style={{
                      height: 'calc(100vh - 96px)',
                      minHeight: '600px'
                    }}
                  >
                    {/* Final fallback message */}
                    <div className="flex items-center justify-center w-full h-full bg-gray-50">
                      <div className="text-center max-w-md px-6">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ArrowLeft className="w-8 h-8 text-red-600 rotate-180" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">PDF Viewer Not Available</h3>
                        <p className="text-gray-600 mb-6">
                          Your browser doesn't support PDF viewing. Please try refreshing the page or use a different browser.
                        </p>
                        <button
                          onClick={() => window.location.reload()}
                          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
                        >
                          Refresh Page
                        </button>
                      </div>
                    </div>
                  </iframe>
                </object>
              </div>
            )
          ) : (
            /* Tools should not reach here as they open in new tabs */
            <div className="flex items-center justify-center w-full h-full bg-gray-50">
              <div className="text-center">
                <p className="text-gray-600">This resource opens in a new tab.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16">
        <ShimmerLoader variant="hero" className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <SEOHead
        title="Career Reel Resources | St. Louis Demonstration JHS"
        description="Access comprehensive career development resources from The Career Reel. Find job tracking tools, resume builders, cover letter creators, and professional development guides to advance your career."
        keywords="career resources, job tracking tools, resume builder, cover letter creator, career development, job search tools, professional development, career guidance"
        url="/career-reel-resources"
        type="website"
        pageType="students-hub"
        useGalleryImages={true}
      />
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-2 sm:py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-700/50 hover:bg-red-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-red-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              🎯 Career Reel Resources
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {/* Smart Search Bar */}
          <div className="mb-6">
            <SmartSearchBar
              items={searchableItems}
              onSearchResults={handleSearchResults}
              placeholder={`Search ${allResources.length}+ career resources...`}
              accentColor="purple"
              categories={categoryOptions}
              types={typeOptions}
              enableIntentDetection={true}
              className="mb-4"
              pageKey="career-reel-resources"
            />
          </div>

          {/* Introduction - Compact Mobile-Friendly */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-xl">
              <Users size={32} className="sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
              Career Development Tools
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed px-4">
              Discover {allResources.length}+ career tools and resources to make your job hunt more manageable
            </p>
          </div>

          {/* Categorized Resources - Mobile-Optimized */}
          <div className="space-y-8 sm:space-y-10">
            {Object.entries(filteredCategories).map(([categoryName, categoryResources], categoryIndex) => (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Category Header - Compact Mobile */}
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                    {categoryName}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                    <FileText size={14} className="sm:w-4 sm:h-4 text-red-400" />
                    <span className="text-xs sm:text-sm text-gray-300 font-medium">
                      {categoryResources.length} {categoryResources.length === 1 ? 'resource' : 'resources'}
                    </span>
                  </div>
                </div>

                {/* Category Resources Grid - Mobile-Optimized */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {categoryResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                      className="group"
                    >
                      <button
                        type="button"
                        onClick={(e) => openResource(resource, e)}
                        className="w-full h-[200px] bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 hover:bg-gray-700/60 active:scale-[0.98] text-left relative overflow-hidden group flex flex-col"
                      >
                        {/* Background Gradient */}
                        <div
                          className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${resource.color}20 0%, transparent 50%)`
                          }}
                        />

                        {/* Status Indicators */}
                        <div className="absolute top-3 right-3 flex gap-1">
                          <div className={`px-2 py-1 rounded-full text-xs font-bold text-white ${
                            resource.type === 'pdf' ? 'bg-red-500/80' :
                            resource.type === 'video' ? 'bg-red-600/80' : 'bg-green-500/80'
                          }`}>
                            {resource.type === 'pdf' ? 'PDF' : resource.type === 'video' ? 'VID' : 'TOOL'}
                          </div>
                        </div>

                        {/* Icon Container */}
                        <div className="relative mb-3 flex-shrink-0">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                            style={{ backgroundColor: resource.color }}
                          >
                            {resource.icon}
                          </div>

                          {/* Resource Type Indicator */}
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
                            {resource.type === 'pdf' ? (
                              <FileText className="w-2.5 h-2.5 text-red-400" />
                            ) : resource.type === 'video' ? (
                              <Play className="w-2.5 h-2.5 text-red-400" />
                            ) : (
                              <ExternalLink className="w-2.5 h-2.5 text-green-400" />
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col space-y-2">
                          {/* Title */}
                          <h3 className="text-sm font-bold text-white leading-tight group-hover:text-red-300 transition-colors duration-300 line-clamp-2">
                            {resource.title}
                          </h3>

                          {/* Category */}
                          <p className="text-xs text-red-400 font-medium line-clamp-1">
                            {resource.category}
                          </p>

                          {/* Description */}
                          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1">
                            {resource.description}
                          </p>

                          {/* Action Footer */}
                          <div className="flex items-center justify-between pt-2 border-t border-gray-700/30 mt-auto">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-red-400 font-medium">
                                {resource.type === 'tool' ? 'External Tool' : resource.type === 'pdf' ? 'PDF Document' : 'Video Tutorial'}
                              </span>
                            </div>
                            <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">
                              {resource.type === 'tool' ? (
                                <ExternalLink size={10} className="text-red-400 group-hover:text-red-300" />
                              ) : (
                                <Play size={10} className="text-red-400 group-hover:text-red-300" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </main>
    </div>
  );
};

export default CareerReelResourcesPage;
