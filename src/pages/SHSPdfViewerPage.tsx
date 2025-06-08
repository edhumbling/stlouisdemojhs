import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PDF_LINKS } from '../data/shsData';

interface PdfLink {
  id: string;
  title: string;
  description: string;
  url: string;
}

const SHSPdfViewerPage: React.FC = () => {
  const { pdfId } = useParams<{ pdfId: string }>();
  const navigate = useNavigate();

  // Find the PDF data
  const pdf = PDF_LINKS.find((p: PdfLink) => p.id === pdfId);

  useEffect(() => {
    if (pdf) {
      // Load DearFlip CSS
      const cssLink = document.createElement('link');
      cssLink.href = 'https://cdn.jsdelivr.net/npm/dearflip-js-flipbook@1.0.0/dist/dflip.min.css';
      cssLink.rel = 'stylesheet';
      document.head.appendChild(cssLink);

      // Load DearFlip JS
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/dearflip-js-flipbook@1.0.0/dist/dflip.min.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.head.removeChild(cssLink);
        document.body.removeChild(script);
      };
    }
  }, [pdf]);

  if (!pdf) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-green-700 hover:text-green-900 mb-6"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-red-700">PDF Not Found</h2>
            <p className="text-red-600 mt-2">The requested PDF could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-700 hover:text-green-900 mb-6"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* PDF Title */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-green-800 mb-2">{pdf.title}</h1>
          <p className="text-gray-600">{pdf.description}</p>
        </div>

        {/* DearFlip PDF Viewer */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div 
            className="_df_book" 
            id="flipbook" 
            data-source={pdf.url}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SHSPdfViewerPage; 