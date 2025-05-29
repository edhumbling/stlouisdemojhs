import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Video, Download, ExternalLink, Play, BookOpen, Mail, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  const handleBack = () => {
    navigate(-1);
  };

  const handleResourceBack = () => {
    setSelectedResource(null);
  };

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

  const openResource = (resource: Resource) => {
    setSelectedResource(resource);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const getGooglePdfViewerUrl = (pdfUrl: string) => {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  };

  // If a resource is selected, show the viewer
  if (selectedResource) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-4 sm:py-5 shadow-2xl border-b border-purple-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleResourceBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-purple-700/70 hover:bg-purple-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/50 hover:border-purple-400/70 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back to Resources</span>
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

        {/* Content Viewer */}
        <div className="absolute inset-0 pt-20 sm:pt-24">
          {selectedResource.type === 'video' ? (
            <iframe
              src={getYouTubeEmbedUrl(selectedResource.url)}
              className="w-full h-full border-0"
              title={selectedResource.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <iframe
              src={getGooglePdfViewerUrl(selectedResource.url)}
              className="w-full h-full border-0"
              title={selectedResource.title}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          )}
        </div>
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
                🎓 Dream Hive Scholarship Resources
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

                {/* Category Resources Grid - Apple Style Cute Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: (categoryIndex * 0.15) + (index * 0.1),
                        type: "spring",
                        stiffness: 100
                      }}
                      className="group"
                    >
                      <button
                        onClick={() => openResource(resource)}
                        className="w-full bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:bg-white/10 active:scale-95 text-left relative overflow-hidden group-hover:scale-105"
                      >
                        {/* Gradient Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Type Badge - Apple Style */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full backdrop-blur-sm ${
                          resource.type === 'pdf' ? 'bg-red-500/90' : 'bg-red-600/90'
                        }`}>
                          <span className="text-white text-xs font-semibold uppercase">
                            {resource.type}
                          </span>
                        </div>

                        {/* Resource Icon - Large and Cute */}
                        <div className="relative z-10">
                          <div 
                            className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                            style={{ backgroundColor: resource.color }}
                          >
                            {resource.icon}
                          </div>

                          {/* Resource Info */}
                          <h4 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight group-hover:text-purple-300 transition-colors duration-300">
                            {resource.title}
                          </h4>

                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full mb-4">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-sm text-purple-300 font-medium">
                              {resource.category}
                            </span>
                          </div>

                          <p className="text-sm text-gray-300 leading-relaxed mb-6">
                            {resource.description}
                          </p>

                          {/* Action Button - Apple Style */}
                          <div className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-2xl border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300">
                            {resource.type === 'video' ? (
                              <>
                                <Play size={16} className="text-purple-400" />
                                <span className="text-purple-300 font-semibold">Watch Video</span>
                              </>
                            ) : (
                              <>
                                <FileText size={16} className="text-purple-400" />
                                <span className="text-purple-300 font-semibold">Read Guide</span>
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Info - Apple Style */}
          <div className="mt-16 text-center">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-6">
                <BookOpen size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">
                About Dream Hive Scholarship
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 mb-8">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Professional development resources</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Career guidance and tips</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm">Academic writing support</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm">Scholarship opportunities</span>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30">
                <span className="text-sm text-purple-300">Source:</span>
                <a 
                  href="https://dhscholarship.org/resources/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
                >
                  Dream Hive Scholarship
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DreamHiveResourcesPage;
