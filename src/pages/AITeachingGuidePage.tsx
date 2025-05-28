import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { useHeader } from '../contexts/HeaderContext';

// Declare global DearFlip types
declare global {
  interface Window {
    DFLIP: any;
    jQuery: any;
    $: any;
  }
}

const AITeachingGuidePage: React.FC = () => {
  const navigate = useNavigate();
  const flipbookRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [flipbookReady, setFlipbookReady] = useState(false);
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
    const loadDearFlip = async () => {
      try {
        // Load DearFlip CSS
        const dflipCSS = document.createElement('link');
        dflipCSS.rel = 'stylesheet';
        dflipCSS.type = 'text/css';
        dflipCSS.href = 'https://cdn.jsdelivr.net/gh/dearhive/dearflip-js-flipbook@master/dflip/css/dflip.min.css';
        document.head.appendChild(dflipCSS);

        // Load Themify Icons CSS
        const themifyCSS = document.createElement('link');
        themifyCSS.rel = 'stylesheet';
        themifyCSS.type = 'text/css';
        themifyCSS.href = 'https://cdn.jsdelivr.net/gh/dearhive/dearflip-js-flipbook@master/dflip/css/themify-icons.min.css';
        document.head.appendChild(themifyCSS);

        // Load jQuery if not already loaded
        if (!window.jQuery) {
          const jqueryScript = document.createElement('script');
          jqueryScript.src = 'https://cdn.jsdelivr.net/gh/dearhive/dearflip-js-flipbook@master/dflip/js/libs/jquery.min.js';
          jqueryScript.type = 'text/javascript';
          document.body.appendChild(jqueryScript);

          await new Promise((resolve) => {
            jqueryScript.onload = resolve;
          });
        }

        // Load DearFlip JS
        const dflipScript = document.createElement('script');
        dflipScript.src = 'https://cdn.jsdelivr.net/gh/dearhive/dearflip-js-flipbook@master/dflip/js/dflip.min.js';
        dflipScript.type = 'text/javascript';
        document.body.appendChild(dflipScript);

        await new Promise((resolve) => {
          dflipScript.onload = resolve;
        });

        // Wait for DearFlip to initialize and set options
        setTimeout(() => {
          if (window.DFLIP) {
            console.log('DearFlip loaded successfully');

            // Set global options for the flipbook
            (window as any).option_ai_teaching_guide = {
              webgl: true,
              height: 'auto',
              backgroundColor: '#f3f4f6',
              autoSound: false,
              hard: false
            };

            setFlipbookReady(true);
            setIsLoading(false);
          } else {
            console.log('DearFlip not available, using fallback');
            setIsLoading(false);
          }
        }, 1000);

      } catch (error) {
        console.error('Failed to load DearFlip:', error);
        setIsLoading(false);
      }
    };

    loadDearFlip();
  }, []);

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
    <div className="fixed inset-0 z-50 bg-white">
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

            <div className="flex items-center gap-2 ml-auto">
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
      </div>

      {/* Content Area - Full height flipbook */}
      <div className="w-full h-full pt-20 sm:pt-24 relative">
        {isLoading ? (
          /* Loading Screen */
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-emerald-50 to-green-50">
            <div className="text-center max-w-md px-6">
              <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-emerald-900 mb-2">Loading Interactive AI Teaching Guide...</h3>
              <p className="text-emerald-700">Preparing your comprehensive flipbook guide to AI in education</p>

              <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg text-left">
                <h4 className="font-bold text-yellow-800 mb-2">⚡ Urgent Call to Action:</h4>
                <p className="text-yellow-700 text-sm">
                  The AI revolution in education is happening NOW. Teachers who embrace AI tools today will lead tomorrow's classrooms!
                </p>
              </div>
            </div>
          </div>
        ) : flipbookReady ? (
          /* DearFlip Flipbook - Full Screen */
          <div className="w-full h-full bg-gray-100">
            <div
              ref={flipbookRef}
              className="_df_book"
              source="https://ik.imagekit.io/humbling/154bc2e9-7d08-4e69-be18-d83fad2cae34.pdf"
              id="ai_teaching_guide"
              style={{
                width: '100%',
                height: 'calc(100vh - 96px)',
                minHeight: '600px'
              }}
            >
              {/* Fallback content */}
              <div className="flex items-center justify-center w-full h-full bg-white">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-emerald-700">Initializing flipbook...</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* PDF Fallback - Full Screen */
          <div className="w-full h-full bg-white">
            <iframe
              src="https://ik.imagekit.io/humbling/154bc2e9-7d08-4e69-be18-d83fad2cae34.pdf"
              className="w-full h-full border-0"
              title="AI Teaching Guide PDF"
              style={{ height: 'calc(100vh - 96px)' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AITeachingGuidePage;
