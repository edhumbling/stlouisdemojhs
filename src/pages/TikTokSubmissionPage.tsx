import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';

const TikTokSubmissionPage: React.FC = () => {
  const navigate = useNavigate();
  const [formLoaded, setFormLoaded] = useState(false);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };
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
      <SEOHead
        title="Submit TikTok Video | St. Louis Demonstration JHS"
        description="Submit your TikTok videos featuring St. Louis Demonstration JHS! Share your school moments, events, and experiences with our community through our easy submission form."
        keywords="submit TikTok video, TikTok submission form, share school videos, St. Louis Demo JHS TikTok, student videos, school content submission"
        url="/tiktok-submit"
        type="website"
        pageType="media"
        useGalleryImages={true}
      /
        canonical="https://stlouisdemojhs.com/tiktok-submit"
      >
      {/* Back Button and Title Section - Original Style */}
      <div className="bg-gradient-to-r from-pink-900 via-purple-800 to-pink-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-pink-700/50 hover:bg-pink-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-pink-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              📹 Submit Your TikTok Video
            </h1>
          </div>
        </div>
      </div>

      {/* Tally Form - Natural Scrolling */}
      <div className="min-h-screen relative">
        <iframe
          data-tally-src="https://tally.so/r/mR6bJP"
          width="100%"
          height="800"
          title="Submit Tiktok Videos of St. Louis Demo. JHS"
          onLoad={() => setFormLoaded(true)}
          style={{
            border: 0,
            width: '100%',
            minHeight: '800px',
            display: 'block'
          }}
        />

        {/* Loading overlay */}
        {!formLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900 via-purple-900 to-black flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-white mb-2">📹 Loading Submission Form</h3>
              <p className="text-gray-300">Preparing your TikTok video submission form...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TikTokSubmissionPage;
