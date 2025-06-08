import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PDF_LINKS } from '../data/shsData';
import { ArrowLeft } from 'lucide-react';
import ShimmerLoader from '../components/common/ShimmerLoader';

interface PdfLink {
  id: string;
  title: string;
  description: string;
  url: string;
}

const SHSPdfViewerPage: React.FC = () => {
  const { pdfId } = useParams<{ pdfId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Find the PDF data
  const pdf = PDF_LINKS.find((p: PdfLink) => p.id === pdfId);

  // Google Docs Viewer URL
  const googleViewerUrl = pdf ? `https://docs.google.com/viewer?url=${encodeURIComponent(pdf.url)}&embedded=true` : '';

  if (!pdf) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-700 hover:text-green-900 mb-6"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </button>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700">PDF Not Found</h2>
          <p className="text-red-600 mt-2">The requested PDF could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-100 to-gray-300 flex flex-col">
      {/* Back Button */}
      <div className="flex items-center p-4 bg-white/80 shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-green-700 hover:text-green-900 font-semibold"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back
        </button>
        <h1 className="ml-4 text-lg sm:text-2xl font-bold text-gray-800 truncate">{pdf.title}</h1>
      </div>
      {/* Loader */}
      {loading && (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-200 to-gray-400">
          <ShimmerLoader variant="silver" width="w-96" height="h-20" />
        </div>
      )}
      {/* PDF Viewer */}
      <iframe
        src={googleViewerUrl}
        title={pdf.title}
        className={`flex-1 w-full h-full transition-opacity duration-500 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onLoad={() => setLoading(false)}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default SHSPdfViewerPage; 