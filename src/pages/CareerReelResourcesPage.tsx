import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Video, Download, ExternalLink, Play, BookOpen, Users, Target, Briefcase, PenTool, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  const handleBack = () => {
    navigate(-1);
  };

  const handleResourceBack = () => {
    setSelectedResource(null);
  };

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
        icon: <PenTool className="w-6 h-6" />,
        color: '#10B981'
      },
      {
        id: 'resume-video',
        title: 'Follow-Along Resume Video',
        description: 'Step-by-step video guide for creating an effective resume.',
        type: 'video' as const,
        url: 'https://youtu.be/oAckpNuJDds?si=R0aKrkvbUcPaxhM-',
        category: 'Video Tutorial',
        icon: <Video className="w-6 h-6" />,
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
        icon: <Link className="w-6 h-6" />,
        color: '#F59E0B'
      }
    ]
  };

  // Flatten all resources for easy access
  const allResources: Resource[] = Object.values(resourceCategories).flat();

  const openResource = (resource: Resource) => {
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
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-4 sm:py-5 shadow-2xl border-b border-red-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleResourceBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-red-700/70 hover:bg-red-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-red-500/50 hover:border-red-400/70 flex-shrink-0"
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
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-6 sm:py-8">
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
                🎯 Career Reel Resources
              </h1>
              <p className="text-sm sm:text-base text-red-200">
                Job hunting tools, tracking sheets, and career development resources
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-3xl mb-6 shadow-2xl">
              <Users size={40} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Career Development Tools
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Make your job hunt less chaotic and more manageable with our comprehensive career tools and resources.
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
                    <FileText size={16} className="text-red-400" />
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
                          resource.type === 'pdf' ? 'bg-red-500/90' : 
                          resource.type === 'video' ? 'bg-red-600/90' : 'bg-green-500/90'
                        }`}>
                          <span className="text-white text-xs font-semibold uppercase">
                            {resource.type === 'tool' ? 'TOOL' : resource.type}
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
                          <h4 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight group-hover:text-red-300 transition-colors duration-300">
                            {resource.title}
                          </h4>

                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full mb-4">
                            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                            <span className="text-sm text-red-300 font-medium">
                              {resource.category}
                            </span>
                          </div>

                          <p className="text-sm text-gray-300 leading-relaxed mb-6">
                            {resource.description}
                          </p>

                          {/* Action Button - Apple Style */}
                          <div className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-2xl border border-red-500/30 group-hover:border-red-400/50 transition-all duration-300">
                            {resource.type === 'video' ? (
                              <>
                                <Play size={16} className="text-red-400" />
                                <span className="text-red-300 font-semibold">Watch Video</span>
                              </>
                            ) : resource.type === 'pdf' ? (
                              <>
                                <FileText size={16} className="text-red-400" />
                                <span className="text-red-300 font-semibold">Read Guide</span>
                              </>
                            ) : (
                              <>
                                <ExternalLink size={16} className="text-red-400" />
                                <span className="text-red-300 font-semibold">Use Tool</span>
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl mb-6">
                <Users size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">
                About The Career Reel
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 mb-8">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Job hunting organization tools</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Resume and cover letter guidance</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm">Career development resources</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm">Professional networking tools</span>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/30">
                <span className="text-sm text-red-300">Source:</span>
                <a 
                  href="https://thecareerreel.com/resources/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-red-400 hover:text-red-300 font-medium transition-colors duration-300"
                >
                  The Career Reel
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerReelResourcesPage;
