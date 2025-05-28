import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { useHeader } from '../contexts/HeaderContext';

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
    let link: HTMLLinkElement | null = null;
    let script: HTMLScriptElement | null = null;

    // Load DearFlip CSS
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/dearhive/dearflip-js-flipbook@latest/css/dearflip.min.css';
    document.head.appendChild(link);

    // Load DearFlip JS
    script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/dearhive/dearflip-js-flipbook@latest/js/dearflip.min.js';
    script.onload = () => {
      // Initialize the flipbook after script loads
      setTimeout(() => {
        try {
          if (flipbookRef.current && (window as any).DEARFLIP) {
            (window as any).DEARFLIP.parseBooks();
            setIsLoading(false);
          } else {
            throw new Error('DearFlip not available');
          }
        } catch (error) {
          console.error('DearFlip initialization failed:', error);
          setUseFallback(true);
          setIsLoading(false);
        }
      }, 500);
    };
    script.onerror = () => {
      console.error('Failed to load DearFlip script');
      setUseFallback(true);
      setIsLoading(false);
    };

    // Fallback timeout
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        console.log('DearFlip loading timeout, using fallback');
        setUseFallback(true);
        setIsLoading(false);
      }
    }, 5000);
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      clearTimeout(fallbackTimer);
      if (link && document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
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
      {/* Header - Enhanced Emerald Back Button */}
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

      {/* Content Area - DearFlip Flipbook */}
      <div className="w-full h-full pt-20 sm:pt-24 relative bg-gray-100">
        {/* Introduction Section */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 py-8 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">
              🚀 The Future of Education is Here - Embrace AI Now!
            </h2>
            <p className="text-lg text-emerald-800 mb-6">
              This comprehensive guide provides African teachers with practical strategies, tools, and insights
              to leverage AI technology in their classrooms. From basic AI literacy to advanced implementation
              techniques, this guide is your roadmap to educational transformation.
            </p>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg text-left">
              <h3 className="font-bold text-yellow-800 mb-2">⚡ Urgent Call to Action for Teachers:</h3>
              <p className="text-yellow-700">
                The AI revolution in education is happening NOW. Teachers who embrace AI tools today will lead
                tomorrow's classrooms. Don't wait - start your AI journey today and stay ahead of the curve!
              </p>
            </div>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <div className="flex-1 p-4">
          <div className="container mx-auto max-w-6xl h-full">
            {useFallback ? (
              /* Fallback: Regular PDF iframe */
              <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '600px' }}>
                <iframe
                  src="https://ik.imagekit.io/humbling/154bc2e9-7d08-4e69-be18-d83fad2cae34.pdf"
                  className="w-full h-full border-0"
                  title="AI Teaching Guide PDF"
                  loading="lazy"
                />
              </div>
            ) : (
              /* DearFlip Flipbook */
              <div
                ref={flipbookRef}
                className="_df_book"
                source="https://ik.imagekit.io/humbling/154bc2e9-7d08-4e69-be18-d83fad2cae34.pdf"
                height="600"
                webgl="true"
                hard="false"
                style={{ height: '600px', width: '100%' }}
              >
                {/* Loading content */}
                {isLoading && (
                  <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-lg">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <h3 className="text-xl font-bold text-emerald-900 mb-2">Loading Interactive Guide...</h3>
                      <p className="text-emerald-700">Preparing your comprehensive AI teaching guide</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Guide Features Section */}
        <div className="bg-white py-8 px-4 border-t">
          <div className="container mx-auto max-w-6xl">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">What You'll Learn in This Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-emerald-50 p-6 rounded-lg">
                <h4 className="font-bold text-emerald-900 mb-3">🤖 AI Fundamentals for Teachers</h4>
                <p className="text-emerald-700">Understanding AI, machine learning, and their applications in education</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-3">🛠️ Practical AI Tools</h4>
                <p className="text-blue-700">Hands-on guide to ChatGPT, Gemini, Claude, and other AI teaching assistants</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-3">📚 Lesson Planning with AI</h4>
                <p className="text-purple-700">Create engaging, personalized lesson plans using AI technology</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-3">📊 Assessment & Feedback</h4>
                <p className="text-orange-700">Use AI for automated grading, feedback generation, and student analytics</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-lg">
                <h4 className="font-bold text-pink-900 mb-3">🌍 African Context</h4>
                <p className="text-pink-700">Strategies tailored for African classrooms, languages, and cultural contexts</p>
              </div>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h4 className="font-bold text-indigo-900 mb-3">🚀 Future-Ready Teaching</h4>
                <p className="text-indigo-700">Prepare students for an AI-driven world with 21st-century skills</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITeachingGuidePage;
