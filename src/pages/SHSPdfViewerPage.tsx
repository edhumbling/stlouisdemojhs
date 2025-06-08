import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PDF_LINKS } from '../data/shsData';
import { ArrowLeft, FileText } from 'lucide-react';
import ShimmerLoader from '../components/common/ShimmerLoader';
import { useHeader } from '../contexts/HeaderContext';

interface PdfLink {
  id: string;
  title: string;
  description: string;
  url: string;
}

const SHSPdfViewerPage: React.FC = () => {
  const { pdfId } = useParams<{ pdfId: string }>();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPdfLoaded, setIsPdfLoaded] = useState(false);
  const { setShowHeader } = useHeader();
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
    if (isMobile) {
      setShowHeader(false);
    }
    return () => {
      setShowHeader(true);
    };
  }, [isMobile, setShowHeader]);

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
          <div className="absolute inset-0 z-50 bg-black">
            <ShimmerLoader variant="silver" className="w-full h-full" />
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