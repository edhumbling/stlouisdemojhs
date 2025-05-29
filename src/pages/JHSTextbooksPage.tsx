import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Calculator, Beaker, Globe, Monitor, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  const handleBack = () => {
    navigate(-1);
  };

  const handlePdfBack = () => {
    setSelectedPdf(null);
  };

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

  const openPdfInGoogleViewer = (pdfUrl: string) => {
    const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
    setSelectedPdf(googleViewerUrl);
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

  // If a PDF is selected, show the Google PDF viewer
  if (selectedPdf) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 py-4 sm:py-5 shadow-2xl border-b border-teal-700/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handlePdfBack}
                className="inline-flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3 bg-teal-700/70 hover:bg-teal-600/80 text-white font-semibold rounded-xl shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-teal-500/50 hover:border-teal-400/70 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back to Textbooks</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                JHS Textbook Viewer
              </h1>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="absolute inset-0 pt-20 sm:pt-24">
          <iframe
            src={selectedPdf}
            className="w-full h-full border-0"
            title="JHS Textbook PDF Viewer"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
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
                Free Junior High School textbooks and notes organized by subject
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          {/* Introduction */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              📚 Free JHS Textbooks & Notes
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Access free Junior High School textbooks and educational materials organized by subject. 
              All PDFs are viewed using Google's secure PDF viewer for the best reading experience.
            </p>
          </div>

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
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {categoryName}
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-teal-500/50 to-transparent"></div>
                  <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                    {categoryBooks.length} {categoryBooks.length === 1 ? 'book' : 'books'}
                  </span>
                </div>

                {/* Category Books Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                          onClick={() => openPdfInGoogleViewer(book.pdfUrl)}
                          className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 active:scale-95 text-left relative"
                        >
                          {/* PDF Indicator */}
                          <div className="absolute top-3 right-3 w-6 h-6 bg-red-500/80 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">PDF</span>
                          </div>

                          {/* Subject Icon */}
                          <div 
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-4 flex items-center justify-center text-white"
                            style={{ backgroundColor: subjectColor }}
                          >
                            <IconComponent size={24} className="sm:w-7 sm:h-7" />
                          </div>

                          {/* Book Info */}
                          <h4 className="text-base sm:text-lg font-semibold text-white mb-2 leading-tight">
                            {book.title}
                          </h4>

                          <p className="text-sm text-gray-400 mb-2 font-medium">
                            {book.level}
                          </p>

                          <p className="text-sm text-gray-300 leading-relaxed mb-3">
                            {book.description}
                          </p>

                          {/* View PDF Button */}
                          <div className="flex items-center gap-2 text-teal-400 text-sm font-medium">
                            <ExternalLink size={14} />
                            <span>View PDF</span>
                          </div>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center">
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-600/30">
              <h3 className="text-lg font-semibold text-white mb-3">
                📖 About These Textbooks
              </h3>
              <div className="text-gray-300 space-y-2 text-sm">
                <p>• All textbooks are free and provided by educational institutions</p>
                <p>• PDFs are viewed securely using Google's PDF viewer</p>
                <p>• Materials are organized by subject for easy navigation</p>
                <p>• Perfect for JHS students, teachers, and educational support</p>
              </div>
              
              <div className="mt-4 text-xs text-gray-400">
                <p>Source: <a href="https://mcgregorinri.com/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300">McGregorInri.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JHSTextbooksPage;
