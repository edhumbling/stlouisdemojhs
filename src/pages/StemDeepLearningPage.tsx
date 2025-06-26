import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

const StemDeepLearningPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="STEM Deep Learning | Definitions & Careers - St. Louis Demonstration JHS"
        description="Explore comprehensive STEM definitions and career opportunities from the Bureau of Labor Statistics. Learn about Science, Technology, Engineering, and Mathematics fields in depth."
        keywords="STEM definitions, STEM careers, Bureau of Labor Statistics, science careers, technology careers, engineering careers, mathematics careers"
        url="/stem-deep-learning"
        type="article"
        pageType="educational"
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Back Bar - Same as other pages */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              STEM Deep Learning
            </h1>
          </div>
        </div>
      </div>

      {/* Full Screen Embedded Content - No Footer */}
      <main className="w-full h-screen">
        <iframe
          src="https://www.bls.gov/opub/btn/volume-14/stem-alternate-definitions.htm"
          title="STEM Alternate Definitions - Bureau of Labor Statistics"
          className="w-full h-full border-0"
          style={{ height: 'calc(100vh - 80px)' }} // Subtract header height
          allow="fullscreen"
          loading="lazy"
        />
      </main>
    </div>
  );
};

export default StemDeepLearningPage;
