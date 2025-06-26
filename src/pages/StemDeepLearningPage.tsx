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

      {/* External Link Content - Opens in New Tab */}
      <main className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center px-6 py-12 max-w-2xl mx-auto">
          {/* Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-yellow-400/30">
            <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            STEM Deep Learning Resources
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Access comprehensive STEM definitions and career information from the Bureau of Labor Statistics.
            This government resource provides in-depth analysis of Science, Technology, Engineering, and Mathematics fields.
          </p>

          {/* External Link Button */}
          <a
            href="https://www.bls.gov/opub/btn/volume-14/stem-alternate-definitions.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 hover:scale-105 group text-lg"
            style={{
              textShadow: '0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.6), 0 0 30px rgba(255, 255, 0, 0.4)',
              boxShadow: '0 0 20px rgba(255, 255, 0, 0.3), 0 0 40px rgba(255, 255, 0, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.2)'
            }}
          >
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            <span>Open BLS STEM Resources</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">What You'll Find:</h3>
            <ul className="text-gray-300 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Comprehensive STEM field definitions</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Career opportunities and job market data</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Educational pathway recommendations</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Industry trends and future outlook</span>
              </li>
            </ul>
          </div>

          {/* Note */}
          <p className="text-sm text-gray-400 mt-6">
            This link opens in a new tab to the official Bureau of Labor Statistics website
          </p>
        </div>
      </main>
    </div>
  );
};

export default StemDeepLearningPage;
