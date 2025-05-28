import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ExternalLink, Globe, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StaffResourcesPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const openResource = (resourceId: string) => {
    setSelectedResource(resourceId);
  };

  const closeResource = () => {
    setSelectedResource(null);
  };

  const resources = [
    {
      id: 'nacca-ccp',
      title: 'NaCCA CCP - All Subjects',
      description: 'Ghana\'s Common Core Programme curriculum guidelines for all subjects',
      url: 'https://nacca.gov.gh/common-core-programme-ccp/',
      icon: BookOpen,
      category: 'Curriculum',
      color: 'from-blue-600 to-blue-700'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {!selectedResource ? (
          /* Resource Cards Grid */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {resources.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => openResource(resource.id)}
                >
                  <div className="bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-105">
                    {/* Resource Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-r ${resource.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={32} className="text-white" />
                    </div>

                    {/* Resource Info */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                          {resource.title}
                        </h3>
                        <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2" />
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed">
                        {resource.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
                          {resource.category}
                        </span>
                        <Globe size={14} className="text-gray-500" />
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="mt-4 pt-4 border-t border-gray-700 group-hover:border-blue-500/30 transition-colors">
                      <div className="flex items-center text-blue-400 text-sm font-medium">
                        <span>Click to access resource</span>
                        <ArrowLeft size={14} className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* Embedded Resource View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Resource Header */}
            <div className="flex items-center justify-between mb-6 bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={closeResource}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Resources</span>
                </button>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {resources.find(r => r.id === selectedResource)?.title}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {resources.find(r => r.id === selectedResource)?.description}
                  </p>
                </div>
              </div>
              <a
                href={resources.find(r => r.id === selectedResource)?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <ExternalLink size={16} />
                <span>Open in New Tab</span>
              </a>
            </div>

            {/* Embedded Content */}
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={resources.find(r => r.id === selectedResource)?.url}
                className="w-full h-[80vh] border-0"
                title={resources.find(r => r.id === selectedResource)?.title}
                loading="lazy"
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StaffResourcesPage;
