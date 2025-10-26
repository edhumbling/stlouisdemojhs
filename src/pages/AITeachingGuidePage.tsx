import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useHeader } from '../contexts/HeaderContext';
import ShimmerLoader from '../components/common/ShimmerLoader';
import SEOHead from '../components/seo/SEOHead';

const AITeachingGuidePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { setShowHeader } = useHeader();

  const pdfUrl = 'https://ik.imagekit.io/humbling/154bc2e9-7d08-4e69-be18-d83fad2cae34.pdf';
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

  // Hide header when viewing the guide
  useEffect(() => {
    setShowHeader(false);

    // Cleanup: ensure header is shown when component unmounts
    return () => {
      setShowHeader(true);
    };
  }, [setShowHeader]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) || window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simple loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate('/staff-resources');
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <SEOHead
        title="AI Teaching Guide | St. Louis Demonstration JHS"
        description="Comprehensive guide for leveraging AI in teaching at St. Louis Demonstration JHS. Learn how to integrate artificial intelligence tools and technologies to enhance classroom instruction and student learning outcomes."
        keywords="AI teaching guide, artificial intelligence education, AI in classroom, teaching with AI, educational technology, AI tools for teachers, modern teaching methods"
        url="/ai-teaching-guide"
        type="website"
        pageType="staff-resources"
        useGalleryImages={true}
      /
        canonical="https://stlouisdemojhs.com/ai-teaching-guide"
      >
      {/* Header - Enhanced Emerald Back Button (Original Design) */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 py-4 sm:py-5 shadow-2xl border-b border-emerald-700/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-emerald-700/70 hover:bg-emerald-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-emerald-500/50 hover:border-emerald-400/70 flex-shrink-0 ring-2 ring-emerald-500/20 hover:ring-emerald-400/30"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Leveraging AI in Teaching: A Comprehensive Guide
            </h1>
          </div>
        </div>
      </div>

      {/* Content Area - Native PDF Viewer */}
      <div className="w-full h-full pt-20 sm:pt-24 relative">
        {isLoading ? (
          /* Shimmer Silver Loading Screen */
          <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-white relative overflow-hidden">
            {/* Shimmer Background */}
            <ShimmerLoader
              variant="hero"
              className="w-full h-full absolute inset-0"
            />

            {/* Loading Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
              <div className="text-center max-w-md px-6">
                {/* Shimmer Logo Placeholder */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>

                {/* Shimmer Text Lines */}
                <div className="space-y-3 mb-6">
                  <div className="h-6 w-48 mx-auto rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                  <div className="h-4 w-64 mx-auto rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                  <div className="h-4 w-56 mx-auto rounded bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                </div>

                {/* Minimal Loading Text */}
                <h3 className="text-xl font-bold text-gray-700">Loading...</h3>
              </div>
            </div>
          </div>
        ) : isMobile ? (
          /* Google Docs Viewer for Mobile */
          <div className="w-full h-full bg-white">
            <iframe
              src={googleViewerUrl}
              className="w-full h-full border-0"
              title="AI Teaching Guide PDF - Mobile Viewer"
              style={{
                height: 'calc(100vh - 96px)',
                minHeight: '600px'
              }}
              loading="lazy"
            />
          </div>
        ) : (
          /* Native PDF Viewer for Desktop */
          <div className="w-full h-full bg-white">
            <object
              data={pdfUrl}
              type="application/pdf"
              className="w-full h-full"
              style={{
                height: 'calc(100vh - 96px)',
                minHeight: '600px'
              }}
            >
              {/* Fallback iframe for browsers that don't support object tag */}
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="AI Teaching Guide PDF"
                style={{
                  height: 'calc(100vh - 96px)',
                  minHeight: '600px'
                }}
              >
                {/* Final fallback message */}
                <div className="flex items-center justify-center w-full h-full bg-gray-50">
                  <div className="text-center max-w-md px-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ArrowLeft className="w-8 h-8 text-emerald-600 rotate-180" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">PDF Viewer Not Available</h3>
                    <p className="text-gray-600 mb-6">
                      Your browser doesn't support PDF viewing. Please try refreshing the page or use a different browser.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
                    >
                      Refresh Page
                    </button>
                  </div>
                </div>
              </iframe>
            </object>
          </div>
        )}
      </div>


    </div>
  );
};

export default AITeachingGuidePage;
