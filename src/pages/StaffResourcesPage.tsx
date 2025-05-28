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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      {/* Back Button and Title Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-300 text-sm"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                Staff Resources
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Access curriculum guides, teaching materials, and educational resources
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Apple-style Small Resource Cards */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-4xl mx-auto"
        >
          {resources.map((resource) => {
            const IconComponent = resource.icon;
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="group cursor-pointer"
                onClick={() => openResource(resource.id)}
              >
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 active:scale-95 hover:bg-white">
                  {/* Resource Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <IconComponent size={20} className="text-white" />
                  </div>

                  {/* Resource Info */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {resource.title}
                    </h3>

                    <p className="text-xs text-gray-500 font-medium">
                      {resource.subtitle}
                    </p>

                    <div className="pt-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg border border-blue-100">
                        {resource.category}
                      </span>
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
