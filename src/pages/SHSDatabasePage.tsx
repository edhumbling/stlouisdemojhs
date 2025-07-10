import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import { PDF_LINKS } from '../data/shsData';

// Color mapping for PDF cards
const PDF_COLORS: { [key: string]: string } = {
  'cssps-2025': '#EF4444', // Red
  'public-schools-register-2025': '#7C3AED', // Violet
  'a': '#3B82F6', // Blue
  'b': '#10B981', // Green
  'c': '#F59E0B', // Amber
  'd': '#8B5CF6', // Purple
  'special': '#EC4899', // Pink
};

const SHSDatabasePage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/students-hub'); // Always navigate to Students Hub instead of using history
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-0 sm:px-0">
      <SEOHead
        title="SHS Database | Senior High School Selection Guide & BECE Placement - St. Louis Demonstration JHS"
        description="SHS Database - Complete SHS school selection guide and database for BECE students. Access Category A, B, C, D school lists, CSSPS forms, and expert guidance for choosing the right senior high school in Ghana."
        keywords="SHS database, school selection guide, BECE placement, CSSPS form, Ghana SHS schools, Category A B C D schools, senior high school selection"
        url="/shs-database"
        type="website"
        pageType="students-hub"
        useGalleryImages={true}
      />
      {/* Native Back Button and Title Section - Green Aero */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              SHS Database and Selection Guide
            </h1>
          </div>
        </div>
      </div>

      {/* GES SHS Selection Register Overview */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 mb-8 border border-emerald-200">
          <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            GES SHS Selection Register & Guidelines 2025
          </h2>
          <p className="text-emerald-700 text-base sm:text-lg leading-relaxed mb-4">
            The Ghana Education Service (GES) SHS Selection Register is the official comprehensive document containing all approved Senior High Schools, their locations, school codes, districts, available programmes, contact information, and admission requirements for the 2025 academic year.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-emerald-100">
              <h3 className="font-bold text-emerald-800 mb-2">📋 Register Contents:</h3>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Complete list of all SHS schools</li>
                <li>• School codes and locations</li>
                <li>• Available programmes per school</li>
                <li>• Contact information</li>
                <li>• Admission requirements</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-emerald-100">
              <h3 className="font-bold text-emerald-800 mb-2">🎯 Guidelines Include:</h3>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• CSSPS selection procedures</li>
                <li>• School categorization system</li>
                <li>• Programme selection criteria</li>
                <li>• Placement procedures</li>
                <li>• Appeals process</li>
              </ul>
            </div>
          </div>
        </div>

        {/* School Categories Explanation */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-4">🏫 Understanding School Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-100">
              <h3 className="font-bold text-blue-600 mb-2">Category A</h3>
              <p className="text-sm text-blue-700 mb-2">Premium boarding schools with excellent facilities and high academic standards.</p>
              <p className="text-xs text-blue-600"><strong>Limit:</strong> Only 1 school allowed</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-green-100">
              <h3 className="font-bold text-green-600 mb-2">Category B</h3>
              <p className="text-sm text-green-700 mb-2">Good boarding schools with quality facilities and strong academic performance.</p>
              <p className="text-xs text-green-600"><strong>Limit:</strong> Up to 2 schools allowed</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-amber-100">
              <h3 className="font-bold text-amber-600 mb-2">Category C</h3>
              <p className="text-sm text-amber-700 mb-2">Standard boarding schools with basic facilities and good academic programs.</p>
              <p className="text-xs text-amber-600"><strong>Limit:</strong> All 5 choices can be Category C</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-100">
              <h3 className="font-bold text-purple-600 mb-2">Category D</h3>
              <p className="text-sm text-purple-700 mb-2">Day schools and some boarding schools in local communities.</p>
              <p className="text-xs text-purple-600"><strong>Requirement:</strong> 6th choice must be Category D</p>
            </div>
          </div>
        </div>

        {/* CSSPS Guidelines */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-8 border border-orange-200">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-800 mb-4">📝 CSSPS Selection Guidelines</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-orange-700 mb-3">Main Selection Process:</h3>
              <ul className="list-disc pl-6 text-orange-700 space-y-2 text-sm sm:text-base">
                <li><strong>6 Schools Total:</strong> Select 6 schools in order of preference</li>
                <li><strong>Categories A-C:</strong> Choose 5 schools (1 from A, up to 2 from B, rest from C)</li>
                <li><strong>6th Choice:</strong> Must be Category D (Day school) or Special Boarding</li>
                <li><strong>Programme Selection:</strong> Choose specific programme for each school</li>
                <li><strong>Accommodation:</strong> Specify Boarding or Day preference</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-orange-700 mb-3">Self-Placement Phase:</h3>
              <ul className="list-disc pl-6 text-orange-700 space-y-2 text-sm sm:text-base">
                <li><strong>Additional 5 Schools:</strong> If not placed in main selection</li>
                <li><strong>Online Process:</strong> Done through CSSPS portal</li>
                <li><strong>Available Schools:</strong> Schools with remaining vacancies</li>
                <li><strong>Timeline:</strong> Usually 2-3 weeks after main placement</li>
                <li><strong>Requirements:</strong> Same criteria as main selection</li>
              </ul>
            </div>
          </div>
        </div>

        {/* School Selection Tips */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border border-purple-200">
          <h2 className="text-xl sm:text-2xl font-bold text-purple-800 mb-4">💡 Expert School Selection Tips</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-purple-100">
              <h3 className="font-bold text-purple-700 mb-2">🎯 Academic Considerations</h3>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Check cut-off points for your target aggregate</li>
                <li>• Consider programme availability</li>
                <li>• Review school's academic performance</li>
                <li>• Match your strengths with school focus</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-100">
              <h3 className="font-bold text-purple-700 mb-2">📍 Practical Factors</h3>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Distance from home</li>
                <li>• Transportation accessibility</li>
                <li>• School fees and additional costs</li>
                <li>• Boarding vs Day school preference</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-purple-100">
              <h3 className="font-bold text-purple-700 mb-2">🏆 Strategic Selection</h3>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>• Mix of reach, match, and safety schools</li>
                <li>• Prioritize schools you genuinely want</li>
                <li>• Consider backup options carefully</li>
                <li>• Consult teachers and counselors</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Deadlines */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 mb-8 border border-red-200">
          <h2 className="text-xl sm:text-2xl font-bold text-red-800 mb-4">⏰ Important Deadlines & Timeline</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-red-100">
              <h3 className="font-bold text-red-700 mb-3">Key Dates to Remember:</h3>
              <ul className="text-sm text-red-600 space-y-2">
                <li><strong>BECE Results Release:</strong> Usually August/September</li>
                <li><strong>School Selection Opens:</strong> 2-3 weeks after results</li>
                <li><strong>Selection Deadline:</strong> Check GES announcements</li>
                <li><strong>First Placement:</strong> 2-3 weeks after selection closes</li>
                <li><strong>Self-Placement:</strong> For unplaced candidates</li>
                <li><strong>School Reporting:</strong> Usually September/October</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border border-red-100">
              <h3 className="font-bold text-red-700 mb-3">Required Documents:</h3>
              <ul className="text-sm text-red-600 space-y-2">
                <li>• BECE Results Slip</li>
                <li>• Completed CSSPS Selection Form</li>
                <li>• Birth Certificate or Age Declaration</li>
                <li>• Passport-size photographs</li>
                <li>• Medical Certificate (if required)</li>
                <li>• Parent/Guardian consent form</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Cards */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-4 pb-12">
        {PDF_LINKS.map((pdf) => {
          const color = PDF_COLORS[pdf.id] || '#6B7280'; // Default gray if color not found
          return (
            <div
              key={pdf.id}
              className="group relative bg-white/90 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center justify-between hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                border: `1px solid ${color}20`,
                background: `linear-gradient(135deg, ${color}10, white)`
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 sm:mb-4 flex items-center justify-center text-white"
                style={{ backgroundColor: color }}
              >
                <FileText className="w-6 h-6" />
              </div>

              {/* Title */}
              <h2 className="text-sm sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 text-center">{pdf.title}</h2>

              {/* View Button */}
              <button
                className="mt-2 px-3 sm:px-5 py-1.5 sm:py-2 text-white rounded-lg font-semibold shadow hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                style={{ backgroundColor: color }}
                onClick={() => navigate(`/shs-database/pdf/${pdf.id}`)}
              >
                View PDF
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SHSDatabasePage;