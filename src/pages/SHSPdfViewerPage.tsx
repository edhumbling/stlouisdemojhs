import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PDF_LINKS } from '../data/shsData';
import { ArrowLeft, FileText } from 'lucide-react';
import ShimmerLoader from '../components/common/ShimmerLoader';
import { useHeader } from '../contexts/HeaderContext';
import SEOHead from '../components/seo/SEOHead';

interface PdfLink {
  id: string;
  title: string;
  description: string;
  url: string;
}

const SHSPdfViewerPage: React.FC = () => {
  const { pdfId } = useParams<{ pdfId: string }>();
  const navigate = useNavigate();
  const { setShowHeader } = useHeader();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isPdfLoaded, setIsPdfLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const objectRef = useRef<HTMLObjectElement>(null);

  // Find the PDF link
  const pdfLink = PDF_LINKS.find(link => link.id === pdfId);

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

  // Control header visibility
  useEffect(() => {
    setShowHeader(false);
    return () => setShowHeader(true);
  }, [setShowHeader]);

  // Handle PDF loading
  useEffect(() => {
    const handleLoad = () => {
      // Add a small delay to ensure the PDF is actually visible
      setTimeout(() => {
        setIsLoading(false);
        setIsPdfLoaded(true);
      }, 1000);
    };

    const handleError = () => {
      setIsLoading(false);
    };

    if (isMobile && iframeRef.current) {
      iframeRef.current.addEventListener('load', handleLoad);
      iframeRef.current.addEventListener('error', handleError);
    } else if (objectRef.current) {
      objectRef.current.addEventListener('load', handleLoad);
      objectRef.current.addEventListener('error', handleError);
    }

    return () => {
      if (isMobile && iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleLoad);
        iframeRef.current.removeEventListener('error', handleError);
      } else if (objectRef.current) {
        objectRef.current.removeEventListener('load', handleLoad);
        objectRef.current.removeEventListener('error', handleError);
      }
    };
  }, [isMobile]);

  const handleBack = () => {
    navigate('/shs-database');
  };

  const getGooglePdfViewerUrl = (pdfUrl: string) => {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  };

  if (!pdfLink) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16">
        <SEOHead
          title="PDF Not Found | St. Louis Demonstration JHS"
          description="The requested PDF document could not be found. Return to our SHS database to access available school selection guides and resources."
          keywords="PDF not found, SHS database, school selection guides"
          url="/shs-database/pdf/not-found"
          type="website"
          pageType="students-hub"
          useGalleryImages={true}
        
        canonical="https://stlouisdemojhs.com/shs-database/pdf/not-found"
        />
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">PDF Not Found</h1>
        <button
              onClick={handleBack}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
              Back to Database
        </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <SEOHead
        title={`${pdfLink.title} | St. Louis Demonstration JHS`}
        description={`View ${pdfLink.title} - Essential SHS school selection guide for BECE students. Access comprehensive information about Ghana's senior high schools and make informed decisions about your educational future.`}
        keywords={`${pdfLink.title}, SHS school selection, BECE placement, Ghana SHS schools, school selection guide, CSSPS`}
        url={`/shs-database/pdf/${pdfId}`}
        type="website"
        pageType="students-hub"
        useGalleryImages={true}
      />
      {/* Header - Only show on desktop */}
      {!isMobile && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-4 sm:py-5 shadow-2xl border-b border-green-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
        <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-green-700/70 hover:bg-green-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/50 hover:border-green-400/70 flex-shrink-0"
        >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Back to Database</span>
                <span className="sm:hidden">Back</span>
        </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {pdfLink.title}
              </h1>

              {/* Download Button */}
              <a
                href={pdfLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/80 hover:bg-blue-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm ml-auto"
              >
                <FileText size={14} />
                <span className="hidden sm:inline">Download</span>
              </a>
            </div>
      </div>
        </div>
      )}

      {/* Content Viewer */}
      <div className={`w-full h-full ${isMobile ? 'pt-0' : 'pt-20 sm:pt-24'} relative`}>
        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col">
            {/* Back Button Bar */}
            <div className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-md border-b border-white/10 p-2 sm:p-4">
              <button
                onClick={handleBack}
                className="flex items-center text-white hover:text-yellow-300 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                <span className="text-sm sm:text-base">Back to Database</span>
              </button>
            </div>

            {/* Loading Content */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-full max-w-2xl">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-white/10 animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/10 rounded w-3/4 mb-2 animate-pulse"></div>
                        <div className="h-3 bg-white/10 rounded w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-3 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-3 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-3 bg-white/10 rounded w-5/6 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col">
            {/* Back Button Bar */}
            <div className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-md border-b border-white/10 p-2 sm:p-4">
              <button
                onClick={handleBack}
                className="flex items-center text-white hover:text-yellow-300 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                <span className="text-sm sm:text-base">Back to Database</span>
              </button>
            </div>

            {/* Error Content */}
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-full max-w-2xl">
                <div className="bg-red-500/10 backdrop-blur-md rounded-xl p-6 border border-red-500/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <div className="relative">
                    <h2 className="text-xl font-semibold text-red-300 mb-4">Error Loading PDF</h2>
                    <p className="text-red-100/80 mb-6">{error}</p>
                    <button
                      onClick={handleBack}
                      className="w-full bg-red-500/90 hover:bg-red-600/90 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/30 relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                      <span className="relative">Return to Database</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Back Button - Only show on mobile */}
        {isMobile && (
          <div className="fixed top-4 left-4 z-[70]">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 bg-green-700/70 hover:bg-green-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 text-sm backdrop-blur-sm border border-green-500/50 hover:border-green-400/70"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          </div>
        )}

        {isMobile ? (
          /* Google Docs Viewer for Mobile PDFs */
          <div className="w-full h-full bg-white">
      <iframe
              ref={iframeRef}
              src={getGooglePdfViewerUrl(pdfLink.url)}
              className="w-full h-full border-0"
              title={`${pdfLink.title} - Mobile PDF Viewer`}
              style={{
                height: '100vh',
                minHeight: '600px'
              }}
              loading="lazy"
            />
          </div>
        ) : (
          /* Native PDF Viewer for Desktop */
          <div className="w-full h-full bg-white">
            <object
              ref={objectRef}
              data={pdfLink.url}
              type="application/pdf"
              className="w-full h-full"
              style={{
                height: 'calc(100vh - 96px)',
                minHeight: '600px'
              }}
            >
              {/* Fallback to Google Viewer for browsers that don't support object tag */}
              <iframe
                ref={iframeRef}
                src={getGooglePdfViewerUrl(pdfLink.url)}
                className="w-full h-full border-0"
                title={pdfLink.title}
                style={{
                  height: 'calc(100vh - 96px)',
                  minHeight: '600px'
                }}
              >
                {/* Final fallback message */}
                <div className="flex items-center justify-center w-full h-full bg-gray-50">
                  <div className="text-center max-w-md px-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ArrowLeft className="w-8 h-8 text-green-600 rotate-180" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">PDF Viewer Not Available</h3>
                    <p className="text-gray-600 mb-6">
                      Your browser doesn't support PDF viewing. Please try refreshing the page or use a different browser.
                    </p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
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

export default SHSPdfViewerPage; 