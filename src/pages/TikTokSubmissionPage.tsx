import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TikTokSubmissionPage: React.FC = () => {
  const [formLoaded, setFormLoaded] = useState(false);
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.head.appendChild(script);

    // Allow natural scrolling behavior
    document.documentElement.style.margin = '0';
    document.documentElement.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.margin = '0';
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';

    // Listen for Tally height changes to prevent white gaps
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://tally.so' && event.data.type === 'tally-height-change') {
        const iframe = document.querySelector('iframe[data-tally-src*="tally.so"]') as HTMLIFrameElement;
        if (iframe && event.data.height) {
          iframe.style.height = event.data.height + 'px';
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      window.removeEventListener('message', handleMessage);
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
      {/* Back Button Bar */}
      <div className="bg-gradient-to-r from-pink-900 via-purple-800 to-pink-900 py-4 sm:py-6 border-b border-pink-500/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/tiktok"
              className="inline-flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-3 bg-pink-700/50 hover:bg-pink-600/70 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-pink-500/30 flex-shrink-0"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Back to TikTok Page</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              📹 Submit Your TikTok Video
            </h1>
          </div>
        </div>
      </div>

      {/* Tally Form - Natural Scrolling */}
      <div className="min-h-screen">
        <iframe
          data-tally-src="https://tally.so/r/mR6bJP"
          width="100%"
          height="800"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Submit Tiktok Videos of St. Louis Demo. JHS"
          style={{
            border: 0,
            width: '100%',
            minHeight: '800px',
            display: 'block'
          }}
        />
      </div>
    </div>
  );
};

export default TikTokSubmissionPage;
