import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDF_LINKS = [
  {
    id: 'a',
    title: 'Category A SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Category-A-SHS-School-Selection-List-2023-2024.pdf',
  },
  {
    id: 'b',
    title: 'Category B SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Category-B-SHS-School-Selection-List-2023-2024.pdf',
  },
  {
    id: 'c',
    title: 'Category C SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Category-C-SHS-School-Selection-List-2023-2024.pdf',
  },
  {
    id: 'd',
    title: 'Category D SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Category-D-SHS-School-Selection-List-2023-2024.pdf',
  },
  {
    id: 'special',
    title: 'Special Boarding SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Special-Boarding-SHS-School-Selection-List-2023-2024.pdf',
  },
  {
    id: 'cssps',
    title: 'Download SHS CSSPS School Selection Form',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/SHS-CSSPS-School-Selection-Form-2023-2024.pdf',
  },
];

const SHSPdfViewerPage: React.FC = () => {
  const navigate = useNavigate();
  const { pdfId } = useParams();
  const pdf = PDF_LINKS.find((p) => p.id === pdfId);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  if (!pdf) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-700/80 hover:bg-green-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 text-base"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>
        <div className="text-2xl font-bold text-green-800">PDF Not Found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Native Back Button and Title Section - Green Aero */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4 pt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">
              {pdf.title}
            </h1>
          </div>
        </div>
      </div>
      {/* PDF Viewer Full Screen */}
      <div className="flex-1 w-full max-w-6xl mx-auto py-4 px-2 sm:px-6 flex flex-col">
        <div className="flex-1 min-h-[80vh] rounded-xl overflow-hidden bg-white shadow-lg">
          <Viewer fileUrl={pdf.url} plugins={[defaultLayoutPluginInstance]} />
        </div>
      </div>
    </div>
  );
};

export default SHSPdfViewerPage; 