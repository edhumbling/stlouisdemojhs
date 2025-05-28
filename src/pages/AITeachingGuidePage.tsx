import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { useHeader } from '../contexts/HeaderContext';

// Declare global DearFlip types
declare global {
  interface Window {
    DEARFLIP: any;
    jQuery: any;
    $: any;
  }
}

const AITeachingGuidePage: React.FC = () => {
  const navigate = useNavigate();
  const flipbookRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setShowHeader } = useHeader();

  // Hide header when viewing the guide
  useEffect(() => {
    setShowHeader(false);

    // Cleanup: ensure header is shown when component unmounts
    return () => {
      setShowHeader(true);
    };
  }, [setShowHeader]);

  // Initialize DearFlip when component mounts
  useEffect(() => {
    let jqueryScript: HTMLScriptElement | null = null;
    let dflipScript: HTMLScriptElement | null = null;
    let dflipCSS: HTMLLinkElement | null = null;
    let themifyCSS: HTMLLinkElement | null = null;

    const initializeDearFlip = async () => {
      try {
        // Load DearFlip CSS
        dflipCSS = document.createElement('link');
        dflipCSS.rel = 'stylesheet';
        dflipCSS.type = 'text/css';
        dflipCSS.href = 'https://cdn.jsdelivr.net/gh/dearhive/dearflip-js-flipbook@master/dflip/css/dflip.min.css';
        document.head.appendChild(dflipCSS);

        // Load Themify Icons CSS (required for older versions)
        themifyCSS = document.createElement('link');
        themifyCSS.rel = 'stylesheet';
        themifyCSS.type = 'text/css';
        themifyCSS.href = 'https://cdn.jsdelivr.net/gh/dearhive/dearflip-js-flipbook@master/dflip/css/themify-icons.min.css';
        document.head.appendChild(themifyCSS);

        // Load jQuery if not already loaded
        if (!window.jQuery) {
          jqueryScript = document.createElement('script');
          jqueryScript.src = 'https://cdn.jsdelivr.net/gh/dearhive/dearflip-js-flipbook@master/dflip/js/libs/jquery.min.js';
          jqueryScript.type = 'text/javascript';
          document.body.appendChild(jqueryScript);

          await new Promise((resolve, reject) => {
            jqueryScript!.onload = resolve;
            jqueryScript!.onerror = reject;
          });
        }

        // Load DearFlip JS
        dflipScript = document.createElement('script');
        dflipScript.src = 'https://cdn.jsdelivr.net/gh/dearhive/dearflip-js-flipbook@master/dflip/js/dflip.min.js';
        dflipScript.type = 'text/javascript';
        document.body.appendChild(dflipScript);

        await new Promise((resolve, reject) => {
          dflipScript!.onload = resolve;
          dflipScript!.onerror = reject;
        });

        // Wait a bit for DearFlip to initialize
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Initialize the flipbook
        if (window.DEARFLIP && flipbookRef.current) {
          console.log('DearFlip loaded successfully, parsing books...');
          window.DEARFLIP.parseBooks();
          setIsLoading(false);
        } else {
          throw new Error('DearFlip not available after loading');
        }

      } catch (error) {
        console.error('DearFlip initialization failed:', error);
        setUseFallback(true);
        setIsLoading(false);
      }
    };

    // Start initialization
    initializeDearFlip();

    // Fallback timeout
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        console.log('DearFlip loading timeout, using fallback');
        setUseFallback(true);
        setIsLoading(false);
      }
    }, 10000); // 10 second timeout

    // Cleanup function
    return () => {
      clearTimeout(fallbackTimer);
      if (dflipCSS && document.head.contains(dflipCSS)) {
        document.head.removeChild(dflipCSS);
      }
      if (themifyCSS && document.head.contains(themifyCSS)) {
        document.head.removeChild(themifyCSS);
      }
      if (jqueryScript && document.body.contains(jqueryScript)) {
        document.body.removeChild(jqueryScript);
      }
      if (dflipScript && document.body.contains(dflipScript)) {
        document.body.removeChild(dflipScript);
      }
    };
  }, [isLoading]);

  const handleBack = () => {
    navigate('/staff-resources');
  };

  const handleDownload = () => {
    window.open('https://ik.imagekit.io/humbling/154bc2e9-7d08-4e69-be18-d83fad2cae34.pdf', '_blank');
  };

  const handleOpenOriginal = () => {
    window.open('https://ik.imagekit.io/humbling/154bc2e9-7d08-4e69-be18-d83fad2cae34.pdf', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900">
      {/* Floating Header - Minimal and Elegant */}
      <div className="fixed top-4 left-4 right-4 z-[60] bg-black/80 backdrop-blur-md rounded-xl shadow-2xl border border-emerald-500/30">
        <div className="flex items-center justify-between px-6 py-3">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm"
          >
            <ArrowLeft size={16} />
            <span>Back to Resources</span>
          </button>

          <h1 className="text-lg font-bold text-white text-center flex-1 mx-4">
            AI Teaching Guide
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600/80 hover:bg-emerald-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              onClick={handleOpenOriginal}
              className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600/80 hover:bg-emerald-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Open PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Flipbook Container */}
      <div className="w-full h-full pt-20">
        {useFallback ? (
          /* Fallback: Full-screen PDF iframe */
          <div className="w-full h-full bg-white">
            <iframe
              src="https://ik.imagekit.io/humbling/154bc2e9-7d08-4e69-be18-d83fad2cae34.pdf"
              className="w-full h-full border-0"
              title="AI Teaching Guide PDF"
              loading="lazy"
            />
          </div>
        ) : (
          /* DearFlip Flipbook - Full Screen */
          <div className="w-full h-full relative">
            <div
              ref={flipbookRef}
              className="_df_book"
              source="https://ik.imagekit.io/humbling/154bc2e9-7d08-4e69-be18-d83fad2cae34.pdf"
              webgl="true"
              hard="false"
              style={{
                width: '100%',
                height: '100%',
                minHeight: 'calc(100vh - 80px)'
              }}
            >
              {/* Loading content */}
              {isLoading && (
                <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-emerald-900 via-emerald-800 to-black">
                  <div className="text-center max-w-md px-6">
                    {/* Animated Logo Placeholder */}
                    <div className="w-24 h-24 mx-auto mb-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>

                    {/* Loading Text */}
                    <h3 className="text-2xl font-bold text-white mb-4">Loading AI Teaching Guide</h3>
                    <p className="text-emerald-200 text-lg mb-6">
                      Preparing your comprehensive guide to AI in education
                    </p>

                    {/* Progress Indicator */}
                    <div className="w-full bg-emerald-900/50 rounded-full h-2 mb-4">
                      <div className="bg-emerald-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                    </div>

                    <p className="text-emerald-300 text-sm">
                      🚀 The future of education is loading...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Urgent Call to Action Overlay - Only show when loading */}
      {isLoading && (
        <div className="fixed bottom-4 left-4 right-4 z-[70] bg-yellow-500/95 backdrop-blur-md rounded-xl shadow-2xl border border-yellow-400/50 p-4">
          <div className="text-center">
            <h3 className="font-bold text-yellow-900 mb-2">⚡ Urgent Call to Action for Teachers:</h3>
            <p className="text-yellow-800 text-sm">
              The AI revolution in education is happening NOW. Teachers who embrace AI tools today will lead tomorrow's classrooms!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITeachingGuidePage;
