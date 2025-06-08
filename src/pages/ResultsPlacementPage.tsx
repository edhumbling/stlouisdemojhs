import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';

const ResultsPlacementPage = () => {
  const navigate = useNavigate();
  const { setShowHeader } = useHeader();
  const [activeViewer, setActiveViewer] = useState<'pin' | 'results' | 'placement' | null>(null);

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  const handleBack = () => {
    if (activeViewer) {
      setActiveViewer(null);
    } else {
      navigate(-1);
    }
  };

  if (activeViewer === 'results') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                BECE Results Checker
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-4rem)]">
          <iframe
            src="https://eresults.waecgh.org/"
            className="w-full h-full border-0"
            title="BECE Results Checker"
          />
        </div>
      </div>
    );
  }

  if (activeViewer === 'placement') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                SHS Placement Checker
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full h-[calc(100vh-4rem)]">
          <iframe
            src="https://cssps.gov.gh/placement.html"
            className="w-full h-full border-0"
            title="SHS Placement Checker"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Back Button Bar */}
      <div className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-md border-b border-white/10 p-2 sm:p-4">
        <button
          onClick={handleBack}
          className="flex items-center text-white hover:text-yellow-300 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          <span className="text-sm sm:text-base">Back to Students Hub</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 md:gap-6 p-2 sm:p-4">
        {/* Buy Checker PIN Card */}
        <div className="bg-blue-500/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-blue-500/20 relative group"
             style={{ filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.2))' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="p-3 sm:p-4 md:p-6 relative">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-blue-300 mb-2 sm:mb-4">Buy Checker PIN</h2>
            <p className="text-sm sm:text-base text-blue-100/80 mb-3 sm:mb-4 md:mb-6">
              Purchase your WAEC Result Checker PIN through Mobile Money.
            </p>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h3 className="text-sm sm:text-base font-medium text-blue-300">How to Buy:</h3>
              <ol className="list-decimal list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-blue-100/80">
                <li>Click "Buy PIN" to visit Vatebra</li>
                <li>Select your mobile money provider</li>
                <li>Enter your mobile money number</li>
                <li>Confirm payment details</li>
                <li>Complete payment via USSD</li>
                <li>Receive PIN via SMS</li>
              </ol>
            </div>
            <button
              onClick={() => setActiveViewer('pin')}
              className="mt-3 sm:mt-4 md:mt-6 w-full bg-blue-500/90 hover:bg-blue-600/90 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/30 text-sm sm:text-base relative overflow-hidden group"
              style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #3b82f6)' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <span className="relative">Buy PIN</span>
            </button>
          </div>
        </div>

        {/* BECE Results Checker Card */}
        <div className="bg-yellow-500/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-yellow-500/20 relative group"
             style={{ filter: 'drop-shadow(0 0 8px rgba(234, 179, 8, 0.2))' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="p-3 sm:p-4 md:p-6 relative">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-300 mb-2 sm:mb-4">BECE Results</h2>
            <p className="text-sm sm:text-base text-yellow-100/80 mb-3 sm:mb-4 md:mb-6">
              Check your BECE results online through the official WAEC portal.
            </p>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h3 className="text-sm sm:text-base font-medium text-yellow-300">How to Check:</h3>
              <ol className="list-decimal list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-yellow-100/80">
                <li>Select your exam type (BECE School/Private)</li>
                <li>Enter your 10-digit index number exactly as it appears on your admission notice</li>
                <li>Select your exam year (e.g., 2023, 2024)</li>
                <li>Enter your date of birth in DD/MM/YYYY format</li>
                <li>Click "Submit" to view your results</li>
                <li>Your results will show your grades for all subjects</li>
                <li>You can print or save your results for future reference</li>
              </ol>
            </div>
            <button
              onClick={() => setActiveViewer('results')}
              className="mt-3 sm:mt-4 md:mt-6 w-full bg-yellow-500/90 hover:bg-yellow-600/90 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/30 text-sm sm:text-base relative overflow-hidden group"
              style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #eab308)' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <span className="relative">Check Results</span>
            </button>
          </div>
        </div>

        {/* SHS Placement Checker Card */}
        <div className="bg-green-500/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-green-500/20 relative group"
             style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.2))' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="p-3 sm:p-4 md:p-6 relative">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-green-300 mb-2 sm:mb-4">SHS Placement</h2>
            <p className="text-sm sm:text-base text-green-100/80 mb-3 sm:mb-4 md:mb-6">
              Check your Senior High School placement through the official CSSPS portal.
            </p>
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <h3 className="text-sm sm:text-base font-medium text-green-300">How to Check:</h3>
              <ol className="list-decimal list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-green-100/80">
                <li>Select your placement type (Regular/Technical)</li>
                <li>Enter your 10-digit BECE index number exactly as it appears on your results</li>
                <li>Select your BECE exam year (e.g., 2023, 2024)</li>
                <li>Enter your date of birth in DD/MM/YYYY format</li>
                <li>Click "Check Placement" to view your school</li>
                <li>Your placement will show your assigned school and program</li>
                <li>Note your reporting date and required documents</li>
                <li>Print or save your placement for admission</li>
              </ol>
            </div>
            <button
              onClick={() => setActiveViewer('placement')}
              className="mt-3 sm:mt-4 md:mt-6 w-full bg-green-500/90 hover:bg-green-600/90 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/30 text-sm sm:text-base relative overflow-hidden group"
              style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #22c55e)' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <span className="relative">Check Placement</span>
            </button>
          </div>
        </div>
      </div>

      {/* Viewer Section */}
      {activeViewer && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col">
          {/* Back Button Bar */}
          <div className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 backdrop-blur-md border-b border-white/10 p-2 sm:p-4">
            <button
              onClick={handleBack}
              className="flex items-center text-white hover:text-yellow-300 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              <span className="text-sm sm:text-base">Back to Checkers</span>
            </button>
          </div>

          {/* Viewer Content */}
          <div className="flex-1 relative">
            {activeViewer === 'pin' ? (
              <iframe
                src="https://waecghmomo.vatebra.com/services/purchase/RCK"
                className="w-full h-full border-0"
                title="Buy WAEC Result Checker PIN"
              />
            ) : activeViewer === 'results' ? (
              <iframe
                src="https://ghana.waecdirect.org"
                className="w-full h-full border-0"
                title="BECE Results Checker"
              />
            ) : (
              <iframe
                src="https://cssps.gov.gh"
                className="w-full h-full border-0"
                title="SHS Placement Checker"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPlacementPage; 