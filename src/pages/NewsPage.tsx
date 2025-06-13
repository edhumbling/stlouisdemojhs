import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Newspaper } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Auto-hide loading after 5 seconds as fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Shimmer Loading Component
  const ShimmerLoader = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
      </div>

      {/* Main Content Shimmer */}
      <div className="p-6 space-y-6">
        {/* Header Shimmer */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500/30 rounded-lg animate-pulse flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-purple-300" />
            </div>
            <div className="h-8 w-48 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* News Articles Shimmer */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              {/* Article Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg animate-pulse flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gradient-to-r from-gray-500/30 to-gray-400/30 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Article Content */}
              <div className="space-y-3">
                <div className="h-4 bg-gradient-to-r from-gray-500/20 to-gray-400/20 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gradient-to-r from-gray-500/20 to-gray-400/20 rounded animate-pulse"></div>
                <div className="h-4 w-4/5 bg-gradient-to-r from-gray-500/20 to-gray-400/20 rounded animate-pulse"></div>
              </div>

              {/* Article Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div className="h-3 w-24 bg-gradient-to-r from-gray-500/30 to-gray-400/30 rounded animate-pulse"></div>
                <div className="h-3 w-16 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Text */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-purple-300">
            <div className="w-4 h-4 border-2 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Loading latest news and updates...</span>
          </div>
        </div>
      </div>

      {/* Shimmer Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer-wave"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="News & Updates | St. Louis Demonstration JHS"
        description="Stay informed with the latest news, announcements, and updates from St. Louis Demonstration JHS. Read about school events, achievements, academic milestones, and important information for students and parents."
        keywords="school news, updates, announcements, events, achievements, academic news, school blog, Ghana JHS news, student achievements"
        url="/news"
        type="website"
        pageType="news"
        useGalleryImages={true}
      />
      {/* Back Button and Title Section - Below Header */}
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
              News/Updates
            </h1>
          </div>
        </div>
      </div>

      {/* Full Viewport Blog Embed with Loading State */}
      <div className="w-full relative" style={{ height: 'calc(100vh - 140px)' }}>
        {/* Shimmer Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10">
            <ShimmerLoader />
          </div>
        )}

        {/* Blog Iframe */}
        <iframe
          src="https://stlouisdemojhs.blogspot.com"
          title="St. Louis Demonstration JHS News & Updates Blog"
          className={`w-full h-full border-0 transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            overflow: 'auto'
          }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
          onLoad={handleIframeLoad}
        />
      </div>


    </div>
  );
};

export default NewsPage;
