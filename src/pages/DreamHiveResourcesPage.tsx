import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Video, Download, ExternalLink, Play, BookOpen, Mail, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShimmerLoader from '../components/common/ShimmerLoader';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video';
  url: string;
  category: string;
  icon: React.ReactNode;
  color: string;
}

const DreamHiveResourcesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleBack = () => {
    navigate('/students-hub');
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

  // Prevent body scroll when viewer is open
  useEffect(() => {
    if (selectedResource) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedResource]);

  // Extracted resources from dhscholarship.org/resources/
  const resourceCategories = {
    "📝 Professional Writing": [
      {
        id: 'resume-guide',
        title: 'How to Write an Effective Resume',
        description: 'Your resume is your passport to the professional world. Learn to make it shine and open doors to internships and dream jobs.',
        type: 'pdf' as const,
        url: 'https://dhscholarship.org/wp-content/uploads/2023/09/Resume-Writing.pdf',
        category: 'Career Development',
        icon: <FileText className="w-6 h-6" />,
        color: '#3B82F6'
      },
      {
        id: 'resume-video',
        title: 'Step-by-Step Resume Writing Tutorial',
        description: 'Watch our comprehensive video guide on creating a professional resume that stands out to employers.',
        type: 'video' as const,
        url: 'https://www.youtube.com/watch?v=oAckpNuJDds',
        category: 'Career Development',
        icon: <Video className="w-6 h-6" />,
        color: '#EF4444'
      },
      {
        id: 'essay-guide',
        title: 'How to Master Essay Writing',
        description: 'Essays are your passport to scholarships. Learn to craft thoughtful essays that set you apart and open doors.',
        type: 'pdf' as const,
        url: 'https://dhscholarship.org/wp-content/uploads/2023/09/How-To-Craft-an-Effective-Essay.pdf',
        category: 'Academic Writing',
        icon: <PenTool className="w-6 h-6" />,
        color: '#10B981'
      }
    ],
    "📧 Communication Skills": [
      {
        id: 'email-guide',
        title: 'How to Email Like a Pro',
        description: 'Master the art of crafting clear, concise, and professional emails that open doors and strengthen your network.',
        type: 'pdf' as const,
        url: 'https://dhscholarship.org/wp-content/uploads/2023/09/Emailing-Tips.pdf',
        category: 'Professional Communication',
        icon: <Mail className="w-6 h-6" />,
        color: '#8B5CF6'
      }
    ]
  };

  // Flatten all resources for easy access
  const allResources: Resource[] = Object.values(resourceCategories).flat();

  const openResource = (resource: Resource, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setSelectedResource(resource);
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
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-4 sm:py-5 shadow-2xl border-b border-purple-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleResourceBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-purple-700/70 hover:bg-purple-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/50 hover:border-purple-400/70 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Back to Resources</span>
                <span className="sm:hidden">Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {selectedResource.title}
              </h1>

              {/* Download/External Link Button */}
              <a
                href={selectedResource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/80 hover:bg-blue-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm ml-auto"
              >
                {selectedResource.type === 'pdf' ? <Download size={14} /> : <ExternalLink size={14} />}
                <span className="hidden sm:inline">
                  {selectedResource.type === 'pdf' ? 'Download' : 'Open Original'}
                </span>
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
          ) : isMobile ? (
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
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ArrowLeft className="w-8 h-8 text-purple-600 rotate-180" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">PDF Viewer Not Available</h3>
                      <p className="text-gray-600 mb-6">
                        Your browser doesn't support PDF viewing. Please try refreshing the page or use a different browser.
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
                      >
                        Refresh Page
                      </button>
                    </div>
                  </div>
                </iframe>
              </object>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16">
      {/* Header - Apple Style */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm backdrop-blur-sm border border-white/20 flex-shrink-0 hover:scale-105"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <div className="flex-1 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                🎓 Dreamhive Resources
              </h1>
              <p className="text-sm sm:text-base text-purple-200">
                Professional development guides for career and academic success
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Introduction - Apple Style */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl mb-6 shadow-2xl">
              <BookOpen size={40} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Professional Development Resources
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Master essential skills for academic and career success with our comprehensive guides and video tutorials.
            </p>
          </div>

          {/* Categorized Resources - Apple Style */}
          <div className="space-y-12">
            {Object.entries(resourceCategories).map(([categoryName, categoryResources], categoryIndex) => (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
                className="space-y-6"
              >
                {/* Category Header - Apple Style */}
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {categoryName}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                    <FileText size={16} className="text-purple-400" />
                    <span className="text-sm text-gray-300 font-medium">
                      {categoryResources.length} {categoryResources.length === 1 ? 'resource' : 'resources'}
                    </span>
                  </div>
                </div>

                {/* Category Resources Grid - Small Cute Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {categoryResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                      className="group"
                    >
                      <button
                        onClick={(e) => openResource(resource, e)}
                        className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 active:scale-95 text-left relative"
                      >
                        {/* Type Badge */}
                        <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${
                          resource.type === 'pdf' ? 'bg-red-500/80' : 'bg-red-600/80'
                        }`}>
                          <span className="text-white text-xs font-bold">
                            {resource.type === 'pdf' ? 'PDF' : 'VID'}
                          </span>
                        </div>

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

                        {/* Category */}
                        <p className="text-xs text-gray-400 mb-2 font-medium">
                          {resource.category}
                        </p>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-gray-300 leading-tight">
                          {resource.description}
                        </p>
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

export default DreamHiveResourcesPage;
