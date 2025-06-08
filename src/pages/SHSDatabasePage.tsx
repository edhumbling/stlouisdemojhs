import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PDF_LINKS = [
  {
    title: 'Category A SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Category-A-SHS-School-Selection-List-2023-2024.pdf',
  },
  {
    title: 'Category B SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Category-B-SHS-School-Selection-List-2023-2024.pdf',
  },
  {
    title: 'Category C SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Category-C-SHS-School-Selection-List-2023-2024.pdf',
  },
  {
    title: 'Category D SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Category-D-SHS-School-Selection-List-2023-2024.pdf',
  },
  {
    title: 'Special Boarding SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Special-Boarding-SHS-School-Selection-List-2023-2024.pdf',
  },
  {
    title: 'Download SHS CSSPS School Selection Form',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/SHS-CSSPS-School-Selection-Form-2023-2024.pdf',
  },
];

const SHSDatabasePage: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-0 sm:px-0">
      {/* Back Button */}
      <div className="flex items-center gap-3 px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/90 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 text-base"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-green-700 ml-2">Ghana SHS School Selection PDFs</h1>
      </div>

      {/* PDF Cards */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-12">
        {PDF_LINKS.map((pdf) => (
          <div key={pdf.title} className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center justify-between">
            <h2 className="text-lg font-bold text-green-800 mb-3 text-center">{pdf.title}</h2>
            <button
              className="mt-2 px-5 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition-all duration-200"
              onClick={() => setSelectedPdf(pdf.url)}
            >
              View PDF
            </button>
          </div>
        ))}
      </div>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl shadow-2xl w-[95vw] h-[90vh] max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-green-50 rounded-t-xl">
              <span className="font-bold text-green-700 text-base">PDF Viewer</span>
              <button
                className="text-green-700 hover:text-green-900 px-3 py-1 rounded"
                onClick={() => setSelectedPdf(null)}
              >
                Close
              </button>
            </div>
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(selectedPdf)}&embedded=true`}
              title="PDF Viewer"
              className="flex-1 w-full h-full rounded-b-xl"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SHSDatabasePage; 