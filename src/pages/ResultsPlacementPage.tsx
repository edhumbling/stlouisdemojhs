import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../contexts/HeaderContext';

const ResultsPlacementPage = () => {
  const navigate = useNavigate();
  const { setShowHeader } = useHeader();
  const [activeViewer, setActiveViewer] = useState<'results' | 'placement' | null>(null);

  useEffect(() => {
    // Hide header on mobile when viewer is active
    if (activeViewer && window.innerWidth <= 768) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [activeViewer, setShowHeader]);

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
    <div className="min-h-screen bg-black">
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
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
              Results & Placement Checker
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BECE Results Checker Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-white/20">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">BECE Results Checker</h2>
              <p className="text-gray-300 mb-6">
                Check your BECE results online through the official WAEC portal. You'll need your index number and other required details.
              </p>
              <div className="space-y-4">
                <h3 className="font-medium text-white">How to Check:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Visit the WAEC e-Results portal</li>
                  <li>Select your exam type (BECE School/Private)</li>
                  <li>Enter your index number</li>
                  <li>Enter your date of birth</li>
                  <li>Click "Submit" to view your results</li>
                </ol>
              </div>
              <button
                onClick={() => setActiveViewer('results')}
                className="mt-6 w-full bg-yellow-500/90 hover:bg-yellow-600/90 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/30 text-sm sm:text-base"
                style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #eab308)' }}
              >
                Check BECE Results
              </button>
            </div>
          </div>

          {/* SHS Placement Checker Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-white/20">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">SHS Placement Checker</h2>
              <p className="text-gray-300 mb-6">
                Check your Senior High School placement through the official CSSPS portal. You'll need your BECE index number and year.
              </p>
              <div className="space-y-4">
                <h3 className="font-medium text-white">How to Check:</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Visit the CSSPS Placement Checker</li>
                  <li>Enter your 10-digit BECE index number</li>
                  <li>Include the year of your BECE exam</li>
                  <li>Click "Check Placement" to view your school</li>
                </ol>
              </div>
              <button
                onClick={() => setActiveViewer('placement')}
                className="mt-6 w-full bg-yellow-500/90 hover:bg-yellow-600/90 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl border border-white/30 text-sm sm:text-base"
                style={{ filter: 'drop-shadow(0 0 16px #fff) drop-shadow(0 0 8px #eab308)' }}
              >
                Check SHS Placement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPlacementPage; 