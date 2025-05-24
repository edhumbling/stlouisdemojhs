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

      {/* Full Viewport Blog Embed - No Footer */}
      <div className="w-full" style={{ height: 'calc(100vh - 140px)' }}>
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


    </div>
  );
};

export default NewsPage;
