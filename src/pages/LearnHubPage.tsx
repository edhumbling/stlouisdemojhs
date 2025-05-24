import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Mic, FileText, Calculator, Languages, X, ArrowLeft } from 'lucide-react';

const LearnHubPage: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<any>(null);

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
    }
  ];

  const handleResourceClick = (resource: any) => {
    setSelectedResource(resource);
  };

  const handleBack = () => {
    setSelectedResource(null);
  };

  // If a resource is selected, show the iframe view
  if (selectedResource) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        {/* Header with back button */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to LearnHub</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{selectedResource.title}</h1>
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Iframe container */}
        <div className="flex-1 bg-white">
          <iframe
            src={selectedResource.url}
            className="w-full h-full border-0"
            style={{ minHeight: 'calc(100vh - 80px)' }}
            title={selectedResource.title}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6 sm:py-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: 'Arial, sans-serif' }}>
            LearnHub
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Educational resources for St. Louis Demonstration JHS
          </p>
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
                  className="w-full bg-white rounded-2xl p-3 sm:p-4 border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md active:scale-95 text-left"
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 flex items-center justify-center text-white"
                    style={{ backgroundColor: resource.color }}
                  >
                    {resource.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 leading-tight">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-500 leading-tight">
                    {resource.description}
                  </p>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Simple Footer Message */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-sm text-gray-500">
              Tap any resource to open it within LearnHub
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnHubPage;
