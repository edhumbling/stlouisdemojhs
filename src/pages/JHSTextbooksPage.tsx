import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Calculator, Beaker, Globe, Monitor, FileText, Download } from 'lucide-react';
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

  const openPdfViewer = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
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

        {/* PDF Viewer */}
        <div className="absolute inset-0 pt-20 sm:pt-24">
          <iframe
            src={selectedPdf}
            className="w-full h-full border-0"
            title="JHS Textbook PDF Viewer"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-downloads"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-16">
      {/* Header - Apple Style */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm backdrop-blur-sm border border-white/20 flex-shrink-0 hover:scale-105"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <div className="flex-1 text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                📚 JHS Textbooks
              </h1>
              <p className="text-sm sm:text-base text-teal-200">
                Free Junior High School textbooks organized by subject
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Introduction - Apple Style */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-3xl mb-6 shadow-2xl">
              <BookOpen size={40} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Free JHS Textbooks
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Access official Junior High School textbooks and educational materials.
              All PDFs are viewed securely within the app for the best reading experience.
            </p>
          </div>

          {/* Categorized Textbooks - Apple Style */}
          <div className="space-y-12">
            {Object.entries(textbookCategories).map(([categoryName, categoryBooks], categoryIndex) => (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
                className="space-y-6"
              >
                {/* Category Header - Apple Style */}
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {categoryName}
                  </h3>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
                    <FileText size={16} className="text-teal-400" />
                    <span className="text-sm text-gray-300 font-medium">
                      {categoryBooks.length} {categoryBooks.length === 1 ? 'textbook' : 'textbooks'}
                    </span>
                  </div>
                </div>

                {/* Category Books Grid - Apple Style Cute Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryBooks.map((book, index) => {
                    const IconComponent = getSubjectIcon(book.subject);
                    const subjectColor = getSubjectColor(book.subject);

                    return (
                      <motion.div
                        key={book.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: (categoryIndex * 0.15) + (index * 0.1),
                          type: "spring",
                          stiffness: 100
                        }}
                        className="group"
                      >
                        <button
                          onClick={() => openPdfViewer(book.pdfUrl)}
                          className="w-full bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:bg-white/10 active:scale-95 text-left relative overflow-hidden group-hover:scale-105"
                        >
                          {/* Gradient Background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* PDF Badge - Apple Style */}
                          <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/90 rounded-full backdrop-blur-sm">
                            <span className="text-white text-xs font-semibold">PDF</span>
                          </div>

                          {/* Subject Icon - Large and Cute */}
                          <div className="relative z-10">
                            <div
                              className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl mb-6 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                              style={{ backgroundColor: subjectColor }}
                            >
                              <IconComponent size={32} className="sm:w-9 sm:h-9" />
                            </div>

                            {/* Book Info */}
                            <h4 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight group-hover:text-teal-300 transition-colors duration-300">
                              {book.title}
                            </h4>

                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 rounded-full mb-4">
                              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                              <span className="text-sm text-teal-300 font-medium">
                                {book.level}
                              </span>
                            </div>

                            <p className="text-sm text-gray-300 leading-relaxed mb-6">
                              {book.description}
                            </p>

                            {/* View Button - Apple Style */}
                            <div className="flex items-center justify-center gap-2 px-4 py-3 bg-teal-500/20 hover:bg-teal-500/30 rounded-2xl border border-teal-500/30 group-hover:border-teal-400/50 transition-all duration-300">
                              <FileText size={16} className="text-teal-400" />
                              <span className="text-teal-300 font-semibold">Open Textbook</span>
                            </div>
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
