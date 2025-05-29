import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Calculator, Beaker, Globe, Monitor, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShimmerLoader from '../components/common/ShimmerLoader';

interface TextbookResource {
  id: string;
  title: string;
  subject: string;
  level: string;
  pdfUrl: string;
  description: string;
}

const JHSTextbooksPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleBack = () => {
    navigate('/students-hub');
  };

  const handlePdfBack = () => {
    setSelectedPdf(null);
  };

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

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Prevent body scroll when viewer is open
  useEffect(() => {
    if (selectedPdf) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedPdf]);

  // Extracted PDF resources from mcgregorinri.com categorized by subject
  const textbookCategories = {
    "📊 Mathematics": [
      {
        id: 'basic-7-maths',
        title: 'Basic 7 Mathematics Textbook',
        subject: 'Mathematics',
        level: 'Basic 7 (JHS 1)',
        pdfUrl: 'https://mcgregorinri.com/wp-content/uploads/2022/02/BASIC-7-MATHS-Textbook-on-NUMBER-OPERATION.pdf',
        description: 'Number Operations and Mathematical Concepts for JHS 1 students'
      }
    ],
    "🔬 Science": [
      {
        id: 'basic-7-science',
        title: 'Basic 7 Integrated Science',
        subject: 'Integrated Science',
        level: 'Basic 7 (JHS 1)',
        pdfUrl: 'https://mcgregorinri.com/wp-content/uploads/2022/02/BASIC-7-INTEGRATED-SCIENCE-Text-Books.pdf',
        description: 'Comprehensive science textbook covering physics, chemistry, and biology'
      }
    ],
    "🌍 Social Studies": [
      {
        id: 'basic-7-social',
        title: 'Basic 7 Social Studies',
        subject: 'Social Studies',
        level: 'Basic 7 (JHS 1)',
        pdfUrl: 'https://mcgregorinri.com/wp-content/uploads/2022/02/BASIC-7-SOCIAL-STUDIES-Text-Book.pdf',
        description: 'Social studies covering geography, history, and civic education'
      }
    ],
    "💻 ICT & Computing": [
      {
        id: 'ict-textbook',
        title: 'ICT Textbook for JHS',
        subject: 'Information Communication Technology',
        level: 'JHS (All Levels)',
        pdfUrl: 'https://mcgregorinri.com/wp-content/uploads/2022/02/ICT-Text-Book-for-JHS.pdf',
        description: 'Complete ICT guide for Junior High School students'
      },
      {
        id: 'basic-7-computing',
        title: 'Basic 7 Computing Notes',
        subject: 'Computing',
        level: 'Basic 7 (JHS 1)',
        pdfUrl: 'https://mcgregorinri.com/wp-content/uploads/2022/02/BASIC-7-COMPUTING-Text-Book.pdf',
        description: 'Computing fundamentals and programming concepts'
      }
    ]
  };

  // Flatten all resources for easy access
  const allTextbooks: TextbookResource[] = Object.values(textbookCategories).flat();

  const openPdfViewer = (pdfUrl: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setSelectedPdf(pdfUrl);
  };

  const getGooglePdfViewerUrl = (pdfUrl: string) => {
    return `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  };

  const getSubjectIcon = (subject: string) => {
    if (subject.includes('Math')) return Calculator;
    if (subject.includes('Science')) return Beaker;
    if (subject.includes('Social')) return Globe;
    if (subject.includes('ICT') || subject.includes('Computing')) return Monitor;
    return BookOpen;
  };

  const getSubjectColor = (subject: string) => {
    if (subject.includes('Math')) return '#3B82F6'; // Blue
    if (subject.includes('Science')) return '#10B981'; // Green
    if (subject.includes('Social')) return '#F59E0B'; // Amber
    if (subject.includes('ICT') || subject.includes('Computing')) return '#8B5CF6'; // Purple
    return '#6B7280'; // Gray
  };

  // If a PDF is selected, show the internal PDF viewer
  if (selectedPdf) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 py-4 sm:py-5 shadow-2xl border-b border-teal-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handlePdfBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-teal-700/70 hover:bg-teal-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-teal-500/50 hover:border-teal-400/70 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Back to Textbooks</span>
                <span className="sm:hidden">Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                JHS Textbook Viewer
              </h1>

              {/* Download Button */}
              <a
                href={selectedPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600/80 hover:bg-blue-500/90 text-white font-medium rounded-lg shadow-lg transition-all duration-300 text-sm ml-auto"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Download</span>
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced PDF Viewer */}
        <div className="w-full h-full pt-20 sm:pt-24 relative">
          {isMobile ? (
            /* Google Docs Viewer for Mobile PDFs */
            <div className="w-full h-full bg-white">
              <iframe
                src={getGooglePdfViewerUrl(selectedPdf)}
                className="w-full h-full border-0"
                title="JHS Textbook - Mobile PDF Viewer"
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
                data={selectedPdf}
                type="application/pdf"
                className="w-full h-full"
                style={{
                  height: 'calc(100vh - 96px)',
                  minHeight: '600px'
                }}
              >
                {/* Fallback to Google Viewer for browsers that don't support object tag */}
                <iframe
                  src={getGooglePdfViewerUrl(selectedPdf)}
                  className="w-full h-full border-0"
                  title="JHS Textbook PDF Viewer"
                  style={{
                    height: 'calc(100vh - 96px)',
                    minHeight: '600px'
                  }}
                >
                  {/* Final fallback message */}
                  <div className="flex items-center justify-center w-full h-full bg-gray-50">
                    <div className="text-center max-w-md px-6">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ArrowLeft className="w-8 h-8 text-teal-600 rotate-180" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">PDF Viewer Not Available</h3>
                      <p className="text-gray-600 mb-6">
                        Your browser doesn't support PDF viewing. Please try refreshing the page or use a different browser.
                      </p>
                      <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
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
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16">
        <ShimmerLoader variant="hero" className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-teal-700/50 hover:bg-teal-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-teal-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <div className="flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                JHS Textbooks
              </h1>
              <p className="text-xs sm:text-sm text-teal-200 mt-1">
                Free Junior High School textbooks organized by subject
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">

          {/* Categorized Textbooks */}
          <div className="space-y-8">
            {Object.entries(textbookCategories).map(([categoryName, categoryBooks], categoryIndex) => (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                className="space-y-4"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {categoryName}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-teal-500/50 to-transparent"></div>
                  <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                    {categoryBooks.length} {categoryBooks.length === 1 ? 'book' : 'books'}
                  </span>
                </div>

                {/* Category Books Grid - Students Hub Style */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {categoryBooks.map((book, index) => {
                    const IconComponent = getSubjectIcon(book.subject);
                    const subjectColor = getSubjectColor(book.subject);

                    return (
                      <motion.div
                        key={book.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                        className="group"
                      >
                        <button
                          onClick={(e) => openPdfViewer(book.pdfUrl, e)}
                          className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 active:scale-95 text-left relative"
                        >
                          {/* PDF Badge */}
                          <div className="absolute top-2 right-2 w-5 h-5 bg-red-500/80 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">PDF</span>
                          </div>

                          {/* Subject Icon */}
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 flex items-center justify-center text-white"
                            style={{ backgroundColor: subjectColor }}
                          >
                            <IconComponent size={20} className="sm:w-6 sm:h-6" />
                          </div>

                          {/* Book Info */}
                          <h3 className="text-sm sm:text-base font-semibold text-white mb-1 leading-tight">
                            {book.title}
                          </h3>

                          <p className="text-xs text-gray-400 mb-2 font-medium">
                            {book.level}
                          </p>

                          <p className="text-xs sm:text-sm text-gray-300 leading-tight">
                            {book.description}
                          </p>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </main>
    </div>
  );
};

export default JHSTextbooksPage;
