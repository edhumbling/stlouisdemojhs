import React from 'react';

const NewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            News & Updates
          </h1>
          <p className="text-purple-200 text-center text-lg max-w-3xl mx-auto">
            Stay connected with the latest happenings, achievements, and announcements from St. Louis Demonstration Junior High School
          </p>
        </div>
      </div>

      {/* Full Viewport Blog Embed */}
      <div className="w-full" style={{ height: 'calc(100vh - 120px)' }}>
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

      {/* Fallback Link */}
      <div className="bg-purple-900/20 py-4 text-center">
        <p className="text-purple-200 text-sm">
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
