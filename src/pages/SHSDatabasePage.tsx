import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const PDF_LINKS = [
  {
    id: 'a',
    title: 'Category A SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Category-A-SHS-School-Selection-List-2023-2024.pdf',
    color: '#3B82F6', // Blue
    icon: <FileText className="w-6 h-6" />
  },
  {
    id: 'b',
    title: 'Category B SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Category-B-SHS-School-Selection-List-2023-2024.pdf',
    color: '#10B981', // Green
    icon: <FileText className="w-6 h-6" />
  },
  {
    id: 'c',
    title: 'Category C SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Category-C-SHS-School-Selection-List-2023-2024.pdf',
    color: '#F59E0B', // Amber
    icon: <FileText className="w-6 h-6" />
  },
  {
    id: 'd',
    title: 'Category D SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Category-D-SHS-School-Selection-List-2023-2024.pdf',
    color: '#8B5CF6', // Purple
    icon: <FileText className="w-6 h-6" />
  },
  {
    id: 'special',
    title: 'Special Boarding SHS School Selection List PDF',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/Special-Boarding-SHS-School-Selection-List-2023-2024.pdf',
    color: '#EC4899', // Pink
    icon: <FileText className="w-6 h-6" />
  },
  {
    id: 'cssps',
    title: 'Download SHS CSSPS School Selection Form',
    url: 'https://golearnershub.com/wp-content/uploads/2023/08/SHS-CSSPS-School-Selection-Form-2023-2024.pdf',
    color: '#EF4444', // Red
    icon: <FileText className="w-6 h-6" />
  },
];

const SHSDatabasePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-0 sm:px-0">
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Visit SHS Database and Selection Guide
            </h1>
          </div>
        </div>
      </div>

      {/* School Selection Guideline Section */}
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">School Selection Guideline for BECE Students (2024)</h2>
        <ul className="list-disc pl-6 text-green-900 space-y-2 text-base sm:text-lg">
          <li><b>You can select up to 11 schools in total:</b> 6 schools during the main selection, and up to 5 more during the self-placement phase if you are not placed initially.</li>
          <li>For the main selection: Choose <b>5 schools</b> in order of preference from Categories A, B, and C (only 1 from A, up to 2 from B, all 5 can be from C).</li>
          <li>Your <b>6th choice</b> must be a Day school (Category D) or a Special Boarding school from the official list.</li>
          <li>If you are not placed in any of your 6 choices, you can select up to <b>5 additional schools</b> during the self-placement phase online.</li>
          <li>For each school, select your preferred <b>programme</b> (e.g., Science, Business, Arts) and <b>accommodation type</b> (Boarding/Day).</li>
          <li>Discuss your choices with parents, teachers, and guidance counselors. Consider your strengths, interests, and location.</li>
          <li>Check the <b>cut-off points</b> and requirements for your preferred schools and programmes.</li>
          <li>Use the official <b>CSSPS School Selection Form</b> and double-check all entries before submission.</li>
        </ul>
        <div className="mt-4 text-green-800 text-base sm:text-lg">
          <b>Tip:</b> Choose schools and programmes that match your interests and strengths, not just popularity. Consider proximity, facilities, and your future goals.
        </div>
      </div>

      {/* PDF Cards */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-4 pb-12">
        {PDF_LINKS.map((pdf) => (
          <div
            key={pdf.id}
            className="group relative bg-white/90 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center justify-between hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              border: `1px solid ${pdf.color}20`,
              background: `linear-gradient(135deg, ${pdf.color}10, white)`
            }}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 sm:mb-4 flex items-center justify-center text-white"
              style={{ backgroundColor: pdf.color }}
            >
              {pdf.icon}
            </div>

            {/* Title */}
            <h2 className="text-sm sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 text-center">{pdf.title}</h2>

            {/* View Button */}
            <button
              className="mt-2 px-3 sm:px-5 py-1.5 sm:py-2 text-white rounded-lg font-semibold shadow hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
              style={{ backgroundColor: pdf.color }}
              onClick={() => navigate(`/shs-database/pdf/${pdf.id}`)}
            >
              View PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SHSDatabasePage; 