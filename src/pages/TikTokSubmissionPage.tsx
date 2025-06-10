import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TikTokSubmissionPage: React.FC = () => {
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.head.appendChild(script);

    // Set page styles for full-screen experience
    document.documentElement.style.margin = '0';
    document.documentElement.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.margin = '0';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      // Reset styles
      document.documentElement.style.margin = '';
      document.documentElement.style.height = '';
      document.documentElement.style.overflow = '';
      document.body.style.margin = '';
      document.body.style.height = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-black">
      {/* Back Button - Compact Header */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-900/80 to-purple-900/80 backdrop-blur-sm border-b border-pink-500/30">
        <div className="px-4 py-3">
          <Link
            to="/tiktok"
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600/50 hover:bg-pink-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm backdrop-blur-sm border border-pink-500/30"
          >
            <ArrowLeft size={16} />
            <span>Back to TikTok Page</span>
          </Link>
        </div>
      </div>

      {/* Full-Screen Tally Form */}
      <div className="pt-16 h-screen">
        <iframe
          data-tally-src="https://tally.so/r/mR6bJP"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Submit Tiktok Videos of St. Louis Demo. JHS"
          style={{
            position: 'absolute',
            top: '64px', // Account for header
            right: 0,
            bottom: 0,
            left: 0,
            border: 0
          }}
        />
      </div>
    </div>
  );
};

export default TikTokSubmissionPage;
