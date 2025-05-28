import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
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
      title: 'NaCCA CCP',
      subtitle: 'All Subjects',
      description: 'Ghana\'s Common Core Programme curriculum guidelines',
      url: 'https://nacca.gov.gh/common-core-programme-ccp/',
      icon: BookOpen,
      category: 'Curriculum',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  if (selectedResource) {
    // Full-screen embedded view
    return (
      <div className="h-screen flex flex-col bg-white">
        {/* Back Button Header - Fixed at top */}
        <div className="flex-shrink-0 bg-blue-600 px-4 py-3 shadow-lg">
          <button
            onClick={closeResource}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-all duration-300 text-sm"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>

        {/* Main Content - Full height iframe */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={resources.find(r => r.id === selectedResource)?.url}
            className="w-full h-full border-0"
            title={resources.find(r => r.id === selectedResource)?.title}
            loading="lazy"
          />
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

      {/* Dark Aero Resource Cards */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
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

                    <p className="text-sm text-gray-300 font-medium">
                      {resource.subtitle}
                    </p>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {resource.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
                        {resource.category}
                      </span>
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
      </div>
    </div>
  );
};

export default StaffResourcesPage;
