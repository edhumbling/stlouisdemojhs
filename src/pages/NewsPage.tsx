import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NewsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Back Button Section - Below Header */}
      <div className="bg-purple-900/30 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-6 sm:py-8 md:py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-3 sm:mb-4">
            News & Updates
          </h1>
          <p className="text-purple-200 text-center text-base sm:text-lg max-w-3xl mx-auto">
            Stay connected with the latest happenings, achievements, and announcements from St. Louis Demonstration Junior High School
          </p>
        </div>
      </div>

      {/* Full Viewport Blog Embed - No Footer */}
      <div className="w-full" style={{ height: 'calc(100vh - 240px)' }}>
        <iframe
          src="https://stlouisdemojhs.blogspot.com"
          title="St. Louis Demonstration JHS News & Updates Blog"
          className="w-full h-full border-0"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            overflow: 'auto'
          }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
        />
      </div>

      {/* Fallback Link - Fixed at Bottom */}
      <div className="bg-purple-900/20 py-2 text-center">
        <p className="text-purple-200 text-xs sm:text-sm">
          Having trouble viewing the blog?{' '}
          <a
            href="https://stlouisdemojhs.blogspot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline font-medium"
          >
            Visit our blog directly
          </a>
        </p>
      </div>
    </div>
  );
};

export default NewsPage;
